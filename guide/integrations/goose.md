---
description: "Connect Picsart to Goose: add the hosted Picsart MCP server as a remote extension, sign in with your Picsart account, and generate images, video, and audio inside your agent session."
---

# Goose

Goose is an open-source AI agent that supports MCP servers as extensions ([Goose extensions documentation](https://goose-docs.ai/docs/getting-started/using-extensions/)). The Picsart MCP server is hosted at `https://api.picsart.com/gen-ai/mcp`, so you add it to Goose as a remote (Streamable HTTP) extension. There is nothing to install locally. Add it once and Goose can generate image, video, and audio with models available on the MCP server from any session.

## Prerequisites

1. A Picsart account. You sign in with it the first time Goose connects.
2. Goose installed (CLI or Desktop).
3. Credits on your Picsart account for generations.

You do not need the gen-ai CLI or an API key to use the Picsart MCP server.

## Method 1: goose configure (recommended)

Run the interactive setup:

```bash
goose configure
```

1. Select **Add Extension**, then **Remote Extension (Streamable HTTP)**.
2. Name it `picsart-gen-ai`.
3. When prompted for the URL, enter:

```
https://api.picsart.com/gen-ai/mcp
```

4. Accept the defaults for the remaining prompts. You do not need to add any headers.

Goose saves the extension and enables it for future sessions. The first time Goose connects, it opens a Picsart sign-in page in your browser. Sign in and approve access, then return to Goose.

## Method 2: Config file

Add the following entry to `~/.config/goose/config.yaml`:

```yaml
extensions:
  picsart-gen-ai:
    name: picsart-gen-ai
    type: streamable_http
    uri: https://api.picsart.com/gen-ai/mcp
    enabled: true
    timeout: 300
```

Goose uses `uri` (not `url`) and `streamable_http` (with an underscore) for remote extensions. Goose obtains an OAuth client automatically, so you do not need to set `client_id` or any headers.

Restart Goose after saving. Sign in to Picsart in the browser window that opens on first connect.

## Method 3: Goose Desktop

1. Open the sidebar and click **Extensions**.
2. Click **Add custom extension**.
3. Choose the Streamable HTTP type, name it `picsart-gen-ai`, and enter `https://api.picsart.com/gen-ai/mcp` as the endpoint.
4. Click **Add**, then sign in to Picsart when the browser window opens.

## Method 4: Start a session with the extension

To use Picsart tools in one session without changing your default config:

```bash
goose session --with-streamable-http-extension "https://api.picsart.com/gen-ai/mcp"
```

This only applies to that session. To keep the extension enabled between sessions, use Method 1, 2, or 3.

### Verify the connection

Start a Goose session and ask:

> *"List the available Picsart video models."*

Goose should call `picsart_model_catalog` or `picsart_list_models` and return results. If it does not, see [Troubleshooting](#troubleshooting).

## Use it

Once connected, ask Goose in plain English:

- *"Generate a 16:9 hero image for a spring campaign using Flux 2 Pro."*
- *"Remove the background from this product photo and save it to Drive."*
- *"What video models are available and what does each one cost?"*
- *"Generate four ad image variants with Recraft V4, white background, square format."*

Goose calls the Picsart MCP tools automatically and returns the result URL.

See the [MCP Quickstart](/guide/mcp-quickstart) for the full tool catalog and example tool calls.

## Troubleshooting

**The Picsart sign-in window did not open.**

Restart Goose so it reconnects to the extension. If the browser still does not open, remove the extension and add it again. Goose serves the OAuth callback on `127.0.0.1`, so make sure nothing on your machine blocks local loopback connections.

**Tools do not appear after adding the extension.**

Restart Goose after modifying the config file. Extensions added via `goose configure` take effect on the next session start. Confirm the entry uses `type: streamable_http` and `uri:`, not `url:`.

**Generation fails with "unauthorized".**

Your Picsart sign-in has expired. Restart Goose, or remove and re-add the extension, and sign in again when the browser window opens.

**Generation fails with insufficient credits.**

Ask Goose *"What's my Picsart credit balance?"*. It calls `picsart_credits`. Top up at [picsart.com](https://picsart.com) if needed.

**Connection times out.**

Your network must allow outbound HTTPS to `api.picsart.com` on port 443. On a corporate network, check your proxy or firewall settings.

## FAQ

**Does Goose need a Picsart API key?**

No. Goose signs in with your Picsart account through OAuth the first time it connects. There is no API key to copy.

**Do I need the gen-ai CLI?**

No. The Picsart MCP server is hosted, so Goose connects to it directly. The CLI is a separate tool for the terminal.

**Can I use Goose and the CLI at the same time?**

Yes. Both draw from the same Picsart credit balance when you sign in with the same account.

**Which models work in Goose?**

Availability depends on the MCP server version. The SDK catalog reference covers 223 models. Use `picsart_list_models` to filter by mode or provider, or browse the [Model Catalog](/reference/catalog).

## Start creating

The Picsart MCP server is now connected. Visit the documentation for examples, available models, and prompt ideas.

::: tip Ready to generate?
[View documentation](https://picsart.github.io/picsart-mcp-cli-docs/){ .btn-primary target="_blank" rel="noopener" }
:::
