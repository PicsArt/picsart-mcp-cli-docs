---
description: "AnythingLLM and the Picsart MCP server: AnythingLLM supports remote MCP servers but not OAuth sign-in yet, so it cannot connect to Picsart's OAuth-only server today. What to expect and what to use instead."
---

# AnythingLLM

AnythingLLM is an all-in-one desktop AI application with support for RAG, agents, and MCP servers ([anythingllm.com](https://anythingllm.com)). It is available as a desktop app and as a self-hosted Docker deployment. It can connect to remote MCP servers over Streamable HTTP, with optional static headers. See the [AnythingLLM MCP documentation](https://docs.anythingllm.com/mcp-compatibility/overview).

::: warning AnythingLLM cannot connect to the Picsart MCP server today
The Picsart MCP server at `https://api.picsart.com/gen-ai/mcp` authenticates with OAuth sign-in only. AnythingLLM does not support OAuth for MCP servers yet. The feature request is open as [anything-llm issue #6396](https://github.com/Mintplex-Labs/anything-llm/issues/6396). Until it ships, AnythingLLM reports that the server requires OAuth authentication and does not load the Picsart tools.
:::

## Prerequisites

To use the Picsart MCP server from any host, you need:

- A Picsart account. You sign in with it when the host connects.
- Credits on your Picsart account for generations.
- A host that supports remote (Streamable HTTP) MCP servers with OAuth sign-in.

AnythingLLM meets the remote Streamable HTTP part but not the OAuth part. You do not need the gen-ai CLI or an API key for the Picsart MCP server, and adding one to AnythingLLM will not help.

## Setup

AnythingLLM reads MCP servers from `anythingllm_mcp_servers.json` in the `plugins` folder of its storage directory. A remote server entry looks like this:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "type": "streamable",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

With this entry today, AnythingLLM reaches the server, receives an OAuth sign-in challenge, and stops because it cannot run the sign-in flow. Do not add an `Authorization` or `X-API-KEY` header as a workaround: the Picsart MCP server does not accept API keys.

### Use a supported host instead

To use Picsart tools now, connect through a host that supports OAuth for remote MCP servers, such as [LM Studio](/guide/integrations/lm-studio) for local models, [Claude Code](/guide/integrations/claude-code), or [Cursor](/guide/integrations/cursor). See the [integrations index](/guide/integrations/) for the full list.

## Use it

Once AnythingLLM supports OAuth for MCP servers and the Picsart server is connected, enable agent mode in a workspace and ask:

- "Generate a product image for a new sneaker launch using Flux 2 Pro."
- "Create a 5-second promo video from this product image."
- "Generate a podcast-style voiceover for this script using ElevenLabs."

## Troubleshooting

**"This server requires OAuth authentication"**
This is expected. AnythingLLM cannot complete OAuth sign-in for MCP servers yet. Follow [issue #6396](https://github.com/Mintplex-Labs/anything-llm/issues/6396) for progress, and use a supported host in the meantime.

**Picsart tools do not appear**
AnythingLLM only lists tools after the server connects, which requires OAuth sign-in. Restarting AnythingLLM will not change this until OAuth support ships.

**"Network error" when connecting**
Confirm the URL is exactly `https://api.picsart.com/gen-ai/mcp`. Self-hosted instances require outbound HTTPS access to `api.picsart.com` on port 443.

## FAQ

**Can I use a Picsart API key in the `headers` field?**
No. The Picsart MCP server does not accept API keys. It uses OAuth sign-in with your Picsart account.

**When will AnythingLLM work with Picsart?**
When AnythingLLM adds OAuth support for MCP servers. This page will be updated with setup steps once it does.

**Does AnythingLLM work offline with Picsart MCP tools?**
No. Picsart MCP tools always require an internet connection to reach `api.picsart.com`. Offline use of local models is unaffected.

## Start creating

Connect the Picsart MCP server through a supported host, then visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
