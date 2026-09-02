---
description: "Authenticate the Picsart gen-ai CLI and MCP with OAuth web login, the SDK with an API key, and Picsart Media Studio with in-client OAuth."
---

# Authentication

Every interface authenticates against your Picsart account, and all of them draw on the same credit balance. Which mechanism you use depends on the interface. Generation spends credits, so it always requires sign-in; browsing the catalog and inspecting models does not.

## Three authentication methods

How you authenticate depends on which interface you're using.

**SDK and REST API: API key**

The [SDK](/guide/sdk) and [REST API](/guide/rest-api) authenticate with an API key (bearer token). Get your key from [picsart.com/settings](https://picsart.com/settings) and set it as the `PICSART_API_KEY` environment variable. There is no login flow; every request carries the key in the `Authorization` header.

**CLI and MCP: OAuth web login**

The [CLI](/guide/installation) and [MCP](/guide/mcp-quickstart) use OAuth web login via `gen-ai login`. You authorize once in your browser and the CLI stores a secure session token locally. No key to copy or rotate.

**Picsart Media Studio: sign in through your client**

[Media Studio](/guide/media-tools) runs on Picsart's servers rather than on your machine, so it does not use the CLI at all. You add it to your client once and sign in to Picsart in the browser window it opens. There is nothing to install and **no `gen-ai login` step**.

All three methods draw from the same Picsart account and the same credit balance.

## Sign in

```bash
gen-ai login      # OAuth web login — opens your browser to confirm your identity
gen-ai whoami     # shows the current user
gen-ai credits    # remaining credits on your account
gen-ai logout     # clears credentials
```

`gen-ai login` runs the OAuth web flow: the CLI opens your browser, you authorize once, and a secure token is stored locally — no password is saved and no credentials are exposed. Credentials are kept at `~/.gen-ai/credentials.json` (permissions `600`), and the CLI auto-refreshes the access token on a `401`; if refresh fails, run `gen-ai login` again.

This single sign-in covers all three surfaces — the CLI, [Skills](/guide/skills), and [MCP](/guide/mcp-quickstart) — because Skills and MCP drive the same CLI engine.

## Agents (Skills & MCP)

For the CLI-backed surfaces, agents authenticate through the same OAuth web login. After installing the CLI, run `gen-ai login` once on the machine; the agent (Claude Code, Cursor, Windsurf, ChatGPT, Codex) then generates using that authorized session. There are no separate keys to configure in the agent — see [Installation](/guide/installation) and the [MCP Quickstart](/guide/mcp-quickstart).

[Media Studio](/guide/media-tools) is the exception: it is a remote connector, so the agent signs in to it directly and `gen-ai login` plays no part.

## What needs sign-in?

| Action | CLI | MCP tool | Sign-in |
|---|---|---|---|
| Browse catalog | `gen-ai models` | `picsart_list_models` | ❌ no |
| Inspect a model | `gen-ai models info <id>` | `picsart_model_params` | ❌ no |
| Validate + quote a cost | `gen-ai pricing <model>` | `picsart_preflight` | ✅ yes¹ |
| Generate | `gen-ai generate` | `picsart_generate` | ✅ yes |
| Drive upload/list | `gen-ai upload` / `list` | `picsart_drive` | ✅ yes |

¹ `picsart_preflight` validates params without sign-in; the credit quote is a per-user lookup, so unauthenticated calls return `credits: null`.

For the **SDK and REST API**, a valid `PICSART_API_KEY` is required on every request. There is no unauthenticated mode.

## FAQ

**Do the SDK and CLI use the same credentials?**

No. The SDK and REST API use an API key (bearer token) from your account settings. The CLI and MCP use an OAuth session from `gen-ai login`. Both draw from the same Picsart account and the same credit balance.

**Do I need a separate API key for MCP or Skills?**

No. The CLI, the gen-ai MCP server, and Skills all share one OAuth session — run `gen-ai login` once and it covers all three.

[Media Studio](/guide/media-tools) is separate: you add it to your client and sign in to Picsart there. It needs neither the CLI nor an API key.

**Where are my credentials stored?**

At `~/.gen-ai/credentials.json` with permissions `600` (readable only by your user). The CLI auto-refreshes the access token when it expires. If refresh fails, run `gen-ai login` again.

**Can multiple users share one machine?**

Each user account has its own `~/.gen-ai/credentials.json` under their home directory. Credentials are not shared across OS users.

**How do I log out?**

Run `gen-ai logout`. This deletes the local credential file. The next generation attempt will prompt you to log in again.

**What does `gen-ai whoami` show?**

The email address and account ID of the currently authenticated user, and the expiry time of the current access token.
