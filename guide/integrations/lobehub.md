---
description: Connect Picsart's MCP server to LobeChat for image generation, video creation, and AI media tools inside your LobeHub workspace.
---

# LobeChat

LobeChat is an open-source AI chat interface with a built-in MCP marketplace ([lobehub.com](https://lobehub.com)). It is available as a cloud service at [chat.lobehub.com](https://chat.lobehub.com) and as a self-hosted deployment. Picsart connects via a remote HTTP URL.

## Prerequisites

- A LobeChat account (cloud) or a running self-hosted LobeChat instance.
- A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.

## Setup

There are two ways to add the Picsart MCP server: via the marketplace or manually.

### Option A: Marketplace one-click install

1. Go to [lobehub.com/mcp](https://lobehub.com/mcp) and search for "Picsart".
2. Click **Add to LobeChat** on the Picsart Gen AI listing.
3. In the auth dialog, enter your Picsart API key.
4. Confirm. The tools are immediately available in LobeChat.

If the listing is not yet in the marketplace, use the manual setup below.

### Option B: Manual setup

1. Open LobeChat at [chat.lobehub.com](https://chat.lobehub.com) or your self-hosted URL.
2. Go to **Settings**, then **MCP Plugins**.
3. Click **Add MCP Server** and enter the following:

| Field | Value |
|---|---|
| Name | Picsart Gen AI |
| URL | `https://mcp.picsart.io/mcp` |
| Auth | Bearer token: your Picsart API key |

4. Click **Save**. The tool list loads automatically.
5. In chat, use the `@` mention or select Picsart tools from the tool picker.

For the full MCP plugin reference, see the [LobeHub MCP documentation](https://lobehub.com/docs/usage/features/mcp).

## Use it

In any LobeChat conversation with Picsart tools enabled:

- `@Picsart generate a 16:9 cinematic still of a futuristic city`
- `@Picsart create a 5-second video from this image with Kling V3`
- `@Picsart check credit balance`

## Troubleshooting

**One-click install is not available**
The Picsart listing may not yet be published in the marketplace. Use the manual setup in Option B above.

**Tools not appearing after adding the server**
Reload the LobeChat page. The tool manifest is fetched on page load, not immediately on save.

**Auth rejected**
Confirm the Bearer token value is your API key only, with no leading or trailing spaces and no extra characters.

## FAQ

**Does this work on both LobeChat Cloud and self-hosted instances?**
Yes. Both support MCP plugins. Self-hosted instances need outbound internet access to `mcp.picsart.io` on port 443.

**Is LobeChat free?**
LobeChat is open-source and free to self-host. The cloud version at [chat.lobehub.com](https://chat.lobehub.com) is free with rate limits; paid tiers remove those limits.

**Can I use Picsart tools alongside other MCP servers in LobeChat?**
Yes. LobeChat supports multiple simultaneous MCP servers. Each server appears as a separate tool group, and you can use tools from different servers in the same conversation.
