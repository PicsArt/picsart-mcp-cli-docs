---
description: "Changelog for the Picsart gen-ai CLI, MCP server, and model catalog — new models, providers, and documentation updates."
title: Changelog
---

# Changelog

Notable changes to the Picsart model catalog and these docs. Newest first. The catalog is served by `@picsart/ai-sdk`; the same models are reachable from the [CLI](/guide/cli-quickstart), the [MCP server](/guide/mcp-quickstart), and [Skills](/guide/skills).

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
