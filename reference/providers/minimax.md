# MiniMax

**Modes:** video, audio · **Models:** 5

**Vendor:** [MiniMax](https://platform.minimax.io/docs) · **Official API docs:** [MiniMax Platform — Video Generation](https://platform.minimax.io/docs/guides/video-generation)

MiniMax provides the **Hailuo 2.3** video family — text-to-video and image-to-video with start-frame control, `[command]` camera directives, and resolutions up to 1080p — plus **MiniMax Music v2** for prompt-driven music with vocals. Hailuo 2.3 comes in a standard and a **Pro** variant (Pro is 1080p at a fixed 6s), each with a **Fast** image-to-video sibling.

## Models

| id | Name | Input type |
|---|---|---|
| `hailuo-2.3` | Hailuo 2.3 | `t2v` |
| `hailuo-2.3-pro` | Hailuo 2.3 Pro | `t2v` |
| `hailuo-2.3-fast` | Hailuo 2.3 Fast | `i2v` |
| `hailuo-2.3-fast-pro` | Hailuo 2.3 Fast Pro | `i2v` |
| `minimax-music-v2` | MiniMax Music v2 | `music` |

## CLI

```bash
# text-to-video with a camera directive
gen-ai generate -m hailuo-2.3 \
  -p "a cat walks forward through a neon alley at night [Push in]" \
  -d 10

# image-to-video from a start frame (Fast variant)
gen-ai generate -m hailuo-2.3-fast -p "she turns and smiles" -i ./frame.png -d 6

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

## Parameters — `hailuo-2.3`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `enhancePrompt` | `--enhance-prompt` | boolean | auto-optimize prompt (default `true`) |
| `duration` | `-d` | enum | `6` · `10` (default `6`) |
| `imageUrls` | `-i` | file | start image (image-to-video edit) |

> Source: `gen-ai models info hailuo-2.3 --json`. The **Pro** variants omit `duration` (fixed 6s at 1080p). On the **Fast** image-to-video models (`hailuo-2.3-fast`, `hailuo-2.3-fast-pro`), `imageUrls` is **required**. Note: 10s is available at 768p only — 1080p is always 6s.

## Parameters — `minimax-music-v2`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** (≤ 2000 chars) |

> Source: `gen-ai models info minimax-music-v2 --json`. Generates music with vocals from a single text prompt.

## Pricing

```bash
gen-ai pricing hailuo-2.3 -d 10
```

Cost scales with **duration** and **resolution** (the Pro variants run at 1080p; 10s is 768p only). Music is priced per generated track.
