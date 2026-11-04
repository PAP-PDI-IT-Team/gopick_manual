(function (global) {
    'use strict';

    class DocsContentStore {
        constructor(content) {
            if (!content || !Array.isArray(content.sections)) {
                throw new Error('DocsContentStore: page content needs a sections array');
            }
            this.content = content;
        }

        getContent() {
            return this.content;
        }

        getSections() {
            return this.content.sections;
        }

        findSectionById(sectionId, sections = this.getSections()) {
            for (const section of sections) {
                if (section.id === sectionId) return section;
                const childMatch = this.findSectionById(sectionId, section.children || []);
                if (childMatch) return childMatch;
            }
            return null;
        }
    }

    global.DocsContentStore = DocsContentStore;
})(window);
