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
| Install | One command or ZIP | One config block |
| Agent knows Picsart | Yes, pre-built | Via tool schema only |
| Can quote cost before generating | No | Yes |
| Can chain tools | No | Yes |
| Best for | Conversational generation | Workflow automation inside the agent |

## Prerequisites for all integrations

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Authenticate once: `gen-ai login` (browser OAuth).

Skills and MCP both drive the CLI internally. The session from step 2 covers all surfaces — no separate credential per agent.

## Not using an agent?

- **Want to experiment first?** Use the [AI Playground](https://picsart.com/ai-playground/) — no install required.
- **Need scheduled or batch generation?** Use the [CLI](/guide/cli-quickstart).
- **Building a product?** Use the [API](https://picsart.com/gen-ai-mcp/).
