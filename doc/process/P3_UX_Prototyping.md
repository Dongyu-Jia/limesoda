# Process: P3 - UX & DX Prototyping
- **Unique ID**: `P3_UX_PROTOTYPING`
- **Goal**: Generate User Experience (UI mockups) or Developer Experience (API docs/SDK stubs) prototypes based on the PRD's CUJs, allowing the user to approve the interface ergonomics before architecture begins.
- **Input**: The approved `PRD.md` (specifically the Core Capabilities & CUJ map).
- **Output**: Wireframes/HTML mockups (for frontend) OR Developer Guides/API Usage Examples (for pure backend).
- **Criteria**: Human User reviews the prototype (visual or textual) and explicitly approves the ergonomics/flow (Gate 3).

## Small Processes:
1. `P3.1_PROTOTYPE_PARSING`: Parse the PRD to determine the required system interfaces (Visual UI, Developer API, or both).
2. `P3.2_GENERATE_UX_PROTOTYPE`: If a visual UI is required, the UX Agent generates static HTML/Tailwind mockups to preview the user journey.
3. `P3.3_GENERATE_DX_PROTOTYPE`: If a developer-facing API is required, the DX Agent generates API usage examples, developer guides, and JSON response stubs to preview the developer experience (DX).
4. `P3.4_HUMAN_REVIEW`: Present the visual prototype or the API/User Guide docs to the human user for evaluation.
5. `P3.5_REVISE_PROTOTYPE`: Iterative loop based on user design or ergonomic feedback.
6. `P3.6_PROTOTYPE_APPROVAL`: Explicit user sign-off on the layout or API design.

*Note: The generated UI code or API docs from this stage are meant strictly as an interface contract. Execution Agents in Phase 5 will use it as a reference for actual implementation.*
