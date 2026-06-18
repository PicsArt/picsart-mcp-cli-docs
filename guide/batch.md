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

For agent-driven automation, an MCP client can loop over `picsart_generate` calls itself — pricing each with `picsart_pricing` first, validating with `picsart_validate_params`, and writing results to Drive. See the [MCP Quickstart](/guide/mcp-quickstart).
