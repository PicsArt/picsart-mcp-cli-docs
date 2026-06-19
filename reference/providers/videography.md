---
description: "Videography AI models on Picsart — 1 video model(s) including Videography. CLI + MCP examples, parameters, and official docs."
---

# Videography

**Mode:** video · **Models:** 1

**Vendor:** [Picsart](https://docs.picsart.io) · **Official API docs:** [Picsart Developers](https://docs.picsart.io)

Videography is Picsart's first-party image-to-video model. It animates a single source image into a short clip, making it a fast way to bring a still into motion without writing a separate motion prompt.

## Models

| id | Name | Input type |
|---|---|---|
| `picsart-videography` | Videography | `i2v` |

## CLI

```bash
# animate a still into a short video
gen-ai generate -m picsart-videography --image ./portrait.jpg
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "picsart-videography",
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `picsart-videography` — Videography

[Try `picsart-videography` in Playground ↗](https://picsart.com/ai-playground/?model=picsart-videography)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** image (up to 1) |

> **Notes:** Image-driven — a single source image in, a video out; there is no text prompt parameter.

## Pricing

```bash
gen-ai pricing picsart-videography
```

Videography is priced per generation.
