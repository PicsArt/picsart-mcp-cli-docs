#!/usr/bin/env node
// Auto-fix the hand-written model/provider counts that check-counts.mjs guards.
//
//   node scripts/fix-counts.mjs
//
// check-counts.mjs *detects* drift and fails the build; this script *repairs*
// it. They read the same GLOBAL_FILES + patterns from scripts/lib/counts.mjs, so
// anything check-counts would flag is exactly what fix-counts rewrites — run
// fix-counts, then check-counts passes.
//
// It only touches the number. Every guarded pattern captures its count as the
// first thing in the match (see counts.mjs), so replacing the first digit run of
// the matched text — `matched.replace(/\d+/, expected)` — leaves the surrounding
// prose ("image models", "providers", the frontmatter sentence) untouched.
//
// Out of scope by design: the Media Studio tool counts (they track
// media-tools.json, not the SDK catalog, and don't move on a catalog refresh) and
// the curated changelog/version-string prose. Those stay hand-edited; check-counts
// remains the backstop if a media count ever drifts.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { root, read, loadCounts, GLOBAL_FILES, globalPatterns, PROVIDER_HEADER_RE } from './lib/counts.mjs'

const counts = loadCounts()
const { providers, total, providerCount, modeCount, providerCountById } = counts
const PATTERNS = globalPatterns(counts)

const edits = [] // { file, label, from, to }
let filesChanged = 0

function rewrite(file, text) {
  if (text === read(file)) return
  writeFileSync(join(root, file), text)
  filesChanged++
}

// --- Global counts across the overview pages --------------------------------
for (const file of GLOBAL_FILES) {
  let text
  try {
    text = read(file)
  } catch {
    continue // a missing global file is check-counts' problem to report, not ours
  }
  let next = text
  for (const { label, re, expected } of PATTERNS) {
    next = next.replace(re, (matched) => {
      const got = Number(matched.match(/\d+/)[0])
      if (got === expected) return matched
      edits.push({ file, label, from: got, to: expected })
      return matched.replace(/\d+/, String(expected))
    })
  }
  rewrite(file, next)
}

// --- Per-provider page header: "**Modes:** … **Models:** N" -----------------
for (const provider of providers) {
  const file = `reference/providers/${provider.id}.md`
  let text
  try {
    text = read(file)
  } catch {
    continue // missing provider page is a check-counts failure, not a fixable one
  }
  const want = providerCountById[provider.id]
  const next = text.replace(PROVIDER_HEADER_RE, (matched, got) => {
    if (Number(got) === want) return matched
    edits.push({ file, label: `${provider.id} header`, from: Number(got), to: want })
    return matched.replace(/\d+/, String(want))
  })
  rewrite(file, next)
}

// --- Report -----------------------------------------------------------------
const summary =
  `Target: ${total} models, ${providerCount} providers ` +
  `(${Object.entries(modeCount).map(([mode, c]) => `${mode} ${c}`).join(', ')}).`

if (!edits.length) {
  console.log(`✓ Counts already correct — nothing to fix.\n  ${summary}`)
} else {
  console.log(`✓ Fixed ${edits.length} count(s) across ${filesChanged} file(s).\n  ${summary}\n`)
  for (const e of edits) console.log(`  - ${e.file}: ${e.label} ${e.from} → ${e.to}`)
}
