# Pull-request merge review

Reviewed September 30, 2026 against upstream main `5a8a03f`.

## GitHub findings

- PR #5 and PR #13 both reported `mergeable: false`, `mergeable_state: dirty`.
- Both had no posted reviews, inline review comments, or conversation comments.
- Neither head had check runs or commit statuses. The existing workflow only builds on pushes to main or manual dispatch; absence of checks is not a successful CI run.
- Public branch metadata reported main unprotected, no required status checks, and no active rules from the branch-rules endpoint.
- A third open PR, #3, updates PostCSS to 8.5.25. Its merge with main succeeds locally. PR #13 already pins PostCSS 8.5.28 in the lockfile, so do not downgrade it when reconciling the dependency PR. No remote changes were made to #3.

## PR #5

Prepared commit `9ac9761` on local branch `pr-5-merge-ready`. It merges current main while retaining the security, errors, format, and Replit additions. Conflict resolution keeps current CLI headless authentication and hosted MCP prerequisites. The new guidance removes unsupported universal expiry, file-size, security-certification, and retry promises. Replit uses the audited hosted setup.

The VitePress build and count checks pass. This branch remains narrower than the full audit in PR #13.

## PR #13

Merged the corrected PR #5 history, including current main. Preserved the audited CLI examples, SDK 6.18.0 snapshot, generated provider reference, and regression checks rather than reverting to the older SDK 6.2.3 snapshot. Retained the upstream historical migration notes, Media Studio section, tool contract export, and tool-name guard.

Integrated Media Studio navigation and the agent link map; kept the existing media-tools URL available. Added the AnythingLLM Desktop OAuth bridge and clarified NemoClaw's unsupported credential path. Corrected Media Studio statements about saved files, rendering, account eligibility, and host support. New pages pass the existing prose checks.

Added a read-only pull-request workflow to run regression tests, build the deployment subpath, and check all rendered pages in Chromium. GitHub has not run this workflow yet because the commit has not been pushed.

Local checks: root and deployment-subpath builds; documentation regression tests; 91 Markdown pages, 273 JSON blocks, 113 shell blocks, and 160 CLI examples; style checks across 92 files; 89-page Wiki export with no leftover internal links and no style findings. The first browser attempt exposed a preview configuration mismatch: DOCS_BASE was set for build but not preview. The CI job now shares DOCS_BASE across both steps; A subsequent run timed out waiting for network idle on a provider page. Both network-idle and load waits intermittently timed out even though the affected local page returned HTTP 200 in 8 ms. The browser checker now waits for DOM content and a visible main region; interactive catalog controls retain their own readiness checks. The final browser run passed all 87 pages and 9,919 internal links, catalog interactions, and 390/768-pixel layouts, with zero errors. Evidence: `audit/pr-merge-browser.json`.

## Remaining external step

GitHub CLI reads returned HTTP 401, and pushing through the configured Git credential helper failed with invalid credentials. Fixes are committed locally; remote PRs cannot be declared unblocked until the fixes are pushed, GitHub recomputes mergeability, and the new CI run completes. Refresh authentication with `gh auth login -h github.com` locally; never put a token in chat.

PR #13 contains PR #5's corrected history. Merge #5 before #13 if keeping both PRs; no merge was performed during this review. GitHub Desktop's automatic stash was preserved, and work continued in the existing audit worktree to avoid branch-switch interference.
