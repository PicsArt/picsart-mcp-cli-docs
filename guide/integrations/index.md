---
description: "Connect Picsart to Claude Code, Cursor, Windsurf, ChatGPT, Codex, or VS Code — generate images, video, and audio without leaving your AI agent."
---

# Integrations

Once you have validated a prompt or workflow in the [AI Playground](https://picsart.com/ai-playground/), you can bring Picsart into the AI agent or coding assistant you already work in. Generate images, animate a video, remove a background, or synthesize audio without switching windows.

These guides cover the exact setup for each agent.

## Supported agents

| Agent | Guide |
|---|---|
| Claude Code | [Claude Code](/guide/integrations/claude-code) |
| Cursor | [Cursor](/guide/integrations/cursor) |
| Windsurf | [Windsurf](/guide/integrations/windsurf) |
| ChatGPT | [ChatGPT](/guide/integrations/chatgpt) |
| Codex (OpenAI) | [Codex](/guide/integrations/codex) |
| VS Code Copilot | [VS Code](/guide/integrations/vscode) |

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

## Prerequisites for all integrations

**For MCP** you need only a Picsart account. The server is hosted by Picsart at `https://api.picsart.com/gen-ai/mcp`, so there is nothing to install. Your agent opens a browser window the first time it connects, and you sign in to Picsart there. Your agent must support remote (HTTP) MCP servers with OAuth sign-in.

**For Skills** you also need the gen-ai CLI, because Skills run it to do the work:

1. Install the gen-ai CLI, see [Installation](/guide/installation).
2. Authenticate once: `gen-ai login` (browser OAuth).

The CLI is not required for MCP.

## Not using an agent?

- **Want to experiment first?** Use the [AI Playground](https://picsart.com/ai-playground/) — no install required.
- **Need scheduled or batch generation?** Use the [CLI](/guide/cli-quickstart).
- **Building a product?** Use the [SDK](/guide/sdk) or the [REST API](/guide/rest-api).
