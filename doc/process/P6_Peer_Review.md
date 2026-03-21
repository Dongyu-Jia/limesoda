# Process: P6 - Peer Review
- **Unique ID**: `P6_PEER_REVIEW`
- **Goal**: Auto-validate PR against PRD constraints and security rules.
- **Input**: The opened GitHub PR from `P5_IMPLEMENTATION`.
- **Output**: Approved PR or requested changes with inline comments.
- **Criteria**: 100% Tests Pass, QA Agent explicit approval, zero Linter violations.
## Small Processes:
1. `P6.1_CI_RUN`: GitHub Actions run unit tests & linters.
2. `P6.2_QA_EVALUATION`: QA Agent analyzes diff for security and code smells.
3. `P6.3_FEEDBACK_LOOP`: Dev Agent applies requested changes (max 3 loops).
4. `P6.4_EM_TRIAGE`: EM Agent routes to autonomous merge or human review.
