---
description: "Decide which Picsart surface to use based on what you are trying to do: AI Playground, Skills, MCP, CLI, SDK, or REST API."
---

# Which tool is right for me?

Picsart has one model catalog and several ways to reach it. The right surface depends on what you are doing, not on technical preference. This page helps you decide.

---

## I want to explore models, try prompts, and see what's possible

**Use: AI Playground (web or mobile)**

The Playground is the fastest way to run a generation. No setup, no install, no config. Open a browser or the mobile app, pick a model, type a prompt, see the result. You can compare two models side by side, adjust parameters with sliders, and save results to your Drive.

If you are evaluating whether a model fits your creative brief, or iterating on a prompt to get it right, start here. Everything you learn in Playground transfers directly to the CLI, MCP, SDK, and REST API. The model ids and parameters are identical.

[picsart.com/ai-playground](https://picsart.com/ai-playground/)

---

## I work in Claude, ChatGPT, Cursor, or another AI assistant

**Use: Skills or MCP**

If you already spend your working day in an AI coding assistant or chat agent, you do not need to switch to Playground to generate media. Connect Picsart to your agent and generate directly from a conversation.

**Skills** are the faster path. Install once and ask in plain English: *"Generate four product images on a white background using Flux 2 Pro."* The agent handles everything: model selection, parameter construction, command execution, result delivery.

**MCP** gives you tool-level access. Use it when you want the agent to reason about pricing before generating, validate a payload, chain background removal after generation, or manage Drive files. All in one agent turn.

Typical workflow: validate the prompt in Playground, connect the agent, then generate at scale from the conversation.

- [Skills guide](/guide/skills)
- [MCP Quickstart](/guide/mcp-quickstart)
- [Claude Code integration](/guide/integrations/claude-code)
- [ChatGPT integration](/guide/integrations/chatgpt)
- [Cursor integration](/guide/integrations/cursor)

---

## I need to build a video, deck, or captioned clip from media I already have

**Use: Picsart Media Studio**

A generative model is the wrong tool for this. If you need clips joined, captions burnt in, a title
card over your own footage, a slideshow from a template, or a video reframed for a phone screen, you
want something that assembles material you already have.

[Media Studio](/guide/media-studio/) is a separate MCP connector: you ask Claude for what you want, it
builds the piece from your files and its templates, and renders the result. It works alongside the
generative tools rather than replacing them — make an asset with the
[Picsart MCP server](/guide/mcp-quickstart), then build it into something here.

- [Media Studio overview](/guide/media-studio/)
- [What you can do](/guide/media-studio/tools)

---

## I need to run generations on a schedule or as part of a script

**Use: CLI**

The `gen-ai` CLI is built for automation. Every generation flag is scriptable, output is JSON-ready, and it runs in any environment where you can run a shell command: cron, Docker, GitHub Actions, GitLab CI, a plain shell script.

Examples:

```bash
# Scheduled catalog refresh via cron
0 6 * * 1 gen-ai batch run /home/user/weekly-catalog.yaml

# Generate assets as a CI step
gen-ai generate -m flux-2-pro -p "product hero" --script | jq '.results[0].url'

# Process a folder of images
gen-ai generate -m wan-2.7-i2v -p "subtle animation" --input-dir ./stills/
```

You can also quote costs before a batch run, resume failed jobs, and write results directly to Picsart Drive.

- [CLI Quickstart](/guide/cli-quickstart)
- [Batch and Automation](/guide/batch)
- [Installation](/guide/installation)

---

## I know my way around the terminal but I am not writing app code

**Use: CLI**

If you work in the terminal, write shell scripts, or run ad hoc jobs but are not building a product or service, the CLI is your surface. You get the full model catalog as a single command, JSON output you can pipe anywhere, and no boilerplate.

```bash
gen-ai generate -m flux-2-pro -p "hero shot, soft light" --ar 16:9
gen-ai models --mode image | grep recraft
```

The CLI authenticates with OAuth: one `gen-ai login` in the browser. No API key setup required.

- [CLI Quickstart](/guide/cli-quickstart)
- [Installation](/guide/installation)

---

## I am building an application or website that needs generative AI

**Use: SDK (Node.js/TypeScript) or REST API (any language)**

If you are writing code to power a product — a web app, a mobile app, a backend service, a SaaS feature — choose based on your stack.

### Node.js or TypeScript

Use `@picsart/ai-sdk`. It is type-safe, model-aware, and handles async polling automatically. One `generate()` call covers all 181 models. Results can auto-save to Picsart Drive.

```bash
npm install @picsart/ai-sdk
```

Auth is an API key (not the CLI's OAuth flow). Retrieve it from [picsart.com/settings](https://picsart.com/settings).

[SDK guide](/guide/sdk)

### Python, Ruby, Go, or any other language

Use the REST API directly. HTTP POST to `https://api.picsart.com/gw-v2`. Same model ids and parameters as every other surface. Auth is an API key from [picsart.com/settings](https://picsart.com/settings).

[REST API guide](/guide/rest-api) · [API Reference](https://picsart.com/api-platform/docs/api-reference)

---

## I am not sure — I just want to try it

**Use: AI Playground**

Start at [picsart.com/ai-playground](https://picsart.com/ai-playground/). No account setup other than a Picsart login. Pick any model from the catalog, write a prompt, and generate. You can decide later whether you want to automate it via the CLI or connect it to your agent.

---

## Side-by-side comparison

| Situation | Surface |
|---|---|
| Trying a new model for the first time | AI Playground |
| Comparing two models on the same prompt | AI Playground |
| Iterating on a prompt until it's right | AI Playground |
| Generating inside Claude or ChatGPT | Skills or MCP |
| Generating inside Cursor or Windsurf | Skills or MCP |
| Joining clips or building a slideshow | Media Studio |
| Burning captions or titles over your own footage | Media Studio |
| Reframing a video to vertical or square | Media Studio |
| Transcribing speech or describing a video's content | Media Studio |
| Batch-generating a product catalog | CLI |
| Scheduling weekly or daily asset creation | CLI |
| Building a CI/CD pipeline with media generation | CLI |
| Ad hoc terminal work, scripting, one-off jobs | CLI |
| Building a Node.js/TypeScript app | SDK |
| Building in Python, Ruby, Go, or any other language | REST API |
| Running generations from application code | SDK or REST API |
| Not sure — just exploring | AI Playground |

---

## Can I use more than one?

Yes. The surfaces are complementary. A common pattern:

1. Experiment in Playground to find the right model and prompt.
2. Connect MCP or Skills so your AI agent can generate the same thing without switching windows.
3. Set up a CLI batch job to run nightly for catalog updates.
4. Call the REST API from your product for on-demand user-triggered generation in any language.
5. Use `@picsart/ai-sdk` in your Node.js service for type-safe, auto-polling model calls.

All five use the same account, the same model ids, and the same credit balance. The CLI and agents use OAuth; the SDK and REST API use an API key.
