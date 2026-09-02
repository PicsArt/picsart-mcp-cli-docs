---
title: "Media Studio tool reference"
description: "All 29 picsart_media_* tools in Picsart Media Studio — what each one does, whether it writes anything, and whether it dispatches remote compute."
---

# Tool reference

The **29 tools** below are the complete Media Studio surface as shipped in `v1.0.0`. Every tool is
purpose-built — there is no catch-all tool with a `method` parameter.

::: tip Three tools you will use first
`picsart_media_quickstart` for the call sequence, `picsart_media_get_capabilities` for what the
engine supports, and `picsart_media_list_fonts` before authoring any text.
:::

## Behaviour and cost

Two columns below need explaining, because the obvious reading of each is wrong.

**Behaviour** is the MCP `readOnlyHint`, and in MCP *read-only means no server-side side effect* —
not that the tool leaves its arguments untouched. `picsart_media_patch_scene` and the `apply_*` tools
are read-only: a scene goes in by value, a new scene comes out, and nothing on the server changes.
Only three tools are marked as writing — `picsart_media_export`, `picsart_media_contact_sheet` and
`picsart_media_drive_save` — because each leaves a durable file behind.

**Compute** is separate from behaviour, and the two deliberately do not line up. The analysis tools
dispatch real GPU work but create nothing, so they are read-only *and* costly. `export` creates a
file, so it writes — even though it happens to draw no credits.

| Compute | Meaning |
|---|---|
| **Pure** | No render is dispatched and nothing is charged. Most of these are local transforms of the document you passed in; the Drive, upload and probe tools do reach the network, but only for a directory listing, a file entry or a few small ranged reads — never a render. |
| **Render** | Dispatches a real render. `export` is **confirmed to draw zero credits** by a live balance probe. `contact_sheet` is a cheap preview render — zero credits today and expected to stay that way, though not a guaranteed price. |
| **Remote** | Dispatches remote compute and **may draw on credits**. |

Drive tools need an authenticated user but dispatch no render.

## Orientation and recipes

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_quickstart` | **Call this first.** Ready-to-run tool-call sequences for common tasks — merging clips, contact sheets, exporting. Omit `recipe` for the index. | Read-only | Pure |
| `picsart_media_get_capabilities` | What the engine supports: layer content kinds, animatable properties, effect and transition ids, easing, blend modes, looks, motion and text-animation presets, plus operational `limits`. Pass `sections` — the full document is ~135 KB, and calling it bare returns only the section index. | Read-only | Pure |
| `picsart_media_get_scene_schema` | The JSON Schema for an MP Scene document. Optionally scoped by name. | Read-only | Pure |
| `picsart_media_list_fonts` | The curated font catalog. **Required before authoring text** — there is no system-font fallback, so `Inter` or `Arial` render as empty text. | Read-only | Pure |
| `picsart_media_list_recipes` | Metadata for the authoring know-how guides — name, description, category only, so the whole catalog is cheap to read. | Read-only | Pure |
| `picsart_media_get_recipe` | One recipe's full instructions, plus the companion reference files it links to. Pass `reference` to fetch one companion file instead of the body. | Read-only | Pure |

## Getting media in

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_upload` | Opens a drag-and-drop widget so you can hand a local image, video or audio file to the conversation as a URL. Files upload straight from your browser. **Two-turn handshake:** the call only opens the widget; the URLs arrive on your next message. `detected_files` (≤20) is a display hint only and never filters what you drop; `known_urls` (≤50) pre-seeds a "Use existing" tab. | Read-only | Pure |

## Inspect inputs

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_probe_media` | A remote URL's metadata without downloading it: kind, as-displayed width and height (EXIF orientation applied), duration, content type, byte size — from ranged fetches only. Container facts, never content. | Read-only | Pure |

## Templates

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_list_scene_templates` | The curated template catalog — title cards, lower thirds, product cards and so on. | Read-only | Pure |
| `picsart_media_describe_scene_template` | One template's declared parameters, with types, defaults, ranges, required flags, and composition dimensions. | Read-only | Pure |
| `picsart_media_apply_scene_template` | Instantiate a template with parameter bindings. By default packages it as a `scene_ref` layer to drop into a parent scene. | Read-only | Pure |
| `picsart_media_expand_scene_ref` | Detach a `scene_ref` into concrete editable layers, inlined in place. Omit `layerId` to expand every resolvable ref. | Read-only | Pure |

