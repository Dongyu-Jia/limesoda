# DX User Guide: Limesoda Control Plane

This document defines the interface contract and design system for the High-Fidelity UX Prototype.

## 🛤️ Critical User Journeys (CUJs)

### CUJ 3.1: Tenant & Project Onboarding
- **Path**: `/onboarding`
- **Feature**: Multi-step wizard for project identity and infrastructure vaulting.

### CUJ 3.4: The Genesis Prompt
- **Path**: `/genesis`
- **Feature**: High-focus agent bidding area. The active project context is automatically injected into the prompt header.

### 3. `RuntimeRadar` (CUJ 3.5)
- **Logic**: Visualizes the 10-Phase SDLC sequence.
- **Phase Status Types**: `PENDING`, `IN_PROGRESS`, `COMPLETED`, `FAILED`, `PAUSED`.
- **Agent Object**:
  ```json
  {
    "id": "A3",
    "role": "Developer",
    "task": "Component Implementation",
    "issue": "#42",
    "retries": 1
  }
  ```

---
*Note: This is a living document tied to the `/UX_prototype` Vite application.*
