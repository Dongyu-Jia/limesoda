# Process: P9 - DevOps & Deployment
- **Unique ID**: `P9_DEVOPS_DEPLOY`
- **Goal**: Safely deploy the merged Milestone code through Staging environments, verify it via End-to-End (E2E) testing and Human UAT, and finally promote it to Production.
- **Input**: The completely merged `main` branch from `P8_PEER_REVIEW` for the active Milestone.
- **Output**: A live Production URL, verified by E2E tests, with active SRE monitoring.
- **Criteria**: Human explicitly signs off on the Staging environment before Production promotion (Gate 7).

## Phase A: Infrastructure Scaffolding (Infra Engineer Agent)
Before the recurring Deployment loop can function, the **Infra Engineer Agent** must scaffold the foundational infrastructure (typically executed as Tier 0 setup in Milestone 1):
1. `P9.A.1_CI_PIPELINE_GEN`: Writing the immutable `yaml` files (e.g., GitHub Actions) that enforce the P8 Peer Review checks and dictate the Auto-Push rules to Staging.
2. `P9.A.2_ENV_PROVISIONING`: Setting up strict, isolated environments (`Staging` $\rightarrow$ `Production`). Staging must precisely mirror Production infrastructure (databases, secrets manager).
3. `P9.A.3_E2E_INFRA_SETUP`: Installing and configuring the automated End-to-End browser testing framework (e.g., Playwright) in the CI runner.
4. `P9.A.4_CADENCE_ONCALL`: Defining the deployment batch rules (Continuous vs Batched) and configuring SRE monitoring alerts (e.g., PagerDuty, Datadog) for the eventual live app.

## Phase B: The Release Pipeline (CI Automation & Release Agent)
Once a Milestone is fully merged, the pre-built CI pipeline takes over the heavy lifting. The **Release Engineer Agent** wakes up only to orchestrate the test results, human gates, and the final promotion:
1. `P9.B.1_AUTOPUSH_STAGING`: **(100% CI Automation)** The CI pipeline detects a merge to `main` and automatically pushes the code to the Staging environment. No AI agents are involved here.
2. `P9.B.2_AUTOMATED_E2E_SMOKE`: **(100% CI Automation)** The CI pipeline runs the Playwright/Cypress E2E Smoke Tests against the live Staging URL. No AI agents are involved here.
3. `P9.B.3_HUMAN_UAT_CURATION`: **User Acceptance Testing (Gate 7).** If the automated tests pass, the **Release Agent** wakes up. It reads the test logs, curates a release report, and sends the Staging URL to the Human Tech Lead. The human explores the live app and explicitly clicks `APPROVE` or `REJECT`.
4. `P9.B.4_PROMOTE_PRODUCTION`: Upon human UAT approval, the Release Agent executes the official promotion of the built artifact to the live Production environment.
5. `P9.B.5_POST_DEPLOY_HANDOFF`: The Release Agent hands off to the **SRE Agent** (Site Reliability Engineer), which passively monitors logs for `N` hours post-deployment, autonomously triggering a rollback if it detects a predefined spike in 500 errors.
