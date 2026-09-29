---
description: "LTX model IDs, parameters, and CLI and MCP usage on Picsart."
---

# LTX

**Modes:** video · **Models:** 9

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `ltx-v2.3-pro` | LTX 2.3 Pro | `t2v` |
| `ltx-v2.3-fast` | LTX 2.3 Fast | `t2v` |
| `ltx-2.3-a2v` | LTX 2.3 Audio-to-Video | `a2v` |
| `ltx-v2.3-extend` | LTX 2.3 Extend | `v2v` |
| `ltx-v2.3-retake` | LTX 2.3 Retake | `v2v` |
| `ltx-v2.3-reframe` | LTX 2.3 Reframe | `v2v` |
| `ltx-v2.3-outpaint` | LTX 2.3 Outpaint | `v2v` |
| `ltx-v2.5-pro` | LTX 2.5 Pro | `t2v` |
| `ltx-v2.5-fast` | LTX 2.5 Fast | `t2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info ltx-v2.3-pro --json
gen-ai validate -m ltx-v2.3-pro --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m ltx-v2.3-pro --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "ltx-v2.3-pro",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `ltx-v2.3-pro`

LTX 2.3 Pro; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `6`, `8`, `10`; default `6` |
| `resolution` | `--resolution` | No | enum | `1080p`, `1440p`, `2160p`; default `1080p` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `fps` | `--fps` | No | enum | `24`, `25`, `48`, `50`; default `25` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1080p"
      },
      {
        "id": "1440p"
      },
      {
        "id": "2160p"
      }
    ],
    "default": "1080p"
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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "fps",
    "label": "FPS",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 48
      },
      {
        "id": 50
      }
    ],
    "default": 25
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
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

### `ltx-v2.3-fast`

LTX 2.3 Fast; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `6`, `8`, `10`, `12`, `14`, `16`, `18`, `20`; default `6` |
| `resolution` | `--resolution` | No | enum | `1080p`, `1440p`, `2160p`; default `1080p` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `fps` | `--fps` | No | enum | `24`, `25`, `48`, `50`; default `25` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
        "id": 14
      },
      {
        "id": 16
      },
      {
        "id": 18
      },
      {
        "id": 20
      }
    ],
    "default": 6
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1080p"
      },
      {
        "id": "1440p"
      },
      {
        "id": "2160p"
      }
    ],
    "default": "1080p"
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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "fps",
    "label": "FPS",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 48
      },
      {
        "id": 50
      }
    ],
    "default": 25
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
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

### `ltx-2.3-a2v`

LTX 2.3 Audio-to-Video; input type `a2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `audioUrl` | `--audio` | Yes | file | audio input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `auto`, `16:9`, `9:16`; default `auto` |
| `cfgScale` | `--cfg-scale` | No | range | 1 to 50; step 1 |

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
    "key": "audioUrl",
    "label": "Audio Track",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "imageUrls",
    "label": "First Frame Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
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
        "id": "16:9"
      },
      {
        "id": "9:16"
      }
    ],
    "default": "auto"
  },
  {
    "key": "cfgScale",
    "label": "CFG Scale",
    "kind": "range",
    "min": 1,
    "max": 50,
    "step": 1
  }
]
```

</details>

### `ltx-v2.3-extend`

LTX 2.3 Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `duration` | `--duration` | No | range | 2 to 20; step 1; default `5` |
| `mode` | `--mode` | No | enum | `end`, `start`; default `end` |
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
    "key": "duration",
    "kind": "range",
    "min": 2,
    "max": 20,
    "step": 1,
    "default": 5
  },
  {
    "key": "mode",
    "label": "Extend Direction",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "end"
      },
      {
        "id": "start"
      }
    ],
    "default": "end"
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

### `ltx-v2.3-retake`

LTX 2.3 Retake; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `duration` | `--duration` | No | range | 2 to 20; step 1; default `5` |
| `retakeMode` | `--retake-mode` | No | enum | `replace_audio_and_video`, `replace_audio`, `replace_video`; default `replace_audio_and_video` |
| `startTime` | `--start-time` | No | range | 0 to 20; step 1 |
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
    "maxLength": 5000
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 2,
    "max": 20,
    "step": 1,
    "default": 5
  },
  {
    "key": "retakeMode",
    "label": "Retake Mode",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "replace_audio_and_video"
      },
      {
        "id": "replace_audio"
      },
      {
        "id": "replace_video"
      }
    ],
    "default": "replace_audio_and_video"
  },
  {
    "key": "startTime",
    "label": "Start Time (s)",
    "kind": "range",
    "min": 0,
    "max": 20,
    "step": 1
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

### `ltx-v2.3-reframe`

LTX 2.3 Reframe; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `resolution` | Use SDK or MCP | No | enum | `720p`, `1080p`; default `1080p` |
| `aspectRatio` | Use SDK or MCP | No | enum | `16:9`, `9:16`, `1:1`, `4:5`, `5:4`; default `16:9` |

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
        "id": "4:5"
      },
      {
        "id": "5:4"
      }
    ],
    "default": "16:9"
  }
]
```

