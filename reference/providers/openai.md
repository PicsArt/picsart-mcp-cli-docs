---
description: "OpenAI model IDs, parameters, and CLI and MCP usage on Picsart."
---

# OpenAI

**Modes:** image, text · **Models:** 24

This reference uses the current catalog export fetched with `@picsart/ai-sdk 7.0.0`. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| id | Name | Input type |
|---|---|---|
| `gpt-image-2.6-sunburst` | GPT Image 2.6 Sunburst | `t2i` |
| `gpt-image-2.6-flare` | GPT Image 2.6 Flare | `t2i` |
| `gpt-image-2.5-sunburst` | GPT Image 2.5 Sunburst | `t2i` |
| `gpt-image-2.5-flare` | GPT Image 2.5 Flare | `t2i` |
| `gpt-image-2` | GPT Image 2 | `t2i` |
| `gpt-image-1.5` | GPT Image 1.5 | `t2i` |
| `gpt-6-luna-decisions` | GPT-6 Luna Decisions | `i2t` |
| `gpt-6.1-sol` | GPT-6.1 Sol | `i2t` |
| `gpt-6.1-terra` | GPT-6.1 Terra | `i2t` |
| `gpt-6-astra` | GPT-6 Astra | `i2t` |
| `gpt-6-sol` | GPT-6 Sol | `i2t` |
| `gpt-6-luna` | GPT-6 Luna | `i2t` |
| `gpt-5.6-sol` | GPT-5.6 Sol | `i2t` |
| `gpt-5.6-terra` | GPT-5.6 Terra | `i2t` |
| `gpt-5.6-luna` | GPT-5.6 Luna | `i2t` |
| `gpt-5.5` | GPT-5.5 | `i2t` |
| `gpt-5.2` | GPT-5.2 | `i2t` |
| `gpt-5.1` | GPT-5.1 | `i2t` |
| `gpt-5` | GPT-5 | `i2t` |
| `gpt-5-mini` | GPT-5 Mini | `i2t` |
| `gpt-4o` | GPT-4o | `i2t` |
| `gpt-4o-mini` | GPT-4o Mini | `i2t` |
| `gpt-4.1-mini` | GPT-4.1 Mini | `i2t` |
| `gpt-4.1-nano` | GPT-4.1 Nano | `i2t` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info gpt-image-2 --json
gen-ai validate -m gpt-image-2 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m gpt-image-2 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "gpt-image-2",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Parameters come from the SDK catalog export. CLI support depends on the installed release; inspect the model and command help before using a listed flag.

### `gpt-image-2.6-sunburst`: GPT Image 2.6 Sunburst

[Try `gpt-image-2.6-sunburst` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-2.6-sunburst)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤32000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `resolution` | `-r` | enum | `1K` · `2K` · `4K` (default `1K`) |
| `size` | `--size` | text | free text |
| `reasoningEffort` | `--reasoning-effort` | enum | `max` · `xhigh` · `high` · `medium` · `low` (default `high`) |
| `temperature` | `--temperature` | range | `0`–`2`, step 0.1 (default `1`) |
| `background` | `--background` | enum | `opaque` · `transparent` (default `opaque`) |
| `outputFormat` | `--output-format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 16) |

### `gpt-image-2.6-flare`: GPT Image 2.6 Flare

[Try `gpt-image-2.6-flare` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-image-2.6-flare)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤32000 chars) |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `resolution` | `-r` | enum | `1K` · `2K` · `4K` (default `1K`) |
| `size` | `--size` | text | free text |
| `reasoningEffort` | `--reasoning-effort` | enum | `max` · `xhigh` · `high` · `medium` · `low` (default `high`) |
| `temperature` | `--temperature` | range | `0`–`2`, step 0.1 (default `1`) |
| `background` | `--background` | enum | `opaque` · `transparent` (default `opaque`) |
| `outputFormat` | `--output-format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 16) |

### `gpt-image-2.5-sunburst`

GPT Image 2.5 Sunburst; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 32000 characters |
| `aspectRatio` | Use SDK or MCP | No | enum | `1:1`, `3:2`, `2:3`, `16:9`, `9:16`, `4:3`, `3:4`, `auto`; default `1:1` |
| `resolution` | Use SDK or MCP | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `size` | Use SDK or MCP | No | text | Text |
| `quality` | Use SDK or MCP | No | enum | `max`, `xhigh`, `high`, `medium`, `low`; default `high` |
| `background` | Use SDK or MCP | No | enum | `opaque`, `transparent`; default `opaque` |
| `outputFormat` | Use SDK or MCP | No | enum | `png`, `jpeg`, `webp`; default `png` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 16 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 32000
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "auto"
      }
    ],
    "default": "1:1"
  },
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
    "key": "size",
    "label": "Custom Size",
    "kind": "text",
    "placeholder": "WIDTHxHEIGHT, e.g. 2048x1152"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "max"
      },
      {
        "id": "xhigh"
      },
      {
        "id": "high"
      },
      {
        "id": "medium"
      },
      {
        "id": "low"
      }
    ],
    "default": "high"
  },
  {
    "key": "background",
    "label": "Background",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "opaque"
      },
      {
        "id": "transparent"
      }
    ],
    "default": "opaque"
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "png"
      },
      {
        "id": "jpeg"
      },
      {
        "id": "webp"
      }
    ],
    "default": "png"
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
      "max": 16
    }
  }
]
```

</details>

### `gpt-image-2.5-flare`

GPT Image 2.5 Flare; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 32000 characters |
| `aspectRatio` | Use SDK or MCP | No | enum | `1:1`, `3:2`, `2:3`, `16:9`, `9:16`, `4:3`, `3:4`, `auto`; default `1:1` |
| `resolution` | Use SDK or MCP | No | enum | `1K`, `2K`, `4K`; default `1K` |
| `size` | Use SDK or MCP | No | text | Text |
| `quality` | Use SDK or MCP | No | enum | `max`, `xhigh`, `high`, `medium`, `low`; default `high` |
| `background` | Use SDK or MCP | No | enum | `opaque`, `transparent`; default `opaque` |
| `outputFormat` | Use SDK or MCP | No | enum | `png`, `jpeg`, `webp`; default `png` |
| `count` | Use SDK or MCP | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 16 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 32000
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "auto"
      }
    ],
    "default": "1:1"
  },
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
    "key": "size",
    "label": "Custom Size",
    "kind": "text",
    "placeholder": "WIDTHxHEIGHT, e.g. 2048x1152"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "max"
      },
      {
        "id": "xhigh"
      },
      {
        "id": "high"
      },
      {
        "id": "medium"
      },
      {
        "id": "low"
      }
    ],
    "default": "high"
  },
  {
    "key": "background",
    "label": "Background",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "opaque"
      },
      {
        "id": "transparent"
      }
    ],
    "default": "opaque"
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "png"
      },
      {
        "id": "jpeg"
      },
      {
        "id": "webp"
      }
    ],
    "default": "png"
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
      "max": 16
    }
  }
]
```

