(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class CandidateApp {
        constructor() {
            this.content = global.__candidateContent || {};
            this.store = new global.CandidateContentStore(this.content);
            this.renderer = new global.CandidateContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.DocsTocTracker(this.store);
        }

        initialize() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderAll();
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

    const pageApp = new CandidateApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => pageApp.initialize());
    } else {
        pageApp.initialize();
    }

    global.CandidateApp = CandidateApp;
    global.__candidateApp = pageApp;
})(window);
