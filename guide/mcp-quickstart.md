# MCP Quickstart

Picsart AI Playground exposes the full model catalog to AI agents as [Model Context Protocol](https://modelcontextprotocol.io) tools. Connect it to **Claude Code, Cursor, Windsurf, ChatGPT, or any MCP-compatible agent** and it can generate image, video, and audio across 130+ models directly.

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

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_list_models` | Browse the catalog (filter by mode/provider) | no |
| `picsart_model_info` | Capabilities + constraints for one model | no |
| `picsart_model_params` | JSON schema of a model's accepted params | no |
| `picsart_validate_params` | Pre-check a candidate payload | no |
| `picsart_pricing` | Quote the credit cost of a call | no¹ |
| `picsart_generate` | Run any model end-to-end | **yes** |
| `picsart_remove_bg` | Remove an image background | **yes** |
| `picsart_change_bg` | Replace an image background | **yes** |
| `picsart_enhance` | Upscale / enhance an image | **yes** |
| `picsart_vectorize` | Convert a raster image to SVG | **yes** |
| `picsart_credits` | Current credit balance | no |
| `picsart_upload` | Upload a local file to Drive | yes |
| `picsart_drive_list` / `picsart_drive_folders` / `picsart_drive_create_folder` | Browse & organize Drive | yes |

¹ `picsart_pricing` is a dry run — it returns cost without charging, but the lookup is per-user so it needs the token.

## Recommended flow

The tools are designed to chain. A typical agent sequence:

1. `picsart_list_models` or `picsart_model_info` → pick a model
2. `picsart_model_params` → learn its inputs
3. `picsart_validate_params` → pre-check the payload
4. `picsart_pricing` → quote the cost
5. `picsart_generate` → actually run it

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

**Quote a cost first:**

```json
{ "name": "picsart_pricing",
  "arguments": {
    "model": "veo-3.1",
    "prompt": "a drone shot over a snowy ridge",
    "params": { "duration": 8, "resolution": "1080p" }
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
