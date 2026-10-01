---
description: "Picsart audio models, examples, and input requirements."
---

# Audio generation

The SDK 6.18.0 snapshot contains 31 audio models. Availability and parameters can differ in the CLI or hosted MCP release. Inspect the selected model before generating.

## Inspect the inputs

```bash
gen-ai models info eleven-v3 --json
gen-ai validate -m eleven-v3 --schema
```

These commands inspect metadata without submitting a generation. Follow [authentication](/guide/authentication) and [pricing](/guide/pricing) before the next step.

## Generate

This example consumes credits:

```bash
gen-ai generate -m eleven-v3 -p "Welcome to the audio guide."
```

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "eleven-v3",
    "prompt": "Welcome to the audio guide.",
    "async": true
  }
}
```

For MCP media requests, retain the returned job and [poll its status](/guide/mcp-quickstart#wait-for-the-existing-job). Replace example input paths and URLs with your own media before using an editing model.

Voice and avatar IDs are model-specific. Static choices appear in the parameter descriptors. A dynamic catalog requires a current ID from the account catalog named in its descriptor; an empty list is not a usable voice ID.

## Providers

- [Async AI](/reference/providers/async)
- [ElevenLabs](/reference/providers/elevenlabs)
- [Google](/reference/providers/google)
- [Grok](/reference/providers/grok)
- [Kling](/reference/providers/kling)
- [MiniMax](/reference/providers/minimax)
- [Seed Audio](/reference/providers/seedaudio)

## Parameters

Each provider page lists required inputs, accepted values, defaults, and limits for its models. A prompt is not required by every model, and counts, resolutions, duration, and file types vary. Use `picsart_model_params` for the connected server's schema and `picsart_preflight` to validate the complete request.
