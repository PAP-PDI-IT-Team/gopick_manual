// activity log data filler - content derived from docs/workflow/activity-log-management.md
(function (global) {
    'use strict';

    const activityLogContent = {
        title: 'Activity Log',
        rules: [
            'The ACTIVITY LOGS menu is hidden when the activity logger function is off.',
            'User Activities is shown for Super Admin / Super Admin ASD, or Distributor.',
            'Candidate Activities is hidden for Distributor.',
            'Clicking ACTIVITY LOGS opens User Activities.',
            'No role can create, update, or delete activity records.',
            'Left menu is ACTIVITY LOGS with only User Activities and Candidate Activities.',
            'Listing toolbars have no Create / Update / Delete button.',
            'Row Action is view-only: View User Activities and View Candidate Activities.'
        ],
        notes: [
            'Site tutorial text on the ACTIVITY LOGS menu: Check candidate activities on this feature.',
            'All four listings use the same footer. Default page size is 10. No listing is without a pager.',
            'Per-page label: Rows per page:',
            'Per-page dropdown values: 5, 10, 25, 50, 100, 250, 500, 1000 (numbers only)',
            'Page controls: icon-only first / previous / next / last. Numbered page links are hidden. No Previous/Next text.',
            'Listings with this footer: Super Admin username list, user activity log rows, Candidate Activities listing, per-candidate log table.'
        ],
        sections: [
            {
                id: 'user-activities',
                title: 'User Activities',
                description: 'Lists user activity records. Super Admin / Super Admin ASD first see a username list, then open one user’s logs. Distributor sees activity log rows directly.',
                accessPaths: [
                    ['ACTIVITY LOGS', 'User Activities']
                ],
                steps: [
                    'Open ACTIVITY LOGS.',
                    'Select User Activities.',
                    { label: 'Super Admin / Super Admin ASD: find a username, then select View User Activities.', href: '#view-user-activities' },
                    'Distributor: review the activity rows on this page.',
                    'Optionally use Search..., Advanced Search, Select Company, or Date Entered.'
                ],
                links: [
                    { label: 'Search', href: '#search' },
                    { label: 'Advanced Search', href: '#advanced-search' },
                    { label: 'Select Company', href: '#select-company' },
                    { label: 'Date Entered', href: '#date-entered' },
                    { label: 'View User Activities', href: '#view-user-activities' }
                ],
                groups: [
                    {
                        title: 'Super Admin / Super Admin ASD username list',
                        items: [
                            'Username',
                            'Action (view icon, not the log action)',
                            'Row action: View User Activities'
                        ]
                    },
                    {
                        title: 'Activity log rows',
                        items: [
                            'Super Admin / Super Admin ASD columns: Module, Action, Request Value, Date Entered',
                            'Other users’ columns: Username, Module, Action, Date Entered',
                            'Request Value is a read-only textarea',
                            'Module is shown without the mod prefix, with spaces in the remaining name'
                        ]
                    }
                ],
                lockedInputs: [
                    'Request Value'
                ],
                children: [
                    {
                        id: 'search',
                        title: 'Search',
                        description: 'Filter the current listing with the Search... input. Candidate Activities uses the same Search... control and has no Advanced Search.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'User Activities', 'Search...'],
                            ['ACTIVITY LOGS', 'Candidate Activities', 'Search...']
                        ],
                        steps: [
                            'Enter text in Search....',
                            'Submit the search.'
                        ],
                        optionalInputs: [
                            'Search...'
                        ],
                        notes: [
                            'User Activities username list (Super Admin only): Search... matches Username. It also OR-matches log Action (activity_logs.action), which is not a visible column here; the Action column is the view icon.',
                            { label: 'Super Admin after View User Activities: Search... matches Module, Action, and Username even though Username is hidden. It does not match Request Value or Date Entered.', href: '#view-user-activities' },
                            'Other roles (direct log list): Search... matches Username, Module, and Action. It does not match Date Entered.',
                            'Candidate Activities listing: Search... matches username only (the gray username under the name in Candidate). It does not match first/last name, Affiliated With, Last Log, or Scheduled By.',
                            { label: 'Per-candidate log table: no Search... bar. Timestamp uses Date Entered, not the top Search control.', href: '#date-entered' }
                        ]
                    },
                    {
                        id: 'advanced-search',
                        title: 'Advanced Search',
                        description: 'Open Advanced Search and apply field filters to the User Activities table. This control is only on User Activities, not Candidate Activities.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'User Activities', 'Advanced Search']
                        ],
                        steps: [
                            'Select Advanced Search.',
                            'Set optional filters.',
                            'Select Search in the modal.'
                        ],
                        items: [
                            'Button: Advanced Search',
                            'Modal title: Advanced Search',
                            'Modal footer buttons: Clear, Close, Search',
                            'After apply: panel Advance Search Query'
                        ],
                        groups: [
                            {
                                title: 'Operators (same for Username, Module, Action, and Request Value)',
                                items: [
                                    'begins with',
                                    'contains',
                                    'ends with',
                                    'equal',
                                    'not equal',
                                    'is empty',
                                    'is not empty',
                                    'is null',
                                    'is not null'
                                ]
                            }
                        ],
                        optionalInputs: [
                            'Username',
                            'Module',
                            'Action',
                            'Request Value'
                        ],
                        rules: [
                            'Conditions are AND only.',
                            'Groups are not allowed.',
                            'Default operator when the modal opens: begins with.'
                        ],
                        expectedResults: [
                            'The User Activities table reloads with the advanced search applied.'
                        ]
                    },
                    {
                        id: 'select-company',
                        title: 'Select Company',
                        description: 'Reload the current listing for the selected company. Shown on the User Activities listing and the Candidate Activities listing when the signed-in user is Super Admin or Super Admin ASD. Not shown on the per-candidate log table.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'User Activities', 'Select Company'],
                            ['ACTIVITY LOGS', 'Candidate Activities', 'Select Company']
                        ],
                        steps: [
                            'Select a company in Select Company.'
                        ],
                        optionalInputs: [
                            'Select Company'
                        ],
                        rules: [
                            'Shown only when the signed-in user is Super Admin or Super Admin ASD.',
                            'Shown on the User Activities listing and the Candidate Activities listing.',
                            'Not shown on the per-candidate log table.',
                            'If the company cannot be used, the page shows: The selected company is unavailable and was removed from the activity filter.',
                            'The company query is then cleared.'
                        ],
                        expectedResults: [
                            'The listing reloads for the selected company.'
                        ]
                    },
                    {
                        id: 'view-user-activities',
                        title: 'View User Activities',
                        description: 'Show that username’s activity rows with Module, Action, Request Value, and Date Entered.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'User Activities', 'Row Actions', 'View User Activities']
                        ],
                        steps: [
                            'Open User Activities as Super Admin / Super Admin ASD.',
                            'Select View User Activities on a username row.'
                        ],
                        rules: [
                            'Shown for Super Admin (super_admin) / Administrator ASD (super_admin_asd), or modActivity-actionView plus modActivity-actionUserLogs.'
                        ],
                        expectedResults: [
                            'That username’s activity rows are shown with Module, Action, Request Value, and Date Entered.'
                        ]
                    },
                    {
                        id: 'date-entered',
                        title: 'Date Entered',
                        description: 'Filter activity log rows by Date Entered. On User Activities log rows and on View Candidate Activities.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'User Activities', 'Date Entered'],
                            ['ACTIVITY LOGS', 'Candidate Activities', 'Row Actions', 'View Candidate Activities', 'Date Entered']
                        ],
                        steps: [
                            'Open the Date Entered picker.',
                            'Select a date.',
                            'To remove the filter, select Clear.'
                        ],
                        optionalInputs: [
                            'Date Entered'
                        ],
                        lockedInputs: [
                            'Date Entered'
                        ],
                        rules: [
                            'On User Activities log rows and on View Candidate Activities.',
                            'The field is read-only; use the picker.',
                            'Clear label: Clear.',
                            'Format: MM/DD/YYYY.',
                            'Min date: 01/01/2020.',
                            'Max date: today.'
                        ],
                        expectedResults: [
                            'Clearing the picker removes the date filter and reloads the page.'
                        ]
                    }
                ]
            },
            {
                id: 'candidate-activities',
                title: 'Candidate Activities',
                description: 'Lists candidates with activity, then opens one candidate’s activity log: timestamp, activity, screenshot/snapshot, and device used. Extra Candidates-side entry points are documented here as access paths only. The Candidates-side action is owned by View Candidate Log.',
                accessPaths: [
                    ['ACTIVITY LOGS', 'Candidate Activities'],
                    ['Candidates', 'View Candidates', 'Settings', 'View Candidate Log'],
                    ['Candidates', 'View Candidate', 'Actions', 'View Candidate Log'],
                    ['Survey listing', 'Settings', 'View Candidate Log'],
                    ['Survey badge', 'REVIEW LOG']
                ],
                steps: [
                    'Open Candidate Activities.',
                    'Review the candidate listing.',
                    'Optionally use Search..., Scheduled By, or Select Company.',
                    { label: 'Select View Candidate Activities on a row.', href: '#view-candidate-activities' }
                ],
                links: [
                    { label: 'View Candidate Log', href: '../candidate-management/index.html#view-candidate-log' },
                    { label: 'Search', href: '#search' },
                    { label: 'Scheduled By', href: '#scheduled-by' },
                    { label: 'Select Company', href: '#select-company' },
                    { label: 'View Candidate Activities', href: '#view-candidate-activities' }
                ],
                items: [
                    'Candidate (full name, username under it)',
                    'Affiliated With',
                    'Last Log (date as M d, Y, or - if empty)',
                    'Scheduled By',
                    'Action',
                    'Row action title: View Candidate Activities'
                ],
                groups: [
                    {
                        title: 'Additional entry point destinations',
                        items: [
                            'Candidates > View Candidates > Settings > View Candidate Log opens the per-candidate log page with that candidate username and company.',
                            'Candidates > View Candidate > Actions > View Candidate Log opens the Candidate Activities listing filtered by username.',
                            'Survey listing Settings > View Candidate Log opens the Candidate Activities listing filtered by username.',
                            'Survey badge REVIEW LOG opens the Candidate Activities listing filtered by username.'
                        ]
                    },
                    {
                        title: 'Empty state for Distributor with zero rows',
                        items: [
                            'No Candidate Activity',
                            'There are currently no scheduled candidates.'
                        ]
                    }
                ],
                notes: [
                    'Survey locale is account config custom_language = custom-scss. Translation: View Candidate Log => View Respondent Log.',
                    'Candidates > View Candidates > Settings stays View Candidate Log (hardcoded).',
                    'Candidates > View Candidate > Actions becomes View Respondent Log.',
                    'Survey listing Settings stays View Candidate Log (hardcoded).',
                    'Survey badge stays REVIEW LOG.',
                    { label: 'Related (label only): View Respondent > Actions also becomes View Respondent Log. The action stays owned by View Candidate Log.', href: '../candidate-management/index.html#view-candidate-log' },
                    { label: 'Candidate Activities Search... has no Advanced Search.', href: '#search' }
                ],
                children: [
                    {
                        id: 'scheduled-by',
                        title: 'Scheduled By',
                        description: 'Filter the Candidate Activities listing by scheduler. Listing only, not on the per-candidate log table.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'Candidate Activities', 'Scheduled By filter']
                        ],
                        steps: [
                            'Select a Scheduled By option.'
                        ],
                        defaultedInputs: [
                            'My Scheduled Candidates'
                        ],
                        optionalInputs: [
                            'My Scheduled Candidates',
                            'All',
                            'Named scheduler display names'
                        ],
                        rules: [
                            'Listing only, not on the per-candidate log table.'
                        ]
                    },
                    {
                        id: 'view-candidate-activities',
                        title: 'View Candidate Activities',
                        description: 'Shows one candidate’s activity log. Page title stays Candidate Activities. Header shows candidate first name + last name, then account name.',
                        accessPaths: [
                            ['ACTIVITY LOGS', 'Candidate Activities', 'Row Actions', 'View Candidate Activities'],
                            ['Candidates', 'View Candidates', 'Settings', 'View Candidate Log']
                        ],
                        steps: [
                            'Open the candidate’s activity log.',
                            'Review Timestamp, Activity, Screenshot/Snapshot, and Device Used.',
                            { label: 'Optionally filter by Date Entered.', href: '#date-entered' },
                            { label: 'Optionally open More Information.', href: '#more-information' },
                            { label: 'Optionally open a snapshot with the view icon.', href: '#screenshot-snapshot' }
                        ],
                        links: [
                            { label: 'View Candidate Log', href: '../candidate-management/index.html#view-candidate-log' },
                            { label: 'Date Entered', href: '#date-entered' },
                            { label: 'More Information', href: '#more-information' },
                            { label: 'Screenshot/Snapshot', href: '#screenshot-snapshot' }
                        ],
                        items: [
                            'Timestamp (date M j, Y and time h:i:s A)',
                            'Activity',
                            'Screenshot/Snapshot',
                            'Device Used'
                        ],
                        groups: [
                            {
                                title: 'Candidates-side entry point destination',
                                items: [
                                    'Candidates > View Candidates > Settings > View Candidate Log opens the per-candidate log page with that candidate’s username and company.'
                                ]
                            },
                            {
                                title: 'Confirmed Activity labels',
                                items: [
                                    'Logged In',
                                    'Log in Failed',
                                    'Successful Login',
                                    'Login (Candidate Set Password)',
                                    'Logged Out',
                                    '{controller name} Assessment',
                                    'Privacy Consent',
                                    'Update Candidate Demographics',
                                    'View Candidate Demographics',
                                    'List Scheduled Assessment',
                                    'Captured Snapshot',
                                    'Captured Screenshot',
                                    'Save Device Specs',
                                    'Candidate Leave GoPick Window',
                                    'Return to GoPick Window',
                                    'Candidate Pressed Function Key',
                                    'Detected two (2) or more faces',
                                    "Time's up",
                                    'Finish {assessment name} Assessment',
                                    'Otherwise the action name, with index shown as list'
                                ]
                            }
                        ],
                        rules: [
                            'Visible when the user has modActivity-actionView.'
                        ],
                        expectedResults: [
                            'The candidate’s activity rows are listed with timestamp, activity label, optional snapshot, and device details.'
                        ],
                        children: [
                            {
                                id: 'more-information',
                                title: 'More Information',
                                description: 'Show extra fields for an activity row.',
                                steps: [
                                    'Select More Information.'
                                ],
                                items: [
                                    'Module:',
                                    'Controller:',
                                    'Action:'
                                ]
                            },
                            {
                                id: 'screenshot-snapshot',
                                title: 'Screenshot/Snapshot',
                                description: 'Open a snapshot from an activity row when one is present.',
                                steps: [
                                    'Select the view icon titled View Candidate Snapshots.',
                                    'Review the Candidate Snapshot modal.',
                                    'Select CLOSE.'
                                ],
                                items: [
                                    'View icon title: View Candidate Snapshots',
                                    'Modal title: Candidate Snapshot',
                                    'Close button: CLOSE'
                                ],
                                rules: [
                                    'A row may have no snapshot.'
                                ]
                            },
                            {
                                id: 'device-used',
                                title: 'Device Used',
                                description: 'Show captured device specs on an activity row.',
                                groups: [
                                    {
                                        title: 'When present',
                                        items: [
                                            'Browser Name:',
                                            'Browser Version:',
                                            'OS:',
                                            'Device: Mobile or PC',
                                            'Captured At:'
                                        ]
                                    },
                                    {
                                        title: 'When missing',
                                        items: [
                                            'No captured specs'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'candidate-activity-report-unavailable',
                                title: 'Candidate Activity Report Unavailable',
                                description: 'Not a menu item. Visible blocked page if the candidate log cannot load.',
                                items: [
                                    'Title: Candidate Activity Report Unavailable',
                                    'Message: The selected account cannot be loaded because its company setup is incomplete or no longer available. Please contact support.',
                                    'Issue Reference',
                                    'Selected Account ID',
                                    'Candidate Username',
                                    'What to Report: Send this issue reference to support.'
                                ],
                                rules: [
                                    'Back to Candidate Activities exists as a label but the return button is not shown.'
                                ],
                                notes: [
                                    'Support can investigate this using the issue reference shown above.',
                                    'QA / Dev: Super Admin users can see extra technical detail on this blocked page.'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    function createListItemContent(item) {
        if (item && item.href) {
            const link = document.createElement('a');
            link.href = item.href;
            link.className = 'font-semibold text-brand hover:text-brand-dark transition-colors';
            link.textContent = item.label || item.href;
            return link;
        }

        const text = document.createElement('span');
        text.textContent = item && item.label ? item.label : item;
        return text;
    }

    function createBulletList(items) {
        const list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'flex gap-2';

            const marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

            li.appendChild(marker);
            li.appendChild(createListItemContent(item));
            list.appendChild(li);
        });
        return list;
    }

    function createCallout(title, items, kind) {
        const wrap = document.createElement('div');
        const isRules = kind === 'rules';
        const isExpected = kind === 'expected';
        wrap.className = isRules
            ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
            : (isExpected
                ? 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5'
                : 'mt-5 rounded-lg border border-slate-100 bg-slate-50 p-5');

        const heading = document.createElement('h3');
        heading.className = isRules
            ? 'font-semibold text-amber-900 mb-3'
            : (isExpected ? 'font-semibold text-emerald-900 mb-3' : 'font-semibold text-slate-900 mb-3');
        heading.textContent = title;

        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
        return wrap;
    }

    function createLabeledList(title, items) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-5 rounded-lg border border-slate-100 bg-slate-50 p-5';

        const heading = document.createElement('h3');
        heading.className = 'font-semibold text-slate-900 mb-3';
        heading.textContent = title;
        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
        return wrap;
    }

    function renderAccessPaths(target, accessPaths) {
        const label = document.createElement('p');
        label.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
        label.textContent = 'Access Path';
        target.appendChild(label);

        accessPaths.forEach(function (pathParts) {
            const row = document.createElement('p');
            row.className = 'mt-1 mb-2 text-sm text-slate-600 leading-relaxed';
            pathParts.forEach(function (part, index) {
                if (index > 0) {
                    const separator = document.createElement('span');
                    separator.className = 'mx-1 text-slate-400';
                    separator.textContent = '>';
                    row.appendChild(separator);
                }

                const chip = document.createElement('span');
                chip.className = 'inline-block rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700';
                chip.textContent = part;
                row.appendChild(chip);
            });
            target.appendChild(row);
        });
    }

    function renderGroups(container, groups) {
        groups.forEach(function (group) {
            const wrap = document.createElement('div');
            wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';

            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = group.title;
            wrap.appendChild(heading);
            wrap.appendChild(createBulletList(group.items || []));
            container.appendChild(wrap);
        });
    }

    function renderSectionBody(section, target) {
        if (section.accessPaths && section.accessPaths.length) {
            renderAccessPaths(target, section.accessPaths);
        }

        if (section.links && section.links.length) {
            target.appendChild(createLabeledList('Available Actions', section.links));
        }

        if (section.items && section.items.length) {
            target.appendChild(createLabeledList('Visible Content', section.items));
        }

        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4 mt-5';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepLabel = document.createElement('p');
            stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
            stepLabel.textContent = 'How To Use';
            target.appendChild(stepLabel);
            const stepsList = createBulletList(section.steps);
            stepsList.classList.add('mt-3');
            target.appendChild(stepsList);
        }

        if (section.requiredInputs && section.requiredInputs.length) {
            target.appendChild(createLabeledList('Required Inputs', section.requiredInputs));
        }

        if (section.optionalInputs && section.optionalInputs.length) {
            target.appendChild(createLabeledList('Optional Inputs', section.optionalInputs));
        }

        if (section.conditionalInputs && section.conditionalInputs.length) {
            target.appendChild(createLabeledList('Conditional Inputs', section.conditionalInputs));
        }

        if (section.defaultedInputs && section.defaultedInputs.length) {
            target.appendChild(createLabeledList('Defaulted Inputs', section.defaultedInputs));
        }

        if (section.lockedInputs && section.lockedInputs.length) {
            target.appendChild(createLabeledList('Locked Inputs', section.lockedInputs));
        }

        if (section.rules && section.rules.length) {
            target.appendChild(createCallout('Rules', section.rules, 'rules'));
        }

        if (section.expectedResults && section.expectedResults.length) {
            target.appendChild(createCallout('Expected Result', section.expectedResults, 'expected'));
        }

        if (section.notes && section.notes.length) {
            target.appendChild(createCallout('Notes', section.notes, 'notes'));
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        if (eyebrowText) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = eyebrowText;
            fragment.appendChild(eyebrow);
        }

        const headingTag = headingLevel === 2 ? 'h2' : (headingLevel === 3 ? 'h3' : 'h4');
        const heading = document.createElement(headingTag);
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : (headingLevel === 3 ? 'text-lg font-bold text-slate-900' : 'text-base font-bold text-slate-900');
        heading.textContent = section.title;
        heading.setAttribute('tabindex', '-1');
        fragment.appendChild(heading);

        if (section.description) {
            const desc = document.createElement('p');
            desc.className = 'text-sm text-slate-500 mt-2 mb-5';
            desc.textContent = section.description;
            fragment.appendChild(desc);
        }

        return fragment;
    }

    function renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
        const sectionEl = document.createElement('section');
        sectionEl.className = isTopLevel ? 'mb-10' : 'mt-8 border-t border-slate-100 pt-6';
        sectionEl.appendChild(renderSectionHeader(section, headingLevel, eyebrowText));
        renderSectionBody(section, sectionEl);

        if (section.children && section.children.length) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderLegends(root) {
        if (!activityLogContent.legends || !activityLogContent.legends.length) return;

        const legendsWrap = document.createElement('div');
        legendsWrap.className = 'mb-8 rounded-lg border border-slate-100 bg-slate-50 p-5';

        const heading = document.createElement('h2');
        heading.className = 'font-semibold text-slate-900 mb-3';
        heading.textContent = 'Legends';
        legendsWrap.appendChild(heading);
        legendsWrap.appendChild(createBulletList(activityLogContent.legends));

        root.appendChild(legendsWrap);
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        renderLegends(root);

        if (activityLogContent.rules && activityLogContent.rules.length) {
            root.appendChild(createCallout('Rules', activityLogContent.rules, 'rules'));
        }

        if (activityLogContent.notes && activityLogContent.notes.length) {
            root.appendChild(createCallout('Notes', activityLogContent.notes, 'notes'));
        }

        activityLogContent.sections.forEach(function (section) {
            root.appendChild(renderSectionTree(section, 2, null, true));
        });
    }

    function getSidebarLinkClass(level) {
        var depth = Math.min(level, 5);
        var indentClasses = ['', ' pl-3 border-l border-slate-100', ' pl-6 border-l border-slate-100', ' pl-9 border-l border-slate-100', ' pl-12 border-l border-slate-100', ' pl-16 border-l border-slate-100'];
        var sizeClass = level === 0 ? ' text-sm' : (level < 3 ? ' text-[13px]' : ' text-xs');
        return 'block text-slate-600 hover:text-brand transition-colors py-1' + sizeClass + indentClasses[depth];
    }

    function createSidebarItem(section, level) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';

        var a = document.createElement('a');
        a.className = getSidebarLinkClass(level);
        a.href = '#' + section.id;
        a.dataset.target = section.id;
        a.textContent = section.title;
        li.appendChild(a);

        if (section.children && section.children.length) {
            var childList = document.createElement('ul');
            childList.className = 'sidebar-children hidden mt-1 space-y-1';
            section.children.forEach(function (child) {
                childList.appendChild(createSidebarItem(child, level + 1));
            });
            li.appendChild(childList);
        }

        return li;
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        activityLogContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('active', 'text-brand', 'font-semibold');

        var item = activeLink.closest('.sidebar-item');
        while (item) {
            var ownChildren = item.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');

            var parentList = item.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                item = parentList.closest('.sidebar-item');
            } else {
                item = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var links = Array.from(document.querySelectorAll('#docSidebarList a[data-target]'));
        var currentId = null;
        var offset = 120;

        links.forEach(function (link) {
            var target = document.getElementById(link.dataset.target);
            if (target && target.getBoundingClientRect().top <= offset) {
                currentId = link.dataset.target;
            }
        });

        return currentId || (links[0] && links[0].dataset.target);
    }

    function setupSidebarVisibility() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget() || (location.hash || '').replace('#', '');
            if (activeId) setSidebarBranch(activeId);
        }

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            link.addEventListener('click', function () {
                setSidebarBranch(this.dataset.target);
            });
        });

        updateFromScroll();
        window.addEventListener('hashchange', function () { setTimeout(updateFromScroll, 50); });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderAll() {
        renderSidebar();
        renderAllSections();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__activityLogContent = activityLogContent;
})(window);
