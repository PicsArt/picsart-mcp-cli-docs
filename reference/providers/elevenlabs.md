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

## Parameters — `eleven-v3`

| Param | CLI flag | Type | Notes |
|---|---|---|---|
| `prompt` | `-p` | text | **required** — the text to speak |
| `voiceId` | `--voice` | enum | 20 preset voice ids (see below) |
| `language` | `--language` | text | language / locale |
| `accent` | `--accent` | text | accent hint |

List the full, current voice catalog any time:

```bash
gen-ai models info eleven-v3 --json | jq '.paramConfig.voiceId.descriptor.options'
```

> Source: `gen-ai models info eleven-v3 --json`. Voice ids are 20 presets such as `JBFqnCBsd6RMkjVDRZzb`, `EkK5I93UQWFDigLMpZcX`, `RILOU7YmBhvwJGDGjNmP` — verify the live list before hard-coding.

## Pricing

```bash
gen-ai pricing eleven-v3 -p "your script here"
```

Cost scales with the **length** of the generated audio.
