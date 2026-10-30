---
description: "Kimi (Moonshot AI) on Picsart — Kimi K3, a flagship reasoning text model with a 1M-token context and image input. CLI + MCP examples, parameters, and official docs."
---

# Kimi (Moonshot)

**Vendor:** [Moonshot AI](https://www.moonshot.ai) · **Official API docs:** [platform.moonshot.ai](https://platform.moonshot.ai/docs)

Kimi K3 is Moonshot AI's flagship text model — **deep reasoning with a 1M-token context**, and it accepts up to 8 images alongside the prompt. Use it for long-document analysis, image understanding and multi-step reasoning. Like every text model in the catalog it is driven with `gen-ai ask` rather than `gen-ai generate`.

**Mode:** text · **Models:** 3

## Models

| id | Name | Input type |
|---|---|---|
| `kimi-k3` | Kimi K3 | `i2t` |
| `kimi-k3.1-pro` | Kimi K3.1 Pro | `i2t` |
| `kimi-k3.1-pro-highspeed` | Kimi K3.1 Pro Highspeed | `i2t` |

## CLI

```bash
# reasoning over a long prompt (thinking defaults to high)
gen-ai ask -m kimi-k3 -p "Summarize the key risks in this plan and rank them"

# image understanding, with a faster thinking budget
gen-ai ask -m kimi-k3 -p "What does this chart show?" -i ./chart.png --thinking low
```

## MCP

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "kimi-k3",
    "prompt": "Summarize the key risks in this plan and rank them",
    "thinking": "high"
  } }
```

## Parameters

Full parameter surface for every model, sourced from `gen-ai models info <id> --json`. CLI flags show the primary short form; the canonical `--kebab-case` long form always works too.

### `kimi-k3` — Kimi K3

[Try `kimi-k3` in Playground ↗](https://picsart.com/ai-playground/?model=kimi-k3)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `low` · `high` (default `high`) |

### `kimi-k3.1-pro` — Kimi K3.1 Pro

[Try `kimi-k3.1-pro` in Playground ↗](https://picsart.com/ai-playground/?model=kimi-k3.1-pro)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `low` · `high` (default `high`) |

### `kimi-k3.1-pro-highspeed` — Kimi K3.1 Pro Highspeed

[Try `kimi-k3.1-pro-highspeed` in Playground ↗](https://picsart.com/ai-playground/?model=kimi-k3.1-pro-highspeed)

Input type: `i2t`

| Param | CLI flag | Type | Values |
|---|---|---|---|
| `prompt` | `-p` | text | **required** |
| `imageUrls` | `-i` | file | image (up to 8) |
| `thinking` | `--thinking` | enum | `low` · `high` (default `high`) |
