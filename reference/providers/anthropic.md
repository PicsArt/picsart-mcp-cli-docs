---
description: "Anthropic model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Anthropic

**Modes:** text · **Models:** 11

This reference uses the current catalog export fetched with `@picsart/ai-sdk 7.0.0`. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| id | Name | Input type |
|---|---|---|
| `claude-fable-5-2` | Claude Fable 5.2 | `i2t` |
| `claude-fable-5-1` | Claude Fable 5.1 | `i2t` |
| `claude-fable-5` | Claude Fable 5 | `i2t` |
| `claude-opus-5-5` | Claude Opus 5.5 | `i2t` |
| `claude-opus-5` | Claude Opus 5 | `i2t` |
| `claude-opus-4-8` | Claude Opus 4.8 | `i2t` |
| `claude-sonnet-5` | Claude Sonnet 5 | `i2t` |
| `claude-sonnet-4-6` | Claude Sonnet 4.6 | `i2t` |
| `claude-sonnet-4-5` | Claude Sonnet 4.5 | `i2t` |
| `claude-haiku-5-5` | Claude Haiku 5.5 | `i2t` |
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

Full parameter surface, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `claude-fable-5-2`: Claude Fable 5.2

[Try `claude-fable-5-2` in Playground ↗](https://picsart.com/ai-playground/?model=claude-fable-5-2)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

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

### `claude-opus-5-5`: Claude Opus 5.5

[Try `claude-opus-5-5` in Playground ↗](https://picsart.com/ai-playground/?model=claude-opus-5-5)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |

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

### `claude-haiku-5-5`

Claude Haiku 5.5; input type `i2t`.

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

```bash
gen-ai pricing claude-sonnet-4-6
```

Claude analysis is priced per generation; cost is resolved per `modelId` via the backend `/options` call.
