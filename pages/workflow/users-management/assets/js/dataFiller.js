(function (global) {
    'use strict';

    const usersContent = {
        title: 'Users Management',
        sections: [
            {
                id: 'search-user-accounts',
                title: 'Search User Accounts',
                description: 'Search and review user records, including username, email, status, and user type.',
                groups: [
                    {
                        title: 'Table Functions',
                        items: [
                            'Sort applies to all columns except Actions.',
                            'Filter is available for Status and User Type.',
                            'Search is available from the table view.'
                        ]
                    },
                    {
                        title: 'Provides Access',
                        items: ['View Archived Users']
                    }
                ],
                children: [
                    {
                        id: 'row-functions-active-users',
                        title: 'Row Functions',
                        description: 'Functions available from each active user row.',
                        children: [
                            {
                                id: 'view-active-user',
                                title: 'View',
                                description: 'View specific user information, including email, status, user type, and date created.'
                            },
                            {
                                id: 'update-active-user',
                                title: 'Update',
                                description: 'Update user information such as username, password, email, and status.',
                                groups: [
                                    {
                                        title: 'Editable Fields',
                                        items: [
                                            'Username',
                                            'Password',
                                            'Show Content',
                                            'Email',
                                            'Status'
                                        ],
                                        rules: [
                                            'Password must have 8 characters.',
                                            'Password must contain 1 lower cased letter.',
                                            'Password must contain 1 upper cased letter.',
                                            'Password must contain 1 number.'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'activate-ac-api-access-active',
                                title: 'Activate AC-API Access',
                                description: 'Currently not working and not yet documented.',
                                warning: [
                                    'Currently not working.',
                                    'Not yet documented.'
                                ]
                            },
                            {
                                id: 'archive-active-user',
                                title: 'Archive',
                                description: 'Archive the selected user.'
                            },
                            {
                                id: 'delete-active-user',
                                title: 'Delete',
                                description: 'Delete the selected user.'
                            }
                        ]
                    },
                    {
                        id: 'bulk-actions-active-users',
                        title: 'Bulk Actions',
                        description: 'Actions available for selected active users.',
                        children: [
                            {
                                id: 'export-active-users',
                                title: 'Export',
                                description: 'Download selected masked user information.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select the checkboxes of the users to export.',
                                    'In the Bulk Action dropdown, select Export.'
                                ]
                            },
                            {
                                id: 'archive-active-users',
                                title: 'Archive',
                                description: 'Archive selected users.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select the checkboxes of the users to archive.',
                                    'In the Bulk Action dropdown, select Archive.'
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'view-archive-users',
                title: 'View Archive Users',
                description: 'Search and review archived user records, including username, email, status, and user type.',
                groups: [
                    {
                        title: 'Table Functions',
                        items: [
                            'Sort applies to all columns except Actions.',
                            'Filter is available for Status and User Type.',
                            'Search is available from the table view.'
                        ]
                    }
                ],
                children: [
                    {
                        id: 'row-functions-archived-users',
                        title: 'Row Functions',
                        description: 'Functions available from each archived user row.',
                        children: [
                            {
                                id: 'view-archived-user',
                                title: 'View',
                                description: 'View specific archived user information, including email, parent status, user type, and date created.'
                            },
                            {
                                id: 'update-archived-user',
                                title: 'Update',
                                description: 'Update archived user information such as username, password, email, and status.',
                                groups: [
                                    {
                                        title: 'Editable Fields',
                                        items: [
                                            'Username',
                                            'Password',
                                            'Show Content',
                                            'Email',
                                            'Status'
                                        ],
                                        rules: [
                                            'Password must have 8 characters.',
                                            'Password must contain 1 lower cased letter.',
                                            'Password must contain 1 upper cased letter.',
                                            'Password must contain 1 number.',
                                            'Some account types have no parent: Administrator (ASD), Super Admin (IT), API Access, and Test Creator.'
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 'activate-ac-api-access-archived',
                                title: 'Activate AC-API Access',
                                description: 'Currently not working and not yet documented.',
                                warning: [
                                    'Currently not working.',
                                    'Not yet documented.'
                                ]
                            },
                            {
                                id: 'archive-archived-user',
                                title: 'Archive',
                                description: 'Archive the selected archived user.'
                            },
                            {
                                id: 'delete-archived-user',
                                title: 'Delete',
                                description: 'Delete the selected archived user.'
                            }
                        ]
                    },
                    {
                        id: 'bulk-actions-archived-users',
                        title: 'Bulk Actions',
                        description: 'Actions available for selected archived users.',
                        children: [
                            {
                                id: 'export-archived-users',
                                title: 'Export',
                                description: 'Download selected masked archived user information.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select View Active Users.',
                                    'Select the checkboxes of the archived users to export.',
                                    'In the Bulk Action dropdown, select Export.'
                                ]
                            },
                            {
                                id: 'retrieve-archived-users',
                                title: 'Retrieve',
                                description: 'Retrieve selected archived users.',
                                steps: [
                                    'Select Users, then Search User Accounts.',
                                    'Select View Active Users.',
                                    'Select the checkboxes of the archived users to retrieve.',
                                    'In the Bulk Action dropdown, select Retrieve.'
                                ]
                            }
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

    function renderGroups(container, groups) {
        groups.forEach(function (group) {
            const wrap = document.createElement('div');
            wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';

            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = group.title;
            wrap.appendChild(heading);
            wrap.appendChild(createBulletList(group.items || []));

            if (group.rules && group.rules.length) {
                const rulesWrap = document.createElement('div');
                rulesWrap.className = 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
                const rulesHeading = document.createElement('h4');
                rulesHeading.className = 'font-semibold text-amber-900 mb-2';
                rulesHeading.textContent = 'Rules';
                rulesWrap.appendChild(rulesHeading);
                rulesWrap.appendChild(createBulletList(group.rules));
                wrap.appendChild(rulesWrap);
            }

            container.appendChild(wrap);
        });
    }

    function renderSectionBody(section, target) {
        if (section.groups) {
            const groupsWrap = document.createElement('div');
            groupsWrap.className = 'space-y-4';
            renderGroups(groupsWrap, section.groups);
            target.appendChild(groupsWrap);
        }

        if (section.steps) {
            const stepsWrap = document.createElement('div');
            stepsWrap.className = 'space-y-4';
            section.steps.forEach(function (step, i) {
                stepsWrap.appendChild(createStepCard(i + 1, step));
            });
            target.appendChild(stepsWrap);
        }

        if (section.rules) {
            const rulesWrap = document.createElement('div');
            rulesWrap.className = 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';
            const rulesHeading = document.createElement('h3');
            rulesHeading.className = 'font-semibold text-amber-900 mb-3';
            rulesHeading.textContent = 'Rules';
            rulesWrap.appendChild(rulesHeading);
            rulesWrap.appendChild(createBulletList(section.rules));
            target.appendChild(rulesWrap);
        }

        if (section.warning && section.warning.length) {
            const warningWrap = document.createElement('div');
            warningWrap.className = 'mt-5 rounded-lg border border-rose-200 bg-rose-50 p-5';

            const warningHeader = document.createElement('div');
            warningHeader.className = 'mb-3 flex items-center gap-2';

            const warningIcon = document.createElement('span');
            warningIcon.className = 'inline-flex h-5 w-5 items-center justify-center text-rose-700';
            warningIcon.setAttribute('aria-hidden', 'true');
            warningIcon.innerHTML = '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>';

            const warningHeading = document.createElement('h3');
            warningHeading.className = 'font-semibold text-rose-900';
            warningHeading.textContent = 'Warning';

            warningHeader.appendChild(warningIcon);
            warningHeader.appendChild(warningHeading);
            warningWrap.appendChild(warningHeader);
            warningWrap.appendChild(createBulletList(section.warning));
            target.appendChild(warningWrap);
        }
    }

    function renderSectionHeader(section, headingLevel, eyebrowText) {
        const fragment = document.createDocumentFragment();
        const label = eyebrowText || section.eyebrow;
        if (label) {
            const eyebrow = document.createElement('div');
            eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
            eyebrow.textContent = label;
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

        if (section.children) {
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

        usersContent.sections.forEach(function (section) {
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
        usersContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section, 0));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        Array.from(sidebar.querySelectorAll('a[data-target]')).forEach(function (link) {
            link.classList.remove('text-brand', 'font-semibold');
        });
        Array.from(sidebar.querySelectorAll('.sidebar-children')).forEach(function (list) {
            list.classList.add('hidden');
        });

        var activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
        if (!activeLink) return;
        activeLink.classList.add('text-brand', 'font-semibold');

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
            var activeId = getVisibleSidebarTarget();
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

    global.__usersContent = usersContent;
})(window);




