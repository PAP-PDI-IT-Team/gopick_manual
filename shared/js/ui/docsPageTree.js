(function (global) {
    'use strict';

    var PENDING_STATUS = 'in-progress';
    var PENDING_TOOLTIP = 'Documentation in progress';
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var ARROW_PATHS = {
        previous: 'M15 6l-6 6 6 6',
        next: 'M9 6l6 6-6 6'
    };

    function requireNode(nodeId) {
        var nodeElement = document.getElementById(nodeId);
        if (!nodeElement) throw new Error('docsPageTree: missing #' + nodeId);
        return nodeElement;
    }

    function requireBodyData(dataKey) {
        var value = document.body.dataset[dataKey];
        if (value === undefined) throw new Error('docsPageTree: <body> needs data-' + dataKey.replace(/[A-Z]/g, function (letter) { return '-' + letter.toLowerCase(); }));
        return value;
    }

    function createElement(tagName, className, textElement) {
        var element = document.createElement(tagName);
        if (className) element.className = className;
        if (textElement !== undefined) element.textContent = textElement;
        return element;
    }

    function createArrowIcon(direction) {
        var iconElement = document.createElementNS(SVG_NAMESPACE, 'svg');
        iconElement.setAttribute('viewBox', '0 0 24 24');
        iconElement.setAttribute('fill', 'none');
        iconElement.setAttribute('stroke', 'currentColor');
        iconElement.setAttribute('stroke-width', '2');
        iconElement.setAttribute('stroke-linecap', 'round');
        iconElement.setAttribute('stroke-linejoin', 'round');
        iconElement.setAttribute('aria-hidden', 'true');
        var iconPath = document.createElementNS(SVG_NAMESPACE, 'path');
        iconPath.setAttribute('d', ARROW_PATHS[direction]);
        iconElement.appendChild(iconPath);
        return iconElement;
    }


    function flattenPages(groups) {
        var pages = [];
        groups.forEach(function (group) {
            group.items.forEach(function (itemValue) {
                pages.push({ label: itemValue.label, url: itemValue.url, groupTitle: group.title, isPending: itemValue.status === PENDING_STATUS });
            });
        });
        return pages;
    }

    function findCurrentIndex(pages, currentUrl) {
        var currentIndex = pages.findIndex(function (pageEntry) { return pageEntry.url === currentUrl; });
        if (currentIndex === -1) throw new Error('docsPageTree: ' + currentUrl + ' is not listed in docsNav');
        return currentIndex;
    }

    function findReadyPage(pages, startIndex, stepSize) {
        for (var pageIndex = startIndex; pageIndex >= 0 && pageIndex < pages.length; pageIndex += stepSize) {
            if (!pages[pageIndex].isPending) return pages[pageIndex];
        }
        return null;
    }

    function getNeighbourPages(pages, currentIndex) {
        return {
            previous: findReadyPage(pages, currentIndex - 1, -1),
            next: findReadyPage(pages, currentIndex + 1, 1)
        };
    }


    function createPendingItem(itemValue) {
        var pendingElement = createElement('span', 'docs-nav-group__link docs-nav-group__link--pending');
        pendingElement.setAttribute('aria-disabled', 'true');
        pendingElement.tabIndex = 0;
        pendingElement.dataset.tooltip = PENDING_TOOLTIP;
        pendingElement.appendChild(createElement('span', '', itemValue.label));
        pendingElement.appendChild(createElement('span', 'docs-nav-group__badge', 'Soon'));
        pendingElement.appendChild(createElement('span', 'docs-visually-hidden', PENDING_TOOLTIP));
        return pendingElement;
    }

    function createTreeLink(itemValue, siteRoot, currentUrl) {
        var listItem = document.createElement('li');
        if (itemValue.status === PENDING_STATUS && itemValue.url !== currentUrl) {
            listItem.appendChild(createPendingItem(itemValue));
            return listItem;
        }
        var linkElement = createElement('a', 'docs-nav-group__link', itemValue.label);
        linkElement.href = siteRoot + itemValue.url;
        if (itemValue.url === currentUrl) linkElement.setAttribute('aria-current', 'page');
        listItem.appendChild(linkElement);
        return listItem;
    }

    function createTreeGroup(group, siteRoot, currentUrl) {
        var groupNode = createElement('div', 'docs-nav-group');
        var titleNode = createElement('p', 'docs-nav-group__title', group.title);
        var listElement = createElement('ul', 'docs-nav-group__list');
        titleNode.id = 'docs-nav-group-' + group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        listElement.setAttribute('aria-labelledby', titleNode.id);
        group.items.forEach(function (itemValue) {
            listElement.appendChild(createTreeLink(itemValue, siteRoot, currentUrl));
        });
        groupNode.appendChild(titleNode);
        groupNode.appendChild(listElement);
        return groupNode;
    }

    function renderTree(groups, siteRoot, currentUrl) {
        var groupsNode = requireNode('docsNavGroups');
        groupsNode.replaceChildren();
        groups.forEach(function (group) {
            groupsNode.appendChild(createTreeGroup(group, siteRoot, currentUrl));
        });
    }


    function createTitleNavLink(pageEntry, direction, siteRoot) {
        var directionLabel = direction === 'previous' ? 'Previous page: ' : 'Next page: ';
        var linkElement = createElement('a', 'docs-title-nav__link');
        linkElement.href = siteRoot + pageEntry.url;
        linkElement.rel = direction === 'previous' ? 'prev' : 'next';
        linkElement.setAttribute('aria-label', directionLabel + pageEntry.label);
        linkElement.title = pageEntry.label;
        linkElement.appendChild(createArrowIcon(direction));
        return linkElement;
    }

    function renderTitleNav(neighbourPages, siteRoot) {
        var titleNavNode = requireNode('docsTitleNav');
        var links = [];
        if (neighbourPages.previous) links.push(createTitleNavLink(neighbourPages.previous, 'previous', siteRoot));
        if (neighbourPages.next) links.push(createTitleNavLink(neighbourPages.next, 'next', siteRoot));
        titleNavNode.replaceChildren.apply(titleNavNode, links);
    }


    function createPagerLink(pageEntry, direction, siteRoot) {
        if (!global.sharedDocsComponents) throw new Error('docsPageTree: docsComponents.js is not loaded');
        var isPrevious = direction === 'previous';
        var linkElement = createElement('a', 'docs-pager__link docs-pager__link--' + direction);
        linkElement.href = siteRoot + pageEntry.url;
        linkElement.rel = isPrevious ? 'prev' : 'next';
        var arrow = global.sharedDocsComponents.createIcon(isPrevious ? 'arrowLeft' : 'arrowRight');
        var directionLabel = createElement('span', 'docs-visually-hidden', isPrevious ? 'Previous page: ' : 'Next page: ');
        var title = createElement('span', 'docs-pager__title', pageEntry.label);
        if (isPrevious) linkElement.appendChild(arrow);
        linkElement.appendChild(directionLabel);
        linkElement.appendChild(title);
        if (!isPrevious) linkElement.appendChild(arrow);
        return linkElement;
    }

    function renderPager(neighbourPages, siteRoot) {
        var pagerNode = requireNode('docsPager');
        var links = [];
        if (neighbourPages.previous) links.push(createPagerLink(neighbourPages.previous, 'previous', siteRoot));
        if (neighbourPages.next) links.push(createPagerLink(neighbourPages.next, 'next', siteRoot));
        pagerNode.replaceChildren.apply(pagerNode, links);
    }


    function initialize(pageData) {
        if (!pageData || !Array.isArray(pageData.docsNav)) throw new Error('docsPageTree: data.docsNav is missing');
        var siteRoot = requireBodyData('siteRoot');
        var currentUrl = requireBodyData('pageUrl');
        var pages = flattenPages(pageData.docsNav);
        var neighbourPages = getNeighbourPages(pages, findCurrentIndex(pages, currentUrl));

        renderTree(pageData.docsNav, siteRoot, currentUrl);
        renderTitleNav(neighbourPages, siteRoot);
        renderPager(neighbourPages, siteRoot);
    }

    global.sharedDocsPageTree = {
        init: initialize
    };

})(window);
