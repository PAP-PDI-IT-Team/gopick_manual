(function (global) {
    'use strict';

    function boot() {
        if (!global.sharedDataLoader) return console.error('sharedDataLoader missing');
        global.sharedDataLoader.init()
            .then(function (data) {
                if (global.sharedContentBinder && typeof global.sharedContentBinder.init === 'function') {
                    global.sharedContentBinder.init(data);
                }
                if (global.sharedNav && typeof global.sharedNav.init === 'function') global.sharedNav.init();
                if (global.sharedReveal && typeof global.sharedReveal.init === 'function') global.sharedReveal.init();
                if (global.sharedHero && typeof global.sharedHero.init === 'function') global.sharedHero.init();
            })
            .catch(function (err) {
                console.error('Error booting shared modules:', err);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})(window);
