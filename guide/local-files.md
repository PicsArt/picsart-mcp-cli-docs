---
description: "No Picsart MCP tool accepts a filesystem path — here's how to turn a local file into a URL an agent can pass to picsart_generate or the media tools, whether your host renders upload widgets, forwards chat attachments, or neither."
---

# Local files → URLs

::: danger No MCP tool accepts a filesystem path
Every file input across the whole MCP contract — `imageUrls`, `videoUrl`, the media tools' asset
references, `picsart_drive`'s `url` — is an **HTTP(S) URL** or an inline `data:` URI. There is no
`filePath` parameter anywhere. `/Users/me/photo.jpg` will never work.
:::

This is not an oversight. An MCP server runs somewhere else (Picsart's infrastructure); it has no
access to the filesystem of the machine the agent is running on. So before any local file can be
used as a generation input, **something on your side has to give it a URL.**

The easiest fix, where it's available, is a browser-based **upload widget** — an MCP tool that
opens a drag-and-drop panel right in your browser and hands the resulting URL back to the agent.
Where that's not available, the CLI and a couple of other routes still get the job done.

## Comparison

| Path | Needs | Good for | Cost |
|---|---|---|---|
| **A. Upload widget** | A host that renders MCP Apps widgets (Claude web/desktop/Cowork, ChatGPT, Cursor, VS Code Copilot, Goose) | The easiest path when it's available — no CLI, no shell | Free, no tokens |
| **B. Picsart CLI upload** | Shell access | Anything — the general fallback, and the best fit for scripting/CI | Free, no tokens |
| **C. Chat attachment** | A host that forwards attachments (e.g. the ChatGPT app) | Files the user drags into the chat | Free, no tokens |
| **D. `data:` URI** | Nothing | Small images only, as a stopgap | **Very expensive in tokens** |

## A. Upload widget → drag, drop, done

If your agent host renders **MCP Apps** widgets — this includes Claude web/desktop/Cowork,
ChatGPT, Cursor, VS Code Copilot, and Goose — this is the easiest path, with nothing to install:

- **`picsart_upload_widget`** — on the **Picsart MCP** connector (tools prefixed `picsart_*`).
  Also has a "Save to Drive" option and a Drive-browsing tab.
- **`mp_upload`** — on the **Picsart Media Tools** connector (tools prefixed `mp_*`). No Drive
  integration; its second tab is "Use existing" (pickable chips from URLs already produced earlier
  in the conversation), not a Drive browser.

Just ask the agent to upload a file, or call the tool directly with no arguments to open a plain
drag-and-drop panel:

```json
{ "name": "mp_upload", "arguments": {} }
```

Both tools also take optional `purpose` (a label for the dropzone), `accept` (restrict to `image`,
`video`, or `audio`), `detected_files` (filenames the agent can see but can't reach itself — a
best-effort hint, not a filter), and `known_urls` (URLs already available, offered as pickable
chips so you don't have to re-upload).

The file uploads straight from **your browser** to Picsart's CDN — no auth, no tokens spent, and
no file bytes ever pass through the tool call. The one thing to know: the widget reports the
uploaded URL back on your **next message**, not instantly in the same turn — most agent hosts
don't deliver it any faster than that. If the agent says it can't see the file yet, send a follow-up
message rather than assuming the upload failed.

## B. Shell-capable agent → the Picsart CLI

Still the right call when there's no widget-rendering host in the loop, or you're scripting/CI —
nothing beats a one-liner there.

If your agent can run shell commands (Claude Code, Cursor, Codex, a CI job), this is the
canonical path: upload with the [CLI](/guide/cli-quickstart), then hand the resulting URL to any
MCP tool.

```bash
gen-ai upload ./photo.jpg                 # single file
gen-ai upload ./renders/ -r               # a folder, recursively
gen-ai upload ./photo.jpg -f "Campaign"   # into a named Drive folder
```

In its default (non-JSON) mode, `gen-ai upload` only reports progress (`✓ photo.jpg`) — it does
not print the URL. Add `--json` to get it directly: stdout carries one JSON payload with a `files`
array, one entry per upload, each with its CDN `url`:

```bash
gen-ai upload ./photo.jpg --json
# {"ok":true,"files":[{"path":"/abs/path/photo.jpg","url":"https://cdn.../photo.jpg","driveUid":"...","error":null}]}
```

```bash
gen-ai upload ./photo.jpg --json | jq -r '.files[0].url'
```

If you'd rather not use `--json`, the same URL is also recoverable afterwards by listing
Drive — `gen-ai list --json` emits `{ name, type, url }` per file:

```bash
gen-ai upload ./photo.jpg
gen-ai list --json | jq -r '.[] | select(.name == "photo.jpg") | .url'
```

For a single file where you want the URL back immediately without `--json`, `gen-ai upload-to-drive`
prints a one-line JSON result containing it:

```bash
gen-ai upload-to-drive ./clip.mp4
# {"status":"ok","drive_url":"https://cdn.../clip.mp4","drive_uid":"...","file_name":"clip.mp4","elapsed_ms":812}
```

::: warning `upload-to-drive` is video-shaped
It saves the file as a `VIDEO` resource and appends `.mp4` to the display name. The returned CDN
URL is a plain URL and works fine as an image input too, but the Drive entry will be
mislabelled. For images prefer `gen-ai upload` + `gen-ai list --json`.
:::

Then pass the URL straight through:

```json
{ "name": "picsart_remove_bg",
  "arguments": { "imageUrls": ["https://cdn.picsart.com/.../photo.jpg"] } }
```

Requires `gen-ai login` once — see [Authentication](/guide/authentication).

## C. Chat attachment → `picsart_drive` upload

Hosts that expose user attachments to MCP tools (notably the **ChatGPT app**) can pass the
attachment handle directly to `picsart_drive`. Nothing has to touch a filesystem:

```json
{ "name": "picsart_drive",
  "arguments": { "action": "upload", "file": "<attachment>" } }
```

The result's `result.url` is a CDN-hosted URL, ready to pass to `picsart_generate`'s `imageUrls`
or any media tool. Add `folderUid` to choose a destination folder and `type` to set the resource
kind.

This is the best experience where it's available — the user drags a file into the conversation
and the agent does the rest. It is **not** available in hosts that keep attachments out of tool
arguments, which includes most desktop MCP clients today.

## D. `data:` URI → `picsart_drive` upload

`picsart_drive`'s `upload` action accepts an inline `data:` URI in its `url` parameter (the server
pushes it to the Picsart CDN first and returns the resulting URL). So an agent that can read the
file into its own context — but has no shell — can inline it:

```json
{ "name": "picsart_drive",
  "arguments": {
    "action": "upload",
    "name": "logo.png",
    "url": "data:image/png;base64,iVBORw0KGgoAAAANS..."
  } }
```

::: danger This costs real model-context tokens
Base64 inflates the file by ~33%, and every character of it passes through the model's context
window. A **1 MB file is roughly 350,000 tokens** — likely more than the context window allows,
and billed as model input on the agent's side even when it fits.

Use this only for **small images** (icons, logos, thumbnails — tens of KB), and only when none of
paths A–C are available. It is a stopgap, not a general solution. Never do this for video.
:::

## What about remote URLs behind auth?

If the asset already lives on a URL the render service can't reach (a short-lived signed URL, or
a host requiring auth), copy it into Drive first with the same `upload` action, passing the
remote URL instead of a `data:` URI:

```json
{ "name": "picsart_drive",
  "arguments": { "action": "upload", "name": "ref.jpg", "url": "https://example.com/ref.jpg" } }
```

The returned CDN URL is stable and publicly fetchable by the generation and render services.

## More

- **[Files & Drive](/guide/files-and-drive)** — the rest of the Drive surface
- **[MCP Quickstart](/guide/mcp-quickstart)** — the full tool catalog
- **[CLI Quickstart](/guide/cli-quickstart)** — installing and using `gen-ai`
