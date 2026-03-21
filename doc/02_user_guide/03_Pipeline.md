# User Guide: 03. The 10-Phase Pipeline Graph

Limesoda operates on a fixed, high-governance 10-Phase SDLC. Each phase is a "Node" in our orchestration graph.

| Phase | Name | Active Agent | Key Output |
| :--- | :--- | :--- | :--- |
| **P1** | Market Research | PM Agent | `Market_Feasibility.md` |
| **P2** | PRD | PM Agent | `PRD.md` |
| **P3** | UX/DX | Designer | `Design_System_Templates` + `CUJ_Task_Blocks` |
| **P4** | Architecture | Architect | `Architecture_RFC.md` |
| **P5** | Milestone Planning | EM Agent | `Milestone_DAG.md` |
| **P6** | Component Design | Architect | `Component_LLD.md` |
| **P7** | Implementation | Developer | `Source Code (PR)` |
| **P8** | Deployment | DevOps | `Terraform / K8s` |
| **P9** | Observability | SRE | `Telemetry Config` |
| **P10** | Iterative Routing | Architect | `Iteration_Constraint.md` |

## The Automated Gates
Each Phase ends with a **Gate**. A Gate consists of two **Reviewer Agents** (Micro/Sanity and Macro/Value) and one **Autonomous Judge**.
- If the Judge scores the work < 9/10, the Agent is sent back to retry (Max 3 times).
- After the Judge approves, the **Human Tech Lead** is notified for final sign-off.

---
**Next Step:** [Monitoring your Agents in the Radar](04_Monitoring.md).
