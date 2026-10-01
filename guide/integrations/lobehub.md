---
description: "Picsart MCP transport and OAuth compatibility in LobeHub."
---

# LobeHub

Picsart requires a remote Streamable HTTP connection with OAuth. The endpoint is `https://api.picsart.com/gen-ai/mcp`.

A complete LobeHub setup path for Picsart OAuth has not been verified. Check your installed LobeHub release's MCP transport and OAuth support before adding the server.

For a documented interactive connection, use [Claude Code](/guide/integrations/claude-code) or [Codex](/guide/integrations/codex). A LobeHub marketplace listing for another server does not establish Picsart compatibility.

## Compatibility status

If your release supports the required OAuth flow and reports a signed-in Picsart connection, verify access as follows.

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [LobeHub documentation](https://github.com/lobehub/lobehub), checked September 29, 2026. The host reference was checked for MCP transport support; a complete Picsart OAuth credential flow has not been established.
