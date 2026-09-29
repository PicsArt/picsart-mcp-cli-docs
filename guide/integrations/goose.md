---
description: "Connect Picsart to Goose — add the MCP server as a Goose extension and generate images, video, and audio directly inside your agent session."
---

# Goose

Goose is an open-source AI agent that supports MCP servers as extensions. Add the Picsart MCP server once and Goose can generate image, video, and audio across 201 models from any session.

## Prerequisites

**For MCP** (no CLI needed): install the server package — `npm install -g @picsart/gen-ai-mcp`, which provides the `gen-ai-mcp` command — and authenticate it as described in [MCP authentication](/guide/mcp-quickstart#authentication).

## Method 1: goose configure (recommended)

Run the interactive setup:

```bash
goose configure
```

Select **Add Extension**, then **Command-line Extension**. When prompted for a command, enter:

```
gen-ai-mcp
```

Provide a name (`picsart-gen-ai`) and description when asked. Goose saves the extension and enables it for all future sessions.

## Method 2: Config file

Add the following entry to `~/.config/goose/config.yaml`:

```yaml
extensions:
  picsart-gen-ai:
    type: stdio
    name: picsart-gen-ai
    enabled: true
    cmd: gen-ai-mcp
    args: []
    env_keys: []
    envs: {}
    timeout: 300
```

Restart Goose after saving.

## Method 3: Mid-session (current session only)

To add Picsart tools to an active Goose session without changing your default config:

```
/extension gen-ai-mcp
```

Note: this only applies to the current session. To keep the extension enabled between sessions, use Method 1 or 2.

## Method 4: Start a session with the extension

```bash
goose session --with-extension "gen-ai-mcp"
```

## Use it

Once connected, ask Goose in plain English:

- *"Generate a 16:9 hero image for a spring campaign using Flux 2 Pro."*
- *"Remove the background from this product photo and save it to Drive."*
- *"What video models are available and what does each one cost?"*
- *"Generate four ad image variants with Recraft V4, white background, square format."*

Goose calls the Picsart MCP tools automatically and returns the result URL.

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog and example tool calls.

## Troubleshooting

**`gen-ai-mcp` is not found.**

The binary is not on the PATH Goose sees. Use the absolute path instead:

```yaml
extensions:
  picsart-gen-ai:
    type: stdio
    name: picsart-gen-ai
    enabled: true
    cmd: /Users/you/.local/bin/gen-ai-mcp
    args: []
    env_keys: []
    envs: {}
    timeout: 300
```

Find the path with `which gen-ai-mcp`.

**Tools do not appear after adding the extension.**

Restart Goose after modifying the config file. Extensions added via `goose configure` take effect on the next session start.

**Generation fails with "unauthorized".**

For MCP, check the server's authentication — set or refresh `PICSART_TOKEN` in its config (see [MCP authentication](/guide/mcp-quickstart#authentication)) and restart Goose.

## FAQ

**Does Goose need a separate Picsart account or API key?**

No. It uses your Picsart account: pass `PICSART_TOKEN` in the extension's environment, or let the server reuse a signed-in gen-ai CLI session if you have one. See [MCP authentication](/guide/mcp-quickstart#authentication).

**Can I use Goose and the CLI at the same time?**

Yes. They are independent and draw on the same credit balance. Running them in parallel is fine.

**Which models work in Goose?**

All 201 models in the catalog. Use `picsart_list_models` to filter by mode or provider, or browse the [Model Catalog](/reference/catalog).
