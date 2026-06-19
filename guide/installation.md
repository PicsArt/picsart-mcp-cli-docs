---
description: "Install the Picsart gen-ai CLI (npm or install script) and connect MCP and Skills to Claude Code, Cursor, Windsurf, ChatGPT, or Codex."
---

# Installation

There are three ways to use AI Playground outside the web app — the **gen-ai CLI**, ready-to-use **Skills** for AI agents, and the **MCP** integration. They all build on the same account: install the CLI, run `gen-ai login` once, and everything else builds on it.

## gen-ai CLI

### Install script — macOS / Linux

```bash
curl -fsSL https://picsart.com/gen-ai-cli/install.sh | bash
```

This installs the `gen-ai` binary to `~/.local/bin` (override with `GEN_AI_INSTALL_DIR`), verifies SHA-256 checksums, and adds the install dir to your `PATH` via your shell rc (`.bashrc` / `.zshrc` / `.profile` / fish). Supports macOS and Linux on x64 and arm64.

### Install script — Windows PowerShell

```powershell
iwr https://picsart.com/gen-ai-cli/install.ps1 | iex
```

### npm (any platform)

```bash
npm install -g @picsart/gen-ai
```

### Verify

```bash
gen-ai --version
```

Then authenticate once with `gen-ai login` — see **[Authentication](/guide/authentication)**.

> Official page: [picsart.com/gen-ai-cli](https://picsart.com/gen-ai-cli/)

## Skills — for AI agents

Picsart ships ready-to-use **Skills**: small `.zip` bundles of prompts and instructions that drop straight into **Claude Code, Cursor, Windsurf, or ChatGPT**. Download a skill, hand it to the agent, and it already knows which model to pick, how to structure the prompt, and which `gen-ai` command to run. The flagship skill, **`gen-ai-use`**, gives an agent access to all 176 models across image, video, and audio.

Skills drive the `gen-ai` CLI under the hood, so install the CLI and run `gen-ai login` first. Full walkthrough in the **[Skills guide](/guide/skills)**.

> Official page: [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/)

## MCP & agent integrations

The gen-ai integration is built on the [Model Context Protocol](https://modelcontextprotocol.io), so it works natively with **Claude Code, Cursor, Windsurf, ChatGPT, or any MCP-compatible agent** — connecting to 176 models (Flux, Sora, Kling, Veo, ElevenLabs, and more).

- **Claude Code / Cursor / Windsurf** — add the [`gen-ai-use` Skill](/guide/skills); it plugs the CLI into the agent.
- **Codex (OpenAI)** — install the CLI, then add the plugin:

  ```
  codex://plugins/picsart@openai-curated
  ```

- **Any MCP client** — see the official MCP page for the current connection method and the available tools.

Authentication is always `gen-ai login` (one browser confirmation per machine).

> Official page: [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) — the canonical, always-current connection details live here. The **[MCP Quickstart](/guide/mcp-quickstart)** documents the agent-facing tools (`picsart_generate`, `picsart_pricing`, …) and example calls.
