---
description: Add Picsart's hosted MCP server to LibreChat in librechat.yaml. Each user signs in with their own Picsart account to generate images, video, and audio.
---

# LibreChat

LibreChat is an open-source, self-hosted ChatGPT alternative ([librechat.ai](https://librechat.ai)) with 22K+ GitHub stars. MCP servers are configured in `librechat.yaml` and are available to all users on the instance once added. The Picsart MCP server is hosted by Picsart, so there is nothing to install: LibreChat connects to it over Streamable HTTP, and each user signs in with their Picsart account.

## Prerequisites

- A LibreChat release with `streamable-http` MCP servers and MCP OAuth support. Recent releases include both.
- Access to `librechat.yaml` in your LibreChat root directory.
- A Picsart account for each user who will generate. Users sign in when they first connect. Generations spend credits from the signed-in account.
- Outbound HTTPS access from your LibreChat host to `api.picsart.com` on port 443.

## Setup

**1. Locate `librechat.yaml`**

The file is in the root directory of your LibreChat installation. If you are running the Docker deployment, it is mounted into the container from the host.

**2. Add the Picsart MCP server block**

```yaml
mcpServers:
  picsart-gen-ai:
    type: streamable-http
    url: https://api.picsart.com/gen-ai/mcp
    requiresOAuth: true
```

If `mcpServers` already exists in your file, add `picsart-gen-ai` as a new entry under it rather than creating a second `mcpServers` key.

No `oauth` block, client ID, or headers are needed. LibreChat discovers Picsart's sign-in settings from the server and registers itself automatically (dynamic client registration). `requiresOAuth: true` tells LibreChat up front that the server needs sign-in. Without it, LibreChat detects this on startup.

**3. Restart LibreChat**

For Docker deployments:

```bash
docker compose restart
```

For Node process deployments, restart the process using your process manager (for example, `pm2 restart librechat`).

**4. Sign in to Picsart**

Log in to LibreChat and open the MCP server selector in a chat (or the MCP Settings panel). Select **picsart-gen-ai** and click **Authenticate**. A browser window opens to Picsart's sign-in page. Sign in and approve access. Each user does this once with their own Picsart account.

**5. Verify the tools appear**

Start a new conversation with Picsart enabled and ask: "List the available Picsart video models." The model should call `picsart_model_catalog` or `picsart_list_models` and return the list.

For the full YAML configuration reference, see the [LibreChat MCP servers documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers).

## Use it

In any LibreChat conversation with Picsart tools enabled:

- "Generate a product image of a coffee mug on a wooden table using Flux 2 Pro."
- "Create a 9:16 social video from this landscape image."
- "What's my Picsart credit balance?"

## Troubleshooting

**YAML parse error on restart**
YAML is whitespace-sensitive. Indentation must use spaces, not tabs. Validate the file before restarting:

```bash
python3 -c "import yaml; yaml.safe_load(open('librechat.yaml'))"
```

If the command reports an error, fix the indicated line.

**Sign-in window does not open or does not complete**
Allow pop-ups for your LibreChat address and click **Authenticate** again. LibreChat builds the sign-in callback address from your server's public URL, so confirm `DOMAIN_SERVER` in your `.env` is the address users open LibreChat at.

**"Unauthorized" or tools stop working after a while**
The Picsart sign-in has expired. Open the MCP Settings panel, select **picsart-gen-ai**, and use the reinitialize button (circular arrows) to sign in again.

**Tools not visible in chat after sign-in**
Reinitialize the server from the MCP Settings panel, then start a new conversation. If it still fails, check the startup logs for errors about `picsart-gen-ai`.

**"Insufficient credits"**
Ask "What's my Picsart credit balance?" (the `picsart_credits` tool). Top up at [picsart.com](https://picsart.com).

**"Connection refused" in the LibreChat logs**
The LibreChat host cannot reach `api.picsart.com:443`. Check firewall rules and outbound HTTPS access from the server. If you restrict MCP destinations with `mcpSettings.allowedDomains`, add `api.picsart.com`.

## FAQ

**Does every LibreChat user see Picsart tools?**
Yes. MCP servers defined in `librechat.yaml` are instance-wide. Each user signs in with their own Picsart account the first time they use the tools.

**Can I restrict Picsart tools to specific users or roles?**
Yes. LibreChat's role-based access control (RBAC) can restrict which tools appear for which roles. See the [LibreChat RBAC documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/interface#interface-properties) for details.

**Whose credits are used?**
The signed-in user's. Sign-in is per user, so each person's generations spend credits from their own Picsart account. There is no shared key in `librechat.yaml`.

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
