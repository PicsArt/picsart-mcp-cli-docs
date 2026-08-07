---
description: "Run many AI generations at once with the Picsart gen-ai CLI — manifests, from-directory, and agent-driven automation."
---

# Batch & Automation

For producing many assets at once, the CLI runs a **manifest** of generations in parallel, with progress tracking and resume.

## Run a manifest

```bash
gen-ai batch run manifest.yaml
gen-ai batch status <run-id>      # check progress
gen-ai batch resume <run-id>      # re-run only the failed jobs
```

A manifest is a list of generations — each with a model, prompt, and params. YAML or JSON:

```yaml
# manifest.yaml
- model: flux-2-pro
  prompt: "a ceramic cup, studio light"
  aspectRatio: "4:3"
- model: seedance-2.0
  prompt: "a fox in autumn leaves"
  duration: 8
- model: eleven-v3
  prompt: "Welcome to the show."
```

Results download automatically; add `--save-to-drive` to push everything to your library instead.

## Generate from a directory

Run the same operation across every file in a folder (e.g. enhance or animate a batch of images):

```bash
gen-ai generate -m wan-2.7-i2v -p "subtle motion" --input-dir ./stills/
```

The CLI expands the directory into one generation per file.

## Piping & composition

Because scripted output is clean JSON, you can compose `gen-ai` with standard tools:

```bash
# Generate, then extract just the URL
gen-ai generate -m flux-2-pro -p "logo concept" --script | jq -r '.results[0].url'

# Drive a list of prompts through a model
while read -r line; do
  gen-ai generate -m flux-2-pro -p "$line" --script
done < prompts.txt
```

## Automating with MCP

For agent-driven automation, an MCP client can loop over `picsart_generate` calls itself — using `picsart_preflight` to validate and estimate cost before each call, and writing results to Drive. See the [MCP Quickstart](/guide/mcp-quickstart).

## FAQ

**What happens if some jobs fail mid-batch?**

Completed jobs are written to the output directory. Failed jobs are logged with their error. Run `gen-ai batch resume <run-id>` to re-run only the failed jobs — it does not re-run completed ones.

**Can I mix models in one manifest?**

Yes. Each manifest item has its own `model` field. You can run image, video, and audio generations in the same manifest file.

**What is the difference between a manifest and `--input-dir`?**

A manifest gives you per-item control: different models, prompts, and parameters for each item. `--input-dir` applies the same model and prompt to every file in a folder. Use a manifest for catalog jobs with varied SKUs, and `--input-dir` for uniform operations like batch enhancement or animation.

**Can I use a manifest with MCP?**

Not directly — the MCP tools call one generation at a time. For batch generation via MCP, have the agent loop over items and call `picsart_generate` for each, using `picsart_preflight` to validate and estimate cost before each call.

**Where do batch results go?**

Downloaded to `./output` by default. Add `--save-to-drive` to push all results to your Picsart Drive instead. See [Files and Drive](/guide/files-and-drive).
