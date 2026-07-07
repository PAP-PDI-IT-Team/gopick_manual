// resource center data filler - content derived from docs/workflow/resource-center.md
(function (global) {
    'use strict';

    const resourceCenterContent = {
        title: 'Resource Center',
        sections: [
            {
                id: 'get-started',
                title: 'Get Started',
                description: 'Entry area that points users to key Resource Center content.',
                children: [
                    {
                        id: 'manuals',
                        title: 'Manuals',
                        description: 'Open manuals and guides for the selected assessment or topic.',
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

    function createStepCard(index, text) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-600 leading-relaxed';
        detail.textContent = text;

        wrap.appendChild(badge);
        wrap.appendChild(detail);
        return wrap;
    }

    function createCallout(title, items, kind) {
        const wrap = document.createElement('div');
        wrap.className = kind === 'status'
            ? 'mt-5 rounded-lg border border-slate-100 bg-slate-50 p-5'
            : 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';

        const heading = document.createElement('h3');
        heading.className = kind === 'status' ? 'font-semibold text-slate-900 mb-3' : 'font-semibold text-amber-900 mb-3';
        heading.textContent = title;

        wrap.appendChild(heading);
        wrap.appendChild(createBulletList(items));
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
        if (section.groups && section.groups.length) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsTitle = document.createElement('h4');
            stepsTitle.className = 'mt-5 mb-3 font-semibold text-slate-900';
            stepsTitle.textContent = 'How To Use';
            target.appendChild(stepsTitle);

            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules && section.rules.length) {
            target.appendChild(createCallout('Rules', section.rules, 'rules'));
        }

        if (section.expectedResults && section.expectedResults.length) {
            target.appendChild(createCallout('Expected Result', section.expectedResults, 'expected'));
        }

        if (section.status) {
            target.appendChild(createCallout('Status', [section.status], 'status'));
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

        const headingTag = headingLevel === 2 ? 'h2' : (headingLevel === 3 ? 'h3' : 'h4');
        const heading = document.createElement(headingTag);
        heading.id = section.id;
        heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : (headingLevel === 3 ? 'text-lg font-bold text-slate-900' : 'text-base font-bold text-slate-900');
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
                sectionEl.appendChild(renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
            });
        }

        return sectionEl;
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        resourceCenterContent.sections.forEach(function (section) {
            root.appendChild(renderSectionTree(section, 2, null, true));
        });
    }

    function getSidebarLinkClass(level) {
        var depth = Math.min(level, 5);
        var indentClasses = ['', ' pl-3 border-l border-slate-100', ' pl-6 border-l border-slate-100', ' pl-9 border-l border-slate-100', ' pl-12 border-l border-slate-100', ' pl-16 border-l border-slate-100'];
        var sizeClass = level === 0 ? ' text-sm' : (level < 3 ? ' text-[13px]' : ' text-xs');
        return 'block text-slate-600 hover:text-brand transition-colors py-1' + sizeClass + indentClasses[depth];
    }

    function createSidebarItem(section, level) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';

        var a = document.createElement('a');
        a.className = getSidebarLinkClass(level);
        a.href = '#' + section.id;
        a.dataset.target = section.id;
        a.textContent = section.title;
        li.appendChild(a);

        if (section.children && section.children.length) {
            var childList = document.createElement('ul');
            childList.className = 'sidebar-children hidden mt-1 space-y-1';
            section.children.forEach(function (child) {
                childList.appendChild(createSidebarItem(child, level + 1));
            });
            li.appendChild(childList);
        }

        return li;
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        resourceCenterContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('active', 'text-brand', 'font-semibold');

        var item = activeLink.closest('.sidebar-item');
        while (item) {
            var ownChildren = item.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');

            var parentList = item.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                item = parentList.closest('.sidebar-item');
            } else {
                item = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var links = Array.from(document.querySelectorAll('#docSidebarList a[data-target]'));
        var currentId = null;
        var offset = 120;

        links.forEach(function (link) {
            var target = document.getElementById(link.dataset.target);
            if (target && target.getBoundingClientRect().top <= offset) {
                currentId = link.dataset.target;
            }
        });

        return currentId || (links[0] && links[0].dataset.target);
    }

    function setupSidebarVisibility() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget() || (location.hash || '').replace('#', '');
            if (activeId) setSidebarBranch(activeId);
        }

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            link.addEventListener('click', function () {
                setSidebarBranch(this.dataset.target);
            });
        });

        updateFromScroll();
        window.addEventListener('hashchange', function () { setTimeout(updateFromScroll, 50); });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function renderAll() {
        setFooterYear();
        renderSidebar();
        renderAllSections();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__resourceCenterContent = resourceCenterContent;
})(window);
