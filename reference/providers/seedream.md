---
description: "Seedream model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Seedream

**Modes:** image · **Models:** 5

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `seedream-5.0-flash` | Seedream 5.0 Flash | `t2i` |
| `seedream-5.0-pro` | Seedream 5.0 Pro | `t2i` |
| `seedream-5.0-lite` | Seedream 5.0 Lite | `t2i` |
| `seedream-4.7` | Seedream 4.7 | `t2i` |
| `seedream-4.5` | Seedream 4.5 | `t2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info seedream-5.0-pro --json
gen-ai validate -m seedream-5.0-pro --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m seedream-5.0-pro --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "seedream-5.0-pro",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `seedream-5.0-flash`

Seedream 5.0 Flash; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | Use SDK or MCP | No | enum | `1K`, `2K`; default `1K` |
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `aspectRatio` | Use SDK or MCP | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 10 |
| `negativePrompt` | Use SDK or MCP | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1K"
      },
      {
        "id": "2K"
      }
    ],
    "default": "1K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-5.0-pro`

Seedream 5.0 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `1K`, `2K`; default `1K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 10 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1K"
      },
      {
        "id": "2K"
      }
    ],
    "default": "1K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 10
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-5.0-lite`

Seedream 5.0 Lite; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `2K`, `3K`; default `2K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2K"
      },
      {
        "id": "3K"
      }
    ],
    "default": "2K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-4.7`

Seedream 4.7; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1K"
      },
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "1K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `seedream-4.5`

Seedream 4.5; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `resolution` | `--resolution` | No | enum | `2K`, `4K`; default `2K` |
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `16:9`, `9:16`, `3:2`, `2:3`, `21:9`; default `16:9` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 2 |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2K"
      },
      {
        "id": "4K"
      }
    ],
    "default": "2K"
  },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "3:2"
      },
      {
        "id": "2:3"
      },
      {
        "id": "21:9"
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
      "max": 2
    }
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
