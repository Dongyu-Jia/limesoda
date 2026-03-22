"""
P1: Market Research Agent — LangGraph Demo
==========================================
Prompts are loaded directly from limesoda-doc/prompts/P1_Market_Research/.
No prompt duplication in this file.

State machine:
    generator ──► reviewer_data ──► reviewer_strategy ──► judge
                                                             │
                                         ┌───────────────────┤
                                         ▼                   ▼
                                      generator          human_gate
                                    (retry loop)      (opens GitHub PR)
                                         │
                                         └──► escalate (retry >= 3)
"""

import json
import re
import subprocess
from pathlib import Path
from typing import TypedDict

from langchain_anthropic import ChatAnthropic
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage, SystemMessage, ToolMessage
from langgraph.graph import END, StateGraph

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).parent.parent
PROMPTS_DIR = REPO_ROOT / "limesoda-doc" / "prompts" / "P1_Market_Research"
TEMPLATES_DIR = REPO_ROOT / "limesoda-doc" / "templates"
OUTPUT_DIR = REPO_ROOT / "doc" / "00_market_research"

# ---------------------------------------------------------------------------
# Config — hardcoded for demo
# ---------------------------------------------------------------------------
ANTHROPIC_API_KEY = "YOUR_ANTHROPIC_API_KEY"
TAVILY_API_KEY    = "YOUR_TAVILY_API_KEY"     # free tier at tavily.com
GITHUB_TOKEN      = "YOUR_GITHUB_TOKEN"
GITHUB_REPO       = "dongyujia/limesoda"
HUMAN_TECH_LEAD   = "dongyujia"               # GitHub username to assign the PR to
MAX_RETRIES       = 3
MODEL             = "claude-sonnet-4-6"

llm         = ChatAnthropic(model=MODEL, api_key=ANTHROPIC_API_KEY, max_tokens=4096)
search_tool = TavilySearchResults(max_results=5, tavily_api_key=TAVILY_API_KEY)

# LLM variant that knows about the search tool and can emit tool calls
llm_with_tools = llm.bind_tools([search_tool])

# ---------------------------------------------------------------------------
# Load prompts and template from source files — no duplication
# ---------------------------------------------------------------------------
def _load(path: Path) -> str:
    return path.read_text(encoding="utf-8")

PROMPT_GENERATOR        = _load(PROMPTS_DIR / "01_Generator.md")
PROMPT_REVIEWER_DATA    = _load(PROMPTS_DIR / "02a_Reviewer_Data_Analyst.md")
PROMPT_REVIEWER_STRATEGY = _load(PROMPTS_DIR / "02b_Reviewer_Strategy.md")
PROMPT_JUDGE            = _load(PROMPTS_DIR / "03_Judge.md")
REPORT_TEMPLATE         = _load(TEMPLATES_DIR / "Market_Feasibility_Report_Template.md")

# ---------------------------------------------------------------------------
# State
# ---------------------------------------------------------------------------
class P1State(TypedDict):
    idea: str
    report: str
    reviewer_data_feedback: str
    reviewer_strategy_feedback: str
    judge_result: dict
    retry_count: int
    final_status: str   # "pending_human" | "escalated"
    pr_url: str

# ---------------------------------------------------------------------------
# Nodes
# ---------------------------------------------------------------------------
def generator_node(state: P1State) -> P1State:
    """
    ReAct loop: the PM agent searches the web as many times as it needs
    before writing the final report. The loop ends when the LLM stops
    emitting tool calls and returns the finished Markdown report.

    Tool available: TavilySearchResults (web search)
    Pattern: LLM → tool call? → execute → feed result back → repeat → done
    """
    attempt = state["retry_count"] + 1
    print(f"\n[GENERATOR] Starting research loop (attempt {attempt}/{MAX_RETRIES})...")

    user_content = (
        f"Genesis idea: {state['idea']}\n\n"
        f"Use the search tool to research real competitors, market size, and recent news "
        f"before writing the report. Output template to follow:\n{REPORT_TEMPLATE}"
    )

    if state["retry_count"] > 0 and state.get("judge_result"):
        remediation = state["judge_result"].get("remediation_plan", "")
        user_content += (
            f"\n\nYour previous report was REJECTED by the Judge.\n"
            f"Remediation plan:\n{remediation}\n\n"
            f"Previous draft:\n{state['report']}"
        )

    # Seed the message thread
    messages = [
        SystemMessage(content=PROMPT_GENERATOR),
        HumanMessage(content=user_content),
    ]

    # ReAct loop — runs until the LLM stops calling tools
    while True:
        response = llm_with_tools.invoke(messages)
        messages.append(response)

        # No tool calls → LLM is done researching, response.content is the report
        if not response.tool_calls:
            print(f"  → Research complete. Drafting report...")
            break

        # Execute every tool call the LLM requested and feed results back
        for tool_call in response.tool_calls:
            query = tool_call["args"].get("query", "")
            print(f"  → [search] {query}")
            result = search_tool.invoke(tool_call["args"])
            messages.append(ToolMessage(
                content=json.dumps(result),
                tool_call_id=tool_call["id"],
            ))

    return {
        **state,
        "report": response.content,
        "retry_count": state["retry_count"] + 1,
    }


