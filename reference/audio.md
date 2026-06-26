---
description: "19 AI audio models on Picsart — text-to-speech, music, and sound effects — ElevenLabs, Gemini TTS, Lyria, MiniMax Music and more."
---

# Audio generation

**19 audio models** for text-to-speech, music, sound effects, voice design, dubbing, and speech-to-speech.

## Quick start

```bash
gen-ai generate -m eleven-v3 -p "Welcome to Picsart AI Playground."
```

```json
{ "name": "picsart_generate",
  "arguments": { "model": "eleven-v3", "prompt": "Welcome to Picsart AI Playground." } }
```

## Input types

| Type | Meaning | Models |
|---|---|---|
| `tts` | text → speech | Eleven v3, Multilingual v2, Voice Design v3, Gemini 2.5 Flash/Pro TTS, Grok TTS |
| `music` | music generation | MiniMax Music v2, Lyria 3 Clip/Pro, Kling T2A |
| `sfx` | sound effects | ElevenLabs SFX v2 |
| `sts` | speech → speech / transform | Eleven STS v2, Multilingual STS, Audio Isolation, Dubbing |

## Providers

| Provider | Models | Highlights |
|---|---|---|
| [ElevenLabs](/reference/providers/elevenlabs) | 10 — v3, Multilingual v2, SFX, STS, Dubbing, Voice Design, Audio Isolation, Voice Previews | The most complete voice suite |
| [Google](/reference/providers/google) | Gemini 2.5 Flash/Pro TTS, Lyria 3 Clip/Pro | High-quality TTS + music |
| [Kling](/reference/providers/kling) | Kling T2A, V2A | Text-to-audio & video-to-audio scoring |
| [MiniMax](/reference/providers/minimax) | MiniMax Music v2 | Full original tracks from a prompt |
| [Grok](/reference/providers/grok) | Grok TTS | Fast natural speech |

## Common audio parameters

| Param | CLI flag | Notes |
|---|---|---|
| `prompt` | `-p` | Text to speak, or the music/SFX description |
| `voiceId` | `--voice` | TTS voice selection (model-dependent set) |
| `language` | `--language` | Language / locale (model-dependent) |

Voice catalogs differ per model — list a model's accepted `voiceId` values with `gen-ai models info <id> --json` or `picsart_model_params`.

## Pairs with video

Generate a voiceover or score here, then drop it onto a video you made in the same app — or use a `v2a` model like Kling V2A to score an existing clip.
