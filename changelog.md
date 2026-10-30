---
description: "Changelog for the Picsart gen-ai CLI, MCP server, and model catalog — new models, providers, and documentation updates."
title: Changelog
---

# Changelog

Notable changes to the Picsart model catalog and these docs. Newest first. The catalog is served by `@picsart/ai-sdk`; the same models are reachable from the [CLI](/guide/cli-quickstart), the [MCP server](/guide/mcp-quickstart), and [Skills](/guide/skills).

## 2026-10-30

**SDK 7.0.0 catalog refresh — 243 production models across 32 providers.**
Compared with the previous catalog: 10 models added, 5 removed.

### New

- **Flux 3 Max** *(video, `t2v`)* — Text-to-video with synchronized audio, or image-to-video from a start (and optional end) frame. Up to 20s at 1080p. See [Flux (Black Forest Labs)](/reference/providers/flux).
- **Flux 3 Max Keyframes** *(video, `i2v`)* — Animate a video between up to 10 positioned keyframe images, with synchronized audio. Up to 20s at 1080p. See [Flux (Black Forest Labs)](/reference/providers/flux).
- **Ideogram Vector** *(image, `t2i`)* — Ideogram Vector — SVG logos, icons and illustrations from a prompt, optionally guided by up to 5 reference images. See [Ideogram](/reference/providers/ideogram).
- **Ideogram Vectorize** *(image, `i2i`)* — Ideogram Vectorize — convert a raster image (JPEG, PNG or WebP) into an SVG. See [Ideogram](/reference/providers/ideogram).
- **Kimi K3.1 Pro** *(text, `i2t`)* — Moonshot’s most capable Kimi model — post-trained K3 with deep reasoning and a 1M-token context. See [Kimi](/reference/providers/kimi).
- **Kimi K3.1 Pro Highspeed** *(text, `i2t`)* — Kimi K3.1 Pro at 2–3× the speed — same capabilities, faster responses. See [Kimi](/reference/providers/kimi).
- **MiniMax M3** *(text, `i2t`)* — MiniMax’s flagship model — adaptive reasoning with a 1M-token context. See [MiniMax](/reference/providers/minimax).
- **MiniMax M3.1 Flash** *(text, `i2t`)* — Fast, low-cost MiniMax model — always-on reasoning with a 1M-token context. See [MiniMax](/reference/providers/minimax).
- **GPT-6.1 Sol** *(text, `i2t`)* — OpenAI’s most capable GPT-6.1 model for deep reasoning and complex tasks, with a 1M-token context. See [OpenAI](/reference/providers/openai).
- **GPT-6.1 Terra** *(text, `i2t`)* — Balanced GPT-6.1 model — strong general-purpose quality at half the price of Sol, with a 1M-token context. See [OpenAI](/reference/providers/openai).

### Removed

- **Eleven Multilingual v2** *(audio)* leaves [ElevenLabs](/reference/providers/elevenlabs).
- **Flux Kontext Max** *(image)* leaves [Flux (Black Forest Labs)](/reference/providers/flux).
- **Flux Kontext Pro** *(image)* leaves [Flux (Black Forest Labs)](/reference/providers/flux).
- **Kling V2.6** *(video)* leaves [Kling](/reference/providers/kling).
- **Kling Video O1** *(video)* leaves [Kling](/reference/providers/kling).

## 2026-10-16

**SDK 6.48.1 catalog refresh — 238 production models across 32 providers.**
Compared with the last published catalog (6.29.0): 16 models added, none removed; Kimi, Depth Anything and Mirelo join the provider list.

### New

