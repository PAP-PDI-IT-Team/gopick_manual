(function (global) {
    'use strict';

    var advisoryContent = {
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
                rules: ['Status options are Active and Not active.', 'All visible inputs must be completed.', 'The available actions depend on the current user\'s assigned access.'],
                expectedResults: ['The announcement is saved and opens in View Advisory.'],
                children: [
                    {
                        id: 'format-announcement-content', title: 'Format Announcement Content',
                        description: 'Resizes and aligns an image that has been inserted into the announcement content editor.',
                        accessPaths: [['Advisory', 'Create Announcement or Update Advisory', 'Content', 'Inserted image']],
                        steps: ['Select an inserted image in the Content editor.', 'Drag one of the four visible corner handles to resize the image.', 'Select Left, Center, or Right to align the image.', 'Select outside the image when the formatting is complete.'],
                        rules: ['Image resizing preserves the image\'s aspect ratio.', 'The image remains within the width of the content editor.', 'The alignment controls appear only while an inserted image is selected.'],
                        expectedResults: ['The resized and aligned image remains part of the announcement content when the announcement is saved.']
                    }
                ]
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
                        accessPaths: [['Advisory', 'Search Announcement', 'My announcements']],
                        steps: ['Select My announcements.', 'Review the displayed count and announcement rows.', 'Select an available row action when needed.'],
                        rules: ['Announcements created by other users are excluded from this tab.', 'Available row actions depend on the current user\'s assigned access.'],
                        expectedResults: ['Only announcements created by the current user are displayed.']
                    },
                    {
                        id: 'all-announcements', title: 'All Announcements',
                        description: 'Displays announcements available to the current user across the permitted account hierarchy.',
                        accessPaths: [['Advisory', 'Search Announcement', 'All announcements']],
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
                        accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'View Advisory'], ['Dashboard', 'Announcement', 'Announcement title, when available']],
                        steps: ['Select the view action or an available announcement title.', 'Review the title, posting date, expiration date, status, and content.', 'Select Back to return to the announcement list.'],
                        rules: ['Main administrators can view announcements across all account branches when their assigned access permits it.', 'Supported account users can view announcements created by their own account, their immediate parent account, and main administrators.', 'Sibling, unrelated, and higher-than-immediate-parent account announcements are excluded.'],
                        expectedResults: ['View Advisory opens for the selected announcement.']
                    },
                    {
                        id: 'update-advisory', title: 'Update Advisory',
                        description: 'Changes an existing announcement.',
                        accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'Update Advisory']],
                        steps: ['Select the update action.', 'Change the announcement fields.', 'Select Save.'],
                        rules: ['Main administrators may update announcements across account branches when their assigned access permits it.', 'Other users may update only announcements they created.'],
                        expectedResults: ['The changes are saved and the updated announcement opens in View Advisory.']
                    },
                    {
                        id: 'delete-advisory', title: 'Delete Advisory',
                        description: 'Permanently removes an announcement.',
                        accessPaths: [['Advisory', 'Search Announcement', 'Actions', 'Delete Advisory']],
                        steps: ['Select the delete action.', 'Review the confirmation prompt.', 'Confirm the deletion.'],
                        rules: ['Main administrators may delete announcements across account branches when their assigned access permits it.', 'Other users may delete only announcements they created.', 'Deleted announcements cannot be restored because Advisory has no archive action.'],
                        expectedResults: ['The announcement is removed and Search Announcement opens.']
                    }
                ]
            },
            {
                id: 'dashboard-announcement-preview', title: 'Dashboard Announcement Preview',
                description: 'Displays a preview of current announcements on the Dashboard.',
                accessPaths: [['Dashboard', 'Announcement']],
                steps: ['Open the Dashboard.', 'Review the displayed announcement titles.', 'Select Preview to read an announcement in a modal, when the Dashboard provides that action.', 'Select an available title to open View Advisory.', 'Select View All Announcements to open Search Announcement, when available.'],
                groups: [{ title: 'Visible Content', items: ['Up to two current announcement titles.', 'Announcement preview action in applicable Dashboard variants.', 'Announcement detail link, when available.', 'View All Announcements, when available.'] }],
                rules: ['Only Active announcements within their posting and expiration dates are displayed.', 'Posting and expiration dates are included in the display period.', 'At most two of the newest available announcements are displayed.', 'Dashboard variants without Preview open an announcement through its available title link.', 'Detail and list links depend on the current user\'s assigned access.'],
                expectedResults: ['The selected announcement preview, announcement detail, or full announcement list opens.']
            }
        ]
    };

    function appendHeading(parentElement, headingText, headingLevel) {
        var headingElement = document.createElement(headingLevel === 2 ? 'h2' : 'h3');
        headingElement.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900 mb-2' : 'text-lg font-bold text-slate-900 mb-2';
        headingElement.textContent = headingText;
        parentElement.appendChild(headingElement);
    }

    function appendDescription(parentElement, descriptionText) {
        var paragraphElement = document.createElement('p');
        paragraphElement.className = 'text-sm leading-6 text-slate-600';
        paragraphElement.textContent = descriptionText;
        parentElement.appendChild(paragraphElement);
    }

    function appendList(parentElement, listTitle, listItems, ordered) {
        if (!listItems || !listItems.length) return;
        var detailElement = document.createElement('div');
        detailElement.className = 'advisory-detail';
        var titleElement = document.createElement('h4');
        titleElement.className = 'text-sm font-bold text-slate-700 mb-2';
        titleElement.textContent = listTitle;
        detailElement.appendChild(titleElement);
        var listElement = document.createElement(ordered ? 'ol' : 'ul');
        listElement.className = (ordered ? 'list-decimal' : 'list-disc') + ' pl-5 space-y-1 text-sm text-slate-600';
        listItems.forEach(function (listItem) {
            var itemElement = document.createElement('li');
            itemElement.textContent = listItem;
            listElement.appendChild(itemElement);
        });
        detailElement.appendChild(listElement);
        parentElement.appendChild(detailElement);
    }

    function appendAccessPaths(parentElement, accessPaths) {
        if (!accessPaths || !accessPaths.length) return;
        var detailElement = document.createElement('div');
        detailElement.className = 'advisory-detail';
        var titleElement = document.createElement('h4');
        titleElement.className = 'text-sm font-bold text-slate-700 mb-2';
        titleElement.textContent = 'Access Path';
        detailElement.appendChild(titleElement);
        accessPaths.forEach(function (accessPath) {
            var pathElement = document.createElement('div');
            pathElement.className = 'advisory-access-path';
            accessPath.forEach(function (pathLabel, pathIndex) {
                if (pathIndex > 0) {
                    var separatorElement = document.createElement('span');
                    separatorElement.className = 'advisory-access-path__separator';
                    separatorElement.setAttribute('aria-hidden', 'true');
                    separatorElement.textContent = '›';
                    pathElement.appendChild(separatorElement);
                }
                var labelElement = document.createElement('span');
                labelElement.className = 'advisory-access-path__label';
                labelElement.textContent = pathLabel;
                pathElement.appendChild(labelElement);
            });
            detailElement.appendChild(pathElement);
        });
        parentElement.appendChild(detailElement);
    }

    function appendCallout(parentElement, calloutTitle, calloutItems, modifierClass) {
        if (!calloutItems || !calloutItems.length) return;
        var calloutElement = document.createElement('div');
        calloutElement.className = 'advisory-callout' + (modifierClass ? ' advisory-callout--' + modifierClass : '');
        var titleElement = document.createElement('h4');
        titleElement.className = 'text-sm font-bold text-slate-800 mb-2';
        titleElement.textContent = calloutTitle;
        calloutElement.appendChild(titleElement);
        var listElement = document.createElement('ul');
        listElement.className = 'list-disc pl-5 space-y-1 text-sm text-slate-600';
        calloutItems.forEach(function (calloutItem) {
            var itemElement = document.createElement('li');
            itemElement.textContent = calloutItem;
            listElement.appendChild(itemElement);
        });
        calloutElement.appendChild(listElement);
        parentElement.appendChild(calloutElement);
    }

    function renderSection(sectionData, headingLevel) {
        var sectionElement = document.createElement('section');
        sectionElement.id = sectionData.id;
        sectionElement.className = headingLevel === 2 ? 'advisory-section-card' : 'advisory-child-section';
        appendHeading(sectionElement, sectionData.title, headingLevel);
        appendDescription(sectionElement, sectionData.description);
        appendAccessPaths(sectionElement, sectionData.accessPaths);
        appendList(sectionElement, 'How To Use', sectionData.steps, true);
        (sectionData.groups || []).forEach(function (groupData) {
            appendList(sectionElement, groupData.title, groupData.items, false);
        });
        appendCallout(sectionElement, 'Rules', sectionData.rules, 'rules');
        appendCallout(sectionElement, 'Expected Result', sectionData.expectedResults, 'result');
        appendCallout(sectionElement, 'Notes', sectionData.notes, 'note');
        (sectionData.children || []).forEach(function (childSection) {
            sectionElement.appendChild(renderSection(childSection, headingLevel + 1));
        });
        return sectionElement;
    }

    function appendSidebarItem(parentList, sectionData, nested) {
        var itemElement = document.createElement('li');
        var linkElement = document.createElement('a');
        linkElement.href = '#' + sectionData.id;
        linkElement.dataset.target = sectionData.id;
        linkElement.className = 'block text-slate-600 hover:text-brand transition-colors py-1' + (nested ? ' pl-3 text-xs' : '');
        linkElement.textContent = sectionData.title;
        itemElement.appendChild(linkElement);
        parentList.appendChild(itemElement);
        (sectionData.children || []).forEach(function (childSection) {
            appendSidebarItem(parentList, childSection, true);
        });
    }

    function renderAdvisoryPage() {
        var titleElement = document.getElementById('advisoryPageTitle');
        var descriptionElement = document.getElementById('advisoryPageDescription');
        var contentRoot = document.getElementById('section-render-root');
        var sidebarList = document.getElementById('docSidebarList');
        if (!titleElement || !descriptionElement || !contentRoot || !sidebarList) {
            throw new Error('Advisory page requires its title, description, content root, and sidebar.');
        }
        titleElement.textContent = advisoryContent.title;
        descriptionElement.textContent = advisoryContent.description;
        advisoryContent.sections.forEach(function (sectionData) {
            contentRoot.appendChild(renderSection(sectionData, 2));
            appendSidebarItem(sidebarList, sectionData, false);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAdvisoryPage);
    } else {
        renderAdvisoryPage();
    }
    global.advisoryWorkflowContent = advisoryContent;
})(window);
