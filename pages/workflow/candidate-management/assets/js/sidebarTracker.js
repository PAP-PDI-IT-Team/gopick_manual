(function (global) {
    'use strict';

    class CandidateSidebarTracker {
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

    global.CandidateSidebarTracker = CandidateSidebarTracker;
})(window);
