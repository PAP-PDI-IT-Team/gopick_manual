(function (global) {
    'use strict';

    class CandidateContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex gap-2';
                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
                const content = item && item.href ? document.createElement('a') : document.createElement('span');
                content.textContent = item && item.label ? item.label : item;
                if (item && item.href) {
                    content.href = item.href;
                    content.className = 'font-semibold text-brand hover:text-brand-dark transition-colors';
                }
                li.appendChild(marker);
                li.appendChild(content);
                list.appendChild(li);
            });
            return list;
        }

        createCallout(title, items, variant) {
            const wrap = document.createElement('div');
            const isRules = variant === 'rules';
            const isSystem = variant === 'system';
            const isExpected = variant === 'expected';
            wrap.className = isRules
                ? 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4'
                : (isSystem
                    ? 'mt-4 rounded-lg border border-violet-100 bg-violet-50 p-4'
                    : (isExpected
                        ? 'mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4'
                        : 'mt-4 rounded-lg border border-slate-100 bg-white p-4'));

            const heading = document.createElement('h3');
            heading.className = isRules
                ? 'font-semibold text-amber-900 mb-2'
                : (isSystem ? 'font-semibold text-violet-900 mb-2' : (isExpected ? 'font-semibold text-emerald-900 mb-2' : 'font-semibold text-slate-900 mb-2'));
            heading.textContent = title;

            wrap.appendChild(heading);
            wrap.appendChild(this.createBulletList(items));
            return wrap;
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

                if (group.rules && group.rules.length) {
                    wrap.appendChild(this.createCallout('Rules', group.rules, 'rules'));
                }

                container.appendChild(wrap);
            });
        }

        renderSectionBody(section, target) {
            if (section.accessPath) {
                const accessLabel = document.createElement('p');
                accessLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                accessLabel.textContent = 'Access Path';
                target.appendChild(accessLabel);

                const accessPath = document.createElement('p');
                accessPath.className = 'mt-1 mb-5 text-sm text-slate-600 leading-relaxed';
                accessPath.textContent = section.accessPath;
                target.appendChild(accessPath);
            }

            if (section.groups) {
                const groupsWrap = document.createElement('div');
                groupsWrap.className = 'space-y-4';
                this.renderGroups(groupsWrap, section.groups);
                target.appendChild(groupsWrap);
            }

            if (section.steps) {
                const stepLabel = document.createElement('p');
                stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                stepLabel.textContent = 'How To Use';
                target.appendChild(stepLabel);
                target.appendChild(this.createBulletList(section.steps));
            }

            const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
            if (section.images && section.images.length && imageRenderer) {
                section.images.forEach(imageObj => {
                    target.appendChild(imageRenderer.createImageOrPlaceholder(imageObj, section.title));
                });
            }

            if (section.rules) {
                target.appendChild(this.createCallout('Rules', section.rules, 'rules'));
            }

            if (section.expected) {
                target.appendChild(this.createCallout('Expected Result', section.expected, 'expected'));
            }

            if (section.notes) {
                target.appendChild(this.createCallout('Notes', section.notes, 'notes'));
            }

            if (section.systems) {
                target.appendChild(this.createCallout('System', section.systems, 'system'));
            }
        }

        renderSectionHeader(section, headingLevel, eyebrowText) {
            const fragment = document.createDocumentFragment();
            const label = eyebrowText || section.eyebrow;
            if (label) {
                const eyebrow = document.createElement('div');
                eyebrow.className = 'text-xs font-bold uppercase tracking-wider text-brand mb-2';
                eyebrow.textContent = label;
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

        renderSectionTree(section, headingLevel, eyebrowText, isTopLevel) {
            const sectionEl = document.createElement('section');
            sectionEl.className = isTopLevel ? 'mb-10' : 'mt-4';

            const hasParentDetails = section.description || section.accessPath || section.steps || section.groups || section.rules || section.expected || section.notes || section.systems || (section.images && section.images.length);
            if (isTopLevel) {
                sectionEl.appendChild(this.renderSectionHeader(section, headingLevel, eyebrowText));
            }

            if (hasParentDetails && isTopLevel) {
                const title = section.children && section.children.length ? 'Access, Usage, and Notes' : section.title;
                sectionEl.appendChild(this.createSectionCard(section, 'root', title, false));
            } else if (hasParentDetails) {
                sectionEl.appendChild(this.createSectionCard(section, 'nested', section.title, true));
            }

            if (section.children) {
                section.children.forEach(child => {
                    sectionEl.appendChild(this.renderSectionTree(child, Math.min(headingLevel + 1, 4), section.title, false));
                });
            }

            return sectionEl;
        }

        renderAll(rootElementId = 'section-render-root') {
            const root = document.getElementById(rootElementId);
            if (!root) return;
            root.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                root.appendChild(this.renderSectionTree(section, 2, null, true));
            });
        }
    }

    global.CandidateContentRenderer = CandidateContentRenderer;
})(window);
