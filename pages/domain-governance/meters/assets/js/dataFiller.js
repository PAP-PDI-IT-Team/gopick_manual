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
                            { name: 'Super Admin (IT)', level: 0 },
                            { name: 'Super Admin (ASD)', level: 0 },
                            { name: 'Distributor', level: 1 },
                            { name: 'Administrator', level: 2 },
                            { name: 'Sub Distributor', level: 2 },
                            { name: 'Administrator', level: 3 },
                            { name: 'Client Account', level: 3 },
                            { name: 'Administrator', level: 4 },
                            { name: 'Self Registered', level: 4 },
                            { name: 'Sub-Account', level: 4 },
                            { name: 'Administrator', level: 5 },
                            { name: 'Self Registered', level: 5 }
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
                        notes: [
                            'Cross-reference this matrix to diagnose and verify meter balance updates, recipient entity resolutions, and diagnostic logs based on entity lookup states in Storage 1 (accounts.id) and Storage 2 (users.id).',
                            'Toggle between standard view, Production mode (SHOW_ERROR=false), and Diagnostic mode (SHOW_ERROR=true).'
                        ],
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

    global.__metersGovernanceContent = governanceContent;
})(window);
