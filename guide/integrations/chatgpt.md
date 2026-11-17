---
description: "Connect ChatGPT to Picsart with a hosted MCP connection."
---

# ChatGPT

Use a hosted connection. ChatGPT does not run a local `gen-ai-mcp` process just because a JSON configuration or skill ZIP is attached to a conversation.

If Picsart is available in your account's plugin directory, connect that listing. For a custom connection, your account and workspace policy must permit developer mode:

1. Open **Settings**, then **Security and login**, and enable **Developer mode**.
2. Open [ChatGPT Plugins](https://chatgpt.com/plugins) and select the plus button.
3. Enter a name such as Picsart and a description of its media tools.
4. Enter `https://api.picsart.com/gen-ai/mcp` as the public MCP endpoint and create the connection.
5. Complete Picsart OAuth sign-in and review the discovered tools.
6. Add the connection to a conversation from the tools menu.

If these controls are unavailable, check your workspace's policy and the current OpenAI instructions linked below.

## Verify the connection

Ask the agent: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Expect a model schema from `picsart_model_params`; this check spends no generation credits. Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then follow [preflight and generation](/guide/mcp-quickstart#validate-and-estimate). Generation spends Picsart credits. A timeout is not proof that a job failed; poll its returned handle before considering another submission.

If tools are missing, inspect the host's connection status, tool permissions, and authentication errors. A plain HTTP GET to the endpoint does not test MCP initialization.

Setup reference: [ChatGPT documentation](https://developers.openai.com/plugins/deploy/connect-chatgpt), checked September 29, 2026. These steps are based on the host's documented configuration; a complete Picsart sign-in was not exercised in each host during this audit.
