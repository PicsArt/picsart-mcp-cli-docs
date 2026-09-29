---
description: "Connect Hermes Agent to Picsart with a hosted MCP connection."
---

# Hermes Agent

Merge this entry into `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  picsart:
    url: https://api.picsart.com/gen-ai/mcp
    auth: oauth
```

Use Hermes's MCP authentication controls to sign in, then `/reload-mcp` in an active session to reload the connection. Inspect its tool list before generating. Hosted MCP OAuth is separate from any CLI login.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Hermes Agent documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
