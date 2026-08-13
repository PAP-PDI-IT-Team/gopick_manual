(function () {
    'use strict';
    function initPage() { var year = document.getElementById('footerYearSpan'); if (year) year.textContent = new Date().getFullYear(); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage); else initPage();
})();
