---
description: "TypeSafe Jev on Picsart — structured content evaluation with the SDK's ai.run() API."
---

# TypeSafe

**Mode:** json · **Models:** 1

Jev evaluates content against named yes/no, choice, or score questions and returns structured answers.

## Models

| id | Name | Input type |
|---|---|---|
| `typesafe-evaluate` | Jev | `t2t` |

## SDK

JSON models use `ai.run()`. They are not supported by `generate()`, `generateText()`, or the SDK's async lifecycle methods.

```typescript
import { createClient, Models } from '@picsart/ai-sdk'

const ai = createClient({ apiKey: process.env.PICSART_API_KEY! })
const { result } = await ai.run(Models.TypesafeEvaluate, {
  state: 'The weather is lovely and everyone is having a great time.',
  questions: {
    tone: {
      type: 'choice',
      instructions: 'Pick the tone.',
      options: ['positive', 'neutral', 'negative'],
    },
  },
})
console.log(result)
```

`run()` returns `{ result, status, usage, id }` without media extraction or automatic Drive saving.

## Parameters

Parameters from the SDK 7.0.0 catalog.

### `typesafe-evaluate` — Jev

Input type: `t2t`; output mode: `json`.

| Param | Type | Values |
|---|---|---|
| `state` | text | **required** — content to evaluate |
| `questions` | object | **required** — caller-named questions, each with `type` and `instructions` |

Question `type` is `noul` (yes/no), `choice`, or `score`. Type-specific fields, such as choice `options`, are passed through to the evaluator.

## Availability

This reference describes the SDK catalog. Do not assume that `gen-ai generate`, `picsart_generate`, or the Playground supports structured evaluation merely because the model is listed here. Inspect the interface's model discovery and supported execution methods before use.
