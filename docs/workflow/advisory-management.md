# Advisory Management

The Advisory module lets authorized administrator-portal users create and manage announcements. The interface uses **Announcement** for most page labels while the backend module and record type use **Advisory**.

## About the Advisory Module

The Advisory module is GoPick's administrator-portal announcement feature. It is used for operational notices, system or policy updates, maintenance messages, and other information that users need to see inside GoPick.

The visible pages usually use the word **Announcement**. Backend routes, code, the database record, and technical documentation use **Advisory**. Both terms refer to the same feature.

### Where Announcements Appear

| Location | What the user sees | Important condition |
|---|---|---|
| `Advisory` > `Search Announcement` | A searchable list with `My announcements`, `All announcements`, status, dates, and permitted row actions. | Requires `modAdvisory-actionIndex`. |
| `View Advisory` | One announcement's title, posting period, status, and content. | Requires `modAdvisory-actionView` and visibility authorization. |
| Dashboard `Announcements` | Up to two newest active, currently in-date announcements visible to the account hierarchy. | The direct detail link still requires view permission. |
| Global Advisory modal | Active, currently in-date announcements that the user has not acknowledged. | This legacy modal currently does not apply the normal hierarchy filter. |

## How Advisory Access Works

Advisory access has two separate controls:

1. **Permission control:** RBAC permissions decide whether a user may list, view, create, update, or delete announcements.
2. **Visibility control:** Account hierarchy decides which announcement creators are visible to the current user.

Having a particular account type does not automatically grant the Advisory module. A user must have the permission required for the action. Being able to see an announcement also does not automatically allow the user to update or delete it.

> Example:
> - A Client Account user may have permission to open `Search Announcement`, but `All announcements` still includes only creators resolved from that user's account lineage and main super admins.

## Who Can Create Announcements

Creating an announcement requires `modAdvisory-actionCreate`. The following table summarizes the current source evidence; deployed RBAC assignments must still be confirmed in the running environment.

| User/account type | Creation access | What a new user should know |
|---|---|---|
| Super Admin IT (`super_admin`) | Expected through default Super Admin provisioning. | Normally has the configured Advisory actions; deployed RBAC records remain authoritative. |
| Administrator ASD (`super_admin_asd`) | Conditional. | It has global visibility, but default-role provisioning paths are inconsistent; confirm its assigned permissions. |
| Distributor (`distributor`) | Permission required. | No source-confirmed default Distributor provisioning for Advisory was found. |
| Sub-distributor (`sub_distributor`) | Permission required. | No source-confirmed default Sub-distributor provisioning for Advisory was found. |
| Client Account (`account`) | Explicit permission required. | Advisory is omitted from the default Account module allow-list. |
| Sub-account (`sub_account`) | Explicit permission required. | Advisory is omitted from the default Sub-account module allow-list. |
| Self-registration (`self_registration`) | Explicit permission required. | Advisory is omitted from the default Self-registration module allow-list. |
| HR Administrator (`hr_account`) | Explicit permission required. | Advisory is omitted from the default HR Account module allow-list, and HR-created visibility has a known creator-mapping gap. |

