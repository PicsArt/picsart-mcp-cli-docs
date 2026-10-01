---
description: "Picsart video models, examples, and input requirements."
---

# Video generation

The SDK 6.18.0 snapshot contains 91 video models. Availability and parameters can differ in the CLI or hosted MCP release. Inspect the selected model before generating.

## Inspect the inputs

```bash
gen-ai models info seedance-2.5 --json
gen-ai validate -m seedance-2.5 --schema
```

These commands inspect metadata without submitting a generation. Follow [authentication](/guide/authentication) and [pricing](/guide/pricing) before the next step.

## Generate

This example consumes credits:

```bash
gen-ai generate -m seedance-2.5 -p "A fox running through autumn leaves"
```

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "seedance-2.5",
    "prompt": "A fox running through autumn leaves",
    "async": true
  }
}
```

For MCP media requests, retain the returned job and [poll its status](/guide/mcp-quickstart#wait-for-the-existing-job). Replace example input paths and URLs with your own media before using an editing model.

Image-to-video models do not all take the same image parameter. Wan I2V uses `startFrame`; motion-control models can require both a still image and a reference video. Clip extension also has model-specific inputs and duration limits.

## Providers

- [ByteDance](/reference/providers/bytedance)
- [Creatify](/reference/providers/creatify)
- [Flux](/reference/providers/flux)
- [Google](/reference/providers/google)
- [Grok](/reference/providers/grok)
- [Happy Horse](/reference/providers/happyhorse)
- [HeyGen](/reference/providers/heygen)
- [Kling](/reference/providers/kling)
- [LTX](/reference/providers/ltx)
- [Luma](/reference/providers/luma)
- [MiniMax](/reference/providers/minimax)
- [OVI](/reference/providers/ovi)
- [Picsart](/reference/providers/picsart)
- [PixVerse](/reference/providers/pixverse)
- [Runway](/reference/providers/runway)
- [Seedance](/reference/providers/seedance)
- [Topaz](/reference/providers/topaz)
- [VEED](/reference/providers/veed)
- [Videography](/reference/providers/videography)
- [Wan](/reference/providers/wan)

## Parameters

Each provider page lists required inputs, accepted values, defaults, and limits for its models. A prompt is not required by every model, and counts, resolutions, duration, and file types vary. Use `picsart_model_params` for the connected server's schema and `picsart_preflight` to validate the complete request.
