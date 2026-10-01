---
description: "Kling model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Kling

**Modes:** image, video, audio · **Models:** 13

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `kling-v3` | Kling V3 | `t2v` |
| `kling-v3-turbo` | Kling V3 Turbo | `t2v` |
| `kling-v2-6` | Kling V2.6 | `t2v` |
| `kling-v3-omni` | Kling V3 Omni | `t2v` |
| `kling-video-o1` | Kling Video O1 | `t2v` |
| `kling-motion-control-v3` | Kling Motion Control V3 | `i2v` |
| `kling-motion-control` | Kling Motion Control 2.6 | `i2v` |
| `kling-avatar` | Kling Avatar | `i2v` |
| `kling-3.0-image` | Kling 3.0 Image | `t2i` |
| `kling-o1-image` | Kling O1 Image | `t2i` |
| `kling-video-effects` | Kling Video Effects | `i2v` |
| `kling-t2a` | Kling T2A | `t2a` |
| `kling-v2a` | Kling V2A | `v2a` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info kling-v3 --json
gen-ai validate -m kling-v3 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m kling-v3 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "kling-v3",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `kling-v3`

Kling V3; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`; default `16:9` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `multiShot` | `--multi-shot` | No | boolean | true or false; default `false` |
| `shotType` | `--shot-type` | No | enum | `customize`, `intelligence`; default `customize` |
| `multiPrompt` | `--multi-prompt-index`, `--multi-prompt-prompt`, `--multi-prompt-duration` | No | object | Structured input; see descriptor below; array; maximum 6 |
| `voiceList` | `--voice-list` | No | object | Structured input; see descriptor below; array; maximum 2 |
| `elementList` | `--element-list` | No | object | Structured input; see descriptor below; array; maximum 3 |
| `renderingSpeed` | `--rendering-speed` | No | enum | `std`, `pro`, `4k`; default `4k` |

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
      }
    ],
    "default": "16:9"
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
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "multiShot",
    "label": "Multi-Shot Mode",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "shotType",
    "label": "Shot Segmentation",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "customize",
        "label": "Customize"
      },
      {
        "id": "intelligence",
        "label": "AI Auto"
      }
    ],
    "default": "customize"
  },
  {
    "key": "multiPrompt",
    "label": "Multi-Shot Prompts",
    "kind": "object",
    "array": {
      "max": 6
    },
    "fields": {
      "index": {
        "kind": "range",
        "min": 0,
        "max": 5,
        "default": 0
      },
      "prompt": {
        "kind": "text",
        "maxLength": 512
      },
      "duration": {
        "kind": "text"
      }
    }
  },
  {
    "key": "voiceList",
    "label": "Voice References",
    "kind": "object",
    "array": {
      "max": 2
    },
    "fields": {
      "voice_id": {
        "kind": "text"
      }
    }
  },
  {
    "key": "elementList",
    "label": "Element References",
    "kind": "object",
    "array": {
      "max": 3
    },
    "fields": {
      "element_id": {
        "kind": "text"
      }
    }
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "std",
        "label": "Standard"
      },
      {
        "id": "pro",
        "label": "Pro"
      },
      {
        "id": "4k",
        "label": "4K"
      }
    ],
    "default": "4k"
  }
]
```

</details>

### `kling-v3-turbo`

Kling V3 Turbo; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`; default `16:9` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`; default `720p` |
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
      }
    ],
    "default": "16:9"
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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
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
    "default": "720p"
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

### `kling-v2-6`

Kling V2.6; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`; default `16:9` |
| `duration` | `--duration` | No | enum | `5`, `10`; default `5` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |

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
      }
    ],
    "default": "16:9"
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
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "kind": "file",
    "accept": "image"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `kling-v3-omni`

Kling V3 Omni; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`; default `16:9` |
| `duration` | `--duration` | No | enum | 13 choices; see descriptor below; default `5` |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`, `4k`; default `720p` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 7 |
| `videoUrl` | `--video` | No | file | video input |
| `referType` | `--refer-type` | No | enum | `feature`, `base`; default `feature` |
| `keepOriginalSound` | `--keep-original-sound` | No | enum | `yes`, `no`; default `yes` |
| `multiShot` | `--multi-shot` | No | boolean | true or false; default `false` |
| `shotType` | `--shot-type` | No | enum | `customize`; default `customize` |
| `multiPrompt` | `--multi-prompt-index`, `--multi-prompt-prompt`, `--multi-prompt-duration` | No | object | Structured input; see descriptor below; array; maximum 6 |
| `elementList` | `--element-list` | No | object | Structured input; see descriptor below; array; maximum 3 |

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
      }
    ],
    "default": "16:9"
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
        "id": "4k"
      }
    ],
    "default": "720p"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "startFrame",
    "label": "First Frame",
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 7
    }
  },
  {
    "key": "videoUrl",
    "label": "Reference Video",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "referType",
    "label": "Reference Video Mode",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "feature",
        "label": "Feature Reference"
      },
      {
        "id": "base",
        "label": "Base Edit"
      }
    ],
    "default": "feature"
  },
  {
    "key": "keepOriginalSound",
    "label": "Keep Original Sound",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "yes",
        "label": "Yes"
      },
      {
        "id": "no",
        "label": "No"
      }
    ],
    "default": "yes"
  },
  {
    "key": "multiShot",
    "label": "Multi-Shot Mode",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "shotType",
    "label": "Shot Segmentation",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "customize",
        "label": "Customize"
      }
    ],
    "default": "customize"
  },
  {
    "key": "multiPrompt",
    "label": "Multi-Shot Prompts",
    "kind": "object",
    "array": {
      "max": 6
    },
    "fields": {
      "index": {
        "kind": "range",
        "min": 0,
        "max": 5,
        "default": 0
      },
      "prompt": {
        "kind": "text",
        "maxLength": 512
      },
      "duration": {
        "kind": "text"
      }
    }
  },
  {
    "key": "elementList",
    "label": "Element References",
    "kind": "object",
    "array": {
      "max": 3
    },
    "fields": {
      "element_id": {
        "kind": "text"
      }
    }
  }
]
```

