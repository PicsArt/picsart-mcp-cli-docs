# Generating media

Every model belongs to a **mode** (image / video / audio) and an **input type** that describes what goes in and what comes out. Understanding the input type tells you which inputs a model needs.

## Input types

The two-letter codes you'll see across the catalog and in `picsart_model_info`:

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
{ "name": "picsart_validate_params", "arguments": { "model": "seedance-2.0", "params": { "duration": 99 } } }
```
