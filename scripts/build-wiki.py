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


def prov_page(pid):
    return 'Provider-' + pid.capitalize()


# Discover every source page so new guides cannot silently disappear from the Wiki.
from pathlib import Path
src2out = {}
route2page = {'/': 'Home'}
for path in [Path(SRC)/'changelog.md', *sorted((Path(SRC)/'guide').rglob('*.md')), *sorted((Path(SRC)/'reference').rglob('*.md'))]:
    rel = path.relative_to(SRC).as_posix()
    route = '/' + rel.removesuffix('.md')
    page = '-'.join(part.capitalize() for part in route.strip('/').split('/'))
    if route.startswith('/reference/providers/') and path.stem != 'index':
        page = prov_page(path.stem)
    src2out[rel] = page + '.md'
    route2page[route] = page
    if path.stem == 'index':
        route2page[route.removesuffix('/index')] = page
        route2page[route.removesuffix('index')] = page
# Stable names used by existing Wiki links.
for route,page in {'/reference/catalog':'Model-Catalog','/reference/providers':'Providers','/guide/cli-quickstart':'CLI-Quickstart','/guide/mcp-quickstart':'MCP-Quickstart'}.items():
    source = route.strip('/') + (('/index' if route == '/reference/providers' else '')) + '.md'
    src2out[source] = page + '.md'
    route2page[route] = page
    if source.endswith('/index.md'):
        route2page[route+'/'] = page
        route2page[route+'/index'] = page

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
                'i2t': 'Image→Text', 'v2t': 'Video→Text', 'a2t': 'Audio→Text', 't2a': 'Text→Audio', 'v2a': 'Video→Audio'}
plabel = {p['id']: p['label'] for p in providers}

cat = ['# Model Catalog', '',
       f'All **{len(models)} models** from **{len(providers)} providers**. This is the versioned SDK snapshot. Availability differs in the CLI and hosted MCP server; inspect the connected catalog before submitting. See the [CLI Quickstart](CLI-Quickstart) and [MCP Quickstart](MCP-Quickstart).', '']
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
      f'The **{len(providers)} providers** behind Picsart AI Playground. Provider pages list snapshot models, parameters, and examples where a static example is available.', '',
      '| Provider | Models | Modes |', '|---|---|---|']
for p in sorted(providers, key=lambda x: (-x['count'], x['label'])):
    pv.append(f"| [{p['label']}]({prov_page(p['id'])}) | {p['count']} | {' · '.join(p['modes'])} |")
pv += ['', 'Browse individual models in the [Model Catalog](Model-Catalog).']
open(f'{WIKI}/Providers.md', 'w').write('\n'.join(pv))
written.append('Providers.md')

home = ['# Picsart CLI and MCP', '', 'Use the CLI in a terminal or connect a supported agent through hosted MCP. The catalog also includes text models.', '', 'This Wiki is generated from the [documentation repository](https://github.com/PicsArt/picsart-mcp-cli-docs).', '', '## Pages', '']
for source, filename in src2out.items():
    if source.startswith('reference/providers/') and not source.endswith('/index.md'):
        continue
    title = next((line[2:] for line in open(f'{SRC}/{source}').read().splitlines() if line.startswith('# ')), filename[:-3])
    home.append(f'- [{title}]({filename[:-3]})')
open(f'{WIKI}/Home.md', 'w').write('\n'.join(home) + '\n')
written.append('Home.md')
sb = ['### Picsart CLI and MCP', '', '[Home](Home)', ''] + home[8:] + ['', '### Providers', '']
for p in sorted(providers, key=lambda x: x['label'].lower()):
    sb.append(f"- [{p['label']}]({prov_page(p['id'])})")
open(f'{WIKI}/_Sidebar.md', 'w').write('\n'.join(sb) + '\n')
written.append('_Sidebar.md')

open(f'{WIKI}/_Footer.md', 'w').write(
    'Picsart CLI & MCP · [Repo](https://github.com/PicsArt/picsart-mcp-cli-docs) · [AI Playground app](https://picsart.com/ai-playground/)\n')
written.append('_Footer.md')

print(f'Wrote {len(set(written))} Wiki pages to {WIKI}')
leftover = 0
for f in glob.glob(f'{WIKI}/*.md'):
    for hit in re.findall(r'\]\((/(?:guide|reference)[^)]*)\)', open(f).read()):
        leftover += 1
        print('  LEFTOVER LINK', os.path.basename(f), hit)
print('leftover internal links:', leftover)

if leftover:
    sys.exit(1)
