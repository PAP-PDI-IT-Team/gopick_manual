# Advisory Domain Governance

## Overview

`modAdvisory` stores and manages administrator-portal announcements. User-facing pages generally call the records **Announcements**; PHP namespaces, routes, models, and the database table call them **Advisories**.

This document records the checked-out implementation. It does not define the desired overhaul architecture.

## Data Contract

The ActiveRecord model maps to `advisory_log`.

| Field | Implemented purpose |
|---|---|
| `id` | Unsigned integer primary key. |
| `title` | Required announcement title. |
| `content` | Required rich-text content. |
| `is_displayed` | Required status: `1` is `Active`; `0` is `Not active`. |
| `extras` | Text containing seen-state JSON; create initializes it as `{"seen":[]}`. |
| `created_by` | User ID assigned from the authenticated identity during create. |
| `created_date` | Server date/time assigned during create. |
| `modified_by` | User ID assigned during update. |
| `modified_date` | Server date/time assigned during update. |
| `display_date_start` | Required posting date. |
| `display_date_end` | Required expiration date. |
| `accounts` | Present in the historical table definition but not represented by the current ActiveRecord model. |

### Validation Contract

- Required: `title`, `content`, `is_displayed`, `display_date_start`, and `display_date_end`.
- Integer: `created_by` and `modified_by`.
- Safe assignment: `created_date` and `modified_date`.
- `extras` must be a string.
- The model does not implement date-format validation or a `display_date_start <= display_date_end` invariant.

## Lifecycle and Active-Date Rules

- Create assigns `created_by`, `created_date`, and `extras`, then persists the submitted required fields.
- Update assigns `modified_by` and `modified_date` before saving submitted fields.
- Delete removes the row; there is no Advisory archive state.
- `is_displayed = 1` is necessary for dashboard and global-modal delivery.
- A delivered announcement must also satisfy `display_date_start <= current date <= display_date_end`; both boundaries are inclusive.
- The management list can display active, inactive, future, current, and expired records because date delivery rules are not applied to the list query.

## RBAC Contract

### Permission and Authorization Matrix

| Permission | Capability | Additional authorization | Current implementation status |
|---|---|---|---|
| `modAdvisory-actionIndex` | Open the announcement list and expose the Dashboard `View All Announcements` link. | Results remain limited by created scope and hierarchy visibility. | Included in the configured Advisory action catalog. |
| `modAdvisory-actionView` | Open `View Advisory`. | Main super admin, or the record creator must be in the viewer's resolved creator list. | Included in the configured Advisory action catalog. |
| `modAdvisory-actionCreate` | Create and save an announcement. | No creator-scope check beyond authenticated permission. | Included in the configured Advisory action catalog. |
| `modAdvisory-actionUpdate` | Update an announcement. | Main super admin, or authenticated user must be the creator. | Included in the configured Advisory action catalog. |
| `modAdvisory-actionDelete` | Permanently delete an announcement. | Main super admin, or authenticated user must be the creator. | Included in the configured Advisory action catalog. |
| `modAdvisory-actionSend` | Enter the send action. | Permission check only before render. | Controller action exists, but the permission is absent from the configured Advisory action catalog, the view is missing, and no UI consumer was confirmed. |

RBAC assignments are database-controlled. Account or user type alone must not be documented as granting these permissions.

### Advisory Module Access Matrix

| User/account type | Hierarchy visibility when authorized | Default-role evidence in source | Module-access conclusion |
|---|---|---|---|
| Super Admin IT (`super_admin`) | Global; hierarchy filtering is bypassed. | The Super Admin default-role builder adds every configured Advisory action. The sidebar also bypasses its menu permission check for this user type. | Expected to have the configured Advisory actions by default; confirm the deployed RBAC records. |
| Administrator ASD (`super_admin_asd`) | Global; hierarchy filtering is bypassed. | Role-building paths are inconsistent: one Super Admin builder can populate all actions for `SUPER_ADMIN_ASD`, while a separate ASD allow-list omits `modAdvisory`. Controller actions still require RBAC permission. | Conditional; confirm the assigned role and deployed permission records. |
| Distributor (`distributor`) | Own account and stored descendant lineages can see its announcement when the distributor account ID is present in their lineage. | No source-confirmed default Distributor role provisioning for `modAdvisory` was found. | Requires explicit/deployed RBAC confirmation. |
| Sub-distributor (`sub_distributor`) | Own account and stored descendant lineages can see its announcement when its account ID is present in their lineage. | No source-confirmed default Sub-distributor role provisioning for `modAdvisory` was found. | Requires explicit/deployed RBAC confirmation. |
| Client Account (`account`) | Own account and stored descendant lineages can see its announcement when its account ID is present in their lineage. | The default Account module allow-list omits `modAdvisory`. | Not granted by that default-role builder; requires an explicitly assigned role/permission. |
| Sub-account (`sub_account`) | Own account and stored descendant lineages can see its announcement when its account ID is present in their lineage. | The default Sub-account module allow-list omits `modAdvisory`. | Not granted by that default-role builder; requires an explicitly assigned role/permission. |
| Self-registration (`self_registration`) | Its own creator can be visible only when its user ID is resolved from the current account lineage; it normally has no lower account descendants. | The default Self-registration module allow-list omits `modAdvisory`. | Not granted by that default-role builder; requires an explicitly assigned role/permission. |
| HR Administrator (`hr_account`) | Uses the non-super-admin creator-resolution path. HR-created records may not map to the account-owner user IDs used for visibility. | The default HR Account module allow-list omits `modAdvisory`. | Not granted by that default-role builder; explicit permission and creator-mapping behavior both require runtime confirmation. |

