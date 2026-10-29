(function (global) {
    'use strict';

    class MetersContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        renderImages(section, target) {
            if (!section.images || !section.images.length) return;
            if (!this.imageRenderer) throw new Error('Meters sections with images require GoPickImageRenderer');
            target.appendChild(this.imageRenderer.createImageGallery(section.images, section.title));
        }

        renderSectionBody(section, target) {
            const groupParts = this.splitGroups(section.groups);
            groupParts.accessPaths.forEach(pathText => target.appendChild(this.createAccessTrail(pathText)));
            this.renderImages(section, target);

            if (section.remarkGuide && section.remarkGuide.length) {
                target.appendChild(this.createRemarkGuide(section.remarkGuide));
            }

            if (section.scenarioGuide && section.scenarioGuide.length) {
                target.appendChild(this.createScenarioGuide(section.scenarioGuide));
            }

            if (section.scenarios && section.scenarios.length) {
                target.appendChild(this.createScenarios(section.scenarios));
            }

            if (groupParts.referenceGroups.length) {
                target.appendChild(this.createChipGroups(groupParts.referenceGroups));
            }

            if (section.steps && section.steps.length) {
                this.appendText(target, 'h4', 'flow-overview__subtitle', 'How to use');
                target.appendChild(this.createFlowSteps(section.steps));
            }

            if (section.rules && section.rules.length) {
                target.appendChild(this.createFlowRules(section.rules));
            }

            if (section.expectedResults && section.expectedResults.length) {
                target.appendChild(this.createExpectedLine(section.expectedResults, 'What you see'));
            }

            if (section.matrix && section.matrix.length) {
                target.appendChild(this.renderResolutionMatrix(section.matrix));
            }
        }

        renderSectionHeader(section, headingLevel) {
            const header = document.createElement('div');
            header.className = 'flow-overview__header';
            const titleBlock = document.createElement('div');

            const headingTag = 'h' + headingLevel;
            const heading = this.appendText(titleBlock, headingTag, 'flow-overview__title flow-overview__title--level-' + headingLevel, section.title);
            heading.id = section.id;
            heading.setAttribute('tabindex', '-1');

            this.appendText(titleBlock, 'p', 'flow-overview__lead', section.description);
            header.appendChild(titleBlock);
            return header;
        }

        renderSectionTree(section, headingLevel, isTopLevel) {
            const sectionEl = document.createElement('section');
            sectionEl.className = isTopLevel ? 'flat-section' : 'flat-subsection';

            const panel = document.createElement('div');
            panel.className = 'flow-overview';
            panel.appendChild(this.renderSectionHeader(section, headingLevel));
            this.renderSectionBody(section, panel);
            sectionEl.appendChild(panel);

            if (section.children && section.children.length) {
                section.children.forEach(child => {
                    sectionEl.appendChild(this.renderSectionTree(child, Math.min(headingLevel + 1, 4), false));
                });
            }

            return sectionEl;
        }

        renderLegends(rootElement) {
            const legends = this.store.getLegends();
            if (!legends || !legends.length) return;

            const legendsWrap = document.createElement('section');
            legendsWrap.className = 'flat-section';
            const panel = document.createElement('div');
            panel.className = 'flow-overview';
            panel.appendChild(this.createChipGroups([{ title: 'Legends', items: legends }]));
            legendsWrap.appendChild(panel);
            rootElement.appendChild(legendsWrap);
        }

        renderAllSections() {
            const rootElement2 = document.getElementById('section-render-root');
            if (!rootElement2) throw new Error('Meters content root #section-render-root is missing');
            rootElement2.replaceChildren();

            this.renderLegends(rootElement2);

            this.store.getSections().forEach(section => {
                rootElement2.appendChild(this.renderSectionTree(section, 2, true));
            });
        }
    }

    if (!global.MetersFlowBuilders) {
        throw new Error('MetersContentRenderer requires MetersFlowBuilders (flowBuilders.js)');
    }
    if (!global.MetersScenarioBuilders) {
        throw new Error('MetersContentRenderer requires MetersScenarioBuilders (scenarioBuilders.js)');
    }
    if (!global.DocsResolutionMatrix) {
        throw new Error('MetersContentRenderer requires DocsResolutionMatrix (shared/js/ui/docsResolutionMatrix.js)');
    }
    Object.assign(
        MetersContentRenderer.prototype,
        global.MetersFlowBuilders.methods,
        global.MetersScenarioBuilders.methods,
        global.DocsResolutionMatrix.methods
    );

    global.MetersContentRenderer = MetersContentRenderer;
})(window);
