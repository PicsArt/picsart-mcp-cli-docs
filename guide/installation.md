---
description: "Install the Picsart gen-ai CLI, connect Skills or MCP to Claude Code, Cursor, Windsurf, ChatGPT, or Codex — step-by-step for every platform."
---

# Installation

There are three ways to use AI Playground from outside the web app: the **gen-ai CLI**, drop-in **Skills** for AI agents, and the **MCP server**. All three share the same account and credit balance.

The CLI and the MCP server are independent — install either one without the other. Skills are the exception: they run `gen-ai` commands, so they need the CLI.

This page covers installation for each surface. If you want a quickstart instead, go to [CLI Quickstart](/guide/cli-quickstart) or [MCP Quickstart](/guide/mcp-quickstart).

## gen-ai CLI

The terminal tool for scripting and automation. Install it if you want to run `gen-ai` yourself or use [Skills](/guide/skills); the MCP server does not need it.

### macOS and Linux

```bash
curl -fsSL https://picsart.com/gen-ai-cli/install.sh | bash
```

This installs the `gen-ai` binary to `~/.local/bin` (override with `GEN_AI_INSTALL_DIR`), verifies SHA-256 checksums, and adds the install directory to your `PATH` via your shell rc file (`.bashrc`, `.zshrc`, `.profile`, or fish config). Supports macOS and Linux on x64 and arm64.

### Windows (PowerShell)

```powershell
iwr https://picsart.com/gen-ai-cli/install.ps1 | iex
```

On Windows the script installs the npm package: it installs or upgrades Node.js 22+ first if needed (via `winget`, or the official MSI), runs `npm install -g @picsart/gen-ai`, and sets the PowerShell execution policy to `RemoteSigned` for your user if it was `Restricted`.

### npm (all platforms)

```bash
npm install -g @picsart/gen-ai
```

Requires Node.js 22 or later. Works on macOS, Linux, and Windows.

### Verify the install

```bash
gen-ai --version
```

Keep it current with `gen-ai update`.

Then sign in once:

```bash
gen-ai login
```

