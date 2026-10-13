# UI Uniformity & Image Placeholder Implementation Plan

This plan establishes layout and visual uniformity across the GoPick manual pages, using **Accounts**, **Candidates**, and **Activity Log** as the foundational baselines, while implementing a shared image and screenshot placeholder component across all workflow pages.

---

## Slices & Task Checklist

### 1. Foundations & Shared Design System Tokens
- [x] **1.1. Shared Image & Screenshot Placeholder Styles**
  - [x] Add `.manual-image-card` container styles with subtle slate border and rounded corners in [`shared/css/site-shell.css`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/shared/css/site-shell.css).
  - [x] Add `.manual-image-card__placeholder` with dashed slate border, light neutral background (`bg-slate-50/50`), hover micro-interaction, and image icon SVG.
  - [x] Add `.manual-image-card__header` containing tag/badge (`Screenshot: [Feature/View Name]`) and optional status badge (`Pending Screenshot`).
  - [x] Add `.manual-image-card__caption` for description, helper text, and context notes.
  - [x] Add `.manual-image-card__img` for rendered screenshots with lazy-loading, rounded corners, and lightbox/zoom readiness.
- [x] **1.2. Shared Structural & Component Uniformity Rules**
  - [x] Standardize typography scale, callout cards (Rules, Expected Results, Notes, Systems), access paths, and action links in shared styles.
  - [x] Ensure consistent page reading surface styling (`.manual-reading-surface`) and section spacing.

---

### 2. Standardized Image/Placeholder Helper Function
- [x] **2.1. Reusable Image Rendering Engine**
  - [x] Create standardized `createImageOrPlaceholder(imageObj, sectionTitle)` DOM builder method.
  - [x] Support explicit image schema:
    ```javascript
    images: [
      {
        title: "Account Information Form",
        caption: "Shows required fields for Distributor and Sub-Account creation.",
        src: "assets/img/create-account-form.png", // or empty/null for placeholder
        alt: "Create Account Information Form screenshot"
      }
    ]
    ```
  - [x] Gracefully render the styled dashed placeholder when `src` is empty, missing, or broken.
  - [x] Implement optional fallback placeholder rendering for key sections lacking visual diagrams.

---

### 3. Baseline Page Harmonization: Candidate Management
- [x] **3.1. Template & Layout Alignment**
  - [x] Verify [`pages/workflow/candidate-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/candidate-management/index.html) against shared shell tokens and sidebar sticky offset.
- [x] **3.2. Data & Renderer Integration**
  - [x] Add image cards & placeholders integration to Candidate Management.
  - [x] Hook `images` parsing into section renderer delegating to `GoPickImageRenderer`.
  - [x] Add initial image/screenshot placeholders to key sections (Schedule Candidate, Candidate Information, Test Requirements).
- [x] **3.3. Architecture Decomposition & Sidebar Tracker Fix**
  - [x] Decompose `dataFiller.js` into focused OOP modules (`contentStore.js`, `contentRenderer.js`, `sidebarTracker.js`, `behavior.js`).
  - [x] Resolve sidebar tracker class conflicts and implement reliable scroll-spy viewport detection.

---

### 4. Baseline Page Harmonization: Activity Log Management
- [x] **4.1. Template & Layout Alignment**
  - [x] Verify [`pages/workflow/activity-log-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/activity-log-management/index.html) container wrapper and hero alignment.
- [x] **4.2. Data & Renderer Integration**
  - [x] Hook `images` rendering into `ActivityLogRenderer` using `GoPickImageRenderer`.
  - [x] Add initial screenshot placeholders for User Activities, Advanced Search, Candidate Activities, and Candidate Snapshot modal.
- [x] **4.3. Architecture Decomposition & OOP Modularization**
  - [x] Decompose `dataFiller.js` into focused OOP modules (`contentStore.js`, `contentRenderer.js`, `sidebarTracker.js`, `behavior.js`).
  - [x] Ensure reliable scroll-spy viewport detection and clean module interop.

---

