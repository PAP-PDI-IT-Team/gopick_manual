(function (global) {
    'use strict';

    var accountsContent = {
        title: 'Accounts',
        description: 'Provides Access Control and Management of Accounts of GoPick: Dsitributor, Sub Distributor, Account, Sub-Account, Self Registered Account.',
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
                title: 'Other Functions',
                children: [
                    { id: 'update-specific', title: 'Update Specific' },
                    { id: 'privacy-consent', title: 'Privacy Consent' },
                    { id: 'demographics', title: 'Demographics' },
                    { id: 'assessment-completion-page', title: 'Assessment Completion Page' },
                    { id: 'assessment-center-logo', title: 'Assessment Center Logo' },
                    { id: 'unblock-account', title: 'Unblock Account' },
                    { id: 'manage', title: 'Manage' },
                    { id: 'search', title: 'Search' },
                    { id: 'advance-search', title: 'Advance Search' },
                    {
                        id: 'row-actions',
                        title: 'Row Actions',
                        children: [
                            { id: 'view-not-archive', title: 'View: Not Archive' },
                            { id: 'view-archive', title: 'View: Archive' },
                            { id: 'update', title: 'Update' },
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
            detail: 'A Submodule directly creates new account using account create wizard.',
            accessPath: 'Accounts > Create Account',
            howToUse: [
                'Navigate into it.',
                'Fill in requirements and optionals depends on informations at hand.',
                'Complete wizard and save.'
            ],
            expected: ['Account will be created based on all configuration added and can be view in View Accounts.'],
            notes: [
                { label: 'Dev', items: ['This module uses 5 layer architecture already but still many uses the legacy architecture.', 'Applied new principles and logged process.'] },
                { label: 'QA', items: ['Test the max and min values for guard rails.', 'Happy test: Only Required and Filling All.', 'Some inputs are conditional, so check if documented or not.'] }
            ],
            steps: [
                {
                    id: 'create-account-information',
                    title: 'Account Information',
                    detail: 'Fill in the required account details.',
                    items: [
                        'Account Type',
                        'Parent Account',
                        'Account Name: Company or organization account name',
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
                        'Status: Active(default)'
                    ],
                    rules: [
                        {
                            label: 'Validation Guard Rails',
                            children: [
                                'Account Name, Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters.',
                                'Addresses: max of 250 characters.',
                                'Phone Number: max of 25 characters.',
                                'Account Type: You can only select lower than your account type.',
                                'Password and Confirm Password should match.',
                                'Billing Address can be similar to Business Address using checkbox toggled or enter manually via input that shows up when checkbox is off.'
                            ]
                        },
                        {
                            label: 'Account Creation Limit Guard Rails',
                            children: [
                                'Admin: Bypasses rules of creation limits found in Other Account Settings Page of the account they are creating.',
                                'Non-Admin: Are limited to the accounts they are able to create found in Other Account Settings Page.',
                                'Active Accounts: not deactivated, not archived, not deleted, not expired.',
                                'Expired: Determined by Expiry Date + Actual Account Expiration.',
                                'Expiry Date & Time cannot be set later than today.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-assign-products',
                    title: 'Assign Products',
                    detail: 'Select assessments that Company/Organization can use.',
                    items: [
                        'Cognitive/Knowledge-based Assessment',
                        'Competency-based Assessment',
                        'Survey',
                        'Behavioral/Personality-Based Assessment',
                        'Test Battery, a group of assessments bundled together'
                    ],
                    rules: ['At least 1 assessment.']
                },
                {
                    id: 'create-meter-management',
                    title: 'Meter Management',
                    detail: 'Set Meter Management Type and Meter Balance.',
                    items: [
                        'Meter Management Type: Self and Parent Based.',
                        'Self = Deduct usage from this account.',
                        'Parent = Deduct usage from Distributor/Sub-Distributor/Client.'
                    ],
                    rules: [
                        {
                            label: 'Meter Management Guard Rails',
                            children: [
                                'Sub-Account has 2 Meter Management Type while the rest are 1 Meter Management Type.',
                                'Self Mode: Meter balance cannot be 0.',
                                'Parent Mode: Parent meter balance cannot be 0.',
                                'Max Meter: 99,999.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-other-account-settings',
                    title: 'Other Account Settings',
                    detail: 'Set additional account-related configurations.',
                    items: [
                        'Set User Account limit (autofill, 99)',
                        'Set Sub-Distributor Limit (autofill, 0)',
                        'Set Client Limit (autofill, 0)',
                        'Set Sub-Account Limit (autofill, 0)',
                        'Set Self Registration Limit (autofill, 0)',
                        'Set API Access Username',
                        'Set HRSC Name',
                        'Set HRSC Email',
                        'Set Assessment Specialist Name',
                        'Set Assessment Special Email',
                        'Set Client Contact Person Name',
                        'Set Client Usage Recipient Email',
                        'Set Site Billing Type (Included in Package or With Site Fee)',
                        'Set Billing Amount (PHP)',
                        'Contact Type: Volume-based, Contracted Meters disabled, Addendum autofill 0',
                        'Contact Type: Per Usage, Base Meter autofill 0'
                    ],
                    rules: [
                        {
                            label: 'Display & Visibility Guard Rails',
                            children: [
                                'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters.',
                                'Sub-Distributor Limit appears only for Distributor accounts.',
                                'Client Limit appears only for Distributor and Sub-Distributor accounts.',
                                'Sub-Account Limit appears only for Distributor, Sub-Distributor, and Client accounts.',
                                'Billing Amount appears only when Set Site Billing Type is With Site Fee.'
                            ]
                        },
                        {
                            label: 'Data Sync Guard Rails',
                            children: [
                                'Contracted Meters values are prefilled from the Meter Management section.',
                                'Addendum value is locked when the selected Meter Type is Parent.',
                                'Max Limit of Account Limits: 999.',
                                'Max Value of Addendum, Base Meter and Billing Amount: 999.'
                            ]
                        }
                    ]
                },
                {
                    id: 'create-review-account-details',
                    title: 'Review Account Details',
                    detail: 'Able to review Account Information before saving.'
                }
            ]
        },
        viewAccounts: {
            detail: 'Table list of Accounts, with search, redirection to archived accounts and bulk actions.',
            legend: [
                { label: 'Active', detail: 'Active and not yet expired' },
                { label: 'Deactivated', detail: 'Deactivated' },
                { label: 'Expiring', detail: 'Active and exceeded expiration date but not account expiration extension' },
                { label: 'Expired', detail: 'Active, exceeded expiration date and exceeded account expiration extension' },
                { label: 'Archived', detail: 'Archived account' }
            ],
            actions: [
                { label: 'Search', href: '#search' },
                { label: 'Advance Search', href: '#advance-search' },
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
                        { label: 'View: Not Archive', href: '#view-not-archive' },
                        { label: 'Update', href: '#update' },
                        { label: 'Archive', href: '#archive' }
                    ]
                }
            ],
            archived: {
                id: 'view-archived-accounts',
                title: 'View Archived Accounts',
                detail: 'Table list of Archived Accounts, with search, redirection to non-accounts and bulk actions.',
                actions: [
                    { label: 'Search', href: '#search' },
                    { label: 'Advance Search', href: '#advance-search' },
                    {
                        label: 'Bulk Action',
                        href: '#bulk-action',
                        children: [
                            { label: 'Archive', href: '#bulk-action-archive' },
                            { label: 'Retrive', href: '#bulk-action-restore' }
                        ]
                    },
                    {
                        label: 'Row Actions',
                        href: '#row-actions',
                        children: [
                            { label: 'View: Archive', href: '#view-archive' },
                            { label: 'Restore', href: '#restore' }
                        ]
                    }
                ]
            }
        },
        updateSpecific: {
            id: 'update-specific',
            title: 'Update Specific',
            detail: 'Updating Specific settings of the account. Has variations depends what section it was triggered.',
            rules: ['Updating own account only opens Account Information Variant.'],
            accessPath: 'Account > View Accounts > Row Actions: View > Section: Account Information, Assigned Assessments, Meter Management or Other Account Settings > Update Button',
            howToUse: [
                'Navigate into it.',
                'Each section has its own. Each is prefilled already of the default informations, except password.',
                'Review Button.',
                'Save button.'
            ],
            expected: ['Update Specific Informations with smallest step.'],
            notes: [{ label: 'QA and System User', items: ['Changes happen only where the section are updating.'] }],
            groups: [
                {
                    title: 'Account Information',
                    items: [
                        'Account Type: Cannot be changed.',
                        'Parent Account: Cannot be changed.',
                        'Account Name: Cannot be changed.',
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
                        'Status: Active(default): Cannot be changed if updating own account'
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
                    items: ['Selected Assessments can adjust each meter consumption.', 'Manage', 'Change Log', 'Update Assessment']
                },
                {
                    title: 'Meter Management',
                    items: ['Meter Management Type: Deduct usage from this account or Deduct usage from Account.', 'Current Meters / Parent Meter Balance cannot be modified if Meter Management Type is Deduct usage from Account.', 'View Meter Logs'],
                    expected: ['If Sub-account it will have 2 options: Deduct usage from this account and Deduct usage from Client Account.'],
                    notes: [{ label: 'QA, Dev, System User', items: ['Deduction to self: Deduct usage from this account.', 'Deduct from parent: Deduct usage from Distributor/Sub-Distributor/Client Account.'] }]
                },
                {
                    title: 'Other Account Settings',
                    items: [
                        'User Account Limit by account type.',
                        'API Access Username',
                        'HRSC Name',
                        'HRSC Email',
                        'Assessment Specialist Name',
                        'Assessment Specialist Email',
                        'Client Contact Person Name',
                        'Client Contact Person Email',
                        'Site Billing Amount (PHP)(Type)',
                        'Site Billing Amount (PHP)',
                        'Contract Type',
                        'Contract Meters',
                        'Addendum',
                        'Base Meter'
                    ],
                    expected: [
                        'HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters.',
                        'If Site Billing Amount (PHP)(Type) is Included in package then the Site Billing Amount (PHP) appears.',
                        'If Contract Type is Volume-based then the Addendum and Contract Meters appears.',
                        'If Contract Type is Per Usage then the Base Meter appears.'
                    ]
                }
            ],
            securityRule: 'Password are not preinputed: If an organization configures its system to show the old password on screen, it is breaching GDPR Article 32, EU Secure by Design mandates, NIS2, Cyber Resilience Act, and industry compliance frameworks.'
        },
        functions: [
            {
                id: 'privacy-consent',
                title: 'Privacy Consent',
                detail: 'Page to manage update of the consent configurations.',
                actions: ['Can Change Contents', 'Checkbox for Consent Gather Data Checkbox to Appear', 'Checkbox for Consent Capture Phote to Appear', 'Save Button'],
                accessPath: 'Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Privacy Consent',
                howToUse: ['Navigate into it.', 'Update Content View Display and Checkbox display state: Content, Consent Gather Data Checkbox to Appear, Consent Capture Phote to Appear.', 'Save Button.'],
                rules: ['Confirmed validation or restriction.'],
                expected: ['Confirmed visible outcome.', 'Update the Privacy Consent Page on Candidate side.'],
                notes: [{ label: 'Optional', items: ['For who'] }]
            },
            {
                id: 'demographics',
                title: 'Demographics',
                detail: 'Page to manage demographics form.',
                actions: ['Default Required: First Name, Last Name, Gender, Email, Position Applied', 'Can be toggled: Birthdate, Civil Status, Alternative/Work Email, Phone Number, Educational Attainment, Work Experience, Level of Position Applying For, Course, Priority Course, Region of Residence, Agency Visited, Service Availed, Customer Type, Age, Transaction Type, School', 'Save Button'],
                accessPath: 'Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Demographics',
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
                accessPath: 'Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Assessment Completion Page',
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
                accessPath: 'Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Assessment Center Logo Page',
                howToUse: ['Navigate into it.', 'Can be pre-filled or none, uploading image will replace it.', 'Upload image.', 'Save button.'],
                rules: ['This can be set to not show for the specific account group. Configured by Super Admins.'],
                expected: ['Can be visible or not; if not visible means account is not allowed to use this function.'],
                notes: [{ label: 'QA and System User', items: ['Always Check RBAC for the specific account type.'] }]
            },
            {
                id: 'unblock-account',
                title: 'Unblock Account',
                detail: 'Triggered when account is blocked due to multiple attempts to login.',
                accessPath: 'Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Unblock Account Trigger',
                howToUse: ['Navigate into it.', 'Trigger it.'],
                notes: [{ label: 'QA and System User', items: ['This only appears if account is blocked.'] }]
            },
            {
                id: 'manage',
                title: 'Manage',
                detail: 'Update Specific Assessments Config.',
                accessPath: 'Account > View Accounts > Row Actions: View > Section: Assigned Assessments > Manage',
                howToUse: ['Navigate into it.', 'Pre-filled inputs can be altered: Set Max Respondents, Valid Date Start, Valid Date Expiration, Status.', 'Save button.']
            }
        ],
        rowActions: [
            {
                id: 'view-not-archive',
                title: 'View: Not Archive',
                detail: 'View informations of the account configured during creation.',
                items: [
                    'Return Button: Returns User to the list.',
                    'Account Configuration Dropdown: Privacy Consent, Demographics, Assessment Completion Page, Assessment Center Logo, Unblock Account.',
                    'Account Information: Active Badge, Acount Type, Parent Account, Account Name, Username, Password, Confirm Password, Primary Contact Name, Primary Contact Email, Country, Business Phone Number, Business Address, Billing Address, Expiry Date and Time, Actual Account Expiration, Update Specific.',
                    'Assigned Assessments: shows list of all assessments for the account by categories, with Update Specific, Manage, and Change Log.',
                    'Meter Management: Metering Management Type, Allocated Meter, Parent Meter, Update Specific, View Meter Logs.',
                    'Other Account Settings: account limits, API Access Username, HRSC details, Assessment Specialist details, Client Contact details, Site Billing, Contract Type, Contract Meters, Addendum, Base Meter, Update Specific.',
                    'List of Users: Table list of Accounts Users under the account selected.'
                ],
                expected: [
                    'If Metering Management Type is not Deduct usage from this account then Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package then Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based then Addendum and Contract Meters appears.',
                    'If Contract Type is Per Usage then Base Meter appears.'
                ]
            },
            {
                id: 'view-archive',
                title: 'View: Archive',
                detail: 'View informations of the account configured during creation.',
                items: [
                    'Return Button: Returns Archived Accounts to the list.',
                    'Account Information: Active Badge, Acount Type, Parent Account, Account Name, Username, Password, Confirm Password, Primary Contact Name, Primary Contact Email, Country, Business Phone Number, Business Address, Billing Address, Expiry Date and Time, Actual Account Expiration.',
                    'Assigned Assessments: shows list of all assessments for the account by categories.',
                    'Meter Management: Metering Management Type, Allocated Meter, Parent Meter.',
                    'Other Account Settings: account limits, API Access Username, HRSC details, Assessment Specialist details, Client Contact details, Site Billing, Contract Type, Contract Meters, Addendum, Base Meter.',
                    'List of Users: Table list of Accounts Users under the account selected.'
                ],
                expected: [
                    'If Metering Management Type is not Deduct usage from this account then Parent Meter appears.',
                    'If Site Billing Amount (PHP)(Type) is Included in package then Site Billing Amount (PHP) appears.',
                    'If Contract Type is Volume-based then Addendum and Contract Meters appears.',
                    'If Contract Type is Per Usage then Base Meter appears.'
                ]
            },
            {
                id: 'update',
                title: 'Update',
                detail: 'Update account settings via wizard.',
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
                accessPath: 'Accounts > View Accounts',
                howToUse: ['Navigate in.', 'Update button of specific account.'],
                rules: ['Only shows when account is not archived and not your own account.'],
                expected: [
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
                detail: 'Move the Account to the Archived.',
                accessPath: 'Accounts > View Accounts',
                howToUse: ['Navigate in.', 'Archive button of specific account.'],
                rules: ['Only shows when account is not archived.']
            },
            {
                id: 'restore',
                title: 'Restore',
                detail: 'Move back account to the Accounts list.',
                accessPath: 'Accounts > View Accounts > View Archived Accounts',
                howToUse: ['Navigate in.', 'Restore button of specific account.'],
                rules: ['Only shows when account is archived.']
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
                id: 'advance-search',
                title: 'Advance Search',
                detail: 'Search for the contents of the table with configuration using rule.',
                accessPath: 'Accounts > View Accounts > Advance Search > Add Rule',
                howToUse: ['Navigate in.', 'Add Rule or Remove Rule.', 'Search Button.']
            }
        ],
        bulkActions: [
            {
                id: 'bulk-action-archive',
                title: 'Bulk Action: Archive',
                detail: 'Move all accounts that has been selected in checkbox to move to Archive.',
                accessPath: 'Accounts > View Accounts > Bulk > Archive',
                howToUse: ['Navigate in.', 'Select Checkboxes of Accounts.', 'Bulk Action.', 'Archive.'],
                rules: ['If account is logged they should not be able to select their account.']
            },
            {
                id: 'bulk-action-delete',
                title: 'Bulk Action: Delete',
                detail: 'Delete all accounts that has been selected in checkbox.',
                accessPath: 'Accounts > View Accounts > Bulk > Delete',
                howToUse: ['Navigate in.', 'Select Checkboxes of Accounts.', 'Bulk Action.', 'Delete.'],
                rules: ['If account is logged they should not be able to select their account.']
            },
            {
                id: 'bulk-action-restore',
                title: 'Bulk Action: Restore',
                detail: 'Retrive all accounts that has been selected in checkbox.',
                accessPath: 'Accounts > View Accounts > Bulk > Retrive',
                howToUse: ['Navigate in.', 'Select Checkboxes of Accounts.', 'Bulk Action.', 'Retrive.'],
                rules: ['If account is logged they should not be able to select their account.']
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
                childList.className = 'sidebar-children hidden mt-1 space-y-1';
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
        var childLists = Array.prototype.slice.call(sidebar.querySelectorAll('.sidebar-children'));

        links.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        childLists.forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;

        activeLink.classList.add('active', 'text-brand', 'font-semibold');

        var activeItem = activeLink.closest('.sidebar-item');
        while (activeItem) {
            var ownChildren = activeItem.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');

            var parentList = activeItem.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                activeItem = parentList.closest('.sidebar-item');
            } else {
                activeItem = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var targetIds = Array.prototype.slice.call(sidebar.querySelectorAll('a[data-target]'))
            .map(function (link) { return link.dataset.target; })
            .filter(Boolean);

        var currentId = null;
        targetIds.forEach(function (id) {
            var target = document.getElementById(id);
            if (!target) return;
            if (target.getBoundingClientRect().top <= 120) currentId = id;
        });

        return currentId || targetIds[0] || null;
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
        window.addEventListener('hashchange', function () {
            setTimeout(updateFromScroll, 50);
        });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderCreateAccount() {
        var container = document.getElementById('createAccountSections');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.createAccount.steps.forEach(function (step, index) {
            var card = createInfoCard(step);
            var badge = document.createElement('div');
            badge.className = 'mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white';
            badge.textContent = index + 1;
            card.insertBefore(badge, card.firstChild);
            container.appendChild(card);
        });

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
        var section = accountsContent.updateSpecific;
        var intro = createInfoCard(section);
        appendText(intro, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Variants');
        section.groups.forEach(function (group) {
            intro.appendChild(createInfoCard(group, 'nested'));
        });
        intro.appendChild(createBox('Rules', [section.securityRule]));
        container.appendChild(intro);
    }

    function renderFunctions() {
        var container = document.getElementById('functionSections');
        if (!container) return;
        container.innerHTML = '';
        accountsContent.functions.forEach(function (section) {
            container.appendChild(createInfoCard(section));
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__accountsContent = accountsContent;
})(window);
