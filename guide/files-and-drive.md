---
description: "Upload files, control generation delivery, and manage Picsart Drive."
---

# Files and Drive

Local downloads and Picsart Drive are separate destinations. Check a command's flags before assuming it saves to either destination.

## Save generation results

```bash
gen-ai generate -m flux-2-pro -p "a poster" --download ./output --save-to-drive --drive-folder "Campaign Q3"
```

This requests a local download and a Drive save. Saving can fail independently of generation; check the result before reporting that a file was saved. Use `--no-save-to-drive` to disable Drive saving for a generation.

## Upload a local file

Replace the paths with files or folders that exist:

```bash
gen-ai upload ./photo.jpg
gen-ai upload ./assets/ -r
gen-ai upload ./photo.jpg -f "Campaign"
gen-ai upload-to-drive ./photo.jpg
```

`upload-to-drive` prints JSON with `drive_url`, `drive_uid`, and `file_name`. It infers the resource type from the file; it is not restricted to video.

## Browse and download

```bash
gen-ai list --folders
gen-ai list --json
gen-ai download --folder "Campaign" --all --output ./downloads
```

The download example downloads all files in the named folder. `gen-ai download <uid>` is not supported by the tested CLI. Run `gen-ai download --help` to inspect filters and file limits.

## MCP Drive actions

`picsart_drive` selects an operation with `action`:

| Action | Inputs | Result |
|---|---|---|
| `list` | Optional `folderUid`, pagination and filters | Folder listing |
| `create_folder` | `name`, optional parent `folderUid` | New folder |
| `upload` | Host-provided `file`, or `url` and `name` | Saved file URL |
| `move` | `itemUids`, optional `targetFolderUid` | Moves to destination or root |
| `delete` | `itemUids`; `permanent` defaults to false | Moves to trash, or permanently deletes if requested |
| `update` | `itemUid`, `attributes` | Updated file metadata |

These actions require account authorization. The CLI has no Drive delete command; MCP does expose the `delete` action.

```json
{"name":"picsart_drive","arguments":{"action":"list"}}
```

To save a remote file, replace the example URL with one the server can fetch:

```json
{"name":"picsart_drive","arguments":{"action":"upload","name":"ref.jpg","url":"https://example.com/ref.jpg"}}
```

The upload response includes `result.url`. Use it as a generation input. If `result.staleListing` is true, the folder refresh failed after the operation; check the operation result before repeating it.

## URL access and retention

A URL requiring a browser login or expired signature cannot be fetched merely by copying it into a tool call. Upload the local file through the CLI or a supported host attachment, or provide a valid URL the service can access.

Drive listings are account-scoped. That does not guarantee that an asset URL is inaccessible to anyone holding it. Treat URLs as access-bearing data and avoid publishing private assets. Download files for retention; do not assume a universal 24-hour expiry.

See [Local files and URLs](/guide/local-files) for upload choices and [Security](/guide/security) for credential handling.

## CLI defaults

In CLI 2.78.0, media results download to the configured `downloadDir`, or `./output` when none is configured. Drive saving is enabled by default, with folder `gen-ai-cli`. `--download` changes the local destination; `--no-save-to-drive` disables the Drive save. These settings are independent. The `generate` command in this release does not expose a `--no-download` flag, even though batch mode does.
