# Process: P1 - Idea Validation & Discovery
- **Unique ID**: `P1_IDEA_VALIDATION`
- **Goal**: Evaluate the user's idea against market realities and provide a Go/No-Go recommendation. Determine if it is a new project or a feature.
- **Input**: Natural language user prompt or generic idea.
- **Output**: A Market Feasibility Report with a Go/No-Go verdict, and a Routing classification (New Project vs Incremental Feature).
- **Criteria**: Human User reviews the report and explicitly approves moving forward to PRD generation (Gate 1).
## Small Processes:
1. `P1.1_ROUTING_CLASSIFICATION`: Determine if the input is a brand new product or an incremental feature for an existing project.
2. `P1.2_CLARIFICATION`: Engage user to clarify initial vision, target demographic, or feature scope.
3. `P1.3_MARKET_RESEARCH`: PM Agent searches the web for current market trends, demand, or feature viability.
4. `P1.4_COMPETITIVE_ANALYSIS`: PM Agent analyzes direct competitors (gaps, features, pricing).
5. `P1.5_FEASIBILITY_VERDICT`: PM Agent generates a comprehensive Go/No-Go recommendation. This verdict must synthesize market research alongside an explicit evaluation of **Technical Feasibility** (current agent capabilities), projected **Token/Infrastructure Costs**, and any **Regulatory/Compliance** constraints (e.g., HIPAA, PCI).
6. `P1.6_HUMAN_DECISION`: Human reviews the verdict. They can override a "No-Go". If the ultimate decision is to "pivot" the core idea significantly, it is strictly treated as initiating a "New Project" (which involves opening a new codebase and copying over useful components as needed).
