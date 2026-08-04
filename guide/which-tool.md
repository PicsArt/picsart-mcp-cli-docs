---
description: "Decide which Picsart surface to use — AI Playground, Skills, MCP, CLI, or API — based on what you are trying to do."
---

# Which tool is right for me?

Picsart has one model catalog and several ways to reach it. The right surface depends on what you are doing, not on technical preference. This page helps you decide.

---

## I want to explore models, try prompts, and see what's possible

**Use: AI Playground (web or mobile)**

The Playground is the fastest way to run a generation. No setup, no install, no config. Open a browser or the mobile app, pick a model, type a prompt, see the result. You can compare two models side by side, adjust parameters with sliders, and save results to your Drive.

If you are evaluating whether a model fits your creative brief, or iterating on a prompt to get it right, start here. Everything you learn in Playground transfers directly to the CLI, MCP, and API — the model ids and parameters are identical.

[picsart.com/ai-playground](https://picsart.com/ai-playground/)

---

## I work in Claude, ChatGPT, Cursor, or another AI assistant

**Use: Skills or MCP**

If you already spend your working day in an AI coding assistant or chat agent, you do not need to switch to Playground to generate media. Connect Picsart to your agent and generate directly from a conversation.

**Skills** are the faster path. Install once and ask in plain English: *"Generate four product images on a white background using Flux 2 Pro."* The agent handles everything: model selection, parameter construction, command execution, result delivery.

**MCP** gives you tool-level access. Use it when you want the agent to reason about pricing before generating, validate a payload, chain background removal after generation, or manage Drive files — all in one agent turn.

Typical workflow: validate the prompt in Playground, connect the agent, then generate at scale from the conversation.

- [Skills guide](/guide/skills)
- [MCP Quickstart](/guide/mcp-quickstart)
- [Claude Code integration](/guide/integrations/claude-code)
- [ChatGPT integration](/guide/integrations/chatgpt)
- [Cursor integration](/guide/integrations/cursor)

---

## I need to run generations on a schedule or as part of a script

**Use: CLI**

The `gen-ai` CLI is built for automation. Every generation flag is scriptable, output is JSON-ready, and it runs in any environment where you can run a shell command — cron, Docker, GitHub Actions, GitLab CI, a plain shell script.

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

## I am building an application or website that needs generative AI

**Use: API**

If you are writing code to power a product — a web app, a mobile app, a backend service, a SaaS feature — the API gives you direct programmatic access to the catalog. Call it from any language. Your application manages the requests; Picsart handles generation.

The API uses the same model ids and parameters as every other surface. Design the generation logic in Playground, then move to the API when you are ready to ship.

[picsart.com/gen-ai-mcp](https://picsart.com/gen-ai-mcp/) — API reference and key generation.

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
| Batch-generating a product catalog | CLI |
| Scheduling weekly or daily asset creation | CLI |
| Building a CI/CD pipeline with media generation | CLI |
| Running generations from application code | API |
| Building a web app with embedded generation | API |
| Not sure — just exploring | AI Playground |

---

## Can I use more than one?

Yes. The surfaces are complementary. A common pattern:

1. Experiment in Playground to find the right model and prompt.
2. Connect MCP or Skills so your AI agent can generate the same thing without switching windows.
3. Set up a CLI batch job to run nightly for catalog updates.
4. Call the API from your product for on-demand user-triggered generation.

All four use the same account, the same model ids, and the same credit balance.
