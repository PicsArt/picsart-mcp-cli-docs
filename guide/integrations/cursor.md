---
description: "Connect Cursor to Picsart with a hosted MCP connection."
---

# Cursor

Merge this entry into `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` for your user account:

```json
{
  "mcpServers": {
    "picsart": {
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Open Cursor's MCP settings, enable the server, and complete its OAuth sign-in. Use Agent mode with Picsart tools enabled. [Skills](/guide/skills) are optional instructions and do not replace the server connection.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Cursor documentation](https://cursor.com/docs/mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
