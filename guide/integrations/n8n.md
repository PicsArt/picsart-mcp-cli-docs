---
description: "Connect Picsart to n8n via the MCP Client Tool node to generate images, video, and audio inside any AI Agent workflow."
---

# n8n

n8n connects to Picsart through its built-in MCP Client Tool sub-node. No CLI install is required. The node calls `https://mcp.picsart.io/mcp` directly over HTTPS and authenticates via a Header Auth credential.

Official n8n MCP docs: [MCP Client Tool node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/)

## Prerequisites

- An n8n instance: n8n Cloud or self-hosted running n8n 1.x or later.
- A Picsart API key. Find it at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings.
- A workflow that contains an AI Agent node.

## Setup

1. Open your n8n instance and create or open a workflow that contains an **AI Agent** node.
2. Inside the AI Agent node, click **Add sub-node** and search for **MCP Client Tool**.
3. Open the MCP Client Tool settings and configure the following fields:
   - **Transport:** Streamable HTTP
   - **URL:** `https://mcp.picsart.io/mcp`
4. Under the authentication section, add a **Header Auth** credential:
   - **Name:** `Authorization`
   - **Value:** `Bearer YOUR_PICSART_API_KEY`
5. Save the credential and return to the node settings.
6. Save the workflow and click **Activate**.
7. Test the connection by sending a message to the agent: "List available Picsart image models."

The agent should respond with a list of models returned by the Picsart MCP server. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Send natural-language instructions to the AI Agent node. The agent selects the appropriate Picsart tool, calls the MCP server, and returns the result.

- "Generate a product image with Flux 2 Pro and return the file URL."
- "Create a 5-second video from this product image using Kling V3."
- "Remove the background from this image URL."

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

### Example: generate product images on new Shopify products

Connect a **Shopify Trigger** node to the AI Agent (with Picsart MCP attached), then pass the generated image URL to a downstream node such as Shopify's product update node or an Airtable write node.

## Troubleshooting

**"MCP server not responding."**

Confirm the URL is exactly `https://mcp.picsart.io/mcp`. Do not append `/v1`, `/sse`, or any other path segment.

**"Unauthorized."**

Open the Header Auth credential and verify the value is `Bearer YOUR_PICSART_API_KEY` with no extra spaces. Copy the API key fresh from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

**Tools do not appear in the agent.**

Disable the MCP Client Tool sub-node, save the workflow, re-enable the sub-node, and save again. n8n refreshes the tool list on save.

## FAQ

**Can I use this in n8n Cloud?**

Yes. The MCP Client Tool node is available in n8n Cloud and in self-hosted instances running n8n 1.x or later.

**Do I need the AI Agent node specifically?**

Yes. The MCP Client Tool is a sub-node designed to attach to AI Agent nodes. It cannot be used in a standard workflow without an AI Agent.

**Can I trigger generation automatically, for example when a new Shopify product is created?**

Yes. Connect a Shopify trigger to an AI Agent (with Picsart MCP) and pass the generated image URL to your downstream node. The workflow runs end-to-end without manual intervention.
