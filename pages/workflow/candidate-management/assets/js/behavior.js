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

        init() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderAll();
            this.sidebar.render();
            this.sidebar.bindListeners();
            global.sharedDocsReveal.init('#section-render-root > .flat-section');

            if (location.hash) {
                this.sidebar.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const app = new CandidateApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    global.CandidateApp = CandidateApp;
    global.__candidateApp = app;
})(window);
