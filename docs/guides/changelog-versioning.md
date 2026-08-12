# Changelog Versioning

This guide defines the GoPick Manual changelog model. Every pull request merged into `main` is treated as materially released, so this repository does not use an `Unreleased` section.

## Pull Request Release Model

One pull request owns one changelog version. All notable human and AI-assisted changes in that pull request must be recorded under the same semantic version and date before merge.

> Rules:
> - Do not place AI-assisted or human-authored changes outside a dated version section.
> - Create one new version for a new pull request, not for each commit or edit within that pull request.
> - Do not create a second version when the same pull request receives additional changes.
> - Do not reuse or reopen an older version for a later pull request.
> - Use the actual intended merge date. Update the date before merge if it changes.

## Version Heading Format

Use this standard heading when the pull request boundary is clear from the current work and repository history:

```md
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD
```

When the pull request boundary cannot be identified reliably, include a stable PR identifier:

```md
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD - PR #123
```

If no PR number is available, use the first commit SHA that actually belongs to the PR:

```md
## [MAJOR.MINOR.PATCH] - YYYY-MM-DD - PR abc1234
```

> Rules:
> - Prefer the GitHub PR number when available.
> - A commit SHA must contain work from the PR. Never use the base commit, an unrelated earlier commit, a branch name, or an invented identifier.
> - Use at least seven hexadecimal characters for a commit SHA.
> - Do not write `pending`, `TBD`, a placeholder number, or a placeholder hash.
> - If a required identifier cannot be verified, stop and obtain it before finalizing the changelog.

## Version Format

Versions use `MAJOR.MINOR.PATCH`.

### Major Version

Increase `MAJOR` for an incompatible or fundamental change to an established repository, documentation, navigation, or contribution contract.

Example: `1.1.0` to `2.0.0`.

### Minor Version

Increase `MINOR` for a backward-compatible capability.

Examples include a new manual workflow, contributor capability, navigation feature, search feature, PR template, or ADR system.

Example: `1.0.0` to `1.1.0`.

### Patch Version

Increase `PATCH` for a backward-compatible correction.

Examples include correcting inaccurate documentation, repairing a link, fixing formatting, or repairing existing behavior without adding a capability.

Example: `1.1.0` to `1.1.1`.

> Rules:
> - Use the highest-impact change included in the pull request.
> - A pull request containing fixes and one backward-compatible capability is a minor version, not a patch version.

## Changelog Categories

Group entries under the applicable Keep a Changelog heading:

- `Added`: new capabilities or documentation.
- `Changed`: changes to existing behavior or documentation.
- `Deprecated`: behavior or content that remains available but is scheduled for removal.
- `Removed`: removed behavior or content.
- `Fixed`: corrected defects or inaccurate documentation.
- `Security`: security-related corrections.

Use concise, user-relevant summaries. Do not use commit messages or implementation logs as changelog entries.

## Pull Request Process

1. Check the latest version in `CHANGELOG.md`.
2. Determine whether the current work belongs to the same open pull request or a new pull request.
3. For a new pull request, select the next semantic version from its highest-impact change and add one dated version section.
4. For additional work in the same pull request, update its existing version section without incrementing the version again.
5. Put every notable change under the appropriate category within that version.
6. Add a verified PR number or PR commit SHA to the heading when the PR boundary is otherwise unclear.
7. Confirm before merge that the version, date, categories, identifier when required, and included changes match the pull request.

Example:

```md
## [1.2.0] - 2026-08-15 - PR #42

### Added

- Added a new workflow manual.

### Fixed

- Corrected its search target.
```

> Expected Result:
> - Every changelog entry belongs to one dated version.
> - Every new pull request creates exactly one new version.
> - Additional commits in the same pull request update the same version.
> - Ambiguous version history carries a verified PR identifier.

## Choosing the Next Version

From version `1.1.0`:

| Highest-impact pull request change | Next version |
|---|---|
| Backward-compatible correction | `1.1.1` |
| Backward-compatible capability | `1.2.0` |
| Incompatible contract change | `2.0.0` |

## Changelog and Decision Records

`CHANGELOG.md` records what changed. A record under `docs/adr/` explains why a crucial architectural, documentation, workflow, governance, or compatibility decision was made and what consequences it has.

Routine corrections normally require only a versioned changelog entry. A crucial decision requires both a versioned changelog entry and an ADR.

## Old Changelog Versions

Keep the active `CHANGELOG.md` at the repository root. Ordinary pull-request releases remain in that file.

Use `docs/old-version/` only during intentional version maintenance when older changelog history is deliberately archived. Give each archived file an explicit version-based filename. Do not copy or move the active changelog during an ordinary pull request.
