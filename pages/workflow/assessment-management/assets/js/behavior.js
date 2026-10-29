(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class AssessmentApp {
        constructor() {
            this.content = global.__assessmentContent || {};
            this.store = new global.AssessmentContentStore(this.content);
            this.renderer = new global.AssessmentContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.DocsTocTracker(this.store);
        }

        init() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderHero();
            this.renderer.renderAllSections();
            global.sharedDocsSkeleton.clearContent();
            this.sidebar.render();
            global.sharedDocsHeadingAnchors.init(this.store.getSections());
            this.sidebar.bindListeners();
            global.sharedDocsReveal.init('#section-render-root > .flat-section');

            if (location.hash) {
                this.sidebar.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const app = new AssessmentApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    global.AssessmentApp = AssessmentApp;
    global.__assessmentApp = app;
})(window);
