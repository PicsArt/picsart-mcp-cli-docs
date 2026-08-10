---
description: Add Picsart's MCP server to LibreChat by editing librechat.yaml, enabling image generation and video creation for all users on your instance.
---

# LibreChat

LibreChat is an open-source, self-hosted ChatGPT alternative ([librechat.ai](https://librechat.ai)) with 22K+ GitHub stars. MCP servers are configured in `librechat.yaml` and are available to all users on the instance once added.

## Prerequisites

- LibreChat 0.7.5 or later. MCP support was added in version 0.7.5.
- Access to `librechat.yaml` in your LibreChat root directory.
- A Picsart API key. Get one at [picsart.com/ai-playground/](https://picsart.com/ai-playground/) under **API Settings**.
- Outbound HTTPS access from your LibreChat host to `mcp.picsart.io` on port 443.

## Setup

**1. Locate `librechat.yaml`**

The file is in the root directory of your LibreChat installation. If you are running the Docker deployment, it is mounted into the container from the host.

**2. Add the Picsart MCP server block**

```yaml
mcpServers:
  picsart-gen-ai:
    type: streamable-http
    url: https://mcp.picsart.io/mcp
    headers:
      Authorization: "Bearer YOUR_PICSART_API_KEY"
```

If `mcpServers` already exists in your file, add `picsart-gen-ai` as a new entry under it rather than creating a second `mcpServers` key.

Replace `YOUR_PICSART_API_KEY` with your key from [picsart.com/ai-playground/](https://picsart.com/ai-playground/).

**3. Restart LibreChat**

For Docker deployments:

```bash
docker compose restart
```

For Node process deployments, restart the process using your process manager (e.g., `pm2 restart librechat`).

**4. Verify the tools appear**

Log in to LibreChat, start a new conversation, and open the tool selector. Confirm that Picsart Gen AI tools are listed.

For the full YAML configuration reference, see the [LibreChat MCP servers documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers).

## Use it

In any LibreChat conversation with Picsart tools enabled:

- "Generate a product image of a coffee mug on a wooden table using Flux 2 Pro."
- "Create a 9:16 social video from this landscape image."
- "How many credits do I have in my Picsart account?"

## Troubleshooting

**YAML parse error on restart**
YAML is whitespace-sensitive. Indentation must use spaces, not tabs. Validate the file before restarting:

```bash
python3 -c "import yaml; yaml.safe_load(open('librechat.yaml'))"
```

If the command reports an error, fix the indicated line.

**Tools not visible in chat after restart**
Confirm you are on LibreChat 0.7.5 or later. Check your version in the admin panel or in the startup logs.

**"Connection refused" in the LibreChat logs**
The LibreChat host cannot reach `mcp.picsart.io:443`. Check firewall rules and outbound HTTPS access from the server.

## FAQ

**Does every LibreChat user see Picsart tools?**
Yes. MCP servers defined in `librechat.yaml` are instance-wide and available to all users without per-user configuration.

**Can I restrict Picsart tools to specific users or roles?**
Yes. LibreChat's role-based access control (RBAC) can restrict which tools appear for which roles. See the [LibreChat RBAC documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/interface#interface-properties) for details.

**Is the API key exposed to end users?**
No. The key is stored in `librechat.yaml` on the server and is not visible to regular users in the chat interface. Treat it like any other server-side secret and keep the file out of version control or redact the value using environment variable substitution.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
