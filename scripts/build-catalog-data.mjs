#!/usr/bin/env node
// Regenerate the docs-site catalog data from the SDK's generated catalog.json.
//
//   node scripts/build-catalog-data.mjs <path-to-catalog.json>
//
// The SDK (`@picsart/ai-sdk`, external `pa-gen-ai-sdk` repo) ships a generated
// `packages/ai-sdk/src/generated/catalog.json` — the same data `gen-ai models
// --json` serves. This script projects it into the two files the docs site
// renders from:
//
//   .vitepress/theme/data/models.json     [{id, name, provider, mode, inputType}]
//   .vitepress/theme/data/providers.json  [{id, label, count, modes}]
//
// Provider display labels are curated: existing labels are preserved (so e.g.
// "Async" doesn't churn to the catalog's "Async AI"); only genuinely new
// providers fall back to the catalog name. Everything else — the per-model rows,
// the provider counts, the mode lists — is derived fresh from the catalog.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const dataDir = join(root, '.vitepress', 'theme', 'data')

const catalogPath = process.argv[2]
if (!catalogPath) {
  console.error('usage: build-catalog-data.mjs <path-to-catalog.json>')
  process.exit(1)
}

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const sourceModels = catalog.models ?? catalog
if (!Array.isArray(sourceModels)) {
  console.error('catalog.json has no models[] array')
  process.exit(1)
}

// Preserve curated provider labels from the existing file; only new providers
// take the catalog's name.
const existingProviders = JSON.parse(readFileSync(join(dataDir, 'providers.json'), 'utf8'))
const curatedLabel = new Map(existingProviders.map((p) => [p.id, p.label]))

// --- models.json ------------------------------------------------------------
const models = sourceModels.map((m) => ({
  id: m.id,
  name: m.name,
  provider: m.provider.id,
  mode: m.mode,
  inputType: m.inputType,
}))
// Stable order: by provider id, then model id — deterministic regardless of
// catalog ordering, so diffs stay readable.
models.sort((a, b) => a.provider.localeCompare(b.provider) || a.id.localeCompare(b.id))

// --- providers.json ---------------------------------------------------------
const byProvider = new Map()
for (const m of sourceModels) {
  const { id, name } = m.provider
  if (!byProvider.has(id)) byProvider.set(id, { id, name, modes: new Set(), count: 0 })
  const entry = byProvider.get(id)
  entry.modes.add(m.mode)
  entry.count++
}
const MODE_ORDER = ['image', 'video', 'audio', 'text']
const providers = [...byProvider.values()]
  .map((p) => ({
    id: p.id,
    label: curatedLabel.get(p.id) ?? p.name,
    count: p.count,
    modes: MODE_ORDER.filter((mode) => p.modes.has(mode)),
  }))
  .sort((a, b) => a.id.localeCompare(b.id))

writeFileSync(join(dataDir, 'models.json'), JSON.stringify(models, null, 2) + '\n')
writeFileSync(join(dataDir, 'providers.json'), JSON.stringify(providers, null, 2) + '\n')

const modeCount = models.reduce((acc, m) => ((acc[m.mode] = (acc[m.mode] || 0) + 1), acc), {})
console.log(`✓ Wrote catalog data from ${catalog.sdkVersion ?? 'catalog.json'}`)
console.log(`  ${models.length} models · ${providers.length} providers`)
console.log(`  modes: ${MODE_ORDER.filter((m) => modeCount[m]).map((m) => `${m} ${modeCount[m]}`).join(', ')}`)
const newProviders = providers.filter((p) => !curatedLabel.has(p.id)).map((p) => p.id)
if (newProviders.length) console.log(`  new providers: ${newProviders.join(', ')}`)
