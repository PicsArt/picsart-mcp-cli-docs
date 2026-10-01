---
description: "Qwen model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Qwen

**Modes:** image · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `qwen-image-2-pro` | Qwen 2 Pro | `t2i` |
| `qwen-image-3.0-pro` | Qwen 3.0 Pro | `t2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info qwen-image-2-pro --json
gen-ai validate -m qwen-image-2-pro --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m qwen-image-2-pro --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "qwen-image-2-pro",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `qwen-image-2-pro`

Qwen 2 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 800 characters |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `resolution` | `--resolution` | No | enum | `2048x2048`, `2688x1536`, `1536x2688`, `2368x1728`, `1728x2368`; default `2048x2048` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 3 |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 800
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2048x2048"
      },
      {
        "id": "2688x1536"
      },
      {
        "id": "1536x2688"
      },
      {
        "id": "2368x1728"
      },
      {
        "id": "1728x2368"
      }
    ],
    "default": "2048x2048"
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
      }
    ],
    "default": 1
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  }
]
```

</details>

### `qwen-image-3.0-pro`

Qwen 3.0 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 800 characters |
| `negativePrompt` | `--negative-prompt` | No | text | maximum 500 characters |
| `resolution` | `--resolution` | No | enum | `2048x2048`, `2688x1536`, `1536x2688`, `2368x1728`, `1728x2368`; default `2048x2048` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `enhancePrompt` | `--enhance-prompt` | No | boolean | true or false; default `true` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 3 |
| `seed` | `--seed` | No | range | 0 to 2147483647; step 1 |
| `promptExtendMode` | `--prompt-extend-mode` | No | enum | `direct`, `agent`; default `direct` |
| `enableThinking` | `--enable-thinking` | No | boolean | true or false; default `true` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 800
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text",
    "maxLength": 500
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2048x2048"
      },
      {
        "id": "2688x1536"
      },
      {
        "id": "1536x2688"
      },
      {
        "id": "2368x1728"
      },
      {
        "id": "1728x2368"
      }
    ],
    "default": "2048x2048"
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
      }
    ],
    "default": 1
  },
  {
    "key": "enhancePrompt",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
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
    "key": "promptExtendMode",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "direct"
      },
      {
        "id": "agent"
      }
    ],
    "default": "direct"
  },
  {
    "key": "enableThinking",
    "label": "Deep Thinking",
    "kind": "boolean",
    "default": true
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
