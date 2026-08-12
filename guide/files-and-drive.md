---
description: "Save, upload, and organize AI-generated assets in Picsart Drive from the gen-ai CLI and MCP."
---

# Files & Drive

Generated assets — and any files you upload — live in **Picsart Drive**, your centralized cloud library. Outputs from every model land in one place, so you don't download from one tool and re-upload to another.

## Save generations to Drive

**CLI:**

```bash
gen-ai generate -m flux-2-pro -p "a poster" --save-to-drive
gen-ai generate -m flux-2-pro -p "a poster" --drive-folder "Campaign Q3"
```

When saving, the CLI uses an LLM-generated descriptive filename and (for video) an ffmpeg thumbnail — matching the web app's behavior.

**MCP:** generation tools write to Drive when the Drive option is enabled for the call.

## Upload

```bash
gen-ai upload ./photo.jpg                  # single file
gen-ai upload ./assets/ -r                 # a whole folder, recursively
gen-ai upload ./photo.jpg -f "Campaign"    # into a named Drive folder
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
three ways to get one — CLI upload, a chat attachment, or (for small images) an inline `data:`
URI.
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
gen-ai list --folders          # list Drive folders
gen-ai list --json             # list files as JSON ({ name, type, url } each)
gen-ai download <uid>          # download a Drive file
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

**Image**

Input formats: JPEG, PNG, WEBP, TIFF, BMP, HEIC. Maximum file size: 1 GB.

Output formats: JPEG, PNG, WEBP. HEIC is accepted as input but is not currently available as an output format.

**Video**

Maximum file size: 1 GB. Input containers include MP4, MOV, and WebM. Output is delivered as a URL.

**Audio**

Audio generation returns a URL. Accepted input formats for audio-to-audio operations vary by model. Check the model's parameter schema with `picsart_model_params` or `gen-ai models info <model-id>`.

## FAQ

**What file types can I upload?**

For images: JPEG, PNG, WEBP, TIFF, BMP, and HEIC are accepted. For video: MP4, MOV, and WebM. The maximum file size for uploads is 1 GB. See the File formats section above for output format details.

**Are generated files private?**

Yes. Files in your Drive are scoped to your account. The result URLs returned by generation tools are signed URLs that expire after 24 hours. They do not expose your files publicly. Download or save to Drive within that 24-hour window if long-term access is needed.

**Does saving to Drive cost extra credits?**

See [picsart.com/pricing](https://picsart.com/pricing) for current Drive pricing details.

**Can I delete files from Drive via the CLI?**

The current CLI and MCP do not expose a delete command. Manage deletion from the [AI Playground web app](https://picsart.com/ai-playground/).
