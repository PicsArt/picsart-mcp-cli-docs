---
description: "Async AI on Picsart — Async Flash v1.0, a fast text-to-speech model with 100+ voices and configurable audio output. CLI + MCP examples, parameters, and official docs."
---

# Async

**Mode:** audio · **Models:** 1

**Vendor:** Async AI · **Official API docs:** [docs.picsart.io](https://docs.picsart.io)

Async AI provides **Async Flash v1.0**, a low-latency text-to-speech model with a large voice library (100+ named voices) and fine-grained control over the audio container, sample rate, encoding, and bit rate. It is exposed through Picsart's generation platform.

## Models

| id | Name | Input type |
|---|---|---|
| `async-flash-v1` | Async Flash v1.0 | `tts` |

## CLI

```bash
# basic text-to-speech (default voice, mp3)
gen-ai generate -m async-flash-v1 \
  -p "Welcome to Picsart AI Playground." -s

# pick a voice and a WAV container at a higher sample rate
gen-ai generate -m async-flash-v1 \
  -p "Your export is ready." \
  --voice f493c663-b272-493e-8b78-72d2262a2a8d \
  --container wav --sample-rate 48000
```

> Run `gen-ai models info async-flash-v1 --json` for the full voice list (100+ voices).

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "async-flash-v1",
    "prompt": "Welcome to Picsart AI Playground.",
    "voiceId": "cca0e076-94b9-4c6d-86b7-546168f11174",
    "container": "mp3"
  } }
```

## Parameters

Full parameter surface, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `async-flash-v1` — Async Flash v1.0

[Try `async-flash-v1` in Playground ↗](https://picsart.com/ai-playground/?model=async-flash-v1)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `voiceId` | `--voice` | enum | 100+ voices — e.g. `cca0e076-…` (Jennie, default) · `f493c663-…` (Stella) · `317bf805-…` (Max) · `a6268eaf-…` (Elara) · `7a3ef29d-…` (Grace). Run `gen-ai models info async-flash-v1 --json` for the full list |
| `container` | `--container` | enum | `mp3` · `wav` · `raw` (default `mp3`) |
| `sampleRate` | `--sample-rate` | range | `8000`–`48000` (default `24000`) |
| `encoding` | `--encoding` | enum | `pcm_s16le` · `pcm_f32le` (default `pcm_s16le`) |
| `bitRate` | `--bit-rate` | range | `32000`–`320000` (default `192000`) |

> **Notes:** `encoding` and `bitRate` apply to raw/PCM and compressed containers respectively. Voice IDs are opaque UUIDs — use the `--json` model info to map IDs to names.

## Pricing

```bash
gen-ai pricing async-flash-v1
```

Text-to-speech is priced per generation; cost is resolved per `modelId` via the backend `/options` call.
