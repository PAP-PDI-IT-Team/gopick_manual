(function (global) {
    'use strict';

    const usersContent = {
        title: 'Users Management',
        sections: [
            {
                id: 'search-user-accounts',
                title: 'Search User Accounts',
                description: 'Search and review user records, including username, email, status, and user type.',
                images: [
                    {
                        title: 'User Accounts Directory View',
                        caption: 'User accounts table showing username, email, role, status badges, and action dropdowns.',
                        src: '',
                        alt: 'Search User Accounts Directory Screenshot'
                    }
                ],
                groups: [
                    {
                        title: 'Table Functions',
                        items: [
                            'Sort applies to all columns except Actions.',
                            'Filter is available for Status and User Type.',
                            'Search is available from the table view.'
                        ]
                    },
                    {
                        title: 'Provides Access',
                        items: ['View Archived Users']
                    }
                ],
                children: [
                    {
                        id: 'row-functions-active-users',
                        title: 'Row Functions',
                        description: 'Functions available from each active user row.',
                        children: [
                            {
                                id: 'view-active-user',
                                title: 'View',
                                description: 'View specific user information, including email, status, user type, and date created.'
                            },
                            {
                                id: 'update-active-user',
                                title: 'Update',
                                description: 'Update user information such as username, password, email, and status.',
                                images: [
                                    {
                                        title: 'Update User Information Modal',
                                        caption: 'User edit form with credential fields, role assignment, and status controls.',
                                        src: '',
                                        alt: 'Update User Information Modal Screenshot'
                                    }
                                ],
                                groups: [
                                    {
                                        title: 'Editable Fields',
                                        items: [
                                            'Username',
                                            'Password',
                                            'Show Content',
                                            'Email',
                                            'Status'
                                        ],
                                        rules: [
                                            'Password must have 8 characters.',
                                            'Password must contain 1 lower cased letter.',
                                            'Password must contain 1 upper cased letter.',
                                            'Password must contain 1 number.'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'activate-ac-api-access-active',
                                title: 'Activate AC-API Access',
                                description: 'Currently not working and not yet documented.',
                                warning: [
                                    'Currently not working.',
                                    'Not yet documented.'
                                ]
                            },
                            {
                                id: 'archive-active-user',
                                title: 'Archive',
                                description: 'Archive the selected user.'
                            },
                            {
                                id: 'delete-active-user',
                                title: 'Delete',
                                description: 'Delete the selected user.'
                            }
                        ]
                    },
                    {
                        id: 'bulk-actions-active-users',
                        title: 'Bulk Actions',
                        description: 'Actions available for selected active users.',
                        children: [
                            {
                                id: 'export-active-users',
                                title: 'Export',
                                description: 'Download selected masked user information.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select the checkboxes of the users to export.',
                                    'In the Bulk Action dropdown, select Export.'
                                ]
                            },
                            {
                                id: 'archive-active-users',
                                title: 'Archive',
                                description: 'Archive selected users.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select the checkboxes of the users to archive.',
                                    'In the Bulk Action dropdown, select Archive.'
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'view-archive-users',
                title: 'View Archive Users',
                description: 'Search and review archived user records, including username, email, status, and user type.',
                groups: [
                    {
                        title: 'Table Functions',
                        items: [
                            'Sort applies to all columns except Actions.',
                            'Filter is available for Status and User Type.',
                            'Search is available from the table view.'
                        ]
                    }
                ],
                children: [
                    {
                        id: 'row-functions-archived-users',
                        title: 'Row Functions',
                        description: 'Functions available from each archived user row.',
                        children: [
                            {
                                id: 'view-archived-user',
                                title: 'View',
                                description: 'View specific archived user information, including email, parent status, user type, and date created.'
                            },
                            {
                                id: 'update-archived-user',
                                title: 'Update',
                                description: 'Update archived user information such as username, password, email, and status.',
                                groups: [
                                    {
                                        title: 'Editable Fields',
                                        items: [
                                            'Username',
                                            'Password',
                                            'Show Content',
                                            'Email',
                                            'Status'
                                        ],
                                        rules: [
                                            'Password must have 8 characters.',
                                            'Password must contain 1 lower cased letter.',
                                            'Password must contain 1 upper cased letter.',
                                            'Password must contain 1 number.',
                                            'Some account types have no parent: Administrator (ASD), Super Admin (IT), API Access, and Test Creator.'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'activate-ac-api-access-archived',
                                title: 'Activate AC-API Access',
                                description: 'Currently not working and not yet documented.',
                                warning: [
                                    'Currently not working.',
                                    'Not yet documented.'
                                ]
                            },
                            {
                                id: 'archive-archived-user',
                                title: 'Archive',
                                description: 'Archive the selected archived user.'
                            },
                            {
                                id: 'delete-archived-user',
                                title: 'Delete',
                                description: 'Delete the selected archived user.'
                            }
                        ]
                    },
                    {
                        id: 'bulk-actions-archived-users',
                        title: 'Bulk Actions',
                        description: 'Actions available for selected archived users.',
                        children: [
                            {
                                id: 'export-archived-users',
                                title: 'Export',
                                description: 'Download selected masked archived user information.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select View Active Users.',
                                    'Select the checkboxes of the archived users to export.',
                                    'In the Bulk Action dropdown, select Export.'
                                ]
                            },
                            {
                                id: 'retrieve-archived-users',
                                title: 'Retrieve',
                                description: 'Retrieve selected archived users.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select View Active Users.',
                                    'Select the checkboxes of the archived users to retrieve.',
                                    'In the Bulk Action dropdown, select Retrieve.'
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    global.__usersContent = usersContent;
})(window);