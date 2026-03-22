"""
E2B Sandbox + Temporal — Signal Patterns Demo
==============================================
Shows three ways a sandbox can report back to the scheduler:

  Pattern A — Heartbeat   : streaming progress during execution (Temporal-native)
  Pattern B — Return value: structured result on completion (simplest)
  Pattern C — Signal      : sandbox calls Temporal directly mid-execution (advanced)

Deploy the sandbox template first:
  cd engine && e2b template build -n limesoda-agent

Then run:
  python sandbox_demo.py
"""

import asyncio
import json
from dataclasses import dataclass

from e2b import AsyncSandbox
from temporalio import activity, workflow
from temporalio.client import Client
from temporalio.common import RetryPolicy
from temporalio.worker import Worker
from datetime import timedelta

# ---------------------------------------------------------------------------
# Config — hardcoded for demo
# ---------------------------------------------------------------------------
E2B_API_KEY       = "YOUR_E2B_API_KEY"
E2B_TEMPLATE      = "limesoda-agent"      # deployed from e2b.Dockerfile
TEMPORAL_HOST     = "localhost:7233"
ANTHROPIC_API_KEY = "YOUR_ANTHROPIC_API_KEY"
GITHUB_TOKEN      = "YOUR_GITHUB_TOKEN"

# ---------------------------------------------------------------------------
# Shared types
# ---------------------------------------------------------------------------
@dataclass
class AgentTask:
    task_id: str
    phase: str          # "P1", "P2", etc.
    prompt: str
    repo_url: str

@dataclass
class AgentResult:
    status: str         # "completed" | "failed"
    output_file: str    # path written inside sandbox, committed to git
    summary: str        # short human-readable summary


# ===========================================================================
# PATTERN A — Heartbeat
# ===========================================================================
# Best for: long-running agent commands where you want live progress in the UI.
# How it works:
#   - activity.heartbeat(data) sends a progress snapshot to Temporal
#   - Temporal stores each heartbeat; dashboard can poll it
#   - Also prevents the activity from timing out during long runs
#   - On worker restart, activity resumes from last heartbeat checkpoint
# ===========================================================================

@activity.defn
async def run_agent_with_heartbeat(task: AgentTask) -> AgentResult:
    async with await AsyncSandbox.create(
        template=E2B_TEMPLATE,
        envs={
            "ANTHROPIC_API_KEY": ANTHROPIC_API_KEY,
            "GH_TOKEN": GITHUB_TOKEN,
        },
        timeout=3600,  # 1 hour max per task
    ) as sbx:

        # Stream stdout back as heartbeats — every line is a live update
        log_lines = []

        def on_stdout(chunk):
            line = chunk.strip()
            if line:
                log_lines.append(line)
                # Each heartbeat is visible in Temporal Web UI and pollable by dashboard
                activity.heartbeat({
                    "task_id": task.task_id,
                    "phase":   task.phase,
                    "last_log": line,
                    "log_count": len(log_lines),
                })

        await sbx.commands.run(
            f"git clone {task.repo_url} /repo && cd /repo && "
            f"claude --dangerously-skip-permissions -p '{task.prompt}'",
            on_stdout=on_stdout,
            on_stderr=on_stdout,   # treat stderr as progress too
            timeout=3500,
        )

        # Read the structured result the agent wrote to a known file
        result_raw = await sbx.files.read("/repo/.limesoda/result.json")
        result = json.loads(result_raw)

        return AgentResult(
            status=result.get("status", "completed"),
            output_file=result.get("output_file", ""),
            summary=result.get("summary", "\n".join(log_lines[-5:])),
        )


# ===========================================================================
# PATTERN B — Return value
# ===========================================================================
# Best for: short tasks where you just need the final structured output.
# How it works:
#   - Agent writes a JSON result file inside the sandbox before exiting
#   - Activity reads the file and returns it to Temporal as the activity result
#   - Workflow receives this as the return value of execute_activity()
# ===========================================================================

