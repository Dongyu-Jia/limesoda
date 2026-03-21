# Process: P6 - Component Sub-Design (LLD)
- **Unique ID**: `P6_COMPONENT_DESIGN`
- **Goal**: Break down the High-Level Architecture (HLD) into granular, file-by-file Low-Level Designs (LLDs) strictly for the components in the **current active Milestone**.
- **Input**: Approved `P5_MILESTONE_PLANNING` roadmap and the `P4_ARCHITECTURE` RFC.
- **Output**: A collection of Component Design Specs generated using `doc/templates/Component_LLD_Template.md` that strictly define file paths, data boundaries, and Success Criteria.
- **Criteria**: Architect Agent autonomously approves the LLDs, OR a Human Tech Lead provides explicit sign-off if escalated (Gate 6).

## Small Processes:
1. `P6.1_ALLOCATE_COMPONENTS`: EM Agent reads the current active Milestone and creates a separate GitHub Issue for each component in that bucket.
2. `P6.2_DRAFT_COMPONENT_SPEC`: For each issue, a Developer Agent writes a Low-Level Design (LLD) Spec. This details the exact file structure, functions to write, state management, and unit test plans.
3. `P6.3_AGENT_PEER_REVIEW`: Architect Agent checks if the drafted LLD strictly obeys the database schemas and API contracts defined in P4. It also calculates a Risk Score for the component.
4. `P6.4_ESCALATION_TRIAGE`: If the component is low-risk (e.g., standard UI component, basic CRUD), the Architect Agent autonomously approves it. If it is high-risk (e.g., Auth, Payments, DB migrations) or deviates from standard patterns, it explicitly flags the human Tech Lead for review.
5. `P6.5_COMPONENT_APPROVAL`: Autonomous or Human sign-off locks the exact file paths and logic flows for the current milestone, clearing the path to Implementation (Phase 7).
