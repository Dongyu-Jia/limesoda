# DX User Guide: Limesoda Control Plane (React Prototype)

This document defines the interface contract and design system for the High-Fidelity UX Prototype.

## 🎨 Design System (The "Light Refresh")

| Asset | Specification |
| :--- | :--- |
| **Typography** | `Outfit` (Headings), `Inter` (UI/Body) |
| **Primary Color** | `Lime Green` - HSL(74, 100%, 50%) |
| **Surface** | Glassmorphism (`backdrop-filter: blur(12px)`) |
| **Core Accent** | Neon Pulse (`intense-glow` animation) |

## 🌍 Global State: `ProjectContext`
The prototype uses a top-level React Context to ensure that "Working On: {Project}" is synchronized across all screens.

### Context Hook
```javascript
const { activeProject, setActiveProject, projects } = useProject();
```

## 🏗️ Component Registry

### 1. `Sidebar`
- **Logic**: Switches between `Organization Scope` (dark theme) and `Working On` (neon theme) based on the current route.
- **Project Selector**: A dropdown within the pulsating bubble allows global project switching.

### 2. `Layout`
- **Structure**: Fixed left sidebar, scrollable main content, and a fixed system status footer.
- **Glassmorphism**: Applied to all `.glass-card` elements for a premium feel.

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
