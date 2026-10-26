(function (global) {
    'use strict';

    class AssessmentContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        renderHero() {
            const content = this.store.getContent();
            const pageTitle = document.getElementById('assessmentPageTitle');
            const pageDescription = document.getElementById('assessmentPageDescription');

            if (!pageTitle || !pageDescription || !content.title || !content.description) {
                throw new Error('Assessment hero requires title and description elements and content.');
            }

            pageTitle.textContent = content.title;
            pageDescription.textContent = content.description;
        }

        createBulletList(items) {
            const bulletList = document.createElement('ul');
            bulletList.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(function (bulletItem) {
                const listItem = document.createElement('li');
                listItem.className = 'flex gap-2';

                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';

                const itemText = document.createElement('span');
                itemText.textContent = bulletItem;

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
            if (!this.imageRenderer || !this.imageRenderer.createImageOrPlaceholder) return;

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

            if (section.links && section.links.length) {
                section.links.forEach(linkItem => {
                    const linkGroup = document.createElement('div');
                    linkGroup.className = 'mt-3 w-full';

                    const sectionLink = document.createElement('span');
                    sectionLink.className = 'block w-full cursor-not-allowed rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400';
                    sectionLink.setAttribute('aria-label', linkItem.label);

                    const statusImage = document.createElement('img');
                    statusImage.src = linkItem.image;
                    statusImage.alt = linkItem.label;
                    statusImage.className = 'block h-auto w-full max-w-full rounded-lg';
                    statusImage.loading = 'lazy';
                    sectionLink.appendChild(statusImage);
                    sectionLink.setAttribute('role', 'link');
                    sectionLink.setAttribute('aria-disabled', String(linkItem.disabled));
                    sectionLink.setAttribute('tabindex', '0');
                    linkGroup.appendChild(sectionLink);
                    target.appendChild(linkGroup);
                });
            }

            [
                { key: 'requiredInputs', label: 'Required Inputs' },
                { key: 'optionalInputs', label: 'Optional Inputs' }
            ].forEach(inputGroup => {
                if (section[inputGroup.key] && section[inputGroup.key].length) {
                    const inputLabel = document.createElement('p');
                    inputLabel.className = 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400';
                    inputLabel.textContent = inputGroup.label;
                    target.appendChild(inputLabel);
                    target.appendChild(this.createBulletList(section[inputGroup.key]));
                }
            });

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

        createWizardCard(section) {
            const wizardCard = document.createElement('article');
            wizardCard.className = 'rounded-lg border border-slate-100 bg-slate-50 p-5';
            wizardCard.id = section.id;
            wizardCard.setAttribute('tabindex', '-1');

            const heading = document.createElement('h3');
            heading.className = 'font-semibold text-slate-900 mb-2';
            heading.textContent = section.title;
            wizardCard.appendChild(heading);

            if (section.description) {
                const descriptionText = document.createElement('p');
                descriptionText.className = 'text-sm text-slate-600 leading-relaxed';
                descriptionText.textContent = section.description;
                wizardCard.appendChild(descriptionText);
            }

            this.renderSectionBody(section, wizardCard);
            return wizardCard;
        }

        renderCreateTestBattery(section) {
            const wizardSection = document.createElement('section');
            wizardSection.id = section.id;
            wizardSection.className = 'bg-white rounded-xl border border-slate-100 p-6 shadow-sm';
            wizardSection.setAttribute('tabindex', '-1');

            const heading = document.createElement('h2');
            heading.className = 'text-xl font-bold text-slate-900 mb-4';
            heading.textContent = section.title;
            wizardSection.appendChild(heading);

            const container = document.createElement('div');
            container.className = 'grid gap-4 grid-cols-1';
            const summary = this.createWizardCard(Object.assign({}, section, {
                title: 'Wizard Overview',
                id: 'create-test-battery-summary'
            }));
            container.appendChild(summary);

            section.children.forEach((wizardStep, stepIndex) => {
                const stepCard = this.createWizardCard(wizardStep);
                const badge = document.createElement('div');
                badge.className = 'mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white';
                badge.textContent = stepIndex + 1;
                stepCard.insertBefore(badge, stepCard.firstChild);
                container.appendChild(stepCard);
            });

            wizardSection.appendChild(container);
            return wizardSection;
        }

        renderAllSections() {
            const renderRoot = document.getElementById('section-render-root');
            if (!renderRoot) return;
            renderRoot.innerHTML = '';

            const sections = this.store.getSections();
            sections.forEach(section => {
                renderRoot.appendChild(section.id === 'create-test-battery'
                    ? this.renderCreateTestBattery(section)
                    : this.renderSectionTree(section, 2, null, true));
            });
        }
    }

    global.AssessmentContentRenderer = AssessmentContentRenderer;
})(window);
