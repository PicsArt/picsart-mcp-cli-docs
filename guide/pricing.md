---
description: "Pay-per-generation credit pricing for Picsart's AI models — quote costs before you generate with the CLI or MCP. No subscriptions, no API keys."
---

# Pricing & Credits

AI Playground uses **pay-per-generation credits** — no per-provider subscriptions, no API keys to manage. Every call shows its credit cost before you commit, and one balance covers all 201 models.

## Check your balance

```bash
gen-ai credits
```

```json
{ "name": "picsart_credits", "arguments": {} }
```

## Quote a cost (dry run)

Always free — no model is invoked and nothing is charged. `gen-ai pricing` needs a signed-in session, because prices are looked up for your account.

```bash
gen-ai pricing seedance-2.0 --duration 5 --resolution 1080p   # cost for a specific config
gen-ai pricing veo-3.1 --duration 8 --audio                   # 8-second Veo clip with audio
gen-ai pricing --mode video --json                            # all video model pricing
```

`gen-ai pricing` narrows by `--duration`, `--resolution`, and `--[no-]audio`; other parameters are not part of the CLI quote.

```json
{ "name": "picsart_preflight",
  "arguments": {
    "model": "veo-3.1",
    "params": { "prompt": "a drone shot over a snowy ridge", "duration": 8, "resolution": "1080p" }
  } }
```

`picsart_preflight` validates the params **and** quotes the cost in one free call, returning `{ model, valid, errors?, credits }`. `credits` is a number, or `null` if pricing isn't available for that model or the call is unauthenticated. For the balance rather than a per-call cost, use `picsart_credits`.

## What drives cost

Cost depends on the model and its parameters. The biggest factors:

- **Video** — duration, resolution, and whether audio is generated.
- **Image** — resolution/quality and the number of outputs (`count`).
- **Audio** — length of the output.

Because pricing is resolved per-model and per-params, the only reliable number is the one from a live `pricing` quote against the exact payload you intend to run.

## Compare before you commit

Quote the same prompt across candidates to find the best value:

```bash
gen-ai pricing seedance-2.5 --duration 8
gen-ai pricing veo-3.1 --duration 8
gen-ai pricing seedance-2.0 --duration 8
```

## FAQ

**Is `gen-ai pricing` always accurate?**

It reflects the current cost for the exact model and parameters you pass. Cost can change if the model's pricing is updated, so always run a fresh quote before a large batch run.

**Why does `picsart_preflight` return `null` for some models?**

A few models do not expose per-call pricing. For those, `picsart_preflight` returns `null` for the credit amount. Check the model's page in the [Model Reference](/reference/) for any fixed or range-based pricing notes.

**Are there per-provider contracts or subscriptions?**

No. One Picsart account covers all 31 providers. There are no separate subscriptions, no per-provider API keys, and no vendor invoices.

**What happens if I run out of credits mid-batch?**

Completed generations in the same batch are not reversed. Use `gen-ai batch resume <output-dir>` (e.g. `./batch-output`) to re-run the failed jobs after topping up.

**Can I set a spending limit per run?**

Per generation, yes: `gen-ai generate … --max-cost <credits>` aborts before submitting if the estimated cost is higher (the same flag works on the other generation commands such as `image` and `video`). There is no total cap for a batch run — quote representative items with `gen-ai pricing` or `picsart_preflight` first and estimate the total from there.
