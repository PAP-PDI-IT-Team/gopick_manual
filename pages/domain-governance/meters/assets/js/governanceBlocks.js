(function (global) {
    'use strict';

    const DEEPEST_HIERARCHY_LEVEL = 4;

    function createHierarchyList(hierarchyLevels) {
        const listElement = document.createElement('ol');
        listElement.className = 'governance-hierarchy';
        hierarchyLevels.forEach(hierarchyLevel => {
            const levelItem = document.createElement('li');
            const depth = Math.min(hierarchyLevel.level || 0, DEEPEST_HIERARCHY_LEVEL);
            levelItem.className = 'governance-hierarchy__item governance-hierarchy__item--level-' + depth;
            levelItem.textContent = hierarchyLevel.name;
            listElement.appendChild(levelItem);
        });
        return listElement;
    }

    function createResolutionMatrix(matrixData) {
        if (!global.DocsResolutionMatrix) throw new Error('governanceBlocks: docsResolutionMatrix.js is not loaded');
        return global.DocsResolutionMatrix.render(matrixData);
    }

    global.MetersGovernanceBlocks = {
        hierarchyLevels: createHierarchyList,
        matrix: createResolutionMatrix
    };
})(window);
