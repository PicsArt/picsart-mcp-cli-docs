---
description: "Picsart AI SDK 6.23.0 catalog update: 22 new production models, current parameters, and ByteDance provider grouping."
title: SDK 6.23.0 catalog update
---

# SDK 6.23.0 catalog update

This update compares SDK **6.23.0** with the **6.2.3** catalog published here on September 19, 2026.
The production catalog grows from **201 to 223 models**: **22 additions and no removals**.
It contains 71 image, 91 video, 31 audio, and 30 text models.

## New production models

| Model ID | Name | Mode | Provider |
|---|---|---|---|
| `ltx-v2.3-reframe` | LTX 2.3 Reframe | video | [LTX](/reference/providers/ltx) |
| `ltx-v2.3-outpaint` | LTX 2.3 Outpaint | video | [LTX](/reference/providers/ltx) |
| `ltx-v2.5-pro` | LTX 2.5 Pro | video | [LTX](/reference/providers/ltx) |
| `ltx-v2.5-fast` | LTX 2.5 Fast | video | [LTX](/reference/providers/ltx) |
| `creatify-boreal` | Creatify Boreal | video | [Creatify](/reference/providers/creatify) |
| `seedream-5.0-flash` | Seedream 5.0 Flash | image | [ByteDance](/reference/providers/bytedance) |
| `flux-3-image` | Flux 3 Image | image | [Flux](/reference/providers/flux) |
| `gemini-3.8-flash-tts` | Gemini 3.8 Flash TTS | audio | [Google](/reference/providers/google) |
| `gemini-3.8-flash-lite-tts` | Gemini 3.8 Flash Lite TTS | audio | [Google](/reference/providers/google) |
| `eleven-v4` | Eleven v4 | audio | [ElevenLabs](/reference/providers/elevenlabs) |
| `eleven-v4-turbo` | Eleven v4 Turbo | audio | [ElevenLabs](/reference/providers/elevenlabs) |
| `eleven-dialogue-v4` | Eleven Dialogue v4 | audio | [ElevenLabs](/reference/providers/elevenlabs) |
| `eleven-text-to-dialogue` | Eleven Dialogue v3 | audio | [ElevenLabs](/reference/providers/elevenlabs) |
| `eleven-speech-to-text` | Eleven Scribe v2 | text | [ElevenLabs](/reference/providers/elevenlabs) |
| `eleven-video-to-music` | Eleven Video to Music | audio | [ElevenLabs](/reference/providers/elevenlabs) |
| `minimax-h3-max-lip-sync` | MiniMax H3 Max Lip Sync | video | [MiniMax](/reference/providers/minimax) |
| `minimax-h3-max-extend` | MiniMax H3 Max Extend | video | [MiniMax](/reference/providers/minimax) |
| `ideogram-4-5` | Ideogram 4.5 | image | [Ideogram](/reference/providers/ideogram) |
| `ideogram-4-5-precise-edit` | Ideogram 4.5 Precise Edit | image | [Ideogram](/reference/providers/ideogram) |
| `recraftv4_1_flash` | Recraft V4.1 Flash | image | [Recraft](/reference/providers/recraft) |
| `gpt-6-sol` | GPT-6 Sol | text | [OpenAI](/reference/providers/openai) |
| `gpt-6-luna` | GPT-6 Luna | text | [OpenAI](/reference/providers/openai) |

## Provider grouping

The provider count changes from **31 to 28**.
The SDK now groups Seedance, Seedream, and Seed Audio under **ByteDance**.
Their model IDs remain unchanged. This does not remove models.
The previous provider links point to the current [ByteDance reference](/reference/providers/bytedance).

## Parameter updates

Provider tables use the SDK 6.23.0 parameter definitions.
The refresh includes changes to Kling, MiniMax, Seedance, Gemini, ElevenLabs, and PixVerse models.
Ideogram 4.5 exposes separate `aspectRatio` and `resolution` fields, plus its current quality choices.
Use the model reference for allowed values and defaults.

## Version and availability

This is an SDK catalog snapshot, not a guarantee that every installed CLI or server exposes every model.
Check your CLI with `gen-ai models` and `gen-ai models info <id> --json` before use.
For MCP, check the connected server's model discovery tools.
Preview, disabled, and deprecated models are excluded from this production catalog.

```bash
npm install @picsart/ai-sdk@6.23.0
```

See the [SDK source comparison](https://github.com/PicsArt/ai-sdk/compare/v6.2.3...v6.23.0)
and the [SDK guide](/guide/sdk).
