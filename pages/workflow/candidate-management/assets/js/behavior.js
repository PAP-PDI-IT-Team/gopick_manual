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
            this.sidebar = new global.CandidateSidebarTracker(this.store);
        }

        scrollToHash() {
            const id = (location.hash || '').replace('#', '');
            if (!id) return;
            const el = document.getElementById(id);
            if (el) {
                this.sidebar.setActive(id);
                this.sidebar.isProgrammaticScroll = true;
                setTimeout(() => {
                    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
                    el.focus && el.focus();
                    setTimeout(() => {
                        this.sidebar.isProgrammaticScroll = false;
                    }, 400);
                }, 30);
            }
        }

        init() {
            setFooterYear();
            this.renderer.renderAll();
            this.sidebar.render();
            this.sidebar.bindListeners();

            if (location.hash) {
                this.scrollToHash();
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
