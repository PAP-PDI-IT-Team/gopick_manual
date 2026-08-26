# Activity Log

Review user activity records and candidate activity records from `ACTIVITY LOGS`, including timestamps, screenshots or snapshots, and device details.

> Rules:
> - The `ACTIVITY LOGS` menu is hidden when the activity logger function is off.
> - `User Activities` is shown for Super Admin / Super Admin ASD, or Distributor.
> - `Candidate Activities` is hidden for Distributor.
> - Clicking `ACTIVITY LOGS` opens `User Activities`.
> - No role can create, update, or delete activity records.
> - Left menu is `ACTIVITY LOGS` with only `User Activities` and `Candidate Activities`.
> - Listing toolbars have no Create / Update / Delete button.
> - Row Action is view-only: `View User Activities` and `View Candidate Activities`.

> Notes:
> - Site tutorial text on the `ACTIVITY LOGS` menu: Check candidate activities on this feature.
> - All four listings use the same footer. Default page size is `10`. No listing is without a pager.
> - Per-page label: `Rows per page:`
> - Per-page dropdown values: `5`, `10`, `25`, `50`, `100`, `250`, `500`, `1000` (numbers only)
> - Summary: Yii default `Showing 1-10 of 25 items.` (bold range and total; scales with page size)
> - Page controls: icon-only first / previous / next / last. Numbered page links are hidden. No Previous/Next text.
> - Listings with this footer: Super Admin username list, user activity log rows, Candidate Activities listing, per-candidate log table.

## User Activities

Lists user activity records. Super Admin / Super Admin ASD first see a username list, then open one user’s logs. Distributor sees activity log rows directly.

### Purpose / Scope

Lists user activity records. Super Admin / Super Admin ASD first see a username list, then open one user’s logs. Distributor sees activity log rows directly.

### Access Path

- `ACTIVITY LOGS` > `User Activities`

### How To Use

