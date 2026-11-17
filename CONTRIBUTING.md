# Contributing

Edit documentation in this public repository. Open a pull request with the affected reader task, the correction, and evidence of validation.

## Development

Use Node.js 20 or newer and Python 3.10 or newer to build the docs:

```bash
npm ci
npm run dev
npm run build
npm run preview
```

Run the commands from the repository root. Build checks validate the documented examples and content rules; they do not prove that a third-party host completes OAuth or that a paid generation succeeds.

## Technical accuracy

State the package version or server evidence used for a claim. Do not assume the SDK, CLI, and hosted MCP catalogs are identical. Keep CLI login, hosted OAuth, and application API credentials distinct.

Use real command flags and model IDs. Label placeholder files, URLs, and returned IDs. Start setup guides with a check that does not generate media. Explain when the next step consumes credits. Never recommend repeating a submission merely because its response timed out.

Exact catalog counts are allowed when they describe the checked-in snapshot and pass `npm run check:counts`. Avoid hand-maintained counts in marketing copy. Historical release notes describe their original release, not the current catalog.

## Example and output evidence

Keep each example's prompt, tool payload or command, and stated aspect ratio consistent. A requested aspect ratio is not proof of the returned file's dimensions.

Before adding an output gallery or a timing/credit claim, keep a reproducible generation record: date, interface and version, model ID, complete input parameters, source-asset permissions, returned job or result, output dimensions and duration, and actual credit evidence. Distinguish an estimate from a charged amount, and an observed runtime from a guarantee. Omit unknown values. Never commit credentials or private source media.

Label concept artwork as illustrative. It must not be presented as a Picsart-generated result or proof of a multi-step workflow without execution evidence. Claims about brand consistency, extension length, or host coverage need their tested scope and prerequisites.

## Generated files

Regenerate `.vitepress/theme/data/` and provider reference pages using the scripts documented in README. Change the generator when changing provider-page wording. `public/llms.txt` is regenerated during the build. Review generated differences alongside the source change.

## Writing

Use direct instructions, concrete outcomes, and plain words. Remove unsupported superiority claims, repeated introductions, and decorative emoji. Do not use em dashes or prose double hyphens; use a colon, comma, or separate sentence. Preserve command flags, Markdown syntax, and other required technical punctuation.

Prefer a precise description over promotional adjectives. Avoid canned transitions and unsupported promises of success. A word or punctuation mark does not prove that text was written by AI; these are editorial rules for this repository.

Published Markdown pages need a frontmatter description. Root contributor files and audit records do not need site metadata. Keep commands inside correctly labelled code fences and JSON examples valid JSON.

See [the audit style research](audit/style-research.md) for the sources and rationale behind the current checks.
