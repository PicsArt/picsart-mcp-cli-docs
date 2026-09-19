---
description: "OpenAI AI models on Picsart — 17 image/text model(s) including GPT Image 2.5, GPT Image 2, and GPT text models. CLI + MCP examples, parameters, and official docs."
---

# OpenAI

**Modes:** image · text · **Models:** 17

**Vendor:** [OpenAI](https://developers.openai.com/docs/guides/image-generation) · **Official API docs:** [OpenAI Developer Docs](https://developers.openai.com/docs/guides/image-generation)

OpenAI provides GPT Image generation and GPT text and image-understanding models. Sora model IDs are not included in the current production catalog.

## Models

| id | Name | Input type |
|---|---|---|
| `gpt-image-2.5-sunburst` | GPT Image 2.5 Sunburst | `t2i` |
| `gpt-image-2.5-flare` | GPT Image 2.5 Flare | `t2i` |
| `gpt-image-2` | GPT Image 2 | `t2i` |
| `gpt-image-1.5` | GPT Image 1.5 | `t2i` |
| `gpt-6-astra` | GPT-6 Astra | `i2t` |
| `gpt-5.6-sol` | GPT-5.6 Sol | `i2t` |
| `gpt-5.6-terra` | GPT-5.6 Terra | `i2t` |
| `gpt-5.6-luna` | GPT-5.6 Luna | `i2t` |
| `gpt-5.5` | GPT-5.5 | `i2t` |
| `gpt-5.2` | GPT-5.2 | `i2t` |
| `gpt-5.1` | GPT-5.1 | `i2t` |
| `gpt-5` | GPT-5 | `i2t` |
| `gpt-5-mini` | GPT-5 Mini | `i2t` |
| `gpt-4o` | GPT-4o | `i2t` |
| `gpt-4o-mini` | GPT-4o Mini | `i2t` |
| `gpt-4.1-mini` | GPT-4.1 Mini | `i2t` |
| `gpt-4.1-nano` | GPT-4.1 Nano | `i2t` |

## CLI

```bash
# Generate an image from a prompt.
gen-ai generate -m gpt-image-2 -p "An isometric cutaway of a cozy bookshop" --ar 16:9

# Ask a question about an image.
gen-ai describe -m gpt-5.5 -i receipt.jpg -p "Extract the total and tax"
```

## MCP

```json
{ "name": "picsart_generate", "arguments": {
  "model": "gpt-image-2", "prompt": "An isometric cutaway of a cozy bookshop"
} }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `gpt-image-2.5-sunburst` — GPT Image 2.5 Sunburst

[Try `gpt-image-2.5-sunburst` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-2.5-sunburst)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤32000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `quality` | `--quality` | enum | `max` · `xhigh` · `high` · `medium` · `low` (default `high`) |
| `background` | `--background` | enum | `opaque` · `transparent` (default `opaque`) |
| `outputFormat` | `--format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 16) |

### `gpt-image-2.5-flare` — GPT Image 2.5 Flare

[Try `gpt-image-2.5-flare` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-2.5-flare)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤32000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `quality` | `--quality` | enum | `max` · `xhigh` · `high` · `medium` · `low` (default `high`) |
| `background` | `--background` | enum | `opaque` · `transparent` (default `opaque`) |
| `outputFormat` | `--format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 16) |

### `gpt-image-2` — GPT Image 2

[Try `gpt-image-2` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-2)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `quality` | `--quality` | enum | `high` · `medium` · `low` (default `high`) |
| `outputFormat` | `--format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 5) |

### `gpt-image-1.5` — GPT Image 1.5

[Try `gpt-image-1.5` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-1.5)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` (default `1:1`) |
| `quality` | `--quality` | enum | `high` · `medium` · `low` (default `high`) |
| `background` | `--background` | enum | `opaque` · `transparent` (default `opaque`) |
| `outputFormat` | `--format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 5) |

### `gpt-6-astra` — GPT-6 Astra

[Try `gpt-6-astra` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-6-astra)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.6-sol` — GPT-5.6 Sol

[Try `gpt-5.6-sol` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.6-sol)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.6-terra` — GPT-5.6 Terra

[Try `gpt-5.6-terra` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.6-terra)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.6-luna` — GPT-5.6 Luna

[Try `gpt-5.6-luna` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.6-luna)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.5` — GPT-5.5

[Try `gpt-5.5` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.5)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.2` — GPT-5.2

[Try `gpt-5.2` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.2)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5.1` — GPT-5.1

[Try `gpt-5.1` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5.1)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5` — GPT-5

[Try `gpt-5` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-5-mini` — GPT-5 Mini

[Try `gpt-5-mini` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-5-mini)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-4o` — GPT-4o

[Try `gpt-4o` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-4o)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

### `gpt-4o-mini` — GPT-4o Mini

[Try `gpt-4o-mini` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-4o-mini)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

### `gpt-4.1-mini` — GPT-4.1 Mini

[Try `gpt-4.1-mini` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-4.1-mini)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

### `gpt-4.1-nano` — GPT-4.1 Nano

[Try `gpt-4.1-nano` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-4.1-nano)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

## Pricing

Check current model pricing before generating:

```bash
gen-ai pricing gpt-image-2
```

Image cost depends on the model and output settings. See [Pricing](/guide/pricing).
