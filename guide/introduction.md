---
description: "What Picsart AI Playground is, how its access layers work, and which surface (Playground, Skills, MCP, CLI, SDK, or REST API) fits your situation."
---

# Introduction

## Picsart AI Playground

**Picsart AI Playground** is a platform that brings together 174 generative AI models from 32 providers under one account: one credit balance, no separate subscriptions, no per-provider API keys. You can generate images, video, and audio using models like Flux, Sora, Veo, Kling, ElevenLabs, Recraft, Seedance, and others, and switch between them freely.

The Playground is available on **web and mobile**. For most users and most tasks, this is the right place to work. You pick a model, write a prompt, see results, iterate. If you are generating at small scale, exploring what is possible, comparing model outputs, or doing prompt engineering, the Playground web or mobile app is the most efficient tool. No setup, no code, no configuration.

These docs cover the **programmatic and agent-native interfaces** to the same platform: the gen-ai CLI, Skills, the MCP server, the TypeScript SDK, and the REST API. Each one is an extension of the Playground, not a replacement for it.

---

## The access layers

Picsart has six ways to reach its model catalog beyond the web and mobile app. Each one fits a different working context.

### AI Playground (web and mobile)
**Start here.** Experiment with models, compare outputs side by side, tune prompts, and see what each model does well. Good for: solo creative work, model evaluation, prompt engineering, and anything you would otherwise do in a browser or on your phone. If the scale is small and speed-of-delivery matters more than automation, Playground is the most direct path.

[picsart.com/ai-playground](https://picsart.com/ai-playground/)

---

### Skills and MCP: for your AI agent
Once you have validated a prompt or workflow in Playground, connect Picsart to the AI agent or coding assistant you already work in: Claude Code, ChatGPT, Cursor, Windsurf, Codex, or VS Code Copilot.

When the connection is active, you can generate images, animate a video, remove a background, or synthesize audio **without leaving your agent conversation**. The agent handles the model selection, parameter construction, and result retrieval. You stay in Claude or ChatGPT and issue natural-language instructions: *"Generate three hero images for this brief in 16:9."*

**Skills** are pre-built instruction bundles that give the agent knowledge about Picsart's models and workflows. Install once and describe tasks in plain English. **MCP** is the underlying protocol that exposes every catalog tool directly, useful when you want the agent to reason about cost, validate parameters, or chain multiple operations.

[Skills guide](/guide/skills) · [MCP Quickstart](/guide/mcp-quickstart) · [Integrations](/guide/integrations/)

---

### CLI: terminal, scripts, and scheduled work
The `gen-ai` CLI exposes the full catalog as a single terminal command. It is pipe-friendly, scriptable, and designed for automation. Useful when:

- You want to run generations on a cron schedule (daily catalog refresh, weekly campaign assets).
- You are building a shell pipeline that generates, then processes, then uploads.
- You need CI/CD integration: generate assets as part of a build step.
- You want to batch-process a folder of product images or run a manifest of mixed generation jobs.

```bash
gen-ai generate -m flux-2-pro -p "product on white background" -n 4
gen-ai batch run catalog.yaml
```

[CLI Quickstart](/guide/cli-quickstart) · [Batch and Automation](/guide/batch)

---

### SDK: Node.js and TypeScript applications
If you are building a Node.js or TypeScript application, `@picsart/ai-sdk` is the fastest path. It is type-safe, model-aware, and handles async polling automatically. One `generate()` call covers all 174 models. Results can auto-save to Picsart Drive. Auth is an API key (not OAuth), retrieved from your account settings.

```bash
npm install @picsart/ai-sdk
```

[SDK guide](/guide/sdk)

---

### REST API: any language
If you are building in Python, Ruby, Go, PHP, or any other language, call the REST API directly. HTTP POST to `https://api.picsart.com/gw-v2`. Same model ids and parameters as every other surface. Auth is an API key from your account settings.

[REST API guide](/guide/rest-api) · [API Reference](https://picsart.com/api-platform/docs/api-reference)

---

## How the surfaces relate

They share the same model catalog, the same account, and the same credit balance. A model you discover in Playground is reachable by the same id from the CLI, MCP, SDK, and REST API. Skills and MCP drive the `gen-ai` CLI internally. Install the CLI once, run `gen-ai login` once, and those surfaces work. The SDK and REST API authenticate with an API key from your account settings instead of OAuth.

| Surface | Who it is for | Typical use |
|---|---|---|
| **AI Playground** (web / mobile) | Any user | Exploration, iteration, small-scale creative work |
| **Skills** | Agent users (Claude, ChatGPT, Cursor, Windsurf) | Generate inside your agent in plain English |
| **MCP** | Agent users who want tool-level control | Chain tools, inspect cost, validate before generating |
| **CLI** | Developers and power users | Automation, cron, batch, CI/CD pipelines |
| **SDK** | Node.js/TypeScript developers | Application integration, type-safe model calls, Drive auto-save |
| **REST API** | Developers in any language | Application integration from Python, Ruby, Go, or any HTTP client |

Most people move between these surfaces naturally. You experiment in Playground, validate a prompt, then wire it into an agent or a script. The platform is the same at every level.

---

## What you can generate

- **Image** — text-to-image, image editing, inpainting, style transfer, background removal/replacement, upscaling, and vector/SVG output. **64 image models.**
- **Video** — text-to-video, image-to-video, video-to-video editing, and clip extension. **81 video models.**
- **Audio** — text-to-speech, music, sound effects, voice design, dubbing, and speech-to-speech. **22 audio models.**
- **Text analysis** — describe, caption, OCR, and summarize images and video using Claude, GPT, or Gemini. **7 text models.**

Browse the full catalog in the [Model Reference](/reference/), filter live in the [Playground](https://picsart.com/ai-playground/), or query from the terminal:

```bash
gen-ai models --mode video
gen-ai models --provider google
gen-ai models info seedance-2.0
```

---

## Next steps

Not sure which surface to start with? Read [Which tool is right for me?](/guide/which-tool).

- **[Installation](/guide/installation)**: install the CLI and connect any surface.
- **[Authentication](/guide/authentication)**: sign in once.
- **[CLI Quickstart](/guide/cli-quickstart)** · **[MCP Quickstart](/guide/mcp-quickstart)** · **[Skills](/guide/skills)**
- **[SDK](/guide/sdk)** · **[REST API](/guide/rest-api)**
- **[Integrations](/guide/integrations/)**: per-agent setup guides for Claude Code, Cursor, Windsurf, ChatGPT, Codex, VS Code.
