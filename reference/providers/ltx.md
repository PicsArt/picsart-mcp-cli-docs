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

## Parameters — `ltx-v2.3-pro`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `6` · `8` · `10` (seconds, default `6`) |
| `resolution` | `-r` | enum | `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `generateAudio` | `--audio-gen` | boolean | native audio track (default `true`) |
| `imageUrls` | `-i` | file | start image (image-to-video) |

> Source: `gen-ai models info ltx-v2.3-pro --json`. The **Fast** variant shares this surface (plus longer durations at 1080p); A2V/extend/retake are Pro-only and take audio/video inputs.

## Pricing

```bash
gen-ai pricing ltx-v2.3-pro -d 8 -r 1080p
```

Cost scales with **duration**, **resolution**, and **audio**.
