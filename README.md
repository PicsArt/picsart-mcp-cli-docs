# Picsart CLI & MCP — Docs

Public developer documentation for the **Picsart gen-ai CLI**, the **Picsart MCP server**, and drop-in **Skills** — generate image, video, and audio across 165 models from 31 providers, from your terminal or any AI agent. Built with [VitePress](https://vitepress.dev/).

- **Source of truth:** this folder (`docs-site/`) inside the `ai-toolkit` repo.
- **Public repo:** https://github.com/PicsArt/picsart-mcp-cli-docs
- **Live wiki (public, no Actions needed):** https://github.com/PicsArt/picsart-mcp-cli-docs/wiki
- **Themed site (live):** https://picsart.github.io/picsart-mcp-cli-docs/

## Local development

```bash
cd docs-site
npm install
npm run dev        # http://localhost:5173 (or --port 4600)
npm run build      # static build → .vitepress/dist
npm run preview    # preview the production build
```

## Structure

```
docs-site/
  .vitepress/config.ts        # nav, sidebar (unified), theme
  .vitepress/theme/           # Picsart brand + ModelCatalog / ProviderGrid Vue components + data/
  index.md                    # home (hero)
  guide/                      # getting started + CLI / MCP / Skills + concepts
  reference/                  # model reference: catalog, per-mode, per-provider
    providers/                # one page per vendor (30)
  public/llms.txt             # generated AI-agent site map (llmstxt.org)
  scripts/build-llms.mjs      # generates public/llms.txt from the catalog data
  scripts/check-counts.mjs    # fails the build if prose model/provider counts drift
  scripts/build-wiki.py       # converts these docs → GitHub Wiki markdown
```

## Data freshness

`.vitepress/theme/data/{models,providers}.json` are generated from the live catalog
(`gen-ai models --json`). Regenerate them when the catalog changes so the Model Catalog,
Providers grid, and the generated wiki tables stay accurate.

`public/llms.txt` (the [llmstxt.org](https://llmstxt.org) agent map) is generated from those
same JSON files, so it tracks the real model/provider counts. `npm run build` regenerates it
automatically; run it standalone with `npm run llms`. Like `robots.txt`/`sitemap`, it hardcodes
the production GitHub Pages subpath — override with `DOCS_HOSTNAME` / `DOCS_BASE` (e.g. on a
custom-domain move) and re-run.

The hand-written counts in prose (`165 models`, `67 image models`, `31 providers`, each
provider page's `**Models:** N`) are guarded by `npm run check:counts`, which recomputes the
truth from the same JSON and fails the build on any mismatch — so a stale count can't ship.
Run it standalone with `npm run check:counts`.

---

## Publishing

The docs live in **`PicsArt/picsart-mcp-cli-docs`** (public). There are two delivery surfaces; keep both in sync from this `docs-site/` source.

### One-time / occasional: sync source to the public repo

The public repo's `main` mirrors this `docs-site/` folder at its root. To update it:

```bash
# from a clean checkout of docs-site/ contents (root of the public repo)
git add -A && git commit -m "docs: <what changed>"
git push origin main
```

> The `ai-toolkit` monorepo is private; never push its history to the public repo. Only the `docs-site/` contents (at the public repo root) + `.github/workflows/deploy-docs.yml` belong there.

### Route A — GitHub Pages (themed, interactive) ← live

`.github/workflows/deploy-docs.yml` auto-builds and deploys on every push to `main`.
It derives the base path from the repo name (`DOCS_BASE=/<repo>/`).

**Actions are enabled** (an org admin allowed them on 2026-06-18 — the PicsArt org disables
Actions by default) and Pages **Source = GitHub Actions** (`build_type: workflow`), so pushes
to `main` deploy automatically. To run a deploy by hand:

```bash
gh workflow run deploy-docs.yml --repo PicsArt/picsart-mcp-cli-docs --ref main
```

> Fallback if Actions is ever disabled again: build locally (`DOCS_BASE=/picsart-mcp-cli-docs/ npm run build`)
> and push `.vitepress/dist` to a `gh-pages` branch with Pages set to "deploy from branch".

### Route B — GitHub Wiki (plain, no Actions)

GitHub renders the wiki server-side, so it needs no Actions/Pages build. Plain Markdown,
so the interactive catalog/provider grids become **static tables**.

> **First-page caveat:** GitHub has no API to create a wiki's *first* page. Create one page
> via the web UI once (`/wiki` → "Create the first page" → Save). After that, `.wiki.git` is
> pushable and the steps below keep it in sync.

```bash
# 1. clone the wiki (separate git repo)
git clone https://github.com/PicsArt/picsart-mcp-cli-docs.wiki.git .wiki

# 2. regenerate all wiki pages from these docs (47 pages: guide + reference + 31 providers + Home/_Sidebar/_Footer)
npm run wiki:build -- .wiki        # = python3 scripts/build-wiki.py .wiki

# 3. publish
cd .wiki
git add -A && git commit -m "docs: sync wiki"
git push origin master             # GitHub wikis use the 'master' branch
```

`scripts/build-wiki.py` strips VitePress frontmatter, rewrites `/guide` and `/reference`
links to wiki page names, converts `:::tip/warning` containers to blockquotes, and replaces
the `<ModelCatalog>` / `<ProviderGrid>` components with static tables built from the data JSON.
