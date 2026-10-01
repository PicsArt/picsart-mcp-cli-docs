# Picsart CLI and MCP documentation

Read the [published documentation](https://picsart.github.io/picsart-mcp-cli-docs/), starting with the [CLI quickstart](https://picsart.github.io/picsart-mcp-cli-docs/guide/cli-quickstart) or [MCP connection guide](https://picsart.github.io/picsart-mcp-cli-docs/guide/mcp-quickstart).

This public repository is the source for the VitePress site and generated GitHub Wiki. Submit documentation changes here.

## Local development

From the repository root, with Node.js 20 or newer and Python 3.10 or newer:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

The development server prints its local URL. The production build is written to `.vitepress/dist`. These commands build documentation; installing the Picsart CLI separately requires Node.js 22 or newer.

## Catalog data

`scripts/data/catalog.json` records the SDK version and exported model descriptors. The CLI command and model snapshots alongside it document the release used for example validation. The hosted server can differ from both.

Regenerate the catalog and provider pages with:

```bash
node scripts/build-catalog-data.mjs scripts/data/catalog.json
node scripts/build-provider-pages.mjs scripts/data/catalog.json
npm run build
```

The provider generator replaces generated provider pages. Edit its templates to change those pages. To obtain a new SDK snapshot, install the intended `@picsart/ai-sdk` version in a development environment, then run `node scripts/export-sdk-catalog.mjs scripts/data/catalog.json`. Review the version, model changes, CLI compatibility, and examples before accepting the update.

## Publishing

The checked-in GitHub Actions workflow builds and deploys pushes to `main` when Actions and GitHub Pages are enabled for the repository. Open a pull request and follow the repository's review process.

To test the production subpath locally:

```bash
DOCS_BASE=/picsart-mcp-cli-docs/ npm run build
```

For a local Wiki export:

```bash
npm run wiki:build -- wiki-build
```

Review the generated Markdown before copying it into the separately managed Wiki repository. Exporting files does not publish them.

See [CONTRIBUTING.md](CONTRIBUTING.md) for validation and style requirements.

## Browser and regression checks

After `npm run build`, run `npm run test:docs` to test the documentation guards. To open every built page in Chromium, install the browser once and start the preview:

```bash
npx playwright install chromium
npm run preview
```

In another terminal, use the URL printed by the preview server:

```bash
npm run check:site -- http://localhost:4173/ /tmp/docs-browser-report.json
```

For a build using `DOCS_BASE=/picsart-mcp-cli-docs/`, start the preview with `DOCS_BASE=/picsart-mcp-cli-docs/ npm run preview` and include that subpath in the URL. Restart the preview after rebuilding so it serves the new asset filenames. The browser check verifies pages, local links and anchors, catalog controls, and mobile overflow. It does not test paid generation or external host sign-ins.

To regenerate the social image after installing Chromium, run `node scripts/make-og-image.mjs`. The build pins Vite 6.4.3 through an override because the current VitePress release requests an older affected Vite series. Recheck the build and browser checks before changing that override.
