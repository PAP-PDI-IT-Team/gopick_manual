# GoPick Assessment Center - Application Information

---

## What is GoPick?

GoPick, also referred to as the Assessment Center, is a web-based platform purpose-built for organizations that need to create, administer, and manage online assessments at scale. It is designed to support the full assessment lifecycle: from building a test library, to scheduling assessments for candidates, to delivering those assessments online, and finally collecting and reporting on results.

The platform is multi-tenant by design, meaning a single installation can serve multiple independent client organizations simultaneously. Each client organization manages its own candidates, assessments, and results without visibility into other clients' data. A hierarchy of user roles - Administrators, Distributors, Client Managers, and Candidates - governs what each person can see and do within the system.

GoPick is accessed entirely through a web browser. No software installation is required for end users. There are two separate web interfaces: an administrative portal for managing the system, and a candidate portal where test-takers log in and complete their assigned assessments.

---

## Who Uses GoPick?

GoPick serves four distinct types of users, each with a different scope of access and responsibility:

**Administrators** are the highest-level users of the system. They have full access to all features across all client accounts. An Administrator can create and manage any account in the system, build and configure assessments, assign assessments to candidates, view all results and reports, and configure system-wide settings including branding, email templates, and security options. Administrators are responsible for the overall health and operation of the platform.

**Distributors** operate at a level below Administrators. They are typically organizations or partners that have been granted the ability to manage multiple client accounts under their umbrella. A Distributor can create and manage the client accounts assigned to them, oversee the assessments and candidates within those accounts, and view aggregated results across their client base. Distributors cannot access accounts outside their assigned scope.

**Client Managers** are users who manage a single client organization. They are responsible for managing the candidates within their organization, assigning assessments, monitoring progress, and viewing results. Client Managers typically work within the boundaries of their own organization's account and do not have access to other clients' data or to system-level settings.

**Candidates** are the end users who take assessments. They access the platform through the candidate portal, log in with their assigned credentials (or self-register if the feature is enabled for their organization), and complete the assessments that have been assigned to them. Candidates can view their own results if the system is configured to make results visible after completion.

---

## How to Access GoPick

GoPick is accessed through a web browser using the following URLs:

- **Admin and Manager Portal:** `http://localhost:82/app/administrator/`
  This is where Administrators, Distributors, and Client Managers log in to manage the system, accounts, assessments, candidates, and reports.

- **Candidate Portal:** `http://localhost:82/app/`
  This is where candidates log in to take their assigned assessments. If self-registration is enabled, candidates can also create their own account from this page.

If you do not have an account or cannot log in, contact your site administrator. Accounts are created and managed by Administrators or Client Managers; candidates cannot create accounts on their own unless self-registration is explicitly turned on.

---

## Main Features

GoPick provides a comprehensive set of features covering the complete online assessment workflow. Below is a detailed description of each major capability:

**Online Assessment Delivery** is the core capability of GoPick. Candidates access their assigned assessments through the candidate portal. The system presents questions one at a time or in pages, tracks time if a timer is configured, and records answers as the candidate progresses. When the candidate finishes, the system captures the submission and makes it available for scoring and reporting. The platform supports different assessment types including standard tests, video interview assessments, and third-party assessments via integrations such as eSkill.

**Assessment Creation and Management** allows Administrators and authorized managers to build test content directly in the platform. Assessments can be created from scratch using the built-in builder, or imported in bulk via Excel or CSV files. Each assessment can have a name, description, category, and a set of questions. Questions can include text, images, and various response formats. Assessments can be organized by category and reused or copied across different client accounts.

**Candidate Management** covers the full lifecycle of a candidate in the system. Candidates can be registered manually one at a time, or imported in bulk from a spreadsheet. Each candidate has a profile containing their personal information, login credentials, and assignment history. Managers can search, filter, and view candidates, edit their profiles, reset their passwords, and deactivate their accounts when they are no longer needed.

**Scheduling and Assignment** allows managers to assign specific assessments to specific candidates, with optional scheduling constraints such as a start date, end date, and time window. Schedules can be applied to individual candidates or to groups. The system tracks whether a candidate has started, is in progress, completed, or has not yet begun their assigned assessment.

**Results and Reporting** gives administrators and managers access to the outcomes of completed assessments. Individual results can be viewed on-screen and downloaded as PDF or Excel reports. Group-level reports can aggregate results across all candidates in a particular assessment batch. Reports can include scores, completion times, response-level breakdowns, and comparative statistics. Archived reports allow retrieval of historical results even after assessments have been updated or replaced.

