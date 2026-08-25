---
description: "Pika models have been retired from the Picsart catalog and are no longer available via the gen-ai CLI or MCP server."
title: Pika (retired)
---

# Pika

::: warning RETIRED
Pika models were removed from the Picsart catalog and are **no longer available**
via the [`gen-ai` CLI](/guide/cli-quickstart) or the [MCP server](/guide/mcp-quickstart).
Requests for `pika-2.2`, `pika-2.2-scenes` and `pika-2.2-frames` will fail with an
unknown-model error.
:::

This page is kept so existing links resolve. For the capabilities Pika covered:

| You used Pika for | Use instead |
|---|---|
| Text-to-video and first-frame animation | [Seedance 2.5](/reference/providers/seedance), [Veo 3.1](/reference/providers/google), [Kling V3](/reference/providers/kling) |
| Multi-image scene composition (**Pika Scenes**) | [Seedance 2.5](/reference/providers/seedance) — multi-reference input; [Wan 2.7 R2V](/reference/providers/wan) |
| Keyframe-transition morphs (**Pika Frames**) | [Seedance 2.5](/reference/providers/seedance) — `startFrame` / `endFrame`; [Kling](/reference/providers/kling) |

Browse everything currently available in the **[Model Catalog →](/reference/catalog)**
or the **[video model reference →](/reference/video)**.
