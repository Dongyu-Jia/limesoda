# Limesoda User Guide: Task Management

## 1. High-Density Registry
The **Task Management** page (accessible via the sidebar) is the "Command Center" of the Limesoda Control Plane. It utilizes a massive **1800px** horizontal canvas to provide full visibility into the live agent registry across the 10-phase SDLC.

## 2. Granular Inspection
Each task in the registry can be expanded to reveal:
- **Current Prompt Buffer**: The exact instruction the agent is following (truncated to 30 words for readability).
- **Execution Context**: Which model is being used (e.g., `gemini-2.0-flash`) and its current temperature.
- **Running Time**: Real-time duration of the current agent thought-cycle.

## 3. Pipeline Intervention
Humans have absolute control over the execution graph directly from this registry:

### 🛑 Global Execution Halt
The "PAUSE ALL AGENTS" button acts as a cluster-wide kill-switch. 
- **Effect**: All active LangGraph nodes are suspended. Agents stop pushing code and commenting on GitHub. 
- **Use Case**: Emergency maintenance, sensitive architecture pivots, or cost management.

### ⏭️ Manual Phase Override
If the AI is struggling with a specific gate or if you want to provide a manual solution:
- **Button**: Click "OVERRIDE" on any active phase.
- **Workflow**: Provide a link to your manual implementation (e.g., a specific PR or document) and a rationale. 
- **Result**: The phase is marked as `COMPLETED (MANUAL)` and the pipeline automatically wakes up on the next phase.

## 4. The 10-Phase SDLC Graph
1. **Market Research**: Feasibility and competitive landscape.
2. **Product Requirement**: PRD generation and human approval.
3. **UX/UI Design**: High-fidelity prototyping and user flow.
4. **Architecture**: System design and tech stack selection.
5. **Detailed Design**: Component-level LLD.
6. **Security Review**: OWASP compliance and secret auditing.
7. **Implementation**: Active coding.
8. **Testing & QA**: Sub-unit and integration tests.
9. **Deployment**: CI/CD orchestration.
10. **Observability**: Real-time remediation and feedback.
