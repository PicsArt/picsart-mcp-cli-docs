# ByteDance

**Mode:** video · **Models:** 2

**Vendor:** [BytePlus](https://www.byteplus.com/en/product/seedance) · **Official API docs:** [OmniHuman 1.5 overview](https://docs.byteplus.com/en/docs/byteplus-vision/omnihuman1_5overview)

ByteDance models on the BytePlus Vision AI platform. **OmniHuman 1.5** is an audio-driven avatar model — give it a single portrait image plus an audio clip and it generates a talking/performing video (expression and motion are driven by the audio, not a text prompt). A separate **ByteDance Upscaler** restores and upscales an existing clip to 1080p.

## Models

| id | Name | Input type |
|---|---|---|
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |
| `bytedance-video-upscaler` | ByteDance Upscaler | `v2v` |

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

## Parameters — `bytedance-omnihuman-v1.5`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** — portrait image (max 1) |
| `audioUrl` | `-a` | file | **required** — driving audio track |
| `prompt` | `-p` | text | steers picture/movement/camera (not lip-sync) |

> Source: `gen-ai models info bytedance-omnihuman-v1.5 --json`. Emotion and lip-sync come from the audio, so a text prompt is optional and only steers camera/motion.

## Parameters — `bytedance-video-upscaler`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** — video to upscale (→ 1080p) |

> Source: `gen-ai models info bytedance-video-upscaler --json`.

## Pricing

```bash
gen-ai pricing bytedance-omnihuman-v1.5
```

Cost scales with the **duration** of the generated video (driven by the length of the input audio clip).
