---
description: "Happy Horse model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Happy Horse

**Modes:** video · **Models:** 5

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `happyhorse-1.0-t2v` | Happy Horse 1.0 | `t2v` |
| `happyhorse-1.0-r2v` | Happy Horse 1.0 Ref-to-Video | `i2v` |
| `happyhorse-1.0-video-edit` | Happy Horse 1.0 Video Edit | `v2v` |
| `happyhorse-1.1-t2v` | Happy Horse 1.1 | `t2v` |
| `happyhorse-1.1-r2v` | Happy Horse 1.1 Ref-to-Video | `i2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info happyhorse-1.0-t2v --json
gen-ai validate -m happyhorse-1.0-t2v --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m happyhorse-1.0-t2v --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "happyhorse-1.0-t2v",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `happyhorse-1.0-t2v`

Happy Horse 1.0; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `duration` | `--duration` | No | range | 3 to 15; step 1; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 3,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image"
  }
]
```

</details>

### `happyhorse-1.0-r2v`

Happy Horse 1.0 Ref-to-Video; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `duration` | `--duration` | No | range | 3 to 15; step 1; default `5` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 9 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 3,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 9
    }
  }
]
```

</details>

### `happyhorse-1.0-video-edit`

Happy Horse 1.0 Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `audioSetting` | `--audio-setting` | No | enum | `auto`, `origin`; default `auto` |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 5 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "audioSetting",
    "label": "Audio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
      {
        "id": "origin"
      }
    ],
    "default": "auto"
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 5
    }
  }
]
```

</details>

### `happyhorse-1.1-t2v`

Happy Horse 1.1; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `duration` | `--duration` | No | range | 3 to 15; step 1; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 3,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image"
  }
]
```

</details>

### `happyhorse-1.1-r2v`

Happy Horse 1.1 Ref-to-Video; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `duration` | `--duration` | No | range | 3 to 15; step 1; default `5` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 9 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 3,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 9
    }
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
