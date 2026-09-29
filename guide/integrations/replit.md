---
description: "Connect Replit to Picsart with a hosted MCP connection."
---

# Replit

Open [Replit Integrations](https://replit.com/integrations) and find **MCP Servers for Replit Agent**.

1. Select **Add MCP server**.
2. Enter Picsart as the display name and `https://api.picsart.com/gen-ai/mcp` as the server URL.
3. Select **Test & save** and complete the OAuth flow.
4. Check the saved connection's status and ask Agent to use Picsart.

Do not put credentials into an install-link URL or project source code.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Replit documentation](https://docs.replit.com/build/connect-via-mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
