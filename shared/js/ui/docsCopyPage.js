(function (global) {
    'use strict';

    var STATUS_RESET_MS = 2000;
    var STATUS_TEXT = {
        idle: 'Copy page',
        copying: 'Copying',
        copied: 'Copied',
        failed: 'Copy failed'
    };

    function requireNode(nodeId) {
        var node = document.getElementById(nodeId);
        if (!node) throw new Error('docsCopyPage: missing #' + nodeId);
        return node;
    }

    function getMarkdownUrls() {
        if (!global.sharedHeaderSearch) throw new Error('docsCopyPage: headerSearch.js is not loaded');
        var markdownUrls = global.sharedHeaderSearch.getMarkdownUrls(location.pathname);
        if (!markdownUrls.length) throw new Error('docsCopyPage: no Markdown source is listed for ' + location.pathname);
        return markdownUrls;
    }

    function fetchMarkdown(markdownUrl) {
        return fetch(markdownUrl, { cache: 'no-store' }).then(function (response) {
            if (!response.ok) throw new Error('docsCopyPage: failed to load ' + markdownUrl);
            return response.text();
        });
    }

    function readPageMarkdown(markdownUrls) {
        return Promise.all(markdownUrls.map(fetchMarkdown)).then(function (documents) {
            return documents.map(function (documentText) { return documentText.trim(); }).join('\n\n');
        });
    }


    function setStatus(button, statusKey) {
        button.querySelector('.docs-copy-page__label').textContent = STATUS_TEXT[statusKey];
        button.dataset.status = statusKey;
    }

    function scheduleStatusReset(button) {
        global.clearTimeout(button.statusResetTimer);
        button.statusResetTimer = global.setTimeout(function () {
            setStatus(button, 'idle');
        }, STATUS_RESET_MS);
    }

    function copyPage(button, markdownUrls) {
        setStatus(button, 'copying');
        return readPageMarkdown(markdownUrls)
            .then(function (markdown) {
                return navigator.clipboard.writeText(markdown);
            })
            .then(function () {
                setStatus(button, 'copied');
            })
            .catch(function (error) {
                setStatus(button, 'failed');
                console.error(error);
            })
            .then(function () {
                scheduleStatusReset(button);
            });
    }


    function init() {
        var button = requireNode('docsCopyPage');
        var markdownUrls = getMarkdownUrls();
        if (!navigator.clipboard) throw new Error('docsCopyPage: the Clipboard API is unavailable');
        button.addEventListener('click', function () {
            copyPage(button, markdownUrls);
        });
        setStatus(button, 'idle');
    }

    global.sharedDocsCopyPage = {
        init: init
    };

})(window);
