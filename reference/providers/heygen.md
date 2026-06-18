---
description: "HeyGen AI models on Picsart — 1 video model(s) including HeyGen Talking Photo. CLI + MCP examples, parameters, and official docs."
---

# HeyGen

**Mode:** video · **Models:** 1

**Official API docs:** [developers.heygen.com](https://developers.heygen.com)

HeyGen Talking Photo turns a single portrait image into a lip-synced talking avatar that speaks a script you write, using a HeyGen voice. The script is read aloud via text-to-speech and the face is animated to match. Generation is asynchronous, and output runs up to 1080p in landscape or vertical.

## Models

| id | Name | Input type |
|---|---|---|
| `heygen-talking-photo` | HeyGen Talking Photo | `i2v` |

## CLI

```bash
# animate a portrait into a talking avatar (script must be at least 20 chars)
gen-ai generate -m heygen-talking-photo \
  -i ./portrait.jpg \
  -p "Hi there! Welcome to Picsart, where you can create anything you imagine." \
  --voice <voice-id> \
  --ar 16:9 -r 720p

# vertical short
gen-ai generate -m heygen-talking-photo \
  -i ./portrait.jpg \
  -p "Three quick tips to level up your edits — let's dive in." \
  --voice <voice-id> --ar 9:16 -r 1080p
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "heygen-talking-photo",
    "prompt": "Hi there! Welcome to Picsart, where you can create anything you imagine.",
    "imageUrls": ["https://example.com/portrait.jpg"],
    "voiceId": "<voice-id>",
    "aspectRatio": "16:9",
    "resolution": "720p"
  } }
```

## Parameters — `heygen-talking-photo`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** · the spoken script (min 20 / max 1500 chars) |
| `imageUrls` | `-i` | file | **required** · portrait image (1 max) |
| `voiceId` | `--voice` | enum | **required** · HeyGen voice id (fetched at runtime from the voices list) |
| `aspectRatio` | `--ar` | enum | `16:9` (default) · `9:16` |
| `resolution` | `-r` | enum | `1080p` · `720p` (default) |

> Source: `gen-ai models info heygen-talking-photo --json`. Available voice ids are dynamic — list them at runtime rather than hard-coding. Generation is asynchronous; the result URL is polled in the background.

## Pricing

```bash
gen-ai pricing heygen-talking-photo -r 720p
```

Cost scales with **resolution** and the **length of the generated video** (driven by your script). Trial/free credits burn a HeyGen watermark into the output and may cap resolution — production videos require paid credits.
