# Reve

**Mode:** image · **Models:** 1

**Vendor:** [Reve](https://api.reve.com) · **Official API docs:** [Reve API console docs](https://api.reve.com/console/docs)

Reve is a text-to-image model with strong prompt adherence and an instruction-based edit path. In the Picsart catalog it routes through the fal.ai Reve wrapper, exposing a focused surface: `prompt`, `aspectRatio`, `count`, and an optional source image for editing.

## Models

| id | Name | Input type |
|---|---|---|
| `reve` | Reve | `t2i` |

## CLI

```bash
# text-to-image
gen-ai generate -m reve \
  -p "a marble statue of a fox wearing headphones, studio lighting" \
  --ar 3:2 -n 4 -s

# instruction edit from a source image
gen-ai generate -m reve \
  -p "make the sky a stormy sunset" \
  -i ./photo.jpg -s
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "reve",
    "prompt": "a marble statue of a fox wearing headphones, studio lighting",
    "aspectRatio": "3:2",
    "count": 4
  } }
```

## Parameters — `reve`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `16:9` · `9:16` · `1:1` · `4:3` · `3:4` · `3:2` · `2:3` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | source image for editing (single) |

> Source: `gen-ai models info reve --json`. Picsart routes Reve through the fal.ai Reve wrapper, so the catalog surface is intentionally narrow — direct-API fields like `negative_prompt`, `version`, `test_time_scaling`, and `postprocessing` are not exposed.

## Pricing

```bash
gen-ai pricing reve -n 4
```

Cost scales with the number of images (**count**).
