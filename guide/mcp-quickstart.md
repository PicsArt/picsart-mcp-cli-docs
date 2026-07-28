---
description: "Connect Picsart's AI catalog (150+ models) to Claude Code, Cursor, Windsurf, ChatGPT, or any MCP client and generate image, video, and audio as agent tools."
---

# MCP Quickstart

The Picsart MCP server exposes the full model catalog as [Model Context Protocol](https://modelcontextprotocol.io) tools. Connect it to any MCP-compatible agent and that agent can generate image, video, and audio across 150+ models using natural language or structured tool calls.

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

Or add the curated plugin: `codex://plugins/picsart@openai-curated`. See [Codex integration](/guide/integrations/codex).

### ChatGPT and other MCP clients

See [ChatGPT integration](/guide/integrations/chatgpt) or the official page at [picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) for the current connector config.

---

## Tool catalog

Every tool is available to the agent once connected. Tools that do not spend credits are free to call as many times as needed.

| Tool | What it does | Credits |
|---|---|---|
| `picsart_list_models` | Browse the catalog; filter by mode or provider | no |
| `picsart_model_info` | Full capabilities and constraints for one model | no |
| `picsart_model_params` | JSON schema of a model's accepted parameters | no |
| `picsart_validate_params` | Pre-check a payload before spending credits | no |
| `picsart_pricing` | Quote the credit cost of a specific call | no |
| `picsart_generate` | Run any model end-to-end | yes |
| `picsart_remove_bg` | Remove an image background | yes |
| `picsart_change_bg` | Replace an image background | yes |
| `picsart_enhance` | Upscale or enhance an image | yes |
| `picsart_vectorize` | Convert a raster image to SVG | yes |
| `picsart_credits` | Current credit balance | no |
| `picsart_upload` | Upload a local file to Picsart Drive | yes |
| `picsart_drive_list` | List files in Drive | no |
| `picsart_drive_folders` | List Drive folders | no |
| `picsart_drive_create_folder` | Create a Drive folder | no |
| `picsart_materialize_url` | Copy a remote URL into Drive | yes |

`picsart_pricing` is a dry run — it returns the credit cost without charging, but it requires your token because cost is per-account.

## Recommended generation flow

The tools are designed to chain. This sequence avoids surprises:

1. `picsart_list_models` or `picsart_model_info` — pick a model.
2. `picsart_model_params` — see what parameters it accepts.
3. `picsart_validate_params` — pre-check the payload.
4. `picsart_pricing` — confirm the cost.
5. `picsart_generate` — run it.

Agents that skip to step 5 directly will still work, but they may use a suboptimal model or parameter set.

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

**Quote a cost before generating:**

```json
{
  "name": "picsart_pricing",
  "arguments": {
    "model": "veo-3.1",
    "params": { "duration": 8, "resolution": "1080p" }
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

All 150+ models in the catalog. There is no MCP-specific subset. Use `picsart_list_models` to filter by mode or provider, or browse the [Model Catalog](/reference/catalog).

**Can the agent save generated files to Drive?**

Yes. Pass `"saveToDrive": true` in the `picsart_generate` arguments, or use `picsart_upload` to upload a local file. See [Files and Drive](/guide/files-and-drive).

**How do I know what a model costs before running it?**

Call `picsart_pricing` with the model id and the parameters you plan to use. It returns the credit cost without running the generation.

**What happens if my credit balance runs out mid-generation?**

The generation fails and credits are not charged. Check your balance with `picsart_credits` and top up at [picsart.com](https://picsart.com) before retrying.
