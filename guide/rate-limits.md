---
description: "HTTP error codes for the Picsart gen-ai platform, with guidance on which errors are retryable and how to handle each."
---

# Error codes

This page covers the HTTP error codes you may encounter when calling the Picsart gen-ai platform through the REST API or SDK. For CLI and MCP users, most of these are handled automatically.

## Error code reference

| Code | Meaning | What to do |
|---|---|---|
| 400 | Bad request | Review required parameters and syntax |
| 401 | Unauthorized | Verify the API key or OAuth token is present and correct |
| 402 | Payment required | Credits exhausted or subscription limit reached |
| 403 | Forbidden | Check API key permissions |
| 404 | Not found | Verify the endpoint URL |
| 405 | Method not allowed | Use the correct HTTP verb for this endpoint |
| 413 | Request entity too large | File exceeds the 1 GB upload limit |
| 422 | Unprocessable content | Input parameters did not pass validation |
| 429 | Too many requests | Rate limit exceeded; wait before retrying |
| 500 | Internal server error | Check [status.picsart.io](https://status.picsart.io) |
| 503 | Service unavailable | Check [status.picsart.io](https://status.picsart.io) for maintenance notices |
| 504 | Processing timeout | Use a smaller input or switch to async mode |

## Retryable vs non-retryable

**Retryable:** 429, 500, 503, and 504. For 429, wait before retrying. For 500, 503, and 504, check status.picsart.io first, then retry with exponential backoff.

**Non-retryable:** 400, 401, 402, 403, 404, 405, 413, and 422. These indicate a problem with the request itself. Retrying without fixing the request will produce the same result.

## FAQ

**Does a failed request consume credits?**

Not for 4xx errors caused by a bad request. A 402 means credits were already exhausted before the call was processed.

**What should I do on a 504?**

The generation timed out at the gateway. Try a smaller input file, reduce resolution or duration if the model supports it, or use async mode if available.

**Does the CLI or MCP server handle retries automatically?**

Yes. The CLI and MCP server handle transient errors automatically. These codes are most relevant when calling the REST API or SDK directly.
