(function (global) {
    'use strict';

    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var ARROW_PATHS = {
        previous: 'M15 6l-6 6 6 6',
        next: 'M9 6l6 6-6 6'
    };

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

    function createArrowIcon(direction) {
        var icon = document.createElementNS(SVG_NAMESPACE, 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        icon.setAttribute('aria-hidden', 'true');
        var iconPath = document.createElementNS(SVG_NAMESPACE, 'path');
        iconPath.setAttribute('d', ARROW_PATHS[direction]);
        icon.appendChild(iconPath);
        return icon;
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

    function getNeighbourPages(pages, currentIndex) {
        return {
            previous: currentIndex > 0 ? pages[currentIndex - 1] : null,
            next: currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null
        };
    }


    function createTreeLink(item, siteRoot, currentUrl) {
        var listItem = document.createElement('li');
        var link = createElement('a', 'docs-nav-group__link', item.label);
        link.href = siteRoot + item.url;
        if (item.url === currentUrl) link.setAttribute('aria-current', 'page');
        listItem.appendChild(link);
        return listItem;
    }

    function createTreeGroup(group, siteRoot, currentUrl) {
        var groupNode = createElement('div', 'docs-nav-group');
        var titleNode = createElement('p', 'docs-nav-group__title', group.title);
        var list = createElement('ul', 'docs-nav-group__list');
        titleNode.id = 'docs-nav-group-' + group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        list.setAttribute('aria-labelledby', titleNode.id);
        group.items.forEach(function (item) {
            list.appendChild(createTreeLink(item, siteRoot, currentUrl));
        });
        groupNode.appendChild(titleNode);
        groupNode.appendChild(list);
        return groupNode;
    }

    function renderTree(groups, siteRoot, currentUrl) {
        var groupsNode = requireNode('docsNavGroups');
        groupsNode.replaceChildren();
        groups.forEach(function (group) {
            groupsNode.appendChild(createTreeGroup(group, siteRoot, currentUrl));
        });
    }


    function createTitleNavLink(page, direction, siteRoot) {
        var directionLabel = direction === 'previous' ? 'Previous page: ' : 'Next page: ';
        var link = createElement('a', 'docs-title-nav__link');
        link.href = siteRoot + page.url;
        link.rel = direction === 'previous' ? 'prev' : 'next';
        link.setAttribute('aria-label', directionLabel + page.label);
        link.title = page.label;
        link.appendChild(createArrowIcon(direction));
        return link;
    }

    function renderTitleNav(neighbourPages, siteRoot) {
        var titleNavNode = requireNode('docsTitleNav');
        var links = [];
        if (neighbourPages.previous) links.push(createTitleNavLink(neighbourPages.previous, 'previous', siteRoot));
        if (neighbourPages.next) links.push(createTitleNavLink(neighbourPages.next, 'next', siteRoot));
        titleNavNode.replaceChildren.apply(titleNavNode, links);
    }


    function createPagerLink(page, direction, siteRoot) {
        if (!global.sharedDocsComponents) throw new Error('docsPageTree: docsComponents.js is not loaded');
        var isPrevious = direction === 'previous';
        var link = createElement('a', 'docs-pager__link docs-pager__link--' + direction);
        link.href = siteRoot + page.url;
        link.rel = isPrevious ? 'prev' : 'next';
        var arrow = global.sharedDocsComponents.createIcon(isPrevious ? 'arrowLeft' : 'arrowRight');
        var directionLabel = createElement('span', 'docs-visually-hidden', isPrevious ? 'Previous page: ' : 'Next page: ');
        var title = createElement('span', 'docs-pager__title', page.label);
        if (isPrevious) link.appendChild(arrow);
        link.appendChild(directionLabel);
        link.appendChild(title);
        if (!isPrevious) link.appendChild(arrow);
        return link;
    }

    function renderPager(neighbourPages, siteRoot) {
        var pagerNode = requireNode('docsPager');
        var links = [];
        if (neighbourPages.previous) links.push(createPagerLink(neighbourPages.previous, 'previous', siteRoot));
        if (neighbourPages.next) links.push(createPagerLink(neighbourPages.next, 'next', siteRoot));
        pagerNode.replaceChildren.apply(pagerNode, links);
    }


    function init(data) {
        if (!data || !Array.isArray(data.docsNav)) throw new Error('docsPageTree: data.docsNav is missing');
        var siteRoot = requireBodyData('siteRoot');
        var currentUrl = requireBodyData('pageUrl');
        var pages = flattenPages(data.docsNav);
        var neighbourPages = getNeighbourPages(pages, findCurrentIndex(pages, currentUrl));

        renderTree(data.docsNav, siteRoot, currentUrl);
        renderTitleNav(neighbourPages, siteRoot);
        renderPager(neighbourPages, siteRoot);
    }

    global.sharedDocsPageTree = {
        init: init
    };

})(window);
