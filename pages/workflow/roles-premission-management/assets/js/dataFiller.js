(function (global) {
    'use strict';

    var rolesPermissionContent = {
        sections: [
            { id: 'legend', title: 'Legend' },
            { id: 'rbac-matrix', title: 'RBAC Matrix' },
            { id: 'hierarchy', title: 'Account Hierarchy' },
            { id: 'roles', title: 'Role Capabilities' }
        ],
        hierarchyLines: [
            'Super Admin (IT)',
            'Super Admin (ASD)',
            '└─ Distributor',
            '   ├─ Administrator',
            '   ├─ Self Registration',
            '   └─ Sub Distributor',
            '      ├─ Administrator',
            '      ├─ Self Registration',
            '      └─ Client',
            '         ├─ Administrator',
            '         └─ Sub Client',
            '            ├─ Administrator',
            '            └─ Self Registration'
        ],
        legends: [
            { sym: 'X', label: 'Hard-coded available', cls: 'rbac-x' },
            { sym: 'C', label: 'Conditional controlled by Super Admin', cls: 'rbac-c' },
            { sym: 'N', label: 'Not applicable', cls: 'rbac-n' },
            { sym: '-', label: 'Hard-coded not available', cls: 'rbac-dash' }
        ]
    };

    function createSidebarItem(section) {
        var li = document.createElement('li');
        li.className = 'sidebar-item';

        var a = document.createElement('a');
        a.className = 'block text-slate-600 hover:text-brand transition-colors py-1';
        a.href = '#' + section.id;
        a.dataset.target = section.id;
        a.textContent = section.title;
        li.appendChild(a);

        return li;
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        rolesPermissionContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section));
        });
    }

    function renderHierarchy() {
        var container = document.getElementById('hierarchyContent');
        if (!container) return;
        container.innerHTML = '';
        var pre = document.createElement('pre');
        pre.className = 'whitespace-pre-wrap';
        pre.textContent = rolesPermissionContent.hierarchyLines.join('\n');
        container.appendChild(pre);
    }

    function renderLegend() {
        var container = document.getElementById('legendContent');
        if (!container) return;
        container.innerHTML = '';
        rolesPermissionContent.legends.forEach(function (item) {
            var wrapper = document.createElement('div');
            wrapper.className = 'flex items-center gap-2';

            var symbol = document.createElement('span');
            symbol.className = item.cls + ' text-base';
            symbol.textContent = item.sym;

            var label = document.createElement('span');
            label.className = 'text-slate-600';
            label.textContent = item.label;

            wrapper.appendChild(symbol);
            wrapper.appendChild(label);
            container.appendChild(wrapper);
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        sidebar.querySelectorAll('a[data-target]').forEach(function (link) {
            var isActive = link.dataset.target === activeId;
            link.classList.toggle('active', isActive);
            link.classList.toggle('text-brand', isActive);
            link.classList.toggle('font-semibold', isActive);
        });
    }

    function getVisibleSidebarTarget() {
        var links = Array.from(document.querySelectorAll('#docSidebarList a[data-target]'));
        var currentId = null;
        var offset = 120;

        links.forEach(function (link) {
            var target = document.getElementById(link.dataset.target);
            if (!target) return;
            if (target.getBoundingClientRect().top <= offset) currentId = link.dataset.target;
        });

        return currentId || (links[0] && links[0].dataset.target);
    }

    function setupSidebarVisibility() {
        function updateFromScroll() {
            var activeId = getVisibleSidebarTarget() || (location.hash || '').replace('#', '');
            if (activeId) setSidebarBranch(activeId);
        }

        updateFromScroll();
        window.addEventListener('hashchange', function () {
            setTimeout(updateFromScroll, 50);
        });
        window.addEventListener('scroll', updateFromScroll, { passive: true });
    }

    function renderAll() {
        renderSidebar();
        renderLegend();
        renderHierarchy();
        setupSidebarVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__rolesPermissionContent = rolesPermissionContent;
})(window);
