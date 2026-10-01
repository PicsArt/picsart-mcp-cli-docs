---
description: "Install the gen-ai CLI or connect to the hosted Picsart MCP server."
---

# Installation

Choose the setup for your workflow:

- **Hosted MCP:** connect your agent to `https://api.picsart.com/gen-ai/mcp` and complete its Picsart sign-in. No CLI installation is needed. Start with [MCP Quickstart](/guide/mcp-quickstart).
- **CLI:** install `gen-ai`, then sign in from your terminal.
- **Skills:** install the CLI and add the [Picsart skills](/guide/skills) to an agent that can run shell commands.

## Install the CLI

### npm

Requires Node.js 22 or later:

```bash
npm install -g @picsart/gen-ai
```

### macOS and Linux

The installer downloads a platform binary to `~/.local/bin`:

```bash
curl -fsSL https://picsart.com/gen-ai-cli/install.sh | bash
```

Set `GEN_AI_INSTALL_DIR` to choose another writable directory. Open a new terminal if the command is not on your `PATH` after installation.

### Windows PowerShell

The PowerShell installer checks for Node.js 22 or later and installs the npm package. It is not a standalone Windows binary installer.

```powershell
iwr https://picsart.com/gen-ai-cli/install.ps1 | iex
```

## Verify and sign in

```bash
gen-ai --version
gen-ai login
gen-ai whoami
```

Expect a version number, a browser sign-in flow, and an authenticated status. These checks do not generate media or spend generation credits. Continue with [CLI Quickstart](/guide/cli-quickstart).

## Troubleshooting

**Command not found:** open a new terminal and check that the install directory is on `PATH`. If you installed through npm, check its global binary directory. Keep one installation first on `PATH` to avoid running an older version.

**Authentication failed:** run `gen-ai login` in an interactive terminal. Hosted MCP has its own sign-in through the agent; a local CLI login does not authorize a remote host.

**Looking for a local MCP binary:** the tested `@picsart/gen-ai` 2.78.0 package exposes `gen-ai`, not `gen-ai-mcp`. Use the hosted connection guides. Do not substitute an unverified npm package.
