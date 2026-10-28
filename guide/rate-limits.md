---
description: "Diagnose request errors and avoid duplicate generation submissions."
---

# Errors and retries

Read the error message and any returned job handle before retrying. A gateway or client timeout can occur after a generation was accepted.

| Status | Check |
|---|---|
| 400 or 422 | Required inputs, allowed parameter values, and request structure |
| 401 | The credential or host authorization session |
| 402 | Credit balance and account limits |
| 403 | Account permissions and host policy |
| 404 or 405 | Endpoint, job ID, and HTTP method |
| 413 | Upload or model-specific size limits |
| 429 | Rate limit response and any `Retry-After` value |
| 500, 503, or 504 | Service state and whether the original job was accepted |

These are general HTTP meanings; the response body gives the product-specific reason. Do not infer billing or a fixed upload limit from a status code alone.

## Retry safely

Retry read-only status lookups with bounded backoff. For generation submissions, first check an existing job handle or result. Repeating a submission can create another charged job. If a 429 includes `Retry-After`, wait at least that long before retrying.

The CLI, SDK, and MCP may handle some transient errors, but do not assume every operation retries automatically or is safe to repeat. See [Timeouts and recovery](/guide/generating).
