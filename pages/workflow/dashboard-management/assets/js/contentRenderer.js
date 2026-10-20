(function (global) {
    'use strict';

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

    class DashboardContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex gap-2';
                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
                const content = document.createElement('span');
                content.textContent = item;
                li.appendChild(marker);
                li.appendChild(content);
                list.appendChild(li);
            });
            return list;
        }

        createCallout(title, items, variant) {
            const wrap = document.createElement('div');
            const isRules = variant === 'rules';
            const isExpected = variant === 'expected';
            wrap.className = isRules
                ? 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4'
                : (isExpected
                    ? 'mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4'
                    : 'mt-4 rounded-lg border border-slate-100 bg-white p-4');

            const heading = document.createElement('h3');
            heading.className = isRules
                ? 'font-semibold text-amber-900 mb-2'
                : (isExpected ? 'font-semibold text-emerald-900 mb-2' : 'font-semibold text-slate-900 mb-2');
            heading.textContent = title;

            wrap.appendChild(heading);
            wrap.appendChild(this.createBulletList(items));
            return wrap;
        }

        createMetricCard(metric) {
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

        renderMetrics(section, container) {
            if (!section.metrics || !section.metrics.length) return;
            const grid = document.createElement('div');
            grid.id = 'dashboardMetrics';
            grid.className = 'grid gap-4 grid-cols-1 md:grid-cols-2 mt-4';
            section.metrics.forEach(metric => {
                grid.appendChild(this.createMetricCard(metric));
            });
            container.appendChild(grid);
        }

        renderQuickLinks(section, container) {
            if (!section.quickLinks || !section.quickLinks.length) return;
            const wrapper = document.createElement('div');
            wrapper.id = 'dashboardQuickLinks';
            wrapper.className = 'space-y-4 mt-4';

            section.quickLinks.forEach(group => {
                const row = document.createElement('div');
                row.className = group.title === 'Message Inbox'
                    ? 'text-sm text-slate-600'
                    : 'rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600';

                const title = document.createElement('div');
                title.className = 'font-semibold text-slate-900 mb-3';
                title.textContent = group.title;
                row.appendChild(title);

                if (group.title === 'Quick Links' || group.title === 'Help Desk') {
                    const cards = document.createElement('div');
                    cards.className = group.title === 'Quick Links' ? 'grid gap-3 md:grid-cols-3' : 'grid gap-3 md:grid-cols-2';

                    group.items.forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'p-5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md';

                        const iconBox = document.createElement('div');
                        iconBox.className = 'w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0';
                        iconBox.innerHTML = ICON_SVG_MAP[item.icon] || '';

                        const textWrap = document.createElement('div');
                        textWrap.className = 'min-w-0';

                        const itemTitle = document.createElement('h3');
                        itemTitle.className = 'text-sm font-bold text-slate-900 leading-tight';
                        itemTitle.textContent = item.title;

                        const subTitle = document.createElement('p');
                        subTitle.className = 'mt-1 text-xs font-medium uppercase tracking-wide text-slate-500';
                        subTitle.textContent = item.subTitle;

                        card.appendChild(iconBox);
                        textWrap.appendChild(itemTitle);
                        textWrap.appendChild(subTitle);
                        card.appendChild(textWrap);
                        cards.appendChild(card);
                    });

                    row.appendChild(cards);
                    wrapper.appendChild(row);
                    return;
                }

                if (group.title === 'Message Inbox') {
                    const description = document.createElement('p');
                    description.className = 'mb-3 text-sm text-slate-600';
                    description.textContent = group.items[0];
                    row.appendChild(description);

                    const card = document.createElement('div');
                    card.className = 'p-5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-4 transition-all hover:bg-white hover:shadow-md';

                    const iconBox = document.createElement('div');
                    iconBox.className = 'w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center flex-shrink-0';
                    iconBox.innerHTML = ICON_SVG_MAP['send-inquiry'] || '';

                    const textWrap = document.createElement('div');
                    textWrap.className = 'min-w-0';

                    const itemTitle = document.createElement('h3');
                    itemTitle.className = 'text-sm font-bold text-slate-900 leading-tight';
                    itemTitle.textContent = group.items[1];

                    card.appendChild(iconBox);
                    textWrap.appendChild(itemTitle);
                    card.appendChild(textWrap);
                    row.appendChild(card);

                    wrapper.appendChild(row);
                    return;
                }

                const list = document.createElement('ul');
                list.className = 'space-y-1';
                group.items.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    list.appendChild(li);
                });
                row.appendChild(list);
                wrapper.appendChild(row);
            });

            container.appendChild(wrapper);
        }

        renderImages(section, container) {
            if (!section.images || !section.images.length) return;
            if (!this.imageRenderer || !this.imageRenderer.createImageOrPlaceholder) return;

            section.images.forEach(img => {
                const card = this.imageRenderer.createImageOrPlaceholder(img, section.title);
                container.appendChild(card);
            });
        }

        renderSection(section) {
            const el = document.getElementById(section.id);
            if (!el) return;
            el.innerHTML = '';

            const header = document.createElement('div');
            header.className = 'mb-4';

            const title = document.createElement('h2');
            title.className = 'text-xl font-bold text-slate-900';
            title.textContent = section.title;
            header.appendChild(title);

            if (section.accessPaths && section.accessPaths.length) {
                const pathWrap = document.createElement('div');
                pathWrap.className = 'mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium';
                section.accessPaths.forEach((step, idx) => {
                    if (idx > 0) {
                        const arrow = document.createElement('span');
                        arrow.className = 'text-slate-400';
                        arrow.textContent = '›';
                        pathWrap.appendChild(arrow);
                    }
                    const stepBadge = document.createElement('span');
                    stepBadge.className = 'px-2 py-0.5 rounded bg-slate-100 text-slate-700';
                    stepBadge.textContent = step;
                    pathWrap.appendChild(stepBadge);
                });
                header.appendChild(pathWrap);
            }

            el.appendChild(header);

            if (section.description) {
                const desc = document.createElement('p');
                desc.className = 'text-sm text-slate-600 mb-5 leading-relaxed';
                desc.textContent = section.description;
                el.appendChild(desc);
            }

            this.renderImages(section, el);

            if (section.metrics) {
                this.renderMetrics(section, el);
            }

            if (section.quickLinks) {
                this.renderQuickLinks(section, el);
            }

            if (section.rules && section.rules.length) {
                el.appendChild(this.createCallout('Rules & Preconditions', section.rules, 'rules'));
            }

            if (section.expectedResults && section.expectedResults.length) {
                el.appendChild(this.createCallout('Expected Results', section.expectedResults, 'expected'));
            }
        }

        renderAll() {
            const sections = this.store.getSections();
            sections.forEach(section => this.renderSection(section));
        }
    }

    global.DashboardContentRenderer = DashboardContentRenderer;
})(window);
