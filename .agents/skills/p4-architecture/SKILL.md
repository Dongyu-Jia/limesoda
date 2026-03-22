---
name: p4-architecture
description: P4 Architecture Design — Generate a system Architecture RFC by running the full Generator → 5 Reviewers → Judge → retry loop and saving the approved artifact.
---

# Skill: P4 Architecture Design

## What This Skill Does
Executes Phase 4 of the Limesoda SDLC. Reads the approved PRD and UX/DX guides, drafts an Architecture RFC, passes it through five independent reviewers and a judge, retries on rejection (max 3), and saves the approved document to `doc/03_system_architecture/Architecture_RFC.md`.

---

## Pre-Conditions (Check Before Starting)
1. `doc/01_prd/` must contain an approved PRD — if missing, run P2 first.
2. `doc/02_ux_user_guide/` must contain UX guides — if missing, run P3 first.
3. `doc/03_system_architecture/Architecture_RFC.md` must NOT already exist — if it does, ask the human if they want to regenerate it.

---

## Inputs to Read Before Generating
Load all of the following into context before writing a single word of the RFC:

```
doc/01_prd/                         ← approved PRD (CUJs, NFRs, RBAC)
doc/02_ux_user_guide/               ← all UX guides (every CUJ flow)
doc/02_dx_user_guide/               ← DX API guide
templates/Architecture_RFC_Template.md   ← output structure
prompts/P4_Architecture/01_Generator.md  ← your generator persona
prompts/P4_Architecture/02a_Reviewer_Security.md
prompts/P4_Architecture/02b_Reviewer_Data.md
prompts/P4_Architecture/02c_Reviewer_Simplicity.md
prompts/P4_Architecture/02d_Reviewer_SRE.md
prompts/P4_Architecture/02e_Reviewer_Product_Architect.md
prompts/P4_Architecture/03_Judge.md
```

Also read any prior decisions in the `doc/` workspace (e.g., open source strategy, engine prototypes) to ensure the architecture reflects work already done.

---

## Execution Loop

### Step 1 — Generate
Adopt the persona in `01_Generator.md`. Draft the Architecture RFC strictly following `Architecture_RFC_Template.md`. Every section must be concrete:
- Prisma schema with exact field types, indexes, and foreign keys
- Mermaid diagram showing every major component and data flow
- OpenAPI endpoint specs with typed request/response bodies
- Exact infrastructure (named services, not "a cloud thing")
- Hard SLO numbers from the PRD NFRs

### Step 2 — Review (run all five sequentially)
Adopt each reviewer persona and audit the draft:

| Reviewer | File | Checks |
|----------|------|--------|
| Security Lead | `02a_Reviewer_Security.md` | KMS vaulting, JWT on all endpoints, rate limiting |
| Database Admin | `02b_Reviewer_Data.md` | Indexes, N+1 traps, cascade strategies |
| YAGNI Enforcer | `02c_Reviewer_Simplicity.md` | No microservice madness, no reinventing wheels |
| SRE Lead | `02d_Reviewer_SRE.md` | SLOs, capacity math, cost reality |
| Product Architect | `02e_Reviewer_Product_Architect.md` | CUJ coverage, extensibility, phased rollout |

### Step 3 — Judge
Adopt the Judge persona (`03_Judge.md`). Score all four dimensions (≥9 to pass). Output:
- **APPROVED** → proceed to Step 4
- **REJECTED** → provide `remediation_plan`, increment retry counter, return to Step 1
- **FAILURE_ESCALATE** → if retry count ≥ 3, stop and notify the human

### Step 4 — Save & Gate
1. Save the approved RFC to `doc/03_system_architecture/Architecture_RFC.md`

