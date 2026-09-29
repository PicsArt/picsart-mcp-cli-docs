---
description: "84 video generation models on Picsart — text-to-video, image-to-video, and video editing — Veo, Kling, Seedance, Wan, Runway and more."
---

# Video generation

**84 video models** across text-to-video, image-to-video, video-to-video editing, and clip extension.

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
| `t2v` text→video | `gen-ai generate` | Seedance 2.5 / 2.0, Kling V3, Veo 3.1, Gemini Omni, Wan 3.0 / 3.0 Prime, Flux 3 Video, Hailuo 2.3, LTX, Luma Ray 2, HeyGen Video Avatar |
| `i2v` image→video | `gen-ai generate -i` | Kling Motion Control, Wan 2.7 I2V, Runway Gen4 Ref, Picsart Effects Video, VEED Fabric, HeyGen, Creatify |
| `v2v` video→video | `gen-ai generate --video` (or `--video-urls`) | Seedance Video Edit/Extend, Wan Video Edit, Runway Aleph, Grok Edit/Extend, LTX Extend/Retake |

## Providers

| Provider | Models | Highlights |
|---|---|---|
| [Seedance](/reference/providers/seedance) | Seedance 2.5 / 2.0 (+ Fast, Edit, Extend) | Reference image, keyframes, native audio; 2.5 supports 4–30s |
| [Google](/reference/providers/google) | Veo 3.1 / Fast / Lite, Gemini Omni | 1080p+, native audio; Omni adds 4K + video extension |
| [Kling](/reference/providers/kling) | Kling V3, Video O1, Motion Control, Avatar, Effects | High-motion; motion control from a still |
| [Wan](/reference/providers/wan) | Wan 3.0, Wan 3.0 Prime, Wan 2.7 (t2v/i2v/r2v/edit) | Versatile, crisp detail; Prime is up to 7x faster |
| [Runway](/reference/providers/runway) | Gen 4.5, Aleph, Gen4 Ref, Avatar | Editing & reference workflows |
| [MiniMax](/reference/providers/minimax) | MiniMax H3, H3 Max (+ Turbo / Camera Controls), Hailuo 2.3 | Up to 2K; multimodal references |
| [LTX](/reference/providers/ltx) | LTX 2.3 Pro/Fast, A2V, Extend, Retake | Audio-to-video & re-takes |
| [Luma](/reference/providers/luma) | Ray 2, Flash 2, Reframe | Reframing & fast generation |
| [Picsart](/reference/providers/picsart) | Picsart Effects Video | Curated one-tap effect presets |
| [Grok](/reference/providers/grok) | Imagine Video, Edit, Extend | — |
| [VEED](/reference/providers/veed) · [HeyGen](/reference/providers/heygen) · [Creatify](/reference/providers/creatify) | Fabric, Talking Photo, Aurora | Avatar / talking-photo |
| [ByteDance](/reference/providers/bytedance) · [OVI](/reference/providers/ovi) · [Videography](/reference/providers/videography) · [HappyHorse](/reference/providers/happyhorse) | Video Enhance, OmniHuman, OVI, Videography, Happy Horse | Specialized |

## Extending clips

Use a dedicated extend model through `gen-ai generate` — Seedance, Grok, and LTX each have one:

```bash
gen-ai generate -m seedance-2.0-video-extend -p "the camera keeps panning right" --video-urls ./clip.mp4
```

Run `gen-ai models info <id>` to see which video flag an extend model takes (`--video` or `--video-urls`).

## Common video parameters

| Param | CLI flag | Notes |
|---|---|---|
| `prompt` | `-p` | Required (or stdin) |
| `aspectRatio` | `--ar` | e.g. `16:9`, `9:16`, `1:1` |
| `resolution` | `-r` | e.g. `720p`, `1080p`, `4k` |
| `duration` | `-d` | Seconds (model-dependent set) |
| `generateAudio` | `--audio-gen` | Native audio track |
| `imageUrls` / `videoUrl` | `-i` / `--video` | i2v / v2v inputs |
