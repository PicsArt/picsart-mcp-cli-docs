---
description: "Connect Picsart to VS Code Copilot via MCP — generate images, video, and audio without leaving your editor."
---

# VS Code Copilot

VS Code Copilot supports MCP servers in agent mode. Connect the Picsart MCP server to generate images, video, and audio directly from a Copilot conversation in your editor.

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.
4. VS Code 1.99 or later with the GitHub Copilot extension and agent mode enabled.

## Configure

### Workspace config (recommended)

Add a `.vscode/mcp.json` file to your project:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "stdio",
      "command": "gen-ai-mcp"
    }
  }
}
```

### User config (global)

To make Picsart available in all workspaces, add to your VS Code user `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "picsart-gen-ai": {
        "type": "stdio",
        "command": "gen-ai-mcp"
      }
    }
  }
}
```

After saving, restart VS Code or reload the MCP servers in Copilot settings.

## Use it

Open Copilot Chat in agent mode (`@workspace` or the agent panel) and ask:

- *"Generate a 16:9 hero image for this landing page using Flux 2 Pro."*
- *"What does a Seedance 2.0 video cost at 8 seconds?"*
- *"Remove the background from ./assets/product.jpg and save the result."*

Copilot calls the Picsart MCP tools and returns result URLs directly in the chat.

## Troubleshooting

**VS Code does not show Picsart tools in the MCP list.**

Open the Command Palette, search for `MCP: List Servers`, and confirm `picsart-gen-ai` is listed and running. If it is listed but marked as errored, check that `gen-ai-mcp` is on your PATH (`which gen-ai-mcp` in a terminal).

**`gen-ai-mcp` is not found.**

Use the absolute binary path in the config:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "stdio",
      "command": "/Users/you/.local/bin/gen-ai-mcp"
    }
  }
}
```

**Generation fails with "unauthorized".**

Run `gen-ai login` in a terminal and restart VS Code.

## FAQ

**Does MCP in VS Code require a specific Copilot plan?**

MCP support in Copilot is available in VS Code 1.99+ with GitHub Copilot. Check GitHub Copilot's plan details for any tier restrictions on agent mode.

**Can I use MCP and GitHub Copilot's built-in tools at the same time?**

Yes. MCP tools and Copilot's built-in tools coexist. Copilot picks the appropriate tool based on your request.

**Is there a Skills install for VS Code?**

VS Code does not currently have a native skill/rules directory equivalent to Claude Code's plugin marketplace. Use the MCP integration for VS Code.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
