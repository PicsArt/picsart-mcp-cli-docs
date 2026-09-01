---
description: "66 AI image generation models on Picsart — text-to-image, editing, inpainting, vector/SVG — Nano Banana, Flux, GPT Image, Recraft, Ideogram and more."
---

# Image generation

**66 image models** spanning text-to-image, image editing, inpainting, style transfer, background tools, upscaling, and vector/SVG output.

## Quick start

```bash
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup, soft light" --ar 4:3
```

```json
{ "name": "picsart_generate",
  "arguments": { "model": "flux-2-pro", "prompt": "studio shot of a ceramic cup", "aspectRatio": "4:3" } }
```

## Providers

| Provider | Models | Highlights |
|---|---|---|
| [Google](/reference/providers/google) | Nano Banana Pro, Nano Banana 2, Nano Banana | Top-tier generation + natural-language editing, up to 4K |
| [Flux](/reference/providers/flux) | Flux 2 Pro / Max / Flex, Flux Kontext | Crisp, controllable; reference-guided editing |
| [OpenAI](/reference/providers/openai) | GPT Image 2, GPT Image 1.5 | Strong text rendering & instruction following |
| [Recraft](/reference/providers/recraft) | Recraft V4.1 / V4 families incl. V4 Styles (24) | True vector / SVG output; style-reference generation |
| [Ideogram](/reference/providers/ideogram) | P-Image, Ideogram 4.0, v3, Character | Best-in-class typography |
| [Seedream](/reference/providers/seedream) | Seedream 5.0 Lite, 4.5 | High-detail photoreal |
| [Qwen](/reference/providers/qwen) | Qwen 2, Qwen 2 Pro | Generation + reference-guided editing |
| [Luma](/reference/providers/luma) | UNI-1, UNI-1 Max | Fast creative generation |
| [Grok](/reference/providers/grok) | Grok Imagine 2.0, Imagine, Imagine Quality | Fast stylised generation |
| [Hunyuan](/reference/providers/hunyuan) | Hunyuan V3 | — |
| [Reve](/reference/providers/reve) | Reve | — |
| [Picsart](/reference/providers/picsart) | SANA-Sprint, Image Edit, Makeup, Change/Remove BG, Enhance | Picsart-native editing tools |
| [Topaz](/reference/providers/topaz) | Topaz Image Upscale | Upscaling & restoration |

## Editing shortcuts

Some tasks have dedicated, model-agnostic commands/tools that auto-pick a fitting model:

```bash
gen-ai remove-bg ./photo.jpg
gen-ai change-bg ./photo.jpg -p "a sunny beach"
gen-ai enhance ./photo.jpg
gen-ai vectorize ./logo.png
```

```json
{ "name": "picsart_remove_bg", "arguments": { "imageUrls": ["https://example.com/photo.jpg"] } }
```

## Common image parameters

| Param | CLI flag | Notes |
|---|---|---|
| `prompt` | `-p` | Required |
| `aspectRatio` | `--ar` | Model-dependent set (e.g. `1:1`, `16:9`, `4:3`) |
| `resolution` | `-r` | e.g. `1K`, `2K`, `4K` (model-dependent) |
| `count` | `-n` | Number of outputs |
| `imageUrls` | `-i` | Reference / input images for editing & i2i |

Exact options vary per model — check `gen-ai models info <id>` or `picsart_model_params`.
