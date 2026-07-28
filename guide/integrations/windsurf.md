---
description: "Connect Picsart to Windsurf (Cascade) — install the gen-ai-use Skill or MCP server to generate images, video, and audio inside Windsurf."
---

# Windsurf

Windsurf (Cascade) supports both **Skills** (ZIP install) and **MCP** via the Windsurf MCP config. The setup is nearly identical to Cursor.

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.

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

Open Windsurf's MCP settings and add:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "gen-ai-mcp"
    }
  }
}
```

Save and restart Windsurf.

### Use it

Once connected, Cascade can call Picsart tools directly:

- *"What does a Veo 3.1 video cost at 8 seconds and 1080p?"*
- *"Generate a batch of 4 hero images for this brief and save to Drive."*
- *"Remove the background from this URL and return the cleaned image."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog.

## Troubleshooting

**Windsurf cannot find `gen-ai-mcp`.**

Use the absolute binary path:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "/Users/you/.local/bin/gen-ai-mcp"
    }
  }
}
```

Find the path with `which gen-ai-mcp` in a terminal.

**Generation fails with "unauthorized".**

Run `gen-ai login` in a terminal and restart Windsurf.

## FAQ

**Is the Picsart skill the same for Windsurf and Cursor?**

Yes. The `gen-ai-use` skill bundle is agent-agnostic. The only difference is the directory where you place the skill — check Windsurf's current documentation for the exact path.

**Can I use Skills and MCP at the same time?**

Yes. They operate independently and do not conflict.
