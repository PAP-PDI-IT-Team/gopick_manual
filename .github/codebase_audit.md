# GoPick Manual - Codebase Structure & Practices

## Project Overview

A **static, zero-build documentation site** (HTML + Vanilla CSS + Vanilla JS) for the GoPick Assessment Center. No bundler, no framework. It lives as files on disk and is served directly in a browser via `file://` or a local static server.

---

## Directory Structure

```
gopick_manual/
├── index.html                   # Landing/home page (root)
├── favicon.ico
├── DESIGN.md                    # Design system specification (YAML frontmatter + prose)
│
├── assets/                      # Root-page-only assets
│   ├── css/style.css            # Minimal base overrides for root page
│   └── js/
│       ├── behavior.js          # LEGACY behavior script (root-page era, not used by inner pages)
│       └── dataFiller.js        # LEGACY data layer (root-page era, inline data, not used by inner pages)
│
├── shared/                      # Shared assets used across ALL pages
│   ├── css/site-shell.css       # Global shell styles: gradients, header, hero, sidebar, footer surfaces
│   ├── js/
│   │   ├── main.js              # Boot orchestrator for the home page
│   │   ├── dataLoader.js        # Fetches shared/data/gopick-data.json, exposes sharedDataLoader
│   │   ├── contentBinder.js     # Renders home-page sections from JSON, exposes sharedContentBinder
│   │   ├── headerSearch.js      # Global search panel (injected into every header), exposes sharedHeaderSearch
│   │   ├── manualNav.js         # Inner-page sidebar nav (mobile drawer + desktop sticky), no global export needed
│   │   ├── debug-overflow.js    # Dev utility
│   │   └── ui/
│   │       ├── nav.js           # Home-page mobile hamburger nav, exposes sharedNav
│   │       ├── reveal.js        # Scroll-reveal & intro animations, exposes sharedReveal
│   │       └── hero.js          # Hero animation, exposes sharedHero
│   ├── data/
│   │   └── gopick-data.json     # All dynamic content for the home page (hero, features, roles, modules, etc.)
│   └── img/
│       └── gopick-logo.svg      # Shared logo
│
├── pages/                       # One sub-folder per manual section
│   ├── accounts-management/
│   │   ├── index.html
│   │   └── assets/
│   │       ├── css/
│   │       │   ├── style.css      # Page-level base overrides
│   │       │   ├── layout.css     # Page-specific layout
│   │       │   ├── table.css      # RBAC table styles
│   │       │   └── components.css # Page-level component styles
│   │       └── js/
│   │           ├── dataFiller.js  # Page-specific data (RBAC rows, hierarchy, steps) → DOM injection
│   │           ├── behavior.js    # Page-specific UI behavior (table build, role cards, sidebar)
│   │           └── rbac-enhance.js# Extra RBAC table enhancements
│   ├── assessment-management/
│   ├── candidate-management/
│   ├── meters-management/
│   ├── reports-management/
│   ├── roles-premission-management/
│   ├── users-management/
│   ├── guides/
│   └── dev-rules/
│
└── docs/                        # Markdown source of truth for every section
    ├── about-gopick.md
    ├── account-management.md
    ├── assessment-management.md
    ├── candidate-management.md
    ├── meters-management.md
    ├── reports-management.md
    ├── roles-permission-management.md
    ├── users-management.md
    ├── dev-rules.md
    └── guides/
        ├── manual-authoring-guide.md
        ├── manual-documentation-standard.md
        └── manual-nontech-template.md
```

---

## Architecture Pattern

### Two-Layer JS Separation (per page)

Every inner page (`pages/<section>/`) follows the same 2-file JS split:

| File | Role |
|---|---|
| `assets/js/dataFiller.js` | **Data layer** - holds all page-specific content (RBAC rows, steps, hierarchy text, etc.) as JS objects. Injects into DOM by element ID. Exposes a page-namespaced global (e.g. `accountsDataFiller`). |
| `assets/js/behavior.js` | **Behavior/UI layer** - builds interactive elements (tables, sidebar links, role cards). Reads from the data layer or from its own constants. Exposes a page-namespaced global (e.g. `accountsBehavior`). |

