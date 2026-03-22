# System Ontology: Agent, Process, Criteria

To ensure infinite scalability and eliminate rigid, ad-hoc workflows, the AI Software Augmentation Platform is fundamentally built as a workflow engine that operates on a recursive, unified ontology. 

Every action in the platform is a composition of exactly three primitives: **Agents**, **Processes**, and **Criteria**.

## 1. Agents (The Executors)
An **Agent** is defined strictly as an LLM instance bound to a specific System Prompt, a scoped subset of API Tools, and a functional role.
*   **Agnostic Independence:** Agents do not control or know about the holistic workflow. They are pure operational nodes that only care about the task immediately in front of them.
*   **Horizontally Scalable:** "More jobs? Just formulate a new Agent." If a user needs a Flutter App or an AWS Network Engineer, the orchestrator codebase does not change. We simply register a new Agent profile in the database with the accompanying instructions.

## 2. Processes (The Workflow Graph)
A **Process** is a state machine node. It represents a unit of work that must transition from `Pending` -> `In-Progress` -> `Completed` -> `Failed`. 
*   **Recursive Composition:** 
    *   **Big Processes (Macro):** A high-level goal (e.g., "Build a full-stack MVP," "Refactor the Authentication Module in Repo X"). A Big Process is simply an ordered directed acyclic graph (DAG) of Small Processes.
    *   **Small Processes (Atomic):** A distinct, irreducible task (e.g., "Write the `User` Prisma Schema", "Review Code in PR #42", "Run TypeScript Compiler").
*   **Assignment:** The orchestrator engine dynamically assigns every Small Process to the most relevant available Agent.

## 3. Criteria (The Exit Gates)
Every Process is hard-locked. A Process cannot transition to `Completed` until its mathematically, logically, or manually defined **Criteria** is fully met. This replaces messy "LLM best-effort" loops with rigid guarantees.

There are exactly three classes of universal Criteria:
1.  **System Criteria (Deterministic):** Evaluated strictly by external compilation or CI/CD tools. The LLM has no say in whether this passes.
    *   *Examples:* "Do all Node.js unit tests exit with code 0?", "Does the JSON output match the `Spec.zod` schema?", "Is test coverage >= 90%?"
2.  **Agent Criteria (Peer Review):** Evaluated by a secondary, specialized AI that acts as an antagonist or reviewer to the working Agent.
    *   *Examples:* The "QA Agent" explicitly returns an `APPROVED` flag on a PR after static analysis. The "Architect Agent" explicitly approves the PM's scope doc.
3.  **Human Criteria (Manual Oversight):** Evaluated by human intervention.
    *   *Examples:* The "Human Tech Lead" clicks the `Approve Architecture` button on the platform dashboard. The human merges the Pull Request in GitHub.

## The Paradigm Shift
Under this ontology, our SaaS product is no longer an "AI Code Generator." It is a **deterministic workflow engine for non-deterministic workers**. 

Instead of hardcoding a brittle "5-step workflow" into a Python script, the SaaS orchestrates state. It takes a **Big Process**, breaks it into a tree of **Small Processes**, assigns the nodes to **Agents**, and runs the loop until the **Criteria** gates turn green. If a Criteria repeatedly fails, the engine suspends the Process and tags a Human.
