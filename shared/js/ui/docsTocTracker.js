(function (global) {
    'use strict';

    const DESKTOP_TOC_QUERY = '(min-width: 1280px)';
    const HEADER_OFFSET = 140;
    const TOC_DEPTH_LIMIT = 2;

    class DocsTocTracker {
        constructor(store, rootListId = 'docsTocList', disclosureId = 'docsPageToc') {
            this.store = store;
            this.rootListId = rootListId;
            this.disclosureId = disclosureId;
            this.activeId = null;
            this.isProgrammaticScroll = false;
            this.listedIdBySectionId = new Map();
        }

        getRootList() {
            const rootList = document.getElementById(this.rootListId);
            if (!rootList) throw new Error('DocsTocTracker: missing #' + this.rootListId);
            return rootList;
        }

        mapHiddenDescendants(section, listedId) {
            (section.children || []).forEach(child => {
                this.listedIdBySectionId.set(child.id, listedId);
                this.mapHiddenDescendants(child, listedId);
            });
        }

        createLink(section, level) {
            const anchor = document.createElement('a');
            anchor.className = 'docs-toc-list__link docs-toc-list__link--level-' + level;
            anchor.href = '#' + section.id;
            anchor.dataset.target = section.id;
            anchor.textContent = section.title;
            anchor.addEventListener('click', () => {
                this.setActive(section.id);
                this.closeMobileDisclosure();
            });
            return anchor;
        }

        appendItem(section, level, parentList) {
            const listItem = document.createElement('li');
            listItem.className = 'docs-toc-list__item';
            listItem.appendChild(this.createLink(section, level));
            this.listedIdBySectionId.set(section.id, section.id);

            const children = section.children || [];
            if (children.length && level + 1 < TOC_DEPTH_LIMIT) {
                const childList = document.createElement('ul');
                childList.className = 'docs-toc-list__children';
                children.forEach(child => {
                    this.appendItem(child, level + 1, childList);
                });
                listItem.appendChild(childList);
            } else {
                this.mapHiddenDescendants(section, section.id);
            }

            parentList.appendChild(listItem);
        }

        render() {
            const listElement = this.getRootList();
            listElement.replaceChildren();
            this.listedIdBySectionId.clear();

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

            const listedId = this.listedIdBySectionId.get(activeId) || activeId;
            const activeLink = rootList.querySelector('a[data-target="' + listedId + '"]');
            if (activeLink) {
                activeLink.setAttribute('aria-current', 'location');
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

        focusHashTarget(targetId) {
            const element = document.getElementById(targetId);
            const focusTarget = element.matches('[tabindex], a, button, input, select, textarea, h1, h2, h3, h4, h5, h6')
                ? element
                : element.querySelector('h2, h3, h4, h5, h6') || element;
            if (!focusTarget.hasAttribute('tabindex') && !focusTarget.matches('a, button, input, select, textarea')) {
                focusTarget.setAttribute('tabindex', '-1');
            }
            focusTarget.focus({ preventScroll: true });
        }

        scrollToHash() {
            const targetId = (location.hash || '').replace('#', '');
            if (!targetId || !document.getElementById(targetId)) return;
            this.setActive(targetId);
            this.isProgrammaticScroll = true;
            const realign = () => this.alignHashTarget(targetId, 'auto');
            setTimeout(() => {
                this.alignHashTarget(targetId, 'smooth');
                this.focusHashTarget(targetId);
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
