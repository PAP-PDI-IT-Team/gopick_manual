(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class TestNormsApp {
        constructor() {
            if (!global.__testNormsContent || !global.TestNormsContentStore || !global.TestNormsContentRenderer || !global.TestNormsSidebarTracker) {
                throw new Error('Test Norms requires its content, store, renderer, and sidebar tracker.');
            }
            this.content = global.__testNormsContent;
            this.store = new global.TestNormsContentStore(this.content);
            this.renderer = new global.TestNormsContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.TestNormsSidebarTracker(this.store);
        }

        scrollToHash() {
            const sectionId = (location.hash || '').replace('#', '');
            if (!sectionId) return;
            const targetElement = document.getElementById(sectionId);
            if (targetElement) {
                this.sidebar.setActive(sectionId);
                this.sidebar.isProgrammaticScroll = true;
                setTimeout(() => {
                    targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
                    targetElement.focus && targetElement.focus();
                    setTimeout(() => {
                        this.sidebar.isProgrammaticScroll = false;
                    }, 400);
                }, 30);
            }
        }

        initialize() {
            setFooterYear();
            this.renderer.renderHero();
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

    const normsApp = new TestNormsApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => normsApp.initialize());
    } else {
        normsApp.initialize();
    }

    global.TestNormsApp = TestNormsApp;
    global.__testNormsApp = normsApp;
})(window);
