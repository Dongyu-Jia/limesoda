# DX User Guide: Infrastructure Secrets (Global Store)

## 1. Concept of "Versatility"
Unlike project-specific settings, the **Infrastructure Secrets** page acts as the organization's root security layer. All variables here are stored as simple **Key-Value Pairs**, mimicking a highly-protected global `.env` file.

## 2. Standardized Configuration Schema
To maintain system stability across environments, Limesoda enforces a naming convention for critical keys:

### 🤖 AI Provider Keys
| Key | Usage |
| :--- | :--- |
| `GEMINI_API_KEY` | Primary LLM key for Google Vertex AI / Gemini. |
| `OPENAI_API_KEY` | Secondary LLM key for specialized reasoning tasks. |
| `STRIPE_SECRET_KEY` | Global billing and subscription integration. |

### ☁️ Cloud Deployment Keys
| Key | Mapping |
| :--- | :--- |
| `AUTOPUSH_GCP_PROJECT` | Transient environment for rapid agent iteration. |
| `TEST_GCP_PROJECT` | Dedicated project for unit and integration testing. |
| `STAGING_GCP_PROJECT` | Pre-production environment for human sanity checking. |
| `PROD_GCP_PROJECT` | Production project for customer-facing deployment. |

## 3. Operations
### Secret Value Masking
Values are masked by default (`••••••••`). Clicking the **Eye** icon reveals the secret for verification. In a production build, this would trigger an audit log event.

### Addition & Erasure
Adding a new variable requires just a **Key** and a **Value**. Once saved, the variable is immediately available to all agents and orchestration workers in the cluster.
