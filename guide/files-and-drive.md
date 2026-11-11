---
description: "Save, upload, and organize AI-generated assets in Picsart Drive from the gen-ai CLI and MCP."
---

# Files & Drive

Generated assets — and any files you upload — live in **Picsart Drive**, your centralized cloud library. Outputs from every model land in one place, so you don't download from one tool and re-upload to another.

## Save generations to Drive

**CLI:**

The CLI saves every generation to Drive by default, in a `gen-ai-cli` folder:

```bash
gen-ai generate -m flux-2-pro -p "a poster"                              # saved to Drive/gen-ai-cli
gen-ai generate -m flux-2-pro -p "a poster" --drive-folder "Campaign Q3"  # a different folder
gen-ai generate -m flux-2-pro -p "a poster" --no-save-to-drive           # local download only
```

When saving, the CLI uses an LLM-generated descriptive filename and (for video, when `ffmpeg` is installed) a first-frame thumbnail — matching the web app's behavior.

**MCP:** generation tools write to Drive when the Drive option is enabled for the call.

## Upload

```bash
gen-ai upload ./photo.jpg                  # single file
gen-ai upload ./assets/ -r                 # a whole folder, recursively
gen-ai upload ./photo.jpg -f "Campaign"    # into a named Drive folder
gen-ai upload ./assets/ -r --dry-run       # list what would be uploaded
gen-ai upload ./photo.jpg --json           # { ok, files: [{ path, url, driveUid, error }] }
```

Over MCP, upload is an **action of the single `picsart_drive` tool** (see below). It takes either
a chat attachment or a URL — **not a filesystem path**:

```json
{ "name": "picsart_drive",
  "arguments": { "action": "upload", "name": "Hero", "url": "https://example.com/photo.jpg" } }
```

Uploading returns `result.url`, a CDN-hosted URL you can feed straight into a generation as an
input image/video.

::: warning Local files need a URL first
No MCP tool accepts a filesystem path. See **[Local files → URLs](/guide/local-files)** for the
ways to get one: the built-in uploader, a chat attachment, a CLI upload, or (for small images) an
inline `data:` URI.
:::

## The `picsart_drive` tool

There is exactly **one** Drive tool. Its behavior is selected by the required `action` parameter:

| `action` | Required args | What it does |
|---|---|---|
| `list` | — | Browse a folder. `folderUid` omitted = root; `flat: true` lists every file across all folders. Paginated via `page`, `pageSize` (≤128), with optional `sort` and `type` filter |
| `create_folder` | `name` | Create a folder. `folderUid` = parent (omit for root), optional `description` |
| `upload` | `file` **or** `url` + `name` | Save a file. `file` is a chat attachment; `url` is an HTTPS URL or an inline `data:` URI (pushed to the CDN first). `folderUid` = destination, `type` = resource kind |
| `move` | `itemUids` | Move items to `targetFolderUid` (omit = root) |
| `delete` | `itemUids` | Soft-delete to trash unless `permanent: true` |
| `update` | `itemUid`, `attributes` | Set custom key/value attributes on a file (e.g. `{ coverUrl }`) |

Every action returns the current folder listing (folders, files, page math) so the Drive widget
can render. All actions require an authenticated call — Drive content is per-user.

```json
{ "name": "picsart_drive", "arguments": { "action": "list" } }
{ "name": "picsart_drive", "arguments": { "action": "list", "folderUid": "<uid>" } }
{ "name": "picsart_drive", "arguments": { "action": "create_folder", "name": "Campaign Q3" } }
{ "name": "picsart_drive", "arguments": { "action": "move", "itemUids": ["<uid>"], "targetFolderUid": "<uid>" } }
```

## Browse & organize from the CLI

```bash
gen-ai list --folders                          # list Drive folders
gen-ai list --json                             # list files as JSON ({ name, type, url, … } each)
gen-ai list -f "Campaign" --type video --json  # one folder, one media type
gen-ai download                                # interactive file picker
gen-ai download -f "Campaign" --all -o ./out   # everything in a folder (default ./downloads)
gen-ai download -f "Campaign" --list --json    # list without downloading
```

> Drive commands browse your real root folders — they are not scoped to the AI Playground folder.

## Copy a remote URL into Drive

To pin an asset that lives behind a short-lived or non-public URL, upload it by URL — the same
`upload` action, with the remote URL as `url`. The returned CDN URL is stable and fetchable by
the generation and render services.

```json
{ "name": "picsart_drive",
  "arguments": { "action": "upload", "name": "ref.jpg", "url": "https://example.com/ref.jpg" } }
```

## File formats

Accepted formats and file-size limits vary by model. Check the model schema with `picsart_model_params` or `gen-ai validate -m <model-id> --schema`. Acceptance by the upload command does not guarantee that a generation model accepts the same file.

## FAQ

**What file types can I upload?**

`gen-ai upload` accepts images (`jpg`, `jpeg`, `png`, `webp`, `gif`, `bmp`, `tiff`, `svg`, `heic`, `heif`, `avif`), video (`mp4`, `mov`, `avi`, `mkv`, `webm`, `m4v`, `wmv`), and audio (`mp3`, `wav`, `m4a`, `aac`, `ogg`, `flac`, `wma`); other files are skipped. Filter with `-t image|video|audio`. The upload returns a URL you can immediately use as an input to a generation.

**Are generated files private?**

Drive listings are account-scoped, but an asset URL may be usable by anyone who receives it. Download files you need to retain; do not assume a universal 24-hour expiry. See [Security](/guide/security).

**Does saving to Drive cost extra credits?**

See [picsart.com/pricing](https://picsart.com/pricing) for current Drive pricing details.

**Can I delete files from Drive?**

Over MCP, yes: `picsart_drive` with `action: "delete"` moves items to the trash, or erases them with `permanent: true`. The CLI does not have a delete command; manage deletion there from the [AI Playground web app](https://picsart.com/ai-playground/).
