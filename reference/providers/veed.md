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

## Parameters — `veed-fabric-v1`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` (`--image`) | file | **required** — start image (1, JPG/PNG/WebP) |
| `audioUrl` | `-a` (`--audio`) | file | **required** — audio track; drives lip-sync and output duration |
| `resolution` | `-r` | enum | `480p` · `720p` (default `720p`) |
| `prompt` | `-p` | text | optional |

> Source: `gen-ai models info veed-fabric-v1 --json`. Duration is **not** a parameter — it equals the audio length (up to ~5 min). The **Fast** variant (`veed-fabric-v1-fast`) shares this surface.

## Pricing

```bash
gen-ai pricing veed-fabric-v1 -r 720p
```

Cost is billed **per second** and scales with **resolution** (480p is cheaper than 720p) and the **audio length**, which sets the output duration.
