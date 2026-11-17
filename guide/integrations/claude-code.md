---
description: "Connect Claude Code to Picsart with a hosted MCP connection."
---

# Claude Code

Run this command from the project where you want to use Picsart:

```bash
claude mcp add --transport http picsart https://api.picsart.com/gen-ai/mcp
```

Claude Code uses local project scope by default. Add `--scope user` if you want the connection available across your projects. Start Claude Code, run `/mcp`, select Picsart, and complete OAuth sign-in. A prior `gen-ai login` does not authenticate this connection.

For optional CLI workflow instructions, see [Skills](/guide/skills).

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [Claude Code documentation](https://code.claude.com/docs/en/mcp), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
