(function (global) {
    'use strict';

    const MATRIX_CATEGORIES = [
        { label: 'All paths', key: 'all' },
        { label: 'Type 7: Created Account', key: 'type7' },
        { label: 'Type 6: Balance Add/Deduct', key: 'type6' },
        { label: 'Type 1 / 5: Transfers', key: 'type1_5' },
        { label: 'Type 2 / 3 / 4: Inbound / Initial', key: 'type2_3_4' },
        { label: 'Type 0: Scored Assessment', key: 'type0' }
    ];

    const MATRIX_MODES = [
        { label: 'All Columns (Side-by-Side)', key: 'all' },
        { label: 'SHOW_ERROR = false (Production)', key: 'prod' },
        { label: 'SHOW_ERROR = true (Diagnostic)', key: 'debug' }
    ];

    const MATRIX_HEADERS = [
        { text: '#', className: 'matrix-cell matrix-cell--id' },
        { text: 'Transaction Type', className: 'matrix-cell matrix-cell--type' },
        { text: 'Target / Subject Entity State', className: 'matrix-cell matrix-cell--state' },
        { text: 'Actor Entity State', className: 'matrix-cell matrix-cell--actor' },
        { text: 'Target Account (SHOW_ERROR=false)', className: 'matrix-cell matrix-cell--target col-prod', badge: 'Prod' },
        { text: 'Target Account (SHOW_ERROR=true)', className: 'matrix-cell matrix-cell--wide col-debug', badge: 'Diag' },
        { text: 'Remarks Column (SHOW_ERROR=false)', className: 'matrix-cell matrix-cell--wide col-prod', badge: 'Prod' },
        { text: 'Remarks Column (SHOW_ERROR=true)', className: 'matrix-cell matrix-cell--wide col-debug', badge: 'Diag' }
    ];

    const RESULT_COLUMNS = [
        { field: 'targetProd', className: 'matrix-cell col-prod' },
        { field: 'targetDebug', className: 'matrix-cell col-debug' },
        { field: 'remarksProd', className: 'matrix-cell col-prod' },
        { field: 'remarksDebug', className: 'matrix-cell col-debug' }
    ];

    const SEARCH_FIELDS = ['id', 'type', 'targetState', 'actorState', 'targetProd', 'targetDebug', 'remarksProd', 'remarksDebug'];

    const TYPE_CATEGORY_TONES = {
        type7: 'account',
        type1_5: 'transfer',
        type2_3_4: 'inbound',
        type0: 'scored'
    };

    const methods = {
        appendMatrixLines(wrapper, lines, classForLine, lineTagName = 'div') {
            lines.forEach((lineText, lineIndex) => {
                const lineElement = document.createElement(lineTagName);
                const lineClass = classForLine(lineText, lineIndex);
                if (lineClass) lineElement.className = lineClass;
                lineElement.textContent = lineText;
                wrapper.appendChild(lineElement);
            });
        },

        createMatrixDiagnosticBlock(cellText) {
            const wrapper = document.createElement('div');
            if (!cellText) {
                wrapper.textContent = '-';
                return wrapper;
            }

            const trimmed = cellText.trim();
            const lines = cellText.split('\n');
            if (trimmed.startsWith('Error:') || trimmed.startsWith('Diagnostic Notice:') || trimmed.startsWith('Notice:')) {
                const outputBlock = document.createElement('pre');
                outputBlock.className = 'matrix-diagnostic matrix-diagnostic--output';
                this.appendMatrixLines(outputBlock, lines, (lineText, lineIndex) => {
                    if (lineIndex > 0) return 'matrix-diagnostic__detail';
                    return lineText.startsWith('Error:') ? 'matrix-diagnostic__head matrix-diagnostic__head--error' : 'matrix-diagnostic__head matrix-diagnostic__head--notice';
                }, 'span');
                return outputBlock;
            }

            if (trimmed.startsWith('⚠')) {
                wrapper.className = 'matrix-diagnostic matrix-diagnostic--warning';
                this.appendMatrixLines(wrapper, lines, (lineText, lineIndex) => (lineIndex === 0 ? 'matrix-diagnostic__head' : 'matrix-diagnostic__detail'));
                return wrapper;
            }

            if (trimmed.startsWith('[ ⊘')) {
                wrapper.className = 'matrix-diagnostic matrix-diagnostic--blocked';
                wrapper.textContent = cellText;
                return wrapper;
            }

            if (trimmed === '(not set)') {
                const unsetValue = document.createElement('code');
                unsetValue.className = 'matrix-diagnostic matrix-diagnostic--unset';
                unsetValue.textContent = cellText;
                return unsetValue;
            }

            if (lines.length > 1) {
                this.appendMatrixLines(wrapper, lines, (lineText, lineIndex) => (lineIndex > 0 ? 'matrix-diagnostic__detail' : ''));
            } else {
                wrapper.textContent = cellText;
            }
            return wrapper;
        },

        createMatrixStateCell(cellText) {
            const wrapper = document.createElement('div');
            wrapper.className = 'matrix-state';
            this.appendMatrixLines(wrapper, cellText.split('\n'), lineText => {
                if (lineText.includes('Missing in Both') || lineText.includes('MISS') || lineText.includes('deleted')) return 'matrix-state__line matrix-state__line--missing';
                if (lineText.includes('NULL / Not Set')) return 'matrix-state__line matrix-state__line--unset';
                if (lineText.includes('Found in Storage')) return 'matrix-state__line matrix-state__line--found';
                return 'matrix-state__line';
            });
            return wrapper;
        },

        createMatrixTypeBadge(matrixItem) {
            const badge = document.createElement('span');
            const tone = matrixItem.typeCategory === 'type6'
                ? (matrixItem.type.includes('Addition') ? 'addition' : 'deduction')
                : (TYPE_CATEGORY_TONES[matrixItem.typeCategory] || 'neutral');
            badge.className = 'matrix-type matrix-type--' + tone;
            badge.textContent = matrixItem.type;
            return badge;
        },

        createMatrixFilterPills(matrixState) {
            const pillsWrap = document.createElement('div');
            pillsWrap.className = 'matrix-pills';
            const pillButtons = [];
            MATRIX_CATEGORIES.forEach(categoryOption => {
                const pillButton = document.createElement('button');
                pillButton.type = 'button';
                pillButton.className = 'matrix-filter-pill' + (categoryOption.key === 'all' ? ' active' : '');
                pillButton.setAttribute('aria-pressed', categoryOption.key === 'all' ? 'true' : 'false');
                pillButton.textContent = categoryOption.key === 'all'
                    ? categoryOption.label + ' (' + matrixState.matrixData.length + ')'
                    : categoryOption.label;
                pillButton.dataset.key = categoryOption.key;
                pillButton.addEventListener('click', () => {
                    matrixState.activeCategory = categoryOption.key;
                    pillButtons.forEach(otherButton => {
                        otherButton.classList.remove('active');
                        otherButton.setAttribute('aria-pressed', 'false');
                    });
                    pillButton.classList.add('active');
                    pillButton.setAttribute('aria-pressed', 'true');
                    this.applyMatrixFilters(matrixState);
                });
                pillButtons.push(pillButton);
                pillsWrap.appendChild(pillButton);
            });
            return pillsWrap;
        },

        createMatrixSearch(matrixState) {
            const searchInput = document.createElement('input');
            searchInput.type = 'search';
            searchInput.placeholder = 'Filter matrix (e.g. Acme, #105, deleted, Storage 2)...';
            searchInput.className = 'matrix-search';
            searchInput.setAttribute('aria-label', 'Filter resolution paths');
            searchInput.addEventListener('input', inputEvent => {
                matrixState.searchQuery = inputEvent.target.value.toLowerCase().trim();
                this.applyMatrixFilters(matrixState);
            });
            return searchInput;
        },

        createMatrixModeSwitcher(matrixState) {
            const switcherWrap = document.createElement('div');
            switcherWrap.className = 'matrix-modes';
            switcherWrap.setAttribute('role', 'group');
            switcherWrap.setAttribute('aria-label', 'Error column mode');
            const modeButtons = [];
            MATRIX_MODES.forEach(modeOption => {
                const modeButton = document.createElement('button');
                modeButton.type = 'button';
                modeButton.className = 'matrix-mode-btn' + (modeOption.key === 'all' ? ' active' : '');
                modeButton.setAttribute('aria-pressed', modeOption.key === 'all' ? 'true' : 'false');
                modeButton.textContent = modeOption.label;
                modeButton.dataset.key = modeOption.key;
                modeButton.addEventListener('click', () => {
                    matrixState.activeMode = modeOption.key;
                    modeButtons.forEach(otherButton => {
                        otherButton.classList.remove('active');
                        otherButton.setAttribute('aria-pressed', 'false');
                    });
                    modeButton.classList.add('active');
                    modeButton.setAttribute('aria-pressed', 'true');
                    this.applyMatrixMode(matrixState);
                    this.applyMatrixFilters(matrixState);
                });
                modeButtons.push(modeButton);
                switcherWrap.appendChild(modeButton);
            });
            return switcherWrap;
        },

        createMatrixControls(matrixState) {
            const controlsCard = document.createElement('div');
            controlsCard.className = 'matrix-controls';

            const topRow = document.createElement('div');
            topRow.className = 'matrix-controls__row';
            topRow.appendChild(this.createMatrixFilterPills(matrixState));
            topRow.appendChild(this.createMatrixSearch(matrixState));
            controlsCard.appendChild(topRow);

            const bottomRow = document.createElement('div');
            bottomRow.className = 'matrix-controls__row';
            bottomRow.appendChild(this.createMatrixModeSwitcher(matrixState));
            matrixState.counter = document.createElement('span');
            matrixState.counter.className = 'matrix-counter';
            matrixState.counter.setAttribute('aria-live', 'polite');
            matrixState.counter.textContent = 'Showing ' + matrixState.matrixData.length + ' of ' + matrixState.matrixData.length + ' paths';
            bottomRow.appendChild(matrixState.counter);
            controlsCard.appendChild(bottomRow);
            return controlsCard;
        },

        createMatrixHead() {
            const tableHead = document.createElement('thead');
            tableHead.className = 'matrix-head';
            const headRow = document.createElement('tr');
            MATRIX_HEADERS.forEach(headerDefinition => {
                const headerCell = document.createElement('th');
                headerCell.scope = 'col';
                headerCell.className = headerDefinition.className;
                headerCell.textContent = headerDefinition.text;
                if (headerDefinition.badge) {
                    const badgeElement = document.createElement('span');
                    badgeElement.className = 'matrix-head__badge matrix-head__badge--' + headerDefinition.badge.toLowerCase();
                    badgeElement.textContent = headerDefinition.badge;
                    headerCell.appendChild(badgeElement);
                }
                headRow.appendChild(headerCell);
            });
            tableHead.appendChild(headRow);
            return tableHead;
        },

        createMatrixCell(className, content) {
            const tableCell = document.createElement('td');
            tableCell.className = className;
            tableCell.appendChild(content);
            return tableCell;
        },

        createMatrixRow(matrixItem) {
            const tableRow = document.createElement('tr');
            tableRow.className = 'matrix-row';
            tableRow.dataset.category = matrixItem.typeCategory;
            tableRow.dataset.search = SEARCH_FIELDS.map(fieldName => matrixItem[fieldName]).join(' ').toLowerCase();

            const idCell = document.createElement('td');
            idCell.className = 'matrix-cell matrix-cell--id';
            idCell.textContent = matrixItem.id;
            tableRow.appendChild(idCell);
            tableRow.appendChild(this.createMatrixCell('matrix-cell', this.createMatrixTypeBadge(matrixItem)));
            tableRow.appendChild(this.createMatrixCell('matrix-cell', this.createMatrixStateCell(matrixItem.targetState)));
            tableRow.appendChild(this.createMatrixCell('matrix-cell', this.createMatrixStateCell(matrixItem.actorState)));
            RESULT_COLUMNS.forEach(column => {
                tableRow.appendChild(this.createMatrixCell(column.className, this.createMatrixDiagnosticBlock(matrixItem[column.field])));
            });
            return tableRow;
        },

        createMatrixTable(matrixState) {
            const tableWrap = document.createElement('div');
            tableWrap.className = 'matrix-table-wrap';
            tableWrap.tabIndex = 0;
            tableWrap.setAttribute('role', 'region');
            tableWrap.setAttribute('aria-label', 'Resolution paths matrix');
            const table = document.createElement('table');
            table.className = 'matrix-table';
            table.appendChild(this.createMatrixHead());

            const tableBody = document.createElement('tbody');
            tableBody.className = 'matrix-body';
            matrixState.rowElements = matrixState.matrixData.map(matrixItem => {
                const tableRow = this.createMatrixRow(matrixItem);
                tableBody.appendChild(tableRow);
                return tableRow;
            });

            matrixState.emptyRow = document.createElement('tr');
            matrixState.emptyRow.className = 'hidden';
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 8;
            emptyCell.className = 'matrix-empty';
            emptyCell.textContent = 'No resolution paths match your filter criteria.';
            matrixState.emptyRow.appendChild(emptyCell);
            tableBody.appendChild(matrixState.emptyRow);

            table.appendChild(tableBody);
            tableWrap.appendChild(table);
            return tableWrap;
        },

        applyMatrixMode(matrixState) {
            const showProduction = matrixState.activeMode !== 'debug';
            const showDiagnostic = matrixState.activeMode !== 'prod';
            matrixState.container.querySelectorAll('.col-prod').forEach(column => column.classList.toggle('hidden', !showProduction));
            matrixState.container.querySelectorAll('.col-debug').forEach(column => column.classList.toggle('hidden', !showDiagnostic));
        },

        applyMatrixFilters(matrixState) {
            let visibleCount = 0;
            matrixState.rowElements.forEach(tableRow => {
                const matchesCategory = matrixState.activeCategory === 'all' || tableRow.dataset.category === matrixState.activeCategory;
                const matchesSearch = !matrixState.searchQuery || tableRow.dataset.search.includes(matrixState.searchQuery);
                const isVisible = matchesCategory && matchesSearch;
                tableRow.classList.toggle('hidden', !isVisible);
                tableRow.classList.toggle('matrix-row--even', isVisible && visibleCount % 2 === 1);
                if (isVisible) visibleCount += 1;
            });
            matrixState.emptyRow.classList.toggle('hidden', visibleCount !== 0);
            matrixState.counter.textContent = 'Showing ' + visibleCount + ' of ' + matrixState.matrixData.length + ' paths';
        },

        renderResolutionMatrix(matrixData) {
            if (!Array.isArray(matrixData) || !matrixData.length) {
                throw new Error('Resolution Paths Matrix requires matrix rows');
            }
            const container = document.createElement('div');
            container.className = 'matrix';
            const matrixState = { matrixData: matrixData, container: container, activeCategory: 'all', activeMode: 'all', searchQuery: '' };
            container.appendChild(this.createMatrixControls(matrixState));
            container.appendChild(this.createMatrixTable(matrixState));
            this.applyMatrixFilters(matrixState);
            return container;
        }
    };

    global.DocsResolutionMatrix = {
        methods: methods,
        render: matrixData => methods.renderResolutionMatrix(matrixData)
    };
})(window);
