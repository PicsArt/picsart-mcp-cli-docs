---
description: Use the hosted Picsart MCP server with local LLMs in LM Studio, signing in with OAuth, for image generation, video creation, and background removal.
---

# LM Studio

[LM Studio](https://lmstudio.ai) is a desktop application for running local and remote LLMs. It connects to remote MCP servers configured in `mcp.json`, and from version 0.4.10 it handles OAuth sign-in for them, so local models can call Picsart tools during a conversation. The Picsart MCP server is hosted, so there is nothing to install locally.

## Prerequisites

- LM Studio 0.4.10 or later ([download](https://lmstudio.ai)). Earlier versions support remote MCP servers but not OAuth sign-in, which the Picsart MCP server requires. On Windows, use 0.4.12 or later, which fixes OAuth for MCP servers on some Windows setups.
- A local model loaded that supports tool/function calling (see model recommendations below).
- A Picsart account. You sign in with it when LM Studio connects.
- Credits on your Picsart account for generations.

You do not need the gen-ai CLI or an API key.

## Setup

1. Open LM Studio.
2. Switch to the **Program** tab in the right sidebar.
3. Click **Install**, then **Edit mcp.json**. The file opens in the in-app editor.
4. Add the Picsart server under `mcpServers`:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

If the file already lists other servers, add only the `"picsart-gen-ai"` entry inside the existing `mcpServers` object. Do not add a `headers` or `auth` block.

5. Save the file. LM Studio opens a browser window with the Picsart sign-in page.
6. Sign in with your Picsart account and approve access. LM Studio stores the token and lists the available Picsart tools.
7. Load a model with strong tool-calling support in the model selector.
8. Open the chat and send: `List the available Picsart video models.`

The model should call `picsart_model_catalog` or `picsart_list_models` and return results.

For the complete reference, see the [LM Studio MCP documentation](https://lmstudio.ai/docs/app/mcp) and the [LM Studio OAuth integrations guide](https://lmstudio.ai/docs/integrations/mcp-remote).

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

**The Picsart sign-in window did not open**

Confirm you are on LM Studio 0.4.10 or later (0.4.12 or later on Windows). Check that `mcp.json` is valid JSON and that the entry has only a `url` field. Save the file again or restart LM Studio to retry the connection.

**Tool calls fail intermittently**

Switch to a model with stronger function-calling support. Qwen 2.5-7B-Instruct and Mistral-7B-Instruct-v0.3 are reliable starting points. If the issue persists with a supported model, reload the model from the selector.

**Picsart tools do not appear**

Restart LM Studio after editing `mcp.json`, then confirm the Picsart server is listed with its tools.

**"Connection refused" or server timeout**

LM Studio may be blocked from making outbound requests by a firewall or VPN. Confirm that your machine can reach `api.picsart.com` on port 443. If you are on a corporate network, check proxy settings.

**Authorization error (401)**

Your Picsart sign-in has expired or did not complete. Restart LM Studio and sign in again when the browser window opens. Do not add an `Authorization` header: the Picsart MCP server does not accept API keys.

**Generation fails with insufficient credits**

Ask *"What's my Picsart credit balance?"*. The model calls `picsart_credits`. Top up at [picsart.com](https://picsart.com) if needed.

## FAQ

**Can LM Studio use Picsart MCP with any local model?**

Technically yes, but results vary. Models not fine-tuned for tool use may ignore tool calls or produce malformed requests. Qwen 2.5, Mistral, and Llama 3.1 are the most reliable choices.

**Does this cost Picsart credits even though I am running a local model?**

Yes. The local model handles conversation and decides when to call a tool, but the actual generation (image, video, audio) runs on Picsart's servers and consumes credits from your account.

**Do I need a Picsart API key?**

No. LM Studio signs in to Picsart with OAuth through your browser.

**Can I use Picsart MCP alongside other MCP servers in LM Studio?**

Yes. LM Studio supports multiple MCP servers simultaneously. Add each server as its own entry in `mcp.json`.

**Does LM Studio support streaming responses from Picsart tools?**

Picsart tool responses return a result URL once generation is complete. There is no streaming mid-generation output. LM Studio displays the result when the tool call finishes.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
