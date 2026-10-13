(function (global) {
    'use strict';

    const governanceContent = {
        title: 'Meters Governance',
        tldr: [
            'Meter is a hierarchy-governed operational credit used at assessment completion time.',
            'Deduction happens once per candidate per assessment on initial assessment completion only.',
            'Requests require approval; transfers are immediate and do not require approval.',
            'Negative balances are not allowed; operations are blocked when result is < 0.',
            'Standard accounts are hierarchy-scoped; cross-branch operations are Super Admin-only.',
            'Logs are system-generated, hierarchy-visible, and remain visible for archived/deactivated accounts.'
        ],
        sections: [
            {
                id: 'governance-foundations',
                title: 'Governance Foundations',
                description: 'Core governance model and hierarchy baseline for meter behavior.',
                children: [
                    {
                        id: 'overview',
                        title: 'Overview',
                        description: 'The Meter system manages operational credit balances used for assessment-related assessment completion and behaves as a hierarchy-governed operational credit and audit system.',
                        rules: [
                            'Visibility is hierarchy-based.',
                            'Transfer authority is hierarchy-based.',
                            'Request authority is hierarchy-based.',
                            'Consumption responsibility is hierarchy-based.'
                        ]
                    },
                    {
                        id: 'hierarchy-structure',
                        title: 'Hierarchy Structure',
                        hierarchyLevels: [
                            { name: 'Super Admin (IT)', level: 0, dotColor: 'bg-brand' },
                            { name: 'Super Admin (ASD)', level: 0, dotColor: 'bg-brand' },
                            { name: 'Distributor', level: 1, dotColor: 'bg-violet-500' },
                            { name: 'Administrator', level: 2, dotColor: 'bg-violet-500' },
                            { name: 'Sub Distributor', level: 2, dotColor: 'bg-orange-500' },
                            { name: 'Administrator', level: 3, dotColor: 'bg-orange-500' },
                            { name: 'Client Account', level: 3, dotColor: 'bg-lime-500' },
                            { name: 'Administrator', level: 4, dotColor: 'bg-lime-500' },
                            { name: 'Self Registered', level: 4, dotColor: 'bg-lime-500' },
                            { name: 'Sub-Account', level: 4, dotColor: 'bg-sky-300' },
                            { name: 'Administrator', level: 5, dotColor: 'bg-sky-300' },
                            { name: 'Self Registered', level: 5, dotColor: 'bg-sky-300' }
                        ],
                        rules: [
                            'Higher hierarchy accounts have wider visibility and operational authority.',
                            'Higher hierarchy accounts have wider request approval and transfer scope.',
                            'Higher hierarchy accounts have wider report and meter log visibility.'
                        ]
                    },
                    {
                        id: 'meter-definition',
                        title: 'Meter Definition',
                        groups: [
                            {
                                title: 'Meters Are Consumed During',
                                items: ['Report generation']
                            },
                            {
                                title: 'Meters Are Not Consumed During',
                                items: ['Report viewing', 'Report downloading', 'Report emailing', 'Revisiting generated reports']
                            }
                        ],
                        expectedResults: ['Generated reports remain permanently accessible after creation.']
                    },
                    {
                        id: 'lifecycle-states',
                        title: 'Lifecycle States',
                        groups: [
                            { title: 'Account States', items: ['Expired', 'Deactivated', 'Archived', 'Deleted'] }
                        ]
                    }
                ]
            },
            {
                id: 'consumption-governance',
                title: 'Consumption Governance',
                description: 'Rules governing when, where, and how meter consumption occurs.',
                children: [
                    {
                        id: 'meter-consumption',
                        title: 'Meter Consumption',
                        children: [
                            {
                                id: 'consumption-trigger',
                                title: 'Consumption Trigger',
                                rules: [
                                    'Meter deduction occurs during initial assessment completion.',
                                    'Consumption occurs once per candidate per assessment.'
                                ]
                            },
                            {
                                id: 'consumption-ownership',
                                title: 'Consumption Ownership',
                                rules: ['Candidates consume meters from their owning/managing account.'],
                                groups: [
                                    {
                                        title: 'Accounts That May Own Candidates',
                                        items: ['Sub Distributor', 'Client Account', 'Sub-Account', 'Self Registered']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 'generated-reports',
                        title: 'Generated Reports',
                        rules: [
                            'Generated reports remain permanently accessible.',
                            'Generated reports may be revisited repeatedly.',
                            'Generated reports may be downloaded and emailed multiple times without additional confirmed deduction.',
                            'Higher hierarchy accounts may access descendant reports.'
                        ]
                    },
                    {
                        id: 'consumption-types',
                        title: 'Consumption Types',
                        children: [
                            {
                                id: 'self-consumption',
                                title: 'Self Consumption',
                                rules: ['Consumes meters from own balance.']
                            },
                            {
                                id: 'parent-consumption',
                                title: 'Parent Consumption',
                                rules: [
                                    'Consumes meters using parent-related balance behavior.',
                                    'Observed behavior: some operations still validate local balance.'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'consumption-type-changes',
                        title: 'Consumption Type Changes',
                        children: [
                            {
                                id: 'self-to-parent',
                                title: 'Self to Parent',
                                rules: ['Existing meter balance is returned to the account performing the change.']
                            },
                            {
                                id: 'parent-to-self',
                                title: 'Parent to Self',
                                rules: ['Meter balance is deducted from the account performing the change.']
                            }
                        ]
                    }
                ]
            },
            {
                id: 'operations-governance',
                title: 'Operations Governance',
                description: 'Rules for request, transfer, visibility, and administrative meter operations.',
                children: [
                    {
                        id: 'meter-requests',
                        title: 'Meter Requests',
                        rules: [
                            'Lower hierarchy accounts may request meters from higher hierarchy accounts.',
                            'Higher hierarchy accounts may approve descendant account requests.'
                        ],
                        children: [
                            {
                                id: 'request-actions',
                                title: 'Request Actions',
                                groups: [
                                    { title: 'Supported', items: ['Approve', 'Reject', 'Cancel'] },
                                    { title: 'Not Supported', items: ['Edit after creation', 'Partial approval'] }
                                ]
                            },
                            {
                                id: 'request-approval',
                                title: 'Request Approval',
                                rules: ['Approving a request deducts meter balance from the approving account.', 'Super Admins are exempt from meter deduction.']
                            },
                            {
                                id: 'request-cancellation',
                                title: 'Request Cancellation',
                                rules: ['Requests may be cancelled by requestor or higher hierarchy accounts.', 'Cancelled requests remain visible historically.']
                            }
                        ]
                    },
                    {
                        id: 'meter-transfers',
                        title: 'Meter Transfers',
                        rules: ['Transfers move balances immediately.', 'Transfers do not require approval.'],
                        children: [
                            {
                                id: 'transfer-scope',
                                title: 'Transfer Scope',
                                groups: [
                                    { title: 'Standard Accounts May', items: ['Transfer downward', 'Transfer to descendant accounts', 'Transfer to self'] },
                                    { title: 'Standard Accounts Cannot', items: ['Transfer upward', 'Transfer cross-branch', 'Transfer to unrelated same-level accounts'] }
                                ]
                            },
                            {
                                id: 'super-admin-transfer-scope',
                                title: 'Super Admin Transfer Scope',
                                rules: ['Super Admins may transfer across all hierarchy branches and to any account.']
                            }
                        ]
                    },
                    {
                        id: 'meter-visibility',
                        title: 'Meter Visibility',
                        children: [
                            {
                                id: 'meter-logs',
                                title: 'Meter Logs',
                                rules: ['Accounts may view their own meter logs.', 'Higher hierarchy accounts may view descendant account logs.', 'Visibility follows hierarchy lineage.']
                            },
                            {
                                id: 'reports-visibility',
                                title: 'Reports',
                                rules: ['Higher hierarchy accounts may view descendant reports.', 'Cross-branch visibility is restricted unless Super Admin.']
                            }
                        ]
                    },
                    {
                        id: 'administrative-meter-operations',
                        title: 'Administrative Meter Operations',
                        rules: ['Higher hierarchy accounts may add or deduct meters.', 'Balance movement affects the account performing the update.']
                    }
                ]
            },
            {
                id: 'integrity-and-exceptions',
                title: 'Integrity and Exceptions',
                description: 'System integrity constraints, elevated-role behavior, exceptions, and unresolved domain gaps.',
                children: [
                    {
                        id: 'negative-balance-enforcement',
                        title: 'Negative Balance Enforcement',
                        rules: [
                            'Negative balances are not allowed.',
                            'Operations are blocked if resulting balance becomes < 0.',
                            'Applies to transfers, deductions, account creation, meter updates, consumption type changes, and assessment completion consumption.'
                        ]
                    },
                    {
                        id: 'super-admin-governance',
                        title: 'Super Admin Governance',
                        groups: [
                            { title: 'Super Admins', items: ['Are not meter-deducted', 'May create all account types', 'May transfer across all branches', 'May access all accounts', 'May access all reports', 'May access all logs'] },
                            { title: 'Still Restricted', items: ['Cannot perform operations causing balance < 0'] }
                        ]
                    },
                    {
                        id: 'self-registered-governance',
                        title: 'Self Registered Governance',
                        rules: ['Self Registered acts as both account and candidate.'],
                        groups: [
                            { title: 'Characteristics', items: ['Can own meters', 'Can receive transfers', 'Can consume meters', 'Cannot request meters', 'Cannot access admin-side pages'] }
                        ]
                    },
                    {
                        id: 'historical-log-governance',
                        title: 'Historical Log Governance',
                        rules: [
                            'Logs are system-generated, operationally persistent, and hierarchy-visible.',
                            'Archived and deactivated account logs remain historically visible.'
                        ]
                    },
                    {
                        id: 'newly-discovered-actor-target-governance',
                        title: 'Newly Discovered Actor and Target Governance',
                        rules: [
                            'Actor must be the logged-in user at action time.',
                            'Actor must not be inferred from parent account relationship.',
                            'Logging must use explicit actor username from authenticated session context.',
                            'No hidden fallback actor resolution is allowed.'
                        ],
                        groups: [
                            {
                                title: 'Settings-Changed Behavior Expectations',
                                items: [
                                    'Account creation logs: (Target View) Initial Meters; (Actor View) Moved to Newly Created Account: <target_user_name>.',
                                    'Meter type update logs: (Target View) Meter Type Update (switched to self/parent deduction) by: <actor_user_name>; (Actor/Parent View) Meter Type Update (switched to self/parent deduction): <target_user_name>.',
                                    'Meter balance update logs: (Target View) Meter Balance Update by: <actor_user_name>; (Parent View) Meter Balance Updated: <target_user_name>.',
                                    'Request-approved logs: (Target View) Received from <actor_user_name>; (Actor View) Sent to <target_user_name>.'
                                ]
                            },
                            {
                                title: 'Balance Movement Expectations',
                                items: [
                                    'Create account: Parent deduction with allocated 0 -> Addition=0, Deduction=0.',
                                    'Create account: Self deduction with allocated n > 0 -> Addition=n, Deduction=0.',
                                    'Meter type switched to self deduction -> Target Addition=n, Actor Deduction=n.',
                                    'Meter type switched to parent deduction -> Target Deduction=n, Actor Addition=n.',
                                    'Manual meter balance deduction -> Actor Addition=n, Target Deduction=n.',
                                    'Manual meter balance addition -> Actor Deduction=n, Target Addition=n.'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'resolution-paths-matrix',
                        title: 'Resolution Paths Matrix',
                        description: 'User guide matrix table for traceability, answering how to identify, understand, and use the Meter log information table as a logger across transaction types, entity states, and SHOW_ERROR diagnostic modes.',
                        matrix: [
                            {
                                id: 1,
                                type: 'Type 7: Moved to Created Account',
                                typeCategory: 'type7',
                                targetState: 'Found in Storage 1 (accounts.id)',
                                actorState: 'Found in Storage 2 (users.id)',
                                targetProd: 'Acme Branch',
                                targetDebug: 'Acme Branch',
                                remarksProd: 'Moved to Newly Created Account: Acme Branch',
                                remarksDebug: 'Moved to Newly Created Account: Acme Branch'
                            },
                            {
                                id: 2,
                                type: 'Type 7: Moved to Created Account',
                                typeCategory: 'type7',
                                targetState: 'Found in Storage 2 (users.id → accounts.user_id)',
                                actorState: 'Found in Storage 2 (users.id)',
                                targetProd: 'Acme Branch',
                                targetDebug: 'Acme Branch',
                                remarksProd: 'Moved to Newly Created Account: Acme Branch',
                                remarksDebug: 'Moved to Newly Created Account: Acme Branch'
                            },
                            {
                                id: 3,
                                type: 'Type 7: Moved to Created Account',
                                typeCategory: 'type7',
                                targetState: 'Missing in Both (Target #105 deleted)',
                                actorState: 'Found in Storage 2 (users.id = 2)',
                                targetProd: '[ ⊘ Deleted Account #105 ]',
                                targetDebug: 'Error: Target lookup failed\n• Target: accounts=MISS | users=MISS\n• Actor: users=FOUND ("admin")',
                                remarksProd: '⚠ Account #105 has been deleted.\n(Moved meters to newly created account)',
                                remarksDebug: 'Error: Target missing\n• Target: accounts=MISS | users=MISS\n• Actor: users=FOUND ("admin")'
                            },
                            {
                                id: 4,
                                type: 'Type 7: Moved to Created Account',
                                typeCategory: 'type7',
                                targetState: 'Found in Storage 1 (accounts.id = 105)',
                                actorState: 'Missing in Both (Actor #2 deleted)',
                                targetProd: 'Acme Branch',
                                targetDebug: 'Acme Branch',
                                remarksProd: 'Moved to Newly Created Account: Acme Branch\n(by Deleted User #2)',
                                remarksDebug: 'Moved to Newly Created Account: Acme Branch\n• Actor: accounts=MISS | users=MISS (DELETED)'
                            },
                            {
                                id: 5,
                                type: 'Type 7: Moved to Created Account',
                                typeCategory: 'type7',
                                targetState: 'Missing in Both (Target #105 deleted)',
                                actorState: 'Missing in Both (Actor #2 deleted)',
                                targetProd: '[ ⊘ Deleted Account #105 ]',
                                targetDebug: 'Error: Target & Actor missing\n• Target: MISS | MISS\n• Actor: MISS | MISS',
                                remarksProd: '⚠ Account #105 has been deleted.\n(Actor #2 also deleted)',
                                remarksDebug: 'Error: Both entities missing\n• Target: MISS | MISS\n• Actor: MISS | MISS'
                            },
                            {
                                id: 6,
                                type: 'Type 7: Legacy Alignment Row (FixMeter)',
                                typeCategory: 'type7',
                                targetState: 'NULL / Not Set (transfer_to_account_id = null)',
                                actorState: 'Found in Storage 2 (users.id = 2)',
                                targetProd: '(not set)',
                                targetDebug: 'Diagnostic Notice:\n• Subject: accounts.id=79 [FOUND]\n• Actor: users.id=2 [FOUND]\n• Target: NOT_SPECIFIED (legacy null)',
                                remarksProd: 'Moved meters to newly created account\n(or notes payload)',
                                remarksDebug: 'Notice: Legacy alignment row\n• Subject: FOUND\n• Actor: FOUND\n• Target: NOT_SPECIFIED'
                            },
                            {
                                id: 7,
                                type: 'Type 6: Balance Addition (value > 0)',
                                typeCategory: 'type6',
                                targetState: 'Found in Storage 1 or 2 (Account #79)',
                                actorState: 'Found in Storage 2 (Actor #2)',
                                targetProd: 'Acme Corp',
                                targetDebug: 'Acme Corp',
                                remarksProd: 'Meter Balance Update on: Acme Corp',
                                remarksDebug: 'Meter Balance Update on: Acme Corp'
                            },
                            {
                                id: 8,
                                type: 'Type 6: Balance Addition (value > 0)',
                                typeCategory: 'type6',
                                targetState: 'Missing in Both (Account #79 deleted)',
                                actorState: 'Found in Storage 2 (Actor #2)',
                                targetProd: '[ ⊘ Deleted Account #79 ]',
                                targetDebug: 'Error: Target lookup failed\n• Target: MISS | MISS\n• Actor: users=FOUND ("admin")',
                                remarksProd: '⚠ Account #79 has been deleted.\n(Meter Balance Update)',
                                remarksDebug: 'Error: Target missing\n• Target: MISS | MISS'
                            },
                            {
                                id: 9,
                                type: 'Type 6: Balance Deduction (value < 0)',
                                typeCategory: 'type6',
                                targetState: 'Subject #79 active; Actor #2 active',
                                actorState: 'Found in Storage 2 (users.id = 2)',
                                targetProd: 'admin (or linked account)',
                                targetDebug: 'admin',
                                remarksProd: 'Meter Balance Update by: admin',
                                remarksDebug: 'Meter Balance Update by: admin'
                            },
                            {
                                id: 10,
                                type: 'Type 6: Balance Deduction (value < 0)',
                                typeCategory: 'type6',
                                targetState: 'Subject #79 active; Actor #2 deleted',
                                actorState: 'Missing in Both (Actor #2 deleted)',
                                targetProd: '[ ⊘ Deleted Account #2 ]',
                                targetDebug: 'Error: Actor lookup failed\n• Subject: accounts=FOUND\n• Actor: accounts=MISS | users=MISS',
                                remarksProd: '⚠ Account #2 has been deleted.\n(Meter Balance Update by: Deleted User #2)',
                                remarksDebug: 'Error: Actor missing\n• Subject: FOUND\n• Actor: accounts=MISS | users=MISS'
                            },
                            {
                                id: 11,
                                type: 'Type 1 / 5: Outbound Transfer',
                                typeCategory: 'type1_5',
                                targetState: 'Found in Storage 1 or 2 (Target #88)',
                                actorState: 'Active user',
                                targetProd: 'Target Corp',
                                targetDebug: 'Target Corp',
                                remarksProd: 'Sent to Target Corp',
                                remarksDebug: 'Sent to Target Corp'
                            },
                            {
                                id: 12,
                                type: 'Type 1 / 5: Outbound Transfer',
                                typeCategory: 'type1_5',
                                targetState: 'Missing in Both (Target #88 deleted)',
                                actorState: 'Active user',
                                targetProd: '[ ⊘ Deleted Account #88 ]',
                                targetDebug: 'Error: Target lookup failed\n• Target: MISS | MISS',
                                remarksProd: '⚠ Account #88 has been deleted.\n(Sent to Deleted Account #88)',
                                remarksDebug: 'Error: Target lookup failed\n• Target: MISS | MISS'
                            },
                            {
                                id: 13,
                                type: 'Type 2 / 3 / 4: Inbound Meter / Initial',
                                typeCategory: 'type2_3_4',
                                targetState: 'Found in Storage 1 or 2 (Account #79)',
                                actorState: 'Active user',
                                targetProd: 'Acme Corp',
                                targetDebug: 'Acme Corp',
                                remarksProd: 'Initial Meters / Received from <source>',
                                remarksDebug: 'Initial Meters / Received from <source>'
                            },
                            {
                                id: 14,
                                type: 'Type 2 / 3 / 4: Inbound Meter / Initial',
                                typeCategory: 'type2_3_4',
                                targetState: 'Missing in Both (Account #79 deleted)',
                                actorState: 'Active user',
                                targetProd: '[ ⊘ Deleted Account #79 ]',
                                targetDebug: 'Error: Account lookup failed\n• Account #79: MISS | MISS',
                                remarksProd: '⚠ Account #79 has been deleted.',
                                remarksDebug: 'Error: Account lookup failed\n• Account #79: MISS | MISS'
                            },
                            {
                                id: 15,
                                type: 'Type 0: Scored Assessment',
                                typeCategory: 'type0',
                                targetState: 'Candidate owner matches subject account',
                                actorState: 'Automated system',
                                targetProd: 'Acme Corp',
                                targetDebug: 'Acme Corp',
                                remarksProd: 'Used to Score Assessment',
                                remarksDebug: 'Used to Score Assessment'
                            },
                            {
                                id: 16,
                                type: 'Type 0: Scored Assessment',
                                typeCategory: 'type0',
                                targetState: 'Cross-account deduction; Source active',
                                actorState: 'Automated system',
                                targetProd: 'Parent Corp',
                                targetDebug: 'Parent Corp',
                                remarksProd: 'Used to Score Assessment: Parent Corp',
                                remarksDebug: 'Used to Score Assessment: Parent Corp'
                            },
                            {
                                id: 17,
                                type: 'Type 0: Scored Assessment',
                                typeCategory: 'type0',
                                targetState: 'Cross-account deduction; Source deleted',
                                actorState: 'Automated system',
                                targetProd: '[ ⊘ Deleted Account #50 ]',
                                targetDebug: 'Error: Scored assessment source miss\n• Account #50: MISS | MISS',
                                remarksProd: '⚠ Account #50 has been deleted.\n(Used to Score Assessment)',
                                remarksDebug: 'Error: Scored assessment source miss'
                            }
                        ]
                    },
                    {
                        id: 'confirmed-operational-characteristics',
                        title: 'Confirmed Operational Characteristics',
                        groups: [
                            {
                                title: 'System Currently Operates As',
                                items: [
                                    'Hierarchy-governed operational credit system',
                                    'Delegated consumption system',
                                    'Operational audit/history system',
                                    'Persistent report-access system'
                                ]
                            }
                        ],
                        rules: [
                            'Hierarchy-based authority is enforced.',
                            'Hierarchy-based visibility is enforced.',
                            'Strict non-negative balance integrity is enforced.',
                            'Persistent operational history is enforced.'
                        ]
                    },
                    {
                        id: 'gaps',
                        title: 'Gaps',
                        groups: [
                            {
                                title: 'Parent Consumption Account Creation Validation',
                                items: [
                                    'Accounts using Parent Consumption may fail account creation when the creator local meter balance is 0, even when parent balance is available.',
                                    'Some account creation validations still check local balance instead of parent-related consumption behavior.',
                                    'Observed impact: Sub Distributor accounts using parent consumption may become unable to create Client or Sub-Account records when local balance is 0.'
                                ]
                            },
                            {
                                title: 'Distributor Candidate Management Workflow',
                                items: [
                                    'Distributor candidate management workflow remains unclear on distributor side.',
                                    'Observed behavior: Admin accounts may create candidates under Distributor accounts.',
                                    'Observed behavior: Distributor accounts do not yet have a clearly confirmed candidate management workflow.',
                                    'Concern: Ownership and operational management responsibility becomes unclear for Distributor-managed candidates.'
                                ]
                            },
                            {
                                title: 'Deleted Account Meter Governance',
                                items: [
                                    'Meter behavior for Deleted accounts is not yet formally confirmed.',
                                    'Unclear areas: remaining meter balances, historical meter logs, generated reports, request history, transfer history, and visibility retention after deletion.',
                                    'Concern: historical audit consistency and balance ownership behavior may become inconsistent without formal deletion handling.'
                                ]
                            },
                            {
                                title: 'Archived, Deactivated, Expired Account Meter Governance',
                                items: [
                                    'Meter behavior for Archived, Deactivated, and Expired accounts is not yet formally confirmed.',
                                    'Unclear area: remaining meter balances.',
                                    'Concern: historical audit consistency and balance ownership behavior may become inconsistent without formally defined lifecycle-state handling.'
                                ]
                            },
                            {
                                title: 'Multi-Report Meter Deduction Behavior',
                                items: [
                                    'Current behavior deducts meters during initial assessment completion and generated reports remain reusable afterward.',
                                    'Additional deduction behavior for multiple reports under the same assessment is not yet formally confirmed.',
                                    'Unclear behavior: whether additional reports under the same assessment should trigger additional meter deduction.'
                                ]
                            },
                            {
                                title: 'Actor Attribution In Meter Logs',
                                items: [
                                    'Actor attribution can be misread as parent attribution when reviewing meter logs unless actor resolution is explicitly based on logged-in user context.',
                                    'Expected rule: Actor must be the logged-in user at action time, not inferred from hierarchy parent.',
                                    'Expected impact: remark strings for type updates, balance updates, and request approval must consistently render actor username from session context.',
                                    'Risk if not enforced: incorrect audit interpretation between actor and parent views during meter operations.'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    function createStepCard(index, text) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';
        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;
        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = text;
        wrap.appendChild(badge);
        wrap.appendChild(detail);
        return wrap;
    }

    function createBulletList(items) {
        const list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'flex gap-2';
            const marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
            const text = document.createElement('span');
            text.textContent = item;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);
        });
        return list;
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

    function renderHierarchyTree(levels) {
        const wrap = document.createElement('div');
        wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
        levels.forEach(function (item) {
            const row = document.createElement('div');
            const indentRem = (item.level || 0) * 1.5;
            row.className = 'flex items-center gap-3 py-2';
            row.style.paddingLeft = indentRem + 'rem';

            if ((item.level || 0) > 0) {
                const line = document.createElement('div');
                line.className = 'w-6 h-px bg-slate-300';
                row.appendChild(line);
            }

            const dot = document.createElement('div');
            dot.className = 'w-3 h-3 rounded-full flex-shrink-0 ' + (item.dotColor || 'bg-slate-300');
            const label = document.createElement('span');
            label.className = 'text-sm font-medium text-slate-700';
            label.textContent = item.name;
            row.appendChild(dot);
            row.appendChild(label);
            wrap.appendChild(row);
        });
        return wrap;
    }

    function renderSectionBody(section, target) {
        if (section.hierarchyLevels && section.hierarchyLevels.length) {
            target.appendChild(renderHierarchyTree(section.hierarchyLevels));
        }

        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';
            const rulesHeading = document.createElement('h3');
            rulesHeading.className = 'font-semibold text-amber-900 mb-3';
            rulesHeading.textContent = 'Rules';
            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(section.rules));
            target.appendChild(rulesWrap);
        }

        if (section.expectedResults && section.expectedResults.length) {
            const expectedWrap = document.createElement('div');
            expectedWrap.className = 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';
            const expectedHeading = document.createElement('h3');
            expectedHeading.className = 'font-semibold text-emerald-900 mb-3';
            expectedHeading.textContent = 'Expected Result';
            expectedWrap.appendChild(expectedHeading);
            expectedWrap.appendChild(createBulletList(section.expectedResults));
            target.appendChild(expectedWrap);
        }

        if (section.matrix && section.matrix.length) {
            target.appendChild(renderResolutionMatrix(section.matrix));
        }
    }

    function createMatrixDiagnosticBlock(text) {
        const wrap = document.createElement('div');
        if (!text) {
            wrap.textContent = '-';
            return wrap;
        }

        const trimmed = text.trim();
        if (trimmed.startsWith('Error:') || trimmed.startsWith('Diagnostic Notice:') || trimmed.startsWith('Notice:')) {
            wrap.className = 'font-mono text-[11px] leading-relaxed p-2.5 rounded-lg bg-slate-900 text-slate-100 border border-slate-800 shadow-sm';
            const lines = text.split('\n');
            lines.forEach(function (line, idx) {
                const lineDiv = document.createElement('div');
                if (idx === 0) {
                    lineDiv.className = line.startsWith('Error:') ? 'font-semibold text-rose-400' : 'font-semibold text-amber-300';
                    lineDiv.textContent = line;
                } else {
                    lineDiv.className = 'text-slate-300 pl-2 text-[10.5px]';
                    lineDiv.textContent = line;
                }
                wrap.appendChild(lineDiv);
            });
            return wrap;
        }

        if (trimmed.startsWith('⚠')) {
            wrap.className = 'text-xs p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200';
            const lines = text.split('\n');
            lines.forEach(function (line, idx) {
                const lineDiv = document.createElement('div');
                if (idx === 0) {
                    lineDiv.className = 'font-semibold';
                } else {
                    lineDiv.className = 'text-[11px] text-amber-800 mt-0.5';
                }
                lineDiv.textContent = line;
                wrap.appendChild(lineDiv);
            });
            return wrap;
        }

        if (trimmed.startsWith('[ ⊘ Deleted Account')) {
            const span = document.createElement('span');
            span.className = 'inline-flex items-center px-2 py-1 rounded bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-semibold';
            span.textContent = text;
            wrap.appendChild(span);
            return wrap;
        }

        const lines = text.split('\n');
        if (lines.length > 1) {
            lines.forEach(function (line, idx) {
                const lineDiv = document.createElement('div');
                lineDiv.className = idx === 0 ? 'font-medium text-slate-800' : 'text-slate-500 text-[11px] mt-0.5';
                lineDiv.textContent = line;
                wrap.appendChild(lineDiv);
            });
        } else {
            const span = document.createElement('span');
            span.className = 'font-medium text-slate-800';
            span.textContent = text;
            wrap.appendChild(span);
        }
        return wrap;
    }

    function createMatrixStateCell(text) {
        const wrap = document.createElement('div');
        wrap.className = 'text-xs text-slate-700 leading-relaxed';

        const lines = text.split('\n');
        lines.forEach(function (line) {
            const lineDiv = document.createElement('div');
            if (line.includes('Missing in Both') || line.includes('MISS') || line.includes('deleted')) {
                lineDiv.className = 'text-rose-700 font-medium';
            } else if (line.includes('NULL / Not Set')) {
                lineDiv.className = 'text-amber-700 font-medium';
            } else if (line.includes('Found in Storage')) {
                lineDiv.className = 'text-slate-800 font-medium';
            } else {
                lineDiv.className = 'text-slate-600';
            }
            lineDiv.textContent = line;
            wrap.appendChild(lineDiv);
        });
        return wrap;
    }

    function createMatrixTypeBadge(item) {
        const badge = document.createElement('span');
        var colorClasses = 'bg-slate-100 text-slate-800 border-slate-200';
        if (item.typeCategory === 'type7') {
            colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        } else if (item.typeCategory === 'type6') {
            colorClasses = item.type.includes('Addition')
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200';
        } else if (item.typeCategory === 'type1_5') {
            colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        } else if (item.typeCategory === 'type2_3_4') {
            colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200';
        } else if (item.typeCategory === 'type0') {
            colorClasses = 'bg-violet-50 text-violet-700 border-violet-200';
        }

        badge.className = 'inline-block text-xs font-semibold px-2 py-1 rounded-md border ' + colorClasses;
        badge.textContent = item.type;
        return badge;
    }

    function renderResolutionMatrix(matrixData) {
        const container = document.createElement('div');
        container.className = 'mt-6 space-y-4';

        const infoBanner = document.createElement('div');
        infoBanner.className = 'rounded-xl border border-sky-100 bg-sky-50/80 p-4 text-xs text-sky-900 leading-relaxed';
        infoBanner.innerHTML = '<strong>Traceability Matrix Guide:</strong> Cross-reference this matrix to diagnose and verify meter balance updates, recipient entity resolutions, and diagnostic logs based on entity lookup states in <code>Storage 1 (accounts.id)</code> and <code>Storage 2 (users.id)</code>. Toggle between standard view, Production mode (<code>SHOW_ERROR=false</code>), and Diagnostic mode (<code>SHOW_ERROR=true</code>).';
        container.appendChild(infoBanner);

        const controlsCard = document.createElement('div');
        controlsCard.className = 'rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3';

        const topRow = document.createElement('div');
        topRow.className = 'flex flex-col md:flex-row md:items-center justify-between gap-3';

        const filterPillsWrap = document.createElement('div');
        filterPillsWrap.className = 'flex flex-wrap items-center gap-1.5';

        const categories = [
            { label: 'All Paths (17)', key: 'all' },
            { label: 'Type 7: Created Account', key: 'type7' },
            { label: 'Type 6: Balance Updates', key: 'type6' },
            { label: 'Type 1 / 5: Transfers', key: 'type1_5' },
            { label: 'Type 2 / 3 / 4: Inbound / Initial', key: 'type2_3_4' },
            { label: 'Type 0: Scored Assessment', key: 'type0' }
        ];

        let activeCategory = 'all';
        let activeMode = 'all';
        let searchQuery = '';

        const pillButtons = [];
        categories.forEach(function (cat) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'matrix-filter-pill text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-100 transition-colors' + (cat.key === 'all' ? ' active' : '');
            btn.textContent = cat.label;
            btn.dataset.key = cat.key;
            btn.addEventListener('click', function () {
                activeCategory = cat.key;
                pillButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilters();
            });
            pillButtons.push(btn);
            filterPillsWrap.appendChild(btn);
        });

        topRow.appendChild(filterPillsWrap);

        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.placeholder = 'Filter matrix (e.g. Acme, #105, deleted, Storage 2)...';
        searchInput.className = 'text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-full md:w-64';
        searchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
        topRow.appendChild(searchInput);
        controlsCard.appendChild(topRow);

        const bottomRow = document.createElement('div');
        bottomRow.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs';

        const modeSwitcherWrap = document.createElement('div');
        modeSwitcherWrap.className = 'inline-flex items-center rounded-lg bg-slate-200/70 p-0.5 text-xs text-slate-600';

        const modes = [
            { label: 'All Columns (Side-by-Side)', key: 'all' },
            { label: 'SHOW_ERROR = false (Production)', key: 'prod' },
            { label: 'SHOW_ERROR = true (Diagnostic)', key: 'debug' }
        ];

        const modeButtons = [];
        modes.forEach(function (m) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'matrix-mode-btn px-2.5 py-1 rounded-md transition-all' + (m.key === 'all' ? ' active' : ' hover:text-slate-900');
            btn.textContent = m.label;
            btn.dataset.key = m.key;
            btn.addEventListener('click', function () {
                activeMode = m.key;
                modeButtons.forEach(b => {
                    b.classList.remove('active');
                    b.classList.add('hover:text-slate-900');
                });
                btn.classList.add('active');
                btn.classList.remove('hover:text-slate-900');
                applyMode();
                applyFilters();
            });
            modeButtons.push(btn);
            modeSwitcherWrap.appendChild(btn);
        });
        bottomRow.appendChild(modeSwitcherWrap);

        const counterSpan = document.createElement('span');
        counterSpan.className = 'text-xs text-slate-500 font-medium';
        counterSpan.textContent = 'Showing 17 of 17 paths';
        bottomRow.appendChild(counterSpan);

        controlsCard.appendChild(bottomRow);
        container.appendChild(controlsCard);

        const tableWrap = document.createElement('div');
        tableWrap.className = 'matrix-table-wrap overflow-x-auto rounded-xl border border-slate-200 bg-white';

        const table = document.createElement('table');
        table.className = 'w-full text-left border-collapse text-xs divide-y divide-slate-100 min-w-[980px]';

        const thead = document.createElement('thead');
        thead.className = 'bg-slate-50/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200';

        const trHead = document.createElement('tr');

        const thDefs = [
            { text: '#', className: 'px-3 py-3 w-10 text-center' },
            { text: 'Transaction Type', className: 'px-3 py-3 min-w-[170px]' },
            { text: 'Target / Subject Entity State', className: 'px-3 py-3 min-w-[190px]' },
            { text: 'Actor Entity State', className: 'px-3 py-3 min-w-[150px]' },
            { text: 'Target Account (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[160px] col-prod', badge: 'Prod' },
            { text: 'Target Account (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' },
            { text: 'Remarks Column (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[200px] col-prod', badge: 'Prod' },
            { text: 'Remarks Column (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' }
        ];

        thDefs.forEach(function (def) {
            const th = document.createElement('th');
            th.scope = 'col';
            th.className = def.className;
            th.textContent = def.text;
            if (def.badge) {
                const b = document.createElement('span');
                b.className = def.badge === 'Prod'
                    ? 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800'
                    : 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-indigo-100 text-indigo-800';
                b.textContent = def.badge;
                th.appendChild(b);
            }
            trHead.appendChild(th);
        });
        thead.appendChild(trHead);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        tbody.className = 'divide-y divide-slate-100 bg-white';

        const rowElements = [];

        matrixData.forEach(function (item, idx) {
            const tr = document.createElement('tr');
            tr.className = (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40') + ' hover:bg-slate-100/60 transition-colors';
            tr.dataset.category = item.typeCategory;
            tr.dataset.search = (
                item.id + ' ' +
                item.type + ' ' +
                item.targetState + ' ' +
                item.actorState + ' ' +
                item.targetProd + ' ' +
                item.targetDebug + ' ' +
                item.remarksProd + ' ' +
                item.remarksDebug
            ).toLowerCase();

            const tdId = document.createElement('td');
            tdId.className = 'px-3 py-3 font-mono font-semibold text-slate-400 text-center align-top';
            tdId.textContent = item.id;
            tr.appendChild(tdId);

            const tdType = document.createElement('td');
            tdType.className = 'px-3 py-3 align-top';
            tdType.appendChild(createMatrixTypeBadge(item));
            tr.appendChild(tdType);

            const tdTargetState = document.createElement('td');
            tdTargetState.className = 'px-3 py-3 align-top';
            tdTargetState.appendChild(createMatrixStateCell(item.targetState));
            tr.appendChild(tdTargetState);

            const tdActorState = document.createElement('td');
            tdActorState.className = 'px-3 py-3 align-top';
            tdActorState.appendChild(createMatrixStateCell(item.actorState));
            tr.appendChild(tdActorState);

            const tdTargetProd = document.createElement('td');
            tdTargetProd.className = 'px-3 py-3 align-top col-prod';
            tdTargetProd.appendChild(createMatrixDiagnosticBlock(item.targetProd));
            tr.appendChild(tdTargetProd);

            const tdTargetDebug = document.createElement('td');
            tdTargetDebug.className = 'px-3 py-3 align-top col-debug';
            tdTargetDebug.appendChild(createMatrixDiagnosticBlock(item.targetDebug));
            tr.appendChild(tdTargetDebug);

            const tdRemarksProd = document.createElement('td');
            tdRemarksProd.className = 'px-3 py-3 align-top col-prod';
            tdRemarksProd.appendChild(createMatrixDiagnosticBlock(item.remarksProd));
            tr.appendChild(tdRemarksProd);

            const tdRemarksDebug = document.createElement('td');
            tdRemarksDebug.className = 'px-3 py-3 align-top col-debug';
            tdRemarksDebug.appendChild(createMatrixDiagnosticBlock(item.remarksDebug));
            tr.appendChild(tdRemarksDebug);

            tbody.appendChild(tr);
            rowElements.push(tr);
        });

        const emptyRow = document.createElement('tr');
        emptyRow.className = 'hidden';
        const emptyTd = document.createElement('td');
        emptyTd.colSpan = 8;
        emptyTd.className = 'py-10 text-center text-sm text-slate-400';
        emptyTd.textContent = 'No resolution paths match your filter criteria.';
        emptyRow.appendChild(emptyTd);
        tbody.appendChild(emptyRow);

        table.appendChild(tbody);
        tableWrap.appendChild(table);
        container.appendChild(tableWrap);

        function applyMode() {
            const prodCols = container.querySelectorAll('.col-prod');
            const debugCols = container.querySelectorAll('.col-debug');

            if (activeMode === 'all') {
                prodCols.forEach(col => col.classList.remove('hidden'));
                debugCols.forEach(col => col.classList.remove('hidden'));
            } else if (activeMode === 'prod') {
                prodCols.forEach(col => col.classList.remove('hidden'));
                debugCols.forEach(col => col.classList.add('hidden'));
            } else if (activeMode === 'debug') {
                prodCols.forEach(col => col.classList.add('hidden'));
                debugCols.forEach(col => col.classList.remove('hidden'));
            }
        }

        function applyFilters() {
            var visibleCount = 0;
            rowElements.forEach(function (row) {
                var matchesCat = (activeCategory === 'all') || (row.dataset.category === activeCategory);
                var matchesSearch = (!searchQuery) || (row.dataset.search.indexOf(searchQuery) !== -1);
                if (matchesCat && matchesSearch) {
                    row.classList.remove('hidden');
                    visibleCount++;
                } else {
                    row.classList.add('hidden');
                }
            });

            if (visibleCount === 0) {
                emptyRow.classList.remove('hidden');
            } else {
                emptyRow.classList.add('hidden');
            }

            counterSpan.textContent = 'Showing ' + visibleCount + ' of ' + matrixData.length + ' paths';
        }

        return container;
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

        if (section.children) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderTldr(root) {
        const wrap = document.createElement('section');
        wrap.className = 'mb-10 rounded-lg border border-sky-100 bg-sky-50 p-5';
        const heading = document.createElement('h2');
        heading.className = 'font-semibold text-sky-900 mb-3';
        heading.textContent = 'TL;DR';
        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(governanceContent.tldr));
        root.appendChild(wrap);
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        renderTldr(root);
        governanceContent.sections.forEach(function (section) {
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
        governanceContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('text-brand', 'font-semibold');

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
            var activeId = getVisibleSidebarTarget();
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

    global.__metersGovernanceContent = governanceContent;
})(window);
