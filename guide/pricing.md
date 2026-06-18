---
description: "Pay-per-generation credit pricing for Picsart's AI models — quote costs before you generate with the CLI or MCP. No subscriptions, no API keys."
---

# Pricing & Credits

AI Playground uses **pay-per-generation credits** — no per-provider subscriptions, no API keys to manage. Every call shows its credit cost before you commit, and one balance covers all 176 models.

## Check your balance

```bash
gen-ai credits
```

```json
{ "name": "picsart_credits", "arguments": {} }
```

## Quote a cost (dry run)

Always free — no model is invoked and nothing is charged.

```bash
gen-ai pricing seedance-2.0 -d 5 -r 1080p     # cost for a specific config
gen-ai pricing veo-3.1 -d 8                    # 8-second Veo clip
gen-ai pricing --mode video --json             # all video model pricing
```

```json
{ "name": "picsart_pricing",
  "arguments": {
    "model": "veo-3.1",
    "prompt": "a drone shot over a snowy ridge",
    "params": { "duration": 8, "resolution": "1080p" }
  } }
```

`picsart_pricing` returns `{ model, credits }` where `credits` is a number, or `null` if pricing isn't available for that model.

## What drives cost

Cost depends on the model and its parameters. The biggest factors:

- **Video** — duration, resolution, and whether audio is generated.
- **Image** — resolution/quality and the number of outputs (`count`).
- **Audio** — length of the output.

Because pricing is resolved per-model and per-params, the only reliable number is the one from a live `pricing` quote against the exact payload you intend to run.

## Compare before you commit

Quote the same prompt across candidates to find the best value:

```bash
gen-ai pricing sora-2 -d 8
gen-ai pricing veo-3.1 -d 8
gen-ai pricing seedance-2.0 -d 8
```
