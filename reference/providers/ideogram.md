---
description: "Ideogram AI models on Picsart — 3 image model(s) including Ideogram 4.0, Ideogram v3. CLI + MCP examples, parameters, and official docs."
---

# Ideogram

**Mode:** image · **Models:** 3

**Vendor:** [Ideogram](https://ideogram.ai) · **Official API docs:** [Ideogram API Reference](https://developer.ideogram.ai/api-reference)

Ideogram v3 is a text-to-image model known for strong typography and in-image text rendering, with selectable rendering speeds and styles. **Ideogram Character** is the image-to-image variant that carries a reference subject across generations.

## Models

| id | Name | Input type |
|---|---|---|
| `ideogram-v3` | Ideogram v3 | `t2i` |
| `ideogram-character` | Ideogram Character | `i2i` |
| `ideogram-v4` | Ideogram 4.0 | `t2i` |

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

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `ideogram-v3` — Ideogram v3

[Try `ideogram-v3` in Playground ↗](https://picsart.com/ai-playground/?model=ideogram-v3)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `3:4` · `4:3` (default `16:9`) |
| `renderingSpeed` | `--speed` | enum | `FLASH` (Flash) · `TURBO` (Turbo) · `DEFAULT` (Balanced) · `QUALITY` (Quality) (default `DEFAULT`) |
| `style` | `--style` | enum | `GENERAL` (General) · `REALISTIC` (Realistic) · `DESIGN` (Design) (default `GENERAL`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `negativePrompt` | `--neg` | text | free text |
| `imageUrls` | `-i` | file | image (up to 1) |
| `imageWeight` | `--weight` | integer | `1`–`100`, step 5, default `50` |

### `ideogram-character` — Ideogram Character

[Try `ideogram-character` in Playground ↗](https://picsart.com/ai-playground/?model=ideogram-character)

Input type: `i2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `resolution` | `-r` | enum | `1024x1024` · `1344x768` · `768x1344` · `1152x864` · `864x1152` · `832x1248` · `1280x800` (default `1024x1024`) |
| `renderingSpeed` | `--speed` | enum | `TURBO` (Turbo) · `DEFAULT` (Balanced) · `QUALITY` (Quality) (default `DEFAULT`) |
| `style` | `--style` | enum | `AUTO` (Auto) · `REALISTIC` (Realistic) · `FICTION` (Fiction) (default `AUTO`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

> **Notes:** `ideogram-character` uses a reference image (`imageUrls`) to lock the subject’s identity.

### `ideogram-v4` — Ideogram 4.0

[Try `ideogram-v4` in Playground ↗](https://picsart.com/ai-playground/?model=ideogram-v4)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `resolution` | `-r` | enum | `2048x2048` · `1440x2880` · `2880x1440` · `1664x2496` · `2496x1664` · `1792x2240` · `2240x1792` · `1440x2560` · `2560x1440` · `1600x2560` · `2560x1600` · `1728x2304` · `2304x1728` · `1296x3168` · `3168x1296` · `1152x2944` · `2944x1152` · `1248x3328` · `3328x1248` · `1280x3072` · `3072x1280` (default `2048x2048`) |
| `renderingSpeed` | `--speed` | enum | `TURBO` (Turbo) · `DEFAULT` (Balanced) · `QUALITY` (Quality) (default `DEFAULT`) |
| `enableCopyrightDetection` | `--enable-copyright-detection` | boolean | `true` · `false` (default `false`) |

## Pricing

```bash
gen-ai pricing ideogram-v3 -n 4 --rendering-speed QUALITY
```

Cost scales with **count** (number of images) and **rendering speed** (`FLASH`/`TURBO` are cheaper, `QUALITY` is the most expensive).
