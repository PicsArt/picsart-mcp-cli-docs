---
description: Connect Picsart's MCP server to Gemini CLI for AI-powered image generation, video creation, and more directly from your terminal.
---

# Gemini CLI

Gemini CLI is Google's open-source AI assistant for the terminal ([github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)). It supports MCP servers via a URL transport, which means you can connect Picsart tools without installing any additional local processes.

## Prerequisites

- Gemini CLI 0.1.8 or later installed. Run `gemini --version` to check.
- Node.js 18 or later (required if you install via npm).
- A Google account for Gemini CLI authentication.
- A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.

## Setup

**1. Install Gemini CLI**

```bash
npm install -g @google/gemini-cli
```

Alternatively, download a prebuilt binary from the [GitHub releases page](https://github.com/google-gemini/gemini-cli/releases).

**2. Authenticate with Google**

Run `gemini` and complete the Google sign-in flow.

**3. Open the settings file**

| Platform | Path |
|---|---|
| macOS / Linux | `~/.gemini/settings.json` |
| Windows | `%APPDATA%\gemini\settings.json` |

Create the file if it does not exist.

**4. Add the Picsart MCP server**

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "url": "https://mcp.picsart.io/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_PICSART_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_PICSART_API_KEY` with your key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

**5. Start Gemini CLI**

```bash
gemini
```

**6. Verify the connection**

In the Gemini CLI prompt, type:

```
What Picsart tools are available?
```

The CLI should respond with a list of connected Picsart tools.

For the complete MCP server configuration reference, see the [Gemini CLI MCP documentation](https://github.com/google-gemini/gemini-cli/blob/main/docs/mcp-servers.md).

## Use it

Once connected, prompt Gemini CLI naturally. Some examples:

- `Generate a cinematic 8-second video of a sunset over the ocean using Veo 3.1`
- `Remove the background from https://example.com/product.jpg and return the result URL`
- `Check my Picsart credit balance`

## Troubleshooting

**"mcpServers not recognized"**
Confirm you are on Gemini CLI 0.1.8 or later. Earlier versions did not support MCP. Run `gemini --version` to check.

**"Connection timeout"**
Gemini CLI fetches the tool manifest at startup. A slow response is usually a transient network issue. Close the CLI and reopen it.

**Tools not appearing**
Confirm the JSON in `settings.json` is valid. Trailing commas will silently break parsing. Validate with:

```bash
cat ~/.gemini/settings.json | python3 -m json.tool
```

If the command reports an error, fix the indicated line.

## FAQ

**Does Gemini CLI use my Google account to authenticate with Picsart?**
No. Gemini CLI uses your Google account to access Gemini models. Picsart uses your Picsart API key. They are separate credentials stored and used independently.

**Can I use Gemini CLI with other MCP servers at the same time?**
Yes. Add multiple entries under `mcpServers`. All tools from all servers are available in the same session.

**Is a Google One AI Premium subscription required to use MCP tools?**
No. MCP tool support is available on the free tier. A Google One AI Premium subscription increases your Gemini rate limits but is not required to use Picsart tools.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
