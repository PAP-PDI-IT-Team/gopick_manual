(function (global) {
    'use strict';

    if (!global.tailwind) {
        throw new Error('Tailwind must load before its configuration.');
    }

    global.tailwind.config = {
        theme: {
            extend: {
                colors: {
                    brand: { DEFAULT: '#e50914', light: '#ff2d38', dark: '#b3060f' }
                }
            }
        }
    };
})(window);
