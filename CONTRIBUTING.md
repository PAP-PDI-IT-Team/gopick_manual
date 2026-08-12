# Contributing to the GoPick Assessment Center Manual

Thank you for helping keep the GoPick manual accurate, traceable, and useful. This repository is a static documentation site and a source of operational guidance. Contributions must preserve the distinction between verified documentation meaning and its rendered browser presentation.

## Before You Contribute

Read these repository contracts before changing files:

- `AGENTS.md` for scope, ownership, coding, Markdown translation, verification, and change-record rules.
- `CODE_OF_CONDUCT.md` for participation expectations.
- `SECURITY.md` for private security reporting.
- `docs/guides/manual-documentation-standard.md` for evidence and documentation-layer rules.
- `docs/guides/markdown-workflow-structure-standard.md` for workflow hierarchy and Markdown-to-page conversion.
- `docs/guides/changelog-versioning.md` for changelog categories and release versions.

Human-approved scope is authoritative. Do not expand a contribution into unrelated cleanup, architecture changes, renamed contracts, compatibility behavior, or speculative documentation.

## Branching Workflow

Each pull request must use its own branch created from the latest intended `main` baseline. Do not commit contribution work directly to `main`.

Name branches with:

```text
<label>/<intent-summary>
```

Branch labels are limited to:

- `feat` for a branch whose primary intent adds something new.
- `fix` for a branch whose primary intent changes, repairs, corrects, or alters existing work.

Write the intent summary in lowercase kebab-case using no more than five words. Count each hyphen-separated segment as one word.

Examples:

```text
feat/candidate-workflow
fix/search-section-links
feat/add-changelog-versioning-guide
fix/update-contribution-rules
```

Branch rules:

1. Confirm the requested scope and latest intended `main` baseline before creating the branch.
2. Create one branch for one pull request and its one changelog version.
3. Keep unrelated changes out of the branch.
4. Keep the branch intent summary to five words or fewer after `feat/` or `fix/`.
5. Push the branch and open a pull request targeting `main`.
6. Apply review corrections to the same branch and changelog version; do not create another version for additional commits in the same pull request.
7. Merge only after required verification is complete and at least one peer reviewer other than the author has approved the pull request.
8. Do not merge with unresolved requested changes.
9. Delete the contribution branch after merge when it is no longer needed.

## Commit Labels and Messages

Use this commit-message format:

```text
<label>(<optional-scope>): <imperative summary>
```

The scope is optional but should be included when it makes the affected owner clearer.

Allowed labels:

| Label | Use |
|---|---|
| `feat` | Add a new non-Markdown capability, page behavior, asset, or feature. |
| `fix` | Change, repair, alter, refactor, maintain, or secure existing non-Markdown files or behavior. |
| `docs` | Add, change, repair, or remove any Markdown (`.md`) content. |

Label precedence:

- Use `docs` whenever the commit changes any Markdown file, including new Markdown documentation.
- Use `feat` only when the commit adds a new capability and does not change Markdown files.
- Use `fix` for every other non-Markdown change, repair, alteration, refactor, maintenance task, or security correction.
- If one logical change requires both Markdown and non-Markdown files, use `docs` because the commit changes Markdown. Split the work only when the changes are genuinely independent responsibilities.

Examples:

```text
feat(search): add section result filtering
fix(search): correct candidate section target
docs(contributing): define peer review workflow
docs(guides): add changelog versioning manual
fix(navigation): separate shared search rendering
fix(repo): remove superseded audit file
```

Commit rules:

- Use lowercase labels exactly as listed.
- Use only `feat`, `fix`, or `docs`; no other label is permitted.
- Write the summary in the imperative form, such as `add`, `correct`, `define`, or `remove`.
- Keep the summary concise, specific, and free of a trailing period.
- Keep one logical responsibility per commit when practical.
- Do not use generic summaries such as `updates`, `changes`, `fix stuff`, or `AI edits`.
- Do not create a new changelog version for each commit. The pull request, not the commit, owns the version.

## Peer Review and Merge Rule

Every pull request targeting `main` requires approval from at least one reviewer other than the pull request author.

The reviewer must check:

- The change matches the stated scope and repository ownership rules.
- Verification evidence supports the claimed result.
- Markdown and rendered-page content remain synchronized when applicable.
- The pull request uses one dated changelog version and records all notable human and AI-assisted changes.
- A verified PR identifier is present when the changelog boundary would otherwise be ambiguous.
- Required ADRs are present and linked.
- Requested changes and review conversations are resolved before approval.

