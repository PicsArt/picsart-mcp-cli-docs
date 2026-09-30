---
description: Connect Picsart's hosted MCP server to LobeHub (formerly LobeChat) as a custom MCP skill with OAuth sign-in for image generation, video creation, and AI media tools.
---

# LobeHub

LobeHub (formerly LobeChat) is an open-source AI chat interface with a built-in MCP marketplace ([lobehub.com](https://lobehub.com)). It is available as a cloud service and as a self-hosted deployment. Picsart connects as a remote Streamable HTTP server, and you sign in with your Picsart account. There is nothing to install.

## Prerequisites

- A LobeHub account (cloud) or a running self-hosted LobeHub instance, on a recent version whose custom MCP form offers **OAuth** as an auth type.
- A Picsart account. You sign in when you connect. Generations spend credits from that account.
- For self-hosted instances: outbound HTTPS access to `api.picsart.com` on port 443.

## Setup

1. Open LobeHub (cloud or your self-hosted URL).
2. Go to **Settings**, then **Skills**.
3. Click **Add** and choose **Add Custom MCP Skill**.
4. Enter the following:

| Field | Value |
|---|---|
| MCP type | Streamable HTTP |
| MCP name | `picsart-gen-ai` |
| Streamable HTTP Endpoint URL | `https://api.picsart.com/gen-ai/mcp` |
| Auth type | OAuth |
| OAuth Client ID / Client Secret | Leave empty |

Leaving the client fields empty lets LobeHub register itself with Picsart automatically (dynamic client registration).

5. Click **Authorize & Connect**. A Picsart sign-in window opens. Sign in and approve access.
6. Save. The tool list loads.
7. In chat, enable Picsart from the tool picker, then ask: "List the available Picsart video models."

If your LobeHub version shows only **No auth** and **API Key** as auth types, it cannot connect to the Picsart MCP server. The server uses OAuth sign-in and does not accept API keys. Update LobeHub to a version with the OAuth option.

For the full MCP plugin reference, see the [LobeHub MCP documentation](https://lobehub.com/docs/usage/features/mcp).

## Use it

In any LobeHub conversation with Picsart tools enabled:

- "Generate a 16:9 cinematic still of a futuristic city."
- "Create a 5-second video from this image with Kling V3."
- "What's my Picsart credit balance?"

## Troubleshooting

**Sign-in window does not open**
Allow pop-ups for your LobeHub address and click **Authorize & Connect** again.

**Tools not appearing after adding the server**
Reload the LobeHub page. If the list is still empty, open the skill's settings and run **Authorize & Connect** again.

**"Unauthorized" or tools stop working after a while**
The Picsart sign-in has expired. Open the Picsart skill in **Settings**, then **Skills**, and authorize again.

**"Insufficient credits"**
Ask "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

**Connection fails on a self-hosted instance**
Your LobeHub server must reach `api.picsart.com` on port 443. Check firewall and proxy rules for outbound HTTPS.

## FAQ

**Does this work on both LobeHub Cloud and self-hosted instances?**
Both support Streamable HTTP MCP servers. The OAuth option is available on recent versions. Self-hosted instances need outbound internet access to `api.picsart.com` on port 443.

**Is there a Picsart listing in the LobeHub marketplace?**
Use the custom MCP setup above. It connects to the same hosted server.

**Is LobeHub free?**
LobeHub is open-source and free to self-host. The cloud version is free with rate limits; paid tiers remove those limits.

**Can I use Picsart tools alongside other MCP servers in LobeHub?**
Yes. LobeHub supports multiple simultaneous MCP servers. Each server appears as a separate tool group, and you can use tools from different servers in the same conversation.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
