(function (global) {
    'use strict';

    const MATRIX_CATEGORIES = [
        { label: 'All Paths (17)', key: 'all' },
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
        { text: '#', className: 'px-3 py-3 w-10 text-center' },
        { text: 'Transaction Type', className: 'px-3 py-3 min-w-[170px]' },
        { text: 'Target / Subject Entity State', className: 'px-3 py-3 min-w-[190px]' },
        { text: 'Actor Entity State', className: 'px-3 py-3 min-w-[150px]' },
        { text: 'Target Account (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[160px] col-prod', badge: 'Prod' },
        { text: 'Target Account (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' },
        { text: 'Remarks Column (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[200px] col-prod', badge: 'Prod' },
        { text: 'Remarks Column (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' }
    ];

    const RESULT_COLUMNS = [
        { field: 'targetProd', className: 'px-3 py-3 align-top col-prod' },
        { field: 'targetDebug', className: 'px-3 py-3 align-top col-debug' },
        { field: 'remarksProd', className: 'px-3 py-3 align-top col-prod' },
        { field: 'remarksDebug', className: 'px-3 py-3 align-top col-debug' }
    ];

    const SEARCH_FIELDS = ['id', 'type', 'targetState', 'actorState', 'targetProd', 'targetDebug', 'remarksProd', 'remarksDebug'];

    const PILL_CLASS = 'matrix-filter-pill text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-100 transition-colors';
    const MODE_CLASS = 'matrix-mode-btn px-2.5 py-1 rounded-md transition-all';

    const methods = {
        appendMatrixLines(wrapper, lines, classForLine) {
            lines.forEach((lineText, lineIndex) => {
                const lineElement = document.createElement('div');
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
                wrapper.className = 'font-mono text-[11px] leading-relaxed p-2.5 rounded-lg bg-slate-900 text-slate-100 border border-slate-800 shadow-sm';
                this.appendMatrixLines(wrapper, lines, (lineText, lineIndex) => {
                    if (lineIndex > 0) return 'text-slate-300 pl-2 text-[10.5px]';
                    return lineText.startsWith('Error:') ? 'font-semibold text-rose-400' : 'font-semibold text-amber-300';
                });
                return wrapper;
            }

            if (trimmed.startsWith('⚠')) {
                wrapper.className = 'text-xs p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200';
                this.appendMatrixLines(wrapper, lines, (lineText, lineIndex) => (lineIndex === 0 ? 'font-semibold' : 'text-amber-800/80 text-[11px] mt-0.5'));
                return wrapper;
            }

            if (trimmed.startsWith('[ ⊘')) {
                wrapper.className = 'text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded inline-block';
                wrapper.textContent = cellText;
                return wrapper;
            }

            if (trimmed === '(not set)') {
                wrapper.className = 'text-xs italic text-slate-400 font-mono';
                wrapper.textContent = cellText;
                return wrapper;
            }

            if (lines.length > 1) {
                this.appendMatrixLines(wrapper, lines, (lineText, lineIndex) => (lineIndex > 0 ? 'text-slate-500 text-[11px] mt-0.5' : ''));
            } else {
                wrapper.textContent = cellText;
            }
            return wrapper;
        },

        createMatrixStateCell(cellText) {
            const wrapper = document.createElement('div');
            wrapper.className = 'text-xs text-slate-700 leading-relaxed';
            this.appendMatrixLines(wrapper, cellText.split('\n'), lineText => {
                if (lineText.includes('Missing in Both') || lineText.includes('MISS') || lineText.includes('deleted')) return 'text-rose-700 font-medium';
                if (lineText.includes('NULL / Not Set')) return 'text-amber-700 font-medium';
                if (lineText.includes('Found in Storage')) return 'text-slate-800 font-medium';
                return 'text-slate-600';
            });
            return wrapper;
        },

        createMatrixTypeBadge(matrixItem) {
            const badge = document.createElement('span');
            let colorClasses = 'bg-slate-100 text-slate-800 border-slate-200';
            if (matrixItem.typeCategory === 'type7') {
                colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
            } else if (matrixItem.typeCategory === 'type6') {
                colorClasses = matrixItem.type.includes('Addition')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200';
            } else if (matrixItem.typeCategory === 'type1_5') {
                colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
            } else if (matrixItem.typeCategory === 'type2_3_4') {
                colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200';
            } else if (matrixItem.typeCategory === 'type0') {
                colorClasses = 'bg-violet-50 text-violet-700 border-violet-200';
            }

            badge.className = 'inline-block text-xs font-semibold px-2 py-1 rounded-md border ' + colorClasses;
            badge.textContent = matrixItem.type;
            return badge;
        },

        createMatrixFilterPills(matrixState) {
            const pillsWrap = document.createElement('div');
            pillsWrap.className = 'flex flex-wrap items-center gap-1.5';
            const pillButtons = [];
            MATRIX_CATEGORIES.forEach(categoryOption => {
                const pillButton = document.createElement('button');
                pillButton.type = 'button';
                pillButton.className = PILL_CLASS + (categoryOption.key === 'all' ? ' active' : '');
                pillButton.textContent = categoryOption.label;
                pillButton.dataset.key = categoryOption.key;
                pillButton.addEventListener('click', () => {
                    matrixState.activeCategory = categoryOption.key;
                    pillButtons.forEach(otherButton => otherButton.classList.remove('active'));
                    pillButton.classList.add('active');
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
            searchInput.className = 'text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-full md:w-64';
            searchInput.addEventListener('input', inputEvent => {
                matrixState.searchQuery = inputEvent.target.value.toLowerCase().trim();
                this.applyMatrixFilters(matrixState);
            });
            return searchInput;
        },

        createMatrixModeSwitcher(matrixState) {
            const switcherWrap = document.createElement('div');
            switcherWrap.className = 'inline-flex items-center rounded-lg bg-slate-200/70 p-0.5 text-xs text-slate-600';
            const modeButtons = [];
            MATRIX_MODES.forEach(modeOption => {
                const modeButton = document.createElement('button');
                modeButton.type = 'button';
                modeButton.className = MODE_CLASS + (modeOption.key === 'all' ? ' active' : ' hover:text-slate-900');
                modeButton.textContent = modeOption.label;
                modeButton.dataset.key = modeOption.key;
                modeButton.addEventListener('click', () => {
                    matrixState.activeMode = modeOption.key;
                    modeButtons.forEach(otherButton => {
                        otherButton.classList.remove('active');
                        otherButton.classList.add('hover:text-slate-900');
                    });
                    modeButton.classList.add('active');
                    modeButton.classList.remove('hover:text-slate-900');
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
            controlsCard.className = 'rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3';

            const topRow = document.createElement('div');
            topRow.className = 'flex flex-col md:flex-row md:items-center justify-between gap-3';
            topRow.appendChild(this.createMatrixFilterPills(matrixState));
            topRow.appendChild(this.createMatrixSearch(matrixState));
            controlsCard.appendChild(topRow);

            const bottomRow = document.createElement('div');
            bottomRow.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs';
            bottomRow.appendChild(this.createMatrixModeSwitcher(matrixState));
            matrixState.counter = document.createElement('span');
            matrixState.counter.className = 'text-xs text-slate-500 font-medium';
            matrixState.counter.textContent = 'Showing ' + matrixState.matrixData.length + ' of ' + matrixState.matrixData.length + ' paths';
            bottomRow.appendChild(matrixState.counter);
            controlsCard.appendChild(bottomRow);
            return controlsCard;
        },

        createMatrixHead() {
            const tableHead = document.createElement('thead');
            tableHead.className = 'bg-slate-50/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200';
            const headRow = document.createElement('tr');
            MATRIX_HEADERS.forEach(headerDefinition => {
                const headerCell = document.createElement('th');
                headerCell.scope = 'col';
                headerCell.className = headerDefinition.className;
                headerCell.textContent = headerDefinition.text;
                if (headerDefinition.badge) {
                    const badgeElement = document.createElement('span');
                    badgeElement.className = headerDefinition.badge === 'Prod'
                        ? 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800'
                        : 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-indigo-100 text-indigo-800';
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

        createMatrixRow(matrixItem, rowIndex) {
            const tableRow = document.createElement('tr');
            tableRow.className = (rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/40') + ' hover:bg-slate-100/60 transition-colors';
            tableRow.dataset.category = matrixItem.typeCategory;
            tableRow.dataset.search = SEARCH_FIELDS.map(fieldName => matrixItem[fieldName]).join(' ').toLowerCase();

            const idCell = document.createElement('td');
            idCell.className = 'px-3 py-3 font-mono font-semibold text-slate-400 text-center align-top';
            idCell.textContent = matrixItem.id;
            tableRow.appendChild(idCell);
            tableRow.appendChild(this.createMatrixCell('px-3 py-3 align-top', this.createMatrixTypeBadge(matrixItem)));
            tableRow.appendChild(this.createMatrixCell('px-3 py-3 align-top', this.createMatrixStateCell(matrixItem.targetState)));
            tableRow.appendChild(this.createMatrixCell('px-3 py-3 align-top', this.createMatrixStateCell(matrixItem.actorState)));
            RESULT_COLUMNS.forEach(column => {
                tableRow.appendChild(this.createMatrixCell(column.className, this.createMatrixDiagnosticBlock(matrixItem[column.field])));
            });
            return tableRow;
        },

        createMatrixTable(matrixState) {
            const tableWrap = document.createElement('div');
            tableWrap.className = 'matrix-table-wrap overflow-x-auto rounded-xl border border-slate-200 bg-white';
            const table = document.createElement('table');
            table.className = 'w-full text-left border-collapse text-xs divide-y divide-slate-100 min-w-[980px]';
            table.appendChild(this.createMatrixHead());

            const tableBody = document.createElement('tbody');
            tableBody.className = 'divide-y divide-slate-100 bg-white';
            matrixState.rowElements = matrixState.matrixData.map((matrixItem, rowIndex) => {
                const tableRow = this.createMatrixRow(matrixItem, rowIndex);
                tableBody.appendChild(tableRow);
                return tableRow;
            });

            matrixState.emptyRow = document.createElement('tr');
            matrixState.emptyRow.className = 'hidden';
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 8;
            emptyCell.className = 'py-10 text-center text-sm text-slate-400';
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
            container.className = 'mt-6 space-y-4';
            const matrixState = { matrixData: matrixData, container: container, activeCategory: 'all', activeMode: 'all', searchQuery: '' };
            container.appendChild(this.createMatrixControls(matrixState));
            container.appendChild(this.createMatrixTable(matrixState));
            return container;
        }
    };

    global.MetersMatrixBuilders = { methods: methods };
})(window);
