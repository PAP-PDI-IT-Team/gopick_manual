(function (global) {
    'use strict';

    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    var HEADING_SELECTOR = 'h2, h3, h4, h5, h6';
    var LINK_ICON_PATHS = [
        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
        'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
    ];

    function createLinkIcon() {
        var icon = document.createElementNS(SVG_NAMESPACE, 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        icon.setAttribute('aria-hidden', 'true');
        LINK_ICON_PATHS.forEach(function (pathData) {
            var iconPath = document.createElementNS(SVG_NAMESPACE, 'path');
            iconPath.setAttribute('d', pathData);
            icon.appendChild(iconPath);
        });
        return icon;
    }

    function flattenSections(sections) {
        return sections.reduce(function (allSections, section) {
            allSections.push(section);
            return allSections.concat(flattenSections(section.children || []));
        }, []);
    }

    function findOwnHeading(sectionElement) {
        if (sectionElement.matches(HEADING_SELECTOR)) return sectionElement;
        var headings = Array.prototype.slice.call(sectionElement.querySelectorAll(HEADING_SELECTOR));
        return headings.find(function (heading) {
            return heading.parentElement.closest('[id]') === sectionElement;
        }) || null;
    }

    function createAnchor(section) {
        var anchor = document.createElement('a');
        anchor.className = 'docs-heading-anchor';
        anchor.href = '#' + section.id;
        anchor.setAttribute('aria-label', 'Link to ' + section.title);
        anchor.appendChild(createLinkIcon());
        return anchor;
    }

    function isRendered(section) {
        return document.getElementById(section.id) !== null;
    }

    function addAnchor(section) {
        var sectionElement = document.getElementById(section.id);
        var heading = findOwnHeading(sectionElement);
        if (!heading) throw new Error('docsHeadingAnchors: #' + section.id + ' has no heading');
        heading.classList.add('docs-anchored-heading');
        heading.appendChild(createAnchor(section));
    }


    function init(sections) {
        if (!Array.isArray(sections)) throw new Error('docsHeadingAnchors: init needs the section tree');
        flattenSections(sections).filter(isRendered).forEach(addAnchor);
    }

    global.sharedDocsHeadingAnchors = {
        init: init
    };

})(window);
