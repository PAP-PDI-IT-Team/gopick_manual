(function (global) {
    'use strict';

    class TestNormsContentStore {
        constructor(content) {
            if (!content || !Array.isArray(content.sections)) {
                throw new Error('Test Norms content requires a sections array.');
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
                if (section.children && section.children.length) {
                    const found = this.findSectionById(sectionId, section.children);
                    if (found) return found;
                }
            }
            return null;
        }

        searchSections(query, sections = this.getSections(), results = []) {
            if (!query) return sections;
            const normalized = query.toLowerCase().trim();
            for (const section of sections) {
                const titleMatch = section.title && section.title.toLowerCase().includes(normalized);
                const descMatch = section.description && section.description.toLowerCase().includes(normalized);
                if (titleMatch || descMatch) {
                    results.push(section);
                }
                if (section.children && section.children.length) {
                    this.searchSections(query, section.children, results);
                }
            }
            return results;
        }
    }

    global.TestNormsContentStore = TestNormsContentStore;
})(window);
