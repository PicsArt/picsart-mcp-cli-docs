---
description: "The Picsart REST API — HTTP access to Picsart AI models from any language. Full documentation at picsart.com/api-platform/docs/api-reference."
---

# REST API

The Picsart REST API exposes AI models over plain HTTP. The SDK catalog reference covers 223 models; API availability depends on the server version. Use it from Python, Ruby, Go, or any language that can make an HTTP request.

Full documentation, endpoint reference, and code examples live on the API platform:

**[picsart.com/api-platform/docs/api-reference](https://picsart.com/api-platform/docs/api-reference)**

## Quick reference

| | |
|---|---|
| Base URL | `https://api.picsart.com/gw-v2` |
| Auth | API key — `Authorization: Bearer <PICSART_API_KEY>` |
| Sync | `POST /workflows/{workflow}/execute` |
| Async | `POST /workflows/{workflow}/submit` + `GET /workflows/{workflow}/{id}/result` |

Get your API key from [picsart.com/settings](https://picsart.com/settings). See [Authentication](/guide/authentication) for details. If you are in Node.js or TypeScript, the [SDK](/guide/sdk) wraps this API with type-safe helpers. See [Which tool is right for me?](/guide/which-tool) to compare all interfaces.
