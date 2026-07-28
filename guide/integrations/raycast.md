---
description: Connect Picsart MCP to Raycast AI on Mac for image generation, video creation, and creative tools directly from your launcher.
---

# Raycast

[Raycast](https://raycast.com) is a Mac launcher used by over 100,000 developers daily. Its AI Chat feature supports MCP servers via remote HTTP, so you can call Picsart tools without any local server setup.

## Prerequisites

- Raycast with an active [Raycast Pro](https://raycast.com/pro) subscription (required for AI features)
- A Picsart API key, available from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings
- macOS (Raycast is Mac-only)

## Setup

1. Open Raycast (Cmd+Space or your configured hotkey).
2. Type **Manage MCP Servers** and press Enter.
3. Click **Add Server**.
4. Fill in the following fields:
   - **Name:** `Picsart Gen AI`
   - **URL:** `https://mcp.picsart.io/mcp`
   - **Authorization header:** `Bearer YOUR_PICSART_API_KEY`
5. Click **Save**.

Raycast fetches the tool list from the server. Once loaded, available Picsart tools appear in the server entry.

6. Open Raycast AI Chat (Cmd+Space, then select **AI Chat**).
7. Type `@Picsart` to address the Picsart server directly in your message.

For the full MCP setup reference, see the [Raycast MCP documentation](https://manual.raycast.com/model-context-protocol).

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

**"Server not found" on save**

Confirm the URL is entered as `https://mcp.picsart.io/mcp` with no trailing slash and no extra characters.

**Tools not loading after save**

Quit Raycast fully (Cmd+Q from the menu bar icon) and relaunch it. The tool list is fetched on startup.

**Authentication error**

Check the Authorization header value for leading or trailing spaces. If the error persists, generate a new API key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and update the server entry.

**@Picsart not appearing as an option**

The server must have loaded its tool list successfully. Open **Manage MCP Servers**, select the Picsart entry, and verify the tools are listed. If the list is empty, check your network connection and re-save the server.

## FAQ

**Does this work on Raycast for Linux or Windows?**

No. Raycast is Mac-only.

**Do I need Raycast Pro to use MCP?**

Yes. MCP is part of Raycast AI, which requires a Pro subscription. Free accounts do not have access to AI features.

**Can Raycast download generated files automatically?**

Raycast AI returns the tool result as text, which includes a URL to the generated file. You can open the link directly or chain it with a Raycast script to automate the download.

**Will Picsart tools appear for every AI Chat conversation?**

Tools are available globally in AI Chat once the server is added. You do not need to re-enable them per conversation.
