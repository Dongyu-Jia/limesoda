# Quality Metrics & Evaluation Criteria

This document defines the heuristics and rules the AI Agents (specifically the QA, Architect, and EM Agents) use to mathematically and logically evaluate the outputs of the production phases. 

## 1. How do we know a PRD is good?
A PRD is only approved by the EM Agent when it leaves zero ambiguity for the Architect and Developer agents.
- **MECE (Mutually Exclusive, Collectively Exhaustive):** The PRD must cover the "Happy Path" as well as all "Sad Paths" (e.g., rate limits hit, invalid inputs, network failures).
- **Testable Acceptance Criteria:** Every User Story must have binary, testable criteria. 
    - *Bad:* "The user can log in."
    - *Good:* "Given a valid email and an incorrect password, the system returns an HTTP 401 Unauthorized with a JSON error message."
- **Explicit Out-of-Scope Definitions:** The PRD explicitly lists what features are *not* being built to prevent AI scope hallucination.

## 2. How do we know an Architecture Design is good?
A Technical Design Document (RFC) is approved when it provides rigid, unbreakable contracts that allow independent Developer Agents to work in parallel.
- **Contract Completeness:** API Data shape (e.g., OpenAPI/Swagger specs) and Database Schemas (e.g., SQL DDL or Prisma Schemas) must be explicitly typed out before approval.
- **Separation of Concerns:** The architecture cleanly separates Business Domain Logic from Infrastructure concerns (e.g., no raw SQL queries inside Frontend React components).
- **Scalability & Security Posture:** The design actively mitigates known anti-patterns (e.g., N+1 query problems) and defines Role-Based Access Control (RBAC) securely.

## 3. How do we know a Pull Request (PR) is good?
A PR is approved by the QA Agent / EM Agent when it is mathematically provable to be safe and atomic.
- **Atomic Intent:** The PR does exactly *one* thing. A single PR must never mix a feature addition, a bug fix, and 50 formatting changes.
- **Deterministic Testing:** The PR includes Unit Tests that assert the exact Acceptance Criteria from the PRD. These tests must use mocks for external services so they are 100% deterministic (no flaky CI).
- **Zero Static Violations:** The code passes strict CI linters, type checkers (e.g., strict TypeScript), and SAST (Static Application Security Testing) scanners with zero warnings.
- **Maintainability (No Code Smells):** The diff demonstrates adherence to DRY (Don't Repeat Yourself) and SOLID principles, avoiding massive monolithic functions.