Shared scripts from `shared/js/` are then layered on top:
- `headerSearch.js` - global search (auto-injects into `<header>`)
- `manualNav.js` - sidebar mobile drawer

### Home Page Boot Sequence

```
main.js → sharedDataLoader.init() → fetch gopick-data.json
        → sharedContentBinder.init(data) → renders all sections
        → sharedNav.init()
        → sharedReveal.init()
        → sharedHero.init()
```

`headerSearch.js` and `manualNav.js` self-initialize via `DOMContentLoaded`.

---

## CSS Strategy

### Layered CSS (3 tiers)

| Layer | File | Scope |
|---|---|---|
| 1. Shell | `shared/css/site-shell.css` | Global gradients, header/sidebar/footer surface styles, `.manual-page-hero`, `.manual-reading-surface`, `.manual-sidebar-panel` |
| 2. Root page | `assets/css/style.css` | Home-page-specific overrides: nav overlay, feature grids, role badges, reveal animations |
| 3. Inner page | `pages/<section>/assets/css/*.css` | Page-specific layout, tables, components |

**Tailwind CDN** is loaded on every page for utility classes. Custom CSS only covers what Tailwind can't do cleanly (complex surfaces, gradients, named component classes, RBAC table colors).

### CSS Naming Convention
- **BEM-style blocks** for multi-element components: `.site-nav__list`, `.site-nav__backdrop`, `.manual-page-hero__eyebrow`
- **Modifier via semantic name**: `.feature-icon--users`, `.role-badge--administrator`
- **Functional class names**: `.rbac-x`, `.rbac-c`, `.rbac-n`, `.rbac-dash`
- **Shell utility classes**: `.manual-page`, `.manual-header`, `.manual-main`, `.manual-footer`, `.manual-sidebar-panel`, `.manual-reading-surface`

---

## Design System (DESIGN.md)

DESIGN.md is the **single source of truth** for all visual decisions. It uses a YAML frontmatter block + prose explanation. Key values:

| Token | Value |
|---|---|
| Primary (brand red) | `#e50914` |
| Primary hover | `#b3060f` |
| Font | Inter (Google Fonts fallback stack) |
| Radius range | 0px → 9999px (most cards = 8–12px) |
| Header height | 64px |
| Content max-width | 1152px (wide: 1280px) |
| Docs grid | 5 cols (sidebar=1, content=4) |

**Color use rules:**
- One red focal point per screen
- White + slate = primary surface palette
- Accent colors (indigo, emerald, cyan, amber, violet) only for icons and badges - never as alternate CTAs
- Dark surfaces only in footer and "access" hero sections

---

## HTML Conventions

### Every page shares this shell:
```html
<body class="manual-page bg-slate-50 text-slate-800 antialiased">
  <header class="manual-header fixed top-0 inset-x-0 z-[100] ...">
    <!-- Logo → GoPick home, slim breadcrumb nav -->
  </header>
  <main class="manual-main pt-20 pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- .manual-page-hero  (eyebrow + h1 + subtitle) -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <aside class="hidden lg:block lg:col-span-1">
          <nav class="manual-sidebar-panel sticky top-24 p-5">
            <ul id="docSidebarList"></ul>   <!-- populated by manualNav.js or dataFiller.js -->
          </nav>
        </aside>
        <div class="lg:col-span-4 space-y-8">
          <!-- sections as white cards: bg-white rounded-xl border border-slate-100 p-6 shadow-sm -->
        </div>
      </div>
    </div>
  </main>
  <footer class="manual-footer py-6"> ... </footer>

  <!-- Scripts at bottom, always defer -->
  <script src="assets/js/dataFiller.js" defer></script>
  <script src="assets/js/behavior.js" defer></script>
  <script src="../../shared/js/headerSearch.js" defer></script>
  <script src="../../shared/js/manualNav.js" defer></script>
</body>
```

