---
description: "41 AI text models on Picsart — analyze images and video with Claude, GPT, and Gemini via the gen-ai describe command. Captioning, OCR, classification, and summarization."
---

# Text & analysis

**41 text models** that read an image or video and return **text** — captioning, OCR, classification, Q&A, and summarization. Unlike every other mode, these LLMs **analyze** media instead of generating it.

## Quick start

They run through [`gen-ai describe`](/guide/cli-quickstart#describe-an-image-or-video) (not `generate`), and print the answer to stdout:

```bash
# describe an image (Claude Sonnet is the default)
gen-ai describe -i photo.jpg

# ask a specific question
gen-ai describe -i receipt.jpg -p "extract the total and tax"

# summarize a video (auto-routes to a video-capable model)
gen-ai describe --video clip.mp4 -p "summarize what happens"
```

From an MCP client, the same models are reachable through `picsart_generate` with an `imageUrls` (or `videoUrl`) input.

## Input types

| Type | Meaning | Models |
|---|---|---|
| `i2t` | image → text | Claude Fable / Opus / Sonnet / Haiku, GPT, Gemini Flash |
| `v2t` | video (or image) → text | Gemini 3 Pro |

Only Gemini 3 Pro accepts video, so `gen-ai describe --video …` auto-selects it unless you force another model with `-m`.

## Providers

| Provider | Models | Highlights |
|---|---|---|
| [Anthropic](/reference/providers/anthropic) | Claude Fable, Opus, Sonnet, Haiku | Opus for hard reasoning; Haiku for high-volume |
| [OpenAI](/reference/providers/openai) | GPT-6 Astra, GPT-5.6 family, GPT-5 and GPT-4 families | Strong general image understanding |
| [Google](/reference/providers/google) | Gemini 4 Argon, Gemini 3 Pro, Gemini 3.8 / 3.7 / 3.6 Flash, 3.5 Flash Lite, 2.5 Flash | Argon and Pro read video; Flash tiers handle image analysis |
| [Kimi](/reference/providers/kimi) · [Grok](/reference/providers/grok) · [MiniMax](/reference/providers/minimax) | Kimi K3, Grok 4.7, MiniMax H3 Context IR | Deep reasoning with 500K–1M context; Context IR enhances video prompts |

## Common parameters

| Param | CLI flag | Notes |
|---|---|---|
| `prompt` | `-p` | The question or instruction (optional — defaults to "describe this") |
| `imageUrls` | `-i` | Image(s) to analyze |
| `videoUrl` | `--video` | Video to analyze (Gemini 3 Pro only) |
| `thinking` | `--thinking` | Reasoning depth, where the model supports it |

These models return text, so the CLI prints the answer to stdout and skips download / Drive save. Add `-q` to drop the model/time header (printed to stderr), or `--json` for `{ text, model, durationMs }`.
