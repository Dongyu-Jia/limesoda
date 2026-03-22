# User Guide: 09. Infrastructure: Cluster Health

While **Task Management** handles project-specific work, **Cluster Health** provides a global view of the Limesoda orchestration engine's underlying infrastructure.

## 1. Real-time Node Map
The Limesoda engine runs on a distributed cluster of compute nodes. The **Node Map** provides:
- **Node Status:** Visual green/red indicators for every active runner.
- **Geographic Distribution:** Metadata showing where nodes are currently localized (e.g., `US-CENTRAL-1`).
- **Load Balancing:** Visibility into how genesis prompts are being distributed across the compute fabric.

## 2. Infrastructure Metrics
Track the performance and efficiency of the orchestrator:
- **Total CPU Compute:** Aggregate processing power active across the cluster.
- **Orchestration Latency:** The P99 time for an EM Agent to route a task between phases.
- **Nodes Online:** Real-time count of healthy runners prepared for agent execution.

## 3. System Integrity Checks
Limesoda continuously monitors its own internal dependencies:
- **Auth Vault (KMS):** Confirms that cloud secret encryption and decryption is functional.
- **GitHub Webhooks:** Verifies the connection to the GitHub Event Bus.
- **Postgres Pool:** Monitors the project metadata database connection health.
- **EM Backlog:** Indicates if the Epistemic Manager is falling behind on task routing logic.

---

> [!NOTE]
> If a System Integrity check fails (turns red), Limesoda may automatically halt active pipelines to prevent data inconsistency. See **[Troubleshooting](07_Troubleshooting.md)** for recovery steps.
