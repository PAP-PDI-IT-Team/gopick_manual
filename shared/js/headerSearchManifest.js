(function (global) {
    'use strict';

    var IGNORED_HEADINGS = [
        'action / workflow',
        'access path',
        'how to use',
        'how to use:',
        'how to use',
        'how to use',
        'how to',
        'expected result',
        'expected results',
        'rules',
        'rule',
        'notes',
        'notes: dev',
        'notes: qa',
        'notes: qa and system user',
        'notes: optional',
        'return button',
        'account configuration dropdown',
        'sections',
        'sections:',
        'format',
        'available types',
        'available row actions',
        'page buttons',
        'available pages',
        'available actions',
        'action dropdown',
        'bulk action',
        'bulk actions',
        'required inputs',
        'optional inputs',
        'conditional inputs',
        'candidate schedule required inputs',
        'candidate schedule optional inputs',
        'candidate schedule conditional inputs',
        'data encoding required inputs',
        'data encoding optional inputs',
        'editable inputs',
        'locked inputs',
        'visible content',
        'selection groups'
    ];

    var DOCS_MANIFEST = [
        {
            pageTitle: 'Dashboard',
            pageUrl: '../../pages/workflow/dashboard-management/index.html',
            docUrl: '../../docs/dashboard.md',
            anchorAliases: {
                'account-monitoring-section': 'account-monitoring'
            }
        },
        {
            pageTitle: 'Accounts',
            pageUrl: '../../pages/workflow/accounts-management/index.html',
            docUrl: '../../docs/workflow/account-management.md',
            anchorAliases: {
                'account-information': 'create-account-information',
                'assign-products': 'create-assign-products',
                'meter-management': 'create-meter-management',
                'other-account-settings': 'create-other-account-settings',
                'review-account': 'create-review-account-details',
                'view-account': 'account-detail',
                'archive-account': 'archive',
                'restore-account': 'restore',
                'bulk-archive': 'bulk-action-archive',
                'bulk-delete': 'bulk-action-delete',
                'bulk-restore': 'bulk-action-restore'
            }
        },
        {
            pageTitle: 'Activity Log',
            pageUrl: '../../pages/workflow/activity-log-management/index.html',
            docUrl: '../../docs/workflow/activity-log-management.md'
        },
        {
            pageTitle: 'Assessment Management',
            pageUrl: '../../pages/workflow/assessment-management/index.html',
            docUrl: '../../docs/workflow/assessment-management.md'
        },
        {
            pageTitle: 'Candidate Management',
            pageUrl: '../../pages/workflow/candidate-management/index.html',
            docUrl: '../../docs/workflow/candidate-management.md',
            anchorAliases: {
                'delete-candidate-snapshots-permanently': 'delete-snapshots',
                'delete-candidate': 'delete-candidates',
                'download-view-reports-of-assessments': 'downloadview-reports-of-assessments',
                'extend-link-expiration': 'extend-link-expirations'
            }
        },
        {
            pageTitle: 'Meters Management',
            pageUrl: '../../pages/workflow/meters-management/index.html',
            docUrl: '../../docs/workflow/meters-management.md'
        },
        {
            pageTitle: 'Reports Management',
            pageUrl: '../../pages/workflow/reports-management/index.html',
            docUrl: '../../docs/workflow/reports-management.md'
        },
        {
            pageTitle: 'Roles/Permissions Management',
            pageUrl: '../../pages/workflow/roles-premission-management/index.html',
            docUrl: '../../docs/workflow/roles-permission-management.md'
        },
        {
            pageTitle: 'Users Management',
            pageUrl: '../../pages/workflow/users-management/index.html',
            docUrl: '../../docs/workflow/users-management.md'
        },
        {
            pageTitle: 'Advisory Management',
            pageUrl: '../../pages/workflow/advisory-management/index.html',
            docUrl: '../../docs/workflow/advisory-management.md'
        },
        {
            pageTitle: 'Documentation Standard V2',
            pageUrl: '../../pages/guides/manual-guides/index.html',
            docUrl: '../../docs/guides/manual-documentation-standard.md'
        },
        {
            pageTitle: 'Changelog Versioning',
            pageUrl: '../../pages/guides/manual-guides/index.html',
            docUrl: '../../docs/guides/changelog-versioning.md'
        },
        {
            pageTitle: 'Resource Center',
            pageUrl: '../../pages/workflow/resource-center/index.html',
            docUrl: '../../docs/workflow/resource-center.md'
        },
        {
            pageTitle: 'Meters Governance',
            pageUrl: '../../pages/domain-governance/meters/index.html',
            docUrl: '../../docs/domain-governance/meters.md'
        },
        {
            pageTitle: 'Page Structure V3',
            pageUrl: '../../pages/guides/page-structure-v3/index.html',
            docUrl: '../../docs/guides/page-structure-v3.md'
        },
        {
            pageTitle: 'Dev Rules',
            pageUrl: '../../pages/dev-rules/index.html',
            docUrl: '../../docs/dev-rules.md',
            anchorAliases: {
                '5-layer-architecture': 'five-layer-architecture'
            }
        }
    ];

    global.sharedHeaderSearchManifest = {
        getSources: function () {
            return DOCS_MANIFEST;
        },

        getIgnoredHeadings: function () {
            return IGNORED_HEADINGS;
        }
    };

})(window);
