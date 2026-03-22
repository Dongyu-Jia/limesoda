# User Guide: 06. GitHub Workflow: Issues, PRs, and Approvals

Limesoda is GitHub-native by design. The Control Plane UI is the *operator console*, but GitHub remains the durable event log and source of truth.

## 1. Issues: The Unit of Work
Every phase is decomposed into one or more GitHub Issues. The EM Agent routes work by:
- Creating issues with a clear phase prefix (e.g., `P4: Architecture`).
- Assigning the issue to an agent persona (PM/Architect/Developer) or the Human Tech Lead for gates.
- Using the **issue timeline** as the system audit log.

## 2. Pull Requests: Artifacts and Code
When an agent finishes an artifact or code change, it opens a PR:
- **Artifacts:** PRDs, RFCs, LLDs, DX guides, UX prototypes.
- **Implementation:** Source code PRs that should be reviewed like normal engineering work.

### What the agent reads
To keep the loop deterministic, assume the agent reads:
- PR title + description
- PR review comments
- Line comments (requested changes)
- Linked issues and their latest state

## 3. How Limesoda Interprets “Approval”
Different repos have different branch protections, but Limesoda’s recommended operator semantics are:
- **Approve:** Approve the PR review for the artifact/code.
- **Finalize:** Merge the PR (or let your normal merge automation do it).

If your repo policy forbids auto-merge or requires additional reviewers, that’s fine: Limesoda will wait until the PR is in an approved/merged state consistent with your governance.

## 4. Requesting Changes (Fastest Way to Converge)
When you want a revision:
1. Leave *specific, testable* constraints in PR comments (e.g., “Latency SLO must be P99 < 500ms”).
2. If needed, request changes formally via GitHub review.
3. Avoid vague feedback like “make it better”; agents converge faster on concrete acceptance criteria.

## 5. Re-runs, Retries, and “Stuck” Work
Limesoda auto-retries within configured limits (e.g., judge retries). If you need to force a re-run:
- Prefer leaving a PR comment that explicitly asks for a re-run with updated constraints.
- If the pipeline is paused, resume it after updating the artifact/code.

If a phase appears stuck:
- Check the phase issue for the latest status updates and error traces.
- Verify your GitHub auth (App/PAT) and cloud credentials are still valid.
- See [Troubleshooting](07_Troubleshooting.md) for recovery playbooks.

## 6. Parallel Work: Humans + Agents
To avoid merge conflicts and “drift”:
- Pause the pipeline if you plan to refactor core files that an agent is actively touching.
- If you must merge an urgent hotfix, link the PR to the relevant issue and leave a note so the agent can rebase/adjust.

> [!CAUTION]
> Manually merging large changes without updating the upstream artifacts (PRD/RFC/LLD) can trigger Phase 10 drift detection.
