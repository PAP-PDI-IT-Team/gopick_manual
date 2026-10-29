(function (global) {
    'use strict';

    const DEEPEST_HEADING_LEVEL = 5;

    const INPUT_BLOCKS = [
        { key: 'requiredInputs', title: 'Required inputs' },
        { key: 'optionalInputs', title: 'Optional inputs' },
        { key: 'conditionalInputs', title: 'Conditional inputs' },
        { key: 'defaultedInputs', title: 'Defaulted inputs' },
        { key: 'lockedInputs', title: 'Locked inputs' }
    ];

    const CALLOUT_BLOCKS = [
        { key: 'rules', title: 'Rules', variant: 'rules' },
        { key: 'warning', title: 'Warning', variant: 'warning' },
        { key: 'expectedResults', title: 'Expected result', variant: 'result' },
        { key: 'notes', title: 'Notes', variant: 'notes' }
    ];

    function requireComponents() {
        if (!global.sharedDocsComponents) throw new Error('DocsBlockRenderer: docsComponents.js is not loaded');
        return global.sharedDocsComponents;
    }

    function hasEntries(value) {
        return Array.isArray(value) && value.length > 0;
    }

    class DocsBlockRenderer {
        constructor(store, options = {}) {
            if (!store || typeof store.getSections !== 'function') throw new Error('DocsBlockRenderer: needs a content store');
            this.store = store;
            this.components = requireComponents();
            this.imageRenderer = options.imageRenderer || null;
            this.blockBuilders = options.blockBuilders || {};
            this.sectionBuilders = options.sectionBuilders || {};
            this.rootId = options.rootId || 'section-render-root';
        }

        appendText(parent, tagName, className, textValue) {
            const element = document.createElement(tagName);
            if (className) element.className = className;
            element.textContent = textValue;
            parent.appendChild(element);
            return element;
        }

        createItemContent(item) {
            if (item && typeof item === 'object') {
                if (!item.label) throw new Error('DocsBlockRenderer: link items need a label');
                if (!item.href) {
                    const plainText = document.createElement('span');
                    plainText.textContent = item.label;
                    return plainText;
                }
                const link = document.createElement('a');
                link.className = 'flat-link';
                link.href = item.href;
                link.textContent = item.label;
                return link;
            }
            const text = document.createElement('span');
            text.textContent = item;
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
            return this.components.createSteps(steps, step => this.createItemContent(step));
        }

        createInputTable(inputGroups) {
            return this.components.createInputTable(inputGroups, item => this.createItemContent(item));
        }

        createCallout(title, variant, items) {
            return this.components.createCallout(variant, title, this.createBulletList(items));
        }

        createGroup(title, content) {
            const group = document.createElement('div');
            group.className = 'docs-group';
            this.appendText(group, 'p', 'docs-group__title', title);
            group.appendChild(content);
            return group;
        }

        createAccessPath(pathSteps) {
            return this.components.createAccessPath(pathSteps, pathStep => this.createItemContent(pathStep));
        }

        createAccessPaths(accessPaths) {
            const paths = accessPaths.every(Array.isArray) ? accessPaths : [accessPaths];
            const wrapper = document.createElement('div');
            wrapper.className = 'docs-access-paths';
            paths.forEach(pathSteps => wrapper.appendChild(this.createAccessPath(pathSteps)));
            return wrapper;
        }

        createCodeBlock(codeBlock) {
            const figure = document.createElement('figure');
            figure.className = 'docs-code';
            this.appendText(figure, 'figcaption', 'docs-code__label', codeBlock.label || codeBlock.language);
            const preformatted = document.createElement('pre');
            preformatted.className = 'docs-code__body';
            preformatted.tabIndex = 0;
            this.appendText(preformatted, 'code', '', codeBlock.code);
            figure.appendChild(preformatted);
            return figure;
        }

        createDataGroup(group) {
            const items = group.items || [];
            const isInputGroup = this.components.isInputGroupTitle(group.title);
            const groupElement = this.createGroup(group.title, isInputGroup ? this.createInputTable([{ title: group.title, items: items }]) : this.createBulletList(items));
            if (hasEntries(group.rules)) groupElement.appendChild(this.createCallout('Rules', 'rules', group.rules));
            return groupElement;
        }


        renderVisibleContent(section, target) {
            if (hasEntries(section.links)) target.appendChild(this.createGroup('Available actions', this.createBulletList(section.links)));
            if (hasEntries(section.items)) target.appendChild(this.createGroup('Visible content', this.createBulletList(section.items)));
            if (hasEntries(section.bullets)) target.appendChild(this.createBulletList(section.bullets));

            const inputGroups = INPUT_BLOCKS
                .filter(inputBlock => hasEntries(section[inputBlock.key]))
                .map(inputBlock => ({ title: inputBlock.title, items: section[inputBlock.key] }));
            if (inputGroups.length) target.appendChild(this.createGroup('Inputs', this.createInputTable(inputGroups)));

            if (hasEntries(section.groups)) {
                const groups = document.createElement('div');
                groups.className = 'docs-groups';
                section.groups.forEach(group => groups.appendChild(this.createDataGroup(group)));
                target.appendChild(groups);
            }

            if (hasEntries(section.images)) {
                if (!this.imageRenderer) throw new Error('DocsBlockRenderer: section ' + section.id + ' has images but no image renderer');
                section.images.forEach(imageData => target.appendChild(this.imageRenderer.createImageOrPlaceholder(imageData, section.title)));
            }

            if (hasEntries(section.codeBlocks)) section.codeBlocks.forEach(codeBlock => target.appendChild(this.createCodeBlock(codeBlock)));

            Object.keys(this.blockBuilders).forEach(blockKey => {
                if (section[blockKey] !== undefined) target.appendChild(this.blockBuilders[blockKey](section[blockKey], section));
            });

            if (this.sectionBuilders[section.id]) target.appendChild(this.sectionBuilders[section.id](section, this.store.getContent()));
        }

        renderSectionBody(section, target) {
            if (section.status) this.appendText(target, 'p', 'docs-block__status', section.status);
            if (section.description) this.appendText(target, 'p', 'docs-block__lead', section.description);
            if (hasEntries(section.accessPaths)) target.appendChild(this.createAccessPaths(section.accessPaths));

            this.renderVisibleContent(section, target);

            if (hasEntries(section.steps)) target.appendChild(this.createGroup('How to use', this.createStepList(section.steps)));

            CALLOUT_BLOCKS.forEach(calloutBlock => {
                if (hasEntries(section[calloutBlock.key])) target.appendChild(this.createCallout(calloutBlock.title, calloutBlock.variant, section[calloutBlock.key]));
            });
        }


        renderChild(section, headingLevel) {
            const block = document.createElement('article');
            block.className = 'docs-block';
            block.id = section.id;
            this.appendText(block, 'h' + headingLevel, 'docs-block__title docs-block__title--h' + headingLevel, section.title);
            this.renderSectionBody(section, block);
            (section.children || []).forEach(child => block.appendChild(this.renderChild(child, Math.min(headingLevel + 1, DEEPEST_HEADING_LEVEL))));
            return block;
        }

        renderTopSection(section) {
            const sectionElement = document.createElement('section');
            sectionElement.className = 'flat-section';
            const heading = this.appendText(sectionElement, 'h2', 'flat-section__title', section.title);
            heading.id = section.id;

            const body = document.createElement('div');
            body.className = 'docs-block docs-block--top';
            this.renderSectionBody(section, body);
            sectionElement.appendChild(body);

            (section.children || []).forEach(child => sectionElement.appendChild(this.renderChild(child, 3)));
            return sectionElement;
        }

        renderPageCallouts(root) {
            const content = this.store.getContent();
            const pageCallouts = [
                { key: 'tldr', title: 'TL;DR', variant: 'result' },
                { key: 'rules', title: 'Rules', variant: 'rules' },
                { key: 'notes', title: 'Notes', variant: 'notes' }
            ];
            pageCallouts.forEach(calloutBlock => {
                if (hasEntries(content[calloutBlock.key])) root.appendChild(this.createCallout(calloutBlock.title, calloutBlock.variant, content[calloutBlock.key]));
            });
        }

        renderAllSections() {
            const root = document.getElementById(this.rootId);
            if (!root) throw new Error('DocsBlockRenderer: missing #' + this.rootId);
            root.replaceChildren();
            this.renderPageCallouts(root);
            this.store.getSections().forEach(section => root.appendChild(this.renderTopSection(section)));
        }
    }

    global.DocsBlockRenderer = DocsBlockRenderer;
})(window);
