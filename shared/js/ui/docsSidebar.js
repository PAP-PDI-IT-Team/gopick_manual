(function (global) {
    'use strict';

    var DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';
    var FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

    var sidebarElements = null;
    var focusBeforeOpen = null;

    function requireNode(nodeId) {
        var nodeElement = document.getElementById(nodeId);
        if (!nodeElement) throw new Error('docsSidebar: missing #' + nodeId);
        return nodeElement;
    }

    function getIsOpen() {
        return sidebarElements.sidebar.classList.contains('docs-sidebar--open');
    }

    function setOpenState(isOpen) {
        sidebarElements.sidebar.classList.toggle('docs-sidebar--open', isOpen);
        sidebarElements.backdrop.classList.toggle('docs-sidebar-backdrop--open', isOpen);
        sidebarElements.toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        sidebarElements.toggle.setAttribute('aria-label', isOpen ? 'Close documentation menu' : 'Open documentation menu');
        document.body.classList.toggle('docs-shell--locked', isOpen);
    }

    function getFocusableNodes() {
        return Array.prototype.slice.call(sidebarElements.sidebar.querySelectorAll(FOCUSABLE_SELECTOR));
    }

    function openSidebar() {
        focusBeforeOpen = document.activeElement;
        setOpenState(true);
        var focusableNodes = getFocusableNodes();
        if (focusableNodes.length) focusableNodes[0].focus();
    }

    function closeSidebar(shouldRestoreFocus) {
        if (!getIsOpen()) return;
        setOpenState(false);
        if (shouldRestoreFocus && focusBeforeOpen) focusBeforeOpen.focus();
    }

    function toggleSidebar() {
        if (getIsOpen()) {
            closeSidebar(true);
        } else {
            openSidebar();
        }
    }

    function trapFocus(keyEvent) {
        var focusableNodes = getFocusableNodes();
        if (!focusableNodes.length) return;
        var firstNode = focusableNodes[0];
        var lastNode = focusableNodes[focusableNodes.length - 1];

        if (keyEvent.shiftKey && document.activeElement === firstNode) {
            keyEvent.preventDefault();
            lastNode.focus();
        } else if (!keyEvent.shiftKey && document.activeElement === lastNode) {
            keyEvent.preventDefault();
            firstNode.focus();
        }
    }

    function handleKeydown(keyEvent) {
        if (!getIsOpen()) return;
        if (keyEvent.key === 'Escape') closeSidebar(true);
        if (keyEvent.key === 'Tab') trapFocus(keyEvent);
    }

    function handleSidebarClick(clickEvent) {
        if (clickEvent.target.closest('a')) closeSidebar(false);
    }

    function bindEvents() {
        sidebarElements.toggle.addEventListener('click', toggleSidebar);
        sidebarElements.backdrop.addEventListener('click', function () { closeSidebar(true); });
        sidebarElements.sidebar.addEventListener('click', handleSidebarClick);
        document.addEventListener('keydown', handleKeydown);
        global.matchMedia(DESKTOP_MEDIA_QUERY).addEventListener('change', function (mediaEvent) {
            if (mediaEvent.matches) closeSidebar(false);
        });
    }

    function bindHeaderTone() {
        var header = document.querySelector('.docs-header');
        if (!header) throw new Error('docsSidebar: missing .docs-header');
        var updateHeaderTone = function () {
            header.classList.toggle('docs-header--scrolled', global.scrollY > 8);
        };
        global.addEventListener('scroll', updateHeaderTone, { passive: true });
        updateHeaderTone();
    }

    function initialize() {
        sidebarElements = {
            sidebar: requireNode('docsSidebar'),
            toggle: requireNode('docsSidebarToggle'),
            backdrop: requireNode('docsSidebarBackdrop')
        };
        bindEvents();
        bindHeaderTone();
    }

    global.sharedDocsSidebar = {
        init: initialize,
        open: openSidebar,
        close: closeSidebar
    };

})(window);
