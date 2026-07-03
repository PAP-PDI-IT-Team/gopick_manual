// manual guides data filler - rendered from docs/guides/manual-documentation-standard.md
(function (global) {
    'use strict';

    const guideContent = {
        title: 'Manual Guides',
        sections: [
            {
                id: 'documentation-standard',
                title: 'Documentation Standard V2',
                description: 'Updated documentation standard aligned to actual website behavior, layered documentation ownership, and confirmed operational flow.',
                children: [
                    {
                        id: 'core-documentation-principle',
                        title: 'Core Documentation Principle',
                        bullets: [
                            'Manual pages must follow actual website behavior and navigation flow.',
                            'Do not invent workflows, access paths, UI placement, or hidden behavior.',
                            'Document only behavior confirmed by UI, navigation, and observed operation.'
                        ]
                    },
                    {
                        id: 'v2-documentation-layers',
                        title: 'V2 Documentation Layers',
                        groups: [
                            {
                                title: 'Workflow Manual Layer',
                                items: [
                                    'Purpose: document user navigation and operation flow.',
                                    'Audience: QA, Support, Operations, Non-technical users, Developers needing workflow reference.',
                                    'Structure: Module -> Page -> Row Action -> Nested Action -> Result.',
                                    'Source path: docs/workflow/<module>.md'
                                ]
                            },
                            {
                                title: 'Domain Governance Layer',
                                items: [
                                    'Purpose: document confirmed operational/system behavior.',
                                    'Audience: Developers, Architects, QA Leads, System Analysts.',
                                    'Includes: hierarchy, authority, visibility, balance, audit, and constraints.',
                                    'Excludes: UI traversal and user click-path workflows.',
                                    'Source path: docs/domain-governance/<domain>.md'
                                ]
                            },
                            {
                                title: 'Gap Registry Layer',
                                items: [
                                    'Purpose: track unresolved behavior and discovered inconsistencies.',
                                    'Audience: Developers, QA, Product Owners, Architects.',
                                    'Includes: undefined behavior, ambiguities, unresolved validations, pending clarifications.',
                                    'Source path: docs/known-gaps/<domain>-gap-registry.md'
                                ]
                            }
                        ]
                    },
                    {
                        id: 'workflow-manual-structure',
                        title: 'Workflow Manual Structure',
                        description: 'Workflow pages should mirror actual page traversal and action entry points.',
                        codeBlocks: [
                            {
                                label: 'Workflow structure template',
                                language: 'md',
                                code: [
                                    '# Module Name',
                                    '',
                                    '## Main Page / Feature',
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
                        id: 'access-and-layering-rules',
                        title: 'Access Path and Layering Rules',
                        bullets: [
                            'Document actual menu, page, row-action, modal, and nested-entry access paths.',
                            'If multiple valid entry points exist, list all confirmed paths.',
                            'Do not flatten unrelated workflows into abstract capability groups.',
                            'Workflow hierarchy must mirror real UI structure and traversal.'
                        ]
                    },
                    {
                        id: 'separation-and-confirmation-rules',
                        title: 'Separation and Confirmation Rules',
                        bullets: [
                            'Workflow docs answer: how users navigate and use the website.',
                            'Domain governance docs answer: how system behavior operates.',
                            'Gap registry answers: what is unresolved or inconsistent.',
                            'Avoid inferred behavior not directly confirmed from real usage.'
                        ]
                    },
                    {
                        id: 'operational-benefits',
                        title: 'Operational Benefits',
                        bullets: [
                            'Improves onboarding, QA verification, and workflow traceability.',
                            'Improves support debugging and navigation clarity.',
                            'Improves manual maintainability and reduces hallucinated workflows.',
                            'Enforces clean separation of UI documentation from domain analysis.'
                        ]
                    }
                ]
            },
            {
                id: 'page-structure-v3',
                title: 'Page Structure v3',
                description: 'Canonical workflow page structure with one required core and optional sections only when the content requires them.',
                bullets: [
                    'Website counterpart: pages/guides/page-structure-v3/index.html'
                ],
                groups: [
                    {
                        title: 'Required Core',
                        items: [
                            'Module Name',
                            'Short description of the module or page.',
                            'Main Feature / Page',
                            'Action / Workflow',
                            'Access Path',
                            'How To Use',
                            'Rules',
                            'Expected Result'
                        ]
                    },
                    {
                        title: 'Optional Sections',
                        items: [
                            'Legends',
                            'Related Pages',
                            'Nested Feature',
                            'Notes',
                            'Access to Other Pages'
                        ]
                    },
                    {
                        title: 'Structure Rules',
                        items: [
                            'Use one canonical layout for all pages.',
                            'Keep the core structure in the same order every time.',
                            'Do not create alternate formats for similar content.',
                            'Add optional sections only when the page content requires them.',
                            'Do not omit the core sections.'
                        ]
                    }
                ],
                codeBlocks: [
                    {
                        label: 'Canonical structure template',
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
            }
        ]
    };

    function createBulletList(items) {
        const list = document.createElement('ul');
        list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
        items.forEach(function (item) {
            const li = document.createElement('li');
            li.className = 'flex gap-2';
            const marker = document.createElement('span');
            marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
            const text = document.createElement('span');
            text.textContent = item;
            li.appendChild(marker);
            li.appendChild(text);
            list.appendChild(li);
        });
        return list;
    }

    function createCodeBlock(block) {
        const wrap = document.createElement('div');
        wrap.className = 'mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 code-block';
        const label = document.createElement('div');
        label.className = 'border-b border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-300';
        label.textContent = block.label || block.language || 'Example';
        const pre = document.createElement('pre');
        pre.className = 'overflow-x-auto p-4 text-xs leading-relaxed text-slate-100';
        const code = document.createElement('code');
        code.textContent = block.code || '';
        pre.appendChild(code);
        wrap.appendChild(label);
        wrap.appendChild(pre);
        return wrap;
    }

    function renderGroups(container, groups) {
        groups.forEach(function (group) {
            const wrap = document.createElement('div');
            wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = group.title;
            wrap.appendChild(heading);
            wrap.appendChild(createBulletList(group.items || []));
            container.appendChild(wrap);
        });
    }

    function renderSectionBody(section, target) {
        if (section.bullets && section.bullets.length) target.appendChild(createBulletList(section.bullets));
        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }
        if (section.codeBlocks && section.codeBlocks.length) {
            section.codeBlocks.forEach(function (block) {
                target.appendChild(createCodeBlock(block));
            });
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        if (eyebrowText) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = eyebrowText;
            fragment.appendChild(eyebrow);
        }
        const heading = document.createElement(headingLevel === 2 ? 'h2' : 'h3');
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : 'text-lg font-bold text-slate-900';
        heading.textContent = section.title;
        heading.setAttribute('tabindex', '-1');
        fragment.appendChild(heading);
        if (section.description) {
            const desc = document.createElement('p');
            desc.className = 'text-sm text-slate-500 mt-2 mb-5';
            desc.textContent = section.description;
            fragment.appendChild(desc);
        }
        return fragment;
    }

    function renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
        const sectionEl = document.createElement('section');
        sectionEl.className = isTopLevel ? 'mb-10' : 'mt-8 border-t border-slate-100 pt-6';
        sectionEl.appendChild(renderSectionHeader(section, headingLevel, eyebrowText));
        renderSectionBody(section, sectionEl);
        if (section.children && section.children.length) {
            section.children.forEach(function (child) {
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 3), section.title, false));
            });
        }
        return sectionEl;
    }

    function renderSidebar() {
        const list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        guideContent.sections.forEach(function (section) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'block text-slate-600 hover:text-brand transition-colors py-1 text-sm';
            a.href = '#' + section.id;
            a.textContent = section.title;
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    function renderContent() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        guideContent.sections.forEach(function (section) {
            root.appendChild(renderSectionTree(section, 2, null, true));
        });
    }

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initPage() {
        setFooterYear();
        renderSidebar();
        renderContent();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPage);
    } else {
        initPage();
    }

    global.__guideContent = guideContent;
})(window);
