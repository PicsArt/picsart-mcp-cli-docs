---
description: "Connect Picsart to Hermes Agent by adding the hosted Picsart MCP server to config.yaml with OAuth sign-in, then generate images, video, and audio from your agent."
---

# Hermes Agent

Hermes Agent is an open-source AI agent framework by NousResearch ([github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)). It supports remote MCP servers over HTTP with OAuth sign-in, and offers an opt-in Tool Search feature that loads MCP tools on demand. MCP servers are configured in `~/.hermes/config.yaml` and are listed in the `hermes mcp` picker. See the [Hermes Agent MCP documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp) for the full reference.

## Prerequisites

1. Hermes Agent installed and running.
2. A Picsart account. You sign in with it when Hermes Agent first connects.
3. Credits on your Picsart account for generations.

The Picsart MCP server is hosted, so there is nothing to install locally. You do not need the gen-ai CLI or an API key.

## Setup

### Add the server to config.yaml

Open `~/.hermes/config.yaml` and add a `picsart-gen-ai` entry under `mcp_servers`:

```yaml
mcp_servers:
  picsart-gen-ai:
    url: "https://api.picsart.com/gen-ai/mcp"
    auth: oauth
```

`auth: oauth` tells Hermes Agent to run the OAuth sign-in flow for this server. Hermes Agent registers itself as an OAuth client automatically, so you do not need a `client_id`, `client_secret`, or `headers` entry.

### Sign in to Picsart

Run:

```bash
hermes mcp login picsart-gen-ai
```

Hermes Agent prints an authorization URL and opens your browser when it can. Sign in with your Picsart account and approve access. Hermes Agent stores the token and sends it on every call.

On a headless machine, use the device flow instead:

```bash
hermes mcp login picsart-gen-ai --flow device
```

If Hermes Agent is already running, reload MCP servers from inside the session with `/reload-mcp`.

### Browse installed servers

Open the `hermes mcp` picker to confirm `picsart-gen-ai` appears in the server list with its status.

### Verify the connection

Start a Hermes Agent session and ask:

> *"List the available Picsart video models."*

The agent should call `picsart_model_catalog` or `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask Hermes Agent in plain English:

- *"Generate a hero image for a SaaS landing page using Flux 2 Pro."*
- *"Create a 5-second product video from this URL using Kling V3."*
- *"Remove the background from this product photo and save it to Drive."*
- *"Quote the cost of a Seedance 2.0 video at 1080p for 8 seconds."*

With Tool Search enabled, Hermes Agent loads the matching Picsart tool when your request needs it. For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**The Picsart sign-in window did not open**

Copy the authorization URL that `hermes mcp login picsart-gen-ai` prints and open it in your browser. On a remote or headless host, use `hermes mcp login picsart-gen-ai --flow device`.

**"Unauthorized" or 401 errors**

Your Picsart sign-in has expired or was never completed. Run `hermes mcp login picsart-gen-ai` again and sign in. Confirm the entry in `config.yaml` includes `auth: oauth`.

**Picsart tools do not appear in the `hermes mcp` picker**

Confirm the entry is in `~/.hermes/config.yaml` under `mcp_servers`. Hermes Agent discovers MCP servers at startup, so restart it or run `/reload-mcp` in an active session after editing the file.

**Generation fails with insufficient credits**

Ask the agent *"What's my Picsart credit balance?"*. It calls `picsart_credits`. Top up at [picsart.com](https://picsart.com) if needed.

**Connection times out**

Your network must allow outbound HTTPS to `api.picsart.com` on port 443.

**YAML parse error on startup**

YAML is whitespace-sensitive. Use spaces, not tabs, for indentation. Validate the file:

```bash
python3 -c "import yaml, os; yaml.safe_load(open(os.path.expanduser('~/.hermes/config.yaml')))"
```

## FAQ

**Does Hermes Agent's malware check affect the Picsart MCP server?**

No. Hermes Agent checks packages it launches locally through `npx` or `uvx`. The Picsart MCP server is a remote server, so there is no local package to check.

**Can I use Picsart alongside other MCP servers in Hermes Agent?**

Yes. Add multiple entries under `mcp_servers`. Tool Search works across all connected servers.

**Is OAuth required for the Picsart MCP server?**

Yes. The Picsart MCP server authenticates with OAuth only. Set `auth: oauth` on the entry and sign in with `hermes mcp login picsart-gen-ai`. There is no API key or bearer token to paste into `headers`.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
