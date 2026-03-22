# User Guide: 04. Human-in-the-Loop: Task Management

Limesoda provides absolute override authority over the AI crew. The **Task Management** interface (formerly Runtime Radar) is your command center for project-specific execution.

## 1. The Task Registry (Phase View)
The Task Management screen organizes the 10-Phase Pipeline into a selectable side-track.
- **Side Navigation:** Click any phase (e.g., *Market Research*, *Implementation*) to see its active workstream.
- **Registry Cards:** Each phase displays a list of GitHub Issues with status, owner (Agent ID), and start time.

### Deep Task Inspection
Clicking a specific issue in the registry expands the **Deep Inspection** panel:
1. **Current Prompt Buffer:** View the exact text tokens being sent to the LLM. 
2. **Model Configuration:** See which model (e.g., `gemini-2.0-flash`) is active and its specific temperature/top-p settings.
3. **Live Runtime:** Track the exact duration an agent has been working on a single task.

## 2. Granular Execution Control
Unlike traditional pipelines that are all-or-nothing, Limesoda allows for surgical interventions:

### Local Overrides
Inside every expanded issue card, you have two critical buttons:
- **HALT:** Immediately stops the specific agent working on *that* issue. Other agents in the same phase continue unaffected.
- **OVERRIDE:** Allows you to manually inject code or documentation into the PR and signal to the EM that the task is fulfilled.

### Global Emergency Stop
If the entire project needs to pause (e.g., for a major architectural pivot), use the **HALT ALL AGENTS** button in the top header. This locks the entire project state across all 10 phases.

## 3. Diagnostic Logs & Escalations
If a task fails or the Epistemic Manager (EM) triggers a remediation, click the **Diagnostic Logs** button.
- **Slide-over Panel:** Displays the low-level orchestration logic (e.g., "Remediation Triggered: Swapping model to Gemini 2.0 Pro").
- **Audit Trail:** Every agent decision is timestamped and attributed.

---

> [!IMPORTANT]
> For cluster-wide infrastructure monitoring (Node status, orchestration latency), visit the **[Cluster Health](09_ClusterHealth.md)** page.
