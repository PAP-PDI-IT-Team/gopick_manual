# AGENTS.md instructions

Do not assume scope, confirmations, or intent from context unless explicitly verified in the repository or stated by the user.

Do not agree or affirm correctness without checking the relevant files first.

Keep responses direct, factual, and based on verified repository state.

## Scope

Apply these instructions when changing `index.html`, `DESIGN.md`, `CHANGELOG.md`, or files under `.github/`, `pages/`, `assets/`, `shared/`, or `docs/`.

## Human Priority

- Human intent and decisions take precedence over AI suggestions.
- Follow the process: Plan > Execute > Feedback > Revise.
- Do not make workspace-level architecture or naming changes without explicit user approval.

## Repository Structure and Local Development

- This is a static, zero-build documentation site using HTML, CSS, and browser JavaScript. Do not introduce a framework, bundler, package requirement, or build step without explicit approval.
- The root `index.html` owns the home-page shell. Its page-specific assets live under `assets/`.
- Reusable site-wide styles, scripts, data, and images belong under `shared/`.
- Rendered manual pages live under `pages/<category>/<section>/`. Page-specific HTML, CSS, JavaScript, and content stay within the owning page directory.
- Documentation meaning lives under `docs/` as Markdown. The site does not parse Markdown at runtime, so synchronize each changed Markdown source deliberately with its rendered page content.
- Home-page content belongs in `shared/data/gopick-data.json`; `shared/js/dataLoader.js` loads it and `shared/js/contentBinder.js` renders it.
- `shared/js/headerSearch.js` owns cross-page search and reads its searchable content from the Markdown sources listed in its manifest. Update that manifest when a page enters or leaves the searchable documentation set.
- `shared/js/manualNav.js` owns shared inner-page navigation behavior.
- `DESIGN.md` is the source of truth for visual tokens and design decisions. Cross-reference it before changing colors, spacing, radii, or typography.
- Run the site from the repository root with a static file server, such as `npx http-server -p 82`.
- The documented local administrator entrypoint is `http://localhost:82/app/administrator/`.

## Content and Asset Ownership

- Change the narrowest owner responsible for the requested behavior. Do not copy page-specific changes into root or shared assets.
- Put page content and DOM population in the page-local `assets/js/dataFiller.js` where that established owner exists.
- Put page interaction behavior in page-local JavaScript, normally `assets/js/behavior.js`.
- Put page presentation in page-local CSS. Extend `shared/` only when the behavior or presentation is intentionally used by multiple pages.
- Preserve page URLs, section IDs, sidebar order, search targets, and relative asset paths unless the request explicitly changes those contracts.
- When modifying a versioned CSS or JavaScript asset, update its referencing query string using `?v=YYYYMMDD-description`.

## Markdown-to-Page Translation

Use this process when reading a Markdown source and transforming its meaning into a rendered manual page.

### Read the Markdown as an Ownership Tree

1. Read the entire Markdown file before editing the page. Do not translate isolated paragraphs without their parent and sibling context.
2. Identify the document type before transforming it:
   - `docs/workflow/` describes confirmed user navigation and visible workflows.
   - `docs/domain-governance/` describes confirmed operational rules and system behavior, not UI traversal.
   - A gap-registry document records unresolved or inconsistent behavior and must not be rendered as confirmed workflow behavior.
3. Treat `#` as the page or module title. Treat `##` through `#####` as UI ownership only when they name a confirmed page, section, tab, category, action group, nested feature, or visible UI item.
4. Determine heading ownership from nesting. Every child heading belongs to its nearest shallower UI ownership heading. Do not flatten, reorder, or re-parent sections for visual convenience.
5. Treat `Purpose / Scope`, `Access Path`, and `How To Use` as sibling detail blocks belonging to the nearest UI ownership heading. They describe that owner; they are not child UI sections.
6. Treat quoted `Rules`, `Expected Result`, and `Notes` blocks as metadata for the nearest UI owner. Do not convert them into page sections or sidebar entries.
7. Treat required, optional, conditional, defaulted, and locked inputs as distinct classifications. Do not infer that an input is required merely because it is visible.
8. Resolve Markdown links as ownership references. The link target owns the full explanation; the referring section explains only local relevance.
9. Stop and report missing context when ownership, navigation, behavior, or a link target cannot be verified. Do not invent a hierarchy, access path, result, rule, or page location.

