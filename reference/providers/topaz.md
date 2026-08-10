---
description: "Topaz AI models on Picsart — image and video upscaling with selectable enhancement models. CLI + MCP examples, parameters, and official docs."
---

# Topaz

**Modes:** image · video · **Models:** 2

**Vendor:** [Topaz Labs](https://docs.topazlabs.com) · **Official API docs:** [developer.topazlabs.com](https://developer.topazlabs.com)

Topaz Labs provides AI image and video enhancement. `topaz-upscale-image` exposes selectable presets for low-resolution photos, CGI/3D renders, high-fidelity preservation, text/graphics, and generative recovery. `topaz-upscale-video` offers the Proteus, Artemis, Nyx, Gaia, and Starlight model families for video sources.

## Models

| id | Name | Input type |
|---|---|---|
| `topaz-upscale-image` | Topaz Image Upscale | `i2i` |
| `topaz-upscale-video` | Topaz Video Upscale | `v2v` |

## CLI

```bash
# upscale a low-resolution photo
gen-ai generate -m topaz-upscale-image -i ./old-scan.jpg --model "Low Resolution V2"

# upscale a video with the Proteus model
gen-ai generate -m topaz-upscale-video --video ./clip.mp4 --model Proteus
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "topaz-upscale-image",
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

The task-shaped `picsart_enhance` tool also routes to Topaz upscaling:

```json
{ "name": "picsart_enhance",
  "arguments": {
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `topaz-upscale-image` — Topaz Image Upscale

[Try `topaz-upscale-image` in Playground ↗](https://picsart.com/ai-playground/?model=topaz-upscale-image)

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `model` | `--model` | enum | `Standard V2` · `Standard MAX` · `Low Resolution V2` · `High Fidelity V2` · `CGI` · `Text Refine` · `Redefine` · `Recovery` · `Recovery V2` · `Wonder` · `Wonder 3` (default `Standard V2`) |

### `topaz-upscale-video` — Topaz Video Upscale

[Try `topaz-upscale-video` in Playground ↗](https://picsart.com/ai-playground/?model=topaz-upscale-video)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `model` | `--model` | enum | `Proteus` · `Artemis HQ` · `Artemis MQ` · `Artemis LQ` · `Nyx` · `Nyx Fast` · `Nyx XL` · `Nyx HF` · `Gaia HQ` · `Gaia CG` · `Gaia 2` · `Starlight Precise 1` · `Starlight Precise 2` · `Starlight Precise 2.5` · `Starlight HQ` · `Starlight Mini` · `Starlight Sharp` · `Starlight Fast 1` · `Starlight Fast 2` (default `Proteus`) |

## Pricing

```bash
gen-ai pricing topaz-upscale-image
gen-ai pricing topaz-upscale-video
```

Run `gen-ai pricing` for the selected model and input before generating; image and video upscaling use separate pricing entries.
