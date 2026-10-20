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
            images: [
                {
                    title: 'Accounts Listing & Action Toolbar',
                    caption: 'Displays account rows, status badges, search controls, and action menus.',
                    src: 'assets/img/view-accounts-listing.png',
                    alt: 'View Accounts page with search, Advanced Search, View Archived Accounts, Bulk Action, filters, status legend, and an account row with view, update, and archive actions'
                },
                {
                    title: 'Advanced Search Dialog',
                    caption: 'Advanced Search dialog with rule rows for Account Name, Account Type, and Meter Balance, plus Add rule, Clear, Close, and Search.',
                    src: 'assets/img/view-accounts-advanced-search.png',
                    alt: 'Advanced Search dialog over the View Accounts page showing three rule rows with field, operator, and value inputs'
                }
            ],
            legend: [
                { label: 'Active', detail: 'Active and not yet expired' },
                { label: 'Deactivated', detail: 'Deactivated' },
                { label: 'Expiring', detail: 'Active and exceeded expiration date but not account expiration extension' },
                { label: 'Expired', detail: 'Active, exceeded expiration date and exceeded account expiration extension' },
                { label: 'Archived', detail: 'Archived account' }
            ],
            actionGroups: [
                {
                    title: 'Available Row Actions',
                    links: [
                        {
                            label: 'Row Actions',
                            href: '#row-actions',
                            children: [
                                { label: 'View', href: '#view-active-account' },
                                { label: 'Update Wizard', href: '#update-account' },
                                { label: 'Archive Specific', href: '#archive' }
                            ]
                        }
                    ]
                },
                {
                    title: 'Page Buttons',
                    links: [
                        { label: 'Search', href: '#search' },
                        { label: 'Advanced Search', href: '#advanced-search' },
                        { label: 'View Archive', href: '#view-archived-accounts' },
                        {
                            label: 'Bulk Actions',
                            href: '#bulk-action',
                            children: [
                                { label: 'Archive', href: '#bulk-action-archive' },
                                { label: 'Delete', href: '#bulk-action-delete' }
                            ]
                        }
                    ]
                }
            ],
            archived: {
                id: 'view-archived-accounts',
                title: 'View Archived Accounts',
                detail: 'Displays archived accounts with search, advanced search, bulk actions, and row actions.',
                actionGroups: [
                    {
                        title: 'Available Row Actions',
                        links: [
                            {
                                label: 'Row Actions',
                                href: '#row-actions',
                                children: [
                                    { label: 'View', href: '#view-active-account' },
                                    { label: 'Restore', href: '#restore' }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Page Buttons',
                        links: [
                            { label: 'View Accounts', href: '#view-accounts' },
                            { label: 'Search', href: '#search' },
                            { label: 'Advanced Search', href: '#advanced-search' },
                            {
                                label: 'Bulk Actions',
                                href: '#bulk-action',
                                children: [
                                    { label: 'Restore', href: '#bulk-action-restore' },
                                    { label: 'Delete', href: '#bulk-action-delete' }
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
                images: [
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
    global.__accountsContent = accountsContent;
})(window);
