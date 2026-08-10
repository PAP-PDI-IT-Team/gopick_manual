# Markdown Workflow Structure Standard

Version: 1.0

This standard defines how GoPick workflow Markdown files must be created when the documented page has layered UI ownership, repeated actions, shared pages, and reusable navigation references.

## Purpose

- Keep workflow Markdown aligned with the real website hierarchy.
- Make each layer's ownership clear.
- Prevent repeated instructions from drifting across multiple places.
- Keep reusable behavior documented once and linked everywhere else.
- Separate content ownership, navigation, usage, rules, results, and notes.

## Core Model

Workflow documentation is built from two parts:

- UI ownership headings.
- Documentation detail blocks.

UI ownership headings describe the actual website layer.

Documentation detail blocks describe the nearest UI ownership heading above them.

## UI Ownership Headings

Use headings for actual website ownership only.

```md
# Module / Feature Page

## Page / Main Navigation Item

### Section / Tab / Category

#### Nested Feature / UI Item

##### Deep Nested Feature / UI Item
```

Rules:
- `#` is the document or module title.
- `##` to `#####` can represent any confirmed website layer.
- Heading depth must follow the real UI hierarchy.
- Heading names must use actual page, section, tab, category, feature, action group, or UI item names when available.
- Do not force all documented workflows into one heading level.
- Do not use generic names when the UI gives a clearer owner.

## Documentation Detail Blocks

Any UI ownership heading can have documentation detail blocks.

The detail blocks are:

- `Purpose / Scope`
- `Access Path`
- `How To Use`

Rules:
- Detail blocks must be one heading level deeper than the UI heading they describe.
- `Purpose / Scope`, `Access Path`, and `How To Use` must be siblings at the same heading level.
- Detail blocks belong to the nearest UI ownership heading above them.
- Detail blocks are not website hierarchy.
- A UI layer can have only the detail blocks that are useful for that layer.
- When a UI owner has child workflow sections, write its access, usage, rules, expected result, and notes before the child sections.
- Do not leave parent usage metadata after the child sections.

Example for a `##` owner:

```md
## View Accounts

### Purpose / Scope

### Access Path

### How To Use
```

Example for a `####` owner:

```md
#### View Active Account

##### Purpose / Scope

##### Access Path

##### How To Use
```

## Purpose / Scope

Defines what the current documented layer owns.

Can include:
- visible content
- use case boundary
- ownership boundary
- related shared pages
- related shared actions
- what this layer is responsible for

Must not include:
- step-by-step navigation
- procedural usage steps
- unconfirmed system behavior
- backend implementation details

## Access Path

Defines where the user goes to reach the current layer.

Format:

```md
### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View`
```

Rules:
- Use actual UI labels.
- Wrap UI labels in backticks.
- Use `>` between navigation levels.
- Include all confirmed access paths when more than one exists.
- Do not include unconfirmed paths.

## How To Use

Defines the user actions after reaching the layer.

Format:

```md
### How To Use

1. Open the table.
2. Select the row action.
3. Save changes.
```

Rules:
- Use numbered steps.
- Keep steps in actual user order.
- Include only visible user actions.
- Do not include backend behavior.
- Do not repeat steps owned by another section. Link to the owner instead.

## Quoted Metadata

Use blockquotes for supporting metadata.

```md
> Rules:
> - Confirmed validation, restriction, or visibility rule.

> Expected Result:
> - Confirmed visible result.

> Notes:
> - Optional audience-specific note.
```

Rules:
- `Rules`, `Expected Result`, and `Notes` must not use heading markers.
- Metadata attaches to the nearest documented layer above it.
- `Rules` must contain confirmed restrictions, validations, or visibility rules only.
- `Expected Result` must describe confirmed visible outcomes only.
- `Notes` must be optional context, usually for QA, Dev, or System User.

## Input Classification

When a workflow section contains form inputs, document input requirements before the `Rules` block.

Use these headings:

```md
#### Required Inputs

