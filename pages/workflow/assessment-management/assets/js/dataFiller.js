// assessment data filler - hold page content in JS and render into HTML
(function (global) {
    'use strict';

    const assessmentContent = {
        title: 'Assessment Management',
        sections: [
            {
                id: 'randomization',
                title: 'Assessment Randomization and Timer',
                description: 'Configure question randomization and timer settings for any assessment.',
                steps: [
                    { title: 'Open "View Assessments"', detail: 'Locate it in the side panel of the admin portal.' },
                    { title: 'Select an assessment', detail: 'Choose the assessment from the gallery view.' },
                    { title: 'Open configuration', detail: 'Click the configuration icon - the 3rd button in the top-left button group.' },
                    { title: 'Select "Page Setup"', detail: 'From the dropdown, select Page Setup.' },
                    { title: 'Set timer and randomization', detail: 'Choose which part of the exam will be randomized, enable the timer, and set the specified time limit.' }
                ]
            },
            {
                id: 'updating-instructions',
                title: 'Updating Instructions on Assessments',
                description: 'Edit or add question-level instructions and configuration for an assessment.',
                steps: [
                    { title: 'Open "View Assessments"', detail: 'Locate it in the side panel of the admin portal.' },
                    { title: 'Select an assessment', detail: 'Choose the assessment from the gallery view.' },
                    { title: 'Open configuration', detail: 'Click the configuration icon - the 3rd button in the top-left button group.' },
                    { title: 'Select "Set Questions"', detail: 'From the dropdown, select Set Questions to manage question-level settings.' },
                    { title: 'Edit question instructions', detail: 'Under each question, fill in instructions and other configurations as needed.' }
                ]
            },
            {
                id: 'upload-images',
                title: 'Upload Images',
                tag: ['Admin ASD', 'Admin IT'],
                description: 'Upload or update assessment images. Restricted to ASD and IT Super Admin roles.',
                steps: [
                    { title: 'Open "View Assessments"', detail: 'Locate it in the side panel of the admin portal.' },
                    { title: 'Select an assessment', detail: 'Choose the assessment from the gallery view.' },
                    { title: 'Open settings', detail: 'Click the settings icon - the 4th button in the top-left button group.' },
                    { title: 'Select "Update"', detail: 'From the dropdown, select Update.' },
                    { title: 'Upload under Assessment Development', detail: 'Below the ASSESSMENT DEVELOPMENT heading, click the upload icon to add or update images.' }
                ]
            }
        ]
    };

    function createStepCard(index, step) {
        const wrap = document.createElement('div');
        wrap.className = 'flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100';

        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-brand text-white font-bold flex items-center justify-center flex-shrink-0';
        badge.textContent = index;

        const content = document.createElement('div');
        const title = document.createElement('div');
        title.className = 'font-semibold text-slate-900';
        title.textContent = step.title;

        const detail = document.createElement('div');
        detail.className = 'text-sm text-slate-500 mt-1';
        detail.textContent = step.detail;

        content.appendChild(title);
        content.appendChild(detail);
        wrap.appendChild(badge);
        wrap.appendChild(content);
        return wrap;
    }

    function renderAllSections() {
        const root = document.getElementById('section-render-root');
        if (!root) return;
        root.innerHTML = '';

        assessmentContent.sections.forEach(function (section) {
            const sectionEl = document.createElement('div');
            sectionEl.className = 'mb-8';

            // heading + optional tag(s)
            const headerWrap = document.createElement('div');
            headerWrap.className = 'flex items-center gap-3 mb-2';

            const heading = document.createElement('h2');
            heading.id = section.id;
            heading.className = 'text-xl font-bold text-slate-900';
            heading.textContent = section.title;
            heading.setAttribute('tabindex', '-1');
            headerWrap.appendChild(heading);

            if (section.tag) {
                var tags = Array.isArray(section.tag) ? section.tag : [section.tag];
                tags.forEach(function (t) {
                    var tagEl = document.createElement('span');
                    tagEl.className = 'inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700';
                    tagEl.textContent = t;
                    headerWrap.appendChild(tagEl);
                });
            }

            sectionEl.appendChild(headerWrap);

            if (section.description) {
                const desc = document.createElement('p');
                desc.className = 'text-sm text-slate-500 mb-5';
                desc.textContent = section.description;
                sectionEl.appendChild(desc);
            }

            const stepsContainer = document.createElement('div');
            stepsContainer.className = 'space-y-4';
            section.steps.forEach(function (s, i) {
                stepsContainer.appendChild(createStepCard(i + 1, s));
            });
            sectionEl.appendChild(stepsContainer);

            root.appendChild(sectionEl);
        });
    }

    function renderSidebar() {
        var list = document.getElementById('docSidebarList');
        if (!list) return;
        list.innerHTML = '';
        assessmentContent.sections.forEach(function (section) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.className = 'block text-slate-600 hover:text-brand transition-colors py-1';
            a.href = '#' + section.id;
            a.textContent = section.title;
            li.appendChild(a);
            list.appendChild(li);
        });
    }

    function scrollToHash() {
        var id = (location.hash || '').replace('#', '');
        if (!id) return;
        var el = document.getElementById(id);
        if (el) {
            setTimeout(function () {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                el.focus && el.focus();
            }, 20);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            renderSidebar();
            renderAllSections();
            scrollToHash();
            window.addEventListener('hashchange', scrollToHash);
        });
    } else {
        renderSidebar();
        renderAllSections();
        scrollToHash();
        window.addEventListener('hashchange', scrollToHash);
    }

    // expose data for debugging if needed
    global.__assessmentContent = assessmentContent;
})(window);
