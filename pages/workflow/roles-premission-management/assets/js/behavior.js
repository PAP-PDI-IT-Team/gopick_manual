(function (global) {
    'use strict';

    if (!global.RolesPermissionBlocks) throw new Error('Roles and permissions: rbacBlocks.js must load before behavior.js');

    global.sharedDocsBlockPage.start({
        contentKey: '__rolesPermissionContent',
        imageRenderer: global.GoPickImageRenderer,
        sectionBuilders: global.RolesPermissionBlocks
    });
})(window);
