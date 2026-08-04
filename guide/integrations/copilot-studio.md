---
description: "Connect Picsart to Microsoft Copilot Studio via MCP — generate images, video, and audio inside enterprise AI agents built on Microsoft 365."
---

# Microsoft Copilot Studio

Microsoft Copilot Studio is an enterprise no-code platform for building custom AI agents on the Microsoft 365 ecosystem. It supports MCP servers as Actions, letting you expose Picsart image, video, and audio tools directly inside any Copilot Studio agent.

Official MCP documentation: https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp

## Prerequisites

- Microsoft 365 license with Copilot Studio access (Power Platform).
- Picsart API key from [picsart.com/ai-playground](https://picsart.com/ai-playground/).

## Setup

1. Log in to [Copilot Studio](https://copilotstudio.microsoft.com) with your Microsoft 365 account.
2. Open an existing agent or create a new one.
3. Go to the **Actions** tab.
4. Click **Add an action** and select **Model Context Protocol (MCP)**.
5. Fill in the connection fields:
   - **Server URL:** `https://mcp.picsart.io/mcp`
   - **Authentication:** API Key
   - **Header name:** `Authorization`
   - **Header value:** `Bearer YOUR_PICSART_API_KEY`
6. Click **Test connection**. Copilot Studio fetches the tool manifest and lists the available Picsart actions.
7. Select which Picsart tools to expose in this agent and click **Save**.
8. Publish the agent.

## Use it

Once the agent is published, users can prompt it with natural language:

- "Generate a product image for the new campaign and return the URL."
- "Create a promotional video from this product photo."
- "Remove the background from this image."

## Troubleshooting

**Test connection failed.**

Verify that the Server URL is exactly `https://mcp.picsart.io/mcp` and that the API key is valid. Copilot Studio requires HTTPS with a valid TLS certificate; `mcp.picsart.io` satisfies both requirements.

**Tools not appearing after a successful connection.**

Some Microsoft 365 tenant policies restrict outbound connections to unlisted URLs. Ask your IT admin to allowlist `mcp.picsart.io`.

**"Action not available" error.**

MCP actions require Copilot Studio's paid plan. The free trial also supports MCP. The error typically means the tenant has not yet been provisioned for MCP Actions; contact Microsoft support or check the Power Platform admin center.

## FAQ

**Can Copilot Studio agents use Picsart tools in Teams or SharePoint?**

Yes. Once an agent with Picsart tools is published in Copilot Studio, it can be deployed to Teams, SharePoint, and other Microsoft 365 surfaces.

**Is MCP support available in Copilot Studio government cloud (GCC)?**

MCP support in GCC depends on Microsoft's GCC feature roadmap. Check [learn.microsoft.com](https://learn.microsoft.com) for current GCC feature availability.

**Can multiple agents in the same tenant use the same Picsart MCP server?**

Yes. Each agent configures its own connection, but all agents in a tenant can point to the same `mcp.picsart.io/mcp` URL.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
