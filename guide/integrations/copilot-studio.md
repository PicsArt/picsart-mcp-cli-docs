---
description: "Connect Picsart's hosted MCP server to Microsoft Copilot Studio with OAuth 2.0 sign-in to generate images, video, and audio inside enterprise AI agents on Microsoft 365."
---

# Microsoft Copilot Studio

Microsoft Copilot Studio is an enterprise no-code platform for building custom AI agents on the Microsoft 365 ecosystem. It connects to MCP servers as tools, letting you expose Picsart image, video, and audio tools directly inside any Copilot Studio agent. The Picsart MCP server is hosted by Picsart and uses the Streamable transport, which Copilot Studio supports. There is nothing to install.

Official MCP documentation: https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent

## Prerequisites

- A Copilot Studio license (trial or paid) with Power Platform access.
- A Picsart account. You sign in when you create the connection. Generations spend credits from the signed-in account.

## Setup

1. Log in to [Copilot Studio](https://copilotstudio.microsoft.com) with your Microsoft 365 account.
2. Open an existing agent or create a new one.
3. Go to the **Tools** page for the agent.
4. Select **Add a tool**, then **New tool**, then **Model Context Protocol**. The MCP onboarding wizard opens.
5. Fill in the fields:
   - **Server name:** `Picsart Gen AI`
   - **Server description:** `Generates and edits images, video, and audio with Picsart models.`
   - **Server URL:** `https://api.picsart.com/gen-ai/mcp`
   - **Authentication:** OAuth 2.0
   - **Type:** Dynamic discovery
6. Select **Create**, then **Next**. Copilot Studio discovers Picsart's sign-in settings and registers itself automatically.
7. On **Add tool**, select **Create a new connection** and sign in with your Picsart account in the window that opens.
8. Select **Add to agent**.
9. Test the agent: "List the available Picsart video models." Then publish the agent.

Don't choose **API key** as the authentication type. The Picsart MCP server uses OAuth sign-in and does not accept API keys.

## Use it

Once the agent is published, users can prompt it with natural language:

- "Generate a product image for the new campaign and return the URL."
- "Create a promotional video from this product photo."
- "Remove the background from this image."

## Troubleshooting

**Sign-in does not complete.**

Allow pop-ups for Copilot Studio, then select **Create a new connection** again. Confirm the Server URL is exactly `https://api.picsart.com/gen-ai/mcp` and the OAuth 2.0 type is **Dynamic discovery**.

**Tools not appearing after a successful connection.**

Access to MCP servers in Copilot Studio goes through Power Platform connectors, so a data policy in your tenant can block it. Ask your Power Platform admin to review the data policies in the Power Platform admin center.

**"Unauthorized" or the agent asks you to sign in again.**

The Picsart sign-in has expired or was revoked. Sign in again when the agent shows the sign-in prompt, or open the agent's **Tools** page and reconnect the Picsart connection.

**"Insufficient credits."**

Ask the agent "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

## FAQ

**Can Copilot Studio agents use Picsart tools in Teams or SharePoint?**

Yes. Once an agent with Picsart tools is published in Copilot Studio, it can be deployed to Teams, SharePoint, and other Microsoft 365 surfaces.

**Is MCP support available in Copilot Studio government cloud (GCC)?**

MCP support in GCC depends on Microsoft's GCC feature roadmap. Check [learn.microsoft.com](https://learn.microsoft.com) for current GCC feature availability.

**Can multiple agents in the same tenant use the same Picsart MCP server?**

Yes. Each agent configures its own connection, but all agents in a tenant can point to the same `https://api.picsart.com/gen-ai/mcp` URL.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
