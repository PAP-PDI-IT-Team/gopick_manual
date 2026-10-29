(function (global) {
    'use strict';

    var REQUIRED_MODULES = ['sharedDocsSidebar', 'sharedDataLoader', 'sharedDocsPageTree', 'sharedHeaderSearch', 'sharedDocsCopyPage', 'sharedDocsSkeleton'];

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
        }).catch(function (error) {
            global.sharedDocsSkeleton.showNavigationError();
            throw error;
        });
    }

    global.sharedDocsPageShell = {
        init: init
    };

})(window);
