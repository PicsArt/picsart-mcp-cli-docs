---
description: "Turn a local file into an input URL using the CLI or a host upload integration."
---

# Local files and URLs

Hosted generation tools cannot read an arbitrary path on your computer. Their model inputs, such as `imageUrls`, `videoUrl`, and `extra.startFrame`, need reachable URLs.

Some host integrations accept a local path in a `file` attachment parameter and upload the file before calling the server. This is a host capability, not permission for a remote model to read your filesystem.

## Upload through the CLI

After `gen-ai login`, upload an existing local file:

```bash
gen-ai upload-to-drive ./photo.jpg
```

Expect JSON containing `drive_url`. Use that URL as the next tool's input. This command supports images, video, and audio; the resource type is inferred from the file.

For folders or recursive uploads:

```bash
gen-ai upload ./assets/ -r -f "Campaign"
gen-ai list --folder "Campaign" --json
```

Inspect the returned listing to identify the file; names need not be unique.

## Upload through the host

If the host exposes attachments or a file-upload control, use that mechanism. For example, the connected Picsart integration can expose `picsart_media_upload` or a `file` input on `picsart_drive`. Follow the tool schema in that host. A literal `"<attachment>"` string is not an upload handle.

## Inline data

Where `picsart_drive` accepts a data URI in `url`, it can upload a small encoded file. The URI must contain the complete, valid base64 payload and MIME type. Truncated example strings are not usable files.

Base64 adds roughly one third to the byte length. If the content passes through an agent's context, it can consume many tokens; the exact count depends on the tokenizer. Prefer a file-upload mechanism for large media.

## Remote files requiring authentication

Use a still-valid URL the service can fetch, or download the file with an authorized client and upload it through the CLI. A Drive upload cannot bypass authentication required by the original URL.

Continue with [Files and Drive](/guide/files-and-drive) or [Generating media](/guide/generating).
