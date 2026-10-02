---
description: "Connect the hosted Picsart MCP server to Claude, Claude Code, Cursor, VS Code, Codex, ChatGPT, or any MCP client. Sign in with your Picsart account; nothing to install."
---

# MCP Quickstart

The Picsart MCP server exposes its available models as [Model Context Protocol](https://modelcontextprotocol.io) tools. Connect it to any MCP-compatible agent and that agent can generate image, video, and audio with available models using natural language or structured tool calls.

New to MCP? Start with [What is MCP?](/guide/what-is-mcp) first.

## What you need

- A **Picsart account**. You sign in to it in your browser the first time the agent connects.
- **Credits** on that account for generations. Browsing the catalog and quoting costs are free.
- An agent that supports **remote (HTTP) MCP servers with OAuth sign-in**. Claude, Claude Code, Cursor, VS Code, Codex, ChatGPT, and Gemini CLI all do.

That is all. The server is hosted by Picsart, so there is nothing to install on your machine. You do **not** need the gen-ai CLI, `gen-ai login`, or an API key to use MCP.

The server address is:

```
https://api.picsart.com/gen-ai/mcp
```

## How sign-in works

The first time your agent connects, the server answers that sign-in is required and points the agent at Picsart's sign-in page. The agent opens a browser window, you sign in to Picsart and approve access, and the agent stores the session itself. From then on every tool call is made as you, against your credit balance.

If the session expires, reconnect or re-authenticate the server from your agent's MCP or connector settings. The steps are in each [integration guide](/guide/integrations/).

## Connect to your agent

### Claude (web and desktop)

Go to **Settings → Connectors → Add custom connector**, paste `https://api.picsart.com/gen-ai/mcp`, and sign in to Picsart in the window that opens. On a Claude Team or Enterprise plan, an organization owner adds the connector for everyone.

### Claude Code

```bash
claude mcp add --transport http picsart-gen-ai https://api.picsart.com/gen-ai/mcp
```

Then run `/mcp` inside Claude Code, pick `picsart-gen-ai`, and choose **Authenticate** to sign in. Use it in any conversation:

> *"Generate a product image on a white background using Flux 2 Pro, 4:3 aspect ratio."*

For full Claude Code setup including Skills and troubleshooting, see [Claude Code integration](/guide/integrations/claude-code).

### Cursor

Add the following to `.cursor/mcp.json` in your project, or `~/.cursor/mcp.json` for every project:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

See [Cursor integration](/guide/integrations/cursor).

### Windsurf

Add to `mcp_config.json` (open it from Cascade's **...** menu → **Open MCP config file**):

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "serverUrl": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

See [Windsurf integration](/guide/integrations/windsurf).

### VS Code (Copilot)

Add to `.vscode/mcp.json` in your workspace or to your user MCP configuration:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "http",
      "url": "https://api.picsart.com/gen-ai/mcp"
    }
  }
}
```

See [VS Code integration](/guide/integrations/vscode).

### Codex (OpenAI)

```bash
codex mcp add picsart-gen-ai --url https://api.picsart.com/gen-ai/mcp
codex mcp login picsart-gen-ai
```

See [Codex integration](/guide/integrations/codex).

### ChatGPT and other MCP clients

Add a connector (sometimes called a remote or custom MCP server) with the address above and choose OAuth as the authentication method. See [ChatGPT integration](/guide/integrations/chatgpt) and the full list of [integrations](/guide/integrations/).

---

## Tool catalog

Connecting exposes the generation, catalog and Drive tools below, plus viewing tools, a set of guided creative boards, and `picsart_media_*` tools for building video and images out of material you already have.

::: tip Building rather than generating?
**[Picsart Media Studio](/guide/media-studio/)** is a connector dedicated to that kind of work. It is
added and signed in to separately, and sits happily alongside this one.
:::

Every tool is available to the agent once connected. Tools that do not spend credits are free to call as many times as needed.

### Generation

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_generate` | Run any model end-to-end (image / video / audio / text) | **yes** |
| `picsart_remove_bg` | Remove an image background | **yes** |
| `picsart_change_bg` | Replace an image background from a prompt | **yes** |
| `picsart_enhance` | Upscale / enhance an image | **yes** |
| `picsart_vectorize` | Convert a raster image to SVG | **yes** |

### Catalog & cost

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_list_models` | Model picker **widget**, for the user to browse visually | no |
| `picsart_model_catalog` | The same catalog as plain data, for the agent's own reasoning | no |
| `picsart_model_params` | Parameter schema of one model (type, required, enum, min/max) | no |
| `picsart_model_choice` | Show the user a short list of candidate models as cards to pick from | no |
| `picsart_preflight` | Validate a params payload **and** quote its credit cost in one free dry run | no |
| `picsart_credits` | Current credit balance and quota breakdown | no |
| `picsart_job_status` | Poll a job started by `picsart_generate` | no |
| `picsart_render_monitor` | Live progress panel for a batch of running generations | no |

### Viewing

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_view_image` | Let the agent look at up to 6 Picsart-hosted images, so it can judge a result or describe a reference | no |

