---
description: "Connect Picsart to NemoClaw by adding the MCP server to your container config — generate images, video, and audio inside NemoClaw's isolated Docker agent environment."
---

# NemoClaw

NemoClaw is an AI agent framework in the OpenClaw ecosystem ([docs.nemoclaw.dev](https://docs.nemoclaw.dev)). It runs AI agents inside Docker containers for security isolation, making it well-suited for personal and team agent setups. MCP servers are configured via the `ncl` CLI or directly in the container config file. NemoClaw uses stdio transport for MCP, as servers run inside the container environment alongside the agent.

## Prerequisites

1. NemoClaw installed with Docker available on your system.
2. A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.
3. The `@picsart/gen-ai-mcp` package available inside the container. Install it globally on your host — NemoClaw mounts the node_modules path into the container — or include it in your container image.

```bash
npm install -g @picsart/gen-ai-mcp
```

## Setup

### Method 1: `ncl` CLI (recommended)

Use the `ncl` command to add the Picsart MCP server to your group configuration. Replace `YOUR_GROUP_ID` with your NemoClaw group ID and `YOUR_TOKEN` with your Picsart API key:

```sh
ncl groups config add-mcp-server \
  --id YOUR_GROUP_ID \
  --name picsart \
  --command gen-ai-mcp \
  --env '{"PICSART_TOKEN":"YOUR_TOKEN"}'
```

NemoClaw applies the change on the next agent session start. No container rebuild is required.

### Method 2: Container config file

Alternatively, edit the container config file directly. Locate your NemoClaw container config and add the following under `mcp_servers`:

```yaml
mcp_servers:
  - name: picsart
    command: gen-ai-mcp
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

Replace `YOUR_PICSART_TOKEN` with your API key. Save the file and restart the container for the change to take effect.

### Verify the connection

Start a NemoClaw agent session and ask:

> *"List available Picsart image models."*

The agent should call `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask your NemoClaw agent in plain English:

- *"Generate a product shot on a white background using Flux 2 Pro."*
- *"Create a 9:16 social video from this image using Kling V3."*
- *"Remove the background from /workspace/product.png."*
- *"How many Picsart credits do I have left?"*

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**`gen-ai-mcp: command not found` inside the container**

The container cannot find the `gen-ai-mcp` binary. Confirm the package is installed globally on the host and that NemoClaw is mounting the global node_modules path into the container. Alternatively, use the absolute binary path in your config:

```yaml
mcp_servers:
  - name: picsart
    command: /usr/local/bin/gen-ai-mcp
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

Or use `npx` to avoid a global install dependency:

```yaml
mcp_servers:
  - name: picsart
    command: npx
    args: ["-y", "@picsart/gen-ai-mcp"]
    env:
      PICSART_TOKEN: "YOUR_PICSART_TOKEN"
```

**"Unauthorized" or authentication errors**

Verify your Picsart API key. Copy it fresh from [picsart.com/ai-playground/](https://picsart.com/ai-playground/) and update the `PICSART_TOKEN` value in your config. If you used the `ncl` CLI to set the env, re-run the `add-mcp-server` command with the corrected token.

**Config changes not taking effect**

Changes made via the `ncl` CLI take effect on the next agent session. If you edited the container config file directly, restart the container to apply changes.

**YAML parse error**

YAML is whitespace-sensitive. Use spaces, not tabs, for indentation. Validate the file:

```bash
python3 -c "import yaml; yaml.safe_load(open('your-config.yaml'))"
```

## FAQ

**Why does NemoClaw use stdio instead of HTTP for MCP?**

NemoClaw runs agents inside Docker containers. The MCP server process runs in the same container as the agent, so communication over stdio is direct and avoids exposing an HTTP port. This matches NemoClaw's security isolation model.

**Can I add multiple MCP servers to NemoClaw?**

Yes. Add multiple entries under `mcp_servers`, or run `ncl groups config add-mcp-server` multiple times with different `--name` values. All servers are available to the agent simultaneously.

**Can I use different API keys for different NemoClaw groups?**

Yes. Each group has its own config, so you can configure a different `PICSART_TOKEN` per group. This is useful for teams where each group has separate Picsart billing.

