---
description: "58 AI video generation models on Picsart — text-to-video, image-to-video, and video editing — Sora, Veo, Kling, Seedance, Wan, Runway and more."
---

# Video generation

**58 video models** across text-to-video, image-to-video, video-to-video editing, and clip extension.

## Quick start

```bash
# text-to-video
gen-ai generate -m seedance-2.0 -p "a fox running through autumn leaves" -d 8

# image-to-video
gen-ai generate -m kling-motion-control-v3 -p "slow push in" -i ./portrait.jpg
```

```json
{ "name": "picsart_generate",
  "arguments": { "model": "seedance-2.0", "prompt": "a fox running through autumn leaves", "duration": 8, "aspectRatio": "16:9" } }
```

## Input types

| Type | Command | Models |
|---|---|---|
| `t2v` text→video | `gen-ai generate` | Seedance 2.0, Kling V3, Sora 2 / Pro, Veo 3.1, Wan 2.7, Hailuo 2.3, LTX, Pika, Luma Ray 2 |
| `i2v` image→video | `gen-ai generate -i` | Kling Motion Control, Wan 2.7 I2V, Runway Gen4 Ref, Pika Scenes, VEED Fabric, HeyGen, Creatify |
| `v2v` video→video | `gen-ai generate --video` / `gen-ai extend` | Seedance Video Edit/Extend, Wan Video Edit, Runway Aleph, Grok Edit/Extend, LTX Extend/Retake, Sora 2 Extend |

## Providers

| Provider | Models | Highlights |
|---|---|---|
| [Seedance](/reference/providers/seedance) | Seedance 2.0 (+ Fast, Edit, Extend) | Reference image, keyframes, native audio, 4–15s |
| [Google](/reference/providers/google) | Veo 3.1 / Fast / Lite | 1080p+, native audio, chainable extend |
| [OpenAI](/reference/providers/openai) | Sora 2, Sora 2 Pro, Sora 2 Extend | Photoreal motion + synced audio |
| [Kling](/reference/providers/kling) | Kling V3, Video O1, Motion Control, Avatar, Effects | High-motion; motion control from a still |
| [Wan](/reference/providers/wan) | Wan 2.7 (t2v/i2v/r2v/edit) | Versatile, crisp detail |
| [Runway](/reference/providers/runway) | Gen 4.5, Aleph, Gen4 Ref, Avatar | Editing & reference workflows |
| [MiniMax](/reference/providers/minimax) | Hailuo 2.3 (+ Pro/Fast) | Fast, expressive motion |
| [LTX](/reference/providers/ltx) | LTX 2.3 Pro/Fast, A2V, Extend, Retake | Audio-to-video & re-takes |
| [Luma](/reference/providers/luma) | Ray 2, Flash 2, Reframe | Reframing & fast generation |
| [Pika](/reference/providers/pika) | Pika 2.2, Scenes, Frames | Scene & keyframe control |
| [Grok](/reference/providers/grok) | Imagine Video, Edit, Extend | — |
| [VEED](/reference/providers/veed) · [HeyGen](/reference/providers/heygen) · [Creatify](/reference/providers/creatify) | Fabric, Talking Photo, Aurora | Avatar / talking-photo |
| [ByteDance](/reference/providers/bytedance) · [OVI](/reference/providers/ovi) · [Videography](/reference/providers/videography) · [HappyHorse](/reference/providers/happyhorse) | Upscaler, OmniHuman, OVI, Videography, Happy Horse | Specialized |

## Extending clips

```bash
gen-ai extend --video ./clip.mp4 -p "the camera keeps panning right" --times 2
```

The Veo family extends `+7s` per segment; Seedance, Sora, Grok, and LTX expose dedicated extend models.

## Common video parameters

| Param | CLI flag | Notes |
|---|---|---|
| `prompt` | `-p` | Required (or stdin) |
| `aspectRatio` | `--ar` | e.g. `16:9`, `9:16`, `1:1` |
| `resolution` | `-r` | e.g. `720p`, `1080p`, `4k` |
| `duration` | `-d` | Seconds (model-dependent set) |
| `generateAudio` | `--audio-gen` | Native audio track |
| `imageUrls` / `videoUrl` | `-i` / `--video` | i2v / v2v inputs |
