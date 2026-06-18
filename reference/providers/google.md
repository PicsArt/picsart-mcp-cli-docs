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

**Parameters — `veo-3.1`**

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` |
| `duration` | `-d` | enum | `4` · `6` · `8` |
| `resolution` | `-r` | enum | `720p` · `1080p` · `4k` |
| `generateAudio` | `--audio-gen` | boolean | native audio |
| `negativePrompt` | `--neg` | text | what to avoid |
| `startFrame` / `endFrame` | `--start-frame` / `--end-frame` | file | keyframes |
| `imageUrls` | `-i` | file | reference images |

Veo clips are chainable with [`gen-ai extend`](/guide/cli-quickstart) (`+7s` per segment).

## Nano Banana Pro (image)

```bash
gen-ai generate -m gemini-3-pro-image -p "a cinematic product render of a smart speaker" --ar 16:9 -r 4K
```

**Parameters — `gemini-3-pro-image`**

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `3:4` · `4:3` · `2:3` · `21:9` |
| `resolution` | `-r` | enum | `1K` · `2K` · `4K` |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` |
| `thinkingBudget` | `--thinking` | range | reasoning depth |
| `imageUrls` | `-i` | file | multi-image input for editing |

## Gemini TTS & Lyria (audio)

```bash
gen-ai generate -m gemini-2.5-pro-tts -p "Here is your daily briefing."   # speech
gen-ai generate -m lyria-3-pro -p "uplifting cinematic orchestral score"  # music
```

> Sources: `gen-ai models info veo-3.1 --json` and `gen-ai models info gemini-3-pro-image --json`.