### Section card pattern:
```html
<section id="section-slug" class="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
  <h2 class="text-xl font-bold text-slate-900 mb-4">Section Title</h2>
  <div id="targetForDataFiller"></div>
</section>
```

---

## JS Conventions

### Module pattern: IIFE + `window` global export
All JS files use the same wrapper:
```js
(function (global) {
    'use strict';
    // ... private functions ...
    global.pageNamespace = { init: init };
})(window);
```

### Naming rules
- **Global namespace**: prefixed by scope - `sharedDataLoader`, `sharedContentBinder`, `sharedNav`, `accountsBehavior`, `accountsDataFiller`
- **Functions**: verb-first, intention-revealing - `fillHeroSection`, `populateRbacTable`, `generateRoleCapabilities`, `closeMobileNav`
- **Constants**: `SNAKE_UPPER_CASE` - `RBAC_DATA`, `ROLE_NAMES`, `SEARCH_PHRASE_MIN_LENGTH`
- **Variables**: camelCase - `tableBody`, `rowData`, `permValue`
- **No abbreviations** (per dev-rules)

### DOM manipulation pattern
- Build elements via `document.createElement` + `className` assignment
- Set text via `.textContent` (not `.innerHTML`) unless HTML is necessary and safe
- Inject HTML strings only for SVGs and complex templated markup
- Always guard with null checks: `if (!node) return;`

### Self-initialization pattern
Scripts that don't need to wait for data self-init:
```js
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

---

## Search System

`headerSearch.js` is a **fully self-contained full-text search engine**:
1. Maintains a `docsManifest` - list of all `{pageTitle, pageUrl, docUrl}` entries
2. On panel open: fetches each `.md` file from `docs/`, parses headings + body into sections
3. Scores results: section title match (+6) > page title match (+4) > body match (+2) > starts-with (+1)
4. Renders top-12 matches as cards with `pageTitle`, `sectionTitle`, and 180-char preview
5. Auto-injects the search button and panel into any `<header>` it finds
6. Keyboard shortcut: `/` opens search, `Escape` closes

**Key implication**: `docs/*.md` files are the search source of truth. Content must be kept in sync with them.

---

## Versioning Convention

Cache-busting via query strings on CSS/JS links:
```html
<link rel="stylesheet" href="shared/css/site-shell.css?v=20260429-gradient">
<script src="shared/js/dataLoader.js?v=20260416-meters" defer></script>
```

Format: `?v=YYYYMMDD-description`

---

## Dev Rules Summary (from `docs/dev-rules.md`)

These apply to the **backend PHP app** (Yii2), not the manual site itself, but they reflect the team's standards:

- **5-Layer architecture**: Controller → Service → Repository → Model → View
- **SRP + SoC**: one class = one responsibility, one service = one use-case
- **No logic in View**, no SQL in Controller
- **Naming**: explicit, intention-revealing, no abbreviations, no generics
- **No magic values**: use named constants
- **PHPStan** must pass before staging
- **Tests required** for new/modified logic (unit + integration)

---

## Key Alignment Rules for New Work

1. **New inner page** → follow the `pages/<section>/` structure: `index.html` + `assets/{css,js}/`
2. **Data** → put page content in `assets/js/dataFiller.js` as JS constants, inject by element ID
3. **UI behavior** → goes in `assets/js/behavior.js`, IIFE pattern, expose a namespaced global
4. **Shared behavior** → extends `shared/js/` (e.g., new sidebar feature → add to `manualNav.js`)
5. **Styles** → prefer Tailwind utilities in HTML; add CSS only for multi-state components, named variants, or non-utility surfaces
6. **Design tokens** → always cross-reference `DESIGN.md` for colors, spacing, radii, typography
7. **Search** → keep `docs/<section>.md` in sync with what's on the page; search reads from those files
8. **Cache-busting** → bump `?v=YYYYMMDD-slug` on any modified CSS/JS link
9. **No build step** → everything must work with plain `file://` or a static server
10. **Accessibility** → `aria-label`, `aria-expanded`, `role="banner"`, focus management on drawers/modals
