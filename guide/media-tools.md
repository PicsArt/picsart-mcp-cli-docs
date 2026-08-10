---
description: "The 24 picsart_media_* MCP tools — a scene-graph compositor for building, validating, and rendering videos, decks, and motion graphics from an agent."
---

# Media Tools (`picsart_media_*`)

Alongside the [generation tools](/guide/mcp-quickstart#tool-catalog), the MCP server exposes a
second family of **24 tools prefixed `picsart_media_`**. Where `picsart_generate` runs a *model*,
these tools drive a **scene-graph compositor**: you author an **MP Scene** document (layers,
timing, text, effects, transitions) and then render it to an MP4 or PNG.

Use them for the things a text-to-video model can't do reliably: slideshows and decks from
templates, montages and concatenation, captions and lower thirds over the user's own footage,
contact sheets, and 4K motion graphics.

::: tip The whole family is one workflow
Almost every tool takes a scene in and returns a scene out. Nothing is persisted server-side —
the agent holds the scene document between calls and passes it along.
:::

## Recommended flow

1. `picsart_media_quickstart` — **call this first.** Returns ready-to-run call sequences for
   common tasks (merge/concat, contact sheet, export).
2. `picsart_media_get_capabilities` / `picsart_media_get_scene_schema` — learn the supported
   layer kinds, effects, limits, and the exact scene shape.
3. `picsart_media_probe_media` — size the composition against the real dimensions and duration
   of the user's input URLs.
4. Author: start from a template (`picsart_media_apply_scene_template`) or build layers, then
   refine with `picsart_media_patch_scene` and the `apply_*` tools.
5. Check: `picsart_media_validate_scene`, `picsart_media_query_layout`,
   `picsart_media_contact_sheet`.
6. Render: `picsart_media_export`.

## Orientation

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_quickstart` | Ready-to-run tool sequences per recipe; omit `recipe` for the index | no |
| `picsart_media_get_capabilities` | Supported layer kinds, animatable properties, effect/transition ids, limits (pass `sections` — the full doc is ~8K tokens) | no |
| `picsart_media_get_scene_schema` | JSON Schema of an MP Scene document | no |
| `picsart_media_list_fonts` | Curated font catalog. **Required** before authoring text — there is no system-font fallback, so `Inter`/`Arial` produce empty text | no |

## Inspect inputs

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_probe_media` | Metadata for a remote media URL (kind, display width/height, duration, content type, bytes) from ≤256KiB of ranged fetches — no download | no |

## Templates

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_list_scene_templates` | Enumerate the curated template catalog (title cards, lower thirds, product cards…) | no |
| `picsart_media_describe_scene_template` | One template's declared parameters, defaults, ranges, and dimensions | no |
| `picsart_media_apply_scene_template` | Instantiate a template with bindings — by default as a `scene_ref` layer to drop into a parent scene | no |
| `picsart_media_expand_scene_ref` | Detach a `scene_ref` into concrete editable layers, inlined in place | no |

## Author and edit a scene

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_patch_scene` | Batch of ID-anchored `set` / `remove` / `add` edit ops — the token-cheap alternative to re-emitting the whole scene | no |
| `picsart_media_apply_effect` | Apply a named effect (`gaussian_blur`, `drop_shadow`, `stroke`, …) to a layer; re-applying the same id replaces it | no |
| `picsart_media_apply_look` | Apply a composite look (`vintage_bw`, `light_leak`, `shimmer`, …) to a media or `scene_ref` layer | no |
| `picsart_media_apply_motion_preset` | Apply a motion preset (`ken_burns`, `glow_pulse`, `scale_pop`, …); presets declare which layer kinds they accept | no |
| `picsart_media_apply_text_animation` | Apply a text-animation preset (`typewriter`, `fade_in_chars`, `slide_up_lines`, …) to a text layer | no |
| `picsart_media_resolve_looks` | Bake every by-reference look into its nested composition, returning a self-contained scene | no |

## Check before rendering

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_validate_scene` | Structured diagnostics with JSON paths and stable codes; valid = no `error` severity | no |
| `picsart_media_query_layout` | Where every layer actually lands at a given time — box, center, rotation, z-index, on-canvas coverage — without rendering pixels | no |
| `picsart_media_contact_sheet` | Low-res jpeg thumbnails at given `times` (or evenly spaced `frames`) — a cheap visual check before a full render | **yes** |
| `picsart_media_translate_scene` | Translate a scene to an engine project file on disk, returning `{ path, cached, summary }` | no |

## Render

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_export` | Render a finished scene to a real file — `format: "video"` (MP4, default) or `"image"` (PNG). Caps at 1920×1920 | **yes** |
| `picsart_media_overview` | Compile a deck (a scene of `scene_ref` slides) into a single grid-of-thumbnails board scene | no |

## Motion graphics above 1920×1920

The scene tools cap at 1920×1920. These three generate and render code-based motion graphics
(title cards, animated logos, ambient loops, kinetic typography) up to 3840×2160 — and are the
only way to get `ultra_hd` output.

| Tool | Purpose | Spends credits |
|---|---|---|
| `picsart_media_video_create` | Generate a new motion-graphics clip from a natural-language brief | **yes** |
| `picsart_media_video_revise` | Edit or fix an existing `code_url` output (pass `error` when fixing a broken render) | **yes** |
| `picsart_media_video_render` | Render a `code_url` to MP4 — `hd` / `full_hd` (default) / `ultra_hd` | **yes** |

Not for template slideshows, montage/concat, contact sheets, or captions over user media — use
the scene tools above for those.

## Credits

Only five media tools spend credits: `picsart_media_contact_sheet`, `picsart_media_export`,
`picsart_media_video_create`, `picsart_media_video_render`, `picsart_media_video_revise`.
Every other tool in the family is a free, pure scene transformation — so authoring, validating,
and layout-checking are all free, and you only pay when pixels are produced.

## More

- **[MCP Quickstart](/guide/mcp-quickstart)** — connecting, and the generation tool catalog
- **[Local files → URLs](/guide/local-files)** — these tools take URLs, never filesystem paths
- **[Pricing & Credits](/guide/pricing)** — how cost is computed
