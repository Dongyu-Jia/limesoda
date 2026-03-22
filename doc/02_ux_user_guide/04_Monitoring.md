# User Guide: 04. Human-in-the-Loop: Monitoring & Overrides

Limesoda is designed so you never feel like you've "lost the keys" to your software. You have absolute override authority over the 10-Phase Graph.

## 1. The Agent Radar (Live Dashboard)
The **Agent Radar** screen provides a real-time visualization of the SDLC Graph.
- **Green Nodes:** Completed and Verified.
- **Pulsing Blue Node:** The active Phase (e.g., Phase 4 Architecture is generating an RFC).
- **Red Node:** An EM Escalation has occurred (e.g., 3 consecutive Judge rejections).

### Drill-Down Monitoring
Clicking on any active or completed **Node** in the Radar opens the **Issue Explorer**:
1. **Issue Status:** View each granular issue (Todo, In-Progress, Done) within that Phase.
2. **Agent Assignment:** See exactly which **Agent ID** (e.g., `D-42` for Developer) is assigned to each issue.
3. **Live Logs:** Stream the terminal output and internal reasoning for any active agent.

> [!TIP]
> The Agent Radar is high-performance. Node and Issue state changes are synchronized via Websockets with a **P99 latency of < 500ms**, ensuring you are always seeing the most current state of the AI crew.

## 1.1 What a Red Node Means (Escalations)
When a node turns red, the EM is signaling one of these operator conditions:
- **Repeated Judge Rejections:** An agent failed the same gate multiple times.
- **Test Failures / Remediation Loop:** A Developer agent can’t make the build green.
- **Hard Limit Reached:** The system has halted to prevent infinite loops.

Recommended operator response:
1. Open the phase’s active GitHub Issue and review the timeline.
2. Open the latest PR for the artifact/code and read the Judge feedback and reviewer notes.
3. Decide one of:
   - **Comment** with explicit constraints (the agent reads PR comments as critique).
   - **Manual fulfill** the phase (bypass) if you can write the artifact faster.
   - **Pause** the pipeline if you need to refactor without the agent moving underneath you.

## 2. Pausing the Pipeline
If you want to stop the AI at any time to refactor code manually:
1. Click **Pause Execution** on the Project Dashboard.
2. The system sets a bypass flag in the LangGraph engine.
3. The AI will immediately stop pushing commits or commenting on GitHub.

### Resume Execution
When you’re ready to continue:
1. Ensure the current phase artifact/code is in a good state (merged PR or manual fulfillment).
2. Click **Resume Execution**.
3. The EM re-evaluates the graph and routes to the next actionable issue.

## 2.1 Notifications: Where You’ll See Them
Limesoda routes time-sensitive events through native channels:
- **GitHub:** PR review requests and issue assignments are the primary mechanism.
- **Dashboard:** The Agent Radar highlights red nodes and shows escalation details.
- **Slack / Email (Optional):** If enabled for your org, escalations and gate-ready events can be forwarded to these channels.

## 3. Manual Fulfillment (The "Bypass")
If you disagree with an AI's Architecture or PRD:
1. Pause the pipeline.
2. Manually write the artifact and push it into your repo’s `doc/` workspace.
3. On the Dashboard, click **Manual Approval** for the corresponding Phase.
4. Limesoda will treat your manual push as an approved artifact and route to the next phase.

### “Valid Artifact” Rules (Recommended)
To avoid sync ambiguity, follow these conventions:
- Use the exact filenames expected by the phase (see table below).
- Keep artifacts in the `doc/` workspace (do not bury them in random folders).
- If you substantially change scope, also update the relevant upstream artifact (e.g., update `PRD.md` before reworking `Architecture_RFC.md`).

| Phase | Recommended file/path |
| :--- | :--- |
| P1 | `doc/00_market_research/Market_Feasibility_Report.md` (example: `doc/00_market_research/Limesoda_Market_Feasibility_Report.md`) |
| P2 | `doc/01_prd/PRD.md` (example: `doc/01_prd/Limesoda_PRD.md`) |
| P3A | `doc/02_ux_dx/DX_User_Guide.md` |
| P3B | `doc/02_ux_dx/UX_prototype/` |
| P4 | `doc/03_architecture/Architecture_RFC.md` |
| P6 | `doc/04_component_design/Component_LLD.md` |

> [!NOTE]
> Repos can vary. If your project uses different `doc/` paths, keep them consistent and document the convention in your repo.

## 3.1 Sync Integrity (Humans Can Push Artifacts)
If you push a valid artifact directly (without the agent generating it), Limesoda treats GitHub as the source of truth and updates the pipeline state accordingly.

## 4. GitHub-Native Review
Limesoda is built to be "invisible." When an agent finishes a document:
- It opens a **GitHub Pull Request**.
- It tags you for review.
- You can leave comments on the PR. The agent will read your comments, consider them a "Judge Critique," and attempt to fix the document.

---
**Warning:** Manually merging code without Limesoda's approval can trigger a "Drift Detection" event in Phase 10. See the recovery steps in [Troubleshooting](07_Troubleshooting.md).
