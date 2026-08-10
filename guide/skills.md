---
description: "Drop-in Picsart Skills for Claude Code, Cursor, Windsurf, and ChatGPT — generate heroes, reels, and batch catalogs in plain English with 174 AI models."
---

# Skills

**Skills** are ready-to-use bundles of prompts and instructions that teach an AI agent how to generate media with Picsart's models. Add a skill to Claude Code, Cursor, Windsurf, or ChatGPT, and the agent knows which model to use, how to structure the request, and which command to run — you just describe what you want.

> Official page: [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/)

## How skills relate to the CLI and MCP

A skill is the **knowledge layer** — it tells the agent what Picsart can do and how to call it. The [gen-ai CLI](/guide/cli-quickstart) is the **execution engine** that runs the actual generation. Skills drive the CLI under the hood, and the whole stack speaks [MCP](/guide/mcp-quickstart) so it works natively inside agents.

Setup order:

1. Install the CLI — see [Installation](/guide/installation).
2. Authenticate once: `gen-ai login`.
3. Add a skill to your agent (see below).

## The `gen-ai-use` skill

The flagship skill, **`gen-ai-use`**, gives an agent access to all **174 models** across image, video, and audio generation. It works with Claude Code, Cursor, and Windsurf.

Once added, you drive it in plain English:

- *"Make three banner concepts for the spring sale in 16:9 and 1:1."*
- *"Animate these 10 product stills into a 9:16 reel with background music."*
- *"Generate a hero image in the style of the reference shot, then upscale it to 4K."*

The agent picks the right model, builds the prompt, and runs the generation in the background.

## Installing a skill

### Claude Code

The fastest path is the Claude Code plugin marketplace:

```bash
claude plugin marketplace add PicsArt/gen-ai-skills
```

Then activate it inside Claude Code:

```
/plugin install picsart@picsart
```

Alternatively, install via npx:

```bash
npx skills add PicsArt/gen-ai-skills
```

Or download the `.zip` manually from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and place it in `~/.claude/skills/`.

After installing, invoke the skill with `/gen-ai-use` or just describe a task — Claude Code picks it up automatically.

### Cursor and Windsurf

1. Download the skill `.zip` from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/).
2. Place it in the agent's skill or rules directory (see your agent's settings for the exact path).
3. Ask in plain English: *"Generate a product photo on a white background using Flux 2 Pro."*

For a dedicated Cursor or Windsurf setup guide, see [Cursor integration](/guide/integrations/cursor) or [Windsurf integration](/guide/integrations/windsurf).

### ChatGPT

Attach the skill `.zip` to a conversation or to a custom GPT configuration. Once attached, ChatGPT can call `gen-ai` commands directly when you describe a generation task.

### Codex (OpenAI)

Install the CLI, then add the skill via npx:

```bash
npx skills add PicsArt/gen-ai-skills
```

Or download the `.zip` from [picsart.com/gen-ai-skills](https://picsart.com/gen-ai-skills/) and attach it to your Codex session. See [Codex integration](/guide/integrations/codex) for the full setup.

## What to generate with skills

Skills are particularly effective for:

- **Hero images** — on-brand key art in multiple aspect ratios from a single prompt.
- **Reels and short video** — chain stills into social video with motion models and an AI audio track.
- **Batch catalogs** — generate or edit assets across many SKUs with a single instruction to the agent.
- **Background removal and replacement** — swap out image backgrounds without leaving the agent conversation.
- **Voice and narration** — generate voiceovers with ElevenLabs voices directly from a script.

Browse the full model catalog — which the skill has access to — at [picsart.com/ai-playground](https://picsart.com/ai-playground/) or via `gen-ai models`.

## FAQ

**Do I need to run `gen-ai login` if I install via the Claude plugin marketplace?**

Yes. Skills call the gen-ai CLI internally, and the CLI needs an authenticated session. Run `gen-ai login` once on your machine before using any skill, regardless of which install method you used.

**Can I add more than one skill?**

Yes. Each skill is a separate bundle. You can have `gen-ai-use` for general generation plus any specialized skills alongside it. Skills do not conflict with each other.

**The agent says it can't find `gen-ai`. What do I do?**

The CLI is not installed or is not on the `PATH` the agent sees. Run `gen-ai --version` in a terminal to verify the install, then restart your agent. See [Installation](/guide/installation) for install steps.

**Is there a skill specifically for Cursor vs. one for Claude Code?**

The same `gen-ai-use` skill bundle works across all supported agents. The skill itself is agent-agnostic — the differences are only in how you install it (marketplace command vs. ZIP drop).

**Do skills work offline?**

No. Skills call the Picsart platform for every generation. An internet connection and a valid Picsart account with credits are required.

**Where are the generated files saved?**

By default, files are downloaded to `./output` in the directory the CLI was invoked from. Pass `--save-to-drive` to push results to your Picsart Drive instead. See [Files and Drive](/guide/files-and-drive).
