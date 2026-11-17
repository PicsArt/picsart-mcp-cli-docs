---
description: "Choose model inputs, validate parameters, and recover from generation timeouts."
---

# Generating media

Models produce image, video, audio, or text. Their input-type codes describe the accepted inputs and output: for example, `t2i` is text-to-image, `i2v` is image-to-video, and `tts` is text-to-speech. The model schema lists required inputs; do not infer them from the code alone.

## Inspect a model

```bash
gen-ai validate -m wan-2.7-i2v --schema
```

Or call `picsart_model_params` through MCP:

```json
{"name":"picsart_model_params","arguments":{"model":"wan-2.7-i2v"}}
```

These schema checks do not generate media.

## Provide inputs

CLI file flags accept local files or URLs. Replace the paths below with your files:

```bash
gen-ai generate -m wan-2.7-i2v -p "gentle motion, drifting clouds" --start-frame ./hero.png
gen-ai generate -m seedance-2.0-video-edit -p "claymation style" --video ./clip.mp4
```

MCP model inputs use URLs. Model-specific fields go inside `extra`:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "wan-2.7-i2v",
    "prompt": "gentle motion, drifting clouds",
    "extra": {"startFrame": "https://example.com/hero.png"}
  }
}
```

`example.com` asset URLs are placeholders. Replace them with reachable URLs for your files. See [Local files and URLs](/guide/local-files).

## Validate parameters

```bash
echo '{"prompt":"test","duration":99}' | gen-ai validate -m seedance-2.0
```

This intentionally invalid duration should produce a validation error. Correct it using the model schema, then validate again before generating. For MCP, `picsart_preflight` accepts the model and a `params` object containing the prompt and generation parameters.

## Outputs

CLI delivery is controlled by its output flags and saved configuration. MCP can return a completed result or an accepted job handle. Media payloads include result URLs; text models return text. Keep the actual response rather than assuming all modes share one result shape.

Use ordinary asset URLs as inputs to another tool. A `downloadUrl`, where provided, is intended for saving the file.

## Timeouts and recovery

For the CLI, inspect existing history:

```bash
gen-ai history --json
```

For MCP, poll `picsart_job_status` with the complete `job` object and model from the accepted call. Polling does not submit another generation. If no recoverable handle or result is available, inspect the host's logs and Drive before deciding whether to resubmit.

## Formats and limits

Accepted formats, dimensions, duration, file counts, and resolution values vary by model. Inspect its schema and any preflight errors. A general file-upload limit is not a guarantee that a model accepts a file of that size or format.

Download files you need to retain. Do not assume every result URL has the same expiry or access policy.
