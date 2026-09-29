---
description: "Picsart text models, examples, and input requirements."
---

# Text and analysis

The SDK 6.18.0 snapshot contains 30 text models. Availability and parameters can differ in the CLI or hosted MCP release. Inspect the selected model before generating.

## Inspect the inputs

```bash
gen-ai models info claude-opus-4-8 --json
gen-ai validate -m claude-opus-4-8 --schema
```

These commands inspect metadata without submitting a generation. Follow [authentication](/guide/authentication) and [pricing](/guide/pricing) before the next step.

## Generate

This example consumes credits:

```bash
gen-ai generate -m claude-opus-4-8 -p "Explain the difference between a raster and a vector image."
```

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "claude-opus-4-8",
    "prompt": "Explain the difference between a raster and a vector image."
  }
}
```

Text models can answer prompts and, where supported, analyze images or video. The generic generation command supports text. `gen-ai describe -i ./photo.jpg` is a convenience command that supplies a default question; select a model that accepts the media type you pass. Use `--json --quiet --no-input` for structured noninteractive output.

## Providers

- [Anthropic](/reference/providers/anthropic)
- [ElevenLabs](/reference/providers/elevenlabs)
- [Google](/reference/providers/google)
- [OpenAI](/reference/providers/openai)

## Parameters

Each provider page lists required inputs, accepted values, defaults, and limits for its models. A prompt is not required by every model, and counts, resolutions, duration, and file types vary. Use `picsart_model_params` for the connected server's schema and `picsart_preflight` to validate the complete request.
