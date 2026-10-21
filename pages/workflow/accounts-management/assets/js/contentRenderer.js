(function (global) {
    'use strict';

    class AccountsRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        appendText(parent, tagName, className, text) {
            if (!text) return null;
            const element = document.createElement(tagName);
            element.className = className;
            element.textContent = text;
            parent.appendChild(element);
            return element;
        }

        createBulletList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 space-y-2 text-sm text-slate-600 leading-relaxed';
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'flex gap-2';
                const marker = document.createElement('span');
                marker.className = 'mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0';
                const text = item && typeof item !== 'string' && item.href ? document.createElement('a') : document.createElement('span');
                text.textContent = typeof item === 'string' ? item : item.label;
                if (item && typeof item !== 'string' && item.href) {
                    text.href = item.href;
                    text.className = 'font-semibold text-brand hover:text-brand-dark transition-colors';
                }
                li.appendChild(marker);
                li.appendChild(text);
                list.appendChild(li);

                if (item && typeof item !== 'string' && item.children && item.children.length) {
                    const nested = document.createElement('ul');
                    nested.className = 'ml-7 mt-2 space-y-1 text-sm text-slate-500';
                    item.children.forEach(child => {
                        const childItem = document.createElement('li');
                        if (child && typeof child !== 'string' && child.href) {
                            const childLink = document.createElement('a');
                            childLink.href = child.href;
                            childLink.className = 'font-semibold text-brand hover:text-brand-dark transition-colors';
                            childLink.textContent = child.label;
                            childItem.appendChild(childLink);
                        } else {
                            childItem.textContent = child;
                        }
                        nested.appendChild(childItem);
                    });
                    list.appendChild(nested);
                }
            });
            return list;
        }

        createActionLinkList(items) {
            const list = document.createElement('ul');
            list.className = 'mt-3 ml-4 space-y-2 border-l border-slate-100 pl-4';
            items.forEach(item => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.className = 'block text-sm font-semibold text-brand hover:text-brand-dark transition-colors';
                link.href = item.href;
                link.textContent = item.label;
                li.appendChild(link);
                if (item.children && item.children.length) {
                    li.appendChild(this.createActionLinkList(item.children));
                }
                list.appendChild(li);
            });
            return list;
        }

        createBox(titleText, items, boxClass, titleClass) {
            if (!items || !items.length) return null;
            const box = document.createElement('div');
            box.className = boxClass || 'mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4';
            this.appendText(box, 'h4', titleClass || 'font-semibold text-amber-900 mb-2', titleText);
            box.appendChild(this.createBulletList(items));
            return box;
        }

        appendSectionMeta(card, section) {
            if (section.actions && section.actions.length) {
                const hasLinks = section.actions.some(item => item && typeof item !== 'string' && item.href);
                this.appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', hasLinks ? 'Related Features' : 'Controls');
                card.appendChild(hasLinks ? this.createActionLinkList(section.actions) : this.createBulletList(section.actions));
            }

            if (section.actionGroups && section.actionGroups.length) {
                section.actionGroups.forEach(group => {
                    this.appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', group.title);
                    card.appendChild(this.createActionLinkList(group.links || []));
                });
            }

            const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
            if (section.images && section.images.length && imageRenderer) {
                card.appendChild(imageRenderer.createImageGallery(section.images, section.title));
            }

            if (section.items && section.items.length) {
                card.appendChild(this.createBulletList(section.items));
            }

            if (section.accessPath) {
                this.appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Access Path');
                this.appendText(card, 'p', 'mt-1 text-sm text-slate-600 leading-relaxed', section.accessPath);
            }

            if (section.howToUse && section.howToUse.length) {
                this.appendText(card, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'How To Use');
                card.appendChild(this.createBulletList(section.howToUse));
            }

            if (section.rules && section.rules.length) {
                card.appendChild(this.createBox('Rules', section.rules));
            }

            if (section.expected && section.expected.length) {
                card.appendChild(this.createBox('Expected Result', section.expected, 'mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-4', 'font-semibold text-emerald-900 mb-2'));
            }

            if (section.notes && section.notes.length) {
                section.notes.forEach(note => {
                    card.appendChild(this.createBox('Notes: ' + note.label, note.items, 'mt-4 rounded-lg bg-slate-100/70 p-4', 'font-semibold text-slate-900 mb-2'));
                });
            }
        }

        createInfoCard(section, level) {
            const card = document.createElement('article');
            card.className = level === 'nested' ? 'flat-card flat-card--nested' : 'flat-card';
            if (!section.omitCardId) card.id = section.id;
            this.appendText(card, level === 'nested' ? 'h4' : 'h3', 'font-semibold text-slate-900 mb-2', section.title);
            this.appendText(card, 'p', 'text-sm text-slate-600 leading-relaxed', section.detail);
            this.appendSectionMeta(card, section);
            return card;
        }

        renderCreateAccount() {
            const container = document.getElementById('createAccountSections');
            if (!container) return;
            container.innerHTML = '';

            const content = this.store.getContent();
            container.appendChild(this.createWizardOverview(content.createAccount));

            const steps = content.createAccount.steps;
            let flowPanel = null;
            steps.forEach((step, index) => {
                if (global.AccountsFlowBuilders.FLOW_STEP_IDS.includes(step.id)) {
                    if (!flowPanel) {
                        flowPanel = document.createElement('div');
                        flowPanel.className = 'flow-step-panel';
                        const status = document.createElement('p');
                        status.className = 'flow-step-panel__status sr-only';
                        status.setAttribute('aria-live', 'polite');
                        flowPanel.appendChild(status);
                        container.appendChild(flowPanel);
                    }
                    flowPanel.appendChild(this.createWizardStep(step, index, steps));
                    return;
                }
                const card = this.createInfoCard(step);
                const badge = document.createElement('div');
                badge.className = 'mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white';
                badge.textContent = index + 1;
                card.insertBefore(badge, card.firstChild);
                container.appendChild(card);
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

        createUpdateSpecificCard() {
            const content = this.store.getContent();
            const section = content.updateSpecific;
            const intro = this.createInfoCard(section);
            this.appendText(intro, 'p', 'mt-4 text-xs font-bold uppercase tracking-wider text-slate-400', 'Variants');
            section.groups.forEach(group => {
                intro.appendChild(this.createInfoCard(group, 'nested'));
            });
            intro.appendChild(this.createBox('Rules', [section.securityRule]));
            return intro;
        }

        createFlowStepPanel(steps) {
            const flowPanel = document.createElement('div');
            flowPanel.className = 'flow-step-panel';
            const status = document.createElement('p');
            status.className = 'flow-step-panel__status sr-only';
            status.setAttribute('aria-live', 'polite');
            flowPanel.appendChild(status);
            steps.forEach((step, index) => flowPanel.appendChild(this.createWizardStep(step, index, steps)));
            return flowPanel;
        }

        createUpdateAccountSteps(section) {
            const groups = this.store.getContent().updateSpecific.groups;
            if (section.steps.length !== groups.length) {
                throw new Error('Update Account steps must match Update Specific groups');
            }
            return section.steps.map((step, index) => ({
                id: step.id,
                title: step.title,
                images: step.images,
                items: groups[index].items,
                rules: step.rules,
                notes: groups[index].notes
            }));
        }

        renderFunctions() {
            const container = document.getElementById('functionSections');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.functions.forEach(section => {
                if (section.id === 'account-detail') {
                    container.appendChild(this.createViewPanel(section, { tagName: 'article', id: section.id, className: 'flow-overview', titleTag: 'h3', title: section.title }));
                    return;
                }
                if (section.id === 'update-account') {
                    container.appendChild(this.createViewPanel(section, { tagName: 'article', id: section.id, className: 'flow-overview', titleTag: 'h3', title: section.title }));
                    container.appendChild(this.createFlowStepPanel(this.createUpdateAccountSteps(section)));
                    container.appendChild(this.createUpdateSpecificCard());
                    return;
                }
                container.appendChild(this.createInfoCard(section));
            });
        }

        renderRowActions() {
            const container = document.getElementById('rowActionsContent');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.rowActions.forEach(section => {
                container.appendChild(this.createInfoCard(section));
            });
        }

        renderSearchSections() {
            const content = this.store.getContent();
            content.searchSections.forEach(section => {
                const container = document.getElementById(section.id + 'Content');
                if (!container) return;
                container.innerHTML = '';
                const renderedSection = Object.assign({}, section, { omitCardId: true });
                container.appendChild(this.createInfoCard(renderedSection));
            });
        }

        renderBulkActions() {
            const container = document.getElementById('bulkActionContent');
            if (!container) return;
            container.innerHTML = '';
            const content = this.store.getContent();
            content.bulkActions.forEach(section => {
                container.appendChild(this.createInfoCard(section));
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
