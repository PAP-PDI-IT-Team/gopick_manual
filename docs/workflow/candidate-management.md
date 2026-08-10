# Candidate Module

Manages candidate scheduling, data encoding, candidate assessment viewing, and assessment-level actions.

## Schedule Candidate

Schedules candidates through either candidate schedule or data encoding.

### Access Path

- `Candidates` > `Schedule Candidate`

### How To Use

1. Open `Candidates`.
2. Select `Schedule Candidate`.
3. Select [Schedule Type](#schedule-type).
4. Complete [Candidate Information](#candidate-information).
5. Complete [Test Requirements](#test-requirements).
6. Complete [Assign Products](#assign-products).
7. [Review Candidate Details](#review-candidate-details).
8. Save the candidate schedule.

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.

> Expected Result:
> - Candidate schedule details are saved using the reviewed configuration.

### Schedule Type

Selects the scheduling workflow based on how the candidate assessment will be handled.

#### Available Types

- `Candidate Schedule`: Schedule multiple candidates with the same assessment.
- `Data Encoding`: Schedule multiple candidates who took the assessment via paper and pen.

#### Required Inputs

- `Schedule Type`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.

### Candidate Information

Collects the account and candidate identity information used to create the candidate.

#### Required Inputs

- `Account Name`
- `First Name`
- `Last Name`
- `Candidate Email`
- `Gender`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Use one account name at a time.
> - Avoid duplicate candidate email addresses.

### Test Requirements

Sets schedule-type-specific test requirements, link validity, reminder, recipient, invitation, and backup email details.

#### Candidate Schedule Required Inputs

- `Camera Requirements`
- `Mic Requirements`
- `Start Date`
- `Time Start`
- `Expiration Date`
- `Time Expiration`
- `Assessment Reminder`
- `Reminder Time`
- `Assessment Report Recipient`
- `Assessment Invitation Email`
- `Backup Email`

#### Candidate Schedule Optional Inputs

- `Candidate Email as Report Recipient`
- `Report Recipient Email`
- `Candidate Email`
- `Report Recipient`

#### Candidate Schedule Conditional Inputs

- `Reminder Frequency`
- `Every # of days interval`
- `Custom Email`
- `Custom Assessment Invitation Email`

#### Data Encoding Required Inputs

- `Start Date`
- `Time Start`
- `Assessment Report Recipient`
- `Backup Email`

#### Data Encoding Optional Inputs

- `Candidate Email as Report Recipient`
- `Report Recipient Email`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - `Time Start`, `Expiration Date`, `Time Expiration`, `Reminder Time`, `Assessment Invitation Email`, and `Backup Email` can be autofilled when applicable.
> - `Assessment Report Recipient` uses server-side email checking.
> - `Assessment Report Recipient` can accept multiple email addresses separated by `,`.

### Assign Products

Assigns assessments that the candidate will take.

#### Selection Groups

- `Cognitive/Knowledge-based Assessment`
- `Competency-based Assessment`
- `Survey`
- `Behavioral/Personality-Based Assessment`
- `Test Battery`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - At least one assessment is required.
> - When a `single assessment` is selected, all `test batteries` containing that assessment are locked.
> - When a `test battery` is selected, all `single assessments` included in that battery are locked.
> - When a `test battery` is selected, all other `test batteries` that share at least one common `single assessment` are also locked.

> Notes:
> - `Test Battery` is a group of assessments bundled together.

### Review Candidate Details

Confirms candidate information, test requirements, assigned products, and schedule details before saving.

#### Visible Content

- Candidate information.
- Test requirements.
- Assigned products.
- Schedule details.

#### How To Use

1. Open `Review Candidate Details`.
2. Review candidate information.
3. Review test requirements.
4. Review assigned products.
5. Go back to the relevant step when a value needs correction.
6. Save the candidate schedule when the reviewed details are correct.

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - Saving must use the reviewed configuration from the current schedule candidate flow.

> Expected Result:
> - The reviewed candidate details are used when the candidate schedule is about to be saved.

## View Candidates

Displays candidates list by the selected distributor account

> Legends:
> `Scheduled` - otherwise, when `schedules` exist
> `Started` - any schedule is `started`, `completed`, `report_pending`, `scored`, or has `date_completed`, but not all are completed-like
> `Completed` - `all schedules` are `completed`, `report_pending`, or `scored` while not all are `scored`
> `Scored` - `all schedules` are `scored`
> `Expired` - `expiration date` is lapsed and not yet completed-like, this is optional badge
> `Blocked` - when the candidate is blocked, this is optional badge

### Access Path
- `Candidates` > `View Candidates`

### Available Row Actions

- [View Candidate](#view-candidate)
- [Update Candidate](#update-candidate)
- Settings Candidate
    - [Schedule Assessment](#schedule-assessment)
    - [View Candidate Log](#view-candidate-log)
    - [View Schedule Assessments](#view-assessments)
    - [View Snapshots](#view-snapshots)

### Bulk Action

- [Send Report](#send-report)
- [Archive](#archive)
- [Export](#export)
- [Delete Candidate Snapshots Permanently](#delete-snapshots)
- [Delete Candidate](#delete-candidates)
- [Download Executive Summary Reports](#download-executive-summary-reports)
- [Send Reminders](#send-reminders)
- [Extend Link Expiration](#extend-link-expirations)

> Rule:
> - If there is no selected distributor account yet then `No listing will be provided`
> - If selected distributor account and no scheduled candidate yet then `No Result prompt will appear`
> - Error exception: Broken Hierarchy 

## Row Functions

### View Candidate

Show information specific of the selected candidate

#### Access Path
- `Candidates` > `View Candidates` > `View Row Action`

#### Action Dropdown

- [Update Candidate](#update-candidate)
- [View Assessment](#view-assessments)
- [Schedule Another Assessment](#schedule-another-assessments)
- [View Snapshots](#view-snapshots)
- [View Candidate Log](#view-candidate-log)
- [Unblock Candidate](#unblock-candidate)

#### Page Buttons

- [Resend Credentials](#resend-credentials)
- [Resend Invitation](#resend-invitation)
- [Back Button](#back-button)

### Update Candidate

Update Candidate Information, Account, Reminder Settings, Assessment Invitation, Test Requirements and Link Validity

#### Access Path
- `Candidate` > `View Candidate` > `Update`
- `Candidate` > `View Candidate` > `View` > `Action` Dropdown > `Update Candidate`

#### How To Use

1. Open `View Accounts`
2. `Update` allowed specific updates
3. Save

##### Editable Inputs

- `First Name`
- `Last Name`
- `Gender`
- `Candidate Email`
- `Phone Number`
- `Birthdate`
- `Educational Attainment`
- `Level of Position Applying For`
- `Work Experience`
- `Job Position`
- `Reminder Frequency`
- `Reminder Time`
- `Assessment Invitation Email`
- `Report Recipient Email`
- `Camera Requirement`
- `Mic Requirement`
- `Start Date`
- `Time Start`
- `Expiration Date`
- `Time Expiration`

##### Locked Inputs

- `Schedule Type`
- `Account Name`
- `Username`
- `Password`

> Rule:
> - `Schedule Type`, `Account Name`, `Username`, `Password` cannot be changed.
> - `First Name`, `Last Name`, `Candidate Email`, `Job Position`, `Assessment Invitation Email`, `Report Recipient Email` have a maximum of 100 characters.

> Expected Result:
> - Changes available information in [view of specific candidate](#view-candidate)

## Dropdown Functions

### Schedule Assessment

Can add more assessment for the candidate.

> Legends:
> `Scheduled` - means scheduled and set as assessment
> `Locked` - means it was locked because it was selected by a group assessment or single assessment

#### Access Path
- `Candidates` > `View Candidates` > `Cog/Settings` icon > `Schedule Assessment`
- `Candidates` > `View Candidates` > `View Candidate` > `Actions` Dropdown > `View Assessment` > `Add Assessment`

#### How to use

1. Select more assessments that is not yet selected
2. Save

> Rules:
> (Selected Single and Group[Test Battery] Assessment) - When a single assessment or group assessment is selected they lock the assessment so it will not be redundant. Take note of the `Locked` or `Scheduled`
> ex.: Test Battery [A1] is selected which has `CAP` and `CTP`,  then it will lock the `CAP` and `CTP`
> Selecting a Group assessment and single assessment that share a assessment will be blocked

> Expected Result:
> - Create a new candidates account, send email for them to use to login, and create all affiliated information for the candidate depending on their type

### View Candidate Log

Visit module for activity logging of the candidate activity

> Expected Result:
> - List of logs of the candidate: Errors, Activity, Screenshot connected to their activity during the snapshot initiated, device information, and other information possible useful for investigation

#### Access Path
- `Candidates` > `View Candidates` > `Cog/Settings` icon > `View Candidate Log`

### View Snapshots

Visit module for activity logging of the candidate snapshot during activity

> Expected Result:
> - List of snapshot logs of the candidate

#### Access Path
- `Candidates` > `View Candidates` > `Cog/Settings` icon > `View Snapshots`

## Bulk Action

### Send Report

Send to entered email the selected candidates report

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > `Send Report`

#### How to use

1. Navigate to the page
2. Enter email
3. Press `Send Report`

> Rule:
> - Valid Email address

> Expected Result:
> - Set account will receive reports from candidates selected

### Archive

Moves selected candidates rows to archived accounts.

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > `Archive`

> Expected Result:
Move all selected accounts to archive

### Export

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

> Expected Result:

<!-- TODO: Description, Access Path, How to use -->

### Delete Candidate Snapshots Permanently

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

<!-- TODO: Description, Access Path, How to use -->

### Delete Candidate

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

<!-- TODO: Description, Access Path, How to use -->

### Download Executive Summary Reports

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

<!-- TODO: Description, Access Path, How to use -->

### Send Reminders

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

<!-- TODO: Description, Access Path, How to use -->

### Download Executive Summary Reports

#### Access Path
- `Candidates` > `View Candidates` > `Bulk Action` dropdown > ``

#### How to use

<!-- TODO: Description, Access Path, How to use -->

## Other and Shared Functions

### View Assessments

Owns the candidate assessment list and assessment-level action entry points.

#### Access Path

- `Candidates` > `View Candidates` > `Actions` > `View Assessment`

#### How To Use

1. Open `Candidates`.
2. Open `View Candidates`.
3. Select a candidate.
4. Open `Actions`.
5. Select `View Assessment`.

> Rules:
> - Admin users select a Distributor Account before selecting a candidate.
> - Account users select a candidate directly.
> - Each single assessment is rendered as a standalone row.
> - Test batteries are represented by listing their associated single assessments, each labeled with a corresponding tag.
> - Status and their meanings:
>   - Scheduled: Means Scheduled only
>   - Started: Means Started to take but hasn't completed yet
>   - Report Pending: Means Completed but no report yet
>   - Scored: Means Completed and Report is Generated

#### Available Actions

- [Update Assessment](#update-assessment)
- [Download/View Reports of Assessments](#downloadview-reports-of-assessments)
- [Email Report of Assessments](#email-report-of-assessments)
- [Other Assessment Functions](#other-assessment-functions)

### Update Assessment

Owns adding additional assessments to a candidate from the candidate assessment list.

#### How To Use

1. Open [View Assessments](#view-assessments).
2. Select `Add Assessment`.
3. Select assessment checkboxes or radio buttons with their norms, types, and related options.
4. Save changes.

#### Required Inputs

- At least one selected assessment.

#### Optional Inputs

- Assessment norms.
- Assessment types.
- Related assessment options.

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - When a `single assessment` is selected, all `test batteries` containing that assessment are locked.
> - When a `test battery` is selected, all `single assessments` included in that battery are locked.
> - When a `test battery` is selected, all other `test batteries` that share at least one common `single assessment` are also locked.

> System:
> - Scheduling a new assessment checks what scheduling type was used for the candidate.
> - `Data Encoding` scheduling opens the option to encode answers.

### Download/View Reports of Assessments

Owns report viewing and downloading from a candidate assessment row.

#### How To Use

1. Open [View Assessments](#view-assessments).
2. Select an assessment from the table.
3. Select the `Eye/View` icon from the `Actions` column.
4. Select `Download` or `View` from the dropdown.
5. Select a report type when another dropdown layer appears.

> Rules:
> - If the `Eye/View` icon is grayed out, the assessment is not completed and the report is not available.
> - For a single report type, the report is shown or downloaded immediately.

### Email Report of Assessments

Owns sending a candidate assessment report by email.

#### How To Use

1. Open [View Assessments](#view-assessments).
2. Select an assessment from the table.
3. Select the `Mail` icon from the `Actions` column.
4. Enter the target recipient email in the modal form.
5. Select `Send`.

#### Required Inputs

- `Email`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.

### Other Assessment Functions

Other candidate assessment functions available from the assessment row actions.

#### Available Actions

- [View Response](#view-response)
- [Encode Answer](#encode-answer)
- [Change Norm](#change-norm)
- [Update Report Type](#update-report-type)
- [Update IRT Type](#update-irt-type)
- [Extract Response](#extract-response)
- [Reset Assessment](#reset-assessment)
- [Reset by Page](#reset-by-page)
- [Remove Assessment](#remove-assessment)

#### View Response

Views the candidate assessment responses.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `View Response`

##### How To Use
- View candidates answers in the specific assessment selected to view

#### Encode Answer

Inputs candidate answers through Excel for data encoding schedules.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `Encode Answer`

##### How To Use
1. Download Template or Prepare the answered template
2. Upload it
3. Save

> Rules:
> - Allowed users only: Super Admin IT and ASD.
> - Verification is still needed for allowed users.
> - Assessment is not video interview.
> - Schedule Type is `Data Encoding`.

#### Change Norm

Updates the norm used to create the assessment report.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `Change Norm` > `Update Norm Page` > `Save`

##### How To Use

1. Select on dropwon `New Norm/Benchmark` if there is available ones
2. Save changes.

##### Required Inputs

- `New Norm`

#### Extract Response

Downloads the candidate responses.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `Extract Response`

##### How To Use
1. After Navigating to it, the browsers download file for it

#### Reset Assessment

Resets the entire assessment for the candidate, including responses, scores, and related report artifacts.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `Reset Assessment`

##### How To Use
1. After Navigating to it, wait until reload for confirmation

#### Reset by Page

Resets answers or scores for one or more pages of the assessment.

##### Access Path
- `Candidates` > `View Candidate` > `Select A Candidate` > `Eye/View` icon > `Actions` > `View Assessment` > `Cog/Settings` icon > `Reset by Page`

##### How To Use
1. After Navigating to it
2. Select page for them to reset
3. Save
