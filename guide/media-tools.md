---
description: "Compose, inspect, validate, and render layered media through Picsart MCP."
---

# Media tools

The `picsart_media_*` tools work with layered scene documents: media, text, timing, effects, and transitions. Use them to assemble existing assets, add captions, or render a composition. Model generation is a separate operation.

These tools are also available through the separate [Media Studio connector](/guide/media-studio/). Connect and authorize that endpoint separately. Inspect each connected server's tool list rather than assuming identical availability.

## Recommended workflow

1. Call `picsart_media_quickstart` for the relevant recipe.
2. Request the needed capability sections with `picsart_media_get_capabilities`. Start with `limits` and the features you plan to use. Omitting `sections` returns an index, not every capability.
3. Inspect unknown source dimensions and duration with `picsart_media_probe_media`. A missing duration is unknown, not zero.
4. Call `picsart_media_list_fonts` before adding text. Use a returned font key or an accepted font URL; the renderer does not provide a system-font fallback.
5. Build from a template or author a scene using the current schema. Use `picsart_media_get_scene_schema` for structure and `picsart_media_validate_scene` for semantic checks.
6. Check placement with `picsart_media_query_layout`, then inspect a rendered frame with `picsart_media_contact_sheet`.
7. Export the validated composition with `picsart_media_export`.

Schema validation and layout geometry do not prove that assets, fonts, effects, and codecs render correctly. Inspect pixels before a final export.

## Discover capabilities

```json
{
  "name": "picsart_media_get_capabilities",
  "arguments": { "sections": ["limits", "export", "layerContentKinds"] }
}
```

Read the returned `build` and limits. Different server versions can support different scene features and output sizes; do not assume a universal 1920-pixel cap.

## Tool groups

| Task | Tools |
|---|---|
| Learn the format | `picsart_media_quickstart`, `picsart_media_get_capabilities`, `picsart_media_get_scene_schema` |
| Inspect inputs and fonts | `picsart_media_probe_media`, `picsart_media_list_fonts` |
| Use templates | `picsart_media_list_scene_templates`, `picsart_media_describe_scene_template`, `picsart_media_apply_scene_template`, `picsart_media_expand_scene_ref` |
| Edit layers | `picsart_media_patch_scene`, `picsart_media_apply_effect`, `picsart_media_apply_look` |
| Animate | `picsart_media_apply_motion_preset`, `picsart_media_apply_text_animation` |
| Inspect a composition | `picsart_media_validate_scene`, `picsart_media_query_layout`, `picsart_media_contact_sheet` |
| Produce output | `picsart_media_export`, `picsart_media_translate_scene` |

Use the connected server's tool list for availability and the exact input schema. Scene transformations return updated documents for the caller to retain. Probing can fetch remote assets, and export runs on the server; the entire tool family is not a set of local, stateless transformations.

## Export

`picsart_media_export` accepts a scene object or a directly accessible scene URL. Use `mediaType` to choose the output: `mp4` by default, or a supported still, video, or image-sequence format. For a still, set `startTime` to the frame's time. The optional `resolution` supplies width and height for server-side downscaling.

This request is a template and spends credits when run with a real scene. Replace the placeholder URL with your validated scene:

```json
{
  "name": "picsart_media_export",
  "arguments": {
    "scene": "https://example.com/validated-scene.json",
    "mediaType": "png",
    "startTime": 0
  }
}
```

Use the returned asset URL for subsequent tool calls. If `downloadUrls` are provided, they are intended for saving the files. Only report a successful Drive save when the response confirms it; rendering can succeed even if that save fails.

`picsart_media_translate_scene` returns the full engine project inline. Its default engine is `v3`; `jet` is also supported. It does not return a local project path, and it does not replace scene validation.

## Credits

Rendering and media generation can spend credits. Check the selected tool's current description and pricing before calling it. Capability discovery, schema inspection, and validation do not generate media. Avoid assuming every newly added tool is free based on its name.

See [MCP setup](/guide/mcp-quickstart), [file uploads](/guide/local-files), and [pricing](/guide/pricing).
