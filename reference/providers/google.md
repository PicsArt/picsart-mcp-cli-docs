---
description: "Google AI models on Picsart — 13 audio/image/video model(s) including Gemini 2.5 Flash TTS, Gemini 2.5 Pro TTS, Lyria 3 Clip. CLI + MCP examples, parameters, and official docs."
---

# Google

**Modes:** image · video · audio · **Models:** 13

**Vendor:** [Google AI for Developers](https://ai.google.dev/) · [Vertex AI](https://cloud.google.com/vertex-ai) · **Official API docs:** [Image](https://ai.google.dev/gemini-api/docs/image-generation) · [Video (Veo)](https://ai.google.dev/gemini-api/docs/video) · [Music (Lyria)](https://cloud.google.com/vertex-ai/generative-ai/docs/music/generate-music)

Google contributes across all three modes: the **Veo** video family, the **Nano Banana** (Gemini Image) family, **Gemini TTS**, and **Lyria** music.

## Models

| id | Name | Mode | Input |
|---|---|---|---|
| `veo-3.1` | Veo 3.1 | video | `t2v` |
| `veo-3.1-fast` | Veo 3.1 Fast | video | `t2v` |
| `veo-3.1-lite` | Veo 3.1 Lite | video | `t2v` |
| `gemini-3-pro-image` | Nano Banana Pro | image | `t2i` |
| `gemini-3.1-flash-image` | Nano Banana 2 | image | `t2i` |
| `gemini-2.5-flash-image` | Nano Banana | image | `t2i` |
| `gemini-2.5-flash-tts` | Gemini 2.5 Flash TTS | audio | `tts` |
| `gemini-2.5-pro-tts` | Gemini 2.5 Pro TTS | audio | `tts` |
| `lyria-3-clip` | Lyria 3 Clip | audio | `music` |
| `lyria-3-pro` | Lyria 3 Pro | audio | `music` |

> `gen-ai models --provider google` lists the current set (13 models).

## Veo 3.1 (video)

```bash
gen-ai generate -m veo-3.1 -p "a drone shot over a snowy ridge at golden hour" \
  --ar 16:9 -r 1080p -d 8 --audio-gen
```

```json
{ "name": "picsart_generate",
  "arguments": { "model": "veo-3.1", "prompt": "a drone shot over a snowy ridge", "duration": 8, "resolution": "1080p", "generateAudio": true } }
```

Veo clips are chainable with [`gen-ai extend`](/guide/cli-quickstart) (`+7s` per segment). Full params for every Veo / Gemini / Imagen / Lyria model are in [Parameters](#parameters) below.

## Nano Banana Pro (image)

```bash
gen-ai generate -m gemini-3-pro-image -p "a cinematic product render of a smart speaker" --ar 16:9 -r 4K
```

## Gemini TTS & Lyria (audio)

```bash
gen-ai generate -m gemini-2.5-pro-tts -p "Here is your daily briefing."   # speech
gen-ai generate -m lyria-3-pro -p "uplifting cinematic orchestral score"  # music
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `gemini-3.1-flash-image` — Nano Banana 2

[Try `gemini-3.1-flash-image` in Playground ↗](https://picsart.com/ai-playground/?model=gemini-3.1-flash-image)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` · `3:2` · `2:3` · `4:5` · `5:4` · `4:1` · `1:4` · `8:1` · `1:8` · `21:9` (default `1:1`) |
| `resolution` | `-r` | enum | `0.5K` · `1K` · `2K` · `4K` (default `1K`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `thinkingLevel` | `--thinking` | enum | `minimal` (Minimal (faster)) · `high` (High (more reasoning)) (default `minimal`) |
| `imageUrls` | `-i` | file | image (up to 14) |

### `veo-3.1` — Veo 3.1

[Try `veo-3.1` in Playground ↗](https://picsart.com/ai-playground/?model=veo-3.1)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `duration` | `-d` | enum | `4` · `6` · `8` (default `8`) |
| `resolution` | `-r` | enum | `720p` · `1080p` · `4k` (default `720p`) |
| `imageUrls` | `-i` | file | image (up to 3) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `negativePrompt` | `--neg` | text | free text |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `veo-3.1-fast` — Veo 3.1 Fast

[Try `veo-3.1-fast` in Playground ↗](https://picsart.com/ai-playground/?model=veo-3.1-fast)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `duration` | `-d` | enum | `4` · `6` · `8` (default `8`) |
| `resolution` | `-r` | enum | `720p` · `1080p` · `4k` (default `720p`) |
| `imageUrls` | `-i` | file | image (up to 3) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `negativePrompt` | `--neg` | text | free text |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |

### `gemini-3-pro-image` — Nano Banana Pro

[Try `gemini-3-pro-image` in Playground ↗](https://picsart.com/ai-playground/?model=gemini-3-pro-image)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` · `2:3` · `21:9` (default `1:1`) |
| `resolution` | `-r` | enum | `1K` · `2K` · `4K` (default `2K`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `thinkingBudget` | `--thinking-budget` | integer | `128`–`32768`, step 128, default `128` |
| `imageUrls` | `-i` | file | image (up to 14) |

### `gemini-2.5-flash-image` — Nano Banana

[Try `gemini-2.5-flash-image` in Playground ↗](https://picsart.com/ai-playground/?model=gemini-2.5-flash-image)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` · `2:3` · `21:9` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 14) |

### `veo-3.1-lite` — Veo 3.1 Lite

[Try `veo-3.1-lite` in Playground ↗](https://picsart.com/ai-playground/?model=veo-3.1-lite)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `duration` | `-d` | enum | `4` · `6` · `8` (default `8`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `startFrame` | `--start-frame` | file | image |

### `gemini-2.5-flash-tts` — Gemini 2.5 Flash TTS

[Try `gemini-2.5-flash-tts` in Playground ↗](https://picsart.com/ai-playground/?model=gemini-2.5-flash-tts)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `voiceId` | `--voice` | enum | `Aoede` · `Charon` · `Fenrir` · `Kore` · `Leda` · `Orus` · `Puck` · `Zephyr` · `Achernar` · `Achird` · `Algenib` · `Algieba` · `Alnilam` · `Autonoe` · `Despina` · `Enceladus` · `Erinome` · `Gacrux` · `Iapetus` · `Laomedeia` · `Pulcherrima` · `Rasalgethi` · `Sadachbia` · `Sadaltager` · `Schedar` · `Sulafat` · `Umbriel` · `Vindemiatrix` · `Zubenelgenubi` (default `Kore`) |

### `gemini-2.5-pro-tts` — Gemini 2.5 Pro TTS

[Try `gemini-2.5-pro-tts` in Playground ↗](https://picsart.com/ai-playground/?model=gemini-2.5-pro-tts)

Input type: `tts`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `language` | `--language` | text | free text |
| `accent` | `--accent` | text | free text |
| `prompt` | `-p` | text | **required** (≤5000 chars) |
| `voiceId` | `--voice` | enum | `Aoede` · `Charon` · `Fenrir` · `Kore` · `Leda` · `Orus` · `Puck` · `Zephyr` · `Achernar` · `Achird` · `Algenib` · `Algieba` · `Alnilam` · `Autonoe` · `Despina` · `Enceladus` · `Erinome` · `Gacrux` · `Iapetus` · `Laomedeia` · `Pulcherrima` · `Rasalgethi` · `Sadachbia` · `Sadaltager` · `Schedar` · `Sulafat` · `Umbriel` · `Vindemiatrix` · `Zubenelgenubi` (default `Kore`) |

### `imagen-4.0` — Imagen 4.0

[Try `imagen-4.0` in Playground ↗](https://picsart.com/ai-playground/?model=imagen-4.0)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `negativePrompt` | `--neg` | text | free text |

### `imagen-4.0-ultra` — Imagen 4.0 Ultra

[Try `imagen-4.0-ultra` in Playground ↗](https://picsart.com/ai-playground/?model=imagen-4.0-ultra)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `negativePrompt` | `--neg` | text | free text |

### `imagen-4.0-fast` — Imagen 4.0 Fast

[Try `imagen-4.0-fast` in Playground ↗](https://picsart.com/ai-playground/?model=imagen-4.0-fast)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` (default `1:1`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `negativePrompt` | `--neg` | text | free text |

### `lyria-3-clip` — Lyria 3 Clip

[Try `lyria-3-clip` in Playground ↗](https://picsart.com/ai-playground/?model=lyria-3-clip)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 1) |

### `lyria-3-pro` — Lyria 3 Pro

[Try `lyria-3-pro` in Playground ↗](https://picsart.com/ai-playground/?model=lyria-3-pro)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 1) |

> **Notes:** Veo audio is native (`generateAudio`); Imagen and Gemini image models differ in resolution and reasoning controls (`thinkingLevel` / `thinkingBudget`). TTS `voiceId` values are Gemini voice presets.