#### Optional Inputs

#### Conditional Inputs
```

Rules:
- Required inputs are inputs explicitly marked or confirmed as required.
- Optional inputs are inputs not indicated as required.
- Conditional inputs are inputs that appear, unlock, or become relevant only when their condition is met.
- If an input is not indicated as required, document it as optional.
- Do not infer that an input is required only because it appears on a form.
- Do not mix required, optional, and conditional inputs in one flat visible-content list.
- Defaulted inputs can be documented under `Defaulted Inputs` when the default value is part of the confirmed UI behavior.
- Locked or read-only inputs can be documented under `Locked Inputs` when they appear on the form but cannot be changed.

## Links And References

Use Markdown links for repeated pages, repeated actions, and renavigation.

Same file:

```md
- [Search](#search)
- [Advanced Search](#advanced-search)
- [Update Specific](#update-specific)
```

Other workflow file:

```md
- [View Meter Logs](meters-management.md#meter-records)
```

Rules:
- Define repeated behavior once.
- Link to the owned section everywhere else.
- Same-file Markdown links must be converted into website section links so users can move up or down to the owning section.
- The link target owns the full detail block set.
- The referencing section should explain only why that link is relevant locally.
- Do not copy the same instructions into every place that can reach the same behavior.

## Redundancy Rule

If one edit should affect all instances, the content must have one owner.

Use this pattern:

```md
### Available Actions

- [Search](#search)
- [Advanced Search](#advanced-search)
```

Then define the reusable behavior once:

```md
## Shared Table Actions

### Search

#### Purpose / Scope

Searches account table content.

#### Access Path

- `Accounts` > `View Accounts` > `Search Input`
- `Accounts` > `View Accounts` > `View Archived Accounts` > `Search Input`

#### How To Use

1. Open an account listing table.
2. Enter search text.
3. Press `Enter`.

> Expected Result:
> - Matching accounts are shown in the table.
```

## Creation Checklist

Before creating or accepting a workflow Markdown file, confirm:

- The heading levels mirror real UI hierarchy.
- Each heading has a clear owner.
- `Purpose / Scope`, `Access Path`, and `How To Use` are siblings when used together.
- Parent access, usage, rules, expected result, and notes appear before child workflow sections.
- `Rules`, `Expected Result`, and `Notes` use blockquotes.
- Repeated behavior is documented once.
- Repeated references use Markdown links.
- Cross-file links point to the owning workflow file and anchor.
- No unconfirmed behavior was added.
- No generic section name hides a clearer UI owner.

## Website Conversion Standard

Markdown is the source content. The website page must render the same ownership hierarchy and detail blocks uniformly.

Current website pages use page-specific `assets/js/dataFiller.js` files, not direct Markdown parsing. When converting Markdown to website data, preserve the same content ownership instead of flattening it into unrelated cards.

### Conversion Ownership

Each UI ownership heading becomes one website section node.

Markdown:

```md
## View Accounts

### View Archived Accounts
```

Website data:

```js
{
    id: 'view-accounts',
    title: 'View Accounts',
    children: [
        {
            id: 'view-archived-accounts',
            title: 'View Archived Accounts'
        }
    ]
}
```

Rules:
- Keep the same parent-child relationship from Markdown.
- Keep anchor IDs stable and predictable.
- Use kebab-case IDs from the heading text.
- Do not duplicate the same owned section in multiple data branches.
- Do not move a child section under a different parent for visual convenience.

### Detail Block Mapping

Convert Markdown detail blocks into predictable data keys.

```text
Purpose / Scope -> description
Access Path -> accessPaths
How To Use -> steps
Rules -> rules
Expected Result -> expectedResults
Notes -> notes
Available Actions -> links
Visible Content -> items
Required Inputs -> requiredInputs
Optional Inputs -> optionalInputs
Conditional Inputs -> conditionalInputs
Defaulted Inputs -> defaultedInputs
Locked Inputs -> lockedInputs
Legends -> legend
```

Use plural array keys when the block can contain multiple rows.

Example:

```js
{
    id: 'view-active-account',
    title: 'View Active Account',
    description: 'Opens account detail for an active, non-archived account.',
    accessPaths: [
        ['Accounts', 'View Accounts', 'Row Actions', 'View']
    ],
    steps: [
        'Open View Accounts.',
        'Select View on a non-archived account row.'
    ],
    expectedResults: [
        'The active account detail page opens.'
    ]
}
```

### Uniform Website Layout

Render every workflow page with the same layout regions:

```text
Page Hero
Sidebar Navigation
Main Reading Surface
Section Blocks
Detail Blocks
Quoted Metadata Blocks
```

Rules:
- The hero renders the `#` title and module description.
- The sidebar renders only UI ownership headings, not detail blocks.
- The main reading surface renders the full hierarchy.
- Top-level sections use clear section spacing.
- Nested sections use smaller headings and a subtle divider.
- Do not render detail blocks as sidebar entries.

### Uniform Section Rendering

Each section should render in this order when the data exists:

```text
Title
Purpose / Scope
Access Path
Available Actions / References
Visible Content
How To Use
Rules
Expected Result
Notes
Children
```

Rules:
- Omit empty blocks.
- Keep the order consistent across all pages.
- Access, usage, rules, expected result, and notes must render before child or sub-section cards.
- If an existing page groups these parent blocks as `Access, Usage, and Notes`, that group must appear first inside the section before any sub-section cards.
- Required, optional, conditional, defaulted, and locked inputs must render before the rules callout for their owning section.
- Do not create alternate rendering orders per module.
- Do not mix child sections into the parent description.

### Uniform Detail Block Styling

Render detail blocks consistently:

```text
Purpose / Scope: plain paragraph below the title.
Access Path: compact ordered path chips or one line per path.
Available Actions / References: linked list.
Visible Content: bullet list.
How To Use: numbered steps.
Rules: amber callout.
Expected Result: slate or green success callout.
Notes: neutral slate callout with audience label when provided.
```

Rules:
- Links must stay clickable.
- Same-page links must navigate to the matching rendered website section, whether the target is above or below the current section.
- Cross-file references must open the linked page or Markdown target.
- UI labels from access paths should remain visually distinct.
- Rules, expected results, and notes must not look like normal body text.

### DRY Rendering Rule

Repeated behavior must render as links to the owning section.

Do this:

```js
links: [
    { label: 'Search', href: '#search' },
    { label: 'Advanced Search', href: '#advanced-search' }
]
```

Do not copy the `Search` steps into every table section.

The website should make shared ownership visible by showing links such as:

```text
Available Actions
- Search
- Advanced Search
```

Then the shared section owns the full instructions.

Same-file Markdown links such as `[View Candidate](#view-candidate)` must be represented in website data as link objects, not plain text:

```js
links: [
    { label: 'View Candidate', href: '#view-candidate' }
]
```

The rendered page must use those objects as anchors so the user can jump to the referenced section in either direction.

### Website Conversion Checklist

Before accepting a Markdown-to-website conversion, confirm:

- The page title and description match the Markdown source.
- Sidebar entries match UI ownership headings only.
- Detail blocks are not shown as sidebar hierarchy.
- Parent-child section ownership matches the Markdown.
- Parent `Access, Usage, and Notes` content renders before child/sub-section content.
- Reused behavior is linked, not duplicated.
- Form inputs are classified as required, optional, conditional, defaulted, or locked before rendering rules.
- Access paths render uniformly.
- How-to-use steps render as ordered steps.
- Rules, expected results, and notes render as callouts.
- Internal same-page links move to the matching rendered section above or below the current section.
- Cross-file links remain clickable.
- One content edit has one owning source location.
