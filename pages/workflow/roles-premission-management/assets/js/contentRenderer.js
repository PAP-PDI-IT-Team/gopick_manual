(function (global) {
    'use strict';

    class RolesPermissionsContentRenderer {
        constructor(store, imageRenderer) {
            this.store = store;
            this.imageRenderer = imageRenderer || global.GoPickImageRenderer || null;
        }

        renderLegend() {
            const container = document.getElementById('legendContent');
            if (!container) return;
            container.innerHTML = '';
            const legends = this.store.getLegends();
            legends.forEach(item => {
                const wrapper = document.createElement('div');
                wrapper.className = 'flex items-center gap-2';

                const symbol = document.createElement('span');
                symbol.className = item.cls + ' text-base';
                symbol.textContent = item.sym;

                const label = document.createElement('span');
                label.className = 'text-slate-600';
                label.textContent = item.label;

                wrapper.appendChild(symbol);
                wrapper.appendChild(label);
                container.appendChild(wrapper);
            });
        }

        renderHierarchy() {
            const container = document.getElementById('hierarchyContent');
            if (!container) return;
            container.innerHTML = '';
            const lines = this.store.getHierarchyLines();
            const pre = document.createElement('pre');
            pre.className = 'whitespace-pre-wrap';
            pre.textContent = lines.join('\n');
            container.appendChild(pre);
        }

        renderImages() {
            if (!this.imageRenderer || !this.imageRenderer.createImageOrPlaceholder) return;
            const sections = this.store.getSections();
            sections.forEach(section => {
                if (section.images && section.images.length) {
                    const el = document.getElementById(section.id);
                    if (el) {
                        const existingCards = el.querySelectorAll('.manual-image-card');
                        existingCards.forEach(c => c.remove());

                        const insertTarget = el.querySelector('h2');
                        section.images.forEach(img => {
                            const card = this.imageRenderer.createImageOrPlaceholder(img, section.title);
                            if (insertTarget && insertTarget.nextElementSibling) {
                                el.insertBefore(card, insertTarget.nextElementSibling);
                            } else {
                                el.appendChild(card);
                            }
                        });
                    }
                }
            });
        }

        renderAll() {
            this.renderLegend();
            this.renderHierarchy();
            this.renderImages();
        }
    }

    global.RolesPermissionsContentRenderer = RolesPermissionsContentRenderer;
})(window);
