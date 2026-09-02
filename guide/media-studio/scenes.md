---
title: "Scenes and authoring"
description: "The MP Scene document model behind Picsart Media Studio — compositions, layer kinds, templates, scene refs, patching, and the check-before-render ladder."
---

# Scenes and authoring

Everything in Media Studio revolves around one document: an **MP Scene**. Tools take a scene in and
return a scene out. The agent holds it between calls — nothing is stored on the server — and
`picsart_media_export` turns it into a file.

Ask `picsart_media_get_scene_schema` for the exact, authoritative shape at any time. This page is the
mental model.

## The document

A scene has a **composition** — width, height, duration, frame rate — and a list of **layers**. Each
layer carries its own `start` and `duration`, plus a `content` object whose `kind` decides what it
is.

```jsonc
{
  "composition": { "width": 1080, "height": 1080, "duration": 6 },
  "layers": [
    {
      "id": "bg",
      "start": 0,
      "duration": 6,
      "content": {
        "kind": "media",
        "asset": { "type": "video", "uri": "https://…/clip.mp4",
                   "width": 1920, "height": 1080, "duration": 10.03 },
        "trim": { "in": 0, "out": 6 },
        "fit": "cover"
      }
    },
    { "id": "title", "start": 0.5, "duration": 4,
      "content": { "kind": "text", "text": "Summer Collection" } }
  ]
}
```

Layers are addressed by `id`, which is what makes incremental editing cheap — see
[Editing](#editing-a-scene).

### Layer kinds

The engine reports eight, and `picsart_media_get_capabilities` is the live source of truth:

| Kind | What it holds |
|---|---|
| `media` | An image, video or audio asset, with `trim`, `fit`, `speed`, `volume`, `muted` |
| `text` | A text run, styled through the font catalog |
| `color` | A flat fill |
| `shape` | A vector primitive |
| `captions` | A transcript, renderable as burnt-in captions |
| `track` | A **sequence** of child clips, laid end to end |
| `scene` | A nested composition inline |
| `scene_ref` | A **pointer** to another scene, resolved at render time |

### Sequencing versus overlay

These are different constructs, and mixing them up is the most common authoring mistake:

- **Sequencing** — one `track` layer whose child clips run back to back. Clip *i* starts where clip
  *i−1* ends. This is how you concatenate footage.
- **Overlay / picture-in-picture** — several top-level entries in `layers[]`, each with its own
  `start` and `duration`, stacked on the canvas at the same time.

### Assets are URLs

Every asset is referenced by a public `https` URL — never a filesystem path and never an inline
`data:` URI. Both are refused with `local_source_not_supported`. Use `picsart_media_upload` to turn a
local file into a URL, or `picsart_media_drive_list` to pick one you already have. Probe each source
with `picsart_media_probe_media` first, so the inline `asset` carries real `width`, `height` and
`duration`.

## Templates and scene refs

Rather than hand-building a composition, instantiate one from the curated catalog. Discover with
`picsart_media_list_scene_templates`, read the parameters with
`picsart_media_describe_scene_template`, then bind them with `picsart_media_apply_scene_template`.
Templates are addressed by URI, for example `mpscene://title-card` or `mpscene://montage`.

Two modes matter:

- **`reference`** (default) returns a compact `scene_ref` layer — a pointer, with your bindings
  attached — that you drop into a parent scene. Decks are built this way: one `track` of `scene_ref`
  slides.
- **`bootstrap`** returns a whole standalone scene, which is what you want when the template *is*
  the composition.

`picsart_media_expand_scene_ref` detaches a ref into concrete, editable layers inlined in place — do
this when you need to modify something the template did not expose as a parameter.

::: tip There is no "merge videos" tool
The `mpscene://montage` template already concatenates N clips back to back, with a transition on
every seam. Ask `picsart_media_quickstart` for the `concat_videos` recipe and it returns the exact
call sequence.
:::

## Styling

Four families of styling, all drawn from fixed catalogs that `picsart_media_get_capabilities`
enumerates — nothing here is open-ended:

| Tool | Applies |
|---|---|
| `picsart_media_apply_effect` | A named effect: `gaussian_blur`, `drop_shadow`, `stroke`, … |
| `picsart_media_apply_look` | A composite look: `vintage_bw`, `light_leak`, `shimmer`, … |
| `picsart_media_apply_motion_preset` | Motion: `ken_burns`, `glow_pulse`, `scale_pop`, … |
| `picsart_media_apply_text_animation` | Text motion: `typewriter`, `fade_in_chars`, `slide_up_lines`, … |

Effects are keyed by id, so re-applying the same one replaces rather than stacks it. Motion presets
declare which layer kinds they accept. Looks attach **by reference**; `picsart_media_resolve_looks`
bakes them into concrete nested compositions when you want a self-contained scene with no
indirection left.

::: warning Always call `picsart_media_list_fonts` before authoring text
There is no system-font fallback. `font.family` must resolve to a key in the catalog — asking for
`Inter` or `Arial` renders **empty text**, with no error.
:::

## Editing a scene

`picsart_media_patch_scene` applies a batch of ID-anchored ops — `set`, `remove`, `add` — and returns
the patched scene. It exists so you do not re-emit the whole document for a one-field change, which
matters once a scene is large.

When an op fails, the result is structured rather than a flat string:

```jsonc
{ "ok": false, "error": { "code": "…", "message": "…", "opIndex": 2, "diagnostics": [ … ] } }
```

`opIndex` tells you which op in the batch failed.

## Check before you render

Work up this ladder — each rung costs more than the last:

1. **`picsart_media_validate_scene`** — structured diagnostics with JSON paths and stable codes. A
   scene is valid when nothing comes back at `error` severity. Free.
2. **`picsart_media_query_layout`** — where every layer actually lands at a given time: box, centre,
   rotation, z-index, on-canvas coverage. Catches overlap and off-canvas layers without rendering a
   pixel. Free.
3. **`picsart_media_contact_sheet`** — real thumbnails, returned as inline images you can look at.
   Pass `times` for the moments you care about — clip seams, animation midpoints. At most 8 come back
   inline.
4. **`picsart_media_export`** — the full render.

`picsart_media_translate_scene` sits alongside these: it converts the scene into the engine's
loadable project format, which is what you want if a person is going to open the result in an editor
rather than watch a file.

## Engine limits

Reported by `picsart_media_get_capabilities` under `limits`. Current values:

| Limit | Value |
|---|---|
| Max composition width / height | 1920 × 1920 |
| Max duration | 3600 s |
| Max layers | 100 |
| Max audio tracks | 20 |

These are engine configuration, not a published contract — read them from
`picsart_media_get_capabilities` at runtime rather than hard-coding them.

## Recipes

`picsart_media_list_recipes` enumerates longer-form authoring guides — metadata only, so the catalog
is cheap to scan — and `picsart_media_get_recipe` fetches one in full, along with any companion
reference files it links to. Reach for these when a task is bigger than a single call sequence.

## More

- **[Overview](/guide/media-tools)** — what Media Studio is, and how to connect
- **[Tool reference](/guide/media-studio/tools)** — all 29 tools
- **[Troubleshooting](/guide/media-studio/troubleshooting)** — errors and what they mean
