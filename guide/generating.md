---
description: "How generation works across image, video, and audio models — input types (t2i, i2v, tts), inputs, parameters, and outputs — in the Picsart CLI and MCP."
---

# Generating media

Every model belongs to a **mode** (image / video / audio) and an **input type** that describes what goes in and what comes out. Understanding the input type tells you which inputs a model needs.

## Input types

The two-letter codes you'll see across the catalog and in `picsart_model_params`:

| Code | Meaning | Typical inputs |
|---|---|---|
| `t2i` | text → image | prompt |
| `i2i` | image → image | prompt + image |
| `t2v` | text → video | prompt |
| `i2v` | image → video | prompt + image |
| `v2v` | video → video | prompt + video |
| `a2v` | audio → video | prompt + audio |
| `tts` | text → speech | text + voice |
| `sts` | speech → speech | audio |
| `sfx` | sound effects | prompt |
| `music` | music | prompt |

## Providing inputs

**CLI** — pass files as local paths or URLs. Local files are uploaded for you before the request is submitted:

```bash
# image-to-video: animate a still
gen-ai generate -m wan-2.7-i2v -p "gentle parallax, drifting clouds" -i ./hero.png

# video-to-video: restyle a clip
gen-ai generate -m seedance-2.0-video-edit -p "claymation style" --video ./clip.mp4
```

**MCP** — pass `imageUrls` / `videoUrl` (must be reachable URLs):

```json
{ "name": "picsart_generate",
  "arguments": { "model": "wan-2.7-i2v", "prompt": "gentle parallax", "imageUrls": ["https://example.com/hero.png"] } }
```

## Model-specific parameters

Beyond the common params (`aspectRatio`, `resolution`, `duration`, `count`…), each model has its own surface — for example, Veo 3.1 accepts `startFrame`/`endFrame` keyframes and `generateAudio`, while ElevenLabs models accept `voiceId` and `language`.

Discover the exact surface:

```bash
gen-ai models info veo-3.1 --json          # full paramConfig
gen-ai generate -m veo-3.1 -p "x" --dry-run  # preview the resolved payload
```

```json
{ "name": "picsart_model_params", "arguments": { "model": "veo-3.1" } }
```

In the CLI, model-specific params are flags (`--start-frame`, `--voice`, …). Via MCP, pass them in the `extra` object.

## Outputs

A generation returns one or more result URLs. Control delivery:

- **CLI**: downloaded to `./output` by default; use `--no-download` (URL only), `--download <dir>`, or `--save-to-drive`.
- **MCP**: `results: [{ url }]` plus a `resource_link` per output. Optionally written to Drive when enabled.

Some models return **multiple results** from one call (e.g. an Explore model returning several images) — the result `items` array simply has more than one entry.

## Validate before you spend

```bash
echo '{"prompt":"test","duration":99}' | gen-ai validate -m seedance-2.0
```

```json
{ "name": "picsart_preflight", "arguments": { "model": "seedance-2.0", "params": { "duration": 99 } } }
```

## FAQ

**How do I know which input type a model needs?**

Run `gen-ai models info <id>` — it shows the input type code (`t2i`, `i2v`, etc.) and which inputs are required. Via MCP, call `picsart_model_params`.

**Can I pass a local file as an input image via MCP?**

MCP tools require URLs, not local file paths. Upload your file first with `picsart_drive` (action: upload, returns a Drive URL), then pass that URL as `imageUrls` in `picsart_generate`.

**What aspect ratios are available?**

Common values are `1:1`, `4:3`, `3:4`, `16:9`, `9:16`. Not every model supports every ratio. Run `gen-ai models info <id>` to see the supported aspect ratios for a specific model.

**Can I generate without a prompt?**

Most models require a prompt. Some image-to-image models treat the prompt as optional — run `gen-ai models info <id>` to check. If you pass an empty prompt, the model may refuse or use a default.

**What does `enhancePrompt` do?**

When set to `true`, your prompt is rewritten by an LLM before being sent to the generation model. This can improve results for short or vague prompts, but it changes what is sent, so disable it if you need precise prompt control.

**How many outputs can I request per call?**

Most models accept `count` up to 8. Some models fix the output count at 1 regardless of what you pass. Check `picsart_model_params` or `gen-ai models info <id>` for the specific model.
