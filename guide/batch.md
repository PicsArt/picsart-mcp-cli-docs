---
description: "Run many AI generations at once with the Picsart gen-ai CLI — manifests, from-directory, and agent-driven automation."
---

# Batch & Automation

For producing many assets at once, the CLI runs a **manifest** of generations in parallel, with progress tracking and resume.

## Run a manifest

```bash
gen-ai batch run manifest.json                 # results go to ./batch-output
gen-ai batch run manifest.json -c 5 -o ./out   # 5 parallel jobs, custom output dir
gen-ai batch run manifest.json --dry-run       # validate the manifest only
gen-ai batch status ./batch-output             # summarize a finished run
gen-ai batch resume ./batch-output             # re-run only the failed jobs
```

A manifest is a JSON object with a `jobs` array. Each job needs a unique `id` (it also names the downloaded file) plus a `model` and its params, using the SDK parameter names (`prompt`, `aspectRatio`, `duration`, …). An optional top-level `defaults` object is merged into every job, e.g. to share one `model` across jobs:

```json
{
  "jobs": [
    { "id": "cup",   "model": "flux-2-pro",   "prompt": "a ceramic cup, studio light", "aspectRatio": "4:3" },
    { "id": "fox",   "model": "seedance-2.0", "prompt": "a fox in autumn leaves", "duration": 8 },
    { "id": "intro", "model": "eleven-v3",    "prompt": "Welcome to the show." }
  ]
}
```

Print the full JSON Schema with `gen-ai batch schema` (e.g. `gen-ai batch schema > batch.schema.json` for editor validation).

The run writes `results.json` (status, URL, and local path per job) to the output directory and downloads each result there as `<id>.<ext>`. Add `--no-download` to record URLs only. Batch runs do not save to Picsart Drive.

## Generate from a directory

Run the same operation across every file in a folder (e.g. enhance or animate a batch of images):

```bash
gen-ai generate -m wan-2.7-i2v -p "subtle motion" --input-dir ./stills/ --batch
```

`--batch` runs one generation per file (through `batch run`, 3 in parallel by default; change with `--concurrency`). `--multi` instead sends all the files (up to 14) as inputs to a single generation. In an interactive terminal the CLI asks which one you want; in scripts you must pass one of them. `--type image|video|audio` filters the folder and `--max-files` (default 30) caps how many files are picked up.

## Piping & composition

With `--json`, each generation prints one JSON object, so you can compose `gen-ai` with standard tools:

```bash
# Generate, then extract just the URL
gen-ai generate -m flux-2-pro -p "logo concept" -s --json | jq -r '.url'

# Drive a list of prompts through a model
while read -r line; do
  gen-ai generate -m flux-2-pro -p "$line" -s --json < /dev/null
done < prompts.txt
```

## Automating with MCP

For agent-driven automation, an MCP client can loop over `picsart_generate` calls itself — validating and pricing each with `picsart_preflight` first, and writing results to Drive with `picsart_drive`. See the [MCP Quickstart](/guide/mcp-quickstart).

## FAQ

**What happens if some jobs fail mid-batch?**

Completed and failed jobs are both recorded in `results.json` in the output directory, failed ones with their error. Run `gen-ai batch resume <output-dir>` to re-run only the failed jobs — it does not re-run completed ones.

**Can I mix models in one manifest?**

Yes. Each manifest item has its own `model` field. You can run image, video, and audio generations in the same manifest file.

**What is the difference between a manifest and `--input-dir`?**

A manifest gives you per-item control: different models, prompts, and parameters for each item. `--input-dir` applies the same model and prompt to every file in a folder. Use a manifest for catalog jobs with varied SKUs, and `--input-dir` for uniform operations like batch enhancement or animation.

**Can I use a manifest with MCP?**

Not directly — the MCP tools call one generation at a time. For batch generation via MCP, have the agent loop over items and call `picsart_generate` for each, using `picsart_preflight` to validate and estimate cost before each call.

**Where do batch results go?**

Downloaded to `./batch-output` by default (change it with `-o <dir>`), next to `results.json`. Batch runs do not save to Picsart Drive — upload the folder afterwards with `gen-ai upload <dir> -r` if you want the results there. See [Files and Drive](/guide/files-and-drive).
