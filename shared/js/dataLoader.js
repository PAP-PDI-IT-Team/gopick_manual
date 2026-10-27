(function (global) {
    'use strict';

    var _data = null;
    var DATA_VERSION = '20261028-docs-nav';

    function getDataUrl() {
        var dataUrl = document.body.dataset.dataUrl;
        if (!dataUrl) throw new Error('dataLoader: <body> needs a data-data-url attribute');
        return dataUrl;
    }

    function init() {
        return fetch(getDataUrl() + '?v=' + DATA_VERSION, { cache: 'no-store' })
            .then(function (res) {
                if (!res.ok) throw new Error('Data fetch failed: ' + res.status);
                return res.json();
            })
            .then(function (json) {
                _data = json;
                return _data;
            });
    }

    function getData() {
        return _data;
    }

    global.sharedDataLoader = {
        init: init,
        getData: getData
    };
})(window);
