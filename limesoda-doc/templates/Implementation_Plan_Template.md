# Implementation Plan Template (EM Scheduling)

> **Instructions for EM Agent:** This document controls the flow of Phase 7 (Implementation Sprint). If you schedule a UI component before the Database component it relies on, the coding agents will fail. You must strictly tier the LLD tickets into chronological execution blocking steps.

---

## 1. Milestone Context
* **Current Active Milestone:** [e.g., M1 - Core Auth & Database MVP]
* **Total LLD Specs Approved in P6:** [Count of tickets]

---

## 2. Dependency Tree & Execution Tiers
*Organize the Component LLDs into chronological execution tiers. A higher tier cannot begin until all components in the lower tier reach `[MERGED]` status in P8.*

### Tier 0: Environment & CI/CD Scaffolding (M1 Only)
Before any business logic is written, the DevOps/Infra Agent must scaffold the repository, initialize package managers (e.g., `package.json`), and build the GitHub Actions pipeline (`.github/workflows`) required by the P8 Peer Review CI Gate.
* `[ ]` **Ticket 0:** `Scaffold_CI_CD_Pipeline` (Branch: `infra/ci-setup`)

### Tier 1: Foundational (No internal dependencies)
These are the base layers. They typically include database schema definitions, global error handlers, or configuration initializers.
* `[ ]` **Ticket 1:** `LLD_Database_Schema` (Branch: `core/db-schema`)
* `[ ]` **Ticket 2:** `LLD_Global_Error_Handler` (Branch: `core/error-handling`)

### Tier 2: Core Services (Depends on Tier 1)
These components wrap the foundational layers. They usually include data repository patterns, core authentication logic, or ORM clients.
* `[ ]` **Ticket 3:** `LLD_Auth_Middleware` (Depends on Ticket 1)
* `[ ]` **Ticket 4:** `LLD_User_Repository` (Depends on Ticket 1)

### Tier 3: Feature Logic & API Routes (Depends on Tier 2)
The actual business logic controllers, REST routers, or external third-party SDK wrappers.
* `[ ]` **Ticket 5:** `LLD_Stripe_Checkout_Controller` (Depends on Ticket 4)
* `[ ]` **Ticket 6:** `LLD_User_REST_Router` (Depends on Ticket 3 & 4)

### Tier 4: Client & UI Layer (Depends on Tier 3)
The frontend UI components that consume the API routes defined in Tier 3.
* `[ ]` **Ticket 7:** `LLD_Dashboard_React_View` (Depends on Ticket 6)

---

## 3. Active Agent Orchestration
*This section tracks which Business Logic Agent is working on which ticket. The EM Agent updates this section as PRs are opened and merged.*

| Ticket ID | Component Target | Assigned Agent ID | Status | PR Link |
| :--- | :--- | :--- | :--- | :--- |
| **Ticket 1** | `Database_Schema` | `Agent_Alpha`  | `[MERGED]` | `#42` |
| **Ticket 2** | `Error_Handler`   | `Agent_Beta`   | `[IN PROGRESS]` | `#43 (Draft)` |
| **Ticket 3** | `Auth_Middleware` | *Unassigned*   | `[BLOCKED on T1]` | `N/A` |

---

## 4. Git Flow & Branching Convention
* **Branch Format:** `[type]/M[Milestone Number]-[component-name]` (e.g., `feat/M1-auth-middleware`)
* **Commit Requirements:** All commits must cleanly pass the Functional Tests outlined in the specific LLD spec before pushing.
