(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class MetersApp {
        constructor() {
            this.content = global.__metersContent || {};
            this.store = new global.MetersContentStore(this.content);
            this.renderer = new global.MetersContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.DocsTocTracker(this.store);
            this.screenshotViewer = new global.DocsScreenshotViewer();
        }

        initialize() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderAllSections();
            this.screenshotViewer.bindTo(document.querySelector('main'));
            global.sharedDocsSkeleton.clearContent();
            this.sidebar.render();
            global.sharedDocsHeadingAnchors.init(this.store.getSections());
            this.sidebar.bindListeners();
            global.sharedDocsReveal.init('#section-render-root > .flat-section, #section-render-root .flat-subsection');

            if (location.hash) {
                this.sidebar.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const pageApp = new MetersApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => pageApp.initialize());
    } else {
        pageApp.initialize();
    }

    global.MetersApp = MetersApp;
    global.__metersApp = pageApp;
})(window);
