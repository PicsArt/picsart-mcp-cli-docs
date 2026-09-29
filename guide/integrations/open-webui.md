---
description: Add Picsart's hosted MCP server to Open WebUI with OAuth 2.1 sign-in so any tool-capable model in your instance can generate images, videos, and audio.
---

# Open WebUI

[Open WebUI](https://openwebui.com) is a self-hosted web interface for local LLMs with over 90,000 GitHub stars. It works with Ollama, any OpenAI-compatible API, and LiteLLM. Version 0.6.31 added native support for MCP servers over Streamable HTTP, including OAuth 2.1 sign-in. The Picsart MCP server is hosted by Picsart, so there is nothing to install.

## Prerequisites

- Open WebUI 0.6.31 or later ([upgrade guide](https://docs.openwebui.com))
- Admin access to your Open WebUI instance
- The `WEBUI_SECRET_KEY` environment variable set in your deployment. Without it, OAuth sign-ins break every time the container restarts.
- A model that supports tool/function calling (check your Ollama or OpenAI model's specifications)
- A Picsart account for each user who will generate. Users sign in when they first enable the tools.
- Outbound HTTPS access from your Open WebUI host to `api.picsart.com` on port 443

## Setup

1. Log in to your Open WebUI instance as an admin.
2. Open **Settings > Admin > Integrations**.
3. Under **External Tool Servers**, click **+ Add Connection**.
4. Fill in the following fields:
   - **Type:** `MCP (Streamable HTTP)` (not OpenAPI)
   - **URL:** `https://api.picsart.com/gen-ai/mcp`
   - **Auth:** `OAuth 2.1`
   - **Name:** `Picsart Gen AI`
5. Click **Register Client**. Open WebUI registers itself with Picsart automatically. Optionally click **Check OAuth Discovery** to confirm Picsart's sign-in server was found.
6. Click **Save**.
7. Open a chat with a tool-capable model and click **+ > Integrations > Tools**. Enable Picsart Gen AI.
8. Open WebUI sends you to Picsart's sign-in page. Sign in and approve access. Each user does this once with their own Picsart account.
9. Send: `List the available Picsart video models.`

Do not set Picsart tools as default (pre-enabled) tools on a model. OAuth sign-in needs an interactive browser step, so each user enables the tools from the chat instead.

For the full MCP reference, see the [Open WebUI MCP documentation](https://docs.openwebui.com/features/extensibility/mcp/).

## Use it

With a tool-capable model and Picsart tools enabled, send prompts such as:

```
Generate a product image of a coffee cup on a marble surface using Nano Banana.
```

```
Animate this image into a 5-second video using Seedance 2.0.
```

```
What models does Picsart have for text-to-speech?
```

The model invokes the appropriate Picsart tool and returns the result, including a URL to the generated file, inline in the chat.

## Troubleshooting

**"External Tool Servers" has no MCP type**

Upgrade Open WebUI to 0.6.31 or later. Native MCP support is not available in earlier versions.

**Tools not available in chat**

Enable Picsart from **+ > Integrations > Tools** in the chat, and complete the sign-in if prompted. Also confirm the model you selected supports tool calling.

**Sign-in does not complete**

Finish the sign-in in the same browser, signed in to Open WebUI as the same user, at the address set in `WEBUI_URL`. If the flow is interrupted, enable the tool again to retry.

**"Unauthorized" or "Error decrypting tokens"**

Your Picsart sign-in has expired or can no longer be read. Enable the tool again from the chat to sign in again. If this happens after every restart, set a fixed `WEBUI_SECRET_KEY`.

**"Insufficient credits"**

Ask "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

**Outbound connection fails on self-hosted**

Your Open WebUI server must be able to reach `api.picsart.com` on port 443. If it is behind a firewall or proxy, update the network rules or configure Open WebUI's proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`) as appropriate for your deployment.

## FAQ

**Does this work with Ollama models?**

Yes. Open WebUI routes tool calls through whichever model backend is active, whether Ollama, OpenAI, LiteLLM, or another provider. The only requirement is that the model you select supports tool/function calling.

**Can regular users (non-admins) add MCP servers?**

No. MCP server configuration is admin-only. An admin adds the Picsart server once, and each user who has access signs in with their own Picsart account.

**Whose credits are used, and where are sign-ins stored?**

Each user's own. Sign-in is per user, so generations spend credits from the account that signed in, and nobody else inherits that access. Open WebUI stores the sign-in in its database, encrypted with `WEBUI_SECRET_KEY`.

**Can I restrict which users can call Picsart tools?**

Yes. Use **Access Control** on the Picsart connection under **Settings > Admin > Integrations** to limit it to specific users or groups.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
