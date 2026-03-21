# Process: P4 - Architecture Design
- **Unique ID**: `P4_ARCHITECTURE`
- **Goal**: Translate the PRD and Prototypes into rigid, deterministic technical contracts (Schemas, OpenAPI docs, and Infrastructure pipelines) that the coding Agents must strictly obey to prevent hallucinations.
- **Input**: Approved `P2_PRODUCT_REQUIREMENTS` (especially NFRs) and `P3_UX_PROTOTYPING` mockups/docs.
- **Output**: A Technical Design Document (HLD RFC) generated strictly using `doc/templates/Architecture_RFC_Template.md` containing Database Schemas, API Specs, Infra plans, **AND a Checklist of Sub-Component Designs (LLDs)** needed for implementation.
- **Criteria**: Human Tech Lead explicitly signs off on the structured schemas (Gate 4).

## Small Processes:
1. `P4.1_DRAFT_DATA_SCHEMA`: Architect Agent translates the PRD data requirements into rigid database definitions (e.g., `schema.prisma` or SQL DDL).
2. `P4.2_DRAFT_API_CONTRACTS`: Based on the UX/DX prototypes, the Architect Agent generates strict OpenAPI/Swagger specs defining exactly how the frontend will communicate with the backend.
3. `P4.3_DRAFT_INFRA_PLAN`: Architect Agent reads the Non-Functional Requirements (NFRs) from the PRD and selects the exact cloud infrastructure (e.g., AWS Lambda vs ECS) required to support the latency and scale constraints.
4. `P4.4_AGENT_PEER_REVIEW`: An independent Security/Infra Agent reviews the drafted RFC. It checks for structural security (e.g., ensuring PII is encrypted in the proposed schema) and verifies the stack's feasibility. Fails loop back to P4.1 for the Architect to resolve.
5. `P4.5_HUMAN_REVIEW`: Present the AI-validated Architecture RFC to the human user (Tech Lead) for evaluation.
6. `P4.6_REVISE_ARCHITECTURE`: Iterative loop based on human technical feedback or stack preferences.
7. `P4.7_ARCHITECTURE_APPROVAL`: Explicit human sign-off on the schemas, permanently locking the technical contract before engineering sprints begin.
