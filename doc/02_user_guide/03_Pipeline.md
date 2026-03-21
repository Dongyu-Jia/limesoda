# User Guide: 03. The 10-Phase Pipeline Graph

Limesoda operates on a fixed, high-governance 10-Phase SDLC. Each phase is a "Node" in our orchestration graph.

| Phase | Name | Active Agent | Key Output |
| :--- | :--- | :--- | :--- |
| **P1** | Market Research | PM Agent | `Market_Feasibility.md` |
| **P2** | PRD | PM Agent | `PRD.md` |
| **P3A** | Developer Exp (DX) | Designer | `DX_User_Guide.md` |
| **P3B** | User Exp (UX) | Designer | `UX_prototype/` (Mock UI) |
| **P4** | Architecture | Architect | `Architecture_RFC.md` |
| **P5** | Milestone Planning | EM Agent | `Milestone_DAG.md` |
| **P6** | Component Design | Architect | `Component_LLD.md` |
| **P7** | Implementation | Developer | `Source Code (PR)` |
| **P8** | Deployment | DevOps | `Terraform / K8s` |
| **P9** | Observability | SRE | `Telemetry Config` |
| **P10** | Iterative Routing | Architect | `Iteration_Constraint.md` |

## Phase Decomposition: From Nodes to Issues
While the 10-Phase Graph represents the high-level orchestration, each **Phase (Node)** is a container for granular **GitHub Issues**.
- An issue is the smallest unit of work, assigned to a specific **Agent Persona**.

For example, in **Phase 7 (Implementation)**, multiple Developer Agents may work on different issues (e.g., `Issue #42: Setup Auth`, `Issue #43: API CRUD`) simultaneously within the same codebase.

## Concurrent Phases & Feature Requests
Limesoda's orchestration is non-linear. It is possible (and common) for **multiple phases to be in progress simultaneously**.

- **Dynamic Injection:** If a user adds a new feature request while the pipeline is in Phase 7 (Implementation), a new issue will be injected into **Phase 2 (PRD)**.
- **Parallel Execution:** High-priority bug fixes can move through Phases 1-7 in parallel with an ongoing major feature development.
- **Global Context:** All active agents share the same "Working Memory" of the repository, ensuring that code generated in Phase 7 remains consistent with a new PRD being drafted in Phase 2.


## The Automated Gates
Each Phase ends with a **Gate**. A Gate consists of two **Reviewer Agents** (Micro/Sanity and Macro/Value) and one **Autonomous Judge**.
- If the Judge scores the work < 9/10, the Agent is sent back to retry (Max 3 times).
- After the Judge approves, the **Human Tech Lead** is notified for final sign-off.

---
**Next Step:** [Monitoring your Agents in the Radar](04_Monitoring.md).
