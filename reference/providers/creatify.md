# Creatify

**Mode:** video · **Models:** 1

**Vendor:** [Creatify](https://docs.creatify.ai/introduction) · **Official API docs:** [Creatify Aurora](https://docs.creatify.ai/api-documentation/aurora/aurora)

Creatify Aurora is an audio-driven avatar model: feed it a single portrait and an audio clip, and it produces a lip-synced talking video. Duration is set by the audio length — there are no resolution or duration parameters. Bring your own audio (for example, TTS from ElevenLabs) and pair it with a clean, front-facing image.

## Models

| id | Name | Input type |
|---|---|---|
| `creatify-aurora` | Creatify Aurora HD | `i2v` |

## CLI

```bash
# talking-avatar video from a portrait + voiceover
gen-ai generate -m creatify-aurora \
  -i ./portrait.png \
  -a ./voiceover.mp3
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "creatify-aurora",
    "imageUrls": ["https://example.com/portrait.png"],
    "audioUrl": "https://example.com/voiceover.mp3"
  } }
```

## Parameters — `creatify-aurora`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `imageUrls` | `-i` | file | **required** · single portrait image (the speaker) |
| `audioUrl` | `-a` | file | **required** · speech or song clip — drives lip-sync and duration |
| `prompt` | `-p` | text | optional |

> Source: `gen-ai models info creatify-aurora --json`. Aurora is audio-driven: it exposes **no** resolution, duration, or aspect-ratio params — the output length equals the audio length.

## Pricing

```bash
gen-ai pricing creatify-aurora
```

Cost is billed **per second** of output (i.e. by the audio length), with partial seconds rounded up.
