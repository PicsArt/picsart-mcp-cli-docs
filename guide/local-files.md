---
description: "No Picsart MCP tool accepts a filesystem path — here are the ways to turn a local file into a URL, for both the gen-ai MCP server and Picsart Media Studio."
---

# Local files → URLs

::: danger No MCP tool accepts a filesystem path
Every file input across the whole MCP contract — `imageUrls`, `videoUrl`, the media tools' asset
references, `picsart_drive`'s `url` — is an **HTTP(S) URL**. There is no `filePath` parameter
anywhere. `/Users/me/photo.jpg` will never work.

Some gen-ai tools additionally accept an inline `data:` URI. On
[Picsart Media Studio](/guide/media-studio/) you don't need either — it has its own uploader, which is
route **D** below.
:::

This is not an oversight. An MCP server runs somewhere else (Picsart's infrastructure); it has no
access to the filesystem of the machine the agent is running on. So before any local file can be
used as a generation input, **something on your side has to give it a URL.**

Pick by which connector you are using, and by what your agent host can do.

::: tip Using Picsart Media Studio? It has its own uploader
Just ask Claude to open it — route **D** below. Routes A–C are for the gen-ai CLI and MCP server.
:::

## Comparison

| Path | Needs | Good for | Cost |
|---|---|---|---|
| **A. Picsart CLI upload** | Shell access | Anything — the general answer | Free, no tokens |
| **B. Chat attachment** | A host that forwards attachments (e.g. the ChatGPT app) | Files the user drags into the chat | Free, no tokens |
| **C. `data:` URI** | Nothing | Small images only, as a stopgap | **Very expensive in tokens** |
| **D. Media Studio upload widget** | The [Media Studio](/guide/media-studio/) connector | Any local file, on the `picsart_media_*` surface | Free, no tokens |

## A. Shell-capable agent → the Picsart CLI

If your agent can run shell commands (Claude Code, Cursor, Codex, a CI job), this is the
canonical path: upload with the [CLI](/guide/cli-quickstart), then hand the resulting URL to any
MCP tool.

```bash
gen-ai upload ./photo.jpg                 # single file
gen-ai upload ./renders/ -r               # a folder, recursively
gen-ai upload ./photo.jpg -f "Campaign"   # into a named Drive folder
```

`gen-ai upload` reports progress but does **not** print the resulting URL. To get the URL, list
Drive afterwards — `gen-ai list --json` emits `{ name, type, url }` per file:

```bash
gen-ai upload ./photo.jpg
gen-ai list --json | jq -r '.[] | select(.name == "photo.jpg") | .url'
```

For a single file where you want the URL back immediately, `gen-ai upload-to-drive` prints a
one-line JSON result containing it:

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

## B. Chat attachment → `picsart_drive` upload

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

## C. `data:` URI → `picsart_drive` upload

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

Use this only for **small images** (icons, logos, thumbnails — tens of KB), and only when
neither path A nor path B is available. It is a stopgap, not a general solution. Never do this
for video.
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

## D. Media Studio → the built-in uploader

[Picsart Media Studio](/guide/media-studio/) has its own uploader. Ask Claude to open it, drop the file
in, and carry on — it uploads straight from your browser, and you can also pick a file already in
your Picsart Drive.

Nothing to install, and no URL to produce yourself.

## More

- **[Files & Drive](/guide/files-and-drive)** — the rest of the Drive surface
- **[MCP Quickstart](/guide/mcp-quickstart)** — the full tool catalog
- **[CLI Quickstart](/guide/cli-quickstart)** — installing and using `gen-ai`
