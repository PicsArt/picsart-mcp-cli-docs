---
description: "Use the Picsart TypeScript SDK from an application."
---

# TypeScript SDK

Use `@picsart/ai-sdk` to call Picsart from a Node.js or TypeScript application. This reference's model snapshot comes from version 6.48.1. The CLI and hosted MCP server can use different releases, so do not assume their catalogs match exactly.

```bash
npm install @picsart/ai-sdk@6.48.1
```

The package requires Node.js 20 or newer and uses ESM. Follow the [SDK documentation](https://picsart.com/api-platform/docs/sdk) for client initialization, authentication, generation, and result handling.

You can inspect the installed catalog without submitting a generation:

```js
import { catalog } from '@picsart/ai-sdk'

const model = catalog.all().find(model => model.id === 'flux-2-pro')
if (!model) throw new Error('Model is unavailable in this SDK version')
console.log(model.params().all())
console.log(model.validate({ prompt: 'A ceramic cup on a wooden table' }))
```

A successful validation reports `valid: true`; it does not check account authorization, reserve credits, or generate an image. Review [authentication](/guide/authentication) before adding a client. Keep server credentials out of browser bundles and committed files.

## Earlier catalog updates

See the [SDK 6.29.0 update](/guide/sdk-6-29-update) for structured JSON output and the [SDK 6.23.0 update](/guide/sdk-6-23-update) for earlier catalog changes.