def reviewer_data_node(state: P1State) -> P1State:
    print("[REVIEWER: Data Analyst] Auditing micro-level claims...")

    response = llm.invoke([
        {"role": "system", "content": PROMPT_REVIEWER_DATA},
        {"role": "user",   "content": f"Review this report:\n\n{state['report']}"},
    ])

    print(f"  → {response.content[:120]}...")
    return {**state, "reviewer_data_feedback": response.content}


def reviewer_strategy_node(state: P1State) -> P1State:
    print("[REVIEWER: Strategy Expert] Auditing macro strategy...")

    response = llm.invoke([
        {"role": "system", "content": PROMPT_REVIEWER_STRATEGY},
        {"role": "user",   "content": f"Review this report:\n\n{state['report']}"},
    ])

    print(f"  → {response.content[:120]}...")
    return {**state, "reviewer_strategy_feedback": response.content}


def judge_node(state: P1State) -> P1State:
    print("[JUDGE] Scoring report...")

    context = (
        f"Report:\n{state['report']}\n\n"
        f"Data Analyst Review:\n{state['reviewer_data_feedback']}\n\n"
        f"Strategy Expert Review:\n{state['reviewer_strategy_feedback']}"
    )

    response = llm.invoke([
        {"role": "system", "content": PROMPT_JUDGE},
        {"role": "user",   "content": context},
    ])

    raw = response.content.strip()
    json_match = re.search(r'\{.*\}', raw, re.DOTALL)
    try:
        result = json.loads(json_match.group()) if json_match else {}
    except json.JSONDecodeError:
        result = {}

    if "status" not in result:
        result = {"status": "REJECTED", "remediation_plan": "Judge output was malformed. Rewrite with cleaner structure and stricter data citations."}

    print(f"  → Judge: {result['status']}")
    return {**state, "judge_result": result}


def human_gate_node(state: P1State) -> P1State:
    """
    Delegates all git + GitHub work to Claude Code CLI via subprocess.
    Claude Code runs non-interactively (-p flag), uses its native Bash tool
    to handle branching, committing, pushing, and PR creation itself.

    Why CLI here instead of direct API:
    - This node is pure file/git/shell work — Claude Code's native toolset
    - No structured JSON output needed, just a PR URL
    - Replaces ~40 lines of PyGithub boilerplate with one prompt
    """
    print("\n[HUMAN GATE] Delegating git + PR creation to Claude Code CLI...")

    slug = re.sub(r'[^a-z0-9]+', '-', state['idea'].lower()).strip('-')[:50]
    report_filename = f"{slug}_Market_Feasibility_Report.md"
    branch_name = f"p1/market-research/{slug}"

    # Write the report file locally — Claude Code will git-add and commit it
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    report_path = OUTPUT_DIR / report_filename
    report_path.write_text(state["report"], encoding="utf-8")

    pr_body = (
        "## [P1] Human Gate — Market Research Approval\n\n"
        "**Action required:** Review and **merge to approve** Gate 1 → triggers P2 (PRD).\n"
        "Close without merging = NO-GO.\n\n"
        "---\n\n"
        f"**Data Analyst review:**\n{state['reviewer_data_feedback']}\n\n"
        f"**Strategy Expert review:**\n{state['reviewer_strategy_feedback']}\n\n"
        "---\n\n"
        f"{state['report']}"
    )

    prompt = f"""
You are a release engineer. Do exactly these steps using bash, no commentary:

1. git checkout -b {branch_name}
2. git add doc/00_market_research/{report_filename}
3. git commit -m "p1: market research report — {state['idea'][:60]}"
4. git push -u origin {branch_name}
5. gh pr create \\
     --title "[P1] Market Research: {state['idea'][:70]}" \\
     --body '{pr_body.replace("'", "'")}' \\
     --assignee {HUMAN_TECH_LEAD}

Print only the PR URL on the last line of your response.
"""

    result = subprocess.run(
        ["claude", "-p", prompt, "--allowedTools", "Bash"],
        capture_output=True,
        text=True,
        cwd=str(REPO_ROOT),
    )

    if result.returncode != 0:
        print(f"  → Claude Code stderr: {result.stderr[:300]}")

    # Extract PR URL from the last non-empty line of output
    output_lines = [l.strip() for l in result.stdout.strip().splitlines() if l.strip()]
    pr_url = next((l for l in reversed(output_lines) if "github.com" in l and "/pull/" in l), "")

    print(f"  → PR: {pr_url or '(url not found in output)'}")
    print("  → Merge this PR to approve Gate 1 and proceed to P2.")

    return {**state, "final_status": "pending_human", "pr_url": pr_url}


