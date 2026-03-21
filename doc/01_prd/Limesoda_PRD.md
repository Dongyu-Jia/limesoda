# Product Requirements Document (PRD): Limesoda Control Plane
**Date:** March 2026
**Author:** A1 - Product Manager Agent

---

## 1. Product Context & Vision
### 1.1 Summary
Limesoda is an Enterprise AI Orchestration SaaS Platform. It abstracts the chaotic nature of LLM software engines by offering a highly governed, 10-Phase SDLC pipeline. While the agents output code directly into GitHub Pull Requests, the heart of Limesoda is the **Control Plane Dashboard**. This UI allows users to onboard projects, monitor the real-time runtime state of multi-agent networks, and manually override pipeline stages. This guarantees humans can bypass the AI at any time if they prefer to write an architecture schematic or component LLD themselves.

### 1.2 Feasibility & Constraints 
- **Technical Capabilities Required:** A Next.js/React Web Dashboard interfacing with a backend LLM orchestration framework (LangGraph).
- **Security / Compliance:** The system must securely vault high-level GCP Service Account keys and GitHub Personal Access Tokens (PATs) for multiple tenants.
- **Budget / Token Constraints:** Restrict expensive model usage to EM Escalation. Use cheaper models for background state updates for the UI.

---

## 2. Target Audience & System Roles (RBAC)
| Role Name | Description | Capabilities / Permissions |
| :--- | :--- | :--- |
| **System Admin** | Global instance owner. | Can view metrics across all tenants. |
| **Organization Lead** | The tenant owner. | Can create new Limesoda Projects, bind GitHub repos, and upload GCP credentials. |
| **Human Tech Lead** | Project-level human in the loop. | Approves PRDs, LLDs via the UI or GitHub, and monitors live agent status. Can manually fulfill pipeline stages. |

---

## 3. Critical User Journeys (CUJs) & UI Mapping

### 3.1 CUJ: Tenant & Project Onboarding
* **User Goal:** Link a new software project to Limesoda's brain.
* **Accessible By (Roles):** Organization Lead
* **Screen Name / URL Path:** `/dashboard/projects/new`
* **User Flow:** 
    - Step 1: User creates a new project and authorizes the Limesoda GitHub App (or inputs a PAT) to bind a specific repository. 
    - Step 2: User navigates to the "Infrastructure Bindings" tab.
    - Step 3: User inputs 4 separate GCP Service Account JSONs (mapping to Dev, Test, Staging, and Prod environments). System securely vaults these.
    - Step 4: System initializes the `doc/` workspace in the target GitHub repo.

### 3.2 CUJ: Triggering a New Feature (The Genesis Prompt)
* **User Goal:** Generate Limesoda software safely by dropping an initial abstract idea.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/new-feature`
* **User Flow:** 
    - Step 1: Human logs into the Limesoda Web Dashboard and types their idea into the New Feature form: "Build a Stripe Checkout UI."
    - Step 2: The Control Plane backend receives the prompt and wakes up the EM Agent.
    - Step 3: The remainder of the software generation process seamlessly transitions out of the UI and into GitHub Issues for tracking (See CUJ 3.6).

### 3.3 CUJ: Agent Observability (Runtime Radar)
* **User Goal:** See exactly what the AI crew is currently doing without digging through GitHub Action logs.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/agents`
* **User Flow:** 
    - Step 1: User opens the Agent Radar.
    - Step 2: The UI displays a live kanban/state-graph of the 10-Phase Pipeline. 
    - Step 3: It highlights exactly which agent is active and specifically **which GitHub Issue** they are currently assigned to (e.g., "Developer Agent (A3) is `In Progress` on Issue #42: Build OAuth Wrapper. Step: `src/auth.js`. Retries: 1/3").
    - Step 4: If an agent fails or encounters an architectural hallucination, the node turns red, and the EM Escalation log is exposed in a side-panel for human triage.

### 3.4 CUJ: Manual Override Execution (GitHub Issue Reassignment)
* **User Goal:** A human developer wants to immediately halt an AI agent and finish a task manually.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `GitHub Issues`
* **User Flow:** 
    - Step 1: An AI Agent (e.g., Architect) is assigned to a GitHub Issue representing a current task. The Issue status is `In Progress`.
    - Step 2: The Human decides the AI is struggling or they want to write the document themselves. The Human simply changes the Issue assignee from `@Limesoda-Architect` to themselves.
    - Step 3: Limesoda webhooks detect the reassignment, instantly halt the running LangGraph agent node, and yield control.
    - Step 4: The Human finishes the architecture PR, merges it, and closes the Issue. Limesoda detects the `Closed` status and autonomously wakes up the Phase 6 Agent for the next task.

