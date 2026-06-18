---
description: "Picsart CLI & MCP — generate AI images, video & audio across 176 models from 30 providers (Sora, Veo, Kling, Flux, Nano Banana, ElevenLabs) via the gen-ai CLI, MCP, or drop-in Skills for Claude, Cursor & ChatGPT."
layout: home

hero:
  name: Picsart CLI & MCP
  text: AI generation for your terminal & agents
  tagline: Generate image, video, and audio across 176 models from 30 providers — from your terminal with the gen-ai CLI, or from any AI agent via Skills and MCP.
  actions:
    - theme: brand
      text: Get started
      link: /guide/introduction
    - theme: alt
      text: CLI Quickstart
      link: /guide/cli-quickstart
    - theme: alt
      text: MCP Quickstart
      link: /guide/mcp-quickstart

features:
  - icon: ⌨️
    title: gen-ai CLI
    details: One command for the whole catalog. Generate, batch, upload to Drive, and pipe results — scriptable and pipe-friendly.
    link: /guide/cli-quickstart
  - icon: 🤖
    title: Skills & MCP
    details: Drop-in skills + MCP for Claude Code, Cursor, Windsurf, ChatGPT & Codex — generate in plain English across 130+ models.
    link: /guide/skills
  - icon: 🎬
    title: 176 models, 30 providers
    details: Sora, Veo, Kling, Seedance, Nano Banana, Flux, GPT Image, ElevenLabs, Recraft and more — one credit balance.
    link: /reference/
  - icon: 💳
    title: Pay per generation
    details: No per-provider subscriptions or API keys. Every call shows its credit cost up front.
    link: /guide/pricing
---

## One catalog, three interfaces

These docs cover the **developer & agent** surfaces for Picsart's AI catalog. You can drive the same 176 models three ways:

- **[gen-ai CLI](/guide/cli-quickstart)** — a terminal app for the entire model catalog. Great for creators scripting their workflow and developers automating pipelines.
- **[Skills](/guide/skills)** — drop-in `.zip` bundles that let you generate in plain English inside Claude Code, Cursor, Windsurf, or ChatGPT.
- **[MCP](/guide/mcp-quickstart)** — the catalog exposed via [Model Context Protocol](https://modelcontextprotocol.io), so any MCP-compatible agent can generate media directly.

All three share the same model registry and drive the same `gen-ai` engine — install the CLI, sign in once with `gen-ai login` (OAuth web login), and every surface works.

> **Prefer a visual UI?** The **[AI Playground app ↗](https://picsart.com/ai-playground/)** is the web app — the point-and-click version of this same catalog, where you pick a model and generate in the browser. These docs are for using that catalog from the **terminal and AI agents** instead.

## CLI quickstart

```bash
npm install -g @picsart/gen-ai      # or: curl -fsSL https://picsart.com/gen-ai-cli/install.sh | bash
gen-ai login                        # OAuth web login (opens your browser)

# text to video
gen-ai generate -m seedance-2.0 -p "a fox running through autumn leaves" -d 8
# image
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup" --ar 4:3
```

## MCP quickstart

Connect Picsart to your agent, then generate with a tool call:

| Agent | Connect |
|---|---|
| Claude Code · Cursor · Windsurf | Add the [`gen-ai-use` Skill](/guide/skills) |
| Codex | `codex://plugins/picsart@openai-curated` |
| ChatGPT / any MCP client | See [picsart.com/gen-ai-mcp ↗](https://picsart.com/gen-ai-mcp/) |

```json
// the same image generation, as an agent tool call
{ "name": "picsart_generate",
  "arguments": { "model": "flux-2-pro", "prompt": "studio shot of a ceramic cup", "aspectRatio": "4:3" } }
```

Full details in the **[MCP Quickstart](/guide/mcp-quickstart)**. Browse everything in the **[Model Catalog](/reference/catalog)** or by **[Provider](/reference/providers/)**.
