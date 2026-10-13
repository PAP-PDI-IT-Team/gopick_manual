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
            this.sidebar = new global.AssessmentSidebarTracker(this.store);
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
            this.renderer.renderAllSections();
            this.sidebar.render();
            this.sidebar.bindListeners();

            if (location.hash) {
                this.scrollToHash();
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
