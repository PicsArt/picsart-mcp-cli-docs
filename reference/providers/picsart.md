---
description: "Picsart model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Picsart

**Modes:** image, video · **Models:** 9

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `picsart-change-bg` | Picsart Change Background | `i2i` |
| `picsart-sod-v8-2` | Remove Background | `i2i` |
| `picsart-enhance` | Enhance | `i2i` |
| `picsart-qwen-image-edit` | Picsart Image Edit | `i2i` |
| `picsart-qwen-makeup` | Picsart Makeup | `i2i` |
| `picsart-flux-2-klein` | Flux 2 Klein 4B | `t2i` |
| `picsart-sana-sprint-v1` | Picsart SANA-Sprint | `t2i` |
| `picsart-flow` | Picsart Effects | `i2i` |
| `picsart-flow-video` | Picsart Effects Video | `i2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info picsart-change-bg --json
gen-ai validate -m picsart-change-bg --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m picsart-change-bg --image "https://example.com/input.jpg" --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "picsart-change-bg",
    "prompt": "A quiet forest at sunrise",
    "async": true,
    "imageUrls": [
      "https://example.com/input.jpg"
    ]
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `picsart-change-bg`

Picsart Change Background; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `prompt` | `--prompt` | Yes | text | maximum 460 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 460
  }
]
```

</details>

### `picsart-sod-v8-2`

Remove Background; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": true,
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

### `picsart-enhance`

Enhance; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": true,
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

### `picsart-qwen-image-edit`

Picsart Image Edit; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 3 |
| `prompt` | `--prompt` | Yes | text | Text |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Source Images",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `picsart-qwen-makeup`

Picsart Makeup; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `prompt` | `--prompt` | Yes | text | Text |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "imageUrls",
    "label": "Portrait",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `picsart-flux-2-klein`

Flux 2 Klein 4B; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `5:3`, `3:5`, `4:3`, `3:4`; default `1:1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 3 |

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
        "id": "5:3"
      },
      {
        "id": "3:5"
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
    "key": "imageUrls",
    "label": "Reference Images",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  }
]
```

</details>

### `picsart-sana-sprint-v1`

Picsart SANA-Sprint; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |

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
        "id": "4:3"
      },
      {
        "id": "3:4"
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
        "id": "2:1"
      },
      {
        "id": "1:2"
      }
    ],
    "default": "1:1"
  }
]
```

</details>

### `picsart-flow`

Picsart Effects; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `templateId` | `--template-id` | Yes | catalog | Account-dependent ID; see catalog source below |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 3 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "templateId",
    "label": "Effect Preset",
    "required": true,
    "kind": "catalog",
    "source": {
      "workflow": "picsart-flow/v1/catalog/templates",
      "modelId": "picsart-flow"
    },
    "default": ""
  },
  {
    "key": "imageUrls",
    "label": "Your Photo",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `picsart-flow-video`

Picsart Effects Video; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `templateId` | `--template-id` | Yes | catalog | Account-dependent ID; see catalog source below |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 3 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "templateId",
    "label": "Effect Preset",
    "required": true,
    "kind": "catalog",
    "source": {
      "workflow": "picsart-flow/v1/catalog/templates",
      "modelId": "picsart-flow-video"
    },
    "default": ""
  },
  {
    "key": "imageUrls",
    "label": "Your Photo",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 3
    }
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