- **Kling 4.0** and **Kling 4.0 Omni** *(video, `t2v`)* — up to 30s at 720p or 1080p; 4.0 takes start, middle and end keyframes, Omni adds reference images, a reference or base video, and elements. See [Kling](/reference/providers/kling).
- **ByteDance OmniHuman 2.0** *(video, `i2v`)* — animates one or more subjects with realistic body movement driven by audio. See [ByteDance](/reference/providers/bytedance).
- **Grok Imagine 1.5 Lite** *(video, `t2v`)* — faster, lower-cost video with audio, up to 15s. **Grok 4.7** *(text, `i2t`)* — xAI's flagship reasoning model with a 500K-token context. See [Grok](/reference/providers/grok).
- **Flux 3 Image Klein** *(image, `t2i`)* — a distilled, faster Flux 3 Image with up to 10 references, a `steps` control and native 4K. See [Flux](/reference/providers/flux).
- **MiniMax H3 Max Relight** *(video, `v2v`)* — relights an existing clip from a sphere-render reference image. **MiniMax H3 Context IR** *(text, `v2t`)* — enhances a video prompt from text plus optional frames, references, videos and audio; returns a prompt, not a video. See [MiniMax](/reference/providers/minimax).
- **Claude Haiku 5.5** *(text, `i2t`)* — fast, lightweight Claude for high-volume text tasks. See [Anthropic](/reference/providers/anthropic).
- **Gemini 4 Argon** *(text, `v2t`)* — Google's flagship Gemini 4 reasoning model with image and video input and a 1M-token context. See [Google](/reference/providers/google).
- **Kimi K3** *(text, `i2t`)* — Moonshot's flagship reasoning model with a 1M-token context. New provider: [Kimi](/reference/providers/kimi).
- **SAM 3 Video** *(video, `v2v`)* — segments and tracks named objects through a clip from a text prompt. See [Meta](/reference/providers/meta).
- **Video Depth Anything** *(video, `v2v`)* — temporally consistent per-frame depth maps, grayscale or color-mapped, optionally side by side. New provider: [Depth Anything](/reference/providers/depth-anything).
- **Mirelo SFX 2.0** *(Text to Audio `t2a`, Video to Audio `v2a`, Video to Video `v2v`)* — sound effects from a prompt, or a soundtrack synced to your video returned as audio or muxed onto the clip. New provider: [Mirelo](/reference/providers/mirelo). Not selectable in the AI Playground app.

### Changed

- **Flux Video Upscale is now displayed as Flux 3 Video Upscale.** The id `flux-video-upscale` is unchanged.

### Availability

The published `@picsart/gen-ai` CLI (2.82.0) and the hosted MCP server still run an older catalog. Of the models above, only MiniMax H3 Max Relight, Claude Haiku 5.5 and Video Depth Anything are callable from them today; the rest become reachable when the CLI and MCP server move to SDK 6.48.1. The SDK itself exposes every model listed.

## 2026-10-07

**SDK 6.29.0 catalog refresh — 222 production models across 29 providers.**
Adds Nano Banana 2.1, HeyGen Video, and TypeSafe Jev structured evaluation.
Four older Luma Ray 2 / Flash 2 entries leave the production catalog.
The catalog and navigation now include JSON output; Jev uses the SDK’s `ai.run()` API.
See the [complete update and availability notes](/guide/sdk-6-29-update).

## 2026-10-02

**SDK 6.23.0 catalog refresh — 223 production models across 28 providers.**
The comparison with the last published catalog adds 22 models and removes none.
Additions include Flux 3 Image, Ideogram 4.5, GPT-6, LTX 2.5, Eleven v4, and Gemini 3.8 speech models.
Seedance, Seedream, and Seed Audio now sit under ByteDance; their model IDs remain unchanged.
Provider tables include current parameters. Preview models remain excluded.
See the [complete model list and availability notes](/guide/sdk-6-23-update).

## 2026-09-29

**MCP docs corrected to match the live server.** The Picsart MCP server is hosted at `https://api.picsart.com/gen-ai/mcp`. Agents connect to it over HTTP and sign in to Picsart in the browser, so it needs **no gen-ai CLI, no `gen-ai login` and no API key**. Earlier pages described a local `gen-ai-mcp` command, required the CLI as a prerequisite, or pointed some integrations at a different address with an API key. All of those instructions were wrong and have been replaced on the [MCP Quickstart](/guide/mcp-quickstart), [Installation](/guide/installation), [Authentication](/guide/authentication) and every [integration guide](/guide/integrations/). The tool catalog also drops `picsart_music_studio` (not available), adds the viewing and progress tools, and fixes the `picsart_remove_bg` example (it takes one `image` URL). AnythingLLM Desktop now connects through the `mcp-remote` bridge, and the [integrations index](/guide/integrations/) lists every supported agent plus the ones that cannot connect yet (NemoClaw, AnythingLLM Docker).

