---
description: "Seedance model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Seedance

**Modes:** video · **Models:** 12

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `seedance-2.5` | Seedance 2.5 | `t2v` |
| `seedance-2.5-video-edit` | Seedance 2.5 Video Edit | `v2v` |
| `seedance-2.5-video-extend` | Seedance 2.5 Video Extend | `v2v` |
| `seedance-2.0` | Seedance 2.0 | `t2v` |
| `seedance-2.0-fast` | Seedance 2.0 Fast | `t2v` |
| `seedance-2.0-mini` | Seedance 2.0 Mini | `t2v` |
| `seedance-2.0-video-edit` | Seedance 2.0 Video Edit | `v2v` |
| `seedance-2.0-fast-video-edit` | Seedance 2.0 Fast Video Edit | `v2v` |
| `seedance-2.0-mini-video-edit` | Seedance 2.0 Mini Video Edit | `v2v` |
| `seedance-2.0-video-extend` | Seedance 2.0 Video Extend | `v2v` |
| `seedance-2.0-fast-video-extend` | Seedance 2.0 Fast Video Extend | `v2v` |
| `seedance-2.0-mini-video-extend` | Seedance 2.0 Mini Video Extend | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info seedance-2.5 --json
gen-ai validate -m seedance-2.5 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m seedance-2.5 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "seedance-2.5",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `seedance-2.5`

Seedance 2.5; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`; default `1080p` |
| `duration` | `--duration` | No | enum | 28 choices; see descriptor below; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `outputFormat` | `--output-format` | No | enum | `mp4`, `mov`; default `mp4` |
| `colorDepth` | Use SDK or MCP | No | enum | `10bit`, `8bit`; default `10bit` |
| `draft` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `draftTask` | Use SDK or MCP | No | object | Structured input; see descriptor below |
| `imageUrls` | `--image` | No | file | image input; array; maximum 30 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 10 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 10 |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text"
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
        "id": "adaptive"
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
    "default": "1080p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
      },
      {
        "id": 16
      },
      {
        "id": 17
      },
      {
        "id": 18
      },
      {
        "id": 19
      },
      {
        "id": 20
      },
      {
        "id": 21
      },
      {
        "id": 22
      },
      {
        "id": 23
      },
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 26
      },
      {
        "id": 27
      },
      {
        "id": 28
      },
      {
        "id": 29
      },
      {
        "id": 30
      }
    ],
    "default": 5
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp4"
      },
      {
        "id": "mov"
      }
    ],
    "default": "mp4"
  },
  {
    "key": "colorDepth",
    "label": "Color Depth",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "10bit"
      },
      {
        "id": "8bit"
      }
    ],
    "default": "10bit"
  },
  {
    "key": "draft",
    "label": "Draft",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "draftTask",
    "label": "Draft",
    "required": false,
    "kind": "object",
    "fields": {
      "id": {
        "kind": "text"
      },
      "video_input": {
        "kind": "boolean",
        "default": false
      },
      "signature": {
        "kind": "text"
      }
    }
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 30
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 10
    },
    "maxDurationSec": 30,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  },
  {
    "key": "audioUrls",
    "label": "Reference Audios",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "audio",
    "array": {
      "max": 10
    },
    "maxDurationSec": 30,
    "minDurationSec": 1.8,
    "maxBytes": 15728640
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.5-video-edit`

Seedance 2.5 Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `adaptive`; default `adaptive` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`; default `1080p` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `outputFormat` | `--output-format` | No | enum | `mp4`, `mov`; default `mp4` |
| `colorDepth` | Use SDK or MCP | No | enum | `10bit`, `8bit`; default `10bit` |
| `draft` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 30 |

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
        "id": "adaptive"
      }
    ],
    "default": "adaptive"
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
    "default": "1080p"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp4"
      },
      {
        "id": "mov"
      }
    ],
    "default": "mp4"
  },
  {
    "key": "colorDepth",
    "label": "Color Depth",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "10bit"
      },
      {
        "id": "8bit"
      }
    ],
    "default": "10bit"
  },
  {
    "key": "draft",
    "label": "Draft",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 30,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 30
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.5-video-extend`

