---
description: "Connect Picsart to Claude Code — install via the plugin marketplace or MCP, generate images, video, and audio in plain English."
---

# Claude Code

Claude Code supports two connection methods: **Skills** (the recommended path) and **MCP** (for direct tool-call access). Both use the same `gen-ai` CLI under the hood.

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` (one-time browser OAuth).
3. Verify: `gen-ai --version` and `gen-ai credits`.

## Method 1: Skills (recommended)

Skills give Claude Code a pre-built understanding of Picsart's models and generation patterns. You describe what you want; Claude Code handles the rest.

### Install

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

Or download the `.zip` from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and place it in `~/.claude/skills/`.

### Use it

Invoke the skill directly:

```
/gen-ai-use
```

Or just describe a task — Claude Code detects the relevant skill automatically:

- *"Generate a 16:9 hero image for a summer sale campaign using Flux 2 Pro."*
- *"Animate this product photo into a 5-second video with subtle motion."*
- *"Remove the background from all images in ./product-shots/ and save to Drive."*

Claude Code picks the model, constructs the command, runs it, and returns the result URL.

### What the skill can access

The `gen-ai-use` skill gives Claude Code access to all **174 models** across image, video, and audio. Browse them at [picsart.com/ai-playground](https://picsart.com/ai-playground/) or run:

```bash
gen-ai models
gen-ai models --mode video
gen-ai models --provider elevenlabs
```

## Method 2: MCP

For direct tool-call access, connect the Picsart MCP server. This lets Claude Code call `picsart_generate`, `picsart_preflight`, `picsart_remove_bg`, and all other tools explicitly.

### Add the MCP server

```bash
claude mcp add picsart-gen-ai -- gen-ai-mcp
```

Restart Claude Code after running this command.

### Verify the connection

In Claude Code, ask:

> *"List the available Picsart video models."*

Claude Code should call `picsart_list_models` and return a list. If it does not, see [Troubleshooting](#troubleshooting) below.

### Use it

Once connected, Claude Code can call any MCP tool:

- *"Quote the cost of generating an 8-second Veo 3.1 video at 1080p."*
- *"Generate a product image with Recraft V4, white background, square format."*
- *"Upload ./logo.png to Drive and use it as the input for a background replacement."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog and example tool calls.

## Choosing between Skills and MCP

| | Skills | MCP |
|---|---|---|
| Setup complexity | One command | One command |
| What Claude Code knows | Pre-built Picsart instructions | Raw tool schema |
| Best for | Conversational generation tasks | Workflows that inspect cost, validate params, or chain tools |
| Prompt style | Plain English description | Can be explicit tool-call instructions |

You can use both at the same time — the skill and the MCP server do not conflict.

## Troubleshooting

**Claude Code does not recognize the skill.**

Run `claude plugin list` to confirm `picsart@picsart` appears. If not, reinstall:
```bash
claude plugin marketplace add PicsArt/gen-ai-skills
```
Then in Claude Code: `/plugin install picsart@picsart`

**Claude Code calls `gen-ai` but gets "command not found".**

The CLI is not on the PATH visible to Claude Code. Run `gen-ai --version` in a terminal to confirm it is installed, then restart Claude Code. If needed, specify the full path: find it with `which gen-ai`.

**The MCP server connects but no tools appear.**

Restart Claude Code after adding the MCP config. The tool list is loaded at startup.

**Generation fails with "unauthorized".**

Your session has expired. Run `gen-ai login` in a terminal and restart Claude Code.

**Generation fails with "insufficient credits".**

Run `gen-ai credits` to check your balance. Top up at [picsart.com](https://picsart.com).

## FAQ

**Can I use Claude Code's Skills and MCP simultaneously?**

Yes. Install the skill and the MCP server independently — they do not conflict. Skills give Claude Code pre-built instructions; MCP gives it direct tool-call access.

**Does installing the skill cost credits?**

No. Installing the skill is free. Credits are consumed only when a generation runs.

**Can I restrict which models the skill uses?**

Not from within the skill configuration. To control models, be explicit in your prompt: *"Use Flux 2 Pro for this — do not use other image models."*

**How do I update the skill?**

Run the two install steps again:
```bash
claude plugin marketplace add PicsArt/gen-ai-skills
```
Then in Claude Code: `/plugin install picsart@picsart`

## Start creating

Click below to open Claude with a ready-to-run Picsart prompt. Claude will call Picsart MCP automatically once you confirm.

::: tip Ready to generate?
[Start creating in Claude](https://claude.ai/new?q=Use%20Picsart%20MCP%20to%20generate%20a%20photorealistic%20product%20shot%20on%20a%20white%20background%20with%20natural%20lighting%20using%20Flux%202%20Pro){ .btn-primary target="_blank" rel="noopener" }
:::
