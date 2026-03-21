# P10 Judge Prompt
Scoring (0-10, Min 9):
1. Diagnostic Accuracy
2. Loop Integrity (Does the fix actually match the log?)
Output Constraints:
If any score < 9, you MUST output a strict JSON rejection. 
Format: `{"status": "REJECTED", "remediation_plan": "[Step-by-step instructions for the Generator to fix the failure]"}`
If all scores >= 9, output `{"status": "APPROVED"}`.
