(function (global) {
    'use strict';

    const VIEW_TONES = {
        'Target view': 'target',
        'Actor view': 'actor',
        'Actor or Parent view': 'actor',
        'Parent view': 'parent',
        'Both views': 'both'
    };

    const methods = {
        createScenarioGuide(guideItems) {
            const guide = document.createElement('dl');
            guide.className = 'meter-guide';
            guideItems.forEach(guideItem => {
                const itemData = document.createElement('div');
                itemData.className = 'meter-guide__item';
                this.appendText(itemData, 'dt', 'meter-guide__term', guideItem.term);
                this.appendText(itemData, 'dd', 'meter-guide__meaning', guideItem.meaning);
                guide.appendChild(itemData);
            });
            return guide;
        },

        createScenarioLine(lineText) {
            const rowElement = document.createElement('li');
            rowElement.className = 'meter-scenario__line';
            if (lineText.view) {
                const toneName = VIEW_TONES[lineText.view];
                if (!toneName) throw new Error('Unknown scenario view: ' + lineText.view);
                this.appendText(rowElement, 'span', 'meter-scenario__view meter-scenario__view--' + toneName, lineText.view);
            }
            this.appendText(rowElement, 'code', 'meter-scenario__value', lineText.text);
            this.appendText(rowElement, 'span', 'meter-scenario__note', lineText.note ? '(' + lineText.note + ')' : '');
            return rowElement;
        },

        createScenarioEntry(entry) {
            const block = document.createElement('div');
            block.className = 'meter-scenario__entry';
            if (entry.condition) {
                const condition = document.createElement('p');
                condition.className = 'meter-scenario__condition';
                block.appendChild(condition);
                this.appendText(condition, 'span', 'meter-scenario__condition-keyword', 'If');
                condition.appendChild(document.createTextNode(' ' + entry.condition));
            }
            const lines = document.createElement('ul');
            lines.className = 'meter-scenario__lines';
            entry.lines.forEach(lineText2 => lines.appendChild(this.createScenarioLine(lineText2)));
            block.appendChild(lines);
            return block;
        },

        createScenarioRow(rowElement2) {
            const wrapper = document.createElement('div');
            wrapper.className = 'meter-scenario__row';
            this.appendText(wrapper, 'p', 'meter-scenario__label', rowElement2.label);
            const entries = document.createElement('div');
            entries.className = 'meter-scenario__entries';
            rowElement2.entries.forEach(entry => entries.appendChild(this.createScenarioEntry(entry)));
            wrapper.appendChild(entries);
            return wrapper;
        },

        createScenarioCard(scenario) {
            const cardElement = document.createElement('article');
            cardElement.className = 'meter-scenario';
            this.appendText(cardElement, 'h5', 'meter-scenario__title', scenario.title);
            scenario.rows.forEach(rowElement3 => cardElement.appendChild(this.createScenarioRow(rowElement3)));
            return cardElement;
        },

        appendRemarkText(parent, remarkText) {
            remarkText.split(/(<[^>]+>)/).forEach(segment => {
                if (!segment) return;
                if (segment.startsWith('<')) this.appendText(parent, 'span', 'meter-remark__placeholder', segment);
                else parent.appendChild(document.createTextNode(segment));
            });
        },

        createRemarkRow(remarkItem) {
            const rowElement4 = document.createElement('li');
            rowElement4.className = 'meter-remark';
            const remark = document.createElement('code');
            remark.className = 'meter-remark__text';
            this.appendRemarkText(remark, remarkItem.remark);
            rowElement4.appendChild(remark);
            rowElement4.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'meter-remark__arrow'));
            this.appendText(rowElement4, 'p', 'meter-remark__meaning', remarkItem.meaning);
            return rowElement4;
        },

        createRemarkGuide(remarkItems) {
            const guide = document.createElement('div');
            guide.className = 'meter-remarks';
            const header = document.createElement('div');
            header.className = 'meter-remarks__header';
            this.appendText(header, 'span', 'meter-remarks__column', 'Remark you see');
            this.appendText(header, 'span', 'meter-remarks__column', 'What it means');
            guide.appendChild(header);
            const listElement = document.createElement('ul');
            listElement.className = 'meter-remarks__list';
            remarkItems.forEach(remarkItem => listElement.appendChild(this.createRemarkRow(remarkItem)));
            guide.appendChild(listElement);
            return guide;
        },

        createScenarios(scenarios) {
            const listElement2 = document.createElement('div');
            listElement2.className = 'meter-scenarios';
            scenarios.forEach(scenario => listElement2.appendChild(this.createScenarioCard(scenario)));
            return listElement2;
        }
    };

    global.MetersScenarioBuilders = {
        methods: methods
    };
})(window);
