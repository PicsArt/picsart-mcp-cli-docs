---
description: "What Picsart AI Playground is and the three ways to generate AI media outside the web app — the gen-ai CLI, Skills, and MCP."
---

# Introduction

**Picsart AI Playground** is a prompt interface that wraps every AI model Picsart supports — image, video, and audio — behind one consistent surface. Instead of signing up for a dozen providers, juggling API keys, and learning each one's quirks, you use a single account and one credit balance.

There are three ways to use it from outside the web app:

| Interface | Best for | Page |
|---|---|---|
| **gen-ai CLI** | Creators and developers working in the terminal; scripting and automation | [CLI Quickstart](/guide/cli-quickstart) |
| **Skills** | Driving generation in plain English inside Claude Code, Cursor, Windsurf, or ChatGPT | [Skills](/guide/skills) |
| **MCP** | Any MCP-compatible agent calling the catalog as tools | [MCP Quickstart](/guide/mcp-quickstart) |

All three are powered by the same `@picsart/ai-sdk` model registry, so the model catalog, parameters, and pricing are identical across them. Skills and MCP drive the CLI under the hood — install it and run `gen-ai login` once, and every surface works.

## What you can generate

- **Image** — text-to-image, image editing, inpainting, style transfer, background removal/replacement, upscaling, and vector/SVG output. **77 image models.**
- **Video** — text-to-video, image-to-video, video-to-video editing, and clip extension. **78 video models.**
- **Audio** — text-to-speech, music, sound effects, voice design, dubbing, and speech-to-speech. **21 audio models.**

Browse the full catalog in the **[Model Reference](/reference/)**, or filter live:

```bash
gen-ai models                     # full catalog
gen-ai models --mode video        # only video models
gen-ai models --provider google   # only Google models
```

## How a generation works

Whether you call it from the CLI or via MCP, every generation follows the same path:

1. **Pick a model** — by id (e.g. `flux-2-pro`, `seedance-2.0`) or let the CLI/agent help you choose.
2. **Provide inputs** — a prompt, plus optional images/videos/audio and model parameters (aspect ratio, duration, resolution…).
3. **(Optional) quote the cost** — every model exposes its credit cost before you spend anything.
4. **Generate** — the request is submitted, polled to completion, and the result URL is returned (and optionally downloaded or saved to your Picsart Drive).

The model never talks to vendor APIs directly — all generation flows through the Picsart platform, which is why one account and one credit balance cover everything.

## Next steps

- **[Installation](/guide/installation)** — install the CLI and connect the MCP server.
- **[Authentication](/guide/authentication)** — log in once.
- **[CLI Quickstart](/guide/cli-quickstart)** · **[MCP Quickstart](/guide/mcp-quickstart)**
