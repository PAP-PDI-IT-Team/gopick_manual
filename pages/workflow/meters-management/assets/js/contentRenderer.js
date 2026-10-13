(function (global) {
    'use strict';

    class MetersContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        createStepCard(index, text) {
            const wrap = document.createElement('div');
            wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

            const badge = document.createElement('div');
            badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
            badge.textContent = index;

            const detail = document.createElement('div');
            detail.className = 'text-sm text-slate-600 leading-relaxed';
            detail.textContent = text;

            wrap.appendChild(badge);
            wrap.appendChild(detail);
            return wrap;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(function (item) {
                const li = document.createElement('li');
                li.className = 'flex gap-2';

                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

                const text = document.createElement('span');
                text.textContent = item;

                li.appendChild(marker);
                li.appendChild(text);
                list.appendChild(li);
            });
            return list;
        }

        createCallout(title, items, kind) {
            const wrap = document.createElement('div');
            const isRules = kind === 'rules';
            wrap.className = isRules
                ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
                : 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';

            const heading = document.createElement('h3');
            heading.className = isRules ? 'font-semibold text-amber-900 mb-3' : 'font-semibold text-emerald-900 mb-3';
            heading.textContent = title;

            wrap.appendChild(heading);
            wrap.appendChild(this.createBulletList(items));
            return wrap;
        }

        renderGroups(container, groups) {
            groups.forEach(group => {
                const wrap = document.createElement('div');
                wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';

                const heading = document.createElement('h3');
                heading.className = 'font-semibold text-slate-900 mb-3';
                heading.textContent = group.title;
                wrap.appendChild(heading);
                wrap.appendChild(this.createBulletList(group.items || []));
                container.appendChild(wrap);
            });
        }

        createMatrixDiagnosticBlock(text) {
            const wrap = document.createElement('div');
            if (!text) {
                wrap.textContent = '-';
                return wrap;
            }

            const trimmed = text.trim();
            if (trimmed.startsWith('Error:') || trimmed.startsWith('Diagnostic Notice:') || trimmed.startsWith('Notice:')) {
                wrap.className = 'font-mono text-[11px] leading-relaxed p-2.5 rounded-lg bg-slate-900 text-slate-100 border border-slate-800 shadow-sm';
                const lines = text.split('\n');
                lines.forEach(function (line, idx) {
                    const lineDiv = document.createElement('div');
                    if (idx === 0) {
                        lineDiv.className = line.startsWith('Error:') ? 'font-semibold text-rose-400' : 'font-semibold text-amber-300';
                        lineDiv.textContent = line;
                    } else {
                        lineDiv.className = 'text-slate-300 pl-2 text-[10.5px]';
                        lineDiv.textContent = line;
                    }
                    wrap.appendChild(lineDiv);
                });
                return wrap;
            }

            if (trimmed.startsWith('⚠')) {
                wrap.className = 'text-xs p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200';
                const lines = text.split('\n');
                lines.forEach(function (line, idx) {
                    const lineDiv = document.createElement('div');
                    if (idx === 0) {
                        lineDiv.className = 'font-semibold';
                    } else {
                        lineDiv.className = 'text-amber-800/80 text-[11px] mt-0.5';
                    }
                    lineDiv.textContent = line;
                    wrap.appendChild(lineDiv);
                });
                return wrap;
            }

            if (trimmed.startsWith('[ ⊘')) {
                wrap.className = 'text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-1 rounded inline-block';
                wrap.textContent = text;
                return wrap;
            }

            if (trimmed === '(not set)') {
                wrap.className = 'text-xs italic text-slate-400 font-mono';
                wrap.textContent = text;
                return wrap;
            }

            const lines = text.split('\n');
            if (lines.length > 1) {
                lines.forEach(function (line, idx) {
                    const lineDiv = document.createElement('div');
                    if (idx > 0) lineDiv.className = 'text-slate-500 text-[11px] mt-0.5';
                    lineDiv.textContent = line;
                    wrap.appendChild(lineDiv);
                });
            } else {
                wrap.textContent = text;
            }
            return wrap;
        }

        createMatrixStateCell(text) {
            const wrap = document.createElement('div');
            wrap.className = 'text-xs text-slate-700 leading-relaxed';

            const lines = text.split('\n');
            lines.forEach(function (line) {
                const lineDiv = document.createElement('div');
                if (line.includes('Missing in Both') || line.includes('MISS') || line.includes('deleted')) {
                    lineDiv.className = 'text-rose-700 font-medium';
                } else if (line.includes('NULL / Not Set')) {
                    lineDiv.className = 'text-amber-700 font-medium';
                } else if (line.includes('Found in Storage')) {
                    lineDiv.className = 'text-slate-800 font-medium';
                } else {
                    lineDiv.className = 'text-slate-600';
                }
                lineDiv.textContent = line;
                wrap.appendChild(lineDiv);
            });
            return wrap;
        }

        createMatrixTypeBadge(item) {
            const badge = document.createElement('span');
            let colorClasses = 'bg-slate-100 text-slate-800 border-slate-200';
            if (item.typeCategory === 'type7') {
                colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
            } else if (item.typeCategory === 'type6') {
                colorClasses = item.type.includes('Addition')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200';
            } else if (item.typeCategory === 'type1_5') {
                colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
            } else if (item.typeCategory === 'type2_3_4') {
                colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200';
            } else if (item.typeCategory === 'type0') {
                colorClasses = 'bg-violet-50 text-violet-700 border-violet-200';
            }

            badge.className = 'inline-block text-xs font-semibold px-2 py-1 rounded-md border ' + colorClasses;
            badge.textContent = item.type;
            return badge;
        }

        renderResolutionMatrix(matrixData) {
            const container = document.createElement('div');
            container.className = 'mt-6 space-y-4';

            const controlsCard = document.createElement('div');
            controlsCard.className = 'rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3';

            const topRow = document.createElement('div');
            topRow.className = 'flex flex-col md:flex-row md:items-center justify-between gap-3';

            const filterPillsWrap = document.createElement('div');
            filterPillsWrap.className = 'flex flex-wrap items-center gap-1.5';

            const categories = [
                { label: 'All Paths (17)', key: 'all' },
                { label: 'Type 7: Created Account', key: 'type7' },
                { label: 'Type 6: Balance Add/Deduct', key: 'type6' },
                { label: 'Type 1 / 5: Transfers', key: 'type1_5' },
                { label: 'Type 2 / 3 / 4: Inbound / Initial', key: 'type2_3_4' },
                { label: 'Type 0: Scored Assessment', key: 'type0' }
            ];

            let activeCategory = 'all';
            let activeMode = 'all';
            let searchQuery = '';

            const pillButtons = [];
            categories.forEach(cat => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'matrix-filter-pill text-xs px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-100 transition-colors' + (cat.key === 'all' ? ' active' : '');
                btn.textContent = cat.label;
                btn.dataset.key = cat.key;
                btn.addEventListener('click', () => {
                    activeCategory = cat.key;
                    pillButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    applyFilters();
                });
                pillButtons.push(btn);
                filterPillsWrap.appendChild(btn);
            });

            topRow.appendChild(filterPillsWrap);

            const searchInput = document.createElement('input');
            searchInput.type = 'search';
            searchInput.placeholder = 'Filter matrix (e.g. Acme, #105, deleted, Storage 2)...';
            searchInput.className = 'text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-full md:w-64';
            searchInput.addEventListener('input', e => {
                searchQuery = e.target.value.toLowerCase().trim();
                applyFilters();
            });
            topRow.appendChild(searchInput);
            controlsCard.appendChild(topRow);

            const bottomRow = document.createElement('div');
            bottomRow.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs';

            const modeSwitcherWrap = document.createElement('div');
            modeSwitcherWrap.className = 'inline-flex items-center rounded-lg bg-slate-200/70 p-0.5 text-xs text-slate-600';

            const modes = [
                { label: 'All Columns (Side-by-Side)', key: 'all' },
                { label: 'SHOW_ERROR = false (Production)', key: 'prod' },
                { label: 'SHOW_ERROR = true (Diagnostic)', key: 'debug' }
            ];

            const modeButtons = [];
            modes.forEach(m => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'matrix-mode-btn px-2.5 py-1 rounded-md transition-all' + (m.key === 'all' ? ' active' : ' hover:text-slate-900');
                btn.textContent = m.label;
                btn.dataset.key = m.key;
                btn.addEventListener('click', () => {
                    activeMode = m.key;
                    modeButtons.forEach(b => {
                        b.classList.remove('active');
                        b.classList.add('hover:text-slate-900');
                    });
                    btn.classList.add('active');
                    btn.classList.remove('hover:text-slate-900');
                    applyMode();
                    applyFilters();
                });
                modeButtons.push(btn);
                modeSwitcherWrap.appendChild(btn);
            });
            bottomRow.appendChild(modeSwitcherWrap);

            const counterSpan = document.createElement('span');
            counterSpan.className = 'text-xs text-slate-500 font-medium';
            counterSpan.textContent = 'Showing 17 of 17 paths';
            bottomRow.appendChild(counterSpan);

            controlsCard.appendChild(bottomRow);
            container.appendChild(controlsCard);

            const tableWrap = document.createElement('div');
            tableWrap.className = 'matrix-table-wrap overflow-x-auto rounded-xl border border-slate-200 bg-white';

            const table = document.createElement('table');
            table.className = 'w-full text-left border-collapse text-xs divide-y divide-slate-100 min-w-[980px]';

            const thead = document.createElement('thead');
            thead.className = 'bg-slate-50/90 text-[11px] font-bold text-slate-700 uppercase tracking-wider sticky top-0 z-10 border-b border-slate-200';

            const trHead = document.createElement('tr');

            const thDefs = [
                { text: '#', className: 'px-3 py-3 w-10 text-center' },
                { text: 'Transaction Type', className: 'px-3 py-3 min-w-[170px]' },
                { text: 'Target / Subject Entity State', className: 'px-3 py-3 min-w-[190px]' },
                { text: 'Actor Entity State', className: 'px-3 py-3 min-w-[150px]' },
                { text: 'Target Account (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[160px] col-prod', badge: 'Prod' },
                { text: 'Target Account (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' },
                { text: 'Remarks Column (SHOW_ERROR=false)', className: 'px-3 py-3 min-w-[200px] col-prod', badge: 'Prod' },
                { text: 'Remarks Column (SHOW_ERROR=true)', className: 'px-3 py-3 min-w-[200px] col-debug', badge: 'Diag' }
            ];

            thDefs.forEach(def => {
                const th = document.createElement('th');
                th.scope = 'col';
                th.className = def.className;
                th.textContent = def.text;
                if (def.badge) {
                    const b = document.createElement('span');
                    b.className = def.badge === 'Prod'
                        ? 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-emerald-100 text-emerald-800'
                        : 'ml-1.5 inline-block text-[9px] font-semibold px-1 py-0.2 rounded bg-indigo-100 text-indigo-800';
                    b.textContent = def.badge;
                    th.appendChild(b);
                }
                trHead.appendChild(th);
            });
            thead.appendChild(trHead);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            tbody.className = 'divide-y divide-slate-100 bg-white';

            const rowElements = [];

            matrixData.forEach((item, idx) => {
                const tr = document.createElement('tr');
                tr.className = (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40') + ' hover:bg-slate-100/60 transition-colors';
                tr.dataset.category = item.typeCategory;
                tr.dataset.search = (
                    item.id + ' ' +
                    item.type + ' ' +
                    item.targetState + ' ' +
                    item.actorState + ' ' +
                    item.targetProd + ' ' +
                    item.targetDebug + ' ' +
                    item.remarksProd + ' ' +
                    item.remarksDebug
                ).toLowerCase();

                const tdId = document.createElement('td');
                tdId.className = 'px-3 py-3 font-mono font-semibold text-slate-400 text-center align-top';
                tdId.textContent = item.id;
                tr.appendChild(tdId);

                const tdType = document.createElement('td');
                tdType.className = 'px-3 py-3 align-top';
                tdType.appendChild(this.createMatrixTypeBadge(item));
                tr.appendChild(tdType);

                const tdTargetState = document.createElement('td');
                tdTargetState.className = 'px-3 py-3 align-top';
                tdTargetState.appendChild(this.createMatrixStateCell(item.targetState));
                tr.appendChild(tdTargetState);

                const tdActorState = document.createElement('td');
                tdActorState.className = 'px-3 py-3 align-top';
                tdActorState.appendChild(this.createMatrixStateCell(item.actorState));
                tr.appendChild(tdActorState);

                const tdTargetProd = document.createElement('td');
                tdTargetProd.className = 'px-3 py-3 align-top col-prod';
                tdTargetProd.appendChild(this.createMatrixDiagnosticBlock(item.targetProd));
                tr.appendChild(tdTargetProd);

                const tdTargetDebug = document.createElement('td');
                tdTargetDebug.className = 'px-3 py-3 align-top col-debug';
                tdTargetDebug.appendChild(this.createMatrixDiagnosticBlock(item.targetDebug));
                tr.appendChild(tdTargetDebug);

                const tdRemarksProd = document.createElement('td');
                tdRemarksProd.className = 'px-3 py-3 align-top col-prod';
                tdRemarksProd.appendChild(this.createMatrixDiagnosticBlock(item.remarksProd));
                tr.appendChild(tdRemarksProd);

                const tdRemarksDebug = document.createElement('td');
                tdRemarksDebug.className = 'px-3 py-3 align-top col-debug';
                tdRemarksDebug.appendChild(this.createMatrixDiagnosticBlock(item.remarksDebug));
                tr.appendChild(tdRemarksDebug);

                tbody.appendChild(tr);
                rowElements.push(tr);
            });

            const emptyRow = document.createElement('tr');
            emptyRow.className = 'hidden';
            const emptyTd = document.createElement('td');
            emptyTd.colSpan = 8;
            emptyTd.className = 'py-10 text-center text-sm text-slate-400';
            emptyTd.textContent = 'No resolution paths match your filter criteria.';
            emptyRow.appendChild(emptyTd);
            tbody.appendChild(emptyRow);

            table.appendChild(tbody);
            tableWrap.appendChild(table);
            container.appendChild(tableWrap);

            function applyMode() {
                const prodCols = container.querySelectorAll('.col-prod');
                const debugCols = container.querySelectorAll('.col-debug');

                if (activeMode === 'all') {
                    prodCols.forEach(el => el.classList.remove('hidden'));
                    debugCols.forEach(el => el.classList.remove('hidden'));
                } else if (activeMode === 'prod') {
                    prodCols.forEach(el => el.classList.remove('hidden'));
                    debugCols.forEach(el => el.classList.add('hidden'));
                } else if (activeMode === 'debug') {
                    prodCols.forEach(el => el.classList.add('hidden'));
                    debugCols.forEach(el => el.classList.remove('hidden'));
                }
            }

            function applyFilters() {
                let visibleCount = 0;
                rowElements.forEach(tr => {
                    const matchesCategory = (activeCategory === 'all') || (tr.dataset.category === activeCategory);
                    const matchesSearch = !searchQuery || tr.dataset.search.includes(searchQuery);

                    if (matchesCategory && matchesSearch) {
                        tr.classList.remove('hidden');
                        visibleCount++;
                    } else {
                        tr.classList.add('hidden');
                    }
                });

                if (visibleCount === 0) {
                    emptyRow.classList.remove('hidden');
                } else {
                    emptyRow.classList.add('hidden');
                }

                counterSpan.textContent = 'Showing ' + visibleCount + ' of ' + matrixData.length + ' paths';
            }

            return container;
        }

        renderImages(section, target) {
            if (!section.images || !section.images.length) return;
            if (!this.imageRenderer || !this.imageRenderer.createImageOrPlaceholder) return;

            section.images.forEach(img => {
                const card = this.imageRenderer.createImageOrPlaceholder(img, section.title);
                target.appendChild(card);
            });
        }

        renderSectionBody(section, target) {
            this.renderImages(section, target);

            if (section.groups && section.groups.length) {
                const groupsWrap = document.createElement('div');
                groupsWrap.className = 'space-y-4';
                this.renderGroups(groupsWrap, section.groups);
                target.appendChild(groupsWrap);
            }

            if (section.steps && section.steps.length) {
                const stepsTitle = document.createElement('h3');
                stepsTitle.className = 'mt-5 mb-3 font-semibold text-slate-900';
                stepsTitle.textContent = 'How To Use';
                target.appendChild(stepsTitle);

                const stepsWrap = document.createElement('div');
                stepsWrap.className = 'space-y-4';
                section.steps.forEach((step, i) => {
                    stepsWrap.appendChild(this.createStepCard(i + 1, step));
                });
                target.appendChild(stepsWrap);
            }

            if (section.rules && section.rules.length) {
                target.appendChild(this.createCallout('Rules', section.rules, 'rules'));
            }

            if (section.expectedResults && section.expectedResults.length) {
                target.appendChild(this.createCallout('Expected Result', section.expectedResults, 'expected'));
            }

            if (section.matrix && section.matrix.length) {
                target.appendChild(this.renderResolutionMatrix(section.matrix));
            }
        }

        renderSectionHeader(section, headingLevel, eyebrowText) {
            const fragment = document.createDocumentFragment();
            if (eyebrowText) {
                const eyebrow = document.createElement('div');
                eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
                eyebrow.textContent = eyebrowText;
                fragment.appendChild(eyebrow);
            }

            const headingTag = headingLevel === 2 ? 'h2' : (headingLevel === 3 ? 'h3' : 'h4');
            const heading = document.createElement(headingTag);
            heading.id = section.id;
            heading.className = headingLevel === 2 ? 'text-xl font-bold text-slate-900' : (headingLevel === 3 ? 'text-lg font-bold text-slate-900' : 'text-base font-bold text-slate-900');
            heading.textContent = section.title;
            heading.setAttribute('tabindex', '-1');
            fragment.appendChild(heading);

            if (section.description) {
                const desc = document.createElement('p');
                desc.className = 'text-sm text-slate-500 mt-2 mb-5';
                desc.textContent = section.description;
                fragment.appendChild(desc);
            }

            return fragment;
        }

        renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
            const sectionEl = document.createElement('section');
            sectionEl.className = isTopLevel ? 'mb-10' : 'mt-8 border-t border-slate-100 pt-6';
            sectionEl.appendChild(this.renderSectionHeader(section, headingLevel, eyebrowText));
            this.renderSectionBody(section, sectionEl);

            if (section.children && section.children.length) {
                section.children.forEach(child => {
                    sectionEl.appendChild(this.renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
                });
            }

            return sectionEl;
        }

        renderLegends(root) {
            const legends = this.store.getLegends();
            if (!legends || !legends.length) return;

            const legendsWrap = document.createElement('div');
            legendsWrap.className = 'mb-8 rounded-lg border border-slate-100 bg-slate-50 p-5';

            const heading = document.createElement('h2');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = 'Legends';
            legendsWrap.appendChild(heading);
            legendsWrap.appendChild(this.createBulletList(legends));

            root.appendChild(legendsWrap);
        }

        renderAllSections() {
            const root = document.getElementById('section-render-root');
            if (!root) return;
            root.innerHTML = '';

            this.renderLegends(root);

            const sections = this.store.getSections();
            sections.forEach(section => {
                root.appendChild(this.renderSectionTree(section, 2, null, true));
            });
        }
    }

    global.MetersContentRenderer = MetersContentRenderer;
})(window);
