---
description: "Connect the Codex desktop app or CLI to Picsart through hosted MCP."
---

# Codex app and CLI

Choose the surface you are using. These instructions configure a remote Picsart connection; they do not require the Picsart CLI. You need access to Codex, permission to add an MCP server on the selected host, and a Picsart account for OAuth. Generation uses Picsart credits; check [pricing](/guide/pricing) before submitting.

## Desktop app

In the desktop app's settings, open **MCP servers**, select **Add server**, and choose **Streamable HTTP**. Name the server `picsart` and enter `https://api.picsart.com/gen-ai/mcp`. Save, restart the server when prompted, and select **Authenticate** to complete Picsart sign-in.

The app, Codex CLI, and IDE extension share MCP configuration for the same Codex host. If you use a remote host, configure and verify that host rather than assuming your local connection is available there. A ChatGPT web plugin listing is a separate setup path; use the [ChatGPT guide](/guide/integrations/chatgpt) for that surface.

## Codex CLI

Add the remote server, then sign in:

```bash
codex mcp add picsart --url https://api.picsart.com/gen-ai/mcp
codex mcp login picsart
codex mcp list
```

Alternatively, merge this entry into `~/.codex/config.toml` and run the login command:

```toml
[mcp_servers.picsart]
url = "https://api.picsart.com/gen-ai/mcp"
```

The configuration format is TOML. Preserve existing server entries. Use `/mcp` in Codex CLI to inspect the connection and tools.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup references: [MCP configuration](https://learn.chatgpt.com/docs/extend/mcp) and [desktop developer settings](https://learn.chatgpt.com/docs/developer-settings), checked September 30, 2026. CLI command syntax was checked with `codex-cli 0.158.0-alpha.2`. The app procedure was checked against official documentation, not a version-specific signed-in UI test. Menu labels can differ by app release.
