# User Guide: 05. Production & Feedback Loops

Limesoda’s value doesn't end when your code is merged. The system monitors your production environment to ensure the software stays "Stable" and "Value-Aligned."

## Phase 8: Deployment (Automated CI/CD)
Once Phase 7 code is approved, the **DevOps Agent** generates the Terraform or Docker manifests. Limesoda manages the deployment secrets and triggers your GitHub Actions / GitLab Runners.

## Phase 9: Runtime Observability
Limesoda injects **Sentry / DataDog / CloudWatch** tracing into your app.
- It tracks the **SLOs** defined in Phase 4 (e.g. Is latency actually < 200ms?).
- It reports these metrics directly back to the **Limesoda Dashboard**.

## Phase 10: The Iterative Loop (The "Self-Healer")
If Phase 9 detects a production crash or a performance bottleneck:
1. The **Phase 10 Architect Agent** parses the stack trace.
2. It determines if the failure was a technical bug or a design flaw.
3. It routes the project back to the correct Phase (e.g. Redesigning the Architecture in Phase 4).

### The Model Upgrade Protocol
During a production-critical iteration, the EM Agent automatically **upgrades** the reasoning capacity:
- Swaps the active LLM from a "Flash" model to a high-reasoner "Pro" model.
- Drops temperature to `0.0` for maximum precision.
- Pre-loads the context with the specific Judge's remediation requirements to ensure the fix is targeted and successful.

---
**Congratulations!** You are now ready to orchestrate your first Limesoda project.
