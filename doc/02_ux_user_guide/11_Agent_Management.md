# User Guide: 11. Agent Management: Configuring the Crew

Limesoda's orchestration is powered by specialized AI agents. Unlike static scripts, these agents are configurable entities that can be tuned for specific technical domains.

## 1. Agent Identities
Every agent in the Limesoda ecosystem has a unique **Agent ID** (e.g., `A3-Developer`). This ID is used for attribution across GitHub commits, PR comments, and execution logs.

### Role Specialization
Agents are organized by their **Cognitive Role**:
- **A1-PM:** High-level strategy, PRD writing, and market alignment.
- **A2-Architect:** Technical RFCs, cloud diagramming, and data modeling.
- **A3-Developer:** Implementation, unit testing, and documentation.

## 2. Configuring "Brain" Properties
Click the **Settings** icon on any agent card to open the **Configuration Modal**.

### Skills Training
Skills are semantic tags that influence the agent's internal reasoning loops.
- **Domain Skills:** React, Python, Prisma, GCP, etc.
- **Cognitive Skills:** Strategic Planning, Security Auditing, Performance Optimization.

### MCP Tool Permissions
The **Model Context Protocol (MCP)** gives agents the tools to interact with the real world.
- **FileSystem:** Ability to read/write code in your repository.
- **Terminal:** Ability to run builds, tests, and lints.
- **GitHubProxy:** Ability to open PRs, comment, and resolve issues.
- **WebSearch:** Real-time access to documentation and tech trends.

## 3. Deployment & Decommissioning
- **Deploy New Agent:** Scale your crew by deploying additional agents for specific tasks.
- **Decommission:** Retire an agent if a project phase is complete or if you want to rotate agent IDs for security audits.

---

> [!TIP]
> Always align an agent's **Skills** with the technologies in your **Onboarding** configuration. If an agent lacks the "Cypress" skill, it may struggle with Phase 7 integration testing.
