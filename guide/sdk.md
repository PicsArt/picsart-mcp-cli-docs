---
description: "Use the Picsart TypeScript SDK and load its dynamic model catalog."
---

# TypeScript SDK

Use `@picsart/ai-sdk` in a Node.js or TypeScript application. This documentation pins SDK 7.0.0. Its catalog is fetched at runtime, so model availability can change without an SDK release. CLI and hosted MCP releases can expose different catalogs.

```bash
npm install @picsart/ai-sdk@7.0.0
```

The package uses ESM. Configure `PICSART_API_KEY` in your server environment, then initialize the catalog before inspecting models:

```js
import { createClient, catalog } from '@picsart/ai-sdk'

const ai = createClient({
  apiKey: process.env.PICSART_API_KEY,
  apiUrl: 'https://api.picsart.com',
})
await ai.initModelCatalog()
const model = catalog.all().find(model => model.id === 'flux-2-pro')
if (!model) throw new Error('Model is unavailable in this catalog')
console.log(model.params().all())
```

Loading the catalog does not submit a generation. Follow the [SDK documentation](https://picsart.com/api-platform/docs/sdk) for authentication, generation, and result handling. Keep credentials out of browser bundles and committed files.

## Earlier catalog updates

The [SDK 6.29.0 update](/guide/sdk-6-29-update) and [SDK 6.23.0 update](/guide/sdk-6-23-update) describe historical catalog changes.
