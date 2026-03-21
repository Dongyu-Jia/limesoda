# Process: P7 - DevOps & Deployment
- **Unique ID**: `P7_DEVOPS_DEPLOY`
- **Goal**: Formally merge code and deploy to Cloud infrastructure.
- **Input**: Approved PR from `P6_PEER_REVIEW` and Human approval (if high risk).
- **Output**: A live URL and deployment status.
- **Criteria**: Successful completion of Terraform apply or equivalent CD pipeline.
## Small Processes:
1. `P7.1_HUMAN_MERGE`: Human explicitly approves the PR on GitHub (Gate 5).
2. `P7.2_SCAFFOLD_INFRA`: Infra Agent updates Docker/GCP configs.
3. `P7.3_DEPLOY_EXECUTION`: CI applies deployment to staging/production.
