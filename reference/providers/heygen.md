---
description: "HeyGen model IDs, parameters, and CLI and MCP usage on Picsart."
---

# HeyGen

**Modes:** video · **Models:** 3

This reference uses the `@picsart/ai-sdk 6.48.1` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `heygen-talking-photo` | HeyGen Talking Photo | `i2v` |
| `heygen-video-avatar` | HeyGen Video Avatar | `t2v` |
| `heygen-video-1` | HeyGen Video | `t2v` |

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `heygen-talking-photo`

HeyGen Talking Photo; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `resolution` | `--resolution` | No | enum | `4k`, `1080p`, `720p`; default `720p` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `4:5`, `5:4`, `1:1`, `auto`; default `16:9` |
| `voiceId` | `--voice` | Yes | catalog | Account-dependent ID; see catalog source below |
| `prompt` | `--prompt` | Yes | text | minimum 20 characters; maximum 5000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
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
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "4k"
      },
      {
        "id": "1080p"
      },
      {
        "id": "720p"
      }
    ],
    "default": "720p"
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
        "id": "4:5"
      },
      {
        "id": "5:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "auto"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "required": true,
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "heygen/v1/catalog/voices"
    },
    "default": ""
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "minLength": 20,
    "maxLength": 5000,
    "placeholder": "Write the script your avatar will speak (at least 20 characters)..."
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `heygen-video-avatar`

HeyGen Video Avatar; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoId` | `--video-id` | Yes | catalog | Account-dependent ID; see catalog source below |
| `engine` | Use SDK or MCP | No | enum | `avatar_iv`, `avatar_v`; default `avatar_iv` |
| `resolution` | `--resolution` | No | enum | `4k`, `1080p`, `720p`; default `720p` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `4:5`, `5:4`, `1:1`, `auto`; default `16:9` |
| `voiceId` | `--voice` | Yes | catalog | Account-dependent ID; see catalog source below |
| `prompt` | `--prompt` | Yes | text | minimum 20 characters; maximum 5000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoId",
    "label": "Avatar",
    "required": true,
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "heygen/v1/catalog/avatars"
    },
    "default": ""
  },
  {
    "key": "engine",
    "label": "Engine",
    "required": false,
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "avatar_iv",
        "label": "Avatar IV"
      },
      {
        "id": "avatar_v",
        "label": "Avatar V"
      }
    ],
    "default": "avatar_iv"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "4k"
      },
      {
        "id": "1080p"
      },
      {
        "id": "720p"
      }
    ],
    "default": "720p"
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
        "id": "4:5"
      },
      {
        "id": "5:4"
      },
      {
        "id": "1:1"
      },
      {
        "id": "auto"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "required": true,
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "heygen/v1/catalog/voices"
    },
    "default": ""
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "minLength": 20,
    "maxLength": 5000,
    "placeholder": "Write the script your avatar will speak (at least 20 characters)..."
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `heygen-video-1`

HeyGen Video; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 32000 characters |
| `startFrame` | Use SDK or MCP | No | file | image input |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 9 |
| `videoUrls` | Use SDK or MCP | No | file | video input; array; maximum 3 |
| `audioUrls` | Use SDK or MCP | No | file | audio input; array; maximum 3 |
| `resolution` | Use SDK or MCP | No | enum | `480p`, `768p`; default `768p` |
| `duration` | Use SDK or MCP | No | range | 5 to 15; step 1; default `5` |
| `aspectRatio` | Use SDK or MCP | No | enum | `adaptive`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; default `16:9` |
| `promptEnhancement` | Use SDK or MCP | No | enum | `turbo`, `quality`, `disabled`; default `turbo` |
| `seed` | Use SDK or MCP | No | range | 0 to 4294967295; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 32000
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 9
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
      "max": 3
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
      "max": 3
    }
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
    "key": "promptEnhancement",
    "label": "Prompt Enhancement",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "turbo"
      },
      {
        "id": "quality"
      },
      {
        "id": "disabled"
      }
    ],
    "default": "turbo"
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 4294967295,
    "step": 1
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
