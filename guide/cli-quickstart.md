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

By default the CLI submits the job, shows a progress bar, prints the result URL, and downloads the file to `./output`.

## Interactive mode

Run a command with no flags to get a guided wizard (mode → model picker → params):

```bash
gen-ai generate         # walks you through everything
gen-ai                  # launch the REPL with a numbered menu
```

## Scripting & piping

```bash
# Pipe a prompt from stdin
echo "a neon city flyover at dusk" | gen-ai generate -m veo-3.1 -d 8 -s

# Fully scripted: silent, no prompts, JSON output
gen-ai generate -m flux-2-pro -p "a cat in a hat" --script | jq '.results[0].url'
```

`-s` / `--script` = `--silent --quiet --json`.

## Common flags

| Flag | Alias | Meaning |
|---|---|---|
| `--model` | `-m` | Model id (e.g. `flux-2-pro`) |
| `--prompt` | `-p` | Text prompt (or pipe via stdin) |
| `--image` | `-i` | Input image(s) — local path or URL, repeatable |
| `--video` | `--vd` | Input video — local path or URL |
| `--aspect-ratio` | `--ar` | e.g. `16:9`, `9:16`, `1:1` |
| `--resolution` | `-r` | e.g. `720p`, `1080p`, `4k` |
| `--duration` | `-d` | Video length in seconds |
| `--count` | `-n` | Number of outputs |
| `--download <dir>` | | Download directory (default `./output`) |
| `--no-download` | | Print the URL only |
| `--save-to-drive` | `--drive` | Save the result to Picsart Drive |
| `--dry-run` | | Show the resolved payload without generating |
| `--json` | | Machine-readable output |

## Explore the catalog

```bash
gen-ai models                         # browse all models with badges & pricing
gen-ai models --mode video            # filter by mode
gen-ai models --provider google       # filter by provider
gen-ai models info seedance-2.0       # full capabilities + parameters
gen-ai models compare kling-v3 veo-3.1
gen-ai pricing seedance-2.0 -d 5 -r 1080p   # quote a cost before generating
```

## More

- **[Generating media](/guide/generating)** — inputs, outputs, and modes in depth
- **[Files & Drive](/guide/files-and-drive)** — upload, download, organize
- **[Batch & Automation](/guide/batch)** — manifests and bulk runs
- **[Model Reference](/reference/)** — per-provider model pages with CLI examples
