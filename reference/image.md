---
description: "Picsart image models, examples, and input requirements."
---

# Image generation

The SDK 6.18.0 snapshot contains 68 image models. Availability and parameters can differ in the CLI or hosted MCP release. Inspect the selected model before generating.

## Inspect the inputs

```bash
gen-ai models info flux-2-pro --json
gen-ai validate -m flux-2-pro --schema
```

These commands inspect metadata without submitting a generation. Follow [authentication](/guide/authentication) and [pricing](/guide/pricing) before the next step.

## Generate

This example consumes credits:

```bash
gen-ai generate -m flux-2-pro -p "A ceramic cup on a wooden table"
```

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "A ceramic cup on a wooden table",
    "async": true
  }
}
```

For MCP media requests, retain the returned job and [poll its status](/guide/mcp-quickstart#wait-for-the-existing-job). Replace example input paths and URLs with your own media before using an editing model.

For CLI editing shortcuts, pass an input flag, not a positional filename:

```bash
gen-ai remove-bg -i ./photo.jpg
gen-ai change-bg -i ./photo.jpg -p "A sunny beach"
gen-ai enhance -i ./photo.jpg
gen-ai vectorize -i ./logo.png
```

These editing commands consume credits. In MCP, use the corresponding dedicated editing tools.

## Providers

- [Flux](/reference/providers/flux)
- [Google](/reference/providers/google)
- [Grok](/reference/providers/grok)
- [Hunyuan](/reference/providers/hunyuan)
- [Ideogram](/reference/providers/ideogram)
- [Kling](/reference/providers/kling)
- [Luma](/reference/providers/luma)
- [Meta](/reference/providers/meta)
- [OpenAI](/reference/providers/openai)
- [Picsart](/reference/providers/picsart)
- [Qwen](/reference/providers/qwen)
- [Recraft](/reference/providers/recraft)
- [Runway](/reference/providers/runway)
- [Seedream](/reference/providers/seedream)
- [Topaz](/reference/providers/topaz)

## Parameters

Each provider page lists required inputs, accepted values, defaults, and limits for its models. A prompt is not required by every model, and counts, resolutions, duration, and file types vary. Use `picsart_model_params` for the connected server's schema and `picsart_preflight` to validate the complete request.
