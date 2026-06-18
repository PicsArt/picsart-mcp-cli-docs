---
description: "Changelog for the Picsart gen-ai CLI, MCP server, and model catalog — new models, providers, and documentation updates."
title: Changelog
---

# Changelog

Notable changes to the Picsart model catalog and these docs. Newest first. The catalog is served by `@picsart/ai-sdk`; the same models are reachable from the [CLI](/guide/cli-quickstart), the [MCP server](/guide/mcp-quickstart), and [Skills](/guide/skills).

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
