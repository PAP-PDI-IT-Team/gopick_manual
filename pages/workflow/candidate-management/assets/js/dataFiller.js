(function (global) {
    'use strict';

    const candidateContent = {
        title: 'Candidate Management',
        sections: [
            {
                id: 'schedule-candidate',
                title: 'Schedule Candidate',
                description: 'Schedules candidates through either candidate schedule or data encoding.',
                accessPath: 'Candidates > Schedule Candidate',
                steps: [
                    'Open Candidates.',
                    'Select Schedule Candidate.',
                    { label: 'Select Schedule Type.', href: '#schedule-type' },
                    { label: 'Complete Candidate Information.', href: '#candidate-information' },
                    { label: 'Complete Test Requirements.', href: '#test-requirements' },
                    { label: 'Complete Assign Products.', href: '#assign-products' },
                    { label: 'Review Candidate Details.', href: '#review-candidate-details' },
                    'Save the candidate schedule.'
                ],
                images: [
                    {
                        title: 'Schedule Candidate Overview',
                        caption: 'Shows the full Schedule Candidate navigation flow and action toolbar.',
                        src: null
                    }
                ],
                rules: [
                    'Inputs are optional when they are not indicated as required.',
                    'Inputs indicated as required must be completed.',
                    'Conditional inputs appear only when their condition is met.'
                ],
                expected: ['Candidate schedule details are saved using the reviewed configuration.'],
                children: [
                    {
                        id: 'schedule-type',
                        title: 'Schedule Type',
                        description: 'Selects the scheduling workflow based on how the candidate assessment will be handled.',
                        groups: [
                            { title: 'Available types', items: ['Candidate Schedule: Schedule multiple candidates with the same assessment.', 'Data Encoding: Schedule multiple candidates who took the assessment via paper and pen.'] },
                            { title: 'Required inputs', items: ['Schedule Type'] }
                        ],
                        rules: [
                            'Inputs are optional when they are not indicated as required.',
                            'Inputs indicated as required must be completed.'
                        ]
                    },
                    {
                        id: 'candidate-information',
                        title: 'Candidate Information',
                        description: 'Collects the account and candidate identity information used to create the candidate.',
                        images: [
                            {
                                title: 'Candidate Information Form',
                                caption: 'Account Name, First Name, Last Name, Candidate Email, and Gender fields.',
                                src: null
                            }
                        ],
                        groups: [
                            {
                                title: 'Required inputs',
                                items: ['Account Name', 'First Name', 'Last Name', 'Candidate Email', 'Gender']
                            }
                        ],
                        rules: [
                            'Inputs are optional when they are not indicated as required.',
                            'Inputs indicated as required must be completed.',
                            'Use one account name at a time.',
                            'Avoid duplicate candidate email addresses.'
                        ]
                    },
                    {
                        id: 'test-requirements',
                        title: 'Test Requirements',
                        description: 'Sets schedule-type-specific test requirements, link validity, reminder, recipient, invitation, and backup email details.',
                        groups: [
                            {
                                title: 'Candidate Schedule required inputs',
                                items: ['Camera Requirements', 'Mic Requirements', 'Start Date', 'Time Start', 'Expiration Date', 'Time Expiration', 'Assessment Reminder', 'Reminder Time', 'Assessment Report Recipient', 'Assessment Invitation Email', 'Backup Email']
                            },
                            {
                                title: 'Candidate Schedule optional inputs',
                                items: ['Candidate Email as Report Recipient', 'Report Recipient Email', 'Candidate Email', 'Report Recipient']
                            },
                            {
                                title: 'Candidate Schedule conditional inputs',
                                items: ['Reminder Frequency', 'Every # of days interval', 'Custom Email', 'Custom Assessment Invitation Email']
                            },
                            {
                                title: 'Data Encoding required inputs',
                                items: ['Start Date', 'Time Start', 'Assessment Report Recipient', 'Backup Email']
                            },
                            {
                                title: 'Data Encoding optional inputs',
                                items: ['Candidate Email as Report Recipient', 'Report Recipient Email']
                            }
                        ],
                        rules: [
                            'Inputs are optional when they are not indicated as required.',
                            'Inputs indicated as required must be completed.',
                            'Conditional inputs appear only when their condition is met.',
                            'Time Start, Expiration Date, Time Expiration, Reminder Time, Assessment Invitation Email, and Backup Email can be autofilled when applicable.',
                            'Assessment Report Recipient uses server-side email checking.',
                            'Assessment Report Recipient can accept multiple email addresses separated by commas.'
                        ]
                    },
                    {
                        id: 'assign-products',
                        title: 'Assign Products',
                        description: 'Assigns assessments that the candidate will take.',
                        groups: [
                            { title: 'Required inputs', items: ['At least one assessment.'] },
                            { title: 'Optional selection groups', items: ['Cognitive/Knowledge-based Assessment', 'Competency-based Assessment', 'Survey', 'Behavioral/Personality-Based Assessment', 'Test Battery'] }
                        ],
                        rules: [
                            'Inputs are optional when they are not indicated as required.',
                            'Inputs indicated as required must be completed.',
                            'At least one assessment is required.',
                            'When a single assessment is selected, all test batteries containing that assessment are locked.',
                            'When a test battery is selected, all single assessments included in that battery are locked.',
                            'When a test battery is selected, all other test batteries that share at least one common single assessment are also locked.'
                        ],
                        notes: ['Test Battery is a group of assessments bundled together.']
                    },
                    {
                        id: 'review-candidate-details',
                        title: 'Review Candidate Details',
                        description: 'Reviews candidate schedule details before saving.',
                        groups: [
                            { title: 'Visible content', items: ['Candidate information.', 'Test requirements.', 'Assigned products.', 'Schedule details.'] }
                        ],
                        steps: [
                            'Open Review Candidate Details.',
                            'Review candidate information.',
                            'Review test requirements.',
                            'Review assigned products.',
                            'Go back to the relevant step when a value needs correction.',
                            'Save the candidate schedule when the reviewed details are correct.'
                        ],
                        rules: [
                            'Inputs are optional when they are not indicated as required.',
                            'Inputs indicated as required must be completed.',
                            'Conditional inputs appear only when their condition is met.',
                            'Saving must use the reviewed configuration from the current schedule candidate flow.'
                        ],
                        expected: ['The reviewed candidate details are used when the candidate schedule is about to be saved.']
                    }
                ]
            },
            {
                id: 'view-candidates',
                title: 'View Candidates',
                description: 'Displays candidates list by the selected distributor account.',
                accessPath: 'Candidates > View Candidates',
                groups: [
                    { title: 'Legends', items: ['Scheduled - otherwise, when schedules exist.', 'Started - any schedule is started, completed, report_pending, scored, or has date_completed, but not all are completed-like.', 'Completed - all schedules are completed, report_pending, or scored while not all are scored.', 'Scored - all schedules are scored.', 'Expired - expiration date is lapsed and not yet completed-like, this is optional badge.', 'Blocked - when the candidate is blocked, this is optional badge.'] },
                    { title: 'Available row actions', items: [{ label: 'View Candidate', href: '#view-candidate' }, { label: 'Update Candidate', href: '#update-candidate' }, { label: 'Settings Candidate - Schedule Assessment', href: '#schedule-assessment' }, { label: 'Settings Candidate - View Candidate Log', href: '#view-candidate-log' }, { label: 'Settings Candidate - View Schedule Assessments', href: '#view-assessments' }, { label: 'Settings Candidate - View Snapshots', href: '#view-snapshots' }] },
                    { title: 'Bulk action', items: [{ label: 'Send Report', href: '#send-report' }, { label: 'Archive', href: '#archive' }, { label: 'Export', href: '#export' }, { label: 'Delete Candidate Snapshots Permanently', href: '#delete-snapshots' }, { label: 'Delete Candidate', href: '#delete-candidates' }, { label: 'Download Executive Summary Reports', href: '#download-executive-summary-reports' }, { label: 'Send Reminders', href: '#send-reminders' }, { label: 'Extend Link Expiration', href: '#extend-link-expirations' }] }
                ],
                rules: [
                    'If there is no selected distributor account yet then No listing will be provided.',
                    'If selected distributor account and no scheduled candidate yet then No Result prompt will appear.',
                    'Error exception: Broken Hierarchy.'
                ],
                children: [
                    {
                        id: 'row-functions',
                        title: 'Row Functions',
                        children: [
                            {
                                id: 'view-candidate',
                                title: 'View Candidate',
                                description: 'Shows information specific to the selected candidate.',
                                accessPath: 'Candidates > View Candidates > View Row Action',
                                groups: [
                                    { title: 'Action dropdown', items: [{ label: 'Update Candidate', href: '#update-candidate' }, { label: 'View Assessment', href: '#view-assessments' }, { label: 'Schedule Another Assessment', href: '#schedule-another-assessments' }, { label: 'View Snapshots', href: '#view-snapshots' }, { label: 'View Candidate Log', href: '#view-candidate-log' }, { label: 'Unblock Candidate', href: '#unblock-candidate' }] },
                                    { title: 'Page buttons', items: [{ label: 'Resend Credentials', href: '#resend-credentials' }, { label: 'Resend Invitation', href: '#resend-invitation' }, { label: 'Back Button', href: '#back-button' }] }
                                ],
                                children: [
                                    { id: 'resend-credentials', title: 'Resend Credentials' },
                                    { id: 'resend-invitation', title: 'Resend Invitation' },
                                    { id: 'back-button', title: 'Back Button' }
                                ]
                            },
                            {
                                id: 'update-candidate',
                                title: 'Update Candidate',
                                description: 'Updates candidate information, account, reminder settings, assessment invitation, test requirements, and link validity.',
                                accessPath: 'Candidate > View Candidate > Update | Candidate > View Candidate > View > Action Dropdown > Update Candidate',
                                steps: ['Open View Accounts.', 'Update allowed specific updates.', 'Save.'],
                                groups: [
                                    { title: 'Editable inputs', items: ['First Name', 'Last Name', 'Gender', 'Candidate Email', 'Phone Number', 'Birthdate', 'Educational Attainment', 'Level of Position Applying For', 'Work Experience', 'Job Position', 'Reminder Frequency', 'Reminder Time', 'Assessment Invitation Email', 'Report Recipient Email', 'Camera Requirement', 'Mic Requirement', 'Start Date', 'Time Start', 'Expiration Date', 'Time Expiration'] },
                                    { title: 'Locked inputs', items: ['Schedule Type', 'Account Name', 'Username', 'Password'] }
                                ],
                                rules: [
                                    'Schedule Type, Account Name, Username, and Password cannot be changed.',
                                    'First Name, Last Name, Candidate Email, Job Position, Assessment Invitation Email, and Report Recipient Email have a maximum of 100 characters.'
                                ],
                                expected: ['Changes available information in view of specific candidate.']
                            }
                        ]
                    },
                    {
                        id: 'dropdown-functions',
                        title: 'Dropdown Functions',
                        children: [
                            {
                                id: 'schedule-assessment',
                                title: 'Schedule Assessment',
                                description: 'Can add more assessment for the candidate.',
                                accessPath: 'Candidates > View Candidates > Cog/Settings icon > Schedule Assessment | Candidates > View Candidates > View Candidate > Actions Dropdown > View Assessment > Add Assessment',
                                groups: [{ title: 'Legends', items: ['Scheduled - means scheduled and set as assessment.', 'Locked - means it was locked because it was selected by a group assessment or single assessment.'] }],
                                steps: ['Select more assessments that are not yet selected.', 'Save.'],
                                rules: [
                                    'When a single assessment or group assessment is selected they lock the assessment so it will not be redundant. Take note of Locked or Scheduled.',
                                    'Example: Test Battery [A1] is selected which has CAP and CTP, then it will lock CAP and CTP.',
                                    'Selecting a group assessment and single assessment that share an assessment will be blocked.'
                                ],
                                expected: ['Create a new candidates account, send email for them to use to login, and create all affiliated information for the candidate depending on their type.']
                            },
                            {
                                id: 'view-candidate-log',
                                title: 'View Candidate Log',
                                description: 'Visits the module for activity logging of the candidate activity.',
                                accessPath: 'Candidates > View Candidates > Cog/Settings icon > View Candidate Log',
                                expected: ['List of logs of the candidate: errors, activity, screenshot connected to their activity during the snapshot initiated, device information, and other information possible useful for investigation.']
                            },
                            {
                                id: 'view-snapshots',
                                title: 'View Snapshots',
                                description: 'Visits the module for activity logging of the candidate snapshot during activity.',
                                accessPath: 'Candidates > View Candidates > Cog/Settings icon > View Snapshots',
                                expected: ['List of snapshot logs of the candidate.']
                            },
                            { id: 'schedule-another-assessments', title: 'Schedule Another Assessment' },
                            { id: 'unblock-candidate', title: 'Unblock Candidate' }
                        ]
                    },
                    {
                        id: 'bulk-action',
                        title: 'Bulk Action',
                        children: [
                            {
                                id: 'send-report',
                                title: 'Send Report',
                                description: 'Sends the selected candidates report to the entered email.',
                                accessPath: 'Candidates > View Candidates > Bulk Action dropdown > Send Report',
                                steps: ['Navigate to the page.', 'Enter email.', 'Press Send Report.'],
                                rules: ['Valid email address.'],
                                expected: ['Set account will receive reports from candidates selected.']
                            },
                            {
                                id: 'archive',
                                title: 'Archive',
                                description: 'Moves selected candidates rows to archived accounts.',
                                accessPath: 'Candidates > View Candidates > Bulk Action dropdown > Archive',
                                expected: ['Move all selected accounts to archive.']
                            },
                            { id: 'export', title: 'Export', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' },
                            { id: 'delete-snapshots', title: 'Delete Candidate Snapshots Permanently', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' },
                            { id: 'delete-candidates', title: 'Delete Candidate', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' },
                            { id: 'download-executive-summary-reports', title: 'Download Executive Summary Reports', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' },
                            { id: 'send-reminders', title: 'Send Reminders', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' },
                            { id: 'extend-link-expirations', title: 'Extend Link Expiration', accessPath: 'Candidates > View Candidates > Bulk Action dropdown' }
                        ]
                    },
                    {
                        id: 'other-and-shared-functions',
                        title: 'Other and Shared Functions',
                        children: [
                            {
                                id: 'view-assessments',
                                title: 'View Assessments',
                                description: 'Owns the candidate assessment list and assessment-level action entry points.',
                                accessPath: 'Candidates > View Candidates > Actions > View Assessment',
                                steps: [
                                    'Open Candidates.',
                                    'Open View Candidates.',
                                    'Select a candidate.',
                                    'Open Actions.',
                                    'Select View Assessment.'
                                ],
                                rules: [
                                    'Admin users select a Distributor Account before selecting a candidate.',
                                    'Account users select a candidate directly.',
                                    'Each single assessment is rendered as a standalone row.',
                                    'Test batteries are represented by listing their associated single assessments, each labeled with a corresponding tag.',
                                    'Scheduled means scheduled only.',
                                    'Started means started to take but has not completed yet.',
                                    'Report Pending means completed but no report yet.',
                                    'Scored means completed and report is generated.'
                                ],
                                groups: [
                                    { title: 'Available actions', items: [{ label: 'Update Assessment', href: '#update-assessment' }, { label: 'Download/View Reports of Assessments', href: '#downloadview-reports-of-assessments' }, { label: 'Email Report of Assessments', href: '#email-report-of-assessments' }, { label: 'Other Assessment Functions', href: '#other-assessment-functions' }] }
                                ],
                                children: [
                                    {
                                        id: 'update-assessment',
                                        title: 'Update Assessment',
                                        description: 'Owns adding additional assessments to a candidate from the candidate assessment list.',
                                        steps: ['Open View Assessments.', 'Select Add Assessment.', 'Select assessment checkboxes or radio buttons with their norms, types, and related options.', 'Save changes.'],
                                        groups: [
                                            { title: 'Required inputs', items: ['At least one selected assessment.'] },
                                            { title: 'Optional inputs', items: ['Assessment norms.', 'Assessment types.', 'Related assessment options.'] }
                                        ],
                                        rules: [
                                            'Inputs are optional when they are not indicated as required.',
                                            'Inputs indicated as required must be completed.',
                                            'When a single assessment is selected, all test batteries containing that assessment are locked.',
                                            'When a test battery is selected, all single assessments included in that battery are locked.',
                                            'When a test battery is selected, all other test batteries that share at least one common single assessment are also locked.'
                                        ],
                                        systems: ['Scheduling a new assessment checks what scheduling type was used for the candidate.', 'Data Encoding scheduling opens the option to encode answers.']
                                    },
                                    {
                                        id: 'downloadview-reports-of-assessments',
                                        title: 'Download/View Reports of Assessments',
                                        description: 'Owns report viewing and downloading from a candidate assessment row.',
                                        steps: ['Open View Assessments.', 'Select an assessment from the table.', 'Select the Eye/View icon from the Actions column.', 'Select Download or View from the dropdown.', 'Select a report type when another dropdown layer appears.'],
                                        rules: ['If the Eye/View icon is grayed out, the assessment is not completed and the report is not available.', 'For a single report type, the report is shown or downloaded immediately.']
                                    },
                                    {
                                        id: 'email-report-of-assessments',
                                        title: 'Email Report of Assessments',
                                        description: 'Owns sending a candidate assessment report by email.',
                                        steps: ['Open View Assessments.', 'Select an assessment from the table.', 'Select the Mail icon from the Actions column.', 'Enter the target recipient email in the modal form.', 'Select Send.'],
                                        groups: [{ title: 'Required inputs', items: ['Email'] }],
                                        rules: ['Inputs are optional when they are not indicated as required.', 'Inputs indicated as required must be completed.']
                                    },
                                    {
                                        id: 'other-assessment-functions',
                                        title: 'Other Assessment Functions',
                                        description: 'Other candidate assessment functions available from the assessment row actions.',
                                        groups: [{ title: 'Available actions', items: [{ label: 'View Response', href: '#view-response' }, { label: 'Encode Answer', href: '#encode-answer' }, { label: 'Change Norm', href: '#change-norm' }, { label: 'Update Report Type', href: '#update-report-type' }, { label: 'Update IRT Type', href: '#update-irt-type' }, { label: 'Extract Response', href: '#extract-response' }, { label: 'Reset Assessment', href: '#reset-assessment' }, { label: 'Reset by Page', href: '#reset-by-page' }, { label: 'Remove Assessment', href: '#remove-assessment' }] }],
                                        children: [
                                            {
                                                id: 'view-response',
                                                title: 'View Response',
                                                description: 'Views the candidate assessment responses.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > View Response',
                                                steps: ['View candidates answers in the specific assessment selected to view.']
                                            },
                                            {
                                                id: 'encode-answer',
                                                title: 'Encode Answer',
                                                description: 'Inputs candidate answers through Excel for data encoding schedules.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > Encode Answer',
                                                steps: ['Download Template or prepare the answered template.', 'Upload it.', 'Save.'],
                                                rules: ['Allowed users only: Super Admin IT and ASD.', 'Verification is still needed for allowed users.', 'Assessment is not video interview.', 'Schedule Type is Data Encoding.']
                                            },
                                            {
                                                id: 'change-norm',
                                                title: 'Change Norm',
                                                description: 'Updates the norm used to create the assessment report.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > Change Norm > Update Norm Page > Save',
                                                steps: ['Select on dropdown New Norm/Benchmark if there is available ones.', 'Save changes.'],
                                                groups: [{ title: 'Required inputs', items: ['New Norm'] }]
                                            },
                                            { id: 'update-report-type', title: 'Update Report Type' },
                                            { id: 'update-irt-type', title: 'Update IRT Type' },
                                            {
                                                id: 'extract-response',
                                                title: 'Extract Response',
                                                description: 'Downloads the candidate responses.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > Extract Response',
                                                steps: ['After navigating to it, the browser downloads file for it.']
                                            },
                                            {
                                                id: 'reset-assessment',
                                                title: 'Reset Assessment',
                                                description: 'Resets the entire assessment for the candidate, including responses, scores, and related report artifacts.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > Reset Assessment',
                                                steps: ['After navigating to it, wait until reload for confirmation.']
                                            },
                                            {
                                                id: 'reset-by-page',
                                                title: 'Reset by Page',
                                                description: 'Resets answers or scores for one or more pages of the assessment.',
                                                accessPath: 'Candidates > View Candidate > Select A Candidate > Eye/View icon > Actions > View Assessment > Cog/Settings icon > Reset by Page',
                                                steps: ['After navigating to it.', 'Select page for them to reset.', 'Save.']
                                            },
                                            { id: 'remove-assessment', title: 'Remove Assessment' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    global.__candidateContent = candidateContent;
})(window);

