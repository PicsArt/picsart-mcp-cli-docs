---
description: "LTX (Lightricks) AI models on Picsart — 5 video model(s) including LTX 2.3 Audio-to-Video, LTX 2.3 Extend, LTX 2.3 Fast. CLI + MCP examples, parameters, and official docs."
---

# LTX

**Mode:** video · **Models:** 5

**Vendor:** [Lightricks LTX](https://www.lightricks.com/ltxv-documentation) · **Official API docs:** [docs.ltx.video](https://docs.ltx.video)

LTX 2.3 (by Lightricks) is a video model with synchronized native audio, first-to-last frame image control, and resolutions up to 4K. The **Pro** flagship handles text-to-video, image-to-video, audio-to-video, retake, and extend; the **Fast** variant trades fidelity for speed and longer clips.

## Models

| id | Name | Input type |
|---|---|---|
| `ltx-v2.3-pro` | LTX 2.3 Pro | `t2v` |
| `ltx-v2.3-fast` | LTX 2.3 Fast | `t2v` |
| `ltx-2.3-a2v` | LTX 2.3 Audio-to-Video | `a2v` |
| `ltx-v2.3-extend` | LTX 2.3 Extend | `v2v` |
| `ltx-v2.3-retake` | LTX 2.3 Retake | `v2v` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m ltx-v2.3-pro \
  -p "aerial shot over a misty forest at dawn, slow push-in, ambient birdsong" \
  --ar 16:9 -r 1080p -d 8 --audio-gen

# image-to-video: animate a start frame
gen-ai generate -m ltx-v2.3-pro -p "the camera drifts forward as fog rolls in" -i ./still.jpg

# audio-driven generation
gen-ai generate -m ltx-2.3-a2v -p "a singer performing on a neon stage" -a ./vocals.mp3

# extend an existing clip
gen-ai generate -m ltx-v2.3-extend -p "the scene continues into night" --video ./clip.mp4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ltx-v2.3-pro",
    "prompt": "aerial shot over a misty forest at dawn, slow push-in",
    "aspectRatio": "16:9",
    "resolution": "1080p",
    "duration": 8,
    "generateAudio": true
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `ltx-v2.3-pro` — LTX 2.3 Pro

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `6` · `8` · `10` (default `6`) |
| `resolution` | `-r` | enum | `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `ltx-v2.3-fast` — LTX 2.3 Fast

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `6` · `8` · `10` · `12` · `14` · `16` · `18` · `20` (default `6`) |
| `resolution` | `-r` | enum | `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `ltx-2.3-a2v` — LTX 2.3 Audio-to-Video

Input type: `a2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `audioUrl` | `-a` | file | **required** audio |
| `imageUrls` | `-i` | file | image (up to 1) |
| `cfgScale` | `--cfg` | number | `1`–`50`, default `5` |

### `ltx-v2.3-extend` — LTX 2.3 Extend

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `duration` | `-d` | enum | `5` · `10` · `15` · `20` (default `5`) |
| `videoUrl` | `--video` | file | **required** video |

### `ltx-v2.3-retake` — LTX 2.3 Retake

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `5` · `10` · `15` · `20` (default `5`) |
| `videoUrl` | `--video` | file | **required** video |

> **Notes:** A2V / extend / retake are Pro-only and take audio/video inputs; the Fast variant adds longer durations at 1080p.

## Pricing

```bash
gen-ai pricing ltx-v2.3-pro -d 8 -r 1080p
```

Cost scales with **duration**, **resolution**, and **audio**.
