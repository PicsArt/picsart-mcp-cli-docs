---
description: "Connect Picsart to n8n through the MCP Client Tool node with an MCP OAuth2 credential to generate images, video, and audio inside any AI Agent workflow."
---

# n8n

n8n connects to Picsart through its built-in MCP Client Tool sub-node. Nothing is installed: the node calls the hosted Picsart MCP server at `https://api.picsart.com/gen-ai/mcp` over Streamable HTTP and signs in with your Picsart account through an MCP OAuth2 credential.

Official n8n MCP docs: [MCP Client Tool node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolmcp/)

## Prerequisites

- An n8n instance: n8n Cloud or self-hosted, on a version whose MCP Client Tool node lists **MCP OAuth2** under **Authentication**.
- A Picsart account. You sign in once when you create the credential. Every workflow run that uses it spends credits from that account.
- A workflow that contains an AI Agent node.
- For self-hosted n8n: outbound HTTPS access to `api.picsart.com` on port 443.

## Setup

1. Open your n8n instance and create or open a workflow that contains an **AI Agent** node.
2. On the AI Agent node, add a tool and search for **MCP Client Tool**.
3. Configure the node:
   - **Endpoint:** `https://api.picsart.com/gen-ai/mcp`
   - **Server Transport:** HTTP Streamable
   - **Authentication:** MCP OAuth2
4. Under **Credential**, create a new **MCP OAuth2 API** credential:
   - Leave **Use Dynamic Client Registration** turned on. n8n registers itself with Picsart, so you don't need a client ID or secret.
   - **Resource URL:** leave empty, or enter `https://api.picsart.com/gen-ai/mcp`.
5. Click **Connect my account**. A Picsart sign-in window opens. Sign in and approve access, then save the credential.
6. Save the workflow.
7. Test the connection by opening the chat and sending: "List the available Picsart video models."

The agent should respond with a list of models from `picsart_model_catalog` or `picsart_list_models`. If it does not, see [Troubleshooting](#troubleshooting).

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

Confirm the endpoint is exactly `https://api.picsart.com/gen-ai/mcp` and **Server Transport** is HTTP Streamable. Do not append `/sse` or any other path segment.

**Sign-in window does not complete.**

Allow pop-ups for your n8n address and click **Connect my account** again. If you see a redirect URI error, check that your n8n instance URL matches the OAuth Redirect URL shown in the credential.

**"Unauthorized."**

The Picsart sign-in has expired or was revoked. Open the MCP OAuth2 API credential and reconnect your account. If sign-in succeeds but calls still fail with "unauthorized", set **Resource URL** to `https://api.picsart.com/gen-ai/mcp` and reconnect.

**Tools do not appear in the agent.**

Disable the MCP Client Tool sub-node, save the workflow, re-enable the sub-node, and save again. n8n refreshes the tool list on save.

**"Insufficient credits."**

Ask the agent "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

**Connection fails on self-hosted n8n.**

Your n8n server must reach `api.picsart.com` on port 443. Check firewall and proxy rules for outbound HTTPS.

## FAQ

**Can I use this in n8n Cloud?**

Yes. The MCP Client Tool node and the MCP OAuth2 credential are available in n8n Cloud and in self-hosted instances.

**Do I need the AI Agent node specifically?**

Yes. The MCP Client Tool is a sub-node designed to attach to AI Agent nodes. It cannot be used in a standard workflow without an AI Agent.

**Can I use a Picsart API key instead of signing in?**

No. The Picsart MCP server uses OAuth sign-in and does not accept API keys in a header. Use the MCP OAuth2 credential.

**Can I trigger generation automatically, for example when a new Shopify product is created?**

Yes. Connect a Shopify trigger to an AI Agent (with Picsart MCP) and pass the generated image URL to your downstream node. The workflow runs end-to-end without manual intervention, using the Picsart account saved in the credential.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
