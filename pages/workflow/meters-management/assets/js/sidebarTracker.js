(function (global) {
    'use strict';

    class MetersSidebarTracker {
        constructor(store, rootListId = 'docSidebarList') {
            this.store = store;
            this.rootListId = rootListId;
            this.activeId = null;
            this.isProgrammaticScroll = false;
            this.manuallyOpenedIds = new Set();
        }

        createToggleButton(section, childList) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'sidebar-toggle';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', childList.id);
            button.setAttribute('aria-label', 'Show ' + section.title + ' sections');

            const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            chevron.setAttribute('viewBox', '0 0 24 24');
            chevron.setAttribute('fill', 'none');
            chevron.setAttribute('stroke', 'currentColor');
            chevron.setAttribute('stroke-width', '2');
            chevron.setAttribute('stroke-linecap', 'round');
            chevron.setAttribute('stroke-linejoin', 'round');
            chevron.setAttribute('aria-hidden', 'true');
            const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            chevronPath.setAttribute('d', 'M9 6l6 6-6 6');
            chevron.appendChild(chevronPath);
            button.appendChild(chevron);

            button.addEventListener('click', () => {
                const willOpen = button.getAttribute('aria-expanded') !== 'true';
                this.setBranchOpen(section.id, willOpen);
                if (willOpen) {
                    this.manuallyOpenedIds.add(section.id);
                } else {
                    this.manuallyOpenedIds.delete(section.id);
                }
            });

            return button;
        }

        setBranchOpen(sectionId, isOpen) {
            const sidebar = document.getElementById(this.rootListId);
            const itemData = sidebar.querySelector('li[data-target="' + sectionId + '"]');
            const button = itemData.querySelector(':scope > .sidebar-row > .sidebar-toggle');
            const childList = itemData.querySelector(':scope > .sidebar-children');
            button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            button.setAttribute('aria-label', (isOpen ? 'Hide ' : 'Show ') + itemData.dataset.title + ' sections');
            childList.hidden = !isOpen;
        }

        openActiveBranch(activeItem) {
            const sidebar = document.getElementById(this.rootListId);
            const ancestorIds = new Set();
            let current = activeItem.parentElement;
            while (current && current !== sidebar) {
                if (current.matches('li.sidebar-item.has-children')) {
                    ancestorIds.add(current.dataset.target);
                }
                current = current.parentElement;
            }

            sidebar.querySelectorAll('li.sidebar-item.has-children').forEach(branch => {
                const branchId = branch.dataset.target;
                const isInPath = ancestorIds.has(branchId);
                branch.classList.toggle('is-in-path', isInPath);
                this.setBranchOpen(branchId, isInPath || branch === activeItem || this.manuallyOpenedIds.has(branchId));
            });
        }

        appendItem(section, level, parent) {
            const listItem = document.createElement('li');
            listItem.className = 'sidebar-item';
            listItem.dataset.target = section.id;
            listItem.dataset.level = String(level);
            listItem.dataset.title = section.title;

            const anchor = document.createElement('a');
            const indent = level === 0 ? '' : ' pl-' + Math.min(level * 3, 12) + ' border-l border-slate-100';
            anchor.className = 'sidebar-link block text-slate-600 hover:text-brand transition-colors py-1' + indent;
            anchor.href = '#' + section.id;
            anchor.dataset.target = section.id;
            anchor.textContent = section.title;

            anchor.addEventListener('click', () => {
                this.setActive(section.id);
            });

            const rowElement = document.createElement('div');
            rowElement.className = 'sidebar-row';
            rowElement.appendChild(anchor);
            listItem.appendChild(rowElement);

            if (section.children && section.children.length) {
                const childList = document.createElement('ul');
                childList.className = 'sidebar-children mt-1 space-y-1';
                childList.id = 'sidebar-children-' + section.id;
                childList.hidden = true;
                section.children.forEach(child => {
                    this.appendItem(child, level + 1, childList);
                });
                listItem.classList.add('has-children');
                rowElement.appendChild(this.createToggleButton(section, childList));
                listItem.appendChild(childList);
            }

            parent.appendChild(listItem);
        }

        render() {
            const listElement = document.getElementById(this.rootListId);
            if (!listElement) return;
            listElement.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                this.appendItem(section, 0, listElement);
            });
        }

        setActive(activeId) {
            if (!activeId || this.activeId === activeId) return;
            this.activeId = activeId;

            const sidebar = document.getElementById(this.rootListId);
            if (!sidebar) return;

            const links = sidebar.querySelectorAll('a[data-target]');
            links.forEach(linkElement => {
                linkElement.classList.remove('active', 'text-brand', 'font-semibold');
                linkElement.classList.add('text-slate-600');
            });

            const activeLink = sidebar.querySelector('a[data-target="' + activeId + '"]');
            if (activeLink) {
                activeLink.classList.remove('text-slate-600');
                activeLink.classList.add('active', 'text-brand', 'font-semibold');
                this.openActiveBranch(activeLink.closest('li.sidebar-item'));
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
                for (let index = links.length - 1; index >= 0; index--) {
                    const targetEl = document.getElementById(links[index].dataset.target);
                    if (targetEl) return links[index].dataset.target;
                }
            }

            let candidateId = null;
            for (let index2 = 0; index2 < links.length; index2++) {
                const targetId = links[index2].dataset.target;
                const element = document.getElementById(targetId);
                if (!element || element.closest('[hidden]')) continue;

                const topOffset = element.getBoundingClientRect().top;
                if (topOffset <= headerOffset) {
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

    global.MetersSidebarTracker = MetersSidebarTracker;
})(window);
