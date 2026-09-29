---
description: "Ideogram model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Ideogram

**Modes:** image · **Models:** 4

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `ideogram-v4` | Ideogram 4.0 | `t2i` |
| `ideogram-p-image` | Ideogram P-Image | `t2i` |
| `ideogram-v3` | Ideogram v3 | `t2i` |
| `ideogram-character` | Ideogram Character | `i2i` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info ideogram-v4 --json
gen-ai validate -m ideogram-v4 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m ideogram-v4 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "ideogram-v4",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `ideogram-v4`

Ideogram 4.0; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `resolution` | `--resolution` | No | enum | 38 choices; see descriptor below; default `2048x2048` |
| `renderingSpeed` | `--rendering-speed` | No | enum | `TURBO`, `DEFAULT`, `QUALITY`; default `DEFAULT` |
| `enableCopyrightDetection` | `--enable-copyright-detection` | No | boolean | true or false; default `false` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 1 |
| `imageWeight` | Use SDK or MCP | No | range | 1 to 100; step 5; default `50` |

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
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2048x2048"
      },
      {
        "id": "1440x2880"
      },
      {
        "id": "2880x1440"
      },
      {
        "id": "1664x2496"
      },
      {
        "id": "2496x1664"
      },
      {
        "id": "1792x2240"
      },
      {
        "id": "2240x1792"
      },
      {
        "id": "1440x2560"
      },
      {
        "id": "2560x1440"
      },
      {
        "id": "1600x2560"
      },
      {
        "id": "2560x1600"
      },
      {
        "id": "1728x2304"
      },
      {
        "id": "2304x1728"
      },
      {
        "id": "1296x3168"
      },
      {
        "id": "3168x1296"
      },
      {
        "id": "1152x2944"
      },
      {
        "id": "2944x1152"
      },
      {
        "id": "1248x3328"
      },
      {
        "id": "3328x1248"
      },
      {
        "id": "1280x3072"
      },
      {
        "id": "3072x1280"
      },
      {
        "id": "1024x3072"
      },
      {
        "id": "3072x1024"
      },
      {
        "id": "1024x1024"
      },
      {
        "id": "896x1120"
      },
      {
        "id": "1120x896"
      },
      {
        "id": "864x1152"
      },
      {
        "id": "1152x864"
      },
      {
        "id": "832x1248"
      },
      {
        "id": "1248x832"
      },
      {
        "id": "800x1280"
      },
      {
        "id": "1280x800"
      },
      {
        "id": "720x1280"
      },
      {
        "id": "1280x720"
      },
      {
        "id": "720x1440"
      },
      {
        "id": "1440x720"
      },
      {
        "id": "512x1536"
      },
      {
        "id": "1536x512"
      }
    ],
    "default": "2048x2048"
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "TURBO",
        "label": "Turbo"
      },
      {
        "id": "DEFAULT",
        "label": "Balanced"
      },
      {
        "id": "QUALITY",
        "label": "Quality"
      }
    ],
    "default": "DEFAULT"
  },
  {
    "key": "enableCopyrightDetection",
    "label": "Copyright Detection",
    "kind": "boolean",
    "default": false
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
    "min": 1,
    "max": 100,
    "step": 5,
    "default": 50
  }
]
```

</details>

### `ideogram-p-image`

Ideogram P-Image; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `resolution` | `--resolution` | No | enum | 36 choices; see descriptor below; default `1024x1024` |
| `renderingSpeed` | `--rendering-speed` | No | enum | `very-low`, `low`, `medium`, `high`; default `medium` |

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
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "2048x2048"
      },
      {
        "id": "1440x2880"
      },
      {
        "id": "2880x1440"
      },
      {
        "id": "1664x2496"
      },
      {
        "id": "2496x1664"
      },
      {
        "id": "1792x2240"
      },
      {
        "id": "2240x1792"
      },
      {
        "id": "1440x2560"
      },
      {
        "id": "2560x1440"
      },
      {
        "id": "1600x2560"
      },
      {
        "id": "2560x1600"
      },
      {
        "id": "1728x2304"
      },
      {
        "id": "2304x1728"
      },
      {
        "id": "1296x3168"
      },
      {
        "id": "3168x1296"
      },
      {
        "id": "1152x2944"
      },
      {
        "id": "2944x1152"
      },
      {
        "id": "1248x3328"
      },
      {
        "id": "3328x1248"
      },
      {
        "id": "1280x3072"
      },
      {
        "id": "3072x1280"
      },
      {
        "id": "1024x3072"
      },
      {
        "id": "3072x1024"
      },
      {
        "id": "1024x1024"
      },
      {
        "id": "896x1120"
      },
      {
        "id": "1120x896"
      },
      {
        "id": "864x1152"
      },
      {
        "id": "1152x864"
      },
      {
        "id": "832x1248"
      },
      {
        "id": "1248x832"
      },
      {
        "id": "800x1280"
      },
      {
        "id": "1280x800"
      },
      {
        "id": "720x1280"
      },
      {
        "id": "1280x720"
      },
      {
        "id": "720x1440"
      },
      {
        "id": "1440x720"
      }
    ],
    "default": "1024x1024"
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "very-low",
        "label": "Very Low"
      },
      {
        "id": "low",
        "label": "Low"
      },
      {
        "id": "medium",
        "label": "Balanced"
      },
      {
        "id": "high",
        "label": "Quality"
      }
    ],
    "default": "medium"
  }
]
```

