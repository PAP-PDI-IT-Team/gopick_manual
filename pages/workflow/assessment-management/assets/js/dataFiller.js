(function (global) {
    'use strict';

    const assessmentContent = {
        title: 'Assessment Management',
        description: 'Manages assessments, creates test batteries, and provides access to Job Fit Profile (JFP).',
        sections: [
            {
                id: 'view-assessments',
                title: 'View Assessments',
                description: 'List of assessments available in a grid card gallery.',
                images: [
                    {
                        title: 'Assessment Catalog Gallery View',
                        caption: 'Interactive catalog of available assessments with search, category filtering, and direct action triggers.',
                        src: '',
                        alt: 'View Assessments Catalog Screenshot'
                    }
                ],
                children: [
                    {
                        id: 'search',
                        title: 'Search',
                        description: 'Searches the visible assessment cards.',
                        images: [
                            {
                                title: 'Assessment Search',
                                caption: 'Search input used to find assessment cards.',
                                src: '',
                                alt: 'Assessment Search Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Search Input'],
                        steps: [
                            'Open View Assessments.',
                            'Enter search text.',
                            'Submit the search.'
                        ],
                        expectedResults: [
                            'Assessment cards matching the search text are displayed.'
                        ]
                    },
                    {
                        id: 'advanced-search',
                        title: 'Advanced Search',
                        description: 'Searches assessments using configured rules.',
                        images: [
                            {
                                title: 'Assessment Advanced Search',
                                caption: 'Advanced Search rules for finding assessments.',
                                src: '',
                                alt: 'Assessment Advanced Search Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Advanced Search'],
                        steps: [
                            'Open View Assessments.',
                            'Open Advanced Search.',
                            'Add or remove search rules.',
                            'Select Search.'
                        ],
                        expectedResults: [
                            'Assessment cards matching the configured rules are displayed.'
                        ]
                    },
                    {
                        id: 'filter-by-category',
                        title: 'Filter By Category',
                        description: 'Restricts the assessment gallery to a selected category.',
                        images: [
                            {
                                title: 'Filter By Category',
                                caption: 'Category filter for the assessment gallery.',
                                src: '',
                                alt: 'Filter By Category Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Filter By Category'],
                        steps: [
                            'Open View Assessments.',
                            'Open Filter By Category.',
                            'Select a category.'
                        ],
                        expectedResults: [
                            'Only assessment cards in the selected category are displayed.'
                        ]
                    },
                    {
                        id: 'filter-by-codes',
                        title: 'Filter By Codes',
                        description: 'Restricts the assessment gallery using a selected assessment code.',
                        images: [
                            {
                                title: 'Filter By Codes',
                                caption: 'Assessment code filter for the assessment gallery.',
                                src: '',
                                alt: 'Filter By Codes Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Filter By Codes'],
                        steps: [
                            'Open View Assessments.',
                            'Open Filter By Codes.',
                            'Select the applicable code.'
                        ],
                        expectedResults: [
                            'Only assessment cards matching the selected code are displayed.'
                        ]
                    },
                    {
                        id: 'sort',
                        title: 'Sort',
                        description: 'Orders assessment cards using a selected field.',
                        images: [
                            {
                                title: 'Assessment Sort',
                                caption: 'Sort field selection for assessment cards.',
                                src: '',
                                alt: 'Assessment Sort Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Sort'],
                        steps: [
                            'Open View Assessments.',
                            'Open Sort.',
                            'Select a sort field.'
                        ],
                        expectedResults: [
                            'Assessment cards are reordered using the selected field.'
                        ]
                    },
                    {
                        id: 'sort-by-ascending-or-descending',
                        title: 'Sort By Ascending or Descending',
                        description: 'Controls the direction applied to the selected sort field.',
                        images: [
                            {
                                title: 'Sort Direction',
                                caption: 'Ascending and descending sort controls for assessment cards.',
                                src: '',
                                alt: 'Sort Direction Screenshot'
                            }
                        ],
                        accessPaths: ['Assessments', 'View Assessments', 'Sort Direction'],
                        steps: [
                            'Select a sort field.',
                            'Select ascending or descending order.'
                        ],
                        expectedResults: [
                            'Assessment cards are displayed in the selected direction.'
                        ]
                    },
                    {
                        id: 'click-assessment-card',
                        title: 'View specific Assessment',
                        description: 'View Assessment Informations: Description, Dimension, Number of Items, Time Limit, Test Norms, Recommended Level and/or etc.',
                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card'],
                        images: [
                            {
                                title: 'Assessment Details & Parameters View',
                                caption: 'Modal view detailing assessment dimensions, item count, norms, and configuration dropdowns.',
                                src: '',
                                alt: 'Specific Assessment Information Screenshot'
                            }
                        ],
                        steps: [
                            'Open View Assessments.',
                            'Select an assessment card.'
                        ],
                        children: [
                            {
                                id: 'preview-assessment',
                                title: 'Preview Assessment',
                                description: 'Preview test instructions, item rendering, and candidate view.',
                                images: [
                                    {
                                        title: 'Preview Assessment',
                                        caption: 'Assessment preview view.',
                                        src: '',
                                        alt: 'Preview Assessment Screenshot'
                                    }
                                ],
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Preview Assessment']
                            },
                            {
                                id: 'upload-norm',
                                title: 'Upload Norm',
                                description: 'Upload specialized norm tables and reference percentiles.',
                                images: [
                                    {
                                        title: 'Upload Norm',
                                        caption: 'Assessment norm upload view.',
                                        src: '',
                                        alt: 'Upload Norm Screenshot'
                                    }
                                ],
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Upload Norm']
                            },
                            {
                                id: 'config-dropdown',
                                title: 'Config Dropdown',
                                description: 'Configure sub-dimensions, time limits, and test batteries.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown'],
                                children: [
                                    {
                                        id: 'page-setup',
                                        title: 'Page Setup'
                                    },
                                    {
                                        id: 'set-questions',
                                        title: 'Set Questions'
                                    },
                                    {
                                        id: 'set-report-template',
                                        title: 'Set Report Template'
                                    },
                                    {
                                        id: 'debug-mode',
                                        title: 'Debug Mode'
                                    }
                                ]
                            },
                            {
                                id: 'settings-dropdown',
                                title: 'Settings Dropdown',
                                description: 'Adjust scoring criteria, report delivery, and access levels.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Settings Dropdown'],
                                children: [
                                    {
                                        id: 'update',
                                        title: 'Update'
                                    },
                                    {
                                        id: 'export-assessment',
                                        title: 'Export Assessment'
                                    },
                                    {
                                        id: 'view-scheduled-candidates',
                                        title: 'View Scheduled Candidates'
                                    },
                                    {
                                        id: 'delete',
                                        title: 'Delete'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'import-assessment',
                title: 'Import Assessment',
                description: 'Upload and ingest an assessment definition into the system.',
                accessPaths: ['Assessments', 'Import Assessment'],
                images: [
                    {
                        title: 'Import Assessment Wizard',
                        caption: 'File upload zone with template validator and batch ingest controls.',
                        src: '',
                        alt: 'Import Assessment Wizard Screenshot'
                    }
                ],
                steps: [
                    'Open Import Assessment.',
                    'Select an assessment file based on the provided template.',
                    'Select Import Assessment.'
                ],
                children: [
                    {
                        id: 'download-template',
                        title: 'Download Template',
                        description: 'Download the standardized template for assessment definitions.',
                        accessPaths: ['Assessments', 'Import Assessment', 'Download Template'],
                        steps: [
                            'Open Import Assessment.',
                            'Select Download Template.'
                        ]
                    }
                ]
            },
            {
                id: 'create-test-battery',
                title: 'Create Test Battery',
                description: 'Create test battery assessments by combining multiple individual assessments.',
                images: [
                    {
                        title: 'Create Test Battery Configuration',
                        caption: 'Battery builder combining multiple cognitive, behavioral, or skills assessments.',
                        src: '',
                        alt: 'Create Test Battery Screenshot'
                    }
                ]
            },
            {
                id: 'schedule-job-fit-profile',
                title: 'Schedule Job Fit Profile',
                description: 'Access the Job Fit Profile Assessment subsystem and schedule candidate batches.',
                images: [
                    {
                        title: 'Schedule Job Fit Profile',
                        caption: 'Job Fit Profile Assessment subsystem.',
                        src: '',
                        alt: 'Schedule Job Fit Profile Screenshot'
                    }
                ]
            }
        ]
    };

    global.__assessmentContent = assessmentContent;
})(window);
