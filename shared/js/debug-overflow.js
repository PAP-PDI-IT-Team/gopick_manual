(function () {
    'use strict';
    function findOverflow() {
        var overs = [];
        document.querySelectorAll('*').forEach(function (el) {
            if (!(el instanceof HTMLElement)) return;
            var sw = el.scrollWidth;
            var cw = el.clientWidth;
            if (sw > cw + 1) {
                var sel = el.tagName.toLowerCase();
                if (el.id) sel += '#' + el.id;
                if (el.className) sel += '.' + el.className.toString().split(/\s+/).join('.');
                overs.push({ selector: sel, scrollWidth: sw, clientWidth: cw, el: el });
            }
        });
        if (overs.length) {
            console.group('Overflowing elements');
            overs.forEach(function (o, i) {
                console.log(i + 1 + ')', o.selector, 'scrollWidth:', o.scrollWidth, 'clientWidth:', o.clientWidth);
            });
            console.groupEnd();
            var first = overs[0].el;
            first.style.outline = '3px solid rgba(255,0,0,0.6)';
            first.scrollIntoView({ behavior: 'auto', block: 'center' });
        } else {
            console.log('No overflowing elements found');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', findOverflow);
    } else {
        findOverflow();
    }
})();