</details>

### `kling-video-o1`

Kling Video O1; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`; default `16:9` |
| `duration` | `--duration` | No | enum | `5`, `10`; default `5` |
| `renderingSpeed` | `--rendering-speed` | No | enum | `std`, `pro`; default `std` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `false` |

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
      }
    ],
    "default": "16:9"
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
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "std",
        "label": "Standard"
      },
      {
        "id": "pro",
        "label": "Pro"
      }
    ],
    "default": "std"
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

### `kling-motion-control-v3`

Kling Motion Control V3; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 2500 characters |
| `renderingSpeed` | `--rendering-speed` | No | enum | `std`, `pro`; default `std` |
| `characterOrientation` | `--character-orientation` | No | enum | `image`, `video`; default `video` |
| `keepOriginalSound` | `--keep-original-sound` | No | enum | `yes`, `no`; default `yes` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
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
    "maxLength": 2500
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "std",
        "label": "Standard"
      },
      {
        "id": "pro",
        "label": "Pro"
      }
    ],
    "default": "std"
  },
  {
    "key": "characterOrientation",
    "label": "Character Orientation",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "image",
        "label": "Match Image (≤10s ref video)"
      },
      {
        "id": "video",
        "label": "Match Video (≤30s ref video)"
      }
    ],
    "default": "video"
  },
  {
    "key": "keepOriginalSound",
    "label": "Keep Original Sound",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "yes",
        "label": "Yes"
      },
      {
        "id": "no",
        "label": "No"
      }
    ],
    "default": "yes"
  },
  {
    "key": "imageUrls",
    "label": "Person Photo (upper body)",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "videoUrl",
    "label": "Motion Reference Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  }
]
```

</details>

### `kling-motion-control`

Kling Motion Control 2.6; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 2500 characters |
| `renderingSpeed` | `--rendering-speed` | No | enum | `std`, `pro`; default `std` |
| `characterOrientation` | `--character-orientation` | No | enum | `image`, `video`; default `video` |
| `keepOriginalSound` | `--keep-original-sound` | No | enum | `yes`, `no`; default `yes` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
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
    "maxLength": 2500
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "std",
        "label": "Standard"
      },
      {
        "id": "pro",
        "label": "Pro"
      }
    ],
    "default": "std"
  },
  {
    "key": "characterOrientation",
    "label": "Character Orientation",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "image",
        "label": "Match Image (≤10s ref video)"
      },
      {
        "id": "video",
        "label": "Match Video (≤30s ref video)"
      }
    ],
    "default": "video"
  },
  {
    "key": "keepOriginalSound",
    "label": "Keep Original Sound",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "yes",
        "label": "Yes"
      },
      {
        "id": "no",
        "label": "No"
      }
    ],
    "default": "yes"
  },
  {
    "key": "imageUrls",
    "label": "Person Photo (upper body)",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "videoUrl",
    "label": "Motion Reference Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  }
]
```

</details>

### `kling-avatar`

Kling Avatar; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 2500 characters |
| `renderingSpeed` | `--rendering-speed` | No | enum | `std`, `pro`; default `std` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |
| `audioId` | `--audio-id` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 2500
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "std",
        "label": "Standard"
      },
      {
        "id": "pro",
        "label": "Pro"
      }
    ],
    "default": "std"
  },
  {
    "key": "imageUrls",
    "label": "Face Portrait",
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
    "label": "Speech Audio",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "audioId",
    "label": "TTS Audio ID",
    "kind": "text",
    "placeholder": "audio_id from Kling TTS API"
  }
]
```

</details>

### `kling-3.0-image`

Kling 3.0 Image; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `21:9`, `4:3`, `3:2`, `2:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `1k`, `2k`, `4k`; default `1k` |
| `count` | `--count` | No | enum | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |

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
        "id": "21:9"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
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
        "id": "1k"
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
        "id": 3
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
  }
]
```

</details>

### `kling-o1-image`

Kling O1 Image; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `21:9`, `4:3`, `3:2`, `2:3`, `3:4`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `1k`, `2k`; default `1k` |
| `count` | `--count` | No | enum | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |

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
        "id": "21:9"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
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
        "id": 3
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
  }
]
```

</details>

### `kling-video-effects`

Kling Video Effects; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `templateId` | `--template-id` | No | catalog | Account-dependent ID; see catalog source below; default `korean_baseball` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 2 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "templateId",
    "label": "Effect",
    "kind": "catalog",
    "source": {
      "workflow": "kling/v1/catalog/templates"
    },
    "default": "korean_baseball"
  },
  {
    "key": "imageUrls",
    "label": "Effect Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 2
    },
    "minSidePixels": 300
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `kling-t2a`

Kling T2A; input type `t2a`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2500 characters |
| `duration` | `--duration` | No | range | 3 to 10; step 0.5; default `5` |

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
    "key": "duration",
    "label": "Duration (s)",
    "kind": "range",
    "min": 3,
    "max": 10,
    "step": 0.5,
    "default": 5
  }
]
```

</details>

### `kling-v2a`

Kling V2A; input type `v2a`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | `--video` | Yes | file | video input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoUrl",
    "label": "Source Video (3-20s, ≤100MB)",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 20,
    "maxBytes": 104857600
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
