(function (global) {
    'use strict';

    const gopickData = {
        hero: {
            title: 'GoPick Assessment Center',
            subtitle: 'A multi-tenant, web-based platform for building, scheduling, delivering, and reporting on online assessments.',
            ctaText: 'See main features'
        },
        features: [
            'Account and user hierarchy (distributor, client, roles)',
            'Candidate management (single or bulk registration, profiles)',
            'Assessment creation and management (builder, imports)',
            'Metering, usage tracking, and billing logs',
            'Results and reporting (individual, group, exports)',
            'Users management (search, update, archive, export)',
            'Roles and permissions management (RBAC, hierarchy, access control)',
            'Online assessment delivery (timers, paging, secure delivery)',
            'Scheduling and assignments with availability windows',
            'Email notifications and customizable templates',
            'Video interview assessments and review workflow',
            'Content and site branding management',
            'Activity logging and audit trails',
            'Test security settings and norms management'
        ],
        about: `GoPick is a browser-based, multi-tenant assessment platform that supports the full lifecycle of online testing: creating assessments, scheduling candidates, running secure test sessions, and producing detailed reports. Roles include Administrators, Distributors, Client Managers, and Candidates; each role has scoped access to features and data.`,
        contact: `Admin / Manager portal: http://localhost:82/app/administrator/\nCandidate portal: http://localhost:82/app/\nDatabase admin (admins only): http://localhost:8080/\nIf you cannot log in or need account setup, contact your site administrator.`
    };

    function fillTextById(targetId, textContent) {
        const node = document.getElementById(targetId);
        if (!node) return false;
        node.textContent = textContent;
        return true;
    }

    function fillHeroSection() {
        fillTextById('heroTitle', gopickData.hero.title);
        fillTextById('heroSubtitle', gopickData.hero.subtitle);
        fillTextById('heroCta', gopickData.hero.ctaText);
    }

    function fillFeatureList() {
        const listNode = document.getElementById('featuresList');
        if (!listNode) return;
        listNode.innerHTML = '';
        gopickData.features.forEach(function (featureText) {
            const li = document.createElement('li');
            li.className = 'features__item bg-white p-4 rounded-md border border-gray-100 opacity-0 translate-y-3';
            li.textContent = featureText;
            listNode.appendChild(li);
        });
    }

    function fillAbout() {
        const node = document.getElementById('aboutContent');
        if (!node) return;
        node.textContent = gopickData.about;
    }

    function fillContact() {
        const node = document.getElementById('contactContent');
        if (!node) return;
        node.textContent = gopickData.contact;
    }

    function fillFooterYear() {
        const yearNode = document.getElementById('footerYear');
        if (!yearNode) return;
        yearNode.textContent = new Date().getFullYear();
    }

    function init() {
        fillHeroSection();
        fillFeatureList();
        fillAbout();
        fillContact();
        fillFooterYear();
    }

    global.gopickDataLayer = {
        init: init,
        _internal: {
            data: gopickData,
            fillTextById: fillTextById
        }
    };

})(window);
