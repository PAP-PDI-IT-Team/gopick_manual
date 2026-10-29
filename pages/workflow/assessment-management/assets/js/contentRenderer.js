(function (global) {
    'use strict';

    const CALLOUT_VARIANTS = {
        rules: { title: 'Rules', className: 'rules' },
        expectedResults: { title: 'Expected Result', className: 'result' }
    };

    class AssessmentContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        appendText(parent, tagName, className, textValue) {
            const element = document.createElement(tagName);
            if (className) element.className = className;
            element.textContent = textValue;
            parent.appendChild(element);
            return element;
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
            const list = document.createElement('ul');
            list.className = 'flat-list';
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'flat-list__item';
                const marker = document.createElement('span');
                marker.className = 'flat-list__marker';
                marker.setAttribute('aria-hidden', 'true');
                listItem.appendChild(marker);
                this.appendText(listItem, 'span', '', item);
                list.appendChild(listItem);
            });
            return list;
        }

        createStepList(steps) {
            return global.sharedDocsComponents.createSteps(steps, step => document.createTextNode(step));
        }

        createCallout(variantKey, items) {
            const variant = CALLOUT_VARIANTS[variantKey];
            return global.sharedDocsComponents.createCallout(variant.className, variant.title, this.createBulletList(items));
        }

        createAccessPath(steps) {
            return global.sharedDocsComponents.createAccessPath(steps);
        }

        renderSectionBody(section, target) {
            if (section.description) this.appendText(target, 'p', 'docs-block__lead', section.description);
            if (section.accessPaths && section.accessPaths.length) target.appendChild(this.createAccessPath(section.accessPaths));

            if (section.images && section.images.length) {
                if (!this.imageRenderer) throw new Error('Assessment renderer requires GoPickImageRenderer');
                section.images.forEach(imageData => target.appendChild(this.imageRenderer.createImageOrPlaceholder(imageData, section.title)));
            }

            if (section.steps && section.steps.length) {
                this.appendText(target, 'h4', 'docs-group__title', 'How To Use');
                target.appendChild(this.createStepList(section.steps));
            }

            Object.keys(CALLOUT_VARIANTS).forEach(variantKey => {
                if (section[variantKey] && section[variantKey].length) target.appendChild(this.createCallout(variantKey, section[variantKey]));
            });
        }

        renderChild(section, headingLevel) {
            const block = document.createElement('article');
            block.className = 'docs-block';
            block.id = section.id;
            const heading = this.appendText(block, 'h' + headingLevel, 'docs-block__title docs-block__title--h' + headingLevel, section.title);
            heading.setAttribute('tabindex', '-1');
            this.renderSectionBody(section, block);
            (section.children || []).forEach(child => block.appendChild(this.renderChild(child, Math.min(headingLevel + 1, 4))));
            return block;
        }

        renderTopSection(section) {
            const sectionElement = document.createElement('section');
            sectionElement.className = 'flat-section';
            const heading = this.appendText(sectionElement, 'h2', 'flat-section__title', section.title);
            heading.id = section.id;
            heading.setAttribute('tabindex', '-1');

            const body = document.createElement('div');
            body.className = 'docs-block docs-block--top';
            this.renderSectionBody(section, body);
            sectionElement.appendChild(body);

            (section.children || []).forEach(child => sectionElement.appendChild(this.renderChild(child, 3)));
            return sectionElement;
        }

        renderAllSections() {
            const root = document.getElementById('section-render-root');
            if (!root) throw new Error('Assessment render root missing: #section-render-root');
            root.replaceChildren();
            this.store.getSections().forEach(section => root.appendChild(this.renderTopSection(section)));
        }
    }

    global.AssessmentContentRenderer = AssessmentContentRenderer;
})(window);
