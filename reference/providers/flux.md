---
description: "Flux model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Flux

**Modes:** image, video · **Models:** 10

This reference uses the current catalog export fetched with `@picsart/ai-sdk 7.0.0`. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| id | Name | Input type | Notes |
|---|---|---|---|
| `flux-2-pro` | Flux 2 Pro | `t2i` | Multi-image input, up to 4K |
| `flux-2-max` | Flux 2 Max | `t2i` | Detailed compositions |
| `flux-2-flex` | Flux 2 Flex | `t2i` | Varied styles, up to 4K |
| `flux-kontext-max` | Flux Kontext Max | `t2i` | Edit with up to 4 references |
| `flux-kontext-pro` | Flux Kontext Pro | `t2i` | Edit with one reference |
| `flux-3-image` | Flux 3 Image | `t2i` | Generate and edit with up to 10 references, up to 4K |
| `flux-3-image-klein` | Flux 3 Image Klein | `t2i` | Distilled, faster Flux 3 Image with a steps control, up to 4K |
| `flux-3-video` | Flux 3 Video | `t2v` | Video with synchronized audio |
| `flux-video-upscale` | Flux 3 Video Upscale | `v2v` | Upscale video by 1.5x–3x |
| `flux-video-edit` | FLUX Video Edit | `v2v` | Edit video with a text instruction |

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

Parameters come from the SDK catalog export. CLI support depends on the installed release; inspect the model and command help before using a listed flag.

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

### `flux-3-image`

Flux 3 Image; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `aspectRatio` | Use SDK or MCP | No | enum | 16 choices; see descriptor below; default `auto` |
| `resolution` | Use SDK or MCP | No | enum | `768sq`, `1k`, `1.5k`, `2k`, `4k`; default `1k` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 10 |
| `safetyTolerance` | Use SDK or MCP | No | range | 0 to 4; default `2` |

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
        "id": "3:2"
      },
      {
        "id": "7:5"
      },
      {
        "id": "4:3"
      },
      {
        "id": "5:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:5"
      },
      {
        "id": "3:4"
      },
      {
        "id": "5:7"
      },
      {
        "id": "2:3"
      },
      {
        "id": "9:16"
      },
      {
        "id": "9:21"
      },
      {
        "id": "1:2"
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
        "id": "768sq"
      },
      {
        "id": "1k"
      },
      {
        "id": "1.5k"
      },
      {
        "id": "2k"
      },
      {
        "id": "4k"
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
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
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

### `flux-3-image-klein`

Flux 3 Image Klein; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `aspectRatio` | Use SDK or MCP | No | enum | 16 choices; see descriptor below; default `auto` |
| `resolution` | Use SDK or MCP | No | enum | `768sq`, `1k`, `1.5k`, `2k`, `4k`; default `1k` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 10 |
| `steps` | Use SDK or MCP | No | range | 1 to 16; default `16` |
| `safetyTolerance` | Use SDK or MCP | No | range | 0 to 7; default `2` |

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
        "id": "3:2"
      },
      {
        "id": "7:5"
      },
      {
        "id": "4:3"
      },
      {
        "id": "5:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "4:5"
      },
      {
        "id": "3:4"
      },
      {
        "id": "5:7"
      },
      {
        "id": "2:3"
      },
      {
        "id": "9:16"
      },
      {
        "id": "9:21"
      },
      {
        "id": "1:2"
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
        "id": "768sq"
      },
      {
        "id": "1k"
      },
      {
        "id": "1.5k"
      },
      {
        "id": "2k"
      },
      {
        "id": "4k"
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
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "steps",
    "label": "Steps",
    "kind": "range",
    "min": 1,
    "max": 16,
    "default": 16
  },
  {
    "key": "safetyTolerance",
    "label": "Safety Tolerance",
    "kind": "range",
    "min": 0,
    "max": 7,
    "default": 2
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

Flux 3 Video Upscale; input type `v2v`.

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

### `flux-3-max`: Flux 3 Max

[Try `flux-3-max` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-max)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | range | `5`–`20`, step 1 (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `reasoningLevel` | `--reasoning-level` | enum | `low` · `high` (default `high`) |
| `seed` | `--seed` | range | `-1`–`2147483647` (default `-1`) |

### `flux-3-max-keyframes`: Flux 3 Max Keyframes

[Try `flux-3-max-keyframes` in Playground ↗](https://picsart.com/ai-playground/?model=flux-3-max-keyframes)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | **required** image (up to 10) |
| `aspectRatio` | `--ar` | enum | `auto` · `21:9` · `2:1` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `16:9`) |
| `resolution` | `-r` | enum | `720p` · `1080p` (default `720p`) |
| `duration` | `-d` | range | `5`–`20`, step 1 (default `5`) |
| `generateAudio` | `--audio-gen` | boolean | `true` · `false` (default `true`) |
| `reasoningLevel` | `--reasoning-level` | enum | `low` · `high` (default `high`) |
| `seed` | `--seed` | range | `-1`–`2147483647` (default `-1`) |

## Pricing

```bash
gen-ai pricing flux-2-pro
```

Cost scales with **resolution/quality** and the **number of outputs** (`count`).