Seedance 2.5 Video Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `adaptive`; default `adaptive` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`; default `1080p` |
| `duration` | `--duration` | No | enum | 28 choices; see descriptor below; default `15` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `outputFormat` | `--output-format` | No | enum | `mp4`, `mov`; default `mp4` |
| `colorDepth` | Use SDK or MCP | No | enum | `10bit`, `8bit`; default `10bit` |
| `draft` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `videoUrls` | `--video-urls` | Yes | file | video input; array; maximum 10 |

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
        "id": "adaptive"
      }
    ],
    "default": "adaptive"
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
    "default": "1080p"
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
      },
      {
        "id": 16
      },
      {
        "id": 17
      },
      {
        "id": 18
      },
      {
        "id": 19
      },
      {
        "id": 20
      },
      {
        "id": 21
      },
      {
        "id": 22
      },
      {
        "id": 23
      },
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 26
      },
      {
        "id": 27
      },
      {
        "id": 28
      },
      {
        "id": 29
      },
      {
        "id": 30
      }
    ],
    "default": 15
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp4"
      },
      {
        "id": "mov"
      }
    ],
    "default": "mp4"
  },
  {
    "key": "colorDepth",
    "label": "Color Depth",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "10bit"
      },
      {
        "id": "8bit"
      }
    ],
    "default": "10bit"
  },
  {
    "key": "draft",
    "label": "Draft",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "videoUrls",
    "label": "Source Videos",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 10
    },
    "maxDurationSec": 30,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  }
]
```

</details>

### `seedance-2.0`

Seedance 2.0; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `10` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 3 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
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
    "kind": "text"
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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 10
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxBytes": 15728640
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-fast`

Seedance 2.0 Fast; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `10` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 3 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
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
    "kind": "text"
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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 10
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxBytes": 15728640
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-mini`

Seedance 2.0 Mini; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `10` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 3 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
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
    "kind": "text"
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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 10
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxBytes": 15728640
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minPixels": 90000,
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-video-edit`

Seedance 2.0 Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-fast-video-edit`

Seedance 2.0 Fast Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-mini-video-edit`

Seedance 2.0 Mini Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `returnLastFrame` | `--return-last-frame` | No | boolean | true or false; default `false` |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": true
  },
  {
    "key": "returnLastFrame",
    "label": "Capture Last Frame",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
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
    },
    "maxPixels": 36000000,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 31457280
  }
]
```

</details>

### `seedance-2.0-video-extend`

Seedance 2.0 Video Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `15` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `videoUrls` | `--video-urls` | Yes | file | video input; array; maximum 3 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 15
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "videoUrls",
    "label": "Source Videos",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  }
]
```

</details>

### `seedance-2.0-fast-video-extend`

Seedance 2.0 Fast Video Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `15` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `videoUrls` | `--video-urls` | Yes | file | video input; array; maximum 3 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 15
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "videoUrls",
    "label": "Source Videos",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  }
]
```

</details>

### `seedance-2.0-mini-video-extend`

Seedance 2.0 Mini Video Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `21:9`, `adaptive`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `15` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `videoUrls` | `--video-urls` | Yes | file | video input; array; maximum 3 |

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
        "id": "adaptive"
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
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 4
      },
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
    "default": 15
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "videoUrls",
    "label": "Source Videos",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 3
    },
    "maxDurationSec": 15,
    "minDurationSec": 1.8,
    "maxFrameRate": 60,
    "minPixels": 407696,
    "maxPixels": 8295044,
    "minSidePixels": 300,
    "maxSidePixels": 6000,
    "minAspectRatio": 0.39,
    "maxAspectRatio": 2.5,
    "maxBytes": 209715200
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
