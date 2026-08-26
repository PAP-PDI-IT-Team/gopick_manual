(function () {
    'use strict';

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initActivityLogPage() {
        setFooterYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initActivityLogPage);
    } else {
        initActivityLogPage();
    }
})();
