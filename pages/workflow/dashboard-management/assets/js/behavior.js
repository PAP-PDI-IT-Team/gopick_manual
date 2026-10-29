(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class DashboardApp {
        constructor() {
            this.content = global.__dashboardContent || {};
            this.store = new global.DashboardContentStore(this.content);
            this.renderer = new global.DashboardContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.DocsTocTracker(this.store);
        }

        init() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderAll();
            global.sharedDocsSkeleton.clearContent();
            this.sidebar.render();
            global.sharedDocsHeadingAnchors.init(this.store.getSections());
            this.sidebar.bindListeners();
            global.sharedDocsReveal.init('.docs-page-body > .flat-section, .docs-page-body .flat-section__content');

            if (location.hash) {
                this.sidebar.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const app = new DashboardApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    global.DashboardApp = DashboardApp;
    global.__dashboardApp = app;
})(window);
