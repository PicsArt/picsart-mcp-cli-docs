---
description: "Picsart MCP transport and OAuth compatibility in NemoClaw."
---

# NemoClaw

NemoClaw manages MCP access for sandboxed agents. Its documented command is `nemoclaw`.

The managed MCP setup requires a Streamable HTTP endpoint and a supported bearer credential stored through OpenShell. There is no verified procedure in this guide to provision and refresh Picsart OAuth credentials for that managed path. Do not treat the endpoint alone as a complete setup.

Read [NVIDIA's managed MCP instructions](https://docs.nvidia.com/nemoclaw/latest/user-guide/openclaw/manage-sandboxes/mcp-servers/add-an-mcp-server) for your sandbox adapter. The Picsart endpoint is `https://api.picsart.com/gen-ai/mcp`. The documented static-credential path does not support Picsart browser OAuth. Do not substitute an SDK API key or a copied short-lived token. For interactive OAuth access now, use [Codex](/guide/integrations/codex) or [Claude Code](/guide/integrations/claude-code).

## Compatibility status

If your release supports the required OAuth flow and reports a signed-in Picsart connection, verify access as follows.

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [NemoClaw documentation](https://docs.nvidia.com/nemoclaw/latest/user-guide/openclaw/reference/commands), checked September 29, 2026. The host reference was checked for MCP transport support; a complete Picsart OAuth credential flow has not been established.
