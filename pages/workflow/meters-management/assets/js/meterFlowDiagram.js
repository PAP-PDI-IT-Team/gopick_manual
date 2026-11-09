(function (global) {
    'use strict';

    const MAX_COLUMNS = 5;
    const MAX_FRAME_DEPTH = 3;
    let diagramCounter = 0;

    function appendNode(parent, tagName, className, textValue) {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (textValue !== undefined) element.textContent = textValue;
        parent.appendChild(element);
        return element;
    }

    function requireField(source, fieldName) {
        if (source[fieldName] === undefined) throw new Error('meterFlowDiagram: ' + fieldName + ' is missing');
        return source[fieldName];
    }


    function createMessageRow(message, context) {
        const fromIndex = context.columnIndexById[message.from];
        const toIndex = context.columnIndexById[message.to];
        if (fromIndex === undefined || toIndex === undefined) throw new Error('meterFlowDiagram: unknown participant in "' + message.text + '"');
        const messageRow = document.createElement('div');
        messageRow.className = 'seq-row';
        new Set([fromIndex, toIndex]).forEach(columnIndex => {
            appendNode(messageRow, 'span', 'seq-activation seq-at-' + columnIndex);
        });
        const arrow = appendNode(messageRow, 'div', 'seq-arrow seq-at-' + Math.min(fromIndex, toIndex));
        appendNode(arrow, 'span', 'seq-arrow__label', message.text);
        if (fromIndex === toIndex) {
            arrow.classList.add('seq-arrow--self');
        } else {
            arrow.classList.add('seq-span-' + Math.abs(toIndex - fromIndex));
            arrow.classList.add(toIndex > fromIndex ? 'seq-arrow--right' : 'seq-arrow--left');
        }
        if (message.kind === 'return') arrow.classList.add('seq-arrow--return');
        return messageRow;
    }

    function createAltFrame(altBranches, context, depthLevel) {
        if (depthLevel > MAX_FRAME_DEPTH) throw new Error('meterFlowDiagram: alt frames nest deeper than ' + MAX_FRAME_DEPTH);
        const frame = document.createElement('div');
        frame.className = 'seq-frame seq-depth-' + depthLevel;
        altBranches.forEach((branch, branchIndex) => {
            const branchBlock = appendNode(frame, 'div', 'seq-frame__branch');
            const guardLine = appendNode(branchBlock, 'p', 'seq-frame__guard');
            appendNode(guardLine, 'span', 'seq-frame__keyword', branchIndex === 0 ? 'alt' : 'else');
            appendNode(guardLine, 'span', '', '[' + requireField(branch, 'guard') + ']');
            appendMessages(branchBlock, requireField(branch, 'messages'), context, depthLevel + 1);
        });
        return frame;
    }

    function appendMessages(container, messages, context, depthLevel) {
        messages.forEach(message => {
            container.appendChild(message.alt ? createAltFrame(message.alt, context, depthLevel) : createMessageRow(message, context));
        });
    }


    function createSequence(flowEntry) {
        const participants = requireField(flowEntry, 'participants');
        if (participants.length > MAX_COLUMNS) throw new Error('meterFlowDiagram: more than ' + MAX_COLUMNS + ' participants');
        const columnIndexById = {};
        participants.forEach((participant, participantIndex) => { columnIndexById[participant.id] = participantIndex; });
        const sequence = document.createElement('div');
        sequence.className = 'seq seq--columns-' + participants.length;
        const header = appendNode(sequence, 'ol', 'seq-participants');
        participants.forEach(participant => appendNode(header, 'li', 'seq-participant', participant.label));
        const sequenceBody = appendNode(sequence, 'div', 'seq-body');
        participants.forEach((participant, participantIndex) => {
            appendNode(sequenceBody, 'span', 'seq-lifeline seq-at-' + participantIndex);
        });
        const context = { columnIndexById: columnIndexById };
        appendMessages(sequenceBody, requireField(flowEntry, 'messages'), context, 0);
        return sequence;
    }

    function createEffects(effects) {
        const effectList = document.createElement('ul');
        effectList.className = 'meter-flow-effects';
        effects.forEach(effect => {
            const effectItem = appendNode(effectList, 'li', 'meter-flow-effects__item');
            appendNode(effectItem, 'span', 'meter-flow-effects__account', effect.account);
            const changeClass = effect.change.charAt(0) === '-' ? 'meter-flow-effects__change meter-flow-effects__change--minus' : 'meter-flow-effects__change';
            appendNode(effectItem, 'span', changeClass, effect.change);
        });
        return effectList;
    }

    function createFlowPanel(flowEntry, panelId, tabId, scrollHint) {
        const panel = document.createElement('div');
        panel.className = 'meter-flow-panel';
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', tabId);
        const scroller = appendNode(panel, 'div', 'seq-scroller');
        scroller.tabIndex = 0;
        scroller.setAttribute('role', 'region');
        scroller.setAttribute('aria-label', flowEntry.label + ' sequence diagram');
        scroller.appendChild(createSequence(flowEntry));
        appendNode(panel, 'p', 'seq-scroll-hint', scrollHint);
        panel.appendChild(createEffects(requireField(flowEntry, 'effects')));
        return panel;
    }


    function selectTab(tabButtons, panels, selectedIndex) {
        tabButtons.forEach((tabButton, tabIndex) => {
            const isSelected = tabIndex === selectedIndex;
            tabButton.setAttribute('aria-selected', String(isSelected));
            tabButton.tabIndex = isSelected ? 0 : -1;
            panels[tabIndex].hidden = !isSelected;
        });
    }

    function handleTabKeys(keyEvent, tabButtons, panels) {
        const currentIndex = tabButtons.indexOf(keyEvent.currentTarget);
        const keyOffsets = { ArrowRight: 1, ArrowLeft: -1 };
        let nextIndex = null;
        if (keyOffsets[keyEvent.key]) nextIndex = (currentIndex + keyOffsets[keyEvent.key] + tabButtons.length) % tabButtons.length;
        if (keyEvent.key === 'Home') nextIndex = 0;
        if (keyEvent.key === 'End') nextIndex = tabButtons.length - 1;
        if (nextIndex === null) return;
        keyEvent.preventDefault();
        selectTab(tabButtons, panels, nextIndex);
        tabButtons[nextIndex].focus();
    }

    function createFlowTabs(meterFlow) {
        diagramCounter += 1;
        const idPrefix = 'meter-flow-' + diagramCounter + '-';
        const flows = requireField(meterFlow, 'flows');
        const scrollHint = requireField(meterFlow, 'scrollHint');
        const wrapper = document.createElement('div');
        wrapper.className = 'meter-flow-tabs';
        const tabList = appendNode(wrapper, 'div', 'meter-flow-tabs__list');
        tabList.setAttribute('role', 'tablist');
        tabList.setAttribute('aria-label', requireField(meterFlow, 'title'));
        const tabButtons = [];
        const panels = [];
        flows.forEach(flowEntry => {
            const tabButton = appendNode(tabList, 'button', 'meter-flow-tabs__tab', flowEntry.label);
            tabButton.type = 'button';
            tabButton.id = idPrefix + flowEntry.id + '-tab';
            tabButton.setAttribute('role', 'tab');
            tabButton.setAttribute('aria-controls', idPrefix + flowEntry.id + '-panel');
            tabButtons.push(tabButton);
            panels.push(wrapper.appendChild(createFlowPanel(flowEntry, idPrefix + flowEntry.id + '-panel', tabButton.id, scrollHint)));
        });
        tabButtons.forEach((tabButton, tabIndex) => {
            tabButton.addEventListener('click', () => selectTab(tabButtons, panels, tabIndex));
            tabButton.addEventListener('keydown', keyEvent => handleTabKeys(keyEvent, tabButtons, panels));
        });
        const defaultIndex = flows.findIndex(flowEntry => flowEntry.id === requireField(meterFlow, 'defaultFlowId'));
        if (defaultIndex === -1) throw new Error('meterFlowDiagram: defaultFlowId does not match a flow');
        selectTab(tabButtons, panels, defaultIndex);
        return wrapper;
    }

    function createMeterFlowDiagram(meterFlow) {
        const figure = document.createElement('figure');
        figure.className = 'meter-flow';
        appendNode(figure, 'figcaption', 'meter-flow__title', requireField(meterFlow, 'title'));
        figure.appendChild(createFlowTabs(meterFlow));
        return figure;
    }

    global.MetersFlowDiagram = {
        create: createMeterFlowDiagram
    };
})(window);
