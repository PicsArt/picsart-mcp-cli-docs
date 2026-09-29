---
description: "MiniMax model IDs, parameters, and CLI and MCP usage on Picsart."
---

# MiniMax

**Modes:** video, audio · **Models:** 12

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `hailuo-2.3` | Hailuo 2.3 | `t2v` |
| `hailuo-2.3-pro` | Hailuo 2.3 Pro | `t2v` |
| `hailuo-2.3-fast` | Hailuo 2.3 Fast | `i2v` |
| `hailuo-2.3-fast-pro` | Hailuo 2.3 Fast Pro | `i2v` |
| `minimax-h3` | MiniMax H3 | `t2v` |
| `minimax-music-v2` | MiniMax Music v2 | `music` |
| `minimax-music-v3` | MiniMax Music v3 | `music` |
| `minimax-h3-max` | MiniMax H3 Max | `t2v` |
| `minimax-h3-max-turbo` | MiniMax H3 Max Turbo | `t2v` |
| `minimax-h3-max-camera-controls` | MiniMax H3 Max Camera Controls | `i2v` |
| `minimax-h3-max-lip-sync` | MiniMax H3 Max Lip Sync | `i2v` |
| `minimax-h3-max-extend` | MiniMax H3 Max Extend | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info hailuo-2.3 --json
gen-ai validate -m hailuo-2.3 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m hailuo-2.3 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "hailuo-2.3",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `hailuo-2.3`

Hailuo 2.3; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `duration` | `--duration` | No | enum | `6`, `10`; default `6` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2000
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
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
        "id": 10
      }
    ],
    "default": 6
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
  }
]
```

</details>

### `hailuo-2.3-pro`

Hailuo 2.3 Pro; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2000
  },
  {
    "key": "enhancePrompt",
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
  }
]
```

</details>

### `hailuo-2.3-fast`

Hailuo 2.3 Fast; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `duration` | `--duration` | No | enum | `6`, `10`; default `6` |
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
    "maxLength": 2000
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
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
        "id": 10
      }
    ],
    "default": 6
  },
  {
    "key": "imageUrls",
    "label": "Start Image",
    "required": true,
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

### `hailuo-2.3-fast-pro`

Hailuo 2.3 Fast Pro; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
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
    "maxLength": 2000
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "imageUrls",
    "label": "Start Image",
    "required": true,
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

### `minimax-h3`

MiniMax H3; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 7000 characters |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 9 |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 3 |
| `audioUrls` | `--audio-urls` | No | file | audio input; array; maximum 3 |
| `resolution` | Use SDK or MCP | No | enum | `768P`, `2K`; default `2K` |
| `duration` | `--duration` | No | range | 5 to 15; step 1; default `5` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `adaptive`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `adaptive` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 7000
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
    "minDurationSec": 2,
    "maxFrameRate": 60,
    "maxBytes": 52428800
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
    "minDurationSec": 2
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "768P"
      },
      {
        "id": "2K"
      }
    ],
    "default": "2K"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 5,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "adaptive"
      },
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
      }
    ],
    "default": "adaptive"
  }
]
```

</details>

### `minimax-music-v2`

MiniMax Music v2; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `lyricsPrompt` | `--lyrics-prompt` | No | text | maximum 3500 characters |
| `lyricsOptimizer` | `--lyrics-optimizer` | No | boolean | true or false; default `false` |
| `isInstrumental` | `--is-instrumental` | No | boolean | true or false; default `false` |
| `sampleRate` | `--sample-rate` | No | enum | `16000`, `24000`, `32000`, `44100`; default `44100` |
| `bitrate` | `--bitrate` | No | enum | `32000`, `64000`, `128000`, `256000`; default `256000` |
| `format` | `--format` | No | enum | `mp3`, `wav`, `pcm`; default `mp3` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2000,
    "placeholder": "Describe the genre, mood, instruments, tempo, and production style..."
  },
  {
    "key": "lyricsPrompt",
    "label": "Lyrics",
    "kind": "text",
    "maxLength": 3500,
    "placeholder": "Write lyrics, or describe the lyrical theme. Optional for instrumental or optimizer-generated lyrics."
  },
  {
    "key": "lyricsOptimizer",
    "label": "Lyrics Optimizer",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "isInstrumental",
    "label": "Instrumental",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "sampleRate",
    "label": "Sample Rate",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
      }
    ],
    "default": 44100
  },
  {
    "key": "bitrate",
    "label": "Bitrate",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 32000
      },
      {
        "id": 64000
      },
      {
        "id": 128000
      },
      {
        "id": 256000
      }
    ],
    "default": 256000
  },
  {
    "key": "format",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp3"
      },
      {
        "id": "wav"
      },
      {
        "id": "pcm"
      }
    ],
    "default": "mp3"
  }
]
```

