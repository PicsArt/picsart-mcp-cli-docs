---
description: "Connect LibreChat to Picsart with a hosted MCP connection."
---

# LibreChat

Merge this entry into your deployment's `librechat.yaml`:

```yaml
mcpServers:
  picsart:
    type: streamable-http
    url: https://api.picsart.com/gen-ai/mcp
    requiresOAuth: true
```

Restart the deployment through its normal process after changing the file. Enable the server for the intended users or agents and complete OAuth from the user account that will call the tools. Administrative installation does not grant every user the same Picsart session. Inspect startup logs if the YAML or connection fails.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [LibreChat documentation](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/mcp_servers), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
