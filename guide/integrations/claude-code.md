---
description: "Connect Picsart to Claude Code: install the Skills plugin or add the hosted Picsart MCP server, then generate images, video, and audio in plain English."
---

# Claude Code

[Claude Code](https://code.claude.com/docs/en/mcp) supports two connection methods: **Skills** (the recommended path) and **MCP** (for direct tool-call access). They work differently: Skills drive the `gen-ai` CLI on your machine, while MCP connects Claude Code to the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp`. MCP needs nothing installed locally.

## Prerequisites

1. A Picsart account with credits for generations.
2. Claude Code installed and signed in.

That is all for MCP: the server is hosted by Picsart and you sign in from Claude Code. You do not need the gen-ai CLI or `gen-ai login`. Those are needed only for the [Skills method](#method-1-skills-recommended).

## Method 1: Skills (recommended)

::: info Skills need the gen-ai CLI
Skills run the `gen-ai` CLI on your machine. Before adding a skill, [install the CLI](/guide/installation) and run `gen-ai login` once. Check with `gen-ai --version` and `gen-ai credits`. The MCP method does not need this.
:::

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

Or just describe a task. Claude Code detects the relevant skill automatically:

- *"Generate a 16:9 hero image for a summer sale campaign using Flux 2 Pro."*
- *"Animate this product photo into a 5-second video with subtle motion."*
- *"Remove the background from all images in ./product-shots/ and save to Drive."*

Claude Code picks the model, constructs the command, runs it, and returns the result URL.

### What the skill can access

The `gen-ai-use` skill lets Claude Code use the models available in its installed CLI. The SDK catalog reference covers **223 models**. Browse them at [picsart.com/ai-playground](https://picsart.com/ai-playground/) or run:

```bash
gen-ai models
gen-ai models --mode video
gen-ai models --provider elevenlabs
```

## Method 2: MCP

For direct tool-call access, connect the hosted Picsart MCP server. This lets Claude Code call `picsart_generate`, `picsart_preflight`, `picsart_remove_bg`, and the other Picsart tools explicitly. See the Claude Code MCP documentation linked above for general MCP setup options.

### Add the MCP server

```bash
claude mcp add --transport http picsart-gen-ai https://api.picsart.com/gen-ai/mcp
```

If `picsart-gen-ai` already appears in `/mcp` (for example, because a plugin added it), skip this step and go straight to signing in.

### Sign in to Picsart

1. Inside Claude Code, run `/mcp`.
2. Select `picsart-gen-ai` and choose **Authenticate**.
3. A browser window opens on the Picsart sign-in page. Sign in with your Picsart account.
4. Return to Claude Code. `/mcp` shows the server as connected.

If the browser does not open, copy the URL Claude Code prints and open it yourself. You can also sign in from a terminal with `claude mcp login picsart-gen-ai`.

### Verify the connection

In Claude Code, ask:

> *"List the available Picsart video models."*

Claude Code should call `picsart_model_catalog` or `picsart_list_models` and return a list. If it does not, see [Troubleshooting](#troubleshooting) below.

### Use it

Once connected, Claude Code can call any Picsart MCP tool:

- *"Quote the cost of generating an 8-second Veo 3.1 video at 1080p."*
- *"Generate a product image with Recraft V4, white background, square format."*
- *"Upload this logo to my Picsart Drive and use it as the input for a background replacement."*

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog and example tool calls.

## Choosing between Skills and MCP

| | Skills | MCP |
|---|---|---|
| Setup | Plugin install plus the gen-ai CLI | One command plus a browser sign-in |
| Runs on | The `gen-ai` CLI on your machine | The hosted Picsart MCP server |
| What Claude Code knows | Pre-built Picsart instructions | Raw tool schema |
| Best for | Conversational generation tasks | Workflows that inspect cost, validate params, or chain tools |
| Prompt style | Plain English description | Can be explicit tool-call instructions |

You can use both at the same time. The skill and the MCP server do not conflict.

## Troubleshooting

**Claude Code does not recognize the skill.**

Run `claude plugin list` to confirm `picsart@picsart` appears. If not, reinstall:
```bash
claude plugin marketplace add PicsArt/gen-ai-skills
```
Then in Claude Code: `/plugin install picsart@picsart`

**The skill runs `gen-ai` but gets "command not found".**

This affects the Skills method only. The CLI is not on the PATH visible to Claude Code. Run `gen-ai --version` in a terminal to confirm it is installed, then restart Claude Code.

**The sign-in window did not open.**

Run `/mcp`, select `picsart-gen-ai`, and choose **Authenticate** again. If no browser opens, copy the sign-in URL Claude Code shows and open it manually.

**The MCP server is listed but no tools appear.**

Check `/mcp`. If the server shows as needing authentication, sign in as described above. If it shows as connected, restart Claude Code so it reloads the tool list.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Run `/mcp`, select `picsart-gen-ai`, and authenticate again.

**Generation fails with "insufficient credits".**

Ask Claude Code *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

Claude Code must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both.

## FAQ

**Can I use Claude Code's Skills and MCP simultaneously?**

Yes. Install the skill and add the MCP server independently. They do not conflict. Skills give Claude Code pre-built instructions; MCP gives it direct tool-call access.

**Do I need the gen-ai CLI for MCP?**

No. The MCP server is hosted by Picsart and you sign in from Claude Code. The CLI and `gen-ai login` are needed only for the Skills method.

**Does installing the skill cost credits?**

No. Installing the skill or adding the MCP server is free. Credits are consumed only when a generation runs.

**Can I restrict which models the skill uses?**

Not from within the skill configuration. To control models, be explicit in your prompt: *"Use Flux 2 Pro for this. Do not use other image models."*

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
