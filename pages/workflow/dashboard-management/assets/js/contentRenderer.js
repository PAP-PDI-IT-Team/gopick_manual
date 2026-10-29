(function (global) {
    'use strict';

    class DashboardContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        appendText(parent, tagName, className, textValue) {
            const element = document.createElement(tagName);
            element.className = className;
            element.textContent = textValue;
            parent.appendChild(element);
            return element;
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
                this.appendText(listItem, 'span', '', itemValue);
                listElement.appendChild(listItem);
            });
            return listElement;
        }

        createCallout(title, items, variant) {
            return global.sharedDocsComponents.createCallout(variant, title, this.createBulletList(items));
        }

        createAccessPath(steps) {
            return global.sharedDocsComponents.createAccessPath(steps);
        }

        createMetricRows(metrics) {
            const listElement = document.createElement('dl');
            listElement.className = 'dashboard-metrics';
            metrics.forEach(metric => {
                const rowElement = document.createElement('div');
                rowElement.className = 'dashboard-metrics__row';
                this.appendText(rowElement, 'dt', 'dashboard-metrics__label', metric.label);
                this.appendText(rowElement, 'dd', 'dashboard-metrics__detail', metric.detail);
                listElement.appendChild(rowElement);
            });
            return listElement;
        }

        createLinkChips(items) {
            const listElement = document.createElement('ul');
            listElement.className = 'dashboard-links';
            items.forEach(itemValue => {
                const listItem = document.createElement('li');
                listItem.className = 'dashboard-links__item';
                this.appendText(listItem, 'span', 'dashboard-links__title', itemValue.title);
                this.appendText(listItem, 'span', 'dashboard-links__kind', itemValue.subTitle.charAt(0) + itemValue.subTitle.slice(1).toLowerCase());
                listElement.appendChild(listItem);
            });
            return listElement;
        }

        createQuickLinkGroup(group) {
            const groupElement = document.createElement('div');
            groupElement.className = 'dashboard-group';
            this.appendText(groupElement, 'h3', 'dashboard-group__title', group.title);
            const hasLinkItems = group.items.every(itemValue => typeof itemValue !== 'string');
            groupElement.appendChild(hasLinkItems ? this.createLinkChips(group.items) : this.createBulletList(group.items));
            return groupElement;
        }

        renderImages(section, container) {
            if (!section.images || !section.images.length) return;
            if (!this.imageRenderer) throw new Error('Dashboard renderer requires GoPickImageRenderer');
            section.images.forEach(imageData => {
                container.appendChild(this.imageRenderer.createImageOrPlaceholder(imageData, section.title));
            });
        }

        renderSection(section) {
            const sectionElement = document.getElementById(section.id);
            if (!sectionElement) throw new Error('Dashboard section element missing: #' + section.id);
            sectionElement.replaceChildren();

            this.appendText(sectionElement, 'h2', 'flat-section__title', section.title);
            const content = document.createElement('div');
            content.className = 'flat-section__content';

            if (section.description) this.appendText(content, 'p', 'docs-section-lead', section.description);
            if (section.accessPaths && section.accessPaths.length) content.appendChild(this.createAccessPath(section.accessPaths));
            this.renderImages(section, content);

            if (section.metrics && section.metrics.length) {
                content.appendChild(this.createMetricRows(section.metrics));
            }

            if (section.quickLinks && section.quickLinks.length) {
                const groups = document.createElement('div');
                groups.className = 'dashboard-groups';
                section.quickLinks.forEach(group => groups.appendChild(this.createQuickLinkGroup(group)));
                content.appendChild(groups);
            }

            if (section.rules && section.rules.length) {
                content.appendChild(this.createCallout('Rules & Preconditions', section.rules, 'rules'));
            }

            if (section.expectedResults && section.expectedResults.length) {
                content.appendChild(this.createCallout('Expected Results', section.expectedResults, 'result'));
            }

            sectionElement.appendChild(content);
        }

        renderAll() {
            this.store.getSections().forEach(section => this.renderSection(section));
        }
    }

    global.DashboardContentRenderer = DashboardContentRenderer;
})(window);
