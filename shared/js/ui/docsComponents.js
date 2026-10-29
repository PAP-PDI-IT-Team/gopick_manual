(function (global) {
    'use strict';

    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    const ICON_PATHS = {
        rules: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
        warning: ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
        result: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4 12 14.01l-3-3'],
        notes: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'],
        arrowLeft: ['M19 12H5', 'M12 19l-7-7 7-7'],
        arrowRight: ['M5 12h14', 'M12 5l7 7-7 7']
    };

    const INPUT_KIND_PATTERN = /\b(required|optional|conditional|locked|defaulted|editable|calculated)\b/i;
    const INPUT_GROUP_PATTERN = /\b(inputs?|selection)\b/i;

    function appendText(parent, tagName, className, textValue) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        element.textContent = textValue;
        parent.appendChild(element);
        return element;
    }

    function createIcon(iconName) {
        const iconPaths = ICON_PATHS[iconName];
        if (!iconPaths) throw new Error('docsComponents: unknown icon ' + iconName);
        const icon = document.createElementNS(SVG_NAMESPACE, 'svg');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('class', 'docs-icon');
        iconPaths.forEach(pathData => {
            const iconPath = document.createElementNS(SVG_NAMESPACE, 'path');
            iconPath.setAttribute('d', pathData);
            icon.appendChild(iconPath);
        });
        return icon;
    }


    function createCallout(variant, titleText, bodyNode) {
        if (!ICON_PATHS[variant]) throw new Error('docsComponents: unknown callout variant ' + variant);
        const callout = document.createElement('div');
        callout.className = 'flat-callout flat-callout--' + variant;
        const titleRow = document.createElement('p');
        titleRow.className = 'flat-callout__title';
        titleRow.appendChild(createIcon(variant));
        appendText(titleRow, 'span', '', titleText);
        callout.appendChild(titleRow);
        if (bodyNode) callout.appendChild(bodyNode);
        return callout;
    }

    function addCalloutIcon(calloutElement, variant) {
        const titleElement = calloutElement.querySelector('.flat-callout__title, .flow-rules__title, .flow-outcome__title, .flow-result__label');
        if (!titleElement) throw new Error('docsComponents: callout has no title to carry the ' + variant + ' icon');
        titleElement.insertBefore(createIcon(variant), titleElement.firstChild);
        return calloutElement;
    }


    function createSteps(stepItems, createItemContent) {
        const list = document.createElement('ol');
        list.className = 'docs-steps';
        stepItems.forEach(stepItem => {
            const listItem = document.createElement('li');
            listItem.className = 'docs-steps__item';
            listItem.appendChild(createItemContent(stepItem));
            list.appendChild(listItem);
        });
        return list;
    }


    function createInlineCode(content) {
        const code = document.createElement('code');
        code.className = 'docs-inline-code';
        if (typeof content === 'string') {
            code.textContent = content;
        } else {
            code.appendChild(content);
        }
        return code;
    }

    function createAccessPath(pathSteps, createStepContent) {
        const line = document.createElement('div');
        line.className = 'docs-access-line';
        appendText(line, 'span', 'docs-access__label', 'Find it in');
        const list = document.createElement('ol');
        list.className = 'docs-access';
        pathSteps.forEach(pathStep => {
            const stepItem = document.createElement('li');
            stepItem.className = 'docs-access__step';
            stepItem.appendChild(createInlineCode(createStepContent ? createStepContent(pathStep) : String(pathStep)));
            list.appendChild(stepItem);
        });
        line.appendChild(list);
        return line;
    }


    function isInputGroupTitle(groupTitle) {
        return INPUT_KIND_PATTERN.test(groupTitle) && INPUT_GROUP_PATTERN.test(groupTitle);
    }

    function getInputKind(groupTitle) {
        const kindMatch = groupTitle.match(INPUT_KIND_PATTERN);
        return kindMatch ? kindMatch[1].toLowerCase() : 'neutral';
    }

    function getTypeLabel(groupTitle) {
        const typeText = groupTitle.replace(/\s+inputs?$/i, '').trim();
        return typeText.charAt(0).toUpperCase() + typeText.slice(1);
    }

    function createInputTable(inputGroups, createItemContent) {
        const wrapper = document.createElement('div');
        wrapper.className = 'docs-table-wrap';
        const table = document.createElement('table');
        table.className = 'docs-table docs-input-table';
        const tableHead = document.createElement('thead');
        const headRow = document.createElement('tr');
        appendText(headRow, 'th', '', 'Input').scope = 'col';
        appendText(headRow, 'th', '', 'Type').scope = 'col';
        tableHead.appendChild(headRow);
        table.appendChild(tableHead);

        const tableBody = document.createElement('tbody');
        inputGroups.forEach(inputGroup => {
            const inputKind = getInputKind(inputGroup.title);
            const typeLabel = getTypeLabel(inputGroup.title);
            inputGroup.items.forEach(inputItem => {
                const tableRow = document.createElement('tr');
                tableRow.className = 'docs-input-table__row docs-input-table__row--' + inputKind;
                const fieldCell = document.createElement('td');
                fieldCell.className = 'docs-input-table__field';
                fieldCell.appendChild(createItemContent ? createItemContent(inputItem) : document.createTextNode(String(inputItem)));
                tableRow.appendChild(fieldCell);
                const typeCell = document.createElement('td');
                typeCell.className = 'docs-input-table__type';
                appendText(typeCell, 'span', 'docs-input-type docs-input-type--' + inputKind, typeLabel);
                tableRow.appendChild(typeCell);
                tableBody.appendChild(tableRow);
            });
        });
        table.appendChild(tableBody);
        wrapper.appendChild(table);
        return wrapper;
    }

    global.sharedDocsComponents = {
        createIcon: createIcon,
        createCallout: createCallout,
        addCalloutIcon: addCalloutIcon,
        createSteps: createSteps,
        createInlineCode: createInlineCode,
        createAccessPath: createAccessPath,
        isInputGroupTitle: isInputGroupTitle,
        createInputTable: createInputTable
    };
})(window);
