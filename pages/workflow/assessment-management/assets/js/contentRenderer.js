(function (global) {
    'use strict';

    class AssessmentContentRenderer {
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

            if (section.accessPaths && section.accessPaths.length) {
                const pathWrap = document.createElement('div');
                pathWrap.className = 'mt-3 mb-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium';
                section.accessPaths.forEach((step, idx) => {
                    if (idx > 0) {
                        const arrow = document.createElement('span');
                        arrow.className = 'text-slate-400';
                        arrow.textContent = '›';
                        pathWrap.appendChild(arrow);
                    }
                    const stepBadge = document.createElement('span');
                    stepBadge.className = 'px-2 py-0.5 rounded bg-slate-100 text-slate-700';
                    stepBadge.textContent = step;
                    pathWrap.appendChild(stepBadge);
                });
                target.appendChild(pathWrap);
            }

            if (section.steps && section.steps.length) {
                const stepLabel = document.createElement('p');
                stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                stepLabel.textContent = 'How To Use';
                target.appendChild(stepLabel);
                target.appendChild(this.createBulletList(section.steps));
            }

            if (section.rules && section.rules.length) {
                target.appendChild(this.createCallout('Rules', section.rules, 'rules'));
            }

            if (section.expectedResults && section.expectedResults.length) {
                target.appendChild(this.createCallout('Expected Result', section.expectedResults, 'expected'));
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
            sectionEl.className = isTopLevel ? 'mb-10 bg-white rounded-xl border border-slate-100 p-6 shadow-sm' : 'mt-6 rounded-lg border border-slate-100 bg-slate-50 p-5';
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

    global.AssessmentContentRenderer = AssessmentContentRenderer;
})(window);
