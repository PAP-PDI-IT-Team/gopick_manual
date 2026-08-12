## Summary

Describe what changed and why.

## Scope

List the files, pages, workflows, or behaviors intentionally changed.

## Verification

Describe the checks performed and their results.

- [ ] Changed pages render through a local static server, when applicable.
- [ ] Desktop and mobile presentation were checked, when applicable.
- [ ] Direct links and section hashes were checked, when applicable.
- [ ] Images have alternative text and form controls have labels, when applicable.
- [ ] Changed CSS and JavaScript passed the applicable lint or format check.
- [ ] Root, shared, and page-level assets remain synchronized where required.
- [ ] No unrelated behavior or files were changed.

## Documentation Records

- [ ] This new pull request has exactly one new semantic version and date in `CHANGELOG.md`, or this update uses the version already created for this same pull request.
- [ ] Every notable human and AI-assisted change is recorded under that version in the appropriate Keep a Changelog category.
- [ ] The version heading includes a verified PR number or PR commit SHA when the pull request boundary would otherwise be ambiguous.
- [ ] Relevant `docs/*.md` sources match the rendered page content, when behavior or documentation changed.
- [ ] A new or updated `docs/adr/NNN-abc.md` records every crucial decision introduced by this pull request, or no crucial decision was made.

ADR path or reason one is not required:

Changelog version and PR identifier, when required:

## Evidence

Include screenshots, local URLs, commands, or other evidence supporting the verification results.

## Risks and Follow-up

List known risks or explicitly scoped follow-up work. Write `None` when there are none.

## Peer Review and Merge

- [ ] At least one reviewer other than the pull request author has approved this pull request.
- [ ] All requested changes and review conversations are resolved.
- [ ] This pull request targets `main` from a dedicated `feat/<intent-summary>` or `fix/<intent-summary>` branch whose lowercase kebab-case summary contains no more than five words.
- [ ] The pull request will not be merged until the required approval and applicable verification are complete.

Reviewer:
