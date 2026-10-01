---
description: "Flux model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Flux

**Modes:** image, video · **Models:** 8

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `flux-2-pro` | Flux 2 Pro | `t2i` |
| `flux-2-max` | Flux 2 Max | `t2i` |
| `flux-2-flex` | Flux 2 Flex | `t2i` |
| `flux-kontext-max` | Flux Kontext Max | `t2i` |
| `flux-kontext-pro` | Flux Kontext Pro | `t2i` |
| `flux-3-video` | Flux 3 Video | `t2v` |
| `flux-video-upscale` | Flux Video Upscale | `v2v` |
| `flux-video-edit` | FLUX Video Edit | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info flux-2-pro --json
gen-ai validate -m flux-2-pro --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m flux-2-pro --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `flux-2-pro`

Flux 2 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`; default `4:3` |
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 4 |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "4:3"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1K"
      },
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "1K"
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
    "default": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 4
    }
  }
]
```

</details>

### `flux-2-max`

Flux 2 Max; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`; default `1:1` |
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
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
        "id": "1K"
      },
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "1K"
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

### `flux-2-flex`

Flux 2 Flex; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`; default `3:4` |
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "3:4"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1K"
      },
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "1K"
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

### `flux-kontext-max`

Flux Kontext Max; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 4 |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "1:1"
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
    "default": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 4
    }
  }
]
```

</details>

### `flux-kontext-pro`

Flux Kontext Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`, `21:9`, `9:21`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

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
        "id": "21:9"
      },
      {
        "id": "9:21"
      }
    ],
    "default": "1:1"
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

### `flux-3-video`

Flux 3 Video; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `auto`, `21:9`, `2:1`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `auto` |
| `resolution` | `--resolution` | No | enum | `hd`, `fhd`; default `hd` |
| `duration` | `--duration` | No | enum | `auto`, `5`, `10`, `15`, `20`; default `auto` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |
| `videoUrl` | `--video` | No | file | video input |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `safetyTolerance` | `--safety-tolerance` | No | range | 0 to 4; default `2` |
| `draft` | `--draft` | No | boolean | true or false; default `false` |

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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
      {
        "id": "21:9"
      },
      {
        "id": "2:1"
      },
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
      }
    ],
    "default": "auto"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "hd"
      },
      {
        "id": "fhd"
      }
    ],
    "default": "hd"
  },
  {
    "key": "duration",
    "label": "Duration",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
      {
        "id": "5"
      },
      {
        "id": "10"
      },
      {
        "id": "15"
      },
      {
        "id": "20"
      }
    ],
    "default": "auto"
  },
  {
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "videoUrl",
    "label": "Start Video",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 15
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "safetyTolerance",
    "label": "Safety Tolerance",
    "kind": "range",
    "min": 0,
    "max": 4,
    "default": 2
  },
  {
    "key": "draft",
    "label": "Draft",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

### `flux-video-upscale`

Flux Video Upscale; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | `--video` | Yes | file | video input |
| `upscaleFactor` | `--upscale-factor` | No | range | 1.5 to 3; step 0.5; default `2` |
| `creativity` | `--creativity` | No | enum | `0`, `1`; default `1` |
| `prompt` | `--prompt` | No | text | Text |
| `safetyTolerance` | `--safety-tolerance` | No | range | 0 to 4; default `2` |

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
    "accept": "video",
    "maxDurationSec": 20,
    "maxShortSidePixels": 1440,
    "maxBytes": 52428800
  },
  {
    "key": "upscaleFactor",
    "label": "Upscale Factor",
    "kind": "range",
    "min": 1.5,
    "max": 3,
    "step": 0.5,
    "default": 2
  },
  {
    "key": "creativity",
    "label": "Creativity",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 0,
        "label": "Precise"
      },
      {
        "id": 1,
        "label": "Creative"
      }
    ],
    "default": 1
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text"
  },
  {
    "key": "safetyTolerance",
    "label": "Safety Tolerance",
    "kind": "range",
    "min": 0,
    "max": 4,
    "default": 2
  }
]
```

</details>

### `flux-video-edit`

FLUX Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `prompt` | Use SDK or MCP | Yes | text | maximum 4096 characters |
| `safetyTolerance` | Use SDK or MCP | No | range | 0 to 4; default `2` |

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
    "accept": "video",
    "maxDurationSec": 15,
    "maxBytes": 52428800
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4096
  },
  {
    "key": "safetyTolerance",
    "label": "Safety Tolerance",
    "kind": "range",
    "min": 0,
    "max": 4,
    "default": 2
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
