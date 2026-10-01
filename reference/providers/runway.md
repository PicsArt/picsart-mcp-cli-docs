---
description: "Runway model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Runway

**Modes:** image, video · **Models:** 4

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `runway-avatar-video` | Runway Avatar | `t2v` |
| `runway-gen4.5` | Runway Gen 4.5 | `t2v` |
| `runway-aleph2` | Runway Aleph 2 | `v2v` |
| `runway-gen4-ref` | Runway Gen4 Ref | `i2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info runway-avatar-video --json
gen-ai validate -m runway-avatar-video --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m runway-avatar-video --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "runway-avatar-video",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `runway-avatar-video`

Runway Avatar; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `style` | `--style` | No | enum | `game-character`, `music-superstar`, `game-character-man`, `cat-character`, `influencer`, `tennis-coach`, `human-resource`, `fashion-designer`, `cooking-teacher`; default `game-character` |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `victoria` |
| `prompt` | `--prompt` | No | text | maximum 1500 characters |
| `audioUrl` | `--audio` | No | file | audio input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "game-character",
        "label": "Game Character"
      },
      {
        "id": "music-superstar",
        "label": "Music Superstar"
      },
      {
        "id": "game-character-man",
        "label": "Game Character Man"
      },
      {
        "id": "cat-character",
        "label": "Cat Character"
      },
      {
        "id": "influencer",
        "label": "Influencer"
      },
      {
        "id": "tennis-coach",
        "label": "Tennis Coach"
      },
      {
        "id": "human-resource",
        "label": "Human Resource"
      },
      {
        "id": "fashion-designer",
        "label": "Fashion Designer"
      },
      {
        "id": "cooking-teacher",
        "label": "Cooking Teacher"
      }
    ],
    "default": "game-character"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "runway/v1/catalog/voices"
    },
    "default": "victoria"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 1500,
    "placeholder": "Write the script your avatar will speak..."
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `runway-gen4.5`

Runway Gen 4.5; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `duration` | `--duration` | No | enum | `5`, `8`, `10`; default `5` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
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
    "maxLength": 1000
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
        "id": 8
      },
      {
        "id": 10
      }
    ],
    "default": 5
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

### `runway-aleph2`

Runway Aleph 2; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `videoUrl` | `--video` | Yes | file | video input |
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
    "maxLength": 1000
  },
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "maxDurationSec": 30
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

### `runway-gen4-ref`

Runway Gen4 Ref; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`; default `16:9` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 3 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 1000
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
