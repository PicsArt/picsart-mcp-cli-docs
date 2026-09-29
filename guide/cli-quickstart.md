---
description: "Generate AI images, video, and audio from your terminal with the Picsart gen-ai CLI — install, log in, and run your first generation. Scriptable and pipe-friendly."
---

# CLI Quickstart

The `gen-ai` CLI is one terminal command for the entire model catalog. It's designed for piping and automation: anything the web app can do is scriptable.

## Install & log in

```bash
npm install -g @picsart/gen-ai     # or the install script — see Installation
gen-ai login                       # one-time browser auth
```

## Your first generation

```bash
# Image
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup, soft light" --ar 4:3

# Video (text-to-video)
gen-ai generate -m seedance-2.0 -p "a fox running through autumn leaves" -d 8

# Audio (text-to-speech)
gen-ai generate -m eleven-v3 -p "Welcome to Picsart AI Playground."
```

By default the CLI submits the job, shows a progress bar, prints the result URL, downloads the file to `./output`, and saves a copy to your Picsart Drive (in a `gen-ai-cli` folder). Pass `--no-save-to-drive` to skip the Drive copy.

## Interactive mode

Run a command with no flags to get a guided wizard (mode → model picker → params):

```bash
gen-ai generate         # walks you through everything
gen-ai                  # launch the interactive REPL menu
```

## Scripting & piping

```bash
# Pipe a prompt from stdin
echo "a neon city flyover at dusk" | gen-ai generate -m veo-3.1 -d 8 -s

# Fully scripted: no prompts, JSON output
gen-ai generate -m flux-2-pro -p "a cat in a hat" -s --json | jq -r '.url'
```

- `-s` / `--no-input` (alias `--silent`) disables every interactive prompt and fails instead of asking. Prompts are also disabled automatically when stdin is not a terminal.
- `--json` prints one JSON object: `{ url, model, results, durationMs }`.
- `-q` / `--quiet` prints only the result URL.

## Common flags

| Flag | Alias | Meaning |
|---|---|---|
| `--model` | `-m` | Model id (e.g. `flux-2-pro`) |
| `--prompt` | `-p` | Text prompt (or pipe via stdin, or `--prompt-file <path>`) |
| `--image` | `-i` | Input image(s) — local path or URL, repeatable |
| `--video` | `--vd` | Input video — local path or URL |
| `--aspect-ratio` | `--ar` | e.g. `16:9`, `9:16`, `1:1` |
| `--resolution` | `-r` | e.g. `720p`, `1080p`, `4k` |
| `--duration` | `-d` | Video length in seconds |
| `--count` | `-n` | Number of outputs |
| `--download <dir>` | `--out` | Download directory (default `./output`) |
| `--[no-]save-to-drive` | `--drive` | Save the result to Picsart Drive (on by default) |
| `--drive-folder <name>` | | Drive subfolder (default `gen-ai-cli`) |
| `--max-cost <credits>` | | Abort before submitting if the estimated cost is higher |
| `--poll-timeout <time>` | | How long to wait for async jobs (e.g. `45m`; default 30m for video/audio, 10m otherwise) |
| `--no-input` | `-s` | Never prompt; fail if input is missing |
| `--json` | | Machine-readable output |

## Explore the catalog

```bash
gen-ai models                         # browse all models with badges & pricing
gen-ai models --mode video            # filter by mode
gen-ai models --provider google       # filter by provider
gen-ai models info seedance-2.0       # full capabilities + parameters
gen-ai models compare kling-v3 veo-3.1
gen-ai pricing seedance-2.0 --duration 5 --resolution 1080p   # quote a cost before generating
```

`gen-ai models` and `gen-ai pricing` show per-account pricing, so they need `gen-ai login`. `models info` and `models compare` work without signing in.

## Describe an image or video

`gen-ai describe` runs the catalog's **LLM models** (Claude, GPT, Gemini) against an image or video and prints the model's **text** answer — no media is generated. Use it to caption, OCR, classify, or summarize a clip.

```bash
# Describe an image (default model)
gen-ai describe -i photo.jpg

# Ask a specific question about an image
gen-ai describe -i photo.jpg -p "what brand is the shoe?"

# Summarize a video (auto-routes to a video-capable model)
gen-ai describe --video clip.mp4 -p "summarize what happens"
```

- The prompt (`-p`) is **optional** — without it, the model gets a default "describe this" instruction.
- Pass `-m` to pick a model (default `claude-sonnet-4-6`). Only Gemini 3 Pro accepts video, so `--video` auto-selects it unless you force a non-video model with `-m`.
- The answer goes to **stdout** (skips download/Drive); the model/time header goes to stderr. Add `-q` to drop the header — e.g. `gen-ai describe -i photo.jpg -q | pbcopy`.
- For a plain question with no media, use `gen-ai ask -p "..."` (image/video optional).

## More

- **[Generating media](/guide/generating)** — inputs, outputs, and modes in depth
- **[Files and Drive](/guide/files-and-drive)** — upload, download, organize
- **[Batch and Automation](/guide/batch)** — manifests and bulk runs
- **[Model Reference](/reference/)** — per-provider model pages with CLI examples

## FAQ

**How do I find the right model id?**

Run `gen-ai models` to browse the full catalog with descriptions and pricing badges. Use `--mode video` or `--provider google` to filter. Run `gen-ai models info <id>` to see a model's full parameters before using it.

**Can I generate without downloading the file?**

Not with `gen-ai generate` — media results are always downloaded (to `./output`, `--download <dir>`, or the `downloadDir` you set with `gen-ai config set`). `-q` prints just the URL and `--json` returns it in a JSON object. For bulk runs, `gen-ai batch run <manifest> --no-download` records URLs in `results.json` without downloading.

**How do I set the output directory?**

Use `--download <path>`, e.g. `gen-ai generate -m flux-2-pro -p "x" --download ./exports`. The default is `./output`; change it permanently with `gen-ai config set downloadDir <path>`.

**My generation is running but taking a long time. Is that normal?**

The CLI shows a progress bar while polling — up to 30 minutes for video/audio and 10 minutes for everything else (change it with `--poll-timeout`). If polling times out, the job keeps running on the server; the CLI prints its task id, and `gen-ai history` shows the entry once it finishes.

**Can I pipe the result URL into another command?**

Yes. Use `--json` (or `-q` for the bare URL):

```bash
gen-ai generate -m flux-2-pro -p "logo" -s --json | jq -r '.url' | xargs curl -O
```

**How do I generate multiple images at once?**

Use `--count` (alias `-n`). The allowed range depends on the model — check `gen-ai models info <id>`:

```bash
gen-ai generate -m flux-2-pro -p "product concept" -n 4
```

**How do I check a request before spending credits?**

Run `gen-ai validate -m <id>` with the payload as JSON (from stdin or `--file`) to check parameters against the model's schema, and `gen-ai pricing <id>` to quote the cost. On `generate`, `--max-cost <credits>` aborts before submitting if the estimate is higher.

**Does the CLI work inside Docker or GitHub Actions?**

Yes. Install via npm in a Dockerfile, or via the install script in a CI step, and authenticate with environment variables instead of the browser login — see [Authentication](/guide/authentication#ci-and-headless-environments).
