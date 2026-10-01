---
description: "Connect OpenClaw to Picsart with a hosted MCP connection."
---

# OpenClaw

Configure the OpenClaw-managed MCP registry:

```bash
openclaw mcp add picsart --url https://api.picsart.com/gen-ai/mcp --transport streamable-http
openclaw mcp configure picsart --auth oauth
openclaw mcp login picsart
openclaw mcp probe picsart
```

These commands configure outbound servers for eligible OpenClaw runtimes. They do not configure the separate mcporter registry. A saved entry alone does not prove a connection; `probe` performs the live capability check. Enable Picsart tools in the session that will use them.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [OpenClaw documentation](https://docs.openclaw.ai/cli/mcp/registry), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
