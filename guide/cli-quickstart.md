---
description: "Install gen-ai, verify setup without generating, then create media from the terminal."
---

# CLI quickstart

The examples target `@picsart/gen-ai` 2.78.0. Start with [Installation](/guide/installation) if you need a platform installer.

## Install and check setup

Requires Node.js 22 or later for npm:

```bash
npm install -g @picsart/gen-ai
gen-ai --version
gen-ai validate -m flux-2-pro --schema
```

Expect a version number and a JSON parameter schema. These commands need no sign-in and spend no generation credits.

Sign in and inspect a price before generating:

```bash
gen-ai login
gen-ai whoami
gen-ai pricing flux-2-pro
```

## Generate media

These commands submit jobs and consume Picsart credits:

```bash
# Image
gen-ai generate -m flux-2-pro -p "studio shot of a ceramic cup, soft light" --ar 4:3

# Video
gen-ai generate -m seedance-2.0 -p "a fox running through autumn leaves" -d 8

# Speech
gen-ai generate -m eleven-v3 -p "Welcome to Picsart AI Playground."
```

Use `--download ./output` when you want a local copy. See [Files and Drive](/guide/files-and-drive) for delivery options and defaults.

## Interactive mode

In an interactive terminal, `gen-ai generate` opens the generation wizard. Running `gen-ai` without a command opens the interactive menu.

## Scripts and pipes

Use `--no-input` to prevent interactive prompts, `--quiet` to reduce logs, and `--json` for structured output. The old `--script` flag is not available in this release.

```bash
echo "a neon city flyover at dusk" | gen-ai generate -m veo-3.1 -d 8 --no-input --json

gen-ai generate -m flux-2-pro -p "a cat in a hat" --no-input --quiet --json
```

Inspect the returned JSON before adding a downstream parser. A failed command can return an error object instead of a generation result; check its exit status.

## Common flags

| Flag | Meaning |
|---|---|
| `--model`, `-m` | Model ID |
| `--prompt`, `-p` | Text prompt; stdin can supply it |
| `--image`, `-i` | Input image paths or URLs; repeat for multiple images |
| `--video` | Input video path or URL |
| `--aspect-ratio`, `--ar` | Model-specific aspect ratio |
| `--resolution`, `-r` | Model-specific resolution |
| `--duration`, `-d` | Duration where supported |
| `--count`, `-n` | Model-specific output count |
| `--download <dir>` | Download results to a directory |
| `--save-to-drive` | Save results to Picsart Drive |
| `--no-save-to-drive` | Disable Drive saving |
| `--max-cost <credits>` | Abort if the estimated cost exceeds this amount |
| `--no-input`, `-s` | Disable interactive prompts |
| `--json` | Structured output |

Run `gen-ai generate --help` for all flags. A flag being recognized does not mean every model supports it.

## Explore models

```bash
gen-ai models --mode video
gen-ai models --provider google
gen-ai models info seedance-2.0 --json
gen-ai models compare kling-v3 veo-3.1
gen-ai pricing seedance-2.0 --duration 5 --resolution 1080p
```

## Describe an image or video

Replace the sample filenames with existing local files:

```bash
gen-ai describe -i photo.jpg
gen-ai describe -i receipt.jpg -p "extract the total and tax"
gen-ai describe --video clip.mp4 -p "summarize what happens"
```

`describe` supplies a default question if you omit the prompt. Use a model that accepts your media type; inspect its schema before choosing an explicit `-m`. Text analysis also consumes credits.

## Validate without submitting

Generation does not expose `--dry-run` in this release. Validate a parameter object instead:

```bash
echo '{"prompt":"a ceramic cup","aspectRatio":"4:3"}' | gen-ai validate -m flux-2-pro
```

Expect a successful validation. This checks the model schema, not remote file accessibility or the eventual generated output.

## If a job takes too long

A client timeout does not prove the server job failed. Check [generation history](/guide/generating#timeouts-and-recovery) and any saved result before submitting again. Repeating a generation command can create a second charged job.

For manifests, see [Batch and automation](/guide/batch). For CI credentials, see [Authentication](/guide/authentication).
