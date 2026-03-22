# Product Requirements Document (PRD) Template

> **Instructions for PM Agent:** You must fill out this template completely and exhaustively. Do not leave any sections blank. This document is the strict contract that the Architecture and Engineering agents will follow. Ambiguity here will cause execution failure downstream.

---

## 1. Product Context & Vision
### 1.1 Summary
Provide a 2-3 paragraph summary of what this software is, what problem it solves, and why it's being built.

### 1.2 Feasibility & Constraints (Inherited from Idea Validation)
- **Technical Capabilities Required:** (e.g., Web App, Mobile App, Machine Learning Model)
- **Regulatory / Compliance:** (e.g., None, HIPAA, GDPR, PCI-DSS)
- **Budget / Token Constraints:** (e.g., Target under $50/mo hosting, minimal LLM inference)

---

## 2. Target Audience & System Roles (RBAC)
Define exactly who will use the system. The Downstream Security Agent will use this to generate authentication and authorization middleware.

| Role Name | Description | Capabilities / Permissions |
| :--- | :--- | :--- |
| **Admin** | System manager | Can view all data, delete accounts, modify system settings. |
| **User** | Standard authenticated user | Can view their own profile, create resources, edit own resources. |
| **Guest** | Unauthenticated visitor | Can view the public landing page only. |

*(Add or remove roles as necessary)*

---

## 3. Critical User Journeys (CUJs) & UI Mapping
Do not just provide Agile stories. You must define the Critical User Journeys (CUJs) and explicitly map them to their corresponding interface screens or API endpoints so the Frontend Agent does not have to guess what to build.

### 3.1 CUJ: `[Name of the Critical User Journey]`
* **User Goal:** What is the user trying to achieve? (e.g., "Create a new invoicing project and invite a team member")
* **Accessible By (Roles):** [e.g., Admin, User]
* **Screen Name / URL Path:** `[e.g., /dashboard/projects/new]`
* **Key UI Components Required:**
    1. [e.g., Navigation Bar with Login/Logout]
    2. [e.g., Data Table showing User's active projects]
    3. [e.g., "Create New" Button launching a modal window]
* **User Flow/Actions (The Journey):** 
    - Step 1: User navigates to `/dashboard`.
    - Step 2: User clicks "Create New". A form modal appears asking for `Name` and `Description`. 
    - Step 3: Upon submit, the system creates the project and redirects them to `[Next Screen]`.

*(Repeat 3.1 for every distinct screen or major view in the application)*

---

## 4. Non-Functional Requirements (NFRs)
The Infrastructure Agent explicitly relies on these numbers to provision cloud resources (AWS/GCP). Provide concrete numbers, not qualitative adjectives like "fast."

* **Scalability / Expected Traffic:** (e.g., 500 Daily Active Users, ~10 concurrent users max)
* **Performance / Latency:** (e.g., API responses must be < 200ms at P95)
* **Data Persistence / Storage:** (e.g., Requires relational database. Expected data volume < 10GB/year. Uploaded images stored in S3.)
* **Security Requirements:** (e.g., JWT Authentication required, database encryption at rest)

---

## 5. Acceptance Criteria & MVP Success Metrics
This section defines the "Definition of Done". The QA Agent will test the final PR against these exact statements.

### 5.1 Success Metrics
How do we mathematically know the MVP is finished and successful?
- [e.g., A user can complete the checkout flow via Stripe in test mode without errors.]
- [e.g., The system achieves 90% unit test coverage on all core logic modules.]

### 5.2 Go-Live Checklist
- [ ] End-to-end user flows validated.
- [ ] Infrastructure successfully provisions without manual intervention.
