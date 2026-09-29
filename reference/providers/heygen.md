---
description: "HeyGen model IDs, parameters, and CLI and MCP usage on Picsart."
---

# HeyGen

**Modes:** video · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `heygen-talking-photo` | HeyGen Talking Photo | `i2v` |
| `heygen-video-avatar` | HeyGen Video Avatar | `t2v` |

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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
