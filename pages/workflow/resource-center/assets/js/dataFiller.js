(function (global) {
    'use strict';

    const resourceCenterContent = {
        title: 'Resource Center',
        sections: [
            {
                id: 'get-started',
                title: 'Get Started',
                description: 'Entry area that points users to key Resource Center content.',
                images: [
                    {
                        title: 'Resource Center Dashboard Overview',
                        caption: 'Resource library catalog providing manuals, video tutorials, and guidelines.',
                        src: '',
                        alt: 'Resource Center Overview Screenshot'
                    }
                ],
                children: [
                    {
                        id: 'manuals',
                        title: 'Manuals',
                        description: 'Open manuals and guides for the selected assessment or topic.',
                        images: [
                            {
                                title: 'Manuals & Guides Browser',
                                caption: 'Documentation browser for technical manuals, user guides, and executive summaries.',
                                src: '',
                                alt: 'Manuals Browser Screenshot'
                            }
                        ],
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Manuals'] }
                        ],
                        children: [
                            {
                                id: 'upload-manual',
                                title: 'Upload Manual',
                                description: 'Can upload Technical Manual, User Guide, and Executive Summary.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Manuals > Upload'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Manuals.',
                                    'Click Upload.',
                                    'Select the manual type.',
                                    'Upload the file.'
                                ],
                                expectedResults: [
                                    'The selected manual type is uploaded.'
                                ],
                                rules: ['500mb max upload']
                            },
                            {
                                id: 'preview-manual',
                                title: 'Preview Manual',
                                description: 'Can preview Technical Manual, User Guide, and Executive Summary.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Manuals > Preview'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Manuals.',
                                    'Click Preview.',
                                    'Select the manual type.',
                                    'Open the preview page.'
                                ],
                                expectedResults: [
                                    'A new preview page opens for the selected manual type.'
                                ]
                            },
                            {
                                id: 'check-manual-information',
                                title: 'Check Manual Information',
                                description: 'Check information for Technical Manual, User Guide, and Executive Summary.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Manuals'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Manuals.',
                                    'Select the item to check.'
                                ],
                                expectedResults: [
                                    'The selected manual information is shown.'
                                ]
                            },
                            {
                                id: 'overwrite-manual',
                                title: 'Overwrite Manual',
                                description: 'Check information for Technical Manual, User Guide, and Executive Summary.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Manuals > Upload'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Manuals.',
                                    'Click Upload.',
                                    'Select the manual type.',
                                    'Upload the file.',
                                    'Approve Overwritten modal.'
                                ],
                                expectedResults: [
                                    'The selected manual type is uploaded and overwrite the existing one.'
                                ],
                                rules: ['500mb max upload']
                            },
                            {
                                id: 'delete-manual',
                                title: 'Delete Manual',
                                description: 'Check information for Technical Manual, User Guide, and Executive Summary.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Manuals > Delete'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Delete.',
                                    'Select the manual type.',
                                    'Select the item to delete.'
                                ],
                                expectedResults: [
                                    'The selected manual information to delete.'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'video-tutorials',
                        title: 'Video Tutorials',
                        description: 'Open short videos that explain how to use the system.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Video Tutorials'] }
                        ],
                        children: [
                            {
                                id: 'upload-video',
                                title: 'Upload Video',
                                description: 'Upload video tutorials.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Video Tutorials > Upload'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Video Tutorials.',
                                    'Click Upload.',
                                    'Upload the video file.'
                                ],
                                expectedResults: [
                                    'The video file is uploaded.'
                                ],
                                rules: ['500mb max upload', '5 mins and HD vid (approx)']
                            },
                            {
                                id: 'check-video-information',
                                title: 'Check Video Information',
                                description: 'Check information for video tutorials.',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Video Tutorials'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Video Tutorials.',
                                    'Select the item to check.'
                                ],
                                expectedResults: [
                                    'The selected video information is shown.'
                                ]
                            },
                            {
                                id: 'delete-video',
                                title: 'Delete Video',
                                groups: [
                                    { title: 'Access Path', items: ['Resource Center > Get Started > Video Tutorials > Delete'] }
                                ],
                                steps: [
                                    'Open Resource Center.',
                                    'Select Get Started.',
                                    'Select Delete.',
                                    'Select the item to delete.'
                                ],
                                expectedResults: [
                                    'The selected Video to delete.'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'assessment-content',
                        title: 'Assessment Content',
                        description: 'Link users to assessment categories and related content.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Assessments'] }
                        ],
                        steps: [
                            'Open Resource Center.',
                            'Select Get Started.',
                            'Select Assessments from List.'
                        ],
                        expectedResults: [
                            'Assessment-related content is displayed.'
                        ]
                    },
                    {
                        id: 'search-assessment-content',
                        title: 'Search Assessment Content',
                        description: 'Search behavior applies to the selected assessment type only.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Assessments List > Search'] }
                        ],
                        steps: [
                            'Navigate to Assessments.',
                            'Select Type.',
                            'Search.'
                        ],
                        rules: [
                            'It can only search within the selected type.'
                        ],
                        expectedResults: [
                            'Show search filtering from the list of assessments.'
                        ]
                    },
                    {
                        id: 'feedback-survey',
                        title: 'Feedback Survey (Soon)',
                        description: 'Pending Resource Center content for feedback collection.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Feedback Survey'] }
                        ]
                    },
                    {
                        id: 'marketing-website',
                        title: 'Marketing Website (Soon)',
                        description: 'Pending Resource Center content for the marketing website entry.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Marketing Website'] }
                        ]
                    },
                    {
                        id: 'message-inbox',
                        title: 'Message Inbox',
                        description: 'Pending Resource Center content for message inbox access.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Get Started > Message Inbox'] }
                        ],
                        steps: [
                            'Navigate to the Get Started.',
                            'Select See All Message.',
                            'It will redirect the page to View Ticket in Help Desk.'
                        ],
                        expectedResults: [
                            'This point to different module page which can view more details in its own manual. Help Desk Module.'
                        ]
                    }
                ]
            },
            {
                id: 'guides-tutorials',
                title: 'Guides & Tutorials',
                description: 'Guides and tutorial content grouped by topic.',
                children: [
                    {
                        id: 'assessment-guides',
                        title: 'Assessments',
                        description: 'Assessment-related guides and tutorials.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Guides & Tutorials > Assessments'] }
                        ],
                        steps: [
                            'Open Resource Center.',
                            'Select Guides & Tutorials.',
                            'Select Assessments.'
                        ],
                        expectedResults: [
                            'Assessment guides or tutorials are displayed.'
                        ]
                    },
                    {
                        id: 'overview',
                        title: 'Overview',
                        description: 'Overview content under the assessment guide group.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Guides & Tutorials > Assessments > Overview'] }
                        ],
                        steps: [
                            'Navigate to the site.',
                            'Select from selection category.',
                            'Select Overview from the rows of selections.'
                        ],
                        expectedResults: [
                            'Overview content is displayed.'
                        ]
                    },
                    {
                        id: 'video-demo',
                        title: 'Video Demo',
                        description: 'Video demo content under the assessment guide group.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Guides & Tutorials > Assessments > Video Demo'] }
                        ],
                        steps: [
                            'Navigate to the site.',
                            'Select from selection category.',
                            'Select View Demo from the rows of selections.'
                        ],
                        expectedResults: [
                            'Video demo content is displayed.'
                        ]
                    },
                    {
                        id: 'assessment-center-site',
                        title: 'Assessment Center Site (Soon)',
                        description: 'Main assessment hub for browsing assessment-related pages.',
                        groups: [
                            { title: 'Access Path', items: ['Resource Center > Guides & Tutorials > Assessment Center Site'] }
                        ],
                        status: 'No contents yet'
                    },
                    {
                        id: 'training-materials',
                        title: 'Training Materials (Soon)',
                        description: 'Training materials section.'
                    },
                ]
            },
            {
                id: 'faqs-troubleshooting',
                title: 'FAQs & Troubleshooting',
                description: 'FAQ and troubleshooting section.',
                status: 'Content not yet provided'
            }
        ]
    };

    global.__resourceCenterContent = resourceCenterContent;
})(window);