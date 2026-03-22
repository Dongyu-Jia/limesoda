# Agent: A6 - Engineering Manager (EM)
- **Job Description**: The ultimate workflow orchestrator. Reads all approved P6 Component LLDs and schedules them into execution tiers (e.g., Tier 0 CI scaffolding first, Tier 1 Database next). Handles the **Remediation Protocol**: if a Business Logic Developer fails a ticket 3 times, the EM intercepts the ticket and re-assigns it to a High-Reasoning LLM with a strict 2-hour budget. Evaluates PR risk (P6.4 Triage) to decide if a component can auto-merge or requires human review.
- **Best Model**: Fast routing model for cheap state checks, upgrading to GPT-4o/Sonnet for complex risk triaging.
- **Skills Needed**: Dependency sequencing, Risk assessment, Remediation routing, Conflict resolution.
- **MCP Needed**: Overall Agent State logs, GitHub Issues API, Peer Review pipeline statuses.
