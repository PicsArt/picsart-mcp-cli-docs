---
description: "Connect Picsart to ChatGPT via MCP or Skills — generate images, video, and audio from ChatGPT conversations."
---

# ChatGPT

ChatGPT supports Picsart through MCP (for ChatGPT with MCP connector support) and through Skills (as an attached file in a conversation or custom GPT).

## Prerequisites

**For Skills**: install the gen-ai CLI ([Installation](/guide/installation)), run `gen-ai login` once (browser OAuth), and verify with `gen-ai --version` and `gen-ai credits`.

**For MCP** (no CLI needed): install the server package — `npm install -g @picsart/gen-ai-mcp`, which provides the `gen-ai-mcp` command — and authenticate it as described in [MCP authentication](/guide/mcp-quickstart#authentication).

## Method 1: MCP

ChatGPT's MCP connector lets you connect an external MCP server to a conversation or a custom GPT.

### Configure

In ChatGPT's MCP settings, add the Picsart server:

- **Server name:** `picsart-gen-ai`
- **Command:** `gen-ai-mcp`
- **Transport:** stdio

Refer to [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) for the exact config block for your ChatGPT version, as the connector UI evolves.

### Use it

Once connected:

- *"Generate a product image using Flux 2 Pro, white background, 1:1."*
- *"How many credits does a Veo 3.1 video cost at 8 seconds?"*
- *"Remove the background from this image URL."*

ChatGPT calls the Picsart tools, runs the generation, and returns the result URL.

## Method 2: Skills (via attachment)

### Install

1. Download the skill ZIP from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. Attach the ZIP to a ChatGPT conversation, or include it in a Custom GPT's knowledge files.
3. ChatGPT reads the skill instructions and uses them when you describe a generation task.

### Use it

In the conversation:

- *"Generate three hero image concepts for a skincare brand in 16:9."*
- *"Create a 9:16 teaser video from this product image."*

ChatGPT reads the skill instructions and runs the corresponding `gen-ai` commands.

## Troubleshooting

**ChatGPT cannot run `gen-ai-mcp`.**

The MCP server must run as a local process. Make sure the MCP server package is installed (`npm install -g @picsart/gen-ai-mcp`) and its binary is on your PATH (`which gen-ai-mcp`). ChatGPT's MCP connector requires a running local server, not a remote URL.

**Generation fails with "unauthorized".**

For MCP, check the server's authentication — set or refresh `PICSART_TOKEN` in its config (see [MCP authentication](/guide/mcp-quickstart#authentication)) and restart ChatGPT. For Skills, run `gen-ai login` in a terminal and retry.

## FAQ

**Does ChatGPT support MCP natively?**

ChatGPT supports MCP via its connector feature. Availability may depend on your ChatGPT plan. Check OpenAI's documentation for the current connector setup.

**Can I use the skill with a free ChatGPT account?**

The skill can be attached to conversations on any ChatGPT plan. However, running `gen-ai` commands requires a Picsart account with credits — the ChatGPT plan tier does not affect Picsart billing.

**Is the result URL private?**

Result URLs are time-limited signed URLs. Download or save them to Drive promptly. See [Files and Drive](/guide/files-and-drive).

## Start creating

Click below to open ChatGPT with a ready-to-run Picsart prompt. ChatGPT will call the Picsart plugin automatically once you confirm.

::: tip Ready to generate?
[Start creating in ChatGPT](https://chatgpt.com/?q=Use%20Picsart%20MCP%20to%20generate%20a%20photorealistic%20product%20shot%20on%20a%20white%20background%20with%20natural%20lighting%20using%20Flux%202%20Pro){ .btn-primary target="_blank" rel="noopener" }
:::
