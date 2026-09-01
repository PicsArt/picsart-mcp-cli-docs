---
description: "Flux (Black Forest Labs) AI models on Picsart — 7 image and video model(s) including Flux 2 Flex, Flux 2 Max, Flux 3 Video. CLI + MCP examples, parameters, and official docs."
---

# Flux

**Modes:** image · video · **Models:** 7

**Vendor:** [Black Forest Labs](https://blackforestlabs.ai) · **Official API docs:** [docs.bfl.ml](https://docs.bfl.ml)

Flux (by Black Forest Labs) is a family of high-quality text-to-image models with crisp detail and strong prompt adherence. The **Kontext** models add reference-guided editing — generate from a prompt *and* one or more input images. **Flux 3 Video** extends the family to motion: text-to-video and image-to-video up to 20 seconds at FHD, with native audio.

## Models

| id | Name | Input type | Notes |
|---|---|---|---|
| `flux-2-pro` | Flux 2 Pro | `t2i` | Multi-image input, up to 2K |
| `flux-2-max` | Flux 2 Max | `t2i` | Highest quality |
| `flux-2-flex` | Flux 2 Flex | `t2i` | Flexible / cost-aware |
| `flux-kontext-max` | Flux Kontext Max | `t2i` | Reference-guided editing |
| `flux-kontext-pro` | Flux Kontext Pro | `t2i` | Reference-guided editing |
| `flux-3-video` | Flux 3 Video | `t2v` | Text-to-video with native audio |
| `flux-video-upscale` | Flux Video Upscale | `v2v` | Upscales an existing video up to 3x |

## CLI

```bash
# text-to-image
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup, soft light" --ar 4:3

# multi-image reference (Kontext)
gen-ai generate -m flux-kontext-pro -p "place the product on a marble table" -i ./product.png
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "studio shot of a ceramic cup, soft light",
    "aspectRatio": "4:3",
    "count": 1
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `flux-2-pro` — Flux 2 Pro

[Try `flux-2-pro` in Playground ↗](https://picsart.com/ai-playground/?model=flux-2-pro)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `4:3`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 4) |

### `flux-2-max` — Flux 2 Max

[Try `flux-2-max` in Playground ↗](https://picsart.com/ai-playground/?model=flux-2-max)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `flux-2-flex` — Flux 2 Flex

[Try `flux-2-flex` in Playground ↗](https://picsart.com/ai-playground/?model=flux-2-flex)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `3:4`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `flux-kontext-max` — Flux Kontext Max

[Try `flux-kontext-max` in Playground ↗](https://picsart.com/ai-playground/?model=flux-kontext-max)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `21:9` · `9:21` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 4) |

### `flux-kontext-pro` — Flux Kontext Pro

[Try `flux-kontext-pro` in Playground ↗](https://picsart.com/ai-playground/?model=flux-kontext-pro)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `21:9` · `9:21` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

> **Notes:** Flux 2 Pro and Flux Kontext Max accept up to 4 reference images; Flux 2 Max / Flex and Flux Kontext Pro accept 1. Kontext models use `imageUrls` as the edit reference.

### `flux-3-video` — Flux 3 Video

[Try `flux-3-video` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-video)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `auto`) |
| `resolution` | `-r` | enum | `hd` · `fhd` (default `hd`) |
| `duration` | `-d` | enum | `auto` · `5` · `10` · `15` · `20` (default `auto`) |
| `imageUrls` | `-i` | file | image (up to 10) |
| `videoUrl` | `--video` | file | video |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `safetyTolerance` | `--safety-tolerance` | range | `0`–`4` (default `2`) |
| `draft` | `--draft` | boolean | `true` · `false` (default `false`) |

> **Notes:** `flux-3-video` accepts `imageUrls` (image-to-video, up to 10 references) or `videoUrl`, so it covers `t2v`, `i2v`, and `v2v` from one id. Draft mode is HD-only — with `--draft` on, `fhd` is rejected.

### `flux-video-upscale` — Flux Video Upscale

[Try `flux-video-upscale` in Playground ↗](https://picsart.com/ai-playground/?model=flux-video-upscale)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `upscaleFactor` | `--upscale-factor` | range | `1.5`–`3`, step 0.5 (default `2`) |
| `creativity` | `--creativity` | enum | `0` (Precise) · `1` (Creative) (default `1`) |
| `prompt` | `-p` | text | free text |
| `safetyTolerance` | `--safety-tolerance` | range | `0`–`4` (default `2`) |

## Pricing

```bash
gen-ai pricing flux-2-pro -n 4
```

Cost scales with **resolution/quality** and the **number of outputs** (`count`).
