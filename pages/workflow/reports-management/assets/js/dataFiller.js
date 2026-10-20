(function (global) {
    'use strict';

    const reportsContent = {
        title: 'Reports Management',
        sections: [
            {
                id: 'search-usage',
                title: 'Search Usage',
                description: 'Search and review assessment usage records, including candidate, company, assessment, schedule date, scheduler, and assessment status.',
                images: [
                    {
                        title: 'Search Usage & Candidate Reports Table',
                        caption: 'Usage audit list showing candidates, associated battery modules, completion dates, and status.',
                        src: '',
                        alt: 'Search Usage Assessment Table Screenshot'
                    }
                ],
                rules: [
                    'Group Assessment/Test Battery: Display the Test Battery name above the sub-assessment name.',
                    'Single Assessment: Display the assessment name directly.'
                ],
                children: [
                    {
                        id: 'exporting-reports',
                        title: 'Exporting Reports',
                        description: 'Download available assessment reports for selected candidates and assessments.',
                        images: [
                            {
                                title: 'Download Bulk Report Action',
                                caption: 'Selection checklist and Download Report bulk action modal.',
                                src: '',
                                alt: 'Download Report Action Screenshot'
                            }
                        ],
                        steps: [
                            'Select Report, then Search Usage.',
                            'Select assessments.',
                            'In the Bulk Action drop down, select Download Report.'
                        ]
                    },
                    {
                        id: 'sending-reports',
                        title: 'Sending Reports',
                        description: 'Send assessment reports to selected recipients for candidates with available generated reports.',
                        steps: [
                            'Select Report, then Search Usage.',
                            'Select assessments.',
                            'In the Bulk Action drop down, select Send Report.'
                        ]
                    },
                    {
                        id: 'export-assessment-data',
                        title: 'Export Assessment Data',
                        description: 'Download assessment data for a selected assessment and date range.',
                        images: [
                            {
                                title: 'Export Assessment Raw Data Form',
                                caption: 'Account picker, assessment selector, and date range filter for dataset extraction.',
                                src: '',
                                alt: 'Export Assessment Data Filter Screenshot'
                            }
                        ],
                        steps: [
                            'Select Report, then Search Usage.',
                            'Select Export Assessment Data.',
                            'Select Account, Assessment in the account, and Date Range.',
                            'Export Data.'
                        ]
                    }
                ]
            }
        ]
    };

    global.__reportsContent = reportsContent;
})(window);