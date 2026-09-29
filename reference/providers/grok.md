---
description: "Grok model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Grok

**Modes:** image, video, audio · **Models:** 8

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `grok-imagine-video` | Grok Imagine 1.0 | `t2v` |
| `grok-imagine-video-1.5` | Grok Imagine 1.5 | `t2v` |
| `grok-edit-video` | Grok Edit Video | `v2v` |
| `grok-extend-video` | Grok Extend Video | `v2v` |
| `grok-imagine-image` | Grok Imagine | `t2i` |
| `grok-imagine-image-quality` | Grok Imagine Quality | `t2i` |
| `grok-imagine-image-2.0` | Grok Imagine 2.0 | `t2i` |
| `grok-tts` | Grok TTS | `tts` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info grok-imagine-video --json
gen-ai validate -m grok-imagine-video --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m grok-imagine-video --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "grok-imagine-video",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `grok-imagine-video`

Grok Imagine 1.0; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4096 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | `3`, `5`, `6`, `8`, `10`, `12`, `15`; default `6` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4096
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "480p"
      },
      {
        "id": "720p"
      }
    ],
    "default": "720p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 3
      },
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 8
      },
      {
        "id": 10
      },
      {
        "id": 12
      },
      {
        "id": 15
      }
    ],
    "default": 6
  },
  {
    "key": "imageUrls",
    "label": "Start Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `grok-imagine-video-1.5`

Grok Imagine 1.5; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4096 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `3:2`, `2:3`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`; default `720p` |
| `duration` | `--duration` | No | enum | `3`, `5`, `6`, `8`, `10`, `12`, `15`; default `8` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4096
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "480p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "720p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 3
      },
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 8
      },
      {
        "id": 10
      },
      {
        "id": 12
      },
      {
        "id": 15
      }
    ],
    "default": 8
  },
  {
    "key": "imageUrls",
    "label": "Input Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `grok-edit-video`

Grok Edit Video; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4096 characters |
| `videoUrl` | `--video` | Yes | file | video input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4096
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 8
  }
]
```

</details>

### `grok-extend-video`

Grok Extend Video; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4096 characters |
| `duration` | `--duration` | No | enum | `3`, `5`, `6`, `8`, `10`; default `6` |
| `videoUrl` | `--video` | Yes | file | video input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4096
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 3
      },
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 8
      },
      {
        "id": 10
      }
    ],
    "default": 6
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  }
]
```

</details>

### `grok-imagine-image`

Grok Imagine; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 8000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | 13 choices; see descriptor below; default `1:1` |
| `resolution` | `--resolution` | No | enum | `1k`, `2k`; default `1k` |
| `count` | `--count` | No | enum | `1`, `2`, `4`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 8000
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1:1"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "2:1"
      },
      {
        "id": "1:2"
      },
      {
        "id": "19.5:9"
      },
      {
        "id": "9:19.5"
      },
      {
        "id": "20:9"
      },
      {
        "id": "9:20"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1k"
      },
      {
        "id": "2k"
      }
    ],
    "default": "1k"
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
        "id": 4
      }
    ],
    "default": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `grok-imagine-image-quality`

Grok Imagine Quality; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 8000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | 13 choices; see descriptor below; default `1:1` |
| `resolution` | `--resolution` | No | enum | `1k`, `2k`; default `2k` |
| `count` | `--count` | No | enum | `1`, `2`, `4`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 8000
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1:1"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "2:1"
      },
      {
        "id": "1:2"
      },
      {
        "id": "19.5:9"
      },
      {
        "id": "9:19.5"
      },
      {
        "id": "20:9"
      },
      {
        "id": "9:20"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1k"
      },
      {
        "id": "2k"
      }
    ],
    "default": "2k"
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
        "id": 4
      }
    ],
    "default": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `grok-imagine-image-2.0`

Grok Imagine 2.0; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 8000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | 13 choices; see descriptor below; default `1:1` |
| `resolution` | `--resolution` | No | enum | `1k`, `2k`; default `1k` |
| `quality` | `--quality` | No | enum | `low`, `medium`; default `medium` |
| `count` | `--count` | No | enum | `1`, `2`, `4`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 8000
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1:1"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "2:1"
      },
      {
        "id": "1:2"
      },
      {
        "id": "19.5:9"
      },
      {
        "id": "9:19.5"
      },
      {
        "id": "20:9"
      },
      {
        "id": "9:20"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1k"
      },
      {
        "id": "2k"
      }
    ],
    "default": "1k"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "low"
      },
      {
        "id": "medium"
      }
    ],
    "default": "medium"
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
        "id": 4
      }
    ],
    "default": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `grok-tts`

Grok TTS; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | `--language` | No | text | Text |
| `accent` | `--accent` | No | text | Text |
| `prompt` | `--prompt` | Yes | text | maximum 15000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `eve` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "accent",
    "label": "Accent",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 15000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "x-ai/v1/catalog/voices"
    },
    "default": "eve"
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
