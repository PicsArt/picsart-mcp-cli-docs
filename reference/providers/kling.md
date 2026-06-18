# Kling

**Modes:** video · image · audio · **Models:** 13

**Vendor:** [Kling (Kuaishou)](https://klingai.com/global/dev) · **Official API docs:** [Kling API](https://app.klingai.com/global/dev/document-api/quickStart/productIntroduction/overview)

Kling (by Kuaishou) is a video-first model family with text-to-video, image-to-video, start/end-frame control, motion control, talking avatars, and native audio. **Kling V3** is the flagship: the only version with multi-shot storyboards and native 4K (3–15s). The lineup also spans image generation and a TTS / video-to-audio side.

## Models

| id | Name | Input type |
|---|---|---|
| `kling-v3` | Kling V3 | `t2v` |
| `kling-v3-omni` | Kling V3 Omni | `t2v` |
| `kling-v2-6` | Kling V2.6 | `t2v` |
| `kling-video-o1` | Kling Video O1 | `t2v` |
| `kling-video-effects` | Kling Video Effects | `i2v` |
| `kling-motion-control-v3` | Kling Motion Control V3 | `i2v` |
| `kling-motion-control` | Kling Motion Control 2.6 | `i2v` |
| `kling-avatar` | Kling Avatar | `i2v` |
| `kling-3.0-image` | Kling 3.0 Image | `t2i` |
| `kling-o1-image` | Kling O1 Image | `t2i` |
| `kling-v2-new-image` | Kling V2 New Image | `t2i` |
| `kling-t2a` | Kling T2A | `t2a` |
| `kling-v2a` | Kling V2A | `v2a` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m kling-v3 \
  -p "a designer opening Picsart on a sunlit desk, cinematic, shallow depth of field" \
  --ar 16:9 -d 5 --audio-gen

# image-to-video from a start frame
gen-ai generate -m kling-v3 -p "camera slowly pushes in, she smiles" --start-frame ./hero.jpg

# image generation
gen-ai generate -m kling-3.0-image -p "a neon koi pond at dusk, ultra detailed" --ar 1:1

# text-to-audio
gen-ai generate -m kling-t2a -p "warm narrator voice reading a product tagline"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "kling-v3",
    "prompt": "a designer opening Picsart on a sunlit desk, cinematic",
    "aspectRatio": "16:9",
    "duration": 5,
    "generateAudio": true
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "kling-3.0-image",
    "prompt": "a neon koi pond at dusk, ultra detailed",
    "aspectRatio": "1:1"
  } }
```

## Parameters — `kling-v3`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2500 chars) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` (default `16:9`) |
| `duration` | `-d` | enum | `3` · `5` · `8` · `10` · `12` · `15` (seconds, default `5`) |
| `negativePrompt` | `--neg` | text | discourage unwanted content |
| `generateAudio` | `--audio-gen` | boolean | native audio track (default `true`) |
| `startFrame` | `--start-frame` | file | first-frame keyframe (image) |
| `endFrame` | `--end-frame` | file | last-frame keyframe (image) |
| `multiShot` | `--multi-shot` | boolean | multi-scene storyboard mode (default `false`) |
| `shotType` | `--shot-type` | enum | `customize` · `intelligence` (default `customize`) |
| `multiPrompt` | `--multi-prompt` | object[] | up to 6 storyboard shots `{index, prompt, duration}` |
| `voiceList` | `--voice-list` | object[] | up to 2 voice references `{voice_id}` |
| `elementList` | `--element-list` | object[] | up to 3 element references `{element_id}` |
| `staticMask` | `--static-mask` | file | static-region motion-brush mask (image) |
| `renderingSpeed` | `--rendering-speed` | enum | `std` (Standard) · `pro` (Pro) · `4k` (4K) (default `std`) |

> Source: `gen-ai models info kling-v3 --json`. Multi-shot is incompatible with start/end-frame images; native 4K (`renderingSpeed: 4k`) is V3-only.

## Pricing

```bash
gen-ai pricing kling-v3 -d 5 --rendering-speed pro
```

Cost scales with **duration**, **rendering speed / resolution** (`std` 720p · `pro` 1080p · `4k`), and **audio**.
