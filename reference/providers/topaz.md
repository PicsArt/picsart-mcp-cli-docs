---
description: "Topaz model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Topaz

**Modes:** image, video · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `topaz-upscale-image` | Topaz Image Upscale | `i2i` |
| `topaz-upscale-video` | Topaz Video Upscale | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info topaz-upscale-image --json
gen-ai validate -m topaz-upscale-image --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m topaz-upscale-image --image "https://example.com/input.jpg" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "topaz-upscale-image",
    "prompt": "",
    "async": true,
    "imageUrls": [
      "https://example.com/input.jpg"
    ]
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `topaz-upscale-image`

Topaz Image Upscale; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `model` | `--model-version` | No | enum | `Standard V2`, `Standard MAX`, `Low Resolution V2`, `High Fidelity V2`, `CGI`, `Text Refine`, `Redefine`, `Recovery`, `Recovery V2`, `Wonder`, `Wonder 3`; default `Standard V2` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Image",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "model",
    "label": "Model",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "Standard V2"
      },
      {
        "id": "Standard MAX"
      },
      {
        "id": "Low Resolution V2"
      },
      {
        "id": "High Fidelity V2"
      },
      {
        "id": "CGI"
      },
      {
        "id": "Text Refine"
      },
      {
        "id": "Redefine"
      },
      {
        "id": "Recovery"
      },
      {
        "id": "Recovery V2"
      },
      {
        "id": "Wonder"
      },
      {
        "id": "Wonder 3"
      }
    ],
    "default": "Standard V2"
  }
]
```

</details>

### `topaz-upscale-video`

Topaz Video Upscale; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | `--video` | Yes | file | video input |
| `model` | `--model-version` | No | enum | 16 choices; see descriptor below; default `Proteus` |

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
    "label": "Model",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "Proteus"
      },
      {
        "id": "Artemis HQ"
      },
      {
        "id": "Artemis MQ"
      },
      {
        "id": "Artemis LQ"
      },
      {
        "id": "Nyx"
      },
      {
        "id": "Nyx Fast"
      },
      {
        "id": "Nyx XL"
      },
      {
        "id": "Nyx HF"
      },
      {
        "id": "Gaia HQ"
      },
      {
        "id": "Gaia CG"
      },
      {
        "id": "Gaia 2"
      },
      {
        "id": "Starlight Precise 2.5"
      },
      {
        "id": "Starlight HQ"
      },
      {
        "id": "Starlight Mini"
      },
      {
        "id": "Starlight Sharp"
      },
      {
        "id": "Starlight Fast 2"
      }
    ],
    "default": "Proteus"
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
