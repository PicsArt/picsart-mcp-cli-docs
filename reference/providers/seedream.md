---
description: "Seedream AI models on Picsart — 2 image model(s) including Seedream 4.5, Seedream 5.0 Lite. CLI + MCP examples, parameters, and official docs."
---

# Seedream

**Mode:** image · **Models:** 2

**Vendor:** [BytePlus ModelArk](https://docs.byteplus.com) · **Official API docs:** [Seedream on ModelArk](https://docs.byteplus.com/en/docs/ModelArk/1824121)

Seedream (by ByteDance, on BytePlus ModelArk) is a high-fidelity text-to-image model with multi-image reference input and high-resolution output. The catalog exposes the flagship **Seedream 4.5** (up to 4K) and the faster, lighter **Seedream 5.0 Lite**.

## Models

| id | Name | Input type |
|---|---|---|
| `seedream-4.5` | Seedream 4.5 | `t2i` |
| `seedream-5.0-lite` | Seedream 5.0 Lite | `t2i` |

## CLI

```bash
# text-to-image at 4K
gen-ai generate -m seedream-4.5 \
  -p "a marble statue of a fox in a sunlit gallery, dramatic side lighting" \
  --ar 16:9 -r 4K

# multi-image reference (up to 2 source images), 4 variations
gen-ai generate -m seedream-4.5 -p "blend these into one cohesive product shot" \
  -i ./ref-a.jpg -i ./ref-b.jpg -n 4

# faster, lighter variant
gen-ai generate -m seedream-5.0-lite -p "minimalist poster, bold typography" --ar 3:4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "seedream-4.5",
    "prompt": "a marble statue of a fox in a sunlit gallery, dramatic side lighting",
    "aspectRatio": "16:9",
    "resolution": "4K",
    "count": 4
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `seedream-5.0-lite` — Seedream 5.0 Lite

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `2K` · `3K` (default `2K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 2) |
| `negativePrompt` | `--neg` | text | free text |

### `seedream-4.5` — Seedream 4.5

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `2K` · `4K` (default `2K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 2) |
| `negativePrompt` | `--neg` | text | free text |

> **Notes:** Seedream 5.0 Lite shares the surface but its resolutions are gated to 2K/3K (4K rejected by the worker) even though the enum defines 4K.

## Pricing

```bash
gen-ai pricing seedream-4.5 -r 4K -n 4
```

Cost scales with **resolution** and the **count** of images generated.