def escalate_node(state: P1State) -> P1State:
    print("\n[ESCALATE] ⚠️  FAILURE_ESCALATE — max retries reached. Waking human.")
    return {**state, "final_status": "escalated"}


# ---------------------------------------------------------------------------
# Routing
# ---------------------------------------------------------------------------
def route_after_judge(state: P1State) -> str:
    if state["judge_result"].get("status") == "APPROVED":
        return "human_gate"
    if state["retry_count"] >= MAX_RETRIES:
        return "escalate"
    return "generator"


# ---------------------------------------------------------------------------
# Graph
# ---------------------------------------------------------------------------
def build_graph():
    g = StateGraph(P1State)

    g.add_node("generator",          generator_node)
    g.add_node("reviewer_data",      reviewer_data_node)
    g.add_node("reviewer_strategy",  reviewer_strategy_node)
    g.add_node("judge",              judge_node)
    g.add_node("human_gate",         human_gate_node)
    g.add_node("escalate",           escalate_node)

    g.set_entry_point("generator")
    g.add_edge("generator",         "reviewer_data")
    g.add_edge("reviewer_data",     "reviewer_strategy")
    g.add_edge("reviewer_strategy", "judge")

    g.add_conditional_edges("judge", route_after_judge, {
        "generator":  "generator",
        "human_gate": "human_gate",
        "escalate":   "escalate",
    })

    g.add_edge("human_gate", END)
    g.add_edge("escalate",   END)

    return g.compile()


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import sys

    graph = build_graph()

    # python p1_market_research.py --viz
    # Renders the graph to graph.png (uses mermaid.ink API, no local deps needed)
    # and also prints ASCII + Mermaid text to stdout.
    if "--viz" in sys.argv:
        print(graph.get_graph().draw_ascii())
        print("\n--- Mermaid source (paste at mermaid.live) ---")
        print(graph.get_graph().draw_mermaid())
        png_path = Path(__file__).parent / "graph.png"
        png_path.write_bytes(graph.get_graph().draw_mermaid_png())
        print(f"\nPNG saved: {png_path}")
        sys.exit(0)

    initial_state: P1State = {
        "idea": "Build an AI-powered code review tool that enforces architectural governance on GitHub PRs",
        "report": "",
        "reviewer_data_feedback": "",
        "reviewer_strategy_feedback": "",
        "judge_result": {},
        "retry_count": 0,
        "final_status": "",
        "pr_url": "",
    }

    print("=" * 60)
    print("P1: Market Research Agent — Limesoda Demo")
    print(f"Idea: {initial_state['idea']}")
    print("=" * 60)

    final = graph.invoke(initial_state)

    print(f"\nFinal status : {final['final_status'].upper()}")
    print(f"Retries used : {final['retry_count'] - 1}/{MAX_RETRIES}")
    if final.get("pr_url"):
        print(f"PR for review: {final['pr_url']}")
