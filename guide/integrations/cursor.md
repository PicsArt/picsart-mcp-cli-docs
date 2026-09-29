---
description: "Connect Picsart to Cursor: add the gen-ai-use Skill or the hosted Picsart MCP server to generate images, video, and audio inside your coding workflow."
---

# Cursor

[Cursor](https://cursor.com/docs/context/mcp) supports two connection methods: **Skills** (ZIP install) and **MCP** (via the Cursor MCP config). Skills drive the `gen-ai` CLI on your machine. MCP connects Cursor to the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp`, with nothing to install locally.

## Prerequisites

1. A Picsart account with credits for generations.
2. A recent version of Cursor with support for remote MCP servers and OAuth sign-in.

That is all for MCP: the server is hosted by Picsart and you sign in from Cursor. You do not need the gen-ai CLI or `gen-ai login`. Those are needed only for the [Skills method](#method-1-skills-recommended).

## Method 1: Skills (recommended)

::: info Skills need the gen-ai CLI
Skills run the `gen-ai` CLI on your machine. Before adding a skill, [install the CLI](/guide/installation) and run `gen-ai login` once. Check with `gen-ai --version` and `gen-ai credits`. The MCP method does not need this.
:::

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

MCP gives Cursor direct access to every Picsart tool, including pricing, validation, and Drive operations. See the Cursor MCP documentation linked above for general MCP setup options.

### Configure

Add the Picsart server to a Cursor MCP config file. Use `.cursor/mcp.json` in your project for one project, or `~/.cursor/mcp.json` to make it available in every project:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

No API key or headers are needed. Save the file.

### Sign in to Picsart

1. Open the MCP server list in Cursor (the **Customize** page, or the MCP section of Cursor Settings in older versions).
2. Find `picsart-gen-ai`. If it asks for authentication, click its sign-in or connect action.
3. A browser window opens on the Picsart sign-in page. Sign in with your Picsart account.
4. Return to Cursor. The server shows its tools once sign-in completes.

### Verify the connection

In Cursor's agent panel, ask:

> *"List available Picsart image models."*

Cursor should call `picsart_model_catalog` or `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

### Use it

- *"Quote the cost of a Seedance 2.0 video at 1080p, 8 seconds."*
- *"Generate a hero image with Flux 2 Pro and save it to Drive."*
- *"Remove the background from this image URL and return the result."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool list.

## Troubleshooting

**The skill cannot find `gen-ai`.**

This affects the Skills method only. The CLI is not on Cursor's PATH. Run `gen-ai --version` in a terminal to confirm it is installed, then restart Cursor.

**The sign-in window did not open.**

Open the MCP server list, find `picsart-gen-ai`, and start sign-in again. You can also toggle the server off and on to trigger a new sign-in. Check the MCP logs (Output panel, MCP channel) for the error.

**The MCP server is listed but tools do not appear.**

Confirm you finished signing in. Then toggle the server off and on, or restart Cursor, so it reloads the tool list. Check that `mcp.json` is valid JSON with no trailing commas.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Sign in again from the `picsart-gen-ai` entry in Cursor's MCP server list.

**Generation fails with "insufficient credits".**

Ask Cursor *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

Cursor must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both.

## FAQ

**Does Cursor's Skills support work the same way as Claude Code's?**

The underlying skill format is the same. The install location and how you invoke it may differ slightly by Cursor version. Check Cursor's current skill/rules documentation for the exact directory path.

**Do I need the gen-ai CLI for MCP?**

No. The MCP server is hosted by Picsart and you sign in from Cursor. The CLI is needed only for the Skills method.

**Can I use Skills and MCP at the same time in Cursor?**

Yes. They do not conflict. The skill gives Cursor pre-built generation instructions; MCP gives it direct tool access.

**Do I need the Cursor Pro plan to use MCP?**

MCP support is available in Cursor's agent mode. Check Cursor's plan details for any tier restrictions on agent use.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
