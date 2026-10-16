---
description: "Mirelo SFX 2.0 on Picsart — sound effects from a text prompt, or a soundtrack synced to your video returned as audio or muxed back onto the clip. CLI + MCP examples, parameters, and official docs."
---

# Mirelo

**Vendor:** [Mirelo](https://mirelo.ai) · **Official API docs:** [Mirelo SFX](https://mirelo.ai)

Mirelo SFX 2.0 generates **sound effects and soundscapes**. Three entry points share one engine: **text-to-audio** builds a sound from a prompt alone (1–600 s); **video-to-audio** watches your clip and returns a soundtrack synced to what happens on screen; **video-to-video** does the same and returns the clip with the new audio muxed in. Both video modes keep existing speech by default (`--preserve-speech`), and every mode can return up to 4 variations per call.

> Mirelo SFX 2.0 is available through the CLI, MCP server and SDK. It is not currently selectable in the AI Playground web app.

**Modes:** video · audio · **Models:** 3

## Models

| id | Name | Input type |
|---|---|---|
| `mirelo-sfx-2.0-text-to-audio` | Mirelo SFX 2.0 (Text to Audio) | `t2a` |
| `mirelo-sfx-2.0-video-to-audio` | Mirelo SFX 2.0 (Video to Audio) | `v2a` |
| `mirelo-sfx-2.0-video-to-video` | Mirelo SFX 2.0 (Video to Video) | `v2v` |

## CLI

```bash
# a 10-second sound effect from text, as mp3
gen-ai generate -m mirelo-sfx-2.0-text-to-audio \
  -p "heavy rain on a tin roof, distant thunder" -d 10 --format mp3 -n 1

# a soundtrack synced to a clip, returned as audio
gen-ai generate -m mirelo-sfx-2.0-video-to-audio --video ./clip.mp4 \
  -p "footsteps on gravel, wind" -n 1

# the same clip with the new audio muxed back in
gen-ai generate -m mirelo-sfx-2.0-video-to-video --video ./clip.mp4 -n 1
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "mirelo-sfx-2.0-text-to-audio",
    "prompt": "heavy rain on a tin roof, distant thunder",
    "duration": 10,
    "count": 1
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "mirelo-sfx-2.0-video-to-video",
    "videoUrl": "https://example.com/clip.mp4",
    "prompt": "footsteps on gravel, wind",
    "count": 1
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `mirelo-sfx-2.0-text-to-audio` — Mirelo SFX 2.0 (Text to Audio)

Input type: `t2a`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2000 chars) |
| `negativePrompt` | `--neg` | text | free text (≤1000 chars) |
| `duration` | `-d` | range | `1`–`600`, step 1 (default `30`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` (default `2`) |
| `format` | `--format` | enum | `wav` · `mp3` · `aac` · `flac` (default `wav`) |
| `bitrateKbps` | `--bitrate-kbps` | range | `32`–`320`, step 1 |
| `seed` | `--seed` | range | `0`–`2147483647`, step 1 |

### `mirelo-sfx-2.0-video-to-audio` — Mirelo SFX 2.0 (Video to Audio)

Input type: `v2a`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `prompt` | `-p` | text | free text (≤2000 chars) |
| `negativePrompt` | `--neg` | text | free text (≤1000 chars) |
| `preserveSpeech` | `--preserve-speech` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | range | `1`–`600`, step 1 (default `10`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` (default `2`) |
| `format` | `--format` | enum | `wav` · `mp3` · `aac` · `flac` (default `wav`) |
| `bitrateKbps` | `--bitrate-kbps` | range | `32`–`320`, step 1 |
| `seed` | `--seed` | range | `0`–`2147483647`, step 1 |

### `mirelo-sfx-2.0-video-to-video` — Mirelo SFX 2.0 (Video to Video)

Input type: `v2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrl` | `--video` | file | **required** video |
| `prompt` | `-p` | text | free text (≤2000 chars) |
| `negativePrompt` | `--neg` | text | free text (≤1000 chars) |
| `preserveSpeech` | `--preserve-speech` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | range | `1`–`600`, step 1 (default `10`) |
| `count` | `-n` | enum | `1` · `2` · `3` · `4` (default `2`) |
| `seed` | `--seed` | range | `0`–`2147483647`, step 1 |
