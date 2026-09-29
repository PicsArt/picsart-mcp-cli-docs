---
description: "Authenticate the Picsart gen-ai CLI with OAuth web login, the SDK with an API key, and the hosted MCP server and Picsart Media Studio by signing in through your agent."
---

# Authentication

Every interface authenticates against your Picsart account, and all of them draw on the same credit balance. Which mechanism you use depends on the interface. Generation spends credits, so it always requires sign-in; browsing the catalog and inspecting models does not.

## Three authentication methods

How you authenticate depends on which interface you're using.

**SDK and REST API: API key**

The [SDK](/guide/sdk) and [REST API](/guide/rest-api) authenticate with an API key (bearer token). Get your key from [picsart.com/settings](https://picsart.com/settings) and set it as the `PICSART_API_KEY` environment variable. There is no login flow; every request carries the key in the `Authorization` header.

**CLI and Skills: OAuth web login**

The [CLI](/guide/installation) and [Skills](/guide/skills) use OAuth web login via `gen-ai login`. You authorize once in your browser and the CLI stores a secure session token locally. No key to copy or rotate.

**MCP server and Picsart Media Studio: sign in through your agent**

The [MCP server](/guide/mcp-quickstart) and [Media Studio](/guide/media-studio/) run on Picsart's servers rather than on your machine, so they do not use the CLI at all. You add the server to your agent once and sign in to Picsart in the browser window the agent opens. There is nothing to install, **no `gen-ai login` step**, and no API key.

All three methods draw from the same Picsart account and the same credit balance.

## Sign in

```bash
gen-ai login      # OAuth web login — opens your browser to confirm your identity
gen-ai whoami     # shows the current user
gen-ai credits    # remaining credits on your account
gen-ai logout     # clears credentials
```

`gen-ai login` runs the OAuth web flow: the CLI opens your browser, you authorize once, and a secure token is stored locally — no password is saved and no credentials are exposed. Credentials are kept at `~/.gen-ai/credentials.json` (permissions `600`), and the CLI auto-refreshes the access token on a `401`; if refresh fails, run `gen-ai login` again.

This sign-in covers the CLI and [Skills](/guide/skills), because Skills run the same CLI. It does not apply to MCP.

## Agents (Skills & MCP)

**Skills** run the CLI, so they use the CLI's session. After installing the CLI, run `gen-ai login` once on the machine; the agent then generates using that authorized session.

**MCP** does not use the CLI or its credentials file. The first time your agent (Claude, Claude Code, Cursor, VS Code, Codex, ChatGPT, and others) connects to `https://api.picsart.com/gen-ai/mcp`, the server tells it sign-in is required. The agent opens Picsart's sign-in page in your browser, you approve access, and the agent stores the session and sends it with every tool call. If the session expires, re-authenticate the server from your agent's MCP or connector settings. See the [MCP Quickstart](/guide/mcp-quickstart) and the per-agent [integration guides](/guide/integrations/).

[Media Studio](/guide/media-studio/) works the same way as MCP: the agent signs in to it directly and `gen-ai login` plays no part.

## What needs sign-in?

| Action | CLI | MCP tool | Sign-in |
|---|---|---|---|
| Browse catalog | `gen-ai models` | `picsart_list_models` | ❌ no |
| Inspect a model | `gen-ai models info <id>` | `picsart_model_params` | ❌ no |
| Validate + quote a cost | `gen-ai pricing <model>` | `picsart_preflight` | ✅ yes¹ |
| Generate | `gen-ai generate` | `picsart_generate` | ✅ yes |
| Drive upload/list | `gen-ai upload` / `list` | `picsart_drive` | ✅ yes |

¹ `picsart_preflight` validates params without sign-in; the credit quote is a per-user lookup, so unauthenticated calls return `credits: null`.

In practice, agents sign in when they first connect to the MCP server, so every MCP tool call is made as you. The table shows which calls actually need your account.

For the **SDK and REST API**, a valid `PICSART_API_KEY` is required on every request. There is no unauthenticated mode.

## FAQ

**Do the SDK and CLI use the same credentials?**

No. The SDK and REST API use an API key (bearer token) from your account settings. The CLI uses an OAuth session from `gen-ai login`. The MCP server uses an OAuth session your agent obtains when it connects. All of them draw from the same Picsart account and the same credit balance.

**Do I need a separate API key for MCP or Skills?**

No. The MCP server and [Media Studio](/guide/media-studio/) sign you in through your agent; they need neither the CLI nor an API key. Skills use the CLI's `gen-ai login` session.

**Where are my credentials stored?**

At `~/.gen-ai/credentials.json` with permissions `600` (readable only by your user). The CLI auto-refreshes the access token when it expires. If refresh fails, run `gen-ai login` again.

**Can multiple users share one machine?**

Each user account has its own `~/.gen-ai/credentials.json` under their home directory. Credentials are not shared across OS users.

**How do I log out?**

Run `gen-ai logout`. This deletes the local credential file. The next generation attempt will prompt you to log in again.

**What does `gen-ai whoami` show?**

The email address and account ID of the currently authenticated user, and the expiry time of the current access token.
