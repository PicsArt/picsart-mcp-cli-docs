---
description: "Meta Muse Image 1.0 on Picsart — image generation with CLI and MCP examples."
---

# Meta

**Mode:** image · **Models:** 1

Meta's Muse Image 1.0 is available in the production catalog. Discover its current inputs before generating.

## Models

| id | Name | Input type |
|---|---|---|
| `muse-image-1.0` | Muse Image 1.0 | `t2i` |

## CLI

```bash
gen-ai models info muse-image-1.0 --json
gen-ai generate -m muse-image-1.0 -p "A sunlit garden, watercolor illustration"
```

## MCP

Use `picsart_model_params` with model `muse-image-1.0` to inspect inputs, then `picsart_generate` to generate.

## Parameters

Parameters from the SDK catalog.

### `muse-image-1.0` — Muse Image 1.0

[Try `muse-image-1.0` in Playground ↗](https://picsart.com/ai-playground/?model=muse-image-1.0)

Input type: `t2i`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `3:2` · `2:3` · `16:9` · `9:16` · `4:3` · `3:4` (default `1:1`) |
| `reasoningStrength` | `--reasoning-strength` | enum | `low` · `high` (default `high`) |
| `moderation` | `--moderation` | enum | `auto` · `low` · `none` (default `auto`) |
| `enableImageSearch` | `--enable-image-search` | boolean | `true` · `false` (default `true`) |
| `enableWebSearch` | `--enable-web-search` | boolean | `true` · `false` (default `true`) |
| `enableShell` | `--enable-shell` | boolean | `true` · `false` (default `true`) |
| `outputFormat` | `--format` | enum | `png` · `jpeg` · `webp` (default `png`) |
| `count` | `-n` | enum | `1` · `2` · `4` · `6` · `8` · `10` (default `1`) |
| `imageUrls` | `-i` | file | image (up to 5) |
