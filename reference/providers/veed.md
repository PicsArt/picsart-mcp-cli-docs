---
description: "VEED model IDs, parameters, and CLI and MCP usage on Picsart."
---

# VEED

**Modes:** video · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `veed-fabric-v1` | VEED Fabric 1.0 | `i2v` |
| `veed-fabric-v1-fast` | VEED Fabric 1.0 Fast | `i2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info veed-fabric-v1 --json
gen-ai validate -m veed-fabric-v1 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m veed-fabric-v1 --prompt "A quiet forest at sunrise" --image "https://example.com/input.jpg" --audio "https://example.com/input.mp3" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "veed-fabric-v1",
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

### `veed-fabric-v1`

VEED Fabric 1.0; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | Text |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |

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
    "key": "imageUrls",
    "label": "Start Image",
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
  }
]
```

</details>

### `veed-fabric-v1-fast`

VEED Fabric 1.0 Fast; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | Text |
| `resolution` | `--resolution` | No | enum | `480p`, `720p`; default `720p` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |

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
    "key": "imageUrls",
    "label": "Start Image",
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
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
