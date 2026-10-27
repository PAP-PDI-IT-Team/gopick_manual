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
                const toneName = STATUS_TONES[legendItem.label];
                if (!toneName) throw new Error('Unknown account status legend: ' + legendItem.label);
                const chipElement2 = document.createElement('li');
                chipElement2.className = 'flow-inputs__chip flow-inputs__chip--status flow-inputs__chip--' + toneName;
                const textValue = document.createElement('span');
                this.appendText(textValue, 'span', 'flow-inputs__chip-name', legendItem.label);
                this.appendText(textValue, 'span', 'flow-inputs__chip-detail', legendItem.detail);
                chipElement2.appendChild(textValue);
                return chipElement2;
            },

            createLinkChip(linkElement, isChild) {
                const chipElement3 = document.createElement('li');
                chipElement3.className = 'flow-inputs__chip flow-inputs__chip--link' + (isChild ? ' flow-inputs__chip--child' : '');
                const anchor = document.createElement('a');
                anchor.className = 'flow-inputs__chip-anchor';
                anchor.href = linkElement.href;
                this.appendText(anchor, 'span', 'flow-inputs__chip-label', linkElement.label);
                if (linkElement.tooltip) {
                    tooltipCounter += 1;
                    const tooltip = this.appendText(chipElement3, 'span', 'flow-inputs__chip-tooltip', linkElement.tooltip);
                    tooltip.id = 'view-button-tooltip-' + tooltipCounter;
                    tooltip.setAttribute('role', 'tooltip');
                    anchor.setAttribute('aria-describedby', tooltip.id);
                }
                anchor.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'flow-inputs__chip-arrow'));
                chipElement3.appendChild(anchor);
                return chipElement3;
            },

            createLinkCluster(linkElement2) {
                const cluster = document.createElement('li');
                cluster.className = 'flow-inputs__cluster';
                const listElement = document.createElement('ul');
                listElement.className = 'flow-inputs__chips';
                listElement.appendChild(this.createLinkChip(linkElement2, false));
                linkElement2.children.forEach(child => listElement.appendChild(this.createLinkChip(child, true)));
                cluster.appendChild(listElement);
                return cluster;
            },

            createLinkChips(links) {
                return links.map(linkElement3 => {
                    const hasChildren = linkElement3.children && linkElement3.children.length;
                    return hasChildren ? this.createLinkCluster(linkElement3) : this.createLinkChip(linkElement3, false);
                });
            },

            countLinks(links) {
                return links.reduce((total, linkElement4) => total + 1 + (linkElement4.children ? linkElement4.children.length : 0), 0);
            },

            createReturnRow(returnItem) {
                const rowElement = document.createElement('li');
                rowElement.className = 'flow-outcome__row';
                this.appendText(rowElement, 'span', 'flow-outcome__source', returnItem.source);
                rowElement.appendChild(this.createSvgIcon(['M5 12h14', 'M13 6l6 6-6 6'], 'flow-outcome__arrow'));
                const target = document.createElement('a');
                target.className = 'flow-outcome__target';
                target.href = returnItem.target.href;
                target.textContent = returnItem.target.label;
                rowElement.appendChild(target);
                return rowElement;
            },

            createConditionRow(conditionItem) {
                const rowElement2 = document.createElement('li');
                rowElement2.className = 'flow-outcome__row flow-outcome__row--condition';
                const fields = document.createElement('span');
                fields.className = 'flow-outcome__fields';
                conditionItem.fields.forEach(fieldName => this.appendText(fields, 'span', 'flow-outcome__field', fieldName));
                rowElement2.appendChild(fields);
                const condition = document.createElement('span');
                condition.className = 'flow-outcome__condition';
                this.appendText(condition, 'span', 'flow-outcome__keyword', 'appears when');
                condition.appendChild(document.createTextNode(' ' + conditionItem.condition));
                rowElement2.appendChild(condition);
                return rowElement2;
            },

            createOutcomePanel(outcomeGroups) {
                const wrapper = document.createElement('div');
                wrapper.className = 'flow-outcome';
                const title = document.createElement('h5');
                title.className = 'flow-outcome__title';
                title.appendChild(this.createSvgIcon(['M20 6L9 17l-5-5'], 'flow-outcome__icon'));
                title.appendChild(document.createTextNode('What you see'));
                wrapper.appendChild(title);
                const columns = document.createElement('div');
                columns.className = 'flow-outcome__columns';
                outcomeGroups.forEach(group => {
                    const block = document.createElement('div');
                    this.appendText(block, 'p', 'flow-rules__label', group.label);
                    const listElement2 = document.createElement('ul');
                    listElement2.className = 'flow-outcome__list';
                    if (group.returns) group.returns.forEach(itemData => listElement2.appendChild(this.createReturnRow(itemData)));
                    else if (group.conditions) group.conditions.forEach(itemData2 => listElement2.appendChild(this.createConditionRow(itemData2)));
                    else throw new Error('Outcome group requires returns or conditions: ' + group.label);
                    block.appendChild(listElement2);
                    columns.appendChild(block);
                });
                wrapper.appendChild(columns);
                return wrapper;
            },

            splitStepPhases(steps) {
                const firstLinkIndex = steps.findIndex(stepData => typeof stepData !== 'string');
                const lastLinkIndex = steps.length - 1 - steps.slice().reverse().findIndex(stepData2 => typeof stepData2 !== 'string');
                return {
                    lead: steps.slice(0, firstLinkIndex),
                    wizard: steps.slice(firstLinkIndex, lastLinkIndex + 1),
                    tail: steps.slice(lastLinkIndex + 1)
                };
            },

            createJourneyStop(stepData3, stepNumber, wizardSteps) {
                const itemData3 = document.createElement('li');
                itemData3.className = 'flow-journey__stop';
                if (typeof stepData3 === 'string') {
                    this.appendText(itemData3, 'span', 'flow-journey__dot', String(stepNumber));
                    this.appendText(itemData3, 'span', 'flow-journey__label', stepData3);
                    return itemData3;
                }
                const target = wizardSteps.find(wizardStep => '#' + wizardStep.id === stepData3.href);
                if (!target) throw new Error('How to use link has no matching wizard step: ' + stepData3.href);
                itemData3.classList.add('flow-journey__stop--wizard');
                const linkElement5 = document.createElement('a');
                linkElement5.className = 'flow-journey__link';
                linkElement5.href = stepData3.href;
                linkElement5.setAttribute('aria-label', stepData3.label);
                this.appendText(linkElement5, 'span', 'flow-journey__dot', String(stepNumber));
                this.appendText(linkElement5, 'span', 'flow-journey__label', target.title.replace(/^Update /, ''));
                itemData3.appendChild(linkElement5);
                return itemData3;
            },

            trackCurrentStop(journey) {
                document.addEventListener('docsectionchange', stepEvent => {
                    const links = Array.from(journey.querySelectorAll('.flow-journey__link'));
                    if (!links.some(linkElement6 => linkElement6.getAttribute('href') === '#' + stepEvent.detail.sectionId)) return;
                    links.forEach(linkElement7 => {
                        const isCurrent = linkElement7.getAttribute('href') === '#' + stepEvent.detail.sectionId;
                        if (isCurrent) linkElement7.setAttribute('aria-current', 'step');
                        else linkElement7.removeAttribute('aria-current');
                    });
                });
            },

            createPhasedSteps(steps, wizardSteps, bandLabel) {
                const hasLinkedSteps = steps.some(stepData4 => typeof stepData4 !== 'string');
                const phases = hasLinkedSteps ? this.splitStepPhases(steps) : { lead: steps, wizard: [], tail: [] };
                const journey = document.createElement('ol');
                journey.className = 'flow-journey';
                journey.style.setProperty('--stop-total', String(steps.length));
                let stepNumber = 0;
                const appendStop = (parent, stepData5) => {
                    stepNumber += 1;
                    parent.appendChild(this.createJourneyStop(stepData5, stepNumber, wizardSteps));
                };

                phases.lead.forEach(stepData6 => appendStop(journey, stepData6));

                if (phases.wizard.length) journey.appendChild(this.createJourneyBand(phases.wizard, stepNumber, appendStop, bandLabel));

                phases.tail.forEach(stepData7 => appendStop(journey, stepData7));
                this.trackCurrentStop(journey);
                return journey;
            },

            createJourneyBand(wizardPhaseSteps, precedingCount, appendStop, bandLabel) {
                if (!bandLabel) throw new Error('Journey band requires a label');
                const bandElement = document.createElement('li');
                bandElement.className = 'flow-journey__band';
                bandElement.style.setProperty('--band-span', String(wizardPhaseSteps.length));
                this.appendText(bandElement, 'p', 'flow-journey__band-label', bandLabel);
                const bandStops = document.createElement('ol');
                bandStops.className = 'flow-journey__band-stops';
                bandStops.start = precedingCount + 1;
                wizardPhaseSteps.forEach(stepData8 => appendStop(bandStops, stepData8));
                bandElement.appendChild(bandStops);
                return bandElement;
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
                if (section.notes && section.notes.length) {
                    if (!options.id) throw new Error(options.title + ' notes require a panel id');
                    header.appendChild(this.createNotesPopover(section.notes, options.id + '-notes'));
                }
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
                    groups.appendChild(this.createChipGroup('Status legend', section.legend.map(itemData4 => this.createStatusChip(itemData4)), true, section.legend.length));
                }
                (section.actionGroups || []).forEach(group => {
                    groups.appendChild(this.createChipGroup(group.title, this.createLinkChips(group.links || []), false, this.countLinks(group.links || [])));
                });
                if (section.actions && section.actions.length) {
                    const controlChips = section.actions.map(actionText => {
                        const chipElement4 = document.createElement('li');
                        chipElement4.className = 'flow-inputs__chip';
                        chipElement4.textContent = actionText;
                        return chipElement4;
                    });
                    groups.appendChild(this.createChipGroup('Page controls', controlChips, false, controlChips.length));
                }
                if (groups.childElementCount) panel.appendChild(groups);
                if (section.items && section.items.length) {
                    const inputGroups = section.items.every(itemData5 => typeof itemData5 === 'string')
                        ? [{ label: 'Visible content', children: section.items }]
                        : section.items;
                    panel.appendChild(this.createInputGroups(inputGroups));
                }
                if (section.howToUse && section.howToUse.length) {
                    this.appendText(panel, 'h4', 'flow-overview__subtitle', 'How to use');
                    panel.appendChild(this.createPhasedSteps(section.howToUse, section.steps || [], options.bandLabel));
                }
                if (section.rules && section.rules.length) panel.appendChild(this.createFlowRules(section.rules, this.collectEmphasisTerms(section)));
                if (section.expected && section.expected.length) {
                    const isGrouped = section.expected.every(itemData6 => typeof itemData6 !== 'string');
                    if (!isGrouped && !options.expectedLabel) throw new Error(options.title + ' expected results require a label');
                    panel.appendChild(isGrouped ? this.createOutcomePanel(section.expected) : this.createExpectedLine(section.expected, options.expectedLabel));
                }
                return panel;
            }
    };

    global.AccountsViewBuilders = {
        methods: methods
    };
})(window);
