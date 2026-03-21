# Standard Operating Procedures (SOP) & Human Checkpoints

To mitigate the non-deterministic nature of Large Language Models (LLMs) and prevent cascading architecture failures, the AI Auto-Crew strictly enforces deterministic grounding, Agent-to-Agent Negotiation loops, and hard Human-in-the-Loop (HITL) Breakpoints.

## 1. Injecting Certainty (Grounding the LLMs)
LLMs are probabilistic, but software systems are deterministic. We bridge this gap by grounding the agents in explicit, external deterministic tools:
- **Compilers & Interpreters:** The Developer Agent's code must successfully compile. If `tsc` (TypeScript compiler) fails, the sprint is blocked, and the Dev Agent must read the error logs to fix it.
- **Linters & Formatters:** Code must mathematically pass tools like `eslint` and `prettier`. This prevents the AI from inventing unreadable syntax.
- **Strict JSON Schemas:** Every step of agent-to-agent communication (e.g., passing the PRD to the Architect) is validated against a strict JSON Schema (using libraries like Zod or Pydantic). If an LLM hallucinates a field, the schema parser rejects it instantly before the next agent sees it.

## 2. Agent-to-Agent Negotiation (The "Inner Loop")
Before bothering a human for approval or alerting them to a failure, agents must attempt to resolve issues among themselves within a bounded loop (e.g., $N=3$ attempts).
- **The QA/Dev Feedback Loop:** When the Dev Agent opens a PR, automated CI tests run. If the tests fail or the QA Agent detects a flaw, it leaves an inline PR comment. The Dev Agent reads the comment and pushes a new commit. The human is only alerted if the Dev Agent fails 3 times in a row.
- **The Architect/PM Pushback Loop:** If the Architect reads the PRD and mathematically determines a feature is impossible (e.g., "The requested rate-limiting feature requires Redis, but our infrastructure stack only has Postgres"), the Architect pushes a formal revision request back to the PM Agent. The PM Agent updates the PRD to negotiate a compromise. It only escalates to a human if the PM and Architect cannot resolve the discrepancy.

## 3. Mandatory Human Checkpoints (The "Outer Loop")
To guarantee that a cascading hallucination never makes it to production, the system deliberately halts autonomous execution and forces a human interaction at three distinct gates:

### Gate 1: Scope Certainty (PRD Sign-Off)
- **Trigger:** The PM Agent finishes translating the user prompt into structured User Stories and Acceptance Criteria.
- **Action:** Execution pauses. The Human User must read the PRD and click "Approve Scope". This ensures the AI isn't building the wrong product.

### Gate 2: Design Certainty (Architecture Sign-Off)
- **Trigger:** The Architect produces the OpenAPI specifications and the Database Schema (e.g., Prisma models).
- **Action:** Execution pauses. The Human Tech Lead must verify the architectural direction. This prevents the Dev Agents from wasting hours building a massive feature on top of a fundamentally flawed database schema.

### Gate 3: Production Certainty (Code Merge Approval)
- **Trigger:** The Dev Agent's PR passes all CI tests (100% test coverage) and successfully clears the QA Agent's security review.
- **Action:** Execution pauses. The Human reviews the PR exactly like they would a Junior Developer's PR. If it looks pristine and aligns with the PRD, the Human clicks "Merge", which triggers the Infrastructure Agent to handle the deployment autonomously.
