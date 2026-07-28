---
description: Add Picsart's MCP server to AnythingLLM to generate images, videos, and audio directly inside your AnythingLLM workspaces.
---

# AnythingLLM

AnythingLLM is an all-in-one desktop AI application with support for RAG, agents, and MCP servers ([anythingllm.com](https://anythingllm.com)). It is available as a desktop app and as a self-hosted Docker deployment. Picsart connects via a remote HTTP URL, so no additional local process is required.

## Prerequisites

- AnythingLLM 1.6.0 or later. MCP support was added in version 1.6.0.
- A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.
- An LLM with reliable function-calling configured in AnythingLLM (GPT-4o, Claude, or Qwen 2.5 72B recommended).

## Setup

**1. Open AnythingLLM settings**

Click the gear icon to open **Settings**.

**2. Navigate to Agent Tools**

Select **Agent Skills** or **Agent Tools** (the label varies by version).

**3. Add the MCP server**

Find the **MCP Servers** section and click **Add Server**. Enter the following:

| Field | Value |
|---|---|
| Name | Picsart Gen AI |
| Type | Streamable HTTP |
| URL | `https://mcp.picsart.io/mcp` |
| Authorization header | `Bearer YOUR_PICSART_API_KEY` |

Replace `YOUR_PICSART_API_KEY` with your key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

**4. Save and verify**

Click **Save**. AnythingLLM connects to the server and lists the available Picsart tools.

**5. Test in chat**

Open any workspace, enable agent mode (the wand icon), and send:

```
What Picsart tools do I have access to?
```

The agent should respond with the full list of available tools.

For the full MCP configuration reference, see the [AnythingLLM MCP documentation](https://docs.anythingllm.com/agent/custom/mcp-servers).

## Use it

With agent mode enabled in any workspace:

- "Generate a product image for a new sneaker launch using Flux 2 Pro."
- "Create a 5-second promo video from this product image."
- "Generate a podcast-style voiceover for this script using ElevenLabs."

## Troubleshooting

**MCP section not visible in settings**
Update AnythingLLM to 1.6.0 or later. Versions before 1.6.0 do not include MCP support.

**Server saved but no tools appear**
Restart AnythingLLM. The tool manifest is fetched at app startup, not immediately on save.

**"Network error" when connecting**
Confirm the URL is exactly `https://mcp.picsart.io/mcp`. Self-hosted instances require outbound HTTPS access to `mcp.picsart.io` on port 443.

## FAQ

**Does AnythingLLM work offline with Picsart MCP tools?**
AnythingLLM can run local LLMs without an internet connection, but Picsart MCP tools require an active internet connection to reach `mcp.picsart.io`. Offline use of local models is unaffected.

**Can multiple workspaces use Picsart tools?**
Yes. MCP servers are global in AnythingLLM. Once added, they are available in all workspaces without any per-workspace configuration.

**What LLM produces the best results with Picsart tools?**
Any model with reliable function-calling works. OpenAI GPT-4o, Anthropic Claude, and Qwen 2.5 72B produce the most consistent tool calls. Small local models (under 7B parameters) may produce unreliable results with structured tool arguments.
