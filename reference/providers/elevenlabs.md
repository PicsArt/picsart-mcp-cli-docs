---
description: "ElevenLabs model IDs, parameters, and CLI and MCP usage on Picsart."
---

# ElevenLabs

**Modes:** audio, text · **Models:** 17

This reference uses the `@picsart/ai-sdk 6.18.0` catalog snapshot. The hosted MCP server and your CLI version can expose different models. Check `picsart_model_catalog` or `gen-ai models info` before submitting a request.

## Models

| ID | Name | Input type |
|---|---|---|
| `eleven-v4` | Eleven v4 | `tts` |
| `eleven-v4-turbo` | Eleven v4 Turbo | `tts` |
| `eleven-v3` | Eleven v3 | `tts` |
| `eleven-multilingual-v2` | Eleven Multilingual v2 | `tts` |
| `eleven-dialogue-v4` | Eleven Dialogue v4 | `tts` |
| `eleven-text-to-dialogue` | Eleven Dialogue v3 | `tts` |
| `elevenlabs-sfx` | ElevenLabs SFX v2 | `sfx` |
| `elevenlabs-music-v2` | ElevenLabs Music v2 | `music` |
| `eleven-speech-to-text` | Eleven Scribe v2 | `a2t` |
| `eleven-video-to-music` | Eleven Video to Music | `v2a` |
| `eleven-sts-v2` | Eleven STS v2 | `sts` |
| `eleven-multilingual-sts-v2` | Eleven Multilingual STS v2 | `sts` |
| `eleven-audio-isolation` | Eleven Audio Isolation | `sts` |
| `eleven-dubbing` | Eleven Dubbing | `sts` |
| `eleven-voice-design-v3` | Eleven Voice Design v3 | `tts` |
| `eleven-voice-design-v2` | Eleven Voice Design Multilingual v2 | `tts` |
| `eleven-voice-create` | Eleven Voice Previews | `tts` |

## Example

First inspect the model without generating media:

```bash
gen-ai models info eleven-v3 --json
gen-ai validate -m eleven-v3 --schema
```

The following requests generate media and consume credits. Replace any `example.com` input URL with your own directly accessible asset. Check the [price](/guide/pricing) before submitting.

```bash
gen-ai generate -m eleven-v3 --prompt "A quiet forest at sunrise" --download ./output
```

Equivalent hosted MCP request:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "eleven-v3",
    "prompt": "A quiet forest at sunrise",
    "async": true
  }
}
```

If the response contains a job, use [job status](/guide/mcp-quickstart) to wait for that job. Do not submit the generation again to poll it.

## Parameters

Required inputs and defaults below describe the model, not every command that calls it. For example, `gen-ai describe` can supply its own question. CLI flags are checked against version 2.78.0. Model-specific MCP parameters belong in `extra`; see [the request format](/guide/mcp-quickstart).

### `eleven-v4`

Eleven v4; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | Use SDK or MCP | No | text | Text |
| `prompt` | Use SDK or MCP | Yes | text | maximum 10000 characters |
| `voiceId` | Use SDK or MCP | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `withTimestamps` | Use SDK or MCP | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "withTimestamps",
    "label": "Character Timings",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-v4-turbo`

Eleven v4 Turbo; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | Use SDK or MCP | No | text | Text |
| `prompt` | Use SDK or MCP | Yes | text | maximum 10000 characters |
| `voiceId` | Use SDK or MCP | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `withTimestamps` | Use SDK or MCP | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 10000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "withTimestamps",
    "label": "Character Timings",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-v3`

Eleven v3; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `language` | `--language` | No | text | Text |
| `prompt` | `--prompt` | Yes | text | maximum 5000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `styleExaggeration` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `speed` | Use SDK or MCP | No | range | 0.1 to 5; step 0.05 |
| `useSpeakerBoost` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `withTimestamps` | Use SDK or MCP | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 5000
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "styleExaggeration",
    "label": "Style Exaggeration",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "speed",
    "label": "Speed",
    "kind": "range",
    "min": 0.1,
    "max": 5,
    "step": 0.05
  },
  {
    "key": "useSpeakerBoost",
    "label": "Speaker Boost",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "withTimestamps",
    "label": "Character Timings",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-multilingual-v2`

