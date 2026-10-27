# UI DNA: Docs Shell

Working reference for moving a manual page onto the Docs Shell. `pages/workflow/accounts-management/` is the pilot and the reference implementation. The layout follows the Fumadocs docs pattern: a page tree on the left, the page in the middle, and its section tree on the right. The look follows the house rules in [DESIGN.md](DESIGN.md#docs-shell): tone steps instead of lines, no shadows at rest, no gradients, no eyebrows or tracked caps.

## Migration Status

| Page | Shell | Content blocks | Inspector |
|---|---|---|---|
| Accounts | Done | Done | 0 FAIL at 1440, 768, 390 |
| Candidates | Pending | Pending | Not run |
| Meters | Pending | Pending | Not run |
| Dashboard | Pending | Pending | Not run |
| Assessments | Pending | Pending | Not run |
| Reports | Pending | Pending | Not run |
| Users | Pending | Pending | Not run |
| Roles and permissions | Pending | Pending | Not run |
| Activity log | Pending | Pending | Not run |
| Advisory | Pending | Pending | Not run |
| Resource center | Pending | Pending | Not run |

## Page Anatomy

| Region | Element | Owner |
|---|---|---|
| Header | `header.docs-header` with brand, three links, search trigger | `shared/css/docs-shell.css` |
| Page tree | `aside#docsSidebar` > `#docsNavGroups`, one `<details>` folder per `docsNav` group | `shared/js/ui/docsPageTree.js`, `shared/css/docs-page.css` |
| Drawer (below 1024px) | `#docsSidebarToggle`, `#docsSidebarBackdrop` | `shared/js/ui/docsSidebar.js`, `shared/css/docs-navigation.css` |
| Breadcrumb | `ol#docsBreadcrumb` (group, then page) | `docsPageTree.js` |
| Title and description | `h1` and `p` inside `header.docs-page-header` | Page HTML, filled by the page renderer |
| On this page | `details#docsPageToc` > `ul#docsTocList` | Page tracker (Accounts: `assets/js/sidebarTracker.js`), `docs-page.css` |
| Content | `div.docs-page-body` with the page's `<section id>` blocks | Page renderers and page CSS |
| Pager | `nav#docsPager` (previous and next in `docsNav` order) | `docsPageTree.js` |
| Footer | `footer.docs-footer` inside the content column | `docs-shell.css` |
| Entrance motion | Staggered reveal of section parts | `shared/js/ui/docsReveal.js` |

The grid lives on `.docs-layout.docs-layout--page`. `main.docs-page-main` uses `display: contents`, so the header, the TOC disclosure and the body take named grid areas:

- Below 1024px: one column, in the order header, "On this page" disclosure (closed), body.
- At 1024px and wider: the page tree on the left; header, disclosure and body in the right column.
- At 1280px and wider: the disclosure becomes the sticky right rail and stays open. Its summary is not clickable there.

## Body Contract

Every migrated page sets these on `<body>`:

```html
<body class="docs-shell"
      data-image-card-variant="docs"
      data-data-url="../../../shared/data/gopick-data.json"
      data-site-root="../../../"
      data-page-url="pages/workflow/<page>/index.html">
```

- `data-page-url` must match a `url` in `docsNav` in `shared/data/gopick-data.json`. `docsPageTree.js` throws if it does not.
- `data-image-card-variant="docs"` gives screenshot cards the flat tone frame and a fixed 2.1:1 media box. The fixed box stops lazy images from shifting deep links.

## Content Block Mapping

| Markdown block | Rendered as | Class |
|---|---|---|
| `Purpose / Scope` | Lead paragraph, full ink, 17px | `.flow-overview__lead`, `.flat-card__text` |
| `Access Path` | Inline sequence of UI labels with `›` separators | `.flow-access` |
| `How To Use` | Numbered journey; a filled band marks the wizard part | `.flow-journey` |
| `Required` / `Optional` / `Conditional` / `Defaulted` / `Locked Inputs` | Tone-filled chips under a counted heading | `.flow-inputs__group--<kind>` |
| `Visible Content`, available actions | Tone-filled chips or link chips with an arrow | `.flow-inputs__chip--link` |
| `Rules` | Callout on tone-1 with a 4px rules marker bar | `.flow-rules`, `.flat-callout--rules` |
| `Expected Result` | Callout on tone-1 with a 4px result marker bar | `.flow-outcome`, `.flow-result`, `.flat-callout--result` |
| `Notes` | Dark popover from the round notes button | `.flow-notes__panel` |
| Wizard steps | Vertical steps in an `<ol>`, all visible, dot marker and tone track | `.flow-step-panel`, `.flow-step-panel__item` |
| Screenshots | Flat tone frame, caption below, click to enlarge | Shared image-card `docs` variant, `screenshotViewer.js` |

Input classifications stay distinct without outlines:

- **Required:** a red asterisk.
- **Conditional:** a rules-colored dot.
- **Defaulted, locked and calculated:** a deeper tone (`--tone-2`). Locked text is soft ink.

## Tokens

The shared tokens are defined on `.docs-shell` in `shared/css/docs-shell.css`:
- `--ground`, `--tone-1`, `--tone-2`, `--ink`, `--ink-soft`, `--ink-field`, `--accent`, `--accent-press`, `--radius`;
- five type steps: display, heading, lead, body, small.

Page-level additions (Accounts `assets/css/style.css`): `--rules-mark`, `--result-mark`, `--result-ink`, `--content-gap`.

Use tokens only. Do not reintroduce slate hex values, Tailwind border or shadow utilities, or `text-xs uppercase tracking-*` labels in renderers.

## Behavior Contract

- **Section tracker:** renders the page's section tree into `#docsTocList`.
  - Active link: `aria-current="location"`.
  - It dispatches `docsectionchange` (`detail.sectionId`) on `document` whenever the active section changes.
- **Journey highlight:** journeys listen for `docsectionchange` and set `aria-current="step"` on the matching stop.
- **Scroll offset:** every `[id]` inside `.docs-page-body` gets `scroll-margin-top`, so hash links land below the sticky header.
- **Search:** opens from `[data-search-trigger]` or Cmd/Ctrl+K (`shared/js/headerSearch.js`).

## Migration Checklist

1. Record the before state: `node .claude/skills/taste-skill/scripts/inspect.mjs <page url> --out .taste-skill/<page>-before`.
2. Replace the page `<head>` styles. Load these in this order:
   - `docs-shell.css`, `docs-navigation.css`, `docs-page.css`;
   - the image-card `style.css`;
   - the page CSS.
   Drop `site-shell.css` and page layout or sidebar CSS.
3. Replace the header, sidebar and hero markup with the anatomy above. Keep every section `id`, the content container IDs, and the section order.
4. Set the body contract attributes and confirm the page is listed in `docsNav`.
5. Point the page tracker at `#docsTocList` and `#docsPageToc`, use `aria-current="location"`, and dispatch `docsectionchange`.
6. Boot the shell from the page app: `sharedDocsSidebar.init()`, then `sharedDataLoader.init()` and `sharedDocsPageTree.init(data)`, then `sharedDocsReveal.init(<section selector>)`.
7. Replace Tailwind presentation classes in renderers with BEM classes, and restyle the page CSS to tokens.
8. Remove `manualNav.js` and any carousel-only scripts once nothing calls them.
9. Gate:
   - run `lint.mjs` on the changed files;
   - run `inspect.mjs` to 0 FAIL at 1440, 768 and 390, and read every screenshot.
10. Interaction checks:
    - direct hashes land below the header and activate the right TOC entry;
    - the folders toggle by keyboard;
    - the drawer and the disclosure work and Esc closes them;
    - the screenshot viewer works;
    - Ctrl+K search works;
    - no console errors;
    - no horizontal scroll at 390 and 768.
11. Update this table and the `Docs Shell` section of `DESIGN.md`.
