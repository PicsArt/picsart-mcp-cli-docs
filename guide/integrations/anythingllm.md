---
description: "Connect AnythingLLM Desktop to the Picsart MCP server through the mcp-remote bridge, which handles Picsart sign-in for you. Generate images, video, and audio from AnythingLLM agents."
---

# AnythingLLM

AnythingLLM is an all-in-one desktop AI application with support for RAG, agents, and MCP servers ([anythingllm.com](https://anythingllm.com)). It is available as a desktop app and as a self-hosted Docker deployment. See the [AnythingLLM MCP documentation](https://docs.anythingllm.com/mcp-compatibility/overview).

The Picsart MCP server signs you in with your Picsart account (OAuth). AnythingLLM cannot run that sign-in for remote servers yet (the feature request is [anything-llm issue #6396](https://github.com/Mintplex-Labs/anything-llm/issues/6396)). AnythingLLM Desktop can run local MCP servers, though, so you connect through **`mcp-remote`**: a small open-source bridge that runs on your machine, handles the Picsart sign-in in your browser, and passes the tools through to AnythingLLM.

::: info Desktop only
This setup is for **AnythingLLM Desktop**. The Docker deployment has no browser to complete the sign-in, so it cannot connect to the Picsart MCP server today.
:::

## Prerequisites

- **AnythingLLM Desktop** ([download](https://anythingllm.com/desktop)).
- **Node.js** installed, so that `npx` is available on your `PATH`. Check with `npx --version` in a terminal.
- A **Picsart account** with credits for generations. You sign in with it in your browser the first time the bridge connects.

You do not need the gen-ai CLI, `gen-ai login`, or a Picsart API key.

## Setup

**1. Open the MCP configuration file**

AnythingLLM reads MCP servers from `plugins/anythingllm_mcp_servers.json` inside its storage folder:

| Platform | Storage folder |
|---|---|
| macOS | `~/Library/Application Support/anythingllm-desktop/storage` |
| Windows | `C:\Users\<you>\AppData\Roaming\anythingllm-desktop\storage` |
| Linux | `~/.config/anythingllm-desktop/storage` |

If the file does not exist yet, open the **Agent Skills** page in AnythingLLM once and it is created for you.

**2. Add the Picsart server through the bridge**

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.picsart.com/gen-ai/mcp"]
    }
  }
}
```

If the file already lists other servers, add the `picsart-gen-ai` entry inside the existing `mcpServers` object.

**3. Reload and sign in**

On the **Agent Skills** page, click **Refresh**. AnythingLLM starts the bridge, and the bridge opens a browser window with Picsart's sign-in page. Sign in and approve access. The bridge keeps the session in `~/.mcp-auth` on your machine and refreshes it automatically, so you only sign in again if the session is revoked.

**4. Verify the connection**

Click `picsart-gen-ai` on the **Agent Skills** page. Its status should show as running, with the Picsart tools listed. Then, in a workspace with agent mode enabled, ask:

> *"List the available Picsart video models."*

The agent should call `picsart_model_catalog` and return a list.

## Use it

In a workspace with agent mode enabled, ask:

- "Generate a product image for a new sneaker launch using Flux 2 Pro."
- "Create a 5-second promo video from this product image."
- "Generate a podcast-style voiceover for this script using ElevenLabs."

## Troubleshooting

**The server fails to start ("npx: command not found" or similar)**
Node.js is not installed or not on the `PATH` AnythingLLM sees. Install Node.js, confirm `npx --version` works in a terminal, then restart AnythingLLM and click **Refresh**.

**No browser window opened, or sign-in timed out**
The bridge waits a limited time for you to finish signing in. Click **Refresh** on the **Agent Skills** page to start it again. If you need more time, add `"--auth-timeout", "120"` after the server URL in `args`.

**"Unauthorized" after it was working, or you want to sign in as someone else**
Delete the saved session with `rm -rf ~/.mcp-auth` (on Windows, delete the `.mcp-auth` folder in your user folder), then click **Refresh** and sign in again.

**Generation fails with "insufficient credits"**
Ask the agent for your balance (it calls `picsart_credits`) and top up at [picsart.com](https://picsart.com).

**"Network error" when connecting**
Your machine needs outbound HTTPS access to `api.picsart.com` on port 443. On a corporate network, check proxy and firewall settings.

## FAQ

**What is `mcp-remote`, and is it made by Picsart?**
No. [`mcp-remote`](https://github.com/punkpeye/mcp-remote) is a widely used open-source bridge that lets apps which only run local MCP servers connect to remote ones with sign-in. `npx -y` downloads it on first use. Pin a version, for example `mcp-remote@0.14.3`, if you prefer not to pick up new releases automatically.

**Can I skip the bridge and use a Picsart API key in the `headers` field?**
No. The Picsart MCP server does not accept API keys. It uses OAuth sign-in with your Picsart account, which is what the bridge handles.

**Will I still need the bridge later?**
Once AnythingLLM supports OAuth for remote MCP servers ([issue #6396](https://github.com/Mintplex-Labs/anything-llm/issues/6396)), you can replace the bridge entry with a direct `"type": "streamable"` entry pointing at the server URL. This page will be updated when that ships.

**Does AnythingLLM work offline with Picsart MCP tools?**
No. Picsart MCP tools always require an internet connection to reach `api.picsart.com`. Offline use of local models is unaffected.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
