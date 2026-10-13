# UI Uniformity & Image Placeholder Implementation Plan

This plan establishes layout and visual uniformity across the GoPick manual pages, using **Accounts**, **Candidates**, and **Activity Log** as the foundational baselines, while implementing a shared image and screenshot placeholder component across all workflow pages.

---

## Slices & Task Checklist

### 1. Foundations & Shared Design System Tokens
- [ ] **1.1. Shared Image & Screenshot Placeholder Styles**
  - [ ] Add `.manual-image-card` container styles with subtle slate border and rounded corners in [`shared/css/site-shell.css`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/shared/css/site-shell.css).
  - [ ] Add `.manual-image-card__placeholder` with dashed slate border, light neutral background (`bg-slate-50/50`), hover micro-interaction, and image icon SVG.
  - [ ] Add `.manual-image-card__header` containing tag/badge (`Screenshot: [Feature/View Name]`) and optional status badge (`Pending Screenshot`).
  - [ ] Add `.manual-image-card__caption` for description, helper text, and context notes.
  - [ ] Add `.manual-image-card__img` for rendered screenshots with lazy-loading, rounded corners, and lightbox/zoom readiness.
- [ ] **1.2. Shared Structural & Component Uniformity Rules**
  - [ ] Standardize typography scale, callout cards (Rules, Expected Results, Notes, Systems), access paths, and action links in shared styles.
  - [ ] Ensure consistent page reading surface styling (`.manual-reading-surface`) and section spacing.

---

### 2. Standardized Image/Placeholder Helper Function
- [ ] **2.1. Reusable Image Rendering Engine**
  - [ ] Create standardized `createImageOrPlaceholder(imageObj, sectionTitle)` DOM builder method.
  - [ ] Support explicit image schema:
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
  - [ ] Gracefully render the styled dashed placeholder when `src` is empty, missing, or broken.
  - [ ] Implement optional fallback placeholder rendering for key sections lacking visual diagrams.

---

### 3. Baseline Page Harmonization: Candidate Management
- [ ] **3.1. Template & Layout Alignment**
  - [ ] Verify [`pages/workflow/candidate-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/candidate-management/index.html) against shared shell tokens and sidebar sticky offset.
- [ ] **3.2. Data & Renderer Integration**
  - [ ] Add `createImageOrPlaceholder` helper to [`pages/workflow/candidate-management/assets/js/dataFiller.js`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/candidate-management/assets/js/dataFiller.js).
  - [ ] Hook `images` parsing into `renderSectionBody`.
  - [ ] Add initial image/screenshot placeholders to key sections (e.g. Schedule Candidate, Candidate Information, Test Requirements).

---

### 4. Baseline Page Harmonization: Activity Log Management
- [ ] **4.1. Template & Layout Alignment**
  - [ ] Verify [`pages/workflow/activity-log-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/activity-log-management/index.html) container wrapper and hero alignment.
- [ ] **4.2. Data & Renderer Integration**
  - [ ] Add `createImageOrPlaceholder` helper to [`pages/workflow/activity-log-management/assets/js/dataFiller.js`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/activity-log-management/assets/js/dataFiller.js).
  - [ ] Hook `images` rendering into `renderSectionBody`.
  - [ ] Add initial screenshot placeholders for User Activities, Candidate Activities, and Activity Log modal views.

---

### 5. Baseline Page Harmonization: Accounts Management
- [ ] **5.1. Layout & Architecture Alignment**
  - [ ] Align [`pages/workflow/accounts-management/index.html`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/accounts-management/index.html) reading surface with Candidate & Activity Log standard.
- [ ] **5.2. Data & Renderer Integration**
  - [ ] Add `createImageOrPlaceholder` helper to [`pages/workflow/accounts-management/assets/js/dataFiller.js`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/pages/workflow/accounts-management/assets/js/dataFiller.js).
  - [ ] Hook `images` rendering into `createInfoCard` / section renderers.
  - [ ] Add screenshot placeholders for Create Account, View Accounts, Update Specific, and Row Actions.

---

### 6. Review, Verification & Documentation
- [ ] **6.1. Visual & Interactive QA**
  - [ ] Run static server and test all 3 baseline pages on desktop and mobile viewports.
  - [ ] Verify sidebar navigation, deep hash links, and active state tracking.
- [ ] **6.2. Documentation & Downstream Readiness**
  - [ ] Document image schema guidelines for remaining manual pages (Meters, Dashboard, Roles/Permissions, Users, Reports).
  - [ ] Record changes in [`CHANGELOG.md`](file:///c:/Users/profiles1/OneDrive%20-%20People%20Dynamics,%20Inc/Desktop/Code/gopick_manual-1/CHANGELOG.md).
