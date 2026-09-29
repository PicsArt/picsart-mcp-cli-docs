---
description: "Connect Picsart to Windsurf (Cascade): install the gen-ai-use Skill or add the hosted Picsart MCP server to generate images, video, and audio inside Windsurf."
---

# Windsurf

Windsurf (Cascade) supports both **Skills** (ZIP install) and **MCP** via the [Cascade MCP config](https://docs.devin.ai/desktop/cascade/mcp). Skills drive the `gen-ai` CLI on your machine. MCP connects Cascade to the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp`, with nothing to install locally.

Windsurf is now called Devin Desktop, and Cascade is its legacy agent. The steps below apply to both names.

## Prerequisites

For both methods:

1. A Picsart account with credits for generations.
2. A recent version of Windsurf (Devin Desktop).

For the Skills method only:

3. Install the gen-ai CLI. See [Installation](/guide/installation).
4. Run `gen-ai login` (one-time browser OAuth).
5. Verify: `gen-ai --version` and `gen-ai credits`.

The MCP method does not use the CLI. You sign in to Picsart from Windsurf instead.

## Method 1: Skills (recommended)

### Install

1. Download the skill ZIP from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. In Windsurf, locate the rules or skills import in Settings.
3. Place the unzipped skill folder in the designated directory.
4. Restart Windsurf.

### Use it

In the Cascade agent panel:

- *"Generate a 16:9 product image with a gradient background using Ideogram 4."*
- *"Animate this still into a 5-second clip with subtle parallax."*
- *"Generate a voiceover for this script using an ElevenLabs voice."*

Cascade picks the appropriate model and runs the `gen-ai` command.

## Method 2: MCP

### Configure

1. In the Cascade panel, open the `...` (Actions) menu in the top right and click **Open MCP config file** in the MCPs section.
2. Add the Picsart server. Remote servers use the `serverUrl` key:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "serverUrl": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

3. Save the file. No API key or headers are needed.

The file is `mcp_config.json`. Current versions keep it at `~/.config/devin/mcp_config.json` (`%APPDATA%\devin\mcp_config.json` on Windows). Older Windsurf versions use `~/.codeium/windsurf/mcp_config.json`.

### Sign in to Picsart

When Cascade connects to the server for the first time, it opens a browser window on the Picsart sign-in page. Sign in with your Picsart account, then return to Windsurf. The Picsart tools appear in the MCPs section of the Actions menu once sign-in completes.

### Use it

Once connected, Cascade can call Picsart tools directly:

- *"What does a Veo 3.1 video cost at 8 seconds and 1080p?"*
- *"Generate a batch of 4 hero images for this brief and save to Drive."*
- *"Remove the background from this URL and return the cleaned image."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog.

## Troubleshooting

**The sign-in window did not open.**

Open the MCPs section of the Actions menu, toggle `picsart-gen-ai` off and on, and let Cascade connect again. If no browser opens, restart Windsurf.

**The server is listed but tools do not appear.**

Confirm you finished signing in. Check that `mcp_config.json` is valid JSON and uses `serverUrl`, not `url` or `command`. Then toggle the server off and on, or restart Windsurf. Cascade can use at most 100 tools at a time across all servers, so disable servers you do not need.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Toggle `picsart-gen-ai` off and on in the MCPs section and sign in again when the browser opens.

**Generation fails with "insufficient credits".**

Ask Cascade *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

Windsurf must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both. On Teams plans, an admin may also need to allow the server.

## FAQ

**Is the Picsart skill the same for Windsurf and Cursor?**

Yes. The `gen-ai-use` skill bundle is agent-agnostic. The only difference is the directory where you place the skill. Check Windsurf's current documentation for the exact path.

**Do I need the gen-ai CLI for MCP?**

No. The MCP server is hosted by Picsart and you sign in from Windsurf. The CLI is needed only for the Skills method.

**Can I use Skills and MCP at the same time?**

Yes. They operate independently and do not conflict.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
