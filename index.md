---
description: "Picsart AI Playground — generate images, video & audio with 166+ AI models (Sora, Veo, Kling, Flux, Nano Banana, ElevenLabs) via the web app, gen-ai CLI, MCP, TypeScript SDK, or drop-in Skills for Claude, Cursor & ChatGPT."
layout: home

hero:
  name: Picsart AI Playground
  text: One platform. 166+ models. Every interface.
  tagline: Generate image, video, and audio in the browser, inside your AI agent, or from the terminal. One account, one credit balance, 32 providers.
  actions:
    - theme: brand
      text: Get started
      link: /guide/introduction
    - theme: alt
      text: Which tool is right for me?
      link: /guide/which-tool
    - theme: alt
      text: Model Catalog
      link: /reference/catalog

features:
  - title: AI Playground
    details: The web and mobile app. Explore models, compare outputs, tune prompts, and generate at any scale — no setup required.
    link: https://picsart.com/ai-playground/
  - title: Skills and MCP
    details: Connect Picsart to Claude, ChatGPT, Cursor, Windsurf, or any MCP-compatible agent. Generate in plain English without leaving your workflow.
    link: /guide/integrations/
  - title: gen-ai CLI
    details: One terminal command for the full catalog. Scriptable, pipe-friendly, built for batch jobs, cron schedules, and CI/CD pipelines.
    link: /guide/cli-quickstart
  - title: TypeScript SDK
    details: Type-safe model-aware calls from Node.js apps. One `generate()` call for all 166 models. Auto-save to Drive. API key auth.
    link: /guide/sdk
  - title: 166+ models, 32 providers
    details: Sora, Veo, Kling, Seedance, Nano Banana, Flux, ElevenLabs, Recraft, and more — one pay-per-generation credit balance, no stacked subscriptions.
    link: /reference/
---

## One platform, six ways to use it

Picsart AI Playground is one model catalog — accessible from wherever you work.

| Surface | Best for |
|---|---|
| **[AI Playground](https://picsart.com/ai-playground/)** (web / mobile) | Exploration, prompt iteration, model comparison, small-scale creative work |
| **[Skills and MCP](/guide/integrations/)** | Generating inside Claude, ChatGPT, Cursor, Windsurf, or any AI agent |
| **[gen-ai CLI](/guide/cli-quickstart)** | Scheduled jobs, batch catalogs, scripting, CI/CD automation |
| **[SDK](/guide/sdk)** | Node.js/TypeScript developers building apps with type-safe, auto-polling model calls |
| **[REST API](/guide/rest-api)** | Developers in any language (Python, Ruby, Go, PHP) building applications |

All share the same model ids, the same parameters, and the same account. Discover a model in Playground, generate from a CLI script, and call it from your agent — all with the same prompt and settings.

Not sure which to use? Read **[Which tool is right for me?](/guide/which-tool)**

---

## CLI quickstart

Install the CLI and generate from your terminal in under two minutes:

```bash
# macOS / Linux
curl -fsSL https://picsart.com/gen-ai-cli/install.sh | bash

# or npm (all platforms)
npm install -g @picsart/gen-ai

gen-ai login                        # one-time browser auth

# text to video
gen-ai generate -m seedance-2.0 -p "a fox running through autumn leaves" -d 8

# image
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup" --ar 4:3
```

---

## SDK quickstart

Generate from a Node.js or TypeScript app with `@picsart/ai-sdk`:

```typescript
import { createClient } from '@picsart/ai-sdk';
const ai = createClient({ apiKey: process.env.PICSART_API_KEY, apiUrl: 'https://api.picsart.com' });
const result = await ai.generate('flux-2-pro', { prompt: 'studio shot of a ceramic cup', aspectRatio: '4:3' });
console.log(result.url);
```

Install with `npm install @picsart/ai-sdk`. Auth is an API key from your account settings (not OAuth). Full details in the **[SDK guide](/guide/sdk)**.

---

## Agent quickstart

Connect Picsart to your AI agent, then generate with a natural-language instruction or a tool call:

| Agent | Connect |
|---|---|
| Claude Code | `claude mcp add picsart-gen-ai -- gen-ai-mcp` |
| Cursor / Windsurf / VS Code | Add `gen-ai-mcp` to MCP config |
| Codex | `codex://plugins/picsart@openai-curated` |
| ChatGPT | See [ChatGPT integration](/guide/integrations/chatgpt) |

```json
// generate an image via MCP tool call
{ "name": "picsart_generate",
  "arguments": { "model": "flux-2-pro", "prompt": "studio shot of a ceramic cup", "aspectRatio": "4:3" } }
```

Full details in the **[MCP Quickstart](/guide/mcp-quickstart)** and **[Integrations](/guide/integrations/)**. Browse the model catalog at **[picsart.com/ai-playground](https://picsart.com/ai-playground/)** or in the **[Model Catalog](/reference/catalog)**.
