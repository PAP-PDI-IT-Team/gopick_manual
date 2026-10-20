(function (global) {
    'use strict';

    class MetersSidebarTracker {
        constructor(store, rootListId = 'docSidebarList') {
            this.store = store;
            this.rootListId = rootListId;
            this.activeId = null;
            this.isProgrammaticScroll = false;
        }

        getLinkClass(level) {
            const depth = Math.min(level, 5);
            const indentClasses = ['', ' pl-3 border-l border-slate-100', ' pl-6 border-l border-slate-100', ' pl-9 border-l border-slate-100', ' pl-12 border-l border-slate-100', ' pl-16 border-l border-slate-100'];
            const sizeClass = level === 0 ? ' text-sm' : (level < 3 ? ' text-[13px]' : ' text-xs');
            return 'sidebar-link block text-slate-600 hover:text-brand transition-colors py-1' + sizeClass + indentClasses[depth];
        }

        createSidebarItem(section, level) {
            const li = document.createElement('li');
            li.className = 'sidebar-item';

            const a = document.createElement('a');
            a.className = this.getLinkClass(level);
            a.href = '#' + section.id;
            a.dataset.target = section.id;
            a.textContent = section.title;

            a.addEventListener('click', () => {
                this.setActive(section.id);
            });

            li.appendChild(a);

            if (section.children && section.children.length) {
                const childList = document.createElement('ul');
                childList.className = 'sidebar-children mt-1 space-y-1';
                section.children.forEach(child => {
                    childList.appendChild(this.createSidebarItem(child, level + 1));
                });
                li.appendChild(childList);
            }

            return li;
        }

        render() {
            const list = document.getElementById(this.rootListId);
            if (!list) return;
            list.innerHTML = '';
            const sections = this.store.getSections();
            sections.forEach(section => {
                list.appendChild(this.createSidebarItem(section, 0));
            });
        }

        setActive(activeId) {
            if (!activeId || this.activeId === activeId) return;
            this.activeId = activeId;

            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return;

            const links = sidebar.querySelectorAll('a[data-target]');
            links.forEach(link => {
                link.classList.remove('text-brand', 'font-semibold', 'active');
                link.classList.add('text-slate-600');
            });

            const activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
            if (activeLink) {
                activeLink.classList.remove('text-slate-600');
                activeLink.classList.add('text-brand', 'font-semibold', 'active');
            }
        }

        getVisibleTargetId() {
            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return null;

            const links = Array.from(sidebar.querySelectorAll('a[data-target]'));
            if (!links.length) return null;

            const targetIds = links.map(link => link.dataset.target);
            const offset = 140;

            const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30);
            if (isBottom) {
                return targetIds[targetIds.length - 1];
            }

            let bestMatch = null;
            let closestTop = -Infinity;

            targetIds.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top <= offset) {
                    if (rect.top > closestTop) {
                        closestTop = rect.top;
                        bestMatch = id;
                    }
                }
            });

            return bestMatch || targetIds[0] || null;
        }

        updateScrollSpy() {
            if (this.isProgrammaticScroll) return;
            const targetId = this.getVisibleTargetId();
            if (targetId) {
                this.setActive(targetId);
            }
        }

        bindListeners() {
            window.addEventListener('scroll', () => this.updateScrollSpy(), { passive: true });
        }
    }

    global.MetersSidebarTracker = MetersSidebarTracker;
})(window);
