#!/usr/bin/env node
// Print a DRAFT changelog entry for a catalog refresh — the added/removed model
// list a human then edits into prose.
//
//   node scripts/draft-changelog.mjs [--base <git-ref>] [--catalog <catalog.json>] [--date YYYY-MM-DD] [--write]
//
// It compares the working-tree .vitepress/theme/data/models.json (just rewritten
// by build-catalog-data) against the same file at a git ref (default HEAD), so in
// the normal refresh flow "new" = your uncommitted changes and "old" = what is
// committed. Pass the exported SDK catalog (--catalog) to enrich new models with
// their one-line descriptions; without it you get names + modes and a TODO.
//
// Default mode is a SCAFFOLD printed to stdout — the human edits it into prose.
// --write inserts the entry straight into changelog.md (newest-first, below the
// intro). That is for the unattended auto-merge flow where no human polishes it;
// the prose is the raw catalog descriptions. When there are no additions or
// removals, --write makes no change (there is nothing notable to log).
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const MODELS_PATH = '.vitepress/theme/data/models.json'

// ---- args ------------------------------------------------------------------
const argv = process.argv.slice(2)
const argOf = (flag, fallback) => {
  const i = argv.indexOf(flag)
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback
}
const baseRef = argOf('--base', 'HEAD')
const catalogPath = argOf('--catalog', null)
const date = argOf('--date', 'YYYY-MM-DD') // Date.now() is unavailable in some runners; let the caller pass it
const writeMode = argv.includes('--write')

// ---- load new / old catalog data -------------------------------------------
const json = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'))
const newModels = json(MODELS_PATH)
const providers = json('.vitepress/theme/data/providers.json')
const providerLabel = new Map(providers.map((p) => [p.id, p.label]))

let oldModels = []
try {
  oldModels = JSON.parse(execSync(`git show ${baseRef}:${MODELS_PATH}`, { cwd: root, encoding: 'utf8' }))
} catch {
  console.error(`(could not read ${MODELS_PATH} at ${baseRef} — treating every model as new)\n`)
}

// optional descriptions from the exported SDK catalog
const descById = new Map()
let sdkVersion = null
if (catalogPath) {
  const cat = JSON.parse(readFileSync(catalogPath, 'utf8'))
  sdkVersion = cat.sdkVersion ?? null
  for (const m of cat.models ?? []) descById.set(m.id, m.description)
}
if (!sdkVersion) {
  try {
    sdkVersion = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).devDependencies?.['@picsart/ai-sdk'] ?? null
  } catch { /* ignore */ }
}

// ---- diff ------------------------------------------------------------------
const oldIds = new Map(oldModels.map((m) => [m.id, m]))
const newIds = new Map(newModels.map((m) => [m.id, m]))
const added = newModels.filter((m) => !oldIds.has(m.id))
const removed = oldModels.filter((m) => !newIds.has(m.id))

const oldProviders = new Set(oldModels.map((m) => m.provider))
const newProviderSet = new Set(newModels.map((m) => m.provider))
const newProviders = [...newProviderSet]
const gainedProviders = newProviders.filter((p) => !oldProviders.has(p))
const lostProviders = [...oldProviders].filter((p) => !newProviderSet.has(p))

// ---- render ----------------------------------------------------------------
const label = (id) => providerLabel.get(id) ?? id
const link = (id) => `[${label(id)}](/reference/providers/${id})`
const bullet = (m, { withDesc }) => {
  const desc = withDesc ? (descById.get(m.id) ?? '_TODO: describe_') : '_TODO: describe_'
  return `- **${m.name}** *(${m.mode}, \`${m.inputType}\`)* — ${desc} See ${link(m.provider)}.`
}

const addedCount = added.length
const removedCount = removed.length
const sdkLabel = sdkVersion ? `SDK ${sdkVersion}` : 'SDK (version?)'

const out = []
out.push(`## ${date}`)
out.push('')
out.push(`**${sdkLabel} catalog refresh — ${newModels.length} production models across ${newProviders.length} providers.**`)
const deltaBits = []
if (addedCount) deltaBits.push(`${addedCount} model${addedCount === 1 ? '' : 's'} added`)
if (removedCount) deltaBits.push(`${removedCount} removed`)
out.push(`Compared with the previous catalog: ${deltaBits.join(', ') || 'no model changes'}.` +
  (gainedProviders.length ? ` New provider${gainedProviders.length === 1 ? '' : 's'}: ${gainedProviders.map(label).join(', ')}.` : '') +
  (lostProviders.length ? ` Dropped: ${lostProviders.map(label).join(', ')}.` : ''))

if (added.length) {
  out.push('', '### New', '')
  // group by provider for easier editing into combined bullets
  const byProvider = new Map()
  for (const m of added) {
    if (!byProvider.has(m.provider)) byProvider.set(m.provider, [])
    byProvider.get(m.provider).push(m)
  }
  for (const [, ms] of byProvider) for (const m of ms) out.push(bullet(m, { withDesc: !!catalogPath }))
}

if (removed.length) {
  out.push('', '### Removed', '')
  for (const m of removed) out.push(`- **${m.name}** *(${m.mode})* leaves ${link(m.provider)}.`)
}

out.push('')

if (writeMode) {
  // Unattended flow: splice the entry into changelog.md, newest-first, right
  // before the first existing "## " entry (i.e. under the intro paragraph).
  if (!added.length && !removed.length) {
    console.error('draft-changelog: no additions or removals — changelog.md left unchanged.')
  } else {
    const changelogPath = 'changelog.md'
    const existing = readFileSync(join(root, changelogPath), 'utf8')
    const entry = out.join('\n').replace(/\s+$/, '') + '\n'
    const at = existing.search(/^## /m)
    const updated = at >= 0
      ? existing.slice(0, at) + entry + '\n' + existing.slice(at)
      : existing.replace(/\s+$/, '') + '\n\n' + entry
    writeFileSync(join(root, changelogPath), updated)
    console.error(`✓ Wrote ${date} changelog entry into ${changelogPath} (${added.length} new, ${removed.length} removed).`)
  }
} else {
  const banner = catalogPath ? '' : '\n(Tip: pass --catalog <exported.json> to fill in model descriptions.)'
  console.error(`— draft only; edit before committing —${banner}\n`)
  console.log(out.join('\n'))
}
