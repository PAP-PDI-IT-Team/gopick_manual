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

        createCallout(title, items, variant) {
            return global.sharedDocsComponents.createCallout(variant, title, this.createBulletList(items));
        }

        createAccessPath(steps) {
            return global.sharedDocsComponents.createAccessPath(steps);
        }

        createMetricRows(metrics) {
            const list = document.createElement('dl');
            list.className = 'dashboard-metrics';
            metrics.forEach(metric => {
                const row = document.createElement('div');
                row.className = 'dashboard-metrics__row';
                this.appendText(row, 'dt', 'dashboard-metrics__label', metric.label);
                this.appendText(row, 'dd', 'dashboard-metrics__detail', metric.detail);
                list.appendChild(row);
            });
            return list;
        }

        createLinkChips(items) {
            const list = document.createElement('ul');
            list.className = 'dashboard-links';
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'dashboard-links__item';
                this.appendText(listItem, 'span', 'dashboard-links__title', item.title);
                this.appendText(listItem, 'span', 'dashboard-links__kind', item.subTitle.charAt(0) + item.subTitle.slice(1).toLowerCase());
                list.appendChild(listItem);
            });
            return list;
        }

        createQuickLinkGroup(group) {
            const groupElement = document.createElement('div');
            groupElement.className = 'dashboard-group';
            this.appendText(groupElement, 'h3', 'dashboard-group__title', group.title);
            const hasLinkItems = group.items.every(item => typeof item !== 'string');
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
