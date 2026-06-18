# Happy Horse

**Mode:** video · **Models:** 3

**Vendor:** [Qwen Cloud](https://www.qwencloud.com/models/happyhorse-1.0-t2v) · **Official API docs:** [Qwen Cloud docs](https://docs.qwencloud.com/developer-guides/getting-started/introduction)

Happy Horse 1.0 is a text-to-video model running on Qwen Cloud (Alibaba Cloud Intl / DashScope), with highly realistic dynamic rendering, accurate text-semantic comprehension, and fluid, detail-rich motion. Resolutions up to 1080P and 5/10/15-second durations. The catalog also exposes backend-enabled **reference-to-video** and **video-edit** variants alongside the base text-to-video model.

## Models

| id | Name | Input type |
|---|---|---|
| `happyhorse-1.0-t2v` | Happy Horse 1.0 | `t2v` |
| `happyhorse-1.0-r2v` | Happy Horse 1.0 Ref-to-Video | `i2v` |
| `happyhorse-1.0-video-edit` | Happy Horse 1.0 Video Edit | `v2v` |

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

## Parameters — `happyhorse-1.0-t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (max 2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` (default `16:9`) |
| `resolution` | `-r` | enum | `720P` · `1080P` (default `720P`) |
| `duration` | `-d` | enum | `5` · `10` · `15` (seconds, default `5`) |
| `startFrame` | `--start-frame` | file | first-frame keyframe (image) |

> Source: `gen-ai models info happyhorse-1.0-t2v --json`. The `r2v` variant takes up to 9 reference images via `imageUrls` (`-i`); the `video-edit` variant takes a source video plus reference images.

## Pricing

```bash
gen-ai pricing happyhorse-1.0-t2v -d 10 -r 1080P
```

Cost scales with **duration** and **resolution** (1080P costs roughly 1.7× the 720P rate).
