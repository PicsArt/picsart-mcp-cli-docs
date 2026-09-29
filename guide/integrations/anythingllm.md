---
description: "Picsart MCP transport and OAuth compatibility in AnythingLLM."
---

# AnythingLLM

AnythingLLM stores MCP definitions in `plugins/anythingllm_mcp_servers.json` under its storage directory. Open that file through the Agent Skills MCP controls for your installation and merge:

```json
{
  "mcpServers": {
    "picsart": {
      "type": "streamable",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Refresh the server from Agent Skills and inspect its status. The transport value is `streamable`.

The linked host guide documents remote transport and headers, but does not establish a verified Picsart OAuth sign-in flow. Treat this configuration as a transport setup, not a working authenticated integration. If your release cannot complete Picsart OAuth, use an [OAuth-capable client](/guide/integrations/claude-code). A CLI login or SDK API key is not a substitute.

## Compatibility status

If your release supports the required OAuth flow and reports a signed-in Picsart connection, verify access as follows.

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [AnythingLLM documentation](https://docs.anythingllm.com/mcp-compatibility/overview), checked September 29, 2026. The host reference was checked for MCP transport support; a complete Picsart OAuth credential flow has not been established.
