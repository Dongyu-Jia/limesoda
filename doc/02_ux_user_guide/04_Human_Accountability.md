# Limesoda User Guide: Human Accountability

## 1. The TODO Dashboard
The **Human TODO** page is your centralized inbox for all items requiring human intervention. It ensures that the AI never gets stuck without a clear path forward.

### Categories:
- **Human Review**: Procedural PRD, LLD, or code sign-offs.
- **Loop Escalations**: Critical failures where an agent is trapped in a logical loop.
- **Infra & Quota**: Cluster health issues or model credit exhaustion.

## 2. GitHub-Native Workflow
While the dashboard provides visibility, Limesoda is **GitHub-Native**. Most interactions occur directly in your repository.

### Issue Lifecycle
1. **Genesis**: The EM Agent creates an issue for every task in the SDLC.
2. **Assignment**: Agents are assigned to issues; status updates are reflected in the registry.
3. **Closure**: Once an agent (or human) closes an issue, the pipeline advances.

### Pull Requests & Approvals
When an agent finishes an artifact (e.g., a PRD or a React component), it opens a **GitHub Pull Request**.
- **Review Requests**: Limesoda explicitly requests review from the mapped **Human Tech Lead**.
- **Merging**: Merging a PR signifies human "Gate Approval" and triggers the next procedural phase in the graph.

---
**Next Step:** [Managing Global App Secrets](05_Infrastructure_Secrets.md).
