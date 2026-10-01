---
description: "Meta model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Meta

**Modes:** image · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `muse-image-1.0` | Muse Image 1.0 | `t2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info muse-image-1.0 --json
gen-ai validate -m muse-image-1.0 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m muse-image-1.0 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "muse-image-1.0",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `muse-image-1.0`

Muse Image 1.0; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `3:2`, `2:3`, `16:9`, `9:16`, `4:3`, `3:4`; default `1:1` |
| `reasoningStrength` | `--reasoning-strength` | No | enum | `low`, `high`; default `high` |
| `moderation` | `--moderation` | No | enum | `auto`, `low`, `none`; default `auto` |
| `enableImageSearch` | `--enable-image-search` | No | boolean | true or false; default `true` |
| `enableWebSearch` | `--enable-web-search` | No | boolean | true or false; default `true` |
| `enableShell` | `--enable-shell` | No | boolean | true or false; default `true` |
| `outputFormat` | `--output-format` | No | enum | `png`, `jpeg`, `webp`; default `png` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 5 |

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
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "4:3"
      },
      {
        "id": "3:4"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "reasoningStrength",
    "label": "Reasoning",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "low"
      },
      {
        "id": "high"
      }
    ],
    "default": "high"
  },
  {
    "key": "moderation",
    "label": "Moderation",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
      {
        "id": "low"
      },
      {
        "id": "none"
      }
    ],
    "default": "auto"
  },
  {
    "key": "enableImageSearch",
    "label": "Image Search",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "enableWebSearch",
    "label": "Web Search",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "enableShell",
    "label": "Layout & Chart Tools",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "png"
      },
      {
        "id": "jpeg"
      },
      {
        "id": "webp"
      }
    ],
    "default": "png"
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
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 5
    }
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