### 5. Baseline Page Harmonization: Accounts Management
- [x] **5.1. Layout & Architecture Alignment**
  - [x] Align [`pages/workflow/accounts-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/accounts-management/index.html) reading surface with Candidate & Activity Log standard.
- [x] **5.2. Data & Renderer Integration**
  - [x] Hook `images` rendering into `AccountsRenderer` using `GoPickImageRenderer`.
  - [x] Add screenshot placeholders for Create Account Wizard, View Accounts, Update Specific, and View Active Account.
- [x] **5.3. Architecture Decomposition & OOP Modularization**
  - [x] Decompose `dataFiller.js` into focused OOP modules (`contentStore.js`, `contentRenderer.js`, `sidebarTracker.js`, `behavior.js`).
  - [x] Retain and seamlessly integrate RBAC matrix data and capability cards.

---

### 6. Review, Verification & Documentation
- [x] **6.1. Visual & Interactive QA**
  - [x] Verified zero syntax errors across all decomposed scripts via `node -c`.
  - [x] Verified active scroll-spy offset tracking and sidebar tree highlighting across baseline modules.
- [x] **6.2. Documentation & Downstream Readiness**
  - [x] Standardized image schema and reusable `GoPickImageRenderer` utility ready for subsequent pages (Meters, Dashboard, Roles/Permissions, Users, Reports).
  - [x] Baseline architecture validated: `dataFiller.js` (data), `contentStore.js` (store/search), `contentRenderer.js` (rendering), `sidebarTracker.js` (scroll spy), `behavior.js` (app orchestration).

---

## Phase 2: Universal UI Uniformity & 5-Tier Architecture Rollout

### 7. Design System & Structural Gating Documentation
- [x] **7.1. DESIGN.md Updates**
  - [x] Add Image Cards & Visual Placeholders specification (`.manual-image-card`, pending vs. live badges, caption schema, and fallback rules).
  - [x] Add 3-part page structure layering guidelines (Data/Store $\rightarrow$ Renderer $\rightarrow$ Navigation/Behavior).
  - [x] Document gating criteria for image placeholders: required for major workflow overviews, key sub-modals, action flows, and drawer forms.

---

### 8. Workflow Pages Rollout (5-Tier OOP Modularization & Image Placeholders)
- [x] **8.1. Dashboard Management (`pages/workflow/dashboard-management/`)**
  - [x] Pure data extraction into `dataFiller.js` with image placeholders (Overview, Metric counters, Activity drilldown).
  - [x] Create `contentStore.js` (`DashboardStore`).
  - [x] Create `contentRenderer.js` (`DashboardRenderer` integrating `GoPickImageRenderer`).
  - [x] Create `sidebarTracker.js` (`DashboardSidebarTracker`).
  - [x] Refactor `behavior.js` (`DashboardApp`).
  - [x] Update `index.html` script tags & verify syntax with `node -c`.
- [x] **8.2. Meters Management (`pages/workflow/meters-management/`)**
  - [x] Pure data extraction into `dataFiller.js` with image placeholders (Inventory matrix, Transfer/Recharge modal, Logs).
  - [x] Create `contentStore.js` (`MetersStore`).
  - [x] Create `contentRenderer.js` (`MetersRenderer` integrating `GoPickImageRenderer`).
  - [x] Create `sidebarTracker.js` (`MetersSidebarTracker`).
  - [x] Refactor `behavior.js` (`MetersApp`).
  - [x] Update `index.html` script tags & verify syntax with `node -c`.
- [x] **8.3. Users Management (`pages/workflow/users-management/`)**
  - [x] Pure data extraction into `dataFiller.js` with image placeholders (Directory table, Add/Edit User modal, Reset password).
  - [x] Create `contentStore.js` (`UsersStore`).
  - [x] Create `contentRenderer.js` (`UsersRenderer` integrating `GoPickImageRenderer`).
  - [x] Create `sidebarTracker.js` (`UsersSidebarTracker`).
  - [x] Refactor `behavior.js` (`UsersApp`).
  - [x] Update `index.html` script tags & verify syntax with `node -c`.
- [x] **8.4. Roles & Permissions Management (`pages/workflow/roles-premission-management/`)**
  - [x] Pure data extraction into `dataFiller.js` with image placeholders (Matrix overview, Custom Role creator, Role Assignment).
  - [x] Create `contentStore.js` (`RolesPermissionsStore`).
  - [x] Create `contentRenderer.js` (`RolesPermissionsRenderer` integrating `GoPickImageRenderer`).
  - [x] Create `sidebarTracker.js` (`RolesPermissionsSidebarTracker`).
  - [x] Refactor `behavior.js` (`RolesPermissionsApp` coordinating RBAC table).
  - [x] Update `index.html` script tags & verify syntax with `node -c`.
- [ ] **8.5. Reports Management (`pages/workflow/reports-management/`)**
  - [ ] Pure data extraction into `dataFiller.js` with image placeholders (Catalog & filter builder, Export options, Scheduled config).
  - [ ] Create `contentStore.js` (`ReportsStore`).
  - [ ] Create `contentRenderer.js` (`ReportsRenderer` integrating `GoPickImageRenderer`).
  - [ ] Create `sidebarTracker.js` (`ReportsSidebarTracker`).
  - [ ] Refactor `behavior.js` (`ReportsApp`).
  - [ ] Update `index.html` script tags & verify syntax with `node -c`.
- [ ] **8.6. Resource Center (`pages/workflow/resource-center/`)**
  - [ ] Pure data extraction into `dataFiller.js` with image placeholders (Library browser, Preview modal, Downloads).
  - [ ] Create `contentStore.js` (`ResourceCenterStore`).
  - [ ] Create `contentRenderer.js` (`ResourceCenterRenderer` integrating `GoPickImageRenderer`).
  - [ ] Create `sidebarTracker.js` (`ResourceCenterSidebarTracker`).
  - [ ] Refactor `behavior.js` (`ResourceCenterApp`).
  - [ ] Update `index.html` script tags & verify syntax with `node -c`.
- [ ] **8.7. Assessment Management (`pages/workflow/assessment-management/`)**
  - [ ] Standardize into data dictionary `dataFiller.js` with image placeholders (Catalog, Batteries, Norm groups, Scoring/Delivery).
  - [ ] Create `contentStore.js` (`AssessmentStore`).
  - [ ] Create `contentRenderer.js` (`AssessmentRenderer` integrating `GoPickImageRenderer`).
  - [ ] Create `sidebarTracker.js` (`AssessmentSidebarTracker`).
  - [ ] Refactor `behavior.js` (`AssessmentApp`).
  - [ ] Align container markup in `index.html` to `.manual-reading-surface` & wire script tags.

---

### 9. Final QA & Cross-Page Verification
- [ ] **9.1. Syntax & Error Free Validation**
  - [ ] Run `node -c` across all newly decomposed JS files.
- [ ] **9.2. Interactive Behavior & Scroll-Spy Validation**
  - [ ] Verify 140px scroll-spy offset and active sidebar highlighting across all 7 pages.
  - [ ] Verify direct URL hash linking (`#section-id`).
  - [ ] Verify image card placeholders render with uniform badges, borders, and captions.
- [ ] **9.3. Documentation & Changelog**
  - [ ] Confirm alignment with `AGENTS.md` and update changelog as required.
