# Contributing to Limesoda

Welcome to the Limesoda project! This document outlines our project structure, documentation standards, and the 10-phase SDLC process to ensure all contributors (human and AI) stay synchronized.

## 🗺️ Documentation Map (Sources of Truth)

All critical project decisions and technical designs are stored in the `doc/` directory.

| Category | File / Path | Purpose |
|---|---|---|
| **Product** | `doc/01_prd/` | High-level vision, CUJs, and NFRs. |
| **UX / DX** | `doc/02_ux_user_guide/` | Human-approved user interfaces and API designs. |
| **Architecture** | `doc/03_system_architecture/Architecture_RFC.md` | System design, infra, and "Unified" principles. |
| **Milestones** | `doc/04_milestone_plan/Milestone_Plan.md` | Logical sequencing of features (Vertical Slices). |
| **Backlog** | `doc/05_issue_backlog/` | Granular GitHub issues for upcoming work. |

---

## 🏗️ Technical Schemas

We follow a "Schema-First" methodology. Modify these files **before** implementing features:

*   **API Contract**: `schema/proto/control_plane.proto` (Protocol Buffers)
*   **Database Schema**: `schema/prisma/schema.prisma` (Prisma / PostgreSQL)

---

## 🛠️ Local Development

*   **Backend**: Python 3.12 (FastAPI + Temporal SDK)
*   **Frontend**: React + Vite + Vanilla CSS
*   **Orchestration**: Temporal Server (Docker)
*   **Sandboxes**: E2B Core (Docker or Managed Cloud)

To generate the database clients locally after modifying the schema:
```bash
prisma generate --schema=schema/prisma/schema.prisma
```
