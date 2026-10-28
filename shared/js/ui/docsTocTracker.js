(function (global) {
    'use strict';

    const DESKTOP_TOC_QUERY = '(min-width: 1280px)';
    const HEADER_OFFSET = 140;

    class DocsTocTracker {
        constructor(store, rootListId = 'docsTocList', disclosureId = 'docsPageToc') {
            this.store = store;
            this.rootListId = rootListId;
            this.disclosureId = disclosureId;
            this.activeId = null;
            this.isProgrammaticScroll = false;
            this.manuallyOpenedIds = new Set();
        }

        getRootList() {
            const rootList = document.getElementById(this.rootListId);
            if (!rootList) throw new Error('DocsTocTracker: missing #' + this.rootListId);
            return rootList;
        }

        createToggleButton(section, childList) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'docs-toc-tree__toggle';
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
            const itemData = this.getRootList().querySelector('li[data-target="' + sectionId + '"]');
            const button = itemData.querySelector(':scope > .docs-toc-tree__row > .docs-toc-tree__toggle');
            const childList = itemData.querySelector(':scope > .docs-toc-tree__children');
            button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            button.setAttribute('aria-label', (isOpen ? 'Hide ' : 'Show ') + itemData.dataset.title + ' sections');
            childList.hidden = !isOpen;
        }

        openActiveBranch(activeItem) {
            const rootList = this.getRootList();
            const ancestorIds = new Set();
            let current = activeItem.parentElement;
            while (current && current !== rootList) {
                if (current.matches('li.docs-toc-tree__item--branch')) {
                    ancestorIds.add(current.dataset.target);
                }
                current = current.parentElement;
            }

            rootList.querySelectorAll('li.docs-toc-tree__item--branch').forEach(branch => {
                const branchId = branch.dataset.target;
                const isInPath = ancestorIds.has(branchId);
                branch.classList.toggle('docs-toc-tree__item--in-path', isInPath);
                this.setBranchOpen(branchId, isInPath || branch === activeItem || this.manuallyOpenedIds.has(branchId));
            });
        }

        appendItem(section, level, parent) {
            const listItem = document.createElement('li');
            listItem.className = 'docs-toc-tree__item';
            listItem.dataset.target = section.id;
            listItem.dataset.level = String(level);
            listItem.dataset.title = section.title;

            const anchor = document.createElement('a');
            anchor.className = 'docs-toc-tree__link';
            anchor.style.setProperty('--toc-depth', String(level));
            anchor.href = '#' + section.id;
            anchor.dataset.target = section.id;
            anchor.textContent = section.title;

            anchor.addEventListener('click', () => {
                this.setActive(section.id);
                this.closeMobileDisclosure();
            });

            const rowElement = document.createElement('div');
            rowElement.className = 'docs-toc-tree__row';
            rowElement.appendChild(anchor);
            listItem.appendChild(rowElement);

            if (section.children && section.children.length) {
                const childList = document.createElement('ul');
                childList.className = 'docs-toc-tree__children';
                childList.id = 'docs-toc-children-' + section.id;
                childList.hidden = true;
                section.children.forEach(child => {
                    this.appendItem(child, level + 1, childList);
                });
                listItem.classList.add('docs-toc-tree__item--branch');
                rowElement.appendChild(this.createToggleButton(section, childList));
                listItem.appendChild(childList);
            }

            parent.appendChild(listItem);
        }

        render() {
            const listElement = this.getRootList();
            listElement.replaceChildren();

            const sections = this.store.getSections();
            sections.forEach(section => {
                this.appendItem(section, 0, listElement);
            });
        }

        keepActiveLinkVisible(activeLink) {
            const disclosure = document.getElementById(this.disclosureId);
            if (!disclosure || !window.matchMedia(DESKTOP_TOC_QUERY).matches) return;
            const linkTop = activeLink.offsetTop;
            const visibleTop = disclosure.scrollTop;
            const visibleBottom = visibleTop + disclosure.clientHeight;
            if (linkTop < visibleTop + 80 || linkTop > visibleBottom - 80) {
                disclosure.scrollTop = Math.max(0, linkTop - disclosure.clientHeight / 2);
            }
        }

        setActive(activeId) {
            if (!activeId || this.activeId === activeId) return;
            this.activeId = activeId;

            const rootList = this.getRootList();
            rootList.querySelectorAll('a[data-target]').forEach(linkElement => {
                linkElement.removeAttribute('aria-current');
            });

            const activeLink = rootList.querySelector('a[data-target="' + activeId + '"]');
            if (activeLink) {
                activeLink.setAttribute('aria-current', 'location');
                this.openActiveBranch(activeLink.closest('li.docs-toc-tree__item'));
                this.keepActiveLinkVisible(activeLink);
            }

            document.dispatchEvent(new CustomEvent('docsectionchange', { detail: { sectionId: activeId } }));
        }

        getVisibleTargetId() {
            const links = Array.from(this.getRootList().querySelectorAll('a[data-target]'));
            if (!links.length) return null;

            const scrollY = window.scrollY || window.pageYOffset;
            const isBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 30);

            if (isBottom) {
                for (let index = links.length - 1; index >= 0; index--) {
                    const targetEl = document.getElementById(links[index].dataset.target);
                    if (targetEl) return links[index].dataset.target;
                }
            }

            let candidateId = null;
            for (let linkIndex = 0; linkIndex < links.length; linkIndex++) {
                const targetId = links[linkIndex].dataset.target;
                const element = document.getElementById(targetId);
                if (!element || element.closest('[hidden]')) continue;

                const topOffset = element.getBoundingClientRect().top;
                if (topOffset <= HEADER_OFFSET) {
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

        alignHashTarget(targetId, behavior) {
            const element = document.getElementById(targetId);
            if (!element) return;
            element.scrollIntoView({ block: 'start', behavior: behavior });
        }

        scrollToHash() {
            const targetId = (location.hash || '').replace('#', '');
            if (!targetId || !document.getElementById(targetId)) return;
            this.setActive(targetId);
            this.isProgrammaticScroll = true;
            const realign = () => this.alignHashTarget(targetId, 'auto');
            setTimeout(() => {
                this.alignHashTarget(targetId, 'smooth');
                setTimeout(() => {
                    this.isProgrammaticScroll = false;
                }, 400);
            }, 30);
            document.fonts.ready.then(realign);
            if (document.readyState !== 'complete') window.addEventListener('load', realign, { once: true });
        }

        closeMobileDisclosure() {
            const disclosure = document.getElementById(this.disclosureId);
            if (disclosure && !window.matchMedia(DESKTOP_TOC_QUERY).matches) disclosure.open = false;
        }

        bindDisclosure() {
            const disclosure = document.getElementById(this.disclosureId);
            if (!disclosure) throw new Error('DocsTocTracker: missing #' + this.disclosureId);
            const desktopQuery = window.matchMedia(DESKTOP_TOC_QUERY);
            const syncDisclosure = () => {
                disclosure.open = desktopQuery.matches;
            };
            disclosure.querySelector('summary').addEventListener('click', clickEvent => {
                if (desktopQuery.matches) clickEvent.preventDefault();
            });
            desktopQuery.addEventListener('change', syncDisclosure);
            syncDisclosure();
        }

        bindListeners() {
            this.bindDisclosure();

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

    global.DocsTocTracker = DocsTocTracker;
})(window);
