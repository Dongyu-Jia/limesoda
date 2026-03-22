# Component Low-Level Design (LLD) Template

> **Instructions for Agent:** Components vary wildly. A React UI component, a Postgres Database Migration, and a Python Machine Learning script have completely different structures. Therefore, this template **does not dictate the internal code layout**. Instead, it strictly dictates the **Boundaries and Success Criteria**. You must define exactly how this component will be tested and proven successful.

---

## 1. Component Context & Boundaries
* **Component Name:** [e.g., `Authentication Middleware`, `User Dashboard UI`, `Invoice Generator Cron`]
* **Parent Architecture:** Which Sub-System from the P4 Architecture RFC does this belong to?
* **Allowed Data Access:** Which Database Schemas or external APIs (e.g., Stripe) is this component legally allowed to read/write? *(If left blank, the Implementation Agent is NOT allowed to touch the database).*

---

## 2. Target File Structure
Define the exact file paths that the Implementation Agent is allowed to create or modify. If it is not listed here, the agent will fail the Peer Review.
* **[NEW]** `src/middleware/auth.ts`
* **[MODIFY]** `src/routes/api.ts`
* **[TEST]** `tests/middleware/auth.test.ts`

---

## 3. Success & Acceptance Criteria
*This is the most important section. How do we mathematically or programmatically prove the Implementation Agent built the component correctly?*

* **Functional Requirement:** (e.g., "The middleware must reject any JWT missing the `admin` role with a 403 status code.")
* **Non-Functional Requirement (NFR):** (e.g., "The parsing step must safely handle a malformed payload without crashing the Node process.")
* **Edge Case Handling:** (e.g., "If the Stripe API times out, the component must queue the retry locally and return a 202 Accepted to the user.")

---

## 4. Testing & Verification Strategy (TDD)
Instruct the Business Logic Agent on exactly what Functional Tests it must write *before* writing the implementation code. These tests must strictly prove that the Success Criteria in Section 3 are achieved.
* **Functional Test 1 (Maps to NFR):** (e.g., "Test that passing a malformed JSON payload gently returns a `400 Bad Request` instead of crashing the Node process.")
* **Functional Test 2 (Maps to Edge Case):** (e.g., "Test that a mocked Stripe timeout triggers a 202 Accepted and leaves the DB record in an `UNPAID` state.")
* **Mocking & Data required:** (e.g., "Mock the `stripe-node` SDK to return synthetic success/failure payloads.")
