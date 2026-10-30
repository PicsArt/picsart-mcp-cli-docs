---
description: "Flux (Black Forest Labs) AI models on Picsart — 10 image and video models, including Flux 3 Image and Flux 3 Video. CLI + MCP examples, parameters, and official docs."
---

# Flux

**Modes:** image · video · **Models:** 10

**Vendor:** [Black Forest Labs](https://blackforestlabs.ai) · **Official API docs:** [docs.bfl.ml](https://docs.bfl.ml)

Flux (by Black Forest Labs) supports image generation, image editing, and video. **Flux 3 Image** accepts up to 10 reference images and produces images up to 4K. **Kontext** provides image editing from references. **Flux 3 Video** supports text and image inputs, synchronized audio, and video continuation.

## Models

| id | Name | Input type | Notes |
|---|---|---|---|
| `flux-2-pro` | Flux 2 Pro | `t2i` | Multi-image input, up to 4K |
| `flux-2-max` | Flux 2 Max | `t2i` | Detailed compositions |
| `flux-2-flex` | Flux 2 Flex | `t2i` | Varied styles, up to 4K |
| `flux-kontext-max` | Flux Kontext Max | `t2i` | Edit with up to 4 references |
| `flux-kontext-pro` | Flux Kontext Pro | `t2i` | Edit with one reference |
| `flux-3-image` | Flux 3 Image | `t2i` | Generate and edit with up to 10 references, up to 4K |
| `flux-3-image-klein` | Flux 3 Image Klein | `t2i` | Distilled, faster Flux 3 Image with a steps control, up to 4K |
| `flux-3-video` | Flux 3 Video | `t2v` | Video with synchronized audio |
| `flux-video-upscale` | Flux 3 Video Upscale | `v2v` | Upscale video by 1.5x–3x |
| `flux-video-edit` | FLUX Video Edit | `v2v` | Edit video with a text instruction |

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

### `flux-3-image` — Flux 3 Image

[Try `flux-3-image` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-image)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `3:2` · `7:5` · `4:3` · `5:4` · `1:1` · `4:5` · `3:4` · `5:7` · `2:3` · `9:16` · `9:21` · `1:2` (default `auto`) |
| `resolution` | `-r` | enum | `768sq` · `1k` · `1.5k` · `2k` · `4k` (default `1k`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 10) |
| `safetyTolerance` | `--safety-tolerance` | range | `0`–`4` (default `2`) |

### `flux-3-image-klein` — Flux 3 Image Klein

[Try `flux-3-image-klein` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-image-klein)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `3:2` · `7:5` · `4:3` · `5:4` · `1:1` · `4:5` · `3:4` · `5:7` · `2:3` · `9:16` · `9:21` · `1:2` (default `auto`) |
| `resolution` | `-r` | enum | `768sq` · `1k` · `1.5k` · `2k` · `4k` (default `1k`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 10) |
| `steps` | `--steps` | range | `1`–`16` (default `16`) |
| `safetyTolerance` | `--safety-tolerance` | range | `0`–`7` (default `2`) |

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

### `flux-video-edit` — FLUX Video Edit

[Try `flux-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=flux-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `prompt` | `-p` | text | **required** (≤4096 chars) |
| `safetyTolerance` | `--safety-tolerance` | range | `0`–`4` (default `2`) |

### `flux-3-max` — Flux 3 Max

[Try `flux-3-max` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-max)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | range | `5`–`20`, step 1 (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `reasoningLevel` | `--reasoning-level` | enum | `low` · `high` (default `high`) |
| `seed` | `--seed` | range | `-1`–`2147483647` (default `-1`) |

### `flux-3-max-keyframes` — Flux 3 Max Keyframes

[Try `flux-3-max-keyframes` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-max-keyframes)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | **required** image (up to 10) |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | range | `5`–`20`, step 1 (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `reasoningLevel` | `--reasoning-level` | enum | `low` · `high` (default `high`) |
| `seed` | `--seed` | range | `-1`–`2147483647` (default `-1`) |

## Pricing

```bash
gen-ai pricing flux-2-pro
```

Cost scales with **resolution/quality** and the **number of outputs** (`count`).
