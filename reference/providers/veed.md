---
description: "VEED AI models on Picsart — 2 video model(s) including VEED Fabric 1.0, VEED Fabric 1.0 Fast. CLI + MCP examples, parameters, and official docs."
---

# VEED

**Mode:** video · **Models:** 2

**Vendor:** [VEED](https://www.veed.io/ai/avatars) · **Official API docs:** [Fabric 1.0 API](https://www.veed.io/tools/fabric-1.0-api)

VEED Fabric 1.0 is an **image-to-video** model that makes any still talk: an image plus an audio track produces a lip-synced MP4. There are no preset avatars — any photo, illustration, mascot, or 3D render works. Output is 480p or 720p, with duration following the audio length (up to ~5 minutes). It comes in a standard and a **Fast** variant.

## Models

| id | Name | Input type |
|---|---|---|
| `veed-fabric-v1` | VEED Fabric 1.0 | `i2v` |
| `veed-fabric-v1-fast` | VEED Fabric 1.0 Fast | `i2v` |

## CLI

```bash
# make a portrait talk from a voiceover track
gen-ai generate -m veed-fabric-v1 \
  --image ./portrait.png \
  -a ./voiceover.mp3 \
  -r 720p

# faster, cheaper draft at 480p
gen-ai generate -m veed-fabric-v1-fast \
  --image ./mascot.png \
  -a ./speech.wav \
  -r 480p
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "veed-fabric-v1",
    "imageUrls": ["https://example.com/portrait.png"],
    "audioUrl": "https://example.com/voiceover.mp3",
    "resolution": "720p"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `veed-fabric-v1` — VEED Fabric 1.0

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `audioUrl` | `-a` | file | **required** audio |

### `veed-fabric-v1-fast` — VEED Fabric 1.0 Fast

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | free text |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |
| `audioUrl` | `-a` | file | **required** audio |

> **Notes:** Duration is not a parameter — it equals the audio length (up to ~5 min).

## Pricing

```bash
gen-ai pricing veed-fabric-v1 -r 720p
```

Cost is billed **per second** and scales with **resolution** (480p is cheaper than 720p) and the **audio length**, which sets the output duration.
