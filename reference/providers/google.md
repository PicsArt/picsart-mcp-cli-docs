---
description: "Google model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Google

**Modes:** image, video, audio, text · **Models:** 22

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `veo-3.1` | Veo 3.1 | `t2v` |
| `veo-3.1-fast` | Veo 3.1 Fast | `t2v` |
| `veo-3.1-lite` | Veo 3.1 Lite | `t2v` |
| `gemini-3.1-flash-image` | Nano Banana 2 | `t2i` |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | `t2i` |
| `gemini-3-pro-image` | Nano Banana Pro | `t2i` |
| `gemini-2.5-flash-image` | Nano Banana | `t2i` |
| `gemini-2.5-flash-tts` | Gemini 2.5 Flash TTS | `tts` |
| `gemini-2.5-pro-tts` | Gemini 2.5 Pro TTS | `tts` |
| `gemini-3.8-flash-tts` | Gemini 3.8 Flash TTS | `tts` |
| `gemini-3.8-flash-lite-tts` | Gemini 3.8 Flash Lite TTS | `tts` |
| `gemini-omni-flash-preview` | Gemini Omni | `t2v` |
| `gemini-omni-1.1-flash-preview` | Gemini Omni 1.1 Flash | `t2v` |
| `lyria-3-clip` | Lyria 3 Clip | `music` |
| `lyria-3-pro` | Lyria 3 Pro | `music` |
| `lyria-3.5` | Lyria 3.5 | `music` |
| `gemini-3-pro` | Gemini 3 Pro | `v2t` |
| `gemini-3.8-flash` | Gemini 3.8 Flash | `i2t` |
| `gemini-3.7-flash` | Gemini 3.7 Flash | `i2t` |
| `gemini-3.6-flash` | Gemini 3.6 Flash | `i2t` |
| `gemini-3.5-flash-lite` | Gemini 3.5 Flash Lite | `i2t` |
| `gemini-2.5-flash` | Gemini 2.5 Flash | `i2t` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info veo-3.1 --json
gen-ai validate -m veo-3.1 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m veo-3.1 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "veo-3.1",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `veo-3.1`

Veo 3.1; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `duration` | `--duration` | No | enum | `4`, `6`, `8`; default `8` |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`, `4k`; default `720p` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 3 |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
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
    "maxLength": 4000
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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 4
      },
      {
        "id": 6
      },
      {
        "id": 8
      }
    ],
    "default": 8
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
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

### `veo-3.1-fast`

Veo 3.1 Fast; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `duration` | `--duration` | No | enum | `4`, `6`, `8`; default `8` |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`, `4k`; default `720p` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 3 |
| `generateAudio` | `--generate-audio` | No | boolean | true or false; default `true` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
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
    "maxLength": 4000
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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 4
      },
      {
        "id": 6
      },
      {
        "id": 8
      }
    ],
    "default": 8
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  },
  {
    "key": "generateAudio",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
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

### `veo-3.1-lite`

Veo 3.1 Lite; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `duration` | `--duration` | No | enum | `4`, `6`, `8`; default `8` |
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
    "maxLength": 4000
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
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 4
      },
      {
        "id": 6
      },
      {
        "id": 8
      }
    ],
    "default": 8
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

### `gemini-3.1-flash-image`

Nano Banana 2; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | 15 choices; see descriptor below; default `1:1` |
| `resolution` | `--resolution` | No | enum | `0.5K`, `1K`, `2K`, `4K`; default `1K` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |
| `thinkingLevel` | `--thinking-level` | No | enum | `minimal`, `high`; default `minimal` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 14 |

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
        "id": "3:4"
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
        "id": "4:5"
      },
      {
        "id": "5:4"
      },
      {
        "id": "4:1"
      },
      {
        "id": "1:4"
      },
      {
        "id": "8:1"
      },
      {
        "id": "1:8"
      },
      {
        "id": "21:9"
      },
      {
        "id": "auto"
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
        "id": "0.5K"
      },
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
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  },
  {
    "key": "thinkingLevel",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "minimal",
        "label": "Minimal (faster)"
      },
      {
        "id": "high",
        "label": "High (more reasoning)"
      }
    ],
    "default": "minimal"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 14
    }
  }
]
```

</details>

### `gemini-3.1-flash-lite-image`

Nano Banana 2 Lite; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | 15 choices; see descriptor below; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |
| `thinkingLevel` | `--thinking-level` | No | enum | `minimal`, `high`; default `minimal` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 14 |

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
        "id": "3:4"
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
        "id": "4:5"
      },
      {
        "id": "5:4"
      },
      {
        "id": "4:1"
      },
      {
        "id": "1:4"
      },
      {
        "id": "8:1"
      },
      {
        "id": "1:8"
      },
      {
        "id": "21:9"
      },
      {
        "id": "auto"
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
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  },
  {
    "key": "thinkingLevel",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "minimal",
        "label": "Minimal (faster)"
      },
      {
        "id": "high",
        "label": "High (more reasoning)"
      }
    ],
    "default": "minimal"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 14
    }
  }
]
```

