(function (global) {
    'use strict';

    var REQUIRED_MODULES = ['sharedDocsSidebar', 'sharedDataLoader', 'sharedDocsPageTree'];

    function assertModulesLoaded() {
        REQUIRED_MODULES.forEach(function (moduleName) {
            if (!global[moduleName]) throw new Error('docsPageShell: ' + moduleName + ' is not loaded');
        });
    }

    function init() {
        assertModulesLoaded();
        global.sharedDocsSidebar.init();
        return global.sharedDataLoader.init().then(function (data) {
            global.sharedDocsPageTree.init(data);
        });
    }

    global.sharedDocsPageShell = {
        init: init
    };

})(window);
