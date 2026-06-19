---
description: "Seedance AI models on Picsart — 8 video model(s) including Seedance 2.0, Seedance 2.0 Fast, Seedance 1.5 Pro. CLI + MCP examples, parameters, and official docs."
---

# Seedance

**Mode:** video · **Models:** 8

**Vendor:** [BytePlus Seedance](https://www.byteplus.com/en/product/seedance) · **Official API docs:** [ModelArk](https://docs.byteplus.com/en/docs/ModelArk/1824121)

Seedance 2.0 (by ByteDance) is a high-quality video model with reference-image and keyframe control, native audio, and resolutions up to 1080p. It comes in a standard and a **Fast** variant, each with dedicated **video-edit** and **video-extend** workflows.

## Models

| id | Name | Input type |
|---|---|---|
| `seedance-2.0` | Seedance 2.0 | `t2v` |
| `seedance-2.0-fast` | Seedance 2.0 Fast | `t2v` |
| `seedance-2.0-video-edit` | Seedance 2.0 Video Edit | `v2v` |
| `seedance-2.0-fast-video-edit` | Seedance 2.0 Fast Video Edit | `v2v` |
| `seedance-2.0-video-extend` | Seedance 2.0 Video Extend | `v2v` |
| `seedance-2.0-fast-video-extend` | Seedance 2.0 Fast Video Extend | `v2v` |
| `seedance-1.5-pro` | Seedance 1.5 Pro | `t2v` |
| `seedance-i2v` | Seedance I2V | `i2v` |

## CLI

```bash
# text-to-video with audio
gen-ai generate -m seedance-2.0 \
  -p "a fox running through autumn leaves, cinematic, shallow depth of field" \
  --ar 16:9 -r 1080p -d 8 --audio-gen

# keyframe control: morph between two stills
gen-ai generate -m seedance-2.0 -p "smooth morph" --start-frame ./a.jpg --end-frame ./b.jpg

# restyle an existing clip
gen-ai generate -m seedance-2.0-video-edit -p "claymation style" --video ./clip.mp4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "seedance-2.0",
    "prompt": "a fox running through autumn leaves",
    "aspectRatio": "16:9",
    "resolution": "1080p",
    "duration": 8,
    "generateAudio": true
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `seedance-2.0` — Seedance 2.0

[Try `seedance-2.0` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `10`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `imageUrls` | `-i` | file | image (up to 9) |
| `videoUrls` | `--video-urls` | file | video (up to 3) |
| `audioUrls` | `--audio-urls` | file | audio (up to 3) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `seedance-2.0-fast` — Seedance 2.0 Fast

[Try `seedance-2.0-fast` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-fast)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `10`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `imageUrls` | `-i` | file | image (up to 9) |
| `videoUrls` | `--video-urls` | file | video (up to 3) |
| `audioUrls` | `--audio-urls` | file | audio (up to 3) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `seedance-2.0-video-edit` — Seedance 2.0 Video Edit

[Try `seedance-2.0-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `videoUrl` | `--video` | file | **required** video |
| `imageUrls` | `-i` | file | image (up to 9) |

### `seedance-2.0-fast-video-edit` — Seedance 2.0 Fast Video Edit

[Try `seedance-2.0-fast-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-fast-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `videoUrl` | `--video` | file | **required** video |
| `imageUrls` | `-i` | file | image (up to 9) |

### `seedance-2.0-video-extend` — Seedance 2.0 Video Extend

[Try `seedance-2.0-video-extend` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-video-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 3) |

### `seedance-2.0-fast-video-extend` — Seedance 2.0 Fast Video Extend

[Try `seedance-2.0-fast-video-extend` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-fast-video-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 3) |

### `seedance-1.5-pro` — Seedance 1.5 Pro

[Try `seedance-1.5-pro` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-1.5-pro)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `4` · `5` · `8` · `10` · `12` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `false`) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `seedance-i2v` — Seedance I2V

[Try `seedance-i2v` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-i2v)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | enum | `5` · `10` (default `5`) |
| `startFrame` | `--start-frame` | file | **required** image |

> **Notes:** The edit / extend variants take a `videoUrls` input.

## Pricing

```bash
gen-ai pricing seedance-2.0 -d 8 -r 1080p
```

Cost scales with **duration**, **resolution**, and **audio**.
