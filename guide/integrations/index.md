---
description: "Connect Picsart to Claude Code, Cursor, Windsurf, ChatGPT, Codex, or VS Code — generate images, video, and audio without leaving your AI agent."
---

# Integrations

Once you have validated a prompt or workflow in the [AI Playground](https://picsart.com/ai-playground/), you can bring Picsart into the AI agent or coding assistant you already work in. Generate images, animate a video, remove a background, or synthesize audio without switching windows.

These guides cover the exact setup for each agent.

## Supported agents

| Agent | Guide | Notes |
|---|---|---|
| Claude Code | [Claude Code](/guide/integrations/claude-code) | |
| Cursor | [Cursor](/guide/integrations/cursor) | |
| Windsurf | [Windsurf](/guide/integrations/windsurf) | Now called Devin Desktop |
| ChatGPT | [ChatGPT](/guide/integrations/chatgpt) | Needs developer mode on a paid plan |
| Codex (OpenAI) | [Codex](/guide/integrations/codex) | |
| VS Code Copilot | [VS Code](/guide/integrations/vscode) | VS Code 1.101 or later |
| Gemini CLI | [Gemini CLI](/guide/integrations/gemini-cli) | |
| Goose | [Goose](/guide/integrations/goose) | |
| Raycast | [Raycast](/guide/integrations/raycast) | |
| LM Studio | [LM Studio](/guide/integrations/lm-studio) | 0.4.10 or later (0.4.12 on Windows) |
| Open WebUI | [Open WebUI](/guide/integrations/open-webui) | 0.6.31 or later |
| AnythingLLM | [AnythingLLM](/guide/integrations/anythingllm) | Desktop only, through the `mcp-remote` bridge |
| LobeHub | [LobeHub](/guide/integrations/lobehub) | Needs a version with the OAuth auth type |
| LibreChat | [LibreChat](/guide/integrations/librechat) | |
| Hermes Agent | [Hermes Agent](/guide/integrations/hermes-agent) | |
| OpenClaw | [OpenClaw](/guide/integrations/openclaw) | |
| n8n | [n8n](/guide/integrations/n8n) | |
| Dify | [Dify](/guide/integrations/dify) | 1.6.0 or later |
| Gumloop | [Gumloop](/guide/integrations/gumloop) | |
| Copilot Studio | [Copilot Studio](/guide/integrations/copilot-studio) | |

## Not supported yet

These agents cannot connect to the Picsart MCP server today, because they cannot run the Picsart sign-in (OAuth) for a remote server. The Picsart MCP server does not accept API keys, so there is no header-based workaround.

| Agent | Why | Use instead |
|---|---|---|
| [NemoClaw](/guide/integrations/nemoclaw) | Accepts remote servers only with one static credential, and cannot run a local bridge | [OpenClaw](/guide/integrations/openclaw), which NemoClaw is built on |
| AnythingLLM (Docker) | No browser inside the container to complete sign-in | [AnythingLLM Desktop](/guide/integrations/anythingllm) with the bridge |

## Skills vs MCP: which to connect

Both connect Picsart to an agent, but they work differently.

**Skills** are pre-built instruction bundles. Install a skill and the agent already knows how to use Picsart — you just describe the task in plain English. Fastest to set up. Best when you want to generate from a conversation without managing tool schemas.

**MCP** exposes every catalog tool directly: `picsart_generate`, `picsart_preflight`, `picsart_remove_bg`, and more. Use MCP when you want the agent to inspect cost before generating, validate parameters, or chain multiple operations in one turn.

You can use both at the same time — they do not conflict.

| | Skills | MCP |
|---|---|---|
| Install | One command or ZIP, plus the gen-ai CLI | One config block, nothing to install |
| Agent knows Picsart | Yes, pre-built | Via tool schema only |
| Can quote cost before generating | No | Yes |
| Can chain tools | No | Yes |
| Best for | Conversational generation | Workflow automation inside the agent |

## Prerequisites

**For MCP** you need only a Picsart account. The server is hosted by Picsart at `https://api.picsart.com/gen-ai/mcp`, so there is nothing to install. Your agent opens a browser window the first time it connects, and you sign in to Picsart there. Your agent must support remote (HTTP) MCP servers with OAuth sign-in.

You do not need the gen-ai CLI, `gen-ai login`, or an API key for MCP.

**For Skills only:** Skills run the gen-ai CLI, so [install the CLI](/guide/installation) and run `gen-ai login` once before adding a skill.

## Not using an agent?

- **Want to experiment first?** Use the [AI Playground](https://picsart.com/ai-playground/) — no install required.
- **Need scheduled or batch generation?** Use the [CLI](/guide/cli-quickstart).
- **Building a product?** Use the [SDK](/guide/sdk) or the [REST API](/guide/rest-api).
