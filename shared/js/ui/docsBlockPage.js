(function (global) {
    'use strict';

    const REVEAL_SELECTOR = '#section-render-root > .flat-section, #section-render-root .docs-block:not(.docs-block--top)';
    const REQUIRED_MODULES = ['DocsContentStore', 'DocsBlockRenderer', 'DocsTocTracker', 'sharedDocsPageShell', 'sharedDocsHeadingAnchors', 'sharedDocsReveal'];

    function assertModulesLoaded() {
        REQUIRED_MODULES.forEach(moduleName => {
            if (!global[moduleName]) throw new Error('docsBlockPage: ' + moduleName + ' is not loaded');
        });
    }

    function requirePageContent(contentKey) {
        const content = global[contentKey];
        if (!content) throw new Error('docsBlockPage: dataFiller.js did not define ' + contentKey);
        return content;
    }

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (!yearSpan) throw new Error('docsBlockPage: missing #footerYearSpan');
        yearSpan.textContent = String(new Date().getFullYear());
    }

    function loadPageShell() {
        global.sharedDocsPageShell.init().catch(error => {
            console.error('Error loading documentation navigation:', error);
        });
    }

    class DocsBlockPage {
        constructor(pageOptions) {
            assertModulesLoaded();
            this.store = new global.DocsContentStore(requirePageContent(pageOptions.contentKey));
            this.renderer = new global.DocsBlockRenderer(this.store, {
                imageRenderer: pageOptions.imageRenderer,
                blockBuilders: pageOptions.blockBuilders,
                sectionBuilders: pageOptions.sectionBuilders
            });
            this.tocTracker = new global.DocsTocTracker(this.store);
            this.afterRender = pageOptions.afterRender || null;
        }

        initialize() {
            setFooterYear();
            loadPageShell();
            this.renderer.renderAllSections();
            global.sharedDocsSkeleton.clearContent();
            if (this.afterRender) this.afterRender(this.store);
            this.tocTracker.render();
            this.tocTracker.bindListeners();
            global.sharedDocsHeadingAnchors.init(this.store.getSections());
            global.sharedDocsReveal.init(REVEAL_SELECTOR);

            if (location.hash) {
                this.tocTracker.scrollToHash();
            } else {
                this.tocTracker.updateScrollSpy();
            }
        }
    }

    function start(pageOptions) {
        if (!pageOptions || !pageOptions.contentKey) throw new Error('docsBlockPage: start needs a contentKey');
        const page = new DocsBlockPage(pageOptions);
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => page.initialize());
        } else {
            page.initialize();
        }
        return page;
    }

    global.sharedDocsBlockPage = {
        start: start
    };
})(window);
