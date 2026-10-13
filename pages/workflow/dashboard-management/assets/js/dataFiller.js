(function (global) {
    'use strict';

    const dashboardContent = {
        title: 'Dashboard Management',
        description: 'The dashboard provides a central location to review high-level account activity, meter status, and current operational counts.',
        sections: [
            {
                id: 'account-monitoring',
                title: 'Account Monitoring Section',
                description: 'Displays meter requests, active accounts, expiring accounts, and inactive accounts in real time.',
                accessPaths: ['Dashboard', 'Account Monitoring'],
                images: [
                    {
                        title: 'Dashboard Operational Overview',
                        caption: 'High-level dashboard overview showing meter requests, active accounts, expiring accounts, and inactive account cards.',
                        src: '',
                        alt: 'Dashboard Account Monitoring Overview'
                    }
                ],
                metrics: [
                    {
                        label: 'Meter Request',
                        detail: 'Total number of requests of meters',
                        icon: 'meter'
                    },
                    {
                        label: 'Active Account',
                        detail: 'Total of Active Accounts',
                        icon: 'users'
                    },
                    {
                        label: 'Expiring Accounts (in 1 month)',
                        detail: 'Total of expiring accounts combine expiry date and account expiration extension that has less than a month before expiration',
                        icon: 'calendar'
                    },
                    {
                        label: 'Inactive Account',
                        detail: 'Total of Archived, Deactivated and Expired accounts',
                        icon: 'user-x'
                    }
                ],
                rules: [
                    'Active account counts include all accounts in healthy standing with valid expiration dates.',
                    'Expiring account thresholds trigger automatically within 30 days of the recorded expiration date.'
                ],
                expectedResults: [
                    'Administrators see instantaneous snapshot metrics upon logging in without running manual queries.'
                ]
            },
            {
                id: 'quick-navigations',
                title: 'Quick Navigations',
                description: 'Provides direct operational links to frequent administrative and support actions.',
                accessPaths: ['Dashboard', 'Quick Navigations'],
                images: [
                    {
                        title: 'Quick Actions & Help Desk Navigation',
                        caption: 'Shortcut panels for account creation, meter orders, inquiry submission, and message notifications.',
                        src: '',
                        alt: 'Dashboard Quick Navigation Cards'
                    }
                ],
                quickLinks: [
                    {
                        title: 'Quick Links',
                        items: [
                            { title: 'Create Account', subTitle: 'Navigation Link', icon: 'plus-user' },
                            { title: 'View Account', subTitle: 'Navigation Link', icon: 'view-account' },
                            { title: 'Meter Records', subTitle: 'Navigation Link', icon: 'meter-records' }
                        ]
                    },
                    {
                        title: 'Help Desk',
                        items: [
                            { title: 'Order Meter', subTitle: 'Navigation Link', icon: 'order-meter' },
                            { title: 'Send Inquiry', subTitle: 'Navigation Link', icon: 'send-inquiry' }
                        ]
                    },
                    {
                        title: 'Announcement',
                        items: [
                            'Latest 2 announcements and each can be clicked'
                        ]
                    },
                    {
                        title: 'Message Inbox',
                        items: [
                            'Latest 2 message and each can be clicked',
                            'See All Messages: Navigation Link'
                        ]
                    }
                ],
                rules: [
                    'Create Account and Meter Records shortcuts respect role-based permissions (RBAC).',
                    'Announcements link directly to detailed release or maintenance notices.'
                ]
            }
        ]
    };

    global.__dashboardContent = dashboardContent;
})(window);