</details>

### `ltx-v2.3-outpaint`

LTX 2.3 Outpaint; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 5000 characters |
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `negativePrompt` | Use SDK or MCP | No | text | Text |
| `aspectRatio` | Use SDK or MCP | No | enum | `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `9:21`; default `21:9` |
| `resolution` | Use SDK or MCP | No | enum | `480p`, `720p`, `1080p`; default `720p` |
| `numFrames` | Use SDK or MCP | No | range | 9 to 481; default `121` |
| `fps` | Use SDK or MCP | No | range | 1 to 60; default `24` |
| `sourceScale` | Use SDK or MCP | No | range | 0.25 to 1; step 0.05; default `1` |
| `videoStrength` | Use SDK or MCP | No | range | 0 to 1; step 0.05; default `1` |
| `cfgScale` | Use SDK or MCP | No | range | 1 to 20; default `1` |
| `numInferenceSteps` | Use SDK or MCP | No | range | 8 to 30; default `15` |
| `videoQuality` | Use SDK or MCP | No | enum | `low`, `medium`, `high`, `maximum`; default `high` |
| `videoWriteMode` | Use SDK or MCP | No | enum | `fast`, `balanced`, `small`; default `balanced` |
| `enhancePrompt` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `generateAudio` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `enableSafetyChecker` | Use SDK or MCP | No | boolean | true or false; default `true` |
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
    "maxLength": 5000
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "21:9"
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
      },
      {
        "id": "9:21"
      }
    ],
    "default": "21:9"
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
    "key": "numFrames",
    "label": "Frames",
    "kind": "range",
    "min": 9,
    "max": 481,
    "default": 121
  },
  {
    "key": "fps",
    "label": "FPS",
    "kind": "range",
    "min": 1,
    "max": 60,
    "default": 24
  },
  {
    "key": "sourceScale",
    "label": "Source Scale",
    "kind": "range",
    "min": 0.25,
    "max": 1,
    "step": 0.05,
    "default": 1
  },
  {
    "key": "videoStrength",
    "label": "Source Strength",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05,
    "default": 1
  },
  {
    "key": "cfgScale",
    "label": "CFG Scale",
    "kind": "range",
    "min": 1,
    "max": 20,
    "default": 1
  },
  {
    "key": "numInferenceSteps",
    "label": "Inference Steps",
    "kind": "range",
    "min": 8,
    "max": 30,
    "default": 15
  },
  {
    "key": "videoQuality",
    "label": "Video Quality",
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
      },
      {
        "id": "maximum"
      }
    ],
    "default": "high"
  },
  {
    "key": "videoWriteMode",
    "label": "Write Mode",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "fast"
      },
      {
        "id": "balanced"
      },
      {
        "id": "small"
      }
    ],
    "default": "balanced"
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "enableSafetyChecker",
    "label": "Safety Checker",
    "kind": "boolean",
    "default": true
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

### `ltx-v2.5-pro`

LTX 2.5 Pro; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 5000 characters |
| `duration` | Use SDK or MCP | No | enum | `6`, `8`, `10`; default `6` |
| `resolution` | Use SDK or MCP | No | enum | `720p`, `1080p`; default `1080p` |
| `aspectRatio` | Use SDK or MCP | No | enum | `16:9`, `9:16`; default `16:9` |
| `fps` | Use SDK or MCP | No | enum | `24`, `25`, `50`; default `25` |
| `cameraMotion` | Use SDK or MCP | No | enum | `none`, `static`, `dolly_in`, `dolly_out`, `dolly_left`, `dolly_right`, `jib_up`, `jib_down`, `focus_shift`; default `none` |
| `generateAudio` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `startFrame` | Use SDK or MCP | No | file | image input |
| `endFrame` | Use SDK or MCP | No | file | image input |

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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "fps",
    "label": "FPS",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 50
      }
    ],
    "default": 25
  },
  {
    "key": "cameraMotion",
    "label": "Camera Motion",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "none",
        "label": "None"
      },
      {
        "id": "static",
        "label": "Static"
      },
      {
        "id": "dolly_in",
        "label": "Dolly In"
      },
      {
        "id": "dolly_out",
        "label": "Dolly Out"
      },
      {
        "id": "dolly_left",
        "label": "Dolly Left"
      },
      {
        "id": "dolly_right",
        "label": "Dolly Right"
      },
      {
        "id": "jib_up",
        "label": "Jib Up"
      },
      {
        "id": "jib_down",
        "label": "Jib Down"
      },
      {
        "id": "focus_shift",
        "label": "Focus Shift"
      }
    ],
    "default": "none"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
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

### `ltx-v2.5-fast`

LTX 2.5 Fast; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 5000 characters |
| `duration` | Use SDK or MCP | No | enum | `6`, `8`, `10`, `12`, `14`, `16`, `18`, `20`; default `6` |
| `resolution` | Use SDK or MCP | No | enum | `720p`, `1080p`, `1440p`, `2160p`; default `1080p` |
| `aspectRatio` | Use SDK or MCP | No | enum | `16:9`, `9:16`; default `16:9` |
| `fps` | Use SDK or MCP | No | enum | `24`, `25`, `48`, `50`; default `25` |
| `cameraMotion` | Use SDK or MCP | No | enum | `none`, `static`, `dolly_in`, `dolly_out`, `dolly_left`, `dolly_right`, `jib_up`, `jib_down`, `focus_shift`; default `none` |
| `generateAudio` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `startFrame` | Use SDK or MCP | No | file | image input |
| `endFrame` | Use SDK or MCP | No | file | image input |

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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
        "id": 14
      },
      {
        "id": 16
      },
      {
        "id": 18
      },
      {
        "id": 20
      }
    ],
    "default": 6
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
      },
      {
        "id": "1440p"
      },
      {
        "id": "2160p"
      }
    ],
    "default": "1080p"
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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "fps",
    "label": "FPS",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 24
      },
      {
        "id": 25
      },
      {
        "id": 48
      },
      {
        "id": 50
      }
    ],
    "default": 25
  },
  {
    "key": "cameraMotion",
    "label": "Camera Motion",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "none",
        "label": "None"
      },
      {
        "id": "static",
        "label": "Static"
      },
      {
        "id": "dolly_in",
        "label": "Dolly In"
      },
      {
        "id": "dolly_out",
        "label": "Dolly Out"
      },
      {
        "id": "dolly_left",
        "label": "Dolly Left"
      },
      {
        "id": "dolly_right",
        "label": "Dolly Right"
      },
      {
        "id": "jib_up",
        "label": "Jib Up"
      },
      {
        "id": "jib_down",
        "label": "Jib Down"
      },
      {
        "id": "focus_shift",
        "label": "Focus Shift"
      }
    ],
    "default": "none"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
