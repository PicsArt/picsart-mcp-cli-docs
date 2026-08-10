---
description: "Connect Picsart to Hermes Agent by adding the MCP server to config.yaml — generate images, video, and audio with native BM25 tool search and OAuth support."
---

# Hermes Agent

Hermes Agent is an open-source AI agent framework by NousResearch ([github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)) with 180,000+ GitHub stars. Launched in February 2026, it features native MCP support with BM25 tool search, OAuth, and built-in malware scanning. MCP servers are configured in `config.yaml` and are accessible through the `hermes mcp` picker.

## Prerequisites

1. Hermes Agent installed and running.
2. A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.
3. The `@picsart/gen-ai-mcp` package installed globally if you plan to use stdio transport:

```bash
npm install -g @picsart/gen-ai-mcp
```

## Setup

### Method 1: stdio (recommended for local setups)

Open `config.yaml` and add a `picsart` entry under `mcp_servers`:

```yaml
mcp_servers:
  picsart:
    command: npx
    args: ["-y", "@picsart/gen-ai-mcp"]
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

Replace `YOUR_PICSART_TOKEN` with your API key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

Hermes Agent spawns the MCP server process on demand via `npx`. No separate global install is required with this approach.

### Method 2: Streamable HTTP

If you prefer to connect to the hosted MCP endpoint directly, use the HTTP transport:

```yaml
mcp_servers:
  picsart:
    url: https://mcp.picsart.io/mcp
    headers:
      Authorization: "Bearer YOUR_PICSART_TOKEN"
```

Save `config.yaml` and restart Hermes Agent.

### Browse installed servers

After configuring, open the `hermes mcp` picker to confirm `picsart` appears in the server list. Select it to see all available Picsart tools with their descriptions.

### Verify the connection

Start a Hermes Agent session and ask:

> *"List available Picsart image models."*

The agent should call `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask Hermes Agent in plain English:

- *"Generate a hero image for a SaaS landing page using Flux 2 Pro."*
- *"Create a 5-second product video from this URL using Kling V3."*
- *"Remove the background from ./product.jpg and save it to Drive."*
- *"Quote the cost of a Seedance 2.0 video at 1080p for 8 seconds."*

Hermes Agent's BM25 tool search automatically selects the best-matching Picsart tool based on your request. For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**`npx` hangs or times out on first run**

The first `npx -y @picsart/gen-ai-mcp` call downloads the package from the npm registry. If your environment has a slow or restricted network, the package may time out. Install it globally in advance:

```bash
npm install -g @picsart/gen-ai-mcp
```

Then update `config.yaml` to call the binary directly instead of via `npx`:

```yaml
mcp_servers:
  picsart:
    command: gen-ai-mcp
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

**"Unauthorized" or 401 errors**

Verify that `YOUR_PICSART_TOKEN` is correct. Copy it fresh from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and confirm there are no extra spaces in the YAML value.

**Picsart tools do not appear in the `hermes mcp` picker**

Confirm `config.yaml` is in the Hermes Agent project directory (not a subdirectory). Restart Hermes Agent after editing the file. If the tools still do not appear, run `hermes mcp` and check the error output for connection details.

**YAML parse error on startup**

YAML is whitespace-sensitive. Use spaces, not tabs, for indentation. Validate the file:

```bash
python3 -c "import yaml; yaml.safe_load(open('config.yaml'))"
```

## FAQ

**Does Hermes Agent's malware scanning affect Picsart tool calls?**

Hermes Agent scans tool definitions when the MCP server is first loaded. The Picsart MCP server passes this check. Once loaded, tool calls proceed normally without per-call scanning overhead.

**Can I use Picsart alongside other MCP servers in Hermes Agent?**

Yes. Add multiple entries under `mcp_servers`. Hermes Agent's BM25 tool search works across all servers simultaneously, picking the best tool regardless of which server it comes from.

**Is OAuth required for the Picsart MCP server?**

No. Picsart authentication uses a Bearer token in the `Authorization` header (HTTP method) or the `PICSART_TOKEN` environment variable (stdio method). Hermes Agent's OAuth feature is for MCP servers that implement the OAuth 2.0 MCP extension, which Picsart does not require.

