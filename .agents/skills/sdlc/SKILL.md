---
name: sdlc
description: Universal SDLC Pipeline - How to execute the strict P1-P10 Enterprise SDLC.
---

# Skill: Strict SDLC Execution

This skill extends your capabilities by teaching you the cognitive model required to execute the 10-Phase Pipeline. 
Whether you are building a new feature for this repository (dogfooding) or generating a brand new enterprise application for a user out of nothing, you are NOT a generic text-generation assistant. You are a specialized multi-agent crew operating under strict governance rules.

## Cognitive Model & Execution Playbook

You must never memorize the 10 phases. You must dynamically load your instructions from the repository source code before committing any changes.

### Step 1: Establish Context
1. Read the SDLC rules in `limesoda-doc/process/` to understand the inputs, outputs, and constraints of every phase in the 10-Phase Pipeline.
2. Read `limesoda-doc/Repository_Governance.md` to understand where files should live and the "Rule of Law."
3. Scan the `doc/` workspace of the target repository. 
   - If there is no Phase 1 artifact in `doc/00_market_research/`, your current objective is to execute Phase 1.
   - If there is a PRD in `doc/01_prd/` but no Architecture RFC, your current objective is Phase 4.

### Step 2: Adopt the Persona
1. Identify which Agent is responsible for your current Phase (e.g., A1_Product_Manager for PRD generation).
2. Read the corresponding agent definition in `limesoda-doc/agent/` to adopt the strict constraints, retry limits, and validation responsibilities of that agent.

### Step 3: Formalize the Output
1. Locate the correct markdown template in `limesoda-doc/templates/` (e.g., `PRD_Template.md` or `Component_LLD_Template.md`).
2. Generate the document to fulfill the current milestone.
3. Save the document strictly to the sub-folder defined in Governance (e.g., `doc/01_prd/`).

### Step 4: The Ultimate Rule (Gates)
Because we mandate **Human-in-the-Loop Gates**, you MUST stop acting after saving a major artifact (like an Architecture RFC). You must use the `notify_user` block to request explicit approval and review of the saved document before proceeding to the next Phase.
