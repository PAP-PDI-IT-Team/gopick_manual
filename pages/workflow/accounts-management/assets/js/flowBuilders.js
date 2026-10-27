(function (global) {
    'use strict';

    const FLOW_STEP_IDS = ['create-account-information', 'create-assign-products', 'create-meter-management', 'create-other-account-settings', 'create-review-account-details'];

    const WIZARD_SEQUENCE = { listLabel: 'Wizard steps' };

    const VARIANT_SEQUENCE = { listLabel: 'Section variants' };

    const INPUT_GROUP_TONES = {
        'Required inputs': 'required',
        'Required selection': 'required',
        'System calculated input': 'calculated',
        'Available assessment groups': 'neutral',
        'Meter management options': 'neutral',
        'Defaulted inputs': 'defaulted',
        'Optional inputs': 'optional',
        'Conditional inputs': 'conditional',
        'Visible content': 'neutral',
        'Locked inputs': 'locked',
        'Editable inputs': 'neutral',
        'Conditional input': 'conditional',
        'Available actions': 'neutral'
    };

    const RULE_EMPHASIS_PHRASES = ['Non-admin users', 'Admin users', 'Addresses', 'Phone number', 'Expiry Date', 'must match', 'cannot', 'only be lower', 'At least one assessment', 'cannot be 0', '99,999', '999', 'prefilled', 'locked', 'appears only', 'not archived', 'current user own account'];

    const FIELD_NAME_IN_SENTENCE = /^(.+?) (defaults to|appears only|apply to|applies to)\b/;

    const methods = {
            createSvgIcon(pathData, className) {
                const iconElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                iconElement.setAttribute('viewBox', '0 0 24 24');
                iconElement.setAttribute('fill', 'none');
                iconElement.setAttribute('stroke', 'currentColor');
                iconElement.setAttribute('stroke-width', '2');
                iconElement.setAttribute('stroke-linecap', 'round');
                iconElement.setAttribute('stroke-linejoin', 'round');
                iconElement.setAttribute('aria-hidden', 'true');
                iconElement.setAttribute('class', className);
                pathData.forEach(segment => {
                    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    pathElement.setAttribute('d', segment);
                    iconElement.appendChild(pathElement);
                });
                return iconElement;
            },

            createAccessTrail(pathText) {
                const trail = document.createElement('p');
                trail.className = 'flow-access';
                const label = document.createElement('span');
                label.className = 'flow-access__label';
                label.textContent = 'Find it in';
                trail.appendChild(label);
                pathText.split(' > ').forEach((stepText, index) => {
                    if (index > 0) {
                        const separator = document.createElement('span');
                        separator.className = 'flow-access__separator';
                        separator.setAttribute('aria-hidden', 'true');
                        separator.textContent = '\u203A';
                        trail.appendChild(separator);
                    }
                    this.appendText(trail, 'span', 'flow-access__step', stepText);
                });
                return trail;
            },

            createNotesPopover(notes, popoverId) {
                const titleText = 'Notes for ' + notes.map(noteData => noteData.label).join(' and ');

                const wrapper = document.createElement('div');
                wrapper.className = 'flow-notes';

                const trigger = document.createElement('button');
                trigger.type = 'button';
                trigger.className = 'flow-notes__trigger';
                trigger.setAttribute('popovertarget', popoverId);
                trigger.setAttribute('aria-expanded', 'false');
                trigger.setAttribute('aria-label', titleText);
                trigger.appendChild(this.createSvgIcon(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z', 'M12 7.5v5.5', 'M12 16.5h.01'], 'flow-notes__icon'));
                const tooltip = this.appendText(trigger, 'span', 'flow-notes__tooltip', titleText);
                tooltip.setAttribute('aria-hidden', 'true');

                const panel = document.createElement('div');
                panel.id = popoverId;
                panel.className = 'flow-notes__panel';
                panel.setAttribute('popover', 'auto');
                panel.setAttribute('role', 'dialog');
                panel.setAttribute('aria-label', titleText);

                const panelHeader = document.createElement('div');
                panelHeader.className = 'flow-notes__header';
                this.appendText(panelHeader, 'p', 'flow-notes__title', titleText);
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'flow-notes__close';
                closeButton.setAttribute('popovertarget', popoverId);
                closeButton.setAttribute('popovertargetaction', 'hide');
                closeButton.setAttribute('aria-label', 'Close notes');
                closeButton.appendChild(this.createSvgIcon(['M6 6l12 12', 'M18 6L6 18'], 'flow-notes__close-icon'));
                panelHeader.appendChild(closeButton);
                panel.appendChild(panelHeader);

                notes.forEach(noteData2 => {
                    const group = document.createElement('section');
                    group.className = 'flow-notes__group';
                    group.dataset.audience = noteData2.label.toLowerCase();

                    this.appendText(group, 'p', 'flow-notes__tag', noteData2.label);

                    const listElement = document.createElement('ul');
                    listElement.className = 'flow-notes__list';
                    noteData2.items.forEach(itemText => this.appendText(listElement, 'li', 'flow-notes__item', itemText));
                    group.appendChild(listElement);
                    panel.appendChild(group);
                });

                panel.addEventListener('toggle', toggleEvent => {
                    const isOpen = toggleEvent.newState === 'open';
                    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    if (!isOpen) return;
                    const triggerRect = trigger.getBoundingClientRect();
                    const panelWidth = panel.offsetWidth;
                    const leftOffset = Math.max(16, Math.min(triggerRect.right - panelWidth, window.innerWidth - panelWidth - 16));
                    panel.style.top = (triggerRect.bottom + 10) + 'px';
                    panel.style.left = leftOffset + 'px';
                    panel.style.setProperty('--caret-x', (triggerRect.left + triggerRect.width / 2 - leftOffset) + 'px');
                });

                wrapper.appendChild(trigger);
                wrapper.appendChild(panel);
                return wrapper;
            },

            createExpectedLine(expectedItems, labelText) {
                const lineText = document.createElement('div');
                lineText.className = 'flow-result';
                lineText.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-result__icon'));
                const textValue = document.createElement('div');
                this.appendText(textValue, 'p', 'flow-result__label', labelText);
                expectedItems.forEach(itemText => this.appendText(textValue, 'p', 'flow-result__text', itemText));
                lineText.appendChild(textValue);
                return lineText;
            },

            createWizardOverview(createAccount) {
                const overview = document.createElement('div');
                overview.id = 'create-account-summary';
                overview.className = 'flow-overview';

                const header = document.createElement('div');
                header.className = 'flow-overview__header';
                const titleBlock = document.createElement('div');
                this.appendText(titleBlock, 'h3', 'flow-overview__title', 'Wizard overview');
                this.appendText(titleBlock, 'p', 'flow-overview__lead', createAccount.detail);
                header.appendChild(titleBlock);
                if (createAccount.notes && createAccount.notes.length) {
                    header.appendChild(this.createNotesPopover(createAccount.notes, 'create-account-notes'));
                }
                overview.appendChild(header);

                if (createAccount.accessPath) {
                    overview.appendChild(this.createAccessTrail(createAccount.accessPath));
                }

                const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
                if (createAccount.images && createAccount.images.length) {
                    if (!imageRenderer) throw new Error('Wizard overview requires GoPickImageRenderer');
                    overview.appendChild(imageRenderer.createImageGallery(createAccount.images, 'Wizard overview'));
                }

                if (createAccount.howToUse && createAccount.howToUse.length) {
                    this.appendText(overview, 'h4', 'flow-overview__subtitle', 'How to use');
                    overview.appendChild(this.createPhasedSteps(createAccount.howToUse, createAccount.steps, 'Create wizard'));
                }

                if (createAccount.expected && createAccount.expected.length) {
                    overview.appendChild(this.createExpectedLine(createAccount.expected, 'When you save'));
                }

                return overview;
            },

            createInputGroups(groups) {
                const wrapper2 = document.createElement('div');
                wrapper2.className = 'flow-inputs';
                groups.forEach(group => {
                    const toneName = INPUT_GROUP_TONES[group.label] || 'neutral';
                    const block = document.createElement('div');
                    block.className = 'flow-inputs__group flow-inputs__group--' + toneName;
                    const heading = document.createElement('h5');
                    heading.className = 'flow-inputs__heading';
                    heading.textContent = group.label;
                    this.appendText(heading, 'span', 'flow-inputs__count', String(group.children.length));
                    block.appendChild(heading);
                    const chips = document.createElement('ul');
                    const holdsSentences = group.children.some(textValue2 => /\.$/.test(textValue2));
                    chips.className = holdsSentences ? 'flow-inputs__chips flow-inputs__chips--sentences' : 'flow-inputs__chips';
                    group.children.forEach(fieldName => this.appendText(chips, 'li', 'flow-inputs__chip', fieldName));
                    block.appendChild(chips);
                    wrapper2.appendChild(block);
                });
                return wrapper2;
            },

            collectEmphasisTerms(stepData) {
                const fieldNames = [];
                (stepData.items || []).forEach(group => (group.children || []).forEach(nameText => {
                    if (/\.$/.test(nameText)) {
                        const match = nameText.match(FIELD_NAME_IN_SENTENCE);
                        if (match) match[1].split(' and ').forEach(segment2 => fieldNames.push(segment2));
                        return;
                    }
                    nameText.split(' or same as ').forEach(segment3 => fieldNames.push(segment3));
                }));
                return fieldNames.concat(RULE_EMPHASIS_PHRASES).sort((first, second) => second.length - first.length);
            },

            appendEmphasizedText(parent, textValue3, terms) {
                const escapedTerms = terms.map(termText => termText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                const pattern = new RegExp('(' + escapedTerms.concat(['\\d[\\d,]*\\s+characters']).join('|') + ')', 'g');
                let lastIndex = 0;
                textValue3.replace(pattern, (match, captured, offset) => {
                    if (offset > lastIndex) parent.appendChild(document.createTextNode(textValue3.slice(lastIndex, offset)));
                    const strong = document.createElement('strong');
                    strong.className = /\d/.test(match) ? 'flow-emphasis flow-emphasis--value' : 'flow-emphasis';
                    strong.textContent = match;
                    parent.appendChild(strong);
                    lastIndex = offset + match.length;
                    return match;
                });
                if (lastIndex < textValue3.length) parent.appendChild(document.createTextNode(textValue3.slice(lastIndex)));
            },

            createFlowRules(rules, emphasisTerms) {
                const wrapper3 = document.createElement('div');
                wrapper3.className = 'flow-rules';
                this.appendText(wrapper3, 'h5', 'flow-rules__title', 'Rules');
                const columns = document.createElement('div');
                columns.className = 'flow-rules__columns';
                const looseRules = rules.filter(ruleData => typeof ruleData === 'string');
                const ruleGroups = rules.filter(ruleData2 => typeof ruleData2 !== 'string');
                if (looseRules.length) ruleGroups.unshift({ label: '', children: looseRules });
                ruleGroups.forEach(group => {
                    const block = document.createElement('div');
                    block.className = 'flow-rules__group';
                    if (group.label) {
                        const label = this.appendText(block, 'p', 'flow-rules__label', group.label);
                        this.appendText(label, 'span', 'flow-inputs__count', String(group.children.length));
                    }
                    const listElement2 = document.createElement('ul');
                    listElement2.className = 'flow-rules__list';
                    group.children.forEach(ruleText => {
                        const itemData = document.createElement('li');
                        itemData.className = 'flow-rules__item';
                        this.appendEmphasizedText(itemData, ruleText, emphasisTerms);
                        listElement2.appendChild(itemData);
                    });
                    block.appendChild(listElement2);
                    columns.appendChild(block);
                });
                wrapper3.appendChild(columns);
                return wrapper3;
            },

            createWizardStep(stepData2, steps) {
                const article = document.createElement('article');
                article.id = stepData2.id;
                article.className = 'flow-step';

                const header = document.createElement('div');
                header.className = 'flow-step__header';
                this.appendText(header, 'h3', 'flow-step__title', stepData2.title);
                article.appendChild(header);
                this.appendText(article, 'p', 'flow-overview__lead', stepData2.detail);

                const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
                if (stepData2.images && stepData2.images.length) {
                    if (!imageRenderer) throw new Error('Wizard step requires GoPickImageRenderer');
                    article.appendChild(imageRenderer.createImageGallery(stepData2.images, stepData2.title));
                }

                if (stepData2.items && stepData2.items.length) {
                    const groups = stepData2.items.every(itemData2 => typeof itemData2 === 'string')
                        ? [{ label: 'Visible content', children: stepData2.items }]
                        : stepData2.items;
                    article.appendChild(this.createInputGroups(groups));
                }
                if (stepData2.howToUse && stepData2.howToUse.length) {
                    this.appendText(article, 'h5', 'flow-inputs__heading', 'How to use');
                    article.appendChild(this.createPhasedSteps(stepData2.howToUse, steps, null));
                }
                if (stepData2.rules && stepData2.rules.length) article.appendChild(this.createFlowRules(stepData2.rules, this.collectEmphasisTerms(stepData2)));
                if (stepData2.expected && stepData2.expected.length) article.appendChild(this.createExpectedLine(stepData2.expected, 'When you save'));
                if (stepData2.notes && stepData2.notes.length) article.appendChild(this.createNotesPopover(stepData2.notes, stepData2.id + '-notes'));
                return article;
            }
    };

    global.AccountsFlowBuilders = {
        FLOW_STEP_IDS: FLOW_STEP_IDS,
        WIZARD_SEQUENCE: WIZARD_SEQUENCE,
        VARIANT_SEQUENCE: VARIANT_SEQUENCE,
        methods: methods
    };
})(window);
