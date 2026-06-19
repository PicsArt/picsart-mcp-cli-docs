---
description: "Grok (xAI) AI models on Picsart — 7 audio/image/video model(s) including Grok Imagine 1.5, Grok TTS, Grok Imagine. CLI + MCP examples, parameters, and official docs."
---

# Grok

**Modes:** video · image · audio · **Models:** 7

**Vendor:** [xAI](https://x.ai) · **Official API docs:** [docs.x.ai](https://docs.x.ai/docs)

Grok Imagine (by xAI) is a multi-mode family on a single API: a fast image-to-video model with start-frame and native audio, image generation in standard and a higher-fidelity **Quality** tier, and the **Grok TTS** voice model. Video covers text-to-video, image-to-video, edit, and extend; image generation is synchronous while video is async.

## Models

| id | Name | Input type |
|---|---|---|
| `grok-imagine-video` | Grok | `t2v` |
| `grok-edit-video` | Grok Edit Video | `v2v` |
| `grok-extend-video` | Grok Extend Video | `v2v` |
| `grok-imagine-image` | Grok Imagine | `t2i` |
| `grok-imagine-image-quality` | Grok Imagine Quality | `t2i` |
| `grok-tts` | Grok TTS | `tts` |
| `grok-imagine-video-1.5` | Grok Imagine 1.5 | `i2v` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m grok-imagine-video \
  -p "a neon hovercar drifting through a rainy cyberpunk alley, cinematic" \
  --ar 16:9 -r 720p -d 6

# image-to-video from a start image
gen-ai generate -m grok-imagine-video -p "slow push-in, drifting fog" -i ./still.jpg

# restyle / continue an existing clip
gen-ai generate -m grok-edit-video -p "anime style repaint" --video ./clip.mp4
gen-ai generate -m grok-extend-video -p "the camera keeps flying forward" --video ./clip.mp4

# high-fidelity image generation
gen-ai generate -m grok-imagine-image-quality \
  -p "a porcelain teapot on a marble counter, soft window light" --ar 1:1 -r 2k -n 4

# text-to-speech
gen-ai generate -m grok-tts -p "Welcome to the Picsart AI Playground." --voice eve
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "grok-imagine-video",
    "prompt": "a neon hovercar drifting through a rainy cyberpunk alley",
    "aspectRatio": "16:9",
    "resolution": "720p",
    "duration": 6
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "grok-imagine-image-quality",
    "prompt": "a porcelain teapot on a marble counter, soft window light",
    "aspectRatio": "1:1",
    "resolution": "2k",
    "count": 4
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "grok-tts",
    "prompt": "Welcome to the Picsart AI Playground.",
    "voiceId": "eve"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `grok-imagine-video` — Grok

[Try `grok-imagine-video` in Playground ↗](https://picsart.com/ai-playground/?model=grok-imagine-video)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `3:2` · `2:3` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `3` · `5` · `6` · `8` · `10` · `12` · `15` (default `6`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `grok-edit-video` — Grok Edit Video

[Try `grok-edit-video` in Playground ↗](https://picsart.com/ai-playground/?model=grok-edit-video)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `videoUrl` | `--video` | file | **required** video |

### `grok-extend-video` — Grok Extend Video

[Try `grok-extend-video` in Playground ↗](https://picsart.com/ai-playground/?model=grok-extend-video)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `3` · `5` · `6` · `8` · `10` (default `6`) |
| `videoUrl` | `--video` | file | **required** video |

### `grok-imagine-image` — Grok Imagine

[Try `grok-imagine-image` in Playground ↗](https://picsart.com/ai-playground/?model=grok-imagine-image)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `3:2` · `2:3` · `2:1` · `1:2` · `19.5:9` · `9:19.5` · `20:9` · `9:20` (default `1:1`) |
| `resolution` | `-r` | enum | `1k` · `2k` (default `1k`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `grok-imagine-image-quality` — Grok Imagine Quality

[Try `grok-imagine-image-quality` in Playground ↗](https://picsart.com/ai-playground/?model=grok-imagine-image-quality)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `3:2` · `2:3` · `2:1` · `1:2` · `19.5:9` · `9:19.5` · `20:9` · `9:20` (default `1:1`) |
| `resolution` | `-r` | enum | `1k` · `2k` (default `2k`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `grok-tts` — Grok TTS

[Try `grok-tts` in Playground ↗](https://picsart.com/ai-playground/?model=grok-tts)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `prompt` | `-p` | text | **required** (≤15000 chars) |
| `voiceId` | `--voice` | enum | `eve` (Eve) · `ara` (Ara) · `rex` (Rex) · `sal` (Sal) · `leo` (Leo) (default `eve`) |

### `grok-imagine-video-1.5` — Grok Imagine 1.5

[Try `grok-imagine-video-1.5` in Playground ↗](https://picsart.com/ai-playground/?model=grok-imagine-video-1.5)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `3:2` · `2:3` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `3` · `5` · `6` · `8` · `10` · `12` · `15` (default `8`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

> **Notes:** `grok-imagine-video` also backs image-to-video (pass `-i`); the edit / extend variants take a `--video` input and retain the source duration.

## Pricing

```bash
gen-ai pricing grok-imagine-video -d 6 -r 720p
```

Video cost scales with **duration** (priced per second); image cost scales with the **Quality vs. standard** tier and **count**; TTS is priced per character.
