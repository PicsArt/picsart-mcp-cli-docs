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

## Parameters — `qwen-image-2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | optional reference image (max 1) |

> Source: `gen-ai models info qwen-image-2 --json`.

## Parameters — `qwen-image-2-pro`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (max 800 chars) |
| `negativePrompt` | `--neg` | text | what to avoid |
| `resolution` | `-r` | enum | `2048x2048` · `2688x1536` · `1536x2688` · `2368x1728` · `1728x2368` (default `2048x2048`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` (default `1`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | rewrite the prompt for richer detail (default `true`) |
| `imageUrls` | `-i` | file | optional reference image(s) (max 3) |

> Source: `gen-ai models info qwen-image-2-pro --json`. `qwen-image-edit-plus` takes `prompt` (**required**) and `imageUrls` (**required**, up to 3 source images).

## Pricing

```bash
gen-ai pricing qwen-image-2 -n 4
```

Cost scales with the number of images (**count**); on **Qwen 2 Pro** the chosen **resolution** is the other driver.
