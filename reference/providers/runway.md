---
description: "Runway AI models on Picsart — 4 video model(s) including Runway Aleph, Runway Avatar, Runway Gen 4.5. CLI + MCP examples, parameters, and official docs."
---

# Runway

**Mode:** video · **Models:** 4

**Official API docs:** [Runway API](https://docs.dev.runwayml.com)

Runway is a family of cinematic video models. The flagship **Gen 4.5** unifies text-to-video and image-to-video (pass a start image to drive it from a still), **Aleph** restyles an existing clip (video-to-video), **Gen4 Ref** generates from reference images, and **Avatar** produces a talking-avatar clip from a preset character plus text or audio.

## Models

| id | Name | Input type |
|---|---|---|
| `runway-gen4.5` | Runway Gen 4.5 | `t2v` |
| `runway-gen4-aleph` | Runway Aleph | `v2v` |
| `runway-gen4-ref` | Runway Gen4 Ref | `i2v` |
| `runway-avatar-video` | Runway Avatar | `t2v` |

## CLI

```bash
# text-to-video
gen-ai generate -m runway-gen4.5 \
  -p "a lighthouse on a storm-battered cliff, cinematic, slow dolly in" \
  --ar 16:9 -d 8

# image-to-video: drive Gen 4.5 from a start image
gen-ai generate -m runway-gen4.5 -p "slow push in, drifting fog" --image ./start.jpg -d 5

# restyle an existing clip (Aleph, video-to-video)
gen-ai generate -m runway-gen4-aleph -p "claymation style" --video ./clip.mp4
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "runway-gen4.5",
    "prompt": "a lighthouse on a storm-battered cliff, cinematic, slow dolly in",
    "aspectRatio": "16:9",
    "duration": 8
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "runway-gen4.5",
    "prompt": "slow push in, drifting fog",
    "imageUrls": ["https://example.com/start.jpg"],
    "duration": 5
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `runway-avatar-video` — Runway Avatar

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `style` | `--style` | enum | `game-character` (Game Character) · `music-superstar` (Music Superstar) · `game-character-man` (Game Character Man) · `cat-character` (Cat Character) · `influencer` (Influencer) · `tennis-coach` (Tennis Coach) · `human-resource` (Human Resource) · `fashion-designer` (Fashion Designer) · `cooking-teacher` (Cooking Teacher) (default `game-character`) |
| `voiceId` | `--voice` | enum | `victoria` (Victoria) · `vincent` (Vincent) · `clara` (Clara) · `drew` (Drew) · `skye` (Skye) · `max` (Max) · `morgan` (Morgan) · `felix` (Felix) · `mia` (Mia) · `marcus` (Marcus) · `summer` (Summer) · `ruby` (Ruby) · `aurora` (Aurora) · `jasper` (Jasper) · `leo` (Leo) · `adrian` (Adrian) · `nina` (Nina) · `emma` (Emma) · `blake` (Blake) · `david` (David) · `maya` (Maya) · `nathan` (Nathan) · `sam` (Sam) · `georgia` (Georgia) · `petra` (Petra) · `adam` (Adam) · `zach` (Zach) · `violet` (Violet) · `roman` (Roman) · `luna` (Luna) (default `victoria`) |
| `prompt` | `-p` | text | free text (≤1500 chars) |
| `audioUrl` | `-a` | file | audio |

### `runway-gen4.5` — Runway Gen 4.5

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `duration` | `-d` | enum | `5` · `8` · `10` (default `5`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `runway-gen4-aleph` — Runway Aleph

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `videoUrl` | `--video` | file | **required** video |

### `runway-gen4-ref` — Runway Gen4 Ref

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |
| `duration` | `-d` | enum | `5` · `10` (default `5`) |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `imageUrls` | `-i` | file | **required** image (up to 3) |

> **Notes:** Gen 4.5 is a unified surface — passing a start image (`imageUrls`) switches it from text-to-video to image-to-video.

## Pricing

```bash
gen-ai pricing runway-gen4.5 -d 8 --ar 16:9
```

Cost scales with **duration** (5 / 8 / 10 s). Gen 4.5 outputs at 1080p; aspect ratio does not change the price.
