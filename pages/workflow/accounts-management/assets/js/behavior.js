(function (global) {
    'use strict';

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    class AccountsApp {
        constructor() {
            this.content = global.__accountsContent || {};
            this.store = new global.AccountsStore(this.content);
            this.renderer = new global.AccountsRenderer(this.store, global.GoPickImageRenderer);
            this.sidebar = new global.DocsTocTracker(this.store);
            this.screenshotViewer = new global.DocsScreenshotViewer();
        }

        initialize() {
            setFooterYear();
            global.sharedDocsPageShell.init().catch(error => {
                console.error('Error loading documentation navigation:', error);
            });
            this.renderer.renderAll();
            this.screenshotViewer.bindTo(document.querySelector('main'));
            global.sharedDocsSkeleton.clearContent();
            this.sidebar.render();
            global.sharedDocsHeadingAnchors.init(this.store.getSections());
            this.sidebar.bindListeners();

            global.sharedDocsReveal.init('.docs-page-body > .flat-section, .docs-page-body .flat-subsection, .docs-page-body .flow-overview, .docs-page-body .flow-step');

            if (location.hash) {
                this.sidebar.scrollToHash();
            } else {
                this.sidebar.updateScrollSpy();
            }
        }
    }

    const pageApp = new AccountsApp();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => pageApp.initialize());
    } else {
        pageApp.initialize();
    }

    global.AccountsApp = AccountsApp;
    global.__accountsApp = pageApp;
    global.accountsBehavior = {
        initBehavior: () => pageApp.initialize()
    };
})(window);
