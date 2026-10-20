(function (global) {
    'use strict';

    var rolesPermissionContent = {
        title: 'Roles/Permissions Module',
        description: 'RBAC matrix, permission legend, and account hierarchy for GoPick roles and account types.',
        sections: [
            {
                id: 'legend',
                title: 'Legend',
                description: 'Permission symbol classification across all functional rows in the matrix.'
            },
            {
                id: 'rbac-matrix',
                title: 'RBAC Matrix',
                description: 'Permissions for each role across account and user functions. Scroll horizontally on smaller screens.',
                images: [
                    {
                        title: 'Role-Based Access Control (RBAC) Matrix',
                        caption: 'Interactive permissions matrix mapping system operations against user roles and access scopes.',
                        src: '',
                        alt: 'RBAC Matrix Screenshot'
                    }
                ]
            },
            {
                id: 'hierarchy',
                title: 'Account Hierarchy',
                description: 'GoPick uses a nested account structure. Each level inherits access downward.',
                images: [
                    {
                        title: 'Account Inheritance Hierarchy',
                        caption: 'Structural tree depicting parent-to-child inheritance rules from Super Admin down to Self Registration.',
                        src: '',
                        alt: 'Account Hierarchy Tree Screenshot'
                    }
                ]
            },
            {
                id: 'roles',
                title: 'Role Capabilities',
                description: 'Auto-generated summary of available and conditional permissions per role.',
                images: [
                    {
                        title: 'Role Capability Cards Overview',
                        caption: 'Per-role capabilities overview summarizing available versus conditional operational privileges.',
                        src: '',
                        alt: 'Role Capability Cards Screenshot'
                    }
                ]
            }
        ],
        hierarchyLines: [
            'Super Admin (IT)',
            'Super Admin (ASD)',
            '└─ Distributor',
            '   ├─ Administrator',
            '   ├─ Self Registration',
            '   └─ Sub Distributor',
            '      ├─ Administrator',
            '      ├─ Self Registration',
            '      └─ Client',
            '         ├─ Administrator',
            '         └─ Sub Client',
            '            ├─ Administrator',
            '            └─ Self Registration'
        ],
        legends: [
            { sym: 'X', label: 'Hard-coded available', cls: 'rbac-x' },
            { sym: 'C', label: 'Conditional controlled by Super Admin', cls: 'rbac-c' },
            { sym: 'N', label: 'Not applicable', cls: 'rbac-n' },
            { sym: '-', label: 'Hard-coded not available', cls: 'rbac-dash' }
        ]
    };

    global.__rolesPermissionContent = rolesPermissionContent;
})(window);
