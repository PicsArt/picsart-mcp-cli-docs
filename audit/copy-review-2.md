# Independent technical copy review: round 2

Reviewed the current stable worktree on September 29, 2026. This is a read-only editorial/task-flow review; only this report was written. Technical evidence supplied by the primary audit: CLI 2.78.0, SDK 6.18.0, 215 collected CLI model schemas, and 30 generated provider examples accepted by hosted MCP preflight. Preflight is not proof of completed paid generation. Third-party OAuth sign-ins and paid renders remain unexercised unless separately recorded by the primary audit.

## Required actionable findings

1. **P2: Give generated examples a meaningful input even when the schema marks it optional.** `reference/providers/seedance.md:40-51` submits Seedance 2.5 with no prompt or input media; `reference/providers/runway.md:32-43` submits Runway Avatar with neither script nor audio. The generator at `scripts/build-provider-pages.mjs:44-46` builds samples solely from individually required fields. Passing preflight proves schema acceptance, not that an empty creative task is useful or that the provider will execute it. Include a descriptive prompt for Seedance and a short spoken script for Runway (or select a different representative model). Keep empty prompts only for utility operations that genuinely need no prompt and already have useful source inputs. Revalidate updated payloads with preflight; do not claim a paid render was exercised.

2. **P2: Complete text-mode discovery and labels in the interactive catalog.** `.vitepress/theme/components/ModelCatalog.vue:8-18` defines only image/video/audio mode filters and omits labels for text input types and newer audio input types. The published snapshot includes 30 text models, but readers cannot filter to Text, and cards display opaque codes such as `i2t`, `v2t`, `a2t`, `t2a`, and `v2a`. At `ModelCatalog.vue:130-136` and `.vitepress/theme/components/ProviderGrid.vue:51-57`, text badges also lack a background despite white foreground text, making the text label unreadable on the light theme. Add text to modes and mode ordering, define readable labels for every input type actually present, and style text badges. Verify that selecting Text returns the snapshot's text models and labels remain legible in both themes.

3. **P2: Keep unestablished host compatibility conditional through the end of the page.** `guide/integrations/lobehub.md:9` correctly says no complete Picsart OAuth setup path was established, but lines 13-21 revert to the standard connection procedure and conclude that “These steps are based on the host's documented configuration.” `guide/integrations/nemoclaw.md:9,13-21` has the same conflict. AnythingLLM and LM Studio likewise need their final verification/generation path explicitly conditioned on first establishing their OAuth support. Use a “Compatibility status” description/title where appropriate; say “If your release supports the required OAuth flow and the host reports a signed-in connection, verify…” or stop at the supported alternatives. Replace the generic footer with the exact evidence boundary: transport documentation checked, Picsart credential flow not established. Do not present generic host documentation as documentation of a complete Picsart setup. Remove public references to this audit's prior incorrect instructions; readers need the present limitation and next action.

4. **P2: Make the generated Anthropic example describe a text task and its actual return behavior.** `reference/providers/anthropic.md:33-52` says the commands “generate media,” includes `--download ./output`, and sets MCP `async: true` for a text-only example. This clashes with `reference/text.md` and the MCP guidance that text output is synchronous. The generic prompt “A quiet forest at sunrise” also gives no text task. Add mode-aware generator output: for example, ask for a short description of that scene, explain that the result is text, and omit async/media-download assumptions unless explicitly supported and useful for this command. Keep the credit warning. The shared template is in `scripts/build-provider-pages.mjs:60-63`.

## Round-1 disposition

The substantive round-1 problems are resolved in the reviewed prose: authentication layers are distinct; invented local-server and ChatGPT shell flows are removed; timeout guidance avoids duplicate submissions; Drive URL security is qualified; examples use checked flags and a consistent MCP envelope; unsupported security/billing guarantees are removed; setup has metadata checks and credit boundaries; source-of-truth and catalog snapshot language are consistent; navigation includes SDK, REST, security, errors, local files and media tools. Dynamic catalog IDs are now explicitly a prerequisite with an acknowledged unsupported standalone lookup, rather than invented commands. That limitation is acceptable as stated; this review does not certify such account workflows.

