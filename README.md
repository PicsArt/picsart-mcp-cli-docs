# Picsart CLI & MCP — Docs

Public developer documentation for the **Picsart gen-ai CLI**, the **Picsart MCP server**, and drop-in **Skills** — generate image, video, and audio across 176 models from 31 providers, from your terminal or any AI agent. Built with [VitePress](https://vitepress.dev/).

- **Authoritative copy:** the public repo, https://github.com/PicsArt/picsart-mcp-cli-docs — it accepts pull requests directly, so it **can and does run ahead** of the mirror below.
- **Mirror:** `docs-site/` inside the private `ai-toolkit` monorepo. Catalog refreshes are usually authored here, but this folder goes stale the moment a PR lands publicly. **Always reconcile before publishing** — see [Publishing](#publishing).
- **Themed site (live):** https://picsart.github.io/picsart-mcp-cli-docs/
- **Live wiki (public, no Actions needed):** https://github.com/PicsArt/picsart-mcp-cli-docs/wiki

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
    providers/                # one page per vendor (31)
  public/llms.txt             # generated AI-agent site map (llmstxt.org)
  scripts/build-llms.mjs      # generates public/llms.txt from the catalog data
  scripts/check-counts.mjs    # fails the build if prose model/provider counts drift
  scripts/build-wiki.py       # converts these docs → GitHub Wiki markdown
```

## Data freshness

`.vitepress/theme/data/{models,providers}.json` are generated from the installed SDK catalog.
Run `node scripts/export-sdk-catalog.mjs <output.json>`, then pass that file to
`build-catalog-data.mjs` and `build-provider-pages.mjs` when the catalog changes so the Model Catalog,
Providers grid, and the generated wiki tables stay accurate.

`public/llms.txt` (the [llmstxt.org](https://llmstxt.org) agent map) is generated from those
same JSON files, so it tracks the real model/provider counts. `npm run build` regenerates it
automatically; run it standalone with `npm run llms`. Like `robots.txt`/`sitemap`, it hardcodes
the production GitHub Pages subpath — override with `DOCS_HOSTNAME` / `DOCS_BASE` (e.g. on a
custom-domain move) and re-run.

The hand-written counts in prose (`176 models`, `65 image models`, `31 providers`, each
provider page's `**Models:** N`) are guarded by `npm run check:counts`, which recomputes the
truth from the same JSON and fails the build on any mismatch — so a stale count can't ship.
Run it standalone with `npm run check:counts`.

---

## Publishing

The docs live in **`PicsArt/picsart-mcp-cli-docs`** (public), with two delivery surfaces: GitHub Pages and the GitHub Wiki. Both are published from the public repo, and **both must be updated** — Pages deploys itself, the Wiki does not.

> [!WARNING]
> **Never copy `docs-site/` over the public repo root.** The public repo takes PRs
> directly, so it routinely holds work this folder has never seen. As of 2026-08-25
> that was an entire catalog refresh, 21 integration guides, 6 concept guides, the
> community files, and a stricter `check-counts.mjs`. A blind mirror would have
> deleted **32 tracked files, including `.github/workflows/deploy-docs.yml`** — the
> workflow that deploys the site.

### Publishing a change: generate inside a clone of the public repo

Work in the public repo, not in `docs-site/`. That way the public content is the
base and your change is a diff on top of it, rather than a replacement of it.

```bash
git clone https://github.com/PicsArt/picsart-mcp-cli-docs.git /tmp/pubdocs
cd /tmp/pubdocs

# apply the change here — for a catalog refresh, run the generator chain:
node scripts/export-sdk-catalog.mjs /tmp/catalog.json   # from a dir with @picsart/ai-sdk installed
node scripts/build-catalog-data.mjs   /tmp/catalog.json
node scripts/build-provider-pages.mjs /tmp/catalog.json

npm ci && npm run build          # runs check:counts; VitePress fails on dead links
```

**Before committing, prove you are not deleting anything:**

```bash
git status --porcelain | grep '^ D' && echo "STOP — this would delete files" || echo "safe: no deletions"
git add -A && git commit -m "docs: <what changed>" && git push origin main
```

Then **sync the Wiki** (Route B below) — Pages auto-deploys, the Wiki never does.

Finally, **reconcile the mirror** so the next refresh diffs against reality:

```bash
rsync -a --delete --exclude '.git/' --exclude 'node_modules/' \
  --exclude '.vitepress/dist/' --exclude '.vitepress/cache/' --exclude '.wiki/' \
  /tmp/pubdocs/ <ai-toolkit>/docs-site/
```

> Compute any model delta against the **published** `.vitepress/theme/data/models.json`,
> never the local one. Diffing against a stale mirror silently miscounts what is new.

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

# 2. regenerate all wiki pages from these docs (81 pages: guide + integrations + reference + 31 providers + Home/_Sidebar/_Footer)
npm run wiki:build -- .wiki        # = python3 scripts/build-wiki.py .wiki

# 3. publish
cd .wiki
git status --porcelain | grep '^ D' && echo "STOP — pages would be deleted" || echo "safe: no deletions"
git add -A && git commit -m "docs: sync wiki"
git push origin master             # GitHub wikis use the 'master' branch
```

`scripts/build-wiki.py` strips VitePress frontmatter, rewrites `/guide` and `/reference`
links to wiki page names, converts `:::tip/warning` containers to blockquotes, and replaces
the `<ModelCatalog>` / `<ProviderGrid>` components with static tables built from the data JSON.
