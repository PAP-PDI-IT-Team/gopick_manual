(function (global) {
    'use strict';

    const CONTENT_SKELETON_ID = 'docsContentSkeleton';
    const NAVIGATION_REGION_IDS = ['docsNavGroups', 'docsTitleNav', 'docsPager'];
    const NAVIGATION_ERROR_TEXT = 'Navigation could not load. Reload the page.';

    function requireNode(nodeId) {
        const nodeElement = document.getElementById(nodeId);
        if (!nodeElement) throw new Error('docsSkeleton: missing #' + nodeId);
        return nodeElement;
    }

    function clearContent() {
        const skeleton = requireNode(CONTENT_SKELETON_ID);
        const pageBody = skeleton.parentElement;
        skeleton.remove();
        pageBody.removeAttribute('aria-busy');
    }

    function createErrorMessage() {
        const message = document.createElement('p');
        message.className = 'docs-skeleton-error';
        message.setAttribute('role', 'status');
        message.textContent = NAVIGATION_ERROR_TEXT;
        return message;
    }

    function showNavigationError() {
        NAVIGATION_REGION_IDS.forEach(regionId => {
            const region = requireNode(regionId);
            if (region.querySelector('.docs-skeleton')) region.replaceChildren(createErrorMessage());
        });
    }

    global.sharedDocsSkeleton = {
        clearContent: clearContent,
        showNavigationError: showNavigationError
    };
})(window);
