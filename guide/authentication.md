---
description: "Choose the authentication method for the CLI, hosted MCP, SDK, or REST API."
---

# Authentication

Authentication depends on the interface. A shared Picsart account does not mean credentials are shared between applications.

| Interface | Authentication |
|---|---|
| CLI and CLI-based skills | Browser sign-in with `gen-ai login` |
| Hosted MCP | Picsart authorization through the MCP client's OAuth flow |
| SDK and REST API | A supported API credential supplied to your application |

## CLI sign-in

```bash
gen-ai login
gen-ai whoami
gen-ai credits
```

`whoami` reports authentication status; `credits` reads your balance. Neither generates media. To remove the stored CLI session:

```bash
gen-ai logout
```

The CLI stores credentials under `~/.gen-ai/`. The default API host uses `credentials.json`; alternate API hosts use separate files. Keep these files out of source control and shared project folders.

For non-interactive execution, CLI 2.78.0 accepts `PICSART_ACCESS_TOKEN` and `PICSART_USER_ID` together. Supply them through your runner's secret store. They are session credentials and can expire. `PICSART_API_KEY` is not a CLI authentication variable. Logging out removes the stored session but does not unset environment credentials.

## Hosted MCP

Connect to `https://api.picsart.com/gen-ai/mcp` and follow the client's Picsart authorization prompt. The client manages this connection's token. Running `gen-ai login` on your laptop does not sign in ChatGPT, a workflow server, or another hosted client.

Use an OAuth-capable MCP client. If a host only offers a static API-key header, do not assume an SDK key is accepted by this endpoint. See the [host guides](/guide/integrations/) for compatibility and setup.

## SDK and REST API

The SDK supports an `apiKey` setting or an authenticated `fetch` implementation. The API credential is sent as a bearer token. Follow the [Picsart API authentication documentation](https://picsart.com/api-platform/docs/authentication) for credential provisioning; access may depend on your account.

`PICSART_API_KEY` is an application environment-variable convention in these examples. Read it in your code and pass it to the SDK. Never put credentials in browser code, public repositories, or example URLs.

## What can I check without generating?

| Check | Command or tool | Authentication |
|---|---|---|
| Installed version | `gen-ai --version` | No |
| Bundled model schema | `gen-ai validate -m flux-2-pro --schema` | No |
| CLI catalog and pricing | `gen-ai models`, `gen-ai pricing flux-2-pro` | CLI session in the tested release |
| MCP catalog and schema | `picsart_model_catalog`, `picsart_model_params` | Client connection policy applies; tools support anonymous lookup |
| MCP parameter validation | `picsart_preflight` | Validation can work without sign-in; a price may be unavailable |
| Credit balance or Drive | CLI account commands or connected tools | Yes |

All checks above avoid media generation. A missing price is not a zero-credit quote.