## Author and edit

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_patch_scene` | A batch of ID-anchored `set` / `remove` / `add` edit ops — the token-cheap alternative to re-emitting the whole scene on every change. | Read-only | Pure |
| `picsart_media_apply_effect` | Apply a named effect (`gaussian_blur`, `drop_shadow`, `stroke`, …) to a visual layer, with catalog defaults filled in. Re-applying the same id replaces it. | Read-only | Pure |
| `picsart_media_apply_look` | Apply a composite look (`vintage_bw`, `light_leak`, `shimmer`, …) to a media or `scene_ref` layer. Wraps the layer's content in a nested composition so the treatment covers all of it. | Read-only | Pure |
| `picsart_media_apply_motion_preset` | Apply a motion preset (`ken_burns`, `glow_pulse`, `scale_pop`, …). Presets declare which layer kinds they accept. | Read-only | Pure |
| `picsart_media_apply_text_animation` | Apply a text-animation preset (`typewriter`, `fade_in_chars`, `slide_up_lines`, …) to a text layer. | Read-only | Pure |
| `picsart_media_resolve_looks` | Bake every by-reference look into its nested composition, returning a self-contained scene with no look indirection left. | Read-only | Pure |

## Check before rendering

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_validate_scene` | Structured diagnostics with JSON paths and stable codes. Valid means nothing at `error` severity. | Read-only | Pure |
| `picsart_media_query_layout` | Where every layer actually lands at a given time — box, centre, rotation, z-index, on-canvas coverage — without rendering pixels. The cheap way to catch overlap and off-canvas layers. | Read-only | Pure |
| `picsart_media_translate_scene` | Translate a scene into the engine's loadable project format, written to a content-addressed file; returns `{ path, cached, summary }` rather than inlining it. | Read-only | Pure |

## Render

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_contact_sheet` | Low-res JPEG thumbnails you can actually look at, returned as inline images. Pass `times` for exact moments (preferred) or `frames` for even spacing. **At most 8 images come back inline per call**, and the two modes handle the excess differently — see [the inline budget](#the-inline-budget). | Writes | Render |
| `picsart_media_export` | Render a finished scene to a real file, returning the output URL(s). `mediaType` picks the container: `mp4` (default), `mov`, `webm`, `png`, `jpeg`, `heif`, `webp`, `gif`, or `image-sequence`. Single-output renders are saved to your Drive automatically; use `fileName` to name them. `downloadUrls` entries are for handing to a person — pass the matching `urls` entry back into other tools. | Writes | Render |
| `picsart_media_overview` | Compile a deck — a scene whose top-level track is `scene_ref` slides — into one board scene laying those same slides out as a grid of thumbnails. A spatial projection of the deck, not a capability index. | Read-only | Pure |

## Analyze existing media

These three read media you already have. They return text, JSON or keyframes — never new pixels or
audio.

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_transcribe` | Speech to text with word-level timestamps and optional speaker diarization. The `transcript` comes back already shaped as a captions layer, so it drops straight into `patch_scene`. Also returns `cutPoints` — word-boundary-safe timestamps for trimming without cutting mid-word. Spoken words only. | Read-only | Remote |
| `picsart_media_describe_video` | What is happening in a video: subjects, setting, actions, on-screen text, mood, pacing, dominant colours — plus a `suggestedAspect` you can feed to `reframe_video`, and an `answer` field when you pass a `question`. `detail` is `brief`, `standard` or `deep`; `backend` selects the analysis model. Describes visuals; never transcribes speech. | Read-only | Remote |
| `picsart_media_reframe_video` | Reframe a video to another aspect ratio (`9:16`, `4:5`, `1:1`, `3:4`, `4:3`, `16:9`), tracking the subject with an animated pan and zoom instead of a fixed centre crop. Returns a scene ready for `export`. It moves and scales the footage you already have — it never invents new pixels to fill a wider frame, so output resolution is bounded by what the source contains at the target aspect. | Read-only | Remote |

## Picsart Drive

Both require a signed-in Picsart user; there is no anonymous Drive.

| Tool | What it does | Behaviour | Compute |
|---|---|---|---|
| `picsart_media_drive_list` | Page through your own Drive — folders to descend into, and files with URLs you can pass straight to any tool that takes a media URL. `pageSize` up to **128**; `flat: true` lists every file at once. Never creates, moves, renames or deletes. | Read-only | Pure |
| `picsart_media_drive_save` | Save an existing media URL into your Drive as a new entry, returning its `uid`. Only `https` URLs on Picsart's own domains are accepted. Adds a file; never moves, renames or deletes. | Writes | Pure |

## The inline budget

`picsart_media_contact_sheet` returns at most **8** inline images per call. What happens to the
excess depends on which mode you used, and the difference matters:

- **`times: [...]`** — the tool clamps to 8 **before rendering anything**, so the extra frames are
  never rendered and have **no URL to open**. It also picks an evenly-spaced subset rather than the
  first 8, so asking for 9 exact moments does not reliably get you any particular one of them.
  **Request at most 8 times per call** if you want exactly the moments you asked for. Dropped times
  are listed in a note on the response.
- **`frames: N`** — frames past the budget still come back in the JSON with their `url` and
  `inline: false`. Those are real, rendered frames: open the URLs rather than retrying the call,
  which would only re-render them.

## More

- **[Overview](/guide/media-tools)** — what Media Studio is, and how to connect
- **[Scenes and authoring](/guide/media-studio/scenes)** — the document model these tools operate on
- **[Troubleshooting](/guide/media-studio/troubleshooting)** — errors and what they mean
