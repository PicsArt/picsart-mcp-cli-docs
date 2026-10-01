---
description: "Read your balance and estimate model costs before generating."
---

# Pricing and credits

Media generation and text analysis consume Picsart credits. Catalog lookup and validation do not generate media. A price estimate can be unavailable; a missing estimate is not a zero-credit price.

## CLI balance and pricing

After signing in:

```bash
gen-ai credits
gen-ai pricing seedance-2.0 --duration 5 --resolution 1080p
gen-ai pricing veo-3.1 --duration 8
gen-ai pricing --mode video --json
```

The pricing command returns a rate or range for the selected model. It can narrow by resolution and audio, and scale per-second rates by duration. It does not accept generation flags such as `-p`, `-n`, or `--ar`, and it is not an exact quote for an arbitrary generation payload.

## MCP preflight

```json
{
  "name": "picsart_preflight",
  "arguments": {
    "model": "veo-3.1",
    "params": {"prompt":"a drone shot over a snowy ridge","duration":8,"resolution":"1080p"}
  }
}
```

Expect `valid`, any validation errors, and `credits`. `credits` can be null when the estimate is unavailable. Preflight does not submit a generation.

## Limit an individual CLI request

`gen-ai generate` supports `--max-cost <credits>`. The CLI aborts before submission when its estimate exceeds the limit. Check how your release handles an unavailable estimate before using this as a budget control. It is not an account-wide or batch-wide spending cap.

Costs can depend on duration, resolution, output count, audio, and model choice. Quote representative batch jobs and inspect [batch results](/guide/batch) before retrying failures.

For current plans and credit purchases, see [Picsart pricing](https://picsart.com/pricing).

If pricing is unavailable, CLI 2.78.0 warns that `--max-cost` is not enforced and can continue submitting. For a strict spending ceiling, stop your workflow when no estimate is available; this flag alone does not provide that guarantee.
