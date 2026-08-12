/* renderer.js - builds the documentation content and sidebar from a structured data model */
(function () {
    'use strict';

    // Structured representation of the document content (derived from docs/assessment-management.md)
    const docModel = {
        id: 'assessment-configurations',
        title: 'Assessment Configurations',
        children: [
            {
                id: 'randomization',
                title: 'Assessment Randomization and Timer',
                children: [
                    {
                        id: 'randomization-steps',
                        title: 'Configuration Steps',
                        steps: [
                            { action: 'Open "View Assessments"', desc: 'Locate it in the side panel' },
                            { action: 'Select an assessment', desc: 'Choose the assessment from the gallery' },
                            { action: 'Open configuration', desc: 'Click the configuration icon (3rd button in the group)' },
                            { action: 'Choose "Page Setup"', desc: 'From the dropdown, select Page Setup' },
                            { action: 'Set timer and randomization', desc: 'Choose which part of the exam will be randomized, enable Timer, and set the specified time limit' }
                        ]
                    }
                ]
            },
            {
                id: 'updating-instructions',
                title: 'Updating Instructions on Assessments',
                children: [
                    {
                        id: 'instructions-steps',
                        title: 'Instruction Update Steps',
                        steps: [
                            { action: 'Open "View Assessments"', desc: 'Locate it in the side panel' },
                            { action: 'Select an assessment', desc: 'Choose the assessment from the gallery' },
                            { action: 'Open configuration', desc: 'Click the configuration icon (3rd button in the group)' },
                            { action: 'Choose "Set Questions"', desc: 'From the dropdown, select Set Questions' },
                            { action: 'Update the Question field', desc: 'Under Question, fill in the instructions and configurations you want' }
                        ]
                    }
                ]
            },
            {
                id: 'upload-images',
                title: 'Upload Images (Super Admin Exclusive - ASD & IT)',
                children: [
                    {
                        id: 'upload-steps',
                        title: 'Upload Steps',
                        steps: [
                            { action: 'Open "View Assessments"', desc: 'Locate it in the side panel' },
                            { action: 'Select an assessment', desc: 'Choose the assessment from the gallery' },
                            { action: 'Open settings', desc: 'Click the settings icon (4th button in the group)' },
                            { action: 'Choose "Update"', desc: 'From the dropdown select Update' },
                            { action: 'Upload under ASSESSMENT DEVELOPMENT', desc: 'Use the upload icon to update images' }
                        ]
                    }
                ]
            }
        ]
    };

    // Helper to create elements
    function el(tag, attrs = {}, children = []) {
        const node = document.createElement(tag);
        Object.keys(attrs).forEach(k => {
            if (k === 'class') node.className = attrs[k];
            else if (k === 'dataset') Object.entries(attrs[k]).forEach(([d, v]) => node.dataset[d] = v);
            else node.setAttribute(k, attrs[k]);
        });
        (Array.isArray(children) ? children : [children]).forEach(c => {
            if (c == null) return;
            if (typeof c === 'string') node.appendChild(document.createTextNode(c));
            else node.appendChild(c);
        });
        return node;
    }

    // Create a step card
    function createStepCard(index, step) {
        const count = el('div', { class: 'step-count' }, [String(index)]);
        const title = el('div', { class: 'step-title' }, [step.action]);
        const desc = el('p', { class: 'step-desc' }, [step.desc]);
        const body = el('div', { class: 'step-body' }, [title, desc]);
        return el('div', { class: 'step-card' }, [count, body]);
    }

    // Render main content area
    function renderContent(model) {
        const target = document.getElementById('docsContent');
        if (!target) return;

        // Main section wrapper (H1 already on page)
        const mainSection = el('section', { class: 'main-section', dataset: { sectionId: model.id } });
        const mainHeading = el('h2', {}, [model.title]);
        mainSection.appendChild(mainHeading);

        model.children.forEach(sub => {
            const subSection = el('section', { class: 'sub-section', dataset: { sectionId: sub.id } });
            const subHeading = el('h3', {}, [sub.title]);
            subSection.appendChild(subHeading);

            // For each child group (sub-sub)
            (sub.children || []).forEach(group => {
                const groupWrap = el('div', { class: 'group', dataset: { sectionId: group.id } });
                const groupHeading = el('h4', {}, [group.title]);
                groupWrap.appendChild(groupHeading);

                (group.steps || []).forEach((s, i) => {
                    groupWrap.appendChild(createStepCard(i + 1, s));
                });

                subSection.appendChild(groupWrap);
            });

            mainSection.appendChild(subSection);
        });

        target.appendChild(mainSection);
    }

    // Build sidebar markup (3-level nested list)
    function buildSidebar(model) {
        const nav = document.getElementById('docSidebar');
        if (!nav) return;
        const list = el('ul');

        // top-level (treat model as a single main section)
        const topItem = el('li', { class: 'section' });
        const topLink = el('a', { href: '#' + model.id, 'dataset': { target: model.id } }, [model.title]);
        topItem.appendChild(topLink);

        const subList = el('ul', { class: 'sub-list' });
        model.children.forEach(sub => {
            const subItem = el('li', { class: 'section' });
            const subLink = el('a', { href: '#' + sub.id, 'dataset': { target: sub.id } }, [sub.title]);
            subItem.appendChild(subLink);

            const childList = el('ul', { class: 'sub-list' });
            (sub.children || []).forEach(child => {
                const childItem = el('li');
                const childLink = el('a', { href: '#' + child.id, 'dataset': { target: child.id } }, [child.title]);
                childItem.appendChild(childLink);
                childList.appendChild(childItem);
            });
            if (childList.children.length) subItem.appendChild(childList);
            subList.appendChild(subItem);
        });

        topItem.appendChild(subList);
        list.appendChild(topItem);
        nav.appendChild(list);
    }

    // Init on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        try {
            renderContent(docModel);
            buildSidebar(docModel);
        } catch (e) { console.error('Renderer init error', e) }

        // footer year
        const el = document.getElementById('footerYearSpan'); if (el) el.textContent = `© GoPick ${new Date().getFullYear()}`;
    });

})();
