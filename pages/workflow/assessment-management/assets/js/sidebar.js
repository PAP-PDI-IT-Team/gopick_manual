/* sidebar.js - behaviors: collapsible sidebar, active highlight, and scroll sync */
(function () {
    'use strict';

    function $(selector, root = document) { return root.querySelector(selector); }
    function $all(selector, root = document) { return Array.from(root.querySelectorAll(selector)); }

    // Toggle sub-lists when parent link is clicked (for small screens)
    function setupCollapse(nav) {
        if (!nav) return;
        // add expand toggles for items with nested lists
        $all('li', nav).forEach(li => {
            const sub = li.querySelector(':scope > ul');
            if (sub) {
                li.classList.add('has-children');
                const link = li.querySelector(':scope > a');
                if (link) {
                    link.addEventListener('click', (ev) => {
                        // let default anchor scroll still happen
                        // toggle collapsed state on second-level lists only on small screens
                        if (window.innerWidth <= 900) {
                            ev.preventDefault();
                            li.classList.toggle('collapsed');
                            sub.style.display = li.classList.contains('collapsed') ? 'none' : '';
                            // scroll to the target section when expanding
                            const targetId = link.dataset.target;
                            if (targetId) {
                                const sec = document.querySelector('[data-section-id="' + targetId + '"]');
                                if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }
                    });
                }
            }
        });
    }

    // Scroll spy: highlight current section
    function setupScrollSpy() {
        const links = $all('#docSidebar a');
        const idToLink = {};
        links.forEach(a => { if (a.dataset.target) idToLink[a.dataset.target] = a; });

        const sections = Object.keys(idToLink).map(id => document.querySelector('[data-section-id="' + id + '"]')).filter(Boolean);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const id = entry.target.dataset.sectionId;
                const link = idToLink[id];
                if (!link) return;
                if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                    // remove active from others
                    $all('#docSidebar a.active').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, { root: null, rootMargin: '-20% 0px -40% 0px', threshold: [0.4] });

        sections.forEach(s => observer.observe(s));
    }

    // Anchor clicks: smooth scroll and set active
    function setupAnchors() {
        $all('#docSidebar a').forEach(a => {
            a.addEventListener('click', function (ev) {
                ev.preventDefault();
                const id = this.dataset.target || this.getAttribute('href').slice(1);
                const target = document.querySelector('[data-section-id="' + id + '"]');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                // update active state immediately
                $all('#docSidebar a.active').forEach(x => x.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const nav = document.getElementById('docSidebar');
        try { setupCollapse(nav); setupAnchors(); setupScrollSpy(); } catch (e) { console.error('Sidebar init', e) }
    });

})();
