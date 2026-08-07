---
description: "Connect Picsart to Dify via MCP tool configuration to generate images, video, and audio in any Dify agent, chatflow, or workflow."
---

# Dify

Dify connects to Picsart through its native MCP tool support. No CLI install is required. You add the Picsart MCP server URL in Dify's Tools settings and authenticate with a Bearer token. Once saved, the tools are available in any Dify app type: agent, chatflow, or workflow.

Official Dify MCP docs: [MCP tool configuration](https://docs.dify.ai/guides/tools/tool-configuration/mcp-tool)

## Prerequisites

- A Dify account: [Dify Cloud](https://cloud.dify.ai) or a self-hosted Dify instance.
- A Picsart API key. Find it at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings.
- For self-hosted installs: outbound HTTPS access to `mcp.picsart.io` on port 443.

## Setup

1. Log in to [Dify Cloud](https://cloud.dify.ai) or your self-hosted Dify instance.
2. Click **Tools** in the top navigation bar and select **MCP Tools**.
3. Click **Add MCP Server**.
4. Fill in the following fields:
   - **Name:** `Picsart Gen AI`
   - **Server URL:** `https://mcp.picsart.io/mcp`
   - **Auth type:** Bearer Token
   - **Token:** your Picsart API key
5. Click **Save**. Dify fetches the tool manifest and lists all available Picsart tools.
6. Enable the tools you want to use in your agent or workflow.

To verify the connection, open an agent app and ask: "What Picsart tools are available?" The agent should return the tool list.

## Use it

After enabling tools, use plain-language instructions in any Dify app.

- "Use Picsart to generate a product shot against a white studio background."
- "Animate this product image into a 5-second video."
- "Generate a voiceover for this text using ElevenLabs via Picsart."

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**Tools do not load after clicking Save.**

Confirm the server URL ends in `/mcp`. Do not use `/sse`, `/v1`, or any other suffix.

**"Failed to connect."**

For self-hosted Dify instances, verify that outbound HTTPS traffic to `mcp.picsart.io` on port 443 is allowed by your network or firewall configuration.

**Bearer token rejected.**

Copy the API key fresh from [picsart.com/ai-playground/](https://picsart.com/ai-playground/). Keys copied from some interfaces include trailing whitespace, which causes auth failures.

## FAQ

**Does this work in Dify Cloud?**

Yes. Dify Cloud supports MCP tools on all plans.

**Can I use Picsart tools in a Dify chatflow and an agent at the same time?**

Yes. Once the MCP server is added under Tools, it is available across all Dify app types: chatflow, agent, and workflow. You enable or disable individual tools per app.

**Does Dify support streaming responses from MCP tools?**

Generation tools return structured data: file URLs and metadata. Streaming is not relevant for this type of output. Results appear as a complete response once generation finishes.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
