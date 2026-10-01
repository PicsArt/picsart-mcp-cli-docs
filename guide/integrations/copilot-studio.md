---
description: "Connect Copilot Studio to Picsart with a hosted MCP connection."
---

# Copilot Studio

Open the agent's **Tools** page and select **Add a tool > New tool > Model Context Protocol**.

Enter Picsart as the server name, describe the media operations it provides, and set the URL to `https://api.picsart.com/gen-ai/mcp`. Select **OAuth 2.0** and use **Dynamic discovery** when the server's registration flow is accepted. Complete the wizard, create the user connection, and add the server to the agent.

Copilot Studio uses Streamable HTTP for MCP. If discovery or registration fails, inspect the reported error and your tenant's connector policies. Do not replace OAuth with a generic Picsart API key unless Picsart explicitly supports that credential for this endpoint. Test in the agent before publishing it.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Copilot Studio documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/mcp-add-existing-server-to-agent), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
