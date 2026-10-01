---
description: "Connect VS Code to Picsart with a hosted MCP connection."
---

# VS Code

Create or update `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "picsart": {
      "type": "http",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

Alternatively, run **MCP: Open User Configuration** from the Command Palette to configure it for your user account. Start the server using VS Code's MCP controls, review the trust prompt, and complete OAuth sign-in. In Copilot Chat, select an agent that can call tools and enable the Picsart tools.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [VS Code documentation](https://code.visualstudio.com/docs/agent-customization/mcp-servers), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
