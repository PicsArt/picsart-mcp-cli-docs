---
description: "Anthropic model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Anthropic

**Modes:** text · **Models:** 8

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `claude-fable-5-1` | Claude Fable 5.1 | `i2t` |
| `claude-fable-5` | Claude Fable 5 | `i2t` |
| `claude-opus-5` | Claude Opus 5 | `i2t` |
| `claude-opus-4-8` | Claude Opus 4.8 | `i2t` |
| `claude-sonnet-5` | Claude Sonnet 5 | `i2t` |
| `claude-sonnet-4-6` | Claude Sonnet 4.6 | `i2t` |
| `claude-sonnet-4-5` | Claude Sonnet 4.5 | `i2t` |
| `claude-haiku-4-5` | Claude Haiku 4.5 | `i2t` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info claude-opus-4-8 --json
gen-ai validate -m claude-opus-4-8 --schema
```

The following requests return text and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m claude-opus-4-8 --prompt "Describe a quiet forest at sunrise in two sentences."
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "claude-opus-4-8",
    "prompt": "Describe a quiet forest at sunrise in two sentences."
  }
}
```

Text results are returned synchronously.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `claude-fable-5-1`

Claude Fable 5.1; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-fable-5`

Claude Fable 5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-opus-5`

Claude Opus 5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-opus-4-8`

Claude Opus 4.8; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-sonnet-5`

Claude Sonnet 5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-sonnet-4-6`

Claude Sonnet 4.6; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-sonnet-4-5`

Claude Sonnet 4.5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

### `claude-haiku-4-5`

Claude Haiku 4.5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |

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
    "key": "imageUrls",
    "label": "Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 8
    }
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