**CLI docs checked against `@picsart/gen-ai` 2.78.0.** Removed flags and commands the CLI does not have (`--script`, `--dry-run` and `--no-download` on `generate`, short flags on `pricing`, `gen-ai extend`), documented that generations save to Drive by default, rewrote the batch guide for the real JSON manifest format (`jobs[]` with `id`) and output folder, and added CI authentication via `PICSART_ACCESS_TOKEN` / `PICSART_USER_ID`.

## 2026-09-19

**SDK 6.2.3 catalog refresh — 201 models across 31 providers.** Compared with the previously published catalog: 26 additions, 6 removals; Meta joins and Reve leaves the active provider list. The SDK upgrade from 6.0.0 adds 11 text models and changes result metadata and Seedance color-depth handling. See the [complete update and migration guide](/guide/sdk-6-2-update).

## 2026-09-01

**Catalog refresh — now 181 models across 31 providers** (`@picsart/ai-sdk` 5.24.0). These docs were last generated from 5.19.0, so this refresh spans 5.20–5.24: three video/image models added, one renamed, none retired.

### New

- **Flux Video Upscale** *(video, `v2v` — added in SDK 5.20.0)* — upscales an existing clip toward 4K at `1.5x`–`3x`, in either precise (source-faithful) or creative (detail-enhancing) mode. Source clips up to 20 seconds and 2K. See [Flux](/reference/providers/flux).
- **MiniMax H3 Max** *(video, `t2v` — added in SDK 5.22.0)* — the top tier of the H3 family: text-to-video or start/end-frame interpolation with a `promptExpansionMode` pass, up to 15s at `768p`. Image-to-video is available as an edit workflow. See [MiniMax](/reference/providers/minimax).
- **Qwen 3.0 Pro** *(image, `t2i` — added in SDK 5.22.1)* — the GA flagship Qwen-Image 3.0 Pro, covering text-to-image and image editing with prompt-rewrite modes (`promptExtendMode`) and an optional `enableThinking` pass. See [Qwen](/reference/providers/qwen).

### Changed

- **Hailuo 03 is now MiniMax H3** *(SDK 5.21.1)* — the catalog id changed from `hailuo-03` to `minimax-h3`. This moves a **public identifier**: `?model=hailuo-03` deeplinks and any saved reference to the old id no longer resolve. The workflow (`minimax/v2/video-generation`) and pricing key (`minimax-h3`) are unchanged, and no parameters moved.
- **Gemini Omni 1.2 Flash is now displayed as Gemini Omni 1.1 Flash** *(SDK 5.21.2)* — this resolves the id/name mismatch flagged in the 2026-08-27 entry above. The id was always `gemini-omni-1.1-flash-preview`; the display name has been corrected to agree with it rather than the id being changed, so nothing matching on the id is affected.

---

## 2026-08-27

**Catalog refresh — now 178 models across 31 providers** (`@picsart/ai-sdk` 5.19.0). These docs were last generated from 5.16.0, so this refresh spans 5.17–5.19: two video models added, none retired.

### New

- **Wan 3.0 Prime** *(video, `t2v` — added in SDK 5.18.0)* — the same all-in-one model as Wan 3.0, up to **7x faster**. Takes image, video and audio references plus start/end frames; 5/10/15/30s at up to 1080P, adaptive aspect ratio, native audio, and an optional `--enable-thinking` pass. See [Wan](/reference/providers/wan).
- **Gemini Omni 1.2 Flash** *(video, `t2v` — added in SDK 5.19.0)* — the more capable of the two Gemini Omni entries. Over the original it adds a `resolution` param at all (`360p` · `720p` · `1080p` · `4k`, default `720p`), start/end frame interpolation, up to 5 reference images and 3 reference videos, clip extension from a source video under 30s, and every integer duration 3–10s rather than a fixed set. See [Google](/reference/providers/google).

