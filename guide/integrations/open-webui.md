---
description: "Connect Open WebUI to Picsart with a hosted MCP connection."
---

# Open WebUI

Use Open WebUI 0.6.31 or newer. An administrator must add the connection. In container deployments, configure a persistent `WEBUI_SECRET_KEY` so stored OAuth credentials remain readable after restart.

1. Open **Settings > Admin > Integrations**.
2. Under **External Tool Servers**, select **Add Connection**.
3. Set the type to **MCP (Streamable HTTP)** and URL to `https://api.picsart.com/gen-ai/mcp`.
4. Choose **OAuth 2.1**, register the client, and save the connection.
5. In a chat, enable the tool from the integrations menu and complete Picsart sign-in.

The OAuth discovery check only checks discovery metadata. It does not list tools or prove a tool call will work. Each user connects their own account; do not configure an OAuth tool as a default tool before that user has authenticated.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Open WebUI documentation](https://docs.openwebui.com/features/extensibility/mcp/), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
