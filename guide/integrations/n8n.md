---
description: "Connect n8n to Picsart with a hosted MCP connection."
---

# n8n

Add an **MCP Client Tool** node to an AI Agent. Use `https://api.picsart.com/gen-ai/mcp` as the server endpoint and an installed node version that supports Streamable HTTP.

Choose **MCP OAuth2 API** authentication. In the credential, leave dynamic client registration enabled and let n8n discover the resource URL, then complete the browser authorization flow. If your node only supports the older SSE transport, update it before using this endpoint.

Select the Picsart tools the agent needs. Run the schema check below manually before enabling an automated workflow. For generation, store the returned job handle and poll it; do not let workflow retries repeat a submission whose outcome is unknown.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [n8n documentation](https://docs.n8n.io/integrations/builtin/credentials/mcp/), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
