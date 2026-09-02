---
title: "Picsart Media Studio"
description: "Picsart Media Studio is a scene-graph compositor over MCP — author an MP Scene document, validate it, then render it deterministically to video or stills."
---

# Picsart Media Studio

**Picsart Media Studio** is a scene-graph compositor exposed over the
[Model Context Protocol](https://modelcontextprotocol.io). An agent authors a structured **MP Scene**
document — layers, timing, text, fonts, layout, effects, transitions — inspects and validates it,
then renders that document to a real file.

The thing you keep is the document: inspectable, re-renderable, and version-controllable.
`picsart_media_export` renders it the way a browser renders HTML — same input, same output.

::: tip This is not the Picsart MCP server
Media Studio is a **separate connector**, with its own endpoint and its own 29 tools, all prefixed
`picsart_media_`. The [Picsart MCP server](/guide/mcp-quickstart) is a different product: it exposes
Picsart's model catalog and mirrors a subset of these media tools. Connecting one does not connect
the other.
:::

## How it works

1. **Orient.** `picsart_media_quickstart` returns ready-to-run call sequences for common tasks.
   `picsart_media_get_capabilities` and `picsart_media_get_scene_schema` report what the engine
   supports and the exact shape of a scene.
2. **Bring media in.** `picsart_media_upload` opens a drag-and-drop widget; `picsart_media_drive_list`
   browses files already in your Picsart Drive. Every tool takes a URL — never a filesystem path.
3. **Author.** Start from a template (`picsart_media_apply_scene_template`) or build layers directly,
   then refine with `picsart_media_patch_scene` and the `apply_*` tools.
4. **Check.** `picsart_media_validate_scene` returns structured diagnostics,
   `picsart_media_query_layout` reports where every layer actually lands without rendering, and
   `picsart_media_contact_sheet` returns thumbnails you can look at.
5. **Render.** `picsart_media_export` produces the finished file.

**Nothing is persisted server-side between calls.** Almost every tool takes a scene in and returns a
scene out; the agent holds the document and passes it along. That is why most of the surface is
marked read-only even though it transforms the scene — see
[Behaviour and cost](/guide/media-studio/tools#behaviour-and-cost).

## What it is for

- Decks and slideshows built from templates
- Concatenating and trimming clips into a montage
- Captions, titles and lower thirds over footage you supply
- Contact sheets and thumbnail-grid overviews for reviewing a timeline
- Reframing a video to a different aspect ratio, tracking the subject
- Transcribing speech and describing video content

**What it is not:** a text-to-video or text-to-image model. There is no prompt-to-media tool here.
Everything that produces pixels composites a document you assembled from a fixed catalogue of
templates, effects, looks, motion presets and fonts. For Picsart's generative models, use the
[Picsart MCP server](/guide/mcp-quickstart) instead.

## Prerequisites

- A **Picsart account.** Drive tools and every render require a signed-in user; there is no
  anonymous mode.
- **Credits**, for the tools that dispatch remote compute — see [Cost](#cost).
- On **Claude Team or Enterprise**, the connector must be added at the **organization** level:
  *Organization settings → Connectors → Add custom connector*. This needs an elevated role, so if
  you see *"Contact an organization owner to install connectors"*, ask whoever administers your
  Claude organization. Installing it on your own account alone does nothing.

## Connect

Media Studio is a **remote** MCP server: you point your client at a URL, and the client runs the
OAuth flow in your browser at connect time.

| Setting | Value |
|---|---|
| **Server URL** | `https://api.picsart.com/connectors/media-tools/mcp` |
| **Transport** | Streamable HTTP (stateless) |
| **Auth** | OAuth 2.0, discovered from the server — PKCE (`S256`), refresh tokens, and Dynamic Client Registration are all supported |
| **Scopes** | `openid profile workflows.execute` |
| **Same URL for everyone** | Yes — there is no per-tenant endpoint |

::: warning This is not the `gen-ai` CLI
The rest of this site documents the [Picsart MCP server](/guide/mcp-quickstart), which runs
**locally** as `gen-ai-mcp` and authenticates with `gen-ai login`. Media Studio does neither. Do not
install the CLI for it, and do not run `gen-ai login` — the connector handles sign-in itself.
:::

### Claude (web and desktop)

Add it as a custom connector and paste the server URL. On Team or Enterprise this must be done by an
Owner at the organization level (see [Prerequisites](#prerequisites)). Claude discovers the OAuth
configuration from the server, opens a browser window for you to authorize, and the tools appear in
your next conversation.

### Claude Code

```bash
claude mcp add --transport http picsart-media-studio https://api.picsart.com/connectors/media-tools/mcp
```

Claude Code triggers the OAuth flow on first use. Check the connection with `/mcp`.

### Any other MCP client

Point it at the server URL over Streamable HTTP and let it perform OAuth discovery. Clients that
support Dynamic Client Registration need no credentials configured up front.

### Headless and CI

Send a Picsart workspace personal access token as a bearer token instead of running the interactive
flow:

```
Authorization: Bearer paat-...
```

The token needs the `workflows.execute` scope.

## Example prompts

Ask in plain language — the agent picks the tools. These three are known-good starting points,
covering a read-only lookup, something that produces a file, and a multi-tool chain.

**Browse and inspect (read-only)**

> *"List the videos in my Picsart Drive, then tell me the duration and dimensions of the most recent
> one."*

Exercises `picsart_media_drive_list` → `picsart_media_probe_media`. Nothing is created and no
compute is dispatched.

**Build and render a title card**

> *"Show me the available scene templates, build a title card that reads 'Summer Collection' with a
> subtitle, show me a thumbnail so I can check it, then render it as a PNG."*

Exercises `picsart_media_list_scene_templates` → `picsart_media_describe_scene_template` →
`picsart_media_apply_scene_template` → `picsart_media_patch_scene` →
`picsart_media_contact_sheet` → `picsart_media_export`.

**Caption a video from your own footage**

> *"Upload a video from my computer, transcribe what is said in it, and burn the captions in."*

Exercises `picsart_media_upload` → `picsart_media_probe_media` → `picsart_media_transcribe` →
`picsart_media_patch_scene` → `picsart_media_export`. `picsart_media_transcribe` returns a
transcript already shaped as a captions layer, so it drops straight into the scene.

::: tip Start with quickstart
If you are not sure how to phrase something, ask the agent to *"check the Picsart quickstart for how
to do X"*. `picsart_media_quickstart` returns the actual call sequence for merging clips, building a
contact sheet, or exporting.
:::

## What you will see

Two tools render an interactive panel in the conversation rather than returning plain text:

- **Upload** (`picsart_media_upload`) — a drag-and-drop dropzone, plus a tab for picking files
  already in your Drive. Files upload straight from your browser; no bytes pass through the tool. The
  resulting URLs arrive on your next message, not in the tool's own result.
- **Render result** (`picsart_media_export`) — a player for the finished file, with download and
  save-to-Drive actions.

## Cost

Most of the surface is free: authoring, patching, validating and layout-checking all run as pure
transformations of the document you pass in, with no remote work dispatched.

| Tools | Cost |
|---|---|
| `picsart_media_export` | Dispatches a real render. Measured to draw **zero credits today** — a live balance probe moved nothing — though that is a current measurement, not a published price. |
| `picsart_media_contact_sheet` | Dispatches a real render, but a cheap one — a few low-res sampled frames for previewing, not the deliverable. Zero credits today, and expected to stay that way given how little compute it takes, though that is not a guaranteed price. |
| `picsart_media_transcribe`, `picsart_media_describe_video`, `picsart_media_reframe_video` | Dispatch remote compute and **may draw on credits**. |
| Every other tool | Dispatches no render and costs nothing. Most are local transforms of the document you pass in; the Drive, upload and probe tools do reach the network, but only to list files, add a file entry, or read a few bytes of a header. |

This connector has **no balance tool** — check and top up credits in your Picsart account. For how
Picsart credits work in general, see [Pricing & Credits](/guide/pricing) (written for the generative
catalog, so its per-model costs and dry-run estimates do not apply here).

## Limits

Enforced by the tools themselves:

| Limit | Value |
|---|---|
| Inline thumbnails per `contact_sheet` call | 8 |
| `drive_list` page size | 128 files |
| Upload widget filename hints / pre-seeded URLs | 20 / 50 |

Composition ceilings — maximum resolution, duration, layer count and audio tracks — are **reported
at runtime** by `picsart_media_get_capabilities` (ask for the `limits` section). Read them from there
rather than assuming: they are engine configuration and can change.

`picsart_media_get_capabilities` returns a large document — the whole thing is roughly 135 KB. Called
with no arguments it returns just the section index, so ask for the sections you need.

## Support and policies

Media Studio works with Claude and is built on Anthropic's open
[Model Context Protocol](https://modelcontextprotocol.io) standard.

For help with a Picsart account or credits, use the support channel on your Picsart account. A
dedicated support address, privacy policy and security contact for this connector are being
published separately.

## More

- **[Tool reference](/guide/media-studio/tools)** — all 29 tools, what each does, and its cost
- **[Scenes and authoring](/guide/media-studio/scenes)** — the MP Scene document model
- **[Troubleshooting](/guide/media-studio/troubleshooting)** — errors and what they mean
- **[Local files → URLs](/guide/local-files)** — these tools take URLs, never filesystem paths
