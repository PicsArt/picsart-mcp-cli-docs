---
description: "ElevenLabs AI models on Picsart — 10 audio model(s) including Eleven Audio Isolation, Eleven Dubbing, Eleven Multilingual STS v2. CLI + MCP examples, parameters, and official docs."
---

# ElevenLabs

**Mode:** audio · **Models:** 10

**Vendor:** [elevenlabs.io](https://elevenlabs.io) · **Official API docs:** [API reference](https://elevenlabs.io/docs/api-reference)

ElevenLabs is the most complete voice suite in the catalog: expressive text-to-speech, multilingual narration, sound effects, voice design, dubbing, speech-to-speech conversion, and audio isolation.

## Models

| id | Name | Input type | Use |
|---|---|---|---|
| `eleven-v3` | Eleven v3 | `tts` | Most expressive TTS |
| `eleven-multilingual-v2` | Eleven Multilingual v2 | `tts` | Many languages |
| `eleven-voice-design-v3` | Eleven Voice Design v3 | `tts` | Design a new voice |
| `eleven-voice-design-multilingual-v2` | Voice Design Multilingual v2 | `tts` | Multilingual voice design |
| `elevenlabs-sfx` | ElevenLabs SFX v2 | `sfx` | Sound effects |
| `eleven-sts-v2` | Eleven STS v2 | `sts` | Speech-to-speech |
| `eleven-multilingual-sts-v2` | Eleven Multilingual STS v2 | `sts` | Multilingual STS |
| `eleven-dubbing` | Eleven Dubbing | `sts` | Dub a track |
| `eleven-audio-isolation` | Eleven Audio Isolation | `sts` | Isolate voice from noise |
| `eleven-voice-previews` | Eleven Voice Previews | `tts` | Preview voices |

## CLI

```bash
# text-to-speech
gen-ai generate -m eleven-v3 -p "Welcome to Picsart AI Playground." --voice JBFqnCBsd6RMkjVDRZzb

# sound effect from a description
gen-ai generate -m elevenlabs-sfx -p "a heavy wooden door creaking open"
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

### `eleven-v3` — Eleven v3

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `prompt` | `-p` | text | **required** (≤500 chars) |
| `voiceId` | `--voice` | enum | `JBFqnCBsd6RMkjVDRZzb` (George) · `EkK5I93UQWFDigLMpZcX` (James) · `RILOU7YmBhvwJGDGjNmP` (Jane) · `Z3R5wn05IrDiVCyEkUrK` (Arabella) · `NNl6r8mD7vthiJatiJt1` (Bradford) · `Bj9UqZbhQsanLzgalpEG` (Austin) · `exsUS4vynmxd379XN4yO` (Blondie) · `BpjGufoPiobT79j2vtj4` (Priyanka) · `kdmDKE6EkgrWrrykO9Qt` (Alexandra) · `1SM7GgM6IMuvQlz2BwM3` (Mark) · `ouL9IsyrSnUkCmfnD02u` (Grimblewood) · `5l5f8iK3YPeGga21rQIX` (Adeline) · `scOwDtmlUjD3prqpp97I` (Sam) · `19STyYD15bswVz51nqLf` (Samara) · `BZgkqPqms7Kj9ulSkVzn` (Eve) · `wo6udizrrtpIxWGp2qJk` (Northern Terry) · `yjJ45q8TVCrtMhEKurxY` (Dr. Von Fusion) · `gU0LNdkMOQCOrPrwtbee` (Football Announcer) · `DGzg6RaUqxGRTHSBjfgF` (Drill Sergeant) · `x70vRnQBMBu4FAYhjJbO` (Nathan Fence) (default `JBFqnCBsd6RMkjVDRZzb`) |

### `eleven-multilingual-v2` — Eleven Multilingual v2

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `prompt` | `-p` | text | **required** (≤500 chars) |
| `voiceId` | `--voice` | enum | `JBFqnCBsd6RMkjVDRZzb` (George) · `EkK5I93UQWFDigLMpZcX` (James) · `RILOU7YmBhvwJGDGjNmP` (Jane) · `Z3R5wn05IrDiVCyEkUrK` (Arabella) · `NNl6r8mD7vthiJatiJt1` (Bradford) · `Bj9UqZbhQsanLzgalpEG` (Austin) · `exsUS4vynmxd379XN4yO` (Blondie) · `BpjGufoPiobT79j2vtj4` (Priyanka) · `kdmDKE6EkgrWrrykO9Qt` (Alexandra) · `1SM7GgM6IMuvQlz2BwM3` (Mark) · `ouL9IsyrSnUkCmfnD02u` (Grimblewood) · `5l5f8iK3YPeGga21rQIX` (Adeline) · `scOwDtmlUjD3prqpp97I` (Sam) · `19STyYD15bswVz51nqLf` (Samara) · `BZgkqPqms7Kj9ulSkVzn` (Eve) · `wo6udizrrtpIxWGp2qJk` (Northern Terry) · `yjJ45q8TVCrtMhEKurxY` (Dr. Von Fusion) · `gU0LNdkMOQCOrPrwtbee` (Football Announcer) · `DGzg6RaUqxGRTHSBjfgF` (Drill Sergeant) · `x70vRnQBMBu4FAYhjJbO` (Nathan Fence) (default `JBFqnCBsd6RMkjVDRZzb`) |

### `elevenlabs-sfx` — ElevenLabs SFX v2

Input type: `sfx`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `duration` | `-d` | enum | `1` · `3` · `5` · `8` · `10` · `15` (default `5`) |

### `eleven-sts-v2` — Eleven STS v2

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `voiceId` | `--voice` | enum | `JBFqnCBsd6RMkjVDRZzb` (George) · `EkK5I93UQWFDigLMpZcX` (James) · `RILOU7YmBhvwJGDGjNmP` (Jane) · `Z3R5wn05IrDiVCyEkUrK` (Arabella) · `NNl6r8mD7vthiJatiJt1` (Bradford) · `Bj9UqZbhQsanLzgalpEG` (Austin) · `exsUS4vynmxd379XN4yO` (Blondie) · `BpjGufoPiobT79j2vtj4` (Priyanka) · `kdmDKE6EkgrWrrykO9Qt` (Alexandra) · `1SM7GgM6IMuvQlz2BwM3` (Mark) · `ouL9IsyrSnUkCmfnD02u` (Grimblewood) · `5l5f8iK3YPeGga21rQIX` (Adeline) · `scOwDtmlUjD3prqpp97I` (Sam) · `19STyYD15bswVz51nqLf` (Samara) · `BZgkqPqms7Kj9ulSkVzn` (Eve) · `wo6udizrrtpIxWGp2qJk` (Northern Terry) · `yjJ45q8TVCrtMhEKurxY` (Dr. Von Fusion) · `gU0LNdkMOQCOrPrwtbee` (Football Announcer) · `DGzg6RaUqxGRTHSBjfgF` (Drill Sergeant) · `x70vRnQBMBu4FAYhjJbO` (Nathan Fence) (default `JBFqnCBsd6RMkjVDRZzb`) |
| `removeBackgroundNoise` | `--remove-bg-noise` | boolean | `true` · `false` (default `false`) |

### `eleven-multilingual-sts-v2` — Eleven Multilingual STS v2

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `voiceId` | `--voice` | enum | `JBFqnCBsd6RMkjVDRZzb` (George) · `EkK5I93UQWFDigLMpZcX` (James) · `RILOU7YmBhvwJGDGjNmP` (Jane) · `Z3R5wn05IrDiVCyEkUrK` (Arabella) · `NNl6r8mD7vthiJatiJt1` (Bradford) · `Bj9UqZbhQsanLzgalpEG` (Austin) · `exsUS4vynmxd379XN4yO` (Blondie) · `BpjGufoPiobT79j2vtj4` (Priyanka) · `kdmDKE6EkgrWrrykO9Qt` (Alexandra) · `1SM7GgM6IMuvQlz2BwM3` (Mark) · `ouL9IsyrSnUkCmfnD02u` (Grimblewood) · `5l5f8iK3YPeGga21rQIX` (Adeline) · `scOwDtmlUjD3prqpp97I` (Sam) · `19STyYD15bswVz51nqLf` (Samara) · `BZgkqPqms7Kj9ulSkVzn` (Eve) · `wo6udizrrtpIxWGp2qJk` (Northern Terry) · `yjJ45q8TVCrtMhEKurxY` (Dr. Von Fusion) · `gU0LNdkMOQCOrPrwtbee` (Football Announcer) · `DGzg6RaUqxGRTHSBjfgF` (Drill Sergeant) · `x70vRnQBMBu4FAYhjJbO` (Nathan Fence) (default `JBFqnCBsd6RMkjVDRZzb`) |
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `removeBackgroundNoise` | `--remove-bg-noise` | boolean | `true` · `false` (default `false`) |

### `eleven-audio-isolation` — Eleven Audio Isolation

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |

### `eleven-dubbing` — Eleven Dubbing

Input type: `sts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `audioUrl` | `-a` | file | **required** audio |
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |

### `eleven-voice-design-v3` — Eleven Voice Design v3

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

### `eleven-voice-design-v2` — Eleven Voice Design Multilingual v2

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

### `eleven-voice-create` — Eleven Voice Previews

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤1000 chars) |

> **Notes:** TTS voice ids are presets (e.g. `JBFqnCBsd6RMkjVDRZzb`); verify the live list before hard-coding. STS models clone/transform an input clip.

## Pricing

```bash
gen-ai pricing eleven-v3 -p "your script here"
```

Cost scales with the **length** of the generated audio.
