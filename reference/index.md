---
description: "Read the versioned Picsart model catalog and discover current model inputs."
---

# Model reference

This reference contains the `@picsart/ai-sdk` 6.18.0 snapshot: 220 models from 31 providers. The CLI and hosted MCP server can expose different catalogs. Check your runtime before submitting a generation.

| Mode | Models | Reference |
|---|---|---|
| Image | 68 | [Image](/reference/image) |
| Video | 91 | [Video](/reference/video) |
| Audio | 31 | [Audio](/reference/audio) |
| Text | 30 | [Text and analysis](/reference/text) |

The [catalog](/reference/catalog) supports filtering. [Provider pages](/reference/providers/) list model IDs, required inputs, values, defaults, and the complete exported parameter descriptors. Their CLI flag mappings use version 2.78.0; a mapping does not guarantee a newer model exists in an older CLI.

## Inspect your runtime

```bash
gen-ai models info flux-2-pro --json
```

For MCP, call `picsart_model_catalog` to find models and `picsart_model_params` to read the selected model's schema. Validate a candidate request with `picsart_preflight` before generating. Dynamic catalog IDs and media accessibility can require additional account-specific checks.
