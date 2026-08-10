---
description: Add Picsart MCP to Open WebUI so any model in your self-hosted instance can generate images, videos, and audio via Picsart tools.
---

# Open WebUI

[Open WebUI](https://openwebui.com) is a self-hosted web interface for local LLMs with over 90,000 GitHub stars. It works with Ollama, any OpenAI-compatible API, and LiteLLM. Version 0.4.0 added support for MCP tool servers via HTTP, allowing models in your instance to call external tools including Picsart.

## Prerequisites

- Open WebUI 0.4.0 or later ([upgrade guide](https://docs.openwebui.com))
- Admin access to your Open WebUI instance
- A model that supports tool/function calling (check your Ollama or OpenAI model's specifications)
- A Picsart API key, available from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings

## Setup

1. Log in to your Open WebUI instance as an admin.
2. Open the **Admin Panel** from the top-right menu.
3. Select **Tools** from the sidebar.
4. Click **Add Tool Server** (labeled "MCP Server" in some versions).
5. Fill in the following fields:
   - **Name:** `Picsart Gen AI`
   - **URL:** `https://mcp.picsart.io/mcp`
   - **Auth header:** `Authorization: Bearer YOUR_PICSART_API_KEY`
6. Click **Save**. Open WebUI fetches the tool manifest from the Picsart MCP server.
7. Go to **Workspace → Models**, select a model, and enable Picsart tools for it.
8. Open any chat with that model, enable tools, and send: `List Picsart image models.`

For the full Tools reference, see the [Open WebUI Tools documentation](https://docs.openwebui.com/features/plugin/tools/).

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

**"Add Tool Server" option not visible**

Upgrade Open WebUI to 0.4.0 or later. The MCP tool server feature is not available in earlier versions.

**Tools not available in chat**

Tool availability is configured per model. Go to **Workspace → Models**, open the model you are using, and confirm that Picsart tools are enabled. Also check that the chat's tool toggle is turned on for that session.

**Outbound connection fails on self-hosted**

Your Open WebUI server must be able to reach `mcp.picsart.io` on port 443. If it is behind a firewall or proxy, update the network rules or configure Open WebUI's proxy environment variables (`HTTP_PROXY`, `HTTPS_PROXY`) as appropriate for your deployment.

**Authentication error (401)**

Check the auth header value for extra whitespace. If the error persists, regenerate your API key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and update the tool server entry.

**Tool manifest fetch fails on save**

Confirm your Open WebUI server has internet access and is not blocking outbound HTTPS. Test by running `curl -I https://mcp.picsart.io/mcp` from the host machine.

## FAQ

**Does this work with Ollama models?**

Yes. Open WebUI routes tool calls through whichever model backend is active, whether Ollama, OpenAI, LiteLLM, or another provider. The only requirement is that the model you select supports tool/function calling.

**Can regular users (non-admins) add MCP servers?**

No. MCP server configuration is admin-only. An admin adds the Picsart server once and it becomes available to all users the admin grants access to.

**Is the API key stored securely?**

Open WebUI stores credentials in its database. For self-hosted deployments, security depends on your infrastructure. If your deployment supports it, inject the API key as an environment variable rather than entering it directly in the UI, to avoid storing it as plaintext in the database.

**Can I restrict which users can call Picsart tools?**

Yes. Open WebUI's model permissions let admins control which users or groups can access models with Picsart tools enabled. Configure this under **Workspace → Models** for each model.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
