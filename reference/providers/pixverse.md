---
description: "PixVerse model IDs, parameters, and CLI and MCP usage on Picsart."
---

# PixVerse

**Modes:** video · **Models:** 6

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `pixverse-v6` | PixVerse V6 | `t2v` |
| `pixverse-v6-image` | PixVerse V6 Image | `i2v` |
| `pixverse-v6-fusion` | PixVerse V6 Fusion | `i2v` |
| `pixverse-c1` | PixVerse C1 | `t2v` |
| `pixverse-c1-image` | PixVerse C1 Image | `i2v` |
| `pixverse-c1-fusion` | PixVerse C1 Fusion | `i2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info pixverse-v6 --json
gen-ai validate -m pixverse-v6 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m pixverse-v6 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "pixverse-v6",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `pixverse-v6`

PixVerse V6; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `2:3`, `3:2`, `21:9`; default `16:9` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
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
        "id": "4:3"
      },
      {
        "id": "1:1"
      },
      {
        "id": "3:4"
      },
      {
        "id": "9:16"
      },
      {
        "id": "2:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  }
]
```

</details>

### `pixverse-v6-image`

PixVerse V6 Image; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `pixverse-v6-fusion`

PixVerse V6 Fusion; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `2:3`, `3:2`, `21:9`; default `16:9` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 7 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
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
        "id": "4:3"
      },
      {
        "id": "1:1"
      },
      {
        "id": "3:4"
      },
      {
        "id": "9:16"
      },
      {
        "id": "2:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 7
    }
  }
]
```

</details>

### `pixverse-c1`

PixVerse C1; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `2:3`, `3:2`, `21:9`; default `16:9` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
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
        "id": "4:3"
      },
      {
        "id": "1:1"
      },
      {
        "id": "3:4"
      },
      {
        "id": "9:16"
      },
      {
        "id": "2:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  }
]
```

</details>

### `pixverse-c1-image`

PixVerse C1 Image; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  }
]
```

</details>

### `pixverse-c1-fusion`

PixVerse C1 Fusion; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `quality` | `--quality` | No | enum | `360p`, `540p`, `720p`, `1080p`; default `540p` |
| `duration` | `--duration` | No | enum | `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `2:3`, `3:2`, `21:9`; default `16:9` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 7 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "360p"
      },
      {
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "540p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 6
      },
      {
        "id": 7
      },
      {
        "id": 8
      },
      {
        "id": 9
      },
      {
        "id": 10
      },
      {
        "id": 11
      },
      {
        "id": 12
      },
      {
        "id": 13
      },
      {
        "id": 14
      },
      {
        "id": 15
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
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
        "id": "4:3"
      },
      {
        "id": "1:1"
      },
      {
        "id": "3:4"
      },
      {
        "id": "9:16"
      },
      {
        "id": "2:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 7
    }
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
