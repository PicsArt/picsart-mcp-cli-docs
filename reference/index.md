---
description: "Read the versioned Picsart model catalog and discover current model inputs."
---

# Model reference

This reference contains the `@picsart/ai-sdk` 7.0.0 catalog export: 260 models from 32 providers. The CLI and hosted MCP server can expose different catalogs. Check your runtime before submitting a generation.

| Mode | Models | Reference |
|---|---|---|
| Image | 78 | [Image](/reference/image) |
| Video | 103 | [Video](/reference/video) |
| Audio | 32 | [Audio](/reference/audio) |
| JSON | 1 | [JSON and evaluation](/reference/json) |
| Text | 44 | [Text and analysis](/reference/text) |

The [catalog](/reference/catalog) supports filtering. [Provider pages](/reference/providers/) list model IDs, required inputs, values, defaults, and the complete exported parameter descriptors. Their CLI flag mappings use version 2.78.0; a mapping does not guarantee a newer model exists in an older CLI.

## Inspect your runtime

```bash
gen-ai models info flux-2-pro --json
```

For MCP, call `picsart_model_catalog` to find models and `picsart_model_params` to read the selected model's schema. Validate a candidate request with `picsart_preflight` before generating. Dynamic catalog IDs and media accessibility can require additional account-specific checks.
