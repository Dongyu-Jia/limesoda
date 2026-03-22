---
name: ux-prototype
description: P3 UX Prototyping Pipeline - Execute the full Phase 3 UX/DX prototyping workflow from PRD to human-approved interface contract.
---

# Skill: P3 UX Prototyping Execution

This skill teaches you to execute **Phase 3 (P3_UX_PROTOTYPING)** of the Limesoda SDLC. You are NOT a generic UI generator. Start CUJ one by one, after finish each CUJ, pause and ask customer opinion and propose if we should start next CUJ. Please auto reload the UI and give human a url to approve.

## Cognitive Model & Execution Playbook

You must dynamically load your instructions from the repository source code before generating anything.

### Step 1: Load Process Rules & Governance

1. Read `limesoda-doc/process/P3_UX_Prototyping.md` to internalize the 7 small processes (P3.1–P3.7), their inputs, outputs, and gate criteria.
2. Read `limesoda-doc/Repository_Governance.md` to confirm output paths (`doc/02_ux_user_guide/`, `UX_prototype/`).

### Step 2: P3.1 — Prototype Parsing

1. Read the approved PRD from `doc/01_prd/PRD.md` (or the most recent `.md` in `doc/01_prd/`).
2. Extract and list every **Critical User Journey (CUJ)** defined in the PRD.


### Step 4: P3.3 — UX Prototype 

1. Read the Generator persona from `limesoda-doc/prompts/P3_B_UX/01_Generator.md`.
2. Adopt that persona fully. Build the complete mock UI into `UX_prototype/` using a **React + Vite** stack (see `frontend-react-prototype` skill for setup).

### Step 5: P3.4 — Start Development Server

After implementing the React components, start the Vite development server. Use the `--host` and `--port 8888` flags to ensure accessibility.

Output the literal preview command and the definitive URL for the human:

```bash
cd UX_prototype && npm run dev -- --host --port 8888
```
*Note: Vite provides Hot Module Replacement (HMR). Changes to components will reflect instantly without a server restart.*

### Step 6: P3.5 — Agent Peer Review

Run the full review panel sequentially. For each reviewer, read their prompt file, adopt that persona, and produce their verdict before proceeding to the next.


**UX Review :**

4. **UX Judge** (`limesoda-doc/prompts/P3_B_UX/03_Judge.md`): Score 4 dimensions (Navigation Integrity, Feature Completeness, Aesthetic Wow Factor, Template Consistency). All must score ≥ 9. Output `{"status": "APPROVED"}` or `{"status": "REJECTED", "remediation_plan": "..."}`.

**On REJECTED verdict:**
- Follow the `remediation_plan` exactly and regenerate the failing artifact.
- Hard Limit: **3 failed attempts → halt and output the literal token `FAILURE_ESCALATE`** to wake the Human.

### Step 7: P3.6 & P3.7 — Human Review Gate (Gate 3)

After all judges output `{"status": "APPROVED"}`:

1. Present a structured summary to the human:
   - List of all CUJs covered
   - Preview command
   - Review panel verdicts
2. **STOP.** Do not proceed to Phase 4 until the human explicitly approves the interface contract.
3. Use this block to request sign-off:
4. Upon signoff update `doc/02_ux_user_guide/0x_cuj_name.md` with the CUJ expansion and UI mockups.


## Key Rules

Start CUJ one by one, after finish each CUJ, pause and ask customer opinion and propose if we should start next CUJ. Please auto reload the UI and give human a url to approve.
