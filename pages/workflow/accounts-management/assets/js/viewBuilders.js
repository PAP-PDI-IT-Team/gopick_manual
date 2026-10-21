(function (global) {
    'use strict';

    const STATUS_TONES = {
        'Active': 'active',
        'Deactivated': 'deactivated',
        'Expiring': 'expiring',
        'Expired': 'expired',
        'Archived': 'archived'
    };

    let tooltipCounter = 0;

    const methods = {
            createChipGroup(label, chipElements, sentenceLayout, itemCount) {
                const block = document.createElement('div');
                block.className = 'flow-inputs__group flow-inputs__group--neutral';
                const heading = document.createElement('h5');
                heading.className = 'flow-inputs__heading';
                heading.textContent = label;
                this.appendText(heading, 'span', 'flow-inputs__count', String(itemCount));
                block.appendChild(heading);
                const chips = document.createElement('ul');
                chips.className = sentenceLayout ? 'flow-inputs__chips flow-inputs__chips--sentences' : 'flow-inputs__chips';
                chipElements.forEach(chipElement => chips.appendChild(chipElement));
                block.appendChild(chips);
                return block;
            },

            createStatusChip(legendItem) {
                const tone = STATUS_TONES[legendItem.label];
                if (!tone) throw new Error('Unknown account status legend: ' + legendItem.label);
                const chip = document.createElement('li');
                chip.className = 'flow-inputs__chip flow-inputs__chip--status flow-inputs__chip--' + tone;
                const text = document.createElement('span');
                this.appendText(text, 'span', 'flow-inputs__chip-name', legendItem.label);
                this.appendText(text, 'span', 'flow-inputs__chip-detail', legendItem.detail);
                chip.appendChild(text);
                return chip;
            },

            createLinkChip(link, isChild) {
                const chip = document.createElement('li');
                chip.className = 'flow-inputs__chip flow-inputs__chip--link' + (isChild ? ' flow-inputs__chip--child' : '');
                const anchor = document.createElement('a');
                anchor.className = 'flow-inputs__chip-anchor';
                anchor.href = link.href;
                this.appendText(anchor, 'span', 'flow-inputs__chip-label', link.label);
                if (link.tooltip) {
                    tooltipCounter += 1;
                    const tooltip = this.appendText(chip, 'span', 'flow-inputs__chip-tooltip', link.tooltip);
                    tooltip.id = 'view-button-tooltip-' + tooltipCounter;
                    tooltip.setAttribute('role', 'tooltip');
                    anchor.setAttribute('aria-describedby', tooltip.id);
                }
                anchor.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'flow-inputs__chip-arrow'));
                chip.appendChild(anchor);
                return chip;
            },

            createLinkCluster(link) {
                const cluster = document.createElement('li');
                cluster.className = 'flow-inputs__cluster';
                const list = document.createElement('ul');
                list.className = 'flow-inputs__chips';
                list.appendChild(this.createLinkChip(link, false));
                link.children.forEach(child => list.appendChild(this.createLinkChip(child, true)));
                cluster.appendChild(list);
                return cluster;
            },

            createLinkChips(links) {
                return links.map(link => {
                    const hasChildren = link.children && link.children.length;
                    return hasChildren ? this.createLinkCluster(link) : this.createLinkChip(link, false);
                });
            },

            countLinks(links) {
                return links.reduce((total, link) => total + 1 + (link.children ? link.children.length : 0), 0);
            },

            createReturnRow(returnItem) {
                const row = document.createElement('li');
                row.className = 'flow-outcome__row';
                this.appendText(row, 'span', 'flow-outcome__source', returnItem.source);
                row.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'flow-outcome__arrow'));
                const target = document.createElement('a');
                target.className = 'flow-outcome__target';
                target.href = returnItem.target.href;
                target.textContent = returnItem.target.label;
                row.appendChild(target);
                return row;
            },

            createConditionRow(conditionItem) {
                const row = document.createElement('li');
                row.className = 'flow-outcome__row flow-outcome__row--condition';
                const fields = document.createElement('span');
                fields.className = 'flow-outcome__fields';
                conditionItem.fields.forEach(fieldName => this.appendText(fields, 'span', 'flow-outcome__field', fieldName));
                row.appendChild(fields);
                const condition = document.createElement('span');
                condition.className = 'flow-outcome__condition';
                this.appendText(condition, 'span', 'flow-outcome__keyword', 'appears when');
                condition.appendChild(document.createTextNode(' ' + conditionItem.condition));
                row.appendChild(condition);
                return row;
            },

            createOutcomePanel(outcomeGroups) {
                const wrap = document.createElement('div');
                wrap.className = 'flow-outcome';
                const title = document.createElement('h5');
                title.className = 'flow-outcome__title';
                title.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-outcome__icon'));
                title.appendChild(document.createTextNode('What you see'));
                wrap.appendChild(title);
                const columns = document.createElement('div');
                columns.className = 'flow-outcome__columns';
                outcomeGroups.forEach(group => {
                    const block = document.createElement('div');
                    this.appendText(block, 'p', 'flow-rules__label', group.label);
                    const list = document.createElement('ul');
                    list.className = 'flow-outcome__list';
                    if (group.returns) group.returns.forEach(item => list.appendChild(this.createReturnRow(item)));
                    else if (group.conditions) group.conditions.forEach(item => list.appendChild(this.createConditionRow(item)));
                    else throw new Error('Outcome group requires returns or conditions: ' + group.label);
                    block.appendChild(list);
                    columns.appendChild(block);
                });
                wrap.appendChild(columns);
                return wrap;
            },

            splitStepPhases(steps) {
                const firstLinkIndex = steps.findIndex(step => typeof step !== 'string');
                const lastLinkIndex = steps.length - 1 - steps.slice().reverse().findIndex(step => typeof step !== 'string');
                return {
                    lead: steps.slice(0, firstLinkIndex),
                    wizard: steps.slice(firstLinkIndex, lastLinkIndex + 1),
                    tail: steps.slice(lastLinkIndex + 1)
                };
            },

            createJourneyStop(step, stepNumber, wizardSteps) {
                const item = document.createElement('li');
                item.className = 'flow-journey__stop';
                if (typeof step === 'string') {
                    this.appendText(item, 'span', 'flow-journey__dot', String(stepNumber));
                    this.appendText(item, 'span', 'flow-journey__label', step);
                    return item;
                }
                const target = wizardSteps.find(wizardStep => '#' + wizardStep.id === step.href);
                if (!target) throw new Error('How to use link has no matching wizard step: ' + step.href);
                item.classList.add('flow-journey__stop--wizard');
                const link = document.createElement('a');
                link.className = 'flow-journey__link';
                link.href = step.href;
                link.setAttribute('aria-label', step.label);
                this.appendText(link, 'span', 'flow-journey__dot', String(stepNumber));
                this.appendText(link, 'span', 'flow-journey__label', target.title.replace(/^Update /, ''));
                item.appendChild(link);
                return item;
            },

            trackCurrentStop(journey) {
                document.addEventListener('flowstepchange', stepEvent => {
                    const links = Array.from(journey.querySelectorAll('.flow-journey__link'));
                    if (!links.some(link => link.getAttribute('href') === '#' + stepEvent.detail.stepId)) return;
                    links.forEach(link => {
                        const isCurrent = link.getAttribute('href') === '#' + stepEvent.detail.stepId;
                        if (isCurrent) link.setAttribute('aria-current', 'step');
                        else link.removeAttribute('aria-current');
                    });
                });
            },

            createPhasedSteps(steps, wizardSteps, bandLabel) {
                const hasLinkedSteps = steps.some(step => typeof step !== 'string');
                const phases = hasLinkedSteps ? this.splitStepPhases(steps) : { lead: steps, wizard: [], tail: [] };
                const journey = document.createElement('ol');
                journey.className = 'flow-journey';
                journey.style.setProperty('--stop-total', String(steps.length));
                let stepNumber = 0;
                const appendStop = (parent, step) => {
                    stepNumber += 1;
                    parent.appendChild(this.createJourneyStop(step, stepNumber, wizardSteps));
                };

                phases.lead.forEach(step => appendStop(journey, step));

                if (phases.wizard.length) journey.appendChild(this.createJourneyBand(phases.wizard, stepNumber, appendStop, bandLabel));

                phases.tail.forEach(step => appendStop(journey, step));
                this.trackCurrentStop(journey);
                return journey;
            },

            createJourneyBand(wizardPhaseSteps, precedingCount, appendStop, bandLabel) {
                if (!bandLabel) throw new Error('Journey band requires a label');
                const band = document.createElement('li');
                band.className = 'flow-journey__band';
                band.style.setProperty('--band-span', String(wizardPhaseSteps.length));
                this.appendText(band, 'p', 'flow-journey__band-label', bandLabel);
                const bandStops = document.createElement('ol');
                bandStops.className = 'flow-journey__band-stops';
                bandStops.start = precedingCount + 1;
                wizardPhaseSteps.forEach(step => appendStop(bandStops, step));
                band.appendChild(bandStops);
                return band;
            },

            createViewPanel(section, options) {
                const panel = document.createElement(options.tagName);
                if (options.id) panel.id = options.id;
                panel.className = options.className;

                const header = document.createElement('div');
                header.className = 'flow-overview__header';
                const titleBlock = document.createElement('div');
                this.appendText(titleBlock, options.titleTag, 'flow-overview__title', options.title);
                this.appendText(titleBlock, 'p', 'flow-overview__lead', section.detail);
                header.appendChild(titleBlock);
                panel.appendChild(header);

                if (section.accessPath) panel.appendChild(this.createAccessTrail(section.accessPath));

                const imageRenderer = this.imageRenderer || global.GoPickImageRenderer;
                if (section.images && section.images.length) {
                    if (!imageRenderer) throw new Error(options.title + ' requires GoPickImageRenderer');
                    panel.appendChild(imageRenderer.createImageGallery(section.images, options.title));
                }

                const groups = document.createElement('div');
                groups.className = 'flow-inputs';
                if (section.legend && section.legend.length) {
                    groups.appendChild(this.createChipGroup('Status legend', section.legend.map(item => this.createStatusChip(item)), true, section.legend.length));
                }
                (section.actionGroups || []).forEach(group => {
                    groups.appendChild(this.createChipGroup(group.title, this.createLinkChips(group.links || []), false, this.countLinks(group.links || [])));
                });
                if (section.actions && section.actions.length) {
                    const controlChips = section.actions.map(actionText => {
                        const chip = document.createElement('li');
                        chip.className = 'flow-inputs__chip';
                        chip.textContent = actionText;
                        return chip;
                    });
                    groups.appendChild(this.createChipGroup('Page controls', controlChips, false, controlChips.length));
                }
                if (groups.childElementCount) panel.appendChild(groups);
                if (section.howToUse && section.howToUse.length) {
                    this.appendText(panel, 'h4', 'flow-overview__subtitle', 'How to use');
                    const hasLinkedSteps = section.howToUse.some(step => typeof step !== 'string');
                    panel.appendChild(hasLinkedSteps ? this.createPhasedSteps(section.howToUse, section.steps || [], 'Update wizard') : this.createFlowSteps(section.howToUse));
                }
                if (section.rules && section.rules.length) panel.appendChild(this.createFlowRules(section.rules, this.collectEmphasisTerms(section)));
                if (section.expected && section.expected.length) {
                    const isGrouped = section.expected.every(item => typeof item !== 'string');
                    panel.appendChild(isGrouped ? this.createOutcomePanel(section.expected) : this.createExpectedLine(section.expected, 'What you see'));
                }
                return panel;
            }
    };

    global.AccountsViewBuilders = {
        methods: methods
    };
})(window);
