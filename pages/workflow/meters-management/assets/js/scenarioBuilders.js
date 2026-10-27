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
                const item = document.createElement('div');
                item.className = 'meter-guide__item';
                this.appendText(item, 'dt', 'meter-guide__term', guideItem.term);
                this.appendText(item, 'dd', 'meter-guide__meaning', guideItem.meaning);
                guide.appendChild(item);
            });
            return guide;
        },

        createScenarioLine(line) {
            const row = document.createElement('li');
            row.className = 'meter-scenario__line';
            if (line.view) {
                const tone = VIEW_TONES[line.view];
                if (!tone) throw new Error('Unknown scenario view: ' + line.view);
                this.appendText(row, 'span', 'meter-scenario__view meter-scenario__view--' + tone, line.view);
            }
            this.appendText(row, 'code', 'meter-scenario__value', line.text);
            this.appendText(row, 'span', 'meter-scenario__note', line.note ? '(' + line.note + ')' : '');
            return row;
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
            entry.lines.forEach(line => lines.appendChild(this.createScenarioLine(line)));
            block.appendChild(lines);
            return block;
        },

        createScenarioRow(row) {
            const wrap = document.createElement('div');
            wrap.className = 'meter-scenario__row';
            this.appendText(wrap, 'p', 'meter-scenario__label', row.label);
            const entries = document.createElement('div');
            entries.className = 'meter-scenario__entries';
            row.entries.forEach(entry => entries.appendChild(this.createScenarioEntry(entry)));
            wrap.appendChild(entries);
            return wrap;
        },

        createScenarioCard(scenario) {
            const card = document.createElement('article');
            card.className = 'meter-scenario';
            this.appendText(card, 'h5', 'meter-scenario__title', scenario.title);
            scenario.rows.forEach(row => card.appendChild(this.createScenarioRow(row)));
            return card;
        },

        appendRemarkText(parent, remarkText) {
            remarkText.split(/(<[^>]+>)/).forEach(part => {
                if (!part) return;
                if (part.startsWith('<')) this.appendText(parent, 'span', 'meter-remark__placeholder', part);
                else parent.appendChild(document.createTextNode(part));
            });
        },

        createRemarkRow(remarkItem) {
            const row = document.createElement('li');
            row.className = 'meter-remark';
            const remark = document.createElement('code');
            remark.className = 'meter-remark__text';
            this.appendRemarkText(remark, remarkItem.remark);
            row.appendChild(remark);
            row.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'meter-remark__arrow'));
            this.appendText(row, 'p', 'meter-remark__meaning', remarkItem.meaning);
            return row;
        },

        createRemarkGuide(remarkItems) {
            const guide = document.createElement('div');
            guide.className = 'meter-remarks';
            const header = document.createElement('div');
            header.className = 'meter-remarks__header';
            this.appendText(header, 'span', 'meter-remarks__column', 'Remark you see');
            this.appendText(header, 'span', 'meter-remarks__column', 'What it means');
            guide.appendChild(header);
            const list = document.createElement('ul');
            list.className = 'meter-remarks__list';
            remarkItems.forEach(remarkItem => list.appendChild(this.createRemarkRow(remarkItem)));
            guide.appendChild(list);
            return guide;
        },

        createScenarios(scenarios) {
            const list = document.createElement('div');
            list.className = 'meter-scenarios';
            scenarios.forEach(scenario => list.appendChild(this.createScenarioCard(scenario)));
            return list;
        }
    };

    global.MetersScenarioBuilders = {
        methods: methods
    };
})(window);
