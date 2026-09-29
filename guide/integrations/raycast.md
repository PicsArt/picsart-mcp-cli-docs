---
description: Connect the hosted Picsart MCP server to Raycast AI with OAuth sign-in for image generation, video creation, and creative tools directly from your launcher.
---

# Raycast

[Raycast](https://raycast.com) is a launcher with an AI Chat feature that supports MCP servers, including remote HTTP servers with OAuth sign-in. The Picsart MCP server is hosted at `https://api.picsart.com/gen-ai/mcp`, so you call Picsart tools without any local server setup.

## Prerequisites

- The Raycast desktop app with an active [Raycast Pro](https://raycast.com/pro) subscription. MCP is a Pro feature.
- A Picsart account. You sign in with it when you install the server.
- Credits on your Picsart account for generations.

You do not need the gen-ai CLI or an API key.

## Setup

1. Open Raycast.
2. Search for the **Install MCP Server** command and press Enter.
3. Fill in the form:
   - **Name:** `Picsart`. The name becomes the @-mention handle in AI Chat.
   - **Transport:** `HTTP`
   - **URL:** `https://api.picsart.com/gen-ai/mcp`
   - **OAuth Type:** `Dynamic`
4. Select **Sign In**. Raycast registers itself as an OAuth client and opens the Picsart sign-in page in your browser.
5. Sign in with your Picsart account and approve access. You return to Raycast with the server installed.

Raycast fetches the tool list from the server. Open the **Manage MCP Servers** command to see the Picsart entry, its status, and its tools.

6. Open Raycast AI Chat.
7. Type `@Picsart` to address the Picsart server directly in your message.

For the full MCP setup reference, see the [Raycast MCP documentation](https://manual.raycast.com/ai/model-context-protocol).

### Verify the connection

In AI Chat, send:

```
@Picsart list the available Picsart video models
```

Raycast should call `picsart_model_catalog` or `picsart_list_models` and return results.

## Use it

Once connected, address Picsart in any AI Chat conversation:

```
@Picsart generate a product shot of red sneakers on a white background
```

```
@Picsart create a 5-second cinematic video of a city at night using Kling V3
```

```
@Picsart check my credit balance
```

Raycast sends your prompt to the AI model, which calls the relevant Picsart tool and returns the result inline.

## Troubleshooting

**The Picsart sign-in window did not open**

Open **Manage MCP Servers**, select the Picsart entry, and sign in again. Confirm **OAuth Type** is set to `Dynamic`. Do not add an Authorization header: the Picsart MCP server does not accept API keys.

**Tools not loading after install**

Quit Raycast fully (Cmd+Q from the menu bar icon) and relaunch it. Then check the tool list in **Manage MCP Servers**.

**"Unauthorized" or authentication error**

Your Picsart sign-in has expired. Open **Manage MCP Servers**, select the Picsart entry, and sign in again.

**Generation fails with insufficient credits**

Ask *"@Picsart what's my Picsart credit balance?"*. Raycast calls `picsart_credits`. Top up at [picsart.com](https://picsart.com) if needed.

**@Picsart not appearing as an option**

The server must have loaded its tool list successfully. Open **Manage MCP Servers**, select the Picsart entry, and verify the tools are listed. If the list is empty, confirm the URL is exactly `https://api.picsart.com/gen-ai/mcp` and that your network allows outbound HTTPS to `api.picsart.com` on port 443.

## FAQ

**Which platforms does this work on?**

Raycast documents MCP support for its desktop app. Check the [Raycast MCP documentation](https://manual.raycast.com/ai/model-context-protocol) for current platform details.

**Do I need Raycast Pro to use MCP?**

Yes. MCP is a Pro feature in Raycast.

**Do I need a Picsart API key?**

No. Raycast signs in to Picsart with OAuth. There is no key to paste.

**Can Raycast download generated files automatically?**

Raycast AI returns the tool result as text, which includes a URL to the generated file. You can open the link directly or chain it with a Raycast script to automate the download.

**Will Picsart tools appear for every AI Chat conversation?**

Tools are available globally in AI Chat once the server is installed. You do not need to re-enable them per conversation.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
