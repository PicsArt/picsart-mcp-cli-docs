---
description: "Topaz AI models on Picsart — 9 image model(s) including Topaz CGI, Topaz HD Upscale, Topaz Hi-Fi. CLI + MCP examples, parameters, and official docs."
---

# Topaz

**Mode:** image · **Models:** 9

**Vendor:** [Topaz Labs](https://docs.topazlabs.com) · **Official API docs:** [developer.topazlabs.com](https://developer.topazlabs.com)

Topaz Labs provides AI image enhancement and upscaling. The flagship `topaz-upscale-image` does a 2× HD upscale with face enhancement preset; the remaining variants are enhancement models tuned for different source types — low-res photos, CGI/3D renders, high-fidelity preservation, text/graphics, and generative recovery. All variants run through the `topaz/upscale/image` workflow and take an image as input.

## Models

| id | Name | Input type |
|---|---|---|
| `topaz-upscale-image` | Topaz HD Upscale | `i2i` |
| `topaz-enhance-standard-v2` | Topaz Standard | `i2i` |
| `topaz-enhance-low-res-v2` | Topaz Low Res | `i2i` |
| `topaz-enhance-cgi` | Topaz CGI | `i2i` |
| `topaz-enhance-high-fidelity-v2` | Topaz Hi-Fi | `i2i` |
| `topaz-enhance-text-refine` | Topaz Text | `i2i` |
| `topaz-enhance-redefine` | Topaz Redefine | `i2i` |
| `topaz-enhance-recovery` | Topaz Recovery | `i2i` |
| `topaz-enhance-recovery-v2` | Topaz Recovery V2 | `i2i` |

## CLI

```bash
# 2× HD upscale of a photo
gen-ai generate -m topaz-upscale-image -i ./portrait.jpg

# enhance a low-resolution source
gen-ai generate -m topaz-enhance-low-res-v2 -i ./old-scan.jpg

# refine text and graphics
gen-ai generate -m topaz-enhance-text-refine -i ./poster.png
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "topaz-upscale-image",
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

The task-shaped `picsart_enhance` tool also routes to Topaz upscaling:

```json
{ "name": "picsart_enhance",
  "arguments": {
    "imageUrls": ["https://example.com/portrait.jpg"]
  } }
```

## Parameters — `topaz-upscale-image`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** · single image (max 1) |

> Source: `gen-ai models info topaz-upscale-image --json`. The upscale model exposes only the input image; Topaz's automatic settings handle the rest (the catalog presets `upscale_factor: 2`, `model: Standard V2`, face enhancement, and `output_format: png`). The enhance variants share this surface, differing only in the enhancement `model` they send. See the [Topaz API reference](https://developer.topazlabs.com) for the underlying `/enhance` parameters (output dimensions, `crop_to_fill`, `face_enhancement`, `subject_detection`).

## Pricing

```bash
gen-ai pricing topaz-upscale-image
```

Topaz bills per **output megapixels** (roughly 1 credit per 24 MP of output), so cost scales with the upscaled resolution rather than per-image flat. All variants share the `topaz-upscale-image` pricing key.
