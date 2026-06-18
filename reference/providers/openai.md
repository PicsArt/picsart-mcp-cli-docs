---
description: "OpenAI AI models on Picsart — 8 image/video/audio model(s) including GPT Image 1.5, GPT Image 2, Sora 2. CLI + MCP examples, parameters, and official docs."
---

# OpenAI

**Modes:** video · image · audio · **Models:** 8

**Vendor:** [OpenAI](https://developers.openai.com/docs/guides/image-generation) · **Official API docs:** [OpenAI Developer Docs](https://developers.openai.com/docs/guides/video-generation)

OpenAI spans two media families on the Playground: **Sora 2** text-to-video (standard and **Pro**, plus a chainable **Extend** workflow) and **GPT Image** text-to-image (`gpt-image-2`, `gpt-image-1.5`). Sora renders up to 720p (1080p on `sora-2-pro`) with native audio and optional first-frame image conditioning.

## Models

| id | Name | Input type |
|---|---|---|
| `sora-2` | Sora 2 | `t2v` |
| `sora-2-pro` | Sora 2 Pro | `t2v` |
| `sora-2-extend` | Sora 2 Extend | `v2v` |
| `gpt-image-2` | GPT Image 2 | `t2i` |
| `gpt-image-1.5` | GPT Image 1.5 | `t2i` |
| `gpt-image-1` | GPT Image 1 | `t2i` |
| `openai-tts-1` | OpenAI TTS-1 | `tts` |
| `openai-tts-1-hd` | OpenAI TTS-1 HD | `tts` |

## CLI

```bash
# text-to-video
gen-ai generate -m sora-2 \
  -p "a paper boat drifting down a rain-soaked city gutter, cinematic, slow motion" \
  --ar 16:9 -d 8

# image-anchored video (first-frame conditioning)
gen-ai generate -m sora-2-pro -p "the boat sets sail into open water" -i ./boat.jpg --ar 16:9 -d 12

# text-to-image
gen-ai generate -m gpt-image-2 \
  -p "an isometric cutaway of a cozy bookshop, warm lighting" \
  --ar 16:9 -n 2
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "sora-2",
    "prompt": "a paper boat drifting down a rain-soaked city gutter, cinematic, slow motion",
    "aspectRatio": "16:9",
    "duration": 8
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "gpt-image-2",
    "prompt": "an isometric cutaway of a cozy bookshop, warm lighting",
    "aspectRatio": "16:9",
    "count": 2
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `sora-2-pro` — Sora 2 Pro

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 1) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1024p` · `1080p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `8` · `12` · `16` · `20` (default `4`) |

### `sora-2` — Sora 2

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 1) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `duration` | `-d` | enum | `4` · `8` · `12` · `16` · `20` (default `4`) |

### `sora-2-extend` — Sora 2 Extend

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `videoId` | `--video-id` | enum | dynamic value (no fixed list) |
| `duration` | `-d` | enum | `4` · `8` · `12` · `16` · `20` (default `8`) |

### `gpt-image-2` — GPT Image 2

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

### `gpt-image-1` — GPT Image 1

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

### `openai-tts-1` — OpenAI TTS-1

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤4096 chars) |
| `voiceId` | `--voice` | enum | `alloy` (Alloy) · `ash` (Ash) · `ballad` (Ballad) · `coral` (Coral) · `echo` (Echo) · `fable` (Fable) · `nova` (Nova) · `onyx` (Onyx) · `sage` (Sage) · `shimmer` (Shimmer) · `verse` (Verse) (default `alloy`) |

### `openai-tts-1-hd` — OpenAI TTS-1 HD

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤4096 chars) |
| `voiceId` | `--voice` | enum | `alloy` (Alloy) · `ash` (Ash) · `ballad` (Ballad) · `coral` (Coral) · `echo` (Echo) · `fable` (Fable) · `nova` (Nova) · `onyx` (Onyx) · `sage` (Sage) · `shimmer` (Shimmer) · `verse` (Verse) (default `alloy`) |

> **Notes:** `sora-2-pro` adds 1080p output; `sora-2-extend` continues an existing video. `gpt-image-2` is opaque-only; `gpt-image-1.5` adds a transparent `background` option.

## Pricing

```bash
gen-ai pricing sora-2 -d 8 --ar 16:9
gen-ai pricing gpt-image-2 --quality high -n 2
```

Sora cost scales with **duration**, **resolution** (720p vs 1080p on Pro), and **tier** (`sora-2` vs `sora-2-pro`). GPT Image cost scales with **quality**, output **size**, and **count**.
