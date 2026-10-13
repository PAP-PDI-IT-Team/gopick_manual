(function (global) {
    'use strict';

    function bindCta() {
        var cta = document.getElementById('heroCta');
        if (!cta) return;
        cta.addEventListener('click', function (e) {
            if (cta.getAttribute('href') && cta.getAttribute('href').startsWith('#')) return;
            e.preventDefault();
            var target = document.querySelector('#features');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function init() {
        bindCta();
    }

    global.sharedHero = {
        init: init
    };

})(window);
