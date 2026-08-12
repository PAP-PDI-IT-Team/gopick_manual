# Decision Records

This directory records only very important architectural, documentation, workflow, governance, and compatibility decisions with durable, broad, or difficult-to-reverse consequences. `CHANGELOG.md` records what changed; an ADR explains why a qualifying choice was made and what it affects.

## Current Decision Record

| ADR | Status | Scope | Decision summary |
|---|---|---|---|
| [`001-gov.md`](001-gov.md) | Accepted | Change records, pull requests, and releases | Separates changelog and ADR responsibility; requires one dated version and dedicated branch per PR; defines branch and commit labels; and requires one peer approval before merging to `main`. |

## ADR Threshold

Create or update an ADR only when the decision is very important and at least one of these is true:

- It establishes or replaces a repository-wide contract, architecture boundary, governance rule, release rule, or compatibility policy.
- It affects multiple owners, modules, workflows, or future pull requests.
- Reversing it later would require coordinated migration, break an established contract, or materially disrupt contributors or users.
- Future maintainers need the decision context to avoid repeating a high-impact debate or unintentionally reversing the policy.

Do not create an ADR for:

- Routine implementation choices or code organization within an established rule.
- Minor documentation, wording, styling, naming, or layout decisions.
- Bug fixes, content corrections, dependency updates, or ordinary maintenance.
- A decision that affects only one small pull request and has no durable consequence.
- Every decision discussed during development or review.

When the threshold is not met, document the result in the versioned changelog when it is notable and keep implementation details in the pull request. Do not create an ADR merely to fill the PR template.

## File Naming

Name each record `NNN-abc.md`:

- `NNN` is the next sequential three-digit record number.
- `abc` is a three-letter lowercase scope identifying the decision area.

For example, `001-gov.md` is decision 001 for repository governance. Do not reuse a sequence number or silently replace an existing decision record.

## Required Sections

Each decision record must contain:

- Title
- Status
- Date
- Scope
- Context
- Decision
- Consequences

Use `Proposed`, `Accepted`, `Superseded`, or `Deprecated` as the status. When a later record replaces a decision, retain the old record, mark it `Superseded`, and link both records.

Create or update a decision record only when the ADR threshold above is met.