Eleven Multilingual v2; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 10000 characters |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `styleExaggeration` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `speed` | Use SDK or MCP | No | range | 0.1 to 5; step 0.05 |
| `useSpeakerBoost` | Use SDK or MCP | No | boolean | true or false; default `true` |
| `withTimestamps` | Use SDK or MCP | No | boolean | true or false; default `false` |

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
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "styleExaggeration",
    "label": "Style Exaggeration",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "speed",
    "label": "Speed",
    "kind": "range",
    "min": 0.1,
    "max": 5,
    "step": 0.05
  },
  {
    "key": "useSpeakerBoost",
    "label": "Speaker Boost",
    "kind": "boolean",
    "default": true
  },
  {
    "key": "withTimestamps",
    "label": "Character Timings",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-dialogue-v4`

Eleven Dialogue v4; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `dialogue` | Use SDK or MCP | Yes | object | Structured input; see descriptor below; array; minimum 1 |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarity` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `language` | Use SDK or MCP | No | text | Text |
| `seed` | Use SDK or MCP | No | range | 0 to 4294967295; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "dialogue",
    "label": "Dialogue",
    "required": true,
    "kind": "object",
    "array": {
      "min": 1
    },
    "fields": {
      "voiceId": {
        "label": "Voice ID",
        "kind": "text",
        "placeholder": "JBFqnCBsd6RMkjVDRZzb"
      },
      "text": {
        "label": "Line",
        "kind": "text",
        "maxLength": 10000
      }
    }
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarity",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 4294967295,
    "step": 1
  }
]
```

</details>

### `eleven-text-to-dialogue`

Eleven Dialogue v3; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `dialogue` | Use SDK or MCP | Yes | object | Structured input; see descriptor below; array; minimum 1 |
| `stability` | Use SDK or MCP | No | enum | `0`, `0.5`, `1`; default `0.5` |
| `language` | Use SDK or MCP | No | text | Text |
| `seed` | Use SDK or MCP | No | range | 0 to 4294967295; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "dialogue",
    "label": "Dialogue",
    "required": true,
    "kind": "object",
    "array": {
      "min": 1
    },
    "fields": {
      "voiceId": {
        "label": "Voice ID",
        "kind": "text",
        "placeholder": "JBFqnCBsd6RMkjVDRZzb"
      },
      "text": {
        "label": "Line",
        "kind": "text",
        "maxLength": 5000
      }
    }
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 0,
        "label": "Creative"
      },
      {
        "id": 0.5,
        "label": "Natural"
      },
      {
        "id": 1,
        "label": "Robust"
      }
    ],
    "default": 0.5
  },
  {
    "key": "language",
    "label": "Language",
    "kind": "text"
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 4294967295,
    "step": 1
  }
]
```

</details>

### `elevenlabs-sfx`

ElevenLabs SFX v2; input type `sfx`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 450 characters |
| `duration` | `--duration` | No | range | 0.5 to 30; step 0.5; default `5` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 450
  },
  {
    "key": "duration",
    "kind": "range",
    "min": 0.5,
    "max": 30,
    "step": 0.5,
    "default": 5
  }
]
```

</details>

### `elevenlabs-music-v2`

ElevenLabs Music v2; input type `music`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | maximum 4100 characters |
| `duration` | `--duration` | No | enum | `10`, `20`, `30`, `60`, `120`, `180`, `300`, `600`; default `30` |
| `isInstrumental` | `--is-instrumental` | No | boolean | true or false; default `false` |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "maxLength": 4100
  },
  {
    "key": "duration",
    "kind": "enum",
    "valueType": "number",
    "options": [
      {
        "id": 10
      },
      {
        "id": 20
      },
      {
        "id": 30
      },
      {
        "id": 60
      },
      {
        "id": 120
      },
      {
        "id": 180
      },
      {
        "id": 300
      },
      {
        "id": 600
      }
    ],
    "default": 30
  },
  {
    "key": "isInstrumental",
    "label": "Instrumental Only",
    "kind": "boolean",
    "default": false
  }
]
```

</details>

### `eleven-speech-to-text`

Eleven Scribe v2; input type `a2t`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `audioUrl` | Use SDK or MCP | Yes | file | audio input |
| `language` | Use SDK or MCP | No | text | Text |
| `diarize` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `numSpeakers` | Use SDK or MCP | No | range | 1 to 32; step 1; default `1` |
| `timestampsGranularity` | Use SDK or MCP | No | enum | `word`, `character`; default `word` |
| `tagAudioEvents` | Use SDK or MCP | No | boolean | true or false; default `false` |
| `seed` | Use SDK or MCP | No | range | 0 to 2147483647; step 1 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "audioUrl",
    "label": "Audio or Video",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "language",
    "label": "Language (ISO code, optional)",
    "kind": "text",
    "placeholder": "e.g. en, rus — omit to auto-detect"
  },
  {
    "key": "diarize",
    "label": "Label Speakers",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "numSpeakers",
    "label": "Speakers",
    "kind": "range",
    "min": 1,
    "max": 32,
    "step": 1,
    "default": 1
  },
  {
    "key": "timestampsGranularity",
    "label": "Timing Detail",
    "kind": "enum",
    "valueType": "string",
    "options": [
      {
        "id": "word"
      },
      {
        "id": "character"
      }
    ],
    "default": "word"
  },
  {
    "key": "tagAudioEvents",
    "label": "Tag Audio Events",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "seed",
    "label": "Seed",
    "kind": "range",
    "min": 0,
    "max": 2147483647,
    "step": 1
  }
]
```

</details>

### `eleven-video-to-music`

Eleven Video to Music; input type `v2a`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `videoUrls` | Use SDK or MCP | Yes | file | video input; array; maximum 10 |
| `prompt` | Use SDK or MCP | No | text | maximum 1000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "videoUrls",
    "label": "Videos",
    "required": true,
    "category": "reference",
    "kind": "file",
    "accept": "video",
    "array": {
      "max": 10
    }
  },
  {
    "key": "prompt",
    "label": "Prompt",
    "required": false,
    "kind": "text",
    "maxLength": 1000,
    "placeholder": "How the soundtrack should sound"
  }
]
```

