---
description: "Picsart SDK 6.29.0 catalog update: Nano Banana 2.1, HeyGen Video, Jev structured evaluation, and Luma catalog removals."
title: SDK 6.29.0 catalog update
---

# SDK 6.29.0 catalog update

This update compares SDK **6.29.0** with the **6.23.0** catalog published here on October 2, 2026.
There are **3 additions and 4 removals**, bringing the production catalog to **222 models across 29 providers**: 72 image, 88 video, 31 audio, 30 text, and 1 JSON model.

## New production models

| Model ID | Name | Mode | Provider |
|---|---|---|---|
| `gemini-nano-banana-2.1` | Nano Banana 2.1 | image | [Google](/reference/providers/google) |
| `heygen-video-1` | HeyGen Video | video | [HeyGen](/reference/providers/heygen) |
| `typesafe-evaluate` | Jev | json | [TypeSafe](/reference/providers/typesafe) |

Nano Banana 2.1 supports image generation and editing, up to 14 reference images, 1K/2K/4K resolutions, and a configurable thinking level.
HeyGen Video supports a first frame plus image, video, and audio references, 5–15 second durations, and 480p or 768p output.

Jev adds the **JSON output mode** for structured content evaluation. Use the SDK's `ai.run()` API; `generate()` and `generateText()` do not accept JSON models. See [JSON & evaluation](/reference/json).

## Removed from the production catalog

- `luma-ray-2` — Luma Ray 2
- `luma-ray-2-reframe-video` — Luma Ray 2 Reframe
- `luma-ray-flash-2` — Luma Flash 2
- `luma-ray-flash-2-reframe-video` — Luma Flash 2 Reframe

The [Luma reference](/reference/providers/luma) now uses the remaining Ray 3.2 family. Its current generation settings are 540p/720p/1080p and 5 or 10 seconds; old Ray 2 settings should not be copied unchanged.

## Version and availability

```bash
npm install @picsart/ai-sdk@6.29.0
```

This is a production SDK catalog snapshot. Preview, disabled, and deprecated entries are excluded. CLI, MCP, and Playground availability depend on their installed or deployed versions; catalog presence does not guarantee support on every surface.

Check `gen-ai models` and `gen-ai models info <id> --json` for CLI support, or the connected MCP server's model discovery tools. For JSON models, use the execution method documented by that interface.
