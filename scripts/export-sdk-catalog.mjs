#!/usr/bin/env node
// Export the installed SDK's production catalog in the stable JSON shape used
// by the documentation generators.
//
//   node scripts/export-sdk-catalog.mjs <output.json>
//
// SDK 3.30.0 replaced the generated catalog.json artifact with a runtime
// catalog API. Keeping this adapter in the docs repo means future refreshes use
// exactly the SDK version pinned by the app and do not depend on SDK internals.
//
// SDK 7.0.0 went dynamic-only: the catalog is no longer bundled, it is fetched
// from models-hub (`/v1/models-catalog`) at runtime. We therefore create a
// client and `await ai.initModelCatalog()` before reading `catalog.all()`.
// That needs network access plus credentials:
//
//   PICSART_API_KEY=<key> node scripts/export-sdk-catalog.mjs <output.json>
//
// PICSART_API_URL overrides the default api host if you need a non-prod catalog.
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient, catalog } from '@picsart/ai-sdk'

const outputPath = process.argv[2]
if (!outputPath) {
  console.error('usage: PICSART_API_KEY=<key> export-sdk-catalog.mjs <output.json>')
  process.exit(1)
}

const apiKey = process.env.PICSART_API_KEY
if (!apiKey) {
  console.error('export-sdk-catalog.mjs: PICSART_API_KEY is required — SDK 7.0.0 fetches the catalog from models-hub at runtime.')
  process.exit(1)
}
const apiUrl = process.env.PICSART_API_URL || 'https://api.picsart.com'

const packagePath = join(dirname(fileURLToPath(import.meta.resolve('@picsart/ai-sdk'))), 'package.json')
const sdkVersion = JSON.parse(readFileSync(packagePath, 'utf8')).version

const ai = createClient({ apiKey, apiUrl })
await ai.initModelCatalog()

const models = catalog.all().map((model) => {
  const meta = model.meta()

  return {
    id: model.id,
    name: model.name,
    mode: meta.mode,
    inputType: meta.inputType,
    release: meta.release,
    provider: meta.provider,
    description: meta.description,
    features: meta.features,
    badges: meta.badges,
    params: model.params().all(),
  }
})

writeFileSync(
  outputPath,
  JSON.stringify({ sdkVersion, total: models.length, models }, null, 2) + '\n',
)

console.log(`✓ Exported ${models.length} production models from @picsart/ai-sdk ${sdkVersion}`)
