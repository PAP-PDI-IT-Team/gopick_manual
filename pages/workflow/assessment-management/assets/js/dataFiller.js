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
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Preview Assessment'],
                                expectedResults: [
                                    'The preview displays the custom description provided by the assessment provider, including the description, dimensions, number of items, time limit, test norm, recommended level, and available test norms.',
                                    'For a test battery, the preview also lists the assessments included in the battery.'
                                ]
                            },
                            {
                                id: 'upload-norm',
                                title: 'Upload Norm',
                                description: 'Upload specialized norm tables and reference percentiles.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Upload Norm'],
                                links: [
                                    {
                                        label: 'Upload Norm page under construction',
                                        image: '../../../shared/img/upload-norm-under-construction.png?v=20261026-page-coming-soon',
                                        disabled: true
                                    }
                                ]
                            },
                            {
                                id: 'config-dropdown',
                                title: 'Config Dropdown',
                                description: 'Configure sub-dimensions, time limits, and test batteries.',
                                accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown'],
                                children: [
                                    {
                                        id: 'page-setup',
                                        title: 'Page Setup',
                                        description: 'Configures the page setup for the selected assessment.',
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown', 'Page Setup'],
                                        images: [
                                            {
                                                title: 'Page Setup',
                                                caption: 'Selected assessment configuration for the progress bar, randomize toggle, and timer setup.',
                                                src: '',
                                                alt: 'Assessment Page Setup Screenshot'
                                            }
                                        ],
                                        steps: [
                                            {
                                                label: 'Configure Assessment with the following:',
                                                children: [
                                                    'Progress bar',
                                                    'Randomize toggle',
                                                    'Timer Setup'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'set-questions',
                                        title: 'Set Questions',
                                        description: 'Modify assessment questions and other configurations.',
                                        images: [
                                            {
                                                title: 'Set Questions',
                                                caption: 'Question editing and configuration for the selected assessment.',
                                                src: '',
                                                alt: 'Assessment Set Questions Screenshot'
                                            }
                                        ],
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown', 'Set Questions'],
                                        steps: [
                                            'Modify questions individually by question number.',
                                            'Select Save to save the changes.'
                                        ]
                                    },
                                    {
                                        id: 'set-report-template',
                                        title: 'Set Report Template',
                                        description: 'Configures assessment information and assessment development.',
                                        images: [
                                            {
                                                title: 'Set Report Template',
                                                caption: 'Assessment Information and Assessment Development configuration.',
                                                src: '',
                                                alt: 'Assessment Set Report Template Screenshot'
                                            }
                                        ],
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown', 'Set Report Template'],
                                        steps: [
                                            {
                                                label: 'Assessment Information',
                                                children: [
                                                    'Name',
                                                    'Description',
                                                    'Meter Deduction',
                                                    'Assessment Category',
                                                    'Status'
                                                ]
                                            },
                                            {
                                                label: 'Assessment Development',
                                                children: [
                                                    'Report Template',
                                                    'Amified toggle',
                                                    'Re-upload Assessment import file',
                                                    'Upload Icon',
                                                    'Report Types',
                                                    'Category and Competency',
                                                    'IRT Initial Ability Types',
                                                    'DevNote'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'debug-mode',
                                        title: 'Debug Mode',
                                        description: 'Preview test instructions, item rendering, and candidate view in Debug Mode.',
                                        images: [
                                            {
                                                title: 'Debug Mode',
                                                caption: 'Assessment preview in Debug Mode.',
                                                src: '',
                                                alt: 'Assessment Debug Mode Screenshot'
                                            }
                                        ],
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Config Dropdown', 'Debug Mode'],
                                        expectedResults: [
                                            'Debug Mode displays the custom description provided by the assessment provider, including the description, dimensions, number of items, time limit, test norm, recommended level, and available test norms.',
                                            'For a test battery, Debug Mode also lists the assessments included in the battery.'
                                        ]
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
                                        title: 'Update',
                                        description: 'Updates assessment information and assessment development using the same configuration as Set Report Template.',
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Settings Dropdown', 'Update'],
                                        images: [
                                            {
                                                title: 'Update Assessment',
                                                caption: 'Assessment Information and Assessment Development configuration in Update.',
                                                src: '',
                                                alt: 'Update Assessment Screenshot'
                                            }
                                        ],
                                        steps: [
                                            {
                                                label: 'Assessment Information',
                                                children: [
                                                    'Name',
                                                    'Description',
                                                    'Meter Deduction',
                                                    'Assessment Category',
                                                    'Status'
                                                ]
                                            },
                                            {
                                                label: 'Assessment Development',
                                                children: [
                                                    'Report Template',
                                                    'Amified toggle',
                                                    'Re-upload Assessment import file',
                                                    'Upload Icon',
                                                    'Report Types',
                                                    'Category and Competency',
                                                    'IRT Initial Ability Types',
                                                    'DevNote'
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        id: 'export-assessment',
                                        title: 'Export Assessment',
                                        description: 'Exports the assessment as an XLSX file using the assessment template format.',
                                        images: [
                                            {
                                                title: 'Export Assessment',
                                                caption: 'Assessment export in XLSX template format.',
                                                src: '',
                                                alt: 'Export Assessment Screenshot'
                                            }
                                        ],
                                        expectedResults: [
                                            'An XLSX file is downloaded for the user.'
                                        ]
                                    },
                                    {
                                        id: 'view-scheduled-candidates',
                                        title: 'View Scheduled Candidates',
                                        description: 'Lists candidates scheduled for the selected assessment.',
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Settings Dropdown', 'View Scheduled Candidates'],
                                        links: [
                                            {
                                                label: 'View Scheduled Candidates page under construction',
                                                image: '../../../shared/img/upload-norm-under-construction.png?v=20261026-page-coming-soon',
                                                disabled: true
                                            }
                                        ]
                                    },
                                    {
                                        id: 'delete',
                                        title: 'Delete',
                                        description: 'Deletes the selected assessment.',
                                        accessPaths: ['Assessments', 'View Assessments', 'Assessment Card', 'Settings Dropdown', 'Delete'],
                                        steps: [
                                            'Select an assessment.',
                                            'Open Settings Dropdown and select Delete.',
                                            'Confirm the deletion in the confirmation modal.'
                                        ]
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
                        images: [
                            {
                                title: 'Download Template',
                                caption: 'Download Template action in Import Assessment.',
                                src: '',
                                alt: 'Download Assessment Template Screenshot'
                            }
                        ],
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
                children: [
                    {
                        id: 'create-test-battery-step-1',
                        title: 'Assessment List',
                        images: [
                            {
                                title: 'Assessment List',
                                caption: 'Categorized assessment list with selection checkboxes and assessment specifications.',
                                src: '',
                                alt: 'Assessment List Screenshot'
                            }
                        ],
                        description: 'Displays assessments grouped by category, with checkboxes and assessment specifications. Other test batteries are excluded.',
                        steps: [
                            'Select at least two assessments using the checkboxes.',
                            'Select Next to move to Test Battery Configurations.'
                        ],
                        rules: [
                            'Select a minimum of two assessments.'
                        ]
                    },
                    {
                        id: 'create-test-battery-step-2',
                        title: 'Test Battery Configurations',
                        images: [
                            {
                                title: 'Test Battery Configurations',
                                caption: 'Test battery configuration inputs with Save and Back actions.',
                                src: '',
                                alt: 'Test Battery Configurations Screenshot'
                            }
                        ],
                        requiredInputs: [
                            'Name',
                            'Status',
                            'Meter Deduction',
                            'Set Test Order and Passing Score'
                        ],
                        optionalInputs: ['Description'],
                        steps: [
                            'Enter the test battery configuration.',
                            'Select Save to save the test battery, or select Back to return to Assessment List.'
                        ]
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
