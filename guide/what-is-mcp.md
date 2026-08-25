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

The Picsart MCP server (`gen-ai-mcp`) exposes the full AI Playground model catalog — **176 models** from **31 providers** — as MCP tools. Once connected, your agent can:

- Generate images with models like Flux 2 Pro, Recraft V4, Ideogram 4, GPT Image, and Imagen 4.
- Generate video with Sora 2, Veo 3.1, Kling V3, Seedance 2.0, Runway, Luma Ray 3, and others.
- Generate audio: speech with ElevenLabs voices, music with MiniMax Music, sound effects.
- Remove or replace image backgrounds.
- Upscale and enhance images.
- Vectorize raster images to SVG.
- Browse, quote, and manage all of the above without leaving the agent conversation.

The same models are accessible from the [AI Playground web app](https://picsart.com/ai-playground/) — MCP is the programmatic and agent-native way to reach them.

## MCP vs CLI vs Skills

| | What it is | Best for |
|---|---|---|
| **MCP** | A protocol that exposes tools to any MCP-compatible agent | Agents that handle generation as part of a larger workflow |
| **CLI** | A terminal command for the full catalog | Direct generation, scripting, CI/CD, automation |
| **Skills** | Pre-built agent instructions that drive the CLI | Conversational generation in Claude Code, Cursor, Windsurf |

Skills are a layer on top of the CLI and MCP — they give the agent pre-written instructions about how to use Picsart, so you don't have to prompt it yourself. If you want the agent to generate with minimal friction, Skills are the fastest path. If you want fine-grained tool-call control, use MCP directly.

## Before MCP existed

Before protocols like MCP, connecting an AI agent to an external API required:

- Writing custom glue code per agent.
- Maintaining separate integrations for Claude, GPT, Cursor, etc.
- Teaching the agent about your API schema through system prompts.

MCP standardizes this: one server implementation works across all MCP-compatible agents. Picsart ships one MCP server that works in Claude Code, Cursor, Windsurf, VS Code Copilot, ChatGPT, and Codex — no custom integration per agent.

## Security and authentication

The Picsart MCP server uses your existing Picsart OAuth session, established by `gen-ai login`. It does not expose your credentials to the agent — the agent sends a tool call, the server handles the API request, and results are returned. Your token stays on your machine.

## Get started

- [Connect MCP to Claude Code](/guide/integrations/claude-code)
- [Connect MCP to Cursor](/guide/integrations/cursor)
- [Connect MCP to Windsurf](/guide/integrations/windsurf)
- [Connect MCP to ChatGPT](/guide/integrations/chatgpt)
- [MCP Quickstart](/guide/mcp-quickstart) — tool catalog, example calls, recommended flow

## FAQ

**Do I need to know how MCP works to use it?**

No. Install the CLI, run `gen-ai login`, add the server to your agent's config, and ask the agent to generate something. The protocol runs in the background.

**Is MCP specific to Anthropic or Claude?**

MCP was introduced by Anthropic but is an open standard. It is now implemented by Cursor, Windsurf, VS Code Copilot, OpenAI Codex, and ChatGPT. Any agent that implements the protocol can use any MCP server, including Picsart's.

**Does each agent need its own Picsart account?**

No. One Picsart account, one `gen-ai login`, one credit balance — regardless of which agent you use.

**Is MCP the same as a plugin or an extension?**

MCP is a protocol. Plugins and extensions are typically agent-specific formats. The advantage of MCP is that one server implementation works across all supporting agents, whereas a plugin is usually built for one platform.

**What happens if the MCP server crashes?**

The agent loses access to the Picsart tools until the server restarts. The agent itself keeps running. Restart the server by re-running the agent's MCP setup or restarting the agent application.
