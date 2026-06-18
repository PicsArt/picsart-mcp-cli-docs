---
description: "Recraft AI models on Picsart — 22 image model(s) including Recraft Creative Upscale, Recraft Crisp Upscale, Recraft Explore. CLI + MCP examples, parameters, and official docs."
---

# Recraft

**Mode:** image · **Models:** 22

**Vendor:** [Recraft](https://www.recraft.ai) · **Official API docs:** [recraft.ai/docs](https://www.recraft.ai/docs)

Recraft is a design-focused image model with strong text rendering, long prompts (up to 10K characters), and native vector (SVG) output. The V4.1 family spans raster and **Vector** variants, each in standard, **Pro**, and **Utility** tiers, alongside dedicated utility workflows for vectorize, upscale, background replacement, and Explore.

## Models

| id | Name | Input type |
|---|---|---|
| `recraftv4_1` | Recraft V4.1 | `t2i` |
| `recraftv4_1_pro` | Recraft V4.1 Pro | `t2i` |
| `recraftv4_1_utility` | Recraft V4.1 Utility | `t2i` |
| `recraftv4_1_utility_pro` | Recraft V4.1 Utility Pro | `t2i` |
| `recraftv4_1_vector` | Recraft V4.1 Vector | `t2i` |
| `recraftv4_1_pro_vector` | Recraft V4.1 Pro Vector | `t2i` |
| `recraftv4_1_utility_vector` | Recraft V4.1 Utility Vector | `t2i` |
| `recraftv4_1_utility_pro_vector` | Recraft V4.1 Utility Pro Vector | `t2i` |
| `recraftv4` | Recraft V4 | `t2i` |
| `recraftv4_pro` | Recraft V4 Pro | `t2i` |
| `recraftv4_vector` | Recraft V4 Vector | `t2i` |
| `recraftv4_pro_vector` | Recraft V4 Pro Vector | `t2i` |
| `recraftv3` | Recraft V3 | `t2i` |
| `recraftv3_vector` | Recraft V3 Vector | `t2i` |
| `recraft-explore` | Recraft Explore | `t2i` |
| `recraft-explore-similar` | Recraft Explore Similar | `i2i` |
| `recraft-vectorize` | Recraft Vectorize | `i2i` |
| `recraft-creative-upscale` | Recraft Creative Upscale | `i2i` |
| `recraft-crisp-upscale` | Recraft Crisp Upscale | `i2i` |
| `recraftv3-replace-bg` | Recraft Replace Background | `i2i` |
| `recraftv2` | Recraft 20B | `t2i` |
| `recraftv2_vector` | Recraft 20B Vector | `t2i` |

## CLI

```bash
# text-to-image with the V4.1 flagship
gen-ai generate -m recraftv4_1 \
  -p "a vintage travel poster of the Swiss Alps, bold typography, flat color" \
  --ar 3:4 -n 2

# native SVG vector output
gen-ai generate -m recraftv4_1_vector \
  -p "minimal line-art fox logo, single weight, two colors" --ar 1:1

# convert a raster image to SVG
gen-ai generate -m recraft-vectorize -i ./logo.png
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "recraftv4_1",
    "prompt": "a vintage travel poster of the Swiss Alps, bold typography, flat color",
    "aspectRatio": "3:4",
    "count": 2
  } }
```

```json
{ "name": "picsart_vectorize",
  "arguments": {
    "model": "recraft-vectorize",
    "imageUrls": ["https://example.com/logo.png"]
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `recraftv4_1` — Recraft V4.1

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_pro` — Recraft V4.1 Pro

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_utility` — Recraft V4.1 Utility

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_utility_pro` — Recraft V4.1 Utility Pro

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_vector` — Recraft V4.1 Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_pro_vector` — Recraft V4.1 Pro Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_utility_vector` — Recraft V4.1 Utility Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_1_utility_pro_vector` — Recraft V4.1 Utility Pro Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4` — Recraft V4

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `style` | `--style` | enum | `raster` (Raster) · `vector_illustration` (Vector (SVG)) (default `raster`) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv3` — Recraft V3

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `style` | `--style` | enum | `realistic_image` (Realistic) · `digital_illustration` (Illustration) · `vector_illustration` (Vector (SVG)) · `any` (Any) (default `realistic_image`) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `negativePrompt` | `--neg` | text | free text |
| `imageUrls` | `-i` | file | image (up to 1) |
| `imageWeight` | `--weight` | integer | `0`–`100`, step 5, default `80` |

### `recraftv4_pro` — Recraft V4 Pro

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `style` | `--style` | enum | `raster` (Raster) · `vector_illustration` (Vector (SVG)) (default `raster`) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_vector` — Recraft V4 Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv4_pro_vector` — Recraft V4 Pro Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |

### `recraftv3_vector` — Recraft V3 Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `negativePrompt` | `--neg` | text | free text |

### `recraft-vectorize` — Recraft Vectorize

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text (≤1000 chars) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `recraft-creative-upscale` — Recraft Creative Upscale

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `recraft-crisp-upscale` — Recraft Crisp Upscale

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `recraftv3-replace-bg` — Recraft Replace Background

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text (≤1000 chars) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `recraft-explore` — Recraft Explore

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |

### `recraft-explore-similar` — Recraft Explore Similar

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `sourceImageId` | `--source-id` | text | **required** |
| `similarity` | `--similarity` | integer | `1`–`5`, step 1, default `3` |

### `recraftv2` — Recraft 20B

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `style` | `--style` | enum | `realistic_image` (Realistic) · `digital_illustration` (Illustration) · `vector_illustration` (Vector (SVG)) · `icon` (Icon) (default `realistic_image`) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `negativePrompt` | `--neg-prompt` | text | free text |

### `recraftv2_vector` — Recraft 20B Vector

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `negativePrompt` | `--neg-prompt` | text | free text |

> **Notes:** Vector variants output SVG; the `recraft-vectorize` / `*-upscale` / `replace-bg` utility models take an image input (`-i`). `recraft-explore` returns multiple images per call.

## Pricing

```bash
gen-ai pricing recraftv4_1 -n 2
```

Cost scales with the **number of images** (`count`) and the **model tier** — Pro variants cost more than standard, and vector output is priced separately.