</details>

### `minimax-music-v3`

MiniMax Music v3; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 2000 characters |
| `lyricsPrompt` | `--lyrics-prompt` | No | text | maximum 3500 characters |
| `lyricsOptimizer` | `--lyrics-optimizer` | No | boolean | true or false; default `false` |
| `isInstrumental` | `--is-instrumental` | No | boolean | true or false; default `false` |
| `sampleRate` | `--sample-rate` | No | enum | `16000`, `24000`, `32000`, `44100`; default `44100` |
| `bitrate` | `--bitrate` | No | enum | `32000`, `64000`, `128000`, `256000`; default `256000` |
| `format` | `--format` | No | enum | `mp3`, `wav`, `pcm`; default `mp3` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 2000,
    "placeholder": "Describe the genre, mood, instruments, tempo, and production style..."
  },
  {
    "key": "lyricsPrompt",
    "label": "Lyrics",
    "kind": "text",
    "maxLength": 3500,
    "placeholder": "Write lyrics; \\n separates lines, [Intro]/[Verse]/[Chorus] tags supported. Optional for instrumental or optimizer-generated lyrics."
  },
  {
    "key": "lyricsOptimizer",
    "label": "Lyrics Optimizer",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "isInstrumental",
    "label": "Instrumental",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "sampleRate",
    "label": "Sample Rate",
    "kind": "enum",
    "valueType": "number",
    "options": [
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
      }
    ],
    "default": 44100
  },
  {
    "key": "bitrate",
    "label": "Bitrate",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 32000
      },
      {
        "id": 64000
      },
      {
        "id": 128000
      },
      {
        "id": 256000
      }
    ],
    "default": 256000
  },
  {
    "key": "format",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "mp3"
      },
      {
        "id": "wav"
      },
      {
        "id": "pcm"
      }
    ],
    "default": "mp3"
  }
]
```

</details>

### `minimax-h3-max`

MiniMax H3 Max; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 50000 characters |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 9 |
| `videoUrls` | Use SDK or MCP | No | file | video input; array; maximum 3 |
| `audioUrls` | Use SDK or MCP | No | file | audio input; array; maximum 3 |
| `resolution` | `--resolution` | No | enum | `480p`, `768p`, `1080p`; default `768p` |
| `duration` | `--duration` | No | range | 5 to 15; step 1; default `5` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `adaptive`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `16:9` |
| `promptExpansionMode` | `--prompt-expansion-mode` | No | enum | `balanced`, `quality`; default `balanced` |
| `seed` | `--seed` | No | range | -1 to 2147483647; default `-1` |
| `enableSafetyChecker` | `--enable-safety-checker` | No | boolean | true or false; default `true` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 50000
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
    "minDurationSec": 2,
    "maxFrameRate": 60,
    "maxBytes": 52428800
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
    "minDurationSec": 2
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
        "id": "768p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "768p"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 5,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "adaptive"
      },
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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "promptExpansionMode",
    "label": "Prompt Expansion",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "balanced"
      },
      {
        "id": "quality"
      }
    ],
    "default": "balanced"
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  },
  {
    "key": "enableSafetyChecker",
    "label": "Safety Checker",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `minimax-h3-max-turbo`

MiniMax H3 Max Turbo; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 50000 characters |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `resolution` | `--resolution` | No | enum | `480p`, `768p`, `1080p`; default `768p` |
| `duration` | `--duration` | No | range | 5 to 15; step 1; default `5` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `16:9` |
| `promptExpansionMode` | `--prompt-expansion-mode` | No | enum | `balanced`, `quality`; default `balanced` |
| `seed` | `--seed` | No | range | -1 to 2147483647; default `-1` |
| `enableSafetyChecker` | `--enable-safety-checker` | No | boolean | true or false; default `true` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 50000
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
  },
  {
    "key": "endFrame",
    "label": "End Frame",
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
        "id": "768p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "768p"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 5,
    "max": 15,
    "step": 1,
    "default": 5
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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "promptExpansionMode",
    "label": "Prompt Expansion",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "balanced"
      },
      {
        "id": "quality"
      }
    ],
    "default": "balanced"
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  },
  {
    "key": "enableSafetyChecker",
    "label": "Safety Checker",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `minimax-h3-max-camera-controls`

MiniMax H3 Max Camera Controls; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | No | text | maximum 50000 characters |
| `startFrame` | Use SDK or MCP | Yes | file | image input |
| `resolution` | Use SDK or MCP | No | enum | `480p`, `768p`, `1080p`; default `480p` |
| `duration` | Use SDK or MCP | No | range | 5 to 15; step 1; default `5` |
| `cameraTrajectory` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 2; maximum 12 |
| `promptExpansionMode` | Use SDK or MCP | No | enum | `balanced`, `quality`; default `balanced` |
| `seed` | Use SDK or MCP | No | range | -1 to 2147483647; default `-1` |
| `enableSafetyChecker` | Use SDK or MCP | No | boolean | true or false; default `true` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 50000,
    "placeholder": "Optional — leave blank to freeze the scene and move only the camera..."
  },
  {
    "key": "startFrame",
    "label": "Start Frame",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "minSidePixels": 256,
    "maxSidePixels": 5760,
    "minAspectRatio": 0.4,
    "maxAspectRatio": 2.5
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
        "id": "768p"
      },
      {
        "id": "1080p"
      }
    ],
    "default": "480p"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 5,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "cameraTrajectory",
    "label": "Camera Trajectory",
    "kind": "object",
    "array": {
      "min": 2,
      "max": 12
    },
    "fields": {
      "time": {
        "kind": "range",
        "min": 0,
        "max": 1,
        "step": 0.01,
        "default": 0
      },
      "azimuth": {
        "kind": "range",
        "min": -11520,
        "max": 11520,
        "default": 0
      },
      "elevation": {
        "kind": "range",
        "min": -90,
        "max": 90,
        "default": 0
      },
      "distance": {
        "kind": "range",
        "min": 0.01,
        "max": 100,
        "default": 1
      }
    }
  },
  {
    "key": "promptExpansionMode",
    "label": "Prompt Expansion",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "balanced"
      },
      {
        "id": "quality"
      }
    ],
    "default": "balanced"
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  },
  {
    "key": "enableSafetyChecker",
    "label": "Safety Checker",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `minimax-h3-max-lip-sync`

MiniMax H3 Max Lip Sync; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `startFrame` | Use SDK or MCP | Yes | file | image input |
| `audioUrl` | Use SDK or MCP | Yes | file | audio input |
| `resolution` | Use SDK or MCP | No | enum | `480p`, `768p`, `1080p`, `2k`; default `768p` |
| `enableTranscription` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `seed` | Use SDK or MCP | No | range | -1 to 2147483647; default `-1` |
| `enableSafetyChecker` | Use SDK or MCP | No | boolean | true or false; default `true` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "startFrame",
    "label": "Portrait Image",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image"
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
        "id": "480p"
      },
      {
        "id": "768p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "2k"
      }
    ],
    "default": "768p"
  },
  {
    "key": "enableTranscription",
    "label": "Transcription",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  },
  {
    "key": "enableSafetyChecker",
    "label": "Safety Checker",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

### `minimax-h3-max-extend`

MiniMax H3 Max Extend; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `duration` | Use SDK or MCP | No | range | 5 to 15; step 1; default `5` |
| `output` | Use SDK or MCP | No | enum | `extended`, `continuation`; default `extended` |
| `aspectRatio` | Use SDK or MCP | No | enum | `auto`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `auto` |
| `resolution` | Use SDK or MCP | No | enum | `480p`, `768p`, `1080p`, `2k`; default `768p` |
| `enhancePrompt` | Use SDK or MCP | No | boolean | true or false; default `true` |
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
    "placeholder": "What happens next"
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 60
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 5,
    "max": 15,
    "step": 1,
    "default": 5
  },
  {
    "key": "output",
    "label": "Output",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "extended",
        "label": "Source + continuation"
      },
      {
        "id": "continuation",
        "label": "Continuation only"
      }
    ],
    "default": "extended"
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
        "id": "480p"
      },
      {
        "id": "768p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "2k"
      }
    ],
    "default": "768p"
  },
  {
    "key": "enhancePrompt",
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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
