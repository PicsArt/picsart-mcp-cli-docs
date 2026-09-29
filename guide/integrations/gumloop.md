---
description: "Connect Picsart's hosted MCP server to Gumloop as a custom MCP connector with OAuth sign-in to generate images, video, and audio in Gumloop agents."
---

# Gumloop

Gumloop connects to Picsart through a custom MCP connector. No code is required and nothing is installed. You paste the hosted server URL in Settings, sign in with your Picsart account, and add the connector to any Gumloop agent.

Official Gumloop MCP docs: [Custom MCP Servers](https://docs.gumloop.com/nodes/mcp/custom_mcp_servers)

## Prerequisites

- A Gumloop account at [gumloop.com](https://www.gumloop.com).
- A Picsart account. You sign in when you add the connector. Generations spend credits from that account.

## Setup

1. Log in to [Gumloop](https://www.gumloop.com).
2. Go to **Settings > Connectors**, click the arrow next to **Add Connector**, and choose **Add MCP Connector**.
3. Fill in the following fields:
   - **Connection type:** Public URL
   - **Server URL:** `https://api.picsart.com/gen-ai/mcp`
4. Click **Connect**. Gumloop probes the server and shows OAuth as the detected auth method.
5. Click **Authenticate**. A Picsart sign-in window opens. Sign in and approve access.
6. Open your agent, go to its **Connectors** section, click **Add Connector**, and select the Picsart connector.
7. Ask the agent: "List the available Picsart video models."

Do not use the token, API key, or custom header options in the **Authentication** dropdown. The Picsart MCP server uses OAuth sign-in and does not accept API keys.

## Use it

Give the agent a task in plain language. It picks the right Picsart tool and returns the result, which you can pass along to other steps.

**E-commerce:** When a new Shopify product arrives, have the agent generate a product image and save the URL to Airtable.

**Marketing:** Pull a campaign brief from Google Sheets, generate a hero image, and post it to Slack.

**Content:** Input article text, generate a matching illustration, and upload it to WordPress.

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

### Gumloop Creator Program

Gumloop offers a 20% revenue share for creators who publish public workflow templates. Building a Picsart workflow template and publishing it to the Gumloop template library qualifies for this program. See [gumloop.com/creator-program](https://www.gumloop.com/creator-program).

## Troubleshooting

**URL not recognized.**

Gumloop requires HTTPS. Confirm the URL is `https://api.picsart.com/gen-ai/mcp` exactly, including the protocol, and that **Connection type** is Public URL.

**Sign-in window does not open or does not complete.**

Allow pop-ups for gumloop.com and click **Authenticate** again.

**Tools do not appear in the agent.**

Confirm the Picsart connector is added under the agent's **Connectors** section. If it is, delete the connector in **Settings > Connectors**, add it again, and sign in.

**"Unauthorized" during an agent run.**

The Picsart sign-in has expired or was revoked. Open **Settings > Connectors**, select the Picsart connector, and authenticate again.

**"Insufficient credits."**

Ask the agent "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

## FAQ

**Do I need to write any code in Gumloop?**

No. The entire setup is done through Gumloop's visual interface. No code, no CLI, no config files.

**Can I share the connector with my team?**

Gumloop stores connector credentials at the personal or team level. Choose the scope when you set it up. A team-level connector spends credits from the Picsart account that signed in.

**Can I call multiple Picsart tools in one task?**

Yes. The agent can chain tools across turns. For example, it can generate an image and then create a video from that image.

**Is there a per-call cost?**

Gumloop charges according to its pricing plan. Picsart charges credits per generation. These are separate and billed independently.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
