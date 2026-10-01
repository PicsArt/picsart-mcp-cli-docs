# Landing report: documentation changes

Reviewed September 30, 2026 against `/Users/Anubis/Desktop/index.html`, titled “Picsart MCP: landing page improvement plan.” The report describes `picsart.com/gen-ai-mcp/`; this repository builds the separate VitePress documentation site. Its findings were evaluated as review evidence, not as instructions to install plugins, authorize accounts, spend credits, publish artwork, or modify a different website.

## Disposition of all 12 findings

| Report finding | Documentation disposition | What remains outside this change |
|---|---|---|
| Model name split in hero | Already addressed in the docs catalog. Nano Banana labels come from the versioned model data; catalog guidance now distinguishes display names from exact IDs. | The reported marketing hero is not implemented here. |
| Conflicting catalog statistics | Added snapshot inspection date, source file, model-variant counting rules, provider-ID grouping, and explicit limits on enabled/account availability in `reference/catalog.md`. Existing generated totals remain 220 models and 31 catalog provider groups. | Did not claim that these SDK counts equal the live marketing, CLI, or hosted server inventory. |
| Image example contradicts itself | The new still-image starter prompt uses 4:3, matching the quickstart's preflight and generation payloads. Added contributor requirements for real input/output, dimensions, timing, and charged-credit evidence. | No generated image is presented as proof. Repairing the marketing page's square demo requires its source and generation record. |
| MCP examples teach CLI | Home now starts with assistant selection and a harmless assistant request. MCP quickstart offers image/video/audio prompts before developer details; JSON tool payloads are in expandable disclosures. Terminal setup remains a separately labeled path. | The marketing page's MCP/CLI selector and output cards are not in this repository. |
| Workflow fragment has no target | New starter links point to real Markdown headings. Documentation links and anchors are tested in the rendered build. | Did not change the external landing page's `#skills-starter` fragment. |
| Codex setup ambiguously labeled | Split the existing guide into desktop-app and Codex-CLI procedures. Updated navigation and the integration index, clarified same-host configuration sharing and the separate ChatGPT web path, and recorded the source-check date and tested CLI version. | Full OAuth and version-specific desktop UI sign-in were not performed. |
| Skill install stops at marketplace registration | Added the distinction between registering a marketplace and installing/enabling its plugin, with official Claude Code guidance. Preserved the previously tested bundled CLI installer. | Located the publisher's installation guide and documented both exact commands, including `picsart@picsart`. No marketplace plugin was installed in a clean profile. |
| Strong capability claims lack proof | Retained existing compatibility/parameter limits and added a publication rule requiring tested scope and evidence for brand consistency, extension length, and host coverage. Starter requests are labeled examples rather than completed results. | Did not endorse the marketing page's absolute claims or certify the proposed multi-step campaign. |
| Accessible section label disagrees with topic | Documentation uses explicit headings and separately labeled setup paths; it has no shared MCP/CLI mode selector of the kind described. | The external page's dynamic region-label defect remains a marketing frontend task. |
| Core content absent from text fetch | The documentation is statically rendered. Essential home/setup text is checked with browser JavaScript disabled. | Did not change the marketing site's rendering or assert an SEO indexing defect; no Search Console access was used. |
| Identical CTA labels lead to different products | Changed the home action to “Choose an assistant,” linked it to client selection, and labeled the Playground, CLI, SDK, and REST destinations explicitly. | The external marketing CTA system was not changed. |
| Cost clarity arrives too late | Added account/client prerequisites and credit guidance before MCP connection and beside the home hero action. Starter requests ask for validation and an estimate, then pause for approval; a missing estimate stops the proposed workflow. | No free-installation pricing guarantee, host subscription entitlement, or fixed generation price was invented. |

## Other recommendations

Applied a documentation-sized path: choose a client, authenticate, verify without generating, prepare a starter request, review the estimate, and retrieve the result. Kept the hosted endpoint available in copyable text. Did not add a local stdio setup because the released package inspected in the prior audit does not provide `gen-ai-mcp`.

Did not import the illustrative perfume artwork or present the three proposed campaign jobs as verified workflows. The report itself says the artwork is not a Picsart MCP result. Producing actual proof media and a recorded assistant journey would require separate execution and generation evidence.

Did not implement marketing analytics, conversion experiments, a persistent connection-state widget, a client selector, responsive proof media, or the proposed release schedule. Those are product/frontend work for the landing page, not documentation corrections. No competitor claim or qualitative comparison was promoted to measured conversion evidence.

## Sources and verification

- Official [OpenAI MCP configuration](https://learn.chatgpt.com/docs/extend/mcp) and [developer settings](https://learn.chatgpt.com/docs/developer-settings) checked for app/CLI setup boundaries. `codex mcp add --help` was inspected locally on `codex-cli 0.158.0-alpha.2`; no registration or login command was executed.
- Official [Claude Code plugin installation](https://code.claude.com/docs/en/discover-plugins#install-from-your-shell) checked for marketplace versus plugin installation. The publisher's [installation guide](https://github.com/PicsArt/gen-ai-skills/blob/main/INSTALL.md) establishes the exact `picsart@picsart` identifier. Claude Code 2.1.278 command help was checked. No plugin installation was performed.
- All three new starter payloads passed production MCP preflight. Preflight is validation, not a paid render or proof of output dimensions, completion time, or final credit charge.
- Documentation build, regression guards, and source style checks passed: 87 source Markdown pages, 273 JSON blocks, 112 shell blocks, and 160 CLI examples checked. These are the current counts; earlier audit reports retain their historical totals.
- Wiki export produced 85 files with no leftover site links; its style checks passed.

The 768px browser check exposed an existing top-navigation overflow. Grouped the long reference navigation into a dropdown while retaining all destinations.

The final site-wide browser run passed all 83 pages and 9,183 internal links with zero errors, including the added 768px regression case. Browser evidence is recorded in `landing-report-browser.json`; static-content, keyboard-disclosure, and 390/768/1440px layout checks are recorded in `landing-report-render-checks.json`. Starter preflight results are in `landing-report-preflight.json`. No paid generation, full host sign-in, or remote publication was performed for this follow-up.
