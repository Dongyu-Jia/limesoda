# User Guide: 08. Security, Privacy, and Auditability

This section clarifies what Limesoda stores, who can access it, and how to operate safely in regulated environments.

## 1. Secret Vaulting and Encryption
Limesoda may require credentials for:
- GitHub (App installation or PAT)
- Cloud providers (GCP/AWS) for Deployment/Observability phases

Operational guarantees (intended behavior):
- Secrets are encrypted at rest (KMS-backed).
- Secrets are never committed into your repository.
- Environment bindings are isolated (Dev/Test/Staging/Prod).

Recommended practices:
- Prefer GitHub App over PAT.
- Use least-privilege cloud identities (separate service accounts per environment).
- Rotate credentials periodically and after any suspected exposure.

## 2. Log Visibility (Including Agent Reasoning)
The Control Plane can surface execution logs to help operators debug failures.

Important expectations:
- Treat logs as potentially sensitive (they may include file paths, error traces, and design context).
- Do not paste secrets into prompts, PR comments, or artifacts.

## 3. Access Control
RBAC is enforced at the Control Plane level:
- Org-level actions (team mapping, infra vaulting) are restricted to Organization Leads (and System Admins).
- Project-level approvals and overrides are restricted to the Human Tech Lead.

## 4. Audit Trail
Limesoda’s audit trail is designed to be reconstructible from GitHub:
- Issues: task routing and status history
- PRs: artifacts and code diffs
- Reviews: human approvals and requested changes

For incident response, your primary evidence sources should be GitHub issue timelines + PR review history.
