---
description: "PixVerse AI models on Picsart — 6 video model(s) including PixVerse V6, PixVerse C1, PixVerse V6 Fusion. CLI + MCP examples, parameters, and official docs."
---

# PixVerse

**Mode:** video · **Models:** 6

**Vendor:** [PixVerse](https://pixverse.ai) · **Official API docs:** [PixVerse Platform Docs](https://docs.platform.pixverse.ai)

PixVerse is a video model family with text-to-video, image-to-video (start-frame), and **Fusion** reference-to-video (compose from up to several reference images). Two lines are available: **V6** and **C1**, each spanning text, image, and fusion inputs, with quality up to 1080p, durations of 5–15s, and optional native audio.

## Models

| id | Name | Input type |
|---|---|---|
| `pixverse-v6` | PixVerse V6 | `t2v` |
| `pixverse-v6-image` | PixVerse V6 Image | `i2v` |
| `pixverse-v6-fusion` | PixVerse V6 Fusion | `i2v` |
| `pixverse-c1` | PixVerse C1 | `t2v` |
| `pixverse-c1-image` | PixVerse C1 Image | `i2v` |
| `pixverse-c1-fusion` | PixVerse C1 Fusion | `i2v` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m pixverse-v6 \
  -p "a paper boat sailing down a rain-soaked city gutter, cinematic" \
  --ar 16:9 --quality 1080p -d 8 --audio-gen true

# image-to-video from a start frame
gen-ai generate -m pixverse-c1-image -i ./start.jpg \
  -p "the camera slowly pulls back to reveal the skyline"

# reference-to-video (Fusion) from multiple images
gen-ai generate -m pixverse-v6-fusion -i ./ref1.jpg -i ./ref2.jpg \
  -p "blend the subjects into one continuous scene"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "pixverse-v6",
    "prompt": "a paper boat sailing down a rain-soaked city gutter, cinematic",
    "aspectRatio": "16:9",
    "quality": "1080p",
    "duration": 8,
    "generateAudio": true
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "pixverse-v6-fusion",
    "prompt": "blend the subjects into one continuous scene",
    "imageUrls": ["https://example.com/ref1.jpg", "https://example.com/ref2.jpg"]
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `pixverse-v6` — PixVerse V6

[Try `pixverse-v6` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-v6)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `4:3` · `1:1` · `3:4` · `9:16` · `2:3` · `3:2` · `21:9` (default `16:9`) |

### `pixverse-v6-image` — PixVerse V6 Image

[Try `pixverse-v6-image` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-v6-image)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `pixverse-v6-fusion` — PixVerse V6 Fusion

[Try `pixverse-v6-fusion` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-v6-fusion)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `4:3` · `1:1` · `3:4` · `9:16` · `2:3` · `3:2` · `21:9` (default `16:9`) |
| `imageUrls` | `-i` | file | **required** image (up to 7) |

### `pixverse-c1` — PixVerse C1

[Try `pixverse-c1` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-c1)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `4:3` · `1:1` · `3:4` · `9:16` · `2:3` · `3:2` · `21:9` (default `16:9`) |

### `pixverse-c1-image` — PixVerse C1 Image

[Try `pixverse-c1-image` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-c1-image)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `pixverse-c1-fusion` — PixVerse C1 Fusion

[Try `pixverse-c1-fusion` in Playground ↗](https://picsart.com/ai-playground/?model=pixverse-c1-fusion)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `quality` | `--quality` | enum | `360p` · `540p` · `720p` · `1080p` (default `540p`) |
| `duration` | `-d` | enum | `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `4:3` · `1:1` · `3:4` · `9:16` · `2:3` · `3:2` · `21:9` (default `16:9`) |
| `imageUrls` | `-i` | file | **required** image (up to 7) |

## Pricing

```bash
gen-ai pricing pixverse-v6 -d 8
```

Cost scales with **quality** and **duration**. Cost is resolved per `modelId` via the backend `/options` call.
