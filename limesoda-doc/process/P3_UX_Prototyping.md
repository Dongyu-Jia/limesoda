# Process: P3 - UX & DX Prototyping
- **Unique ID**: `P3_UX_PROTOTYPING`
- **Goal**: Generate User Experience (UI mockups) or Developer Experience (API docs/SDK stubs) prototypes based on the PRD's CUJs, allowing the user to approve the interface ergonomics before architecture begins.
- **Input**: The approved `PRD.md` (specifically the Core Capabilities & CUJ map).
- **Output**: Wireframes/HTML mockups (for frontend) OR Developer Guides/API Usage Examples (for pure backend).
- **Criteria**: Human User reviews the prototype (visual or textual) and explicitly approves the ergonomics/flow (Gate 3).

## Small Processes:
1. `P3.1_PROTOTYPE_PARSING`: Parse the PRD to determine the required system interfaces.
2. `P3.2_GENERATE_DX_PROTOTYPE (P3A)`: The DX Agent generates the API user guide utilizing `doc/templates/DX_User_Guide_Template.md` to preview the developer experience (DX) via explicit JSON stubs and mock usage flows. **Executed as individual sub-tasks for each CUJ.**
3. `P3.3_GENERATE_UX_PROTOTYPE (P3B)`: If a visual UI is required, the UX Agent generates high-fidelity HTML/CSS mockups in the `UX_prototype/` folder. **This includes all 6 core feature screens and functional sidebar navigation.**
4. `P3.4_START_MOCK_SERVER`: The UX Agent outputs a command (e.g., `npx http-server UX_prototype/`) for the human to preview the prototype.
5. `P3.5_AGENT_PEER_REVIEW`: An independent QA reviews the prototypes against the Design System (Template Group) and CUJ coverage.
6. `P3.6_HUMAN_REVIEW`: Present the validated models to the human user for evaluation.
7. `P3.7_PROTOTYPE_APPROVAL`: Explicit user sign-off on the interface contract.

*Note: The generated UI code or API docs from this stage are meant strictly as an interface contract. Execution Agents in Phase 5 will use it as a reference for actual implementation.*
