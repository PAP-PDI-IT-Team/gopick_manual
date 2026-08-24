# Advisory Management

Creates and manages announcements displayed in GoPick. The application uses `Announcement` for most visible labels and `Advisory` for the module name.

## Create Announcement

Creates an announcement with a title, content, status, posting date, and expiration date.

### Access Path

- `Advisory` > `Create Announcement`

### How To Use

1. Open `Advisory`.
2. Select `Create Announcement`.
3. Enter the announcement title and content.
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

- `Date Start` displays the current date for a new announcement.
- `Date End` displays seven days after the current date for a new announcement.

> Rules:
> - Status options are `Active` and `Not active`.
> - All visible inputs must be completed.
> - The available actions depend on the current user's assigned access.

> Expected Result:
> - The announcement is saved and opens in `View Advisory`.

### Format Announcement Content

Resizes and aligns an image that has been inserted into the announcement content editor.

#### Access Path

- `Advisory` > `Create Announcement` or `Update Advisory` > `Content` > inserted image

#### How To Use

1. Select an inserted image in the `Content` editor.
2. Drag one of the four visible corner handles to resize the image.
3. Select `Left`, `Center`, or `Right` to align the image.
4. Select outside the image when the formatting is complete.

> Rules:
> - Image resizing preserves the image's aspect ratio.
> - The image remains within the width of the content editor.
> - The alignment controls appear only while an inserted image is selected.

> Expected Result:
> - The resized and aligned image remains part of the announcement content when the announcement is saved.

## Search Announcement

Displays announcements available to the current user and provides search, filtering, pagination, and permitted row actions.

### Access Path

- `Advisory` > `Search Announcement`
- `Dashboard` > `Announcement` > `View All Announcements`, when available

### How To Use

1. Open `Search Announcement`.
2. Select `My announcements` or `All announcements`.
3. Optionally use standard search, advanced search, or the status filter.
4. Use page navigation when the results span multiple pages.
5. Select an available row action.

### Visible Content

- Standard search input.
- Advanced search control.
- `My announcements` and `All announcements` tabs with counts.
- Announcement title, posting date, expiration date, and status.
- Available row actions.
- Status filter and page navigation.

> Rules:
> - `My announcements` is selected by default.
> - Standard search matches the announcement title or content.
> - Announcements are ordered from newest to oldest.
> - Tabs, results, and row actions depend on the current user's access and announcement ownership.

> Expected Result:
> - The table shows announcements matching the selected tab and filters.

### My Announcements

Displays announcements created by the current user.

#### Access Path

- `Advisory` > `Search Announcement` > `My announcements`

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

#### Access Path

- `Advisory` > `Search Announcement` > `All announcements`

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

#### How To Use

1. Open `Advanced Search`.
2. Select `Title` or `Content`.
3. Select an operator.
4. Enter a value when the selected operator requires one.
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
> - Multiple conditions are combined using `AND`.
> - Grouped conditions are not available.
> - Advanced search is applied to the currently selected announcement tab.

> Expected Result:
> - The table shows announcements matching the advanced search conditions.

## Announcement Row Actions

Opens, updates, or removes an announcement when the current user's access and announcement ownership allow the action.

### Access Path

- `Advisory` > `Search Announcement` > `Actions`

### How To Use

1. Locate an announcement in the table.
2. Open its available actions.
3. Select `View Advisory`, `Update Advisory`, or `Delete Advisory`.

> Rules:
> - An action appears only when it is available to the current user for the selected announcement.

> Expected Result:
> - The selected permitted action opens or is completed.

### View Advisory

Displays an announcement's title, posting period, status, and content.

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `View Advisory`
- `Dashboard` > `Announcement` > announcement title, when available

#### How To Use

1. Select the view action or an available announcement title.
2. Review the title, posting date, expiration date, status, and content.
3. Select `Back` to return to the announcement list.

> Rules:
> - Main administrators can view announcements across all account branches when their assigned access permits it.
> - Supported account users can view announcements created by their own account, their immediate parent account, and main administrators.
> - Sibling, unrelated, and higher-than-immediate-parent account announcements are excluded.

> Expected Result:
> - `View Advisory` opens for the selected announcement.

### Update Advisory

Changes an existing announcement.

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Update Advisory`

#### How To Use

1. Select the update action.
2. Change the announcement fields.
3. Select `Save`.

> Rules:
> - Main administrators may update announcements across account branches when their assigned access permits it.
> - Other users may update only announcements they created.

> Expected Result:
> - The changes are saved and the updated announcement opens in `View Advisory`.

### Delete Advisory

Permanently removes an announcement.

#### Access Path

- `Advisory` > `Search Announcement` > `Actions` > `Delete Advisory`

#### How To Use

1. Select the delete action.
2. Review the confirmation prompt.
3. Confirm the deletion.

> Rules:
> - Main administrators may delete announcements across account branches when their assigned access permits it.
> - Other users may delete only announcements they created.
> - Deleted announcements cannot be restored because Advisory has no archive action.

> Expected Result:
> - The announcement is removed and `Search Announcement` opens.

## Dashboard Announcement Preview

Displays a preview of current announcements on the Dashboard.

### Access Path

- `Dashboard` > `Announcement`

### How To Use

1. Open the Dashboard.
2. Review the displayed announcement titles.
3. Select `Preview` to read an announcement in a modal, when the Dashboard provides that action.
4. Select an available title to open `View Advisory`.
5. Select `View All Announcements` to open `Search Announcement`, when available.

### Visible Content

- Up to two current announcement titles.
- Announcement preview action in applicable Dashboard variants.
- Announcement detail link, when available.
- `View All Announcements`, when available.

> Rules:
> - Only `Active` announcements within their posting and expiration dates are displayed.
> - Posting and expiration dates are included in the display period.
> - At most two of the newest available announcements are displayed.
> - Dashboard variants without `Preview` open an announcement through its available title link.
> - Detail and list links depend on the current user's assigned access.

> Expected Result:
> - The selected announcement preview, announcement detail, or full announcement list opens.
