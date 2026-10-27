(function (global) {
    'use strict';

    const ACCESS_PATH_GROUP_TITLE = /^Access Paths?$/;

    const RULE_EMPHASIS_PHRASES = ['Super Admins', 'do not require approval', 'not supported', 'cannot', 'balance < 0', '< 0'];

    const methods = {
        appendText(parent, tagName, className, textValue) {
            if (!textValue) return null;
            const element = document.createElement(tagName);
            element.className = className;
            element.textContent = textValue;
            parent.appendChild(element);
            return element;
        },

        createSvgIcon(pathData, className) {
            const iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            iconElement.setAttribute('viewBox', '0 0 24 24');
            iconElement.setAttribute('fill', 'none');
            iconElement.setAttribute('stroke', 'currentColor');
            iconElement.setAttribute('stroke-width', '2');
            iconElement.setAttribute('stroke-linecap', 'round');
            iconElement.setAttribute('stroke-linejoin', 'round');
            iconElement.setAttribute('aria-hidden', 'true');
            iconElement.setAttribute('class', className);
            pathData.forEach(segment => {
                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('d', segment);
                iconElement.appendChild(pathElement);
            });
            return iconElement;
        },

        createAccessTrail(pathText) {
            const trail = document.createElement('p');
            trail.className = 'flow-access';
            this.appendText(trail, 'span', 'flow-access__label', 'Find it in');
            pathText.split(' > ').forEach((stepText, index) => {
                if (index > 0) {
                    const separator = this.appendText(trail, 'span', 'flow-access__separator', '\u203A');
                    separator.setAttribute('aria-hidden', 'true');
                }
                this.appendText(trail, 'span', 'flow-access__step', stepText);
            });
            return trail;
        },

        createFlowSteps(steps) {
            const journey = document.createElement('ol');
            journey.className = 'flow-journey';
            journey.style.setProperty('--stop-total', String(steps.length));
            steps.forEach((stepText, index) => {
                const stopElement = document.createElement('li');
                stopElement.className = 'flow-journey__stop';
                this.appendText(stopElement, 'span', 'flow-journey__dot', String(index + 1));
                this.appendText(stopElement, 'span', 'flow-journey__label', stepText);
                journey.appendChild(stopElement);
            });
            return journey;
        },

        createExpectedLine(expectedItems, labelText) {
            const lineText = document.createElement('div');
            lineText.className = 'flow-result';
            lineText.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-result__icon'));
            const textValue2 = document.createElement('div');
            this.appendText(textValue2, 'p', 'flow-result__label', labelText);
            expectedItems.forEach(itemText => this.appendText(textValue2, 'p', 'flow-result__text', itemText));
            lineText.appendChild(textValue2);
            return lineText;
        },

        createChipGroup(label, itemTexts) {
            const block = document.createElement('div');
            block.className = 'flow-inputs__group flow-inputs__group--neutral';
            const heading = document.createElement('h5');
            heading.className = 'flow-inputs__heading';
            heading.textContent = label;
            this.appendText(heading, 'span', 'flow-inputs__count', String(itemTexts.length));
            block.appendChild(heading);
            const chips = document.createElement('ul');
            chips.className = 'flow-inputs__chips flow-inputs__chips--sentences';
            itemTexts.forEach(itemText => this.appendText(chips, 'li', 'flow-inputs__chip', itemText));
            block.appendChild(chips);
            return block;
        },

        createChipGroups(groups) {
            const wrapper = document.createElement('div');
            wrapper.className = 'flow-inputs';
            groups.forEach(group => wrapper.appendChild(this.createChipGroup(group.title, group.items)));
            return wrapper;
        },

        splitGroups(groups) {
            const accessPaths = [];
            const referenceGroups = [];
            (groups || []).forEach(group => {
                if (ACCESS_PATH_GROUP_TITLE.test(group.title)) group.items.forEach(pathText => accessPaths.push(pathText));
                else referenceGroups.push(group);
            });
            return { accessPaths: accessPaths, referenceGroups: referenceGroups };
        },

        appendEmphasizedText(parent, textValue3) {
            const escapedTerms = RULE_EMPHASIS_PHRASES.map(termText => termText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const pattern = new RegExp('(' + escapedTerms.join('|') + ')', 'g');
            let lastIndex = 0;
            textValue3.replace(pattern, (match, captured, offset) => {
                if (offset > lastIndex) parent.appendChild(document.createTextNode(textValue3.slice(lastIndex, offset)));
                const strong = document.createElement('strong');
                strong.className = 'flow-emphasis';
                strong.textContent = match;
                parent.appendChild(strong);
                lastIndex = offset + match.length;
                return match;
            });
            if (lastIndex < textValue3.length) parent.appendChild(document.createTextNode(textValue3.slice(lastIndex)));
        },

        createFlowRules(rules) {
            const wrapper2 = document.createElement('div');
            wrapper2.className = 'flow-rules';
            this.appendText(wrapper2, 'h5', 'flow-rules__title', 'Rules');
            const columns = document.createElement('div');
            columns.className = 'flow-rules__columns';
            const block = document.createElement('div');
            block.className = 'flow-rules__group';
            const listElement = document.createElement('ul');
            listElement.className = 'flow-rules__list';
            rules.forEach(ruleText => {
                const itemData = document.createElement('li');
                itemData.className = 'flow-rules__item';
                this.appendEmphasizedText(itemData, ruleText);
                listElement.appendChild(itemData);
            });
            block.appendChild(listElement);
            columns.appendChild(block);
            wrapper2.appendChild(columns);
            return wrapper2;
        }
    };

    global.MetersFlowBuilders = {
        methods: methods
    };
})(window);