> [!NOTE]
> **Gemini Omni 1.2 Flash's id is `gemini-omni-1.1-flash-preview`** — the id says `1.1`, the display name says `1.2`. That mismatch comes from the upstream catalog, so anything matching on the id must use the `1.1` string. `-preview` in the id is likewise historical; the model is a production release.

### Changed

- **Grok Imagine 1.5** is now classified `t2v` (was `i2v`), as of SDK 5.18.0 — its image input is optional, so it generates from a prompt alone. The CLI and MCP call is unchanged; only the input-type label moved. See [Grok](/reference/providers/grok).

### Docs

- The provider-page generator now updates the frontmatter model count on **multi-mode** provider pages. Its regex matched only single-word mode lists, so slash-joined descriptions (`"17 image/video/audio/text model(s)"`) silently kept a stale count — Google had been carrying one across refreshes.
- The same generator no longer appends a blank line at EOF on every run for pages whose `## Parameters` is the last section, so repeat refreshes are now byte-idempotent.

---

## 2026-08-25

**Catalog refresh — now 176 models across 31 providers** (`@picsart/ai-sdk` 5.16.0). Eleven models added, nine retired.

### New

- **Wan 3.0** — an all-in-one video model taking text, image/video/audio references, and start/end frames, with adaptive ratio, intelligent duration, and audio. See [Wan](/reference/providers/wan).
- **Picsart Effects** *(image + video)* — `picsart-flow` and `picsart-flow-video` apply curated Picsart presets as multi-step Magic Flow pipelines in one call. Preset ids come from a runtime catalog; list them with `gen-ai models info picsart-flow --json`. See [Picsart](/reference/providers/picsart).
- **Recraft V4 Styles** — four style-reference models (**Styles**, **Styles Vector**, **Styles Pro**, **Styles Pro Vector**) with 10K-character prompts. See [Recraft](/reference/providers/recraft).
- **Grok Imagine 2.0** — sharper detail with a low/medium quality tier. See [Grok](/reference/providers/grok).
- **MiniMax Music v3** — text-to-music with vocals or instrumentals from a style prompt and optional lyrics, with configurable audio encoding. See [MiniMax](/reference/providers/minimax).
- **Gemini 3.7 Flash** — low-latency multimodal text generation for [`gen-ai describe`](/reference/text). See [Google](/reference/providers/google).
- **ByteDance Video Enhance** — now live, replacing the Video Upscaler: denoise, colour-correct and super-resolve footage up to **8K**, with frame-rate conversion. See [ByteDance](/reference/providers/bytedance).

### Deprecated / retired

- **Pika is retired.** `pika-2.2`, `pika-2.2-scenes` and `pika-2.2-frames` are gone and Pika is no longer a provider. The [provider page](/reference/providers/pika) is kept as a pointer to replacements — Seedance 2.5 covers multi-reference composition and start/end-frame morphs.
- **Google Imagen 4.0 family** — `imagen-4.0`, `imagen-4.0-ultra` and `imagen-4.0-fast` removed; use the Nano Banana (Gemini Image) models instead.
- **Also removed** — `bytedance-video-upscaler` (superseded by Video Enhance), `kling-v2-new-image`, and `qwen-image-edit-plus` (Qwen 2 Pro now covers reference-guided editing from up to 3 images).

### Docs

- Provider pages now render **`catalog`-kind parameters** (voice, avatar, and effect-preset pickers) instead of leaving the Values cell blank. These lists are fetched at runtime, so the docs point at `gen-ai models info <id> --json` rather than snapshotting a list that would rot.
- The count drift guard now also covers `reference/providers/index.md` and `README.md`, and recognises the "N AI model providers" phrasing.
- The wiki generator keeps pages for retired providers, so a tombstoned page like Pika exists on both the Pages site and the Wiki instead of silently vanishing from one.

---

## 2026-08-07

**Catalog refresh** — now **174 production models across 32 providers** (`@picsart/ai-sdk` 3.35.6).

