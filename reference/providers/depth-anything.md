---
description: "Video Depth Anything on Picsart — temporally consistent per-frame depth maps for any video, rendered as a depth-map clip. CLI + MCP examples, parameters, and official docs."
---

# Depth Anything

**Vendor:** [Depth Anything](https://depth-anything.github.io) · **Official docs:** [Video Depth Anything on GitHub](https://github.com/DepthAnything/Video-Depth-Anything)

Video Depth Anything estimates **temporally consistent depth for every frame of a video** and renders the result as a new clip — grayscale by default, or a color map (`turbo`, `inferno`, `magma`, `viridis`), optionally side by side with the source. Pick the `VDA-Small` tier for speed or `VDA-Large` (the default) for the most accurate depth. It is a **video-to-video** model: the video is the only required input and there is no prompt.

**Mode:** video · **Models:** 1

## Models

| id | Name | Input type |
|---|---|---|
| `depth-anything-video` | Video Depth Anything | `v2v` |

## CLI

```bash
# grayscale depth map at the source resolution
gen-ai generate -m depth-anything-video --video ./clip.mp4

# color-mapped depth, side by side with the source, at 720p
gen-ai generate -m depth-anything-video --video ./clip.mp4 \
  --colormap turbo --side-by-side -r 720p
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "depth-anything-video",
    "videoUrl": "https://example.com/clip.mp4",
    "colormap": "turbo",
    "sideBySide": true
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `depth-anything-video` — Video Depth Anything

[Try `depth-anything-video` in Playground ↗](https://picsart.com/ai-playground/?model=depth-anything-video)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `model` | `--model-version` | enum | `VDA-Small` · `VDA-Base` · `VDA-Large` (default `VDA-Large`) |
| `colormap` | `--colormap` | enum | `grayscale` · `turbo` · `inferno` · `magma` · `viridis` (default `grayscale`) |
| `resolution` | `-r` | enum | `auto` · `360p` · `480p` · `720p` · `1080p` (default `auto`) |
| `sideBySide` | `--side-by-side` | boolean | `true` · `false` (default `false`) |
