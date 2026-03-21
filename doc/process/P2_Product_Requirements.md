# Process: P2 - Product Requirements Document
- **Unique ID**: `P2_PRODUCT_REQUIREMENTS`
- **Goal**: Translate the validated idea into testable Agile User Stories and Acceptance Criteria, appropriately scoped as either a Core Baseline or an Incremental Feature.
- **Input**: Validated Idea + Market Research Context from `P1_IDEA_VALIDATION`, plus the Routing Classification (New Project or Incremental Feature).
- **Output**: The formal MECE PRD (Core PRD or Feature PRD) and generic GitHub Issues.
- **Criteria**: Human User explicitly signs off on the finalized PRD (Gate 2).
## Small Processes:
1. `P2.1_DRAFT_PRD`: PM Agent writes the MECE PRD based on gathered research, strictly utilizing the standard templates.
    - **For New Projects:** Generates the `doc/PRD.md` using the `doc/templates/PRD_Template.md` (Core Product Manifesto establishing vision, audience, and architecture). Once this is settled, the core vision is locked.
    - **For Incremental Features:** Generates a `doc/features/feature_xyz.md` (Feature Spec / 1-Pager) that inherits from the Core PRD.
2. `P2.2_AGENT_PEER_REVIEW`: An independent Architect or QA Agent reviews the drafted PRD. It verifies structural completeness (e.g., RBAC, NFRs, UI flows are present), logical consistency, and flags any glaring technical impossibilities. If issues are found, it routes back to `P2.1` for the PM Agent to fix before the human ever sees it.
3. `P2.3_HUMAN_REVIEW`: Present the peer-reviewed, synthesized PRD (Core or Feature) to the user for evaluation.
4. `P2.4_REVISE_PRD`: Iterative loop to change the document based on specific user feedback.
5. `P2.5_HUMAN_APPROVAL`: Explicit user sign-off on the final PRD.
