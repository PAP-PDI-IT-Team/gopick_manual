(function (global) {
    'use strict';

    var SEARCH_PHRASE_MIN_LENGTH = 2;
    var NON_NAVIGATION_HEADINGS = [
        'action / workflow',
        'access path',
        'how to use',
        'how to use:',
        'how to use',
        'how to use',
        'how to',
        'expected result',
        'expected results',
        'rules',
        'rule',
        'notes',
        'notes: dev',
        'notes: qa',
        'notes: qa and system user',
        'notes: optional',
        'return button',
        'account configuration dropdown',
        'sections',
        'sections:',
        'format',
        'available types',
        'available row actions',
        'page buttons',
        'available pages',
        'available actions',
        'action dropdown',
        'bulk action',
        'bulk actions',
        'required inputs',
        'optional inputs',
        'conditional inputs',
        'candidate schedule required inputs',
        'candidate schedule optional inputs',
        'candidate schedule conditional inputs',
        'data encoding required inputs',
        'data encoding optional inputs',
        'editable inputs',
        'locked inputs',
        'visible content',
        'selection groups'
    ];
    var scriptUrl = document.currentScript ? document.currentScript.src : '';
    var docsManifest = [
        {
            pageTitle: 'Accounts',
            pageUrl: '../../pages/workflow/accounts-management/index.html',
            docUrl: '../../docs/workflow/account-management.md',
            anchorAliases: {
                'account-information': 'create-account-information',
                'assign-products': 'create-assign-products',
                'meter-management': 'create-meter-management',
                'other-account-settings': 'create-other-account-settings',
                'review-account': 'create-review-account-details',
                'view-account': 'account-detail',
                'archive-account': 'archive',
                'restore-account': 'restore',
                'bulk-archive': 'bulk-action-archive',
                'bulk-delete': 'bulk-action-delete',
                'bulk-restore': 'bulk-action-restore'
            }
        },
        {
            pageTitle: 'Assessment Management',
            pageUrl: '../../pages/workflow/assessment-management/index.html',
            docUrl: '../../docs/workflow/assessment-management.md'
        },
        {
            pageTitle: 'Candidate Management',
            pageUrl: '../../pages/workflow/candidate-management/index.html',
            docUrl: '../../docs/workflow/candidate-management.md',
            anchorAliases: {
                'delete-candidate-snapshots-permanently': 'delete-snapshots',
                'delete-candidate': 'delete-candidates',
                'download-view-reports-of-assessments': 'downloadview-reports-of-assessments',
                'extend-link-expiration': 'extend-link-expirations'
            }
        },
        {
            pageTitle: 'Meters Management',
            pageUrl: '../../pages/workflow/meters-management/index.html',
            docUrl: '../../docs/workflow/meters-management.md'
        },
        {
            pageTitle: 'Reports Management',
            pageUrl: '../../pages/workflow/reports-management/index.html',
            docUrl: '../../docs/workflow/reports-management.md'
        },
        {
            pageTitle: 'Roles/Permissions Management',
            pageUrl: '../../pages/workflow/roles-premission-management/index.html',
            docUrl: '../../docs/workflow/roles-permission-management.md'
        },
        {
            pageTitle: 'Users Management',
            pageUrl: '../../pages/workflow/users-management/index.html',
            docUrl: '../../docs/workflow/users-management.md'
        },
        {
            pageTitle: 'Documentation Standard V2',
            pageUrl: '../../pages/guides/manual-guides/index.html',
            docUrl: '../../docs/guides/manual-documentation-standard.md'
        },
        {
            pageTitle: 'Resource Center',
            pageUrl: '../../pages/workflow/resource-center/index.html',
            docUrl: '../../docs/workflow/resource-center.md'
        },
        {
            pageTitle: 'Meters Governance',
            pageUrl: '../../pages/domain-governance/meters/index.html',
            docUrl: '../../docs/domain-governance/meters.md'
        }
    ];

    var searchState = {
        index: [],
        loaded: false,
        loadPromise: null
    };

    function resolveAssetUrl(relativePath) {
        return new URL(relativePath, scriptUrl || document.baseURI).toString();
    }

    function slugify(text) {
        return String(text || '')
            .toLowerCase()
            .replace(/&/g, ' and ')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function sectionUrl(source, sectionId) {
        var resolvedId = source.anchorAliases && source.anchorAliases[sectionId]
            ? source.anchorAliases[sectionId]
            : sectionId;
        return resolveAssetUrl(source.pageUrl) + '#' + resolvedId;
    }

    function cleanMarkdownLine(line) {
        return String(line || '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/^[-*>#\s]+/, '')
            .trim();
    }

    function isSearchSectionHeading(headingText) {
        var normalized = String(headingText || '').toLowerCase().trim();
        return NON_NAVIGATION_HEADINGS.indexOf(normalized) === -1;
    }

    function extractSections(markdown, source) {
        var lines = markdown.split(/\r?\n/);
        var pageTitle = source.pageTitle;
        var currentSection = null;
        var sections = [];

        lines.forEach(function (line) {
            var headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
            if (headingMatch) {
                var level = headingMatch[1].length;
                var headingText = cleanMarkdownLine(headingMatch[2]);

                if (level === 1) {
                    if (headingText) pageTitle = headingText;
                    return;
                }

                if (!isSearchSectionHeading(headingText)) {
                    if (currentSection && headingText) {
                        currentSection.textParts.push(headingText);
                    }
                    return;
                }

                if (currentSection) {
                    sections.push(currentSection);
                }

                currentSection = {
                    pageTitle: pageTitle,
                    sectionTitle: headingText,
                    level: level,
                    textParts: [],
                    url: sectionUrl(source, slugify(headingText))
                };
                return;
            }

            if (!currentSection) return;

            var cleaned = cleanMarkdownLine(line);
            if (!cleaned) return;
            currentSection.textParts.push(cleaned);
        });

        if (currentSection) {
            sections.push(currentSection);
        }

        return sections.map(function (section) {
            return {
                pageTitle: section.pageTitle,
                sectionTitle: section.sectionTitle,
                level: section.level,
                url: section.url,
                body: section.textParts.join(' '),
                searchText: (section.pageTitle + ' ' + section.sectionTitle + ' ' + section.textParts.join(' ')).toLowerCase()
            };
        });
    }

    function cleanHtmlText(html) {
        return String(html || '')
            .replace(/<script[\s\S]*?<\/script>/gi, ' ')
            .replace(/<style[\s\S]*?<\/style>/gi, ' ')
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function extractHtmlSections(html, source) {
        var pageTitleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        var pageTitle = pageTitleMatch ? cleanHtmlText(pageTitleMatch[1]) : source.pageTitle;
        var sections = [];
        var sectionPattern = /<section\b[^>]*\bid=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
        var sectionMatch;

        while ((sectionMatch = sectionPattern.exec(html)) !== null) {
            var sectionId = sectionMatch[1];
            var sectionHtml = sectionMatch[2];
            var headingMatch = sectionHtml.match(/<h[2-6][^>]*>([\s\S]*?)<\/h[2-6]>/i);
            if (!headingMatch) continue;

            var sectionTitle = cleanHtmlText(headingMatch[1]);
            if (!sectionTitle || !isSearchSectionHeading(sectionTitle)) continue;

            var body = cleanHtmlText(sectionHtml);
            sections.push({
                pageTitle: pageTitle,
                sectionTitle: sectionTitle,
                level: 2,
                url: resolveAssetUrl(source.pageUrl) + '#' + sectionId,
                body: body,
                searchText: (pageTitle + ' ' + sectionTitle + ' ' + body).toLowerCase()
            });
        }

        return sections;
    }

    function mergeSearchSections(markdownSections, htmlSections) {
        var seenUrls = {};
        return markdownSections.concat(htmlSections).filter(function (section) {
            if (seenUrls[section.url]) return false;
            seenUrls[section.url] = true;
            return true;
        });
    }

    function loadSearchIndex() {
        if (searchState.loaded) return Promise.resolve(searchState.index);
        if (searchState.loadPromise) return searchState.loadPromise;

        searchState.loadPromise = Promise.all(docsManifest.map(function (source) {
            var markdownRequest = fetch(resolveAssetUrl(source.docUrl), { cache: 'no-store' })
                .then(function (response) {
                    if (!response.ok) throw new Error('Failed to load ' + source.docUrl);
                    return response.text();
                })
                .then(function (markdown) {
                    return extractSections(markdown, source);
                });

            var pageRequest = fetch(resolveAssetUrl(source.pageUrl), { cache: 'no-store' })
                .then(function (response) {
                    if (!response.ok) throw new Error('Failed to load ' + source.pageUrl);
                    return response.text();
                })
                .then(function (html) {
                    return extractHtmlSections(html, source);
                });

            return Promise.all([markdownRequest, pageRequest]).then(function (sourceResults) {
                return mergeSearchSections(sourceResults[0], sourceResults[1]);
            });
        })).then(function (results) {
            searchState.index = Array.prototype.concat.apply([], results);
            searchState.loaded = true;
            return searchState.index;
        });

        return searchState.loadPromise;
    }

    function scoreEntry(entry, query) {
        var score = 0;
        var sectionTitle = entry.sectionTitle.toLowerCase();
        var pageTitle = entry.pageTitle.toLowerCase();
        var body = entry.body.toLowerCase();

        if (sectionTitle.indexOf(query) !== -1) score += 6;
        if (pageTitle.indexOf(query) !== -1) score += 4;
        if (body.indexOf(query) !== -1) score += 2;
        if (entry.searchText.indexOf(query) === 0) score += 1;

        return score;
    }

    function findMatches(query) {
        var normalized = query.trim().toLowerCase();
        if (normalized.length < SEARCH_PHRASE_MIN_LENGTH) return [];

        return searchState.index
            .map(function (entry) {
                return {
                    entry: entry,
                    score: scoreEntry(entry, normalized)
                };
            })
            .filter(function (item) {
                return item.score > 0;
            })
            .sort(function (left, right) {
                if (right.score !== left.score) return right.score - left.score;
                return left.entry.sectionTitle.localeCompare(right.entry.sectionTitle);
            })
            .slice(0, 12)
            .map(function (item) {
                return item.entry;
            });
    }

    function createSearchShell() {
        var shell = document.createElement('div');
        shell.className = 'header-search';

        var openButton = document.createElement('button');
        openButton.type = 'button';
        openButton.className = 'inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-brand hover:bg-red-50 hover:text-brand';
        openButton.setAttribute('aria-label', 'Open documentation search');
        openButton.innerHTML = '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"/></svg><span class="hidden sm:inline">Search docs</span>';
        shell.appendChild(openButton);

        var backdrop = document.createElement('button');
        backdrop.type = 'button';
        backdrop.className = 'hidden fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-sm';
        backdrop.setAttribute('aria-label', 'Close documentation search');
        document.body.appendChild(backdrop);

        var panel = document.createElement('div');
        panel.className = 'hidden fixed left-1/2 top-[4.5rem] z-[90] w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/20 sm:top-20 sm:w-[calc(100%-2rem)] sm:rounded-2xl sm:p-4';
        panel.innerHTML =
            '<div class="flex items-center gap-3 border-b border-slate-100 pb-3">' +
                '<svg class="h-5 w-5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"/></svg>' +
                '<input type="search" id="globalHeaderSearchInput" class="min-w-0 flex-1 border-0 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-0" placeholder="Search page or section">' +
                '<button type="button" class="header-search-close inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700" aria-label="Close search">' +
                    '<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12"/></svg>' +
                '</button>' +
            '</div>' +
            '<p class="mt-3 text-xs text-slate-400">Search results show the page and section where the match lives.</p>' +
            '<div id="globalHeaderSearchStatus" class="mt-4 text-sm text-slate-500">Type at least ' + SEARCH_PHRASE_MIN_LENGTH + ' characters.</div>' +
            '<div id="globalHeaderSearchResults" class="mt-4 max-h-[50vh] space-y-3 overflow-y-auto sm:max-h-[60vh]"></div>';
        document.body.appendChild(panel);

        return {
            shell: shell,
            openButton: openButton,
            backdrop: backdrop,
            panel: panel,
            input: panel.querySelector('#globalHeaderSearchInput'),
            closeButton: panel.querySelector('.header-search-close'),
            status: panel.querySelector('#globalHeaderSearchStatus'),
            results: panel.querySelector('#globalHeaderSearchResults')
        };
    }

    function renderResults(targets, elements) {
        elements.results.innerHTML = '';

        if (!targets.length) {
            elements.status.textContent = 'No matching page or section found.';
            return;
        }

        elements.status.textContent = targets.length + ' result' + (targets.length === 1 ? '' : 's') + ' found.';

        targets.forEach(function (target) {
            var link = document.createElement('a');
            link.href = target.url;
            link.className = 'block rounded-xl border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-brand hover:bg-red-50';

            var page = document.createElement('div');
            page.className = 'text-xs font-bold uppercase tracking-wide text-brand';
            page.textContent = target.pageTitle;

            var section = document.createElement('div');
            section.className = 'mt-1 text-sm font-semibold text-slate-900';
            section.textContent = target.sectionTitle;

            var preview = document.createElement('p');
            preview.className = 'mt-2 text-sm text-slate-500 leading-relaxed';
            preview.textContent = target.body.slice(0, 180) + (target.body.length > 180 ? '...' : '');

            link.appendChild(page);
            link.appendChild(section);
            link.appendChild(preview);
            elements.results.appendChild(link);
        });
    }

    function attachSearch(header) {
        if (!header || header.querySelector('.header-search')) return;

        var headerRow = header.querySelector('div');
        if (!headerRow) return;

        var nav = header.querySelector('nav');
        var navToggle = header.querySelector('#navToggle');
        var elements = createSearchShell();
        var activeElementBeforeOpen = null;
        var rightCluster = headerRow.querySelector('.header-search-cluster');

        function closeSearch() {
            elements.panel.classList.add('hidden');
            elements.backdrop.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
            if (activeElementBeforeOpen && typeof activeElementBeforeOpen.focus === 'function') {
                activeElementBeforeOpen.focus();
            }
        }

        function openSearch() {
            activeElementBeforeOpen = document.activeElement;
            elements.panel.classList.remove('hidden');
            elements.backdrop.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
            elements.input.focus();
            loadSearchIndex().then(function () {
                if (!elements.input.value.trim()) {
                    elements.status.textContent = 'Type at least ' + SEARCH_PHRASE_MIN_LENGTH + ' characters.';
                }
            }).catch(function (error) {
                console.error(error);
                elements.status.textContent = 'Search index failed to load. Check the configured documentation paths.';
            });
        }

        function handleQueryChange() {
            var query = elements.input.value.trim();
            if (query.length < SEARCH_PHRASE_MIN_LENGTH) {
                elements.results.innerHTML = '';
                elements.status.textContent = 'Type at least ' + SEARCH_PHRASE_MIN_LENGTH + ' characters.';
                return;
            }

            if (!searchState.loaded) {
                elements.status.textContent = 'Loading search index...';
                loadSearchIndex().then(function () {
                    renderResults(findMatches(query), elements);
                }).catch(function (error) {
                    console.error(error);
                    elements.results.innerHTML = '';
                    elements.status.textContent = 'Search index failed to load. Check the configured documentation paths.';
                });
                return;
            }

            renderResults(findMatches(query), elements);
        }

        elements.openButton.addEventListener('click', openSearch);
        elements.closeButton.addEventListener('click', closeSearch);
        elements.backdrop.addEventListener('click', closeSearch);
        elements.input.addEventListener('input', handleQueryChange);
        elements.results.addEventListener('click', function () {
            closeSearch();
        });

        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && !elements.panel.classList.contains('hidden')) {
                closeSearch();
            }

            if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
                var tagName = document.activeElement && document.activeElement.tagName;
                if (tagName === 'INPUT' || tagName === 'TEXTAREA') return;
                event.preventDefault();
                openSearch();
            }
        });

        if (!rightCluster) {
            rightCluster = document.createElement('div');
            rightCluster.className = 'header-search-cluster ml-auto flex items-center gap-3';

            if (nav && nav.parentNode === headerRow) {
                rightCluster.appendChild(nav);
            }

            rightCluster.appendChild(elements.shell);

            if (navToggle && navToggle.parentNode === headerRow) {
                rightCluster.appendChild(navToggle);
            }

            headerRow.appendChild(rightCluster);
        } else {
            rightCluster.appendChild(elements.shell);
        }
    }

    function init() {
        var homeLogoLink = document.querySelector('a[aria-label="GoPick home"]');
        if (homeLogoLink) {
            homeLogoLink.addEventListener('click', function (event) {
                var targetHref = homeLogoLink.getAttribute('href');
                if (!targetHref) return;
                event.preventDefault();
                window.location.assign(targetHref);
            });
        }
        attachSearch(document.querySelector('header'));
    }

    global.sharedHeaderSearch = {
        init: init
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(window);
