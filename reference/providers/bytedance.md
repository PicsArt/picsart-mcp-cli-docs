---
description: "ByteDance model IDs, parameters, and CLI and MCP usage on Picsart."
---

# ByteDance

**Modes:** video · **Models:** 2

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `bytedance-omnihuman-v1.5` | ByteDance OmniHuman | `i2v` |
| `bytedance-video-enhance` | ByteDance Video Enhance | `v2v` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info bytedance-omnihuman-v1.5 --json
gen-ai validate -m bytedance-omnihuman-v1.5 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m bytedance-omnihuman-v1.5 --prompt "A quiet forest at sunrise" --image "https://example.com/input.jpg" --audio "https://example.com/input.mp3" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "bytedance-omnihuman-v1.5",
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

### `bytedance-omnihuman-v1.5`

ByteDance OmniHuman; input type `i2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | No | text | maximum 300 characters |
| `imageUrls` | `--image` | Yes | file | image input; array; maximum 1 |
| `audioUrl` | `--audio` | Yes | file | audio input |
| `resolution` | `--resolution` | No | enum | `720p`, `1080p`; default `1080p` |
| `turboMode` | `--turbo-mode` | No | boolean | true or false; default `false` |
| `seed` | `--seed` | No | range | -1 to 2147483647; default `-1` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 300
  },
  {
    "key": "imageUrls",
    "label": "Portrait Image",
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
      }
    ],
    "default": "1080p"
  },
  {
    "key": "turboMode",
    "label": "Turbo Mode",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "seed",
    "kind": "range",
    "min": -1,
    "max": 2147483647,
    "default": -1
  }
]
```

</details>

### `bytedance-video-enhance`

ByteDance Video Enhance; input type `v2v`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrl` | `--video` | Yes | file | video input |
| `quality` | `--quality` | No | enum | `standard`, `professional`; default `standard` |
| `resolution` | `--resolution` | No | enum | `source`, `720p`, `1080p`, `2k`, `4k`, `8k`; default `source` |
| `fps` | `--fps` | No | enum | `30`, `60`, `120`; default `30` |
| `scene` | `--scene` | No | enum | `common`, `ugc`, `short_series`, `aigc`, `old_film`; default `common` |
| `bitrateLevel` | `--bitrate-level` | No | enum | `low`, `medium`, `high`; default `medium` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoUrl",
    "label": "Source Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "video"
  },
  {
    "key": "quality",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "standard"
      },
      {
        "id": "professional"
      }
    ],
    "default": "standard"
  },
  {
    "key": "resolution",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "source"
      },
      {
        "id": "720p"
      },
      {
        "id": "1080p"
      },
      {
        "id": "2k"
      },
      {
        "id": "4k"
      },
      {
        "id": "8k"
      }
    ],
    "default": "source"
  },
  {
    "key": "fps",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 30
      },
      {
        "id": 60
      },
      {
        "id": 120
      }
    ],
    "default": 30
  },
  {
    "key": "scene",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "common"
      },
      {
        "id": "ugc"
      },
      {
        "id": "short_series"
      },
      {
        "id": "aigc"
      },
      {
        "id": "old_film"
      }
    ],
    "default": "common"
  },
  {
    "key": "bitrateLevel",
    "kind": "enum",
    "valueType": "string",
    "options": [
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
    "default": "medium"
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
