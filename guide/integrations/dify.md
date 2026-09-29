---
description: "Connect Picsart's hosted MCP server to Dify with OAuth sign-in to generate images, video, and audio in any Dify agent, chatflow, or workflow."
---

# Dify

Dify connects to Picsart through its native MCP tool support. Nothing is installed: you add the hosted Picsart MCP server URL in Dify's Tools settings and sign in with your Picsart account. Once authorized, the tools are available in any Dify app type: agent, chatflow, or workflow.

Official Dify MCP docs: [MCP tools](https://docs.dify.ai/en/cloud/use-dify/workspace/tools#mcp)

## Prerequisites

- A Dify account: [Dify Cloud](https://cloud.dify.ai) or a self-hosted Dify instance (v1.6.0 or later, which added MCP servers over HTTP).
- A Picsart account. You sign in when you add the server. Generations spend credits from that account.
- For self-hosted installs: outbound HTTPS access to `api.picsart.com` on port 443.

## Setup

1. Log in to [Dify Cloud](https://cloud.dify.ai) or your self-hosted Dify instance.
2. Open **Tools** (under **Integrations** in newer versions) and select **MCP**.
3. Click **Add MCP Server (HTTP)**.
4. Fill in the following fields:
   - **Server URL:** `https://api.picsart.com/gen-ai/mcp`
   - **Name & Icon:** `Picsart Gen AI`
   - **Server Identifier:** `picsart-gen-ai`
   - **Use Dynamic Client Registration:** leave on. Dify registers itself with Picsart, so no client ID, secret, or headers are needed.
5. Click **Add & Authorize**. A Picsart sign-in window opens. Sign in and approve access.
6. Dify imports the tool list. Enable the tools you want to use in your agent or workflow.

To verify the connection, open an agent app and ask: "List the available Picsart video models." The agent should call `picsart_model_catalog` or `picsart_list_models` and return the list.

## Use it

After enabling tools, use plain-language instructions in any Dify app.

- "Use Picsart to generate a product shot against a white studio background."
- "Animate this product image into a 5-second video."
- "Generate a voiceover for this text using ElevenLabs via Picsart."

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**Tools do not load after authorizing.**

Confirm the server URL is exactly `https://api.picsart.com/gen-ai/mcp`. Do not add `/sse` or any other suffix. Then open the server card and use **Update tools**.

**Sign-in window does not open or does not complete.**

Allow pop-ups for your Dify address, open the Picsart server card, and click **Authorize** again.

**"Unauthorized" or "Authorization is required."**

The Picsart sign-in has expired or was revoked. Open the Picsart server card under **Tools**, then **MCP**, and click **Authorize** to sign in again.

**"Insufficient credits."**

Ask "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

**"Failed to connect."**

For self-hosted Dify instances, verify that outbound HTTPS traffic to `api.picsart.com` on port 443 is allowed by your network or firewall configuration.

## FAQ

**Does this work in Dify Cloud?**

Yes. Dify Cloud and self-hosted Dify both support MCP servers over HTTP with OAuth sign-in.

**Can I use Picsart tools in a Dify chatflow and an agent at the same time?**

Yes. Once the MCP server is added under Tools, it is available across all Dify app types: chatflow, agent, and workflow. You enable or disable individual tools per app. Apps reference the server by its identifier, so keep `picsart-gen-ai` unchanged after you add it.

**Can I use a Picsart API key instead of signing in?**

No. The Picsart MCP server uses OAuth sign-in and does not accept API keys in a header. Use **Add & Authorize**.

**Does Dify support streaming responses from MCP tools?**

Generation tools return structured data: file URLs and metadata. Streaming is not relevant for this type of output. Results appear as a complete response once generation finishes.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
