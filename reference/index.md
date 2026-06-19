---
description: "The full Picsart AI model catalog — 176 models from 30 providers across image, video, and audio, usable from the gen-ai CLI and MCP."
---

# Model Reference

The full Picsart AI Playground catalog: **176 models** from **30 providers**, across image, video, and audio. Every model is usable from both the [gen-ai CLI](/guide/cli-quickstart) and the [MCP server](/guide/mcp-quickstart) with the same id.

<div class="reference-cta">

[**🔎 Browse the Model Catalog →**](/reference/catalog) &nbsp;·&nbsp; [**🏷️ All Providers →**](/reference/providers/)

</div>

## By mode

| Mode | Models | Browse |
|---|---|---|
| 🖼️ Image | 77 | [Image generation](/reference/image) |
| 🎬 Video | 78 | [Video generation](/reference/video) |
| 🔊 Audio | 21 | [Audio generation](/reference/audio) |

## Providers

All **30 providers** have a dedicated reference page. Browse them as cards on the **[Providers →](/reference/providers/)** page, or pick a model directly from the **[Model Catalog →](/reference/catalog)**.

## How to read a provider page

Each provider page lists its models with:

- a **models table** (id, display name, mode, input type),
- a **CLI example** and an **MCP example** for the flagship model,
- a **key parameters** table sourced from the live catalog,
- vendor-specific notes and constraints.

## Discover live

The catalog evolves as new models ship. Query it directly:

```bash
gen-ai models --json | jq '.[] | {id, provider, mode}'
gen-ai models --provider kling
```

```json
{ "name": "picsart_list_models", "arguments": { "provider": "kling" } }
```
