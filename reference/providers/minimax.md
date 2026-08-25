---
description: "MiniMax AI models on Picsart — 7 audio/video model(s) including Hailuo 03, Hailuo 2.3, and MiniMax Music v3. CLI + MCP examples, parameters, and official docs."
---

# MiniMax

**Modes:** video · audio · **Models:** 7

**Vendor:** [MiniMax](https://platform.minimax.io/docs) · **Official API docs:** [MiniMax Platform — Video Generation](https://platform.minimax.io/docs/guides/video-generation)

MiniMax provides **Hailuo 03** for text-to-video and image-to-video at up to 2K, with start/end frames plus image, video, and audio references. The catalog also includes the **Hailuo 2.3** family and **MiniMax Music v2** for prompt-driven music with vocals.

## Models

| id | Name | Input type |
|---|---|---|
| `hailuo-2.3` | Hailuo 2.3 | `t2v` |
| `hailuo-2.3-pro` | Hailuo 2.3 Pro | `t2v` |
| `hailuo-2.3-fast` | Hailuo 2.3 Fast | `i2v` |
| `hailuo-2.3-fast-pro` | Hailuo 2.3 Fast Pro | `i2v` |
| `hailuo-03` | Hailuo 03 | `t2v` |
| `minimax-music-v2` | MiniMax Music v2 | `music` |
| `minimax-music-v3` | MiniMax Music v3 | `music` |

## CLI

```bash
# text-to-video with a camera directive
gen-ai generate -m hailuo-2.3 \
  -p "a cat walks forward through a neon alley at night [Push in]" \
  -d 10

# image-to-video from a start frame (Fast variant)
gen-ai generate -m hailuo-2.3-fast -p "she turns and smiles" -i ./frame.png -d 6

# Hailuo 03 at up to 2K with a start frame
gen-ai generate -m hailuo-03 -p "the camera circles the subject" \
  --start-frame ./frame.png -d 10

# music with vocals
gen-ai generate -m minimax-music-v2 \
  -p "upbeat indie pop with bright guitars and an anthemic chorus, female vocals"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "hailuo-2.3",
    "prompt": "a cat walks forward through a neon alley at night [Push in]",
    "duration": 10
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "minimax-music-v2",
    "prompt": "upbeat indie pop with bright guitars and an anthemic chorus, female vocals"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `hailuo-2.3` — Hailuo 2.3

[Try `hailuo-2.3` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | enum | `6` · `10` (default `6`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `hailuo-2.3-pro` — Hailuo 2.3 Pro

[Try `hailuo-2.3-pro` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-pro)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | image (up to 1) |

### `hailuo-2.3-fast` — Hailuo 2.3 Fast

[Try `hailuo-2.3-fast` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-fast)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `duration` | `-d` | enum | `6` · `10` (default `6`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `hailuo-2.3-fast-pro` — Hailuo 2.3 Fast Pro

[Try `hailuo-2.3-fast-pro` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-2.3-fast-pro)

Input type: `i2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | `true` · `false` (default `true`) |
| `imageUrls` | `-i` | file | **required** image (up to 1) |

### `hailuo-03` — Hailuo 03

[Try `hailuo-03` in Playground ↗](https://picsart.com/ai-playground/?model=hailuo-03)

Input type: `t2v`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `startFrame` | `--start-frame` | file | image |
| `endFrame` | `--end-frame` | file | image |
| `imageUrls` | `-i` | file | image (up to 3) |
| `videoUrls` | `--video-urls` | file | video (up to 1) |
| `audioUrls` | `--audio-urls` | file | audio (up to 1) |
| `duration` | `-d` | enum | `5` · `10` · `15` (default `5`) |
| `aspectRatio` | `--ar` | enum | `adaptive` · `21:9` · `16:9` · `4:3` · `1:1` · `3:4` · `9:16` (default `adaptive`) |

### `minimax-music-v2` — MiniMax Music v2

[Try `minimax-music-v2` in Playground ↗](https://picsart.com/ai-playground/?model=minimax-music-v2)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2000 chars) |
| `lyricsPrompt` | `--lyrics-prompt` | text | lyrics, or a description of the lyrical theme (≤2000 chars, min 10) |
| `lyricsOptimizer` | `--lyrics-optimizer` | boolean | `true` · `false` (default `false`) |
| `isInstrumental` | `--is-instrumental` | boolean | `true` · `false` (default `false`) |
| `outputFormat` | `--format` | enum | `url` · `hex` (default `url`) |

> **Notes:** Pro variants omit `duration` (fixed 6s at 1080p); 10s is available at 768p only. On the Fast image-to-video models `imageUrls` is required.

### `minimax-music-v3` — MiniMax Music v3

[Try `minimax-music-v3` in Playground ↗](https://picsart.com/ai-playground/?model=minimax-music-v3)

Input type: `music`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤2000 chars) |
| `lyricsPrompt` | `--lyrics-prompt` | text | free text (≤2000 chars) |
| `lyricsOptimizer` | `--lyrics-optimizer` | boolean | `true` · `false` (default `false`) |
| `isInstrumental` | `--is-instrumental` | boolean | `true` · `false` (default `false`) |
| `sampleRate` | `--sample-rate` | enum | `16000` · `24000` · `32000` · `44100` (default `44100`) |
| `bitrate` | `--bitrate` | enum | `32000` · `64000` · `128000` · `256000` (default `256000`) |
| `format` | `--format` | enum | `mp3` · `wav` · `pcm` (default `mp3`) |

## Pricing

```bash
gen-ai pricing hailuo-2.3 -d 10
```

Cost scales with **duration** and **resolution** (the Pro variants run at 1080p; 10s is 768p only). Music is priced per generated track.
