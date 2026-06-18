---
description: "Flux (Black Forest Labs) AI models on Picsart — 5 image model(s) including Flux 2 Flex, Flux 2 Max, Flux 2 Pro. CLI + MCP examples, parameters, and official docs."
---

# Flux

**Mode:** image · **Models:** 5

**Vendor:** [Black Forest Labs](https://blackforestlabs.ai) · **Official API docs:** [docs.bfl.ml](https://docs.bfl.ml)

Flux (by Black Forest Labs) is a family of high-quality text-to-image models with crisp detail and strong prompt adherence. The **Kontext** models add reference-guided editing — generate from a prompt *and* one or more input images.

## Models

| id | Name | Input type | Notes |
|---|---|---|---|
| `flux-2-pro` | Flux 2 Pro | `t2i` | Multi-image input, up to 2K |
| `flux-2-max` | Flux 2 Max | `t2i` | Highest quality |
| `flux-2-flex` | Flux 2 Flex | `t2i` | Flexible / cost-aware |
| `flux-kontext-max` | Flux Kontext Max | `t2i` | Reference-guided editing |
| `flux-kontext-pro` | Flux Kontext Pro | `t2i` | Reference-guided editing |

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

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `4:3`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 4) |

### `flux-2-max` — Flux 2 Max

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `flux-2-flex` — Flux 2 Flex

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `5:3` · `3:5` · `4:3` · `3:4` (default `3:4`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `flux-kontext-max` — Flux Kontext Max

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `21:9` · `9:21` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 4) |

### `flux-kontext-pro` — Flux Kontext Pro

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `21:9` · `9:21` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

> **Notes:** Flux 2 Pro and Flux Kontext Max accept up to 4 reference images; Flux 2 Max / Flex and Flux Kontext Pro accept 1. Kontext models use `imageUrls` as the edit reference.

## Pricing

```bash
gen-ai pricing flux-2-pro -n 4
```

Cost scales with **resolution/quality** and the **number of outputs** (`count`).
