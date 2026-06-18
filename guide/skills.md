---
description: "Drop-in Picsart Skills for Claude Code, Cursor, Windsurf, and ChatGPT — generate heroes, reels, and batch catalogs in plain English with 130+ AI models."
---

# Skills

**Skills** are ready-to-use, drop-in bundles of prompts and instructions that teach an AI agent how to do a specific creative job with Picsart's models. Download a skill, hand it to **Claude Code, Cursor, Windsurf, or ChatGPT**, and the agent already knows which model to pick, how to structure the prompt, and which `gen-ai` command to run — you just ask in plain English.

> Official page: [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/)

## How skills relate to the CLI and MCP

A skill is the **knowledge layer**; the [gen-ai CLI](/guide/cli-quickstart) is the **engine**. Skills drive the CLI under the hood, and the whole thing speaks [MCP](/guide/mcp-quickstart) so it works natively inside agents. So the setup order is:

1. **Install the CLI** — see [Installation](/guide/installation).
2. **Authenticate** — `gen-ai login` (once per machine).
3. **Add a skill** to your agent (below).

## The `gen-ai-use` skill

The flagship skill, **`gen-ai-use`**, gives an agent access to all **130+ models** across image, video, and audio generation. It works with Claude Code, Cursor, and Windsurf.

Once added, you drive it conversationally:

> "Make me three banner concepts for the spring sale."
>
> "Turn these 10 product photos into a 9:16 reel with background music."
>
> "Generate hero images for this landing page in 16:9 and 1:1."

The agent picks the right model, builds the prompt, runs the `gen-ai` command in the background, and hands back the results.

## Installing a skill

Skills ship as a single `.zip` bundle. Download it from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and add it to your agent:

- **Claude Code** — add the skill bundle to your skills directory, then invoke it (e.g. `/gen-ai-use`) or just describe the task.
- **Cursor / Windsurf** — drop the bundle in per the agent's skill/rules import, then ask in plain English.
- **ChatGPT** — attach the skill and prompt normally.

Because skills call the CLI, make sure `gen-ai --version` works and you've run `gen-ai login` first.

## What skills are good for

- **Hero images** — on-brand key art in the aspect ratios you need.
- **Reels & shorts** — chain stills into short social video with motion and audio.
- **Batch catalogs** — generate or edit assets across hundreds or thousands of SKUs.

## Codex

For OpenAI Codex, install the CLI and add the curated plugin:

```
codex://plugins/picsart@openai-curated
```

See [Installation → MCP & agent integrations](/guide/installation#mcp-agent-integrations) for all agent paths.
