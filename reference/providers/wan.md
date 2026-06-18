---
description: "Wan (Alibaba) AI models on Picsart — 4 video model(s) including Wan 2.7, Wan 2.7 Image-to-Video, Wan 2.7 Ref-to-Video. CLI + MCP examples, parameters, and official docs."
---

# Wan

**Mode:** video · **Models:** 4

**Vendor:** [Alibaba Model Studio (Wan)](https://www.alibabacloud.com/help/en/model-studio/wan) · **Official API docs:** [Wan (Model Studio)](https://www.alibabacloud.com/help/en/model-studio/wan)

Wan 2.7 (by Alibaba) is a video model with text-to-video, image-to-video, reference-to-video, and video-edit workflows. It supports a start-frame keyframe, an optional driving-audio track, resolutions up to 1080p, and 5 / 10 / 15-second clips.

## Models

| id | Name | Input type |
|---|---|---|
| `wan-2.7-t2v` | Wan 2.7 | `t2v` |
| `wan-2.7-i2v` | Wan 2.7 Image-to-Video | `i2v` |
| `wan-2.7-r2v` | Wan 2.7 Ref-to-Video | `v2v` |
| `wan-2.7-video-edit` | Wan 2.7 Video Edit | `v2v` |

## CLI

```bash
# text-to-video
gen-ai generate -m wan-2.7-t2v \
  -p "a paper boat drifting down a rain-soaked street at night, neon reflections" \
  --ar 16:9 -r 1080P -d 10

# image-to-video from a start frame, with a driving audio track
gen-ai generate -m wan-2.7-i2v -p "the portrait slowly turns and smiles" \
  --start-frame ./portrait.jpg -a ./voice.mp3 -d 5

# edit an existing clip
gen-ai generate -m wan-2.7-video-edit -p "convert to hand-drawn anime style" --video ./clip.mp4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "wan-2.7-t2v",
    "prompt": "a paper boat drifting down a rain-soaked street at night, neon reflections",
    "aspectRatio": "16:9",
    "resolution": "1080P",
    "duration": 10
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "wan-2.7-i2v",
    "prompt": "the portrait slowly turns and smiles",
    "startFrame": "./portrait.jpg",
    "duration": 5
  } }
```

## Parameters — `wan-2.7-t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `5` · `10` · `15` (seconds, default `5`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `negativePrompt` | `--neg` | text | what to avoid |
| `enhancePrompt` | `--enhance-prompt` | boolean | auto-expand the prompt (default `true`) |
| `audioUrl` | `-a` | file | driving audio track |
| `startFrame` | `--start-frame` | file | first-frame keyframe |

> Source: `gen-ai models info wan-2.7-t2v --json`. The i2v / r2v / video-edit variants share this surface; `wan-2.7-i2v` keys off `startFrame`, and the edit/reference variants take a `videoUrl` input.

## Pricing

```bash
gen-ai pricing wan-2.7-t2v -d 10 -r 1080P
```

Cost scales with **duration** and **resolution**.
