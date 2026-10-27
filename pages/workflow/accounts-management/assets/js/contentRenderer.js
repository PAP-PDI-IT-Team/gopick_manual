(function (global) {
    'use strict';

    const VIEW_PANEL_FUNCTIONS = {
        'account-detail': {},
        'privacy-consent': { expectedLabel: 'When you save' },
        'demographics': { expectedLabel: 'When you save' },
        'assessment-completion-page': { expectedLabel: 'When you save' },
        'assessment-center-logo': { expectedLabel: 'When you save' },
        'unblock-account': {},
        'manage-assigned-assessment': {}
    };

    const LISTING_PANEL_OPTIONS = { expectedLabel: 'What you see' };

    class AccountsRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        appendText(parent, tagName, className, textValue) {
            if (!textValue) return null;
            const element = document.createElement(tagName);
            element.className = className;
            element.textContent = textValue;
            parent.appendChild(element);
            return element;
        }

        createBulletList(items) {
            const listElement = document.createElement('ul');
            listElement.className = 'flat-list';
            items.forEach(itemData => {
                const listItem = document.createElement('li');
                listItem.className = 'flat-list__item';
                const marker = document.createElement('span');
                marker.className = 'flat-list__marker';
                marker.setAttribute('aria-hidden', 'true');
                const textValue2 = itemData && typeof itemData !== 'string' && itemData.href ? document.createElement('a') : document.createElement('span');
                textValue2.textContent = typeof itemData === 'string' ? itemData : itemData.label;
                if (itemData && typeof itemData !== 'string' && itemData.href) {
                    textValue2.href = itemData.href;
                    textValue2.className = 'flat-link';
                }
                listItem.appendChild(marker);
                listItem.appendChild(textValue2);
                listElement.appendChild(listItem);

                if (itemData && typeof itemData !== 'string' && itemData.children && itemData.children.length) {
                    const nested = document.createElement('ul');
                    nested.className = 'flat-list flat-list--nested';
                    itemData.children.forEach(child => {
                        const childItem = document.createElement('li');
                        if (child && typeof child !== 'string' && child.href) {
                            const childLink = document.createElement('a');
                            childLink.href = child.href;
                            childLink.className = 'flat-link';
                            childLink.textContent = child.label;
                            childItem.appendChild(childLink);
                        } else {
                            childItem.textContent = child;
                        }
                        nested.appendChild(childItem);
                    });
                    listElement.appendChild(nested);
                }
            });
            return listElement;
        }

        createActionLinkList(items) {
            const listElement2 = document.createElement('ul');
            listElement2.className = 'flat-actions';
            items.forEach(itemData2 => {
                const listItem2 = document.createElement('li');
                const linkElement = document.createElement('a');
                linkElement.className = 'flat-link flat-link--block';
                linkElement.href = itemData2.href;
                linkElement.textContent = itemData2.label;
                listItem2.appendChild(linkElement);
                if (itemData2.children && itemData2.children.length) {
                    listItem2.appendChild(this.createActionLinkList(itemData2.children));
                }
                listElement2.appendChild(listItem2);
            });
            return listElement2;
        }

        createBox(titleText, items, boxClass) {
            if (!items || !items.length) return null;
            const boxElement = document.createElement('div');
            boxElement.className = 'flat-callout flat-callout--' + (boxClass || 'rules');
            this.appendText(boxElement, 'h4', 'flat-callout__title', titleText);
            boxElement.appendChild(this.createBulletList(items));
            return boxElement;
        }

        appendSectionMeta(cardElement, section) {
            if (section.actions && section.actions.length) {
                const hasLinks = section.actions.some(itemData3 => itemData3 && typeof itemData3 !== 'string' && itemData3.href);
                this.appendText(cardElement, 'p', 'flat-card__label', hasLinks ? 'Related Features' : 'Controls');
                cardElement.appendChild(hasLinks ? this.createActionLinkList(section.actions) : this.createBulletList(section.actions));
            }

            if (section.actionGroups && section.actionGroups.length) {
                section.actionGroups.forEach(group => {
                    this.appendText(cardElement, 'p', 'flat-card__label', group.title);
                    cardElement.appendChild(this.createActionLinkList(group.links || []));
                });
            }

            const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
            if (section.images && section.images.length && imageRenderer) {
                cardElement.appendChild(imageRenderer.createImageGallery(section.images, section.title));
            }

            if (section.items && section.items.length) {
                cardElement.appendChild(this.createBulletList(section.items));
            }

            if (section.accessPath) {
                this.appendText(cardElement, 'p', 'flat-card__label', 'Access Path');
                this.appendText(cardElement, 'p', 'flat-card__text', section.accessPath);
            }

            if (section.howToUse && section.howToUse.length) {
                this.appendText(cardElement, 'p', 'flat-card__label', 'How To Use');
                cardElement.appendChild(this.createBulletList(section.howToUse));
            }

            if (section.rules && section.rules.length) {
                cardElement.appendChild(this.createBox('Rules', section.rules));
            }

            if (section.expected && section.expected.length) {
                cardElement.appendChild(this.createBox('Expected Result', section.expected, 'result'));
            }

            if (section.notes && section.notes.length) {
                section.notes.forEach(noteData => {
                    cardElement.appendChild(this.createBox('Notes: ' + noteData.label, noteData.items, 'notes'));
                });
            }
        }

        createInfoCard(section, level) {
            const cardElement2 = document.createElement('article');
            cardElement2.className = level === 'nested' ? 'flat-card flat-card--nested' : 'flat-card';
            if (!section.omitCardId) cardElement2.id = section.id;
            this.appendText(cardElement2, level === 'nested' ? 'h4' : 'h3', 'flat-card__title', section.title);
            this.appendText(cardElement2, 'p', 'flat-card__text', section.detail);
            this.appendSectionMeta(cardElement2, section);
            return cardElement2;
        }

        renderCreateAccount() {
            const container = document.getElementById('createAccountSections');
            if (!container) return;
            container.innerHTML = '';

            const content = this.store.getContent();
            container.appendChild(this.createWizardOverview(content.createAccount));

            const steps = content.createAccount.steps;
            let flowPanel = null;
            steps.forEach((stepData, index) => {
                if (global.AccountsFlowBuilders.FLOW_STEP_IDS.includes(stepData.id)) {
                    if (!flowPanel) {
                        flowPanel = this.createStepList(global.AccountsFlowBuilders.WIZARD_SEQUENCE);
                        container.appendChild(flowPanel);
                    }
                    flowPanel.appendChild(this.createStepListItem(this.createWizardStep(stepData, steps)));
                    return;
                }
                const cardElement3 = this.createInfoCard(stepData);
                const badge = document.createElement('div');
                badge.className = 'flat-card__order';
                badge.textContent = index + 1;
                cardElement3.insertBefore(badge, cardElement3.firstChild);
                container.appendChild(cardElement3);
            });
        }

        renderViewAccounts() {
            const container = document.getElementById('viewAccountsContent');
            if (!container) return;
            container.innerHTML = '';
            const viewAccounts = this.store.getContent().viewAccounts;
            container.appendChild(this.createViewPanel(viewAccounts, { tagName: 'div', className: 'flow-overview', titleTag: 'h3', title: 'Accounts listing' }));
            container.appendChild(this.createViewPanel(viewAccounts.archived, { tagName: 'article', id: viewAccounts.archived.id, className: 'flow-overview', titleTag: 'h3', title: viewAccounts.archived.title }));
        }

        createUpdateSpecificSection() {
            const section = this.store.getContent().updateSpecific;
            const overviewSection = Object.assign({}, section, { steps: section.groups });
            const fragment = document.createDocumentFragment();
            fragment.appendChild(this.createViewPanel(overviewSection, { tagName: 'article', id: section.id, className: 'flow-overview', titleTag: 'h3', title: section.title, bandLabel: 'Section variants', expectedLabel: 'When you save' }));
            fragment.appendChild(this.createFlowStepPanel(section.groups, global.AccountsFlowBuilders.VARIANT_SEQUENCE));
            return fragment;
        }

        createStepList(sequence) {
            if (!sequence) throw new Error('Step list requires a sequence');
            const stepList = document.createElement('ol');
            stepList.className = 'flow-step-panel';
            stepList.setAttribute('aria-label', sequence.listLabel);
            return stepList;
        }

        createStepListItem(stepArticle) {
            const listItem = document.createElement('li');
            listItem.className = 'flow-step-panel__item';
            listItem.appendChild(stepArticle);
            return listItem;
        }

        createFlowStepPanel(steps, sequence) {
            const flowPanel = this.createStepList(sequence);
            steps.forEach(stepData2 => flowPanel.appendChild(this.createStepListItem(this.createWizardStep(stepData2, steps))));
            return flowPanel;
        }

        createUpdateAccountSteps(section) {
            const groups = this.store.getContent().updateSpecific.groups;
            if (section.steps.length !== groups.length) {
                throw new Error('Update Account steps must match Update Specific groups');
            }
            return section.steps.map((stepData3, index) => ({
                id: stepData3.id,
                title: stepData3.title,
                images: stepData3.images,
                items: groups[index].items,
                rules: stepData3.rules,
                notes: groups[index].notes
            }));
        }

        renderFunctions() {
            const container = document.getElementById('functionSections');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.functions.forEach(section => {
                if (Object.prototype.hasOwnProperty.call(VIEW_PANEL_FUNCTIONS, section.id)) {
                    const panelOptions = Object.assign({ tagName: 'article', id: section.id, className: 'flow-overview', titleTag: 'h3', title: section.title }, VIEW_PANEL_FUNCTIONS[section.id]);
                    container.appendChild(this.createViewPanel(section, panelOptions));
                    return;
                }
                if (section.id === 'update-account') {
                    container.appendChild(this.createViewPanel(section, { tagName: 'article', id: section.id, className: 'flow-overview', titleTag: 'h3', title: section.title, bandLabel: 'Update wizard' }));
                    container.appendChild(this.createFlowStepPanel(this.createUpdateAccountSteps(section), global.AccountsFlowBuilders.WIZARD_SEQUENCE));
                    container.appendChild(this.createUpdateSpecificSection());
                    return;
                }
                container.appendChild(this.createInfoCard(section));
            });
        }

        createListingPanel(section, panelId) {
            const panelOptions = Object.assign({ tagName: 'article', className: 'flow-overview', titleTag: 'h3', title: section.title }, LISTING_PANEL_OPTIONS);
            if (panelId) panelOptions.id = panelId;
            return this.createViewPanel(section, panelOptions);
        }

        renderRowActions() {
            const container = document.getElementById('rowActionsContent');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.rowActions.forEach(section => {
                container.appendChild(this.createListingPanel(section, section.id));
            });
        }

        renderSearchSections() {
            const content = this.store.getContent();
            content.searchSections.forEach(section => {
                const container = document.getElementById(section.id + 'Content');
                if (!container) return;
                container.innerHTML = '';
                container.appendChild(this.createListingPanel(section, null));
            });
        }

        renderBulkActions() {
            const container = document.getElementById('bulkActionContent');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.bulkActions.forEach(section => {
                container.appendChild(this.createListingPanel(section, section.id));
            });
        }

        renderHero() {
            const content = this.store.getContent();
            const title = document.getElementById('accountsPageTitle');
            const description = document.getElementById('accountsPageDescription');
            if (title) title.textContent = content.title;
            if (description) description.textContent = content.description;
        }

        renderAll() {
            this.renderHero();
            this.renderCreateAccount();
            this.renderViewAccounts();
            this.renderFunctions();
            this.renderRowActions();
            this.renderSearchSections();
            this.renderBulkActions();
        }
    }

    if (!global.AccountsFlowBuilders) {
        throw new Error('AccountsRenderer requires AccountsFlowBuilders (flowBuilders.js)');
    }
    if (!global.AccountsViewBuilders) {
        throw new Error('AccountsRenderer requires AccountsViewBuilders (viewBuilders.js)');
    }
    Object.assign(AccountsRenderer.prototype, global.AccountsFlowBuilders.methods, global.AccountsViewBuilders.methods);

    global.AccountsRenderer = AccountsRenderer;
})(window);
