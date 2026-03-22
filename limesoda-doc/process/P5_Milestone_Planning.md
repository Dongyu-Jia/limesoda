# Process: P5 - Milestone Planning
- **Unique ID**: `P5_MILESTONE_PLANNING`
- **Goal**: Sequence the monolithic Architecture Component Checklist into logical, chronological Milestones to ensure foundational dependencies (e.g., DB Auth) are built before downstream features (e.g., UI Dashboard).
- **Input**: Approved `doc/03_system_architecture/Architecture_RFC.md`.
- **Output**: A prioritized `doc/04_milestone_plan/Milestone_Plan.md` mapping each component into distinct Milestones (M1, M2, M3).
- **Criteria**: Human User explicitly approves the Milestone scoping and timeline (Gate 5).

## Small Processes:
1. `P5.1_DEPENDENCY_ANALYSIS`: EM Agent analyzes the Sub-Design checklist and maps out technical dependencies (e.g., "The Database Schema must be built before the Auth middleware").
2. `P5.2_DRAFT_MILESTONES`: EM Agent chunks the components into logical Milestones. M1 is always the "Core Foundational MVP". Subsequent milestones introduce additive features.
3. `P5.3_HUMAN_REVIEW`: Present the sequenced Milestone Plan to the user for evaluation.
4. `P5.4_REVISE_MILESTONES`: Iterative loop based on user priority (e.g., "Shift Stripe integration to M3, pull up the Dashboard to M2").
5. `P5.5_MILESTONE_APPROVAL`: Explicit human sign-off on the roadmap.

*Note: Once approved, the downstream workflows (P6 -> P9) are executed in a loop **per Milestone**. For example, the system entirely completes M1 (Design -> Code -> Review -> Deploy) before it begins LLD design for M2.*