The author must not approve their own pull request as the required peer review. Do not merge into `main` before the peer approval is recorded.

## Contribution Use Cases

### Add a New Manual or Workflow

Use the Manual Addition issue template when a workflow, page, section, or verified instruction is missing.

Required work normally includes:

- Add or update the owning Markdown source under `docs/workflow/`, `docs/domain-governance/`, or the applicable guide directory.
- Add or update the matching rendered page under `pages/<category>/<section>/`.
- Put page content in the page-local `assets/js/dataFiller.js` or its verified existing content owner.
- Put page behavior in page-local JavaScript and presentation in page-local CSS.
- Add a searchable-document entry to `shared/js/headerSearch.js` when the page enters the searchable documentation set.
- Add or update home-page metadata in `shared/data/gopick-data.json` only when the new manual must be discoverable from the home page.
- Preserve matching headings, section IDs, links, hierarchy, and terminology between Markdown and the rendered page.

Evidence must confirm the real UI, navigation path, workflow, visible rule, or observed result. Do not document an inferred workflow as confirmed behavior.

### Correct Existing Manual Content

Use the Manual Correction issue template for inaccurate instructions, outdated behavior, broken links, unclear wording, or presentation that changes the documented meaning.

Required work normally includes:

- Identify the owning Markdown section and matching rendered-page section.
- Correct both representations when documentation meaning changes.
- Preserve stable URLs and section IDs unless changing them is explicitly required.
- Update all confirmed references when a link target or navigation contract intentionally changes.
- Stop and request the missing confirmation when the correct behavior cannot be verified. Do not guess a correction or create a new documentation layer unless it is explicitly in scope.

A wording-only correction that does not change rendered meaning may affect only the Markdown owner, but this must be verified against the current page rather than assumed.

### Synchronize Markdown and a Rendered Page

Use this flow when the Markdown is correct but the browser page is incomplete, or the page is correct but its Markdown source has drifted:

1. Read the entire Markdown ownership tree and the complete page data structure.
2. Confirm which representation contains the verified meaning.
3. Preserve UI ownership headings as page-section hierarchy.
4. Map detail blocks to the established page-data keys documented in `AGENTS.md`.
5. Keep `Purpose / Scope`, access paths, steps, rules, expected results, notes, and classified inputs attached to their owning section.
6. Convert Markdown references into clickable rendered links instead of copying the referenced instructions.
7. Verify that search, sidebar, direct URL, and direct hash navigation reach the synchronized content.

Do not flatten the Markdown hierarchy into unrelated cards or add detail-block headings to the sidebar.

### Change Page-Specific Presentation or Behavior

Keep a page-specific change inside the owning `pages/<category>/<section>/` directory:

- Structure belongs in `index.html`.
- Content and DOM population belong in the established page data owner.
- Interaction belongs in page-local JavaScript.
- Presentation belongs in page-local CSS.

Reuse the existing page renderer, components, Tailwind utilities, and `DESIGN.md` tokens before introducing new markup or styles. Do not put JavaScript or CSS inline.

### Change Shared Navigation, Search, or Site Presentation

Use `shared/` only when the behavior or presentation is intentionally shared by multiple pages.

Before editing shared code:

- Identify every page that consumes the shared owner.
- Confirm that the requested behavior is shared rather than page-specific.
- Preserve relative paths, keyboard behavior, focus management, ARIA state, search targets, and direct links.
- Verify representative pages at different directory depths.
- Update every applicable versioned asset reference using `?v=YYYYMMDD-description`.

Do not copy a shared change into multiple page-local files as an alternative path.

### Change Home-Page Content

The root `index.html` owns the home-page shell. Home-page content belongs in `shared/data/gopick-data.json`, which is loaded and rendered by the shared data loader and content binder.

Keep content changes in the JSON owner unless the request explicitly changes structure or behavior. Missing required data must remain an explicit error; do not add silent defaults or hard-coded duplicate content to suppress a failure.

### Record a Crucial Decision

Create or update an ADR when a contribution makes a crucial architectural, documentation, workflow, governance, or compatibility decision.

- Name a new record `docs/adr/NNN-abc.md` using the next sequential number and a three-letter lowercase scope.
- Include title, status, date, scope, context, decision, and consequences.
- Retain superseded records and link them to their replacements.
- Also add a concise changelog entry describing what changed.

