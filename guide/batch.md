---
description: "Run JSON generation manifests, inspect saved results, and retry failed batch jobs."
---

# Batch and automation

A batch manifest is a JSON object with a `jobs` array. Each job needs a unique `id` and a model, either on the job or in `defaults`.

## Create a manifest

Save this as `manifest.json`:

```json
{
  "jobs": [
    {"id": "cup", "model": "flux-2-pro", "prompt": "a ceramic cup, studio light", "aspectRatio": "4:3"},
    {"id": "fox", "model": "seedance-2.0", "prompt": "a fox in autumn leaves", "duration": 8},
    {"id": "welcome", "model": "eleven-v3", "prompt": "Welcome to the show."}
  ]
}
```

## Validate, then run

```bash
gen-ai batch run manifest.json --dry-run
```

Expect `Manifest valid: 3 jobs`. This validates the manifest structure and model IDs without submitting jobs. It does not validate every model parameter or fetch input URLs. Use `gen-ai validate` for each job's generation parameters when preparing the manifest.

After signing in, submit the batch. This spends credits:

```bash
gen-ai batch run manifest.json --output ./batch-output --concurrency 3
gen-ai batch status ./batch-output
```

Results are recorded in `./batch-output/results.json`; downloads go to that output directory. Add `--no-download` to the batch command to keep result records without downloading media.

## Retry failed jobs

```bash
gen-ai batch resume ./batch-output
```

The argument is the output directory, not a run ID. Resume uses the saved results to select failed jobs. Inspect failures first: an ambiguous timeout may still have produced a server-side result. Resubmission can spend credits again.

## Process a directory

For one generation per image, use `--input-dir` with explicit `--batch`:

```bash
gen-ai generate -m runway-gen4.5 -p "subtle motion" --input-dir ./stills/ --batch
```

Replace `./stills/` with an existing folder. `--multi` instead treats files as references for one generation and requires a model that accepts multiple input files. Directory limits and concurrency are listed in `gen-ai generate --help`.

## Loop over prompts

Create `prompts.txt` with one prompt per line, then run:

```bash
while IFS= read -r line || [ -n "$line" ]; do
  [ -z "$line" ] && continue
  gen-ai generate -m flux-2-pro -p "$line" --no-input --quiet --json || break
done < prompts.txt
```

Every nonempty line can create a charged generation. The loop stops on a command failure.

## MCP automation

An MCP client can validate each item with `picsart_preflight`, submit it with `picsart_generate`, and poll `picsart_job_status` when a job handle is returned. Preserve handles and results between steps. See [MCP Quickstart](/guide/mcp-quickstart).
