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
            images: [
                {
                    title: 'Create Account Wizard Overview',
                    caption: 'Displays the step-by-step account configuration wizard.',
                    src: 'assets/img/create-account-wizard-overview.png',
                    alt: 'Create Account page showing the five-step wizard progress bar and the Account Information form'
                }
            ],
            accessPath: 'Accounts > Create Account',
            howToUse: [
                'Open Accounts.',
                'Select Create Account.',
                { label: 'Complete Account Information.', href: '#create-account-information' },
                { label: 'Complete Assign Products.', href: '#create-assign-products' },
                { label: 'Complete Meter Management.', href: '#create-meter-management' },
                { label: 'Complete Other Account Settings.', href: '#create-other-account-settings' },
                { label: 'Review account details.', href: '#create-review-account-details' },
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
                    images: [
                        {
                            title: 'Account Information: top of the form',
                            caption: 'Wizard progress bar and the first fields: Account Type, Account Name, Username, passwords, contact details, Country, and Business Phone Number.',
                            src: 'assets/img/create-account-information-top.png',
                            alt: 'Create Account wizard on step 1 with the Account Information form outlined, showing Account Type, Account Name, Username, Password, Confirm Password, and primary contact fields'
                        },
                        {
                            title: 'Account Information: rest of the form',
                            caption: 'Business Address, the billing address checkbox, Expiry Date and Time, Actual Account Expiration, Status, and the Next button.',
                            src: 'assets/img/create-account-information-bottom.png',
                            alt: 'Lower part of the Account Information form with the address, expiry, status fields outlined and the Next button emphasized'
                        }
                    ],
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
                    images: [{
                        title: 'Assign Products',
                        caption: 'Assign Products step with the five assessment category dropdowns outlined, and the Back and Next buttons below.',
                        src: 'assets/img/create-assign-products.png',
                        alt: 'Create Account wizard on step 2 with the Assign Products card outlined and the Cognitive, Competency, Survey, Behavioral, and Test Battery category dropdowns emphasized'
                    }],
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
                    images: [{
                        title: 'Meter Management',
                        caption: 'Meter Management step with the card and the Current Meter(s) field outlined, and the Back and Next buttons below.',
                        src: 'assets/img/create-meter-management.png',
                        alt: 'Create Account wizard on step 3 with the Meter Management card outlined, showing Metering Management Type and the Current Meter(s) field emphasized'
                    }],
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
                    images: [
                        {
                            title: 'Other Account Settings: limits and contacts',
                            caption: 'Account limits, API Access Username, and the HRSC fields at the top of the step.',
                            src: 'assets/img/create-other-account-settings-top.png',
                            alt: 'Create Account wizard on step 4 with the Other Account Settings card outlined and the account limit fields emphasized'
                        },
                        {
                            title: 'Other Account Settings: billing and contract',
                            caption: 'Assessment specialist and client contact fields, Site Billing Type, Contract Type, Contracted Meters, Addendum, and the Next button.',
                            src: 'assets/img/create-other-account-settings-bottom.png',
                            alt: 'Lower part of the Other Account Settings step with the billing and contract fields outlined and the Next button emphasized'
                        }
                    ],
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
                    images: [
                        {
                            title: 'Review Account Details: account and assessments',
                            caption: 'Review Account Information and Review Assigned Assessments, with personal values blurred.',
                            src: 'assets/img/create-review-account-top.png',
                            alt: 'Create Account wizard on the final step with the review card outlined, showing account information and assigned assessments; personal values are blurred'
                        },
                        {
                            title: 'Review Account Details: meters, settings, and submit',
                            caption: 'Review Meter Management and Review Other Account Settings, with the Back and Submit buttons.',
                            src: 'assets/img/create-review-account-bottom.png',
                            alt: 'Lower part of the review step with the meter and settings review outlined and the Submit button emphasized'
                        }
                    ],
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
            accessPath: 'Accounts > View Accounts',
            images: [
                {
                    title: 'Accounts Listing & Action Toolbar',
                    caption: 'Displays account rows, status badges, search controls, and action menus.',
                    src: 'assets/img/view-accounts-listing.png',
                    alt: 'View Accounts page with search, Advanced Search, View Archived Accounts, Bulk Action, filters, status legend, and an account row with view, update, and archive actions'
                }
            ],
            legend: [
                { label: 'Active', detail: 'Active and not yet expired' },
                { label: 'Deactivated', detail: 'Deactivated' },
                { label: 'Expiring', detail: 'Active and exceeded expiration date but not account expiration extension' },
                { label: 'Expired', detail: 'Active, exceeded expiration date and exceeded account expiration extension' }
            ],
            actionGroups: [
                {
                    title: 'Available Row Actions',
                    links: [
                        { label: 'View', href: '#view-active-account' },
                        { label: 'Update Wizard', href: '#update-account' },
                        { label: 'Archive Specific', href: '#archive' }
                    ]
                },
                {
                    title: 'Page Buttons',
                    links: [
                        { label: 'Search', href: '#search', tooltip: 'Searches account table content.' },
                        { label: 'Advanced Search', href: '#advanced-search', tooltip: 'Searches account table content using configured rules.' },
                        { label: 'View Archive', href: '#view-archived-accounts', tooltip: 'Displays archived accounts with search, advanced search, bulk actions, and row actions.' },
                        {
                            label: 'Bulk Actions',
                            tooltip: 'Owns account listing actions applied to selected account rows.',
                            href: '#bulk-action',
                            children: [
                                { label: 'Archive', href: '#bulk-action-archive', tooltip: 'Moves selected account rows to archived accounts.' },
                                { label: 'Delete', href: '#bulk-action-delete', tooltip: 'Deletes selected account rows.' }
                            ]
                        }
                    ]
                }
            ],
            archived: {
                id: 'view-archived-accounts',
                title: 'View Archived Accounts',
                detail: 'Displays archived accounts with search, advanced search, bulk actions, and row actions.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts',
                images: [
                    {
                        title: 'Archived Accounts Listing',
                        caption: 'Archived accounts table with search, Advanced Search, Back to Accounts, Bulk Action, filters, status legend, and the view and restore row actions.',
                        src: 'assets/img/view-archived-accounts-listing.png',
                        alt: 'View Archived Accounts page with search, Advanced Search, Back to Accounts, Bulk Action, account type and date created filters, status legend, and an archived account row with view and restore actions'
                    }
                ],
                legend: [
                    { label: 'Archived', detail: 'Archived account' }
                ],
                actionGroups: [
                    {
                        title: 'Available Row Actions',
                        links: [
                            { label: 'View', href: '#view-active-account' },
                            { label: 'Restore', href: '#restore' }
                        ]
                    },
                    {
                        title: 'Page Buttons',
                        links: [
                            { label: 'View Accounts', href: '#view-accounts', tooltip: 'Displays the active account listing with search, advanced search, archived account navigation, bulk actions, and row actions.' },
                            { label: 'Search', href: '#search', tooltip: 'Searches account table content.' },
                            { label: 'Advanced Search', href: '#advanced-search', tooltip: 'Searches account table content using configured rules.' },
                            {
                                label: 'Bulk Actions',
                            tooltip: 'Owns account listing actions applied to selected account rows.',
                                href: '#bulk-action',
                                children: [
                                    { label: 'Restore', href: '#bulk-action-restore', tooltip: 'Restores selected archived account rows.' },
                                    { label: 'Delete', href: '#bulk-action-delete', tooltip: 'Deletes selected account rows.' }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        updateSpecific: {
            id: 'update-specific',
            title: 'Update Specific',
            detail: 'Updates one account detail section from the account detail page. The available update form depends on the account detail section where the update is triggered.',
            images: [
                {
                    title: 'Update Specific Form View',
                    caption: 'Section-isolated update view within the account detail page.',
                    src: 'assets/img/update-specific-account-information.png',
                    alt: 'Update Account: Account Information form with a two-step progress bar, read-only account type, username and parent account, and editable contact fields'
                }
            ],
            rules: ['Updating the current user own account only opens the Account Information variant.', 'Password fields are not prefilled.'],
            accessPath: 'Accounts > View Accounts > Row Actions > View > Section > Update',
            howToUse: [
                'Open the account detail page.',
                { label: 'Open Account Information.', href: '#update-specific-account-information' },
                { label: 'Open Assigned Assessments.', href: '#update-specific-assigned-assessments' },
                { label: 'Open Meter Management.', href: '#update-specific-meter-management' },
                { label: 'Open Other Account Settings.', href: '#update-specific-other-account-settings' },
                'Select Update.',
                'Update the section-specific fields.',
                'Review changes.',
                'Save changes.'
            ],
            expected: ['Only the selected account section is updated.'],
            notes: [
                { label: 'QA and System User', items: ['Changes happen only where the section are updating.'] },
                { label: 'Dev', items: ['Passwords must not be displayed as old password values.'] }
            ],
            groups: [
                {
                    id: 'update-specific-account-information',
                    title: 'Account Information',
                    images: [{
                        title: 'Update Specific: Account Information',
                        caption: 'Account Information tab with the section card and the Update button outlined.',
                        src: 'assets/img/update-specific-group-account-information.png',
                        alt: 'View Account page with the Account Information card and its Update button outlined; personal values are blurred'
                    }],
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
                    rules: [
                        {
                            label: 'Validation Guard Rails',
                            children: [
                                'Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters.',
                                'Addresses: max of 250 characters.',
                                'Phone Number: max of 25 characters.',
                                'Password and Confirm Password should match.',
                                'Billing Address can be similar to Business Address using checkbox toggled or enter manually via input that shows up when checkbox is off.',
                                'Expiry Date & Time cannot be set later than today.'
                            ]
                        }
                    ]
                },
                {
                    id: 'update-specific-assigned-assessments',
                    title: 'Assigned Assessments',
                    images: [{
                        title: 'Update Specific: Assigned Assessments',
                        caption: 'Assigned Assessments tab with the assessment list and the Update button outlined.',
                        src: 'assets/img/update-specific-group-assigned-assessments.png',
                        alt: 'View Account page with the Assigned Assessments card, its Manage and Change Log actions, and the Update button outlined'
                    }],
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
                    id: 'update-specific-meter-management',
                    title: 'Meter Management',
                    images: [{
                        title: 'Update Specific: Meter Management',
                        caption: 'Meter Management tab with the section card and the Update button outlined next to View Meter Logs.',
                        src: 'assets/img/update-specific-group-meter-management.png',
                        alt: 'View Account page with the Meter Management card and its Update and View Meter Logs buttons, with the Update button outlined'
                    }],
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
                    rules: [
                        {
                            label: 'Meter Management Guard Rails',
                            children: ['Sub-Account has Deduct usage from this account and Deduct usage from Client Account.']
                        }
                    ],
                    notes: [{ label: 'QA, Dev, System User', items: ['Deduction to self: Deduct usage from this account.', 'Deduct from parent: Deduct usage from Distributor/Sub-Distributor/Client Account.'] }]
                },
                {
                    id: 'update-specific-other-account-settings',
                    title: 'Other Account Settings',
                    images: [{
                        title: 'Update Specific: Other Account Settings',
                        caption: 'Other Account Settings tab with the section card and the Update button outlined.',
                        src: 'assets/img/update-specific-group-other-account-settings.png',
                        alt: 'View Account page with the Other Account Settings card showing user limits, usage settings, and contract settings, with the Update button outlined'
                    }],
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
                    rules: [
                        {
                            label: 'Display & Visibility Guard Rails',
                            children: [
                                'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters.',
                                'If Site Billing Amount (PHP)(Type) is Included in package then the Site Billing Amount (PHP) appears.',
                                'If Contract Type is Volume-based then the Addendum and Contract Meters appears.',
                                'If Contract Type is Per Usage then the Base Meter appears.'
                            ]
                        }
                    ]
                }
            ]
        },
        functions: [
            {
                id: 'account-detail',
                title: 'Account Detail',
                images: [{
                    title: 'Account Detail: Account Information',
                    caption: 'Back to List, the account configuration gear, the five section tabs, and the Account Information card with its Update button; personal values are blurred.',
                    src: 'assets/img/account-detail.png',
                    alt: 'View Account page with Back to List, the configuration gear, the Account Information, Assigned Assessments, Meter Management, Other Account Settings, and List of Users tabs, and the Account Information card outlined; personal values are blurred'
                }],
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
                    {
                        label: 'Return Button',
                        returns: [
                            { source: 'Active account detail page', target: { label: 'View Accounts', href: '#view-accounts' } },
                            { source: 'Archived account detail page', target: { label: 'View Archived Accounts', href: '#view-archived-accounts' } }
                        ]
                    },
                    {
                        label: 'Conditional fields',
                        conditions: [
                            { fields: ['Parent Meter'], condition: 'Metering Management Type is not Deduct usage from this account' },
                            { fields: ['Site Billing Amount (PHP)'], condition: 'Site Billing Amount (PHP)(Type) is Included in Package' },
                            { fields: ['Addendum', 'Contract Meters'], condition: 'Contract Type is Volume-based' },
                            { fields: ['Base Meter'], condition: 'Contract Type is Per Usage' }
                        ]
                    }
                ]
            },
            {
                id: 'update-account',
                title: 'Update Account',
                steps: [
                    {
                        id: 'update-account-information',
                        title: 'Update Account Information',
                        rules: [
                            {
                                label: 'Input Guard Rails',
                                children: [
                                    'Inputs are optional when they are not indicated as required.',
                                    'Inputs indicated as required must be completed.',
                                    'Conditional inputs appear only when their condition is met.'
                                ]
                            },
                            {
                                label: 'Validation Guard Rails',
                                children: [
                                    'Account Type, Parent Account, and Account Name cannot be changed.',
                                    'Username, Password, Primary Contact Name, and Primary Contact Email have a maximum of 100 characters.',
                                    'Addresses have a maximum of 250 characters.',
                                    'Phone number has a maximum of 25 characters.',
                                    'Password and Confirm Password must match.',
                                    'Billing Address can be copied from Business Address by toggling the checkbox, or entered manually when the checkbox is off.',
                                    'Expiry Date and Time cannot be set later than today.',
                                    'Status does not show when editing the current user\'s own account.'
                                ]
                            }
                        ],
                        images: [
                            {
                                title: 'Update Account Information: top of the form',
                                caption: 'Update wizard progress bar, read-only Account Type, Username, and Parent Account, then Account Name, passwords, contact details, Country, and Business Phone Number; personal values are blurred.',
                                src: 'assets/img/update-account-information-top.png',
                                alt: 'Update Account wizard on step 1 with the Account Information form outlined, showing read-only account type, username, and parent account above the editable fields; personal values are blurred'
                            },
                            {
                                title: 'Update Account Information: rest of the form',
                                caption: 'Business Address, the billing address checkbox, Expiry Date and Time, Actual Account Expiration, Status, and the Next button.',
                                src: 'assets/img/update-account-information-bottom.png',
                                alt: 'Lower part of the Update Account Information form outlined, showing address, billing checkbox, expiry, actual account expiration, status, and the Next button; personal values are blurred'
                            }
                        ]
                    },
                    {
                        id: 'update-assigned-products',
                        title: 'Update Assigned Products',
                        rules: [
                            {
                                label: 'Input Guard Rails',
                                children: [
                                    'Inputs are optional when they are not indicated as required.',
                                    'Inputs indicated as required must be completed.'
                                ]
                            }
                        ],
                        images: [{
                            title: 'Update Assigned Products',
                            caption: 'Update wizard step 2 with the five assessment category dropdowns, the Update Assessment button, and the Back and Next buttons; the account name is blurred.',
                            src: 'assets/img/update-assign-products.png',
                            alt: 'Update Account wizard on the Assign Products step outlined, showing the Cognitive, Competency, Behavioral, Survey, and Test Battery category dropdowns and the Update Assessment button; the account name is blurred'
                        }]
                    },
                    {
                        id: 'update-meter-management',
                        title: 'Update Meter Management',
                        rules: [
                            {
                                label: 'Input Guard Rails',
                                children: [
                                    'Inputs are optional when they are not indicated as required.',
                                    'Inputs indicated as required must be completed.',
                                    'Conditional inputs appear only when their condition is met.'
                                ]
                            },
                            {
                                label: 'Meter Management Guard Rails',
                                children: [
                                    'Sub-Account has Deduct usage from this account and Deduct usage from Client Account.',
                                    'Current Meters and Parent Meter Balance cannot be modified when meter management type is Deduct usage from Account.'
                                ]
                            }
                        ],
                        images: [{
                            title: 'Update Meter Management',
                            caption: 'Update wizard step 3 with the metering management type, the Current Meter(s) field, the View Meter Log button, and the Back and Next buttons.',
                            src: 'assets/img/update-meter-management.png',
                            alt: 'Update Account wizard on the Meter Management step outlined, showing the metering management type, Current Meter(s) field, and View Meter Log button'
                        }]
                    },
                    {
                        id: 'update-other-account-settings',
                        title: 'Update Other Account Settings',
                        rules: [
                            {
                                label: 'Input Guard Rails',
                                children: [
                                    'Inputs are optional when they are not indicated as required.',
                                    'Inputs indicated as required must be completed.',
                                    'Conditional inputs appear only when their condition is met.'
                                ]
                            },
                            {
                                label: 'Account Limit Guard Rails',
                                children: [
                                    'Distributor accounts have Sub-Distributor, User Account, Sub-Account, and Self Registration limits.',
                                    'Sub-Distributor accounts have User Account, Sub-Account, and Self Registration limits.',
                                    'User Account accounts have User Account, Sub-Account, and Self Registration limits.',
                                    'Sub-Account accounts have User Account and Self Registration limits.',
                                    'Maximum account limit value is 999.'
                                ]
                            },
                            {
                                label: 'Display & Visibility Guard Rails',
                                children: [
                                    'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contact Person Name, and Client Contact Person Email have a maximum of 100 characters.',
                                    'Site Billing Amount (PHP) appears when Site Billing Amount (PHP)(Type) is Included in Package.',
                                    'Addendum and Contract Meters appear when Contract Type is Volume-based.',
                                    'Base Meter appears when Contract Type is Per Usage.'
                                ]
                            },
                            {
                                label: 'Data Sync Guard Rails',
                                children: [
                                    'Contracted Meters is prefilled from meter management.',
                                    'Addendum is locked when the selected meter type is parent based.',
                                    'Maximum Addendum, Base Meter, and Billing Amount value is 999.'
                                ]
                            }
                        ],
                        images: [
                            {
                                title: 'Update Other Account Settings: limits and contacts',
                                caption: 'Update wizard step 4 with the account limit fields, API Access Username, and the first HRSC and assessment specialist fields.',
                                src: 'assets/img/update-other-account-settings-top.png',
                                alt: 'Update Account wizard on the Other Account Settings step outlined, showing the account limit fields and API Access Username'
                            },
                            {
                                title: 'Update Other Account Settings: billing and contract',
                                caption: 'Contact fields, Site Billing Type, Contract Type, Contracted Meters, Addendum, and the Back and Next buttons.',
                                src: 'assets/img/update-other-account-settings-bottom.png',
                                alt: 'Lower part of the Other Account Settings step outlined, showing the contact, billing, and contract fields and the Back and Next buttons'
                            }
                        ]
                    }
                ],
                detail: 'Updates account settings through the update wizard. This is different from Update Specific, which updates a single account detail section.',
                accessPath: 'Accounts > View Accounts > Row Actions > Update',
                howToUse: [
                    'Open View Accounts.',
                    'Select Update on a specific account.',
                    { label: 'Complete Update Account Information.', href: '#update-account-information' },
                    { label: 'Complete Update Assigned Products.', href: '#update-assigned-products' },
                    { label: 'Complete Update Meter Management.', href: '#update-meter-management' },
                    { label: 'Complete Update Other Account Settings.', href: '#update-other-account-settings' },
                    'Review account details.',
                    'Save changes.'
                ],
                rules: ['Update only appears when the account is not archived and is not the current user own account.']
            },
            {
                id: 'privacy-consent',
                title: 'Privacy Consent',
                images: [{
                    title: 'Privacy Consent',
                    caption: 'Content Manager: Privacy Consent with the consent content editor, the Consent Gather Data and Consent Capture Photo checkboxes, and the Save button outlined; the account name is blurred.',
                    src: 'assets/img/privacy-consent.png',
                    alt: 'Content Manager Privacy Consent page with the consent editor, two consent checkboxes, and the Save button outlined; the account name is blurred'
                }],
                detail: 'Manages privacy consent content and candidate-side consent checkbox visibility.',
                actions: ['Consent content', 'Consent Gather Data Checkbox to Appear', 'Consent Capture Photo to Appear', 'Save changes'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Privacy Consent',
                howToUse: ['Open Privacy Consent.', 'Update consent content.', 'Set Consent Gather Data Checkbox to Appear.', 'Set Consent Capture Photo to Appear.', 'Save changes.'],
                expected: ['Privacy consent content and configured checkboxes are updated on the candidate side.']
            },
            {
                id: 'demographics',
                title: 'Demographics',
                images: [{
                    title: 'Demographics',
                    caption: 'Content Manager: Demographics with the Manage Demographics Form outlined, showing the five required fields checked, the optional field checkboxes, and the Save Changes button emphasized.',
                    src: 'assets/img/demographics.png',
                    alt: 'Content Manager Demographics page with the Manage Demographics Form outlined, required fields checked, optional field checkboxes, and the Save Changes button emphasized'
                }],
                detail: 'Manages which demographic fields appear in the candidate-side demographics form.',
                actions: ['Save Button'],
                items: [
                    {
                        label: 'Required inputs',
                        children: ['First Name', 'Last Name', 'Gender', 'Email', 'Position Applied']
                    },
                    {
                        label: 'Optional inputs',
                        children: [
                            'Birthdate',
                            'Civil Status',
                            'Alternative/Work Email',
                            'Phone Number',
                            'Educational Attainment',
                            'Work Experience',
                            'Level of Position Applying For',
                            'Course',
                            'Priority Course',
                            'Region of Residence',
                            'Agency Visited',
                            'Service Availed',
                            'Customer Type',
                            'Age',
                            'Transaction Type',
                            'School'
                        ]
                    }
                ],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Demographics',
                howToUse: ['Open Demographics.', 'Toggle demographic fields that should appear.', 'Save changes.'],
                rules: [
                    'First Name, Last Name, Gender, Email, and Position Applied are required by default and cannot be toggled off.',
                    'This page can be hidden for a specific account group by Super Admin configuration.'
                ],
                expected: ['Demographic data gathering is updated.', 'If the page is not visible, the account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always check RBAC for the specific account type.'] }]
            },
            {
                id: 'assessment-completion-page',
                title: 'Assessment Completion Page',
                images: [{
                    title: 'Assessment Completion Page',
                    caption: 'Content Manager: Assessment Completion Page with the completion content editor and the Save button emphasized; the account name is blurred.',
                    src: 'assets/img/assessment-completion-page.png',
                    alt: 'Content Manager Assessment Completion Page with the content editor outlined and the Save button emphasized; the account name is blurred'
                }],
                detail: 'Manages assessment completion page content.',
                actions: ['Edit Content', 'Save Button'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Assessment Completion Page',
                howToUse: ['Open Assessment Completion Page.', 'Update the prefilled content.', 'Save changes.'],
                rules: ['This page can be hidden for a specific account group by Super Admin configuration.'],
                expected: ['Assessment completion page content is updated.', 'If the page is not visible, the account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always check RBAC for the specific account type.'] }]
            },
            {
                id: 'assessment-center-logo',
                title: 'Assessment Center Logo',
                images: [{
                    title: 'Assessment Center Logo',
                    caption: 'Content Manager: Assessment Center Logo with the upload area, logo preview, and Save button outlined; the account name is blurred.',
                    src: 'assets/img/assessment-center-logo.png',
                    alt: 'Content Manager Assessment Center Logo page with the upload area and logo preview outlined and the Save button emphasized; the account name is blurred'
                }],
                detail: 'Manages the assessment center logo for the account.',
                actions: ['Upload Logo', 'Save Button'],
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Assessment Center Logo Page',
                howToUse: ['Open Assessment Center Logo.', 'Upload an image.', 'Save changes.'],
                rules: ['This page can be hidden for a specific account group by Super Admin configuration.'],
                expected: ['The uploaded image replaces the existing logo.', 'If the page is not visible, the account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always check RBAC for the specific account type.'] }]
            },
            {
                id: 'unblock-account',
                title: 'Unblock Account',
                images: [{
                    title: 'Unblock Account',
                    caption: 'View Account page with the Account Configuration dropdown open and the Unblock Account option emphasized. The account content card is outlined, personal values are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/unblock-account.png',
                    alt: 'View Account page with the Account Configuration dropdown open, listing Privacy Consent, Demographics, Assessment Completion Page, Assessment Center Logo, and the emphasized Unblock Account option above an outlined Account Information card'
                }],
                detail: 'Unblocks an account that is blocked due to multiple login attempts.',
                accessPath: 'Accounts > View Accounts > Row Actions > View > Account Configuration Dropdown > Unblock Account Trigger',
                howToUse: ['Open the view account page.', 'Trigger Unblock Account.'],
                rules: ['This only appears when the account is blocked.']
            },
            {
                id: 'manage-assigned-assessment',
                title: 'Manage Assigned Assessment',
                images: [{
                    title: 'Manage Assigned Assessment',
                    caption: 'Update Account Assessment page with the assign assessment account and the assessment limit fields. The content card is outlined, the Save button is emphasized, the account name is blurred, and the surrounding page is blurred.',
                    src: 'assets/img/manage-assigned-assessment.png',
                    alt: 'Update Account Assessment page showing the Account Name, Set Max Respondents, Valid Date Start, Valid Date Expiration, and Status fields inside an outlined card with the Save button emphasized'
                }],
                detail: 'Owns assigned assessment configuration from the view account assigned assessments section.',
                accessPath: 'Accounts > View Accounts > Row Actions > View > Assigned Assessments > Manage',
                howToUse: ['Open the account detail page.', 'Open Assigned Assessments.', 'Select Manage.', 'Update Set Max Respondents.', 'Update Valid Date Start.', 'Update Valid Date Expiration.', 'Update Status.', 'Save changes.']
            }
        ],
        rowActions: [
            {
                id: 'view-active-account',
                title: 'View Active Account',
                detail: 'Opens account detail for an active, non-archived account.',
                images: [
                    {
                        title: 'View Accounts Listing',
                        caption: 'View Accounts listing with the View row action emphasized on an active account row. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                        src: 'assets/img/view-active-account.png',
                        alt: 'View Accounts page with search, Advanced Search, View Archived Accounts, Bulk Action, and five active account rows, with the View row action emphasized on the first row inside an outlined listing area'
                    },
                    {
                        title: 'View Account: Account Information',
                        caption: 'Account Information tab showing account type, parent account, contact details, address, and expiration details with the Update button.',
                        src: 'assets/img/view-account-information.png',
                        alt: 'View Account page with the Account Information tab selected, showing identity, contact, address, and expiration details'
                    },
                    {
                        title: 'View Account: Assigned Assessments',
                        caption: 'Assigned Assessments tab listing assigned assessments by category with Manage and Change Log actions.',
                        src: 'assets/img/view-account-assigned-assessments.png',
                        alt: 'View Account page with the Assigned Assessments tab selected, listing assessments by category with Manage and Change Log actions'
                    },
                    {
                        title: 'View Account: Meter Management',
                        caption: 'Meter Management tab showing the metering management type and allocated meter with the View Meter Logs button.',
                        src: 'assets/img/view-account-meter-management.png',
                        alt: 'View Account page with the Meter Management tab selected, showing Metering Management Type and Allocated Meter'
                    },
                    {
                        title: 'View Account: Other Account Settings',
                        caption: 'Other Account Settings tab showing account limits, contacts, billing, and contract configuration.',
                        src: 'assets/img/view-account-other-account-settings.png',
                        alt: 'View Account page with the Other Account Settings tab selected, showing user limits, usage settings, and account contract settings'
                    },
                    {
                        title: 'View Account: List of Users',
                        caption: 'List of Users tab showing account users under the selected account, or an empty-list message.',
                        src: 'assets/img/view-account-list-of-users.png',
                        alt: 'View Account page with the List of Users tab selected, showing an empty list of accounts message'
                    }
                ],
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
                    'If Metering Management Type is not Deduct usage from this account, Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package, Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based, Addendum and Contract Meters appear.',
                    'If Contract Type is Per Usage, Base Meter appears.'
                ]
            },
            {
                id: 'view-archived-account',
                title: 'View Archived Account',
                images: [{
                    title: 'View Archived Account',
                    caption: 'View Archived Accounts listing with the View row action emphasized on an archived account row. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/view-archived-account.png',
                    alt: 'View Archived Accounts page with search, Advanced Search, Back to Accounts, Bulk Action, and two archived account rows, with the View row action emphasized on the first row inside an outlined listing area'
                }],
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
                    'If Metering Management Type is not Deduct usage from this account, Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package, Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based, Addendum and Contract Meters appear.',
                    'If Contract Type is Per Usage, Base Meter appears.'
                ]
            },
            {
                id: 'update-account-row-action',
                title: 'Update Account Row Action',
                images: [{
                    title: 'Update Account Row Action',
                    caption: 'View Accounts listing with the Update row action emphasized on an account row. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/update-account-row-action.png',
                    alt: 'View Accounts page with search, Advanced Search, View Archived Accounts, Bulk Action, and five account rows, with the Update row action emphasized on the first row inside an outlined listing area'
                }],
                detail: 'Links to Update Account from an account table row.',
                actionGroups: [
                    {
                        title: 'Available actions',
                        links: [{ label: 'Update Account', href: '#update-account', tooltip: 'Owns full account update through the wizard.' }]
                    }
                ],
                accessPath: 'Accounts > View Accounts > Row Actions > Update',
                howToUse: ['Open View Accounts.', 'Select Update on a specific account row.'],
                rules: ['This only appears when the account is not archived and is not the current user\'s own account.'],
                expected: ['The update account wizard opens.']
            },
            {
                id: 'archive',
                title: 'Archive',
                images: [{
                    title: 'Archive',
                    caption: 'View Accounts listing with the Archive row action emphasized on an account row. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/archive.png',
                    alt: 'View Accounts page with search, Advanced Search, View Archived Accounts, Bulk Action, and five account rows, with the Archive row action emphasized on the first row inside an outlined listing area'
                }],
                detail: 'Moves a non-archived account to archived accounts.',
                accessPath: 'Accounts > View Accounts > Row Actions > Archive',
                howToUse: ['Open View Accounts.', 'Select Archive on a specific account row.'],
                rules: ['This only appears when the account is not archived.'],
                expected: ['The account is moved to archived accounts.']
            },
            {
                id: 'restore',
                title: 'Restore',
                images: [{
                    title: 'Restore',
                    caption: 'View Archived Accounts listing with the Restore row action emphasized on an archived account row. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/restore.png',
                    alt: 'View Archived Accounts page with search, Advanced Search, Back to Accounts, Bulk Action, and two archived account rows, with the Restore row action emphasized on the first row inside an outlined listing area'
                }],
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
                images: [{
                    title: 'Search',
                    caption: 'View Accounts page with the Search Input emphasized above the account table. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/search.png',
                    alt: 'View Accounts page with the Search Input emphasized beside Advanced Search, View Archived Accounts, and Bulk Action, above an outlined account table with blurred account names'
                }],
                detail: 'Searches account table content.',
                accessPath: 'Accounts > View Accounts > Search Input',
                howToUse: ['Open an account listing table.', 'Enter search text.', 'Press Enter.'],
                expected: ['Matching accounts are shown in the table.']
            },
            {
                id: 'advanced-search',
                title: 'Advanced Search',
                images: [{
                    title: 'Advanced Search',
                    caption: 'Advanced Search dialog over View Accounts with two rule rows, Add rule, Clear, Close, and Search. The dialog is outlined, the Search button is emphasized, and the surrounding page and account names are blurred.',
                    src: 'assets/img/advanced-search.png',
                    alt: 'Advanced Search dialog with two rules set to Account Name begins with, an Add rule button, Clear, Close, and an emphasized Search button, over a blurred View Accounts page'
                }],
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
                images: [{
                    title: 'Bulk Action: Archive',
                    caption: 'View Accounts listing with three selected rows and the Bulk Action dropdown open, with Archive emphasized. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/bulk-action-archive.png',
                    alt: 'View Accounts page with three selected active account rows, the Bulk Action dropdown open, and the Archive option emphasized inside an outlined listing area'
                }],
                detail: 'Moves selected account rows to archived accounts.',
                accessPath: 'Accounts > View Accounts > Bulk > Archive',
                howToUse: ['Open View Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Archive.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are moved to archived accounts.']
            },
            {
                id: 'bulk-action-delete',
                title: 'Bulk Action: Delete',
                images: [{
                    title: 'Bulk Action: Delete',
                    caption: 'View Accounts listing with three selected rows and the Bulk Action dropdown open, with Delete emphasized. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/bulk-action-delete.png',
                    alt: 'View Accounts page with three selected active account rows, the Bulk Action dropdown open, and the Delete option emphasized inside an outlined listing area'
                }],
                detail: 'Deletes selected account rows.',
                accessPath: 'Accounts > View Accounts > Bulk > Delete',
                howToUse: ['Open View Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Delete.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are deleted.']
            },
            {
                id: 'bulk-action-restore',
                title: 'Bulk Action: Restore',
                images: [{
                    title: 'Bulk Action: Restore',
                    caption: 'View Archived Accounts listing with two selected rows and the Bulk Action dropdown open, with the Retrieve option (documented as Restore) emphasized. The listing area is outlined, account names are blurred, and the surrounding page is blurred.',
                    src: 'assets/img/bulk-action-restore.png',
                    alt: 'View Archived Accounts page with two selected archived account rows, the Bulk Action dropdown open, and the Retrieve option, documented as Restore, emphasized inside an outlined listing area'
                }],
                detail: 'Restores selected archived account rows.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts > Bulk > Restore',
                howToUse: ['Open View Archived Accounts.', 'Select account checkboxes.', 'Open Bulk.', 'Select Restore.'],
                rules: ['The current logged-in account cannot select its own account.'],
                expected: ['Selected accounts are restored to the active account list.']
            }
        ]
    };
    global.__accountsContent = accountsContent;
})(window);
