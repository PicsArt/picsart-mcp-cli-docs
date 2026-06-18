---
description: "Seedance AI models on Picsart — 6 video model(s) including Seedance 2.0, Seedance 2.0 Fast, Seedance 2.0 Fast Video Edit. CLI + MCP examples, parameters, and official docs."
---

# Seedance

**Mode:** video · **Models:** 6

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

## Parameters — `seedance-2.0`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `adaptive` |
| `resolution` | `-r` | enum | `480p` · `720p` · `1080p` |
| `duration` | `-d` | enum | `4`–`15` (integer seconds) |
| `generateAudio` | `--audio-gen` | boolean | native audio track |
| `returnLastFrame` | `--return-last-frame` | boolean | return final frame as a still |
| `imageUrls` | `-i` | file | reference image(s) |
| `videoUrls` | `--video` | file | source video (edit/extend) |
| `audioUrls` | `-a` | file | audio track |
| `startFrame` | `--start-frame` | file | first-frame keyframe |
| `endFrame` | `--end-frame` | file | last-frame keyframe |

> Source: `gen-ai models info seedance-2.0 --json`. The **Fast** variants share this surface; edit/extend variants take a `videoUrls` input.

## Pricing

```bash
gen-ai pricing seedance-2.0 -d 8 -r 1080p
```

Cost scales with **duration**, **resolution**, and **audio**.
