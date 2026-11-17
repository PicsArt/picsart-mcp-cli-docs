// Single source of truth for the hand-written model/provider count guards.
//
// Two scripts share this:
//   - check-counts.mjs  — fails the build when prose disagrees with the catalog
//   - fix-counts.mjs    — rewrites that prose to agree with the catalog
//
// They MUST agree on which files and which phrasings are guarded, or a count
// fix-counts applies could be one check-counts then rejects (or vice versa).
// Keeping GLOBAL_FILES + globalPatterns() here guarantees they never diverge.
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
export const root = join(here, '..', '..')
export const read = (p) => readFileSync(join(root, p), 'utf8')
export const json = (p) => JSON.parse(read(p))

// Load the generated catalog data and derive every count the prose may quote.
export function loadCounts() {
  const models = json('.vitepress/theme/data/models.json')
  const providers = json('.vitepress/theme/data/providers.json')

  const total = models.length
  const providerCount = providers.length
  const modeCount = models.reduce((acc, m) => ((acc[m.mode] = (acc[m.mode] || 0) + 1), acc), {})
  const providerCountById = Object.fromEntries(providers.map((p) => [p.id, p.count]))

  return { models, providers, total, providerCount, modeCount, providerCountById }
}

// Overview pages that describe the whole catalog. Provider pages are excluded —
// their numbers are per-provider and guarded separately (PROVIDER_HEADER_RE).
export const GLOBAL_FILES = [
  'index.md',
  '.vitepress/config.ts',
  '.vitepress/theme/components/ModelCatalog.vue',
  'CONTRIBUTING.md',
  'guide/introduction.md',
  'guide/installation.md',
  'guide/skills.md',
  'guide/mcp-quickstart.md',
  'guide/what-is-mcp.md',
  'guide/which-tool.md',
  'guide/pricing.md',
  'guide/sdk.md',
  'guide/rest-api.md',
  'reference/index.md',
  'reference/catalog.md',
  'reference/providers/index.md',
  'README.md',
  'reference/image.md',
  'reference/video.md',
  'reference/audio.md',
  'reference/text.md',
  'reference/json.md',
  // Every per-agent integration guide quotes the catalog size in its intro.
  ...readdirSync(join(root, 'guide', 'integrations'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => `guide/integrations/${f}`),
]

// Each pattern captures a number (group 1, always at the START of the match) that
// must equal `expected`. Patterns are shaped so per-mode phrases ("77 image
// models") and bare totals ("176 models") never collide: a bare total requires
// the digit to sit immediately before "models", which a per-mode phrase never does.
//
// Because the number is always the first thing in the match, fix-counts can
// rewrite a drifted phrase with `matched.replace(/\d+/, expected)` without having
// to reconstruct the surrounding words.
export function globalPatterns(counts) {
  const { modeCount, total, providerCount } = counts
  return [
    { label: 'image models', re: /(\d+)\s+(?:AI\s+)?image(?:\s+generation)?\s+models/gi, expected: modeCount.image },
    { label: 'video models', re: /(\d+)\s+(?:AI\s+)?video(?:\s+generation)?\s+models/gi, expected: modeCount.video },
    { label: 'audio models', re: /(\d+)\s+(?:AI\s+)?audio\s+models/gi, expected: modeCount.audio },
    { label: 'text models', re: /(\d+)\s+(?:AI\s+)?text\s+models/gi, expected: modeCount.text },
    { label: 'JSON models', re: /(\d+)\s+(?:structured\s+)?JSON\s+models?\b/gi, expected: modeCount.json ?? 0 },
    { label: 'total models', re: /(\d+)\+?\s+(?:(?:Picsart\s+AI|generative\s+AI|AI)\s+)?models\b/g, expected: total },
    { label: 'N-model catalog', re: /(\d+)-model\b/g, expected: total },
    { label: 'provider count', re: /(\d+)\s+(?:AI\s+model\s+)?providers\b/gi, expected: providerCount },
  ]
}

// Per-provider page header: "**Modes:** … **Models:** N"
export const PROVIDER_HEADER_RE = /\*\*Models:\*\*\s*(\d+)/