### Transform Markdown into Page Data

- Transform each UI ownership heading into exactly one page section node in the established page-local data structure.
- Preserve the Markdown parent-child hierarchy in the page data `children` relationship or the page's equivalent established structure.
- Generate stable, predictable kebab-case IDs from headings for new sections. Preserve an existing ID when changing it would break navigation, search, or deep links.
- Map Markdown blocks to page data consistently:

| Markdown block | Page data key |
|---|---|
| `Purpose / Scope` | `description` |
| `Access Path` | `accessPaths` |
| `How To Use` | `steps` |
| `Rules` | `rules` |
| `Expected Result` | `expectedResults` |
| `Notes` | `notes` |
| `Available Actions` or references | `links` |
| `Visible Content` | `items` |
| `Required Inputs` | `requiredInputs` |
| `Optional Inputs` | `optionalInputs` |
| `Conditional Inputs` | `conditionalInputs` |
| `Defaulted Inputs` | `defaultedInputs` |
| `Locked Inputs` | `lockedInputs` |
| `Legends` | `legend` |

- Use arrays for blocks that can contain multiple entries. Preserve access paths as ordered UI-label sequences and steps in actual user order.
- Convert same-page Markdown links into clickable link objects targeting the matching rendered section ID. Convert cross-file references into the correct rendered-page or confirmed documentation target.
- Do not duplicate referenced instructions into multiple data branches. One behavior has one owning section and every reuse links to it.
- Put translated content in page-local `assets/js/dataFiller.js` or the page's verified existing content owner. Do not embed the content directly in HTML and do not introduce a second content source.

### Render the Translated Structure

- Render the `#` title and its description in the page hero.
- Render only UI ownership headings in the sidebar. Never add detail blocks or quoted metadata to sidebar navigation.
- Render section content in this order when present: title, purpose or description, access paths, available actions or references, visible content and classified inputs, steps, rules, expected results, notes, then children.
- Omit absent blocks without adding empty labels, placeholder content, inferred defaults, or alternate rendering paths.
- Render access paths as visually distinct ordered UI labels, steps as an ordered list, rules as a warning callout, expected results as a result callout, and notes as a neutral callout.
- Keep links interactive and support navigation to matching sections both above and below the current section.
- Follow the existing page renderer and visual system. Do not create a page-specific rendering order or a new component when the established renderer already owns the same block.

### Verify Translation Parity

- Compare the completed page data against the full Markdown ownership tree, not only the visible browser output.
- Confirm the page title, description, hierarchy, block order, input classifications, link targets, rules, results, and notes preserve the Markdown meaning.
- Confirm parent detail blocks render before child sections and detail blocks do not appear in the sidebar.
- Confirm every same-page and cross-page reference is clickable and reaches its verified owner.
- Confirm repeated behavior has one owner and is linked rather than copied.
- Run the page through the local static server and verify desktop, mobile, direct URL, and direct hash navigation where applicable.

## Coding Principles

