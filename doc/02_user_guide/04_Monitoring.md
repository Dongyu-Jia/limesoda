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

## 2. Pausing the Pipeline
If you want to stop the AI at any time to refactor code manually:
1. Click **Pause Execution** on the Project Dashboard.
2. The system sets a bypass flag in the LangGraph engine.
3. The AI will immediately stop pushing commits or commenting on GitHub.

## 3. Manual Fulfillment (The "Bypass")
If you disagree with an AI's Architecture or PRD:
1. Pause the pipeline.
2. Manually write the document (e.g., `PRD.md`) and push it to the `doc/` folder in GitHub.
3. On the Dashboard, click **Manual Approval: Phase 2**.
4. Limesoda will treat your manual push as an "APPROVED" artifact and automatically route the AI to the next Phase.

## 4. GitHub-Native Review
Limesoda is built to be "invisible." When an agent finishes a document:
- It opens a **GitHub Pull Request**.
- It tags you for review.
- You can leave comments on the PR. The agent will read your comments, consider them a "Judge Critique," and attempt to fix the document.

---
**Warning:** Manually merging code without Limesoda's approval will trigger a "Drift Detection" event in Phase 10.
