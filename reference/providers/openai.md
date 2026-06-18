# OpenAI

**Modes:** video · image · **Models:** 5

**Vendor:** [OpenAI](https://developers.openai.com/docs/guides/image-generation) · **Official API docs:** [OpenAI Developer Docs](https://developers.openai.com/docs/guides/video-generation)

OpenAI spans two media families on the Playground: **Sora 2** text-to-video (standard and **Pro**, plus a chainable **Extend** workflow) and **GPT Image** text-to-image (`gpt-image-2`, `gpt-image-1.5`). Sora renders up to 720p (1080p on `sora-2-pro`) with native audio and optional first-frame image conditioning.

## Models

| id | Name | Input type |
|---|---|---|
| `sora-2` | Sora 2 | `t2v` |
| `sora-2-pro` | Sora 2 Pro | `t2v` |
| `sora-2-extend` | Sora 2 Extend | `v2v` |
| `gpt-image-2` | GPT Image 2 | `t2i` |
| `gpt-image-1.5` | GPT Image 1.5 | `t2i` |

## CLI

```bash
# text-to-video
gen-ai generate -m sora-2 \
  -p "a paper boat drifting down a rain-soaked city gutter, cinematic, slow motion" \
  --ar 16:9 -d 8

# image-anchored video (first-frame conditioning)
gen-ai generate -m sora-2-pro -p "the boat sets sail into open water" -i ./boat.jpg --ar 16:9 -d 12

# text-to-image
gen-ai generate -m gpt-image-2 \
  -p "an isometric cutaway of a cozy bookshop, warm lighting" \
  --ar 16:9 -n 2
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "sora-2",
    "prompt": "a paper boat drifting down a rain-soaked city gutter, cinematic, slow motion",
    "aspectRatio": "16:9",
    "duration": 8
  } }
```

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "gpt-image-2",
    "prompt": "an isometric cutaway of a cozy bookshop, warm lighting",
    "aspectRatio": "16:9",
    "count": 2
  } }
```

## Parameters — `sora-2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` (default `16:9`) |
| `duration` | `-d` | enum | `4` · `8` · `12` · `16` · `20` (default `4`) |
| `imageUrls` | `-i` | file | reference image (first-frame, max 1) |

> Source: `gen-ai models info sora-2 --json`. `sora-2-pro` shares this surface and adds 1080p output. `sora-2-extend` continues an existing video (chained from a source asset).

## Parameters — `gpt-image-2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` · `auto` (default `1:1`) |
| `quality` | `--quality` | enum | `high` · `medium` · `low` (default `high`) |
| `outputFormat` | `--output-format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | source image(s) for editing (max 5) |

> Source: `gen-ai models info gpt-image-2 --json`. `gpt-image-2` is opaque-only (no transparent background); `gpt-image-1.5` adds a transparent `background` option.

## Pricing

```bash
gen-ai pricing sora-2 -d 8 --ar 16:9
gen-ai pricing gpt-image-2 --quality high -n 2
```

Sora cost scales with **duration**, **resolution** (720p vs 1080p on Pro), and **tier** (`sora-2` vs `sora-2-pro`). GPT Image cost scales with **quality**, output **size**, and **count**.