</details>

### `gemini-3-pro-image`

Nano Banana Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `3:4`, `4:3`, `2:3`, `21:9`, `auto`; default `1:1` |
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `2K` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |
| `thinkingBudget` | `--thinking-budget` | No | range | 128 to 24576; step 128; default `128` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 14 |

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
        "id": "3:4"
      },
      {
        "id": "4:3"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      },
      {
        "id": "auto"
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
    "default": "2K"
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
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  },
  {
    "key": "thinkingBudget",
    "label": "Thinking Budget",
    "kind": "range",
    "min": 128,
    "max": 24576,
    "step": 128,
    "default": 128
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 14
    }
  }
]
```

</details>

### `gemini-2.5-flash-image`

Nano Banana; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `3:4`, `4:3`, `2:3`, `21:9`, `auto`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |
| `imageUrls` | `--image` | No | file | image input; array; maximum 14 |

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
        "id": "3:4"
      },
      {
        "id": "4:3"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      },
      {
        "id": "auto"
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
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 14
    }
  }
]
```

</details>

### `gemini-2.5-flash-tts`

Gemini 2.5 Flash TTS; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | `--language` | No | text | Text |
| `accent` | `--accent` | No | text | Text |
| `prompt` | `--prompt` | No | text | maximum 6000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `Kore` |
| `parts` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 200 |
| `multiSpeakerVoiceConfigs` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 2 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "accent",
    "label": "Accent",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 6000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "gemini/v1/catalog/voices"
    },
    "default": "Kore"
  },
  {
    "key": "parts",
    "label": "Spoken Parts",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 200
    },
    "fields": {
      "text": {
        "label": "Text",
        "kind": "text",
        "maxLength": 6000
      },
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "required": false
      }
    }
  },
  {
    "key": "multiSpeakerVoiceConfigs",
    "label": "Speakers",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 2
    },
    "fields": {
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "placeholder": "Speaker 1"
      },
      "voiceName": {
        "label": "Voice",
        "kind": "text",
        "placeholder": "Kore"
      }
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `gemini-2.5-pro-tts`

Gemini 2.5 Pro TTS; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | `--language` | No | text | Text |
| `accent` | `--accent` | No | text | Text |
| `prompt` | `--prompt` | No | text | maximum 6000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `Kore` |
| `parts` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 200 |
| `multiSpeakerVoiceConfigs` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 2 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "accent",
    "label": "Accent",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 6000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "gemini/v1/catalog/voices"
    },
    "default": "Kore"
  },
  {
    "key": "parts",
    "label": "Spoken Parts",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 200
    },
    "fields": {
      "text": {
        "label": "Text",
        "kind": "text",
        "maxLength": 6000
      },
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "required": false
      }
    }
  },
  {
    "key": "multiSpeakerVoiceConfigs",
    "label": "Speakers",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 2
    },
    "fields": {
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "placeholder": "Speaker 1"
      },
      "voiceName": {
        "label": "Voice",
        "kind": "text",
        "placeholder": "Kore"
      }
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `gemini-3.8-flash-tts`

Gemini 3.8 Flash TTS; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | Use SDK or MCP | No | text | Text |
| `accent` | Use SDK or MCP | No | text | Text |
| `prompt` | Use SDK or MCP | No | text | maximum 6000 characters |
| `voiceId` | Use SDK or MCP | No | catalog | Account-dependent ID; see catalog source below; default `Kore` |
| `style` | Use SDK or MCP | No | text | maximum 500 characters |
| `parts` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 200 |
| `multiSpeakerVoiceConfigs` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 2 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "accent",
    "label": "Accent",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 6000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "gemini/v1/catalog/voices"
    },
    "default": "Kore"
  },
  {
    "key": "style",
    "label": "Style",
    "kind": "text",
    "maxLength": 500,
    "placeholder": "e.g. warm, unhurried; a bedtime story"
  },
  {
    "key": "parts",
    "label": "Spoken Parts",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 200
    },
    "fields": {
      "text": {
        "label": "Text",
        "kind": "text",
        "maxLength": 6000
      },
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "required": false
      },
      "style": {
        "label": "Style",
        "kind": "text",
        "maxLength": 500,
        "required": false
      }
    }
  },
  {
    "key": "multiSpeakerVoiceConfigs",
    "label": "Speakers",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 2
    },
    "fields": {
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "placeholder": "Speaker 1"
      },
      "voiceName": {
        "label": "Voice",
        "kind": "text",
        "placeholder": "Kore"
      }
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `gemini-3.8-flash-lite-tts`

