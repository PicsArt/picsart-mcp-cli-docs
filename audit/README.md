# Documentation audit

This audit covers the documentation checkout based on commit `5a50aaf825ba4f3c2a4b2ecc38dce3c7a0e52075`, with fixes on `docs/validated-documentation`. It uses released CLI `@picsart/gen-ai` 2.78.0, SDK `@picsart/ai-sdk` 6.18.0, and the connected production MCP server inspected September 29, 2026. Final browser verification continued into September 30 local time. Source review covers 87 Markdown pages: 83 site pages and four repository/contributor pages. Audit reports are excluded from the site build.

## Technical review and fixes

Reviewed each page, its examples, and the generator that owns it. Corrected unsupported CLI flags and invocation forms, the nonexistent local MCP executable, hosted endpoint and OAuth setup, separate credential types, defaults for downloads and Drive saves, batch manifest/result paths, model-specific input shapes, pricing limitations, and timeout/retry guidance. Replaced obsolete model tables with a versioned SDK export. The documentation now states where CLI, SDK, and hosted catalogs differ instead of promising equal availability.

Reviewed 22 host integration guides against their linked first-party documentation. AnythingLLM, LM Studio, LobeHub, and NemoClaw now explicitly identify unestablished Picsart OAuth compatibility. The other guides describe the documented host configuration but do not claim successful signed-in runtime tests. Dynamic account-dependent model IDs remain a stated prerequisite where a standalone lookup could not be verified.

The Wiki exporter now includes every site source page, rewrites guide links, and generates catalog/navigation tables without claiming universal model availability. The agent index, social image, metadata helper, and integration-review prompt generator were corrected as well. The latter prepares review commands; it does not pretend to perform validation.

## Independent review loops

An independent technical-copy reviewer inspected all source pages and relevant generators/components. Round 1 identified the main instruction and terminology issues. Round 2 found four remaining defects: incomplete creative inputs, missing Text catalog controls/labels, inconsistent compatibility caveats, and generic media instructions for text output. All were fixed. [Round 3](copy-review-3.md) reports no remaining actionable technical-copy findings.

The separate style pass began after the [research](style-research.md) was written and the technical-copy loop closed. Prose dashes, decorative emoji, unsupported promotion, and formulaic wording were removed while retaining code syntax and literal catalog data. [Style round 1](style-review-1.md) found three more generated-copy defects; all were fixed. [Style round 2](style-review-2.md) reports zero actionable findings.

## Validation evidence

- [Page and command inventory](page-command-inventory.json): all 87 source pages, 273 JSON blocks, 112 shell blocks, and 161 CLI command examples. JSON parsing, shell syntax, command/flag names, known model IDs, required model inputs, enum/range checks, and local Markdown targets pass.
- [Released CLI parser results](parser-results.json): all 161 command examples parsed using the installed 2.78.0 command definitions. Parsing does not submit a generation.
- [CLI model validation](validation-results.json): 42 concrete generation examples passed `gen-ai validate`. Two input-directory/prompt-loop templates were excluded from direct model validation because their values come from user files.
- [Production MCP preflight](mcp-preflight-results.json): all 30 generated provider examples were accepted; [seven guide and mode examples](guide-preflight-results.json) also passed, covering all 37 documented generic generation payloads. The same examples passed SDK validation. Placeholder URLs were not fetched (`probed: false`), and a null price estimate remains unknown.
- The SDK guide's JavaScript example executed successfully. The export script reproduced the checked-in 220-model, 31-provider snapshot. All 215 CLI model schemas used for compatibility checks were collected from the released CLI.
- The documented batch manifest passed the actual `batch run --dry-run` command with three jobs. The actual CLI skill installer created eight skill directories in a temporary destination. No user's skill directory was changed.
- [External link results](external-links.json): all 39 distinct linked documentation destinations returned HTTP 200 after redirects. A successful fetch proves reachability, not the content of a host sign-in flow.
- Clean `npm ci`, root and production-subpath documentation builds, style checks, and negative regression tests passed. The documented development server also started successfully. Build prerequisites now include Python 3.10 or newer, and CI explicitly installs Python 3.12. The regression tests reject formerly documented invalid flags, omitted required prompts, bad enum values, and forbidden prose punctuation, while preserving CLI and Markdown syntax.
- The generated Wiki contains 85 distinct Markdown files (83 source pages, with Home replacing the site's index, plus sidebar and footer). Local page links and style checks pass.
- The social preview image and light/dark catalog screenshots were visually inspected. The [root-path browser report](browser-root.json) records all 83 rendered pages, 9,155 local links, 30 text models in the filter, and zero errors. The [production-subpath report](browser-subpath.json) records the separate GitHub Pages path run, also with 83 pages, 9,155 local links, and zero errors.

## Reproducing the checks

Follow README for installation, building, Wiki export, and browser checks. Run `npm run test:docs` to exercise failure cases in the documentation guards. `scripts/data/` contains pinned catalog and CLI metadata so routine documentation checks need no Picsart account.

`npm run check:site` opens the built pages in Chromium and checks local page/anchor destinations, browser errors, catalog controls and labels, and representative mobile overflow. Restart the preview after rebuilding. Set the same `DOCS_BASE` for build and preview when testing the GitHub Pages subpath. `DOCS_BROWSER_EXECUTABLE` optionally selects an installed compatible browser; the default uses Playwright's managed Chromium.

VitePress 1.6.4 currently requests an affected Vite 5 release series. The build uses a pinned Vite 6.4.3 override and updated compatible transitive dependencies. A clean installation reported zero known vulnerabilities. Playwright is pinned to 1.63.0; its documented browser-install command passed using the existing managed Chromium installation. Both build and browser validation are required before changing this override.

## Evidence boundaries

No paid model generations, exports, destructive Drive actions, account mutations, or full third-party OAuth sign-ins were performed. Commands requiring user files, returned job handles, credentials, or paid execution were inspected and checked at their applicable parser/schema layer; they are not reported as end-to-end successes. Windows PowerShell installation instructions were source-checked, not executed on Windows. Historical changelog entries remain identified as historical; current reference pages use the recorded release snapshots.

This audit resolves the defects found in these review loops. It cannot certify future provider behavior, private account entitlements, untested host versions, or the absence of every possible defect.
