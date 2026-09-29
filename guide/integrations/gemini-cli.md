---
description: Connect the hosted Picsart MCP server to Gemini CLI for AI image generation, video creation, and more directly from your terminal.
---

# Gemini CLI

Gemini CLI is Google's open-source AI assistant for the terminal ([github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)). It supports remote MCP servers over HTTP with OAuth sign-in, so you can connect the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp` without installing any local processes.

## Prerequisites

- A Picsart account with credits for generations. You sign in to it from Gemini CLI.
- A recent version of Gemini CLI. OAuth sign-in for MCP servers needs a current release. Run `gemini --version` to check and update if needed.
- Node.js 20 or later (required if you install via npm).
- A Google account for Gemini CLI authentication.

You do not need a Picsart API key, the gen-ai CLI, or `gen-ai login`.

## Setup

**1. Install or update Gemini CLI**

```bash
npm install -g @google/gemini-cli@latest
```

Alternatively, download a prebuilt binary from the [GitHub releases page](https://github.com/google-gemini/gemini-cli/releases).

**2. Authenticate with Google**

Run `gemini` and complete the Google sign-in flow.

**3. Add the Picsart MCP server**

Run:

```bash
gemini mcp add --transport http picsart-gen-ai https://api.picsart.com/gen-ai/mcp
```

Or edit the settings file yourself. Use `~/.gemini/settings.json` for all projects (`%USERPROFILE%\.gemini\settings.json` on Windows), or `.gemini/settings.json` in a project folder for one project. Create the file if it does not exist, then add:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "httpUrl": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Use `httpUrl`, which selects the Streamable HTTP transport. No API key or headers are needed.

**4. Start Gemini CLI**

```bash
gemini
```

**5. Sign in to Picsart**

On first connection, the Picsart server asks for sign-in and Gemini CLI detects it automatically. To start sign-in yourself, run this inside Gemini CLI:

```
/mcp auth picsart-gen-ai
```

A browser window opens on the Picsart sign-in page. Sign in with your Picsart account, then return to the terminal. Gemini CLI stores the token in `~/.gemini/mcp-oauth-tokens.json` and refreshes it when it expires.

**6. Verify the connection**

In the Gemini CLI prompt, type:

```
List the available Picsart video models.
```

Gemini CLI should call `picsart_model_catalog` or `picsart_list_models` and return a list. Run `/mcp` to see the server status and its tools.

For the complete MCP server configuration reference, see the [Gemini CLI MCP documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md).

## Use it

Once connected, prompt Gemini CLI naturally. Some examples:

- `Generate a cinematic 8-second video of a sunset over the ocean using Veo 3.1`
- `Remove the background from https://example.com/product.jpg and return the result URL`
- `Check my Picsart credit balance`

## Troubleshooting

**"mcpServers not recognized"**
Your Gemini CLI version is too old. Update with `npm install -g @google/gemini-cli@latest` and run `gemini --version` to confirm.

**The sign-in window did not open**
Run `/mcp auth picsart-gen-ai` inside Gemini CLI. Sign-in needs a browser on the same machine, because Picsart redirects back to a local address that Gemini CLI listens on. It does not work in headless setups such as a plain SSH session or a container without a browser. Run Gemini CLI on a machine with a browser.

**Tools not appearing**
Run `/mcp` to check the server status. If it needs authentication, run `/mcp auth picsart-gen-ai`. Confirm the JSON in `settings.json` is valid and uses `httpUrl`. Trailing commas will silently break parsing. Validate with:

```bash
cat ~/.gemini/settings.json | python3 -m json.tool
```

If the command reports an error, fix the indicated line, then restart Gemini CLI.

**Generation fails with "unauthorized"**
Your Picsart session has expired or was revoked. Run `/mcp auth picsart-gen-ai` to sign in again.

**Generation fails with "insufficient credits"**
Ask *"What's my Picsart credit balance?"* (Gemini CLI calls `picsart_credits`). Top up at [picsart.com](https://picsart.com).

**"Connection timeout"**
A slow response is usually a transient network issue. Close the CLI and reopen it. On a corporate network, Gemini CLI must reach `https://api.picsart.com` over HTTPS, and your browser must reach the Picsart sign-in page. Ask your network admin to allow both.

## FAQ

**Does Gemini CLI use my Google account to authenticate with Picsart?**
No. Gemini CLI uses your Google account to access Gemini models. Picsart uses your Picsart account, which you sign in to through the browser window Gemini CLI opens. They are separate sign-ins.

**Can I use Gemini CLI with other MCP servers at the same time?**
Yes. Add multiple entries under `mcpServers`. All tools from all servers are available in the same session.

**Is a Google One AI Premium subscription required to use MCP tools?**
No. MCP support is part of Gemini CLI itself. A paid Google plan changes your Gemini rate limits but is not required to use Picsart tools. Picsart generations use Picsart credits.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