**Account and User Management** is the administrative backbone of the platform. The system supports a full hierarchy of accounts: distributor accounts can contain multiple client accounts, and each client account contains its own set of users and candidates. Administrators can create, edit, deactivate, and delete accounts at any level. Role assignments determine what each user can see and do. Password policies and reset workflows are managed from within the system.

**Email Notifications and Templates** enable the system to send automated emails at key points in the assessment lifecycle, such as when a candidate is registered, when an assessment is assigned, or when results are ready. Email templates are customizable so that the content and branding of outgoing emails matches the client organization's style. Administrators can manage the full library of email templates from the settings area.

**Video Interview Assessments** are a specialized assessment type supported natively by the platform. Administrators can create video interview question sets that prompt candidates to record video responses to each question. The recorded responses are then reviewed and scored by evaluators. This module has its own builder, review interface, and reporting section.

**Content Management** allows administrators to manage static content that appears on the candidate portal, such as the privacy policy, consent notices, the finish/thank-you page that candidates see after completing an assessment, and other informational pages. This ensures the platform can be customized to meet the legal and branding requirements of each client organization.

**Site Branding** lets administrators upload a custom logo and adjust the visual identity of the platform so that it matches the client's organization. This is managed through the configuration section and applies to both the admin portal and the candidate-facing portal.

**Meter and Usage Tracking** provides a mechanism for tracking assessment credit usage. Meters define how many assessment credits an account has available, and each completed assessment draws down from that meter. Administrators can view meter logs, configure meter orders, and monitor usage across all accounts.

**Activity Logging** maintains an audit trail of significant actions performed in the system, including login events, assessment completions, and administrative changes. This log is accessible to Administrators and can be filtered by candidate, account, or date range.

**Test Security** provides controls for preventing cheating and ensuring assessment integrity. Security settings can include monitoring options, restrictions on navigation (such as preventing candidates from going back to previous questions), and flagging candidates who exhibit suspicious behavior.

**Test Norms** allow administrators to define normative benchmarks against which candidate scores are compared. Norms can be applied to assessments to produce percentile rankings or comparative ratings in reports.

**Group Report Templates** allow administrators to design and save reusable templates for group-level reports. These templates define the structure and content of reports when generated for a batch of candidates.

**Message Board** provides a simple internal communication tool within the admin portal, allowing administrators to post notices or messages visible to other administrative users of the system.

**Advisory Notices** support the posting of advisory or announcement content that can be surfaced to users within the platform, such as maintenance notices or updates to policies.

---

## Website Modules - Detailed Breakdown

GoPick is built around a modular structure. Each major area of functionality is encapsulated in its own module. Below is a detailed description of each module within the admin portal (backend) and the candidate portal (frontend), along with their submodules and specific capabilities.

---

### Admin Portal Modules (Backend)

#### Dashboard (`modDashboard`)

The Dashboard is the first screen a user sees after logging in to the admin portal. It provides a real-time overview of the current state of the system. The Dashboard displays key statistics including: the number of candidates currently active, the number of assessments in progress or completed today, a summary of scheduled upcoming sessions, and a breakdown of results by date range. Administrators and managers can set a date filter (e.g., "today", a specific date range) to focus the summary on a particular period. Quick-action shortcut buttons on the dashboard provide direct navigation to the most commonly used areas such as adding a new candidate, starting a new assessment schedule, and viewing the latest results.

#### Account Management (`modAccount`)

The Account Management module is responsible for creating and maintaining the hierarchy of organizational accounts within the platform.

- **Account List and Search:** Displays all accounts in the system in a filterable, searchable table. Users can filter by account type (distributor, client), status (active, inactive), or search by name or email. Each row in the list provides quick access to view, edit, or deactivate the account.

- **Account Creation:** Provides a form to create a new account. The form collects the organization name, contact email, account type, and the parent account (for client accounts nested under a distributor). It also allows setting the initial configuration options for the account, such as the number of meters assigned and whether self-registration is permitted for candidates.

- **Account Detail and Update:** Displays the full profile of a selected account and allows administrators to edit any field. This includes the organization name, contact details, active status, assigned meters, and linked users.

- **User Assignment:** Within each account record, administrators can view and manage the admin users who are linked to that account, assign new users, change their roles, and remove access.

#### Candidate Management (`modCandidates`)

The Candidate Management module handles all aspects of candidate records across the system.

