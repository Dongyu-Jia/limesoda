# User Guide: 01. Getting Started & Onboarding

To start orchestrating software with Limesoda, you must first connect your development infrastructure.

## 0. Roles & Permissions (RBAC)
Limesoda has three primary roles:
- **System Admin:** Cross-tenant observability and platform operations.
- **Organization Lead:** Tenant owner; manages org-level settings and projects.
- **Human Tech Lead:** Project-level reviewer/operator; approves artifacts and can override the pipeline.

Below is the practical “who can do what” mapping for the Control Plane:

| Action | System Admin | Organization Lead | Human Tech Lead |
| :--- | :---: | :---: | :---: |
| Create projects / bind repositories | ✓ | ✓ |  |
| Configure GitHub App / PAT | ✓ | ✓ |  |
| Vault cloud credentials (Dev/Test/Staging/Prod) | ✓ | ✓ |  |
| Manage org team mapping | ✓ | ✓ |  |
| Trigger a feature via Genesis Prompt |  |  | ✓ |
| Approve PRDs / RFCs / LLDs (Gates) |  |  | ✓ |
| Pause / Resume agent execution |  |  | ✓ |
| Manual fulfillment (“bypass”) of a phase |  |  | ✓ |
| View agent logs (project scope) | ✓ | ✓ | ✓ |

## 1. Project Management
From the Limesoda Dashboard, you can manage your entire portfolio of AI-driven software.

### Project Listing
The main dashboard serves as your **Project Registry**. 
- View all active projects and their current SDLC Phase.
- Filter projects by codename or repository.
- Access the **Agent Radar** for any project to see live progress.

### Create a New Project
Click **New Project** to start a fresh orchestration:
1. **Internal Codename:** Give your project a name (e.g., `Project-Zeus`).
2. **Repository Binding:** Connect your GitHub account and select the target repository.
   - Limesoda requires write access to manage **Issues**, **Pull Requests**, and the `doc/` workspace in your repo.

#### GitHub App (Recommended)
If you install the Limesoda GitHub App:
- You grant scoped permissions at the repo/org level (preferred for enterprise governance).
- Limesoda can open issues/PRs, request reviews, and sync `doc/` artifacts without relying on a long-lived PAT.

#### Personal Access Token (PAT) (Fallback)
If you use a PAT instead of the GitHub App:
- Use a dedicated “automation” account where possible.
- Prefer **fine-grained** PATs scoped to the target repo(s).

> [!WARNING]
> **PAT Scope Enforcement:** If your GitHub Personal Access Token lacks internal repository Write scopes, the dashboard will surface a **"Scope Insufficient"** error. You must update your PAT permissions to continue.

> [!TIP]
> Minimum capabilities Limesoda needs (via App permissions or PAT scopes): read/write for **Pull Requests**, **Issues**, and **Repository Contents** (to write the `doc/` workspace).

## 2. Infrastructure Vaulting
Limesoda requires cloud permissions to execute Phase 8 (Deployment) and Phase 9 (Observability).
- Navigate to **Project Settings > Infrastructure**.
- Upload your **GCP Service Account Keys** or **AWS IAM Roles**.
- These credentials are encrypted at rest using Limesoda's internal KMS.

### Required Environments (GCP)
Limesoda expects **four** environment bindings for a project:
- **Dev**
- **Test**
- **Staging**
- **Prod**

These bindings allow the pipeline to deploy and observe safely across pre-prod before touching production.

> [!CAUTION]
> **Credential Validation:** If a GCP Key is invalid or expired, the dashboard will highlight the specific Service Account in red and block your transition to the live SDLC pipeline until a valid key is provided.

## 3. Team Mapping
Limesoda's **Engineering Manager (EM) Agent** needs to know who to notify when a Judge Rejects an artifact or a Hard Limit is reached.
- Go to **Org Settings > Team**.
- Add your engineers by their **GitHub Username**.
- Assign the **Human Tech Lead** role to the primary reviewer.

### Why Team Mapping Matters
Team mapping is how Limesoda routes responsibility in a GitHub-native way:
- **Review Requests:** When an agent opens an artifact PR (PRD/RFC/LLD), Limesoda requests review from the mapped Human Tech Lead.
- **Escalations:** If the EM halts due to hard limits, the mapped Human Tech Lead is the first responder.

---
**Security Note:** If you operate in regulated environments, read [Security, Privacy, and Auditability](08_Security_Privacy.md) before vaulting credentials.

---
**Next Step:** [Triggering your first feature via the Genesis Prompt](02_Genesis.md).
