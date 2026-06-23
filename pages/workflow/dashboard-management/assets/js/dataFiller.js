// dashboard data filler
(function (global) {
    'use strict';

    const dashboardContent = {
        title: 'Dashboard Management',
        sections: [
            { id: 'dashboard-summary', title: 'Dashboard Summary' },
            { id: 'dashboard-metrics', title: 'Dashboard Metrics' }
        ],
        metrics: [
            {
                label: 'Meter Request',
                detail: 'Total number of requests of meters',
                icon: 'meter'
            },
            {
                label: 'Active Account',
                detail: 'Total of Active Accounts',
                icon: 'users'
            },
            {
                label: 'Expiring Accounts (in 1 month)',
                detail: 'Total of expiring accounts combine expiry date and account expiration extension that has less than a month before expiration',
                icon: 'calendar'
            },
            {
                label: 'Inactive Account',
                detail: 'Total of Archived, Deactivated and Expired accounts',
                icon: 'user-x'
            }
        ]
    };

    const ICON_SVG_MAP = {
        meter: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8 14.5a6 6 0 0 1 10.4 0M12 12l3-3M8 17h8"/></svg>',
        users: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        calendar: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        'user-x': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12l-6 6m0-6l6 6"/></svg>'
    };

    function createMetricCard(metric) {
        const wrap = document.createElement('div');
        wrap.className = 'p-5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md';

        const iconBox = document.createElement('div');
        iconBox.className = 'w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0';
        iconBox.innerHTML = ICON_SVG_MAP[metric.icon] || '';

        const content = document.createElement('div');
        const title = document.createElement('h3');
        title.className = 'text-sm font-bold text-slate-900 mb-1';
        title.textContent = metric.label;

        const detail = document.createElement('p');
        detail.className = 'text-xs text-slate-500 leading-relaxed';
        detail.textContent = metric.detail;

        content.appendChild(title);
        content.appendChild(detail);
        wrap.appendChild(iconBox);
        wrap.appendChild(content);
        return wrap;
    }

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
        const list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        dashboardContent.sections.forEach(function (section) {
            list.appendChild(createSidebarItem(section));
        });
    }

    function renderMetrics() {
        const container = document.getElementById('dashboardMetrics');
        if (!container) return;
        container.innerHTML = '';
        dashboardContent.metrics.forEach(function (metric) {
            container.appendChild(createMetricCard(metric));
        });
    }

    function setSidebarBranch(activeId) {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return;

        var links = Array.from(sidebar.querySelectorAll('a[data-target]'));
        links.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
            if (link.dataset.target === activeId) {
                link.classList.add('active', 'text-brand', 'font-semibold');
            }
        });
    }

    function getVisibleSidebarTarget() {
        var sidebar = document.getElementById('docSidebarList');
        if (!sidebar) return null;

        var targetIds = Array.from(sidebar.querySelectorAll('a[data-target]'))
            .map(function (link) { return link.dataset.target; });

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

        window.addEventListener('scroll', updateFromScroll, { passive: true });
        updateFromScroll();
    }

    function renderAll() {
        renderSidebar();
        renderMetrics();
        setupSidebarVisibility();
        const yearNode = document.getElementById('footerYearSpan');
        if (yearNode) yearNode.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderAll);
    } else {
        renderAll();
    }

    global.__dashboardContent = dashboardContent;
})(window);
