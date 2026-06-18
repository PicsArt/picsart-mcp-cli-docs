# Picsart CLI & MCP — Docs

Public developer documentation for the **Picsart gen-ai CLI**, the **Picsart MCP server**, and drop-in **Skills** — generate image, video, and audio across 141 models from 28 providers, from your terminal or any AI agent.

🔗 **Live site:** https://picsart.github.io/picsart-mcp-cli-docs/

Built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages via [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) on every push to `main`.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static build → .vitepress/dist
npm run preview    # preview the production build
```

## Structure

```
.vitepress/config.ts     # nav, sidebar, theme
index.md                 # home (hero)
guide/                   # getting started + CLI / MCP / Skills + concepts
reference/               # model reference: catalog, per-mode, per-provider
  providers/             # one page per vendor (28)
.vitepress/theme/        # Picsart brand theme + ModelCatalog / ProviderGrid components + generated data
```

## Keeping the catalog fresh

`/.vitepress/theme/data/{models,providers}.json` are generated from the live Picsart catalog. Regenerate them when models change so the Model Catalog and Providers pages stay accurate.

## Notes

- Authentication is **OAuth web login** (`gen-ai login`) — no API keys.
- The MCP and Skills pages link to the canonical setup at [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) and [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
