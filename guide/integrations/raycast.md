---
description: "Connect Raycast to Picsart with a hosted MCP connection."
---

# Raycast

Raycast documents MCP as a Pro feature. In Raycast, run **Install MCP Server** or use **Install New Server** from **Manage MCP Servers**.

Set the name to Picsart, transport to **HTTP**, and URL to `https://api.picsart.com/gen-ai/mcp`. Use OAuth discovery and complete **Sign In**. If your deployment requires static client registration, obtain its client details from the service administrator rather than inventing them.

Use **Manage MCP Servers** to inspect the status and tool list. Mention `@picsart` in AI Chat or Quick AI to select the connection.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Raycast documentation](https://manual.raycast.com/ai/model-context-protocol), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
