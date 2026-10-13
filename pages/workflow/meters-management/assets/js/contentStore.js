(function (global) {
    'use strict';

    class MetersContentStore {
        constructor(content) {
            this.content = content || (global.__metersContent || {});
        }

        getContent() {
            return this.content;
        }

        getSections() {
            return this.content && this.content.sections ? this.content.sections : [];
        }

        getLegends() {
            return this.content && this.content.legends ? this.content.legends : [];
        }

        findSectionById(id, sections = this.getSections()) {
            for (const section of sections) {
                if (section.id === id) return section;
                if (section.children && section.children.length) {
                    const found = this.findSectionById(id, section.children);
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

    global.MetersContentStore = MetersContentStore;
})(window);
