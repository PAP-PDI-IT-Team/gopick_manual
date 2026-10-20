---
name: gopick-commit
description: Prepare commit messages and create authorized commits for the GoPick Assessment Center Manual repository using its current contribution rules and verified changes. Use for GoPick commit requests or commit-message reviews, not general implementation, other repositories, or automatic publishing.
---

# GoPick Commit

## Establish scope and authority

Confirm the working repository is the GoPick Assessment Center Manual from its README and repository metadata. Read its current `AGENTS.md` and `CONTRIBUTING.md`, including applicable nested instructions. Current written rules and explicit user decisions take precedence over inconsistent historical examples.

Inspect the current branch, `git status --short`, staged and unstaged diffs, relevant untracked files, and recent commit subjects with their changed files. Use history to identify useful scopes and wording, not to excuse violations of current rules. Read new files before staging them.

Explicitly invoking `$gopick-commit` or `/gopick-commit` authorizes creating local commits. Inspect the changes, choose the appropriate messages and logical commit groups, run the required checks, and commit without presenting proposals or asking for confirmation. An explicit commit request or authorization already given for the same scope also permits execution.

Honor any scope named by the user. A bare invocation covers the pending staged, unstaged, and relevant untracked changes in this repository; inspect them and split independent responsibilities into focused commits. Preserve changes the user has explicitly excluded. Do not ask the user to choose messages or routine commit grouping.

An explicit message-only, review-only, or dry-run request overrides automatic committing: do not edit the changelog, stage, or commit in those cases. A request to edit this skill is a skill-maintenance task, not an invocation to commit repository changes. Automatic discovery during ordinary implementation does not authorize commits.

Stop only for a concrete blocker such as unresolved conflicts, failed required checks, or missing repository context that cannot be established through inspection. Explain that blocker directly; do not replace it with a redundant authorization request.

Never push through this skill, including force-pushes or equivalent remote writes through an API or another tool. Commit authorization permits local commits only. If asked to commit and push, complete the authorized local commit and explain that pushing must be handled by the user. Do not merge through this skill.

## Select the message

Use `<label>(<optional-scope>): <imperative summary>`; omit the parentheses when no scope is needed.

| Changes in the intended commit | Label |
|---|---|
| Any Markdown addition, modification, or deletion, including mixed Markdown and code | `docs` |
| A new capability without Markdown changes | `feat` |
| Other non-Markdown changes, including corrections, refactoring, maintenance, and security fixes | `fix` |

Use only `docs`, `feat`, or `fix`. Select a scope from the affected responsibility and established repository usage, such as `shared`, `workflow`, or `assessment-management`. Keep the summary concise, specific, imperative, lowercase after the colon, and without a trailing period. Describe the resulting change rather than generic activity such as “updates” or “fix stuff.”

Examples:

```text
docs(shared): isolate image card renderer and styles
docs(assessment-management): add module description
fix(workflow): correct section navigation
feat(search): add category filtering
```

Historical `fix` commits that also changed Markdown are not a precedent for using `fix` in that situation.

## Prepare the scoped commit

Keep one logical responsibility per commit. Do not split related Markdown and code merely to obtain another label. Identify the files or hunks covered by the invocation and exclude work outside any user-specified scope, including already-staged changes. Preserve excluded file contents and staging; do not reset or unstage someone else's work to simplify the commit. Ask about scope only when explicit user constraints conflict or cannot be resolved through inspection.

Never commit contribution work directly to `main`. Follow the current branch rules: one dedicated `feat/<intent-summary>` or `fix/<intent-summary>` branch per PR, with a lowercase kebab-case summary of at most five words. Verify the intended baseline before creating a branch; do not switch branches or establish a new PR boundary from an unverified assumption.

Check the repository's required verification and relevant existing results. Run missing checks appropriate to the changes; do not claim unperformed checks passed or repeat successful checks without a reason.

Automatically update root `CHANGELOG.md` before committing. Commit authorization includes the related changelog edits; do not ask for separate confirmation or leave this work to the user. Read `docs/guides/changelog-versioning.md` and inspect the existing entries and scoped diff, then:

- Add or revise concise entries for notable changes under the appropriate categories. If an entry already covers the result accurately, leave it intact rather than duplicating it.
- Update the current PR's dated version section. Create one new semantic version only for a verified new PR boundary, never merely for another commit. Follow the guide for version selection and intended merge date; do not add an `Unreleased` section.
- Preserve unrelated entries and edits. Include the relevant changelog hunks with each logical commit and verify their coverage against that commit's actual contents.
- Never invent a PR identifier or use an unrelated/base commit as one. Obtain missing required context that cannot be verified through inspection before finalizing the release entry.
- Use `docs` when the commit includes `CHANGELOG.md`, even if the other changes are code. Do not split related changelog updates into a separate commit just to retain `feat` or `fix`.

Stage only the authorized changes, inspect the exact diff intended for the commit, and run `git diff --cached --check` for staged changes. Verify the selected label against the actual commit contents. When unrelated changes are staged, use a scoped approach that preserves them and review the intended contents before committing; do not let a plain commit sweep them in.

Create the authorized commit with the selected message. If a hook or Git operation fails, inspect the cause rather than bypassing checks. Amend, reset, force-push, and history rewriting are outside an ordinary new-commit request.

## Report the result

Verify the resulting commit and working-tree status. Report the actual short hash, message, and any remaining changes. Only report a clean working tree when status confirms it. For message-only requests, return the proposed message and explain the label briefly when useful; do not claim a commit was made.
