(function (global) {
    'use strict';

    var accountsContent = {
        title: 'Accounts',
        description: 'Provides access control and account management for GoPick accounts: Distributor, Sub Distributor, Account, Sub-Account, and Self Registered Account.',
        sections: [
            {
                id: 'create-account',
                title: 'Create Account',
                children: [
                    { id: 'create-account-information', title: 'Account Information' },
                    { id: 'create-assign-products', title: 'Assign Products' },
                    { id: 'create-meter-management', title: 'Meter Management' },
                    { id: 'create-other-account-settings', title: 'Other Account Settings' },
                    { id: 'create-review-account-details', title: 'Review Account Details' }
                ]
            },
            {
                id: 'view-accounts',
                title: 'View Accounts',
                children: [
                    { id: 'view-archived-accounts', title: 'View Archived Accounts' }
                ]
            },
            {
                id: 'other-functions',
                title: 'Other Pages',
                children: [
                    { id: 'account-detail', title: 'Account Detail' },
                    { id: 'update-account', title: 'Update Account' },
                    { id: 'update-specific', title: 'Update Specific' },
                    { id: 'privacy-consent', title: 'Privacy Consent' },
                    { id: 'demographics', title: 'Demographics' },
                    { id: 'assessment-completion-page', title: 'Assessment Completion Page' },
                    { id: 'assessment-center-logo', title: 'Assessment Center Logo' },
                    { id: 'unblock-account', title: 'Unblock Account' },
                    { id: 'manage-assigned-assessment', title: 'Manage Assigned Assessment' },
                    { id: 'search', title: 'Search' },
                    { id: 'advanced-search', title: 'Advanced Search' },
                    {
                        id: 'row-actions',
                        title: 'Row Actions',
                        children: [
                            { id: 'view-active-account', title: 'View Active Account' },
                            { id: 'view-archived-account', title: 'View Archived Account' },
                            { id: 'update-account-row-action', title: 'Update Account Row Action' },
                            { id: 'archive', title: 'Archive' },
                            { id: 'restore', title: 'Restore' }
                        ]
                    },
                    {
                        id: 'bulk-action',
                        title: 'Bulk Action',
                        children: [
                            { id: 'bulk-action-archive', title: 'Bulk Action: Archive' },
                            { id: 'bulk-action-delete', title: 'Bulk Action: Delete' },
                            { id: 'bulk-action-restore', title: 'Bulk Action: Restore' }
                        ]
                    }
                ]
            }
        ],
        createAccount: {
            detail: 'Creates a new account through the account creation wizard.',
            accessPath: 'Accounts > Create Account',
            howToUse: [
                'Open Accounts.',
                'Select Create Account.',
                'Complete Account Information.',
                'Complete Assign Products.',
                'Complete Meter Management.',
                'Complete Other Account Settings.',
                'Review account details.',
                'Save the account.'
            ],
            expected: ['The account is created using the configured information and can be viewed in View Accounts.'],
            notes: [
                { label: 'Dev', items: ['This module uses 5 layer architecture already but still many uses the legacy architecture.', 'Applied new principles and logged process.'] },
                { label: 'QA', items: ['Test minimum and maximum guard rails.', 'Test required-only creation and full-field creation.', 'Some inputs are conditional. Check whether conditional fields are documented.'] }
            ],
            steps: [
                {
                    id: 'create-account-information',
                    title: 'Account Information',
                    detail: 'Collects account identity, parent relationship, contact information, address information, account expiration, and account status.',
                    items: [
                        {
                            label: 'Required inputs',
                            children: [
                                'Account Type',
                                'Parent Account',
                                'Account Name',
                                'Username',
                                'Password',
                                'Confirm Password',
                                'Primary Contact Name',
                                'Primary Contact Email',
                                'Country',
                                'Business Phone Number',
                                'Business Address',
                                'Billing Address or same as Business Address',
                                'Expiry Date and Time',
                                'Status'
                            ]
                        },
                        {
                            label: 'System calculated input',
                            children: ['Actual Account Expiration']
                        }
                    ],
                    rules: [
                        {
                            label: 'Validation Guard Rails',
                            children: [
                                'Account Name, Username, Password, Primary Contact Name, and Primary Contact Email have a maximum of 100 characters.',
                                'Addresses have a maximum of 250 characters.',
                                'Phone number has a maximum of 25 characters.',
                                'Account Type can only be lower than the current user account type.',
                                'Password and Confirm Password must match.',
                                'Billing Address can be copied from Business Address by toggling the checkbox, or entered manually when the checkbox is off.'
                            ]
                        },
                        {
                            label: 'Account Creation Limit Guard Rails',
                            children: [
                                'Admin users bypass creation limit rules from Other Account Settings.',
                                'Non-admin users are limited by the account creation limits configured in Other Account Settings.',
                                'Active accounts are accounts that are not deactivated, archived, deleted, or expired.',
                                'Expiration is determined by Expiry Date plus Actual Account Expiration.',
                                'Expiry Date and Time cannot be set later than today.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-assign-products',
                    title: 'Assign Products',
                    detail: 'Assigns assessments that the company or organization account can use.',
                    items: [
                        {
                            label: 'Required selection',
                            children: ['At least one assessment from the available assessment list.']
                        },
                        {
                            label: 'Available assessment groups',
                            children: [
                                'Cognitive/Knowledge-based Assessment',
                                'Competency-based Assessment',
                                'Survey',
                                'Behavioral/Personality-Based Assessment',
                                'Test Battery, a group of assessments bundled together'
                            ]
                        }
                    ],
                    rules: ['At least one assessment is required.']
                },
                {
                    id: 'create-meter-management',
                    title: 'Meter Management',
                    detail: 'Sets the account meter management type and meter balance.',
                    items: [
                        {
                            label: 'Required inputs',
                            children: ['Meter management type', 'Meter balance']
                        },
                        {
                            label: 'Meter management options',
                            children: [
                                'Self deducts usage from the current account.',
                                'Parent Based deducts usage from the Distributor, Sub-Distributor, or Client parent account.'
                            ]
                        }
                    ],
                    rules: [
                        {
                            label: 'Meter Management Guard Rails',
                            children: [
                                'Sub-Account has two meter management type options. Other account types have one.',
                                'Self mode meter balance cannot be 0.',
                                'Parent mode parent meter balance cannot be 0.',
                                'Maximum meter value is 99,999.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-other-account-settings',
                    title: 'Other Account Settings',
                    detail: 'Sets account limits, API access, account contacts, billing configuration, and contract configuration.',
                    items: [
                        {
                            label: 'Defaulted inputs',
                            children: [
                                'User Account Limit defaults to 99.',
                                'Sub-Distributor Limit defaults to 0.',
                                'Client Limit defaults to 0.',
                                'Sub-Account Limit defaults to 0.',
                                'Self Registration Limit defaults to 0.'
                            ]
                        },
                        {
                            label: 'Optional inputs',
                            children: [
                                'API Access Username',
                                'HRSC Name',
                                'HRSC Email',
                                'Assessment Specialist Name',
                                'Assessment Specialist Email',
                                'Client Contact Person Name',
                                'Client Contact Person Email',
                                'Client Usage Recipient Email',
                                'Site Billing Type',
                                'Contract Type'
                            ]
                        },
                        {
                            label: 'Conditional inputs',
                            children: [
                                'Sub-Distributor Limit appears only for Distributor accounts.',
                                'Client Limit appears only for Distributor and Sub-Distributor accounts.',
                                'Sub-Account Limit appears only for Distributor, Sub-Distributor, and Client accounts.',
                                'Billing Amount appears only when site billing type is With Site Fee.',
                                'Addendum and Contracted Meters apply to Volume-based contracts.',
                                'Base Meter applies to Per Usage contracts.'
                            ]
                        }
                    ],
                    rules: [
                        {
                            label: 'Display & Visibility Guard Rails',
                            children: [
                                'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contact Person Name, and Client Contact Person Email have a maximum of 100 characters.',
                                'Sub-Distributor Limit appears only for Distributor accounts.',
                                'Client Limit appears only for Distributor and Sub-Distributor accounts.',
                                'Sub-Account Limit appears only for Distributor, Sub-Distributor, and Client accounts.',
                                'Billing Amount appears only when site billing type is With Site Fee.'
                            ]
                        },
                        {
                            label: 'Data Sync Guard Rails',
                            children: [
                                'Contracted Meters is prefilled from Meter Management.',
                                'Addendum is locked when the selected meter type is parent based.',
                                'Maximum account limit value is 999.',
                                'Maximum Addendum, Base Meter, and Billing Amount value is 999.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-review-account-details',
                    title: 'Review Account Details',
                    detail: 'Reviews the entered and selected account creation details before saving the account.',
                    items: [
                        'Account information.',
                        'Assigned products.',
                        'Meter management.',
                        'Other account settings.'
                    ],
                    howToUse: [
                        'Open the Review Account step.',
                        'Review the displayed account information.',
                        'Review assigned products.',
                        'Review meter management.',
                        'Review other account settings.',
                        'Go back to the relevant step when a value needs correction.',
                        'Save the account when the reviewed details are correct.'
                    ],
                    rules: [
                        'Inputs are optional when they are not indicated as required.',
                        'Inputs indicated as required must be completed.',
                        'Conditional inputs appear only when their condition is met.',
                        'Saving must use the reviewed configuration from the current create account wizard.'
                    ],
                    expected: ['The reviewed account details are used when the account is saved.']
                }
            ]
        },
        viewAccounts: {
            detail: 'Displays the active account listing with search, advanced search, archived account navigation, bulk actions, and row actions.',
            legend: [
                { label: 'Active', detail: 'Active and not yet expired' },
                { label: 'Deactivated', detail: 'Deactivated' },
                { label: 'Expiring', detail: 'Active and exceeded expiration date but not account expiration extension' },
                { label: 'Expired', detail: 'Active, exceeded expiration date and exceeded account expiration extension' },
                { label: 'Archived', detail: 'Archived account' }
            ],
            actions: [
                { label: 'Search', href: '#search' },
                { label: 'Advanced Search', href: '#advanced-search' },
                {
                    label: 'Bulk Action',
                    href: '#bulk-action',
                    children: [
                        { label: 'Archive', href: '#bulk-action-archive' },
                        { label: 'Delete', href: '#bulk-action-delete' }
                    ]
                },
                {
                    label: 'Row Actions',
                    href: '#row-actions',
                    children: [
                        { label: 'View', href: '#view-active-account' },
                        { label: 'Update Wizard', href: '#update-account' },
                        { label: 'Archive Specific', href: '#archive' }
                    ]
                },
                {
                    label: 'View Archived Accounts',
                    href: '#view-archived-accounts',
                    children: [
                        { label: 'Move to the archived accounts page', href: '#view-archived-accounts' }
                    ]
                }
            ],
            archived: {
                id: 'view-archived-accounts',
                title: 'View Archived Accounts',
                detail: 'Displays archived accounts with search, advanced search, bulk actions, and row actions.',
                actions: [
                    { label: 'Search', href: '#search' },
                    { label: 'Advanced Search', href: '#advanced-search' },
                    {
                        label: 'Bulk Action',
                        href: '#bulk-action',
                        children: [
                            { label: 'Restore', href: '#bulk-action-restore' },
                            { label: 'Delete', href: '#bulk-action-delete' }
                        ]
                    },
                    {
                        label: 'Row Actions',
                        href: '#row-actions',
                        children: [
                            { label: 'View', href: '#view-archived-account' },
                            { label: 'Restore', href: '#restore' }
                        ]
                    },
                    {
                        label: 'View Account',
                        href: '#view-accounts',
                        children: [
                            { label: 'Move to the active accounts page', href: '#view-accounts' }
                        ]
                    }
                ]
            }
        },
        updateSpecific: {
            id: 'update-specific',
            title: 'Update Specific',
            detail: 'Updates one account detail section from the account detail page. The available update form depends on the account detail section where the update is triggered.',
            rules: ['Updating the current user own account only opens the Account Information variant.', 'Password fields are not prefilled.'],
            accessPath: 'Accounts > View Accounts > Row Actions > View > Section > Update',
            howToUse: [
                'Open the account detail page.',
                'Open Account Information, Assigned Assessments, Meter Management, or Other Account Settings.',
                'Select Update.',
                'Update the section-specific fields.',
                'Review changes.',
                'Save changes.'
            ],
            expected: ['Only the selected account section is updated.'],
            notes: [{ label: 'QA and System User', items: ['Changes happen only where the section are updating.'] }],
            groups: [
                {
                    title: 'Account Information',
                    items: [
                        {
                            label: 'Locked inputs',
                            children: ['Account Type', 'Parent Account', 'Account Name']
                        },
                        {
                            label: 'Editable inputs',
                            children: [
                                'Username',
                                'Password',
                                'Confirm Password',
                                'Primary Contact Name',
                                'Primary Contact Email',
                                'Country',
                                'Business Phone Number',
                                'Business Address',
                                'Billing Address or same as Business Address',
                                'Expiry Date and Time',
                                'Actual Account Expiration'
                            ]
                        },
                        {
                            label: 'Conditional input',
                            children: ['Status does not show when editing the current user own account.']
                        }
                    ],
                    expected: [
                        'Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters.',
                        'Addresses: max of 250 characters.',
                        'Phone Number: max of 25 characters.',
                        'Password and Confirm Password should match.',
                        'Billing Address can be similar to Business Address using checkbox toggled or enter manually via input that shows up when checkbox is off.',
                        'Expiry Date & Time cannot be set later than today.'
                    ]
                },
                {
                    title: 'Assigned Assessments',
                    items: [
                        {
                            label: 'Editable inputs',
                            children: ['Selected assessments', 'Assessment meter consumption']
                        },
                        {
                            label: 'Available actions',
                            children: ['Manage Assigned Assessment', 'Change Log', 'Update Assessment']
                        }
                    ]
                },
                {
                    title: 'Meter Management',
                    items: [
                        {
                            label: 'Editable inputs',
                            children: ['Meter Management Type', 'Current Meters', 'Parent Meter Balance']
                        },
                        {
                            label: 'Available actions',
                            children: ['View Meter Logs']
                        }
                    ],
                    expected: ['Sub-Account has Deduct usage from this account and Deduct usage from Client Account.'],
                    notes: [{ label: 'QA, Dev, System User', items: ['Deduction to self: Deduct usage from this account.', 'Deduct from parent: Deduct usage from Distributor/Sub-Distributor/Client Account.'] }]
                },
                {
                    title: 'Other Account Settings',
                    items: [
                        {
                            label: 'Editable inputs',
                            children: [
                                'User Account Limit by account type',
                                'API Access Username',
                                'HRSC Name',
                                'HRSC Email',
                                'Assessment Specialist Name',
                                'Assessment Specialist Email',
                                'Client Contact Person Name',
                                'Client Contact Person Email',
                                'Site Billing Amount (PHP)(Type)',
                                'Contract Type'
                            ]
                        },
                        {
                            label: 'Conditional inputs',
                            children: ['Site Billing Amount (PHP)', 'Contract Meters', 'Addendum', 'Base Meter']
                        }
                    ],
                    expected: [
                        'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters.',
                        'If Site Billing Amount (PHP)(Type) is Included in package then the Site Billing Amount (PHP) appears.',
                        'If Contract Type is Volume-based then the Addendum and Contract Meters appears.',
                        'If Contract Type is Per Usage then the Base Meter appears.'
                    ]
                }
            ],
            securityRule: 'Passwords must not be displayed as old password values.'
        },
        functions: [
            {
                id: 'account-detail',
                title: 'Account Detail',
                detail: 'Displays account information configured during creation and account configuration actions.',
                accessPath: 'Accounts > View Accounts > Row Actions > View',
                actions: [
                    'Return Button',
                    'Account Configuration Dropdown',
                    'Account Information Section',
                    'Assigned Assessments Section',
                    'Meter Management Section',
                    'Other Account Settings Section',
                    'List Of Users Section'
                ],
                expected: [
                    'From an active account detail page, the user returns to View Accounts.',
                    'From an archived account detail page, the user returns to View Archived Accounts.',
                    'Parent Meter appears when Metering Management Type is not Deduct usage from this account.',
                    'Site Billing Amount (PHP) appears when Site Billing Amount (PHP)(Type) is Included in Package.',
                    'Addendum and Contract Meters appear when Contract Type is Volume-based.',
                    'Base Meter appears when Contract Type is Per Usage.'
                ]
            },
            {
                id: 'update-account',
                title: 'Update Account',
                detail: 'Updates account settings through the update wizard. This is different from Update Specific, which updates a single account detail section.',
                accessPath: 'Accounts > View Accounts > Row Actions > Update',
                howToUse: [
                    'Open View Accounts.',
                    'Select Update on a specific account.',
                    'Complete Update Account Information.',
                    'Complete Update Assigned Products.',
                    'Complete Update Meter Management.',
                    'Complete Update Other Account Settings.',
                    'Review account details.',
                    'Save changes.'
                ],
                rules: ['Update only appears when the account is not archived and is not the current user own account.']
            },
            {
                id: 'privacy-consent',
                title: 'Privacy Consent',
                detail: 'Manages privacy consent content and candidate-side consent checkbox visibility.',
                actions: ['Consent content', 'Consent Gather Data Checkbox to Appear', 'Consent Capture Photo to Appear', 'Save changes'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Privacy Consent',
                howToUse: ['Open Privacy Consent.', 'Update consent content.', 'Set Consent Gather Data Checkbox to Appear.', 'Set Consent Capture Photo to Appear.', 'Save changes.'],
                expected: ['Privacy consent content and configured checkboxes are updated on the candidate side.']
            },
            {
                id: 'demographics',
                title: 'Demographics',
                detail: 'Page to manage demographics form.',
                actions: ['Default Required: First Name, Last Name, Gender, Email, Position Applied', 'Can be toggled: Birthdate, Civil Status, Alternative/Work Email, Phone Number, Educational Attainment, Work Experience, Level of Position Applying For, Course, Priority Course, Region of Residence, Agency Visited, Service Availed, Customer Type, Age, Transaction Type, School', 'Save Button'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Demographics',
                howToUse: ['Navigate into it.', 'Update Content View Display via Checkbox what to display.', 'Save Button.'],
                rules: ['This can be set to not show for the specific account group. Configured by Super Admins.'],
                expected: ['Update Demographics which data to gather.', 'Can be visible or not; if not visible means account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always Check RBAC for the specific Account type.'] }]
            },
            {
                id: 'assessment-completion-page',
                title: 'Assessment Completion Page',
                detail: 'Page to manage completion page.',
                actions: ['Edit Content', 'Save Button'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Assessment Completion Page',
                howToUse: ['Navigate into it.', 'Pre-filled inputs can be altered: Content.', 'Save button.'],
                rules: ['This can be set to not show for the specific account group. Configured by Super Admins.'],
                expected: ['Can be visible or not; if not visible means account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always Check RBAC for the specific account type.'] }]
            },
            {
                id: 'assessment-center-logo',
                title: 'Assessment Center Logo',
                detail: 'Page for updating Assessment Center Logo.',
                actions: ['Upload Logo', 'Save Button'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Assessment Center Logo Page',
                howToUse: ['Navigate into it.', 'Can be pre-filled or none, uploading image will replace it.', 'Upload image.', 'Save button.'],
                rules: ['This can be set to not show for the specific account group. Configured by Super Admins.'],
                expected: ['Can be visible or not; if not visible means account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always Check RBAC for the specific account type.'] }]
            },
            {
                id: 'unblock-account',
                title: 'Unblock Account',
                detail: 'Triggered when account is blocked due to multiple attempts to login.',
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Unblock Account Trigger',
                howToUse: ['Navigate into it.', 'Trigger it.'],
                notes: [{ label: 'QA and System User', items: ['This only appears if account is blocked.'] }]
            },
            {
                id: 'manage-assigned-assessment',
                title: 'Manage Assigned Assessment',
                detail: 'Updates a specific assigned assessment configuration.',
                accessPath: 'Accounts > View Accounts > Row Actions > View > Assigned Assessments > Manage',
                howToUse: ['Open the account detail page.', 'Open Assigned Assessments.', 'Select Manage.', 'Update Set Max Respondents.', 'Update Valid Date Start.', 'Update Valid Date Expiration.', 'Update Status.', 'Save changes.']
            }
        ],
        rowActions: [
            {
                id: 'view-active-account',
                title: 'View Active Account',
                detail: 'Opens account detail for an active, non-archived account.',
                accessPath: 'Accounts > View Accounts > Row Actions > View',
                howToUse: ['Open View Accounts.', 'Select View on a non-archived account row.'],
                items: [
                    'Return Button: Returns the user to View Accounts.',
                    'Account Configuration Dropdown: Privacy Consent, Demographics, Assessment Completion Page, Assessment Center Logo, Unblock Account.',
                    'Account Information: Active Badge, Account Type, Parent Account, Account Name, Username, Password, Confirm Password, Primary Contact Name, Primary Contact Email, Country, Business Phone Number, Business Address, Billing Address, Expiry Date and Time, Actual Account Expiration, Update Specific.',
                    'Assigned Assessments: shows list of all assessments for the account by categories, with Update Specific, Manage, and Change Log.',
                    'Meter Management: Metering Management Type, Allocated Meter, Parent Meter, Update Specific, View Meter Logs.',
                    'Other Account Settings: account limits, API Access Username, HRSC details, Assessment Specialist details, Client Contact details, Site Billing, Contract Type, Contract Meters, Addendum, Base Meter, Update Specific.',
                    'List of Users: Table list of account users under the selected account.'
                ],
                expected: [
                    'The active account detail page opens.',
                    'If Metering Management Type is not Deduct usage from this account then Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package then Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based then Addendum and Contract Meters appears.',
                    'If Contract Type is Per Usage then Base Meter appears.'
                ]
            },
            {
                id: 'view-archived-account',
                title: 'View Archived Account',
                detail: 'Opens account detail for an archived account.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts > Row Actions > View',
                howToUse: ['Open View Archived Accounts.', 'Select View on an archived account row.'],
                items: [
                    'Return Button: Returns the user to View Archived Accounts.',
                    'Account Information: Active Badge, Account Type, Parent Account, Account Name, Username, Password, Confirm Password, Primary Contact Name, Primary Contact Email, Country, Business Phone Number, Business Address, Billing Address, Expiry Date and Time, Actual Account Expiration.',
                    'Assigned Assessments: shows list of all assessments for the account by categories.',
                    'Meter Management: Metering Management Type, Allocated Meter, Parent Meter.',
                    'Other Account Settings: account limits, API Access Username, HRSC details, Assessment Specialist details, Client Contact details, Site Billing, Contract Type, Contract Meters, Addendum, Base Meter.',
                    'List of Users: Table list of account users under the selected account.'
                ],
                expected: [
                    'The archived account detail page opens.',
                    'If Metering Management Type is not Deduct usage from this account then Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package then Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based then Addendum and Contract Meters appears.',
                    'If Contract Type is Per Usage then Base Meter appears.'
                ]
            },
            {
                id: 'update-account-row-action',
                title: 'Update Account Row Action',
                detail: 'Links to Update Account from an account table row.',
                items: [
                    {
                        label: 'Account Information',
                        children: [
                            'Account Type, Parent Account, and Account Name cannot be changed.',
                            'Username',
                            'Password',
                            'Confirm Password',
                            'Primary Contact Name',
                            'Primary Contact Email',
                            'Country',
                            'Business Phone Number',
                            'Business Address',
                            'Billing Address: required or set as same as Business Address',
                            'Expiry Date and Time',
                            'Actual Account Expiration: +2 Months(default)',
                            'Status: Active(default), hidden when editing own account'
                        ]
                    },
                    {
                        label: 'Assign Products',
                        children: [
                            'Selected Assessments can adjust each meter consumption.',
                            'Manage',
                            'Change Log',
                            'Update Assessment'
                        ]
                    },
                    {
                        label: 'Meter Management',
                        children: [
                            'Meter Management Type: Deduct usage from this account or Deduct usage from Account.',
                            'Current Meters / Parent Meter Balance cannot be modified when Meter Management Type is Deduct usage from Account.',
                            'View Meter Logs'
                        ]
                    },
                    {
                        label: 'Other Account Settings',
                        children: [
                            'User Account Limit by account type.',
                            'API Access Username',
                            'HRSC Name and Email',
                            'Assessment Specialist Name and Email',
                            'Client Contact Person Name and Email',
                            'Site Billing Amount (PHP)(Type)',
                            'Site Billing Amount (PHP)',
                            'Contract Type',
                            'Contract Meters',
                            'Addendum',
                            'Base Meter'
                        ]
                    },
                    'Review Account Details'
                ],
                accessPath: 'Accounts > View Accounts > Row Actions > Update',
                howToUse: ['Open View Accounts.', 'Select Update on a specific account row.'],
                rules: ['This only appears when the account is not archived and is not the current user own account.'],
                expected: [
                    'The update account wizard opens.',
                    'Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters.',
                    'Addresses: max of 250 characters.',
                    'Phone Number: max of 25 characters.',
                    'Password and Confirm Password should match.',
                    'Billing Address can be similar to Business Address using checkbox toggled or enter manually via input that shows up when checkbox is off.',
                    'Expiry Date & Time cannot be set later than today.',
                    'Sub-account has two meter options: Deduct usage from this account and Deduct usage from Client Account.',
                    'Max Limit of Account Limits: 999.',
                    'Max Value of Addendum, Base Meter and Billing Amount: 999.'
                ]
            },
            {
                id: 'archive',
                title: 'Archive',
                detail: 'Moves a non-archived account to archived accounts.',
                accessPath: 'Accounts > View Accounts > Row Actions > Archive',
                howToUse: ['Open View Accounts.', 'Select Archive on a specific account row.'],
                rules: ['This only appears when the account is not archived.'],
                expected: ['The account is moved to archived accounts.']
            },
            {
                id: 'restore',
                title: 'Restore',
                detail: 'Moves an archived account back to the account list.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts > Row Actions > Restore',
                howToUse: ['Open View Archived Accounts.', 'Select Restore on a specific account row.'],
                rules: ['This only appears when the account is archived.'],
                expected: ['The account is restored to the active account list.']
            }
        ],
        searchSections: [
            {
                id: 'search',
                title: 'Search',
                detail: 'Search for the contents of the table.',
                accessPath: 'Accounts > View Accounts > Search Input',
                howToUse: ['Navigate in.', 'Input values.', 'Enter.']
            },
            {
                id: 'advanced-search',
                title: 'Advanced Search',
                detail: 'Searches account table content using configured rules.',
                accessPath: 'Accounts > View Accounts > Advanced Search > Add Rule',
                howToUse: ['Open an account listing table.', 'Open Advanced Search.', 'Add or remove rules.', 'Select Search.'],
                expected: ['Accounts matching the configured rules are shown in the table.']
            }
        ],
        bulkActions: [
            {
                id: 'bulk-action-archive',
                title: 'Bulk Action: Archive',
                detail: 'Moves selected account rows to archived accounts.',
                accessPath: 'Accounts > View Accounts > Bulk > Archive',
                howToUse: ['Open View Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Archive.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are moved to archived accounts.']
            },
            {
                id: 'bulk-action-delete',
                title: 'Bulk Action: Delete',
                detail: 'Deletes selected account rows.',
                accessPath: 'Accounts > View Accounts > Bulk > Delete',
                howToUse: ['Open View Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Delete.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are deleted.']
            },
            {
                id: 'bulk-action-restore',
                title: 'Bulk Action: Restore',
                detail: 'Restores selected archived account rows.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts > Bulk > Restore',
                howToUse: ['Open View Archived Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Restore.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are restored to the active account list.']
            }
        ]
    };

    function appendText(parent, tagName, className, text) {
        if (!text) return null;
        var element = document.createElement(tagName);
        element.className = className;
        element.textContent = text;
        parent.appendChild(element);
        return element;
    }

    function createBulletList(items) {
        var list = document.createElement('ul');
        list.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            var li = document.createElement('li');
            li.className = 'flex gap-2';
            var marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
            var text = document.createElement('span');
            text.textContent = typeof item === 'string' ? item : item.label;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);

            if (item && typeof item !== 'string' && item.children && item.children.length) {
                var nested = document.createElement('ul');
                nested.className = 'ml-7 mt-2 space-y-1 text-sm text-slate-500';
                item.children.forEach(function (child) {
                    var childItem = document.createElement('li');
                    childItem.textContent = child;
                    nested.appendChild(childItem);
                });
                list.appendChild(nested);
            }
        });
        return list;
    }

    function createActionLinkList(items) {
        var list = document.createElement('ul');
        list.className = 'mt-3 ml-4 space-y-2 border-l border-slate-100 pl-4';
        items.forEach(function (item) {
            var li = document.createElement('li');
            var link = document.createElement('a');
            link.className = 'block text-sm font-semibold text-brand hover:text-brand-dark transition-colors';
            link.href = item.href;
            link.textContent = item.label;
            li.appendChild(link);
            if (item.children && item.children.length) {
                li.appendChild(createActionLinkList(item.children));
            }
            list.appendChild(li);
        });
        return list;
    }

    function createBox(titleText, items, boxClass, titleClass) {
        if (!items || !items.length) return null;
        var box = document.createElement('div');
        box.className = boxClass || 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
        appendText(box, 'h4', titleClass || 'font-semibold text-amber-900 mb-2', titleText);
        box.appendChild(createBulletList(items));
        return box;
    }

    function appendSectionMeta(card, section) {
        if (section.actions && section.actions.length) {
            var hasLinks = section.actions.some(function (item) {
                return item && typeof item !== 'string' && item.href;
            });
            appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', hasLinks ? 'Related Features' : 'Controls');
            card.appendChild(hasLinks ? createActionLinkList(section.actions) : createBulletList(section.actions));
        }

        if (section.items && section.items.length) {
            card.appendChild(createBulletList(section.items));
        }

        if (section.accessPath) {
            appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Access Path');
            appendText(card, 'p', 'mt-1 text-sm text-slate-600 leading-relaxed', section.accessPath);
        }

        if (section.howToUse && section.howToUse.length) {
            appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'How To Use');
            card.appendChild(createBulletList(section.howToUse));
        }

        if (section.rules && section.rules.length) {
            card.appendChild(createBox('Rules', section.rules));
        }

        if (section.expected && section.expected.length) {
            card.appendChild(createBox('Expected Result', section.expected, 'mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4', 'font-semibold text-emerald-900 mb-2'));
        }

        if (section.notes && section.notes.length) {
            section.notes.forEach(function (note) {
                card.appendChild(createBox('Notes: ' + note.label, note.items, 'mt-4 rounded-lg border border-slate-100 bg-white p-4', 'font-semibold text-slate-900 mb-2'));
            });
        }
    }

    function createInfoCard(section, level) {
        var card = document.createElement('article');
        card.className = level === 'nested'
            ? 'rounded-lg border border-slate-100 bg-white p-4'
            : 'rounded-lg border border-slate-100 bg-slate-50 p-5';
        if (!section.omitCardId) card.id = section.id;
        appendText(card, level === 'nested' ? 'h4' : 'h3', 'font-semibold text-slate-900 mb-2', section.title);
        appendText(card, 'p', 'text-sm text-slate-600 leading-relaxed', section.detail);
        appendSectionMeta(card, section);
        return card;
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';

        function appendItem(section, level, parent) {
            var li = document.createElement('li');
            li.className = 'sidebar-item';
            li.dataset.target = section.id;
            li.dataset.level = String(level);
            var a = document.createElement('a');
            var indent = level === 0 ? '' : ' pl-' + Math.min(level * 3, 12) + ' border-l border-slate-100';
            a.className = 'block text-slate-600 hover:text-brand transition-colors py-1' + indent;
            a.href = '#' + section.id;
            a.dataset.target = section.id;
            a.textContent = section.title;
            li.appendChild(a);
            if (section.children && section.children.length) {
                var childList = document.createElement('ul');
                childList.className = 'sidebar-children mt-1 space-y-1';
                section.children.forEach(function (child) {
                    appendItem(child, level + 1, childList);
                });
                li.appendChild(childList);
            }
            parent.appendChild(li);
        }

        accountsContent.sections.forEach(function (section) {
            appendItem(section, 0, list);
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var links = Array.prototype.slice.call(sidebar.querySelectorAll('a[data-target]'));

        links.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;

        activeLink.classList.add('active', 'text-brand', 'font-semibold');
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var targetIds = Array.prototype.slice.call(sidebar.querySelectorAll('a[data-target]'))
            .map(function (link) { return link.dataset.target; })
            .filter(Boolean);

        var currentId = null;
        var closestDistance = Number.POSITIVE_INFINITY;
        var activationOffset = 96;
        targetIds.forEach(function (id) {
            var target = document.getElementById(id);
            if (!target) return;
            var distance = Math.abs(target.getBoundingClientRect().top - activationOffset);
            if (distance < closestDistance) {
                closestDistance = distance;
                currentId = id;
            }
        });

        return currentId || targetIds[0] || null;
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
        window.addEventListener('hashchange', function () {
            setTimeout(updateFromScroll, 50);
        });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderCreateAccount() {
        var container = document.getElementById('createAccountSections');
        if (!container) return;
        container.innerHTML = '';
        var summary = createInfoCard({
            id: 'create-account-summary',
            title: 'Access, Usage, and Notes',
            detail: accountsContent.createAccount.detail,
            accessPath: accountsContent.createAccount.accessPath,
            howToUse: accountsContent.createAccount.howToUse,
            expected: accountsContent.createAccount.expected,
            notes: accountsContent.createAccount.notes
        });
        container.appendChild(summary);

        accountsContent.createAccount.steps.forEach(function (step, index) {
            var card = createInfoCard(step);
            var badge = document.createElement('div');
            badge.className = 'mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white';
            badge.textContent = index + 1;
            card.insertBefore(badge, card.firstChild);
            container.appendChild(card);
        });
    }

    function renderLegend(container, items) {
        var grid = document.createElement('div');
        grid.className = 'mt-4 grid grid-cols-1 md:grid-cols-2 gap-4';
        items.forEach(function (item) {
            var card = document.createElement('div');
            card.className = 'p-3 rounded-lg bg-white border border-slate-100';
            appendText(card, 'div', 'text-sm font-bold text-slate-900', item.label);
            appendText(card, 'div', 'text-xs text-slate-500 leading-relaxed mt-1', item.detail);
            grid.appendChild(card);
        });
        container.appendChild(grid);
    }

    function renderViewAccounts() {
        var container = document.getElementById('viewAccountsContent');
        if (!container) return;
        container.innerHTML = '';
        appendText(container, 'p', 'text-sm text-slate-600 leading-relaxed', accountsContent.viewAccounts.detail);
        appendText(container, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Legends');
        renderLegend(container, accountsContent.viewAccounts.legend);
        appendText(container, 'p', 'mt-6 text-xs font-bold uppercase tracking-wider text-slate-400', 'Related Features');
        container.appendChild(createActionLinkList(accountsContent.viewAccounts.actions));
        container.appendChild(createInfoCard(accountsContent.viewAccounts.archived));
    }

    function renderUpdateSpecific() {
        var container = document.getElementById('updateSpecificContent');
        if (!container) return;
        container.innerHTML = '';
    }

    function createUpdateSpecificCard() {
        var section = accountsContent.updateSpecific;
        var intro = createInfoCard(section);
        appendText(intro, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Variants');
        section.groups.forEach(function (group) {
            intro.appendChild(createInfoCard(group, 'nested'));
        });
        intro.appendChild(createBox('Rules', [section.securityRule]));
        return intro;
    }

    function renderFunctions() {
        var container = document.getElementById('functionSections');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.functions.forEach(function (section) {
            container.appendChild(createInfoCard(section));
            if (section.id === 'update-account') {
                container.appendChild(createUpdateSpecificCard());
            }
        });
    }

    function renderRowActions() {
        var container = document.getElementById('rowActionsContent');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.rowActions.forEach(function (section) {
            container.appendChild(createInfoCard(section));
        });
    }

    function renderSearchSections() {
        accountsContent.searchSections.forEach(function (section) {
            var container = document.getElementById(section.id + 'Content');
            if (!container) return;
            container.innerHTML = '';
            var renderedSection = Object.assign({}, section, { omitCardId: true });
            container.appendChild(createInfoCard(renderedSection));
        });
    }

    function renderBulkActions() {
        var container = document.getElementById('bulkActionContent');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.bulkActions.forEach(function (section) {
            container.appendChild(createInfoCard(section));
        });
    }

    function renderHero() {
        var title = document.getElementById('accountsPageTitle');
        var description = document.getElementById('accountsPageDescription');
        if (title) title.textContent = accountsContent.title;
        if (description) description.textContent = accountsContent.description;
    }

    function renderAll() {
        renderHero();
        renderSidebar();
        renderCreateAccount();
        renderViewAccounts();
        renderUpdateSpecific();
        renderFunctions();
        renderRowActions();
        renderSearchSections();
        renderBulkActions();
        setupSidebarVisibility();
        scrollToHashTarget();
    }

    function scrollToHashTarget() {
        var targetId = (location.hash || '').replace('#', '');
        if (!targetId) return;

        var target = document.getElementById(targetId);
        if (!target) return;

        setTimeout(function () {
            target.scrollIntoView({ block: 'start' });
            setSidebarBranch(targetId);
        }, 0);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__accountsContent = accountsContent;
})(window);
