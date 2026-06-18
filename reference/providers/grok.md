---
description: "Grok (xAI) AI models on Picsart — 6 audio/image/video model(s) including Grok TTS, Grok Imagine, Grok Imagine Quality. CLI + MCP examples, parameters, and official docs."
---

# Grok

**Modes:** video · image · audio · **Models:** 6

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

## Parameters — `grok-imagine-video`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `3:2` · `2:3` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `3` · `5` · `6` · `8` · `10` · `12` · `15` (default `6`) |
| `imageUrls` | `-i` | file | start image (max 1) |

> Source: `gen-ai models info grok-imagine-video --json`. The same model backs image-to-video (pass `-i`); the `grok-edit-video` / `grok-extend-video` variants take a `--video` input and the edit retains the source duration.

## Parameters — `grok-imagine-image-quality`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` · `3:2` · `2:3` · `2:1` · `1:2` · `19.5:9` · `9:19.5` · `20:9` · `9:20` (default `1:1`) |
| `resolution` | `-r` | enum | `1k` · `2k` (default `2k`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `imageUrls` | `-i` | file | source image (max 1) |

> Source: `gen-ai models info grok-imagine-image-quality --json`. `grok-imagine-image` shares this surface at the faster/standard tier.

## Parameters — `grok-tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (max 15000 chars) |
| `voiceId` | `--voice` | enum | `eve` · `ara` · `rex` · `sal` · `leo` (default `eve`) |
| `language` | `--language` | text | spoken language (default auto) |
| `accent` | `--accent` | text | accent hint |

> Source: `gen-ai models info grok-tts --json`.

## Pricing

```bash
gen-ai pricing grok-imagine-video -d 6 -r 720p
```

Video cost scales with **duration** (priced per second); image cost scales with the **Quality vs. standard** tier and **count**; TTS is priced per character.
