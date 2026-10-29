(function (global) {
    'use strict';

    const advisoryContent = {
        title: 'Advisory Management',
        description: 'Creates and manages announcements displayed in GoPick. The application uses Announcement for most visible labels and Advisory for the module name.',
        sections: [
            {
                id: 'create-announcement', title: 'Create Announcement',
                description: 'Creates an announcement with a title, content, status, posting date, and expiration date.',
                accessPaths: [['Advisory', 'Create Announcement']],
                steps: ['Open Advisory.', 'Select Create Announcement.', 'Enter the announcement title and content.', 'Select the status.', 'Select Date Start and Date End.', 'Select Save.'],
                groups: [
                    { title: 'Required Inputs', items: ['Title', 'Content', 'Status', 'Date Start', 'Date End'] },
                    { title: 'Defaulted Inputs', items: ['Date Start displays the current date for a new announcement.', 'Date End displays seven days after the current date for a new announcement.'] }
                ],
                rules: ['Status options are Active and Not active.', 'All visible inputs must be completed.', 'The available actions depend on the current user\'s assigned access.', 'Images inserted in the Content editor can be resized from their four corner handles.', 'Image resizing preserves the image\'s aspect ratio and keeps the image within the editor width.', 'Left, Center, and Right alignment controls appear only while an inserted image is selected.'],
                expectedResults: ['The announcement is saved and opens in View Advisory.']
            },
            {
                id: 'search-announcement', title: 'Search Announcement',
                description: 'Displays announcements available to the current user and provides search, filtering, pagination, and permitted row actions.',
                accessPaths: [['Advisory', 'Search Announcement'], ['Dashboard', 'Announcement', 'View All Announcements, when available']],
                steps: ['Open Search Announcement.', 'Select My announcements or All announcements.', 'Optionally use standard search, advanced search, or the status filter.', 'Use page navigation when the results span multiple pages.', 'Select an available row action.'],
                groups: [{ title: 'Visible Content', items: ['Standard search input.', 'Advanced search control.', 'My announcements and All announcements tabs with counts.', 'Announcement title, posting date, expiration date, and status.', 'Available row actions.', 'Status filter and page navigation.'] }],
                rules: ['My announcements is selected by default.', 'Standard search matches the announcement title or content.', 'Announcements are ordered from newest to oldest.', 'Tabs, results, and row actions depend on the current user\'s access and announcement ownership.'],
                expectedResults: ['The table shows announcements matching the selected tab and filters.'],
                children: [
                    {
                        id: 'my-announcements', title: 'My Announcements',
                        description: 'Displays announcements created by the current user.',
                        steps: ['Select My announcements.', 'Review the displayed count and announcement rows.', 'Select an available row action when needed.'],
                        rules: ['Announcements created by other users are excluded from this tab.', 'Available row actions depend on the current user\'s assigned access.'],
                        expectedResults: ['Only announcements created by the current user are displayed.']
                    },
                    {
                        id: 'all-announcements', title: 'All Announcements',
                        description: 'Displays announcements available to the current user across the permitted account hierarchy.',
                        steps: ['Select All announcements.', 'Review the displayed count and announcement rows.', 'Select an available row action when needed.'],
                        rules: ['Main administrators can see announcements across all account branches when their assigned access permits it.', 'Supported account users see announcements created by their own account, their immediate parent account, and main administrators.', 'Sibling and unrelated accounts are excluded.', 'Announcements created by accounts above the immediate parent are not included automatically.', 'Seeing an announcement does not automatically allow it to be updated or deleted.'],
                        expectedResults: ['Announcements available within the current user\'s permitted view are displayed.']
                    },
                    {
                        id: 'standard-search', title: 'Standard Search',
                        description: 'Filters the selected announcement tab by title or content.',
                        accessPaths: [['Advisory', 'Search Announcement', 'Search']],
                        steps: ['Enter search text.', 'Submit the search.'],
                        rules: ['Search is applied to the currently selected announcement tab.', 'Search text is matched against the announcement title or content.'],
                        expectedResults: ['Only announcements with a matching title or content remain in the table.']
                    },
                    {
                        id: 'advanced-search', title: 'Advanced Search',
                        description: 'Builds one or more title or content conditions for the selected announcement tab.',
                        accessPaths: [['Advisory', 'Search Announcement', 'Advanced Search']],
                        steps: ['Open Advanced Search.', 'Select Title or Content.', 'Select an operator.', 'Enter a value when the selected operator requires one.', 'Run the search.'],
                        groups: [{ title: 'Available Operators', items: ['Begins with', 'Contains', 'Ends with', 'Equal', 'Not equal', 'Is empty', 'Is not empty', 'Is null', 'Is not null'] }],
                        rules: ['Multiple conditions are combined using AND.', 'Grouped conditions are not available.', 'Advanced search is applied to the currently selected announcement tab.'],
                        expectedResults: ['The table shows announcements matching the advanced search conditions.']
                    }
                ]
            },
            {
                id: 'other-pages', title: 'Other Pages',
                description: 'Groups Advisory pages that open from announcement actions rather than directly from the Advisory navigation.',
                children: [
                    {
                        id: 'announcement-row-actions', title: 'Announcement Row Actions',
                        description: 'Opens, updates, or removes an announcement when the current user\'s access and announcement ownership allow the action.',
                        accessPaths: [['Advisory', 'Search Announcement', 'Actions']],
                        steps: ['Locate an announcement in the table.', 'Open its available actions.', 'Select View Advisory, Update Advisory, or Delete Advisory.'],
                        rules: ['An action appears only when it is available to the current user for the selected announcement.'],
                        expectedResults: ['The selected permitted action opens or is completed.'],
                        children: [
                            {
                                id: 'view-advisory', title: 'View Advisory',
                                description: 'Displays an announcement\'s title, posting period, status, and content.',
                                accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'View Advisory'], [{ label: 'Dashboard', href: '../dashboard-management/index.html#quick-navigations' }, 'Announcement', 'Announcement title, when available']],
                                steps: ['Select the view action or an available announcement title.', 'Review the title, posting date, expiration date, status, and content.', 'Select Back to return to the announcement list.'],
                                rules: ['Main administrators can view announcements across all account branches when their assigned access permits it.', 'Supported account users can view announcements created by their own account, their immediate parent account, and main administrators.', 'Sibling, unrelated, and higher-than-immediate-parent account announcements are excluded.'],
                                expectedResults: ['View Advisory opens for the selected announcement.']
                            },
                            {
                                id: 'update-advisory', title: 'Update Advisory',
                                description: 'Changes an existing announcement.',
                                accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'Update Advisory']],
                                steps: ['Select the update action.', 'Change the announcement fields.', 'Select Save.'],
                                rules: ['The assigned Update Advisory permission is required.', 'A user may update an announcement they created; a main super admin with this permission may update any announcement.'],
                                expectedResults: ['The changes are saved and the updated announcement opens in View Advisory.']
                            },
                            {
                                id: 'delete-advisory', title: 'Delete Advisory',
                                description: 'Permanently removes an announcement.',
                                accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'Delete Advisory']],
                                steps: ['Select the delete action.', 'Review the confirmation prompt.', 'Confirm the deletion.'],
                                rules: ['The assigned Delete Advisory permission is required.', 'A user may delete an announcement they created; a main super admin with this permission may delete any announcement.', 'Deleted announcements cannot be restored because Advisory has no archive action.'],
                                expectedResults: ['The announcement is removed and Search Announcement opens.']
                            }
                        ]
                    }
                ]
            }
        ]
    };

    global.__advisoryContent = advisoryContent;
})(window);