- Use clear spacing between functions, classes, and logical sections.
- Use explicit, multi-word, intention-revealing names. Do not use single-letter or overly generic identifiers.
- Follow separation of concerns and give each function a single responsibility.
- Keep JavaScript at one level of abstraction per function or module.
- Keep HTML, CSS, and JavaScript in separate files. Do not add inline `<script>` or `<style>` elements.
- Use focused JavaScript and CSS files. Preserve existing aggregators and load order where applicable.
- Keep CSS modular. Prefer nested CSS when supported by a preprocessor; otherwise use clear section grouping.
- Use explicit JavaScript getters and setters where appropriate.
- Do not introduce implicit global state or hidden side effects.
- Only add `TODO` comments or explicit HTML section/component markers. Do not add other comments.
- Follow the established JavaScript IIFE pattern and expose only an explicitly scoped global namespace when a page or shared module requires one.
- Name global namespaces by scope, functions with intention-revealing verb-first names, variables in `camelCase`, classes in `PascalCase`, and constants in `SNAKE_UPPER_CASE`.
- Build DOM nodes with safe browser APIs and assign plain text with `textContent`. Use HTML strings only when the markup is necessary and the content is explicitly trusted.
- Missing required dependencies or data must produce an explicit error. Do not add silent returns, hidden defaults, compatibility paths, or legacy fallbacks to suppress failures.
- Prefer Tailwind utilities already used by the page. Add custom CSS only for presentation that is not cleanly represented by the existing utilities or shared components.

## Verification Checklist

- Verify changed pages render locally through a static file server.
- Confirm changed shared assets and every applicable page reference remain synchronized.
- Update relevant `docs/*.md` files when behavior changes.
- Ensure images have alternative text and form controls have labels.
- Verify keyboard access, focus behavior, and relevant ARIA state for drawers, dialogs, navigation, and interactive controls.
- Run a quick lint or format pass on changed CSS and JavaScript.
- Do not remove or skip a verification step without discussing it with the user and receiving approval.

## Change Records

- Treat every pull request merged into `main` as a release. This repository does not use an `Unreleased` changelog section.
- One new pull request creates exactly one new semantic version and dated changelog section. Additional changes in the same pull request update that section without creating another version.
- Every notable human or AI-assisted change must appear under that pull request's version and date before merge.
- When the pull request boundary is not reliably detectable, append a verified `PR #number` to the version heading. If no PR number exists, use the first commit SHA that actually belongs to the PR.
- Never use a base commit, unrelated commit, branch name, invented identifier, `pending`, or `TBD` as the PR identifier. Stop and obtain the identifier when it is required but unavailable.
- Crucial architectural, documentation, workflow, governance, or compatibility decisions require a decision record under `docs/adr/` using the `NNN-abc.md` convention.
- Keep the active changelog at the repository root. Use `docs/old-version/` only when deliberately archiving old changelog versions.

## Branch, Commit, and Review Rules

- Do not commit contribution work directly to `main`. Use one dedicated `<label>/<intent-summary>` branch per pull request.
- Branch labels are limited to `feat` for new work and `fix` for changes, repairs, corrections, or alterations to existing work.
- Write the branch intent summary in lowercase kebab-case with no more than five hyphen-separated words.
- Commit labels are limited to `feat`, `fix`, or `docs`.
- Use `docs` for any commit that changes a Markdown (`.md`) file, including additions, corrections, and removals.
- Use `feat` for a new non-Markdown capability. Use `fix` for every other non-Markdown change, repair, alteration, refactor, maintenance task, or security correction.
- When one logical commit changes Markdown and non-Markdown files, use `docs`. Split it only when the changes are genuinely independent responsibilities.
- Format commits as `<label>(<optional-scope>): <imperative summary>`. Keep summaries concise, specific, lowercase after the colon, and without a trailing period.
- One branch maps to one pull request and one changelog version. Additional commits in the same pull request do not create another version.
- Every pull request targeting `main` requires approval from at least one reviewer other than the author.
- Do not merge while requested changes or review conversations remain unresolved.
- Do not state that a pull request is ready to merge until the peer approval and applicable verification are confirmed.

## Instruction Maintenance

- Use targeted file globs for project instructions. Do not use `applyTo: "**"`.
- Do not place secrets or long-running scripts in project instructions.
- Check the project README or internal team documentation for the repository owner or maintainer.
