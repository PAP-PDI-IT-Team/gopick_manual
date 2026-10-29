# Changelog

All notable changes to the GoPick Assessment Center Manual will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2026-10-29 - PR #63

### Added

- Added a shadcn-style documentation shell to all 15 inner manual pages:
  - an always-open page tree;
  - a title row with Copy page, which copies the page's Markdown source, and previous/next arrows;
  - a two-level On this page rail;
  - link anchors on section headings;
  - an outline previous/next pager.
- Added shared content components (`shared/js/ui/docsComponents.js`, `shared/css/docs-components.css`):
  - Steps with numbered circles;
  - bordered Rules, Warning, Expected result and Notes callouts with icons;
  - an Input | Type table for classified inputs;
  - inline-code access paths;
  - bordered screenshot frames, code blocks and tables.
- Added a shared block renderer (`docsBlockRenderer.js`, `docsBlockPage.js`, `docsContentStore.js`) that renders Reports, Users, Roles and Permissions, Activity Log, Advisory, Resource Center, Meters Governance, Manual Guides, Page Structure v3 and Dev Rules from content-only `dataFiller.js` files.
- Added a floating red menu button in the bottom-right corner below 1024px; it turns into a close button while the documentation drawer is open.
- Added loading skeletons to the sidebar, title arrows, On this page, pager, content and screenshots, with a short message when navigation data cannot load.

### Changed

- Moved the Meters resolution-paths matrix and the Accounts and Meters journey styles into shared files, used by Meters Management and Meters Governance.
- Moved the search page list into `shared/js/headerSearchManifest.js` and added Dashboard, Page Structure v3 and Dev Rules to search.
- Moved the landing page Tailwind configuration into `shared/js/tailwindConfig.js` and renamed short JavaScript identifiers to satisfy the pull-request checks.
- Set inner pages to the shadcn type scale (15px body, 24/20/18px headings) with zinc neutrals and the GoPick red for the active page, active section, step numbers and links.

- Aligned the Meters Management sidebar with Accounts Management (collapsible tree, active-branch opening, hash handling, `18rem` column) and applied the flat page styling to the hero, sections, legends, and matrix controls.
- Applied the Accounts Management flow section pattern to Meters Management: access trail, chip groups, numbered how-to-use steps, rules, and a `What you see` line, using the page-local `flowBuilders.js` and flow stylesheets. Screenshot placeholders are kept.
- Added the Meter Requests screenshot to Meters Management with the shared screenshot treatment (blurred surroundings and account names, outlined module content) and the click-to-enlarge screenshot viewer.
- Enabled the window-frame image card on Meters Management.
- Added the approve and decline confirmation screenshots to Approve Or Reject Request in Meters Management.
- Added the Order Meters, Transfer Meters, and Meter Records screenshots to Meters Management with the shared screenshot treatment.
- Added the View Meter Log screenshots to Meters Management, covering both access paths (from Meter Records and from View Meter) and the Meter Log page.
- Reworked New Discovery And Settings-Changed Notes in Meters Management from flat text lists into one card per event, with Remarks, Target Account, and Addition and Deduction rows, colored Target, Actor, and Parent view badges, highlighted conditions, and a short reading guide.
- Reworked Remark Meaning Guide in Meters Management into a two-column table (remark you see, what it means) with highlighted placeholders, and aligned the meanings to `docs/workflow/meters-management.md`.
- Restored the live Meters Management Resolution Paths Matrix on the flow page: the 8-column table with type filter pills, search, the `SHOW_ERROR` column mode switcher, the path counter, and horizontal scroll, with its original section description in `docs/workflow/meters-management.md`.
- Changed Meters Management How to use steps to a horizontal journey at 1200px and wider that stacks vertically below it, with the final step highlighted.
- Replaced the inline Tailwind configuration on Meters Management with the shared `shared/js/tailwindConfig.js`.
- Added the Assign Products, Meter Management, and Other Account Settings update form screenshots to the Update Specific carousel in Accounts Management, with blurred surroundings, an outlined form, emphasized Next and Review Changes buttons, and the account name blurred.

### Removed

- Removed the per-page sidebar trackers, layout stylesheets, `shared/js/manualNav.js`, and the unused Accounts Management RBAC table code and files.

## [1.4.0] - 2026-10-21

### Added

- Added matching pull-request and pre-commit checks that reject short JavaScript identifiers and embedded or inline CSS and JavaScript, and classify changed HTML, CSS, and JavaScript files using the repository's CMQC line-count thresholds and `dataFiller.js` exemption, with per-file results in the GitHub Actions job summary.

## [1.3.0] - 2026-10-20

### Added

- Added the Dashboard Account Monitoring and Quick Navigation screenshots with blurred surroundings and an outlined focus area, replacing their pending placeholders.
- Added a shared screenshot carousel to the image-card component with previous and next arrows, dot indicators, a position counter, and keyboard navigation; sections with a single screenshot render unchanged.
- Added screenshot placeholders for the remaining Accounts Management wizard steps, update variants, configuration pages, search, row actions, and bulk actions.
- Added Accounts Management screenshots for the Create Account wizard, the View Account tabs, View Accounts and Advanced Search, and Update Specific, each with blurred surroundings and an outlined focus area and with contact details redacted.
- Added the Update Specific screenshots for the Account Information, Assigned Assessments, Meter Management, and Other Account Settings groups, each with a blurred surround, an outlined section card, an emphasized Update button, and personal values blurred.
- Added the Create Account wizard step screenshots for Account Information, Assign Products, Meter Management, Other Account Settings, and Review Account Details, using carousels where a step spans two screens and blurring personal values on the review step.

