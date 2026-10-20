(function (global) {
    'use strict';

    class ActivityLogSidebarTracker {
        constructor(store, rootListId = 'docSidebarList') {
            this.store = store;
            this.rootListId = rootListId;
            this.activeId = null;
            this.isProgrammaticScroll = false;
        }

        appendItem(section, level, parent) {
            const li = document.createElement('li');
            li.className = 'sidebar-item';
            li.dataset.target = section.id;
            li.dataset.level = String(level);

            const a = document.createElement('a');
            const indent = level === 0 ? '' : ' pl-' + Math.min(level * 3, 12) + ' border-l border-slate-100';
            a.className = 'sidebar-link block text-slate-600 hover:text-brand transition-colors py-1' + indent;
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
                    this.appendItem(child, level + 1, childList);
                });
                li.appendChild(childList);
            }

            parent.appendChild(li);
        }

        render() {
            const list = document.getElementById(this.rootListId);
            if (!list) return;
            list.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                this.appendItem(section, 0, list);
            });
        }

        setActive(activeId) {
            if (!activeId || this.activeId === activeId) return;
            this.activeId = activeId;

            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return;

            const links = sidebar.querySelectorAll('a[data-target]');
            links.forEach(link => {
                link.classList.remove('active', 'text-brand', 'font-semibold');
                link.classList.add('text-slate-600');
            });

            const activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
            if (activeLink) {
                activeLink.classList.remove('text-slate-600');
                activeLink.classList.add('active', 'text-brand', 'font-semibold');
            }
        }

        getVisibleTargetId() {
            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return null;

            const links = Array.from(sidebar.querySelectorAll('a[data-target]'));
            if (!links.length) return null;

            const headerOffset = 140;
            const scrollY = window.scrollY || window.pageYOffset;
            const isBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 30);

            if (isBottom) {
                for (let i = links.length - 1; i >= 0; i--) {
                    const targetEl = document.getElementById(links[i].dataset.target);
                    if (targetEl) return links[i].dataset.target;
                }
            }

            let candidateId = null;
            for (let i = 0; i < links.length; i++) {
                const targetId = links[i].dataset.target;
                const el = document.getElementById(targetId);
                if (!el) continue;

                const top = el.getBoundingClientRect().top;
                if (top <= headerOffset) {
                    candidateId = targetId;
                } else {
                    break;
                }
            }

            return candidateId || (links[0] && links[0].dataset.target);
        }

        updateScrollSpy() {
            if (this.isProgrammaticScroll) return;
            const targetId = this.getVisibleTargetId();
            if (targetId) {
                this.setActive(targetId);
            }
        }

        bindListeners() {
            window.addEventListener('scroll', () => {
                this.updateScrollSpy();
            }, { passive: true });

            window.addEventListener('hashchange', () => {
                const hashId = (location.hash || '').replace('#', '');
                if (hashId) {
                    this.setActive(hashId);
                } else {
                    this.updateScrollSpy();
                }
            });
        }
    }

    global.ActivityLogSidebarTracker = ActivityLogSidebarTracker;
})(window);