House-style punctuation work is intentionally deferred to the requested subsequent style pass. No new unsupported paid-render or successful third-party-sign-in claims were found apart from the misleading procedural implications listed above.

## Coverage

All 87 source Markdown pages below were inspected across this review, including all guides, integrations, reference pages, contributor instructions and historical release notes. Generated provider prose, examples, tables and generator rules were inspected; large repeated parameter descriptor bodies are treated as versioned data, with their technical correctness covered by the primary audit rather than independently revalidated remotely in this copy review. Also inspected `.vitepress/config.ts`, `ModelCatalog.vue`, `ProviderGrid.vue`, and `scripts/build-provider-pages.mjs`. No browser-based rendering was performed in this independent pass; the component readability defect follows directly from its foreground/background styles.

- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `README.md`
- `changelog.md`
- `guide/authentication.md`
- `guide/batch.md`
- `guide/cli-quickstart.md`
- `guide/files-and-drive.md`
- `guide/generating.md`
- `guide/installation.md`
- `guide/integrations/anythingllm.md`
- `guide/integrations/chatgpt.md`
- `guide/integrations/claude-code.md`
- `guide/integrations/codex.md`
- `guide/integrations/copilot-studio.md`
- `guide/integrations/cursor.md`
- `guide/integrations/dify.md`
- `guide/integrations/gemini-cli.md`
- `guide/integrations/goose.md`
- `guide/integrations/gumloop.md`
- `guide/integrations/hermes-agent.md`
- `guide/integrations/index.md`
- `guide/integrations/librechat.md`
- `guide/integrations/lm-studio.md`
- `guide/integrations/lobehub.md`
- `guide/integrations/n8n.md`
- `guide/integrations/nemoclaw.md`
- `guide/integrations/open-webui.md`
- `guide/integrations/openclaw.md`
- `guide/integrations/raycast.md`
- `guide/integrations/replit.md`
- `guide/integrations/vscode.md`
- `guide/integrations/windsurf.md`
- `guide/introduction.md`
- `guide/local-files.md`
- `guide/mcp-quickstart.md`
- `guide/media-tools.md`
- `guide/pricing.md`
- `guide/rate-limits.md`
- `guide/rest-api.md`
- `guide/sdk.md`
- `guide/security.md`
- `guide/skills.md`
- `guide/what-is-mcp.md`
- `guide/which-tool.md`
- `index.md`
- `reference/audio.md`
- `reference/catalog.md`
- `reference/image.md`
- `reference/index.md`
- `reference/providers/anthropic.md`
- `reference/providers/async.md`
- `reference/providers/bytedance.md`
- `reference/providers/creatify.md`
- `reference/providers/elevenlabs.md`
- `reference/providers/flux.md`
- `reference/providers/google.md`
- `reference/providers/grok.md`
- `reference/providers/happyhorse.md`
- `reference/providers/heygen.md`
- `reference/providers/hunyuan.md`
- `reference/providers/ideogram.md`
- `reference/providers/index.md`
- `reference/providers/kling.md`
- `reference/providers/ltx.md`
- `reference/providers/luma.md`
- `reference/providers/meta.md`
- `reference/providers/minimax.md`
- `reference/providers/openai.md`
- `reference/providers/ovi.md`
- `reference/providers/picsart.md`
- `reference/providers/pika.md`
- `reference/providers/pixverse.md`
- `reference/providers/qwen.md`
- `reference/providers/recraft.md`
- `reference/providers/reve.md`
- `reference/providers/runway.md`
- `reference/providers/seedance.md`
- `reference/providers/seedaudio.md`
- `reference/providers/seedream.md`
- `reference/providers/topaz.md`
- `reference/providers/veed.md`
- `reference/providers/videography.md`
- `reference/providers/wan.md`
- `reference/text.md`
- `reference/video.md`
- `scripts/audit-compliance-agent.md`
