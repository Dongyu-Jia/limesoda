# Open Source Strategy: Limesoda
**Date:** March 2026
**Author:** Dongyu Jia
**Status:** Draft

---

## 1. Strategic Intent

Limesoda's open source strategy follows the **Open Core** model. The orchestration engine, SDLC framework, agent skills, and control plane UI are open source and self-hostable. The managed cloud platform — multi-tenancy, credential vaulting, enterprise auth, and billing — is proprietary.

The goal of open sourcing is **distribution**, not charity. Developers who self-host become the pipeline for enterprise buyers. Community-contributed agent skills grow the ecosystem's value for everyone.

**What is not the moat:** The engine code, the UI, the prompts.

**What is the moat:** Running it reliably at scale for multiple orgs, the managed vault, the trusted GitHub App, and SLA support.

---

## 2. The Boundary: Public vs. Private

### 2.1 Public Repository (`github.com/*/limesoda`)

| Component | Scope | Rationale |
|-----------|-------|-----------|
| `/ui` | React control plane (full) | Drives adoption; UI is not a competitive advantage |
| `/engine` | FastAPI + LangGraph orchestration server (single-tenant) | Required for self-hosting to work |
| `/skills` | Agent skill templates (`.agents/skills/`) | Community contributes new skills; grows ecosystem |
| `/limesoda-doc` | Methodology docs, prompts, templates | Thought leadership; prompts are not the moat at this stage |
| `/doc` | SDLC output workspace structure | Defines the GitHub-native workflow contract |

### 2.2 Private Repository (`github.com/*/limesoda-cloud`)

| Component | Scope | Rationale |
|-----------|-------|-----------|
| `/platform` | Multi-tenant auth, org/project management, row-level DB isolation | The SaaS layer; expensive to operate |
| `/vault` | KMS-backed credential storage (GCP SA keys, GitHub PATs, API keys) | High-liability; security model must not be publicly probed |
| `/audit` | Audit log service (secret access, approval events) | Compliance feature; enterprise buyers pay for this |
| `/billing` | Stripe integration, subscription management | Not relevant to self-hosters |
| `/enterprise` | SSO / SAML / SCIM, advanced RBAC, cross-org metrics | Enterprise upsell tier |
| `/infra` | GCP Terraform, service account configs | Exposes cloud topology |

### 2.3 The Rule

> If a solo developer self-hosting for their own team needs it to run, it's public.
> If it only makes sense when Limesoda is running the server for other people's data, it's private.

---

## 3. Self-Hosted Architecture

The public repo must ship a working `docker-compose.yml` that gives a self-hoster a complete single-org instance:

```
Services (all open source):
  limesoda-ui        React control plane            :3000
  limesoda-engine    FastAPI + LangGraph server      :8000
  postgres           State persistence
  redis              Job queue / async task runner

Self-hoster provides:
  GitHub PAT or GitHub App installation
  GCP Service Account keys (stored locally, not in Limesoda vault)
  LLM API keys (GEMINI_API_KEY, OPENAI_API_KEY)
```

The cloud product runs the same engine wrapped in the private platform layer, with the vault replacing local `.env` credential management.

---

## 4. The Prompts Decision

`limesoda-doc/prompts/` contains 50+ generator, reviewer, and judge prompts covering all 10 SDLC phases.

**Decision: Open source all prompts.**

Rationale:
- At this stage, prompt secrecy costs more adoption than it protects
- The methodology (`Core_Ontology.md`, `SOP_and_Checkpoints.md`) is the real IP — the prompts are an expression of it, not the source
- Opening prompts invites community improvement; better prompts make the engine better for cloud customers too
- Competitors can reconstruct the prompts with moderate effort; iteration velocity is the real moat

Revisit this decision if a materially differentiated proprietary prompt set emerges post-launch.

---

## 5. Adoption Strategy

Getting to adoption requires clearing one prerequisite first: **a working demo.**

Stars, HackerNews posts, and contributor interest are all downstream of someone being able to run the thing and experience the value in under 10 minutes.

### 5.1 Prerequisites Before Going Public

- [ ] Working `docker compose up` (engine + UI + DB)
- [ ] End-to-end demo: genesis prompt → P1 market research → P2 PRD output
- [ ] Real README: what it is, why it exists, quick start, architecture diagram
- [ ] `CONTRIBUTING.md` that explains the Rule of Law (no code without LLD) for contributors
- [ ] `COMMERCIAL.md` or equivalent that defines the open core boundary

### 5.2 Distribution Channels

| Channel | Action | Expected outcome |
|---------|--------|-----------------|
| HackerNews `Show HN` | Post when demo is ready | 200–1k stars, first wave of users |
| LangChain / LangGraph Discord | Contribute first, then share | Practitioners who already use the stack |
| Technical blog posts | "Why AI code gen fails without a validation ladder" | SEO, thought leadership, shareable |
| r/LocalLLaMA, r/MachineLearning | Post architecture deep-dive | AI tooling audience |
| GitHub trending | Good README + demo = algorithmic boost | Passive discovery |

### 5.3 The Contributor Flywheel

Tag 5–10 issues as `good first issue` — specifically new agent skill definitions and SDLC phase templates. These require writing prompts + LLDs, not deep backend knowledge. Low barrier to entry, high value to the ecosystem.

Respond to every issue and PR within 24 hours for the first 6 months. Founders who respond fast build reputation.

---

## 6. Commercial Tiers

| Tier | What's included | Price model |
|------|----------------|-------------|
| **Community** (self-hosted) | Full engine, UI, skills, single-org | Free, Apache 2.0 |
| **Cloud Starter** | Managed hosting, Limesoda vault, GitHub App | Per-seat SaaS |
| **Enterprise** | SSO/SAML, audit logs, advanced RBAC, SLA, multi-org | Annual contract |

The community tier is the top of the sales funnel. Engineers who self-host become the internal advocates who push for the cloud tier when they don't want to manage the infra themselves.

---

## 7. What Not to Do

- **Don't open source without a working demo.** A repo of docs and a UI prototype with no runnable backend will not get traction.
- **Don't build the full backend before talking to customers.** Use the UX prototype to get 2–3 pilot conversations. Paid development de-risks everything.
- **Don't treat open source as a fallback.** If the closed product can't find customers, open sourcing the same thing won't fix the underlying problem.
- **Don't split the UI and backend between public/private** without also open sourcing the backend. A UI that can't connect to anything is not a self-hostable product.

---

## 8. Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| March 2026 | Apache 2.0 license applied | Permissive; allows commercial use and forks with attribution |
| March 2026 | Open Core model selected | Engine open, platform private; standard for developer tools |
| March 2026 | Prompts open sourced | Adoption value outweighs secrecy at this stage |
| March 2026 | Vault kept private | Security-sensitive; liability risk; enterprise differentiator |
