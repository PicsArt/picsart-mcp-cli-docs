---
description: "Pika AI models on Picsart — 3 video model(s) including Pika, Pika Frames, Pika Scenes. CLI + MCP examples, parameters, and official docs."
---

# Pika

**Mode:** video · **Models:** 3

**Vendor:** [Pika](https://pika.art/api) · **Official API docs:** [Pika API (via Fal AI)](https://pika.art/api)

Pika 2.2 is a video model offered through Fal AI. It covers text-to-video and image-to-video (first-frame animation) under one `pika-2.2` model, plus two specialized variants: **Pika Scenes** for multi-image scene composition and **Pika Frames** for keyframe-transition morphs. Resolutions go up to 1080p with 5- or 10-second clips.

## Models

| id | Name | Input type |
|---|---|---|
| `pika-2.2` | Pika | `t2v` |
| `pika-2.2-scenes` | Pika Scenes | `i2v` |
| `pika-2.2-frames` | Pika Frames | `i2v` |

## CLI

```bash
# text-to-video
gen-ai generate -m pika-2.2 \
  -p "a large elegant white poodle on a yacht, golden hour" \
  --ar 16:9 -r 720p -d 5

# image-to-video: animate a still as the first frame (aspect derived from image)
gen-ai generate -m pika-2.2 -p "gentle camera push-in, leaves drifting" -i ./still.jpg

# Pika Scenes: compose multiple ingredient images into one scene
gen-ai generate -m pika-2.2-scenes -p "the cat and the dog playing in a sunny garden" \
  -i ./cat.jpg --image ./dog.jpg

# Pika Frames: morph between a start and end keyframe
gen-ai generate -m pika-2.2-frames -p "smooth transition" -i ./start.jpg --image ./end.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "pika-2.2",
    "prompt": "a large elegant white poodle on a yacht",
    "aspectRatio": "16:9",
    "resolution": "720p",
    "duration": 5
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "pika-2.2-scenes",
    "prompt": "the cat and the dog playing in a sunny garden",
    "imageUrls": ["https://example.com/cat.jpg", "https://example.com/dog.jpg"],
    "resolution": "720p",
    "duration": 5
  } }
```

## Parameters — `pika-2.2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `5` · `10` (seconds, default `5`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:5` · `5:4` · `3:2` · `2:3` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `imageUrls` | `-i` | file | start image (max 1) — animates as first frame |

> Source: `gen-ai models info pika-2.2 --json`. With an image input, `pika-2.2` runs image-to-video and derives the output aspect from the image (no `aspectRatio`). `pika-2.2-scenes` takes multiple ingredient images; `pika-2.2-frames` morphs between keyframes.

## Pricing

```bash
gen-ai pricing pika-2.2 -d 5 -r 720p
```

Cost scales with **duration** and **resolution**.
