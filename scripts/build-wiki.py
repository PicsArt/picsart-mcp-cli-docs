#!/usr/bin/env python3
"""Convert the VitePress docs into GitHub Wiki markdown pages.

Usage:
    python3 scripts/build-wiki.py <path-to-wiki-clone>

Reads the docs from this repo (the parent of scripts/) and writes wiki pages
into the given directory (a clone of <repo>.wiki.git). It strips VitePress
frontmatter, rewrites /guide and /reference links to wiki page names, converts
:::tip/warning containers to blockquotes, and replaces the interactive
ModelCatalog / ProviderGrid components with static Markdown tables generated
from .vitepress/theme/data/{models,providers}.json. It also generates Home.md,
_Sidebar.md, and _Footer.md.

The GitHub Wiki has no API to create its FIRST page — create one page via the
web UI once, then this script + a git push keep it in sync.
"""
import re, os, sys, json, glob

SRC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # docs-site/
DATA = os.path.join(SRC, '.vitepress/theme/data')

if len(sys.argv) < 2:
    sys.exit('usage: build-wiki.py <path-to-wiki-clone>')
WIKI = os.path.abspath(sys.argv[1])

providers = json.load(open(f'{DATA}/providers.json'))
models = json.load(open(f'{DATA}/models.json'))


# Providers retired from the catalog whose reference page is kept as a tombstone
# so existing inbound links keep resolving. They are absent from providers.json
# by definition, so the wiki has to be told about them explicitly — otherwise the
# page is silently dropped here while it still exists on the Pages site, and any
# link to it (e.g. from the changelog) dangles.
RETIRED_PROVIDERS = ['pika']


def prov_page(pid):
    return 'Provider-' + pid.capitalize()


route2page = {
    '/changelog': 'Changelog',
    '/guide/introduction': 'Introduction',
    '/guide/installation': 'Installation',
    '/guide/authentication': 'Authentication',
    '/guide/cli-quickstart': 'CLI-Quickstart',
    '/guide/mcp-quickstart': 'MCP-Quickstart',
    '/guide/skills': 'Skills',
    '/guide/generating': 'Generating-Media',
    '/guide/files-and-drive': 'Files-and-Drive',
    '/guide/pricing': 'Pricing',
    '/guide/batch': 'Batch',
    '/reference': 'Model-Reference',
    '/reference/': 'Model-Reference',
    '/reference/catalog': 'Model-Catalog',
    '/reference/image': 'Image-Generation',
    '/reference/video': 'Video-Generation',
    '/reference/audio': 'Audio-Generation',
    '/reference/text': 'Text-And-Analysis',
    '/reference/providers': 'Providers',
    '/reference/providers/': 'Providers',
}
for _pid in [p['id'] for p in providers] + RETIRED_PROVIDERS:
    route2page[f'/reference/providers/{_pid}'] = prov_page(_pid)

src2out = {
    'changelog.md': 'Changelog.md',
    'guide/introduction.md': 'Introduction.md',
    'guide/installation.md': 'Installation.md',
    'guide/authentication.md': 'Authentication.md',
    'guide/cli-quickstart.md': 'CLI-Quickstart.md',
    'guide/mcp-quickstart.md': 'MCP-Quickstart.md',
    'guide/skills.md': 'Skills.md',
    'guide/generating.md': 'Generating-Media.md',
    'guide/files-and-drive.md': 'Files-and-Drive.md',
    'guide/pricing.md': 'Pricing.md',
    'guide/batch.md': 'Batch.md',
    'reference/index.md': 'Model-Reference.md',
    'reference/image.md': 'Image-Generation.md',
    'reference/video.md': 'Video-Generation.md',
    'reference/audio.md': 'Audio-Generation.md',
    'reference/text.md': 'Text-And-Analysis.md',
}
for _pid in [p['id'] for p in providers] + RETIRED_PROVIDERS:
    src2out[f'reference/providers/{_pid}.md'] = prov_page(_pid) + '.md'



