#!/usr/bin/env node
// Generate `public/llms.txt`: the AI-agent navigation map (https://llmstxt.org).
//
// Curated, link-first index of the docs so an LLM can find the right page in one
// fetch. Generated from the model catalog JSON the Model Catalog uses, so it can't
// drift from the real model/provider counts.
//
// URLs are absolute. Like `public/robots.txt` and the sitemap, the committed file
// hardcodes the production GitHub Pages subpath; override with DOCS_HOSTNAME /
// DOCS_BASE (e.g. when the site moves to a custom domain), then re-run:
//   node scripts/build-llms.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const dataDir = join(here, '..', '.vitepress', 'theme', 'data')
const models = JSON.parse(readFileSync(join(dataDir, 'models.json'), 'utf8'))
const providers = JSON.parse(readFileSync(join(dataDir, 'providers.json'), 'utf8'))

// Default to the live deployment so the committed artifact matches production,
// matching the robots.txt / sitemap convention. config.ts defaults base to '/'
// and relies on DOCS_BASE in CI; here we default to the project subpath because
// this is a static file served as-is, not templated at build time.
const HOSTNAME = process.env.DOCS_HOSTNAME || 'https://picsart.github.io'
const base = process.env.DOCS_BASE || '/picsart-mcp-cli-docs/'
const origin = HOSTNAME + base.replace(/\/$/, '') // no trailing slash; paths add it

const url = (path) => `${origin}${path}`

const byMode = models.reduce((acc, m) => ((acc[m.mode] = (acc[m.mode] || 0) + 1), acc), {})
const total = models.length
const providerCount = providers.length

// Stable, human-friendly mode ordering for the provider summaries.
const MODE_ORDER = ['image', 'video', 'audio', 'text']
const orderModes = (modes) =>
  [...modes].sort((a, b) => MODE_ORDER.indexOf(a) - MODE_ORDER.indexOf(b)).join(', ')

const link = (label, path, desc) => `- [${label}](${url(path)})${desc ? `: ${desc}` : ''}`

const out = []
out.push('# Picsart gen-ai CLI, MCP & Skills')
out.push('')
out.push(`> Documentation for the Picsart CLI, hosted MCP, and application APIs. The SDK snapshot contains ${total} models from ${providerCount} providers.`)
out.push('')
out.push('Catalogs can differ by release. Authenticate each interface separately and validate inputs before generating.')
out.push('')
out.push('## Getting started')
out.push(link('Introduction', '/guide/introduction', 'choose an interface'))
out.push(link('Installation', '/guide/installation', 'install the gen-ai CLI (npm or install script)'))
out.push(link('Authentication', '/guide/authentication', 'CLI, hosted OAuth, and application credentials'))
out.push('')

out.push('## Interfaces')
out.push(link('Integrations', '/guide/integrations/', 'host setup and compatibility limitations'))
out.push(link('SDK', '/guide/sdk', 'TypeScript applications'))
out.push(link('REST API', '/guide/rest-api', 'HTTP workflow reference'))
out.push(link('CLI Quickstart', '/guide/cli-quickstart', 'generate, batch, pipe, upload from the terminal'))
out.push(link('MCP Quickstart', '/guide/mcp-quickstart', 'connect a supported agent using hosted MCP'))
out.push(link('Skills', '/guide/skills', 'instructions for agents with working execution tools'))
out.push('')

out.push('## Concepts')
out.push(link('Local files', '/guide/local-files', 'upload files and supply reachable input URLs'))
out.push(link('Media tools', '/guide/media-tools', 'compose, inspect, validate, and render scenes'))
out.push(link('Security', '/guide/security', 'credentials and asset access'))
out.push(link('Errors and rate limits', '/guide/rate-limits', 'recovery without duplicate submissions'))
out.push(link('Generating media', '/guide/generating', 'prompts, inputs, aspect ratio, duration, outputs'))
out.push(link('Files & Drive', '/guide/files-and-drive', 'upload, download, and list files on Picsart Drive'))
out.push(link('Pricing & Credits', '/guide/pricing', 'per-generation credit cost; estimate before running'))
out.push(link('Batch & Automation', '/guide/batch', 'JSON manifests and directory processing'))
out.push('')

out.push('## Model reference')
out.push(link('Model Reference overview', '/reference/', `all ${total} models, how to read a provider page`))
out.push(link('Model Catalog', '/reference/catalog', 'searchable, filterable catalog of every model'))
out.push(link('Image generation', '/reference/image', `${byMode.image} image models`))
out.push(link('Video generation', '/reference/video', `${byMode.video} video models`))
out.push(link('Audio generation', '/reference/audio', `${byMode.audio} audio models`))
out.push(link('Text and analysis', '/reference/text', `${byMode.text} text models`))
out.push('')
out.push('## Providers')
out.push(
  `Each provider page lists its models and parameters, with CLI and MCP examples where available. Parameters use the ` +
    `versioned SDK snapshot.`,
)
out.push(link('All providers', '/reference/providers/', `index of all ${providerCount} providers`))
for (const p of providers) {
  const plural = p.count === 1 ? 'model' : 'models'
  out.push(
    link(p.label, `/reference/providers/${p.id}`, `${p.count} ${plural}: ${orderModes(p.modes)}`),
  )
}
out.push('')

out.push('## Optional')
out.push(link('Changelog', '/changelog', 'recent catalog and CLI/MCP changes'))
out.push(`- [AI Playground app](https://picsart.com/ai-playground/): browser-based web UI for the model catalog`)
out.push('')

const text = out.join('\n')
const target = join(here, '..', 'public', 'llms.txt')
writeFileSync(target, text)
console.log(
  `Wrote public/llms.txt: ${total} models, ${providerCount} providers, origin ${origin}`,
)
