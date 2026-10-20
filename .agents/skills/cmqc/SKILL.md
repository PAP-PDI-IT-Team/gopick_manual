---
name: cmqc
description: Perform Code Maintenance and Quality Checks (CMQC) on staged and unstaged GoPick HTML, CSS, and JavaScript changes, checking file line counts and forbidden embedded CSS or JavaScript. Use for requested CMQC or change-quality reviews; exclude unchanged and untracked files and repository-wide audits.
---

# CMQC — Code Maintenance and Quality Checks

## Scope and execution

Read the repository's current `AGENTS.md` before checking code. The scope is always staged and unstaged changes to repository-owned HTML, CSS, and JavaScript files. Invoking CMQC establishes this scope; do not ask the user to choose files or a directory. Do not expand the review to unchanged files or a repository-wide audit.

Discover staged paths with `git diff --cached --name-status -z` and unstaged tracked paths with `git diff --name-status -z`. Handle null-delimited paths and rename destinations correctly. Untracked (`??`) files are outside the scope until staged; do not stage them to include them. Exclude dependencies, generated output, and third-party vendored code, and disclose applicable exclusions.

Check complete file contents, not just changed lines. For staged changes, read the index version; for unstaged changes, read the working-tree version. If both versions differ for the same path, check both and label findings and line counts as staged or unstaged. This prevents an unstaged repair from hiding a violation still present in the proposed commit. Compare staged findings against HEAD and unstaged findings against the index when distinguishing existing issues from regressions.

Record deletions as deleted in the corresponding version, with no size or markup check for that deleted version. Report unresolved conflicts or unexpectedly unreadable content as incomplete checks, not passes. Do not exclude first-party source just because it is large or already violates a rule. If there are no eligible staged or unstaged files, report that directly and stop without widening the scope.

A check is read-only: report findings and concrete maintenance actions. If fixes are requested, make them within the authorized scope and existing ownership rules. Do not commit, push, or expand into unrelated refactoring automatically.

## Line-count ranges

Count physical lines per file, including comments and blank lines. Count a final nonempty line even when it has no trailing newline. Check the largest threshold first so each file receives exactly one size classification.

| Physical lines | Classification | Required maintenance action |
|---|---|---|
| More than 800 | Critical | Stop adding code to the affected file. Decompose it by responsibility before extending it. |
| More than 500, up to 800 | Warning | Actively refactor when maintenance is authorized; identify cohesive responsibilities to extract. |
| More than 200, up to 500 | Sweet spot | No line-count action required. Continue checking responsibility and separation of concerns. |
| 200 or fewer | No size warning | No line-count action required. Do not enlarge a file to reach the sweet spot. |

Files named exactly `dataFiller.js` are exempt from line-count limits. Show their measured count as `Exempt — dataFiller.js`, and still apply the other checks. Do not extend the exemption to other large files, content stores, renderers, or similarly named files.

A critical finding stops extension of that file, not the rest of the review. Continue collecting findings. For a check-only request, report the decomposition needed without modifying files. Do not reduce counts by removing useful spacing, compressing code, or making arbitrary fragments; follow existing page-local and shared ownership boundaries. Workspace architecture and naming changes still require the approval specified in `AGENTS.md`.

## No internal or inline CSS/JavaScript

Report these as violations:

- Embedded `<style>` elements in HTML.
- Inline JavaScript in `<script>` elements, including configuration such as `tailwind.config`. A `src` attribute does not permit an embedded script body.
- Inline `style` attributes.
- Inline event-handler attributes such as `onclick`, `onchange`, or `onload`.
- Executable `javascript:` URLs in attributes.

External stylesheet links, external script references without embedded code, and CSS classes or Tailwind utility classes are allowed. A non-executable script data block such as JSON-LD is data rather than JavaScript; identify its type and do not mislabel it as executable code.

Inspect actual markup rather than accepting raw text-search matches as findings. Account for multiline attributes, casing, HTML comments, and quoted text. When JavaScript renderers in scope construct HTML strings, inspect the generated markup for the same violations. Do not flag a string that merely documents or searches for a tag, or confuse external JavaScript DOM property assignments with JavaScript embedded in HTML. Distinguish any separate presentation concern from these prohibited markup forms.

For authorized fixes, put presentation in the owning CSS file and interaction/configuration code in the owning external JavaScript file. Bind handlers through browser APIs, preserve script load order and dependencies, and update applicable versioned asset references. Use shared assets only for intentionally shared behavior. Do not exempt existing inline configuration because it predates the check.

## Report and verify

Report critical size findings first, then embedded/inline violations, then size warnings. For each finding, include the file, line location where applicable, measured line count or offending construct, and a specific next action. Include a compact size table showing sweet-spot, smaller, and exempt files as well as findings, and state the scope and any incomplete checks. Separate existing findings from regressions when reviewing a change and the comparison can be verified.

Do not label a file as passing all quality checks merely because its size is acceptable or exempt. These checks cover file size and CSS/JavaScript separation; they do not establish overall correctness, security, or accessibility.

After authorized repairs, rerun the checks on affected files. For changed pages, perform the repository's required static-server, desktop/mobile, direct-link/hash, relevant accessibility, and CSS/JavaScript verification. Preserve Markdown-to-page meaning when content is affected, and record notable changes in the existing PR's changelog version.
