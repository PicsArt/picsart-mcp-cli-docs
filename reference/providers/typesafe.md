---
description: "TypeSafe model IDs, parameters, and CLI and MCP usage on Picsart."
---

# TypeSafe

**Modes:** json · **Models:** 1

This reference uses the current catalog export fetched with `@picsart/ai-sdk 7.0.0`. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| id | Name | Input type |
|---|---|---|
| `typesafe-evaluate` | Jev | `i2t` |

## Parameters

Parameters from the SDK 6.29.0 catalog.

### `typesafe-evaluate`

Jev; input type `t2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `state` | Use SDK or MCP | Yes | text | Text |
| `questions` | Use SDK or MCP | Yes | object | Structured input; see descriptor below |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "state",
    "label": "Content",
    "required": true,
    "kind": "text"
  },
  {
    "key": "questions",
    "label": "Questions",
    "required": true,
    "kind": "object",
    "additionalProperties": {
      "kind": "object",
      "fields": {
        "type": {
          "kind": "enum",
          "valueType": "string",
          "default": "noul",
          "required": true,
          "options": [
            {
              "id": "noul",
              "label": "Yes/No"
            },
            {
              "id": "choice",
              "label": "Choice"
            },
            {
              "id": "score",
              "label": "Score"
            }
          ]
        },
        "instructions": {
          "kind": "unknown",
          "required": true
        }
      },
      "additionalProperties": {
        "kind": "unknown"
      }
    }
  }
]
```

</details>

## Availability

This reference describes the SDK catalog. Do not assume that `gen-ai generate`, `picsart_generate`, or the Playground supports structured evaluation merely because the model is listed here. Inspect the interface's model discovery and supported execution methods before use.
