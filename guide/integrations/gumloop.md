---
description: "Connect Gumloop to Picsart with a hosted MCP connection."
---

# Gumloop

In **Settings > Connectors**, open the menu next to **Add Connector** and choose **Add MCP Connector**.

Select **Public URL**, enter `https://api.picsart.com/gen-ai/mcp`, and choose **Connect**. When OAuth is detected, select **Authenticate** and sign in to Picsart. Choose the credential scope appropriate to the account that should use it.

Return to your agent's **Connectors** section, select **Add Connector**, and add the saved Picsart connection. Check the available tools before including generation in a recurring workflow.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Gumloop documentation](https://docs.gumloop.com/nodes/mcp/custom_mcp_servers), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
