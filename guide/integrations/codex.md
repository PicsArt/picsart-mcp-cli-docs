---
description: "Connect Picsart to OpenAI Codex: add the hosted Picsart MCP server or install Skills to generate images, video, and audio inside Codex."
---

# Codex (OpenAI)

[Codex](https://developers.openai.com/codex/mcp) supports Picsart through two paths: **MCP** (the primary method for direct tool-call access) and **Skills** (for a conversational generation experience). MCP connects Codex to the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp`, with nothing to install locally. Skills drive the `gen-ai` CLI on your machine.

## Prerequisites

For both methods:

1. A Picsart account with credits for generations.
2. A recent version of the Codex CLI. Remote MCP servers and OAuth sign-in need a current release, so update Codex if `codex mcp login` is not available.

For the Skills method only:

3. Install the gen-ai CLI. See [Installation](/guide/installation).
4. Run `gen-ai login` (one-time browser OAuth).
5. Verify: `gen-ai --version` and `gen-ai credits`.

The MCP method does not use the CLI. You sign in to Picsart from Codex instead.

## Method 1: MCP (recommended)

### Configure

```bash
codex mcp add picsart-gen-ai --url https://api.picsart.com/gen-ai/mcp
```

Or add it manually to `~/.codex/config.toml`:

```toml
[mcp_servers.picsart-gen-ai]
url = "https://api.picsart.com/gen-ai/mcp"
```

No API key or bearer token is needed. Older Codex versions also required `experimental_use_rmcp_client = true` in `config.toml`. Update Codex instead of adding that flag.

### Sign in to Picsart

```bash
codex mcp login picsart-gen-ai
```

A browser window opens on the Picsart sign-in page. Sign in with your Picsart account, then return to the terminal. Run `/mcp` inside Codex to confirm `picsart-gen-ai` is connected and its tools are listed.

### Use it

Once connected, Codex can call any Picsart MCP tool:

- *"Generate a 16:9 hero image for a Q4 campaign using Flux 2 Pro."*
- *"Create a 9:16 social clip from this product image using Wan 2.7."*
- *"Quote the credit cost of an 8-second Veo 3.1 clip at 1080p."*

See `picsart_generate`, `picsart_preflight`, `picsart_remove_bg`, `picsart_credits`, and the full tool list in the [MCP Quickstart](/guide/mcp-quickstart).

## Method 2: Skills

Install the gen-ai CLI and run `gen-ai login` (see [Prerequisites](#prerequisites)), then add the skill via npx:

```bash
npx skills add PicsArt/gen-ai-skills
```

Or download the `.zip` from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and attach it to your Codex session.

## Troubleshooting

**The sign-in window did not open.**

Run `codex mcp login picsart-gen-ai` again. If the browser still does not open, copy the sign-in URL Codex prints and open it manually.

**The server is configured but tools do not appear.**

Run `/mcp` in Codex to check the server status. If it needs authentication, run `codex mcp login picsart-gen-ai`. Then restart Codex so it reloads the tool list. Check that `config.toml` uses `url`, not `command`.

**Generation fails with "unauthorized".**

Your Picsart session has expired or was revoked. Run `codex mcp logout picsart-gen-ai`, then `codex mcp login picsart-gen-ai`, and restart Codex.

**Generation fails with "insufficient credits".**

Ask Codex *"What's my Picsart credit balance?"* (it calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**The connection fails on a corporate network.**

Codex must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both.

## FAQ

**What is the difference between MCP and Skills in Codex?**

MCP gives Codex direct tool-call access to the full Picsart catalog through the hosted Picsart MCP server. It is precise and scriptable. Skills give the agent pre-built generation instructions and run the `gen-ai` CLI locally, so you can drive it in plain English. Both draw from the same Picsart credit balance.

**Do I need the gen-ai CLI for MCP?**

No. The CLI and `gen-ai login` are needed only for the Skills method.

**Does connecting Picsart to Codex cost extra?**

No. The MCP server and Skills are free to add. Generations consume Picsart credits.

## Start creating

Click below to open ChatGPT with a ready-to-run Picsart prompt. It works once the Picsart connector is added to ChatGPT. See [ChatGPT](/guide/integrations/chatgpt).

::: tip Ready to generate?
[Start creating in Codex](https://chatgpt.com/?q=Use%20Picsart%20MCP%20to%20generate%20a%20photorealistic%20product%20shot%20on%20a%20white%20background%20with%20natural%20lighting%20using%20Flux%202%20Pro){ .btn-primary target="_blank" rel="noopener" }
:::
