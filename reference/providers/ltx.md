---
description: "LTX (Lightricks) AI models on Picsart — 9 video model(s) including LTX Pro, LTX 2.3 Extend, LTX 2.3 Fast. CLI + MCP examples, parameters, and official docs."
---

# LTX

**Mode:** video · **Models:** 9

**Vendor:** [Lightricks LTX](https://www.lightricks.com/ltxv-documentation) · **Official API docs:** [docs.ltx.video](https://docs.ltx.video)

LTX 2.3 (by Lightricks) is a video model with synchronized native audio, first-to-last frame image control, and resolutions up to 4K. The **Pro** flagship handles text-to-video, image-to-video, audio-to-video, retake, and extend; the **Fast** variant trades fidelity for speed and longer clips.

## Models

| id | Name | Input type |
|---|---|---|
| `ltx-v2.3-pro` | LTX 2.3 Pro | `t2v` |
| `ltx-v2.3-fast` | LTX 2.3 Fast | `t2v` |
| `ltx-2.3-a2v` | LTX 2.3 Audio-to-Video | `a2v` |
| `ltx-v2.3-extend` | LTX 2.3 Extend | `v2v` |
| `ltx-v2.3-retake` | LTX 2.3 Retake | `v2v` |
| `ltx-v2.3-reframe` | LTX 2.3 Reframe | `v2v` |
| `ltx-v2.3-outpaint` | LTX 2.3 Outpaint | `v2v` |
| `ltx-v2.5-pro` | LTX 2.5 Pro | `t2v` |
| `ltx-v2.5-fast` | LTX 2.5 Fast | `t2v` |

## CLI

```bash
# text-to-video with native audio
gen-ai generate -m ltx-v2.3-pro \
  -p "aerial shot over a misty forest at dawn, slow push-in, ambient birdsong" \
  --ar 16:9 -r 1080p -d 8 --audio-gen

# image-to-video: animate a start frame
gen-ai generate -m ltx-v2.3-pro -p "the camera drifts forward as fog rolls in" -i ./still.jpg

# audio-driven generation
gen-ai generate -m ltx-2.3-a2v -p "a singer performing on a neon stage" -a ./vocals.mp3

# extend an existing clip
gen-ai generate -m ltx-v2.3-extend -p "the scene continues into night" --video ./clip.mp4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ltx-v2.3-pro",
    "prompt": "aerial shot over a misty forest at dawn, slow push-in",
    "aspectRatio": "16:9",
    "resolution": "1080p",
    "duration": 8,
    "generateAudio": true
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `ltx-v2.3-pro` — LTX 2.3 Pro

[Try `ltx-v2.3-pro` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-pro)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `6` · `8` · `10` (default `6`) |
| `resolution` | `-r` | enum | `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `ltx-v2.3-fast` — LTX 2.3 Fast

[Try `ltx-v2.3-fast` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-fast)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `6` · `8` · `10` · `12` · `14` · `16` · `18` · `20` (default `6`) |
| `resolution` | `-r` | enum | `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `ltx-2.3-a2v` — LTX 2.3 Audio-to-Video

[Try `ltx-2.3-a2v` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-2.3-a2v)

Input type: `a2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `audioUrl` | `-a` | file | **required** audio |
| `imageUrls` | `-i` | file | image (up to 1) |
| `cfgScale` | `--cfg` | number | `1`–`50`, default `5` |

### `ltx-v2.3-extend` — LTX 2.3 Extend

[Try `ltx-v2.3-extend` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-extend)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `duration` | `-d` | enum | `5` · `10` · `15` · `20` (default `5`) |
| `videoUrl` | `--video` | file | **required** video |

### `ltx-v2.3-retake` — LTX 2.3 Retake

[Try `ltx-v2.3-retake` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-retake)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `5` · `10` · `15` · `20` (default `5`) |
| `videoUrl` | `--video` | file | **required** video |

### `ltx-v2.3-reframe` — LTX 2.3 Reframe

[Try `ltx-v2.3-reframe` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-reframe)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:5` · `5:4` (default `16:9`) |

### `ltx-v2.3-outpaint` — LTX 2.3 Outpaint

[Try `ltx-v2.3-outpaint` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.3-outpaint)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `videoUrl` | `--video` | file | **required** video |
| `negativePrompt` | `--neg` | text | free text |
| `aspectRatio` | `--ar` | enum | `21:9` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` · `9:21` (default `21:9`) |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` (default `720p`) |
| `numFrames` | `--num-frames` | range | `9`–`481` (default `121`) |
| `fps` | `--fps` | range | `1`–`60` (default `24`) |
| `sourceScale` | `--source-scale` | range | `0.25`–`1`, step 0.05 (default `1`) |
| `videoStrength` | `--video-strength` | range | `0`–`1`, step 0.05 (default `1`) |
| `cfgScale` | `--cfg` | range | `1`–`20` (default `1`) |
| `numInferenceSteps` | `--num-inference-steps` | range | `8`–`30` (default `15`) |
| `videoQuality` | `--video-quality` | enum | `low` · `medium` · `high` · `maximum` (default `high`) |
| `videoWriteMode` | `--video-write-mode` | enum | `fast` · `balanced` · `small` (default `balanced`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `enableSafetyChecker` | `--enable-safety-checker` | boolean | `true` · `false` (default `true`) |
| `seed` | `--seed` | range | `0`–`2147483647`, step 1 |

### `ltx-v2.5-pro` — LTX 2.5 Pro

[Try `ltx-v2.5-pro` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.5-pro)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `duration` | `-d` | enum | `6` · `8` · `10` (default `6`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `fps` | `--fps` | enum | `24` · `25` · `50` (default `25`) |
| `cameraMotion` | `--camera-motion` | enum | `none` (None) · `static` (Static) · `dolly_in` (Dolly In) · `dolly_out` (Dolly Out) · `dolly_left` (Dolly Left) · `dolly_right` (Dolly Right) · `jib_up` (Jib Up) · `jib_down` (Jib Down) · `focus_shift` (Focus Shift) (default `none`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `ltx-v2.5-fast` — LTX 2.5 Fast

[Try `ltx-v2.5-fast` in Playground ↗](https://picsart.com/ai-playground/?model=ltx-v2.5-fast)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `duration` | `-d` | enum | `6` · `8` · `10` · `12` · `14` · `16` · `18` · `20` (default `6`) |
| `resolution` | `-r` | enum | `720p` · `1080p` · `1440p` · `2160p` (default `1080p`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `fps` | `--fps` | enum | `24` · `25` · `48` · `50` (default `25`) |
| `cameraMotion` | `--camera-motion` | enum | `none` (None) · `static` (Static) · `dolly_in` (Dolly In) · `dolly_out` (Dolly Out) · `dolly_left` (Dolly Left) · `dolly_right` (Dolly Right) · `jib_up` (Jib Up) · `jib_down` (Jib Down) · `focus_shift` (Focus Shift) (default `none`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

## Pricing

```bash
gen-ai pricing ltx-v2.3-pro --duration 8 --resolution 1080p
```

Cost scales with **duration**, **resolution**, and **audio**.