</details>

### `gpt-image-2`

GPT Image 2; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 32000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `3:2`, `2:3`, `16:9`, `9:16`, `4:3`, `3:4`, `auto`; default `1:1` |
| `quality` | `--quality` | No | enum | `high`, `medium`, `low`; default `high` |
| `outputFormat` | `--output-format` | No | enum | `png`, `jpeg`, `webp`; default `png` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 5 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 32000
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      },
      {
        "id": "auto"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "high"
      },
      {
        "id": "medium"
      },
      {
        "id": "low"
      }
    ],
    "default": "high"
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "png"
      },
      {
        "id": "jpeg"
      },
      {
        "id": "webp"
      }
    ],
    "default": "png"
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
      "max": 5
    }
  }
]
```

</details>

### `gpt-image-1.5`

GPT Image 1.5; input type `t2i`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 32000 characters |
| `aspectRatio` | `--aspect-ratio` | No | enum | `1:1`, `3:2`, `2:3`, `16:9`, `9:16`, `4:3`, `3:4`; default `1:1` |
| `quality` | `--quality` | No | enum | `high`, `medium`, `low`; default `high` |
| `background` | `--background` | No | enum | `opaque`, `transparent`; default `opaque` |
| `outputFormat` | `--output-format` | No | enum | `png`, `jpeg`, `webp`; default `png` |
| `count` | `--count` | No | enum | `1`, `2`, `4`, `6`, `8`, `10`; default `1` |
| `imageUrls` | `--image` | No | file | image input; array; maximum 5 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 32000
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      }
    ],
    "default": "1:1"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "high"
      },
      {
        "id": "medium"
      },
      {
        "id": "low"
      }
    ],
    "default": "high"
  },
  {
    "key": "background",
    "label": "Background",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "opaque"
      },
      {
        "id": "transparent"
      }
    ],
    "default": "opaque"
  },
  {
    "key": "outputFormat",
    "label": "Format",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "png"
      },
      {
        "id": "jpeg"
      },
      {
        "id": "webp"
      }
    ],
    "default": "png"
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
      "max": 5
    }
  }
]
```

</details>

### `gpt-6-luna-decisions`: GPT-6 Luna Decisions

[Try `gpt-6-luna-decisions` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-6-luna-decisions)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `input` | `--input` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `questions` | `--questions-type` · `--questions-name` · `--questions-instructions` · `--questions-choices` · `--questions-levels` | object[] | `{type, name, instructions, choices, levels}` |

### `gpt-6.1-sol`: GPT-6.1 Sol

[Try `gpt-6.1-sol` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-6.1-sol)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-6.1-terra`: GPT-6.1 Terra

[Try `gpt-6.1-terra` in Playground ↗](https://picsart.com/ai-playground/?model=gpt-6.1-terra)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `off` · `low` · `medium` · `high` (default `off`) |

### `gpt-6-astra`

GPT-6 Astra; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-6-sol`

GPT-6 Sol; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-6-luna`

GPT-6 Luna; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.6-sol`

GPT-5.6 Sol; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.6-terra`

GPT-5.6 Terra; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.6-luna`

GPT-5.6 Luna; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.5`

GPT-5.5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | Text |
| `imageUrls` | `--image` | No | file | image input; array; maximum 8 |
| `thinking` | `--thinking` | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.2`

GPT-5.2; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5.1`

GPT-5.1; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5`

GPT-5; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-5-mini`

GPT-5 Mini; input type `i2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | Text |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 8 |
| `thinking` | Use SDK or MCP | No | enum | `off`, `low`, `medium`, `high`; default `off` |

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
        "id": "off"
      },
      {
        "id": "low"
      },
      {
        "id": "medium"
      },
      {
        "id": "high"
      }
    ],
    "default": "off"
  }
]
```

</details>

### `gpt-4o`

GPT-4o; input type `i2t`.

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

### `gpt-4o-mini`

GPT-4o Mini; input type `i2t`.

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

### `gpt-4.1-mini`

GPT-4.1 Mini; input type `i2t`.

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

### `gpt-4.1-nano`

GPT-4.1 Nano; input type `i2t`.

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

## Pricing

Check current model pricing before generating:

```bash
gen-ai pricing gpt-image-2
```

Image cost depends on the model and output settings. See [Pricing](/guide/pricing).