> Notes:
> - Administrator ASD means `super_admin_asd` and is a main super admin.
> - HR Administrator means `hr_account` and follows the non-super-admin visibility path.
> - See the [Advisory Module Access Matrix](../domain-governance/advisory.md#advisory-module-access-matrix) for detailed source evidence.

## Who Can See Announcements

The normal Advisory list, detail page, and Dashboard resolve visibility from the current account and its stored lineage. In simple terms, an announcement flows downward only to viewers whose account lineage contains the creator's account.

```text
Main Super Admins — global visibility

Distributor
└─ Sub-distributor
   └─ Client Account
      └─ Sub-account

Self-registration may be linked beneath a supported account level.
HR Administrator is an associated administrative user, not a separate hierarchy level.
```

| Announcement creator | Who normally sees it | Who normally does not see it |
|---|---|---|
| Main Super Admin | Every hierarchy-aware viewer with the required permission. | Users missing the required action permission. |
| Distributor | The Distributor and lower accounts whose stored lineage contains that Distributor. | Unrelated Distributor branches. |
| Sub-distributor | The Sub-distributor and lower accounts whose stored lineage contains it. | Its parent Distributor, siblings, and unrelated branches. |
| Client Account | The Client Account and lower accounts whose stored lineage contains it. | Its parents, sibling clients, and unrelated branches. |
| Sub-account | The Sub-account and linked lower accounts whose stored lineage contains it. | Its parents, sibling Sub-accounts, and unrelated branches. |
| Self-registration | Itself when its user ID is resolved from its current account row, plus main super admins. | Parents, siblings, and unrelated branches. |
| HR Administrator | Main super admins; other viewers are conditional on creator-user mapping. | The intended account lineage may fail to resolve the HR creator. |

### Simple Examples

- A Distributor-created announcement can flow to that Distributor's lower account lineage, but not to another Distributor branch.
- A Client Account-created announcement can flow to its own lower lineage. Its Distributor parent does not automatically see it.
- A Sub-account-created announcement can flow to itself and a correctly linked lower Self-registration account. Its Client parent and sibling Sub-accounts do not automatically see it.
- Main super admins can see all announcements, subject to the relevant controller permission.

> Rules:
> - Parents do not automatically see announcements created by children.
> - Sibling accounts and unrelated branches do not see one another's announcements.
> - Visibility depends on populated account-lineage fields and the creator being resolved as an account owner user.

> Notes:
> - See the [Advisory Visibility Matrix](../domain-governance/advisory.md#advisory-visibility-matrix) for the detailed implementation mapping and cautions.
> - The global unseen-Advisory modal is a known exception and currently does not apply this hierarchy.

## Announcement Lifecycle at a Glance

1. An authorized user creates an announcement with a title, content, status, posting date, and expiration date.
2. `Active` makes the announcement eligible for delivery; `Not active` prevents Dashboard and global-modal delivery.
3. The current date must be on or between the posting and expiration dates. Both boundary dates are included.
4. The management list can still contain inactive, future, current, and expired records.
5. The Dashboard shows at most the two newest active, currently in-date announcements visible under its hierarchy rules.
6. The creator or a main super admin with the required permission can update or permanently delete the announcement.

> Warning:
> - The global unseen-Advisory modal currently queries all active, in-date announcements without applying the normal Advisory hierarchy filter. Treat its audience as a known implementation gap.

## Create Announcement

Creates an announcement with a title, rich-text content, status, posting date, and expiration date.

### Access Path

- `Advisory` > `Create Announcement`

### How To Use

1. Open `Advisory`.
2. Select `Create Announcement`.
3. Enter the title and content.
4. Select the status.
5. Select `Date Start` and `Date End`.
6. Select `Save`.

### Required Inputs

- `Title`
- `Content`
- `Status`
- `Date Start`
- `Date End`

### Defaulted Inputs

- `Date Start` displays the current date on a new announcement.
- `Date End` displays seven days after the current date on a new announcement.

> Rules:
> - Access requires `modAdvisory-actionCreate`.
> - Status options are `Active` and `Not active`.
> - The current implementation requires all five visible inputs.
> - The date controls prevent choosing dates before their configured start date in the browser, but the module does not currently validate date order on the server.

> Expected Result:
> - The announcement is saved and the browser opens `View Advisory` for the new record.

## Search Announcement

Displays announcements available within the current user's visibility scope.

### Access Path

- `Advisory` > `Search Announcement`
- `Dashboard` > `Announcement` > `View All Announcements`, when that button is available

### Visible Content

- Standard search input.
- Advanced search control.
- `My announcements` and `All announcements` tabs with counts.
- Announcement title, posting date, expiration date, status, and available row actions.
- Status column filter and page navigation.

### How To Use

1. Open `Search Announcement`.
2. Select `My announcements` or `All announcements`.
3. Optionally enter text in the standard search input.
4. Optionally filter the `Status` column.
5. Use the page navigation when the result set spans multiple pages.
6. Select an available row action.

> Rules:
> - Access requires `modAdvisory-actionIndex`.
> - The default tab is `My announcements`.
> - Standard search matches `Title` or `Content`.
> - Status filtering maps `Active` to status `1` and `Not active` to status `0`.
> - Results are ordered by newest record ID first.
> - Row actions are permission-dependent and may not appear for every user or row.

> Expected Result:
> - The table shows announcements matching the selected scope and filters.

### My announcements

Shows records created by the currently authenticated user.

#### Access Path

- `Advisory` > `Search Announcement` > `My announcements`

#### How To Use

1. Select `My announcements`.
2. Review the count and matching table rows.

> Rules:
> - This is the default scope when `created_scope` is absent or unsupported.
> - Other hierarchy-visible announcements are excluded from this tab.

> Expected Result:
> - Only announcements whose `Created By` value is the current user ID are listed.

### All announcements

Shows every announcement visible to the current user under the implemented Advisory hierarchy rules.

#### Access Path

- `Advisory` > `Search Announcement` > `All announcements`

#### How To Use

1. Select `All announcements`.
2. Review the count and matching table rows.

> Rules:
> - Main super admins can list all announcement records.
> - Other users can list announcements created by the owner users of their current account and stored ancestor accounts, plus announcements created by main super admins.
> - This scope is visibility-based; it does not grant update or delete authority over another creator's record.

> Notes:
> - See the [Advisory Visibility Matrix](../domain-governance/advisory.md#advisory-visibility-matrix) for the creator-to-viewer account mapping.

> Expected Result:
> - The table shows the current user's hierarchy-visible announcements.

### Standard Search

Filters the selected announcement scope by title or content.

#### Access Path

- `Advisory` > `Search Announcement` > `Search`

#### How To Use

1. Enter search text.
2. Submit the search.

> Expected Result:
> - Rows whose title or stored rich-text content matches the entered text remain in the result set.

### Advanced Search

Builds one or more title or content conditions using the advanced query builder.

#### Access Path

- `Advisory` > `Search Announcement` > `Advanced Search`

#### How To Use

1. Open `Advanced Search`.
2. Select `Title` or `Content`.
3. Select an available operator.
4. Enter a value when the operator requires one.
5. Run the search.

#### Available Operators

- `Begins with`
- `Contains`
- `Ends with`
- `Equal`
- `Not equal`
- `Is empty`
- `Is not empty`
- `Is null`
- `Is not null`

> Rules:
> - Advanced conditions use `AND`.
> - Grouped conditions are not enabled.
> - Content matching attempts to ignore stored HTML tags for begins-with, contains, and ends-with operations.

> Expected Result:
> - The table opens with the advanced conditions applied to the selected announcement scope.

## Announcement Row Actions

Row actions open, modify, or remove an announcement when the required permission and ownership rules allow the action.

### View Advisory

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `View Advisory`
- `Dashboard` > `Announcement` > announcement title

#### How To Use

1. Select the view icon or an available announcement title.
2. Review its title, posting and expiration dates, status, and content.
3. Select `Back` to return to the announcement list.

> Rules:
> - Direct access requires `modAdvisory-actionView`.
> - Main super admins can view any announcement.
> - Other users can view only announcements within their hierarchy-visible creator scope.

> Expected Result:
> - `View Advisory` opens for an authorized record; an access error is rendered when authorization fails.

### Update Advisory

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Update Advisory`

#### How To Use

1. Select the update icon.
2. Change the announcement fields.
3. Select `Save`.

> Rules:
> - Access requires `modAdvisory-actionUpdate`.
> - Main super admins can update any announcement.
> - Other users can update only announcements they created.
> - A successful update records the current user and current date/time as modification metadata.

> Expected Result:
> - The announcement is saved, a success message is created, and `View Advisory` opens.

### Delete Advisory

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Delete Advisory`

#### How To Use

1. Select the delete icon.
2. Confirm the prompt, `Are you sure you want to delete this advisory?`

> Rules:
> - Access requires `modAdvisory-actionDelete`.
> - Main super admins can delete any announcement.
> - Other users can delete only announcements they created.
> - The current implementation permanently deletes the record; it does not archive it.

> Expected Result:
> - The record is removed and the browser returns to `Search Announcement`.

## Dashboard Announcement Preview

Displays up to two current announcements on the Dashboard.

### Access Path

- `Dashboard` > `Announcement`

### How To Use

1. Review the displayed announcement titles.
2. Select `Preview` to open the announcement content in a modal.
3. Select an announcement title to open `View Advisory` when permitted.
4. Select `View All Announcements` when available to open active announcements in the Advisory list.

> Rules:
> - Dashboard results include only `Active` announcements whose posting and expiration dates include the current date.
> - The Dashboard shows at most the two newest visible records by record ID.
> - `View All Announcements` appears only when the user has `modAdvisory-actionIndex`.
> - The Dashboard preview is an integration entry point; announcement management remains owned by the Advisory module.

> Expected Result:
> - The selected preview opens without leaving the Dashboard, or the selected title opens the permitted Advisory detail page.

## Authenticated Staging QA Checklist

The following checks require an authenticated staging session and remain runtime verification items until completed.

### How To Use

1. Confirm a user with each Advisory permission can reach its matching page or action.
2. Confirm a user without each permission receives an access error and does not see unauthorized row actions.
3. Create announcements using required-only and fully formatted rich-text content.
4. Confirm the displayed create-date defaults and test invalid or reversed date submissions.
5. Confirm standard search, every advanced-search operator, status filtering, scope tabs, counts, and pagination.
6. Confirm an ordinary creator can update and delete their own announcement but not another creator's announcement.
7. Confirm a main super admin can list, view, update, and delete announcements across account branches.
8. Confirm a hierarchy descendant sees announcements from its stored account lineage and main super admins.
9. Confirm an unrelated account branch cannot list or directly view another branch's announcement.
10. Confirm active-date boundary behavior on the posting date and expiration date.
11. Confirm inactive, future, and expired announcements do not appear in the Dashboard announcement panel.
12. Confirm the Dashboard displays at most two announcements and that preview and detail navigation work as documented.
13. Confirm acknowledging the global Advisory modal records the user as having seen each displayed announcement and prevents immediate redisplay.

> Notes:
> - Record the tested user type, permissions, current account ID, announcement creator, dates, and observed result for every scenario.
> - Report behavior that differs from this source-verified baseline in the [Advisory Gap Registry](../known-gaps/advisory-gap-registry.md).
