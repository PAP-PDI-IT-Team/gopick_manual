(function () {
    'use strict';

    var SIDEBAR_ACTIVATION_OFFSET = 96;

    function getSidebarLinks() {
        var sidebarList = document.getElementById('docSidebarList');
        if (!sidebarList) {
            throw new Error('Assessment Management could not initialize because #docSidebarList is missing.');
        }

        return Array.prototype.slice.call(sidebarList.querySelectorAll('a[href^="#"]'));
    }

    function getLinkTargetId(link) {
        return link.getAttribute('href').slice(1);
    }

    function setActiveSidebarLink(activeId, sidebarLinks) {
        sidebarLinks.forEach(function (link) {
            link.classList.remove('active', 'text-brand', 'font-semibold');
        });

        var activeLink = sidebarLinks.find(function (link) {
            return getLinkTargetId(link) === activeId;
        });

        if (activeLink) {
            activeLink.classList.add('active', 'text-brand', 'font-semibold');
        }
    }

    function getVisibleSectionId(sidebarLinks) {
        var closestSectionId = null;
        var closestDistance = Number.POSITIVE_INFINITY;

        sidebarLinks.forEach(function (link) {
            var targetId = getLinkTargetId(link);
            var target = document.getElementById(targetId);
            if (!target) {
                throw new Error('Assessment Management sidebar target #' + targetId + ' is missing.');
            }

            var distance = Math.abs(target.getBoundingClientRect().top - SIDEBAR_ACTIVATION_OFFSET);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSectionId = targetId;
            }
        });

        return closestSectionId;
    }

    function setupSidebarVisibility() {
        var sidebarLinks = getSidebarLinks();

        function updateActiveLinkFromScroll() {
            var visibleSectionId = getVisibleSectionId(sidebarLinks);
            if (visibleSectionId) setActiveSidebarLink(visibleSectionId, sidebarLinks);
        }

        sidebarLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setActiveSidebarLink(getLinkTargetId(this), sidebarLinks);
            });
        });

        window.addEventListener('hashchange', function () {
            setTimeout(updateActiveLinkFromScroll, 50);
        });
        window.addEventListener('scroll', updateActiveLinkFromScroll, { passive: true });
        updateActiveLinkFromScroll();
    }

    function scrollToHashTarget() {
        var targetId = location.hash.slice(1);
        if (!targetId) return;

        var target = document.getElementById(targetId);
        if (!target) {
            throw new Error('Assessment Management hash target #' + targetId + ' is missing.');
        }

        setTimeout(function () {
            target.scrollIntoView({ block: 'start' });
            setActiveSidebarLink(targetId, getSidebarLinks());
        }, 0);
    }

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (!yearSpan) {
            throw new Error('Assessment Management could not initialize because #footerYearSpan is missing.');
        }
        yearSpan.textContent = new Date().getFullYear();
    }

    function initAssessmentPage() {
        setFooterYear();
        setupSidebarVisibility();
        scrollToHashTarget();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAssessmentPage);
    } else {
        initAssessmentPage();
    }
})();
