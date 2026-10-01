---
description: "Wan model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Wan

**Modes:** video · **Models:** 6

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `wan-2.7-t2v` | Wan 2.7 | `t2v` |
| `wan-2.7-i2v` | Wan 2.7 Image-to-Video | `i2v` |
| `wan-2.7-r2v` | Wan 2.7 Ref-to-Video | `v2v` |
| `wan-2.7-video-edit` | Wan 2.7 Video Edit | `v2v` |
| `wan-3.0-video` | Wan 3.0 | `t2v` |
| `wan-3.0-video-prime` | Wan 3.0 Prime | `t2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info wan-2.7-t2v --json
gen-ai validate -m wan-2.7-t2v --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m wan-2.7-t2v --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "wan-2.7-t2v",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `wan-2.7-t2v`

Wan 2.7; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `5`, `10`, `15`; default `5` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `audioUrl` | `--audio` | No | file | audio input |
| `startFrame` | `--start-frame` | No | file | image input |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
        "id": 5
      },
      {
        "id": 10
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
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

### `wan-2.7-i2v`

Wan 2.7 Image-to-Video; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `5`, `10`, `15`; default `5` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `startFrame` | `--start-frame` | Yes | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `audioUrl` | `--audio` | No | file | audio input |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 5
      },
      {
        "id": 10
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
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
  },
  {
    "key": "audioUrl",
    "label": "Driving Audio",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
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

### `wan-2.7-r2v`

Wan 2.7 Ref-to-Video; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `5`, `10`; default `5` |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 5 |
| `videoUrl` | `--video` | Yes | file | video input |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
        "id": 5
      },
      {
        "id": 10
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
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "720P"
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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
  },
  {
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 5
    }
  },
  {
    "key": "videoUrl",
    "label": "Reference Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video"
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

### `wan-2.7-video-edit`

Wan 2.7 Video Edit; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `resolution` | `--resolution` | No | enum | `720P`, `1080P`; default `720P` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `16:9` |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `videoUrl` | `--video` | Yes | file | video input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 4 |
| `audioSetting` | `--audio-setting` | No | enum | `auto`, `origin`; default `auto` |
| `duration` | `--duration` | No | range | 2 to 10; step 1 |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
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
      "max": 4
    }
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
    "key": "duration",
    "label": "Output Duration (s)",
    "kind": "range",
    "min": 2,
    "max": 10,
    "step": 1
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

### `wan-3.0-video`

Wan 3.0; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `-1`, `5`, `10`, `15`, `30`; default `5` |
| `resolution` | `--resolution` | No | enum | `480P`, `720P`, `1080P`; default `1080P` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `adaptive`; default `adaptive` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 5 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 5 |
| `enableThinking` | `--enable-thinking` | No | boolean | true or false; default `false` |
| `watermark` | `--watermark` | No | boolean | true or false; default `false` |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
    "label": "Duration (s)",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 5
      },
      {
        "id": 10
      },
      {
        "id": 15
      },
      {
        "id": 30
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
        "id": "480P"
      },
      {
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "1080P"
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
        "id": "adaptive"
      }
    ],
    "default": "adaptive"
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
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 5
    }
  },
  {
    "key": "audioUrls",
    "label": "Reference Audios",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "audio",
    "array": {
      "max": 5
    }
  },
  {
    "key": "enableThinking",
    "label": "Deep Thinking",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "watermark",
    "label": "Watermark",
    "kind": "boolean",
    "default": false
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

### `wan-3.0-video-prime`

Wan 3.0 Prime; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 5000 characters |
| `duration` | `--duration` | No | enum | `-1`, `5`, `10`, `15`, `30`; default `5` |
| `resolution` | `--resolution` | No | enum | `480P`, `720P`, `1080P`; default `1080P` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `4:3`, `3:4`, `adaptive`; default `adaptive` |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 5 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 5 |
| `enableThinking` | `--enable-thinking` | No | boolean | true or false; default `false` |
| `watermark` | `--watermark` | No | boolean | true or false; default `false` |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

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
    "label": "Duration (s)",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": -1,
        "label": "Auto"
      },
      {
        "id": 5
      },
      {
        "id": 10
      },
      {
        "id": 15
      },
      {
        "id": 30
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
        "id": "480P"
      },
      {
        "id": "720P"
      },
      {
        "id": "1080P"
      }
    ],
    "default": "1080P"
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
        "id": "adaptive"
      }
    ],
    "default": "adaptive"
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
    "key": "videoUrls",
    "label": "Reference Videos",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 5
    }
  },
  {
    "key": "audioUrls",
    "label": "Reference Audios",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "audio",
    "array": {
      "max": 5
    }
  },
  {
    "key": "enableThinking",
    "label": "Deep Thinking",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "watermark",
    "label": "Watermark",
    "kind": "boolean",
    "default": false
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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
