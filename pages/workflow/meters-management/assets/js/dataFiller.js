(function (global) {
    'use strict';

    const metersContent = {
        title: 'Meters Management',
        legends: [
            '(Admin) - Super Admin IT or Super Admin ASD',
            '(Accounts) - Distributor, Sub Distributor, Client Account, Sub-Account'
        ],
        sections: [
            {
                id: 'meter-request',
                title: 'Meter Request',
                description: 'View and manage meter requests from lower hierarchy accounts.',
                children: [
                    {
                        id: 'approve-or-reject-request',
                        title: 'Approve Or Reject Request',
                        description: 'Review pending meter requests and approve or reject the request.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Request'] }
                        ],
                        steps: [
                            'Open Meters > Meter Request.',
                            'Select the request.',
                            'Review the request details.',
                            'Click Approve or Reject.'
                        ],
                        rules: [
                            'Requests require approval before meter movement occurs.',
                            'Request approval deducts meters from the approving account.',
                            'Requests may only be approved by authorized higher hierarchy accounts.',
                            'Requests cannot be edited after submission.',
                            'Partial approval is not supported.',
                            'Requests may be cancelled by the requester or higher hierarchy accounts.'
                        ],
                        expectedResults: [
                            'The request status updates.',
                            'Meter balances update after approval.',
                            'A request history log is created.'
                        ]
                    }
                ]
            },
            {
                id: 'order-meters',
                title: 'Order Meters',
                description: 'Request meters from higher hierarchy accounts.',
                groups: [
                    { title: 'Access Path', items: ['Meters > Order Meters'] }
                ],
                steps: [
                    'Open Meters > Order Meters.',
                    'Enter the requested meter value.',
                    'Click Send Meter Order.'
                ],
                rules: [
                    'Meter requests follow hierarchy authority rules.',
                    'Requests require approval before meter balances change.'
                ],
                expectedResults: [
                    'The meter request is added to the request list.',
                    'Higher hierarchy accounts can review the request.'
                ]
            },
            {
                id: 'transfer-meters',
                title: 'Transfer Meters',
                description: 'Transfer meter balances to allowed accounts.',
                groups: [
                    {
                        title: 'Access Paths',
                        items: [
                            'Meters > Transfer Meters',
                            'Meters > Meter Records > View Meter > Transfer Meter'
                        ]
                    }
                ],
                steps: [
                    'Open Transfer Meters.',
                    'Select Source Account.',
                    'Review the loaded Available Meters.',
                    'Enter the Meter Value.',
                    'Select Destination Account.',
                    'Click Transfer Meter.'
                ],
                rules: [
                    'Transfers are immediate and do not require approval.',
                    'Transfer amount cannot exceed the available balance.',
                    'Transfers cannot cause balance < 0.',
                    'Standard accounts may transfer only to descendant accounts.',
                    'Cross-branch transfers are restricted to Super Admins.'
                ],
                expectedResults: [
                    'The source account balance decreases.',
                    'The destination account balance increases.',
                    'A transfer log entry is created.'
                ]
            },
            {
                id: 'meter-records',
                title: 'Meter Records',
                description: 'View account meter balances, logs, and meter-related actions.',
                groups: [
                    { title: 'Access Path', items: ['Meters > Meter Records'] }
                ],
                children: [
                    {
                        id: 'view-meter',
                        title: 'View Meter',
                        description: 'View meter balance and meter details for the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > View Meter'] }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click View Meter.'
                        ],
                        rules: [
                            'Visibility depends on account hierarchy.',
                            'Higher hierarchy accounts may view descendant account meters.'
                        ],
                        expectedResults: [
                            'The selected account meter details are displayed.'
                        ]
                    },
                    {
                        id: 'transfer-meter',
                        title: 'Transfer Meter',
                        description: 'Transfer meters directly from the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > View Meter > Transfer Meter'] }
                        ],
                        steps: [
                            'Open View Meter.',
                            'Click Transfer Meter.',
                            'Enter transfer details.',
                            'Click Transfer Meter.'
                        ],
                        rules: [
                            'Transfer restrictions follow hierarchy authority rules.',
                            'Transfers cannot cause balance < 0.'
                        ],
                        expectedResults: [
                            'Meter balances update immediately.',
                            'A transfer log entry is created.'
                        ]
                    },
                    {
                        id: 'view-meter-log',
                        title: 'View Meter Log',
                        description: 'View meter history, meter-related activities, and what each remark means for the selected account.',
                        groups: [
                            {
                                title: 'Access Paths',
                                items: [
                                    'Meters > Meter Records > View Meter Log',
                                    'Meters > Meter Records > View Meter > View Meter Log'
                                ]
                            }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click View Meter Log.'
                        ],
                        rules: [
                            'Meter log visibility follows hierarchy authority.',
                            'Higher hierarchy accounts may view descendant logs.',
                            'Accounts may view their own logs.',
                            'Archived and deactivated account logs remain visible in history.',
                            'Each transaction type resolves to one predictable remark format.',
                            'Account names appear in remarks only when source or target account resolution is available.',
                            'Unresolved type=0 and type=3 events return a diagnostic failure instead of silent fallback text.',
                            'Type=4 unresolved display may appear as (not set).'
                        ],
                        expectedResults: [
                            'Meter activity history is displayed.',
                            'Remark text clearly indicates what happened to meters.',
                            'Rendered remarks follow service-owned mapping and resolution rules.'
                        ],
                        children: [
                            {
                                id: 'meter-log-remark-meaning',
                                title: 'Remark Meaning Guide',
                                description: 'Use this guide to interpret the remark column in View Meter Log.',
                                groups: [
                                    {
                                        title: 'Expected Remark Meanings',
                                        items: [
                                            'Used to Score Assessment: Meter was consumed by assessment completion.',
                                            'Used to Score Assessment: <account_name>: Assessment consumption is attributed to the shown account.',
                                            'Sent to <account_name>: Meters were deducted from the current account and transferred to the shown account.',
                                            'Received from <account_name>: Meters were added to the current account from the shown account.',
                                            'Initial Meters: Starting meter balance was initialized.',
                                            'Meter Balance Update: Manual add or deduct adjustment was applied from Update Meter Balance.',
                                            'Moved to Newly Created Account: <account_name>: Meters were moved to a newly created account.',
                                            '<type-change-specific-message>: <actor_account_name>: Consumption type-change event showing the action message and actor account.',
                                            '(not set): Reserved unresolved output for applicable type=4 resolution path.'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'new-discovery-settings-changed',
                                title: 'New Discovery And Settings-Changed Notes',
                                description: 'Actor is the logged-in user at action time. Actor is not always the parent account.',
                                groups: [
                                    {
                                        title: 'Create New Account',
                                        items: [
                                            'Remarks (Target View): Initial Meters',
                                            'Remarks (Actor View): Moved to Newly Created Account: <target_user_name>',
                                            'Target Account (Both View): <target_user_name>',
                                            'Parent deduction with allocated 0: Addition = 0, Deduction = 0',
                                            'Self deduction with allocated n where n > 0: Addition = n, Deduction = 0'
                                        ]
                                    },
                                    {
                                        title: 'Update Meter Type',
                                        items: [
                                            'Remarks (Target View): Meter Type Update (switched to self/parent deduction) by: <actor_user_name>',
                                            'Remarks (Actor or Parent View): Meter Type Update (switched to self/parent deduction): <target_user_name>',
                                            'If switched to self deduction: Target Account (Both View) = <target_user_name>',
                                            'If switched to parent deduction: Target Account (Both View) = <parent_user_name>',
                                            'If switched to self deduction: Target Addition = n, Actor Deduction = n',
                                            'If switched to parent deduction: Target Deduction = n, Actor Addition = n'
                                        ]
                                    },
                                    {
                                        title: 'Update Meter Balance',
                                        items: [
                                            'Remarks (Target View): Meter Balance Update by: <actor_user_name>',
                                            'Remarks (Parent View): Meter Balance Updated: <target_user_name>',
                                            'If deduction: Target Account (Both View) = <parent_user_name>',
                                            'If addition: Target Account (Both View) = <target_user_name>',
                                            'If deduction: Actor Addition = n, Target Deduction = n',
                                            'If addition: Actor Deduction = n, Target Addition = n'
                                        ]
                                    },
                                    {
                                        title: 'Use Meter Balance',
                                        items: [
                                            'If own candidate: Remark = Used to Score Assessment',
                                            'If lower-hierarchy candidate: Remark = Used to Score Assessment: <consumer_user_name>',
                                            'If own candidate: Target Account = <own_user_name>',
                                            'If lower-hierarchy candidate: Target Account = <consumer_user_name>'
                                        ]
                                    },
                                    {
                                        title: 'Request Meter Approved',
                                        items: [
                                            'Remarks (Target View): Received from <actor_user_name>',
                                            'Remarks (Actor View): Sent to <target_user_name>',
                                            'Target Account: <target_user_name>',
                                            'Actor Deduction = n, Target Addition = n'
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
                            }
                        ]
                    },
                    {
                        id: 'update-meter-balance',
                        title: 'Update Meter Balance',
                        description: 'Add or deduct meter balances for the selected account.',
                        groups: [
                            { title: 'Access Path', items: ['Meters > Meter Records > Update Meter Balance'] }
                        ],
                        steps: [
                            'Open Meters > Meter Records.',
                            'Select the account.',
                            'Click Update Meter Balance.',
                            'Enter the adjustment value.',
                            'Save the update.'
                        ],
                        rules: [
                            'Meter balances cannot become < 0.',
                            'Higher hierarchy accounts may update descendant account balances.',
                            'Super Admins are not meter-deducted during updates.'
                        ],
                        expectedResults: [
                            'The selected account balance updates.',
                            'A meter adjustment log entry is created.'
                        ]
                    }
                ]
            },
            {
                id: 'meter-consumption',
                title: 'Meter Consumption',
                description: 'Meters are consumed during assessment completion. Generated reports may later be viewed, downloaded, emailed, or revisited without additional meter deduction.',
                rules: [
                    'Meter deduction occurs once per candidate per assessment.',
                    'Generated reports remain accessible after creation.',
                    'Higher hierarchy accounts may view descendant reports.'
                ],
                expectedResults: [
                    'Meter balances decrease after assessment completion.',
                    'Generated reports become available for viewing and download.'
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

    function createCallout(title, items, kind) {
        const wrap = document.createElement('div');
        const isRules = kind === 'rules';
        wrap.className = isRules
            ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
            : 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';

        const heading = document.createElement('h3');
        heading.className = isRules ? 'font-semibold text-amber-900 mb-3' : 'font-semibold text-emerald-900 mb-3';
        heading.textContent = title;

        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
        return wrap;
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

    function renderSectionBody(section, target) {
        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsTitle = document.createElement('h3');
            stepsTitle.className = 'mt-5 mb-3 font-semibold text-slate-900';
            stepsTitle.textContent = 'How To Use';
            target.appendChild(stepsTitle);

            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            target.appendChild(createCallout('Rules', section.rules, 'rules'));
        }

        if (section.expectedResults && section.expectedResults.length) {
            target.appendChild(createCallout('Expected Result', section.expectedResults, 'expected'));
        }

        if (section.matrix && section.matrix.length) {
            target.appendChild(renderResolutionMatrix(section.matrix));
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
        if (!metersContent.legends || !metersContent.legends.length) return;

        const legendsWrap = document.createElement('div');
        legendsWrap.className = 'mb-8 rounded-lg border border-slate-100 bg-slate-50 p-5';

        const heading = document.createElement('h2');
        heading.className = 'font-semibold text-slate-900 mb-3';
        heading.textContent = 'Legends';
        legendsWrap.appendChild(heading);
        legendsWrap.appendChild(createBulletList(metersContent.legends));

        root.appendChild(legendsWrap);
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        renderLegends(root);

        metersContent.sections.forEach(function (section) {
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
        metersContent.sections.forEach(function (section) {
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

    global.__metersContent = metersContent;
})(window);
