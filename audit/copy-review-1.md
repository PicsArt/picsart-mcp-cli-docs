# Independent technical copy review, round 1

Review target: `/Users/Anubis/parnership-ideas/picsart-mcp-cli-docs-audit-worktree`, baseline `5a50aaf`. Read-only review. Initial reads used original checkout before it switched to main; findings below were reconciled with the stable baseline where applicable. This is a copy/task-flow review, not an assertion that third-party instructions have been runtime verified. No generation or paid calls performed.

## Required fixes

1. **P1: Separate local CLI, local MCP and hosted MCP authentication throughout.** `guide/authentication.md:7` says all interfaces use OAuth, immediately before the API-key section; `guide/installation.md:112,136`, `guide/integrations/index.md:40-45`, and `guide/what-is-mcp.md:58` assume every MCP client runs locally. Remote integration pages use a hosted URL and bearer keys. `guide/security.md:49` says OAuth2 is unavailable and then says CLI/MCP use it. Introduce clearly scoped auth paths and propagate them; do not call one login universal. Confirm the hosted auth contract with actual source.
2. **P1: Replace ChatGPT's local stdio setup and attachment-as-execution claims.** `guide/integrations/chatgpt.md:11-24,38-59` says ChatGPT can spawn `gen-ai-mcp`, and uploading a ZIP lets it run local commands. `guide/skills.md:69`, `guide/installation.md:89` repeat this. An instruction attachment does not establish an execution environment or connection. Document the verified hosted connector path; make skill execution requirements explicit.
3. **P1: Remove unsafe retry ambiguity.** `guide/cli-quickstart.md:123` advises retrying a command while its original server job may still run. `guide/rate-limits.md:27,39` blanket-retries 5xx generation submissions. Explain checking the existing job/result first and that submitting again may create another charged job. Provide supported recovery commands where available.
4. **P1: Resolve Drive confidentiality/expiry contradictions.** `guide/files-and-drive.md:119` promises signed private URLs expiring in 24 hours, while `guide/local-files.md:124` says the CDN URL is publicly fetchable. A signed bearer URL is usable by anyone holding it. Do not promise uniform expiry/privacy without source evidence; distinguish account-scoped Drive listing from asset URL access.
5. **P1: Correct command examples that conflict with their own parameter tables.** `reference/video.md:16` omits the required motion-reference video for `kling-motion-control-v3` (required at `reference/providers/kling.md:183`). `guide/generating.md:32,42` and `guide/batch.md:38` use image inputs for Wan I2V, whose table requires `startFrame` (`reference/providers/wan.md:95`). `reference/providers/topaz.md:25,28` supplies both `-m` and `--model` with different meanings. `reference/providers/runway.md:34` uses `runway-gen4-aleph` while its current table lists `runway-aleph2`. `reference/providers/picsart.md:35` uses `picsart-flux-klein` while table lists `picsart-flux-2-klein`. Validate or replace all examples against the actual CLI contract.
6. **P1: MCP input examples need one consistent envelope.** `guide/generating.md:60` says all model-specific parameters go in `extra`, while provider examples put `voiceId`, `container`, `cfgScale`, `renderingSpeed`, `startFrame` at top level. `reference/providers/wan.md:56` passes a local path in MCP despite local-files prohibition. State the actual accepted schema, then validate all JSON examples against it.
7. **P1: Scope enterprise security claims to evidence.** `guide/security.md:11-33` makes firm TLS, AES-256, SOC 2, annual certification, testing frequency and 24-hour guarantees without sources or product scope. Add exact official evidence and distinguish API-platform controls from model-provider/generation asset policies, or remove unsupported guarantees.
8. **P2: Correct the Drive delete FAQ.** `guide/files-and-drive.md:58` explicitly lists `delete`; its final FAQ says CLI and MCP expose no delete command. Separate CLI support from MCP action support.
9. **P2: Fix inaccessible-URL upload guidance.** `guide/local-files.md:114-124` and `guide/files-and-drive.md:84-86` imply Drive upload can fetch a URL requiring authentication just by receiving it. Explain that the server needs a still-valid, directly fetchable URL; otherwise upload the file from an authenticated local client first.
10. **P2: Fix the local-files scope and task claims.** `guide/local-files.md:8-17` says every MCP server runs on Picsart infrastructure, even though local stdio is documented elsewhere. Say hosted Picsart tools cannot access the caller's filesystem. Replace 'exactly three ways' with supported options and 'Needs: Nothing' for data URIs with a host capable of reading/encoding the file. Token estimates at lines 101-109 are tokenizer-dependent and base64 need not pass through model context if supplied programmatically. Explain the risk conditionally rather than as a universal billing rule.
11. **P2: Clarify saving versus downloading.** `guide/files-and-drive.md:7` implies all generations automatically land in Drive. `guide/batch.md:31,81` and `guide/skills.md:117` say save-to-Drive replaces downloading; CLI flags list these separately. State defaults and whether both destinations can be enabled, using source evidence.
12. **P2: Repair Skills vs MCP decision advice.** `guide/integrations/index.md:36-37` says Skills cannot quote costs or chain tools, despite Skills driving a CLI that does both. `guide/which-tool.md:29-31` and `guide/what-is-mcp.md:44` repeat the false distinction. Distinguish instructions from transport/tool access; explain they can be combined and capabilities depend on the agent's connected tools.
13. **P2: Make skill installation executable.** `guide/skills.md:55,61-62,79`, `guide/integrations/cursor.md:19-24`, `guide/integrations/windsurf.md:19-21` tell readers to place ZIPs or folders into unspecified 'skills/rules' locations. Use one verified recommended install command, followed by host selection/verification; give exact extraction/path requirements for any retained manual fallback. Rules and skills are not interchangeable installation targets.
14. **P2: Fix Codex configuration and destination.** `guide/integrations/codex.md:25-33,61-69` labels JSON as Codex config. Verify native configuration format. The 'Start creating in Codex' link at line 90 opens ChatGPT and line 87 explicitly says ChatGPT. Link to the intended product or replace with an in-product prompt.
15. **P2: Remove unsupported automatic-success CTAs.** Most integration pages end 'The server is now connected' and link back to the docs homepage. This is repetitive and gives no next action. Replace with 'After the verification succeeds...' plus a relevant model/catalog or first-generation task. `claude-code.md:156-159` opens claude.ai after configuring Claude Code, which is a different host. ChatGPT/Claude links must not promise automatic plugin invocation.
16. **P2: Reconcile contributor source of truth and count policy.** `README.md:5,61,69` says private docs-site is authoritative; `CONTRIBUTING.md:5` says public repo authoritative, while `scripts/audit-compliance-agent.md` instructs private-only edits. `CONTRIBUTING.md:22-34` forbids exact counts but its table lists exact totals; audit script demands exact counts. State the actual contribution workflow and one count policy. Also fix README's non-existent `cd docs-site` context and outdated wiki page count.
17. **P2: Do not label snapshot-generated data 'live'.** `reference/index.md:34`, `changelog.md` footer, provider parameter introductions and README call data live, but README now says installed SDK export. State version/date of the catalog snapshot and offer `gen-ai models info` as the current runtime check. Avoid 'full parameter surface' guarantees if constraints/defaults are missing.
18. **P2: Reconcile frontmatter and intro staleness on provider pages.** Examples: Kling frontmatter says 19 models but heading says 14; OpenAI frontmatter says 8 including audio but heading says 6 and text; Anthropic description says video analysis while table contains image-only models; Google intro says three modes but lists text too; Seedance intro describes only 2.0 despite 2.5 entries; Seedream intro names only 4.5/5.0 Lite despite 4.7/5.0 Pro. Generate these summaries from the same source or keep them count-neutral and current.
19. **P2: Replace blanket prompt/count requirements.** `reference/image.md:56`, `reference/video.md:62`, `guide/mcp-quickstart.md` input reference must not call prompt universally required when utility models have no prompt. `guide/cli-quickstart.md:135` and `guide/generating.md:105` cap most counts at 8 while many tables allow 10. Use model-dependent wording and link to schema discovery.
20. **P2: Clarify model-local parameter requirements versus CLI convenience defaults.** `reference/providers/anthropic.md:59,70,81` says prompt required while its examples intentionally omit prompt using `describe`. Add a short statement that `describe` supplies a default question; tables describe generation model inputs.
21. **P2: Make dynamic voice/ID selection actionable.** `reference/providers/heygen.md:26,65,68` says list dynamic voice IDs at runtime but supplies no command or tool. Likewise Sora `videoId` and Recraft `sourceImageId` lack acquisition instructions. Supply the actual discovery/result field or explicitly state where to obtain the ID before running the example.
22. **P2: Fix paid-first quickstarts.** `index.md:60-74`, `guide/cli-quickstart.md:11-27` and several integration paths go straight from installation to paid generation without a no-cost proof that installation/auth/tool discovery worked. Add a clearly free version/catalog/credits check with expected result before a separately labeled credit-consuming example.
23. **P2: Remove unrelated popularity and monetization claims.** `guide/integrations/hermes-agent.md:7` GitHub stars, `openclaw.md:7` growth ranking, `librechat.md:7` stars, `raycast.md:7` daily users, `lm-studio.md:7` downloads and `gumloop.md:41-43` guaranteed revenue-program eligibility do not help connect Picsart and age quickly. Remove them; retain relevant host requirements with dated official source links.
24. **P2: Troubleshooting should diagnose, not invent a universal cause.** Integration pages repeatedly claim tool lists load only on startup, recommend deleting/readding connections, or refreshing API keys for any GET failure. `gumloop.md:57-63` unauthenticated protocol GET behavior cannot prove invalid credentials; `open-webui.md:70` HEAD cannot prove MCP initialization. Use host connection logs/status, valid MCP checks and specific auth errors. Avoid blindly rotating keys.
25. **P2: Explain prerequisites for validation snippets.** Python YAML validation in LibreChat, Hermes, NemoClaw and OpenClaw imports `yaml` without stating PyYAML is required. Prefer the host's config check or explicitly state dependency; otherwise troubleshooting itself fails with ModuleNotFoundError.
26. **P2: Complete navigation.** `.vitepress/config.ts` exposes new media/local-files pages but omits security and error codes, and interfaces omit SDK/REST despite prominently advertising them. `guide/integrations/index.md` lists only the initial six hosts plus Replit, not the full sidebar set. Add discoverable links and make the index cover the supported integration pages.
27. **P2: Shorten repeated access-layer introductions.** `index.md`, `guide/introduction.md`, `guide/which-tool.md` and integration index repeat the same six-surface decision material. Give Introduction a short platform explanation, Which tool a decision table, and keep setup commands in quickstarts. Fix introduction line 19 ('six ways ... beyond web/mobile' but counts web/mobile among six). Do not make trying Playground a prerequisite for connecting an agent.
28. **P2: Use direct, consistent terms.** `guide/generating.md:11` calls t2i/tts/music 'two-letter codes'; call them input-type codes. `guide/what-is-mcp.md:9` says agents without MCP can only do what trained to do, ignoring other tool interfaces; replace with 'MCP standardizes how an agent connects to tools.' Drop jargon such as 'parameter surface', 'video-shaped', 'task-shaped' when 'parameters', 'video upload', or 'editing tool' is clearer.
29. **P2: Check conflicting media workflow claims.** `guide/media-tools.md:16-17` says nothing persisted server-side, but translate_scene returns a server-side path and code/render tools return URLs; scope statelessness to scene-transform tools. Final paragraph calls every non-paid tool a pure scene transformation despite probe_media fetching URLs and capabilities/fonts returning metadata. Move required font discovery into the recommended authoring sequence.
30. **P2: Avoid unsupported billing absolutes.** `guide/pricing.md:7` says every call shows cost before commitment while FAQ admits null quotes. `guide/rate-limits.md:35` promises no 4xx charges without source or distinctions about prior accepted work. State estimates can be unavailable and that readers should consult billing/job state before resubmission.
31. **P3: Trim huge enum cells for scanning.** `reference/providers/kling.md:268` is a hundreds-item effects list in one cell; ElevenLabs repeats full opaque voice IDs across multiple models. Use a short example plus runtime lookup, or collapsible separate list, while keeping the full data available. Do not cut meaningful constraints.
32. **P3: Align house-style claims with enforcement.** CONTRIBUTING says no em dashes/marketing filler, but nearly all pages contain em dashes and image reference says 'Best-in-class typography'. Decide and apply one style. Avoid claiming CI enforces rules that its scripts do not actually check.

## Coverage

All repository Markdown pages were inspected for prose/task-flow structure, examples and cross-page consistency, excluding node_modules and .git. Provider parameter tables were compared to their adjacent examples, not externally revalidated model by model. Config navigation and contributor/auditor guidance were inspected. Some initial reads used main after an external checkout change; stable-worktree additions and modifications were separately inspected. Full runtime/third-party verification belongs to the primary technical pass.

86 Markdown files:

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
