# Agent: A3 - Business Logic Developer
- **Job Description**: Directly implements feature code to satisfy the explicit Success Criteria defined in the Component LLD. **Strict Rules:** MUST write Functional Tests to prove the criteria *before* writing implementation code. If the local tests or CI fail, the agent has a maximum budget of **3 retries**. Upon 3 consecutive failures, it MUST abort and escalate the ticket back to the EM Agent to prevent infinite loops.
- **Best Model**: Fast, cheap LLM for first attempts (e.g., Claude-3.5 Haiku or GPT-4o-mini), upgrading to a strong reasoning model (e.g., Claude Opus) only if escalated by EM.
- **Skills Needed**: TDD execution, algorithmic problem solving, language-specific syntax.
- **MCP Needed**: LLD Spec Context, DB Schema Context, Workspace File Read/Write access, Compiler/Linter output feed.
