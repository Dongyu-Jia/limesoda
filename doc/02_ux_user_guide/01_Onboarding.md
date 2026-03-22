# User Guide: 01. Getting Started & Onboarding

To start orchestrating software with Limesoda, you must first connect your development infrastructure and project repositories.

## 1. Project Management
From the Limesoda Dashboard, you can manage your entire portfolio of AI-driven software.

### Side-bar Navigation
All core modules are accessible via the **Sidebar**:
- **Task Management**: Real-time agent registry and intervention.
- **Human TODO**: Your personal accountability inbox.
- **Cluster Health**: Infrastructure and orchestration engine status.

### Create a New Project
Click the **New Project** button, located at the **bottom of the Sidebar**.
1. **Internal Codename:** Give your project a name (e.g., `Project-Zeus`).
2. **Repository Binding:** Connect your GitHub account and select the target repository. Limesoda requires write access for **Issues**, **Pull Requests**, and the `doc/` workspace.

## 2. Infrastructure & Team Setup
Once your project is linked, you must configure two critical layers:

### 🛡️ Global Secrets
Limesoda requires cloud permissions to execute deployments. Use the **Infrastructure** tab to vault your Gemini/OpenAI keys and GCP Service Accounts.
> **See Deep Dive:** [Infrastructure Secrets](05_Infrastructure_Secrets.md)

### 👥 Team Mapping
The Engineering Manager (EM) Agent needs to know who to notify for PR reviews and escalations.
- Go to **Team Settings** and add engineers by their GitHub Username.
- Assign the **Human Tech Lead** role to designate the primary reviewer.

---
**Next Step:** [Triggering your first feature via the Genesis Prompt](02_New_Feature.md).
