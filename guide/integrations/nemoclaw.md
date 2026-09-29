---
description: "NemoClaw and the Picsart MCP server: why NemoClaw's managed MCP servers, which need a static bearer credential, cannot connect to Picsart's OAuth-only server today, and what to use instead."
---

# NemoClaw

NemoClaw is NVIDIA's framework for running OpenClaw agents inside OpenShell sandboxes ([NemoClaw: Add an MCP Server](https://docs.nvidia.com/nemoclaw/latest/user-guide/openclaw/manage-sandboxes/mcp-servers/add-an-mcp-server)). A sandboxed agent can use remote Streamable HTTP MCP servers, and OpenShell injects the server's credential on the way out so the credential never enters the sandbox.

::: warning NemoClaw cannot connect to the Picsart MCP server today
NemoClaw's managed MCP servers require exactly one static bearer credential per server, passed with `--env`. The Picsart MCP server at `https://api.picsart.com/gen-ai/mcp` authenticates with OAuth sign-in only and does not issue API keys or static tokens for MCP. Until NemoClaw supports OAuth sign-in for managed MCP servers, there is no supported way to connect the two.
:::

## Prerequisites

To use the Picsart MCP server from any host, you need:

1. A Picsart account. You sign in with it when the host connects.
2. Credits on your Picsart account for generations.
3. A host that supports remote (Streamable HTTP) MCP servers with OAuth sign-in.

NemoClaw meets the first half of item 3 (remote Streamable HTTP over HTTPS) but not the OAuth half.

## Setup

NemoClaw registers a managed MCP server with a command of this shape:

```bash
nemoclaw <sandbox-name> mcp add <server-name> --url <https-endpoint> --env <CREDENTIAL_KEY>
```

The `--env` credential is required, and Picsart has no static credential to put there. Do not paste a Picsart API key or a copied OAuth token into it: the Picsart MCP server does not accept API keys, and OAuth tokens expire.

NemoClaw also does not run stdio MCP servers, and the Picsart MCP server has no stdio or locally installed version. There is no `gen-ai-mcp` binary or `@picsart/gen-ai-mcp` package.

### Use OpenClaw directly instead

If you want Picsart tools in an OpenClaw-based agent today, run OpenClaw outside NemoClaw. OpenClaw supports OAuth sign-in for remote MCP servers. See the [OpenClaw integration guide](/guide/integrations/openclaw).

## Use it

Once your agent is connected through a host that supports OAuth, ask it in plain English:

- *"Generate a product shot on a white background using Flux 2 Pro."*
- *"Create a 9:16 social video from this image using Kling V3."*
- *"Remove the background from this product photo."*
- *"How many Picsart credits do I have left?"*

For a full list of available tools, see the [MCP Quickstart](/guide/mcp-quickstart).

## Troubleshooting

**`nemoclaw mcp add` asks for an `--env` credential**

This is expected. NemoClaw requires a bearer credential for every managed MCP server, and the Picsart MCP server does not provide one. See the warning at the top of this page.

**"Unauthorized" or 401 errors after adding the server with a token**

The Picsart MCP server only accepts tokens issued through its OAuth sign-in, and those expire. A static value in `--env` will stop working or never work. Use a host with OAuth support instead.

**Stdio server rejected**

NemoClaw does not start, wrap, or translate stdio MCP servers. The Picsart MCP server is remote only, so no stdio configuration applies.

## FAQ

**Will NemoClaw support the Picsart MCP server in the future?**

It will work once NemoClaw supports OAuth sign-in for managed MCP servers. Check the [NemoClaw documentation](https://docs.nvidia.com/nemoclaw/latest/user-guide/openclaw/manage-sandboxes/mcp-servers/add-an-mcp-server) for changes to supported authentication.

**Can I use a Picsart API key with NemoClaw?**

No. The Picsart MCP server does not accept API keys. It uses OAuth sign-in with your Picsart account.

**Which hosts work with the Picsart MCP server today?**

Any host that supports remote MCP servers with OAuth sign-in, such as [OpenClaw](/guide/integrations/openclaw), [Claude Code](/guide/integrations/claude-code), and [Cursor](/guide/integrations/cursor). See the [integrations index](/guide/integrations/) for the full list.

## Start creating

Connect the Picsart MCP server through a supported host, then visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
