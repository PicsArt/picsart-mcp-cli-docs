---
description: "Connect AnythingLLM Desktop to Picsart using an OAuth bridge."
---

# AnythingLLM

AnythingLLM's remote transport configuration does not by itself complete Picsart OAuth. On Desktop, use the `mcp-remote` bridge, which runs locally and handles browser sign-in. Install Node.js so `npx` is available to the app.

Open `plugins/anythingllm_mcp_servers.json` in the app's storage directory through Agent Skills. Merge this entry into the existing `mcpServers` object:

```json
{
  "mcpServers": {
    "picsart": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://api.picsart.com/gen-ai/mcp"]
    }
  }
}
```

`npx` downloads and runs the third-party bridge. Refresh the server in Agent Skills, complete Picsart sign-in in the browser, and confirm the connection is running. This procedure requires a browser available to the bridge; it does not establish a supported setup for a headless Docker deployment. No Picsart CLI installation or SDK API key is needed.

## Verify the connection

Ask: “Use Picsart to show the parameters for `flux-2-pro`. Do not generate anything.” Confirm the host also reports a signed-in connection, since schema discovery alone does not prove authorization.

Then [validate and estimate](/guide/mcp-quickstart#validate-and-estimate) before generation, which spends credits. If sign-in fails, inspect the bridge's error and follow its authentication troubleshooting. Do not delete credentials for unrelated MCP connections.

Setup references: [AnythingLLM documentation](https://docs.anythingllm.com/mcp-compatibility/overview) and [mcp-remote](https://github.com/punkpeye/mcp-remote). The Desktop bridge procedure was incorporated from the upstream documentation review on September 30, 2026; a complete Picsart sign-in was not exercised here.
