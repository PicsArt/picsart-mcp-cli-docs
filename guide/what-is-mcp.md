---
description: "What the Model Context Protocol (MCP) is, how it works, and why it lets AI agents generate images, video, and audio with Picsart directly."
---

# What is MCP?

**Model Context Protocol (MCP)** is an open standard that lets an AI agent use external tools, data sources, and APIs as if they were built into the agent itself. It was introduced by Anthropic and is now supported across Claude Code, Cursor, Windsurf, VS Code Copilot, ChatGPT, Codex, and other agents.

Without MCP, an agent can only do what it was trained to do. With MCP, you connect it to external services — such as a database, a code repository, or the Picsart model catalog — and the agent can use those services directly during a conversation.

## How it works

An MCP server is a process that runs on your machine (or a remote server) and exposes a list of **tools**. Each tool has a name, a description, and a schema for its inputs and outputs. When you connect an MCP server to an agent:

1. The agent reads the list of available tools.
2. When you ask for something that requires one of those tools, the agent calls the tool automatically.
3. The tool runs the underlying operation (in this case, generating an image or video via Picsart) and returns a result.
4. The agent uses that result to continue the conversation.

From your perspective: you ask in plain English, the agent figures out which tool to call and with what parameters, and the result appears in the conversation. You do not write code or call an API manually.

## What the Picsart MCP server provides

The Picsart MCP server is hosted by Picsart at `https://api.picsart.com/gen-ai/mcp`. It exposes available models as MCP tools. The SDK catalog reference covers **223 models** from **28 providers**. MCP availability depends on the server version. Once connected, your agent can:

- Generate images with models like Flux 2 Pro, Recraft V4, Ideogram 4, GPT Image, and Imagen 4.
- Generate video with Seedance 2.5, Veo 3.1, Kling V3, Seedance 2.0, Runway, Luma Ray 3, and others.
- Generate audio: speech with ElevenLabs voices, music with MiniMax Music, sound effects.
- Remove or replace image backgrounds.
- Upscale and enhance images.
- Vectorize raster images to SVG.
- Browse the catalog, quote costs, check your credit balance, and manage files in Picsart Drive without leaving the agent conversation.

The same models are accessible from the [AI Playground web app](https://picsart.com/ai-playground/) — MCP is the programmatic and agent-native way to reach them.

## MCP vs CLI vs Skills

| | What it is | Best for |
|---|---|---|
| **MCP** | A protocol that exposes tools to any MCP-compatible agent | Agents that handle generation as part of a larger workflow |
| **CLI** | A terminal command for the full catalog | Direct generation, scripting, CI/CD, automation |
| **Skills** | Pre-built agent instructions that drive the CLI | Conversational generation in Claude Code, Cursor, Windsurf |

MCP and the CLI are independent. MCP runs on Picsart's servers and needs nothing installed on your machine; the CLI is a terminal program you install yourself. Skills give the agent pre-written instructions about how to use Picsart and run the CLI to do the work, so they are the one surface that needs the CLI. If you want fine-grained tool-call control without installing anything, use MCP.

## Before MCP existed

Before protocols like MCP, connecting an AI agent to an external API required:

- Writing custom glue code per agent.
- Maintaining separate integrations for Claude, GPT, Cursor, etc.
- Teaching the agent about your API schema through system prompts.

MCP standardizes this: one server implementation works across all MCP-compatible agents. Picsart ships one MCP server that works in Claude Code, Cursor, Windsurf, VS Code Copilot, ChatGPT, and Codex — no custom integration per agent.

## Security and authentication

The Picsart MCP server uses OAuth. The first time your agent connects, it opens a browser window where you sign in to Picsart and approve access. Your password goes only to Picsart, never to the agent or the MCP server. The agent keeps the resulting access token and sends it with each tool call, so every generation runs as you and draws on your credit balance. To revoke access, remove or sign out of the server in your agent's settings.

## Get started

- [Connect MCP to Claude Code](/guide/integrations/claude-code)
- [Connect MCP to Cursor](/guide/integrations/cursor)
- [Connect MCP to Windsurf](/guide/integrations/windsurf)
- [Connect MCP to ChatGPT](/guide/integrations/chatgpt)
- [MCP Quickstart](/guide/mcp-quickstart) — tool catalog, example calls, recommended flow

## FAQ

**Do I need to know how MCP works to use it?**

No. Add the server address to your agent, sign in to Picsart when the browser window opens, and ask the agent to generate something. The protocol runs in the background. You do not need to install the CLI.

**Is MCP specific to Anthropic or Claude?**

MCP was introduced by Anthropic but is an open standard. It is now implemented by Cursor, Windsurf, VS Code Copilot, OpenAI Codex, and ChatGPT. Any agent that implements the protocol can use any MCP server, including Picsart's.

**Does each agent need its own Picsart account?**

No. You use the same Picsart account and the same credit balance in every agent. Each agent signs in on its own the first time it connects.

**Is MCP the same as a plugin or an extension?**

MCP is a protocol. Plugins and extensions are typically agent-specific formats. The advantage of MCP is that one server implementation works across all supporting agents, whereas a plugin is usually built for one platform.

**What happens if the MCP server is unreachable?**

The agent loses access to the Picsart tools until the connection comes back. The agent itself keeps running. The server is hosted, so there is no local process to restart: check your network can reach `api.picsart.com`, then reconnect the server from your agent's MCP settings or restart the agent.
