# User Guide: 07. Troubleshooting & Recovery Playbooks

This page is written for the operator (Human Tech Lead / Org Lead) when something goes wrong.

## 1. “Scope Insufficient” (GitHub Auth)
Symptoms:
- Onboarding fails with “Scope Insufficient”.
- Limesoda can read but cannot create issues/PRs or write `doc/` files.

Fix:
1. If using the **GitHub App**, confirm it is installed on the org and granted access to the target repo.
2. If using a **PAT**, ensure it is scoped to the target repo(s) with read/write access for **Issues**, **Pull Requests**, and **Contents**.
3. Re-run repository binding from the dashboard.

## 2. Invalid/Expired Cloud Key (Vaulting Fails)
Symptoms:
- A specific environment key is highlighted red; vaulting blocks progression.

Fix:
1. Rotate the affected environment credential (Dev/Test/Staging/Prod).
2. Re-upload the key in **Project Settings > Infrastructure**.
3. If deployments already ran, re-check Phase 8/9 output to ensure the environment can still be accessed.

## 3. Repeated Judge Rejections (Phase Turns Red)
Symptoms:
- Phase node turns red; you see repeated “retry” loops.

Fix:
1. Open the latest PR and read Judge feedback.
2. Leave precise constraints in PR comments (what to change, and how you’ll judge success).
3. If the agent is thrashing, pause and manually fulfill the artifact (see `04_Monitoring.md`).

## 4. Hard Limit Reached (Pipeline Halts)
Symptoms:
- The EM indicates a hard stop (e.g., repeated redesign failures).

Fix:
1. Pause execution (if not already paused).
2. Decide whether the design needs to change upstream:
   - Update `PRD.md` if the scope is wrong.
   - Update `Architecture_RFC.md` / `Component_LLD.md` if the constraints are infeasible.
3. Manually approve the fixed phase or resume execution to let the pipeline re-route.

## 5. Drift Detection (Phase 10)
What drift means:
- The repo changed in a way that no longer matches the approved artifacts (PRD/RFC/LLD), often due to manual merges or emergency refactors.

Recovery playbook:
1. Identify the “source of truth” you want going forward (the codebase or the docs).
2. If code is correct: update the upstream artifacts to match reality (PRD/RFC/LLD), then manually approve the relevant phase(s).
3. If docs are correct: revert/adjust the code to match the approved contracts, then re-run the downstream phases.

## 6. Missing Notifications (No Review Request)
Symptoms:
- A PR was opened but you did not get a GitHub review request.

Fix:
1. Confirm **Team Mapping** has the correct GitHub username for the Human Tech Lead.
2. Confirm your GitHub notification settings allow review requests.
3. If you use CODEOWNERS/branch protections, confirm they are not blocking automated review requests.

## 7. Rate Limiting / GitHub 429
Symptoms:
- Agents stall; issues mention HTTP 429 / rate limiting.

Fix:
1. Wait for backoff to complete (Limesoda should retry automatically).
2. If persistent, reduce parallelism (pause, or reduce concurrent runs) and ensure auth is not shared across too many repos.
