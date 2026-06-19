---
description: "MiniMax AI models on Picsart — 5 audio/video model(s) including MiniMax Music v2, Hailuo 2.3, Hailuo 2.3 Fast. CLI + MCP examples, parameters, and official docs."
---

# MiniMax

**Modes:** video, audio · **Models:** 5

**Vendor:** [MiniMax](https://platform.minimax.io/docs) · **Official API docs:** [MiniMax Platform — Video Generation](https://platform.minimax.io/docs/guides/video-generation)

MiniMax provides the **Hailuo 2.3** video family — text-to-video and image-to-video with start-frame control, `[command]` camera directives, and resolutions up to 1080p — plus **MiniMax Music v2** for prompt-driven music with vocals. Hailuo 2.3 comes in a standard and a **Pro** variant (Pro is 1080p at a fixed 6s), each with a **Fast** image-to-video sibling.

## Models

| id | Name | Input type |
|---|---|---|
| `hailuo-2.3` | Hailuo 2.3 | `t2v` |
| `hailuo-2.3-pro` | Hailuo 2.3 Pro | `t2v` |
| `hailuo-2.3-fast` | Hailuo 2.3 Fast | `i2v` |
| `hailuo-2.3-fast-pro` | Hailuo 2.3 Fast Pro | `i2v` |
| `minimax-music-v2` | MiniMax Music v2 | `music` |

## CLI

```bash
# text-to-video with a camera directive
gen-ai generate -m hailuo-2.3 \
  -p "a cat walks forward through a neon alley at night [Push in]" \
  -d 10

# image-to-video from a start frame (Fast variant)
gen-ai generate -m hailuo-2.3-fast -p "she turns and smiles" -i ./frame.png -d 6

# music with vocals
gen-ai generate -m minimax-music-v2 \
  -p "upbeat indie pop with bright guitars and an anthemic chorus, female vocals"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "hailuo-2.3",
    "prompt": "a cat walks forward through a neon alley at night [Push in]",
    "duration": 10
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "minimax-music-v2",
    "prompt": "upbeat indie pop with bright guitars and an anthemic chorus, female vocals"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `hailuo-2.3` — Hailuo 2.3

[Try `hailuo-2.3` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | enum | `6` · `10` (default `6`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `hailuo-2.3-pro` — Hailuo 2.3 Pro

[Try `hailuo-2.3-pro` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-pro)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `hailuo-2.3-fast` — Hailuo 2.3 Fast

[Try `hailuo-2.3-fast` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-fast)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | enum | `6` · `10` (default `6`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `hailuo-2.3-fast-pro` — Hailuo 2.3 Fast Pro

[Try `hailuo-2.3-fast-pro` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-fast-pro)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `minimax-music-v2` — MiniMax Music v2

[Try `minimax-music-v2` in Playground ↗](https://picsart.com/ai-playground/?model=minimax-music-v2)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2000 chars) |
| `lyricsPrompt` | `--lyrics-prompt` | text | lyrics, or a description of the lyrical theme (≤2000 chars, min 10) |
| `lyricsOptimizer` | `--lyrics-optimizer` | boolean | `true` · `false` (default `false`) |
| `isInstrumental` | `--is-instrumental` | boolean | `true` · `false` (default `false`) |
| `outputFormat` | `--format` | enum | `url` · `hex` (default `url`) |

> **Notes:** Pro variants omit `duration` (fixed 6s at 1080p); 10s is available at 768p only. On the Fast image-to-video models `imageUrls` is required.

## Pricing

```bash
gen-ai pricing hailuo-2.3 -d 10
```

Cost scales with **duration** and **resolution** (the Pro variants run at 1080p; 10s is 768p only). Music is priced per generated track.
