---
description: "The Picsart SDK model catalog — 223 models from 28 providers across image, video, audio, and text analysis."
---

# Model Reference

The SDK 6.23.0 catalog: **223 models** from **28 providers**, across image, video, audio, and text. Availability and parameters depend on the installed SDK, CLI, or MCP server version. Check `gen-ai models` or `picsart_model_catalog` before use.

<div class="reference-cta">

[**🔎 Browse the Model Catalog →**](/reference/catalog) &nbsp;·&nbsp; [**🏷️ All Providers →**](/reference/providers/)

</div>

## By mode

| Mode | Models | Browse |
|---|---|---|
| 🖼️ Image | 71 | [Image generation](/reference/image) |
| 🎬 Video | 91 | [Video generation](/reference/video) |
| 🔊 Audio | 31 | [Audio generation](/reference/audio) |
| 📝 Text | 30 | [Text & analysis](/reference/text) |

## Providers

All **28 providers** have a dedicated reference page. Browse them as cards on the **[Providers →](/reference/providers/)** page, or pick a model directly from the **[Model Catalog →](/reference/catalog)**.

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