Routine corrections and implementation details do not require an ADR. Follow `docs/adr/README.md` for the complete contract.

### Prepare a Release or Archive an Old Changelog

Every pull request merged into `main` is materially released:

- Create exactly one new semantic version and dated section for a new pull request.
- Add later changes from the same pull request to that section without creating another version.
- Record every notable human and AI-assisted change under that version before merge.
- Select `MAJOR`, `MINOR`, or `PATCH` from the highest-impact pull request change.
- Add a verified PR number to the heading when the PR boundary is unclear, or use the first commit SHA that actually belongs to the PR when no PR number is available.
- Stop if a required identifier cannot be verified. Do not use a placeholder or an unrelated commit.
- Keep the active `CHANGELOG.md` at the repository root.

Use `docs/old-version/` only during intentional archive maintenance. Do not move or copy the active changelog there during an ordinary pull request.

### Report Security or Conduct Concerns

Do not disclose sensitive security details in a public issue or pull request. Follow `SECURITY.md` for private reporting. Follow `CODE_OF_CONDUCT.md` for conduct concerns and enforcement information.

## Content Ownership Reference

| Change | Primary owner |
|---|---|
| Documentation meaning | `docs/**/*.md` |
| Rendered page structure | `pages/**/index.html` |
| Page content and hierarchy | Page-local `assets/js/dataFiller.js` or verified existing owner |
| Page interaction | Page-local JavaScript |
| Page presentation | Page-local CSS |
| Shared shell, navigation, and search | `shared/` |
| Home-page content | `shared/data/gopick-data.json` |
| Visual tokens and design decisions | `DESIGN.md` |
| Notable change summary | `CHANGELOG.md` |
| Crucial decision reasoning | `docs/adr/` |

Use the narrowest existing owner. Do not create a second source for the same meaning or behavior.

## Implementation Requirements

- Implement only the explicitly requested behavior.
- Keep one clear flow and remove replaced logic only when the new behavior fully covers it.
- Do not add hidden fallbacks, silent errors, undeclared defaults, implicit global state, or copied legacy paths.
- Use explicit, intention-revealing names and keep each function focused on one responsibility.
- Preserve established page URLs, section IDs, sidebar order, search targets, and asset paths.
- Use safe DOM APIs and `textContent` for plain text. Use trusted HTML strings only when markup is necessary.
- Do not add inline `<script>` or `<style>` elements.
- Do not add comments except necessary `TODO` items and explicit HTML section markers.

## Verification Requirements

Run checks proportional to the touched scope and report exactly what was performed.

For documentation and page changes, verify as applicable:

- The repository is served from its root through a local static server.
- Changed pages render at desktop and mobile widths.
- Direct page URLs and section hashes work.
- Sidebar and global search links reach their intended owners.
- Markdown meaning and rendered content remain synchronized.
- Images have alternative text and form controls have labels.
- Keyboard interaction, focus behavior, and relevant ARIA state remain correct.
- Changed JavaScript passes `node --check <path>`.
- Changed JSON parses successfully.
- Changed CSS and JavaScript pass the applicable available lint or format check.
- `git diff --check` passes.

Do not mark an unperformed check as passed. State why a conditional check was not applicable or remains open.

## Changelog Requirement

Every new pull request must add exactly one semantic version and date to `CHANGELOG.md`. Every notable human and AI-assisted change in that pull request must be recorded under the same version. Use `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, or `Security` as appropriate.

When repository history cannot reliably identify the PR boundary, use `## [version] - YYYY-MM-DD - PR #number`. If no PR number is available, use the first verified commit SHA that belongs to the PR. Never use an unrelated earlier commit or a placeholder.

The changelog describes the user- or contributor-relevant result. It is not a commit log and does not replace an ADR.

## Pull Request Checklist

Complete `.github/pull_request_template.md` with:

- A concise summary and exact scope.
- Verification commands and results.
- Screenshots or local URLs when presentation changed.
- Confirmation of Markdown and rendered-page synchronization when applicable.
- Confirmation of the pull request's semantic version, date, categorized entries, and verified PR identifier when required.
- The ADR path or a clear explanation that no crucial decision was made.
- Known risks and explicitly scoped follow-up work.
- Confirmation that at least one peer reviewer other than the author approved the pull request before merge.

Review the final diff for unrelated changes before requesting review. Existing staged or unrelated work must not be overwritten, removed, or included without confirmation.
