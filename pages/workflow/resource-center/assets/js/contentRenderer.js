(function (global) {
    'use strict';

    class ResourceCenterContentRenderer {
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
            wrap.className = kind === 'status'
                ? 'mt-5 rounded-lg border border-slate-100 bg-slate-50 p-5'
                : 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5';

            const heading = document.createElement('h3');
            heading.className = kind === 'status' ? 'font-semibold text-slate-900 mb-3' : 'font-semibold text-amber-900 mb-3';
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
                const stepsTitle = document.createElement('h4');
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

            if (section.status) {
                target.appendChild(this.createCallout('Status', [section.status], 'status'));
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

        renderAllSections() {
            const root = document.getElementById('section-render-root');
            if (!root) return;
            root.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                root.appendChild(this.renderSectionTree(section, 2, null, true));
            });
        }
    }

    global.ResourceCenterContentRenderer = ResourceCenterContentRenderer;
})(window);
