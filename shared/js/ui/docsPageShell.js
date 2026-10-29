(function (global) {
    'use strict';

    var REQUIRED_MODULES = ['sharedDocsSidebar', 'sharedDataLoader', 'sharedDocsPageTree', 'sharedHeaderSearch', 'sharedDocsCopyPage'];

    function assertModulesLoaded() {
        REQUIRED_MODULES.forEach(function (moduleName) {
            if (!global[moduleName]) throw new Error('docsPageShell: ' + moduleName + ' is not loaded');
        });
    }

    function init() {
        assertModulesLoaded();
        global.sharedDocsSidebar.init();
        global.sharedDocsCopyPage.init();
        return global.sharedDataLoader.init().then(function (data) {
            global.sharedDocsPageTree.init(data);
        });
    }

    global.sharedDocsPageShell = {
        init: init
    };

})(window);
