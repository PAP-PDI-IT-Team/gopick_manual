(function (global) {
    'use strict';

    class UsersContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
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

        renderGroups(container, groups) {
            groups.forEach(group => {
                const wrap = document.createElement('div');
                wrap.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';

                const heading = document.createElement('h3');
                heading.className = 'font-semibold text-slate-900 mb-3';
                heading.textContent = group.title;
                wrap.appendChild(heading);

                if (group.items && group.items.length) {
                    wrap.appendChild(this.createBulletList(group.items));
                }

                if (group.rules && group.rules.length) {
                    const rulesWrap = document.createElement('div');
                    rulesWrap.className = 'mt-4 rounded-md border border-amber-200 bg-amber-50 p-4';

                    const rulesHeading = document.createElement('h4');
                    rulesHeading.className = 'font-semibold text-amber-900 mb-2 text-sm';
                    rulesHeading.textContent = 'Rules';

                    rulesWrap.appendChild(rulesHeading);
                    rulesWrap.appendChild(this.createBulletList(group.rules));
                    wrap.appendChild(rulesWrap);
                }

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
                const stepLabel = document.createElement('p');
                stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                stepLabel.textContent = 'How To Use';
                target.appendChild(stepLabel);
                target.appendChild(this.createBulletList(section.steps));
            }

            if (section.warning && section.warning.length) {
                const warningWrap = document.createElement('div');
                warningWrap.className = 'mt-5 rounded-lg border border-rose-200 bg-rose-50 p-5';

                const warningHeader = document.createElement('div');
                warningHeader.className = 'mb-3 flex items-center gap-2';

                const warningIcon = document.createElement('span');
                warningIcon.className = 'inline-flex h-5 w-5 items-center justify-center text-rose-700';
                warningIcon.setAttribute('aria-hidden', 'true');
                warningIcon.innerHTML = '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>';

                const warningHeading = document.createElement('h3');
                warningHeading.className = 'font-semibold text-rose-900';
                warningHeading.textContent = 'Warning';

                warningHeader.appendChild(warningIcon);
                warningHeader.appendChild(warningHeading);
                warningWrap.appendChild(warningHeader);
                warningWrap.appendChild(this.createBulletList(section.warning));
                target.appendChild(warningWrap);
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

    global.UsersContentRenderer = UsersContentRenderer;
})(window);
