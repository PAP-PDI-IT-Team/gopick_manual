(function (global) {
    'use strict';

    var sections = [
        {
            id: 'overview', title: 'Overview',
            paragraphs: ['modAdvisory stores and manages administrator-portal announcements. User pages generally say Announcement; PHP namespaces, routes, models, and the database table say Advisory.', 'This page records the checked-out implementation and does not define the desired overhaul.']
        },
        {
            id: 'data-contract', title: 'Data Contract',
            paragraphs: ['The ActiveRecord model maps to advisory_log.'],
            groups: [
                { title: 'Stored Fields', items: ['id — primary key', 'title — required announcement title', 'content — required rich-text content', 'is_displayed — 1 Active; 0 Not active', 'extras — seen-state JSON initialized as {"seen":[]}', 'created_by and created_date — creation audit values', 'modified_by and modified_date — update audit values', 'display_date_start — required posting date', 'display_date_end — required expiration date', 'accounts — historical schema field not represented by the current ActiveRecord model'] },
                { id: 'validation-contract', title: 'Validation Contract', items: ['Title, content, status, posting date, and expiration date are required.', 'Creator and modifier IDs are integers.', 'Audit dates are safe-assigned and extras must be a string.', 'Date format and date-order invariants are not implemented.'] }
            ]
        },
        {
            id: 'lifecycle-and-active-date-rules', title: 'Lifecycle and Active-Date Rules',
            items: ['Create assigns creator, creation date, and empty seen state.', 'Update assigns modifier and modification date.', 'Delete permanently removes the row.', 'Dashboard and modal delivery require is_displayed = 1.', 'Posting and expiration boundaries are inclusive.', 'The management list does not apply delivery-date filtering.']
        },
        {
            id: 'rbac-contract', title: 'RBAC Contract',
            tables: [
                {
                    id: 'permission-and-authorization-matrix',
                    title: 'Permission and Authorization Matrix',
                    columns: ['Permission', 'Capability', 'Additional authorization', 'Current implementation status'],
                    rows: [
                        ['modAdvisory-actionIndex', 'Open the list and expose the Dashboard View All link.', 'Created scope and hierarchy visibility still limit results.', 'Included in the configured Advisory action catalog.'],
                        ['modAdvisory-actionView', 'Open View Advisory.', 'Main super admin, or creator must be in the resolved visible-creator list.', 'Included in the configured Advisory action catalog.'],
                        ['modAdvisory-actionCreate', 'Create and save an announcement.', 'No creator-scope check beyond authenticated permission.', 'Included in the configured Advisory action catalog.'],
                        ['modAdvisory-actionUpdate', 'Update an announcement.', 'Main super admin, or authenticated user must be the creator.', 'Included in the configured Advisory action catalog.'],
                        ['modAdvisory-actionDelete', 'Permanently delete an announcement.', 'Main super admin, or authenticated user must be the creator.', 'Included in the configured Advisory action catalog.'],
                        ['modAdvisory-actionSend', 'Enter the send action.', 'Permission check only before render.', 'Action exists, but catalog permission, view, and confirmed UI consumer are absent.']
                    ]
                },
                {
                    id: 'advisory-module-access-matrix',
                    title: 'Advisory Module Access Matrix',
                    columns: ['User/account type', 'Hierarchy visibility when authorized', 'Default-role evidence', 'Module-access conclusion'],
                    rows: [
                        ['Super Admin IT (super_admin)', 'Global; hierarchy filtering is bypassed.', 'Default builder adds every configured Advisory action; sidebar permission is also bypassed.', 'Expected by default; confirm deployed RBAC records.'],
                        ['Administrator ASD (super_admin_asd)', 'Global; hierarchy filtering is bypassed.', 'Provisioning paths are inconsistent: one builder can add all actions while a separate ASD allow-list omits modAdvisory.', 'Conditional; confirm assigned role and deployed permissions.'],
                        ['Distributor (distributor)', 'Creator account and stored descendant lineages.', 'No source-confirmed default Distributor provisioning for modAdvisory was found.', 'Requires explicit/deployed RBAC confirmation.'],
                        ['Sub-distributor (sub_distributor)', 'Creator account and stored descendant lineages.', 'No source-confirmed default Sub-distributor provisioning for modAdvisory was found.', 'Requires explicit/deployed RBAC confirmation.'],
                        ['Client Account (account)', 'Creator account and stored descendant lineages.', 'Default Account allow-list omits modAdvisory.', 'Requires an explicitly assigned role/permission.'],
                        ['Sub-account (sub_account)', 'Creator account and stored descendant lineages.', 'Default Sub-account allow-list omits modAdvisory.', 'Requires an explicitly assigned role/permission.'],
                        ['Self-registration (self_registration)', 'Own resolved creator; normally no lower descendants.', 'Default Self-registration allow-list omits modAdvisory.', 'Requires an explicitly assigned role/permission.'],
                        ['HR Administrator (hr_account)', 'Non-super-admin path; creator mapping may fail.', 'Default HR Account allow-list omits modAdvisory.', 'Explicit permission and creator mapping require runtime confirmation.']
                    ],
                    notes: ['Account type alone does not grant Advisory access.', 'Controller RBAC checks remain authoritative even when special sidebar logic displays a menu.']
                }
            ],
            notes: ['RBAC assignments are database-controlled. User or account type alone does not grant these permissions.']
        },
        {
            id: 'account-hierarchy-visibility', title: 'Account Hierarchy Visibility',
            paragraphs: ['Main super admins (super_admin and super_admin_asd) bypass hierarchy filtering. Other users are resolved from the current account stored in $_SESSION[account_id].'],
            code: 'current account row\n  -> id + main_account_id + group_account_id + account_id + sub_account_id\n  -> keep positive unique account IDs\n  -> resolve accounts.user_id values\n  -> add main-super-admin user IDs\n  -> visible advisory creator IDs',
            tables: [
                {
                    id: 'advisory-visibility-matrix',
                    title: 'Advisory Visibility Matrix',
                    columns: ['Announcement creator', 'Expected viewers in All announcements', 'Excluded viewers', 'Conditions and cautions'],
                    rows: [
                        ['Super Admin IT / Administrator ASD', 'All hierarchy-aware viewers with valid account context, plus main super admins.', 'Users without required list/view RBAC permission.', 'Main-super-admin user IDs are always added to the resolved creator list.'],
                        ['Distributor', 'Own account and lower accounts whose stored lineage contains its account ID; main super admins.', 'Parent, unrelated distributors, and other branches.', 'Creator must be the accounts.user_id owner resolved for the Distributor.'],
                        ['Sub-distributor', 'Own account and lower accounts whose stored lineage contains its account ID; main super admins.', 'Distributor parent, sibling Sub-distributors, unrelated branches, and lineages that omit it.', 'Depends on populated lineage columns in each viewer account row.'],
                        ['Client Account', 'Own account and lower accounts whose stored lineage contains its account ID; main super admins.', 'Distributor/Sub-distributor parents, sibling clients, and unrelated branches.', 'A parent does not resolve child creator IDs from its own row.'],
                        ['Sub-account', 'Own account and lower accounts whose stored lineage contains its account ID; main super admins.', 'Client/Distributor parents, sibling Sub-accounts, and unrelated branches.', 'Lower visibility commonly uses Self-registration rows linked through sub_account_id.'],
                        ['Self-registration', 'Itself when its user ID is resolved from the current account row; main super admins.', 'Parent accounts, siblings, and unrelated branches.', 'No normal descendant level; default module allow-list omits Advisory.'],
                        ['HR Administrator', 'Main super admins; otherwise conditional on account-owner resolution returning the HR creator ID.', 'Potentially itself and intended lineage when it is not an accounts.user_id owner.', 'Documented mapping gap; runtime fixtures are required.']
                    ],
                    notes: ['Visibility flows creator-to-descendant only when the creator account ID is stored in the viewer lineage.', 'Parents do not automatically see child-created announcements; siblings and unrelated branches do not see one another.', 'The global unseen-Advisory modal is an exception and does not apply this matrix.']
                }
            ],
            groups: [
                { id: 'main-super-admin-scope', title: 'Main Super Admin Scope', items: ['Configured user types are super_admin and super_admin_asd.', 'These users bypass hierarchy filtering.'] },
                { id: 'non-super-admin-scope', title: 'Non-Super-Admin Scope', items: ['Current and stored ancestor account IDs resolve to account-owner user IDs.', 'Main-super-admin user IDs are added to the visible creator list.'] },
                { id: 'created-scopes', title: 'Created Scopes', items: ['My announcements adds created_by = current user ID.', 'All announcements retains the full visible creator list.', 'Missing or unsupported scopes resolve to My announcements.', 'Main super admins still see only their own records on My announcements.'] },
                { title: 'Important Boundary', items: ['Resolution uses flattened lineage columns from one account row.', 'It does not recursively traverse the account tree.', 'Visibility is creator-user based, not stored target-account based.'] }
            ]
        },
        {
            id: 'mutation-governance', title: 'Mutation Governance',
            items: ['Update and delete require their RBAC permission and mutation-service approval.', 'Main super admins may mutate any Advisory.', 'Other users may mutate only records whose created_by equals their authenticated user ID.', 'Hierarchy visibility does not grant mutation authority.']
        },
        {
            id: 'search-and-index-governance', title: 'Search and Index Governance',
            items: ['Default ordering is descending ID.', 'Standard search OR-matches title and content.', 'active maps to status 1; other non-empty status values map to 0.', 'Advanced search maps supported operators to Yii query conditions.', 'The UI exposes string operators for title and content using AND without groups.', 'Tab counts run separate mine and visible searches.']
        },
        {
            id: 'method-reference', title: 'Method Reference',
            description: 'Function-level coverage is intentionally limited to active code inside backend/modules/modAdvisory.',
            anchors: ['module-and-controllers', 'models', 'services', 'repository'],
            groups: [
                { id: 'backend-modules-modadvisory-advisory', title: 'Module: Advisory', items: ['init() — initializes the Yii module without feature-specific setup.'] },
                { id: 'advisorycontroller', title: 'Controller: AdvisoryController', items: ['init() — creates and exports a CSP nonce.', 'behaviors() — POST-only delete and shared rate limiter.', 'actionIndex() — RBAC check, index context, list render.', 'actionView($id) — RBAC check, model lookup, hierarchy authorization, detail render.', 'actionCreate() — RBAC check, audit/seen initialization, load, save, redirect.', 'actionUpdate($id) — RBAC and mutation checks, modification audit, save, redirect.', 'actionDelete($id) — RBAC and mutation checks, hard delete, redirect.', 'actionSend($id) — RBAC check and attempted missing send-view render.', 'findModel($id) — primary-key lookup with unstable catch-and-render behavior.'] },
                { id: 'advisory', title: 'Model: Advisory', items: ['tableName() — advisory_log.', 'rules() — required/string/integer/safe fields.', 'attributeLabels() — UI label map.'] },
                { id: 'advisorysearch', title: 'Model: AdvisorySearch', items: ['rules() — list-filter attributes.', 'scenarios() — base Yii scenarios.', 'search($params) — user context, visibility query, created scope, grid filters, searches, status, sorting, and provider.', 'applySearchFilter($query, $postData) — advanced operator mapping and query modification.'] },
                { id: 'advisoryindexpageservice', title: 'Service: AdvisoryIndexPageService', items: ['buildIndexPageContext() — search model, provider, scope tabs/counts, and action callbacks.', 'Private helpers resolve scope/status, counts, row-button authorization, and main-super-admin configuration.'] },
                { id: 'advisorymutationpermissionservice', title: 'Service: AdvisoryMutationPermissionService', items: ['canMutateAdvisory() — main-super-admin or creator decision; invalid context exceptions.', 'assertCanMutateAdvisory() — forbidden exception on denial.'] },
                { id: 'advisoryviewpermissionservice', title: 'Service: AdvisoryViewPermissionService', items: ['findTopDownCreatorUserIdList() — flattened lineage owner IDs plus main-super-admin IDs.', 'assertCanViewAdvisory() — main-super-admin or visible-creator authorization.', 'Invalid context and missing account inputs produce InvalidArgumentException.'] },
                { id: 'advisoryvisibilityrepository', title: 'Repository: AdvisoryVisibilityRepository', items: ['findAccountRowById() — one account hierarchy row or null.', 'findUserIdListByAccountIdList() — non-null owner user IDs.', 'findMainSuperAdminUserIdList() — IDs matching configured user types.'] }
            ]
        },
        {
            id: 'integration-boundaries', title: 'Integration Boundaries',
            groups: [
                { id: 'dashboard', title: 'Dashboard', items: ['Uses its own service/repository.', 'Applies comparable flattened lineage visibility.', 'Filters active, currently in-date records and returns at most two newest IDs.'] },
                { id: 'global-unseen-advisory-modal', title: 'Global Unseen-Advisory Modal', items: ['Backend layouts query active, currently in-date records.', 'extras.seen controls acknowledgement.', 'The layout path does not share modAdvisory visibility services.'] }
            ]
        },
        {
            id: 'related-documentation', title: 'Related Documentation',
            links: [
                { label: 'Advisory Management Workflow', href: '../../workflow/advisory-management/index.html' },
                { label: 'Advisory Gap Registry', href: '../../../docs/known-gaps/advisory-gap-registry.md' }
            ]
        }
    ];

    function addList(parent, items) {
        if (!items || !items.length) return;
        var list = document.createElement('ul'); list.className = 'mt-3 list-disc pl-5 space-y-1 text-sm leading-6 text-slate-600';
        items.forEach(function (item) { var li = document.createElement('li'); li.textContent = item; list.appendChild(li); }); parent.appendChild(list);
    }
    function renderTable(tableData) {
        var section = document.createElement('section');
        section.id = tableData.id;
        section.className = 'governance-table-section';

        var title = document.createElement('h3');
        title.className = 'text-lg font-bold text-slate-900 mb-3';
        title.textContent = tableData.title;
        section.appendChild(title);

        var wrapper = document.createElement('div');
        wrapper.className = 'governance-table-wrap';
        wrapper.setAttribute('role', 'region');
        wrapper.setAttribute('aria-label', tableData.title);
        wrapper.setAttribute('tabindex', '0');

        var table = document.createElement('table');
        table.className = 'governance-table';
        var thead = document.createElement('thead');
        var headerRow = document.createElement('tr');
        tableData.columns.forEach(function (column) {
            var th = document.createElement('th');
            th.scope = 'col';
            th.textContent = column;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        var tbody = document.createElement('tbody');
        tableData.rows.forEach(function (row) {
            var tr = document.createElement('tr');
            row.forEach(function (value, index) {
                var cell = document.createElement(index === 0 ? 'th' : 'td');
                if (index === 0) cell.scope = 'row';
                cell.textContent = value;
                tr.appendChild(cell);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        wrapper.appendChild(table);
        section.appendChild(wrapper);

        if (tableData.notes) {
            var note = document.createElement('div');
            note.className = 'governance-table-note';
            var noteTitle = document.createElement('h4');
            noteTitle.className = 'text-sm font-bold text-slate-800';
            noteTitle.textContent = 'Notes';
            note.appendChild(noteTitle);
            addList(note, tableData.notes);
            section.appendChild(note);
        }
        return section;
    }
    function renderSection(section) {
        var node = document.createElement('section'); node.id = section.id; node.className = 'governance-section';
        var title = document.createElement('h2'); title.className = 'text-2xl font-bold text-slate-900'; title.textContent = section.title; node.appendChild(title);
        if (section.description) { var d = document.createElement('p'); d.className = 'mt-2 text-sm text-slate-500'; d.textContent = section.description; node.appendChild(d); }
        (section.paragraphs || []).forEach(function (text) { var p = document.createElement('p'); p.className = 'mt-3 text-sm leading-6 text-slate-600'; p.textContent = text; node.appendChild(p); });
        if (section.code) { var pre = document.createElement('pre'); pre.className = 'governance-code'; pre.textContent = section.code; node.appendChild(pre); }
        addList(node, section.items);
        (section.tables || []).forEach(function (tableData) { node.appendChild(renderTable(tableData)); });
        (section.anchors || []).forEach(function (id) { var anchor = document.createElement('span'); anchor.id = id; anchor.className = 'block'; node.appendChild(anchor); });
        (section.groups || []).forEach(function (group) { var box = document.createElement('div'); box.className = 'governance-group'; if (group.id) box.id = group.id; var h = document.createElement('h3'); h.className = 'text-base font-bold text-slate-900'; h.textContent = group.title; box.appendChild(h); addList(box, group.items); node.appendChild(box); });
        if (section.notes) { var note = document.createElement('div'); note.className = 'governance-group border-amber-200 bg-amber-50'; var nh = document.createElement('h3'); nh.className = 'text-sm font-bold text-slate-800'; nh.textContent = 'Notes'; note.appendChild(nh); addList(note, section.notes); node.appendChild(note); }
        if (section.links) { var links = document.createElement('ul'); links.className = 'mt-4 space-y-2'; section.links.forEach(function (link) { var li = document.createElement('li'); var a = document.createElement('a'); a.className = 'governance-link'; a.href = link.href; a.textContent = link.label; li.appendChild(a); links.appendChild(li); }); node.appendChild(links); }
        return node;
    }
    function render() {
        var root = document.getElementById('section-render-root'); var sidebar = document.getElementById('docSidebarList'); if (!root || !sidebar) return;
        sections.forEach(function (section) { root.appendChild(renderSection(section)); var li = document.createElement('li'); var a = document.createElement('a'); a.href = '#' + section.id; a.dataset.target = section.id; a.className = 'block text-slate-600 hover:text-brand transition-colors py-1'; a.textContent = section.title; li.appendChild(a); sidebar.appendChild(li); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
    global.advisoryGovernanceContent = { sections: sections };
})(window);
