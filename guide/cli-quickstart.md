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
- Output goes to **stdout** (skips download/Drive). Add `--script` for clean, pipeable text — e.g. `gen-ai describe -i photo.jpg --script | pbcopy`.

## More

- **[Generating media](/guide/generating)** — inputs, outputs, and modes in depth
- **[Files and Drive](/guide/files-and-drive)** — upload, download, organize
- **[Batch and Automation](/guide/batch)** — manifests and bulk runs
- **[Model Reference](/reference/)** — per-provider model pages with CLI examples

## FAQ

**How do I find the right model id?**

Run `gen-ai models` to browse the full catalog with descriptions and pricing badges. Use `--mode video` or `--provider google` to filter. Run `gen-ai models info <id>` to see a model's full parameters before using it.

**Can I generate without downloading the file?**

Yes. Add `--no-download` and the CLI prints the result URL only. Add `--script` for a clean, pipeable JSON output.

**How do I set the output directory?**

Use `--download <path>`, e.g. `gen-ai generate -m flux-2-pro -p "x" --download ./exports`. The default is `./output`.

**My generation is running but taking a long time. Is that normal?**

The CLI shows a progress bar while polling. If it times out, the job may still be running on the server — check your Drive or retry with the same command.

**Can I pipe the result URL into another command?**

Yes. Use `--script` to get clean JSON output:

```bash
gen-ai generate -m flux-2-pro -p "logo" --script | jq -r '.results[0].url' | xargs curl -O
```

**How do I generate multiple images at once?**

Use `--count` (alias `-n`). Most image models accept up to 8 outputs per call:

```bash
gen-ai generate -m flux-2-pro -p "product concept" -n 4
```

**What does `--dry-run` do?**

It prints the resolved request payload — model, prompt, parameters — without submitting the generation or spending credits. Use it to preview what the CLI will send.

**Does the CLI work inside Docker or GitHub Actions?**

Yes. Install via npm in a Dockerfile, or via the install script in a CI step. See [Authentication](/guide/authentication) for headless login options.