> Notes:
> - “Has the Advisory module” means the authenticated user has the required `modAdvisory-*` RBAC permissions; it is not guaranteed solely by account type.
> - The sidebar may be displayed through special role logic, but controller permission checks remain authoritative.

## Account Hierarchy Visibility

### Main Super Admin Scope

The configured main super admin user types are:

- `super_admin`
- `super_admin_asd`

For list and detail visibility, these user types bypass hierarchy filtering and may access every Advisory record, subject to the relevant action permission at the controller boundary.

### Non-Super-Admin Scope

For a non-main-super-admin user, `AdvisoryViewPermissionService` loads the current account row identified by `$_SESSION['account_id']` and reads these stored account ID fields:

```text
id
main_account_id
group_account_id
account_id
sub_account_id
```

The service then:

1. Removes empty or non-positive IDs.
2. Deduplicates the resulting account ID list.
3. Resolves the `user_id` owner of every matching account row.
4. Resolves every user whose type is in the main-super-admin list.
5. Merges and deduplicates those user IDs.
6. Treats Advisory records created by those users as visible.

This is a flattened lineage lookup using stored hierarchy columns. It is not recursive tree traversal.

### Advisory Visibility Matrix

| Announcement creator | Expected viewers in `All announcements` | Excluded viewers | Conditions and cautions |
|---|---|---|---|
| Super Admin IT / Administrator ASD | All non-super-admin viewers with valid account context, plus main super admins. | Users without the required list/view RBAC permission. | Main-super-admin user IDs are always added to the resolved creator list. |
| Distributor | The creator's account and lower accounts whose stored lineage contains that Distributor account ID. Main super admins can also view it. | The distributor's parent, unrelated distributors, and other branches. | The creator must be the `accounts.user_id` owner resolved for that Distributor account. |
| Sub-distributor | Its own account and lower accounts whose stored lineage contains that Sub-distributor account ID. Main super admins can also view it. | Its Distributor parent, sibling Sub-distributors, unrelated branches, and other descendants whose lineage does not contain it. | Visibility depends on populated lineage columns in each viewer's current account row. |
| Client Account | Its own account and lower accounts whose stored lineage contains that Client Account ID. Main super admins can also view it. | Its Distributor/Sub-distributor parents, sibling clients, and unrelated branches. | A parent does not resolve child creator IDs from its own account row. |
| Sub-account | Its own account and lower accounts whose stored lineage contains that Sub-account ID. Main super admins can also view it. | Its Client/Distributor parents, sibling Sub-accounts, and unrelated branches. | Lower visibility commonly applies to Self-registration rows linked through `sub_account_id`. |
| Self-registration | The creator itself when its user ID is resolved from the current account row. Main super admins can also view it. | Parent accounts, siblings, and unrelated branches. | This account type has no normal descendant level and lacks Advisory in its default module allow-list. |
| HR Administrator | Main super admins; other visibility is conditional on the HR creator user ID being returned by account-owner resolution. | Potentially the HR user itself and the intended account lineage when the HR user is not an `accounts.user_id` owner. | This is a documented mapping gap; runtime fixtures are required before claiming a stable audience. |

The direction is creator-to-descendant only when the creator account ID is present in the viewer's stored lineage. Parents do not see child-created announcements merely because they are parents, and siblings or unrelated branches do not see one another's announcements.

> Exception:
> - The global unseen-Advisory modal does not apply this matrix. It currently queries all active, in-date announcements and is tracked as a gap.

### Created Scopes

- `My announcements` is `created_scope=mine` and adds `created_by = current user ID` after the base visibility query.
- `All announcements` is `created_scope=visible` and retains the full hierarchy-visible creator list.
- Missing or unsupported `created_scope` values resolve to `mine`.
- Main super admins begin with an unscoped Advisory query, but `My announcements` still narrows their results to their own records.

