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

## Parameters — `picsart-videography`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** — source image (1) |

> Source: `gen-ai models info picsart-videography --json`. Videography is image-driven: it takes a single source image and produces a video. There is no separate text prompt parameter.

## Pricing

```bash
gen-ai pricing picsart-videography
```

Videography is priced per generation.
