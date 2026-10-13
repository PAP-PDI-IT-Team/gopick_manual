(function (global) {
    'use strict';

    function setFooterYear() {
        const yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class ResourceCenterApp {
        constructor() {
            this.content = global.__resourceCenterContent || {};
            this.store = new global.ResourceCenterContentStore(this.content);
            this.renderer = new global.ResourceCenterContentRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.ResourceCenterSidebarTracker(this.store);
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

    const app = new ResourceCenterApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }

    global.ResourceCenterApp = ResourceCenterApp;
    global.__resourceCenterApp = app;
})(window);
