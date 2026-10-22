(function (global) {
    'use strict';

    const ACCESS_PATH_GROUP_TITLE = /^Access Paths?$/;

    const RULE_EMPHASIS_PHRASES = ['Super Admins', 'do not require approval', 'not supported', 'cannot', 'balance < 0', '< 0'];

    const methods = {
        appendText(parent, tagName, className, text) {
            if (!text) return null;
            const element = document.createElement(tagName);
            element.className = className;
            element.textContent = text;
            parent.appendChild(element);
            return element;
        },

        createSvgIcon(pathData, className) {
            const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            icon.setAttribute('viewBox', '0 0 24 24');
            icon.setAttribute('fill', 'none');
            icon.setAttribute('stroke', 'currentColor');
            icon.setAttribute('stroke-width', '2');
            icon.setAttribute('stroke-linecap', 'round');
            icon.setAttribute('stroke-linejoin', 'round');
            icon.setAttribute('aria-hidden', 'true');
            icon.setAttribute('class', className);
            pathData.forEach(segment => {
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', segment);
                icon.appendChild(path);
            });
            return icon;
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
                const stop = document.createElement('li');
                stop.className = 'flow-journey__stop';
                this.appendText(stop, 'span', 'flow-journey__dot', String(index + 1));
                this.appendText(stop, 'span', 'flow-journey__label', stepText);
                journey.appendChild(stop);
            });
            return journey;
        },

        createExpectedLine(expectedItems, labelText) {
            const line = document.createElement('div');
            line.className = 'flow-result';
            line.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-result__icon'));
            const text = document.createElement('div');
            this.appendText(text, 'p', 'flow-result__label', labelText);
            expectedItems.forEach(itemText => this.appendText(text, 'p', 'flow-result__text', itemText));
            line.appendChild(text);
            return line;
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
            const wrap = document.createElement('div');
            wrap.className = 'flow-inputs';
            groups.forEach(group => wrap.appendChild(this.createChipGroup(group.title, group.items)));
            return wrap;
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

        appendEmphasizedText(parent, text) {
            const escapedTerms = RULE_EMPHASIS_PHRASES.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            const pattern = new RegExp('(' + escapedTerms.join('|') + ')', 'g');
            let lastIndex = 0;
            text.replace(pattern, (match, captured, offset) => {
                if (offset > lastIndex) parent.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
                const strong = document.createElement('strong');
                strong.className = 'flow-emphasis';
                strong.textContent = match;
                parent.appendChild(strong);
                lastIndex = offset + match.length;
                return match;
            });
            if (lastIndex < text.length) parent.appendChild(document.createTextNode(text.slice(lastIndex)));
        },

        createFlowRules(rules) {
            const wrap = document.createElement('div');
            wrap.className = 'flow-rules';
            this.appendText(wrap, 'h5', 'flow-rules__title', 'Rules');
            const columns = document.createElement('div');
            columns.className = 'flow-rules__columns';
            const block = document.createElement('div');
            block.className = 'flow-rules__group';
            const list = document.createElement('ul');
            list.className = 'flow-rules__list';
            rules.forEach(ruleText => {
                const item = document.createElement('li');
                item.className = 'flow-rules__item';
                this.appendEmphasizedText(item, ruleText);
                list.appendChild(item);
            });
            block.appendChild(list);
            columns.appendChild(block);
            wrap.appendChild(columns);
            return wrap;
        }
    };

    global.MetersFlowBuilders = {
        methods: methods
    };
})(window);
