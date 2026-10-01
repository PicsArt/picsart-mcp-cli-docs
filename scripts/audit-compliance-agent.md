# Documentation review procedure

Review every published page and contributor instruction in this repository. Use the public repository as the documentation source.

1. Record the CLI, SDK, and hosted server versions or snapshots being checked.
2. Read every page and inventory its commands, configuration, links, and claims.
3. Compare CLI syntax and model inputs with the released package. Use metadata, local validation, and no-cost preflight checks before considering paid operations.
4. Verify each host's setup instructions against its official documentation. Distinguish source verification from an exercised OAuth session.
5. Fix contradictions, unsupported claims, incomplete prerequisites, and ambiguous retry advice. Retest affected examples.
6. Run an independent technical copy review for clarity, task completion, and navigation. Resolve its findings and request a fresh review.
7. Apply the repository's writing rules without breaking code, flags, URLs, or file formats.
8. Build the site, open every generated page, check internal links and anchors, and test the Wiki export.

For each finding, record the affected page, evidence, correction, and retest outcome. Mark untested behavior as untested. Do not label a transport configuration as a verified authenticated integration, and do not infer failure or success from an ordinary HTTP GET to an MCP endpoint.
