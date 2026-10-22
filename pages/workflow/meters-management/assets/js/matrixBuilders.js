(function (global) {
    'use strict';

    const MATRIX_MODES = [
        { key: 'prod', label: 'What users see', hint: 'Production view (SHOW_ERROR = false)' },
        { key: 'debug', label: 'Diagnostic', hint: 'Diagnostic view (SHOW_ERROR = true)' },
        { key: 'both', label: 'Compare both', hint: 'Both views stacked in each cell' }
    ];

    const MATRIX_COLUMNS = [
        { label: 'Transaction type', className: 'matrix-col-type' },
        { label: 'Account situation', className: 'matrix-col-state' },
        { label: 'Target account shown', className: 'matrix-col-result' },
        { label: 'Remark shown', className: 'matrix-col-result' }
    ];

    const TYPE_TONES = {
        type7: 'purple',
        type1_5: 'blue',
        type2_3_4: 'cyan',
        type0: 'violet'
    };

    const methods = {
        describeMatrixState(text) {
            const deletedMatch = /^Missing in Both \((.+?) deleted\)$/.exec(text);
            if (deletedMatch) return { label: deletedMatch[1] + ' deleted', tone: 'bad' };

            const namedFoundMatch = /^Found in Storage 1 or 2 \((.+)\)$/.exec(text) || /^Found in Storage 2 \((Actor #\d+)\)$/.exec(text);
            if (namedFoundMatch) return { label: namedFoundMatch[1] + ' found', tone: 'good' };

            const idFoundMatch = /^Found in Storage [12] \((accounts|users)\.id = (\d+)\)$/.exec(text);
            if (idFoundMatch) {
                const entityName = idFoundMatch[1] === 'accounts' ? 'Account' : 'User';
                return { label: entityName + ' #' + idFoundMatch[2] + ' found', tone: 'good' };
            }

            if (/^Found in Storage [12] \(/.test(text)) return { label: 'Found', tone: 'good' };
            if (/^NULL \/ Not Set/.test(text)) return { label: 'Not specified', tone: 'warn' };

            if (/^Subject #\d+ active; Actor #\d+ (active|deleted)$/.test(text)) {
                const label = text.replace('Subject', 'Account').replace('Actor', 'user').replace('; ', ', ');
                return { label: label, tone: text.includes('deleted') ? 'bad' : 'good' };
            }

            return { label: text, tone: text.includes('deleted') ? 'bad' : 'neutral' };
        },

        createMatrixStateLine(text, caption) {
            const description = this.describeMatrixState(text);
            if (description.label === 'Found') {
                description.label = (caption === 'Done by' ? 'User' : 'Account') + ' found';
            }
            const line = document.createElement('div');
            line.className = 'matrix-state matrix-state--' + description.tone;
            this.appendText(line, 'span', 'matrix-state__caption', caption);
            this.appendText(line, 'span', 'matrix-state__label', description.label);
            if (description.label !== text) {
                this.appendText(line, 'span', 'matrix-tech', text);
            }
            return line;
        },

        createMatrixSituationCell(item) {
            const wrap = document.createElement('div');
            wrap.className = 'matrix-situation';
            wrap.appendChild(this.createMatrixStateLine(item.targetState, 'Account'));
            wrap.appendChild(this.createMatrixStateLine(item.actorState, 'Done by'));
            return wrap;
        },

        createMatrixTypeBadge(item) {
            const tone = item.typeCategory === 'type6'
                ? (item.type.includes('Addition') ? 'green' : 'amber')
                : (TYPE_TONES[item.typeCategory] || 'slate');
            const badge = document.createElement('span');
            badge.className = 'matrix-type matrix-type--' + tone;
            badge.textContent = item.type;
            return badge;
        },

        createMatrixResultBlock(text) {
            const block = document.createElement('div');
            const trimmed = text ? text.trim() : '';
            if (!trimmed) {
                block.className = 'matrix-result matrix-result--empty';
                block.textContent = '-';
                return block;
            }

            const isError = trimmed.startsWith('Error:');
            const isNotice = trimmed.startsWith('Diagnostic Notice:') || trimmed.startsWith('Notice:');
            const isWarning = trimmed.startsWith('\u26A0');
            const isDeleted = trimmed.startsWith('[ \u2298');
            const isUnset = trimmed === '(not set)';

            let tone = 'plain';
            if (isError) tone = 'error';
            else if (isNotice) tone = 'notice';
            else if (isWarning) tone = 'warning';
            else if (isDeleted) tone = 'deleted';
            else if (isUnset) tone = 'unset';
            block.className = 'matrix-result matrix-result--' + tone;

            trimmed.split('\n').forEach((line, lineIndex) => {
                this.appendText(block, 'div', lineIndex === 0 ? 'matrix-result__main' : 'matrix-result__detail', line);
            });
            return block;
        },

        createMatrixResultCell(productionText, diagnosticText) {
            const wrap = document.createElement('div');
            wrap.className = 'matrix-results';

            const production = document.createElement('div');
            production.className = 'matrix-results__prod';
            this.appendText(production, 'span', 'matrix-results__caption', 'What users see');
            production.appendChild(this.createMatrixResultBlock(productionText));

            const diagnostic = document.createElement('div');
            diagnostic.className = 'matrix-results__debug';
            this.appendText(diagnostic, 'span', 'matrix-results__caption', 'Diagnostic');
            diagnostic.appendChild(this.createMatrixResultBlock(diagnosticText));

            wrap.appendChild(production);
            wrap.appendChild(diagnostic);
            return wrap;
        },

        createMatrixRow(item) {
            const row = document.createElement('tr');
            row.className = 'matrix-row';
            row.dataset.category = item.typeCategory;
            row.dataset.search = [
                item.id, item.type, item.targetState, item.actorState,
                item.targetProd, item.targetDebug, item.remarksProd, item.remarksDebug
            ].join(' ').toLowerCase();

            const cells = [
                { label: 'Transaction type', content: this.createMatrixTypeBadge(item), className: 'matrix-col-type' },
                { label: 'Account situation', content: this.createMatrixSituationCell(item), className: 'matrix-col-state' },
                { label: 'Target account shown', content: this.createMatrixResultCell(item.targetProd, item.targetDebug), className: 'matrix-col-result' },
                { label: 'Remark shown', content: this.createMatrixResultCell(item.remarksProd, item.remarksDebug), className: 'matrix-col-result' }
            ];

            const numberCell = document.createElement('td');
            numberCell.className = 'matrix-col-number';
            numberCell.textContent = item.id;
            row.appendChild(numberCell);

            cells.forEach(cell => {
                const cellElement = document.createElement('td');
                cellElement.className = cell.className;
                cellElement.dataset.label = cell.label;
                cellElement.appendChild(cell.content);
                row.appendChild(cellElement);
            });
            return row;
        },

        createMatrixTable(matrixData, rowElements) {
            const wrap = document.createElement('div');
            wrap.className = 'matrix-table-wrap';
            const table = document.createElement('table');
            table.className = 'matrix-table';

            const head = document.createElement('thead');
            const headRow = document.createElement('tr');
            const numberHeader = document.createElement('th');
            numberHeader.scope = 'col';
            numberHeader.className = 'matrix-col-number';
            numberHeader.textContent = '#';
            headRow.appendChild(numberHeader);
            MATRIX_COLUMNS.forEach(column => {
                const header = document.createElement('th');
                header.scope = 'col';
                header.className = column.className;
                header.textContent = column.label;
                headRow.appendChild(header);
            });
            head.appendChild(headRow);
            table.appendChild(head);

            const body = document.createElement('tbody');
            matrixData.forEach(item => {
                const row = this.createMatrixRow(item);
                rowElements.push(row);
                body.appendChild(row);
            });
            table.appendChild(body);
            wrap.appendChild(table);
            return wrap;
        },

        createMatrixChoiceButtons(choices, className, onChoose) {
            const buttons = [];
            choices.forEach((choice, choiceIndex) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = className;
                button.textContent = choice.label;
                if (choice.hint) button.title = choice.hint;
                button.setAttribute('aria-pressed', choiceIndex === 0 ? 'true' : 'false');
                button.addEventListener('click', () => {
                    buttons.forEach(other => other.setAttribute('aria-pressed', other === button ? 'true' : 'false'));
                    onChoose(choice.key);
                });
                buttons.push(button);
            });
            return buttons;
        },

        createMatrixTechnicalToggle(onToggle) {
            const label = document.createElement('label');
            label.className = 'matrix-technical-toggle';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', () => onToggle(checkbox.checked));
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(' Show technical details'));
            return label;
        },

        renderResolutionMatrix(matrixData) {
            const container = document.createElement('div');
            container.className = 'matrix';
            container.dataset.mode = 'prod';
            container.dataset.technical = 'off';

            const rowElements = [];
            const state = { category: 'all', search: '' };
            const counter = document.createElement('span');
            counter.className = 'matrix-counter';
            counter.setAttribute('aria-live', 'polite');

            const applyFilters = () => {
                let visibleCount = 0;
                rowElements.forEach(row => {
                    const isMatch = (state.category === 'all' || row.dataset.category === state.category)
                        && (!state.search || row.dataset.search.includes(state.search));
                    row.hidden = !isMatch;
                    if (isMatch) visibleCount++;
                });
                emptyMessage.hidden = visibleCount !== 0;
                counter.textContent = 'Showing ' + visibleCount + ' of ' + matrixData.length + ' paths';
            };

            const categories = [
                { label: 'All paths (' + matrixData.length + ')', key: 'all' },
                { label: 'Type 7: Created Account', key: 'type7' },
                { label: 'Type 6: Balance Add/Deduct', key: 'type6' },
                { label: 'Type 1 / 5: Transfers', key: 'type1_5' },
                { label: 'Type 2 / 3 / 4: Inbound / Initial', key: 'type2_3_4' },
                { label: 'Type 0: Scored Assessment', key: 'type0' }
            ];

            const controls = document.createElement('div');
            controls.className = 'matrix-controls';

            const topRow = document.createElement('div');
            topRow.className = 'matrix-controls__row';
            const pills = document.createElement('div');
            pills.className = 'matrix-controls__pills';
            this.createMatrixChoiceButtons(categories, 'matrix-pill', key => {
                state.category = key;
                applyFilters();
            }).forEach(button => pills.appendChild(button));
            topRow.appendChild(pills);

            const search = document.createElement('input');
            search.type = 'search';
            search.className = 'matrix-search';
            search.placeholder = 'Filter paths (e.g. Acme, #105, deleted)';
            search.setAttribute('aria-label', 'Filter resolution paths');
            search.addEventListener('input', () => {
                state.search = search.value.toLowerCase().trim();
                applyFilters();
            });
            topRow.appendChild(search);
            controls.appendChild(topRow);

            const bottomRow = document.createElement('div');
            bottomRow.className = 'matrix-controls__row matrix-controls__row--bottom';
            const modeSwitcher = document.createElement('div');
            modeSwitcher.className = 'matrix-modes';
            modeSwitcher.setAttribute('role', 'group');
            modeSwitcher.setAttribute('aria-label', 'Result view');
            this.createMatrixChoiceButtons(MATRIX_MODES, 'matrix-mode', key => {
                container.dataset.mode = key;
            }).forEach(button => modeSwitcher.appendChild(button));
            bottomRow.appendChild(modeSwitcher);
            bottomRow.appendChild(this.createMatrixTechnicalToggle(isOn => {
                container.dataset.technical = isOn ? 'on' : 'off';
            }));
            bottomRow.appendChild(counter);
            controls.appendChild(bottomRow);
            container.appendChild(controls);

            container.appendChild(this.createMatrixTable(matrixData, rowElements));

            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'matrix-empty';
            emptyMessage.hidden = true;
            emptyMessage.textContent = 'No resolution paths match your filter criteria.';
            container.appendChild(emptyMessage);

            applyFilters();
            return container;
        }
    };

    global.MetersMatrixBuilders = { methods: methods };
})(window);
