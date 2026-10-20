(function (global) {
    'use strict';

    function toggleNav() {
        const nav = document.getElementById('mainNav');
        if (!nav) return;
        const list = nav.querySelector('.site-nav__list');
        if (!list) return;
        list.classList.toggle('hidden');
    }

    function bindNavInteractions() {
        const toggle = document.getElementById('navToggle');
        if (!toggle) return;
        toggle.addEventListener('click', toggleNav);
    }

    function revealElementWithTransition(el) {
        if (!el) return;
        el.classList.remove('opacity-0', 'translate-y-3');
        el.classList.add('opacity-100', 'translate-y-0', 'transition', 'duration-200', 'ease-out');
    }

    function runIntroAnimation() {
        const selectors = ['#hero .hero__content', '#features', '#about', '#contact'];
        selectors.forEach(function (sel, index) {
            const el = document.querySelector(sel);
            if (!el) return;
            setTimeout(function () {
                revealElementWithTransition(el);
            }, 120 * index);
        });
    }

    function setupScrollReveal() {
        if (!('IntersectionObserver' in window)) return;
        const revealNodes = document.querySelectorAll('.features__item, .about, .contact');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    revealElementWithTransition(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealNodes.forEach(function (n) { observer.observe(n); });
    }

    function initBehavior() {
        bindNavInteractions();
        runIntroAnimation();
        setupScrollReveal();
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (global.gopickDataLayer && typeof global.gopickDataLayer.init === 'function') {
            global.gopickDataLayer.init();
        }
        initBehavior();
    });

    global.gopickBehavior = {
        initBehavior: initBehavior,
        toggleNav: toggleNav
    };

})(window);
