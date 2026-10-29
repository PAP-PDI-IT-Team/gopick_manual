# UI DNA: Docs Shell

Working reference for the documentation shell used by every inner manual page. The layout follows the shadcn/ui docs pattern:
- a flat page tree on the left;
- the page in the middle, with a title row (Copy page plus previous/next arrows) and a pager at the end;
- a plain "On this page" list on the right.

Inside the page, the content components follow the shadcn docs page at https://ui.shadcn.com/docs/forms/react-hook-form:
- bordered Steps, Callouts, tables, code blocks and screenshot frames;
- inline `code` for UI labels;
- outline previous/next buttons.

The rest of the house rules in [DESIGN.md](DESIGN.md#docs-shell) still hold: no shadows at rest, no gradients, no eyebrows or tracked caps.

## Migration Status

Every page is inspected at 1440, 768 and 390 with `--allow focal-point,few-pictures,no-footage,off-centre,outlined-box,hairline,body-size,mono`. The reasons:
- the title is deliberately smaller than a landing page hero;
- most screenshots are still pending placeholders, and the manual has no footage;
- the right rail is sized by its longest "On this page" label, so short labels leave its far side open;
- the shadcn component style was chosen on purpose: 1px borders and dividers, 15px body text, and monospace inline code for UI labels.

| Page | Page type | Shell | Inspector |
|---|---|---|---|
| Dashboard | Page renderer | Done | 0 FAIL |
| Accounts | Page renderer (flow blocks) | Done | 0 FAIL |
| Candidates | Page renderer | Done | 0 FAIL |
| Assessments | Page renderer | Done | 0 FAIL |
| Meters | Page renderer (flow blocks, matrix) | Done | 0 FAIL (`emoji` allowed: documented ⚠ output) |
| Reports | Block page | Done | 0 FAIL |
| Users | Block page | Done | 0 FAIL, 0 WARN |
| Roles and permissions | Block page with section builders | Done | 0 FAIL |
| Activity log | Block page | Done | 0 FAIL |
| Advisory | Block page | Done | 0 FAIL, 0 WARN |
| Resource center | Block page | Done | 0 FAIL, 0 WARN |
| Meters governance | Block page with block builders | Done | 0 FAIL (`emoji` allowed: documented ⚠ output) |
| Manual guides | Block page | Done | 0 FAIL |
| Page structure v3 | Block page | Done | 0 FAIL |
| Dev rules | Block page | Done | 0 FAIL, 0 WARN |

## Page Anatomy

| Region | Element | Owner |
|---|---|---|
| Header | `header.docs-header` with brand, three links, search trigger | `shared/css/docs-shell.css` |
| Page tree | `aside#docsSidebar` > `#docsNavGroups`, one always-open group per `docsNav` group | `shared/js/ui/docsPageTree.js`, `shared/css/docs-navigation.css` |
| Drawer (below 1024px) | `#docsSidebarToggle`: a round red 56px floating button fixed bottom-right (16px plus the safe-area inset), placed at the end of `<body>`. It shows ≡, or ✕ while the drawer is open. `#docsSidebarBackdrop` sits behind the drawer. The footer gets extra bottom padding so the button never covers links. | `shared/js/ui/docsSidebar.js`, `docs-navigation.css` (`.docs-menu-fab`) |
| Title row | `h1.docs-page-title` and `div.docs-page-tools` | Page HTML, `shared/css/docs-page.css` |
| Copy page | `button#docsCopyPage` | `shared/js/ui/docsCopyPage.js` |
| Title arrows | `nav#docsTitleNav` (previous and next in `docsNav` order) | `docsPageTree.js` |
| Description | `p.docs-page-description` | Page HTML; the Assessments renderer fills it from data |
| On this page | `details#docsPageToc` > `ul#docsTocList`, two levels | `shared/js/ui/docsTocTracker.js` (`DocsTocTracker`), `docs-page.css` |
| Heading anchors | `a.docs-heading-anchor` inside each rendered section heading | `shared/js/ui/docsHeadingAnchors.js` |
| Content | `div.docs-page-body`, capped at `--content-measure` (54rem) and centred | Page renderer or `DocsBlockRenderer` |
| Pager | `nav#docsPager` | `docsPageTree.js` |
| Footer | `footer.docs-footer` inside the content column | `docs-shell.css` |
| Shell boot | Drawer, Copy page, data load, page tree | `shared/js/ui/docsPageShell.js` |
| Entrance motion | Staggered reveal of section parts | `shared/js/ui/docsReveal.js` |

The grid lives on `.docs-layout.docs-layout--page`. `main.docs-page-main` uses `display: contents`, so the header, the TOC disclosure and the body take named grid areas:
- Below 1024px: one column. Header, then the closed "On this page" disclosure, then the body.
- At 1024px and wider: the page tree on the left.
- At 1280px and wider: the disclosure becomes the sticky right rail and stays open. Its column is sized by its longest label, between 180px and 260px.

## Page Types

| Type | Pages | How it renders |
|---|---|---|
| Page renderer | Dashboard, Accounts, Candidates, Assessments, Meters | A page-local `contentRenderer.js` and `behavior.js`, using the shared shell and blocks. |
| Block page | Reports, Users, Roles and permissions, Activity log, Advisory, Resource center, Meters governance, Manual guides, Page structure v3, Dev rules | `dataFiller.js` holds only content. `behavior.js` calls `sharedDocsBlockPage.start({ contentKey })`. |

A block page may add page-specific blocks without its own renderer:
- `blockBuilders`: keyed by a data key. Meters governance uses this for `matrix` and `hierarchyLevels`, in `assets/js/governanceBlocks.js`.
- `sectionBuilders`: keyed by a section `id`. Roles and permissions uses this for the legend, RBAC matrix, hierarchy tree and role capabilities, in `assets/js/rbacBlocks.js`.

## Body Contract

```html
<body class="docs-shell"
      data-image-card-variant="docs"
      data-data-url="../../../shared/data/gopick-data.json"
      data-site-root="../../../"
      data-page-url="pages/workflow/<page>/index.html">
```

- `data-page-url` must match a `url` in `docsNav`; `docsPageTree.js` throws otherwise.
- The page must also be listed in `shared/js/headerSearchManifest.js` with its Markdown source. `docsCopyPage.js` throws otherwise.
- `data-image-card-variant="docs"` gives screenshot cards the bordered preview frame and a fixed 2.1:1 media box.

## Content Block Mapping

`DocsBlockRenderer` (`shared/js/ui/docsBlockRenderer.js`) renders each section in the order AGENTS.md sets:
1. title;
2. status;
3. description;
4. access paths;
5. available actions;
6. visible content and inputs;
7. groups, screenshots, code blocks and page blocks;
8. steps;
9. rules;
10. warning;
11. expected result;
12. notes;
13. children.

| Data key | Rendered as | Class |
|---|---|---|
| `description` | Lead paragraph | `.docs-block__lead` |
| `status` | Outline label | `.docs-block__status` |
| `accessPaths` (one list of labels per path) | "Find it in" line: each UI label is inline code, with `›` separators | `.docs-access-paths`, `.docs-access`, `.docs-inline-code` |
| `links` | "Available actions" list of links | `.docs-group`, `.flat-list`, `.flat-link` |
| `items` | "Visible content" list | `.docs-group`, `.flat-list` |
| `bullets` | Plain list | `.flat-list` |
| `requiredInputs` … `lockedInputs` | One "Inputs" table per section: Input, Type. Rows keep the data order; the Type label keeps each classification (required adds a red `*`) | `.docs-input-table`, `.docs-input-type--<kind>` |
| `groups` | Titled list. When the title names an input kind ("Required inputs", "Required selection"), it becomes an input table. Optional group rules follow. | `.docs-groups`, `.docs-group` |
| `images` | Bordered preview frame: title bar, image centred on a muted ground, caption bar | `GoPickImageRenderer`, `docs` variant |
| `codeBlocks` | Bordered light code figure with a filename bar | `.docs-code` |
| `steps` | "How to use" Steps: a vertical line with red numbered circles | `.docs-steps` |
| `rules` | Bordered callout with a shield icon | `.flat-callout--rules` |
| `warning` | Bordered callout with a red warning icon | `.flat-callout--warning` |
| `expectedResults` | Bordered callout with a check icon | `.flat-callout--result` |
| `notes` | Bordered callout with an info icon | `.flat-callout--notes` |
| Page `tldr`, `rules`, `notes` | Callouts above the first section | Same callout classes |

List items may be strings or `{ label, href }` link objects. Detail-block labels ("How to use", "Rules") are paragraphs, not headings, so they never reach the TOC.

`shared/js/ui/docsComponents.js` (`sharedDocsComponents`) owns the shared DOM for these blocks: `createCallout`, `createSteps`, `createAccessPath`, `createInlineCode`, `createInputTable`, `isInputGroupTitle` and `createIcon`. `docsBlockRenderer.js`, the Dashboard, Candidates and Assessments renderers, the Accounts and Meters flow builders, and the pager all call it. `shared/css/docs-components.css` styles them.

Flow pages (Accounts, Meters) keep their flow blocks, restyled to match:
- the journey uses the same Steps look (`shared/css/docs-flow-journey.css`, shared by both pages);
- wizard steps get red ring markers;
- rules and results are bordered callouts;
- input groups become input tables, and the other chip groups get outlines;
- the notes popover is a white bordered popover.

## Tokens

Shared tokens are defined on `.docs-shell` in `shared/css/docs-shell.css`:
- `--ground`, `--tone-1`, `--tone-2`, `--ink`, `--ink-soft`, `--ink-field`, `--accent`, `--accent-press`;
- `--border` (`#e4e4e7`), `--muted` (`#f4f4f5`), `--code-font`;
- `--radius` (6px, controls) and `--radius-lg` (10px, cards and frames);
- the type steps.

The page scale on `.docs-layout--page`:
- body 15px with line height 1.7, lead 17px;
- H2 24px, H3 20px, H4 18px;
- sections 48px apart (56px from 768px);
- `--content-measure` 50rem;
- `--control-size` 44px, or 36px from 1024px.

Red (`--accent`) marks:
- the active sidebar page and the active "On this page" link;
- step numbers;
- inline links;
- the required `*`;
- the warning icon.

Use tokens only. Do not reintroduce slate hex values, Tailwind border or shadow utilities, or `text-xs uppercase tracking-*` labels in renderers.

## Behavior Contract

- **Section tracker:** `new DocsTocTracker(store)` renders the first two levels of `store.getSections()`.
  - A deeper section activates its nearest listed parent.
  - It sets `aria-current="location"` and dispatches `docsectionchange` (`detail.sectionId`).
- **Deep links:** `scrollToHash()` aligns the target below the header after fonts and images load, then moves focus to it without scrolling.
- **Reveal:** `sharedDocsReveal.init(selector)` staggers each section's parts. It is skipped for reduced motion and when the URL hash targets a content section.
- **Search:** `[data-search-trigger]` or Cmd/Ctrl+K (`shared/js/headerSearch.js`, manifest in `headerSearchManifest.js`).
- **Copy page:** fetches every Markdown source listed for the page and writes them to the clipboard.

## Adding a Page

1. Write the Markdown source under `docs/`, then the page data in `pages/<category>/<section>/assets/js/dataFiller.js`, following the mapping above.
2. Add the page to `docsNav` in `shared/data/gopick-data.json` and to `shared/js/headerSearchManifest.js`.
3. Copy the `index.html` of an existing block page. Change the title, `h1` id, description and `data-page-url`, and set the page's `contentKey` in `assets/js/behavior.js`.
4. Add page CSS or builders only for blocks the shared renderer does not own.
5. Gate:
   - run `lint.mjs` on the changed files;
   - run `inspect.mjs` at 1440, 768 and 390 to 0 FAIL, and read every screenshot.
6. Interaction checks:
   - a direct hash lands below the header, activates the TOC and focuses the target;
   - Copy page copies the Markdown source;
   - the drawer, the disclosure and Ctrl+K work by keyboard;
   - no console errors;
   - no horizontal page scroll at 390 and 768.
7. Update the status table above and the `Docs Shell` section of `DESIGN.md`.
