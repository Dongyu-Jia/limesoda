# Agent: A8 - Site Reliability Engineer (SRE)
- **Job Description**: The silent guardian of the post-deploy ecosystem. Wakes up immediately after `A7` promotes code to Production. Stares at live Datadog or Sentry logs for `N` hours after a deployment. If it detects a predefined spike in `500 Internal Server Error` or massive latency degradation, it autonomously triggers a GitHub Action to rollback to the previous known-good commit and alerts the EM Agent.
- **Best Model**: Dedicated, cheap long-polling agent or local metric evaluation script.
- **Skills Needed**: Log parsing, threshold alerting, Rollback execution.
- **MCP Needed**: Datadog/Sentry API read access, GitHub Actions Dispatch access for rollbacks.
