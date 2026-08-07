---
description: "Connect Picsart's 169-model AI catalog to Claude Code, Cursor, Windsurf, ChatGPT, or any MCP client and generate image, video, and audio as agent tools."
---

# MCP Quickstart

Picsart AI Playground exposes the full model catalog to AI agents as [Model Context Protocol](https://modelcontextprotocol.io) tools. Connect it to **Claude Code, Cursor, Windsurf, ChatGPT, or any MCP-compatible agent** and it can generate image, video, and audio across 169 models directly.

## Connect

The integration works natively with MCP-capable agents. Pick your path:

| Agent | How to connect |
|---|---|
| **Claude Code · Cursor · Windsurf** | Add the [`gen-ai-use` Skill](/guide/skills) — it plugs the CLI into the agent |
| **Codex (OpenAI)** | Install the CLI, then add the plugin `codex://plugins/picsart@openai-curated` |
| **ChatGPT / any MCP client** | Connect Picsart as an MCP server — see [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) for the current endpoint and config |

In all cases, authenticate once with `gen-ai login`.

::: tip Canonical connection details
The exact, always-current MCP endpoint and per-client config live on the official page: **[picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/)**. The tool catalog and example calls below describe what the agent can do once connected.
:::

## Tool catalog

Connecting exposes **37 tools**: the 13 generation / catalog / Drive tools below, plus the
24-tool [`picsart_media_*` family](/guide/media-tools) for scene-graph compositing and
motion graphics.

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

## Recommended flow

The tools are designed to chain. A typical agent sequence:

1. `picsart_model_catalog` (or `picsart_list_models` to let the user pick visually) → pick a model
2. `picsart_model_params` → learn its inputs
3. `picsart_preflight` → validate the payload and quote the cost in one free call
4. `picsart_generate` → actually run it

If you already have a model id in hand, skip straight to `picsart_generate`.

## Example calls

**Generate an image:**

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "a cat in a hat, studio lighting",
    "aspectRatio": "16:9",
    "count": 1
  } }
```

**Generate a video with model-specific params via `extra`:**

```json
{ "name": "picsart_generate",
  "arguments": {
    "model": "seedance-2.0",
    "prompt": "a cat skiing down a mountain",
    "duration": 8,
    "aspectRatio": "16:9",
    "generateAudio": true
  } }
```

**Validate and quote a cost first:**

```json
{ "name": "picsart_preflight",
  "arguments": {
    "model": "veo-3.1",
    "params": { "prompt": "a drone shot over a snowy ridge", "duration": 8, "resolution": "1080p" }
  } }
```

**Task-shaped shortcuts** (auto-pick a fitting model):

```json
{ "name": "picsart_remove_bg", "arguments": { "imageUrls": ["https://example.com/photo.jpg"] } }
```

## Inputs reference

`picsart_generate` takes `model` and `prompt` (required), plus common optionals: `aspectRatio`, `resolution`, `duration`, `count` (1–8), `quality`, `style`, `negativePrompt`, `imageUrls` (image-to-X), `videoUrl` (video-to-X), `generateAudio`, `enhancePrompt`, and `extra` — a free-form object for model-specific params. Discover the exact `extra` shape for any model with `picsart_model_params`.

The result includes `results: [{ url, metadata? }]`, an `id` (generation handle), and one `resource_link` per output URL (image or `video/mp4`). Clients fetch assets from URLs — never base64.

## More

- **[Model Reference](/reference/)** — every provider's models with MCP examples
- **[Pricing & Credits](/guide/pricing)** — how cost is computed
