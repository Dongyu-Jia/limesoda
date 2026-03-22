# Limesoda Architecture: The SDLC Graph

You are right—Limesoda is **not** a linear pipeline; it is a **Directed Cyclic Graph (DCG)** orchestrated by the Engineering Manager (EM) Agent.

## The Logical Topology
```mermaid
graph TD
    A[Genesis Prompt] --> B[P1: Market Research]
    B --> C[Gate 1: Judge]
    C -- REJECTED --> B
    C -- APPROVED --> D[P2: PRD]
    
    D --> E[Gate 2: Judge]
    E -- REJECTED --> D
    E -- APPROVED --> F[P3: UX/DX]
    
    F --> G[Gate 3: Judge]
    G -- REJECTED --> F
    G -- APPROVED --> H[P4: Architecture]
    
    H --> I[Gate 4: Judge]
    I -- REJECTED --> H
    I -- APPROVED --> J[P5: Milestones]
    
    J --> K[Phase 6 & 7: Repeatable Implementation Loop]
    
    K --> L[Phase 8 & 9: Operations]
    
    L --> M[Phase 10: Feedback / Iteration]
    M -- CRITICAL BUG --> H
    M -- NEW FEATURE --> D
    M -- NO DRIFT --> END[Stable Build]
```

### Key Graph Transitions:
1. **Remediation Cycles:** When a Judge fails an artifact, the edge loops backward to the local Generator for a maximum of 3 retries.
2. **Escalation Edges:** If the 3-retry limit is triggered, the node breaks the graph and creates a **Human Interruption** event.
3. **Cross-Phase Rollbacks:** If Phase 7 (Code) fails repeated tests, the EM can route the edge all the way back to Phase 4 (Architecture) to force a structural redesign.
