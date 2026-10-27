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
            this.sidebar = new global.MetersSidebarTracker(this.store);
            this.screenshotViewer = new global.MetersScreenshotViewer();
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
            this.screenshotViewer.bindTo(document.querySelector('main'));
            this.sidebar.render();
            this.sidebar.bindListeners();

            if (location.hash) {
                this.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const app = new MetersApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    global.MetersApp = MetersApp;
    global.__metersApp = app;
})(window);
