---
description: "Kimi model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Kimi

**Modes:** text · **Models:** 3

This reference uses the current catalog export fetched with `@picsart/ai-sdk 7.0.0`. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| id | Name | Input type |
|---|---|---|
| `kimi-k3` | Kimi K3 | `i2t` |
| `kimi-k3.1-pro` | Kimi K3.1 Pro | `i2t` |
| `kimi-k3.1-pro-highspeed` | Kimi K3.1 Pro Highspeed | `i2t` |

## Parameters

Parameters come from the SDK catalog export. CLI support depends on the installed release; inspect the model and command help before using a listed flag.

### `kimi-k3`

Kimi K3; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `low`, `high`; default `high` |

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
  },
  {
    "key": "thinking",
    "label": "Thinking",
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
  }
]
```

</details>

### `kimi-k3.1-pro`: Kimi K3.1 Pro

[Try `kimi-k3.1-pro` in Playground ↗](https://picsart.com/ai-playground/?model=kimi-k3.1-pro)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `low` · `high` (default `high`) |

### `kimi-k3.1-pro-highspeed`: Kimi K3.1 Pro Highspeed

[Try `kimi-k3.1-pro-highspeed` in Playground ↗](https://picsart.com/ai-playground/?model=kimi-k3.1-pro-highspeed)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `low` · `high` (default `high`) |
