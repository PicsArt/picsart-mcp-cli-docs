---
description: "Connect Picsart to OpenClaw by adding the hosted Picsart MCP server with OAuth sign-in, then generate images, video, and audio inside your OpenClaw agent workflows."
---

# OpenClaw

OpenClaw is an open-source AI agent framework ([github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)) that became one of the fastest-growing repositories in GitHub history after its January 2026 launch. It connects to remote MCP servers over Streamable HTTP and supports OAuth sign-in for them. MCP servers are saved under `mcp.servers` in your OpenClaw config and managed with the `openclaw mcp` command. See the [OpenClaw MCP transports and OAuth documentation](https://docs.openclaw.ai/cli/mcp/transports).

## Prerequisites

1. An OpenClaw installation with the `openclaw mcp` command available.
2. A Picsart account. You sign in with it when you run `openclaw mcp login`.
3. Credits on your Picsart account for generations.

The Picsart MCP server is hosted, so there is nothing to install locally. You do not need the gen-ai CLI or an API key.

## Setup

### Step 1: Add the server

Save the Picsart MCP server with OAuth enabled:

```bash
openclaw mcp add picsart-gen-ai \
  --url https://api.picsart.com/gen-ai/mcp \
  --transport streamable-http \
  --auth oauth
```

Or set the same entry as JSON:

```bash
openclaw mcp set picsart-gen-ai '{"url":"https://api.picsart.com/gen-ai/mcp","transport":"streamable-http","auth":"oauth"}'
```

Do not add an `Authorization` header. OpenClaw sends the OAuth token for you after you sign in.

### Step 2: Sign in to Picsart

```bash
openclaw mcp login picsart-gen-ai
```

OpenClaw prints an authorization URL. Open it in your browser, sign in with your Picsart account, and approve access. OpenClaw completes the token exchange and stores the credentials.

::: info OAuth client registration
The Picsart MCP server expects the host to register itself as an OAuth client during sign-in. If `openclaw mcp login` stops and asks you for a client ID or secret, your OpenClaw version cannot sign in to the Picsart MCP server yet. There is no API-key alternative.
:::

### Verify the connection

Check the saved entry and probe the server:

```bash
openclaw mcp status --verbose
openclaw mcp probe
```

Then start an OpenClaw agent session and ask:

> *"List the available Picsart video models."*

The agent should call `picsart_model_catalog` or `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask your OpenClaw agent in plain English:

- *"Generate a product shot on a white background using Flux 2 Pro."*
- *"Create a 9:16 social video from this landscape image using Kling V3."*
- *"Remove the background from this product photo and return the URL."*
- *"How many Picsart credits do I have left?"*

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**The sign-in page did not open**

`openclaw mcp login picsart-gen-ai` prints the authorization URL rather than always opening a browser. Copy the URL from the terminal and open it yourself. Keep the command running until sign-in finishes, since OpenClaw waits on a local loopback callback.

**"Unauthorized" or 401 errors**

Your Picsart sign-in has expired or was never completed. Run `openclaw mcp login picsart-gen-ai` again. To start fresh, run `openclaw mcp logout picsart-gen-ai` first. Confirm the entry has `"auth":"oauth"` with `openclaw mcp status --verbose`.

**Tools do not appear in the agent**

Run `openclaw mcp probe` to confirm OpenClaw can reach the server and see its tools. Then restart your OpenClaw agent so it loads the updated server list.

**Tools listed but generation fails**

Confirm your Picsart account has credits. Ask the agent *"What's my Picsart credit balance?"*. It calls `picsart_credits`. Top up at [picsart.com](https://picsart.com) if needed.

**Connection times out**

Your network must allow outbound HTTPS to `api.picsart.com` on port 443. If the probe times out, check your proxy or firewall settings.

## FAQ

**Which transport should I use?**

Streamable HTTP. The Picsart MCP server is a hosted remote server and does not offer a local (stdio) option.

**Can I use Picsart alongside other MCP servers in OpenClaw?**

Yes. Add each server with its own name. All tools from all servers are available in the same agent session.

**Does OpenClaw support streaming responses from Picsart tools?**

Picsart tool responses return a result URL once generation is complete. There is no mid-generation streaming output. Results appear as a complete response when the generation finishes.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
