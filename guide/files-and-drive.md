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
gen-ai upload ./assets/                    # a whole folder
gen-ai upload ./photo.jpg --name "Hero"
```

```json
{ "name": "picsart_drive", "arguments": { "action": "upload", "filePath": "/path/to/photo.jpg", "name": "Hero" } }
```

Uploading returns a Drive file you can then feed into a generation as an input image/video.

## Browse & organize

```bash
gen-ai list --folders          # list Drive folders
gen-ai list                    # list files (JSON-ready)
gen-ai download <uid>          # download a Drive file
```

```json
{ "name": "picsart_drive", "arguments": { "action": "list_folders" } }
{ "name": "picsart_drive", "arguments": { "action": "list", "folderId": "<id>" } }
{ "name": "picsart_drive", "arguments": { "action": "create_folder", "name": "Campaign Q3" } }
```

> Drive commands browse your real root folders — they are not scoped to the AI Playground folder.

## Save a remote URL to Drive

Use `picsart_drive` with `action: upload` and a URL as the source to copy a remote asset into Drive. This is useful when a model needs an input that lives behind a short-lived URL — saving it first gives you a stable Drive URL that doesn't expire.

## FAQ

**What file types can I upload?**

The upload returns a Drive URL you can immediately use as an input to a generation.

**Are generated files private?**

Yes. Files in your Drive are scoped to your account. The result URLs returned by generation tools are time-limited signed URLs — they do not expose your files publicly. Download or save to Drive promptly if long-term access is needed.

**Does saving to Drive cost extra credits?**

See [picsart.com/pricing](https://picsart.com/pricing) for current Drive pricing details.

**Can I delete files from Drive via the CLI?**

The current CLI and MCP do not expose a delete command. Manage deletion from the [AI Playground web app](https://picsart.com/ai-playground/).

**How do I save a remote URL to Drive?**

Call `picsart_drive` with `action: upload` and the URL as the source. This copies the remote asset into your Drive and returns a stable URL you can pass as input to another model.
