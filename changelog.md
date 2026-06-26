---
description: "Changelog for the Picsart gen-ai CLI, MCP server, and model catalog — new models, providers, and documentation updates."
title: Changelog
---

# Changelog

Notable changes to the Picsart model catalog and these docs. Newest first. The catalog is served by `@picsart/ai-sdk`; the same models are reachable from the [CLI](/guide/cli-quickstart), the [MCP server](/guide/mcp-quickstart), and [Skills](/guide/skills).

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
