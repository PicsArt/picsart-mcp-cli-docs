---
description: "Authenticate the Picsart gen-ai CLI with gen-ai login, the MCP server through your client or a token, the SDK with an API key, and Picsart Media Studio with in-client OAuth."
---

# Authentication

Every interface authenticates against your Picsart account, and all of them draw on the same credit balance. Which mechanism you use depends on the interface. Generation spends credits, so it always requires sign-in; browsing the catalog and inspecting models does not.

## Authentication methods

How you authenticate depends on which interface you're using.

**SDK and REST API: API key**

The [SDK](/guide/sdk) and [REST API](/guide/rest-api) authenticate with an API key (bearer token). Get your key from [picsart.com/settings](https://picsart.com/settings) and set it as the `PICSART_API_KEY` environment variable. There is no login flow; every request carries the key in the `Authorization` header.

**CLI (and Skills): OAuth web login**

The [CLI](/guide/installation) uses OAuth web login via `gen-ai login`. You authorize once in your browser and the CLI stores a secure session token locally. No key to copy or rotate. [Skills](/guide/skills) run `gen-ai` commands, so they use this same session.

**MCP server: sign in through your client, or a token**

The [MCP server](/guide/mcp-quickstart) is independent of the CLI. With the remote server (`https://api.picsart.com/gen-ai/mcp`), your client runs the Picsart OAuth sign-in when it first connects. The local server (`gen-ai-mcp`) takes a `PICSART_TOKEN` in its MCP config, and can also reuse a signed-in CLI session on the same machine if you happen to have one. See [MCP authentication](/guide/mcp-quickstart#authentication).

**Picsart Media Studio: sign in through your client**

[Media Studio](/guide/media-studio/) runs on Picsart's servers rather than on your machine, so it does not use the CLI at all. You add it to your client once and sign in to Picsart in the browser window it opens. There is nothing to install and **no `gen-ai login` step**.

All of these draw from the same Picsart account and the same credit balance.

## Sign in

```bash
gen-ai login      # OAuth web login — opens your browser to confirm your identity
gen-ai whoami     # shows the current user
gen-ai credits    # remaining credits on your account
gen-ai logout     # clears credentials
```

`gen-ai login` runs the OAuth web flow: the CLI opens your browser, you authorize once, and a secure token is stored locally — no password is saved and no credentials are exposed. Credentials are kept at `~/.gen-ai/credentials.json` (permissions `600`). The CLI refreshes the access token automatically when it is about to expire; if refresh fails, run `gen-ai login` again. If you run a command while signed out in an interactive terminal, the CLI starts the login flow for you.

This sign-in covers the CLI and [Skills](/guide/skills), which run `gen-ai` commands.

## CI and headless environments

Where no browser is available (CI, Docker, a remote shell), skip `gen-ai login` and set two environment variables instead:

```bash
export PICSART_ACCESS_TOKEN="<access token>"
export PICSART_USER_ID="<picsart user id>"
gen-ai whoami     # confirms the env credentials are picked up
```

These take priority over `~/.gen-ai/credentials.json`. The CLI cannot refresh an env-supplied token, so replace it when it expires. In a non-interactive shell with neither env vars nor stored credentials, commands fail with `Not authenticated` instead of opening a browser.

## Agents (Skills & MCP)

- **Skills** run the CLI, so they use its `gen-ai login` session. Run it once on the machine and the agent (Claude Code, Cursor, Windsurf, ChatGPT, Codex) generates with it.
- **The MCP server** does not need the CLI. The remote server signs in through your client; the local server uses a `PICSART_TOKEN` in its config (or a CLI session, if one exists). See the [MCP Quickstart](/guide/mcp-quickstart#authentication).
- **[Media Studio](/guide/media-studio/)** is a separate remote connector: the agent signs in to it directly and `gen-ai login` plays no part.

## What needs sign-in?

| Action | CLI | MCP tool | Sign-in |
|---|---|---|---|
| Browse catalog | `gen-ai models` | `picsart_list_models` | CLI: ✅ yes¹ · MCP: ❌ no |
| Inspect a model | `gen-ai models info <id>` | `picsart_model_params` | ❌ no |
| Validate params | `gen-ai validate -m <id>` | `picsart_preflight` | ❌ no |
| Quote a cost | `gen-ai pricing <model>` | `picsart_preflight` | ✅ yes² |
| Generate | `gen-ai generate` | `picsart_generate` | ✅ yes |
| Drive upload/list | `gen-ai upload` / `list` | `picsart_drive` | ✅ yes |

¹ The CLI's `gen-ai models` list includes per-account credit prices, so it needs a session. `gen-ai models info` and `gen-ai models compare` do not.
² `picsart_preflight` validates params without sign-in; the credit quote is a per-user lookup, so unauthenticated calls return `credits: null`.

For the **SDK and REST API**, a valid `PICSART_API_KEY` is required on every request. There is no unauthenticated mode.

## FAQ

**Do the SDK and CLI use the same credentials?**

No. The SDK and REST API use an API key (bearer token) from your account settings. The CLI uses an OAuth session from `gen-ai login`. All of them draw from the same Picsart account and the same credit balance.

**Do I need the CLI, or an API key, for MCP or Skills?**

Skills need the CLI and its `gen-ai login` session — no API key. The MCP server needs neither the CLI nor an API key: the remote server signs you in through your client, and the local server takes a `PICSART_TOKEN` in its config (or reuses a CLI session if one exists on the machine).

[Media Studio](/guide/media-studio/) is separate: you add it to your client and sign in to Picsart there. It needs neither the CLI nor an API key.

**Where are my credentials stored?**

At `~/.gen-ai/credentials.json` with permissions `600` (readable only by your user). The CLI auto-refreshes the access token when it expires. If refresh fails, run `gen-ai login` again. `PICSART_ACCESS_TOKEN` + `PICSART_USER_ID`, when set, override the file.

**Can multiple users share one machine?**

Each user account has its own `~/.gen-ai/credentials.json` under their home directory. Credentials are not shared across OS users.

**How do I log out?**

Run `gen-ai logout`. This deletes the local credential file. The next command that needs a session starts the login flow again (in an interactive terminal). If `PICSART_ACCESS_TOKEN` and `PICSART_USER_ID` are set, the shell stays authenticated until you unset them.

**What does `gen-ai whoami` show?**

The email address and user ID (UID) of the currently authenticated account, or "Not logged in". Add `--json` for `{ "email", "uid" }`.
