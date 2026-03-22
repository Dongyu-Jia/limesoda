# Milestone Plan: Limesoda Control Plane

This document sequences the monolithic Architecture Checklist into logical, chronological Milestones utilizing a **Vertical Slice** strategy to ensure early value delivery.

## 🏁 Gate 5 Approved Roadmap

Each milestone delivers a testable, end-to-end user loop.

---

## 🟢 Milestone 1: Foundations & Infrastructure (Lean MVP)
**Goal**: Establish the data model and automated verification pipeline.

| Component | Priority | Dependency |
|---|---|---|
| **Database & Prisma Schema** | BLOCKER | - |
| **CI/CD: GitHub Actions (Tests)** | HIGH | - |

---

## 🔵 Milestone 2: The "Agent Flow" (Walking Skeleton)
**Goal**: High-speed AI coding loop triggered via GitHub Issues.

| Component | Priority | UI Integration |
|---|---|---|
| **Temporal Workflow Core** | BLOCKER | - |
| **Manager Agent (Triage)** | CRITICAL | - |
| **Coding Agent (Implementation)** | CRITICAL | - |
| **E2B Sandbox Manager** | HIGH | - |
| **GitHub Webhook (Issue Trigger)**| HIGH | - |

---

## 🟡 Milestone 3: Control Plane & Security (Enterprise Prep)
**Goal**: Project management, multi-tenancy, and real-time observability.

| Component | Priority | UI Integration (UX Prototype) |
|---|---|---|
| **Project CRUD API** | HIGH | `Sidebar.jsx`, `NewProject` |
| **Auth API (JWT/RBAC)** | HIGH | `Onboarding.jsx` |
| **Multi-Tenant RLS Layer** | HIGH | - |
| **Secrets Vault (KMS)** | HIGH | `Credentials.jsx` |
| **Task Registry (Visibility)** | MEDIUM | `TaskManagement.jsx` |
| **WebSocket State Bus** | MEDIUM | - |
| **Cluster Health Aggregator** | LOW | `ClusterHealth.jsx` |
| **Unified Log Sink (STDOUT)** | LOW | - |

---

## 🏗️ Post-MVP Roadmap
- **M4**: Automated TODO generation from Agent Escalate signals.
- **M5**: Phase 2-10 Agent Graph expansion.
- **M6**: GCP BigQuery Audit Dashboard.
