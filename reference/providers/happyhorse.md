---
description: "Happy Horse AI models on Picsart — 5 video model(s) including Happy Horse 1.0, Happy Horse 1.0 Ref-to-Video, Happy Horse 1.0 Video Edit. CLI + MCP examples, parameters, and official docs."
---

# Happy Horse

**Mode:** video · **Models:** 5

**Vendor:** [Qwen Cloud](https://www.qwencloud.com/models/happyhorse-1.0-t2v) · **Official API docs:** [Qwen Cloud docs](https://docs.qwencloud.com/developer-guides/getting-started/introduction)

Happy Horse 1.0 is a text-to-video model running on Qwen Cloud (Alibaba Cloud Intl / DashScope), with highly realistic dynamic rendering, accurate text-semantic comprehension, and fluid, detail-rich motion. Resolutions up to 1080P and 5/10/15-second durations. The catalog also exposes backend-enabled **reference-to-video** and **video-edit** variants alongside the base text-to-video model.

## Models

| id | Name | Input type |
|---|---|---|
| `happyhorse-1.0-t2v` | Happy Horse 1.0 | `t2v` |
| `happyhorse-1.0-r2v` | Happy Horse 1.0 Ref-to-Video | `i2v` |
| `happyhorse-1.0-video-edit` | Happy Horse 1.0 Video Edit | `v2v` |
| `happyhorse-1.5-t2v` | Happy Horse 1.1 | `t2v` |
| `happyhorse-1.5-r2v` | Happy Horse 1.1 Ref-to-Video | `i2v` |

## CLI

```bash
# text-to-video
gen-ai generate -m happyhorse-1.0-t2v \
  -p "a wild horse galloping across a misty meadow at dawn, cinematic" \
  --ar 16:9 -r 1080P -d 10

# first-frame guidance: animate from a still
gen-ai generate -m happyhorse-1.0-t2v -p "the horse rears up and breaks into a gallop" \
  --start-frame ./horse.jpg

# reference-to-video: drive the scene from reference images
gen-ai generate -m happyhorse-1.0-r2v -p "[Image 1] runs through [Image 2]" -i ./subject.jpg -i ./field.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "happyhorse-1.0-t2v",
    "prompt": "a wild horse galloping across a misty meadow at dawn, cinematic",
    "aspectRatio": "16:9",
    "resolution": "1080P",
    "duration": 10
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `happyhorse-1.0-t2v` — Happy Horse 1.0

[Try `happyhorse-1.0-t2v` in Playground ↗](https://picsart.com/ai-playground/?model=happyhorse-1.0-t2v)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `duration` | `-d` | enum | `5` · `10` · `15` (default `5`) |
| `startFrame` | `--start-frame` | file | image |

> **Notes:** `r2v` takes up to 9 reference images via `imageUrls`; `video-edit` takes a source video plus reference images.

### `happyhorse-1.0-r2v` — Happy Horse 1.0 Ref-to-Video

[Try `happyhorse-1.0-r2v` in Playground ↗](https://picsart.com/ai-playground/?model=happyhorse-1.0-r2v)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `duration` | `-d` | enum | `5` · `10` · `15` (default `5`) |
| `imageUrls` | `-i` | file | **required** image (up to 9) |

### `happyhorse-1.0-video-edit` — Happy Horse 1.0 Video Edit

[Try `happyhorse-1.0-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=happyhorse-1.0-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `audioSetting` | `--audio-setting` | enum | `auto` · `origin` (default `auto`) |
| `videoUrl` | `--video` | file | **required** video |
| `imageUrls` | `-i` | file | image (up to 5) |

### `happyhorse-1.5-t2v` — Happy Horse 1.1

[Try `happyhorse-1.5-t2v` in Playground ↗](https://picsart.com/ai-playground/?model=happyhorse-1.5-t2v)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `duration` | `-d` | enum | `5` · `10` · `15` (default `5`) |
| `startFrame` | `--start-frame` | file | image |

### `happyhorse-1.5-r2v` — Happy Horse 1.1 Ref-to-Video

[Try `happyhorse-1.5-r2v` in Playground ↗](https://picsart.com/ai-playground/?model=happyhorse-1.5-r2v)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `duration` | `-d` | enum | `5` · `10` · `15` (default `5`) |
| `imageUrls` | `-i` | file | **required** image (up to 9) |

## Pricing

```bash
gen-ai pricing happyhorse-1.0-t2v -d 10 -r 1080P
```

Cost scales with **duration** and **resolution** (1080P costs roughly 1.7× the 720P rate).
