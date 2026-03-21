# Developer Experience (DX) User Guide Template

> **Instructions for DX Agent:** You must fill out this template to simulate what it will feel like for a developer to use this system *before* the architecture or database is built. The human user must explicitly approve the ergonomics of your JSON structures and auth flow.

---

## 1. API / Service Overview
* **Purpose:** What is the primary role of this API/Interface?
* **Target Developer:** Is this a Public API for external SaaS customers, or an Internal API for our own frontend?

## 2. Authentication & Authorization
How does the developer authenticate their requests?
* **Method:** (e.g., Bearer Token, API Key in Header, OAuth2)
* **Example Auth Header:** `Authorization: Bearer <token>`

---

## 3. Core Endpoints & Payload Prototypes (The DX "Wireframes")
Map out the critical endpoints necessary to fulfill the PRD's capabilities. **Do not omit the Request/Response bodies.** The human needs to read the JSON to ensure it makes sense.

### 3.1 `[HTTP_METHOD] /path/to/resource`
* **Description:** What does this endpoint do?
* **Required Roles:** (e.g., Admin, Authed User)

**Mock Request Payload (if applicable):**
```json
{
  "example_field": "example_value"
}
```

**Mock Response Payload:**
```json
{
  "id": "12345",
  "status": "success",
  "data": { ... }
}
```
*(Repeat 3.1 for all essential endpoints)*

---

## 4. Developer Critical User Journeys (CUJs)
Provide a chronological code snippet (e.g., in `cURL`, Python, or JavaScript) showing how a developer chains endpoints together to accomplish *each* CUJ defined in the `PRD.md`.

### 4.1 CUJ: `[Name of the Critical User Journey]`
**Scenario:** [e.g., "A customer creating a new invoice and sending it."]

```javascript
// Step 1: Authenticate
const token = await login('user', 'pass');

// Step 2: Create the resource
const invoice = await fetch('/api/invoices', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ amount: 500 })
});

// Step 3: Trigger the send action
await fetch(`/api/invoices/${invoice.id}/send`, { method: 'POST' });
```

*(Repeat Section 4.1 for every distinct CUJ defined in the PRD)*
