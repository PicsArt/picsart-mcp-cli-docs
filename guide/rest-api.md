---
description: "Find the supported Picsart HTTP API contract and authentication requirements."
---

# REST API

Use the Picsart HTTP API when your application does not use the TypeScript SDK. Follow the [API reference](https://picsart.com/api-platform/docs/api-reference) for the current endpoint, authentication headers, workflow path, request body, and response format.

Do not substitute a model ID for a workflow path. Models can share a workflow while requiring different parameters. Likewise, an MCP tool request is not a REST request body.

Before submitting a generation:

1. Choose a workflow and copy its documented request format.
2. Configure the credentials required by that API. A CLI login does not configure your HTTP client.
3. Validate required media inputs and model parameters.
4. For an asynchronous workflow, retain the returned job identifier and poll its result endpoint. Do not repeat the submission to check progress.

A generation can spend credits even if your client loses the response. See [pricing](/guide/pricing), [authentication](/guide/authentication), and [timeout recovery](/guide/rate-limits) before implementing retries.
