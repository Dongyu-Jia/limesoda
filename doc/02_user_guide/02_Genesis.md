# User Guide: 02. The Genesis Prompt: Launching a Feature

The **Genesis Prompt** is the single entry point for all new development in Limesoda. It is how you talk to the Engineering Manager (EM) Agent to trigger the SDLC Graph.

## 1. Where to Prompt
Navigate to your Project Dashboard and click the **[+] New Feature** button. You will be presented with a simple text-area.

## 2. Writing a Great Genesis Prompt
Limesoda's **Market Research (Phase 1)** agent is designed to be cynical. If you give it a vague prompt, it will fail the feasibility report.
- **Bad Prompt:** "Build me a social media app." 
- **Good Prompt:** "Build a B2B SaaS dashboard that allows HR managers to track employee churn using LinkedIn API data."

## 3. What Happens Next?
Once you hit **Submit**:
1. The **Control Plane** invokes the **EM Agent (A6)**.
2. The EM Agent creates a new **GitHub Issue** in your project repo labeled `Genesis`.
3. The EM Agent assigns the issue to the **PM Agent (A1)**.
4. Phase 1 (Market Research) begins automatically.

> [!IMPORTANT]
> To prevent "Prompt Injection" or the creation of impossible/unsafe software, the dashboard scans your Genesis idea. If detected as non-sensical or unsafe, the submission will be blocked, and the conflicting text will be highlighted for your revision.

## 4. Human-Ready Gate
The AI will NOT proceed past Phase 1 until you approve the `Market_Feasibility_Report.md` in GitHub. You will receive a notification on the Limesoda Dashboard and a review request on the GitHub PR.

---
**Next Step:** [Understanding the 10-Phase Pipeline](03_Pipeline.md).
