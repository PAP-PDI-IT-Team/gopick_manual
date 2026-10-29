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
                images: [
                    {
                        title: 'Meter Requests Table View',
                        caption: 'Meter Requests page with search, Advanced Search, the date range, status, and date completed filters, and the requests table with the Account Name, Meter Value, Request Date, Status, Date Completed, and Actions columns outlined; account names are blurred.',
                        src: 'assets/img/meter-request.png',
                        alt: 'Meter Requests page with the search bar, Advanced Search button, filters, and requests table outlined; account names are blurred'
                    }
                ],
                children: [
                    {
                        id: 'approve-or-reject-request',
                        title: 'Approve Or Reject Request',
                        description: 'Review pending meter requests and approve or reject the request.',
                        images: [
                            {
                                title: 'Approve Request Confirmation',
                                caption: 'Approve confirmation dialog on the Meter Requests page with the Yes button emphasized and the No button beside it; account names and the signed-in user are blurred.',
                                src: 'assets/img/approve-request-dialog.png',
                                alt: 'Meter Requests page with the approve confirmation dialog outlined and its Yes button emphasized; account names and the signed-in user are blurred'
                            },
                            {
                                title: 'Decline Request Confirmation',
                                caption: 'Decline confirmation dialog on the Meter Requests page with the Yes button emphasized and the No button beside it; account names and the signed-in user are blurred.',
                                src: 'assets/img/decline-request-dialog.png',
                                alt: 'Meter Requests page with the decline confirmation dialog outlined and its Yes button emphasized; account names and the signed-in user are blurred'
                            }
                        ],
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
                images: [
                    {
                        title: 'Order Meters Form',
                        caption: 'Order Meters page with the Meter Order Value field and the note about administrator validation outlined, and the Send Meter Order button emphasized.',
                        src: 'assets/img/order-meters-form.png',
                        alt: 'Order Meters page with the form card outlined, showing the Meter Order Value field and the Send Meter Order button emphasized'
                    }
                ],
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
                images: [
                    {
                        title: 'Transfer Meters Form',
                        caption: 'Transfer Meters page with the Source Account, Available Meters, Meter Value, and Destination Account fields outlined, and the Transfer Meter button emphasized.',
                        src: 'assets/img/transfer-meters-form.png',
                        alt: 'Transfer Meters page with the form card outlined, showing Source Account, Available Meters, Meter Value, and Destination Account fields and the Transfer Meter button emphasized'
                    }
                ],
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
                images: [
                    {
                        title: 'Meter Records Listing',
                        caption: 'Meter Records page with search, Advanced Search, and the records table with the Account Name, Available Meters, Validate Meter(s), and Actions columns outlined; account names are blurred.',
                        src: 'assets/img/meter-records-listing.png',
                        alt: 'Meter Records page with the search bar, Advanced Search button, and records table outlined; account names are blurred'
                    }
                ],
                groups: [
                    { title: 'Access Path', items: ['Meters > Meter Records'] }
                ],
                children: [
                    {
                        id: 'view-meter',
                        title: 'View Meter',
                        description: 'View meter balance and meter details for the selected account.',
                        images: [
                            {
                                title: 'View Meter Details',
                                caption: 'Capture the selected account’s View Meter page with the meter balance and details outlined; blur account names.',
                                src: '',
                                alt: 'View Meter page showing the selected account meter balance and details',
                            }
                        ],
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
                        images: [
                            {
                                title: 'Transfer Meter from View Meter',
                                caption: 'Capture Transfer Meter opened from View Meter, with the transfer details and Transfer Meter button outlined; blur account names.',
                                src: '',
                                alt: 'Transfer Meter form opened from the selected account View Meter page',
                            }
                        ],
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
                        images: [
                            {
                            title: 'View Meter Log from Meter Records',
                            caption: 'Meter Records page with the row actions menu open and the View Meter Log option emphasized; account names are blurred.',
                            src: 'assets/img/view-meter-log-from-records.png',
                            alt: 'Meter Records page with the search bar and records table outlined and the View Meter Log option in the row actions menu emphasized; account names are blurred'
                        },
                            {
                            title: 'View Meter Log from View Meter',
                            caption: 'View Meters page with the Actions menu open and the View Meter Log option emphasized; the account name is blurred.',
                            src: 'assets/img/view-meter-log-from-view-meter.png',
                            alt: 'View Meters page with the meter details card outlined and the View Meter Log option in the Actions menu emphasized; the account name is blurred'
                        },
                            {
                            title: 'Meter Log',
                            caption: 'Meter Log page with the Transaction Type filter and the log table showing Date, Transaction Type, Target Account, Previous Balance, Addition, Deduction, Current Balance, and Remarks columns outlined; the account name is blurred.',
                            src: 'assets/img/view-meter-log-page.png',
                            alt: 'Meter Log page with the filter bar and log table outlined; the account name is blurred'
                        }
                    ],
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
                                remarkGuide: [
                                { remark: 'Used to Score Assessment', meaning: 'Meter was consumed by assessment completion.' },
                                { remark: 'Used to Score Assessment: <account_name>', meaning: 'Assessment consumption is attributed to the shown account.' },
                                { remark: 'Sent to <account_name>', meaning: 'Meters were deducted from the current account and transferred to the shown account.' },
                                { remark: 'Received from <account_name>', meaning: 'Meters were added to the current account from the shown account.' },
                                { remark: 'Initial Meters', meaning: 'Starting meter balance set during account meter initialization.' },
                                { remark: 'Meter Balance Update', meaning: 'Manual add/deduct adjustment from Update Meter Balance.' },
                                { remark: 'Moved to Newly Created Account: <account_name>', meaning: 'Meters were moved to a newly created child account.' },
                                { remark: '<type-change-specific-message>: <actor_account_name>', meaning: 'Consumption-type change event; message identifies the specific type-change action and actor account.' },
                                { remark: '(not set)', meaning: 'Applicable only to unresolved type=4 fallback output from stored/paired/parent resolution path.' }
                            ]
                            },
                            {
                                id: 'new-discovery-settings-changed',
                                title: 'New Discovery And Settings-Changed Notes',
                                description: 'Actor is the logged-in user at action time. Actor is not always the parent account.',
                                scenarioGuide: [
                                { term: 'Target', meaning: 'The account the log entry is about.' },
                                { term: 'Target, Actor, and Parent views', meaning: 'The Meter Log entry as it appears for that account.' },
                                { term: 'Both views', meaning: 'The same value appears in both logs.' },
                                { term: 'n', meaning: 'The amount of meters moved.' }
                            ],
                            scenarios: [
                                {
                                    title: 'Create New Account',
                                    rows: [
                                        { label: 'Remarks', entries: [
                                            { lines: [{ view: 'Target view', text: 'Initial Meters' }, { view: 'Actor view', text: 'Moved to Newly Created Account: <target_user_name>' }] }
                                    ] },
                                        { label: 'Target Account', entries: [
                                            { lines: [{ view: 'Both views', text: '<target_user_name>' }] }
                                    ] },
                                        { label: 'Addition and Deduction', entries: [
                                            { condition: 'Meter type is parent deduction and allocated value is 0', lines: [{ text: 'Addition = 0, Deduction = 0' }] },
                                        { condition: 'Meter type is self deduction and allocated value is n, where n > 0', lines: [{ text: 'Addition = n, Deduction = 0' }] }
                                    ] }
                                    ]
                                },
                                {
                                    title: 'Update Meter Type',
                                    rows: [
                                        { label: 'Remarks', entries: [
                                            { lines: [{ view: 'Target view', text: 'Meter Type Update (switched to self/parent deduction) by: <actor_user_name>' }, { view: 'Actor or Parent view', text: 'Meter Type Update (switched to self/parent deduction): <target_user_name>' }] }
                                    ] },
                                        { label: 'Target Account', entries: [
                                            { condition: 'Switched to self deduction', lines: [{ view: 'Both views', text: '<target_user_name>' }] },
                                        { condition: 'Switched to parent deduction', lines: [{ view: 'Both views', text: '<parent_user_name>' }] }
                                    ] },
                                        { label: 'Addition and Deduction', entries: [
                                            { condition: 'Switched to self deduction', lines: [{ view: 'Target view', text: 'Addition = n', note: 'target meter balance value' }, { view: 'Actor view', text: 'Deduction = n', note: 'actor meter balance value' }] },
                                        { condition: 'Switched to parent deduction', lines: [{ view: 'Target view', text: 'Deduction = n', note: 'target meter balance value' }, { view: 'Actor view', text: 'Addition = n', note: 'actor meter balance value' }] }
                                    ] }
                                    ]
                                },
                                {
                                    title: 'Update Meter Balance',
                                    rows: [
                                        { label: 'Remarks', entries: [
                                            { lines: [{ view: 'Target view', text: 'Meter Balance Update by: <actor_user_name>' }, { view: 'Parent view', text: 'Meter Balance Updated: <target_user_name>' }] }
                                    ] },
                                        { label: 'Target Account', entries: [
                                            { condition: 'Deduction', lines: [{ view: 'Both views', text: '<parent_user_name>' }] },
                                        { condition: 'Addition', lines: [{ view: 'Both views', text: '<target_user_name>' }] }
                                    ] },
                                        { label: 'Addition and Deduction', entries: [
                                            { condition: 'Deduction', lines: [{ view: 'Actor view', text: 'Addition = n' }, { view: 'Target view', text: 'Deduction = n' }] },
                                        { condition: 'Addition', lines: [{ view: 'Actor view', text: 'Deduction = n' }, { view: 'Target view', text: 'Addition = n' }] }
                                    ] }
                                    ]
                                },
                                {
                                    title: 'Use Meter Balance',
                                    rows: [
                                        { label: 'Remarks', entries: [
                                            { condition: 'Own candidate', lines: [{ text: 'Used to Score Assessment' }] },
                                        { condition: 'Lower-hierarchy candidate', lines: [{ text: 'Used to Score Assessment: <consumer_user_name>' }] }
                                    ] },
                                        { label: 'Target Account', entries: [
                                            { condition: 'Own candidate', lines: [{ text: '<own_user_name>' }] },
                                        { condition: 'Lower-hierarchy candidate', lines: [{ text: '<consumer_user_name>' }] }
                                    ] }
                                    ]
                                },
                                {
                                    title: 'Request Meter Approved',
                                    rows: [
                                        { label: 'Remarks', entries: [
                                            { lines: [{ view: 'Target view', text: 'Received from <actor_user_name>' }, { view: 'Actor view', text: 'Sent to <target_user_name>' }] }
                                    ] },
                                        { label: 'Target Account', entries: [
                                            { lines: [{ text: '<target_user_name>' }] }
                                    ] },
                                        { label: 'Addition and Deduction', entries: [
                                            { lines: [{ view: 'Actor view', text: 'Deduction = n' }, { view: 'Target view', text: 'Addition = n' }] }
                                    ] }
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
                        images: [
                            {
                                title: 'Update Meter Balance Form',
                                caption: 'Capture the selected account’s Update Meter Balance form with the adjustment value and save action outlined; blur account names.',
                                src: '',
                                alt: 'Update Meter Balance form showing the adjustment value and save action',
                            }
                        ],
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
                images: [
                    {
                        title: 'Meter Consumption Diagram',
                        caption: 'Create a flow diagram showing: candidate completes an assessment → meters are deducted once per candidate per assessment → generated report becomes available. Show a follow-up branch for viewing, downloading, emailing, or revisiting the report, labeled "No additional meter deduction".',
                        src: '',
                        alt: 'Diagram showing assessment completion, a single meter deduction per candidate per assessment, and later report access without additional deduction',
                    }
                ],
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
    global.__metersContent = metersContent;
})(window);