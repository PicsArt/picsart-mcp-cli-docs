---
description: "Ideogram AI models on Picsart — 2 image model(s) including Ideogram Character, Ideogram v3. CLI + MCP examples, parameters, and official docs."
---

# Ideogram

**Mode:** image · **Models:** 2

**Vendor:** [Ideogram](https://ideogram.ai) · **Official API docs:** [Ideogram API Reference](https://developer.ideogram.ai/api-reference)

Ideogram v3 is a text-to-image model known for strong typography and in-image text rendering, with selectable rendering speeds and styles. **Ideogram Character** is the image-to-image variant that carries a reference subject across generations.

## Models

| id | Name | Input type |
|---|---|---|
| `ideogram-v3` | Ideogram v3 | `t2i` |
| `ideogram-character` | Ideogram Character | `i2i` |

## CLI

```bash
# text-to-image with typography focus
gen-ai generate -m ideogram-v3 \
  -p "vintage travel poster reading VISIT MARS, bold serif title, warm palette" \
  --ar 3:4 --rendering-speed QUALITY --style DESIGN -n 4

# character: carry a reference subject across a new scene
gen-ai generate -m ideogram-character \
  -p "the same character as a knight in a misty forest" \
  -i ./character.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ideogram-v3",
    "prompt": "vintage travel poster reading VISIT MARS, bold serif title",
    "aspectRatio": "3:4",
    "renderingSpeed": "QUALITY",
    "style": "DESIGN",
    "count": 4
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ideogram-character",
    "prompt": "the same character as a knight in a misty forest",
    "imageUrls": ["https://example.com/character.jpg"]
  } }
```

## Parameters — `ideogram-v3`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `3:4` · `4:3` (default `16:9`) |
| `renderingSpeed` | `--rendering-speed` | enum | `FLASH` · `TURBO` · `DEFAULT` · `QUALITY` (default `DEFAULT`) |
| `style` | `--style` | enum | `GENERAL` · `REALISTIC` · `DESIGN` (default `GENERAL`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `negativePrompt` | `--neg` | text | terms to exclude |
| `imageUrls` | `-i` | file | reference image (max 1) |
| `imageWeight` | `--image-weight` | range | `1`–`100`, step `5` (default `50`) |

> Source: `gen-ai models info ideogram-v3 --json`. `ideogram-character` shares this surface and uses a reference image (`imageUrls`) to lock the subject's identity.

## Pricing

```bash
gen-ai pricing ideogram-v3 -n 4 --rendering-speed QUALITY
```

Cost scales with **count** (number of images) and **rendering speed** (`FLASH`/`TURBO` are cheaper, `QUALITY` is the most expensive).
