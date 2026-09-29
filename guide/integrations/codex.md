---
description: "Connect Codex to Picsart with a hosted MCP connection."
---

# Codex

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

Setup reference: [Codex documentation](https://developers.openai.com/codex/mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
