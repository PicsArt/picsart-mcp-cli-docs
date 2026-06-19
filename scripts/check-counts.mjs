#!/usr/bin/env node
// Drift guard for hand-written model/provider counts.
//
// The Model Catalog, llms.txt, and wiki tables are generated from the catalog
// JSON, but the prose in the guide/reference pages ("176 models", "77 image
// models", "30 providers", each provider page's "Models: N") is hand-typed and
// silently rots when the catalog grows. This script recomputes the truth from
// models.json / providers.json and fails if any guarded phrase disagrees.
//
//   node scripts/check-counts.mjs
//
// Runs as part of `npm run build`, so a stale count blocks the deploy. When you
// add a new global-count phrase, make sure it matches one of the patterns below
// (or add a pattern) so it stays guarded.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const read = (p) => readFileSync(join(root, p), 'utf8')
const json = (p) => JSON.parse(read(p))

const models = json('.vitepress/theme/data/models.json')
const providers = json('.vitepress/theme/data/providers.json')

const total = models.length
const providerCount = providers.length
const modeCount = models.reduce((acc, m) => ((acc[m.mode] = (acc[m.mode] || 0) + 1), acc), {})
const providerCountById = Object.fromEntries(providers.map((p) => [p.id, p.count]))

const failures = []
const checked = { global: 0, provider: 0 }

// --- Global counts: overview pages that describe the whole catalog. ---------
// Provider pages are excluded here — their numbers are per-provider and checked
// separately below.
const GLOBAL_FILES = [
  'index.md',
  '.vitepress/config.ts',
  'guide/introduction.md',
  'guide/installation.md',
  'guide/skills.md',
  'guide/mcp-quickstart.md',
  'reference/index.md',
  'reference/image.md',
  'reference/video.md',
  'reference/audio.md',
]

// Each pattern captures a number that must equal `expected`. Patterns are
// shaped so per-mode phrases ("77 image models") and bare totals ("176 models")
// never collide: a bare total requires the digit to sit immediately before
// "models", which a per-mode phrase (digit … mode … models) never does.
const GLOBAL_PATTERNS = [
  { label: 'image models', re: /(\d+)\s+(?:AI\s+)?image(?:\s+generation)?\s+models/gi, expected: () => modeCount.image },
  { label: 'video models', re: /(\d+)\s+(?:AI\s+)?video(?:\s+generation)?\s+models/gi, expected: () => modeCount.video },
  { label: 'audio models', re: /(\d+)\s+(?:AI\s+)?audio\s+models/gi, expected: () => modeCount.audio },
  { label: 'total models', re: /(\d+)\+?\s+models\b/g, expected: () => total },
  { label: 'N-model catalog', re: /(\d+)-model\b/g, expected: () => total },
  { label: 'provider count', re: /(\d+)\s+providers\b/gi, expected: () => providerCount },
]

for (const file of GLOBAL_FILES) {
  const text = read(file)
  for (const { label, re, expected } of GLOBAL_PATTERNS) {
    const want = expected()
    for (const match of text.matchAll(re)) {
      checked.global++
      const got = Number(match[1])
      if (got !== want) {
        failures.push(`${file}: "${match[0].trim()}" — ${label} should be ${want}, found ${got}`)
      }
    }
  }
}

// --- Per-provider page header: "**Modes:** … **Models:** N" -----------------
for (const provider of providers) {
  const file = `reference/providers/${provider.id}.md`
  let text
  try {
    text = read(file)
  } catch {
    failures.push(`${file}: provider page missing (${provider.id} is in providers.json)`)
    continue
  }
  const match = text.match(/\*\*Models:\*\*\s*(\d+)/)
  if (!match) {
    failures.push(`${file}: no "**Models:** N" header found`)
    continue
  }
  checked.provider++
  const got = Number(match[1])
  if (got !== providerCountById[provider.id]) {
    failures.push(
      `${file}: header "Models: ${got}" should be ${providerCountById[provider.id]} (per providers.json)`,
    )
  }
}

const summary =
  `Counts: ${total} models, ${providerCount} providers ` +
  `(image ${modeCount.image}, video ${modeCount.video}, audio ${modeCount.audio}). ` +
  `Checked ${checked.global} global + ${checked.provider} provider claims.`

if (failures.length) {
  console.error(`✗ Count drift detected.\n${summary}\n`)
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error('\nFix the prose above (or the catalog JSON if the prose is right) and re-run.')
  process.exit(1)
}

console.log(`✓ All model/provider counts match the catalog.\n  ${summary}`)
