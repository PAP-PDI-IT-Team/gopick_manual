# GoPick Assessment Center Manual

GoPick Assessment Center Manual is a static documentation website for GoPick workflows, platform capabilities, domain rules, and documentation standards. The site is built with HTML, CSS, and browser JavaScript, with Tailwind CSS loaded from its CDN.

## What is documented

- Account, candidate, assessment, meter, report, resource-center, user, and role/permission workflows
- Dashboard and platform overview content
- Meter domain-governance rules
- Developer rules and manual-authoring guides
- Searchable navigation between manual pages and page sections

## Run locally

No application packages or build step are required.

### VS Code Five Server

1. Open this repository in Visual Studio Code.
2. Open **Extensions** and install **Five Server**.
3. Select **Go Live** in the VS Code status bar, or right-click `index.html` and select **Open with Five Server**.
4. Use the browser tab opened by Five Server to view the landing page.

### Manually Open From Directory
1. Open the root `index.html` file.
2. It will open the browser to view the landing page.

Five Server must serve the repository root because the landing page fetches `shared/data/gopick-data.json`.

### Open the file directly

You can also open the root `index.html` in a browser. Some browsers block local `fetch()` requests from `file://` pages, so the landing-page data may not load in this mode. Use Five Server when that occurs.

An internet connection is required for the Tailwind CSS CDN used by the pages.

## Repository structure

```text
.
|-- index.html                 Home-page shell
|-- assets/                    Home-page CSS and JavaScript
|-- shared/
|   |-- css/                   Shared site-shell styles
|   |-- data/                  Home-page content data
|   |-- img/                   Shared images and logo
|   `-- js/                    Shared loading, search, navigation, and UI code
|-- pages/
|   |-- workflow/              Rendered workflow manuals
|   |   `-- <page-name>/
|   |       |-- index.html     Page-specific HTML shell
|   |       `-- assets/
|   |           |-- css/       Page-specific layout, components, and styles
|   |           `-- js/        Page-specific content and behavior
|   |-- domain-governance/     Rendered domain-governance documentation
|   |   `-- <page-name>/       Page HTML with its own CSS and JavaScript assets
|   |-- guides/                Rendered documentation guides
|   |   `-- <page-name>/       Guide HTML with its own CSS and JavaScript assets
|   `-- dev-rules/             Rendered developer rules and local assets
`-- docs/
    |-- workflow/              Workflow Markdown sources
    |-- domain-governance/     Domain-governance Markdown sources
    `-- guides/                Documentation structure and authoring standards
```

## Content ownership

The repository keeps documentation meaning and browser presentation separate:

- `docs/**/*.md` is the source of documentation meaning.
- A rendered manual page uses its local `pages/**/index.html` as the structural shell.
- Each page directory owns an `assets/` directory for files used only by that page.
- Page-specific styling belongs in the local `assets/css/` directory. Depending on the page, this can include `style.css`, `layout.css`, `components.css`, or `table.css`.
- Page content and section hierarchy are usually defined in the local `assets/js/dataFiller.js`.
- Page interaction behavior usually belongs in the local `assets/js/behavior.js`. Specialized pages may include additional scripts such as renderers, sidebars, or table enhancements.
- Shared navigation, search, loading, and site-shell behavior belong under `shared/`.
- Home-page cards and metadata are loaded from `shared/data/gopick-data.json`.

When changing one page, begin with that page's local assets. Change files under `shared/` only when the behavior or presentation is intentionally shared by multiple pages.

The site does not parse Markdown at runtime. When documentation changes, update the corresponding Markdown source and deliberately synchronize its meaning with the rendered page data.

## Principles to use and consider

### Keep changes within the requested scope

Change only the page, content, or shared behavior explicitly included in the task. This is a legacy documentation site, so unrelated cleanup can unintentionally change existing navigation, content order, styling, or deep links.

### Use the correct content owner

Place each change at the narrowest owner responsible for it:

- Documentation meaning belongs in `docs/`.
- Page structure belongs in the page's `index.html`.
- Page content belongs in the page-local `assets/js/dataFiller.js`.
- Page behavior belongs in page-local JavaScript.
- Page presentation belongs in page-local CSS.
- Behavior and presentation intentionally used by multiple pages belong in `shared/`.

This separation keeps changes traceable and prevents page-specific requirements from affecting the entire site.

### Preserve one source of meaning

Do not copy the same explanation into multiple Markdown sections. Define shared behavior once and link to its owning section. The rendered page should synchronize with that source instead of creating a second interpretation. This reduces contradictory documentation and makes future updates predictable.

### Follow separation of concerns and single responsibility

Keep content data, rendering, interaction behavior, styling, and shared navigation in their existing owners. A file or function should have one clear responsibility. This makes legacy code easier to understand and reduces the number of files that must change for one behavior.

### Prefer simple, explicit implementations

Apply KISS and YAGNI: implement the current requirement without speculative abstractions, unused configuration, alternative flows, or compatibility paths that were not requested. Explicit inputs, paths, section IDs, and data shapes are easier to inspect and maintain than hidden conventions.

### Preserve stable navigation contracts

Treat page URLs, section IDs, sidebar order, and search targets as public documentation contracts. Change them only when explicitly required, and update every related link or alias together. This protects bookmarks, cross-page references, and direct hash navigation.

### Use clear, intention-revealing names

Use `camelCase` for variables and functions, `PascalCase` for classes, and `SNAKE_UPPER_CASE` for constants. Avoid generic or abbreviated names. Clear names show what content or behavior a value owns without requiring additional comments.

### Keep documentation evidence-based

Document only behavior verified from the current UI, navigation, repository source, or observed operation. Mark unresolved information with an appropriate Markdown TODO instead of presenting an assumption as fact. This keeps the manual trustworthy.

### Apply application layers only where they exist

This repository is a static website and does not currently contain controllers, services, repositories, or models. If application code is introduced or maintained elsewhere, preserve the five-layer flow: Controller for request orchestration, Service for use-case decisions, Repository for data access, Model for data contracts and validation, and View for presentation. Keeping those boundaries prevents business logic and data access from leaking into the UI.

## Updating a manual page

1. Read the relevant source under `docs/` and the current rendered page under `pages/`.
2. Follow `docs/guides/markdown-workflow-structure-standard.md` for workflow-document hierarchy.
3. Follow `docs/guides/manual-documentation-standard.md` for evidence, writing, and validation requirements.
4. Update the Markdown source of meaning.
5. Synchronize the matching page-local `assets/js/dataFiller.js` without moving content logic into HTML.
6. Preserve stable section IDs because sidebars, deep links, and global search depend on them.
7. Check the page from the local HTTP server at desktop and mobile widths, including direct hash links.

## Implementation notes

- This is a browser-only static site; there is no package manifest or automated build pipeline in the repository.
- The home page is data-driven through `shared/data/gopick-data.json` and the shared loader/binder modules.
- Most manual pages render their content dynamically from page-local JavaScript.
- `shared/js/headerSearch.js` provides cross-page search and maps results to page or section URLs.
- Relative asset paths depend on serving the repository root without changing its directory layout.

## Contribution rules

Before changing the repository, read `AGENTS.md` and the standards under `docs/guides/`. Keep changes within the requested scope, preserve existing page patterns, and document only behavior supported by repository or observed evidence.
