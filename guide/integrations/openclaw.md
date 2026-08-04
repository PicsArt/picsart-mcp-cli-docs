---
description: "Connect Picsart to OpenClaw by adding the MCP server to config.yaml — generate images, video, and audio inside your OpenClaw AI agent workflows."
---

# OpenClaw

OpenClaw is an open-source AI agent framework ([github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)) that became one of the fastest-growing repositories in GitHub history after its January 2026 launch. It supports MCP servers via both Streamable HTTP and stdio transport, configured in a single `config.yaml` file.

## Prerequisites

1. An OpenClaw installation (any release from January 2026 or later).
2. A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.
3. The `@picsart/gen-ai-mcp` package installed globally if you plan to use stdio transport:

```bash
npm install -g @picsart/gen-ai-mcp
```

## Setup

### Method 1: Streamable HTTP (recommended)

Open `config.yaml` in your OpenClaw project directory and add a `picsart` entry under `mcp_servers`:

```yaml
mcp_servers:
  picsart:
    url: https://mcp.picsart.io/mcp
    headers:
      Authorization: "Bearer YOUR_PICSART_TOKEN"
```

Replace `YOUR_PICSART_TOKEN` with your API key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

Save the file and restart your OpenClaw agent. No CLI install is required for this method.

### Method 2: stdio

If your environment does not have outbound HTTPS access to `mcp.picsart.io`, use the stdio transport instead:

```yaml
mcp_servers:
  picsart:
    command: gen-ai-mcp
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

OpenClaw spawns the `gen-ai-mcp` process locally and communicates over stdio. Ensure `gen-ai-mcp` is on your PATH (verify with `which gen-ai-mcp`).

### Verify the connection

Start an OpenClaw agent session and ask:

> *"List available Picsart image models."*

The agent should call `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask your OpenClaw agent in plain English:

- *"Generate a product shot on a white background using Flux 2 Pro."*
- *"Create a 9:16 social video from this landscape image using Kling V3."*
- *"Remove the background from ./product.png and return the URL."*
- *"How many Picsart credits do I have left?"*

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**`gen-ai-mcp: command not found`**

Install the package globally and confirm it is on your PATH:

```bash
npm install -g @picsart/gen-ai-mcp
which gen-ai-mcp
```

If the binary is found but OpenClaw cannot locate it, use the absolute path in `config.yaml`:

```yaml
mcp_servers:
  picsart:
    command: /usr/local/bin/gen-ai-mcp
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

**"Unauthorized" or 401 errors**

Verify that `YOUR_PICSART_TOKEN` is correct. Copy it fresh from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and confirm there are no extra spaces around the value in the YAML file.

**YAML parse error on startup**

YAML is whitespace-sensitive. Indentation must use spaces, not tabs. Validate your file:

```bash
python3 -c "import yaml; yaml.safe_load(open('config.yaml'))"
```

**Tools listed but generation fails**

Confirm your Picsart account has credits. Run a quick check by asking the agent: *"How many Picsart credits do I have?"*

## FAQ

**Which transport should I use?**

Streamable HTTP is simpler: no local package install, and authentication is handled via the `Authorization` header. Use stdio if your network restricts outbound HTTPS or if you prefer a fully local setup.

**Can I use Picsart alongside other MCP servers in OpenClaw?**

Yes. Add multiple entries under `mcp_servers`. All tools from all servers are available in the same agent session.

**Does OpenClaw support streaming responses from Picsart tools?**

Picsart tool responses return a result URL once generation is complete. There is no mid-generation streaming output. Results appear as a complete response when the generation finishes.

