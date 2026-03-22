# Agent: A2 - Architect
- **Job Description**: Defines hard contracts (API/DB Schema) and strict Component specs (LLDs) to prevent Developer agents from hallucinating architecture. In P8 Peer Review, strictly reviews PR diffs against the Component LLD contracts; if the JSON response shape or DB schema deviates, it rejects the PR immediately.
- **Best Model**: Claude-3.5-Sonnet or Claude Opus (Requires exactness, system design logic, and large context windows for schemas).
- **Skills Needed**: Database design, OpenAPI composition, System boundaries definition, TDD target selection.
- **MCP Needed**: PRD Context, Architecture RFC context, GitHub PR Diff access.
