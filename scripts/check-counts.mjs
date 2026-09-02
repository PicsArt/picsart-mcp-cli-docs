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
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const read = (p) => readFileSync(join(root, p), 'utf8')
const json = (p) => JSON.parse(read(p))

const models = json('.vitepress/theme/data/models.json')
const providers = json('.vitepress/theme/data/providers.json')
const mediaTools = json('.vitepress/theme/data/media-tools.json')

const total = models.length
const providerCount = providers.length
const modeCount = models.reduce((acc, m) => ((acc[m.mode] = (acc[m.mode] || 0) + 1), acc), {})
const providerCountById = Object.fromEntries(providers.map((p) => [p.id, p.count]))

const failures = []
const checked = { global: 0, provider: 0, media: 0 }

// --- Global counts: overview pages that describe the whole catalog. ---------
// Provider pages are excluded here — their numbers are per-provider and checked
// separately below.
const GLOBAL_FILES = [
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
  // Every per-agent integration guide quotes the catalog size in its intro.
  ...readdirSync(join(root, 'guide', 'integrations'))
    .filter((f) => f.endsWith('.md'))
    .map((f) => `guide/integrations/${f}`),
]

// Each pattern captures a number that must equal `expected`. Patterns are
// shaped so per-mode phrases ("77 image models") and bare totals ("176 models")
// never collide: a bare total requires the digit to sit immediately before
// "models", which a per-mode phrase (digit … mode … models) never does.
const GLOBAL_PATTERNS = [
  { label: 'image models', re: /(\d+)\s+(?:AI\s+)?image(?:\s+generation)?\s+models/gi, expected: () => modeCount.image },
  { label: 'video models', re: /(\d+)\s+(?:AI\s+)?video(?:\s+generation)?\s+models/gi, expected: () => modeCount.video },
  { label: 'audio models', re: /(\d+)\s+(?:AI\s+)?audio\s+models/gi, expected: () => modeCount.audio },
  { label: 'text models', re: /(\d+)\s+(?:AI\s+)?text\s+models/gi, expected: () => modeCount.text },
  { label: 'total models', re: /(\d+)\+?\s+models\b/g, expected: () => total },
  { label: 'N-model catalog', re: /(\d+)-model\b/g, expected: () => total },
  { label: 'provider count', re: /(\d+)\s+(?:AI\s+model\s+)?providers\b/gi, expected: () => providerCount },
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

// --- Media Studio tool surface ---------------------------------------------
// The Media Studio pages are hand-written, but the tools they may name are the
// GA contract of pa-media-tools-mcp-server, mirrored into media-tools.json by
// scripts/export-media-tools.mjs. Two directions matter, and they catch
// different bugs:
//
//   1. No page may name a tool outside the GA set. This is the guard that
//      matters most: the three `picsart_media_video_*` tools were demoted to a
//      staging-only channel, yet stayed advertised on this public site for
//      weeks because nothing checked.
//   2. The tool reference must name every GA tool, or the page understates the
//      surface a reader (or a connector reviewer) will actually see.
const MEDIA_ALLOWED = new Set(mediaTools.tools)
// Every page that may name a `picsart_media_*` tool, not just the Media Studio
// section — mcp-quickstart.md describes the mirrored subset on the gen-AI
// server and so can advertise a demoted tool just as easily.
const MEDIA_PAGES = [
  'guide/media-tools.md',
  'guide/media-studio/tools.md',
  'guide/media-studio/scenes.md',
  'guide/media-studio/troubleshooting.md',
  'guide/mcp-quickstart.md',
  'guide/local-files.md',
  'guide/installation.md',
  'guide/authentication.md',
  'guide/which-tool.md',
]
const MEDIA_REFERENCE_PAGE = 'guide/media-studio/tools.md'
// `picsart_media_*` (the literal glob used in prose) never matches: \w+ needs a
// word character where the asterisk sits.
const MEDIA_TOOL_RE = /picsart_media_\w+/g

const namedInReference = new Set()
for (const file of MEDIA_PAGES) {
  let text
  try {
    text = read(file)
  } catch {
    failures.push(`${file}: Media Studio page missing`)
    continue
  }
  for (const name of new Set(text.match(MEDIA_TOOL_RE) || [])) {
    checked.media++
    if (!MEDIA_ALLOWED.has(name)) {
      failures.push(
        `${file}: names "${name}", which is not in the GA tool set ` +
          '(a preview-channel or removed tool must not appear in public docs)',
      )
    }
    if (file === MEDIA_REFERENCE_PAGE) namedInReference.add(name)
  }
}

const missingFromReference = [...MEDIA_ALLOWED].filter((n) => !namedInReference.has(n)).sort()
if (missingFromReference.length) {
  failures.push(
    `${MEDIA_REFERENCE_PAGE}: missing ${missingFromReference.length} GA tool(s): ` +
      missingFromReference.join(', '),
  )
}

// The pages state the surface size in prose, in several phrasings. Guard all of
// them, everywhere — a single guarded phrasing on a single page left seven other
// live count claims free to rot.
//
// `NN tools` is matched with optional bold/emphasis markers around it, plus the
// qualified form "29 GA tools". The (?<!\d) guard stops the pattern matching
// the tail of a longer number, e.g. the "4" of "24 tools". Prose must therefore
// never state a *derived* tool count (such as 29 minus the dispatching ones) —
// say "every other tool" instead, so there is only ever one number to keep true.
const MEDIA_COUNT_RE = /(?<!\d)\*{0,2}(\d+)\*{0,2}\s+(?:GA\s+)?tools\b/g
for (const file of MEDIA_PAGES) {
  let text
  try {
    text = read(file)
  } catch {
    continue // missing-page failure already recorded above
  }
  for (const match of text.matchAll(MEDIA_COUNT_RE)) {
    checked.media++
    const got = Number(match[1])
    if (got !== MEDIA_ALLOWED.size) {
      failures.push(
        `${file}: "${match[0].trim()}" — Media Studio tool count should be ` +
          `${MEDIA_ALLOWED.size}, found ${got}`,
      )
    }
  }
}

const summary =
  `Counts: ${total} models, ${providerCount} providers ` +
  `(image ${modeCount.image}, video ${modeCount.video}, audio ${modeCount.audio}, text ${modeCount.text}). ` +
  `Checked ${checked.global} global + ${checked.provider} provider claims, ` +
  `plus ${checked.media} Media Studio tool claims against ${MEDIA_ALLOWED.size} GA tools.`

if (failures.length) {
  console.error(`✗ Count drift detected.\n${summary}\n`)
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error('\nFix the prose above (or the catalog JSON if the prose is right) and re-run.')
  process.exit(1)
}

console.log(`✓ All model/provider counts and Media Studio tool names check out.\n  ${summary}`)
