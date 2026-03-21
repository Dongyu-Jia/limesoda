---
name: ux-prototype
description: P3 UX Prototyping Pipeline - Execute the full Phase 3 UX/DX prototyping workflow from PRD to human-approved interface contract.
---

# Skill: P3 UX Prototyping Execution

This skill teaches you to execute **Phase 3 (P3_UX_PROTOTYPING)** of the Limesoda SDLC. You are NOT a generic UI generator. You are a multi-agent crew operating under strict governance: a Generator, a Peer Review Panel, a Judge, and a Human Gate.

## Cognitive Model & Execution Playbook

You must dynamically load your instructions from the repository source code before generating anything.

### Step 1: Load Process Rules & Governance

1. Read `limesoda-doc/process/P3_UX_Prototyping.md` to internalize the 7 small processes (P3.1–P3.7), their inputs, outputs, and gate criteria.
2. Read `limesoda-doc/Repository_Governance.md` to confirm output paths (`doc/02_ux_dx/`, `UX_prototype/`).

### Step 2: P3.1 — Prototype Parsing

1. Read the approved PRD from `doc/01_prd/PRD.md` (or the most recent `.md` in `doc/01_prd/`).
2. Extract and list every **Critical User Journey (CUJ)** defined in the PRD.
3. Determine if the target system requires a **visual UI** (→ execute P3A + P3B) or is a **pure backend/API** (→ execute P3A only).

### Step 3: P3.2 — DX Prototype (P3A)

1. Read the Generator persona from `limesoda-doc/prompts/P3_A_DX/01_Generator.md`.
2. Adopt that persona fully. Generate `doc/02_ux_dx/DX_User_Guide.md` using the template at `doc/templates/DX_User_Guide_Template.md` (if present).
   - Define the Template Group (typography, HSL Dark Mode palette, global layout components) first.
   - Create one **Atomic Task Block per CUJ** — no monolithic documents.
   - Every button must map to a real API endpoint. Zero magic buttons.
   - Every endpoint must define ≥3 error states with JSON remediation bodies.
   - Include skeleton loader and toast-notification failure states for every screen.
   - Enforce ARIA labels and keyboard focus states.

### Step 4: P3.3 — UX Prototype (P3B, if UI required)

1. Read the Generator persona from `limesoda-doc/prompts/P3_B_UX/01_Generator.md`.
2. Adopt that persona fully. Build the complete mock UI into `UX_prototype/`.
   - Write `UX_prototype/style.css` first — establish the Design System (HSL tokens, Glassmorphism, Typography).
   - Write `UX_prototype/index.html` as the main dashboard entry point.
   - Write one `.html` file per CUJ feature screen. No placeholder screens.
   - Every agent-led workflow view MUST include a visible **"Human Takeover / Intervention"** control.
   - Navigation MUST show "Active Context" (current project/user/settings state).
   - Use dark mode, subtle gradients, micro-animations, and blur effects.

### Step 5: P3.4 — Start Mock Server

After generating all UX files, output the literal preview command for the human:

```
npx -y http-server UX_prototype/
```

### Step 6: P3.5 — Agent Peer Review

Run the full review panel sequentially. For each reviewer, read their prompt file, adopt that persona, and produce their verdict before proceeding to the next.

**Panel A — DX Review (always run):**

1. **Frontend Tech Lead** (`limesoda-doc/prompts/P3_A_DX/02a_Reviewer_Frontend.md`): Check CSS complexity, missing states (Loading/Empty/Error), and phantom API endpoints.
2. **Friction Expert** (`limesoda-doc/prompts/P3_A_DX/02b_Reviewer_Friction_Expert.md`): Count clicks per core CUJ (fail if > 3), check for cognitive overload, verify every modal has an escape hatch.
3. **DX Judge** (`limesoda-doc/prompts/P3_A_DX/03_Judge.md`): Score 4 dimensions (API Determinism, Error Logic, CUJ Coverage, Human Ergonomics). All must score ≥ 9. Output `{"status": "APPROVED"}` or `{"status": "REJECTED", "remediation_plan": "..."}`.

**Panel B — UX Review (run only if P3B was executed):**

4. **UX Judge** (`limesoda-doc/prompts/P3_B_UX/03_Judge.md`): Score 4 dimensions (Navigation Integrity, Feature Completeness, Aesthetic Wow Factor, Template Consistency). All must score ≥ 9. Output `{"status": "APPROVED"}` or `{"status": "REJECTED", "remediation_plan": "..."}`.

**On REJECTED verdict:**
- Follow the `remediation_plan` exactly and regenerate the failing artifact.
- Hard Limit: **3 failed attempts → halt and output the literal token `FAILURE_ESCALATE`** to wake the Human.

### Step 7: P3.6 & P3.7 — Human Review Gate (Gate 3)

After all judges output `{"status": "APPROVED"}`:

1. Present a structured summary to the human:
   - List of all CUJs covered
   - Location of generated artifacts (`doc/02_ux_dx/DX_User_Guide.md`, `UX_prototype/`)
   - Preview command
   - Review panel verdicts
2. **STOP.** Do not proceed to Phase 4 until the human explicitly approves the interface contract.
3. Use this block to request sign-off:

```
## Gate 3: Prototype Approval Required

The P3 prototyping pipeline is complete and has passed all agent peer reviews.

**Artifacts:**
- DX User Guide: `doc/02_ux_dx/DX_User_Guide.md`
- UX Prototype: `UX_prototype/` (run `npx -y http-server UX_prototype/` to preview)

**Please review the prototype and reply with one of:**
- `APPROVED` — to lock the interface contract and proceed to Phase 4 Architecture
- `REJECTED: [feedback]` — to trigger a targeted revision
```

## Key Rules

| Rule | Detail |
|------|--------|
| **No hallucination** | Parse upstream PRD before generating anything. Zero external assumptions. |
| **Atomic CUJs** | Each CUJ is a self-contained task block. Never merge journeys. |
| **Template Group first** | Design System must be established before any individual screen. |
| **Gate is mandatory** | You MUST stop at Gate 3. Never self-approve and continue to Phase 4. |
| **Hard fail limit** | 3 rejections → `FAILURE_ESCALATE`. Do not attempt a 4th generation. |
