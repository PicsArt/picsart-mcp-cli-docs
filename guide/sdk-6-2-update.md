---
description: "What changed in Picsart AI SDK 6.2.3: model additions, result metadata, Seedance color depth, and documentation migration."
---

# Updating to AI SDK 6.2.3

This update compares two baselines: the application SDK moves from **6.0.0 to 6.2.3**, while the published documentation last listed the **5.24.0** catalog. The current production catalog contains **201 models across 31 providers**: 66 image, 84 video, 24 audio, and 27 text.

## SDK changes since 6.0.0

The SDK adds 11 production text-model IDs with no production model removals: `claude-sonnet-4-5`, `claude-sonnet-5`, `gemini-2.5-flash`, `gpt-4.1-mini`, `gpt-4.1-nano`, `gpt-4o`, `gpt-4o-mini`, `gpt-5`, `gpt-5-mini`, `gpt-5.1`, and `gpt-5.2`. These IDs are available through the typed text-generation API and model constants.

### Result metadata migration

Version 6.1.0 removes `seed`, `nsfw`, `width`, `height`, `contentType`, `duration`, `fps`, and `fileSize` from `items[].metadata`, including runtime promotion. Update consumers that read these properties. `exploreImageId` and `generatedVoiceId` remain supported.

The new optional `lastFrameUrl` promotes a vendor's `last_frame_url` for frame chaining. Request the last frame from a supporting Seedance model, then use the returned URL as a subsequent start frame.

```ts
const first = await client.generate('seedance-2.5', {
  prompt: 'A paper boat drifts down a quiet stream',
  returnLastFrame: true,
});
const startFrame = first.items[0]?.metadata?.lastFrameUrl;
if (startFrame) {
  await client.generate('seedance-2.5', {
    prompt: 'The boat passes under a stone bridge',
    startFrame,
  });
}
```

The URL is optional because it depends on the vendor response. Check it before starting the next generation.

### Seedance output compatibility

Version 6.2.3 adds `colorDepth: '10bit' | '8bit'` alongside the existing `outputFormat: 'mp4' | 'mov'` container setting. MP4 and MOV support were already present in 6.0.0. Color depth is selectable for 1080p MP4 only; 480p and 720p already use 8-bit, while MOV does not offer an 8-bit variant. The default remains 10-bit.

```ts
const video = await client.generate('seedance-2.5', {
  prompt: 'A bird lands on a garden fence',
  resolution: '1080p',
  outputFormat: 'mp4',
  colorDepth: '8bit',
});
```

This requests the worker's H.264 8-bit re-encode (`mp4_8bit`) for compatibility with browsers and editors. The same setting applies to the 2.5 edit and extend variants. The SDK also exposes preview variants, which are excluded from this site's production catalog.

Node.js 20 or newer is still required. The workflow types dependency advances from `^1.1.137` to `^1.1.139`; package exports stay unchanged. See the [official source comparison](https://github.com/PicsArt/ai-sdk/compare/v6.0.0...v6.2.3).

## Changes since the published documentation

The published catalog grows from 181 to 201 entries: **26 added and 6 removed**. Meta joins the active provider list; Reve leaves it, keeping the provider total unchanged. Historical provider links remain available.

### Added catalog entries

| Model ID | Name | Mode |
|---|---|---|
| `claude-fable-5` | Claude Fable 5 | text |
| `claude-fable-5-1` | Claude Fable 5.1 | text |
| `claude-opus-5` | Claude Opus 5 | text |
| `claude-sonnet-4-5` | Claude Sonnet 4.5 | text |
| `claude-sonnet-5` | Claude Sonnet 5 | text |
| `flux-video-edit` | FLUX Video Edit | video |
| `gemini-2.5-flash` | Gemini 2.5 Flash | text |
| `gemini-3.8-flash` | Gemini 3.8 Flash | text |
| `gpt-4.1-mini` | GPT-4.1 Mini | text |
| `gpt-4.1-nano` | GPT-4.1 Nano | text |
| `gpt-4o` | GPT-4o | text |
| `gpt-4o-mini` | GPT-4o Mini | text |
| `gpt-5` | GPT-5 | text |
| `gpt-5-mini` | GPT-5 Mini | text |
| `gpt-5.1` | GPT-5.1 | text |
| `gpt-5.2` | GPT-5.2 | text |
| `gpt-5.6-luna` | GPT-5.6 Luna | text |
| `gpt-5.6-sol` | GPT-5.6 Sol | text |
| `gpt-5.6-terra` | GPT-5.6 Terra | text |
| `gpt-6-astra` | GPT-6 Astra | text |
| `gpt-image-2.5-flare` | GPT Image 2.5 Flare | image |
| `gpt-image-2.5-sunburst` | GPT Image 2.5 Sunburst | image |
| `lyria-3.5` | Lyria 3.5 | audio |
| `minimax-h3-max-camera-controls` | MiniMax H3 Max Camera Controls | video |
| `minimax-h3-max-turbo` | MiniMax H3 Max Turbo | video |
| `muse-image-1.0` | Muse Image 1.0 | image |

### Removed from the production catalog

`picsart-qwen-image-edit-angle`, `qwen-image-2`, `reve`, `sora-2`, `sora-2-extend`, `sora-2-pro`. These IDs are no longer listed by the SDK's production catalog; this does not imply that a vendor discontinued the underlying model.

Provider tables and model parameter sections reflect the current catalog. For current discovery, use the [Model Catalog](/reference/catalog) or `gen-ai models info <id> --json`.
