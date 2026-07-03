(function () {
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

    function renderSectionBody(section, target) {
        if (section.bullets && section.bullets.length) target.appendChild(createBulletList(section.bullets));
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
        pageContent.sections.forEach(function (section) {
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
        pageContent.sections.forEach(function (section) {
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
})();
