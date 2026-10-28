(function (global) {
    'use strict';

    const testNormsContent = {
        title: 'Test Norms',
        description: 'Norms are used to evaluate test results, provide narratives, and rank test results.',
        sections: [
            {
                id: 'search-test-norm',
                title: 'Search Test Norm',
                children: [
                    { id: 'search', title: 'Search' },
                    { id: 'select-company-filter', title: 'Select Company Filter' },
                    { id: 'view-archived-norms', title: 'View Archived Norms' },
                    {
                        id: 'row-functions',
                        title: 'Row Functions',
                        children: [
                            { id: 'view-norm', title: 'View Norm' },
                            { id: 'edit-norm', title: 'Edit Norm' },
                            { id: 'download-norm', title: 'Download Norm' },
                            { id: 'archive-norm', title: 'Archive Norm' }
                        ]
                    }
                ]
            },
            {
                id: 'upload-test-norm',
                title: 'Upload Test Norms',
                description: 'Uploads test norms to existing norms.',
                accessPaths: ['Test Norms', 'Upload Test Norms'],
                images: [
                    {
                        title: 'Upload Test Norms',
                        caption: 'Required data and file upload for test norms.',
                        src: '',
                        alt: 'Upload Test Norms Screenshot'
                    }
                ],
                requiredInputs: [
                    'Norm name',
                    'Account name related to the assessment',
                    'Assessment name',
                    'File upload based on the required format'
                ],
                steps: [
                    'Enter the required data and upload the file in the required format.',
                    'Select Next.'
                ]
            }
        ]
    };

    global.__testNormsContent = testNormsContent;
})(window);
