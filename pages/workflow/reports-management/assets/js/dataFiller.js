(function (global) {
    'use strict';

    const reportsContent = {
        title: 'Reports Management',
        sections: [
            {
                id: 'search-usage',
                title: 'Search Usage',
                description: 'Search and review assessment usage records, including candidate, company, assessment, schedule date, scheduler, and assessment status.',
                rules: [
                    'Group Assessment/Test Battery: Display the Test Battery name above the sub-assessment name.',
                    'Single Assessment: Display the assessment name directly.'
                ],
                children: [
                    {
                        id: 'exporting-reports',
                        title: 'Exporting Reports',
                        description: 'Download available assessment reports for selected candidates and assessments.',
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

    function renderSectionBody(section, target) {
        if (section.rules && section.rules.length) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';

            const rulesHeading = document.createElement('h3');
            rulesHeading.className = 'font-semibold text-amber-900 mb-3';
            rulesHeading.textContent = 'Rules';

            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(section.rules));
            target.appendChild(rulesWrap);
        }

        if (section.steps && section.steps.length) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
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

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';
        reportsContent.sections.forEach(function (section) {
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
        li.dataset.target = section.id;
        li.dataset.level = String(level);

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
        reportsContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var links = Array.from(sidebar.querySelectorAll('a[data-target]'));
        var childLists = Array.from(sidebar.querySelectorAll('.sidebar-children'));

        links.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });
        childLists.forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('active', 'text-brand', 'font-semibold');

        var activeItem = activeLink.closest('.sidebar-item');
        while (activeItem) {
            var ownChildren = activeItem.querySelector(':scope > .sidebar-children');
            if (ownChildren) ownChildren.classList.remove('hidden');

            var parentList = activeItem.parentElement;
            if (parentList && parentList.classList.contains('sidebar-children')) {
                parentList.classList.remove('hidden');
                activeItem = parentList.closest('.sidebar-item');
            } else {
                activeItem = null;
            }
        }
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var targetIds = Array.from(sidebar.querySelectorAll('a[data-target]'))
            .map(function (link) { return link.dataset.target; })
            .filter(Boolean);

        var currentId = null;
        var offset = 120;

        targetIds.forEach(function (id) {
            var target = document.getElementById(id);
            if (!target) return;
            if (target.getBoundingClientRect().top <= offset) {
                currentId = id;
            }
        });

        return currentId || targetIds[0] || null;
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
        window.addEventListener('hashchange', function () {
            setTimeout(updateFromScroll, 50);
        });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderAll() {
        renderSidebar();
        renderAllSections();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__reportsContent = reportsContent;
})(window);



