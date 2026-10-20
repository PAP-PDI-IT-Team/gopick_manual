(function (global) {
    'use strict';

    class ActivityLogRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        createListItemContent(item) {
            if (item && item.href) {
                const link = document.createElement('a');
                link.href = item.href;
                link.className = 'font-semibold text-brand hover:text-brand-dark transition-colors';
                link.textContent = item.label || item.href;
                return link;
            }

            const text = document.createElement('span');
            text.textContent = item && item.label ? item.label : item;
            return text;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex gap-2';

                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

                li.appendChild(marker);
                li.appendChild(this.createListItemContent(item));
                list.appendChild(li);
            });
            return list;
        }

        createCallout(title, items, kind) {
            const wrap = document.createElement('div');
            const isRules = kind === 'rules';
            const isExpected = kind === 'expected';
            wrap.className = isRules
                ? 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4'
                : (isExpected
                    ? 'mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4'
                    : 'mt-4 rounded-lg border border-slate-100 bg-white p-4');

            const heading = document.createElement('h3');
            heading.className = isRules
                ? 'font-semibold text-amber-900 mb-2'
                : (isExpected ? 'font-semibold text-emerald-900 mb-2' : 'font-semibold text-slate-900 mb-2');
            heading.textContent = title;

            wrap.appendChild(heading);
            wrap.appendChild(this.createBulletList(items));
            return wrap;
        }

        createLabeledList(title, items) {
            const wrap = document.createElement('div');
            wrap.className = 'mt-4 rounded-lg border border-slate-100 bg-white p-4';

            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-2';
            heading.textContent = title;
            wrap.appendChild(heading);
            wrap.appendChild(this.createBulletList(items));
            return wrap;
        }

        createActionLinkList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 ml-4 space-y-2 border-l border-slate-100 pl-4';

            items.forEach(item => {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.className = 'block text-sm font-semibold text-brand hover:text-brand-dark transition-colors';
                link.href = item.href;
                link.textContent = item.label;
                listItem.appendChild(link);
                list.appendChild(listItem);
            });

            return list;
        }

        renderAccessPaths(target, accessPaths) {
            const label = document.createElement('p');
            label.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
            label.textContent = 'Access Path';
            target.appendChild(label);

            accessPaths.forEach(pathParts => {
                const row = document.createElement('p');
                row.className = 'mt-1 text-sm text-slate-600 leading-relaxed';
                row.textContent = pathParts.join(' > ');
                target.appendChild(row);
            });
        }

        renderGroups(container, groups) {
            groups.forEach(group => {
                const wrap = document.createElement('div');
                wrap.className = 'rounded-lg border border-slate-100 bg-white p-4';

                const heading = document.createElement('h3');
                heading.className = 'font-semibold text-slate-900 mb-2';
                heading.textContent = group.title;
                wrap.appendChild(heading);
                wrap.appendChild(this.createBulletList(group.items || []));
                container.appendChild(wrap);
            });
        }

        renderSectionBody(section, target) {
            if (section.accessPaths && section.accessPaths.length) {
                this.renderAccessPaths(target, section.accessPaths);
            }

            if (section.steps && section.steps.length) {
                const stepLabel = document.createElement('p');
                stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                stepLabel.textContent = 'How To Use';
                target.appendChild(stepLabel);
                const stepsList = this.createBulletList(section.steps);
                stepsList.classList.add('mt-3');
                target.appendChild(stepsList);
            }

            if (section.links && section.links.length) {
                const label = document.createElement('p');
                label.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                label.textContent = 'Available Actions';
                target.appendChild(label);
                target.appendChild(this.createActionLinkList(section.links));
            }

            const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
            if (section.images && section.images.length && imageRenderer) {
                section.images.forEach(imageObj => {
                    target.appendChild(imageRenderer.createImageOrPlaceholder(imageObj, section.title));
                });
            }

            if (section.items && section.items.length) {
                target.appendChild(this.createLabeledList('Visible Content', section.items));
            }

            if (section.groups && section.groups.length) {
                const groupsWrap = document.createElement('div');
                groupsWrap.className = 'space-y-4 mt-4';
                this.renderGroups(groupsWrap, section.groups);
                target.appendChild(groupsWrap);
            }

            if (section.requiredInputs && section.requiredInputs.length) {
                target.appendChild(this.createLabeledList('Required Inputs', section.requiredInputs));
            }

            if (section.optionalInputs && section.optionalInputs.length) {
                target.appendChild(this.createLabeledList('Optional Inputs', section.optionalInputs));
            }

            if (section.conditionalInputs && section.conditionalInputs.length) {
                target.appendChild(this.createLabeledList('Conditional Inputs', section.conditionalInputs));
            }

            if (section.defaultedInputs && section.defaultedInputs.length) {
                target.appendChild(this.createLabeledList('Defaulted Inputs', section.defaultedInputs));
            }

            if (section.lockedInputs && section.lockedInputs.length) {
                target.appendChild(this.createLabeledList('Locked Inputs', section.lockedInputs));
            }

            if (section.rules && section.rules.length) {
                target.appendChild(this.createCallout('Rules', section.rules, 'rules'));
            }

            if (section.expectedResults && section.expectedResults.length) {
                target.appendChild(this.createCallout('Expected Result', section.expectedResults, 'expected'));
            }

            if (section.notes && section.notes.length) {
                target.appendChild(this.createCallout('Notes', section.notes, 'notes'));
            }
        }

        sectionHasDetails(section) {
            return Boolean(
                section.description ||
                (section.accessPaths && section.accessPaths.length) ||
                (section.steps && section.steps.length) ||
                (section.links && section.links.length) ||
                (section.images && section.images.length) ||
                (section.items && section.items.length) ||
                (section.groups && section.groups.length) ||
                (section.requiredInputs && section.requiredInputs.length) ||
                (section.optionalInputs && section.optionalInputs.length) ||
                (section.conditionalInputs && section.conditionalInputs.length) ||
                (section.defaultedInputs && section.defaultedInputs.length) ||
                (section.lockedInputs && section.lockedInputs.length) ||
                (section.rules && section.rules.length) ||
                (section.expectedResults && section.expectedResults.length) ||
                (section.notes && section.notes.length)
            );
        }

        createSectionCard(section, level, titleOverride, includeId) {
            const card = document.createElement('article');
            card.className = level === 'nested'
                ? 'rounded-lg border border-slate-100 bg-white p-4'
                : 'rounded-lg border border-slate-100 bg-slate-50 p-5';
            if (includeId) card.id = section.id;

            const title = document.createElement(level === 'nested' ? 'h4' : 'h3');
            title.className = 'font-semibold text-slate-900 mb-2';
            title.textContent = titleOverride || section.title;
            card.appendChild(title);

            if (section.description) {
                const desc = document.createElement('p');
                desc.className = 'text-sm text-slate-600 leading-relaxed';
                desc.textContent = section.description;
                card.appendChild(desc);
            }

            this.renderSectionBody(section, card);
            return card;
        }

        renderSectionHeader(section) {
            const heading = document.createElement('h2');
            heading.id = section.id;
            heading.className = 'text-xl font-bold text-slate-900 mb-4';
            heading.textContent = section.title;
            heading.setAttribute('tabindex', '-1');
            return heading;
        }

        renderSectionTree(section, headingLevel, isTopLevel, isFirstTopLevel) {
            const sectionEl = document.createElement('section');
            sectionEl.className = isTopLevel
                ? 'rounded-xl border border-slate-100 bg-white p-6 shadow-sm'
                : 'mt-4';

            if (isTopLevel) {
                sectionEl.appendChild(this.renderSectionHeader(section));
            }

            if (this.sectionHasDetails(section) && isTopLevel) {
                const cardTitle = section.children && section.children.length ? 'Access, Usage, and Notes' : section.title;
                const card = this.createSectionCard(section, 'root', cardTitle, false);
                const rawContent = this.store.getContent();
                if (isFirstTopLevel) {
                    if (rawContent.rules && rawContent.rules.length) {
                        card.appendChild(this.createCallout('Rules', rawContent.rules, 'rules'));
                    }
                    if (rawContent.notes && rawContent.notes.length) {
                        card.appendChild(this.createCallout('Notes', rawContent.notes, 'notes'));
                    }
                }
                sectionEl.appendChild(card);
            } else if (this.sectionHasDetails(section)) {
                sectionEl.appendChild(this.createSectionCard(section, 'nested', section.title, true));
            }

            if (section.children && section.children.length) {
                section.children.forEach(child => {
                    sectionEl.appendChild(this.renderSectionTree(child, Math.min(headingLevel + 1, 4), false, false));
                });
            }

            return sectionEl;
        }

        renderLegends(root) {
            const rawContent = this.store.getContent();
            if (!rawContent.legends || !rawContent.legends.length) return;

            const legendsWrap = document.createElement('div');
            legendsWrap.className = 'mb-8 rounded-lg border border-slate-100 bg-slate-50 p-5';

            const heading = document.createElement('h2');
            heading.className = 'font-semibold text-slate-900 mb-3';
            heading.textContent = 'Legends';
            legendsWrap.appendChild(heading);
            legendsWrap.appendChild(this.createBulletList(rawContent.legends));

            root.appendChild(legendsWrap);
        }

        renderAll(rootElementId = 'section-render-root') {
            const root = document.getElementById(rootElementId);
            if (!root) return;
            root.innerHTML = '';

            this.renderLegends(root);

            const sections = this.store.getSections();
            sections.forEach((section, index) => {
                root.appendChild(this.renderSectionTree(section, 2, true, index === 0));
            });
        }
    }

    global.ActivityLogRenderer = ActivityLogRenderer;
})(window);
