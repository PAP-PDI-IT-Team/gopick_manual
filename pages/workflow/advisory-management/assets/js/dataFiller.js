(function (global) {
    'use strict';

    var sections = [
        {
            id: 'about-the-advisory-module', title: 'About the Advisory Module',
            description: 'The Advisory module is GoPick\'s administrator-portal announcement feature. It is used for operational notices, system or policy updates, maintenance messages, and other information users need to see inside GoPick.',
            paragraphs: ['Visible pages usually use Announcement. Backend routes, code, database records, and technical documentation use Advisory. Both terms refer to the same feature.'],
            tables: [
                {
                    id: 'where-announcements-appear',
                    title: 'Where Announcements Appear',
                    columns: ['Location', 'What the user sees', 'Important condition'],
                    rows: [
                        ['Advisory > Search Announcement', 'Searchable My announcements and All announcements lists with status, dates, and permitted actions.', 'Requires modAdvisory-actionIndex.'],
                        ['View Advisory', 'One announcement\'s title, posting period, status, and content.', 'Requires modAdvisory-actionView and visibility authorization.'],
                        ['Dashboard Announcements', 'Up to two newest active, currently in-date announcements visible to the account hierarchy.', 'The direct detail link still requires view permission.'],
                        ['Global Advisory modal', 'Active, currently in-date announcements the user has not acknowledged.', 'This legacy modal currently does not apply the normal hierarchy filter.']
                    ]
                }
            ]
        },
        {
            id: 'how-advisory-access-works', title: 'How Advisory Access Works',
            description: 'Advisory access has two separate controls. Account type alone does not automatically grant the module.',
            orderedItemsTitle: 'Two Access Controls',
            orderedItems: [
                'Permission control: RBAC permissions decide whether a user may list, view, create, update, or delete announcements.',
                'Visibility control: Account hierarchy decides which announcement creators are visible to the current user.'
            ],
            notes: ['A user may have permission to open Search Announcement while All announcements remains limited to creators resolved from that user\'s account lineage.', 'Being able to see an announcement does not automatically allow update or delete.']
        },
        {
            id: 'who-can-create-announcements', title: 'Who Can Create Announcements',
            description: 'Creating an announcement requires modAdvisory-actionCreate. Deployed RBAC assignments remain authoritative.',
            tables: [
                {
                    id: 'announcement-creation-access',
                    title: 'Announcement Creation Access',
                    columns: ['User/account type', 'Creation access', 'What a new user should know'],
                    rows: [
                        ['Super Admin IT (super_admin)', 'Expected through default provisioning.', 'Normally has configured Advisory actions; confirm deployed RBAC records.'],
                        ['Administrator ASD (super_admin_asd)', 'Conditional.', 'Global visibility, but provisioning paths are inconsistent; confirm assigned permissions.'],
                        ['Distributor (distributor)', 'Permission required.', 'No source-confirmed default Distributor Advisory provisioning was found.'],
                        ['Sub-distributor (sub_distributor)', 'Permission required.', 'No source-confirmed default Sub-distributor Advisory provisioning was found.'],
                        ['Client Account (account)', 'Explicit permission required.', 'Default Account module allow-list omits Advisory.'],
                        ['Sub-account (sub_account)', 'Explicit permission required.', 'Default Sub-account module allow-list omits Advisory.'],
                        ['Self-registration (self_registration)', 'Explicit permission required.', 'Default Self-registration module allow-list omits Advisory.'],
                        ['HR Administrator (hr_account)', 'Explicit permission required.', 'Default HR Account allow-list omits Advisory; creator visibility has a known mapping gap.']
                    ],
                    notes: ['Administrator ASD is super_admin_asd and is a main super admin.', 'HR Administrator is hr_account and follows the non-super-admin visibility path.']
                }
            ],
            link: { label: 'View the detailed Advisory Module Access Matrix', href: '../../domain-governance/advisory/index.html#advisory-module-access-matrix' }
        },
        {
            id: 'who-can-see-announcements', title: 'Who Can See Announcements',
            description: 'An announcement normally flows downward only to viewers whose stored account lineage contains the creator account. Main super admins have global visibility.',
            code: 'Main Super Admins — global visibility\n\nDistributor\n└─ Sub-distributor\n   └─ Client Account\n      └─ Sub-account\n\nSelf-registration may be linked beneath a supported account level.\nHR Administrator is an associated user, not a separate hierarchy level.',
            tables: [
                {
                    id: 'beginner-advisory-visibility',
                    title: 'Beginner Advisory Visibility Guide',
                    columns: ['Announcement creator', 'Who normally sees it', 'Who normally does not see it'],
                    rows: [
                        ['Main Super Admin', 'Every hierarchy-aware viewer with required permission.', 'Users missing the required action permission.'],
                        ['Distributor', 'Itself and lower accounts whose stored lineage contains it.', 'Unrelated Distributor branches.'],
                        ['Sub-distributor', 'Itself and lower accounts whose stored lineage contains it.', 'Parent Distributor, siblings, and unrelated branches.'],
                        ['Client Account', 'Itself and lower accounts whose stored lineage contains it.', 'Parents, sibling clients, and unrelated branches.'],
                        ['Sub-account', 'Itself and linked lower accounts whose stored lineage contains it.', 'Parents, sibling Sub-accounts, and unrelated branches.'],
                        ['Self-registration', 'Itself when its creator user ID is resolved, plus main super admins.', 'Parents, siblings, and unrelated branches.'],
                        ['HR Administrator', 'Main super admins; other viewers depend on creator-user mapping.', 'Intended lineage may fail to resolve the HR creator.']
                    ]
                }
            ],
            groups: [{ id: 'simple-examples', title: 'Simple Examples', items: ['A Distributor announcement can flow down its own branch, but not to another Distributor branch.', 'A Client Account announcement can flow down its lineage; its Distributor parent does not automatically see it.', 'A Sub-account announcement can flow to itself and a correctly linked lower Self-registration; its Client parent and siblings do not automatically see it.', 'Main super admins can see all announcements, subject to controller permission.'] }],
            rules: ['Parents do not automatically see child-created announcements.', 'Sibling accounts and unrelated branches do not see one another.', 'Visibility depends on populated lineage fields and resolving the creator as an account-owner user.'],
            notes: ['The global unseen-Advisory modal is a known exception and currently does not apply this hierarchy.'],
            link: { label: 'View the detailed Advisory Visibility Matrix', href: '../../domain-governance/advisory/index.html#advisory-visibility-matrix' }
        },
        {
            id: 'announcement-lifecycle-at-a-glance', title: 'Announcement Lifecycle at a Glance',
            orderedItemsTitle: 'Lifecycle',
            orderedItems: [
                'An authorized user creates an announcement with a title, content, status, posting date, and expiration date.',
                'Active makes it eligible for delivery; Not active prevents Dashboard and global-modal delivery.',
                'The current date must be on or between the posting and expiration dates; both boundaries are included.',
                'The management list can still contain inactive, future, current, and expired records.',
                'The Dashboard shows at most the two newest active, currently in-date announcements visible under its hierarchy rules.',
                'The creator or a main super admin with required permission can update or permanently delete the announcement.'
            ],
            warnings: ['The global unseen-Advisory modal currently queries all active, in-date announcements without applying the normal hierarchy filter. Treat its audience as a known implementation gap.']
        },
        {
            id: 'create-announcement', title: 'Create Announcement',
            description: 'Creates an announcement with a title, rich-text content, status, posting date, and expiration date.',
            paths: [['Advisory', 'Create Announcement']],
            steps: ['Open Advisory.', 'Select Create Announcement.', 'Enter the title and content.', 'Select the status.', 'Select Date Start and Date End.', 'Select Save.'],
            groups: [
                { title: 'Required Inputs', items: ['Title', 'Content', 'Status', 'Date Start', 'Date End'] },
                { title: 'Defaulted Inputs', items: ['Date Start displays the current date.', 'Date End displays seven days after the current date.'] }
            ],
            rules: ['Access requires modAdvisory-actionCreate.', 'Status options are Active and Not active.', 'All five visible inputs are required.', 'Browser date controls have minimum dates, but server-side date-order validation is not implemented.'],
            results: ['The announcement is saved and View Advisory opens for the new record.']
        },
        {
            id: 'search-announcement', title: 'Search Announcement',
            description: 'Displays announcements available within the current user\'s visibility scope.',
            paths: [['Advisory', 'Search Announcement'], ['Dashboard', 'Announcement', 'View All Announcements']],
            groups: [{ title: 'Visible Content', items: ['Standard and advanced search', 'My announcements and All announcements tabs with counts', 'Title, posting date, expiration date, status, and row actions', 'Status filter and pagination'] }],
            steps: ['Open Search Announcement.', 'Select My announcements or All announcements.', 'Optionally apply standard search, advanced search, or a status filter.', 'Use pagination when needed.', 'Select an available row action.'],
            rules: ['Access requires modAdvisory-actionIndex.', 'My announcements is the default tab.', 'Standard search matches Title or Content.', 'Results are ordered by newest record ID first.', 'Actions depend on permission and record ownership.'],
            results: ['The table shows announcements matching the selected scope and filters.'],
            children: [
                { id: 'my-announcements', title: 'My announcements', paths: [['Advisory', 'Search Announcement', 'My announcements']], steps: ['Select My announcements.', 'Review the count and rows.'], rules: ['Only records created by the current user are included.', 'Missing or unsupported created_scope values resolve to this scope.'], results: ['The current user\'s announcements are listed.'] },
                { id: 'all-announcements', title: 'All announcements', paths: [['Advisory', 'Search Announcement', 'All announcements']], steps: ['Select All announcements.', 'Review the count and rows.'], rules: ['Main super admins can list all records.', 'Other users can list records created by their current-account owner, stored ancestor-account owners, and main super admins.', 'Visibility does not grant update or delete authority.'], results: ['Hierarchy-visible announcements are listed.'], link: { label: 'View the Advisory Visibility Matrix', href: '../../domain-governance/advisory/index.html#advisory-visibility-matrix' } },
                { id: 'standard-search', title: 'Standard Search', paths: [['Advisory', 'Search Announcement', 'Search']], steps: ['Enter search text.', 'Submit the search.'], results: ['Matching title or stored content rows remain.'] },
                { id: 'advanced-search', title: 'Advanced Search', paths: [['Advisory', 'Search Announcement', 'Advanced Search']], steps: ['Open Advanced Search.', 'Select Title or Content.', 'Select an operator and enter a value when required.', 'Run the search.'], groups: [{ id: 'available-operators', title: 'Available Operators', items: ['Begins with', 'Contains', 'Ends with', 'Equal', 'Not equal', 'Is empty', 'Is not empty', 'Is null', 'Is not null'] }], rules: ['Conditions use AND.', 'Grouped conditions are disabled.', 'Text matching attempts to ignore HTML tags for begins-with, contains, and ends-with content searches.'], results: ['The table opens with the advanced conditions applied.'] }
            ]
        },
        {
            id: 'announcement-row-actions', title: 'Announcement Row Actions',
            description: 'Opens, modifies, or removes an announcement when permission and ownership rules allow.',
            children: [
                { id: 'view-advisory', title: 'View Advisory', paths: [['Advisory', 'Search Announcement', 'Actions', 'View Advisory'], ['Dashboard', 'Announcement', 'Announcement title']], steps: ['Select the view icon or an available title.', 'Review the title, dates, status, and content.', 'Select Back.'], rules: ['Direct access requires modAdvisory-actionView.', 'Main super admins can view any record.', 'Other users require hierarchy-visible creator scope.'], results: ['View Advisory opens, or an access error is rendered.'] },
                { id: 'update-advisory', title: 'Update Advisory', paths: [['Advisory', 'Search Announcement', 'Actions', 'Update Advisory']], steps: ['Select the update icon.', 'Change the fields.', 'Select Save.'], rules: ['Access requires modAdvisory-actionUpdate.', 'Main super admins can update any record.', 'Other users can update only records they created.', 'Modification user and date/time are recorded.'], results: ['The update is saved, a success message is created, and View Advisory opens.'] },
                { id: 'delete-advisory', title: 'Delete Advisory', paths: [['Advisory', 'Search Announcement', 'Actions', 'Delete Advisory']], steps: ['Select the delete icon.', 'Confirm the deletion prompt.'], rules: ['Access requires modAdvisory-actionDelete.', 'Main super admins can delete any record.', 'Other users can delete only records they created.', 'Delete is permanent; there is no archive state.'], results: ['The record is removed and Search Announcement opens.'] }
            ]
        },
        {
            id: 'dashboard-announcement-preview', title: 'Dashboard Announcement Preview',
            description: 'Displays up to two current announcements on the Dashboard.',
            paths: [['Dashboard', 'Announcement']],
            steps: ['Review the displayed titles.', 'Select Preview to open content in a modal.', 'Select a title to open View Advisory when permitted.', 'Select View All Announcements when available.'],
            rules: ['Only Active announcements whose date range includes today are included.', 'At most two newest visible records are shown.', 'View All Announcements requires modAdvisory-actionIndex.', 'Management remains owned by modAdvisory.'],
            results: ['A preview opens on the Dashboard or the permitted Advisory detail page opens.']
        },
        {
            id: 'authenticated-staging-qa-checklist', title: 'Authenticated Staging QA Checklist',
            description: 'These checks remain runtime verification items until completed in an authenticated staging session.',
            steps: [
                'Verify every Advisory permission and its denied path.',
                'Create required-only and rich-text announcements and confirm date defaults.',
                'Test invalid and reversed dates.',
                'Verify both scope tabs, counts, search modes, status filtering, and pagination.',
                'Verify creator-only mutation and main-super-admin cross-branch authority.',
                'Verify descendant visibility and unrelated-branch denial.',
                'Verify posting-date and expiration-date boundaries.',
                'Verify Dashboard exclusion of inactive, future, and expired records and its two-record maximum.',
                'Verify global-modal acknowledgement and immediate redisplay behavior.'
            ],
            notes: ['Record user type, permissions, account ID, creator, dates, and observed result.', 'Log deviations in the Advisory Gap Registry.'],
            link: { label: 'Open Advisory Gap Registry', href: '../../../docs/known-gaps/advisory-gap-registry.md' }
        }
    ];

    function addHeading(parent, text, level) {
        var heading = document.createElement(level > 2 ? 'h3' : 'h2');
        heading.className = level > 2 ? 'text-lg font-bold text-slate-900' : 'text-2xl font-bold text-slate-900';
        heading.textContent = text;
        parent.appendChild(heading);
    }
    function addList(parent, title, items, ordered) {
        if (!items || !items.length) return;
        var wrap = document.createElement('div'); wrap.className = 'doc-detail';
        var label = document.createElement('h4'); label.className = 'text-sm font-bold text-slate-700 mb-2'; label.textContent = title; wrap.appendChild(label);
        var list = document.createElement(ordered ? 'ol' : 'ul'); list.className = (ordered ? 'list-decimal' : 'list-disc') + ' pl-5 space-y-1 text-sm text-slate-600';
        items.forEach(function (item) { var li = document.createElement('li'); li.textContent = item; list.appendChild(li); });
        wrap.appendChild(list); parent.appendChild(wrap);
    }
    function addPaths(parent, paths) {
        if (!paths) return;
        addList(parent, 'Access Path', paths.map(function (path) { return path.join(' > '); }), false);
    }
    function addCallout(parent, title, items, modifier) {
        if (!items || !items.length) return;
        var box = document.createElement('div'); box.className = 'doc-detail doc-callout' + (modifier ? ' doc-callout--' + modifier : '');
        var label = document.createElement('h4'); label.className = 'text-sm font-bold text-slate-800 mb-2'; label.textContent = title; box.appendChild(label);
        var list = document.createElement('ul'); list.className = 'list-disc pl-5 space-y-1 text-sm text-slate-600';
        items.forEach(function (item) { var li = document.createElement('li'); li.textContent = item; list.appendChild(li); }); box.appendChild(list); parent.appendChild(box);
    }
    function renderTable(tableData) {
        var section = document.createElement('section');
        section.id = tableData.id;
        section.className = 'workflow-table-section';
        var title = document.createElement('h3');
        title.className = 'text-lg font-bold text-slate-900 mb-3';
        title.textContent = tableData.title;
        section.appendChild(title);

        var wrapper = document.createElement('div');
        wrapper.className = 'workflow-table-wrap';
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', tableData.title);
        wrapper.setAttribute('tabindex', '0');
        var table = document.createElement('table');
        table.className = 'workflow-table';
        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        tableData.columns.forEach(function (column) {
            var th = document.createElement('th'); th.scope = 'col'; th.textContent = column; headerRow.appendChild(th);
        });
        thead.appendChild(headerRow); table.appendChild(thead);
        var tbody = document.createElement('tbody');
        tableData.rows.forEach(function (row) {
            var tr = document.createElement('tr');
            row.forEach(function (value, index) {
                var cell = document.createElement(index === 0 ? 'th' : 'td');
                if (index === 0) cell.scope = 'row';
                cell.textContent = value; tr.appendChild(cell);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody); wrapper.appendChild(table); section.appendChild(wrapper);
        if (tableData.notes) addCallout(section, 'Notes', tableData.notes, 'note');
        return section;
    }
    function renderSection(section, level) {
        var node = document.createElement('section'); node.id = section.id; node.className = 'doc-section';
        addHeading(node, section.title, level);
        if (section.description) { var p = document.createElement('p'); p.className = 'mt-2 text-sm leading-6 text-slate-600'; p.textContent = section.description; node.appendChild(p); }
        (section.paragraphs || []).forEach(function (text) { var p = document.createElement('p'); p.className = 'mt-3 text-sm leading-6 text-slate-600'; p.textContent = text; node.appendChild(p); });
        if (section.code) { var pre = document.createElement('pre'); pre.className = 'workflow-hierarchy-code'; pre.textContent = section.code; node.appendChild(pre); }
        (section.tables || []).forEach(function (tableData) { node.appendChild(renderTable(tableData)); });
        if (section.orderedItems) addList(node, section.orderedItemsTitle || 'Overview', section.orderedItems, true);
        addPaths(node, section.paths);
        if (section.steps) addList(node, 'How To Use', section.steps, true);
        (section.groups || []).forEach(function (group) {
            var groupWrap = document.createElement('div');
            if (group.id) groupWrap.id = group.id;
            addList(groupWrap, group.title, group.items, false);
            node.appendChild(groupWrap);
        });
        addCallout(node, 'Rules', section.rules);
        addCallout(node, 'Expected Result', section.results, 'result');
        addCallout(node, 'Notes', section.notes, 'note');
        addCallout(node, 'Warning', section.warnings, 'warning');
        if (section.link) { var a = document.createElement('a'); a.className = 'doc-link inline-block mt-4'; a.href = section.link.href; a.textContent = section.link.label; node.appendChild(a); }
        (section.children || []).forEach(function (child) { node.appendChild(renderSection(child, level + 1)); });
        return node;
    }

    function setActiveSidebarLink(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var links = Array.from(sidebar.querySelectorAll('a[data-target]'));
        links.forEach(function (link) {
            var isActive = link.dataset.target === activeId;
            link.classList.toggle('active', isActive);
            link.classList.toggle('text-brand', isActive);
            link.classList.toggle('font-semibold', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var links = Array.from(sidebar.querySelectorAll('a[data-target]'));
        var activeId = null;
        var activationOffset = 120;

        links.forEach(function (link) {
            var target = document.getElementById(link.dataset.target);
            if (target && target.getBoundingClientRect().top <= activationOffset) {
                activeId = link.dataset.target;
            }
        });

        return activeId || (links[0] && links[0].dataset.target) || null;
    }

    function getHashSidebarTarget() {
        var hashId = window.location.hash.replace(/^#/, '');
        if (!hashId) return null;

        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var matchingLink = Array.from(sidebar.querySelectorAll('a[data-target]')).find(function (link) {
            return link.dataset.target === hashId;
        });
        return matchingLink ? hashId : null;
    }

    function setupSidebarActiveState() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var animationFrameId = null;

        function updateFromScroll() {
            animationFrameId = null;
            var activeId = getVisibleSidebarTarget();
            if (activeId) setActiveSidebarLink(activeId);
        }

        function scheduleScrollUpdate() {
            if (animationFrameId !== null) return;
            animationFrameId = window.requestAnimationFrame(updateFromScroll);
        }

        function activateHashTarget() {
            var hashId = getHashSidebarTarget();
            if (hashId) {
                setActiveSidebarLink(hashId);
                return true;
            }
            updateFromScroll();
            return false;
        }

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            link.addEventListener('click', function () {
                setActiveSidebarLink(this.dataset.target);
            });
        });

        window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
        window.addEventListener('hashchange', function () {
            activateHashTarget();
            window.setTimeout(updateFromScroll, 50);
        });

        if (activateHashTarget()) {
            window.requestAnimationFrame(function () {
                var target = document.getElementById(getHashSidebarTarget());
                if (target) target.scrollIntoView();
            });
        }
    }

    function render() {
        var root = document.getElementById('section-render-root'); var sidebar = document.getElementById('docSidebarList');
        if (!root || !sidebar) return;
        sections.forEach(function (section) {
            root.appendChild(renderSection(section, 2));
            var li = document.createElement('li'); var a = document.createElement('a'); a.href = '#' + section.id; a.dataset.target = section.id; a.className = 'block text-slate-600 hover:text-brand transition-colors py-1'; a.textContent = section.title; li.appendChild(a); sidebar.appendChild(li);
        });
        setupSidebarActiveState();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
    global.advisoryWorkflowContent = { sections: sections };
})(window);
