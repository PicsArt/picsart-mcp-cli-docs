---
description: "ByteDance AI models on Picsart — 2 video model(s) including ByteDance OmniHuman, ByteDance Video Enhance. CLI + MCP examples, parameters, and official docs."
---

# ByteDance

**Mode:** video · **Models:** 2

**Vendor:** [BytePlus](https://www.byteplus.com/en/product/seedance) · **Official API docs:** [OmniHuman 1.5 overview](https://docs.byteplus.com/en/docs/byteplus-vision/omnihuman1_5overview)

ByteDance models on the BytePlus Vision AI platform. **OmniHuman 1.5** is an audio-driven avatar model — give it a single portrait image plus an audio clip and it generates a talking/performing video (expression and motion are driven by the audio, not a text prompt). A separate **ByteDance Video Enhance** denoises, colour-corrects and super-resolves existing footage up to 8K, and can convert frame rate.

## Models

| id | Name | Input type |
|---|---|---|
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |
| `bytedance-video-enhance` | ByteDance Video Enhance | `v2v` |

## CLI

```bash
# audio-driven talking avatar: portrait image + audio clip
gen-ai generate -m bytedance-omnihuman-v1.5 \
  -i ./portrait.jpg -a ./speech.mp3 \
  -p "subtle head movement, slow camera push-in"

# restore and super-resolve an existing clip to 4K at 60fps
gen-ai generate -m bytedance-video-enhance --video ./clip.mp4 \
  -r 4k --fps 60 --quality professional
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "bytedance-omnihuman-v1.5",
    "imageUrls": ["https://example.com/portrait.jpg"],
    "audioUrl": "https://example.com/speech.mp3",
    "prompt": "subtle head movement, slow camera push-in"
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "bytedance-video-enhance",
    "videoUrl": "https://example.com/clip.mp4",
    "resolution": "4k",
    "fps": "60",
    "quality": "professional"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `bytedance-omnihuman-v1.5` — ByteDance OmniHuman

[Try `bytedance-omnihuman-v1.5` in Playground ↗](https://picsart.com/ai-playground/?model=bytedance-omnihuman-v1.5)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `audioUrl` | `-a` | file | **required** audio |

> **Notes:** OmniHuman 1.5 derives emotion and lip-sync from the audio, so `prompt` is optional and only steers camera/motion. Video Enhance needs only a source video; every other param refines the restore.

### `bytedance-video-enhance` — ByteDance Video Enhance

[Try `bytedance-video-enhance` in Playground ↗](https://picsart.com/ai-playground/?model=bytedance-video-enhance)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `quality` | `--quality` | enum | `standard` · `professional` (default `standard`) |
| `resolution` | `-r` | enum | `source` · `720p` · `1080p` · `2k` · `4k` · `8k` (default `source`) |
| `fps` | `--fps` | enum | `30` · `60` · `120` (default `30`) |
| `scene` | `--scene` | enum | `common` · `ugc` · `short_series` · `aigc` · `old_film` (default `common`) |
| `bitrateLevel` | `--bitrate-level` | enum | `low` · `medium` · `high` (default `medium`) |

## Pricing

```bash
gen-ai pricing bytedance-omnihuman-v1.5
```

Cost scales with the **duration** of the generated video (driven by the length of the input audio clip).