### New

- **Seedance 2.5** — ByteDance's next-generation video model, with companion **Seedance 2.5 Video Edit** (edit an existing clip from a prompt) and **Seedance 2.5 Video Extend** (continue a clip past its original end). See [Seedance](/reference/providers/seedance).
- **Seedream 4.7** — text-to-image up to 4K with multi-image reference input and batch counts up to 10. See [Seedream](/reference/providers/seedream).
- **Flux 3 Video** — Black Forest Labs' first video model on Picsart: text-to-video and image-to-video up to 20 seconds at FHD, with native audio generation and a fast `--draft` mode. This makes Flux a multi-mode provider. See [Flux](/reference/providers/flux).
- **HeyGen Video Avatar** — pick a HeyGen avatar and voice, supply a script, and get a lip-synced presenter video up to 4K. Unlike Talking Photo it needs no input image. See [HeyGen](/reference/providers/heygen).

---

## 2026-07-31

**AI Playground · July 31 Release** — catalog refreshed to **168 production models across 32 providers** (`@picsart/ai-sdk` 3.30.0).

### New

- **Hailuo 03** — MiniMax text-to-video and image-to-video with start/end frames, multimodal references, 5–15 second clips, and output up to 2K. See [MiniMax](/reference/providers/minimax).
- **Video Enhance** — ByteDance video enhancement can denoise, color-correct, super-resolve existing footage up to 8K, and convert frame rate. The SDK definition is gated until its worker rollout completes.
- **Ideogram P-Image** — out of preview and generally available, with four speed/quality tiers and output up to 2K. See [Ideogram](/reference/providers/ideogram).
- **HEIC support** — iPhone and Windows HEIC/HEIF photos now upload with automatic conversion.
- **Catalog additions** — Seed Audio and Seed Audio Multilingual add named voices and voice cloning, while Gemini 3.6 Flash and Gemini 3.5 Flash Lite expand text/image analysis. See [Seed Audio](/reference/providers/seedaudio) and [Google](/reference/providers/google).

### Improvements

- **Empty boards** — redesigned with a card-stack hero and a responsive “Need a spark?” inspiration strip.
- **Explore** — the Picsart Effects strip now serves the creator and business catalog: about 950 presets across 16 categories.
- **Topaz catalog** — Topaz Video Upscale is available with Proteus, Artemis, Nyx, Gaia, and Starlight enhancement families; eight legacy image-enhancement IDs are consolidated as presets on `topaz-upscale-image`.

---

## 2026-07-17

**Catalog refresh — now 169 models across 31 providers** (`@picsart/ai-sdk` 3.17.0).

- **New models** — **Seedream 5.0 Pro** (text-to-image, see [Seedream](/reference/providers/seedream)), **Nano Banana 2 Lite** (`gemini-3.1-flash-lite-image`, see [Google](/reference/providers/google)), **ElevenLabs Music v2** (full music tracks, see [ElevenLabs](/reference/providers/elevenlabs)), and **Picsart Angle Change** (`picsart-qwen-image-edit-angle`, image editing, see [Picsart](/reference/providers/picsart)).
- **Recraft V4 & V4.1 image-to-image.** All 12 V4/V4.1 models (base, Pro, Utility, Utility Pro, and their vector variants) now take an optional source image (`-i`) with an adjustable image weight (`--weight`, 0–100, default 80). See [Recraft](/reference/providers/recraft).
- **Happy Horse 1.1** — model ids renamed from `happyhorse-1.5-*` to `happyhorse-1.1-*` (same models; update any saved commands).
- **Parameter updates** — [Grok](/reference/providers/grok) Imagine Video 1.5 adds **1080p**; [HeyGen](/reference/providers/heygen) Talking Photo prompt limit raised to **5000 chars**; [Ideogram](/reference/providers/ideogram) Character now takes a required prompt; [Seedance](/reference/providers/seedance) 2.0 reference images/videos must be at least **0.4MP**; the [ByteDance](/reference/providers/bytedance) Video Upscaler now rejects sources at or above 1080p up front (it only upscales sub-1080p video).

