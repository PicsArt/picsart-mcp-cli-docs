---
description: "Connect Picsart to OpenAI Codex — install the curated plugin or MCP server to generate images, video, and audio inside Codex."
---

# Codex (OpenAI)

Codex supports Picsart through a **curated plugin** (the simplest path) and through the **MCP server** (for direct tool-call access).

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.

## Method 1: Curated plugin (recommended)

OpenAI maintains a curated plugin registry for Codex. The Picsart plugin is included.

### Install

```bash
codex plugin add codex://plugins/picsart@openai-curated
```

Restart Codex after installing.

### Use it

In a Codex session:

- *"Generate a 16:9 hero image for a Q4 campaign using Flux 2 Pro."*
- *"Create a 9:16 social clip from this product image using Wan 2.7."*
- *"Describe the contents of this image."*

Codex calls the plugin, which runs the `gen-ai` command and returns the result.

## Method 2: MCP

### Configure

```bash
codex mcp add picsart-gen-ai -- gen-ai-mcp
```

Or add manually to your Codex MCP config:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "gen-ai-mcp"
    }
  }
}
```

### Use it

Once connected, Codex can call any Picsart MCP tool:

- `picsart_generate`, `picsart_remove_bg`, `picsart_pricing`, `picsart_credits`, and the full tool list from the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**Codex says the plugin is not found.**

Run `codex plugin list` to see installed plugins. If Picsart is missing, reinstall with the `codex plugin add` command above.

**`gen-ai-mcp` is not found.**

Use the absolute path:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "/Users/you/.local/bin/gen-ai-mcp"
    }
  }
}
```

**Generation fails with "unauthorized".**

Run `gen-ai login` in a terminal and restart Codex.

## FAQ

**What is the difference between the plugin and MCP in Codex?**

The curated plugin is a pre-configured integration maintained by OpenAI. MCP is the underlying protocol — connecting via `codex mcp add` gives you the same tools but bypasses the plugin registry. For most users the plugin is simpler.

**Does the Codex plugin cost extra?**

No. The plugin is free to install. Generations consume Picsart credits.
