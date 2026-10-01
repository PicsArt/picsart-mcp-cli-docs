---
description: "Recraft model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Recraft

**Modes:** image · **Models:** 25

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `recraftv4_1` | Recraft V4.1 | `t2i` |
| `recraftv4_1_pro` | Recraft V4.1 Pro | `t2i` |
| `recraftv4_1_utility` | Recraft V4.1 Utility | `t2i` |
| `recraftv4_1_utility_pro` | Recraft V4.1 Utility Pro | `t2i` |
| `recraftv4_1_flash` | Recraft V4.1 Flash | `t2i` |
| `recraftv4_1_vector` | Recraft V4.1 Vector | `t2i` |
| `recraftv4_1_pro_vector` | Recraft V4.1 Pro Vector | `t2i` |
| `recraftv4_1_utility_vector` | Recraft V4.1 Utility Vector | `t2i` |
| `recraftv4_1_utility_pro_vector` | Recraft V4.1 Utility Pro Vector | `t2i` |
| `recraftv4` | Recraft V4 | `t2i` |
| `recraftv3` | Recraft V3 | `t2i` |
| `recraftv4_pro` | Recraft V4 Pro | `t2i` |
| `recraftv4_vector` | Recraft V4 Vector | `t2i` |
| `recraftv4_pro_vector` | Recraft V4 Pro Vector | `t2i` |
| `recraftv4_styles` | Recraft V4 Styles | `t2i` |
| `recraftv4_styles_vector` | Recraft V4 Styles Vector | `t2i` |
| `recraftv4_styles_pro` | Recraft V4 Styles Pro | `t2i` |
| `recraftv4_styles_pro_vector` | Recraft V4 Styles Pro Vector | `t2i` |
| `recraftv3_vector` | Recraft V3 Vector | `t2i` |
| `recraft-vectorize` | Recraft Vectorize | `i2i` |
| `recraft-creative-upscale` | Recraft Creative Upscale | `i2i` |
| `recraft-crisp-upscale` | Recraft Crisp Upscale | `i2i` |
| `recraftv3-replace-bg` | Recraft Replace Background | `i2i` |
| `recraft-explore` | Recraft Explore | `t2i` |
| `recraft-explore-similar` | Recraft Explore Similar | `i2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info recraftv4_1 --json
gen-ai validate -m recraftv4_1 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m recraftv4_1 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "recraftv4_1",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `recraftv4_1`

Recraft V4.1; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_pro`

Recraft V4.1 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_utility`

Recraft V4.1 Utility; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_utility_pro`

Recraft V4.1 Utility Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_flash`

Recraft V4.1 Flash; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 10000 characters |
| `aspectRatio` | Use SDK or MCP | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `4`, `6`; default `1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
  }
]
```

</details>

### `recraftv4_1_vector`

Recraft V4.1 Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_pro_vector`

Recraft V4.1 Pro Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_utility_vector`

Recraft V4.1 Utility Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_1_utility_pro_vector`

Recraft V4.1 Utility Pro Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4`

Recraft V4; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `style` | `--style` | No | enum | `raster`, `vector_illustration`; default `raster` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "raster",
        "label": "Raster"
      },
      {
        "id": "vector_illustration",
        "label": "Vector (SVG)"
      }
    ],
    "default": "raster"
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv3`

Recraft V3; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `style` | `--style` | No | enum | `realistic_image`, `digital_illustration`, `vector_illustration`, `any`; default `realistic_image` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 1000
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "realistic_image",
        "label": "Realistic"
      },
      {
        "id": "digital_illustration",
        "label": "Illustration"
      },
      {
        "id": "vector_illustration",
        "label": "Vector (SVG)"
      },
      {
        "id": "any",
        "label": "Any"
      }
    ],
    "default": "realistic_image"
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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_pro`

Recraft V4 Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `style` | `--style` | No | enum | `raster`, `vector_illustration`; default `raster` |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "raster",
        "label": "Raster"
      },
      {
        "id": "vector_illustration",
        "label": "Vector (SVG)"
      }
    ],
    "default": "raster"
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_vector`

Recraft V4 Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_pro_vector`

Recraft V4 Pro Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 0 to 100; step 5; default `80` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
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
    "key": "imageUrls",
    "label": "Source Image",
    "required": false,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "imageWeight",
    "label": "Image Weight",
    "kind": "range",
    "min": 0,
    "max": 100,
    "step": 5,
    "default": 80
  }
]
```

</details>

### `recraftv4_styles`

Recraft V4 Styles; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; minimum 1; maximum 5 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "imageUrls",
    "label": "Style References",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "min": 1,
      "max": 5
    },
    "maxBytes": 10485760
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
  }
]
```

</details>

### `recraftv4_styles_vector`

Recraft V4 Styles Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; minimum 1; maximum 5 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "imageUrls",
    "label": "Style References",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "min": 1,
      "max": 5
    },
    "maxBytes": 10485760
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
  }
]
```

</details>

### `recraftv4_styles_pro`

Recraft V4 Styles Pro; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; minimum 1; maximum 5 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "imageUrls",
    "label": "Style References",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "min": 1,
      "max": 5
    },
    "maxBytes": 10485760
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
  }
]
```

</details>

### `recraftv4_styles_pro_vector`

Recraft V4 Styles Pro Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; minimum 1; maximum 5 |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "imageUrls",
    "label": "Style References",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "min": 1,
      "max": 5
    },
    "maxBytes": 10485760
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
  }
]
```

</details>

### `recraftv3_vector`

Recraft V3 Vector; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`; default `1` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 1000
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
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  }
]
```

</details>

### `recraft-vectorize`

Recraft Vectorize; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 1000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 1000
  },
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

### `recraft-creative-upscale`

Recraft Creative Upscale; input type `i2i`.

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

### `recraft-crisp-upscale`

Recraft Crisp Upscale; input type `i2i`.

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

### `recraftv3-replace-bg`

Recraft Replace Background; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 1000 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 1000
  },
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

### `recraft-explore`

Recraft Explore; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 1000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 1000
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

### `recraft-explore-similar`

Recraft Explore Similar; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `4:3`, `3:4`, `3:2`, `2:3`, `16:9`, `9:16`, `2:1`, `1:2`; default `1:1` |
| `sourceImageId` | `--source-image-id` | Yes | text | Text |
| `similarity` | `--similarity` | No | range | 1 to 5; step 1; default `3` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
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
  },
  {
    "key": "sourceImageId",
    "label": "Source Image ID",
    "required": true,
    "kind": "text"
  },
  {
    "key": "similarity",
    "kind": "range",
    "min": 1,
    "max": 5,
    "step": 1,
    "default": 3
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
