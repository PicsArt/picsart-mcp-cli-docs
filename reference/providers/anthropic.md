---
description: "Anthropic Claude models on Picsart — Claude Opus 4.8, Sonnet 4.6, and Haiku 4.5 for image and video analysis via the gen-ai describe command. CLI + MCP examples and parameters."
---

# Anthropic

**Mode:** text · **Models:** 3

**Vendor:** [Anthropic](https://www.anthropic.com) · **Official API docs:** [docs.anthropic.com](https://docs.anthropic.com)

Anthropic's **Claude** models are large language models for analysis, not media generation: give them an image (and an optional question) and they return **text** — captions, OCR, classification, or a description. They power the [`gen-ai describe`](/guide/cli-quickstart#describe-an-image-or-video) command. Three tiers trade capability for speed and cost: **Opus** (most capable), **Sonnet** (balanced, the default), and **Haiku** (fastest).

## Models

| id | Name | Input type |
|---|---|---|
| `claude-opus-4-8` | Claude Opus 4.8 | `i2t` |
| `claude-sonnet-4-6` | Claude Sonnet 4.6 | `i2t` |
| `claude-haiku-4-5` | Claude Haiku 4.5 | `i2t` |

## CLI

```bash
# describe an image (Sonnet is the default model)
gen-ai describe -i photo.jpg

# ask a specific question with the most capable model
gen-ai describe -m claude-opus-4-8 -i receipt.jpg -p "extract the total and tax"

# fast, high-volume captioning — pipe clean text out
gen-ai describe -m claude-haiku-4-5 -i product.jpg --script | pbcopy
```

These models return text, so they run through `gen-ai describe` (not `generate`) and print to stdout — no download or Drive save.

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "claude-sonnet-4-6",
    "prompt": "What brand is the shoe?",
    "imageUrls": ["https://example.com/photo.jpg"]
  } }
```

## Parameters

Full parameter surface, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `claude-opus-4-8` — Claude Opus 4.8

[Try `claude-opus-4-8` in Playground ↗](https://picsart.com/ai-playground/?model=claude-opus-4-8)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

### `claude-sonnet-4-6` — Claude Sonnet 4.6

[Try `claude-sonnet-4-6` in Playground ↗](https://picsart.com/ai-playground/?model=claude-sonnet-4-6)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

### `claude-haiku-4-5` — Claude Haiku 4.5

[Try `claude-haiku-4-5` in Playground ↗](https://picsart.com/ai-playground/?model=claude-haiku-4-5)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

## Pricing

```bash
gen-ai pricing claude-sonnet-4-6
```

Claude analysis is priced per generation; cost is resolved per `modelId` via the backend `/options` call.
