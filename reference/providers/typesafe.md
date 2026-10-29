---
description: "TypeSafe model IDs, parameters, and CLI and MCP usage on Picsart."
---

# TypeSafe

**Modes:** json · **Models:** 1

This reference uses the `@picsart/ai-sdk 6.48.1` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `typesafe-evaluate` | Jev | `t2t` |

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
