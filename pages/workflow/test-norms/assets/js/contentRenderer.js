(function (global) {
    'use strict';

    class TestNormsContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        renderHero() {
            const content = this.store.getContent();
            const pageTitle = document.getElementById('testNormsPageTitle');
            const pageDescription = document.getElementById('testNormsPageDescription');

            if (!pageTitle || !pageDescription || !content.title || !content.description) {
                throw new Error('TestNorms hero requires title and description elements and content.');
            }

            pageTitle.textContent = content.title;
            pageDescription.textContent = content.description;
        }

        createBulletList(items) {
            const bulletList = document.createElement('ul');
            bulletList.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(function (entryItem) {
                const listItem = document.createElement('li');
                listItem.className = 'flex gap-2';

                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

                const itemText = document.createElement('span');
                itemText.textContent = entryItem;

                listItem.appendChild(marker);
                listItem.appendChild(itemText);
                bulletList.appendChild(listItem);
            });
            return bulletList;
        }

        createCallout(title, items, calloutKind) {
            const calloutWrapper = document.createElement('div');
            const isRules = calloutKind === 'rules';
            calloutWrapper.className = isRules
                ? 'mt-5 rounded-lg border border-amber-100 bg-amber-50 p-5'
                : 'mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-5';

            const heading = document.createElement('h3');
            heading.className = isRules ? 'font-semibold text-amber-900 mb-3' : 'font-semibold text-emerald-900 mb-3';
            heading.textContent = title;

            calloutWrapper.appendChild(heading);
            calloutWrapper.appendChild(this.createBulletList(items));
            return calloutWrapper;
        }

        renderImages(section, target) {
            if (!section.images || !section.images.length) return;
            if (!this.imageRenderer || !this.imageRenderer.createImageOrPlaceholder) {
                throw new Error('Test Norms images require the shared image renderer.');
            }

            section.images.forEach(imageData => {
                const imageCard = this.imageRenderer.createImageOrPlaceholder(imageData, section.title);
                target.appendChild(imageCard);
            });
        }

        renderSectionBody(section, target) {
            this.renderImages(section, target);

            if (section.accessPaths && section.accessPaths.length) {
                const accessLabel = document.createElement('p');
                accessLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                accessLabel.textContent = 'Access Path';
                target.appendChild(accessLabel);

                const pathWrap = document.createElement('div');
                pathWrap.className = 'mt-3 mb-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium';
                section.accessPaths.forEach((pathLabel, pathIndex) => {
                    if (pathIndex > 0) {
                        const arrow = document.createElement('span');
                        arrow.className = 'text-slate-400';
                        arrow.textContent = '›';
                        pathWrap.appendChild(arrow);
                    }
                    const stepBadge = document.createElement('span');
                    stepBadge.className = 'px-2 py-0.5 rounded bg-slate-100 text-slate-700';
                    stepBadge.textContent = pathLabel;
                    pathWrap.appendChild(stepBadge);
                });
                target.appendChild(pathWrap);
            }

            if (section.requiredInputs && section.requiredInputs.length) {
                const inputLabel = document.createElement('p');
                inputLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                inputLabel.textContent = 'Required Inputs';
                target.appendChild(inputLabel);
                target.appendChild(this.createBulletList(section.requiredInputs));
            }

            if (section.steps && section.steps.length) {
                const stepLabel = document.createElement('p');
                stepLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                stepLabel.textContent = 'How To Use';
                target.appendChild(stepLabel);
                const stepList = document.createElement('ol');
                stepList.className = 'mt-3 ml-5 list-decimal space-y-2 text-sm text-slate-600 leading-relaxed';
                section.steps.forEach(stepText => {
                    const stepItem = document.createElement('li');
                    stepItem.textContent = stepText;
                    stepList.appendChild(stepItem);
                });
                target.appendChild(stepList);
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
                const descriptionText = document.createElement('p');
                descriptionText.className = 'text-sm text-slate-500 mt-2 mb-5';
                descriptionText.textContent = section.description;
                fragment.appendChild(descriptionText);
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
            const renderRoot = document.getElementById('section-render-root');
            if (!renderRoot) throw new Error('Test Norms section render root is missing.');
            renderRoot.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                renderRoot.appendChild(this.renderSectionTree(section, 2, null, true));
            });
        }
    }

    global.TestNormsContentRenderer = TestNormsContentRenderer;
})(window);
