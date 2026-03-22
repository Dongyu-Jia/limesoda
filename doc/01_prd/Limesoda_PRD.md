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
- **Observability Gap:** High-level pipeline states (Task Management) are decoupled from lower-level infrastructure health (Cluster Health).
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
    - Step 1: User creates a new project and authorizes the Limesoda GitHub App (or inputs a PAT). 
    - Step 2: User navigates to the "Infrastructure Bindings" tab, inputs 4 GCP Service Accounts (Dev, Test, Staging, Prod). System vaults these.
    - Step 3: System initializes the `doc/` workspace in the target GitHub repo. 
* **Failure Mode Handling (3.1.F1):** If the GitHub PAT lacks write scopes, the UI must surface a "Scope Insufficient" error with a direct link to the GitHub PAT generation page.
* **Failure Mode Handling (3.1.F2):** If the GCP Key is invalid/expired, the "Vaulting" step must highlight the specific SA in red and block transition to Section 3.

### 3.2 CUJ: Organization Team Management
* **User Goal:** Invite other engineers so the EM Agent knows exactly who to tag for escalations.
* **Accessible By (Roles):** Organization Lead
* **Screen Name / URL Path:** `/dashboard/org/team`
* **User Flow:** 
    - Step 1: User opens Team Settings in the dashboard.
    - Step 2: User adds an engineer by inputting their precise GitHub username (`@jane-doe`) and assigning them a Role (`Human Tech Lead`).
    - Step 3: The system syncs this mapping into its database. The EM Agent will now dynamically assign GitHub Issues to these specific human users.

### 3.3 CUJ: Project Protocol Configuration (Pipeline Customization)
* **User Goal:** Disable specific pipeline phases for internal or low-risk projects.
* **Accessible By (Roles):** Organization Lead, Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/settings`
* **User Flow:** 
    - Step 1: User opens Project Settings and views the 10-Phase Pipeline toggle board.
    - Step 2: User disables Phase 8 (SecOps Review) because the project is a low-risk internal scraper.
    - Step 3: The EM Agent reads this configuration flag and autonomously skips Gate 8 during execution routing.

### 3.4 CUJ: Triggering a New Feature (The Genesis Prompt)
* **User Goal:** Generate Limesoda software safely by dropping an initial abstract idea.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/new-feature`
* **User Flow:** 
    - Step 1: Human logs into the Web Dashboard and types their idea into the form: "Build a Stripe Checkout UI."
    - Step 2: The Control Plane backend receives the prompt and wakes up the EM Agent.
    - Step 3: The remainder of the software generation seamlessly transitions into GitHub Issues (See CUJ 3.8).
* **Failure Mode Handling (3.4.F1):** If the genesis idea is fundamentally non-sensical or contains "safety violation" sequences, the UI must block the submission and highlight the conflicting text segment.

