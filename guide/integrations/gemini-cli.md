---
description: "Connect Gemini CLI to Picsart with a hosted MCP connection."
---

# Gemini CLI

Merge this entry into `~/.gemini/settings.json`:

```json
{
  "mcpServers": {
    "picsart": {
      "httpUrl": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

`httpUrl` selects Streamable HTTP. Gemini CLI's `url` key selects the older SSE transport and is not interchangeable.

Start Gemini CLI, run `/mcp`, then use `/mcp auth picsart` to sign in if authentication is required. Check `/mcp` again for connection status and available tools.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Gemini CLI documentation](https://geminicli.com/docs/tools/mcp-server/), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
