---
description: "Hunyuan AI models on Picsart — 1 image model(s) including Hunyuan V3. CLI + MCP examples, parameters, and official docs."
---

# Hunyuan

**Mode:** image · **Models:** 1

**Vendor:** [Hunyuan (Tencent)](https://huggingface.co/tencent) · **Official API docs:** [Fal — HunyuanImage v3](https://fal.ai/models/fal-ai/hunyuan-image/v3)

HunyuanImage v3 is Tencent's text-to-image model, hosted on Fal's serverless queue. It is strong at infographic-friendly generation with readable in-image text, and exposes CFG (guidance) control, a negative prompt, and small batch counts.

## Models

| id | Name | Input type |
|---|---|---|
| `hunyuan-v3` | Hunyuan V3 | `t2i` |

## CLI

```bash
# text-to-image, landscape
gen-ai generate -m hunyuan-v3 \
  -p "an infographic explaining the water cycle, clean readable labels" \
  --ar 16:9

# tighter prompt adherence with a higher CFG, batch of 2
gen-ai generate -m hunyuan-v3 \
  -p "a vintage travel poster of Kyoto in autumn" \
  --ar 3:4 --cfg 12 -n 2 --neg "blurry, text artifacts"
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "hunyuan-v3",
    "prompt": "an infographic explaining the water cycle, clean readable labels",
    "aspectRatio": "16:9",
    "count": 1,
    "cfgScale": 7.5
  } }
```

## Parameters — `hunyuan-v3`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `aspectRatio` | `--ar` | enum | `1:1` · `16:9` · `9:16` · `4:3` · `3:4` (default `16:9`) |
| `count` | `-n` | enum | `1` · `2` · `4` (default `1`) |
| `negativePrompt` | `--neg` | text | concepts to steer away from |
| `cfgScale` | `--cfg` | number | `1`–`20`, step `0.5` (default `7.5`) |

> Source: `gen-ai models info hunyuan-v3 --json`. `aspectRatio` maps to Fal's `image_size` enum, `count`→`num_images` (capped at 4), and `cfgScale`→`guidance_scale`.

## Pricing

```bash
gen-ai pricing hunyuan-v3 -n 1
```

Cost scales with **count** (number of images generated per call).