### Drive

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_drive` | Single entry point for Picsart Drive, behavior selected by `action` | no |

`picsart_drive` takes an `action` parameter; there are **no separate per-operation Drive tools**:

| `action` | What it does |
|---|---|
| `list` | Browse a folder (`folderUid` omitted = root; `flat: true` lists every file) |
| `create_folder` | Create a folder (`name`, or a slash-separated `path`, optional parent `folderUid`, `description`) |
| `upload` | Save a file: `file` (a chat attachment), `url` + `name` (HTTPS URL or inline `data:` URI), or up to 10 at once with `files`. `result.url` is a CDN URL ready to pass to `imageUrls` |
| `move` | Move `itemUids` into `targetFolderUid` |
| `delete` | Soft-delete `itemUids` to trash (`permanent: true` to erase) |
| `update` | Set custom attributes on one file (`itemUid` + `attributes`) |

Every action returns the current folder listing so the Drive widget can render.
See [Files & Drive](/guide/files-and-drive) for details, and
[Local files → URLs](/guide/local-files) for getting a file off your disk in the first place.

### Creative boards and media building

Some tools open an interactive panel in the conversation instead of replying with text: the film setup console, shot list board, asset review board, motion setup console and scene editor, among others. They guide multi-step projects such as a short film or a motion-design video. The `picsart_media_*` tools (upload, scene templates, captions, transcription, reframing, export) are the same family documented under [Media Studio → What you can do](/guide/media-studio/tools). Your agent discovers all of them automatically; you do not need to call them by name.

::: warning No tool accepts a filesystem path
Every image/video input is a **URL**. There is no `filePath` parameter anywhere in the MCP
contract. See [Local files → URLs](/guide/local-files) for the paths that actually work.
:::

## Recommended generation flow

The tools are designed to chain. This sequence avoids surprises:

1. `picsart_model_catalog` (or `picsart_list_models` to let the user pick visually) → pick a model
2. `picsart_model_params` → learn its inputs
3. `picsart_preflight` → validate the payload and quote the cost in one free call
4. `picsart_generate` → start it
5. `picsart_job_status` → collect the result (media models run asynchronously by default)

If you already have a model id in hand, skip straight to `picsart_generate`.

## Example tool calls

**Generate an image:**

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "a ceramic cup, studio lighting",
    "aspectRatio": "4:3",
    "count": 1
  }
}
```

**Generate a video:**

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "seedance-2.0",
    "prompt": "a cat skiing down a mountain",
    "duration": 8,
    "aspectRatio": "16:9",
    "generateAudio": true
  }
}
```

**Validate and quote a cost first:**

```json
{
  "name": "picsart_preflight",
  "arguments": {
    "model": "veo-3.1",
    "params": { "prompt": "a drone shot over a snowy ridge", "duration": 8, "resolution": "1080p" }
  }
}
```

**Remove a background:**

```json
{
  "name": "picsart_remove_bg",
  "arguments": {
    "image": "https://example.com/product.jpg"
  }
}
```

`picsart_remove_bg`, `picsart_change_bg`, `picsart_enhance` and `picsart_vectorize` each take one `image` URL and pick a suitable model automatically. Pass `model` to override it.

## Inputs reference

`picsart_generate` takes:

- **Required:** `model` (model id), `prompt` (text prompt)
- **Common optional:** `aspectRatio`, `resolution`, `duration`, `count` (1 to 10), `quality`, `style`, `negativePrompt`
- **Image input:** `imageUrls` (array of URLs, for image-to-image or image-to-video models)
- **Video input:** `videoUrl` (single URL, for video-to-video models)
- **Audio generation:** `generateAudio` (boolean, for video models that support native audio)
- **Prompt enhancement:** `enhancePrompt` (boolean, routes through an LLM before generation)
- **Drive:** `saveToDrive` (default `true`) and `folderUid` (which Drive folder to file the result in)
- **Async:** `async` (defaults to `true` for every media model: the call returns a job handle immediately, and the agent polls `picsart_job_status` for the result)
- **Model-specific params:** `extra` (free-form object; use `picsart_model_params` to see what a model accepts)

Finished results come back as `assets: [{ id, type, url, ... }]`, plus a `resource_link` for each file so the agent can reference it in follow-up tool calls. Assets are HTTPS URLs, never base64. Text models return the generated text instead.

## FAQ

**Do I need the gen-ai CLI to use MCP?**

No. The MCP server is hosted by Picsart and your agent connects to it over HTTPS. The [CLI](/guide/cli-quickstart) is a separate tool for the terminal. Install it only if you want to generate from a shell or use [Skills](/guide/skills).

**Does the MCP server require an API key?**

No. You sign in with your Picsart account through your agent. There is no key to copy or rotate.

**Can I use MCP and the CLI at the same time?**

Yes. They are signed in separately but draw on the same Picsart account and the same credit balance.

**The agent connected but the tools do not appear.**

Make sure you finished signing in, then restart or reload the agent. Most agents load the tool list when they connect, not continuously.

**Which models work via MCP?**

The SDK catalog reference covers 223 models. MCP availability depends on the server version. Use `picsart_model_catalog` or `picsart_list_models` to filter by mode, provider, or purpose, or browse the [Model Catalog](/reference/catalog).

**Where do generated files go?**

By default each media result is also saved to your Picsart Drive, in a `picsart-genai-mcp` folder at the Drive root. Pass `folderUid` to file it somewhere else, or `"saveToDrive": false` to skip saving. Use `picsart_drive` to upload a URL or chat attachment yourself. See [Files and Drive](/guide/files-and-drive).

**How do I know what a model costs before running it?**

Call `picsart_preflight` with the model id and the parameters you plan to use. It validates the payload and returns a credit estimate without running the generation.

**What happens if my credit balance runs out?**

Check your balance with `picsart_credits` and top up at [picsart.com](https://picsart.com) before retrying.
