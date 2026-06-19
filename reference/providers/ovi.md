---
description: "OVI AI models on Picsart — 1 video model(s) including OVI. CLI + MCP examples, parameters, and official docs."
---

# OVI

**Mode:** video · **Models:** 1

**Vendor:** [OVI](https://ovi.video) · **Official API docs:** [Fal — fal-ai/ovi](https://fal.ai/models/fal-ai/ovi)

OVI jointly generates **video and synchronized audio in a single pass** — full scene plus matching audio, including spoken dialogue. It runs **text-to-video** by default and switches to **image-to-video** when a start image is supplied. Clips are short (~5s) with no length controls; dialogue and sound effects are described inline in the prompt via `<S>…<E>` (speech) and `<AUDCAP>…<ENDAUDCAP>` (audio caption) markup.

## Models

| id | Name | Input type |
|---|---|---|
| `ovi` | OVI | `t2v` |

## CLI

```bash
# text-to-video with a spoken line and SFX (joint audio)
gen-ai generate -m ovi \
  -p "A knight raises a sword. <S>For honor!<E> <AUDCAP>steel clang, distant crowd roar<ENDAUDCAP>" \
  --size 16:9

# image-to-video: animate a start image (shape follows the image)
gen-ai generate -m ovi -p "the portrait blinks and smiles" -i ./portrait.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ovi",
    "prompt": "A knight raises a sword. <S>For honor!<E> <AUDCAP>steel clang, distant crowd roar<ENDAUDCAP>",
    "size": "16:9"
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "ovi",
    "prompt": "the portrait blinks and smiles",
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `ovi` — OVI

[Try `ovi` in Playground ↗](https://picsart.com/ai-playground/?model=ovi)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `size` | `--size` | enum | `9:16` · `16:9` · `1:1` · `9:16+` · `16:9+` · `2:5` · `5:2` (default `16:9`) |
| `imageUrls` | `-i` | file | image (up to 1) |

> **Notes:** `size` maps to OVI’s fixed `WIDTHxHEIGHT` resolution enum; it applies to text-to-video (image-to-video derives shape from the start image).

## Pricing

```bash
gen-ai pricing ovi
```

Clip length is fixed (~5s) with no duration or resolution-tier controls, so OVI is a flat per-generation cost.