# --- Concept guides and per-agent integration guides -------------------------
# These landed in the repo via PR and were originally hand-placed on the wiki,
# so the generator did not know about them: regenerating would delete 26 live
# pages and leave 31 dangling /guide/... links. The wiki page names below match
# the ones already published, so this stays a no-op rename-wise.
EXTRA_GUIDES = {
    'guide/what-is-mcp.md': 'What-Is-MCP',
    'guide/which-tool.md': 'Which-Tool',
    'guide/rest-api.md': 'REST-API',
    'guide/sdk.md': 'SDK',
    'guide/local-files.md': 'Local-Files',
    'guide/media-tools.md': 'Media-Tools',
    'guide/integrations/index.md': 'Integrations',
}
# Vendor slug -> wiki page suffix, where simple capitalisation would be wrong.
INTEGRATION_NAMES = {
    'anythingllm': 'AnythingLLM', 'chatgpt': 'ChatGPT', 'claude-code': 'Claude-Code',
    'codex': 'Codex', 'copilot-studio': 'Copilot-Studio', 'cursor': 'Cursor',
    'dify': 'Dify', 'gemini-cli': 'Gemini-CLI', 'goose': 'Goose', 'gumloop': 'Gumloop',
    'hermes-agent': 'Hermes-Agent', 'librechat': 'LibreChat', 'lm-studio': 'LM-Studio',
    'lobehub': 'LobeHub', 'n8n': 'n8n', 'nemoclaw': 'NemoClaw',
    'open-webui': 'Open-WebUI', 'openclaw': 'OpenClaw', 'raycast': 'Raycast',
    'vscode': 'VS-Code', 'windsurf': 'Windsurf',
}
for _slug, _name in INTEGRATION_NAMES.items():
    EXTRA_GUIDES[f'guide/integrations/{_slug}.md'] = f'Integration-{_name}'

for _src, _page in EXTRA_GUIDES.items():
    route2page['/' + _src[:-3]] = _page
    src2out[_src] = _page + '.md'
# directory-style links, e.g. [..](/guide/integrations/)
route2page['/guide/integrations'] = 'Integrations'
route2page['/guide/integrations/'] = 'Integrations'


def strip_frontmatter(text):
    if text.startswith('---'):
        end = text.find('\n---', 3)
        if end != -1:
            text = text[text.find('\n', end + 1) + 1:]
    return text.lstrip('\n')


def convert_containers(text):
    def repl(m):
        kind, title, body = m.group(1), m.group(2).strip(), m.group(3)
        head = title if title else kind.upper()
        lines = ['> **' + head + '**', '>']
        for ln in body.strip('\n').split('\n'):
            lines.append('> ' + ln if ln.strip() else '>')
        return '\n'.join(lines)
    return re.sub(r':::\s*(tip|warning|info|danger|note|details)\s*([^\n]*)\n(.*?)\n:::',
                  repl, text, flags=re.S)


def rewrite_links(text):
    def repl(m):
        label, path, anchor = m.group(1), m.group(2), m.group(3) or ''
        page = route2page.get(path) or route2page.get(path.rstrip('/'))
        return f'[{label}]({page}{anchor})' if page else m.group(0)
    return re.sub(r'\[([^\]]+)\]\((/[^)\s#]*)(#[^)]*)?\)', repl, text)


def convert(text):
    return (rewrite_links(convert_containers(strip_frontmatter(text)))).rstrip() + '\n'


os.makedirs(WIKI, exist_ok=True)
written = []
for src, out in src2out.items():
    open(f'{WIKI}/{out}', 'w').write(convert(open(f'{SRC}/{src}').read()))
    written.append(out)

INPUT_LABELS = {'t2i': 'Text→Image', 'i2i': 'Image→Image', 't2v': 'Text→Video',
                'i2v': 'Image→Video', 'v2v': 'Video→Video', 'a2v': 'Audio→Video',
                'tts': 'Text→Speech', 'sts': 'Speech→Speech', 'sfx': 'Sound FX', 'music': 'Music',
                'i2t': 'Image→Text', 'v2t': 'Video→Text'}
plabel = {p['id']: p['label'] for p in providers}

cat = ['# Model Catalog', '',
       f'All **{len(models)} models** from **{len(providers)} providers**. Every model works from both the [CLI Quickstart](CLI-Quickstart) and [MCP Quickstart](MCP-Quickstart) with the same id. Click a provider for CLI + MCP examples and parameters.', '']
for mode, title in [('image', 'Image'), ('video', 'Video'), ('audio', 'Audio'), ('text', 'Text & Analysis')]:
    ms = [m for m in models if m['mode'] == mode]
    cat += [f'## {title} ({len(ms)})', '', '| Model | id | Provider | Type |', '|---|---|---|---|']
    for m in sorted(ms, key=lambda x: (x['provider'], x['name'])):
        io = INPUT_LABELS.get(m['inputType'], m['inputType'])
        cat.append(f"| {m['name']} | `{m['id']}` | [{plabel.get(m['provider'], m['provider'])}]({prov_page(m['provider'])}) | {io} |")
    cat.append('')
open(f'{WIKI}/Model-Catalog.md', 'w').write('\n'.join(cat))
written.append('Model-Catalog.md')

pv = ['# Providers', '',
      f'The **{len(providers)} providers** behind Picsart AI Playground. Each page lists its models with CLI + MCP examples, a parameters table, and links to the vendor + official API docs.', '',
      '| Provider | Models | Modes |', '|---|---|---|']
for p in sorted(providers, key=lambda x: (-x['count'], x['label'])):
    pv.append(f"| [{p['label']}]({prov_page(p['id'])}) | {p['count']} | {' · '.join(p['modes'])} |")
