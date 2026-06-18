---
description: "Qwen (Alibaba) AI models on Picsart — 3 image model(s) including Qwen 2, Qwen 2 Pro, Qwen Edit Plus. CLI + MCP examples, parameters, and official docs."
---

# Qwen

**Mode:** image · **Models:** 3

**Vendor:** [Qwen Cloud (Alibaba DashScope)](https://docs.qwencloud.com) · **Official API docs:** [Qwen API reference](https://www.alibabacloud.com/help/en/model-studio/qwen-api-reference)

Qwen (by Alibaba) is a text-to-image family with strong typography and prompt-following. The base **Qwen 2** generates up to 1K with optional image input; **Qwen 2 Pro** adds 2K resolutions, a negative prompt, and prompt enhancement; **Qwen Edit Plus** is a dedicated image-edit model that composes from up to 3 source images.

## Models

| id | Name | Input type |
|---|---|---|
| `qwen-image-2` | Qwen 2 | `t2i` |
| `qwen-image-2-pro` | Qwen 2 Pro | `t2i` |
| `qwen-image-edit-plus` | Qwen Edit Plus | `i2i` |

## CLI

```bash
# text-to-image
gen-ai generate -m qwen-image-2 \
  -p "a neon ramen shop sign at night, bold typography, rain reflections" -n 4

# 2K with a negative prompt
gen-ai generate -m qwen-image-2-pro \
  -p "minimalist product poster, large serif headline" \
  --neg "clutter, watermark" -r 2048x2048

# multi-image edit: compose from up to 3 sources
gen-ai generate -m qwen-image-edit-plus \
  -p "place the product on the marble table, soft daylight" \
  -i ./product.png -i ./table.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "qwen-image-2",
    "prompt": "a neon ramen shop sign at night, bold typography, rain reflections",
    "count": 4
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "qwen-image-2-pro",
    "prompt": "minimalist product poster, large serif headline",
    "negativePrompt": "clutter, watermark",
    "resolution": "2048x2048"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `qwen-image-2` — Qwen 2

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `qwen-image-2-pro` — Qwen 2 Pro

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤800 chars) |
| `negativePrompt` | `--neg` | text | free text |
| `resolution` | `-r` | enum | `2048x2048` · `2688x1536` · `1536x2688` · `2368x1728` · `1728x2368` (default `2048x2048`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 3) |

### `qwen-image-edit-plus` — Qwen Edit Plus

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | **required** image (up to 3) |

> **Notes:** `qwen-image-edit-plus` requires both `prompt` and `imageUrls` (up to 3 source images).

## Pricing

```bash
gen-ai pricing qwen-image-2 -n 4
```

Cost scales with the number of images (**count**); on **Qwen 2 Pro** the chosen **resolution** is the other driver.
