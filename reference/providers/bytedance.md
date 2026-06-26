---
description: "ByteDance AI models on Picsart — 2 video model(s) including ByteDance OmniHuman, ByteDance Upscaler. CLI + MCP examples, parameters, and official docs."
---

# ByteDance

**Mode:** video · **Models:** 2

**Vendor:** [BytePlus](https://www.byteplus.com/en/product/seedance) · **Official API docs:** [OmniHuman 1.5 overview](https://docs.byteplus.com/en/docs/byteplus-vision/omnihuman1_5overview)

ByteDance models on the BytePlus Vision AI platform. **OmniHuman 1.5** is an audio-driven avatar model — give it a single portrait image plus an audio clip and it generates a talking/performing video (expression and motion are driven by the audio, not a text prompt). A separate **ByteDance Upscaler** restores and upscales an existing clip to 1080p.

## Models

| id | Name | Input type |
|---|---|---|
| `bytedance-video-upscaler` | ByteDance Upscaler | `v2v` |
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |

## CLI

```bash
# audio-driven talking avatar: portrait image + audio clip
gen-ai generate -m bytedance-omnihuman-v1.5 \
  -i ./portrait.jpg -a ./speech.mp3 \
  -p "subtle head movement, slow camera push-in"

# upscale an existing clip to 1080p
gen-ai generate -m bytedance-video-upscaler --video ./clip.mp4
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
    "model": "bytedance-video-upscaler",
    "videoUrl": "https://example.com/clip.mp4"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `bytedance-video-upscaler` — ByteDance Upscaler

[Try `bytedance-video-upscaler` in Playground ↗](https://picsart.com/ai-playground/?model=bytedance-video-upscaler)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |

### `bytedance-omnihuman-v1.5` — ByteDance OmniHuman

[Try `bytedance-omnihuman-v1.5` in Playground ↗](https://picsart.com/ai-playground/?model=bytedance-omnihuman-v1.5)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `audioUrl` | `-a` | file | **required** audio |

> **Notes:** OmniHuman 1.5 derives emotion and lip-sync from the audio, so `prompt` is optional and only steers camera/motion. The video upscaler takes only a source video.

## Pricing

```bash
gen-ai pricing bytedance-omnihuman-v1.5
```

Cost scales with the **duration** of the generated video (driven by the length of the input audio clip).
