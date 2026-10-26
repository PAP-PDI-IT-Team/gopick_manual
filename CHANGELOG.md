# Changelog

All notable changes to the GoPick Assessment Center Manual will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-10-26

### Added

- Documented Create Test Battery in the Accounts wizard layout with Assessment List selection, a minimum of two assessments, and Test Battery Configurations inputs and Next, Save, and Back actions.
- Added a screenshot placeholder for Download Template under Import Assessment.
- Documented the Preview Assessment expected result covering provider-supplied assessment information, available test norms, and the assessments included in a test battery.
- Added Assessment Management screenshot placeholders for Search, Advanced Search, category and code filters, sort field and direction, Preview Assessment, Upload Norm, and Schedule Job Fit Profile.
- Added Page Setup, Set Questions, Set Report Template, and Debug Mode under Config Dropdown, plus Update, Export Assessment, View Scheduled Candidates, and Delete under Settings Dropdown, synchronized across the workflow source, rendered content, and navigation.

### Changed

- Moved the Create Test Battery overview screenshot placeholder into its two wizard steps, with one preview for Assessment List and one for Test Battery Configurations.
- Replaced the Upload Norm screenshot placeholder with a full-width under-construction illustration stored under shared images while its destination page is being prepared.

- Moved the Assessment Management Tailwind configuration into a page-local script to satisfy the embedded JavaScript check while preserving its brand colors and load order.

### Fixed

- Renamed short local identifiers in the Assessment Management renderer to satisfy the repository naming check without changing rendering behavior.
- Restored the Access Path label above navigation chips in Assessment Management sections.

### Removed

- Removed the Assessment Management Other Pages section from the workflow source, rendered content, and navigation.

## [1.4.0] - 2026-10-21

### Added

- Added matching pull-request and pre-commit checks that reject short JavaScript identifiers and embedded or inline CSS and JavaScript, and classify changed HTML, CSS, and JavaScript files using the repository's CMQC line-count thresholds and `dataFiller.js` exemption, with per-file results in the GitHub Actions job summary.

## [1.3.0] - 2026-10-20

### Added

- Added the Dashboard Account Monitoring and Quick Navigation screenshots with blurred surroundings and an outlined focus area, replacing their pending placeholders.
- Added a shared screenshot carousel to the image-card component with previous and next arrows, dot indicators, a position counter, and keyboard navigation; sections with a single screenshot render unchanged.
- Added screenshot placeholders for the remaining Accounts Management wizard steps, update variants, configuration pages, search, row actions, and bulk actions.
- Added Accounts Management screenshots for the Create Account wizard, the View Account tabs, View Accounts and Advanced Search, and Update Specific, each with blurred surroundings and an outlined focus area and with contact details redacted.

### Changed

- Added an opt-in browser-frame presentation for screenshot cards, enabled only on the Accounts Management page, with a window title bar, uncropped images, and no live-reference badge; other pages keep the existing card style.
- Restored the Dashboard to its standard screenshot cards and page data consumed by its dedicated renderer.
- Switched the Accounts Management renderer to the shared carousel so sections with multiple screenshots show them in one card.
- Moved the Dashboard and Accounts Management Tailwind configuration into an external shared script, preserving their existing brand colors and load order.

## [1.2.0] - 2026-08-24

### Added

- Added the Advisory management workflow manual and its rendered page for creating, formatting announcement images, searching, viewing, updating, and deleting announcements.

### Changed

- Aligned the Advisory manual structure, content sequence, navigation, and visual presentation with the established Accounts manual pattern.
- Applied review feedback by grouping Advisory action pages under Other Pages, folding editor formatting into Create Announcement rules, removing redundant tab access paths and the Dashboard preview section, and linking Dashboard announcements to View Advisory.
- Presented the Dashboard Advisory navigation as an icon card consistent with the existing quick-navigation cards and retained visible keyboard focus.
- Distinguished Advisory heading levels, rendered numbered steps and muted square list markers, preserved the Dashboard access-path link, and clarified update and delete permissions against the GoPick application.
- Documented package-free local serving with Python and an alternate port when port 82 is occupied.
- Synchronized Advisory visibility and Dashboard guidance with the behavior in GoPick application main commit `af6abcd5d`.
- Kept Advisory documentation focused on confirmed user-visible management workflows and removed the separate Advisory domain-governance and known-gap documentation.
## [1.1.1] - 2026-09-24 - PR 144a0e5

### Changed

- Added a root SOP with a Mermaid workflow and stage-responsibility tables covering interview-based planning, manual human or agent editing, human review and revisions, CMQC, and local commits through the commit skill for either author's changes.
- Made explicit GoPick commit skill invocation automatically update the PR's changelog entries and create local commits without proposals or confirmation, while preserving required checks, explicit review-only requests, and the prohibition on pushing or merging.
- Added the repository-scoped CMQC skill to check only staged and unstaged HTML, CSS, and JavaScript changes for line-count thresholds with a `dataFiller.js` exemption and embedded/inline CSS and JavaScript violations, with entrypoints for Codex, Claude, and Antigravity.
- Moved the GoPick commit skill into the repository's official `.agents/skills/` directory, added Claude and Antigravity Markdown entrypoints and a Claude discovery link, and removed the previously installed user-level copies.
- Added the Assessment Management hero description covering assessment management, test battery creation, and Job Fit Profile access, synchronized with the Markdown source.
- Isolated the shared screenshot-card renderer and stylesheet in `shared/components/image-card/`, updated all ten workflow consumers and site-shell asset versions, and documented how to reuse the component on other pages.
- Reset the Assessment Management Markdown and rendered page to an Accounts Management-style shell, replacing the previous instructions and custom presentation with the four confirmed major assessment areas and documenting View Assessments functions through the established Access Path, How To Use, and Expected Result format.
- Documented the finalized Import Assessment workflow and its Download Template child feature without adding unconfirmed results or file validation rules.
- Renamed Click Assessment Card to View specific Assessment, updated its assessment-information description, removed its placeholder expected result, and added Preview Assessment, Upload Norm, and Config Dropdown child sections.
- Added Settings Dropdown after Config Dropdown and the top-level Other Pages section after Schedule Job Fit Profile in Assessment Management.

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