### Changed

- Added an opt-in browser-frame presentation for screenshot cards, enabled only on the Accounts Management page, with a window title bar, uncropped images, and no live-reference badge; other pages keep the existing card style.
- Restored the Dashboard to its standard screenshot cards and page data consumed by its dedicated renderer.
- Switched the Accounts Management renderer to the shared carousel so sections with multiple screenshots show them in one card.
- Made the Accounts Management sidebar collapsible with a wider layout, a clearer active state, and softer inactive links.
- Redesigned the Create Account wizard overview as flat content on the main panel with a journey track that brackets the five wizard steps and highlights the step shown in the carousel, an inline expected result, and Dev and QA notes in a popover, and made every Accounts Management screenshot open enlarged on click.
- Rebuilt the Accounts Management View Accounts section on the wizard step design: a status legend and row action and page button groups as count-badged chip groups, with linked chips for each action.
- Added the Account Detail screenshot with a blurred surround, an outlined focus area, and blurred personal values, and rebuilt the Account Detail section on the wizard step design with an access trail, page control chips, and a "What you see" panel that splits Return Button destinations from conditional fields.
- Added the Update Account Information screenshots with a blurred surround, an outlined focus area, and blurred personal values, and rebuilt Update Account as a wizard overview with a four-step carousel, locked-input chips, a single How to use journey track that brackets the four wizard steps and highlights the step shown in the carousel, grouped guard-rail Rules taken from the Markdown, and Previous and Next controls.
- Rendered the Review Account Details How to use as a linear, non-clickable journey track.
- Reflowed the wizard Rules guard rails into two balanced columns with counted group headings, quieter field names, and highlighted limit values.
- Added the Update Account wizard screenshots for Assign Products, Meter Management, and Other Account Settings with blurred surroundings and an outlined focus area, and blurred the account name.
- Split the Accounts Management page stylesheet into sidebar, layout, flow overview, wizard, inputs, rules, journey, and screenshot viewer files with no visual change.
- Added hover and focus tooltips to the View Accounts page buttons, taken from the Markdown descriptions.
- Added the View Archived Accounts screenshot with a blurred surround and an outlined focus area, and removed the redundant Row Actions chip from the row action groups, leaving the row actions as direct links.
- Rebuilt Update Specific on the wizard step design: an access trail, a notes popover with the password note recorded as a Dev note as in the Markdown, a How to use journey with a Section variants band linking to each section, a "When you save" result, and a four-variant carousel labeled "Variant N of 4" with input chips, grouped guard-rail Rules, and Previous and Next controls.
- Rebuilt Privacy Consent on the wizard step design with an access trail, page control chips, a numbered How to use list, and a "When you save" result, and added its screenshot with a blurred surround, an outlined content area, an emphasized Save button, and the account name blurred.
- Rebuilt Demographics on the wizard step design with an access trail, a notes popover, required and optional field chip groups, a numbered How to use list, Rules, and a "When you save" result, with its description, steps, rules, and expected results taken from the Markdown, and added its screenshot with a blurred surround, an outlined form, and an emphasized Save Changes button.
- Rebuilt Assessment Completion Page on the wizard step design with an access trail, a notes popover, page control chips, a numbered How to use list, Rules, and a "When you save" result, with its description, steps, rules, and expected results taken from the Markdown, and added its screenshot with a blurred surround, an outlined content area, an emphasized Save button, and the account name blurred.
- Rebuilt Assessment Center Logo on the wizard step design with an access trail, a notes popover, page control chips, a numbered How to use list, Rules, and a "When you save" result, with its description, steps, rules, and expected results taken from the Markdown, and added its screenshot with a blurred surround, an outlined content area, an emphasized Save button, and the account name blurred.
- Added `docs/guides/ui-dna.md`, a reusable reference for applying the Create Account flow design to other manual sections.
- Moved the Dashboard and Accounts Management Tailwind configuration into an external shared script, preserving their existing brand colors and load order.
- Added the Unblock Account, Manage Assigned Assessment, Search, Advanced Search, View Active Account listing, View Archived Account, Update Account Row Action, Archive, Restore, and Bulk Action Archive, Delete, and Restore screenshots with a blurred surround, an outlined content card, an emphasized Unblock Account option or Save button, and personal values blurred, and rebuilt Unblock Account, Manage Assigned Assessment, Search, Advanced Search, the row actions, and the bulk actions on the view panel design with pending screenshot placeholders, and moved the View Active Account and View Archived Account visible content and conditional results into the Markdown.
- Rendered every Accounts Management How to use as a horizontal numbered journey, replacing the vertical step list, which stacks vertically below 768px.
- Removed the Advanced Search dialog screenshot from the View Accounts listing section, which keeps the listing screenshot; Advanced Search has its own screenshot.

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