- **Candidate List and Search:** Shows all candidates registered in the system (or within the scope of the logged-in user's account). The list can be searched by name, email, or username, and filtered by account, status (active, inactive, cheater), or date added. Bulk actions such as deactivation or export are available from this list.

- **Candidate Registration:** Provides a form to register a new candidate. Fields include personal details (first name, last name, email), login credentials (username, auto-generated or manual password), and account assignment. After registration, the system can optionally send a welcome email with login instructions.

- **Bulk Import:** Allows uploading a spreadsheet (Excel or CSV) to register multiple candidates at once. The spreadsheet must follow a defined template. The system validates each row and reports any errors before completing the import.

- **Candidate Profile (View/Edit):** Displays the full record for a selected candidate, including their personal details, current account assignment, assessment history, activity logs, and login status. Managers can edit any field, reset the candidate's password, or deactivate the account.

- **Respondent Management:** Supports the creation and management of raters or respondents associated with a candidate, which is relevant for multi-rater or 360-degree assessment formats.

#### Assessments (`modAssessments`)

The Assessments module is where all test content is created, organized, and managed.

- **Assessment List:** Displays all assessments available in the system. The list can be filtered by category, type, or account. Each row shows the assessment name, category, question count, and current status.

- **Assessment Builder (Create/Update):** A detailed form for building a new assessment from scratch. Fields include the assessment name, description, category, scoring configuration, and settings such as timer duration, randomization, and display options. Questions can be added one at a time using the built-in question editor or imported in bulk.

- **Question Bank:** Each assessment has its own set of questions. The question editor supports various question formats. Questions can be reordered, edited, or deleted. For bulk creation, a spreadsheet import is available.

- **Assessment Copy:** Existing assessments can be duplicated, creating an independent copy that can be modified without affecting the original. This is useful for creating variations of a standard assessment for different client accounts.

- **Assessment Import/Export:** Entire assessments including all questions can be exported to an Excel file and reimported into the same or a different instance of the platform. This supports content migration and backup workflows.

- **Group Assessments:** Multiple individual assessments can be grouped together into a single assessment bundle. Group assessments allow administrators to chain several instruments into one candidate session, controlling the order in which each assessment is presented.

- **Test Creator Integration:** The platform integrates with an external test creation service. Administrators can link assessments to external test creator content, configure the setup page, push questions to the third-party system, and receive scored results back via a webhook.

- **Assessment Schedule (modAssessmentSchedule):** Manages assessment-level scheduling rules, defining the default availability window and conditions under which an assessment can be taken.

#### Schedule Management (`modSchedule`)

The Schedule module handles the assignment of assessments to individual candidates. A schedule record links one candidate to one assessment and defines the window during which the candidate may access it.

- **Schedule List:** Displays all active and completed schedules across the system. Filterable by candidate, assessment, account, date range, and completion status. Each schedule record shows the candidate name, assessment name, assigned date, completion date, and current status (pending, in progress, completed, expired).

- **Create Schedule:** Form to assign a specific assessment to a specific candidate. Allows setting the start date, end date, and any special configuration overrides for this particular session (such as a custom time limit or a specific test version).

- **Bulk Scheduling:** Supports assigning an assessment to a large group of candidates at once by selecting a candidate group and an assessment, then applying schedule settings to all members of the group simultaneously.

- **Schedule Status Tracking:** Each schedule record is updated in real time as the candidate interacts with the assessment. Administrators can see when the candidate started, how much time has elapsed, and whether the session has been completed or expired.

#### Answers (`modAnswers`)

The Answers module provides administrators with visibility into the raw response data collected from completed assessments.

- **Answer Review:** Displays the individual answers submitted by a candidate for a specific assessment session. This includes each question, the candidate's selected response, the correct answer (if applicable), and whether the response was scored correctly.

- **Answer Search and Filter:** Administrators can search and filter answer records by candidate, assessment, or date to locate specific submissions for review or audit purposes.

#### Results and Reports (`modArchiveReport`, `modExecutiveSummaryReports`, `modGroupReportTemplate`)

Results and reporting are handled across several modules:

- **Archive Report (`modArchiveReport`):** Stores and retrieves completed assessment reports. Reports are generated after a candidate completes an assessment and are stored in the archive for later retrieval. Reports can be viewed on-screen, downloaded as PDFs, or exported to Excel. The archive is searchable and filterable by candidate, assessment, account, and date.

- **Executive Summary Reports (`modExecutiveSummaryReports`):** Generates high-level summary reports intended for management audiences. These reports aggregate scores and statistics across a cohort of candidates for a given assessment or series of assessments, providing a concise overview of results.

- **Group Report Templates (`modGroupReportTemplate`):** Allows administrators to define reusable templates that control the layout and content of group-level reports. Templates specify which data fields appear in the report, in what order, and with what formatting. Once a template is saved, it can be applied when generating group reports to produce consistently formatted output.

#### Video Interview (`modVideoInterview`, `modVideoInterviewReport`)

The Video Interview module extends the assessment capabilities of the platform to include recorded video responses.

- **Video Interview Builder:** Administrators can create a video interview assessment by defining a set of questions that candidates will respond to via recorded video. Each question can have a preparation time and a maximum recording duration. The builder also supports a gamified presentation mode.

- **Video Interview Review (`modVideoInterviewReport`):** After candidates complete their video interview, reviewers can access the recordings and evaluate each response. The review interface presents each video alongside the question prompt and provides scoring controls. Completed evaluations are stored and contribute to the candidate's overall assessment record.

#### Email Management (`modEmails`, `modEmailTemplate`)

- **Email Log (`modEmails`):** Maintains a log of all emails sent by the system, including registration confirmations, assessment invitations, result notifications, and password reset emails. Administrators can search the log by recipient, subject, or date to verify that messages were sent and to investigate any delivery issues.

- **Email Templates (`modEmailTemplate`):** Provides an editor for managing the templates used for each type of system-generated email. Templates support variable substitution (e.g., inserting the candidate's name, assessment title, or login link) and can be customized per account to reflect the client's branding and tone of voice.

#### Content Manager (`modContentManager`)

The Content Manager module allows administrators to edit the static content pages that appear across the platform, including the privacy policy, consent notice, and the finish/completion page shown to candidates after they submit an assessment. Each piece of content can be edited using a rich-text editor, making it possible to update legal notices or add organization-specific instructions without requiring any technical changes.

#### Settings (`modSettings`)

The Settings module contains system-wide configuration options managed by Administrators.

- **General Settings:** Controls global switches such as whether self-registration is allowed, whether login captcha is enforced, and other platform-wide behaviors.
- **Security Settings:** Manages password policies, session timeout durations, and other security-related configurations.
- **Notification Settings:** Configures which events trigger automated email notifications and to whom those notifications are sent.

#### System Configuration (`modConfig`)

`modConfig` manages account-level configuration records that control per-account behavior such as the logo, branding colors, consent text, and finish page content. Each client account can have its own configuration, allowing the platform to present a customized experience to each organization's candidates.

#### Test Security (`modTestSecurity`)

The Test Security module provides controls for administrators to specify security measures applied during assessment delivery. Options include monitoring candidate behavior for signs of tab switching or focus loss, preventing backward navigation through questions, and flagging candidates who trigger security events. Security events are recorded and made available in the activity log for review.

#### Test Norms (`modTestNorm`)

Test norms define the reference data against which individual candidate scores are compared. Administrators can upload or configure norm tables for specific assessments. When a candidate's score is processed, the system looks up the norm for that assessment and calculates the candidate's percentile rank or normative category. These derived scores appear in reports alongside raw scores.

#### Meter and Usage Management (`modMeter`, `modMeterOrder`, `modMeterlog`, `modMetrics`)

- **Meters (`modMeter`):** Meters represent assessment credits assigned to a client account. Each completed assessment consumes a defined number of meter credits. Administrators can view the current balance of each account's meter and top it up as needed.

- **Meter Orders (`modMeterOrder`):** Records requests or orders for additional meter credits. When a client account needs more assessment capacity, an order is created, approved, and applied to the account's meter balance.

- **Meter Log (`modMeterlog`):** An audit trail of all meter deductions and additions. Administrators can review the log to verify that meter usage matches the number of assessments completed and that any manual adjustments are accounted for.

- **Metrics (`modMetrics`):** Provides aggregate usage statistics and performance metrics across accounts, assessments, and time periods. Used for monitoring platform utilization and capacity planning.

#### User Management (`modUsers`)

The Users module manages the admin-level user accounts that have access to the admin portal. This is distinct from Candidate management. Administrators can create new admin users, assign them roles and account scopes, update their profile details, reset their passwords, and deactivate their access. Permissions are governed by role-based access control (RBAC) rules managed in the `modRoleBasedActionControl` module.

#### Role-Based Access Control (`modRoleBasedActionControl`)

This module manages the permission rules that govern what each user role can see and do within the admin portal. Roles such as Administrator, Distributor, and Client Manager are defined here, along with the specific actions each role is permitted to perform. Changes to role permissions take effect immediately for all users holding that role.

#### Activity Log (`modActivity`)

The Activity Log provides a chronological record of significant actions taken by users across the platform. Events recorded include logins, candidate registrations, assessment completions, report downloads, and administrative changes. The log is searchable and filterable by user, action type, account, or date. It serves as an audit trail for compliance and troubleshooting purposes.

#### Message Board (`modMessageBoard`)

The Message Board is an internal notice board within the admin portal. Administrators can post messages, announcements, or notices that are visible to other users when they log in. This can be used to communicate maintenance windows, policy updates, or other platform-level notices to the admin user community.

#### Advisory (`modAdvisory`)

The Advisory module manages advisory notices that can be surfaced to specific user groups or across the platform. These notices function as in-platform notifications or alerts, separate from email communications, and can be used to inform users of important updates or required actions.

#### Usage (`modUsage`)

The Usage module provides detailed reports on how the platform is being used over time, including the number of assessments taken, candidate registrations, and active accounts per period. These reports are used by Administrators and Distributors to monitor platform adoption, track billing, and identify trends across the client base.

#### API (`api`)

The API module exposes a set of programmatic endpoints used for integrations with external systems. The API supports operations on candidates and accounts, allowing external platforms to create or query records in GoPick without using the web interface. Access to the API is controlled through authentication.

---

### Candidate Portal Modules (Frontend)

#### Candidate Profile (`modCandidate`)

When a candidate logs in to the candidate portal, they are presented with their profile area. This shows their assigned assessments, their completion history, and any relevant instructions or notices associated with their account. The candidate can review their scheduled assessments and navigate to start one when ready.

#### Assessment Access (`modCandidateAssessment`)

This module manages the connection between a candidate and their assigned assessments. When a candidate selects an assessment to begin, this module validates that the candidate is authorized and within their scheduled window, then transfers them into the test-taking interface. It also handles the receipt of results and status updates from external assessment integrations via webhook.

#### Test Delivery (`modTest`)

The Test module is the core assessment-taking interface. It renders the assessment questions to the candidate using a dedicated layout designed for focused, distraction-free test-taking. The module handles question navigation, answer capture, timer countdowns (if configured), and final submission. It also manages integration with the eSkill external assessment platform, including authentication for API access and result delivery back to the system upon completion. A separate layout (`testtaking_template`) is applied to all pages within this module to provide the appropriate test-taking experience.

#### Self-Registration (`modSelfreg`)

The Self-Registration module allows candidates to create their own accounts on the candidate portal without requiring prior manual registration by an administrator. When enabled for a client account, candidates can access the self-registration form from the candidate portal login page, fill in their details, and receive login credentials by email. This reduces the administrative burden of individually registering large numbers of candidates.

---

## User Flows

### Administrator or Client Manager - Day-to-Day Workflow

An administrator or client manager typically interacts with the system in the following sequence when running an assessment program:

1. **Log in** at the admin portal URL.
2. The **Dashboard** loads, showing a summary of today's activity and any pending items.
3. Navigate to **Account Management** if a new client organization needs to be set up or an existing account needs to be updated.
4. Navigate to **Assessments** to check that the required tests are already available, or to create/import new assessments if needed.
5. Navigate to **Candidates** to register participants, either one at a time using the registration form or in bulk using the import feature.
6. Navigate to **Schedules** to assign the assessment to the candidates, set the availability window, and confirm the assignments.
7. Monitor progress from the **Dashboard** or the **Schedule list**, which shows in real time which candidates have started, are in progress, or have completed.
8. Once candidates begin completing assessments, navigate to **Results / Archive Reports** to view, download, or print individual or group reports.
9. Use **Email Logs** to confirm that notification emails were delivered to candidates.
10. Use the **Activity Log** to audit any specific events if needed.

### Candidate - Assessment-Taking Workflow

A candidate interacts with the platform in the following sequence:

1. **Log in** at the candidate portal URL using their assigned username and password. If self-registration is enabled, new candidates can register from this page before logging in for the first time.
2. After login, the candidate sees their **profile page** listing all assessments that have been assigned to them, along with each assessment's status (not started, in progress, completed) and the available time window.
3. The candidate selects an assessment to begin. The system checks that the candidate is within the allowed schedule window before proceeding.
4. The **test-taking interface** loads using the dedicated test layout. The candidate works through each question, selecting or entering their responses. If a timer is active, a countdown is displayed.
5. When the candidate has answered all questions (or when the timer expires), they submit the assessment. The system records the submission and displays a completion confirmation page.
6. If the assessment is configured to show results immediately, the candidate may see their score on the completion page. Otherwise, results are processed by administrators and made available through reports.

---

## Support & Help

For account setup, password resets, or access issues, contact your site administrator. For help understanding specific features, refer to the other guides in the `docs/` folder or ask your administrator to walk you through the relevant module.

---

## Quick Reference

| Purpose                      | URL                                    |
| ---------------------------- | -------------------------------------- |
| Admin / Manager login        | http://localhost:82/app/administrator/ |
| Candidate login              | http://localhost:82/app/               |
| Database admin (admins only) | http://localhost:8080/                 |
