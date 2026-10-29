(function (global) {
    'use strict';

    const pageContent = {
        sections: [
            {
                id: 'canonical-structure',
                title: 'Canonical Structure',
                description: 'All workflow pages must follow one canonical structure. The core structure is required on every page. Optional sections may be added only when the content explicitly needs them.',
                children: [
                    {
                        id: 'required-core',
                        title: 'Required Core',
                        codeBlocks: [
                            {
                                label: 'Required core template',
                                language: 'md',
                                code: [
                                    '# Module Name',
                                    '',
                                    'Short description of the module or page.',
                                    '',
                                    '## Main Feature / Page',
                                    '',
                                    'Brief description of the feature or page.',
                                    '',
                                    '### Action / Workflow',
                                    '',
                                    '### Access Path',
                                    '- Actual page navigation path',
                                    '',
                                    '### How To Use',
                                    '1. Actual UI action.',
                                    '2. Actual UI action.',
                                    '',
                                    '> Rules:',
                                    '> - Confirmed validation or restriction.',
                                    '',
                                    '> Expected Result:',
                                    '> - Confirmed visible outcome.'
                                ].join('\n')
                            }
                        ]
                    },
                    {
                        id: 'optional-sections',
                        title: 'Optional Sections',
                        bullets: [
                            'Legends',
                            'Related Pages',
                            'Nested Feature',
                            'Notes',
                            'Access to Other Pages'
                        ]
                    },
                    {
                        id: 'structure-rules',
                        title: 'Structure Rules',
                        bullets: [
                            'Use one canonical layout for all pages.',
                            'Keep the core structure in the same order every time.',
                            'Do not create alternate formats for similar content.',
                            'Add optional sections only when the page content requires them.',
                            'Do not omit the core sections.'
                        ]
                    }
                ]
            }
        ]
    };

    global.__pageStructureContent = pageContent;
})(window);
