---
description: "Install the Picsart gen-ai CLI, add Skills, or connect the hosted Picsart MCP server to Claude, Cursor, Windsurf, ChatGPT, or Codex. Step-by-step for every platform."
---

# Installation

There are three ways to use AI Playground from outside the web app: the **gen-ai CLI**, drop-in **Skills** for AI agents, and the **MCP server**. All three share the same account and credit balance.

This page covers installation for each surface. If you want a quickstart instead, go to [CLI Quickstart](/guide/cli-quickstart) or [MCP Quickstart](/guide/mcp-quickstart).

| Surface | Install the CLI? | Sign-in |
|---|---|---|
| **gen-ai CLI** | Yes | `gen-ai login` |
| **Skills** | Yes, Skills run the CLI | `gen-ai login` |
| **MCP server** | **No**, it is hosted by Picsart | In your agent, the first time it connects |

Only using MCP? Skip straight to [MCP and agent integrations](#mcp-and-agent-integrations).

## gen-ai CLI

Install the CLI to generate from your terminal, scripts, and CI, or to use Skills (which run the CLI under the hood). The MCP server does not need it.

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

`gen-ai login` opens your browser for a one-time OAuth confirmation and stores a secure token at `~/.gen-ai/credentials.json`. This sign-in covers the CLI and Skills. The MCP server signs in separately, inside your agent. For CI or other headless machines, use [environment variables](/guide/authentication#ci-and-headless-environments) instead of `gen-ai login`. See [Authentication](/guide/authentication) for details.

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

The server is hosted by Picsart, so there is nothing to install. You add its address to your agent and sign in to Picsart in the browser window the agent opens:

```
https://api.picsart.com/gen-ai/mcp
```

Each host has a dedicated setup guide:

| Agent | Guide |
|---|---|
| Claude Code | [Claude Code integration](/guide/integrations/claude-code) |
| Cursor | [Cursor integration](/guide/integrations/cursor) |
| Windsurf | [Windsurf integration](/guide/integrations/windsurf) |
| ChatGPT | [ChatGPT integration](/guide/integrations/chatgpt) |
| Codex (OpenAI) | [Codex integration](/guide/integrations/codex) |
| VS Code Copilot | [VS Code integration](/guide/integrations/vscode) |

You do not need the CLI or `gen-ai login` for any of them. Each agent signs in to your Picsart account the first time it connects, and all of them share one credit balance.

### Quick reference — add the MCP server

**Claude (web and desktop):** Settings → Connectors → **Add custom connector**, then paste the address above.

**Claude Code:**
```bash
claude mcp add --transport http picsart-gen-ai https://api.picsart.com/gen-ai/mcp
```
Then run `/mcp` in Claude Code and choose **Authenticate**.

**Codex:**
```bash
codex mcp add picsart-gen-ai --url https://api.picsart.com/gen-ai/mcp
codex mcp login picsart-gen-ai
```

**Cursor / Windsurf / VS Code:** add the address above as a remote (HTTP) MCP server in the agent's MCP config file. See the individual integration guides for the exact config block.

> Official page: [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/). The canonical, always-current connection details live here. The **[MCP Quickstart](/guide/mcp-quickstart)** documents the agent-facing tools (`picsart_generate`, `picsart_preflight`, …) and example calls. The `picsart_media_*` tools for building video and images from existing material are documented under
> **[Picsart Media Studio](/guide/media-studio/)**, which is also available as its own connector.

---

## FAQ

**Do I need to install the CLI to use MCP?**

No. The MCP server is hosted by Picsart and your agent connects to it over HTTPS. You sign in to Picsart inside the agent. Nothing is installed on your machine.

**Do I need to install the CLI to use Skills?**

Yes. Skills run the `gen-ai` binary to do the work. Install the CLI and run `gen-ai login` once before adding a skill.

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
