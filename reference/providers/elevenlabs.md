---
description: "ElevenLabs AI models on Picsart — 17 audio and text models, including Eleven v4, Dialogue v4, Scribe v2, and Video to Music. CLI + MCP examples, parameters, and official docs."
---

# ElevenLabs

**Modes:** audio · text · **Models:** 17

**Vendor:** [elevenlabs.io](https://elevenlabs.io) · **Official API docs:** [API reference](https://elevenlabs.io/docs/api-reference)

ElevenLabs supports speech, dialogue, music, sound effects, voice design, dubbing, voice conversion, audio isolation, and transcription. **Eleven v4** and **v4 Turbo** generate speech. **Dialogue v4** creates conversations with multiple speakers. **Scribe v2** transcribes audio or video. **Video to Music** creates a soundtrack for a video.

## Models

| id | Name | Input type | Notes |
|---|---|---|---|
| `eleven-v4` | Eleven v4 | `tts` | Expressive speech in 90+ languages |
| `eleven-v4-turbo` | Eleven v4 Turbo | `tts` | Faster v4 speech |
| `eleven-v3` | Eleven v3 | `tts` | Previous-generation expressive speech |
| `eleven-multilingual-v2` | Eleven Multilingual v2 | `tts` | Speech in 29+ languages |
| `eleven-dialogue-v4` | Eleven Dialogue v4 | `tts` | Multi-speaker dialogue with the v4 engine |
| `eleven-text-to-dialogue` | Eleven Dialogue v3 | `tts` | Multi-speaker dialogue with the v3 engine |
| `elevenlabs-sfx` | ElevenLabs SFX v2 | `sfx` | Sound effects |
| `elevenlabs-music-v2` | ElevenLabs Music v2 | `music` | Music with vocals or instrumental music |
| `eleven-speech-to-text` | Eleven Scribe v2 | `a2t` | Transcription with word timings and speaker labels |
| `eleven-video-to-music` | Eleven Video to Music | `v2a` | Generate a soundtrack for a video |
| `eleven-sts-v2` | Eleven STS v2 | `sts` | Voice conversion |
| `eleven-multilingual-sts-v2` | Eleven Multilingual STS v2 | `sts` | Multilingual voice conversion |
| `eleven-audio-isolation` | Eleven Audio Isolation | `sts` | Isolate vocals from noise |
| `eleven-dubbing` | Eleven Dubbing | `sts` | Dub audio or video |
| `eleven-voice-design-v3` | Eleven Voice Design v3 | `tts` | Design a new voice |
| `eleven-voice-design-v2` | Eleven Voice Design Multilingual v2 | `tts` | Multilingual voice design |
| `eleven-voice-create` | Eleven Voice Previews | `tts` | Preview voices |

## CLI

```bash
# text-to-speech
gen-ai generate -m eleven-v3 -p "Welcome to Picsart AI Playground." --voice JBFqnCBsd6RMkjVDRZzb

# sound effect from a description
gen-ai generate -m elevenlabs-sfx -p "a heavy wooden door creaking open"

# instrumental music
gen-ai generate -m elevenlabs-music-v2 -p "uplifting cinematic orchestral score" -d 30 --is-instrumental
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "eleven-v3",
    "prompt": "Welcome to Picsart AI Playground.",
    "extra": { "voiceId": "JBFqnCBsd6RMkjVDRZzb", "language": "en" }
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `eleven-v4` — Eleven v4

[Try `eleven-v4` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-v4)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-v4 --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `withTimestamps` | `--with-timestamps` | boolean | `true` · `false` (default `false`) |

### `eleven-v4-turbo` — Eleven v4 Turbo

[Try `eleven-v4-turbo` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-v4-turbo)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-v4-turbo --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `withTimestamps` | `--with-timestamps` | boolean | `true` · `false` (default `false`) |

### `eleven-v3` — Eleven v3

[Try `eleven-v3` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-v3)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-v3 --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `styleExaggeration` | `--style-exaggeration` | range | `0`–`1`, step 0.05 |
| `speed` | `--speed` | range | `0.1`–`5`, step 0.05 |
| `useSpeakerBoost` | `--use-speaker-boost` | boolean | `true` · `false` (default `true`) |
| `withTimestamps` | `--with-timestamps` | boolean | `true` · `false` (default `false`) |

### `eleven-multilingual-v2` — Eleven Multilingual v2

[Try `eleven-multilingual-v2` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-multilingual-v2)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤10000 chars) |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-multilingual-v2 --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `styleExaggeration` | `--style-exaggeration` | range | `0`–`1`, step 0.05 |
| `speed` | `--speed` | range | `0.1`–`5`, step 0.05 |
| `useSpeakerBoost` | `--use-speaker-boost` | boolean | `true` · `false` (default `true`) |
| `withTimestamps` | `--with-timestamps` | boolean | `true` · `false` (default `false`) |

### `eleven-dialogue-v4` — Eleven Dialogue v4

[Try `eleven-dialogue-v4` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-dialogue-v4)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `dialogue` | `--dialogue-voice-id` · `--dialogue-text` | object[] | `{voiceId, text}` |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarity` | `--similarity` | range | `0`–`1`, step 0.05 |
| `language` | `--language` | text | free text |
| `seed` | `--seed` | range | `0`–`4294967295`, step 1 |

### `eleven-text-to-dialogue` — Eleven Dialogue v3

[Try `eleven-text-to-dialogue` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-text-to-dialogue)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `dialogue` | `--dialogue-voice-id` · `--dialogue-text` | object[] | `{voiceId, text}` |
| `stability` | `--stability` | enum | `0` (Creative) · `0.5` (Natural) · `1` (Robust) (default `0.5`) |
| `language` | `--language` | text | free text |
| `seed` | `--seed` | range | `0`–`4294967295`, step 1 |

### `elevenlabs-sfx` — ElevenLabs SFX v2

[Try `elevenlabs-sfx` in Playground ↗](https://picsart.com/ai-playground/?model=elevenlabs-sfx)

Input type: `sfx`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `1` · `3` · `5` · `8` · `10` · `15` (default `5`) |

### `elevenlabs-music-v2` — ElevenLabs Music v2

[Try `elevenlabs-music-v2` in Playground ↗](https://picsart.com/ai-playground/?model=elevenlabs-music-v2)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `10` · `20` · `30` · `60` · `120` · `180` · `300` · `600` (default `30`) |
| `isInstrumental` | `--is-instrumental` | boolean | `true` · `false` (default `false`) |

### `eleven-speech-to-text` — Eleven Scribe v2

[Try `eleven-speech-to-text` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-speech-to-text)

Input type: `a2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `language` | `--language` | text | free text |
| `diarize` | `--diarize` | boolean | `true` · `false` (default `false`) |
| `numSpeakers` | `--num-speakers` | range | `1`–`32`, step 1 (default `1`) |
| `timestampsGranularity` | `--timestamps-granularity` | enum | `word` · `character` (default `word`) |
| `tagAudioEvents` | `--tag-audio-events` | boolean | `true` · `false` (default `false`) |
| `seed` | `--seed` | range | `0`–`2147483647`, step 1 |

### `eleven-video-to-music` — Eleven Video to Music

[Try `eleven-video-to-music` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-video-to-music)

Input type: `v2a`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `videoUrls` | `--video-urls` | file | **required** video (up to 10) |
| `prompt` | `-p` | text | free text (≤1000 chars) |

### `eleven-sts-v2` — Eleven STS v2

[Try `eleven-sts-v2` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-sts-v2)

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-sts-v2 --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `removeBackgroundNoise` | `--remove-background-noise` | boolean | `true` · `false` (default `false`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `styleExaggeration` | `--style-exaggeration` | range | `0`–`1`, step 0.05 |
| `speed` | `--speed` | range | `0.1`–`5`, step 0.05 |

### `eleven-multilingual-sts-v2` — Eleven Multilingual STS v2

[Try `eleven-multilingual-sts-v2` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-multilingual-sts-v2)

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `voiceId` | `--voice` | catalog | runtime catalog; run `gen-ai models info eleven-multilingual-sts-v2 --json` for current values (default `JBFqnCBsd6RMkjVDRZzb`) |
| `removeBackgroundNoise` | `--remove-background-noise` | boolean | `true` · `false` (default `false`) |
| `stability` | `--stability` | range | `0`–`1`, step 0.05 |
| `similarityBoost` | `--similarity-boost` | range | `0`–`1`, step 0.05 |
| `styleExaggeration` | `--style-exaggeration` | range | `0`–`1`, step 0.05 |
| `speed` | `--speed` | range | `0.1`–`5`, step 0.05 |

### `eleven-audio-isolation` — Eleven Audio Isolation

[Try `eleven-audio-isolation` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-audio-isolation)

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |

### `eleven-dubbing` — Eleven Dubbing

[Try `eleven-dubbing` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-dubbing)

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |

### `eleven-voice-design-v3` — Eleven Voice Design v3

[Try `eleven-voice-design-v3` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-voice-design-v3)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

### `eleven-voice-design-v2` — Eleven Voice Design Multilingual v2

[Try `eleven-voice-design-v2` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-voice-design-v2)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

### `eleven-voice-create` — Eleven Voice Previews

[Try `eleven-voice-create` in Playground ↗](https://picsart.com/ai-playground/?model=eleven-voice-create)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

> **Notes:** TTS voice ids are presets (e.g. `JBFqnCBsd6RMkjVDRZzb`); verify the live list before hard-coding. STS models clone/transform an input clip.

## Pricing

```bash
gen-ai pricing eleven-v3
```

Cost scales with the **length** of the generated audio.
