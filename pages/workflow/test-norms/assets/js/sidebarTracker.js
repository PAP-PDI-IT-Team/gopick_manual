(function (global) {
    'use strict';

    class TestNormsSidebarTracker {
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
            const listItem = document.createElement('li');
            listItem.className = 'sidebar-item';

            const navLink = document.createElement('a');
            navLink.className = this.getLinkClass(level);
            navLink.href = '#' + section.id;
            navLink.dataset.target = section.id;
            navLink.textContent = section.title;

            navLink.addEventListener('click', () => {
                this.setActive(section.id);
            });

            listItem.appendChild(navLink);

            if (section.children && section.children.length) {
                const childList = document.createElement('ul');
                childList.className = 'sidebar-children mt-1 space-y-1';
                section.children.forEach(child => {
                    childList.appendChild(this.createSidebarItem(child, level + 1));
                });
                listItem.appendChild(childList);
            }

            return listItem;
        }

        render() {
            const bulletList = document.getElementById(this.rootListId);
            if (!bulletList) return;
            bulletList.innerHTML = '';
            const sections = this.store.getSections();
            sections.forEach(section => {
                bulletList.appendChild(this.createSidebarItem(section, 0));
            });
        }

        setActive(activeId) {
            if (!activeId || this.activeId === activeId) return;
            this.activeId = activeId;

            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return;

            const links = sidebar.querySelectorAll('a[data-target]');
            links.forEach(navLink => {
                navLink.classList.remove('text-brand', 'font-semibold', 'active');
                navLink.classList.add('text-slate-600');
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

            const targetIds = links.map(navLink => navLink.dataset.target);
            const offset = 140;

            const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 30);
            if (isBottom) {
                return targetIds[targetIds.length - 1];
            }

            let bestMatch = null;
            let closestTop = -Infinity;

            targetIds.forEach(sectionId => {
                const targetElement = document.getElementById(sectionId);
                if (!targetElement) return;
                const bounds = targetElement.getBoundingClientRect();
                if (bounds.top <= offset) {
                    if (bounds.top > closestTop) {
                        closestTop = bounds.top;
                        bestMatch = sectionId;
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

    global.TestNormsSidebarTracker = TestNormsSidebarTracker;
})(window);
