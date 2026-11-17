---
description: "Picsart MCP transport and OAuth compatibility in LM Studio."
---

# LM Studio

LM Studio introduced MCP support in 0.3.17. In the chat's **Program** panel, choose **Install > Edit mcp.json** and merge:

```json
{
  "mcpServers": {
    "picsart": {
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Use a model capable of calling tools. The linked LM Studio guide documents remote URLs and headers, but does not establish a complete Picsart OAuth flow for every release. Confirm OAuth support in your installed release before relying on this connection. If it cannot complete Picsart sign-in, use an [OAuth-capable client](/guide/integrations/codex); do not paste an unrelated SDK API key into the MCP header.

## Compatibility status

If your release supports the required OAuth flow and reports a signed-in Picsart connection, verify access as follows.

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [LM Studio documentation](https://lmstudio.ai/docs/app/mcp), checked September 29, 2026. The host reference was checked for MCP transport support; a complete Picsart OAuth credential flow has not been established.
