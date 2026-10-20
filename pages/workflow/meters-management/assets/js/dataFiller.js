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
                        caption: 'Pending meter requests queue with actions to review, approve, or reject allocations.',
                        src: '',
                        alt: 'Meter Requests Table Screenshot'
                    }
                ],
                children: [
                    {
                        id: 'approve-or-reject-request',
                        title: 'Approve Or Reject Request',
                        description: 'Review pending meter requests and approve or reject the request.',
                        images: [
                            {
                                title: 'Approve / Reject Request Dialog',
                                caption: 'Confirmation prompt to approve or reject meter movement and allocate balances.',
                                src: '',
                                alt: 'Approve / Reject Dialog Screenshot'
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
                        caption: 'Form to submit an inbound request for meter balance to higher hierarchy accounts.',
                        src: '',
                        alt: 'Order Meters Form Screenshot'
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
                        title: 'Transfer Meters Modal',
                        caption: 'Source balance selector, transfer value input, and destination account chooser.',
                        src: '',
                        alt: 'Transfer Meters Modal Screenshot'
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
                        title: 'Meter Records Table View',
                        caption: 'Comprehensive list of accounts with active balances, pending allocation, and actions.',
                        src: '',
                        alt: 'Meter Records List Screenshot'
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
    global.__metersContent = metersContent;
})(window);