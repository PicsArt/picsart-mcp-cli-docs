---
description: "Connect Picsart to Gumloop via MCP credentials to generate images, video, and audio inside no-code automation workflows."
---

# Gumloop

Gumloop connects to Picsart through its MCP Server credentials setting. No code is required. You paste the server URL and auth header in Settings, and Gumloop fetches the tool list automatically. Tools then appear in the node picker for any AI Agent node in your workflows.

Official Gumloop MCP docs: [Gumloop MCP documentation](https://www.gumloop.com/blog/mcp)

## Prerequisites

- A Gumloop account at [gumloop.com](https://www.gumloop.com).
- A Picsart API key. Find it at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings.

## Setup

1. Log in to [Gumloop](https://www.gumloop.com).
2. Open **Settings** from the top-right menu.
3. Go to **Credentials**.
4. Find the **MCP Server** section and click **Add Server**.
5. Fill in the following fields:
   - **Name:** `Picsart Gen AI`
   - **URL:** `https://mcp.picsart.io/mcp`
   - **Auth header:** `Authorization: Bearer YOUR_PICSART_API_KEY`
6. Click **Save**. Gumloop fetches the tool list automatically.
7. Open any workflow, add an **AI Agent** node, and select Picsart tools from the tool picker.

## Use it

Use the AI Agent node in a Gumloop workflow and instruct it in plain language. Gumloop calls the selected Picsart tool and passes the result to the next node.

**E-commerce:** Trigger on a new Shopify product, generate a product image with the AI Agent, and save the URL to Airtable.

**Marketing:** Pull a campaign brief from Google Sheets, generate a hero image, and post it to Slack.

**Content:** Input article text, generate a matching illustration, and upload it to WordPress.

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

### Gumloop Creator Program

Gumloop offers a 20% revenue share for creators who publish public workflow templates. Building a Picsart workflow template and publishing it to the Gumloop template library qualifies for this program. See [gumloop.com/creator-program](https://www.gumloop.com/creator-program).

## Troubleshooting

**URL not recognized.**

Gumloop requires HTTPS. Confirm the URL is `https://mcp.picsart.io/mcp` exactly, including the protocol.

**Tools do not appear in the node picker.**

Go back to Settings, delete the MCP Server entry, and re-add it. Gumloop refreshes the tool list each time an entry is saved.

**Auth error during a workflow run.**

Confirm the API key is valid by testing it directly:

```bash
curl -H "Authorization: Bearer YOUR_KEY" https://mcp.picsart.io/mcp
```

If the request fails, generate a new API key at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and update the credential in Gumloop.

## FAQ

**Do I need to write any code in Gumloop?**

No. The entire setup is done through Gumloop's visual interface. No code, no CLI, no config files.

**Can I call multiple Picsart tools in one workflow?**

Yes. Add multiple AI Agent nodes in sequence and pass the output of one as input to the next. For example, generate an image in the first node and then use a second node to create a video from that image.

**Is there a per-call cost?**

Gumloop charges for workflow runs according to their pricing plan. Picsart charges credits per generation. These are separate and billed independently.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
