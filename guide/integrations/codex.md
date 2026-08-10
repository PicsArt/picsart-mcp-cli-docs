---
description: "Connect Picsart to OpenAI Codex — add the MCP server or install Skills to generate images, video, and audio inside Codex."
---

# Codex (OpenAI)

Codex supports Picsart through two paths: **MCP** (the primary method for direct tool-call access) and **Skills** (for a conversational generation experience).

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.

## Method 1: MCP (recommended)

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

- *"Generate a 16:9 hero image for a Q4 campaign using Flux 2 Pro."*
- *"Create a 9:16 social clip from this product image using Wan 2.7."*
- *"Quote the credit cost of an 8-second Veo 3.1 clip at 1080p."*

See `picsart_generate`, `picsart_preflight`, `picsart_remove_bg`, `picsart_credits`, and the full tool list in the [MCP Quickstart](/guide/mcp-quickstart).

## Method 2: Skills

Install the CLI, then add the skill via npx:

```bash
npx skills add PicsArt/gen-ai-skills
```

Or download the `.zip` from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and attach it to your Codex session.

## Troubleshooting

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

**What is the difference between MCP and Skills in Codex?**

MCP gives Codex direct tool-call access to the full Picsart catalog — precise and scriptable. Skills give the agent pre-built generation instructions so you can drive it in plain English. Both use the same CLI and credit balance.

**Does connecting Picsart to Codex cost extra?**

No. The MCP server and Skills are free to install. Generations consume Picsart credits.

## Start creating

Click below to open ChatGPT with a ready-to-run Picsart prompt. ChatGPT will invoke the Picsart plugin automatically once you confirm.

::: tip Ready to generate?
[Start creating in Codex](https://chatgpt.com/?q=Use%20Picsart%20MCP%20to%20generate%20a%20photorealistic%20product%20shot%20on%20a%20white%20background%20with%20natural%20lighting%20using%20Flux%202%20Pro){ .btn-primary target="_blank" rel="noopener" }
:::
