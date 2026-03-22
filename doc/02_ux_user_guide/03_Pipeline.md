# DX User Guide: CUJ 3.6 Pipeline Intervention

## 1. Overview
Pipeline Intervention allows humans to exert final authority over the Limesoda orchestration engine. This is critical for projects where specific phases (e.g., Security Review) must be performed by a human, or when the AI encounter a logic loop.

## 2. Global Flow Control
The `isHaltedGlobal` state in the `ProjectContext` (mocked in `Agents.jsx`) controls the master switch.
- **HALT**: All agents freeze in their current LangGraph node. No GitHub PRs are updated.
- **RESUME**: The EM Agent re-evaluates the current phase state and wakes up relevant agents.

## 3. Manual Phase Override
Each phase card in the 10-phase sidebar includes an `OVERRIDE` capability.
- **Context**: Only available when a phase is `IN_PROGRESS`.
- **Action**: Fulfilling a phase manually requires:
    - **Resource Link**: A URL to the manual artifact (e.g., a manually merged PR).
    - **Rationale**: Architectural or security justification.
- **Transition**: Upon fulfillment, the system marks the phase as `COMPLETED (MANUAL)` and automatically advances execution to the next procedural stage.

## 4. Visual States
| State | Indicator | Rationale |
| :--- | :--- | :--- |
| **Halted** | Red Pulse + Badge | Global kill-switch active. |
| **Awaiting Human** | Violet Badge | Phase requires explicit human input before AI continues. |
| **Manual Override** | Gray Label | Phase was fulfilled by a human tech lead. |
