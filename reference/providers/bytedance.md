---
description: "ByteDance model IDs, parameters, and CLI and MCP usage on Picsart."
---

# ByteDance

**Modes:** image, video, audio · **Models:** 22

This reference uses the `@picsart/ai-sdk 6.48.1` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |
| `bytedance-omnihuman-v2.0` | ByteDance OmniHuman 2.0 | `i2v` |
| `bytedance-video-enhance` | ByteDance Video Enhance | `v2v` |
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
| `seedream-5.0-flash` | Seedream 5.0 Flash | `t2i` |
| `seedream-5.0-pro` | Seedream 5.0 Pro | `t2i` |
| `seedream-5.0-lite` | Seedream 5.0 Lite | `t2i` |
| `seedream-4.7` | Seedream 4.7 | `t2i` |
| `seedream-4.5` | Seedream 4.5 | `t2i` |
| `seed-audio-1.0-multilingual` | Seed Audio Multilingual | `tts` |
| `seed-audio-1.0` | Seed Audio | `tts` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info bytedance-omnihuman-v1.5 --json
gen-ai validate -m bytedance-omnihuman-v1.5 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m bytedance-omnihuman-v1.5 --prompt "A quiet forest at sunrise" --image "https://example.com/input.jpg" --audio "https://example.com/input.mp3" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "bytedance-omnihuman-v1.5",
    "prompt": "A quiet forest at sunrise",
    "async": true,
    "imageUrls": [
      "https://example.com/input.jpg"
    ],
    "extra": {
      "audioUrl": "https://example.com/input.mp3"
    }
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `bytedance-omnihuman-v1.5`

ByteDance OmniHuman; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 300 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`; default `1080p` |
| `turboMode` | `--turbo-mode` | No | boolean | true or false; default `false` |
| `seed` | `--seed` | No | range | -1 to 2147483647; default `-1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 300
  },
  {
    "key": "imageUrls",
    "label": "Portrait Image",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
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
    "key": "turboMode",
    "label": "Turbo Mode",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  }
]
```

</details>

### `bytedance-omnihuman-v2.0`

ByteDance OmniHuman 2.0; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | No | text | Text |
| `imageUrls` | Use SDK or MCP | Yes | file | image input; array; maximum 4 |
| `audioUrl` | Use SDK or MCP | Yes | file | audio input |
| `enableWatermark` | Use SDK or MCP | No | boolean | true or false; default `true` |

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
    "key": "imageUrls",
    "label": "Source Image(s)",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 4
    }
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "enableWatermark",
    "label": "Watermark",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `bytedance-video-enhance`

ByteDance Video Enhance; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | `--video` | Yes | file | video input |
| `quality` | `--quality` | No | enum | `standard`, `professional`; default `standard` |
| `resolution` | `--resolution` | No | enum | `source`, `720p`, `1080p`, `2k`, `4k`, `8k`; default `source` |
| `fps` | `--fps` | No | enum | `30`, `60`, `120`; default `30` |
| `scene` | `--scene` | No | enum | `common`, `ugc`, `short_series`, `aigc`, `old_film`; default `common` |
| `bitrateLevel` | `--bitrate-level` | No | enum | `low`, `medium`, `high`; default `medium` |

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
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "standard"
      },
      {
        "id": "professional"
      }
    ],
    "default": "standard"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "source"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "2k"
      },
      {
        "id": "4k"
      },
      {
        "id": "8k"
      }
    ],
    "default": "source"
  },
  {
    "key": "fps",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 30
      },
      {
        "id": 60
      },
      {
        "id": 120
      }
    ],
    "default": 30
  },
  {
    "key": "scene",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "common"
      },
      {
        "id": "ugc"
      },
      {
        "id": "short_series"
      },
      {
        "id": "aigc"
      },
      {
        "id": "old_film"
      }
    ],
    "default": "common"
  },
  {
    "key": "bitrateLevel",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "medium"
  }
]
```

</details>

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
| `omniReferenceTaskType` | Use SDK or MCP | No | enum | `auto`, `reference`, `edit`, `extend`; default `auto` |
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
    "key": "omniReferenceTaskType",
    "label": "Task Type",
    "required": false,
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto",
        "label": "Auto"
      },
      {
        "id": "reference",
        "label": "Reference"
      },
      {
        "id": "edit",
        "label": "Edit"
      },
      {
        "id": "extend",
        "label": "Extend"
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
    "minDurationSec": 4,
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

### `seedream-5.0-flash`

Seedream 5.0 Flash; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | Use SDK or MCP | No | enum | `1K`, `2K`; default `1K` |
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `aspectRatio` | Use SDK or MCP | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 10 |
| `negativePrompt` | Use SDK or MCP | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
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
      }
    ],
    "default": "1K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-5.0-pro`

Seedream 5.0 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `1K`, `2K`; default `1K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
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
      }
    ],
    "default": "1K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-5.0-lite`

Seedream 5.0 Lite; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `2K`, `3K`; default `2K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2K"
      },
      {
        "id": "3K"
      }
    ],
    "default": "2K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-4.7`

Seedream 4.7; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-4.5`

Seedream 4.5; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `2K`, `4K`; default `2K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "2K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

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
