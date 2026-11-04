(function (global) {
    'use strict';

    const CALLOUT_VARIANTS = {
        rules: { title: 'Rules', className: 'rules' },
        expected: { title: 'Expected Result', className: 'result' },
        notes: { title: 'Notes', className: 'notes' },
        systems: { title: 'System', className: 'notes' }
    };

    class CandidateContentRenderer {
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

        createItemContent(itemValue) {
            if (itemValue && itemValue.href) {
                const linkElement = document.createElement('a');
                linkElement.className = 'flat-link';
                linkElement.href = itemValue.href;
                linkElement.textContent = itemValue.label;
                return linkElement;
            }
            const textElement = document.createElement('span');
            textElement.textContent = itemValue && itemValue.label ? itemValue.label : itemValue;
            return textElement;
        }

        createBulletList(items) {
            const listElement = document.createElement('ul');
            listElement.className = 'flat-list';
            items.forEach(itemValue => {
                const listItem = document.createElement('li');
                listItem.className = 'flat-list__item';
                const marker = document.createElement('span');
                marker.className = 'flat-list__marker';
                marker.setAttribute('aria-hidden', 'true');
                listItem.appendChild(marker);
                listItem.appendChild(this.createItemContent(itemValue));
                listElement.appendChild(listItem);
            });
            return listElement;
        }

        createStepList(steps) {
            return global.sharedDocsComponents.createSteps(steps, stepValue => this.createItemContent(stepValue));
        }

        createCallout(variantKey, items) {
            const variant = CALLOUT_VARIANTS[variantKey];
            return global.sharedDocsComponents.createCallout(variant.className, variant.title, this.createBulletList(items));
        }

        createAccessPath(accessPath) {
            return global.sharedDocsComponents.createAccessPath(accessPath.split('>').map(stepValue => stepValue.trim()));
        }

        createInputTable(groupTitle, items) {
            return global.sharedDocsComponents.createInputTable([{ title: groupTitle, items: items }], itemValue => this.createItemContent(itemValue));
        }

        createGroup(group) {
            const groupElement = document.createElement('div');
            groupElement.className = 'docs-group';
            this.appendText(groupElement, 'h4', 'docs-group__title', group.title);
            const items = group.items || [];
            groupElement.appendChild(global.sharedDocsComponents.isInputGroupTitle(group.title) ? this.createInputTable(group.title, items) : this.createBulletList(items));
            if (group.rules && group.rules.length) groupElement.appendChild(this.createCallout('rules', group.rules));
            return groupElement;
        }

        renderSectionBody(section, target) {
            if (section.description) this.appendText(target, 'p', 'docs-block__lead', section.description);
            if (section.accessPath) target.appendChild(this.createAccessPath(section.accessPath));

            if (section.groups) {
                const groups = document.createElement('div');
                groups.className = 'docs-groups';
                section.groups.forEach(group => groups.appendChild(this.createGroup(group)));
                target.appendChild(groups);
            }

            if (section.steps) {
                this.appendText(target, 'h4', 'docs-group__title', 'How To Use');
                target.appendChild(this.createStepList(section.steps));
            }

            const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
            if (section.images && section.images.length) {
                if (!imageRenderer) throw new Error('Candidate renderer requires GoPickImageRenderer');
                section.images.forEach(imageData => target.appendChild(imageRenderer.createImageOrPlaceholder(imageData, section.title)));
            }

            Object.keys(CALLOUT_VARIANTS).forEach(variantKey => {
                if (section[variantKey] && section[variantKey].length) target.appendChild(this.createCallout(variantKey, section[variantKey]));
            });
        }

        hasDetails(section) {
            return Boolean(section.description || section.accessPath || section.steps || section.groups || section.rules || section.expected || section.notes || section.systems || (section.images && section.images.length));
        }

        renderChild(section, headingLevel) {
            const block = document.createElement('article');
            block.className = 'docs-block';
            block.id = section.id;
            const heading = this.appendText(block, 'h' + headingLevel, 'docs-block__title docs-block__title--h' + headingLevel, section.title);
            heading.setAttribute('tabindex', '-1');
            if (this.hasDetails(section)) this.renderSectionBody(section, block);
            (section.children || []).forEach(child => block.appendChild(this.renderChild(child, Math.min(headingLevel + 1, 4))));
            return block;
        }

        renderTopSection(section) {
            const sectionElement = document.createElement('section');
            sectionElement.className = 'flat-section';
            const heading = this.appendText(sectionElement, 'h2', 'flat-section__title', section.title);
            heading.id = section.id;
            heading.setAttribute('tabindex', '-1');

            if (this.hasDetails(section)) {
                const bodyElement = document.createElement('div');
                bodyElement.className = 'docs-block docs-block--top';
                this.renderSectionBody(section, bodyElement);
                sectionElement.appendChild(bodyElement);
            }

            (section.children || []).forEach(child => sectionElement.appendChild(this.renderChild(child, 3)));
            return sectionElement;
        }

        renderAll(rootElementId = 'section-render-root') {
            const rootElement = document.getElementById(rootElementId);
            if (!rootElement) throw new Error('Candidate render root missing: #' + rootElementId);
            rootElement.replaceChildren();
            this.store.getSections().forEach(section => rootElement.appendChild(this.renderTopSection(section)));
        }
    }

    global.CandidateContentRenderer = CandidateContentRenderer;
})(window);
