---
description: "Connect Windsurf to Picsart with a hosted MCP connection."
---

# Windsurf

Open Cascade's MCP settings and its configuration editor. Merge this entry into `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "picsart": {
      "serverUrl": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Save, refresh the MCP connection in Cascade, and complete OAuth sign-in when prompted. A team administrator may need to allow the server.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Windsurf documentation](https://docs.devin.ai/desktop/cascade/mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
