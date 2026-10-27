(function (global) {
    'use strict';

    function requireNode(nodeId) {
        var node = document.getElementById(nodeId);
        if (!node) throw new Error('docsPageTree: missing #' + nodeId);
        return node;
    }

    function requireBodyData(key) {
        var value = document.body.dataset[key];
        if (value === undefined) throw new Error('docsPageTree: <body> needs data-' + key.replace(/[A-Z]/g, function (letter) { return '-' + letter.toLowerCase(); }));
        return value;
    }

    function createElement(tagName, className, text) {
        var element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }


    function flattenPages(groups) {
        var pages = [];
        groups.forEach(function (group) {
            group.items.forEach(function (item) {
                pages.push({ label: item.label, url: item.url, groupTitle: group.title });
            });
        });
        return pages;
    }

    function findCurrentIndex(pages, currentUrl) {
        var currentIndex = pages.findIndex(function (page) { return page.url === currentUrl; });
        if (currentIndex === -1) throw new Error('docsPageTree: ' + currentUrl + ' is not listed in docsNav');
        return currentIndex;
    }


    function createTreeLink(item, siteRoot, currentUrl) {
        var listItem = document.createElement('li');
        var link = createElement('a', 'docs-nav-group__link', item.label);
        link.href = siteRoot + item.url;
        if (item.url === currentUrl) link.setAttribute('aria-current', 'page');
        listItem.appendChild(link);
        return listItem;
    }

    function createTreeFolder(group, siteRoot, currentUrl) {
        var folder = createElement('details', 'docs-nav-folder');
        var summary = createElement('summary', 'docs-nav-folder__title', group.title);
        var list = createElement('ul', 'docs-nav-group__list');
        folder.open = group.items.some(function (item) { return item.url === currentUrl; });
        group.items.forEach(function (item) {
            list.appendChild(createTreeLink(item, siteRoot, currentUrl));
        });
        folder.appendChild(summary);
        folder.appendChild(list);
        return folder;
    }

    function renderTree(groups, siteRoot, currentUrl) {
        var groupsNode = requireNode('docsNavGroups');
        groupsNode.replaceChildren();
        groups.forEach(function (group) {
            groupsNode.appendChild(createTreeFolder(group, siteRoot, currentUrl));
        });
    }


    function renderBreadcrumb(currentPage) {
        var listNode = requireNode('docsBreadcrumb');
        var groupItem = createElement('li', 'docs-breadcrumb__item', currentPage.groupTitle);
        var pageItem = createElement('li', 'docs-breadcrumb__item', currentPage.label);
        pageItem.setAttribute('aria-current', 'page');
        listNode.replaceChildren(groupItem, pageItem);
    }


    function createPagerLink(page, direction, siteRoot) {
        var link = createElement('a', 'docs-pager__link docs-pager__link--' + direction);
        link.href = siteRoot + page.url;
        link.rel = direction === 'previous' ? 'prev' : 'next';
        link.appendChild(createElement('span', 'docs-pager__direction', direction === 'previous' ? 'Previous' : 'Next'));
        link.appendChild(createElement('span', 'docs-pager__title', page.label));
        return link;
    }

    function renderPager(pages, currentIndex, siteRoot) {
        var pagerNode = requireNode('docsPager');
        var links = [];
        if (currentIndex > 0) links.push(createPagerLink(pages[currentIndex - 1], 'previous', siteRoot));
        if (currentIndex < pages.length - 1) links.push(createPagerLink(pages[currentIndex + 1], 'next', siteRoot));
        pagerNode.replaceChildren.apply(pagerNode, links);
    }


    function init(data) {
        if (!data || !Array.isArray(data.docsNav)) throw new Error('docsPageTree: data.docsNav is missing');
        var siteRoot = requireBodyData('siteRoot');
        var currentUrl = requireBodyData('pageUrl');
        var pages = flattenPages(data.docsNav);
        var currentIndex = findCurrentIndex(pages, currentUrl);

        renderTree(data.docsNav, siteRoot, currentUrl);
        renderBreadcrumb(pages[currentIndex]);
        renderPager(pages, currentIndex, siteRoot);
    }

    global.sharedDocsPageTree = {
        init: init
    };

})(window);
