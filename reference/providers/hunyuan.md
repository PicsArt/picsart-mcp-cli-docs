---
description: "Hunyuan model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Hunyuan

**Modes:** image · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `hunyuan-v3` | Hunyuan V3 | `t2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info hunyuan-v3 --json
gen-ai validate -m hunyuan-v3 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m hunyuan-v3 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "hunyuan-v3",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `hunyuan-v3`

Hunyuan V3; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `16:9`, `9:16`, `4:3`, `3:4`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`; default `1` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `cfgScale` | `--cfg-scale` | No | range | 1 to 20; step 0.5; default `7.5` |

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
        "id": "4:3"
      },
      {
        "id": "3:4"
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
      }
    ],
    "default": 1
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "cfgScale",
    "label": "CFG Scale",
    "kind": "range",
    "min": 1,
    "max": 20,
    "step": 0.5,
    "default": 7.5
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
