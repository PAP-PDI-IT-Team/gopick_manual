# Changelog

All notable changes to the GoPick Assessment Center Manual will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-12

### Added

- Added a pull request template requiring a scoped summary, verification evidence, a versioned changelog entry, and an ADR only for very important, durable decisions with broad or difficult-to-reverse consequences.
- Added the `docs/adr/NNN-abc.md` decision-record convention and the first documentation-governance ADR.
- Reserved `docs/old-version/` for changelog files archived during future version maintenance.
- Added a changelog-versioning guide covering semantic version selection, changelog categories, release preparation, ADR responsibility, and archive rules, with synchronized rendered guidance and search indexing.
- Added repository-specific contribution guidance for manual additions, corrections, Markdown synchronization, page and shared changes, qualifying high-impact decisions, releases, and security or conduct reporting.
- Added a decision record establishing one dated semantic version per pull request and explicit PR identification for ambiguous history.
- Added branching, commit-label, and mandatory one-peer-review requirements for contributions targeting `main`.

### Changed

- Consolidated verified coding principles, current codebase ownership rules, and the Markdown-to-page translation contract into `AGENTS.md`; replaced the separate codebase audit and documented the end-to-end development and pull request process in `README.md`.
- Replaced the `Unreleased` workflow with a pull-request release model requiring every notable human and AI-assisted change to remain under the pull request's single dated version.
- Limited branch labels to `feat` and `fix` with a five-word kebab-case intent, while keeping commit labels limited to `feat`, `fix`, and `docs` and requiring `docs` whenever a commit changes Markdown.

## [1.0.0] - 2026-08-12

### Added

- Established the GoPick Assessment Center Manual as a browser-based static documentation site.
- Added a repository code of conduct defining expected behavior, private reporting, and enforcement responsibilities.
- Added separate issue templates for manual additions and manual corrections, including evidence requirements.
- Added workflow manuals for accounts, candidates, assessments, meters, reports, the resource center, users, and roles and permissions.
- Added dashboard, platform overview, meter domain-governance, developer-rule, and manual-authoring documentation.
- Added shared site navigation and cross-page search for manual pages and sections.
- Added the GoPick banner to the top of the repository README.
- Added an AI-assistance disclosure and a correction-request link to the README.
- Added Markdown sources under `docs/` with corresponding rendered pages and page-local assets under `pages/`.
- Added repository guidance in `README.md`, contribution constraints in `AGENTS.md`, security reporting guidance in `SECURITY.md`, and licensing terms in `LICENSE.md`.
