---
description: "OVI model IDs, parameters, and CLI and MCP usage on Picsart."
---

# OVI

**Modes:** video · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `ovi` | OVI | `t2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info ovi --json
gen-ai validate -m ovi --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m ovi --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "ovi",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `ovi`

OVI; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `size` | `--size` | No | enum | `9:16`, `16:9`, `1:1`, `9:16+`, `16:9+`, `2:5`, `5:2`; default `16:9` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |

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
    "key": "size",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "9:16"
      },
      {
        "id": "16:9"
      },
      {
        "id": "1:1"
      },
      {
        "id": "9:16+"
      },
      {
        "id": "16:9+"
      },
      {
        "id": "2:5"
      },
      {
        "id": "5:2"
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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
