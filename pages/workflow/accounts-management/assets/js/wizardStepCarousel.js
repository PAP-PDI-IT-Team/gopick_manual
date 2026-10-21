(function (global) {
    'use strict';

    const STEP_SELECTOR = '.flow-step';
    const TARGET_ATTRIBUTE = 'data-step-target';

    class AccountsWizardStepCarousel {
        constructor(panelElement) {
            if (!panelElement) {
                throw new Error('Wizard step carousel requires a panel element');
            }
            this.panel = panelElement;
            this.steps = Array.from(panelElement.querySelectorAll(STEP_SELECTOR));
            this.statusElement = panelElement.querySelector('.flow-step-panel__status');
            if (!this.steps.length) {
                throw new Error('Wizard step carousel requires at least one step');
            }
        }

        hasStep(stepId) {
            return this.steps.some(step => step.id === stepId);
        }

        prefersReducedMotion() {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        showStep(stepId, options) {
            const settings = Object.assign({ moveFocus: false, scrollIntoView: false }, options);
            const targetStep = this.steps.find(step => step.id === stepId);
            if (!targetStep) {
                throw new Error('Wizard step not found: ' + stepId);
            }

            this.steps.forEach(step => {
                step.hidden = step !== targetStep;
            });

            if (this.statusElement) {
                const position = targetStep.querySelector('.flow-step__position');
                const title = targetStep.querySelector('.flow-step__title');
                this.statusElement.textContent = (position ? position.textContent + ': ' : '') + (title ? title.textContent : '');
            }

            if (settings.scrollIntoView) {
                targetStep.scrollIntoView({ block: 'start', behavior: this.prefersReducedMotion() ? 'auto' : 'smooth' });
            }

            if (settings.moveFocus) {
                const title = targetStep.querySelector('.flow-step__title');
                if (title) {
                    title.tabIndex = -1;
                    title.focus({ preventScroll: true });
                }
            }
        }

        handleControlClick(clickEvent) {
            const control = clickEvent.target.closest('[' + TARGET_ATTRIBUTE + ']');
            if (!control || !this.panel.contains(control)) return;
            this.showStep(control.getAttribute(TARGET_ATTRIBUTE), { moveFocus: true, scrollIntoView: true });
        }

        handleHashChange() {
            const hashId = (location.hash || '').replace('#', '');
            if (this.hasStep(hashId)) {
                this.showStep(hashId, { moveFocus: false, scrollIntoView: true });
            }
        }

        init() {
            const hashId = (location.hash || '').replace('#', '');
            this.showStep(this.hasStep(hashId) ? hashId : this.steps[0].id);
            this.panel.addEventListener('click', clickEvent => this.handleControlClick(clickEvent));
            window.addEventListener('hashchange', () => this.handleHashChange());
        }
    }

    global.AccountsWizardStepCarousel = AccountsWizardStepCarousel;
})(window);
