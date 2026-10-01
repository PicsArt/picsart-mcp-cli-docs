---
description: "Seed Audio model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Seed Audio

**Modes:** audio · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `seed-audio-1.0-multilingual` | Seed Audio Multilingual | `tts` |
| `seed-audio-1.0` | Seed Audio | `tts` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info seed-audio-1.0-multilingual --json
gen-ai validate -m seed-audio-1.0-multilingual --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m seed-audio-1.0-multilingual --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "seed-audio-1.0-multilingual",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `seed-audio-1.0-multilingual`

Seed Audio Multilingual; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 3000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `en_male_tim_uranus_bigtts` |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `format` | `--format` | No | enum | `wav`, `mp3`, `pcm`, `ogg_opus`; default `wav` |
| `sampleRate` | `--sample-rate` | No | enum | `8000`, `16000`, `24000`, `32000`, `44100`, `48000`; default `44100` |
| `speechRate` | `--speech-rate` | No | range | -50 to 100; default `0` |
| `loudnessRate` | `--loudness-rate` | No | range | -50 to 100; default `0` |
| `pitchRate` | `--pitch-rate` | No | range | -12 to 12; default `0` |
| `aigcWatermark` | `--aigc-watermark` | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 3000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "bytedance/v1/catalog/voices",
      "modelId": "seed-audio-1.0-multilingual"
    },
    "default": "en_male_tim_uranus_bigtts"
  },
  {
    "key": "audioUrls",
    "label": "Reference Audios",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "audio",
    "array": {
      "max": 3
    }
  },
  {
    "key": "imageUrls",
    "label": "Reference Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "format",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "wav"
      },
      {
        "id": "mp3"
      },
      {
        "id": "pcm"
      },
      {
        "id": "ogg_opus"
      }
    ],
    "default": "wav"
  },
  {
    "key": "sampleRate",
    "label": "Sample Rate",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 8000
      },
      {
        "id": 16000
      },
      {
        "id": 24000
      },
      {
        "id": 32000
      },
      {
        "id": 44100
      },
      {
        "id": 48000
      }
    ],
    "default": 44100
  },
  {
    "key": "speechRate",
    "label": "Speech Rate",
    "kind": "range",
    "min": -50,
    "max": 100,
    "default": 0
  },
  {
    "key": "loudnessRate",
    "label": "Loudness",
    "kind": "range",
    "min": -50,
    "max": 100,
    "default": 0
  },
  {
    "key": "pitchRate",
    "label": "Pitch",
    "kind": "range",
    "min": -12,
    "max": 12,
    "default": 0
  },
  {
    "key": "aigcWatermark",
    "label": "Watermark",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `seed-audio-1.0`

Seed Audio; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 3000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `en_male_tim_uranus_bigtts` |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `format` | `--format` | No | enum | `wav`, `mp3`, `pcm`, `ogg_opus`; default `wav` |
| `sampleRate` | `--sample-rate` | No | enum | `8000`, `16000`, `24000`, `32000`, `44100`, `48000`; default `44100` |
| `speechRate` | `--speech-rate` | No | range | -50 to 100; default `0` |
| `loudnessRate` | `--loudness-rate` | No | range | -50 to 100; default `0` |
| `pitchRate` | `--pitch-rate` | No | range | -12 to 12; default `0` |
| `aigcWatermark` | `--aigc-watermark` | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 3000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "bytedance/v1/catalog/voices",
      "modelId": "seed-audio-1.0"
    },
    "default": "en_male_tim_uranus_bigtts"
  },
  {
    "key": "audioUrls",
    "label": "Reference Audios",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "audio",
    "array": {
      "max": 3
    }
  },
  {
    "key": "imageUrls",
    "label": "Reference Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "format",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "wav"
      },
      {
        "id": "mp3"
      },
      {
        "id": "pcm"
      },
      {
        "id": "ogg_opus"
      }
    ],
    "default": "wav"
  },
  {
    "key": "sampleRate",
    "label": "Sample Rate",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 8000
      },
      {
        "id": 16000
      },
      {
        "id": 24000
      },
      {
        "id": 32000
      },
      {
        "id": 44100
      },
      {
        "id": 48000
      }
    ],
    "default": 44100
  },
  {
    "key": "speechRate",
    "label": "Speech Rate",
    "kind": "range",
    "min": -50,
    "max": 100,
    "default": 0
  },
  {
    "key": "loudnessRate",
    "label": "Loudness",
    "kind": "range",
    "min": -50,
    "max": 100,
    "default": 0
  },
  {
    "key": "pitchRate",
    "label": "Pitch",
    "kind": "range",
    "min": -12,
    "max": 12,
    "default": 0
  },
  {
    "key": "aigcWatermark",
    "label": "Watermark",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
