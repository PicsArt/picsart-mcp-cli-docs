---
description: "ByteDance AI models on Picsart — 21 image/video/audio model(s) including Seedance, Seedream, Seed Audio, OmniHuman, and Video Enhance. CLI + MCP examples, parameters, and official docs."
---

# ByteDance

**Modes:** image · video · audio · **Models:** 21

**Vendor:** [BytePlus](https://www.byteplus.com/en/product/seedance) · **Official API docs:** [OmniHuman 1.5 overview](https://docs.byteplus.com/en/docs/byteplus-vision/omnihuman1_5overview)

ByteDance models on the BytePlus Vision AI platform. **OmniHuman 1.5** is an audio-driven avatar model — give it a single portrait image plus an audio clip and it generates a talking/performing video (expression and motion are driven by the audio, not a text prompt). A separate **ByteDance Video Enhance** denoises, colour-corrects and super-resolves existing footage up to 8K, and can convert frame rate.

Seedance video, Seedream image, and Seed Audio speech models share this provider group.
Seedream 5.0 Flash adds a fast image generation tier.

## Models

| id | Name | Input type |
|---|---|---|
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |
| `bytedance-video-enhance` | ByteDance Video Enhance | `v2v` |
| `seedance-2.5` | Seedance 2.5 | `t2v` |
| `seedance-2.5-video-edit` | Seedance 2.5 Video Edit | `v2v` |
| `seedance-2.5-video-extend` | Seedance 2.5 Video Extend | `v2v` |
| `seedance-2.0` | Seedance 2.0 | `t2v` |
| `seedance-2.0-fast` | Seedance 2.0 Fast | `t2v` |
| `seedance-2.0-mini` | Seedance 2.0 Mini | `t2v` |
| `seedance-2.0-video-edit` | Seedance 2.0 Video Edit | `v2v` |
| `seedance-2.0-fast-video-edit` | Seedance 2.0 Fast Video Edit | `v2v` |
| `seedance-2.0-mini-video-edit` | Seedance 2.0 Mini Video Edit | `v2v` |
| `seedance-2.0-video-extend` | Seedance 2.0 Video Extend | `v2v` |
| `seedance-2.0-fast-video-extend` | Seedance 2.0 Fast Video Extend | `v2v` |
| `seedance-2.0-mini-video-extend` | Seedance 2.0 Mini Video Extend | `v2v` |
| `seedream-5.0-flash` | Seedream 5.0 Flash | `t2i` |
| `seedream-5.0-pro` | Seedream 5.0 Pro | `t2i` |
| `seedream-5.0-lite` | Seedream 5.0 Lite | `t2i` |
| `seedream-4.7` | Seedream 4.7 | `t2i` |
| `seedream-4.5` | Seedream 4.5 | `t2i` |
| `seed-audio-1.0-multilingual` | Seed Audio Multilingual | `tts` |
| `seed-audio-1.0` | Seed Audio | `tts` |

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

### `seedance-2.5` — Seedance 2.5

[Try `seedance-2.5` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.5)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `1080p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` · `16` · `17` · `18` · `19` · `20` · `21` · `22` · `23` · `24` · `25` · `26` · `27` · `28` · `29` · `30` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `outputFormat` | `--output-format` | enum | `mp4` · `mov` (default `mp4`) |
| `colorDepth` | SDK only | enum | `10bit` · `8bit` (default `10bit`) |
| `draft` | `--draft` | boolean | `true` · `false` (default `false`) |
| `draftTask` | `--draft-task-id` · `--draft-task-video-input` · `--draft-task-signature` | object | `{id, video_input, signature}` |
| `omniReferenceTaskType` | `--omni-reference-task-type` | enum | `auto` (Auto) · `reference` (Reference) · `edit` (Edit) · `extend` (Extend) (default `auto`) |
| `imageUrls` | `-i` | file | image (up to 30) |
| `videoUrls` | `--video-urls` | file | video (up to 10) |
| `audioUrls` | `--audio-urls` | file | audio (up to 10) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `seedance-2.5-video-edit` — Seedance 2.5 Video Edit

[Try `seedance-2.5-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.5-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `adaptive` (default `adaptive`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `1080p`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `outputFormat` | `--output-format` | enum | `mp4` · `mov` (default `mp4`) |
| `colorDepth` | SDK only | enum | `10bit` · `8bit` (default `10bit`) |
| `draft` | `--draft` | boolean | `true` · `false` (default `false`) |
| `videoUrl` | `--video` | file | **required** video |
| `imageUrls` | `-i` | file | image (up to 30) |

### `seedance-2.5-video-extend` — Seedance 2.5 Video Extend

[Try `seedance-2.5-video-extend` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.5-video-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `adaptive` (default `adaptive`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `1080p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` · `16` · `17` · `18` · `19` · `20` · `21` · `22` · `23` · `24` · `25` · `26` · `27` · `28` · `29` · `30` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `outputFormat` | `--output-format` | enum | `mp4` · `mov` (default `mp4`) |
| `colorDepth` | SDK only | enum | `10bit` · `8bit` (default `10bit`) |
| `draft` | `--draft` | boolean | `true` · `false` (default `false`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 10) |

### `seedance-2.0` — Seedance 2.0

[Try `seedance-2.0` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` · `4k` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `10`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
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
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `10`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `imageUrls` | `-i` | file | image (up to 9) |
| `videoUrls` | `--video-urls` | file | video (up to 3) |
| `audioUrls` | `--audio-urls` | file | audio (up to 3) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `seedance-2.0-mini` — Seedance 2.0 Mini

[Try `seedance-2.0-mini` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-mini)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `10`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
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
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` · `4k` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
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
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `returnLastFrame` | `--return-last-frame` | boolean | `true` · `false` (default `false`) |
| `videoUrl` | `--video` | file | **required** video |
| `imageUrls` | `-i` | file | image (up to 9) |

### `seedance-2.0-mini-video-edit` — Seedance 2.0 Mini Video Edit

[Try `seedance-2.0-mini-video-edit` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-mini-video-edit)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
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
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` · `4k` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 3) |

### `seedance-2.0-fast-video-extend` — Seedance 2.0 Fast Video Extend

[Try `seedance-2.0-fast-video-extend` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-fast-video-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 3) |

### `seedance-2.0-mini-video-extend` — Seedance 2.0 Mini Video Extend

[Try `seedance-2.0-mini-video-extend` in Playground ↗](https://picsart.com/ai-playground/?model=seedance-2.0-mini-video-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` (default `16:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `duration` | `-d` | enum | `-1` (Auto) · `4` · `5` · `6` · `7` · `8` · `9` · `10` · `11` · `12` · `13` · `14` · `15` (default `15`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `videoUrls` | `--video-urls` | file | **required** video (up to 3) |

### `seedream-5.0-flash` — Seedream 5.0 Flash

[Try `seedream-5.0-flash` in Playground ↗](https://picsart.com/ai-playground/?model=seedream-5.0-flash)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `1K` · `2K` (default `1K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `imageUrls` | `-i` | file | image (up to 10) |
| `negativePrompt` | `--neg` | text | free text |

### `seedream-5.0-pro` — Seedream 5.0 Pro

[Try `seedream-5.0-pro` in Playground ↗](https://picsart.com/ai-playground/?model=seedream-5.0-pro)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `1K` · `2K` (default `1K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `imageUrls` | `-i` | file | image (up to 10) |
| `negativePrompt` | `--neg` | text | free text |

### `seedream-5.0-lite` — Seedream 5.0 Lite

[Try `seedream-5.0-lite` in Playground ↗](https://picsart.com/ai-playground/?model=seedream-5.0-lite)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `2K` · `3K` (default `2K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 2) |
| `negativePrompt` | `--neg` | text | free text |

### `seedream-4.7` — Seedream 4.7

[Try `seedream-4.7` in Playground ↗](https://picsart.com/ai-playground/?model=seedream-4.7)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `1K` · `2K` · `4K` (default `1K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 2) |
| `negativePrompt` | `--neg` | text | free text |

### `seedream-4.5` — Seedream 4.5

[Try `seedream-4.5` in Playground ↗](https://picsart.com/ai-playground/?model=seedream-4.5)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `2K` · `4K` (default `2K`) |
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `4:3` · `3:4` · `16:9` · `9:16` · `3:2` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 2) |
| `negativePrompt` | `--neg` | text | free text |

### `seed-audio-1.0-multilingual` — Seed Audio Multilingual

[Try `seed-audio-1.0-multilingual` in Playground ↗](https://picsart.com/ai-playground/?model=seed-audio-1.0-multilingual)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤3000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info seed-audio-1.0-multilingual --json` for current values (default `en_male_tim_uranus_bigtts`) |
| `audioUrls` | `--audio-urls` | file | audio (up to 3) |
| `imageUrls` | `-i` | file | image (up to 1) |
| `format` | `--format` | enum | `wav` · `mp3` · `pcm` · `ogg_opus` (default `wav`) |
| `sampleRate` | `--sample-rate` | enum | `8000` · `16000` · `24000` · `32000` · `44100` · `48000` (default `44100`) |
| `speechRate` | `--speech-rate` | range | `-50`–`100` (default `0`) |
| `loudnessRate` | `--loudness-rate` | range | `-50`–`100` (default `0`) |
| `pitchRate` | `--pitch-rate` | range | `-12`–`12` (default `0`) |
| `aigcWatermark` | `--aigc-watermark` | boolean | `true` · `false` (default `false`) |

### `seed-audio-1.0` — Seed Audio

[Try `seed-audio-1.0` in Playground ↗](https://picsart.com/ai-playground/?model=seed-audio-1.0)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤3000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info seed-audio-1.0 --json` for current values (default `en_male_tim_uranus_bigtts`) |
| `audioUrls` | `--audio-urls` | file | audio (up to 3) |
| `imageUrls` | `-i` | file | image (up to 1) |
| `format` | `--format` | enum | `wav` · `mp3` · `pcm` · `ogg_opus` (default `wav`) |
| `sampleRate` | `--sample-rate` | enum | `8000` · `16000` · `24000` · `32000` · `44100` · `48000` (default `44100`) |
| `speechRate` | `--speech-rate` | range | `-50`–`100` (default `0`) |
| `loudnessRate` | `--loudness-rate` | range | `-50`–`100` (default `0`) |
| `pitchRate` | `--pitch-rate` | range | `-12`–`12` (default `0`) |
| `aigcWatermark` | `--aigc-watermark` | boolean | `true` · `false` (default `false`) |

## Pricing

```bash
gen-ai pricing bytedance-omnihuman-v1.5
```

Cost scales with the **duration** of the generated video (driven by the length of the input audio clip).