pv += ['', 'Browse individual models in the [Model Catalog](Model-Catalog).']
open(f'{WIKI}/Providers.md', 'w').write('\n'.join(pv))
written.append('Providers.md')

home = f'''# Picsart CLI & MCP

**AI generation for your terminal & agents.** Generate image, video, and audio across **{len(models)} models from {len(providers)} providers** — from your terminal with the gen-ai CLI, or from any AI agent via Skills and MCP.

> 📘 This is the GitHub Wiki edition of the docs. A themed version (with interactive model catalog) lives in the [repo](https://github.com/PicsArt/picsart-mcp-cli-docs).

## Start here

- **[Introduction](Introduction)** — what this is and the three ways to use it
- **[Installation](Installation)** — install the CLI, connect agents
- **[Authentication](Authentication)** — OAuth web login (`gen-ai login`)

## Interfaces

- **[CLI Quickstart](CLI-Quickstart)** — one terminal command for the whole catalog
- **[MCP Quickstart](MCP-Quickstart)** — connect Claude, Cursor, Windsurf, ChatGPT, Codex
- **[Skills](Skills)** — drop-in `.zip` bundles; generate in plain English

## Concepts

- **[Generating media](Generating-Media)** · **[Files & Drive](Files-and-Drive)** · **[Pricing & Credits](Pricing)** · **[Batch & Automation](Batch)**

## Connect your agent

- **[What is MCP?](What-Is-MCP)** · **[Which tool should I use?](Which-Tool)** · **[All integrations](Integrations)**
- Popular: [Claude Code](Integration-Claude-Code) · [Cursor](Integration-Cursor) · [VS Code](Integration-VS-Code) · [ChatGPT](Integration-ChatGPT) · [Windsurf](Integration-Windsurf) · [n8n](Integration-n8n)

## Build on it

- **[REST API](REST-API)** · **[SDK](SDK)** · **[Local files](Local-Files)** · **[Media tools](Media-Tools)**

## Model Reference

- **[Model Reference](Model-Reference)** — overview
- **[Model Catalog](Model-Catalog)** — all {len(models)} models
- **[Providers](Providers)** — all {len(providers)} providers
- By mode: [Image](Image-Generation) · [Video](Video-Generation) · [Audio](Audio-Generation)

## Changelog

- **[Changelog](Changelog)** — new models, providers, and docs updates

> **Prefer a visual UI?** The [AI Playground app](https://picsart.com/ai-playground/) is the point-and-click web app for the same catalog.
'''
open(f'{WIKI}/Home.md', 'w').write(home)
written.append('Home.md')

sb = ['### Picsart CLI & MCP', '',
      '**Getting Started**', '',
      '- [Introduction](Introduction)', '- [Installation](Installation)', '- [Authentication](Authentication)', '',
      '**Interfaces**', '',
      '- [CLI Quickstart](CLI-Quickstart)', '- [MCP Quickstart](MCP-Quickstart)', '- [Skills](Skills)', '',
      '**Concepts**', '',
      '- [Generating media](Generating-Media)', '- [Files & Drive](Files-and-Drive)', '- [Pricing](Pricing)', '- [Batch](Batch)', '',
      '**Connect your agent**', '',
      '- [What is MCP?](What-Is-MCP)', '- [Which tool?](Which-Tool)', '- [All integrations](Integrations)', '',
      '**Build on it**', '',
      '- [REST API](REST-API)', '- [SDK](SDK)', '- [Local files](Local-Files)', '- [Media tools](Media-Tools)', '',
      '**Model Reference**', '',
      '- [Overview](Model-Reference)', '- [Model Catalog](Model-Catalog)', '- [Image](Image-Generation)', '- [Video](Video-Generation)', '- [Audio](Audio-Generation)', '',
      '**Providers**', '',
      '- [All providers](Providers)']
for p in sorted(providers, key=lambda x: x['label'].lower()):
    sb.append(f"- [{p['label']}]({prov_page(p['id'])})")
sb += ['', '**More**', '', '- [Changelog](Changelog)']
open(f'{WIKI}/_Sidebar.md', 'w').write('\n'.join(sb) + '\n')
written.append('_Sidebar.md')

open(f'{WIKI}/_Footer.md', 'w').write(
    'Picsart CLI & MCP · [Repo](https://github.com/PicsArt/picsart-mcp-cli-docs) · [AI Playground app](https://picsart.com/ai-playground/)\n')
written.append('_Footer.md')

print(f'Wrote {len(written)} wiki pages to {WIKI}')
leftover = 0
for f in glob.glob(f'{WIKI}/*.md'):
    for hit in re.findall(r'\]\((/(?:guide|reference)[^)]*)\)', open(f).read()):
        leftover += 1
        print('  LEFTOVER LINK', os.path.basename(f), hit)
print('leftover internal links:', leftover)
