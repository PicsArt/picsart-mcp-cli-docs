---
description: "Seed Audio models on Picsart — natural text-to-speech in English, Chinese, and 20-language multilingual mode, with named voices and reference-audio voice cloning."
---

# Seed Audio

**Mode:** audio · **Models:** 2

**Vendor:** ByteDance Seed · **Official API docs:** [ByteDance Seed](https://seed.bytedance.com/)

Seed Audio provides natural text-to-speech with named voices, voice cloning from reference audio, adjustable speech rate, loudness, and pitch, and WAV, MP3, PCM, or Ogg Opus output. The multilingual model expands synthesis to 20 languages.

## Models

| id | Name | Input type |
|---|---|---|
| `seed-audio-1.0-multilingual` | Seed Audio Multilingual | `tts` |
| `seed-audio-1.0` | Seed Audio | `tts` |

## CLI

```bash
# English or Chinese speech with a named voice
gen-ai generate -m seed-audio-1.0 \
  -p "Welcome to Picsart AI Playground." \
  --voice en_male_tim_uranus_bigtts --format mp3

# multilingual speech with optional voice-cloning references
gen-ai generate -m seed-audio-1.0-multilingual \
  -p "Bonjour et bienvenue." --audio-urls ./voice-reference.wav
```

> Run `gen-ai models info <model-id> --json` for the full voice catalog: 95 voices on Seed Audio and 185 on Seed Audio Multilingual.

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "seed-audio-1.0-multilingual",
    "prompt": "Bonjour et bienvenue.",
    "voiceId": "en_male_tim_uranus_bigtts",
    "format": "mp3"
  } }
```

## Parameters

Full parameter surface for both models, sourced from `gen-ai models info <id> --json`.

### `seed-audio-1.0-multilingual` — Seed Audio Multilingual

[Try `seed-audio-1.0-multilingual` in Playground ↗](https://picsart.com/ai-playground/?model=seed-audio-1.0-multilingual)

Input type: `tts`

The multilingual model accepts the same parameters as `seed-audio-1.0`, with a 185-voice catalog spanning 20 languages.

### `seed-audio-1.0` — Seed Audio

[Try `seed-audio-1.0` in Playground ↗](https://picsart.com/ai-playground/?model=seed-audio-1.0)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `voiceId` | `--voice` | enum | 95 named voices (default `en_male_tim_uranus_bigtts`) |
| `audioUrls` | `--audio-urls` | file | reference audio (up to 3) |
| `imageUrls` | `-i` | file | reference image (up to 1) |
| `format` | `--format` | enum | `wav` · `mp3` · `pcm` · `ogg_opus` (default `wav`) |
| `sampleRate` | `--sample-rate` | enum | `8000` · `16000` · `24000` · `32000` · `44100` · `48000` (default `44100`) |
| `speechRate` | `--speech-rate` | range | `-50`–`100` (default `0`) |
| `loudnessRate` | `--loudness-rate` | range | `-50`–`100` (default `0`) |
| `pitchRate` | `--pitch-rate` | range | `-12`–`12` (default `0`) |
| `aigcWatermark` | `--aigc-watermark` | boolean | `true` · `false` (default `false`) |

## Pricing

```bash
gen-ai pricing seed-audio-1.0-multilingual
```

Text-to-speech cost is resolved from the selected model and generation parameters before execution.
