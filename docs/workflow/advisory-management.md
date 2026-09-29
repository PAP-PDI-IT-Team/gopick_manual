# Advisory Management

Creates and manages announcements displayed in GoPick. The application uses `Announcement` for most visible labels and `Advisory` for the module name.

## Create Announcement

Creates an announcement with a title, content, status, posting date, and expiration date.

### Access Path

- `Advisory` > `Create Announcement`

### Required Inputs

- `Title`
- `Content`
- `Status`
- `Date Start`
- `Date End`

### Defaulted Inputs

- `Date Start` displays the current date for a new announcement.
- `Date End` displays seven days after the current date for a new announcement.

### How To Use

1. Open `Advisory`.
2. Select `Create Announcement`.
3. Enter the announcement title and content.
4. Select the status.
5. Select `Date Start` and `Date End`.
6. Select `Save`.

> Rules:
> - Status options are `Active` and `Not active`.
> - All visible inputs must be completed.
> - The available actions depend on the current user's assigned access.
> - Images inserted in the `Content` editor can be resized from their four corner handles.
> - Image resizing preserves the image's aspect ratio and keeps the image within the editor width.
> - `Left`, `Center`, and `Right` alignment controls appear only while an inserted image is selected.

> Expected Result:
> - The announcement is saved and opens in `View Advisory`.

## Search Announcement

Displays announcements available to the current user and provides search, filtering, pagination, and permitted row actions.

### Access Path

- `Advisory` > `Search Announcement`
- `Dashboard` > `Announcement` > `View All Announcements`, when available

### Visible Content

- Standard search input.
- Advanced search control.
- `My announcements` and `All announcements` tabs with counts.
- Announcement title, posting date, expiration date, and status.
- Available row actions.
- Status filter and page navigation.

### How To Use

1. Open `Search Announcement`.
2. Select `My announcements` or `All announcements`.
3. Optionally use standard search, advanced search, or the status filter.
4. Use page navigation when the results span multiple pages.
5. Select an available row action.

> Rules:
> - `My announcements` is selected by default.
> - Standard search matches the announcement title or content.
> - Announcements are ordered from newest to oldest.
> - Tabs, results, and row actions depend on the current user's access and announcement ownership.

> Expected Result:
> - The table shows announcements matching the selected tab and filters.

### My Announcements

Displays announcements created by the current user.

#### How To Use

1. Select `My announcements`.
2. Review the displayed count and announcement rows.
3. Select an available row action when needed.

> Rules:
> - Announcements created by other users are excluded from this tab.
> - Available row actions depend on the current user's assigned access.

> Expected Result:
> - Only announcements created by the current user are displayed.

### All Announcements

Displays announcements available to the current user across the permitted account hierarchy.

#### How To Use

1. Select `All announcements`.
2. Review the displayed count and announcement rows.
3. Select an available row action when needed.

> Rules:
> - Main administrators can see announcements across all account branches when their assigned access permits it.
> - Supported account users see announcements created by their own account, their immediate parent account, and main administrators.
> - Sibling and unrelated accounts are excluded.
> - Announcements created by accounts above the immediate parent are not included automatically.
> - Seeing an announcement does not automatically allow it to be updated or deleted.

> Expected Result:
> - Announcements available within the current user's permitted view are displayed.

### Standard Search

Filters the selected announcement tab by title or content.

#### Access Path

- `Advisory` > `Search Announcement` > `Search`

#### How To Use

1. Enter search text.
2. Submit the search.

> Rules:
> - Search is applied to the currently selected announcement tab.
> - Search text is matched against the announcement title or content.

> Expected Result:
> - Only announcements with a matching title or content remain in the table.

### Advanced Search

Builds one or more title or content conditions for the selected announcement tab.

#### Access Path

- `Advisory` > `Search Announcement` > `Advanced Search`

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

#### How To Use

1. Open `Advanced Search`.
2. Select `Title` or `Content`.
3. Select an operator.
4. Enter a value when the selected operator requires one.
5. Run the search.

> Rules:
> - Multiple conditions are combined using `AND`.
> - Grouped conditions are not available.
> - Advanced search is applied to the currently selected announcement tab.

> Expected Result:
> - The table shows announcements matching the advanced search conditions.

## Other Pages

Groups Advisory pages that open from announcement actions rather than directly from the Advisory navigation.

### Announcement Row Actions

Opens, updates, or removes an announcement when the current user's access and announcement ownership allow the action.

#### Access Path

- `Advisory` > `Search Announcement` > `Actions`

#### How To Use

1. Locate an announcement in the table.
2. Open its available actions.
3. Select `View Advisory`, `Update Advisory`, or `Delete Advisory`.

> Rules:
> - An action appears only when it is available to the current user for the selected announcement.

> Expected Result:
> - The selected permitted action opens or is completed.

#### View Advisory

Displays an announcement's title, posting period, status, and content.

##### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `View Advisory`
- [`Dashboard`](../../pages/workflow/dashboard-management/index.html#quick-navigations) > `Announcement` > announcement title, when available

##### How To Use

1. Select the view action or an available announcement title.
2. Review the title, posting date, expiration date, status, and content.
3. Select `Back` to return to the announcement list.

> Rules:
> - Main administrators can view announcements across all account branches when their assigned access permits it.
> - Supported account users can view announcements created by their own account, their immediate parent account, and main administrators.
> - Sibling, unrelated, and higher-than-immediate-parent account announcements are excluded.

> Expected Result:
> - `View Advisory` opens for the selected announcement.

#### Update Advisory

Changes an existing announcement.

##### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Update Advisory`

##### How To Use

1. Select the update action.
2. Change the announcement fields.
3. Select `Save`.

> Rules:
> - The assigned `Update Advisory` permission is required.
> - A user may update an announcement they created; a main super admin with this permission may update any announcement.

> Expected Result:
> - The changes are saved and the updated announcement opens in `View Advisory`.

#### Delete Advisory

Permanently removes an announcement.

##### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Delete Advisory`

##### How To Use

1. Select the delete action.
2. Review the confirmation prompt.
3. Confirm the deletion.

> Rules:
> - The assigned `Delete Advisory` permission is required.
> - A user may delete an announcement they created; a main super admin with this permission may delete any announcement.
> - Deleted announcements cannot be restored because Advisory has no archive action.

> Expected Result:
> - The announcement is removed and `Search Announcement` opens.