---

## 2026-06-26

**Catalog refresh — now 165 models across 31 providers** (`@picsart/ai-sdk` 3.10.0). A big lineup update since the 3.6.2 catalog:

- **Seedance 2.0 family — the full lineup.** **Seedance 2.0** and **Seedance 2.0 Fast** (text-to-video with keyframe control and native audio), each with a **Video Edit** and **Video Extend** variant, plus the new **Seedance 2.0 Mini** (T2V + edit + extend). See [Seedance](/reference/providers/seedance).
- **Text & analysis models *(new mode)*** — analyze images and video with LLMs via [`gen-ai describe`](/guide/cli-quickstart#describe-an-image-or-video): **Anthropic** *(new provider)* Claude Opus 4.8 / Sonnet 4.6 / Haiku 4.5, **OpenAI** GPT-5.5, and **Google** Gemini 3 Pro (the only one that reads video). See [Text & analysis](/reference/text).
- **Google** — added the **Imagen 4.0** family (4.0 / Ultra / Fast) and **Gemini Omni**.
- **Happy Horse** — added Happy Horse 1.5 (text-to-video and ref-to-video).
- **Deprecated / retired** — removed from the catalog: GPT Image 1, OpenAI TTS-1 / TTS-1 HD, the Kling image & multi-image family, LTX Pro / Fast / Retake, Wan 2.6 (T2V / R2V / Image), Seedream 4.0, Runway Gen-3 Turbo & Aleph, Recraft v2 (+ Vector), Qwen v1, and Seedance 1.5 Pro / I2V. These stay resolvable for historical jobs and pricing but are no longer offered for new generations.

**New CLI command — `gen-ai describe`.** Analyze an image or video with an LLM (Claude, GPT, or Gemini) and get a **text** answer — caption, OCR, classify, or summarize a clip. The prompt is optional, video auto-routes to a video-capable model, and output goes to stdout for easy piping. See the [CLI Quickstart](/guide/cli-quickstart#describe-an-image-or-video).

---

## 2026-06-19

**Try in Playground links.** Every model now has a direct *Try in Playground* link — on each provider page's parameter section and on every card in the interactive [Model Catalog](/reference/catalog) — that opens the web Playground with the model preselected.

---

## 2026-06-18

**Catalog — now 176 models across 30 providers** (`@picsart/ai-sdk` 3.6.2). 36 models added since the previous catalog:

- **Kling** — Kling V3 Turbo, plus the Kling image & multi-image family (V2 / V2.1 / V1.5 Image, Multi-Image, Multi-Image V2.1).
- **PixVerse** *(new provider)* — V6 and C1 lines: text-to-video, image-to-video, and Fusion reference-to-video.
- **LTX** — LTX Pro, LTX Fast, LTX Retake.
- **Wan** — Wan 2.6 (text-to-video), Wan 2.6 Ref-to-Video, Wan 2.6 Image.
- **Luma** — Ray 3.2, Ray 3.2 Edit, Ray 3.2 Reframe.
- **OpenAI** — GPT Image 1, plus TTS-1 and TTS-1 HD (text-to-speech).
- **Seedance** — Seedance 1.5 Pro, Seedance I2V.
- **Runway** — Gen-3 Alpha Turbo, Aleph 2.
- **Recraft** — Recraft 20B and Recraft 20B Vector.
- **Ideogram** — Ideogram 4.0. · **Seedream** — Seedream 4.0. · **Qwen** — Qwen. · **Grok** — Grok Imagine 1.5.
- **Async** *(new provider)* — Async Flash v1.0 (text-to-speech, 100+ voices).
- **Picsart** — Remove Background now runs on `picsart-sod-v8-2` (replaces the previous `picsart-remove-bg`).

**Docs** — Public documentation site launched: CLI, MCP, and Skills guides, a searchable [Model Catalog](/reference/catalog), and a reference page per provider with parameters and CLI + MCP examples.

---

> Looking for the full catalog right now? Browse the [Model Catalog](/reference/catalog) or the [Providers](/reference/providers/) grid — both are generated from the live catalog.