`gen-ai login` opens your browser for a one-time OAuth confirmation and stores a secure token at `~/.gen-ai/credentials.json`. This sign-in also covers Skills, which run `gen-ai` commands. For CI or other headless machines, use [environment variables](/guide/authentication#ci-and-headless-environments) instead. See [Authentication](/guide/authentication) for details.

> Official product page: [picsart.com/gen-ai-cli](https://picsart.com/gen-ai-cli/)

---

## Skills — drop-in agent bundles

**Skills** are `.zip` bundles that teach an AI agent how to generate media with Picsart. Drop a skill into Claude Code, Cursor, Windsurf, or ChatGPT, and the agent knows which model to pick and which command to run — you ask in plain English.

The flagship skill, **`gen-ai-use`**, gives an agent access to all 201 models across image, video, and audio.

Skills call the CLI internally, so [install the CLI](#gen-ai-cli) and run `gen-ai login` before adding a skill.

### Install — Claude Code (recommended)

```bash
claude plugin marketplace add PicsArt/gen-ai-skills
```

Then activate it inside Claude Code:

```
/plugin install picsart@picsart
```

Or via npx:

```bash
npx skills add PicsArt/gen-ai-skills
```

Or copy the skills bundled with the CLI straight into `~/.claude/skills/`:

```bash
gen-ai install-skills        # --force to overwrite, --to <dir> for another location
gen-ai check-skills          # see which are installed
```

### Install — Cursor and Windsurf

1. Download the skill ZIP from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. Place it in your Cursor or Windsurf skills/rules directory as instructed by that agent.
3. Ask in plain English: *"Generate a 16:9 hero image for a spring campaign."*

### Install — ChatGPT

Attach the skill ZIP to a conversation or a custom GPT. Once attached, the agent can call `gen-ai` commands directly.

> Official product page: [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/)

Full walkthrough in the [Skills guide](/guide/skills).

---

## MCP and agent integrations

The Picsart MCP server exposes the full model catalog as [Model Context Protocol](https://modelcontextprotocol.io) tools, so any MCP-compatible agent can generate image, video, and audio without leaving the agent. See [What is MCP?](/guide/what-is-mcp) if you are new to the protocol.

Each host has a dedicated setup guide:

| Agent | Guide |
|---|---|
| Claude Code | [Claude Code integration](/guide/integrations/claude-code) |
| Cursor | [Cursor integration](/guide/integrations/cursor) |
| Windsurf | [Windsurf integration](/guide/integrations/windsurf) |
| ChatGPT | [ChatGPT integration](/guide/integrations/chatgpt) |
| Codex (OpenAI) | [Codex integration](/guide/integrations/codex) |
| VS Code Copilot | [VS Code integration](/guide/integrations/vscode) |

The MCP server does not need the CLI. Choose how to run it:

- **Remote (HTTP)** — nothing to install. Point your client at `https://api.picsart.com/gen-ai/mcp` and sign in with your Picsart account when prompted.
- **Local (stdio)** — install the server package, which provides the `gen-ai-mcp` command:

```bash
npm install -g @picsart/gen-ai-mcp
```

The local server authenticates with a `PICSART_TOKEN` in its MCP config (or reuses a signed-in CLI session if you have one). See [MCP authentication](/guide/mcp-quickstart#authentication). Either way it is one Picsart account and one credit balance.

### Quick reference — add the MCP server

**Claude Code:**
```bash
claude mcp add picsart-gen-ai -- gen-ai-mcp                                        # local
claude mcp add --transport http picsart-gen-ai https://api.picsart.com/gen-ai/mcp   # remote
```

**Codex:**
```bash
codex mcp add picsart-gen-ai -- gen-ai-mcp
```

**Cursor / Windsurf / VS Code** — add `gen-ai-mcp` as the MCP server command in the agent's MCP config file. See the individual integration guides for the exact config block.

> Official page: [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) — the canonical, always-current connection details live here. The **[MCP Quickstart](/guide/mcp-quickstart)** documents the agent-facing tools (`picsart_generate`, `picsart_preflight`, …) and example calls. The `picsart_media_*` tools for building video and images from existing material are documented separately under
> **[Picsart Media Studio](/guide/media-studio/)**, which is its own remote connector rather than part of the gen-ai MCP server.

---

## FAQ

**Do I need to install the CLI to use Skills or MCP?**

For Skills, yes: skills run `gen-ai` commands, so the CLI must be installed and signed in. For MCP, no: the remote server needs nothing installed, and the local server is its own package (`@picsart/gen-ai-mcp`) with its own authentication. Likewise, the CLI never needs the MCP server.

**Which install method should I use — curl, PowerShell, or npm?**

Use the curl script on macOS/Linux and the PowerShell script on Windows unless you are already managing a Node.js project. The curl script installs a self-contained binary and does not require Node.js. The PowerShell script and the npm path both install the npm package, which runs on Node.js 22+ (the PowerShell script installs Node.js for you if it is missing).

**What does `GEN_AI_INSTALL_DIR` do?**

It overrides where the binary is placed. By default the script installs to `~/.local/bin`. Set `GEN_AI_INSTALL_DIR=/usr/local/bin` if you want a system-wide install (requires write access to that directory).

**The CLI installed but `gen-ai` is not found.**

Your shell's `PATH` may not have updated. Run `source ~/.zshrc` (or `.bashrc`, `.profile`) in the same terminal window, or open a new terminal.

**Can I use the npm package and the curl binary on the same machine?**

Yes, but only one should be on your `PATH`. Having both is not harmful, but it can cause version mismatches. Prefer one install method per machine.

**Is the CLI free?**

The CLI itself costs nothing to install or run. Generations consume Picsart credits drawn from your account balance. Run `gen-ai pricing <model>` to see the cost of a specific model before generating.
