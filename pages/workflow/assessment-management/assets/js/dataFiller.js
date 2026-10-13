(function (global) {
    'use strict';

    const assessmentContent = {
        title: 'Assessment Management',
        description: 'Manage, search, preview, import, and configure assessments and test batteries across the GoPick platform.',
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
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Preview Assessment']
                            },
                            {
                                id: 'upload-norm',
                                title: 'Upload Norm',
                                description: 'Upload specialized norm tables and reference percentiles.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Upload Norm']
                            },
                            {
                                id: 'config-dropdown',
                                title: 'Config Dropdown',
                                description: 'Configure sub-dimensions, time limits, and test batteries.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown']
                            },
                            {
                                id: 'settings-dropdown',
                                title: 'Settings Dropdown',
                                description: 'Adjust scoring criteria, report delivery, and access levels.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Settings Dropdown']
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
                description: 'Access the Job Fit Profile Assessment subsystem and schedule candidate batches.'
            },
            {
                id: 'other-pages',
                title: 'Other Pages',
                description: 'Cross-functional auxiliary references for assessment delivery.'
            }
        ]
    };

    global.__assessmentContent = assessmentContent;
})(window);
