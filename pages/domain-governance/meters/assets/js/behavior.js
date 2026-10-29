(function (global) {
    'use strict';

    if (!global.MetersGovernanceBlocks) throw new Error('Meters governance: governanceBlocks.js must load before behavior.js');

    global.sharedDocsBlockPage.start({
        contentKey: '__metersGovernanceContent',
        blockBuilders: global.MetersGovernanceBlocks
    });
})(window);
