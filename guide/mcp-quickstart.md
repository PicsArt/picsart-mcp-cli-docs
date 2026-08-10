---
description: "Connect Picsart's 174-model AI catalog to Claude Code, Cursor, Windsurf, ChatGPT, or any MCP client and generate image, video, and audio as agent tools."
---

# MCP Quickstart

The Picsart MCP server exposes the full model catalog as [Model Context Protocol](https://modelcontextprotocol.io) tools. Connect it to any MCP-compatible agent and that agent can generate image, video, and audio across 174 models using natural language or structured tool calls.

New to MCP? Start with [What is MCP?](/guide/what-is-mcp) first.

## Prerequisites

1. Install the gen-ai CLI — see [Installation](/guide/installation).
2. Run `gen-ai login` once (opens your browser for OAuth).

That is all. The MCP server (`gen-ai-mcp`) ships with the CLI and uses the same credentials.

## Connect to your agent

### Claude Code

```bash
claude mcp add picsart-gen-ai -- gen-ai-mcp
```

Then use it in any conversation:

> *"Generate a product image on a white background using Flux 2 Pro, 4:3 aspect ratio."*

For full Claude Code setup including Skills and troubleshooting, see [Claude Code integration](/guide/integrations/claude-code).

### Cursor

Add the following to your Cursor MCP configuration file (`.cursor/mcp.json` or equivalent):

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "gen-ai-mcp"
    }
  }
}
```

See [Cursor integration](/guide/integrations/cursor).

### Windsurf

Add to your Windsurf MCP config:

```json
{
  "mcpServers": {
    "picsart-gen-ai": {
      "command": "gen-ai-mcp"
    }
  }
}
```

See [Windsurf integration](/guide/integrations/windsurf).

### VS Code (Copilot)

Add to `.vscode/mcp.json` in your workspace or to your user settings:

```json
{
  "servers": {
    "picsart-gen-ai": {
      "type": "stdio",
      "command": "gen-ai-mcp"
    }
  }
}
```

See [VS Code integration](/guide/integrations/vscode).

### Codex (OpenAI)

```bash
codex mcp add picsart-gen-ai -- gen-ai-mcp
```

See [Codex integration](/guide/integrations/codex).

### ChatGPT and other MCP clients

See [ChatGPT integration](/guide/integrations/chatgpt) or the official page at [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) for the current connector config.

---

## Tool catalog

Connecting exposes **37 tools**: the 13 generation / catalog / Drive tools below, plus the
24-tool [`picsart_media_*` family](/guide/media-tools) for scene-graph compositing and
motion graphics.

Every tool is available to the agent once connected. Tools that do not spend credits are free to call as many times as needed.

### Generation

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_generate` | Run any model end-to-end (image / video / audio / text) | **yes** |
| `picsart_remove_bg` | Remove an image background | **yes** |
| `picsart_change_bg` | Replace an image background from a prompt | **yes** |
| `picsart_enhance` | Upscale / enhance an image | **yes** |
| `picsart_vectorize` | Convert a raster image to SVG | **yes** |
| `picsart_music_studio` | Open Music Studio (music / SFX / album art) | no¹ |

¹ Opening the studio is free; generating inside it spends credits.

### Catalog & cost

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_list_models` | Model picker **widget** — for the user to browse visually | no |
| `picsart_model_catalog` | The same catalog as plain data, for the agent's own reasoning | no |
| `picsart_model_params` | Parameter schema of one model (type, required, enum, min/max) | no |
| `picsart_preflight` | Validate a params payload **and** quote its credit cost — one free dry run | no |
| `picsart_credits` | Current credit balance and quota breakdown | no |
| `picsart_job_status` | Poll a job started by `picsart_generate` with `async: true` | no |

### Drive

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_drive` | Single entry point for Picsart Drive — behavior selected by `action` | no |

`picsart_drive` takes an `action` parameter; there are **no separate per-operation Drive tools**:

| `action` | What it does |
|---|---|
| `list` | Browse a folder (`folderUid` omitted = root; `flat: true` lists every file) |
| `create_folder` | Create a folder (`name`, optional parent `folderUid`, `description`) |
| `upload` | Save a file — either `file` (a chat attachment) or `url` + `name` (HTTPS URL or inline `data:` URI). `result.url` is a CDN URL ready to pass to `imageUrls` |
| `move` | Move `itemUids` into `targetFolderUid` |
| `delete` | Soft-delete `itemUids` to trash (`permanent: true` to erase) |
| `update` | Set custom attributes on one file (`itemUid` + `attributes`) |

Every action returns the current folder listing so the Drive widget can render.
See [Files & Drive](/guide/files-and-drive) for details, and
[Local files → URLs](/guide/local-files) for getting a file off your disk in the first place.

::: warning No tool accepts a filesystem path
Every image/video input is a **URL**. There is no `filePath` parameter anywhere in the MCP
contract — see [Local files → URLs](/guide/local-files) for the three paths that actually work.
:::

## Recommended generation flow

The tools are designed to chain. This sequence avoids surprises:

1. `picsart_model_catalog` (or `picsart_list_models` to let the user pick visually) → pick a model
2. `picsart_model_params` → learn its inputs
3. `picsart_preflight` → validate the payload and quote the cost in one free call
4. `picsart_generate` → actually run it

If you already have a model id in hand, skip straight to `picsart_generate`.

## Example tool calls

**Generate an image:**

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "a ceramic cup, studio lighting, 4:3",
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
    "imageUrls": ["https://example.com/product.jpg"]
  }
}
```

## Inputs reference

`picsart_generate` takes:

- **Required:** `model` (model id), `prompt` (text prompt)
- **Common optional:** `aspectRatio`, `resolution`, `duration`, `count` (1 to 8), `quality`, `style`, `negativePrompt`
- **Image input:** `imageUrls` (array of URLs — for image-to-image or image-to-video models)
- **Video input:** `videoUrl` (single URL — for video-to-video models)
- **Audio generation:** `generateAudio` (boolean — for video models that support native audio)
- **Prompt enhancement:** `enhancePrompt` (boolean — routes through an LLM before generation)
- **Model-specific params:** `extra` (free-form object — use `picsart_model_params` to see what a model accepts)

Results come back as `results: [{ url, metadata? }]`. Assets are URLs, never base64. Each result also includes a `resource_link` so the agent can reference it in follow-up tool calls.

## FAQ

**Does the MCP server require a separate API key?**

No. It uses the same OAuth session as the CLI. Run `gen-ai login` once; the MCP server picks up those credentials automatically.

**Can I use MCP and the CLI on the same machine at the same time?**

Yes. Both use the same credentials file (`~/.gen-ai/credentials.json`) and the same credit balance. Running them in parallel is fine.

**The agent connected but the tools do not appear.**

Restart the agent after adding the MCP config. Most agents load the tool list at startup, not dynamically.

**Which models work via MCP?**

All 174 models in the catalog. There is no MCP-specific subset. Use `picsart_list_models` to filter by mode or provider, or browse the [Model Catalog](/reference/catalog).

**Can the agent save generated files to Drive?**

Yes. Pass `"saveToDrive": true` in the `picsart_generate` arguments, or use `picsart_drive` to upload a local file or URL. See [Files and Drive](/guide/files-and-drive).

**How do I know what a model costs before running it?**

Call `picsart_preflight` with the model id and the parameters you plan to use. It validates the payload and returns a credit estimate without running the generation.

**What happens if my credit balance runs out mid-generation?**

Check your balance with `picsart_credits` and top up at [picsart.com](https://picsart.com) before retrying.
