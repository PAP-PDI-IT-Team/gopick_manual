// dashboard data filler
(function (global) {
    'use strict';

    const dashboardContent = {
        title: 'Dashboard Management',
        sections: [
            { id: 'account-monitoring', title: 'Account Monitoring Section' },
            { id: 'quick-navigations', title: 'Quick Navigations' }
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
        ],
        quickLinks: [
            {
                title: 'Quick Links',
                items: [
                    { title: 'Create Account', subTitle: 'Navigation Link', icon: 'plus-user' },
                    { title: 'View Account', subTitle: 'Navigation Link', icon: 'view-account' },
                    { title: 'Meter Records', subTitle: 'Navigation Link', icon: 'meter-records' }
                ]
            },
            {
                title: 'Help Desk',
                items: [
                    { title: 'Order Meter', subTitle: 'Navigation Link', icon: 'order-meter' },
                    { title: 'Send Inquiry', subTitle: 'Navigation Link', icon: 'send-inquiry' }
                ]
            },
            {
                title: 'Announcement',
                items: [
                    'Latest 2 announcements and each can be clicked'
                ]
            },
            {
                title: 'Message Inbox',
                items: [
                    'Latest 2 message and each can be clicked',
                    'See All Messages: Navigation Link'
                ]
            }
        ],
        announcements: [],
        messages: []
    };

    const ICON_SVG_MAP = {
        meter: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8 14.5a6 6 0 0 1 10.4 0M12 12l3-3M8 17h8"/></svg>',
        users: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        calendar: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
        'user-x': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12l-6 6m0-6l6 6"/></svg>',
        'plus-user': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 8h6m-3-3v6M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2a7 7 0 0 0-7 7v1h14v-1a7 7 0 0 0-7-7z"/></svg>',
        'view-account': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h10"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 14l3 3 4-4"/></svg>',
        'meter-records': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 20V4h12v16H6z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 8h6M9 12h6M9 16h4"/></svg>',
        'order-meter': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h10l-1 11H8L7 7z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7a3 3 0 0 1 6 0"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11v4m-2-2h4"/></svg>',
        'send-inquiry': '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 5h16v10H7l-3 3V5z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 9h8M8 12h5"/></svg>'
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

    function renderQuickLinks() {
        const container = document.getElementById('dashboardQuickLinks');
        if (!container) return;
        container.innerHTML = '';
        dashboardContent.quickLinks.forEach(function (section) {
            const row = document.createElement('div');
            row.className = section.title === 'Message Inbox'
                ? 'text-sm text-slate-600'
                : 'rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600';

            const title = document.createElement('div');
            title.className = 'font-semibold text-slate-900 mb-3';
            title.textContent = section.title;
            row.appendChild(title);

            if (section.title === 'Quick Links' || section.title === 'Help Desk') {
                const cards = document.createElement('div');
                cards.className = section.title === 'Quick Links' ? 'grid gap-3 md:grid-cols-3' : 'grid gap-3 md:grid-cols-2';

                section.items.forEach(function (item) {
                    const card = document.createElement('div');
                    card.className = 'p-5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md';

                    const iconBox = document.createElement('div');
                    iconBox.className = 'w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0';
                    iconBox.innerHTML = ICON_SVG_MAP[item.icon] || '';

                    const textWrap = document.createElement('div');
                    textWrap.className = 'min-w-0';

                    const title = document.createElement('h3');
                    title.className = 'text-sm font-bold text-slate-900 leading-tight';
                    title.textContent = item.title;

                    const subTitle = document.createElement('p');
                    subTitle.className = 'mt-1 text-xs font-medium uppercase tracking-wide text-slate-500';
                    subTitle.textContent = item.subTitle;

                    card.appendChild(iconBox);
                    textWrap.appendChild(title);
                    textWrap.appendChild(subTitle);
                    card.appendChild(textWrap);
                    cards.appendChild(card);
                });

                row.appendChild(cards);
                container.appendChild(row);
                return;
            }

            if (section.title === 'Message Inbox') {
                const description = document.createElement('p');
                description.className = 'mb-3 text-sm text-slate-600';
                description.textContent = section.items[0];
                row.appendChild(description);

                const card = document.createElement('div');
                card.className = 'p-5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md';

                const iconBox = document.createElement('div');
                iconBox.className = 'w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0';
                iconBox.innerHTML = ICON_SVG_MAP['send-inquiry'] || '';

                const textWrap = document.createElement('div');
                textWrap.className = 'min-w-0';

                const title = document.createElement('h3');
                title.className = 'text-sm font-bold text-slate-900 leading-tight';
                title.textContent = section.items[1];

                card.appendChild(iconBox);
                textWrap.appendChild(title);
                card.appendChild(textWrap);
                row.appendChild(card);

                container.appendChild(row);
                return;
            }

            const list = document.createElement('ul');
            list.className = 'space-y-1';
            section.items.forEach(function (item) {
                const li = document.createElement('li');
                li.textContent = item;
                list.appendChild(li);
            });
            row.appendChild(list);

            container.appendChild(row);
        });
    }

    function renderAnnouncements() {
        const container = document.getElementById('dashboardAnnouncements');
        if (!container) return;
        container.innerHTML = '';
        const note = document.createElement('div');
        note.className = 'rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700';
        note.textContent = 'Missing confirmed announcement items.';
        container.appendChild(note);
    }

    function renderMessages() {
        const container = document.getElementById('dashboardMessages');
        if (!container) return;
        container.innerHTML = '';

        const summary = document.createElement('div');
        summary.className = 'rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700';
        summary.textContent = 'Missing confirmed message inbox items.';
        container.appendChild(summary);
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
        renderQuickLinks();
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
