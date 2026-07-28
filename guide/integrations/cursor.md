---
description: "Connect Picsart to Cursor — add the gen-ai-use Skill or MCP server to generate images, video, and audio inside your coding workflow."
---

# Cursor

Cursor supports two connection methods: **Skills** (ZIP install) and **MCP** (via the Cursor MCP config). Both drive the same `gen-ai` CLI.

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.

## Method 1: Skills (recommended)

### Install

1. Download the skill ZIP from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. In Cursor, open **Settings** and go to the rules or skills directory.
3. Place the unzipped skill folder there.
4. Restart Cursor.

Alternatively, install via npx if your Cursor version supports it:

```bash
npx skills add PicsArt/gen-ai-skills
```

### Use it

Ask in plain English in any Cursor conversation or agent panel:

- *"Generate a product shot on a white background using Recraft V4."*
- *"Create a 9:16 teaser video from this image with Wan 2.7."*
- *"Generate 4 banner variants for this campaign brief in 16:9."*

Cursor picks the skill, runs the `gen-ai` command, and returns the result.

## Method 2: MCP

MCP gives Cursor direct access to every Picsart tool, including pricing, validation, and Drive operations.

### Configure

Add the following to your Cursor MCP config file. In Cursor, go to **Settings** and find the MCP servers configuration (usually stored at `~/.cursor/mcp.json` or in your project at `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "gen-ai-mcp"
    }
  }
}
```

Save the file and restart Cursor.

### Verify the connection

In Cursor's agent panel, ask:

> *"List available Picsart image models."*

Cursor should call `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

### Use it

- *"Quote the cost of a Seedance 2.0 video at 1080p, 8 seconds."*
- *"Generate a hero image with Flux 2 Pro and save it to Drive."*
- *"Remove the background from ./shot.jpg and return the URL."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool list.

## Troubleshooting

**Cursor says it cannot find `gen-ai`.**

The CLI is not on Cursor's PATH. Run `which gen-ai` in a terminal to get the full path, then update the MCP config to use the absolute path:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "/Users/you/.local/bin/gen-ai-mcp"
    }
  }
}
```

**The MCP server is listed in settings but tools do not appear.**

Restart Cursor. The tool list is loaded at startup.

**Generation fails with "unauthorized".**

Run `gen-ai login` in a terminal and restart Cursor.

## FAQ

**Does Cursor's Skills support work the same way as Claude Code's?**

The underlying skill format is the same. The install location and how you invoke it may differ slightly by Cursor version — check Cursor's current skill/rules documentation for the exact directory path.

**Can I use Skills and MCP at the same time in Cursor?**

Yes. They do not conflict. The skill gives Cursor pre-built generation instructions; MCP gives it direct tool access.

**Do I need the Cursor Pro plan to use MCP?**

MCP support is available in Cursor's agent mode. Check Cursor's plan details for any tier restrictions on agent use.