### 3.5 CUJ: Task Management (The Agent Registry)
* **User Goal:** See exactly what the AI crew is doing without digging through CI logs.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/tasks`
* **User Flow:** 
    - Step 1: User opens Task Management (live registry of the 10-Phase Pipeline).
    - Step 2: It highlights exactly which agent is active on **specific GitHub Issues** (e.g., "Developer Agent (A3) is `In Progress` on Issue #42").
    - Step 3: Users can inspect individual issue buffers (prompts, models) and perform granular halts/overrides.
    - Step 4: Access "EM Escalation Logs" via a side-panel for failed nodes.

### 3.10 CUJ: Cluster-wide Health & Observability
* **User Goal:** Monitor the underlying infrastructure and orchestration engine status.
* **Accessible By (Roles):** System Admin, Organization Lead
* **Screen Name / URL Path:** `/dashboard/health`
* **User Flow:**
    - Step 1: User opens Cluster Health from the global navigation.
    - Step 2: System displays Node counts, Orchestration Latency, and Global Agent Backlog across all projects.

### 3.6 CUJ: Pipeline Intervention (Pause & Resume)
* **User Goal:** Low-friction, native ability to pause the AI to read code or manually fulfill a phase.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `/dashboard/projects/[id]/pipeline`
* **User Flow:** 
    - Step 1: The Human sees the AI is generating code for Issue #42 but wants to halt it momentarily.
    - Step 2: The Human clicks the explicit "Pause Agent Execution" button on the Dashboard.
    - Step 3: Limesoda halts the LangGraph node via a backend database flag. The AI completely stops commenting/pushing to GitHub.
    - Step 4: The Human can optionally fulfill the task themselves (write the code/LLD in a PR), merge it, and click "Resume Execution" to wake the AI back up safely on the next step.

### 3.7 CUJ: Active Human Notification & Routing
* **User Goal:** The human is proactively alerted when the AI needs approval.
* **Accessible By (Roles):** Human Tech Lead
* **Screen Name / URL Path:** `GitHub Pull Requests / Slack / Email`
* **User Flow:** 
    - Step 1: An AI agent finishes a critical contract (e.g., `Architecture_RFC.md`).
    - Step 2: Limesoda opens a GitHub Pull Request against `main`.
    - Step 3: Limesoda utilizes the GitHub API to officially "Request Review" from the mapped Human Tech Lead (from CUJ 3.2), triggering native notifications.

### 3.8 CUJ: Universal Orchestration (The EM Issue Router)
* **User Goal:** All async task management across the 10-Phase Pipeline is handled via GitHub Issues.
* **Accessible By (Roles):** Agent: EM (A6), Human Tech Lead
* **Screen Name / URL Path:** `GitHub Issues`
* **User Flow:** 
    - Step 1: Following the Genesis Prompt (CUJ 3.4), the **EM Agent** wakes up and connects to GitHub.
    - Step 2: The EM Agent generates the first task as a GitHub Issue: *"Epic: Build Stripe Checkout - Phase 1: Market Feasibility"*, assigning it to `@Limesoda-PM`.
    - Step 3: The **PM Agent** wakes up strictly because it was assigned, researches, generates the report PR, and closes the issue.
    - Step 4: The **EM Agent** sees the closure and generates the next procedural issue (*"Gate 1: Tech Lead Approval"*), assigning it to the specific Human TL mapped via CUJ 3.2.
    - Step 5: Every agent action is tracked meticulously in the GitHub Issue timeline forever.

### 3.9 CUJ: The Architectural Rollback (EM Remediation)
* **User Goal:** Ensure the AI doesn't get trapped in an infinite coding loop due to a flawed design.
* **Accessible By (Roles):** Agent: EM (A6), Agent: Architect (A2), Human Tech Lead
* **Screen Name / URL Path:** `GitHub Pull Requests`
* **User Flow:** 
    - Step 1: If the Developer Agent fails functional tests repeatedly, the **EM Agent** intervenes, upgrading execution to a high-reasoner LLM (Claude Opus/GPT-4o) to retry.
    - Step 2: If the upgraded model fails, the EM routes the task backward, waking the **Architect Agent (A2)** to redesign the component.
    - Step 3: Architect submits an updated LLD as a Pull Request. 
    - Step 4: For major changes, the EM assigns the PR to the Human Tech Lead for explicit Gate Approval.
    - Step 5: **Hard Limit:** After 3 redesign failures, the EM Agent halts the pipeline and escalates directly to the Human Tech Lead.
* **Model Upgrade Mechanism:** The EM Agent performs an "Upgrade" by:
    1. Swapping the active `LLM_MODEL_ID` from the "Default" (e.g., `gemini-2.0-flash`) to the "Reasoning" model (e.g., `gemini-2.0-pro`).
    2. Setting `temperature` to `0.0`.
    3. Injecting the full `remediation_plan` JSON from the Judge into the very first line of the new prompt buffer.

---

## 4. Non-Functional Requirements (NFRs)
* **Scalability:** The Control Plane DB must support multi-tenancy (1 Organization -> N Projects -> N Repositories).
* **Performance:** 
    - **Radar Latency:** Agent state updates (WIP, Failed, Blocked) must reflect on the Dashboard UI via Websockets with a **P99 latency of < 500ms**.
    - **Prompt Generation:** The Control Plane must initiate an Agent node within **2 seconds** of a webhook/UI trigger.
* **Data Persistence:** The system database (e.g., Postgres) tracks project metadata, user sessions, and vaulted secrets. The target GitHub repository remains the absolute source of truth for all SDLC artifacts (PRDs, LLDs, Code).
* **Security Requirements:** All GCP/AWS service accounts must be encrypted at rest utilizing a KMS (Key Management Service).
* **Error Handling & Resilience:**
    - **API Rate Limiting:** The LangGraph state machine must explicitly detect HTTP 429 errors from the GitHub API and implement exponential backoff rather than continually polling.
    - **Infrastructure Exhaustion:** If the agent execution environment (e.g., Postgres connection pool or ephemeral compute nodes) crashes mid-thought, the system must recover state gracefully from the last committed GitHub Issue webhooks, preventing duplicated PR comments.

---

## 5. Acceptance Criteria & MVP Success Metrics

### 5.1 Success Metrics
- **Multi-Tenancy:** A single user can concurrently orchestrate 2 separate Limesoda projects bound to 2 separate Github Repositories via the UI.
- **Error Visibility:** The UI accurately surfaces EM loop failures (e.g., 3/3 Developer test failures) natively in the dashboard within **5 seconds** of the final failure.
- **Sync Integrity:** If a human pushes a valid `Market_Feasibility_Report.md` to `doc/00_market_research/` via GitHub, the Limesoda UI updates the Phase 1 state to `COMPLETE_HUMAN` and triggers Phase 2 webhook within **3 seconds**.
