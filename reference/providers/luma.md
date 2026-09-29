---
description: "Luma model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Luma

**Modes:** image, video · **Models:** 9

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `luma-ray-2` | Luma Ray 2 | `t2v` |
| `luma-ray-flash-2` | Luma Flash 2 | `i2v` |
| `luma-ray-2-reframe-video` | Luma Ray 2 Reframe | `v2v` |
| `luma-ray-flash-2-reframe-video` | Luma Flash 2 Reframe | `v2v` |
| `luma-uni-1` | Luma UNI-1 | `t2i` |
| `luma-uni-1-max` | Luma UNI-1 Max | `t2i` |
| `luma-ray-3.2` | Luma Ray 3.2 | `t2v` |
| `luma-ray-3.2-edit` | Luma Ray 3.2 Edit | `v2v` |
| `luma-ray-3.2-reframe-video` | Luma Ray 3.2 Reframe | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info luma-ray-2 --json
gen-ai validate -m luma-ray-2 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m luma-ray-2 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "luma-ray-2",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `luma-ray-2`

Luma Ray 2; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `9:21`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `540p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | `5`, `9`; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
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
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "4k"
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
        "id": 5
      },
      {
        "id": 9
      }
    ],
    "default": 5
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image"
  }
]
```

</details>

### `luma-ray-flash-2`

Luma Flash 2; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `9:21`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `540p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | `5`, `9`; default `5` |
| `startFrame` | `--start-frame` | Yes | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
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
        "id": "540p"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "4k"
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
        "id": 5
      },
      {
        "id": 9
      }
    ],
    "default": 5
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image"
  }
]
```

</details>

### `luma-ray-2-reframe-video`

Luma Ray 2 Reframe; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `9:21`; default `16:9` |
| `videoUrl` | `--video` | Yes | file | video input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 5000
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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "16:9"
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

### `luma-ray-flash-2-reframe-video`

Luma Flash 2 Reframe; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `9:21`; default `16:9` |
| `videoUrl` | `--video` | Yes | file | video input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 5000
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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "16:9"
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

### `luma-uni-1`

Luma UNI-1; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `3:1`, `2:1`, `16:9`, `3:2`, `1:1`, `2:3`, `9:16`, `1:2`, `1:3`; default `1:1` |
| `style` | `--style` | No | enum | `auto`, `manga`; default `auto` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |

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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "3:1"
      },
      {
        "id": "2:1"
      },
      {
        "id": "16:9"
      },
      {
        "id": "3:2"
      },
      {
        "id": "1:1"
      },
      {
        "id": "2:3"
      },
      {
        "id": "9:16"
      },
      {
        "id": "1:2"
      },
      {
        "id": "1:3"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto",
        "label": "Auto"
      },
      {
        "id": "manga",
        "label": "Manga"
      }
    ],
    "default": "auto"
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
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

### `luma-uni-1-max`

Luma UNI-1 Max; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `3:1`, `2:1`, `16:9`, `3:2`, `1:1`, `2:3`, `9:16`, `1:2`, `1:3`; default `1:1` |
| `style` | `--style` | No | enum | `auto`, `manga`; default `auto` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |

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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "3:1"
      },
      {
        "id": "2:1"
      },
      {
        "id": "16:9"
      },
      {
        "id": "3:2"
      },
      {
        "id": "1:1"
      },
      {
        "id": "2:3"
      },
      {
        "id": "9:16"
      },
      {
        "id": "1:2"
      },
      {
        "id": "1:3"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto",
        "label": "Auto"
      },
      {
        "id": "manga",
        "label": "Manga"
      }
    ],
    "default": "auto"
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
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

### `luma-ray-3.2`

Luma Ray 3.2; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `9:16`, `3:4`, `1:1`, `4:3`, `16:9`, `21:9`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `540p`, `720p`, `1080p`; default `720p` |
| `duration` | `--duration` | No | enum | `5`, `10`; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `hdr` | `--hdr` | No | boolean | true or false; default `false` |
| `exrExport` | `--exr-export` | No | boolean | true or false; default `false` |
| `loop` | `--loop` | No | boolean | true or false; default `false` |

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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "9:16"
      },
      {
        "id": "3:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:3"
      },
      {
        "id": "16:9"
      },
      {
        "id": "21:9"
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
        "id": "540p"
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
        "id": 5
      },
      {
        "id": 10
      }
    ],
    "default": 5
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "hdr",
    "label": "HDR",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "exrExport",
    "label": "EXR Export",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "loop",
    "label": "Loop",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

### `luma-ray-3.2-edit`

Luma Ray 3.2 Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `videoUrl` | `--video` | Yes | file | video input |
| `resolution` | `--resolution` | No | enum | `540p`, `720p`, `1080p`; default `720p` |
| `duration` | `--duration` | No | enum | `5`, `10`; default `5` |
| `editStrength` | `--edit-strength` | No | enum | `adhere_1`, `adhere_2`, `adhere_3`, `flex_1`, `flex_2`, `flex_3`, `reimagine_1`, `reimagine_2`, `reimagine_3`; default `flex_2` |
| `hdr` | `--hdr` | No | boolean | true or false; default `false` |
| `exrExport` | `--exr-export` | No | boolean | true or false; default `false` |

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
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 30
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
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
    "default": "720p"
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
        "id": 10
      }
    ],
    "default": 5
  },
  {
    "key": "editStrength",
    "label": "Edit Strength",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "adhere_1",
        "label": "Adhere 1"
      },
      {
        "id": "adhere_2",
        "label": "Adhere 2"
      },
      {
        "id": "adhere_3",
        "label": "Adhere 3"
      },
      {
        "id": "flex_1",
        "label": "Flex 1"
      },
      {
        "id": "flex_2",
        "label": "Flex 2"
      },
      {
        "id": "flex_3",
        "label": "Flex 3"
      },
      {
        "id": "reimagine_1",
        "label": "Reimagine 1"
      },
      {
        "id": "reimagine_2",
        "label": "Reimagine 2"
      },
      {
        "id": "reimagine_3",
        "label": "Reimagine 3"
      }
    ],
    "default": "flex_2"
  },
  {
    "key": "hdr",
    "label": "HDR",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "exrExport",
    "label": "EXR Export",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

### `luma-ray-3.2-reframe-video`

Luma Ray 3.2 Reframe; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `9:16`, `3:4`, `1:1`, `4:3`, `16:9`, `21:9`; default `16:9` |
| `videoUrl` | `--video` | Yes | file | video input |
| `resolution` | `--resolution` | No | enum | `540p`, `720p`, `1080p`; default `720p` |

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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "9:16"
      },
      {
        "id": "3:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:3"
      },
      {
        "id": "16:9"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 30
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
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
    "default": "720p"
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
