(function (global) {
    'use strict';

    const FLOW_STEP_IDS = ['create-account-information', 'create-assign-products', 'create-meter-management', 'create-other-account-settings', 'create-review-account-details'];

    const INPUT_GROUP_TONES = {
        'Required inputs': 'required',
        'Required selection': 'required',
        'System calculated input': 'calculated',
        'Available assessment groups': 'neutral',
        'Meter management options': 'neutral',
        'Defaulted inputs': 'defaulted',
        'Optional inputs': 'optional',
        'Conditional inputs': 'conditional',
        'Visible content': 'neutral'
    };

    const RULE_EMPHASIS_PHRASES = ['Non-admin users', 'Admin users', 'Addresses', 'Phone number', 'Expiry Date', 'must match', 'cannot', 'only be lower', 'At least one assessment', 'cannot be 0', '99,999', '999', 'prefilled', 'locked', 'appears only'];

    const FIELD_NAME_IN_SENTENCE = /^(.+?) (defaults to|appears only|apply to|applies to)\b/;

    const methods = {
            createSvgIcon(pathData, className) {
                const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                icon.setAttribute('viewBox', '0 0 24 24');
                icon.setAttribute('fill', 'none');
                icon.setAttribute('stroke', 'currentColor');
                icon.setAttribute('stroke-width', '2');
                icon.setAttribute('stroke-linecap', 'round');
                icon.setAttribute('stroke-linejoin', 'round');
                icon.setAttribute('aria-hidden', 'true');
                icon.setAttribute('class', className);
                pathData.forEach(segment => {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', segment);
                    icon.appendChild(path);
                });
                return icon;
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
                const titleText = 'Notes for ' + notes.map(note => note.label).join(' and ');

                const wrap = document.createElement('div');
                wrap.className = 'flow-notes';

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

                notes.forEach(note => {
                    const group = document.createElement('section');
                    group.className = 'flow-notes__group';
                    group.dataset.audience = note.label.toLowerCase();

                    this.appendText(group, 'p', 'flow-notes__tag', note.label);

                    const list = document.createElement('ul');
                    list.className = 'flow-notes__list';
                    note.items.forEach(itemText => this.appendText(list, 'li', 'flow-notes__item', itemText));
                    group.appendChild(list);
                    panel.appendChild(group);
                });

                panel.addEventListener('toggle', toggleEvent => {
                    const isOpen = toggleEvent.newState === 'open';
                    trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    if (!isOpen) return;
                    const triggerRect = trigger.getBoundingClientRect();
                    const panelWidth = panel.offsetWidth;
                    const left = Math.max(16, Math.min(triggerRect.right - panelWidth, window.innerWidth - panelWidth - 16));
                    panel.style.top = (triggerRect.bottom + 10) + 'px';
                    panel.style.left = left + 'px';
                    panel.style.setProperty('--caret-x', (triggerRect.left + triggerRect.width / 2 - left) + 'px');
                });

                wrap.appendChild(trigger);
                wrap.appendChild(panel);
                return wrap;
            },

            createFlowSteps(steps) {
                const list = document.createElement('ol');
                list.className = 'flow-steps';
                steps.forEach(step => {
                    const item = document.createElement('li');
                    item.className = 'flow-steps__item';
                    const isLink = step && typeof step !== 'string' && step.href;
                    const text = document.createElement(isLink ? 'a' : 'span');
                    text.textContent = typeof step === 'string' ? step : step.label;
                    if (isLink) {
                        text.href = step.href;
                        text.className = 'flow-steps__link';
                    }
                    item.appendChild(text);
                    list.appendChild(item);
                });
                return list;
            },

            createExpectedLine(expectedItems) {
                const line = document.createElement('div');
                line.className = 'flow-result';
                line.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-result__icon'));
                const text = document.createElement('div');
                this.appendText(text, 'p', 'flow-result__label', 'When you save');
                expectedItems.forEach(itemText => this.appendText(text, 'p', 'flow-result__text', itemText));
                line.appendChild(text);
                return line;
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
                    overview.appendChild(this.createFlowSteps(createAccount.howToUse));
                }

                if (createAccount.expected && createAccount.expected.length) {
                    overview.appendChild(this.createExpectedLine(createAccount.expected));
                }

                return overview;
            },

            createInputGroups(groups) {
                const wrap = document.createElement('div');
                wrap.className = 'flow-inputs';
                groups.forEach(group => {
                    const tone = INPUT_GROUP_TONES[group.label] || 'neutral';
                    const block = document.createElement('div');
                    block.className = 'flow-inputs__group flow-inputs__group--' + tone;
                    const heading = document.createElement('h5');
                    heading.className = 'flow-inputs__heading';
                    heading.textContent = group.label;
                    this.appendText(heading, 'span', 'flow-inputs__count', String(group.children.length));
                    block.appendChild(heading);
                    const chips = document.createElement('ul');
                    const holdsSentences = group.children.some(text => /\.$/.test(text));
                    chips.className = holdsSentences ? 'flow-inputs__chips flow-inputs__chips--sentences' : 'flow-inputs__chips';
                    group.children.forEach(fieldName => this.appendText(chips, 'li', 'flow-inputs__chip', fieldName));
                    block.appendChild(chips);
                    wrap.appendChild(block);
                });
                return wrap;
            },

            collectEmphasisTerms(step) {
                const fieldNames = [];
                (step.items || []).forEach(group => (group.children || []).forEach(name => {
                    if (/\.$/.test(name)) {
                        const match = name.match(FIELD_NAME_IN_SENTENCE);
                        if (match) match[1].split(' and ').forEach(part => fieldNames.push(part));
                        return;
                    }
                    name.split(' or same as ').forEach(part => fieldNames.push(part));
                }));
                return fieldNames.concat(RULE_EMPHASIS_PHRASES).sort((first, second) => second.length - first.length);
            },

            appendEmphasizedText(parent, text, terms) {
                const escapedTerms = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                const pattern = new RegExp('(' + escapedTerms.concat(['\\d[\\d,]*\\s+characters']).join('|') + ')', 'g');
                let lastIndex = 0;
                text.replace(pattern, (match, captured, offset) => {
                    if (offset > lastIndex) parent.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
                    const strong = document.createElement('strong');
                    strong.className = 'flow-emphasis';
                    strong.textContent = match;
                    parent.appendChild(strong);
                    lastIndex = offset + match.length;
                    return match;
                });
                if (lastIndex < text.length) parent.appendChild(document.createTextNode(text.slice(lastIndex)));
            },

            createFlowRules(rules, emphasisTerms) {
                const wrap = document.createElement('div');
                wrap.className = 'flow-rules';
                this.appendText(wrap, 'h5', 'flow-rules__title', 'Rules');
                const columns = document.createElement('div');
                columns.className = 'flow-rules__columns';
                const looseRules = rules.filter(rule => typeof rule === 'string');
                const ruleGroups = rules.filter(rule => typeof rule !== 'string');
                if (looseRules.length) ruleGroups.unshift({ label: '', children: looseRules });
                ruleGroups.forEach(group => {
                    const block = document.createElement('div');
                    block.className = 'flow-rules__group';
                    if (group.label) this.appendText(block, 'p', 'flow-rules__label', group.label);
                    const list = document.createElement('ul');
                    list.className = 'flow-rules__list';
                    group.children.forEach(ruleText => {
                        const item = document.createElement('li');
                        item.className = 'flow-rules__item';
                        this.appendEmphasizedText(item, ruleText, emphasisTerms);
                        list.appendChild(item);
                    });
                    block.appendChild(list);
                    columns.appendChild(block);
                });
                wrap.appendChild(columns);
                return wrap;
            },

            createStepControl(targetStep, direction) {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'flow-step-controls__button flow-step-controls__button--' + direction;
                button.setAttribute('data-step-target', targetStep.id);
                const isPrevious = direction === 'previous';
                const chevron = this.createSvgIcon([isPrevious ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'], 'flow-step-controls__chevron');
                const text = document.createElement('span');
                text.className = 'flow-step-controls__text';
                this.appendText(text, 'span', 'flow-step-controls__direction', isPrevious ? 'Previous' : 'Next');
                this.appendText(text, 'span', 'flow-step-controls__target', targetStep.title);
                if (isPrevious) button.appendChild(chevron);
                button.appendChild(text);
                if (!isPrevious) button.appendChild(chevron);
                return button;
            },

            createStepControls(previousStep, nextStep) {
                const controls = document.createElement('nav');
                controls.className = 'flow-step-controls';
                controls.setAttribute('aria-label', 'Wizard steps');
                if (previousStep && FLOW_STEP_IDS.includes(previousStep.id)) {
                    controls.appendChild(this.createStepControl(previousStep, 'previous'));
                }
                if (nextStep && FLOW_STEP_IDS.includes(nextStep.id)) {
                    controls.appendChild(this.createStepControl(nextStep, 'next'));
                }
                return controls;
            },

            createWizardStep(step, index, steps) {
                const article = document.createElement('article');
                article.id = step.id;
                article.className = 'flow-step';

                const header = document.createElement('div');
                header.className = 'flow-step__header';
                this.appendText(header, 'p', 'flow-step__position', 'Step ' + (index + 1) + ' of ' + steps.length);
                this.appendText(header, 'h3', 'flow-step__title', step.title);
                article.appendChild(header);
                this.appendText(article, 'p', 'flow-overview__lead', step.detail);

                const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
                if (step.images && step.images.length) {
                    if (!imageRenderer) throw new Error('Wizard step requires GoPickImageRenderer');
                    article.appendChild(imageRenderer.createImageGallery(step.images, step.title));
                }

                if (step.items && step.items.length) {
                    const groups = step.items.every(item => typeof item === 'string')
                        ? [{ label: 'Visible content', children: step.items }]
                        : step.items;
                    article.appendChild(this.createInputGroups(groups));
                }
                if (step.howToUse && step.howToUse.length) {
                    this.appendText(article, 'h5', 'flow-inputs__heading', 'How to use');
                    article.appendChild(this.createFlowSteps(step.howToUse));
                }
                if (step.rules && step.rules.length) article.appendChild(this.createFlowRules(step.rules, this.collectEmphasisTerms(step)));
                if (step.expected && step.expected.length) article.appendChild(this.createExpectedLine(step.expected));
                if (step.notes && step.notes.length) article.appendChild(this.createNotesPopover(step.notes, step.id + '-notes'));
                article.appendChild(this.createStepControls(steps[index - 1], steps[index + 1]));
                return article;
            }
    };

    global.AccountsFlowBuilders = {
        FLOW_STEP_IDS: FLOW_STEP_IDS,
        methods: methods
    };
})(window);
