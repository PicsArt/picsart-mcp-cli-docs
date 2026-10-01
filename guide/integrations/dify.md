---
description: "Connect Dify to Picsart with a hosted MCP connection."
---

# Dify

Dify added native MCP support in version 1.6.0. Open **Tools > MCP > Add MCP Server**, enter `https://api.picsart.com/gen-ai/mcp`, and provide a display name and server identifier such as Picsart and `picsart`.

Complete the server authorization flow, then add the discovered tools to an agent or workflow. Select the tools needed for that workflow. Validate inputs with `picsart_preflight` before running a generation node, and preserve the returned job handle for polling.

This is an HTTP server connection; installing a local command in a Dify container is not required.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Dify documentation](https://dify.ai/blog/v1-6-0-built-in-two-way-mcp-support), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
