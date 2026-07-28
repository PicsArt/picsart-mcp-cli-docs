---
description: Use Picsart MCP tools with local LLMs in LM Studio for image generation, video creation, and background removal via Streamable HTTP.
---

# LM Studio

[LM Studio](https://lmstudio.ai) is a desktop application for running local and remote LLMs, with millions of downloads. Version 0.3.5 introduced MCP support via Streamable HTTP, allowing local models to call Picsart tools during a conversation.

## Prerequisites

- LM Studio 0.3.5 or later ([download](https://lmstudio.ai))
- A local model loaded that supports tool/function calling (see model recommendations below)
- A Picsart API key, available from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under API settings

## Setup

1. Open LM Studio.
2. Click the **Settings** icon (gear, top right).
3. Select the **MCP** tab.
4. Click **Add MCP Server**.
5. Fill in the following fields:
   - **Name:** `Picsart Gen AI`
   - **Type:** `Streamable HTTP`
   - **URL:** `https://mcp.picsart.io/mcp`
6. Under **Headers**, add:

```
Authorization: Bearer YOUR_PICSART_API_KEY
```

7. Click **Save**. LM Studio connects to the server and lists available Picsart tools.
8. Load a model with strong tool-calling support in the model selector.
9. Open the chat and send: `List available Picsart models.`

For the complete MCP reference, see the [LM Studio MCP documentation](https://lmstudio.ai/docs/mcp).

### Recommended models

Tool-calling reliability varies by model. The following models produce consistent results with Picsart MCP:

- Qwen 2.5-7B-Instruct or larger
- Mistral-7B-Instruct-v0.3 / Mistral Nemo
- Llama 3.1 8B Instruct or larger

Models not fine-tuned for tool use may ignore tool calls or format them incorrectly.

## Use it

With a tool-capable model loaded, send prompts that reference Picsart capabilities:

```
Generate a product image with Flux 2 Pro and return the URL.
```

```
Use Picsart to remove the background from https://example.com/photo.jpg.
```

```
How many Picsart credits do I have left?
```

The model decides when to invoke a Picsart tool based on your prompt. Results are returned inline in the chat.

## Troubleshooting

**MCP tab not visible in Settings**

Upgrade LM Studio to version 0.3.5 or later. Older versions do not include MCP support.

**Tool calls fail intermittently**

Switch to a model with stronger function-calling support. Qwen 2.5-7B-Instruct and Mistral-7B-Instruct-v0.3 are reliable starting points. If the issue persists with a supported model, reload the model from the selector.

**"Connection refused" or server timeout**

LM Studio may be blocked from making outbound requests by a firewall or VPN. Confirm that your machine can reach `mcp.picsart.io` on port 443. If you are on a corporate network, check proxy settings.

**Authorization error (401)**

Verify that the header is entered exactly as `Authorization: Bearer YOUR_PICSART_API_KEY` with a single space after `Bearer` and no extra characters. Regenerate the key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) if needed.

## FAQ

**Can LM Studio use Picsart MCP with any local model?**

Technically yes, but results vary. Models not fine-tuned for tool use may ignore tool calls or produce malformed requests. Qwen 2.5, Mistral, and Llama 3.1 are the most reliable choices.

**Does this cost Picsart credits even though I am running a local model?**

Yes. The local model handles conversation and decides when to call a tool, but the actual generation (image, video, audio) runs on Picsart's servers and consumes credits from your account.

**Can I use Picsart MCP alongside other MCP servers in LM Studio?**

Yes. LM Studio supports multiple MCP servers simultaneously. Add each server separately in the MCP tab.

**Does LM Studio support streaming responses from Picsart tools?**

Picsart tool responses return a result URL once generation is complete. There is no streaming mid-generation output. LM Studio displays the result when the tool call finishes.
