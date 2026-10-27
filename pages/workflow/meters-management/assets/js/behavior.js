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
            const targetId = (location.hash || '').replace('#', '');
            if (!targetId) return;
            const element = document.getElementById(targetId);
            if (element) {
                this.sidebar.setActive(targetId);
                this.sidebar.isProgrammaticScroll = true;
                setTimeout(() => {
                    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
                    element.focus && element.focus();
                    setTimeout(() => {
                        this.sidebar.isProgrammaticScroll = false;
                    }, 400);
                }, 30);
            }
        }

        initialize() {
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

    const pageApp = new MetersApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => pageApp.initialize());
    } else {
        pageApp.initialize();
    }

    global.MetersApp = MetersApp;
    global.__metersApp = pageApp;
})(window);
