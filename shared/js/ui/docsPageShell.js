(function (global) {
    'use strict';

    var REQUIRED_MODULES = ['sharedDocsSidebar', 'sharedDataLoader', 'sharedDocsPageTree', 'sharedHeaderSearch', 'sharedDocsCopyPage', 'sharedDocsSkeleton'];

    function assertModulesLoaded() {
        REQUIRED_MODULES.forEach(function (moduleName) {
            if (!global[moduleName]) throw new Error('docsPageShell: ' + moduleName + ' is not loaded');
        });
    }

    function initialize() {
        assertModulesLoaded();
        global.sharedDocsSidebar.init();
        global.sharedDocsCopyPage.init();
        return global.sharedDataLoader.init().then(function (pageData) {
            global.sharedDocsPageTree.init(pageData);
        }).catch(function (error) {
            global.sharedDocsSkeleton.showNavigationError();
            throw error;
        });
    }

    global.sharedDocsPageShell = {
        init: initialize
    };

})(window);