</details>

### `eleven-sts-v2`

Eleven STS v2; input type `sts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `audioUrl` | `--audio` | Yes | file | audio input |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `removeBackgroundNoise` | `--remove-bg-noise` | No | boolean | true or false; default `false` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `styleExaggeration` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `speed` | Use SDK or MCP | No | range | 0.1 to 5; step 0.05 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "audioUrl",
    "label": "Speech Audio",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "removeBackgroundNoise",
    "label": "Remove Background Noise",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "styleExaggeration",
    "label": "Style Exaggeration",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "speed",
    "label": "Speed",
    "kind": "range",
    "min": 0.1,
    "max": 5,
    "step": 0.05
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-multilingual-sts-v2`

Eleven Multilingual STS v2; input type `sts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `audioUrl` | `--audio` | Yes | file | audio input |
| `voiceId` | `--voice` | No | catalog | Account-dependent ID; see catalog source below; default `JBFqnCBsd6RMkjVDRZzb` |
| `removeBackgroundNoise` | `--remove-bg-noise` | No | boolean | true or false; default `false` |
| `stability` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `similarityBoost` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `styleExaggeration` | Use SDK or MCP | No | range | 0 to 1; step 0.05 |
| `speed` | Use SDK or MCP | No | range | 0.1 to 5; step 0.05 |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "audioUrl",
    "label": "Speech Audio",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "voiceId",
    "label": "Voice",
    "catalogOptions": [],
    "kind": "catalog",
    "source": {
      "workflow": "elevenlabs/v1/catalog/voices"
    },
    "default": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "key": "removeBackgroundNoise",
    "label": "Remove Background Noise",
    "kind": "boolean",
    "default": false
  },
  {
    "key": "stability",
    "label": "Stability",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "similarityBoost",
    "label": "Similarity",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "styleExaggeration",
    "label": "Style Exaggeration",
    "kind": "range",
    "min": 0,
    "max": 1,
    "step": 0.05
  },
  {
    "key": "speed",
    "label": "Speed",
    "kind": "range",
    "min": 0.1,
    "max": 5,
    "step": 0.05
  }
]
```

</details>

Catalog parameters require an ID returned by the named catalog workflow for your account. The workflow name in the descriptor is not an ID. This reference does not provide a verified standalone CLI lookup for those workflows; obtain the ID through a supported account interface before generating.

### `eleven-audio-isolation`

Eleven Audio Isolation; input type `sts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `audioUrl` | `--audio` | Yes | file | audio input |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "audioUrl",
    "label": "Audio File",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  }
]
```

</details>

### `eleven-dubbing`

Eleven Dubbing; input type `sts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `audioUrl` | `--audio` | Yes | file | audio input |
| `language` | `--language` | Yes | text | Text |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "audioUrl",
    "label": "Source Audio",
    "required": true,
    "category": "asset",
    "kind": "file",
    "accept": "audio"
  },
  {
    "key": "language",
    "label": "Target Language (ISO 639 code)",
    "required": true,
    "kind": "text",
    "placeholder": "e.g. es, fr, de"
  }
]
```

</details>

### `eleven-voice-design-v3`

Eleven Voice Design v3; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | minimum 20 characters; maximum 1000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "minLength": 20,
    "maxLength": 1000
  }
]
```

</details>

### `eleven-voice-design-v2`

Eleven Voice Design Multilingual v2; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | minimum 20 characters; maximum 1000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "minLength": 20,
    "maxLength": 1000
  }
]
```

</details>

### `eleven-voice-create`

Eleven Voice Previews; input type `tts`.

| Parameter | CLI flag | Required | Type | Values and constraints |
|---|---|---|---|---|
| `prompt` | `--prompt` | Yes | text | minimum 20 characters; maximum 1000 characters |

<details>
<summary>Full parameter descriptors</summary>

```json
[
  {
    "key": "prompt",
    "label": "Prompt",
    "required": true,
    "kind": "text",
    "minLength": 20,
    "maxLength": 1000
  }
]
```

</details>

## Pricing

[Inspect pricing and validate the complete request](/guide/pricing) before generation. A missing estimate does not mean the operation is free.
