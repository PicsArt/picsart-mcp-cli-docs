---
title: "Media Studio troubleshooting"
description: "Errors you can hit with Picsart Media Studio — connector install, sign-in, credits, fonts, local files, egress, validation — and what to do about each."
---

# Troubleshooting

Symptom, cause, fix. If something here does not match what you are seeing, ask the agent to call
`picsart_media_quickstart` — it returns the current recommended sequence for the task.

## Connecting

### "Contact an organization owner to install connectors"

On Claude **Team or Enterprise**, custom connectors are added at the organization level:
*Organization settings → Connectors → Add custom connector*. Installing anything on your own account
does not help — the connector has to exist at the org level first.

Adding it requires an elevated role, and if you cannot see that menu you do not hold it. Anthropic's
own documentation is the authority on exactly which role qualifies; ask whoever administers your
Claude organization to add it.

### The connector is listed but shows as disabled

Same cause as above: it was added personally rather than at the organization level, or the
org-level entry has not been enabled for your workspace.

### Sign-in fails, or you are asked to authorize repeatedly

Media Studio is a remote server, so sign-in happens in your browser at connect time and the client
holds the token. If it loops:

- Remove and re-add the connector, then authorize again. The second connect should be as clean as
  the first.
- Confirm the URL is exactly `https://api.picsart.com/connectors/media-tools/mcp`.
- Do **not** run `gen-ai login` — that is for the separate, locally-run
  [Picsart MCP server](/guide/mcp-quickstart) and has no effect here.

### A tool you read about is not in the list

It is a `preview`-channel tool. Media Studio's production surface is exactly the
[29 GA tools](/guide/media-studio/tools); preview tools are served only on internal environments and
will never appear on the production connector.

## Credits

### `NOT_ENOUGH_AVAILABLE_CREDITS - Not enough available credits`

This comes back as an ordinary tool result flagged as an error, not as an HTTP failure — so the
agent will usually report it as text rather than a crash.

Top up in your Picsart account. **This connector has no balance tool**: `picsart_credits` belongs to
the [Picsart MCP server](/guide/mcp-quickstart), not here, so neither you nor the agent can read your
balance through Media Studio.

The tools most likely to hit this are the three that draw on credits —
`picsart_media_transcribe`, `picsart_media_describe_video` and `picsart_media_reframe_video`.
Authoring, validating and layout checks dispatch no remote work at all, so they will not. Note that
`picsart_media_export` and `picsart_media_contact_sheet` run through the same credit-accounting path
even though they are not currently metered, so a zero balance can surface here too. See
[Cost](/guide/media-tools#cost).

## Media in

### `local_source_not_supported` — "is a local filesystem path (or `file://` URI)"

The server and the renderer have no access to your filesystem, so a path can never be fetched. The
fix is `picsart_media_upload`: it opens a drag-and-drop widget, the file uploads straight from your
browser, and you get a URL back.

Note the **two-turn handshake** — the upload tool call only *opens* the widget and returns no URL
itself. The URLs arrive with your next message, so the agent has to wait for you before it can
continue.

### `local_source_not_supported` — "is an inline `data:` URI"

Also refused, deliberately: this surface takes media **by reference**, not as file bytes pasted into
a tool call. Use `picsart_media_upload` here too.

### "SSRF egress guard: host … resolved to a non-public address"

Every URL these tools fetch is validated before connection, and private, loopback, link-local, CGNAT,
multicast and metadata addresses are all refused — including when a public hostname resolves to one
(DNS rebinding). A URL on your own machine or private network cannot be used; upload the file
instead.

### A URL behind authentication does not work

The renderer fetches assets anonymously. Signed URLs work only while their signature is valid, and
anything requiring a header or cookie will fail. Save the file to your Picsart Drive, or upload it.

## Authoring

### Text renders as nothing at all

The font did not resolve, and this fails silently rather than erroring. There is **no system-font
fallback** — `Inter`, `Arial`, `Helvetica` and friends are not present. Call
`picsart_media_list_fonts` and use a `key` from the catalog.

### The scene will not validate

`picsart_media_validate_scene` returns structured diagnostics, each with a JSON path and a stable
code. Anything at `error` severity blocks a render; warnings do not. Fix the paths it names, then
re-validate — it is free, so there is no reason to skip it before exporting.

### A patch failed partway

`picsart_media_patch_scene` returns a structured failure rather than a flat message:

```jsonc
{ "ok": false, "error": { "code": "…", "message": "…", "opIndex": 2, "diagnostics": [ … ] } }
```

`opIndex` is the position of the failing op in your batch. Ops are ID-anchored, so the usual cause is
a layer `id` that does not exist in the scene you passed.

### A layer is off-canvas, or the wrong thing is on top

`picsart_media_query_layout` reports each layer's real box, centre, rotation, z-index and on-canvas
coverage at a given time, without rendering. Cheaper and more precise than eyeballing a thumbnail.

### Clips overlap when they should run in sequence

Sequencing and overlay are different constructs. Back-to-back clips need a single `track` layer;
separate top-level entries in `layers[]` each have their own `start` and `duration` and will stack.
See [Sequencing versus overlay](/guide/media-studio/scenes#sequencing-versus-overlay).

## Rendering

### The composition is too large

Maximum composition size is reported by `picsart_media_get_capabilities` under `limits` — currently
1920 × 1920, alongside caps on duration, layer count and audio tracks. Read them at runtime rather
than assuming; they are engine configuration.

### `picsart_media_contact_sheet` returned fewer pictures than requested

Expected, not a failure — at most **8** inline images come back per call. What you can do about the
rest depends on the mode:

- If you passed **`frames: N`**, the extras are in the JSON with their `url` and `inline: false`.
  They were rendered, so open those URLs; retrying only re-renders them.
- If you passed **`times: [...]`**, the extras were **never rendered and have no URL**. The tool
  clamps to 8 before dispatching and keeps an evenly-spaced subset, so you may not get the specific
  moments you asked for. The response lists which times were dropped. Split the request into calls
  of 8 times or fewer.

### The result panel does not render

The two interactive panels are versioned MCP App resources. Retired URIs are still served through
compatibility aliases, so an older client keeps working, but a client pinned to a very old URI should
be pointed at the current one. If the panel is blank, the underlying URLs are still in the tool's
JSON result.

### `picsart_media_get_capabilities` blew up the response

The full document is roughly 135 KB. Called with no arguments it returns only the section index —
then ask for the sections you need. `looks` alone is about 62 KB; ask for `looksCompact` first to see
what exists, then fetch the one look you actually want.

## Still stuck?

- `picsart_media_quickstart` — the current recommended call sequence per task
- `picsart_media_list_recipes` / `picsart_media_get_recipe` — longer authoring guides
- [Tool reference](/guide/media-studio/tools) — what each tool does and costs
- [Scenes and authoring](/guide/media-studio/scenes) — the document model
