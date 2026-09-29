---
description: "Connect an MCP client to Picsart, validate a request, and retrieve a generated asset."
---

# MCP quickstart

Picsart's hosted MCP server lets an agent discover models and generate images, video, audio, and text. Use a client that supports remote Streamable HTTP and OAuth. Installing the CLI or logging into it does not authenticate a hosted connection.

## Connect

Use this server URL in your client's remote MCP settings:

```text
https://api.picsart.com/gen-ai/mcp
```

Complete the Picsart sign-in flow opened by the client. Workspace administrators may need to enable custom connections. Follow the [guide for your client](/guide/integrations/) for its configuration format.

The released `@picsart/gen-ai` 2.78.0 package provides the `gen-ai` command; it does not provide a `gen-ai-mcp` executable. Do not configure that nonexistent command as a local server.

## Verify without generating

Check that the client lists Picsart tools, then request a model's schema:

```json
{
  "name": "picsart_model_params",
  "arguments": { "model": "flux-2-pro" }
}
```

Expect a model ID and a parameter schema. This read-only call spends no generation credits, but it does not prove that your account is authorized to generate. Check the client's connection and authentication status as well.

## Validate and estimate

Before submitting a generation, check its complete input:

```json
{
  "name": "picsart_preflight",
  "arguments": {
    "model": "flux-2-pro",
    "params": {
      "prompt": "A ceramic cup on a wooden table",
      "aspectRatio": "4:3",
      "count": 1
    }
  }
}
```

Expect `valid: true`. Fix any reported errors before continuing. `credits` is a best-effort estimate; `null` means unavailable, not free. Preflight does not run the model or reserve a price.

## Generate

This call spends credits:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "flux-2-pro",
    "prompt": "A ceramic cup on a wooden table",
    "aspectRatio": "4:3",
    "count": 1,
    "async": true,
    "saveToDrive": true
  }
}
```

For media, `async: true` requests a job handle. Text models return text synchronously. Completed media responses include asset URLs in `assets` and `results`; do not depend on separate `resource_link` content blocks.

## Wait for the existing job

When generation returns `job`, pass that object unchanged to `picsart_job_status`, with the original model ID. The following is a template: replace both placeholder values with the returned values.

```json
{
  "name": "picsart_job_status",
  "arguments": {
    "model": "flux-2-pro",
    "job": {
      "id": "RETURNED_JOB_ID",
      "workflow": "RETURNED_WORKFLOW"
    }
  }
}
```

Poll every few seconds while status is `ACCEPTED` or `IN_PROGRESS`. Stop at completion or a reported failure. A host timeout does not mean the generation failed. Poll the saved handle; submitting again can create another charged job. If a synchronous call lost its response, inspect Drive and the available job history before retrying.

## Input format

The generic tool requires `model` and a string `prompt`. A utility model may not use a prompt; prefer its dedicated tool when one exists. For a generic call to a model without a prompt parameter, use an empty string.

Common optional fields include `aspectRatio`, `duration`, `resolution`, `count`, `imageUrls`, `videoUrl`, `generateAudio`, `quality`, `style`, and `negativePrompt`. Only supply fields supported by the selected model. The tool accepts counts from 1 to 10, but model limits can differ.

Put model-specific fields such as `startFrame`, `audioUrl`, or `voiceId` in `extra`. For example, this Wan request requires an accessible start-frame image; the URL shown is a placeholder:

```json
{
  "name": "picsart_generate",
  "arguments": {
    "model": "wan-2.7-i2v",
    "prompt": "The camera slowly approaches the subject",
    "extra": { "startFrame": "https://example.com/frame.jpg" },
    "async": true
  }
}
```

For preflight, put the model's inputs inside `params`. Inspect `picsart_model_params` before changing models because their required inputs differ.

## Tool catalog

Available tools can vary by server release and host. Use the connection's tool list as the current inventory.

| Tool | Purpose |
|---|---|
| `picsart_model_catalog` | Read model metadata without opening a picker |
| `picsart_list_models` | Browse models in hosts that support its UI |
| `picsart_model_params` | Read a model's input schema |
| `picsart_preflight` | Validate inputs and request a credit estimate |
| `picsart_generate` | Submit a generation; spends credits |
| `picsart_job_status` | Read the status of an existing job |
| `picsart_remove_bg` | Remove an image background; spends credits |
| `picsart_change_bg` | Replace a background; spends credits |
| `picsart_enhance` | Enhance or upscale an image; spends credits |
| `picsart_vectorize` | Convert an image to vector output; spends credits |
| `picsart_drive` | List, upload, move, update, or delete Drive items |

Read [Files and Drive](/guide/files-and-drive) for saving results, [local file inputs](/guide/local-files) for upload options, and [media tools](/guide/media-tools) for composition and rendering.

## Troubleshooting

If tools are missing, inspect the client's connection status and logs. Confirm the URL, remote transport, OAuth support, and workspace permissions. Use the client's reconnect or reload control when available. A plain HTTP GET or HEAD request is not an MCP initialization check.

If authorization fails, reconnect through the host's sign-in flow. CLI credentials and SDK API keys are separate authentication methods. See [Authentication](/guide/authentication).
