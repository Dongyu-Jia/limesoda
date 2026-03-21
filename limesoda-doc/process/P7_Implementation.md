# Process: P7 - Implementation Sprint
- **Unique ID**: `P7_IMPLEMENTATION`
- **Goal**: Write code that fulfills the API contracts and Acceptance Criteria based on the LLDs for the current Milestone.
- **Input**: `P6_COMPONENT_DESIGN` Low-Level Design (LLD) Component Specs.
- **Output**: Feature branches with committed code and Unit Tests.
- **Criteria**: Code successfully compiles via `tsc` or equivalent tools.
## Small Processes:
1. `P7.1_DEPENDENCY_SCHEDULING`: EM (Engineering Manager) Agent reviews the approved LLDs for the current milestone and sequences the GitHub Issues into a strict `Implementation_Plan.md`. **For Milestone 1, the EM must always schedule "Tier 0: CI/CD Scaffolding" first, assigning the DevOps Agent to build the GitHub Actions pipelines necessary for P8 Peer Review.**
2. `P7.2_WRITE_TESTS`: Business Logic Agent assigns itself the next unblocked ticket, writing failing Functional Tests strictly matching the LLD's Success Criteria.
3. `P7.3_WRITE_CODE`: Business Logic Agent writes implementation code exclusively to pass those tests.
4. `P7.4_LOCAL_TEST_RUN`: Execute the Functional Tests and deterministic compile checks locally. If they fail, the Agent enters a retry loop to fix the code.
5. `P7.5_EM_REMEDIATION_PROTOCOL`: **Infinite Loop Protection.** If the base Agent fails to pass the tests after `N` consecutive attempts (e.g., max 10 loops), it halts and escalates to the EM Agent. The EM Agent assigns the ticket to a stronger, high-reasoning LLM and grants it a strict retry/time budget (e.g., max 3 attempts, allowing 2 hours of compute time per attempt).
6. `P7.6_ABORT_AND_ESCALATE`: If the high-reasoning model also fails within its budget, the EM Agent definitively halts work. It tags the ticket as `BLOCKED: INFEASIBLE` and escalates back to `P6_COMPONENT_DESIGN` for the Architect Agent to simplify the LLD, or alerts the Human Tech Lead.
7. `P7.7_OPEN_PR`: Only if all local tests pass green (either via the base agent or the high-reasoning agent), push branch and open GitHub PR for the specific component.