### 3.5 CUJ: Active Human Notification & Routing
* **User Goal:** The human is proactively alerted when the AI crew needs approval to proceed through a Gate.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `GitHub Pull Requests / Slack / Email`
* **User Flow:** 
    - Step 1: An AI agent finishes a critical contract (e.g., Phase 4 Architect generates `Architecture_RFC.md`).
    - Step 2: Limesoda autonomously pushes the file to a branch and opens a GitHub Pull Request against `main`.
    - Step 3: Limesoda utilizes the GitHub API to officially "Request Review" from the mapped Human Tech Lead, triggering native GitHub email/push notifications.

### 3.6 CUJ: Universal Orchestration (The EM Issue Router)
* **User Goal:** All async task management across the entire 10-Phase Pipeline is natively handled via GitHub Issues.
* **Accessible By (Roles):** Agent: EM (A6), Human Tech Lead
* **Screen Name / URL Path:** `GitHub Issues`
* **User Flow:** 
    - Step 1: Following the Genesis Prompt from the Web Dashboard (CUJ 3.2), the **EM Agent** (acting as the LangGraph brain) wakes up and connects to the target GitHub Repository.
    - Step 2: The EM Agent generates the very first task as a GitHub Issue: *"Epic: Build a Stripe Checkout UI - Phase 1: Market Feasibility Analysis"*, and explicitly assigns it to `@Limesoda-PM`.
    - Step 3: The **PM Agent** wakes up only because it was assigned the issue. It reads the issue description, performs web research, generates the report in a PR, and closes the task issue.
    - Step 4: The **EM Agent** sees the closure, and generates the next procedural issue (*"Gate 1: Tech Lead Approval"*), assigning it to `@Human-TL`.
    - Step 5: This exact pattern continues forever. The EM creates the Phase 4 task, assigns `@Limesoda-Architect`, waits for closure, then generates the Phase 5 Epic Backlog list. Every single agent action is tracked meticulously in the GitHub Issue timeline.

### 3.7 CUJ: The Architectural Rollback (EM Remediation)
* **User Goal:** Ensure the AI doesn't get trapped in an infinite coding loop due to a flawed architectural design.
* **Accessible By (Roles):** Agent: EM (A6), Agent: Architect (A2), Human Tech Lead
* **Screen Name / URL Path:** `GitHub Pull Requests`
* **User Flow:** 
    - Step 1: If the Developer Agent (A3) fails functional tests repeatedly, the **EM Agent** intervenes, halts A3, and upgrades the execution to a high-reasoner LLM (e.g., GPT-4o / Claude Opus) to retry the code generation.
    - Step 2: If the upgraded model still fails, the EM Agent determines the underlying `Component_LLD` is logically impossible. The EM routes the task backward, waking up the **Architect Agent (A2)** to redesign the component.
    - Step 3: The Architect Agent generates an updated LLD and submits it as a Pull Request. 
    - Step 4: For minor LLD updates, the EM Agent autonomously approves and merges the PR. For major/breaking architecture changes, the EM assigns the PR to the Human Tech Lead for explicit Gate Approval.
    - Step 5: **Hard Limit:** If the Architect redesigns the component 3 separate times and the Developer still cannot satisfy the functional tests, the EM Agent unconditionally halts the pipeline and escalates the issue directly to the Human Tech Lead for manual intervention.

---

## 4. Non-Functional Requirements (NFRs)
* **Scalability:** The Control Plane DB must support multi-tenancy (1 Organization -> N Projects -> N Repositories).
* **Performance:** Agent state updates (WIP, Failed, Blocked) must reflect on the Dashboard UI via Websockets or fast polling (< 2 seconds latency).
* **Data Persistence:** The system database (e.g., Postgres) tracks project metadata, user sessions, and vaulted secrets. The target GitHub repository remains the absolute source of truth for all SDLC artifacts (PRDs, LLDs, Code).
* **Security Requirements:** All GCP/AWS service accounts must be encrypted at rest utilizing a KMS (Key Management Service).
* **Error Handling & Resilience:**
    - **API Rate Limiting:** The LangGraph state machine must explicitly detect HTTP 429 errors from the GitHub API and implement exponential backoff rather than continually polling.
    - **Infrastructure Exhaustion:** If the agent execution environment (e.g., Postgres connection pool or ephemeral compute nodes) crashes mid-thought, the system must recover state gracefully from the last committed GitHub Issue webhooks, preventing duplicated PR comments.

---

## 5. Acceptance Criteria & MVP Success Metrics

### 5.1 Success Metrics
- A single user can concurrently orchestrate 2 separate Limesoda projects bound to 2 separate Github Repositories via the UI.
- The UI accurately surfaces EM loop failures (e.g., 3/3 Developer test failures) natively in the dashboard without requiring the user to read raw CI logs.
- If a human pushes a valid `Market_Feasibility_Report.md` to `doc/00_market_research/` via GitHub, the Limesoda UI instantly marks Phase 1 Complete and begins Phase 2 without being "prompted."
