---
description: "Creatify model IDs, parameters, and CLI and MCP usage on Picsart."
---

# Creatify

**Modes:** video · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `creatify-aurora` | Creatify Aurora HD | `i2v` |
| `creatify-boreal` | Creatify Boreal | `t2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info creatify-aurora --json
gen-ai validate -m creatify-aurora --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m creatify-aurora --prompt "A quiet forest at sunrise" --image "https://example.com/input.jpg" --audio "https://example.com/input.mp3" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "creatify-aurora",
    "prompt": "A quiet forest at sunrise",
    "async": true,
    "imageUrls": [
      "https://example.com/input.jpg"
    ],
    "extra": {
      "audioUrl": "https://example.com/input.mp3"
    }
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `creatify-aurora`

Creatify Aurora HD; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | Text |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text"
  },
  {
    "key": "imageUrls",
    "label": "Product Image",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  }
]
```

</details>

### `creatify-boreal`

Creatify Boreal; input type `t2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | Use SDK or MCP | Yes | text | maximum 5000 characters |
| `imageUrls` | Use SDK or MCP | No | file | image input; array; maximum 1 |
| `audioUrl` | Use SDK or MCP | No | file | audio input |
| `negativePrompt` | Use SDK or MCP | No | text | Text |
| `resolution` | Use SDK or MCP | No | enum | `720p`, `1080p`, `2k`; default `720p` |
| `aspectRatio` | Use SDK or MCP | No | enum | `auto`, `16:9`, `9:16`, `1:1`, `4:3`, `3:4`; default `auto` |
| `duration` | Use SDK or MCP | No | range | 1 to 20; step 1; default `10` |
| `manifestDisclosure` | Use SDK or MCP | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "imageUrls",
    "label": "Reference Image",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "image",
    "array": {
      "max": 1
    }
  },
  {
    "key": "audioUrl",
    "label": "Audio Track",
    "required": false,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "negativePrompt",
    "label": "Negative Prompt",
    "kind": "text"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "2k"
      }
    ],
    "default": "720p"
  },
  {
    "key": "aspectRatio",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "auto"
      },
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
        "id": "4:3"
      },
      {
        "id": "3:4"
      }
    ],
    "default": "auto"
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 1,
    "max": 20,
    "step": 1,
    "default": 10
  },
  {
    "key": "manifestDisclosure",
    "label": "AI-Generated Disclosure",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
