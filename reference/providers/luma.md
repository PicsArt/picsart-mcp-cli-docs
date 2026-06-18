# Luma

**Modes:** video, image · **Models:** 6

**Vendor:** [Luma AI](https://lumalabs.ai) · **Official API docs:** [Luma Dream Machine API](https://docs.lumalabs.ai/docs/api)

Luma's Dream Machine line covers both video and image. **Ray 2** (and the faster **Flash 2**) generate video from text or a start/end frame at up to 4K, with dedicated **reframe** workflows for changing a clip's aspect ratio. **UNI-1** (and **UNI-1 Max**) is the image model, with multi-image reference input, edit, and style controls.

## Models

| id | Name | Input type |
|---|---|---|
| `luma-ray-2` | Luma Ray 2 | `t2v` |
| `luma-ray-flash-2` | Luma Flash 2 | `i2v` |
| `luma-ray-2-reframe-video` | Luma Ray 2 Reframe | `v2v` |
| `luma-ray-flash-2-reframe-video` | Luma Flash 2 Reframe | `v2v` |
| `luma-uni-1` | Luma UNI-1 | `t2i` |
| `luma-uni-1-max` | Luma UNI-1 Max | `t2i` |

## CLI

```bash
# text-to-video at 4K
gen-ai generate -m luma-ray-2 \
  -p "a paper boat drifting down a rain-soaked city gutter, cinematic" \
  --ar 16:9 -r 4k -d 9

# image-to-video from a start frame
gen-ai generate -m luma-ray-2 -p "slow zoom out, drifting clouds" --start-frame ./hero.jpg

# reframe an existing clip to vertical
gen-ai generate -m luma-ray-2-reframe-video --video ./clip.mp4 --ar 9:16

# text-to-image with a reference
gen-ai generate -m luma-uni-1 -p "a fox in a moss-green raincoat, storybook" --ar 1:1 -i ./ref.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "luma-ray-2",
    "prompt": "a paper boat drifting down a rain-soaked city gutter, cinematic",
    "aspectRatio": "16:9",
    "resolution": "4k",
    "duration": 9
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "luma-uni-1",
    "prompt": "a fox in a moss-green raincoat, storybook",
    "aspectRatio": "1:1",
    "style": "auto"
  } }
```

## Parameters — `luma-ray-2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `21:9` · `9:21` (default `16:9`) |
| `resolution` | `-r` | enum | `540p` · `720p` · `1080p` · `4k` (default `720p`) |
| `duration` | `-d` | enum | `5` · `9` (seconds, default `5`) |
| `startFrame` | `--start-frame` | file | first-frame keyframe (image) |
| `endFrame` | `--end-frame` | file | last-frame keyframe (image) |

> Source: `gen-ai models info luma-ray-2 --json`. **Flash 2** shares this surface; the **reframe** variants take a required `videoUrl` (`--video`) plus `--ar`.

## Parameters — `luma-uni-1`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (max 6000 chars) |
| `aspectRatio` | `--ar` | enum | `3:1` · `2:1` · `16:9` · `3:2` · `1:1` · `2:3` · `9:16` · `1:2` · `1:3` (default `1:1`) |
| `style` | `--style` | enum | `auto` · `manga` (default `auto`) |
| `imageUrls` | `-i` | file | reference image(s), up to 9 |

> Source: `gen-ai models info luma-uni-1 --json`. **UNI-1 Max** shares this surface.

## Pricing

```bash
gen-ai pricing luma-ray-2 -d 9 -r 4k
```

Video cost scales with **duration** and **resolution**. UNI-1 image cost is per generation.
