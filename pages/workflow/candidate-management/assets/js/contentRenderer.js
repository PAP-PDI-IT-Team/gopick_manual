(function (global) {
    'use strict';

    const INPUT_KIND_PATTERN = /\b(required|optional|conditional|locked|defaulted|editable)\b/i;

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

        createItemContent(item) {
            if (item && item.href) {
                const link = document.createElement('a');
                link.className = 'flat-link';
                link.href = item.href;
                link.textContent = item.label;
                return link;
            }
            const text = document.createElement('span');
            text.textContent = item && item.label ? item.label : item;
            return text;
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
                listItem.appendChild(this.createItemContent(item));
                list.appendChild(listItem);
            });
            return list;
        }

        createStepList(steps) {
            const list = document.createElement('ol');
            list.className = 'docs-steps';
            steps.forEach(step => {
                const listItem = document.createElement('li');
                listItem.className = 'docs-steps__item';
                listItem.appendChild(this.createItemContent(step));
                list.appendChild(listItem);
            });
            return list;
        }

        createCallout(variantKey, items) {
            const variant = CALLOUT_VARIANTS[variantKey];
            const callout = document.createElement('div');
            callout.className = 'flat-callout flat-callout--' + variant.className;
            this.appendText(callout, 'h4', 'flat-callout__title', variant.title);
            callout.appendChild(this.createBulletList(items));
            return callout;
        }

        createAccessPath(accessPath) {
            const wrapper = document.createElement('div');
            wrapper.className = 'candidate-access';
            this.appendText(wrapper, 'span', 'docs-access__label', 'Find it in');
            const list = document.createElement('ol');
            list.className = 'docs-access';
            accessPath.split('>').map(step => step.trim()).forEach(step => this.appendText(list, 'li', 'docs-access__step', step));
            wrapper.appendChild(list);
            return wrapper;
        }

        createChipList(items, kind) {
            const list = document.createElement('ul');
            list.className = 'docs-chips docs-chips--' + kind;
            items.forEach(item => this.appendText(list, 'li', 'docs-chips__item', item));
            return list;
        }

        createGroup(group) {
            const groupElement = document.createElement('div');
            groupElement.className = 'docs-group';
            this.appendText(groupElement, 'h4', 'docs-group__title', group.title);
            const kindMatch = group.title.match(INPUT_KIND_PATTERN);
            const items = group.items || [];
            groupElement.appendChild(kindMatch ? this.createChipList(items, kindMatch[1].toLowerCase()) : this.createBulletList(items));
            if (group.rules && group.rules.length) groupElement.appendChild(this.createCallout('rules', group.rules));
            return groupElement;
        }

        renderSectionBody(section, target) {
            if (section.description) this.appendText(target, 'p', 'candidate-block__lead', section.description);
            if (section.accessPath) target.appendChild(this.createAccessPath(section.accessPath));

            if (section.groups) {
                const groups = document.createElement('div');
                groups.className = 'candidate-groups';
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
            block.className = 'candidate-block';
            if (this.hasDetails(section)) {
                block.id = section.id;
                const heading = this.appendText(block, 'h' + headingLevel, 'candidate-block__title candidate-block__title--h' + headingLevel, section.title);
                heading.setAttribute('tabindex', '-1');
                this.renderSectionBody(section, block);
            }
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
                const body = document.createElement('div');
                body.className = 'candidate-block candidate-block--top';
                this.renderSectionBody(section, body);
                sectionElement.appendChild(body);
            }

            (section.children || []).forEach(child => sectionElement.appendChild(this.renderChild(child, 3)));
            return sectionElement;
        }

        renderAll(rootElementId = 'section-render-root') {
            const root = document.getElementById(rootElementId);
            if (!root) throw new Error('Candidate render root missing: #' + rootElementId);
            root.replaceChildren();
            this.store.getSections().forEach(section => root.appendChild(this.renderTopSection(section)));
        }
    }

    global.CandidateContentRenderer = CandidateContentRenderer;
})(window);
