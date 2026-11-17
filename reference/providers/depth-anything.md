---
description: "Depth Anything model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Depth Anything

**Modes:** video · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.48.1` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `depth-anything-video` | Video Depth Anything | `v2v` |

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `depth-anything-video`

Video Depth Anything; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | Use SDK or MCP | Yes | file | video input |
| `model` | Use SDK or MCP | No | enum | `VDA-Small`, `VDA-Base`, `VDA-Large`; default `VDA-Large` |
| `colormap` | Use SDK or MCP | No | enum | `grayscale`, `turbo`, `inferno`, `magma`, `viridis`; default `grayscale` |
| `resolution` | Use SDK or MCP | No | enum | `auto`, `360p`, `480p`, `720p`, `1080p`; default `auto` |
| `sideBySide` | Use SDK or MCP | No | boolean | true or false; default `false` |

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
    "key": "model",
    "label": "Model Size",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "VDA-Small"
      },
      {
        "id": "VDA-Base"
      },
      {
        "id": "VDA-Large"
      }
    ],
    "default": "VDA-Large"
  },
  {
    "key": "colormap",
    "label": "Color Map",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "grayscale"
      },
      {
        "id": "turbo"
      },
      {
        "id": "inferno"
      },
      {
        "id": "magma"
      },
      {
        "id": "viridis"
      }
    ],
    "default": "grayscale"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
      {
        "id": "360p"
      },
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
    "default": "auto"
  },
  {
    "key": "sideBySide",
    "label": "Side by Side",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
