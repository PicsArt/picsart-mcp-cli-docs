---
description: "Mirelo model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Mirelo

**Modes:** video, audio · **Models:** 3

This reference uses the `@picsart/ai-sdk 6.48.1` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `mirelo-sfx-2.0-text-to-audio` | Mirelo SFX 2.0 (Text to Audio) | `t2a` |
| `mirelo-sfx-2.0-video-to-audio` | Mirelo SFX 2.0 (Video to Audio) | `v2a` |
| `mirelo-sfx-2.0-video-to-video` | Mirelo SFX 2.0 (Video to Video) | `v2v` |

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `mirelo-sfx-2.0-text-to-audio`

Mirelo SFX 2.0 (Text to Audio); input type `t2a`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 2000 characters |
| `negativePrompt` | Use SDK or MCP | No | text | maximum 1000 characters |
| `duration` | Use SDK or MCP | No | range | 1 to 600; step 1; default `30` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `3`, `4`; default `2` |
| `format` | Use SDK or MCP | No | enum | `wav`, `mp3`, `aac`, `flac`; default `wav` |
| `bitrateKbps` | Use SDK or MCP | No | range | 32 to 320; step 1 |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2000
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 1000
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 1,
    "max": 600,
    "step": 1,
    "default": 30
  },
  {
    "key": "count",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 1
      },
      {
        "id": 2
      },
      {
        "id": 3
      },
      {
        "id": 4
      }
    ],
    "default": 2
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
        "id": "aac"
      },
      {
        "id": "flac"
      }
    ],
    "default": "wav"
  },
  {
    "key": "bitrateKbps",
    "label": "Audio Bitrate (kbps)",
    "kind": "range",
    "min": 32,
    "max": 320,
    "step": 1
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  }
]
```

</details>

### `mirelo-sfx-2.0-video-to-audio`

Mirelo SFX 2.0 (Video to Audio); input type `v2a`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `prompt` | Use SDK or MCP | No | text | maximum 2000 characters |
| `negativePrompt` | Use SDK or MCP | No | text | maximum 1000 characters |
| `preserveSpeech` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `duration` | Use SDK or MCP | No | range | 1 to 600; step 1; default `10` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `3`, `4`; default `2` |
| `format` | Use SDK or MCP | No | enum | `wav`, `mp3`, `aac`, `flac`; default `wav` |
| `bitrateKbps` | Use SDK or MCP | No | range | 32 to 320; step 1 |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 2000
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 1000
  },
  {
    "key": "preserveSpeech",
    "label": "Preserve Speech",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 1,
    "max": 600,
    "step": 1,
    "default": 10
  },
  {
    "key": "count",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 1
      },
      {
        "id": 2
      },
      {
        "id": 3
      },
      {
        "id": 4
      }
    ],
    "default": 2
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
        "id": "aac"
      },
      {
        "id": "flac"
      }
    ],
    "default": "wav"
  },
  {
    "key": "bitrateKbps",
    "label": "Audio Bitrate (kbps)",
    "kind": "range",
    "min": 32,
    "max": 320,
    "step": 1
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  }
]
```

</details>

### `mirelo-sfx-2.0-video-to-video`

Mirelo SFX 2.0 (Video to Video); input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `prompt` | Use SDK or MCP | No | text | maximum 2000 characters |
| `negativePrompt` | Use SDK or MCP | No | text | maximum 1000 characters |
| `preserveSpeech` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `duration` | Use SDK or MCP | No | range | 1 to 600; step 1; default `10` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `3`, `4`; default `2` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 2000
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 1000
  },
  {
    "key": "preserveSpeech",
    "label": "Preserve Speech",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 1,
    "max": 600,
    "step": 1,
    "default": 10
  },
  {
    "key": "count",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 1
      },
      {
        "id": 2
      },
      {
        "id": 3
      },
      {
        "id": 4
      }
    ],
    "default": 2
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
