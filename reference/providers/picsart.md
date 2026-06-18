---
description: "Picsart AI models on Picsart — 7 image model(s) including Enhance, Flux 2 Klein 4B, Picsart Change Background. CLI + MCP examples, parameters, and official docs."
---

# Picsart

**Mode:** image · **Models:** 7

**Official API docs:** [docs.picsart.io](https://docs.picsart.io)

Picsart's own image models run on the Picsart Compute Platform (PCP). They cover fast text-to-image generation (**SANA-Sprint**, **Flux 2 Klein 4B**) plus a set of task-shaped image-editing operations — background change/removal, enhance/upscale, natural-language image edit, and makeup. SANA-Sprint executes synchronously for near-instant results.

## Models

| id | Name | Input type |
|---|---|---|
| `picsart-sana-sprint-v1` | Picsart SANA-Sprint | `t2i` |
| `picsart-flux-klein` | Flux 2 Klein 4B | `t2i` |
| `picsart-change-bg` | Picsart Change Background | `i2i` |
| `picsart-remove-bg` | Remove Background | `i2i` |
| `picsart-enhance` | Enhance | `i2i` |
| `picsart-qwen-image-edit` | Picsart Image Edit | `i2i` |
| `picsart-qwen-makeup` | Picsart Makeup | `i2i` |

## CLI

```bash
# fast text-to-image (synchronous)
gen-ai generate -m picsart-sana-sprint-v1 \
  -p "a neon koi fish swimming through a misty bamboo forest, dramatic lighting" \
  --ar 16:9 -s

# text-to-image with Flux 2 Klein
gen-ai generate -m picsart-flux-klein -p "isometric cozy reading nook, soft pastel palette"

# task-shaped image editing
gen-ai remove-bg -i ./portrait.jpg
gen-ai change-bg -i ./product.jpg -p "marble countertop, soft studio light"
gen-ai enhance -i ./low-res.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "picsart-sana-sprint-v1",
    "prompt": "a neon koi fish swimming through a misty bamboo forest",
    "aspectRatio": "16:9"
  } }
```

```json
{ "name": "picsart_remove_bg",
  "arguments": { "imageUrls": ["https://example.com/portrait.jpg"] } }
```

```json
{ "name": "picsart_change_bg",
  "arguments": {
    "imageUrls": ["https://example.com/product.jpg"],
    "prompt": "marble countertop, soft studio light"
  } }
```

```json
{ "name": "picsart_enhance",
  "arguments": { "imageUrls": ["https://example.com/low-res.jpg"] } }
```

## Parameters — `picsart-sana-sprint-v1`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` (default) · `4:3` · `3:4` · `3:2` · `2:3` · `16:9` · `9:16` · `2:1` · `1:2` |

> Source: `gen-ai models info picsart-sana-sprint-v1 --json`. The editing models (`picsart-change-bg`, `picsart-remove-bg`, `picsart-enhance`, `picsart-qwen-image-edit`, `picsart-qwen-makeup`) take an `imageUrls` (`-i`) input; `picsart-change-bg` and the Qwen edit models also accept a `prompt`.

## Pricing

```bash
gen-ai pricing picsart-sana-sprint-v1
```

Picsart image models are flat-rate per image — there are no duration or resolution drivers. Cost is resolved per `modelId` via the backend `/options` call.
