---
description: "Connect Picsart to VS Code Copilot via the hosted Picsart MCP server: generate images, video, and audio without leaving your editor."
---

# VS Code Copilot

VS Code Copilot [supports MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers) in agent mode. Connect the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp` to generate images, video, and audio directly from a Copilot conversation in your editor. Nothing is installed locally.

## Prerequisites

1. A Picsart account with credits for generations.
2. VS Code 1.101 or later (the first version with sign-in support for MCP servers), with the GitHub Copilot extension and agent mode enabled.

You do not need the gen-ai CLI or `gen-ai login` for MCP.

## Configure

### Workspace config (recommended)

Add a `.vscode/mcp.json` file to your project:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "http",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

### User config (global)

To make Picsart available in all workspaces, open the Command Palette, run **MCP: Open User Configuration**, and add the same entry:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "http",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

You can also run **MCP: Add Server**, choose **HTTP**, and paste the URL.

No API key or headers are needed.

### Sign in to Picsart

1. Start the server: select **Start** above the entry in `mcp.json`, or run **MCP: List Servers**, pick `picsart-gen-ai`, and choose **Start Server**.
2. If VS Code asks whether to trust the server, review the URL and confirm.
3. VS Code asks to authenticate with Picsart. Allow it.
4. A browser window opens on the Picsart sign-in page. Sign in with your Picsart account.
5. Return to VS Code. The server starts and its tools appear in the chat tools list.

## Use it

Open the Chat view, switch to agent mode, and ask:

- *"Generate a 16:9 hero image for this landing page using Flux 2 Pro."*
- *"What does a Seedance 2.0 video cost at 8 seconds?"*
- *"List the available Picsart video models."*

Copilot calls the Picsart MCP tools and returns result URLs directly in the chat. See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool list.

## Troubleshooting

**VS Code does not show Picsart tools.**

Run **MCP: List Servers** and confirm `picsart-gen-ai` is listed and running. If it is stopped or errored, restart it and choose **Show Output** to see the error. Also check the tools picker in the Chat view to confirm the Picsart tools are enabled.

**The sign-in window did not open.**

Restart the server from **MCP: List Servers**. VS Code asks to authenticate again when the server has no valid sign-in. If the prompt still does not appear, check the Accounts menu in the lower-left corner for a pending sign-in request.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Sign out of Picsart from the Accounts menu, then restart the server and sign in again when prompted.

**Generation fails with "insufficient credits".**

Ask Copilot *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

VS Code must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both.

## FAQ

**Does MCP in VS Code require a specific Copilot plan?**

Check GitHub Copilot's plan details for any tier restrictions on agent mode. Organizations can also restrict MCP server use through Copilot policies.

**Can I use MCP and GitHub Copilot's built-in tools at the same time?**

Yes. MCP tools and Copilot's built-in tools coexist. Copilot picks the appropriate tool based on your request.

**Is there a Skills install for VS Code?**

VS Code does not currently have a native skill/rules directory equivalent to Claude Code's plugin marketplace. Use the MCP integration for VS Code.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
