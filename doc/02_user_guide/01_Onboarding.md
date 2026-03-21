# User Guide: 01. Getting Started & Onboarding

To start orchestrating software with Limesoda, you must first connect your development infrastructure.

## 1. Create a Project
From the Limesoda Dashboard, click **New Project**.
1. **Internal Codename:** Give your project a name (e.g., `Project-Zeus`).
2. **Repository Binding:** Connect your GitHub account and select the target repository. 
   - *Note:* Limesoda will request Write access to your repository to manage Issues, Pull Requests, and the `doc/` workspace.

> [!WARNING]
> **PAT Scope Enforcement:** If your GitHub Personal Access Token lacks internal repository Write scopes, the dashboard will surface a **"Scope Insufficient"** error. You must update your PAT permissions to continue.

## 2. Infrastructure Vaulting
Limesoda requires cloud permissions to execute Phase 8 (Deployment) and Phase 9 (Observability).
- Navigate to **Project Settings > Infrastructure**.
- Upload your **GCP Service Account Keys** or **AWS IAM Roles**.
- These credentials are encrypted at rest using Limesoda's internal KMS.

> [!CAUTION]
> **Credential Validation:** If a GCP Key is invalid or expired, the dashboard will highlight the specific Service Account in red and block your transition to the live SDLC pipeline until a valid key is provided.

## 3. Team Mapping
Limesoda's **Engineering Manager (EM) Agent** needs to know who to notify when a Judge Rejects an artifact or a Hard Limit is reached.
- Go to **Org Settings > Team**.
- Add your engineers by their **GitHub Username**.
- Assign the **Human Tech Lead** role to the primary reviewer.

---
**Next Step:** [Triggering your first feature via the Genesis Prompt](02_Genesis.md).
