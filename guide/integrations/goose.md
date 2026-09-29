---
description: "Connect Goose to Picsart with a hosted MCP connection."
---

# Goose

Run:

```bash
goose configure
```

Choose **Add Extension**, then **Remote Extension (Streamable HTTP)**. Name it Picsart and enter `https://api.picsart.com/gen-ai/mcp`. Complete the OAuth flow when requested and enable the extension for your session.

In Goose Desktop, use **Extensions**, then **Add custom extension**, and select the remote HTTP transport. A local command is not needed for this hosted server.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Goose documentation](https://goose-docs.ai/docs/getting-started/using-extensions/), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