Gemini 3.8 Flash Lite TTS; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | Use SDK or MCP | No | text | Text |
| `accent` | Use SDK or MCP | No | text | Text |
| `prompt` | Use SDK or MCP | No | text | maximum 6000 characters |
| `voiceId` | Use SDK or MCP | No | catalog | Account-dependent ID; see catalog source below; default `Kore` |
| `style` | Use SDK or MCP | No | text | maximum 500 characters |
| `parts` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 200 |
| `multiSpeakerVoiceConfigs` | Use SDK or MCP | No | object | Structured input; see descriptor below; array; minimum 1; maximum 2 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "accent",
    "label": "Accent",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 6000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "gemini/v1/catalog/voices"
    },
    "default": "Kore"
  },
  {
    "key": "style",
    "label": "Style",
    "kind": "text",
    "maxLength": 500,
    "placeholder": "e.g. warm, unhurried; a bedtime story"
  },
  {
    "key": "parts",
    "label": "Spoken Parts",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 200
    },
    "fields": {
      "text": {
        "label": "Text",
        "kind": "text",
        "maxLength": 6000
      },
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "required": false
      },
      "style": {
        "label": "Style",
        "kind": "text",
        "maxLength": 500,
        "required": false
      }
    }
  },
  {
    "key": "multiSpeakerVoiceConfigs",
    "label": "Speakers",
    "kind": "object",
    "array": {
      "min": 1,
      "max": 2
    },
    "fields": {
      "speaker": {
        "label": "Speaker",
        "kind": "text",
        "placeholder": "Speaker 1"
      },
      "voiceName": {
        "label": "Voice",
        "kind": "text",
        "placeholder": "Kore"
      }
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `gemini-omni-flash-preview`

Gemini Omni; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `duration` | `--duration` | No | enum | `3`, `5`, `6`, `8`, `10`; default `8` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `videoUrl` | `--video` | No | file | video input |

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
      }
    ],
    "default": "16:9"
  },
  {
    "key": "duration",
    "label": "Duration (seconds)",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 3
      },
      {
        "id": 5
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
    "default": 8
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "video"
  }
]
```

</details>

### `gemini-omni-1.1-flash-preview`

Gemini Omni 1.1 Flash; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `resolution` | `--resolution` | No | enum | `360p`, `720p`, `1080p`, `4k`; default `720p` |
| `duration` | `--duration` | No | enum | `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`; default `8` |
| `startFrame` | `--start-frame` | No | file | image input |
| `endFrame` | `--end-frame` | No | file | image input |
| `imageUrls` | `--image` | No | file | image input; array; maximum 5 |
| `videoUrl` | `--video` | No | file | video input |
| `videoUrls` | `--video-urls` | No | file | video input; array; maximum 3 |

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
        "id": "360p"
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
      }
    ],
    "default": 8
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
      "max": 5
    }
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 30
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
    }
  }
]
```

</details>

### `lyria-3-clip`

Lyria 3 Clip; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
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
    "maxLength": 5000
  },
  {
    "key": "imageUrls",
    "label": "Mood Images",
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

### `lyria-3-pro`

Lyria 3 Pro; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
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
    "maxLength": 5000,
    "placeholder": "Generate voiceover, music and sound effects"
  },
  {
    "key": "imageUrls",
    "label": "Mood Images",
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

### `lyria-3.5`

Lyria 3.5; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 10 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "placeholder": "Generate voiceover, music and sound effects"
  },
  {
    "key": "imageUrls",
    "label": "Mood Images",
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

### `gemini-3-pro`

Gemini 3 Pro; input type `v2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `videoUrl` | `--video` | No | file | video input |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `high`; default `off` |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  },
  {
    "key": "videoUrl",
    "label": "Video",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "thinking",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gemini-3.8-flash`

Gemini 3.8 Flash; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  },
  {
    "key": "thinking",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "off"
      },
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
    "default": "off"
  }
]
```

</details>

### `gemini-3.7-flash`

Gemini 3.7 Flash; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  },
  {
    "key": "thinking",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "off"
      },
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
    "default": "off"
  }
]
```

</details>

### `gemini-3.6-flash`

Gemini 3.6 Flash; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  },
  {
    "key": "thinking",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "off"
      },
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
    "default": "off"
  }
]
```

</details>

### `gemini-3.5-flash-lite`

Gemini 3.5 Flash Lite; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `gemini-2.5-flash`

Gemini 2.5 Flash; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  },
  {
    "key": "thinking",
    "label": "Thinking",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "off"
      },
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
    "default": "off"
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
