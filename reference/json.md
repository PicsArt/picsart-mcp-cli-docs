---
description: "Structured JSON evaluation in the Picsart SDK: Jev content evaluation through ai.run()."
---

# JSON & evaluation

**1 JSON model** evaluates content and returns structured answers.

| Model | Provider | Purpose |
|---|---|---|
| `typesafe-evaluate`: Jev | [TypeSafe](/reference/providers/typesafe) | Evaluate named yes/no, choice, and score questions |

## Execution

Use the SDK's `ai.run(Models.TypesafeEvaluate, inputs)` method. JSON models are rejected by `generate()`, `generateText()`, and the SDK's async lifecycle methods. The generic execution result contains `{ result, status, usage, id }`; it does not extract media URLs or automatically save to Drive.

See the [TypeSafe reference](/reference/providers/typesafe) for a complete example and required inputs. CLI, MCP, and Playground support must be checked separately.
