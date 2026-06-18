# Authentication

All interfaces use your Picsart account via **OAuth web login** — there are no API keys to create or paste. Generation spends credits, so it always requires sign-in; browsing the catalog and inspecting models does not.

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

Agents authenticate through the same OAuth web login. After installing the CLI, run `gen-ai login` once on the machine; the agent (Claude Code, Cursor, Windsurf, ChatGPT, Codex) then generates using that authorized session. There are no separate keys to configure in the agent — see [Installation](/guide/installation) and the [MCP Quickstart](/guide/mcp-quickstart).

## What needs sign-in?

| Action | CLI | MCP tool | Sign-in |
|---|---|---|---|
| Browse catalog | `gen-ai models` | `picsart_list_models` | ❌ no |
| Inspect a model | `gen-ai models info <id>` | `picsart_model_info` | ❌ no |
| Quote a cost | `gen-ai pricing <id>` | `picsart_pricing` | ✅ yes |
| Generate | `gen-ai generate` | `picsart_generate` | ✅ yes |
| Drive upload/list | `gen-ai upload` / `list` | `picsart_drive_*` | ✅ yes |
