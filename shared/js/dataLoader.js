(function (global) {
    'use strict';

    var _data = null;
    var DATA_VERSION = '20261028-docs-nav';

    function getDataUrl() {
        var dataUrl = document.body.dataset.dataUrl;
        if (!dataUrl) throw new Error('dataLoader: <body> needs a data-data-url attribute');
        return dataUrl;
    }

    function initialize() {
        return fetch(getDataUrl() + '?v=' + DATA_VERSION, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) throw new Error('Data fetch failed: ' + response.status);
                return response.json();
            })
            .then(function (jsonValue) {
                _data = jsonValue;
                return _data;
            });
    }

    function getData() {
        return _data;
    }

    global.sharedDataLoader = {
        init: initialize,
        getData: getData
    };
})(window);
