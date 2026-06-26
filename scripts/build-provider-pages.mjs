#!/usr/bin/env node
// Sync each provider reference page to the SDK catalog.json, surgically and
// preserving curation.
//
//   node scripts/build-provider-pages.mjs <path-to-catalog.json>
//
// Page anatomy (stable across all pages):
//   frontmatter · # H1 · "**Mode:** … · **Models:** N" · curated prose ·
//   ## Models <table> · ## CLI · ## MCP · ## Parameters <### blocks> · ## Pricing
//
// We touch only:
//   - the "**Models:** N" + "**Mode:**" header line
//   - the frontmatter description's model count
//   - the ## Models table (standard 3-column pages only)
//   - the ## Parameters ### blocks — BLOCK REUSE: an existing block is kept
//     byte-for-byte (so unchanged models never churn); only genuinely new
//     models get a freshly generated block, and dropped models lose theirs.
// ## CLI, ## MCP, ## Pricing, intro prose, and curated Models tables are never
// rewritten.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const providersDir = join(root, 'reference', 'providers')

const catalogPath = process.argv[2]
if (!catalogPath) {
  console.error('usage: build-provider-pages.mjs <path-to-catalog.json>')
  process.exit(1)
}
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const models = catalog.models ?? catalog

// ---- param-key → CLI flag: harvested from existing pages + pinned newcomers --
const flagMap = {}
const rowRe = /^\|\s*`([a-zA-Z0-9_]+)`\s*\|\s*(`[^`]+`)\s*\|/
for (const file of readdirSync(providersDir).filter((f) => f.endsWith('.md'))) {
  for (const line of readFileSync(join(providersDir, file), 'utf8').split('\n')) {
    const m = line.match(rowRe)
    if (m && !flagMap[m[1]]) flagMap[m[1]] = m[2]
  }
}
Object.assign(flagMap, {
  multiPrompt: '`--multi-prompt`',
  voiceList: '`--voice-list`',
  elementList: '`--element-list`',
  omniImageList: '`--omni-image-list`',
  omniVideoList: '`--omni-video-list`',
  thinking: '`--thinking`',
})
const OBJECT_VALUE = {
  multiPrompt: 'up to 6 `{index, prompt, duration}`',
  voiceList: 'up to 2 `{voice_id}`',
  elementList: 'up to 3 `{element_id}`',
  omniImageList: 'up to 10 `{image_url, type}`',
  omniVideoList: 'up to 1 `{video_url, refer_type, keep_original_sound}`',
}

const code = (v) => '`' + v + '`'
const flagFor = (key) => flagMap[key] ?? '`--' + key.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()) + '`'
const typeCell = (p) => (p.kind === 'object' ? 'object[]' : p.kind)

function valueCell(p) {
  switch (p.kind) {
    case 'text':
      return (p.required ? '**required**' : 'free text') + (p.maxLength ? ` (≤${p.maxLength} chars)` : '')
    case 'enum': {
      const opts = (p.options ?? [])
        .map((o) => code(o.id) + (o.label && o.label !== o.id ? ` (${o.label})` : ''))
        .join(' · ')
      return opts + (p.default != null ? ` (default ${code(p.default)})` : '')
    }
    case 'range': {
      const step = p.step != null ? `, step ${p.step}` : ''
      return `${code(p.min)}–${code(p.max)}${step}` + (p.default != null ? ` (default ${code(p.default)})` : '')
    }
    case 'boolean':
      return `${code('true')} · ${code('false')}` + (p.default != null ? ` (default ${code(p.default)})` : '')
    case 'file':
      return (p.required ? '**required** ' : '') + p.accept + (p.array && p.array.max ? ` (up to ${p.array.max})` : '')
    case 'object':
      return OBJECT_VALUE[p.key] ?? `\`{${(p.fields ?? []).join(', ')}}\``
    default:
      return ''
  }
}

function genParamsBlock(model) {
  const rows = (model.params ?? [])
    .map((p) => `| ${code(p.key)} | ${flagFor(p.key)} | ${typeCell(p)} | ${valueCell(p)} |`)
    .join('\n')
  return (
    `### ${code(model.id)} — ${model.name}\n\n` +
    `[Try ${code(model.id)} in Playground ↗](https://picsart.com/ai-playground/?model=${model.id})\n\n` +
    `Input type: ${code(model.inputType)}\n\n` +
    `| Param | CLI flag | Type | Values |\n|---|---|---|---|\n${rows}`
  )
}

function modelsTable(provModels) {
  const rows = provModels.map((m) => `| ${code(m.id)} | ${m.name} | ${code(m.inputType)} |`).join('\n')
  return `## Models\n\n| id | Name | Input type |\n|---|---|---|\n${rows}\n`
}

const MODE_ORDER = ['image', 'video', 'audio', 'text']
const byProvider = new Map()
for (const m of models) {
  if (!byProvider.has(m.provider.id)) byProvider.set(m.provider.id, [])
  byProvider.get(m.provider.id).push(m)
}

const report = []
let newBlocks = 0
for (const [providerId, provModels] of byProvider) {
  const file = join(providersDir, `${providerId}.md`)
  let text
  try {
    text = readFileSync(file, 'utf8')
  } catch {
    report.push(`SKIP ${providerId}: no page (new provider — author by hand)`)
    continue
  }

  const modes = MODE_ORDER.filter((mode) => provModels.some((m) => m.mode === mode))
  const count = provModels.length

  // header line — pages use "**Mode:**" for one mode, "**Modes:**" for several
  const modeLabel = modes.length > 1 ? 'Modes' : 'Mode'
  text = text.replace(/\*\*Modes?:\*\*[^\n]*\*\*Models:\*\*\s*\d+/, `**${modeLabel}:** ${modes.join(' · ')} · **Models:** ${count}`)
  // frontmatter description count (number only — leave the "including …" names)
  text = text.replace(/(\d+)(\s+(?:image|video|audio|text|media)\s+model\(s\))/, `${count}$2`)

  // ## Models table — standard 3-col pages only; preserve trailing curated prose
  const tableRe = /## Models\n\n\| id \| Name \| Input type \|\n\|[-| ]+\|\n(?:\|.*\n?)+/
  if (tableRe.test(text)) {
    text = text.replace(tableRe, modelsTable(provModels))
  } else {
    report.push(`  ↳ ${providerId}: non-standard Models table — left for hand-edit`)
  }

  // ## Parameters — block reuse between the intro and "## Pricing" (or EOF)
  const paramsRe = /(## Parameters\n\n[^\n]*\n\n)([\s\S]*?)(\n## |\s*$)/
  const match = text.match(paramsRe)
  if (match) {
    const existing = new Map()
    for (const block of match[2].split(/\n(?=### `)/)) {
      const idMatch = block.match(/^### `([^`]+)`/)
      if (idMatch) existing.set(idMatch[1], block.replace(/\s+$/, ''))
    }
    const blocks = provModels.map((m) => {
      if (existing.has(m.id)) return existing.get(m.id)
      newBlocks++
      return genParamsBlock(m)
    })
    text = text.replace(paramsRe, `$1${blocks.join('\n\n')}\n$3`)
  }

  writeFileSync(file, text)
  report.push(`✓ ${providerId}: ${count} models (${modes.join('/')})`)
}

console.log(report.join('\n'))
console.log(`\nRewrote ${report.filter((r) => r.startsWith('✓')).length} pages · generated ${newBlocks} new param blocks.`)
