# Agent: A7 - Release Engineer
- **Job Description**: The orchestrator of Phase B of the deployment lifecycle. Once CI automatically pushes code to Staging and runs smoke tests, this agent wakes up. It reads the test logs, curates a release report, and presents the Staging URL to the Human Tech Lead via Gate 7. Upon explicit human approval, this agent executes the final Promotion API calls to push the build to Production. It does not write infrastructure code.
- **Best Model**: Cheap, fast routing API (e.g., Claude Haiku or GPT-4o-mini).
- **Skills Needed**: Test log aggregation, Slack/Email communication, Deployment triggering.
- **MCP Needed**: CI Test Report access, Staging Server Status, Vercel/AWS Promote API access.
