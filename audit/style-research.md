# Research for the final editorial pass

Research completed September 29, 2026, before the style cleanup. The purpose is to make these instructions concrete and readable, not to classify their authors. The technical and independent copy reviews precede this pass.

## Evidence and its limits

1. [Kobak and colleagues, *Delving into LLM-assisted writing in biomedical publications through excess vocabulary*](https://arxiv.org/html/2406.07016v5) examine changes in a large corpus of biomedical abstracts. Words such as “delves,” “underscores,” and “showcasing” increased unusually after widespread LLM adoption. This is evidence about aggregate writing patterns in a particular domain. The authors explicitly distinguish corpus estimates from identifying individual abstracts. It does not justify banning every common word that increased, or calling an individual document machine-written.

2. [Russell, Karpinska, and Iyyer, *People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text*](https://arxiv.org/html/2501.15654v2) study human judgments of nonfiction articles. Reviewers consider vocabulary alongside formulaic structure, excessive formality, generic content, and overly positive endings. Such cues can also occur in human work. The practical lesson for these docs is to inspect paragraphs and reader tasks, not merely replace a list of words. Repeated conclusions, artificial contrasts, and interchangeable introductions deserve review when they contribute no instruction.

3. [Liang and colleagues, *GPT detectors are biased against non-native English writers*](https://arxiv.org/abs/2304.02819) find false classifications that disproportionately affect non-native English writing. Their results also show that wording changes can bypass detectors. Therefore no detector score or vocabulary match will be used as an authorship verdict or an acceptance criterion here.

4. [Google's developer-documentation tone guide](https://developers.google.com/style/tone) recommends useful, conversational explanations and rejects distracting jargon, clichés, exaggerated friendliness, and claims that a task is easy. Apply this by stating what an operation does, what the reader needs, and what to expect. Remove empty encouragement and unnecessary “please note” introductions. Keep a warning when it changes a reader's decision, such as a generation spending credits or a timeout leaving an active job.

5. [Microsoft's guidance on simple words and concise sentences](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) supports precise verbs, fewer unnecessary words, and consistent terminology. In this repository, prefer “use,” “run,” “send,” “save,” and “check” when they accurately describe the action. A longer explanation remains appropriate when credentials, asynchronous jobs, or catalog differences would otherwise be ambiguous.

6. [Google's command-line syntax guide](https://developers.google.com/style/code-syntax) treats runnable examples and placeholders as technical content. Its guidance on line continuation and copyable commands supports preserving required punctuation. Removing a double hyphen from a flag would break the instruction. This editorial pass must not alter command options, Markdown delimiters, identifiers, URLs, or literal data merely to satisfy a prose rule.

## Repository decisions

These are editorial choices informed by the research, not a scientifically validated AI detector:

- Remove promotional descriptions such as “cutting-edge,” “game-changing,” “world-class,” “seamless,” “effortless,” and “next-generation” unless they are literal product names. Explain the capability or constraint instead.
- Review abstract verbs such as “delve,” “leverage,” “unlock,” “elevate,” and “foster” when they replace a specific action. Avoid “tapestry,” “landscape,” and similar decorative metaphors in task instructions. Preserve precise technical uses of otherwise ordinary words.
- Remove canned transitions such as “in today's fast-paced world,” “it's worth noting,” “at the end of the day,” and “in conclusion.” Remove repeated summaries that add no decision, result, or next step.
- Review forced contrasts such as “not just X, but Y,” inflated lists of three adjectives, and paragraphs that sound interchangeable across products. Do not ban useful comparisons or three-item lists.
- Remove decorative emoji, prose em dashes, and prose double hyphens, as requested. Use punctuation appropriate to the sentence. Preserve CLI options, YAML frontmatter, Markdown table rules, code comments with syntactic requirements, and literal schemas.
- Keep concise headings and lists where they help readers find an instruction. Neither Markdown headings nor ordinary words such as “across,” “component,” and “required” are evidence of authorship.
- Keep versioned catalog data faithful to the SDK. Descriptor strings, enum values, tool names, and historical review quotations are evidence, not editable marketing prose. Reports retain quoted defects so the review history remains intelligible.

## Method and acceptance

Scan all published and contributor Markdown, the theme's visible labels, metadata, generator templates, the generated Wiki, and `llms.txt`. Read matches in context before editing. Use a narrow lint rule for unambiguous house-style violations; separately review unsupported claims and formulaic structure. Regenerate derived outputs, run command checks again, and ask the independent reviewer to check the final language. Acceptance means that known editorial findings are resolved and technical examples still pass. It does not mean proving that the text was written by a human.