</details>

### `ideogram-v3`

Ideogram v3; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `aspectRatio` | `--aspect-ratio` | No | enum | `16:9`, `9:16`, `1:1`, `3:4`, `4:3`; default `16:9` |
| `renderingSpeed` | `--rendering-speed` | No | enum | `FLASH`, `TURBO`, `DEFAULT`, `QUALITY`; default `DEFAULT` |
| `style` | `--style` | No | enum | `GENERAL`, `REALISTIC`, `DESIGN`; default `GENERAL` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `negativePrompt` | `--negative-prompt` | No | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 1 |
| `imageWeight` | `--image-weight` | No | range | 1 to 100; step 5; default `50` |

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
        "id": "16:9"
      },
      {
        "id": "9:16"
      },
      {
        "id": "1:1"
      },
      {
        "id": "3:4"
      },
      {
        "id": "4:3"
      }
    ],
    "default": "16:9"
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "FLASH",
        "label": "Flash"
      },
      {
        "id": "TURBO",
        "label": "Turbo"
      },
      {
        "id": "DEFAULT",
        "label": "Balanced"
      },
      {
        "id": "QUALITY",
        "label": "Quality"
      }
    ],
    "default": "DEFAULT"
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "GENERAL",
        "label": "General"
      },
      {
        "id": "REALISTIC",
        "label": "Realistic"
      },
      {
        "id": "DESIGN",
        "label": "Design"
      }
    ],
    "default": "GENERAL"
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
    "min": 1,
    "max": 100,
    "step": 5,
    "default": 50
  }
]
```

</details>

### `ideogram-character`

Ideogram Character; input type `i2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `resolution` | `--resolution` | No | enum | `1024x1024`, `1344x768`, `768x1344`, `1152x864`, `864x1152`, `832x1248`, `1280x800`; default `1024x1024` |
| `renderingSpeed` | `--rendering-speed` | No | enum | `TURBO`, `DEFAULT`, `QUALITY`; default `DEFAULT` |
| `style` | `--style` | No | enum | `AUTO`, `REALISTIC`, `FICTION`; default `AUTO` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |

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
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "1024x1024"
      },
      {
        "id": "1344x768"
      },
      {
        "id": "768x1344"
      },
      {
        "id": "1152x864"
      },
      {
        "id": "864x1152"
      },
      {
        "id": "832x1248"
      },
      {
        "id": "1280x800"
      }
    ],
    "default": "1024x1024"
  },
  {
    "key": "renderingSpeed",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "TURBO",
        "label": "Turbo"
      },
      {
        "id": "DEFAULT",
        "label": "Balanced"
      },
      {
        "id": "QUALITY",
        "label": "Quality"
      }
    ],
    "default": "DEFAULT"
  },
  {
    "key": "style",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "AUTO",
        "label": "Auto"
      },
      {
        "id": "REALISTIC",
        "label": "Realistic"
      },
      {
        "id": "FICTION",
        "label": "Fiction"
      }
    ],
    "default": "AUTO"
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
    "label": "Character Reference",
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

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