@activity.defn
async def run_agent_return_value(task: AgentTask) -> AgentResult:
    async with await AsyncSandbox.create(
        template=E2B_TEMPLATE,
        envs={"ANTHROPIC_API_KEY": ANTHROPIC_API_KEY, "GH_TOKEN": GITHUB_TOKEN},
        timeout=3600,
    ) as sbx:

        # Inject a wrapper script that forces the agent to write a result file
        wrapper = f"""
import subprocess, json, sys
result = subprocess.run(
    ["claude", "--dangerously-skip-permissions", "-p", "{task.prompt}"],
    capture_output=True, text=True
)
output = {{
    "status":      "completed" if result.returncode == 0 else "failed",
    "stdout":      result.stdout[-2000:],   # last 2000 chars
    "output_file": ".limesoda/output.md",
    "summary":     result.stdout.strip().splitlines()[-1] if result.stdout else "",
}}
with open("/repo/.limesoda/result.json", "w") as f:
    json.dump(output, f)
"""
        await sbx.files.write("/run_agent.py", wrapper)
        await sbx.commands.run(
            f"git clone {task.repo_url} /repo && "
            f"mkdir -p /repo/.limesoda && "
            f"cd /repo && python /run_agent.py",
            timeout=3500,
        )

        result_raw = await sbx.files.read("/repo/.limesoda/result.json")
        result = json.loads(result_raw)

        return AgentResult(**result)


# ===========================================================================
# PATTERN C — Signal
# ===========================================================================
# Best for: multi-checkpoint tasks where the sandbox needs to pause the
# workflow mid-execution (e.g., "I finished research, approve before I code").
# How it works:
#   - Sandbox has Temporal CLI installed
#   - It sends a signal to the parent workflow at any point during execution
#   - Workflow is waiting on that signal; it unblocks and can make decisions
#   - Sandbox then waits for the workflow to signal back (via a file or env var)
# ===========================================================================

@activity.defn
async def run_agent_with_signal(task: AgentTask) -> AgentResult:
    workflow_id = activity.info().workflow_id

    async with await AsyncSandbox.create(
        template=E2B_TEMPLATE,
        envs={
            "ANTHROPIC_API_KEY": ANTHROPIC_API_KEY,
            "GH_TOKEN":          GITHUB_TOKEN,
            "TEMPORAL_HOST":     TEMPORAL_HOST,
            "WORKFLOW_ID":       workflow_id,        # sandbox knows who to signal
        },
        timeout=3600,
    ) as sbx:

        # The agent script inside the sandbox can send a Temporal signal at any point:
        #
        #   temporal workflow signal \
        #     --workflow-id $WORKFLOW_ID \
        #     --name "agent_checkpoint" \
        #     --input '{"phase":"P1","status":"research_done","artifact":"doc/report.md"}'
        #
        # This is just an example of the sandbox running a long multi-phase job
        await sbx.commands.run(
            f"git clone {task.repo_url} /repo && cd /repo && "
            f"claude --dangerously-skip-permissions -p '{task.prompt}'",
            timeout=3500,
        )

        result_raw = await sbx.files.read("/repo/.limesoda/result.json")
        result = json.loads(result_raw)
        return AgentResult(**result)


# ---------------------------------------------------------------------------
# Temporal Workflow — wires all three patterns together
# ---------------------------------------------------------------------------

@workflow.defn
class LimesodaWorkflow:

    def __init__(self):
        self._checkpoint: dict = {}

    # Receives signals from the sandbox (Pattern C) or from GitHub webhooks
    @workflow.signal
    async def agent_checkpoint(self, data: dict):
        self._checkpoint = data

    @workflow.run
    async def run(self, task: AgentTask) -> str:

        retry = RetryPolicy(
            maximum_attempts=3,
            initial_interval=timedelta(seconds=10),
        )

        # --- Pattern A: use heartbeat for long P1 research runs ---
        result: AgentResult = await workflow.execute_activity(
            run_agent_with_heartbeat,
            task,
            start_to_close_timeout=timedelta(hours=1),
            retry_policy=retry,
            # Heartbeat timeout: if no heartbeat for 2 min, Temporal considers
            # the activity dead and retries it from the last checkpoint
            heartbeat_timeout=timedelta(minutes=2),
        )

        # --- Human gate: pause until GitHub PR is merged ---
        # A webhook sends a signal to this workflow when the PR merges
        await workflow.wait_condition(
            lambda: self._checkpoint.get("status") == "pr_merged"
        )

        return f"Task {task.task_id} completed: {result.summary}"


# ---------------------------------------------------------------------------
# Worker — max 10 sandboxes concurrently
# ---------------------------------------------------------------------------

async def run_worker():
    client = await Client.connect(TEMPORAL_HOST)

    worker = Worker(
        client,
        task_queue="limesoda-tasks",
        workflows=[LimesodaWorkflow],
        activities=[
            run_agent_with_heartbeat,
            run_agent_return_value,
            run_agent_with_signal,
        ],
        max_concurrent_activity_task_executions=10,  # ← max 10 E2B sandboxes alive
    )

    print("Worker running. Ctrl+C to stop.")
    await worker.run()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    asyncio.run(run_worker())
