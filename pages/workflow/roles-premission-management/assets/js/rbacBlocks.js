(function (global) {
    'use strict';

    const RBAC_ROWS = [
        { func: 'Create Super Admin (IT)', crud: 'Create', limit: '', scope: '', perms: ['X', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
        { func: 'Create Super Admin (ASD)', crud: 'Create', limit: '', scope: '', perms: ['X', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
        { func: 'Create Test Creator', crud: 'Create', limit: '', scope: '', perms: ['X', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
        { func: 'Create API Access', crud: 'Create', limit: '', scope: '', perms: ['X', '-', '-', '-', '-', '-', '-', '-', '-', '-'] },
        { func: 'Create Administrator', crud: 'Create', limit: '', scope: '', perms: ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '-'] },
        { func: 'Create Distributor', crud: 'Create', limit: '', scope: '', perms: ['X', '-', 'X', 'X', '-', '-', '-', '-', '-', '-'] },
        { func: 'Create Sub Distributor', crud: 'Create', limit: 'Requires Distributor as Parent', scope: '', perms: ['X', 'X', 'X', 'X', 'X', 'X', '-', '-', '-', '-'] },
        { func: 'Create Client Account', crud: 'Create', limit: 'Requires Sub Distributor as Parent', scope: '', perms: ['X', 'X', 'X', 'X', 'X', 'X', 'X', '-', '-', '-'] },
        { func: 'Create Sub Account', crud: 'Create', limit: 'Requires Client as Parent', scope: '', perms: ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '-', '-'] },
        { func: 'Create Self Registration', crud: 'Create', limit: 'Requires Distributor, Sub Distributor or Client as Parent', scope: '', perms: ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '-', '-'] },
        { func: 'Update Personal Account (Distributor, Sub-Distributor, Client, Sub Client, Self Registered)', crud: 'Update', limit: '', scope: 'Allowed Changes: name of organization, contact person, email, number, password, country, business address and billing address', perms: ['N', 'N', 'N', 'N', 'N', 'X', 'X', 'X', 'X', '-'] },
        { func: 'Update Personal User (Super Admin, Admin, Test Creator, API Access)', crud: 'Update', limit: 'Exclude: Status, User Type', scope: 'Allowed Changes: Password, Username, Email', perms: ['X', '', '', '', '', 'N', 'N', 'N', 'N', 'N'] },
        { func: 'Update Children Accounts (Parent: Account/User)', crud: 'Update', limit: 'Exclude: Username, Account Type, Parent Account', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Content Manager Module: Privacy Consent', crud: 'Update', limit: 'modContentManager-actionIndex > Privacy Consent', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Content Manager Module: Demographics', crud: 'Update', limit: 'modContentManager-actionDemographics > Demographics Page Setup', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Content Manager Module: Assessment Completion Page', crud: 'Update', limit: 'modContentManager-actionFinishPage > Exam Finish Page Setup', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Content Manager Module: Assessment Center Logo', crud: 'Update', limit: 'modContentManager-actionUploadLogoPage > Upload Logo Page', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Content Manager Module: Unblock Account', crud: 'Update', limit: 'modUsers-actionUnblock > Unblock Account', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] },
        { func: 'Assessment-Schedule Module: Update Assessment of Child Users', crud: 'Update', limit: 'modAssessmentSchedule-actionCreate', scope: '', perms: ['C', '', '', '', '', 'C', 'C', 'C', 'C', '-'] }
    ];

    const ROLE_NAMES = ['Super Admin (IT)', 'Super Admin (ASD)', 'Test Creator', 'API Access', 'Administrator', 'Distributor', 'Sub Distributor', 'Client Account', 'Sub Account', 'Self Registration'];

    const PERMISSION_TONES = {
        X: 'available',
        C: 'conditional',
        N: 'not-applicable'
    };

    function appendText(parent, tagName, className, textValue) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        element.textContent = textValue;
        parent.appendChild(element);
        return element;
    }

    function normalizePermission(permissionValue) {
        return String(permissionValue || '').toUpperCase().trim();
    }

    function getPermissionTone(permissionValue) {
        return PERMISSION_TONES[normalizePermission(permissionValue)] || 'unavailable';
    }

    function createScrollRegion(label, content) {
        const region = document.createElement('div');
        region.className = 'rbac-scroll';
        region.tabIndex = 0;
        region.setAttribute('role', 'region');
        region.setAttribute('aria-label', label);
        region.appendChild(content);
        return region;
    }


    function createLegend(section, content) {
        const list = document.createElement('dl');
        list.className = 'rbac-legend';
        content.legends.forEach(legendEntry => {
            const entry = document.createElement('div');
            entry.className = 'rbac-legend__entry';
            appendText(entry, 'dt', 'rbac-symbol rbac-symbol--' + getPermissionTone(legendEntry.sym), legendEntry.sym);
            appendText(entry, 'dd', 'rbac-legend__label', legendEntry.label);
            list.appendChild(entry);
        });
        return list;
    }

    function createMatrixHead() {
        const tableHead = document.createElement('thead');
        const headRow = document.createElement('tr');
        ['Function', 'CRUD', 'Limitations', 'Scope'].concat(ROLE_NAMES).forEach((columnName, columnIndex) => {
            const headerCell = appendText(headRow, 'th', columnIndex >= 4 ? 'rbac-table__role' : '', columnName);
            headerCell.scope = 'col';
        });
        tableHead.appendChild(headRow);
        return tableHead;
    }

    function createMatrixRow(rowData) {
        const tableRow = document.createElement('tr');
        const functionCell = appendText(tableRow, 'th', 'rbac-table__function', rowData.func);
        functionCell.scope = 'row';
        appendText(tableRow, 'td', '', rowData.crud);
        appendText(tableRow, 'td', 'rbac-table__note', rowData.limit);
        appendText(tableRow, 'td', 'rbac-table__note', rowData.scope);
        rowData.perms.forEach(permissionValue => {
            const permissionCell = document.createElement('td');
            permissionCell.className = 'rbac-table__permission';
            const symbolText = normalizePermission(permissionValue) || '-';
            appendText(permissionCell, 'span', 'rbac-symbol rbac-symbol--' + getPermissionTone(permissionValue), symbolText);
            tableRow.appendChild(permissionCell);
        });
        return tableRow;
    }

    function createMatrix() {
        const table = document.createElement('table');
        table.className = 'rbac-table';
        table.appendChild(createMatrixHead());
        const tableBody = document.createElement('tbody');
        RBAC_ROWS.forEach(rowData => tableBody.appendChild(createMatrixRow(rowData)));
        table.appendChild(tableBody);
        return createScrollRegion('RBAC matrix', table);
    }

    function createHierarchy(section, content) {
        const hierarchy = document.createElement('pre');
        hierarchy.className = 'rbac-hierarchy';
        hierarchy.tabIndex = 0;
        hierarchy.setAttribute('aria-label', 'Account hierarchy tree');
        hierarchy.textContent = content.hierarchyLines.join('\n');
        return hierarchy;
    }

    function collectRoleFunctions(roleIndex, permissionValue) {
        return RBAC_ROWS
            .filter(rowData => normalizePermission(rowData.perms[roleIndex]) === permissionValue)
            .map(rowData => rowData.func);
    }

    function createFunctionList(functionNames) {
        const list = document.createElement('ul');
        list.className = 'rbac-capabilities__list';
        if (!functionNames.length) {
            appendText(list, 'li', 'rbac-capabilities__empty', 'None');
            return list;
        }
        functionNames.forEach(functionName => appendText(list, 'li', '', functionName));
        return list;
    }

    function createCapabilities() {
        const table = document.createElement('table');
        table.className = 'rbac-capabilities';
        const tableHead = document.createElement('thead');
        const headRow = document.createElement('tr');
        ['Role', 'Available', 'Conditional'].forEach(columnName => {
            appendText(headRow, 'th', '', columnName).scope = 'col';
        });
        tableHead.appendChild(headRow);
        table.appendChild(tableHead);

        const tableBody = document.createElement('tbody');
        ROLE_NAMES.forEach((roleName, roleIndex) => {
            const tableRow = document.createElement('tr');
            appendText(tableRow, 'th', 'rbac-capabilities__role', roleName).scope = 'row';
            [collectRoleFunctions(roleIndex, 'X'), collectRoleFunctions(roleIndex, 'C')].forEach(functionNames => {
                const listCell = document.createElement('td');
                listCell.appendChild(createFunctionList(functionNames));
                tableRow.appendChild(listCell);
            });
            tableBody.appendChild(tableRow);
        });
        table.appendChild(tableBody);
        return createScrollRegion('Role capabilities', table);
    }

    global.RolesPermissionBlocks = {
        legend: createLegend,
        'rbac-matrix': createMatrix,
        hierarchy: createHierarchy,
        roles: createCapabilities
    };
})(window);
