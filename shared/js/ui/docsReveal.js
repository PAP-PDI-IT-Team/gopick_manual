(function (global) {
    'use strict';

    var STAGGER_STEP_MS = 70;
    var STAGGER_LIMIT = 6;

    function getPrefersReducedMotion() {
        return global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function prepareParts(parts) {
        parts.forEach(function (part, partIndex) {
            part.classList.add('reveal-item', 'reveal-pending');
            part.style.transitionDelay = (Math.min(partIndex, STAGGER_LIMIT) * STAGGER_STEP_MS) + 'ms';
        });
    }

    function revealParts(parts) {
        parts.forEach(function (part) {
            part.classList.remove('reveal-pending');
        });
    }

    function init(sectionSelector) {
        if (!sectionSelector) throw new Error('docsReveal: init needs a section selector');
        var sections = Array.prototype.slice.call(document.querySelectorAll(sectionSelector));
        if (getPrefersReducedMotion() || !('IntersectionObserver' in global)) return;

        var partsBySection = new Map();
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                revealParts(partsBySection.get(entry.target));
                sectionObserver.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

        sections.forEach(function (section) {
            var parts = Array.prototype.slice.call(section.children);
            partsBySection.set(section, parts);
            prepareParts(parts);
            sectionObserver.observe(section);
        });
    }

    global.sharedDocsReveal = {
        init: init
    };

})(window);