1. Open `ACTIVITY LOGS`.
2. Select `User Activities`.
3. Super Admin / Super Admin ASD: find a username, then select [View User Activities](#view-user-activities).
4. Distributor: review the activity rows on this page.
5. Optionally use [Search](#search), [Advanced Search](#advanced-search), [Select Company](#select-company), or [Date Entered](#date-entered).

### Available Actions

- [Search](#search)
- [Advanced Search](#advanced-search)
- [Select Company](#select-company)
- [Date Entered](#date-entered)
- [View User Activities](#view-user-activities)

### Visible Content

Super Admin / Super Admin ASD username list:

- `Username`
- `Action` (view icon, not the log action)
- Row action: `View User Activities`

Activity log rows, after `View User Activities`, or on the direct listing for non-super-admin:

- Super Admin / Super Admin ASD columns: `Module`, `Action`, `Request Value`, `Date Entered`
- Other users’ columns: `Username`, `Module`, `Action`, `Date Entered`
- `Request Value` is a read-only textarea
- `Module` is shown without the `mod` prefix, with spaces in the remaining name

#### Locked Inputs

- `Request Value`

### Search

Filters the User Activities table with `Search...`. Candidate Activities uses the same `Search...` control and has no Advanced Search.

#### Purpose / Scope

Filter the current listing with the `Search...` input.

#### Access Path

- `ACTIVITY LOGS` > `User Activities` > `Search...`
- `ACTIVITY LOGS` > `Candidate Activities` > `Search...`

#### How To Use

1. Enter text in `Search...`.
2. Submit the search.

#### Optional Inputs

- `Search...`

> Notes:
> - User Activities username list (Super Admin only): `Search...` matches `Username`. It also OR-matches log `Action` (`activity_logs.action`), which is not a visible column here; the `Action` column is the view icon.
> - Super Admin after [View User Activities](#view-user-activities): `Search...` matches `Module`, `Action`, and `Username` even though `Username` is hidden. It does not match `Request Value` or `Date Entered`.
> - Other roles (direct log list): `Search...` matches `Username`, `Module`, and `Action`. It does not match `Date Entered`.
> - Candidate Activities listing: `Search...` matches username only (the gray username under the name in `Candidate`). It does not match first/last name, `Affiliated With`, `Last Log`, or `Scheduled By`.
> - Per-candidate log table: no `Search...` bar. `Timestamp` uses [Date Entered](#date-entered), not the top Search control.

### Advanced Search

Filters User Activities with Advanced Search. This control is only on User Activities, not Candidate Activities.

#### Purpose / Scope

Open Advanced Search and apply field filters to the User Activities table.

#### Access Path

- `ACTIVITY LOGS` > `User Activities` > `Advanced Search`

#### How To Use

1. Select `Advanced Search`.
2. Set optional filters.
3. Select `Search` in the modal.

#### Visible Content

- Button: `Advanced Search`
- Modal title: `Advanced Search`
- Modal footer buttons: `Clear`, `Close`, `Search`
- After apply: panel `Advance Search Query`

Operators (same for `Username`, `Module`, `Action`, and `Request Value`):

- `begins with`
- `contains`
- `ends with`
- `equal`
- `not equal`
- `is empty`
- `is not empty`
- `is null`
- `is not null`

#### Optional Inputs

- `Username`
- `Module`
- `Action`
- `Request Value`

> Rules:
> - Conditions are AND only.
> - Groups are not allowed.
> - Default operator when the modal opens: `begins with`.

> Expected Result:
> - The User Activities table reloads with the advanced search applied.

### Select Company

Shown on the User Activities listing and the Candidate Activities listing when the signed-in user is Super Admin or Super Admin ASD. Not shown on the per-candidate log table.

#### Purpose / Scope

Reload the current listing for the selected company.

#### Access Path

- `ACTIVITY LOGS` > `User Activities` > `Select Company`
- `ACTIVITY LOGS` > `Candidate Activities` > `Select Company`

#### How To Use

1. Select a company in `Select Company`.

#### Optional Inputs

- `Select Company`

> Rules:
> - Shown only when the signed-in user is Super Admin or Super Admin ASD.
> - Shown on the User Activities listing and the Candidate Activities listing.
> - Not shown on the per-candidate log table.
> - If the company cannot be used, the page shows: `The selected company is unavailable and was removed from the activity filter.`
> - The company query is then cleared.

> Expected Result:
> - The listing reloads for the selected company.

### Date Entered

On User Activities log rows and on [View Candidate Activities](#view-candidate-activities).

#### Purpose / Scope

Filter activity log rows by `Date Entered`.

#### Access Path

- `ACTIVITY LOGS` > `User Activities` > `Date Entered`
- `ACTIVITY LOGS` > `Candidate Activities` > `Row Actions` > `View Candidate Activities` > `Date Entered`

#### How To Use

1. Open the `Date Entered` picker.
2. Select a date.
3. To remove the filter, select `Clear`.

#### Optional Inputs

- `Date Entered`

#### Locked Inputs

- `Date Entered`

> Rules:
> - On User Activities log rows and on View Candidate Activities.
> - The field is read-only; use the picker.
> - Clear label: `Clear`.
> - Format: `MM/DD/YYYY`.
> - Min date: `01/01/2020`.
> - Max date: today.

> Expected Result:
> - Clearing the picker removes the date filter and reloads the page.

### View User Activities

Opens that username’s activity log rows.

#### Purpose / Scope

Show that username’s activity rows with `Module`, `Action`, `Request Value`, and `Date Entered`.

#### Access Path

- `ACTIVITY LOGS` > `User Activities` > `Row Actions` > `View User Activities`

#### How To Use

1. Open User Activities as Super Admin / Super Admin ASD.
2. Select `View User Activities` on a username row.

> Rules:
> - Shown for Super Admin (`super_admin`) / Administrator ASD (`super_admin_asd`), or `modActivity-actionView` plus `modActivity-actionUserLogs`.

> Expected Result:
> - That username’s activity rows are shown with `Module`, `Action`, `Request Value`, and `Date Entered`.

## Candidate Activities

Lists candidates with activity, then opens one candidate’s activity log: timestamp, activity, screenshot/snapshot, and device used.

### Purpose / Scope

Lists candidates with activity, then opens one candidate’s activity log: timestamp, activity, screenshot/snapshot, and device used. Extra Candidates-side entry points are documented here as access paths only. The Candidates-side action is owned by [View Candidate Log](candidate-management.md#view-candidate-log).

### Access Path

- `ACTIVITY LOGS` > `Candidate Activities`
- `Candidates` > `View Candidates` > `Settings` > `View Candidate Log` opens the per-candidate log page with that candidate username and company. See [View Candidate Log](candidate-management.md#view-candidate-log).
- `Candidates` > `View Candidate` > `Actions` > `View Candidate Log` opens the Candidate Activities listing filtered by username. See [View Candidate Log](candidate-management.md#view-candidate-log).
- Survey listing `Settings` > `View Candidate Log` opens the Candidate Activities listing filtered by username. See [View Candidate Log](candidate-management.md#view-candidate-log).
- Survey badge `REVIEW LOG` opens the Candidate Activities listing filtered by username.

### How To Use

1. Open `Candidate Activities`.
2. Review the candidate listing.
3. Optionally use [Search](#search), [Scheduled By](#scheduled-by), or [Select Company](#select-company).
4. Select [View Candidate Activities](#view-candidate-activities) on a row.

### Available Actions

- [Search](#search)
- [Scheduled By](#scheduled-by)
- [Select Company](#select-company)
- [View Candidate Activities](#view-candidate-activities)

### Visible Content

- `Candidate` (full name, username under it)
- `Affiliated With`
- `Last Log` (date as `M d, Y`, or `-` if empty)
- `Scheduled By`
- `Action`
- Row action title: `View Candidate Activities`

Empty state for Distributor with zero rows:

- `No Candidate Activity`
- `There are currently no scheduled candidates.`

> Notes:
> - Survey locale is account config `custom_language` = `custom-scss`. Translation: `View Candidate Log` => `View Respondent Log`.
> - `Candidates` > `View Candidates` > `Settings` stays `View Candidate Log` (hardcoded).
> - `Candidates` > `View Candidate` > `Actions` becomes `View Respondent Log`.
> - Survey listing `Settings` stays `View Candidate Log` (hardcoded).
> - Survey badge stays `REVIEW LOG`.
> - Related (label only): `View Respondent` > `Actions` also becomes `View Respondent Log`. The action stays owned by [View Candidate Log](candidate-management.md#view-candidate-log).
> - Candidate Activities `Search...` has no Advanced Search. See [Search](#search).

### Scheduled By

Listing only, not on the per-candidate log table.

#### Purpose / Scope

Filter the Candidate Activities listing by scheduler.

#### Access Path

- `ACTIVITY LOGS` > `Candidate Activities` > `Scheduled By` filter

#### How To Use

1. Select a `Scheduled By` option.

#### Defaulted Inputs

- `My Scheduled Candidates`

#### Optional Inputs

- `My Scheduled Candidates`
- `All`
- Named scheduler display names

> Rules:
> - Listing only, not on the per-candidate log table.

### View Candidate Activities

Shows one candidate’s activity log. Page title stays `Candidate Activities`. Header shows candidate first name + last name, then account name.

#### Purpose / Scope

Shows one candidate’s activity log. Page title stays `Candidate Activities`. Header shows candidate first name + last name, then account name.

#### Access Path

- `ACTIVITY LOGS` > `Candidate Activities` > `Row Actions` > `View Candidate Activities`
- `Candidates` > `View Candidates` > `Settings` > `View Candidate Log`. See [View Candidate Log](candidate-management.md#view-candidate-log).

#### How To Use

1. Open the candidate’s activity log.
2. Review `Timestamp`, `Activity`, `Screenshot/Snapshot`, and `Device Used`.
3. Optionally filter by [Date Entered](#date-entered).
4. Optionally open [More Information](#more-information).
5. Optionally open a snapshot with the view icon. See [Screenshot/Snapshot](#screenshot-snapshot).

#### Visible Content

- `Timestamp` (date `M j, Y` and time `h:i:s A`)
- `Activity`
- `Screenshot/Snapshot`
- `Device Used`

Confirmed Activity labels:

- `Logged In`
- `Log in Failed`
- `Successful Login`
- `Login (Candidate Set Password)`
- `Logged Out`
- `{controller name} Assessment`
- `Privacy Consent`
- `Update Candidate Demographics`
- `View Candidate Demographics`
- `List Scheduled Assessment`
- `Captured Snapshot`
- `Captured Screenshot`
- `Save Device Specs`
- `Candidate Leave GoPick Window`
- `Return to GoPick Window`
- `Candidate Pressed Function Key`
- `Detected two (2) or more faces`
- `Time's up`
- `Finish {assessment name} Assessment`
- Otherwise the action name, with index shown as `list`

> Rules:
> - Visible when the user has `modActivity-actionView`.

> Expected Result:
> - The candidate’s activity rows are listed with timestamp, activity label, optional snapshot, and device details.

#### More Information

Button: `More Information`

##### Purpose / Scope

Show extra fields for an activity row.

##### How To Use

1. Select `More Information`.

##### Visible Content

- `Module:`
- `Controller:`
- `Action:`

#### Screenshot/Snapshot

##### Purpose / Scope

Open a snapshot from an activity row when one is present.

##### How To Use

1. Select the view icon titled `View Candidate Snapshots`.
2. Review the `Candidate Snapshot` modal.
3. Select `CLOSE`.

##### Visible Content

- View icon title: `View Candidate Snapshots`
- Modal title: `Candidate Snapshot`
- Close button: `CLOSE`

> Rules:
> - A row may have no snapshot.

#### Device Used

##### Purpose / Scope

Show captured device specs on an activity row.

##### Visible Content

When present:

- `Browser Name:`
- `Browser Version:`
- `OS:`
- `Device:` `Mobile` or `PC`
- `Captured At:`

When missing: `No captured specs`

#### Candidate Activity Report Unavailable

Not a menu item. Visible blocked page if the candidate log cannot load.

##### Purpose / Scope

Show that the candidate activity report cannot be opened.

##### Visible Content

- Title: `Candidate Activity Report Unavailable`
- Message: `The selected account cannot be loaded because its company setup is incomplete or no longer available. Please contact support.`
- `Issue Reference`
- `Selected Account ID`
- `Candidate Username`
- `What to Report`: `Send this issue reference to support.`

> Rules:
> - `Back to Candidate Activities` exists as a label but the return button is not shown.

> Notes:
> - Support can investigate this using the issue reference shown above.
> - QA / Dev: Super Admin users can see extra technical detail on this blocked page.