## Mutation Governance

Update and delete require two independent checks:

1. The corresponding RBAC permission.
2. `AdvisoryMutationPermissionService` authorization.

Main super admins pass the mutation service for every Advisory. Other users pass only when `advisory.created_by` equals the authenticated user ID. Hierarchy visibility does not grant mutation rights.

## Search and Index Governance

- Results default to descending `id` order.
- Standard `search` applies an OR match across `title` and `content`.
- The status query parameter maps `active` to `1`; every other non-empty, non-`status_none` value maps to `0`.
- Advanced search supports title and content fields with begins-with, contains, ends-with, equality, inequality, null/empty, comparison, and between operators at the model method level.
- The current UI exposes only string-appropriate operators for title and content and uses `AND` without groups.
- Tab counts are produced by running separate searches for `mine` and `visible` using the current query parameters.

## Method Reference

### Module and Controllers

#### `backend\modules\modAdvisory\Advisory`

- `init()` initializes the Yii module and currently adds no feature-specific setup.

#### `AdvisoryController`

- `init()` creates a random CSP nonce and stores it in view parameters.
- `behaviors()` limits delete to POST and attaches the shared rate-limiter middleware.
- `actionIndex()` checks index permission, builds the page context through `AdvisoryIndexPageService`, and renders the list.
- `actionView($id)` checks view permission, loads the record, enforces hierarchy visibility, and renders detail.
- `actionCreate()` checks create permission, initializes audit and seen-state values, loads POST data, saves, and redirects to detail on success.
- `actionUpdate($id)` checks update permission, enforces creator/main-super-admin mutation authority, sets modification metadata, saves, and redirects to detail.
- `actionDelete($id)` checks delete permission, enforces mutation authority, deletes the row, and redirects to the index.
- `actionSend($id)` checks send permission and attempts to render `send`; the required view is absent.
- `findModel($id)` queries by primary key. Its current catch-and-render behavior is recorded as a gap because callers expect an `Advisory` object.

### Models

#### `Advisory`

- `tableName()` returns `advisory_log`.
- `rules()` defines required, string, integer, and safe attributes.
- `attributeLabels()` maps stored fields to UI labels.

#### `AdvisorySearch`

- `rules()` defines list-filter attributes.
- `scenarios()` uses the base Yii model scenarios.
- `search($params)` resolves current user context, creates the permission-scoped query, applies created scope, grid filters, standard search, status, advanced search, sorting, and pagination provider behavior.
- `applySearchFilter($query, $postData)` maps supported advanced-search operators to Yii query conditions and returns the modified query.

### Services

#### `AdvisoryIndexPageService`

- `buildIndexPageContext($queryParams)` returns the search model, data provider, scope-tab definitions/counts, and row-action visibility callbacks.
- Private helpers resolve scope and status, count both scopes, enforce row-button visibility, and load the configured main-super-admin types.

#### `AdvisoryMutationPermissionService`

- `canMutateAdvisory(...)` returns true for a main super admin or the record creator and rejects missing user context/configuration with `InvalidArgumentException`.
- `assertCanMutateAdvisory(...)` throws `ForbiddenHttpException` when `canMutateAdvisory()` returns false.

#### `AdvisoryViewPermissionService`

- `findTopDownCreatorUserIdList(...)` resolves the flattened current-account lineage to account-owner user IDs and adds main-super-admin user IDs.
- `assertCanViewAdvisory(...)` allows main super admins or a record whose creator is in the resolved list; otherwise it throws `ForbiddenHttpException`.
- Missing account, user-type, account-ID, or main-super-admin configuration inputs produce `InvalidArgumentException`.

### Repository

#### `AdvisoryVisibilityRepository`

- `findAccountRowById($accountId)` returns the hierarchy fields and owner user ID for one account, or `null`.
- `findUserIdListByAccountIdList($accountIdList)` returns non-null owner user IDs for the supplied accounts.
- `findMainSuperAdminUserIdList($mainSuperAdminUserTypeList)` returns user IDs whose `user_type` matches the configured main-super-admin types.

## Integration Boundaries

### Dashboard

The Dashboard uses its own repository and visibility service. It applies the same flattened lineage concept, filters to active and currently in-date announcements, orders by newest ID, and returns at most two rows. This document does not catalog Dashboard methods because they are outside `modAdvisory`.

### Global Unseen-Advisory Modal

Backend layouts query active, currently in-date rows, inspect `extras.seen`, render unseen content, and append the acknowledging user ID after `OK`. The layout implementation does not currently share `modAdvisory` visibility services; this is tracked in the gap registry.

## Related Documentation

- [Advisory Management Workflow](../workflow/advisory-management.md)
- [Advisory Gap Registry](../known-gaps/advisory-gap-registry.md)
