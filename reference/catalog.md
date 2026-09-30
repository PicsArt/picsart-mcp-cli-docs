---
description: "Search the versioned Picsart SDK model catalog."
---

# Model catalog

Browse the 220 models from 31 providers in SDK 6.18.0. This is a snapshot, not a live server inventory. Confirm availability in your CLI or MCP connection before using an ID.

## What the counts mean

The snapshot was inspected on September 29, 2026. Counts come from `scripts/data/catalog.json`, exported from `@picsart/ai-sdk 6.18.0`; the catalog and provider tables are generated from that file.

- A model is one distinct catalog `id`. Image, editing, fast, or video variants count separately when they have different IDs. Presets or parameter choices within an ID do not add models.
- A provider is one distinct `provider.id` assigned by the catalog. These are catalog groups, not a count of independent parent companies.
- These totals describe the exported snapshot, not the models enabled for every account or currently deployed on every interface. The CLI and hosted MCP server may differ.

Use `picsart_model_catalog` in your connected host or `gen-ai models info` for the interface you plan to use. Display names such as Nano Banana remain one model-family name; use the exact ID when submitting a request.

<ModelCatalog />
