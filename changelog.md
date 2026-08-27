---
description: "Changelog for the Picsart gen-ai CLI, MCP server, and model catalog — new models, providers, and documentation updates."
title: Changelog
---

# Changelog

Notable changes to the Picsart model catalog and these docs. Newest first. The catalog is served by `@picsart/ai-sdk`; the same models are reachable from the [CLI](/guide/cli-quickstart), the [MCP server](/guide/mcp-quickstart), and [Skills](/guide/skills).

## 2026-08-27

**Catalog refresh — now 178 models across 31 providers** (`@picsart/ai-sdk` 5.19.0). Two video models added, none retired.

### New

- **Wan 3.0 Prime** *(video, `t2v`)* — the same all-in-one model as Wan 3.0, up to **7x faster**. Takes image, video and audio references plus start/end frames; 5/10/15/30s at up to 1080P, adaptive aspect ratio, native audio, and an optional `--enable-thinking` pass. See [Wan](/reference/providers/wan).
- **Gemini Omni 1.2 Flash** *(video, `t2v`)* — Gemini Omni with frame interpolation, video extension and reference-guided generation, at up to **4K**. Takes a source video (`--video`, up to 30s) to extend, up to 5 reference images and 3 reference videos, and start/end frames; 3–10s. See [Google](/reference/providers/google).

### Changed

- **Grok Imagine 1.5** is now classified `t2v` (was `i2v`) — its image input is optional, so it generates from a prompt alone. The CLI/MCP call is unchanged; only the input-type label moved. See [Grok](/reference/providers/grok).

### Docs

- The provider-page generator now updates the frontmatter model count on **multi-mode** provider pages. It matched only single-word mode lists, so slash-joined descriptions (`"17 image/video/audio/text model(s)"`) silently kept a stale count — Google had been carrying one across refreshes.
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
