(function (global) {
    'use strict';

    var RBAC_DATA = [
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


    var ROLE_NAMES = ['Super Admin (IT)', 'Super Admin (ASD)', 'Test Creator', 'API Access', 'Administrator', 'Distributor', 'Sub Distributor', 'Client Account', 'Sub Account', 'Self Registration'];

    function getPermClass(permValue) {
        var upperVal = (permValue || '').toUpperCase().trim();
        if (upperVal === 'X') return 'rbac-x';
        if (upperVal === 'C') return 'rbac-c';
        if (upperVal === 'N') return 'rbac-n';
        return 'rbac-dash';
    }

    function getPermDisplay(permValue) {
        var upperVal = (permValue || '').toUpperCase().trim();
        if (upperVal === '-' || upperVal === '') return '-';
        return permValue;
    }

    function populateRbacTable() {
        var tableBody = document.getElementById('rbacTableBody');
        if (!tableBody) return;
        tableBody.innerHTML = '';

        RBAC_DATA.forEach(function (rowData, rowIndex) {
            var tableRow = document.createElement('tr');
            tableRow.className = rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50';

            var funcCell = document.createElement('td');
            funcCell.className = 'px-3 py-2.5 font-medium text-slate-700 sticky left-0 ' + (rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50');
            funcCell.textContent = rowData.func;
            tableRow.appendChild(funcCell);

            var crudCell = document.createElement('td');
            crudCell.className = 'px-3 py-2.5 text-slate-500';
            crudCell.textContent = rowData.crud;
            tableRow.appendChild(crudCell);

            var limitCell = document.createElement('td');
            limitCell.className = 'px-3 py-2.5 text-slate-400 text-xs';
            limitCell.textContent = rowData.limit;
            tableRow.appendChild(limitCell);

            var scopeCell = document.createElement('td');
            scopeCell.className = 'px-3 py-2.5 text-slate-400 text-xs';
            scopeCell.textContent = rowData.scope;
            tableRow.appendChild(scopeCell);

            rowData.perms.forEach(function (permValue) {
                var permCell = document.createElement('td');
                permCell.className = 'px-3 py-2.5 text-center ' + getPermClass(permValue);
                permCell.textContent = getPermDisplay(permValue);
                tableRow.appendChild(permCell);
            });

            tableBody.appendChild(tableRow);
        });
    }

    function generateRoleCapabilities() {
        var capabilitiesContainer = document.getElementById('roleCapabilities');
        if (!capabilitiesContainer) return;
        capabilitiesContainer.innerHTML = '';

        ROLE_NAMES.forEach(function (roleName, roleIndex) {
            var availableList = [];
            var conditionalList = [];

            RBAC_DATA.forEach(function (rowData) {
                var permValue = (rowData.perms[roleIndex] || '').toUpperCase().trim();
                if (permValue === 'X') availableList.push(rowData.func);
                if (permValue === 'C') conditionalList.push(rowData.func);
            });

            var cardElement = document.createElement('article');
            cardElement.className = 'bg-slate-50 rounded-lg p-4 border border-slate-100';

            var headerHtml = '<div class="flex items-center justify-between mb-3">' +
                '<h3 class="text-sm font-bold text-slate-800">' + roleName + '</h3>' +
                '<span class="text-xs text-slate-400">' + availableList.length + ' avail · ' + conditionalList.length + ' cond</span>' +
                '</div>';

            var availableHtml = '<h4 class="text-xs font-semibold text-emerald-700 mb-1">Available</h4><ul class="text-xs text-slate-600 space-y-0.5 mb-3">';
            if (availableList.length === 0) {
                availableHtml += '<li class="text-slate-300">-</li>';
            } else {
                availableList.forEach(function (funcName) {
                    availableHtml += '<li>• ' + funcName + '</li>';
                });
            }
            availableHtml += '</ul>';

            var conditionalHtml = '<h4 class="text-xs font-semibold text-amber-700 mb-1">Conditional</h4><ul class="text-xs text-slate-600 space-y-0.5">';
            if (conditionalList.length === 0) {
                conditionalHtml += '<li class="text-slate-300">-</li>';
            } else {
                conditionalList.forEach(function (funcName) {
                    conditionalHtml += '<li>• ' + funcName + '</li>';
                });
            }
            conditionalHtml += '</ul>';

            cardElement.innerHTML = headerHtml + availableHtml + conditionalHtml;
            capabilitiesContainer.appendChild(cardElement);
        });
    }

    function setFooterYear() {
        var yearSpan = document.getElementById('footerYearSpan');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initAccountsPage() {
        populateRbacTable();
        generateRoleCapabilities();
        setFooterYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccountsPage);
    } else {
        initAccountsPage();
    }

    global.accountsBehavior = {
        initBehavior: initAccountsPage
    };

})(window);
