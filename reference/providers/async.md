---
description: "Async AI model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Async AI

**Modes:** audio · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `async-flash-v1` | Async Flash v1.0 | `tts` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info async-flash-v1 --json
gen-ai validate -m async-flash-v1 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m async-flash-v1 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "async-flash-v1",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `async-flash-v1`

Async Flash v1.0; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `cca0e076-b350-4966-b570-4c2fca50b525` |
| `container` | `--container` | No | enum | `mp3`, `wav`, `raw`; default `mp3` |
| `sampleRate` | `--sample-rate` | No | range | 8000 to 48000; default `24000` |
| `encoding` | `--encoding` | No | enum | `pcm_s16le`, `pcm_f32le`; default `pcm_s16le` |
| `bitRate` | `--bit-rate` | No | range | 32000 to 320000; default `192000` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "async-ai/v1/catalog/voices"
    },
    "default": "cca0e076-b350-4966-b570-4c2fca50b525"
  },
  {
    "key": "container",
    "label": "Audio Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp3"
      },
      {
        "id": "wav"
      },
      {
        "id": "raw"
      }
    ],
    "default": "mp3"
  },
  {
    "key": "sampleRate",
    "label": "Sample Rate",
    "kind": "range",
    "min": 8000,
    "max": 48000,
    "default": 24000
  },
  {
    "key": "encoding",
    "label": "Encoding",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "pcm_s16le"
      },
      {
        "id": "pcm_f32le"
      }
    ],
    "default": "pcm_s16le"
  },
  {
    "key": "bitRate",
    "label": "Bit Rate",
    "kind": "range",
    "min": 32000,
    "max": 320000,
    "default": 192000
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
