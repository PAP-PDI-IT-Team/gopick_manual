# Accounts

Provides access control and account management for GoPick accounts: Distributor, Sub Distributor, Account, Sub-Account, and Self Registered Account.

## Create Account

Creates a new account through the account creation wizard.

### Access Path

- `Accounts` > `Create Account`

### How To Use

1. Open `Accounts`.
2. Select `Create Account`.
3. Complete [Account Information](#account-information).
4. Complete [Assign Products](#assign-products).
5. Complete [Meter Management](#meter-management).
6. Complete [Other Account Settings](#other-account-settings).
7. [Review](#review-account) account details.
8. Save the account.

> Expected Result:
> - The account is created using the configured information and can be viewed in `View Accounts`.

> Notes:
> - Dev: This module already has 5-layer architecture in some areas, but many areas still use legacy architecture.
> - Dev: New principles were applied and the process was logged.
> - QA: Test minimum and maximum guard rails.
> - QA: Test required-only creation and full-field creation.
> - QA: Some inputs are conditional. Check whether conditional fields are documented.

### Account Information

Collects account identity, parent relationship, contact information, address information, account expiration, and account status.

#### How To Use

1. Select `Account Type`.
2. Select `Parent Account`.
3. Enter `Account Name`.
4. Enter `Username`.
5. Enter `Password`.
6. Enter `Confirm Password`.
7. Enter `Primary Contact Name`.
8. Enter `Primary Contact Email`.
9. Select `Country`.
10. Enter `Business Phone Number`.
11. Enter `Business Address`.
12. Enter `Billing Address` or mark it the same as `Business Address`.
13. Set `Expiry Date and Time`.
14. Review `Actual Account Expiration`.
15. Set `Status`.

#### Required Inputs

- `Account Type`
- `Parent Account`
- `Account Name`
- `Username`
- `Password`
- `Confirm Password`
- `Primary Contact Name`
- `Primary Contact Email`
- `Country`
- `Business Phone Number`
- `Business Address`
- `Billing Address`
- `Expiry Date and Time`
- `Status`
- `Actual Account Expiration`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - `Account Name`, `Username`, `Password`, `Primary Contact Name`, and `Primary Contact Email` have a maximum of 100 characters.
> - Addresses have a maximum of 250 characters.
> - Phone number has a maximum of 25 characters.
> - `Account Type` can only be lower than the current user's account type.
> - `Password` and `Confirm Password` must match.
> - `Billing Address` can be copied from `Business Address` by toggling the checkbox, or entered manually when the checkbox is off.
> - Admin users bypass creation limit rules from `Other Account Settings`.
> - Non-admin users are limited by the account creation limits configured in `Other Account Settings`.
> - Active accounts are accounts that are not deactivated, archived, deleted, or expired.
> - Expiration is determined by `Expiry Date` plus `Actual Account Expiration`.
> - `Expiry Date and Time` cannot be set later than today.

### Assign Products

Assigns assessments that the company or organization account can use.

#### How To Use

1. Select at least one assessment.
2. Review selected assessments by category.

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

> Notes:
> - Assessment categories include `Cognitive/Knowledge-based Assessment`, `Competency-based Assessment`, `Survey`, `Behavioral/Personality-Based Assessment`, and `Test Battery`.
> - `Test Battery` is a group of assessments bundled together.

### Meter Management

Sets the account meter management type and meter balance.

#### How To Use

1. Select meter management type.
2. Set meter balance.

#### Required Fields

- `Meter Management Type`
- `Meter Balance`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - Meter management type can be `Self` or `Parent Based`.
> - `Self` deducts usage from the current account.
> - `Parent Based` deducts usage from the Distributor, Sub-Distributor, or Client parent account.
> - Sub-Account has two meter management type options. Other account types have one.
> - Self mode meter balance cannot be `0`.
> - Parent mode parent meter balance cannot be `0`.
> - Maximum meter value is `99,999`.

### Other Account Settings

Sets account limits, API access, account contacts, billing configuration, and contract configuration.

#### How To Use

1. Set `User Account Limit`.
2. Set `Sub-Distributor Limit`.
3. Set `Client Limit`.
4. Set `Sub-Account Limit`.
5. Set `Self Registration Limit`.
6. Set `API Access Username`.
7. Set HRSC and assessment specialist information.
8. Set client contact and client usage recipient information.
9. Set site billing type and billing amount when applicable.
10. Set contract type and contract values.

#### Defaulted Inputs

- `User Account Limit`
- `Sub-Distributor Limit`
- `Client Limit`
- `Sub-Account Limit`
- `Self Registration Limit`

#### Optional Inputs

- `API Access Username`
- `HRSC Name`
- `HRSC Email`
- `Assessment Specialist Name`
- `Assessment Specialist Email`
- `Client Contact Person Name`
- `Client Contact Person Email`
- `Client Usage Recipient Email`
- `Site Billing Amount (PHP)(Type)`
- `Contract Type`

#### Conditional Inputs

- `Sub-Distributor Limit`
- `Client Limit`
- `Sub-Account Limit`
- `Billing Amount`
- `Contracted Meters`
- `Addendum`
- `Base Meter`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - `User Account Limit` defaults to `99`.
> - `Sub-Distributor Limit`, `Client Limit`, `Sub-Account Limit`, and `Self Registration Limit` default to `0`.
> - `HRSC Name`, `HRSC Email`, `Assessment Specialist Name`, `Assessment Specialist Email`, `Client Contact Person Name`, and `Client Contact Person Email` have a maximum of 100 characters.
> - `Sub-Distributor Limit` appears only for Distributor accounts.
> - `Client Limit` appears only for Distributor and Sub-Distributor accounts.
> - `Sub-Account Limit` appears only for Distributor, Sub-Distributor, and Client accounts.
> - `Billing Amount` appears only when site billing type is `With Site Fee`.
> - `Contracted Meters` is prefilled from [Meter Management](#meter-management).
> - `Addendum` is locked when the selected meter type is parent based.
> - Maximum account limit value is `999`.
> - Maximum `Addendum`, `Base Meter`, and `Billing Amount` value is `999`.

> Notes:
> - Site billing type options are `Included in Package` and `With Site Fee`.
> - Contract type options are `Volume-based` and `Per Usage`.
> - `Volume-based` uses `Contracted Meters` and `Addendum`.
> - `Per Usage` uses `Base Meter`.

### Review Account

Reviews the entered and selected account creation details before saving the account.

#### Visible Content

- Account information.
- Assigned products.
- Meter management.
- Other account settings.

#### How To Use

1. Open the `Review Account` step.
2. Review the displayed account information.
3. Review assigned products.
4. Review meter management.
5. Review other account settings.
6. Go back to the relevant step when a value needs correction.
7. Save the account when the reviewed details are correct.

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - Saving must use the reviewed configuration from the current create account wizard.

> Expected Result:
> - The reviewed account details are used when the account is about to be saved.

## View Accounts

Displays the active account listing with search, advanced search, archived account navigation, bulk actions, and row actions.

> Legends:
> - `Active`: Active and not yet expired.
> - `Deactivated`: Deactivated.
> - `Expiring`: Active and exceeded expiration date but not account expiration extension.
> - `Expired`: Active, exceeded expiration date, and exceeded account expiration extension.

### Access Path

- `Accounts` > `View Accounts`

### Available Row Actions

- [Row Actions](#row-actions)
  - [View](#view-active-account)
  - [Update Wizard](#update-account)
  - [Archive Specific](#archive-account)

### Page Buttons

- [Search](#search)
- [Advanced Search](#advanced-search)
- [View Archive](#view-archived-accounts)
- [Bulk Actions](#bulk-actions)
  - [Archive](#bulk-archive)
  - [Delete](#bulk-delete)

## Other Pages
### View Archived Accounts

Displays archived accounts with search, advanced search, bulk actions, and row actions.

> Legends:
> - `Archived`: Archived account.

#### Purpose / Scope

Owns the archived account table and actions available only to archived accounts.

#### Access Path

- `Accounts` > `View Accounts` > `View Archived Accounts`

#### Available Row Actions

- [Row Actions](#row-actions)
  - [View](#view-active-account)
  - [Restore](#restore-account)

#### Page Buttons

- [View Accounts](#view-accounts)
- [Search](#search)
- [Advanced Search](#advanced-search)
- [Bulk Actions](#bulk-actions)
  - [Restore](#bulk-restore)
  - [Delete](#bulk-delete)

### View Account

Displays account information configured during creation and account configuration actions.

#### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View`

#### Return Button 

Returns the user to the source account listing.

##### How To Use

1. Select the return button.

> Expected Result:
> - From an active view account page, the user returns to `View Accounts`.
> - From an archived view account page, the user returns to `View Archived Accounts`.

#### Account Configuration Dropdown

Provides account configuration pages available from the view account page.

##### Available Pages

- [Privacy Consent](#privacy-consent)
- [Demographics](#demographics)
- [Assessment Completion Page](#assessment-completion-page)
- [Assessment Center Logo](#assessment-center-logo)
- [Unblock Account](#unblock-account)

#### Account Information Section

Shows identity, parent, contact, address, expiration, and status details for the selected account.

##### Visible Content

- `Active Badge`
- `Account Type`
- `Parent Account`
- `Account Name`
- `Username`
- `Password`
- `Confirm Password`
- `Primary Contact Name`
- `Primary Contact Email`
- `Country`
- `Business Phone Number`
- `Business Address`
- `Billing Address`
- `Expiry Date and Time`
- `Actual Account Expiration`
- [Update Specific](#update-specific)

> Notes:
> - `Parent Account` varies for admin and non-admin accounts.
> - `Expiry Date and Time` displays translated information below the value.
> - `Actual Account Expiration` displays translated information below the value.

#### Assigned Assessments Section

Shows all assessments assigned to the account by category.

##### Visible Content

- Assessment categories.
- [Update Specific](#update-specific).
- [Manage Assigned Assessment](#manage-assigned-assessment).
- `Change Log`.
- `Update Assessment`.

#### Meter Management Section

Shows account meter mode, allocated meter balance, and parent meter balance when applicable.

##### Visible Content

- `Metering Management Type`
- `Allocated Meter`
- `Parent Meter`
- [Update Specific](#update-specific)
- [View Meter Logs](meters-management.md#meter-records)

> Expected Result:
> - `Parent Meter` appears when `Metering Management Type` is not `Deduct usage from this account`.

#### Other Account Settings Section

Shows account limits, API access, contact information, billing configuration, and contract configuration for the selected account.

##### Visible Content

- Account limits: `Limit`, `Active`, `Expiring`, and `Expired`.
- `API Access Username`
- `HRSC Name`
- `HRSC Email`
- `Assessment Specialist Name`
- `Assessment Specialist Email`
- `Client Contact Person Name`
- `Client Contact Person Email`
- `Site Billing Amount (PHP)(Type)`
- `Site Billing Amount (PHP)`
- `Contract Type`
- `Contract Meters`
- `Addendum`
- `Base Meter`
- [Update Specific](#update-specific)

> Rules:
> - Distributor accounts show limits for Sub-Distributor, User Account, Sub-Account, and Self Registration.
> - Sub-Distributor accounts show limits for User Account, Sub-Account, and Self Registration.
> - User Account accounts show limits for User Account, Sub-Account, and Self Registration.
> - Sub-Account accounts show limits for User Account and Self Registration.

> Expected Result:
> - `Site Billing Amount (PHP)` appears when `Site Billing Amount (PHP)(Type)` is `Included in Package`.
> - `Addendum` and `Contract Meters` appear when `Contract Type` is `Volume-based`.
> - `Base Meter` appears when `Contract Type` is `Per Usage`.

#### List Of Users Section

Shows account users under the selected account.

##### Available Actions

- [Row Actions](#row-actions)

### Account Configuration Pages

#### Privacy Consent

Manages privacy consent content and candidate-side consent checkbox visibility.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Account Configuration Dropdown` > `Privacy Consent`

##### How To Use

1. Open `Privacy Consent`.
2. Update consent content.
3. Set `Consent Gather Data Checkbox to Appear`.
4. Set `Consent Capture Photo to Appear`.
5. Save changes.

> Expected Result:
> - Privacy consent content and configured checkboxes are updated on the candidate side.

#### Demographics

Manages which demographic fields appear in the candidate-side demographics form.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Account Configuration Dropdown` > `Demographics`

##### How To Use

1. Open `Demographics`.
2. Toggle demographic fields that should appear.
3. Save changes.

> Rules:
> - `First Name`, `Last Name`, `Gender`, `Email`, and `Position Applied` are required by default and cannot be toggled off.
> - Optional toggle fields include `Birthdate`, `Civil Status`, `Alternative/Work Email`, `Phone Number`, `Educational Attainment`, `Work Experience`, `Level of Position Applying For`, `Course`, `Priority Course`, `Region of Residence`, `Agency Visited`, `Service Availed`, `Customer Type`, `Age`, `Transaction Type`, and `School`.
> - This page can be hidden for a specific account group by Super Admin configuration.

> Expected Result:
> - Demographic data gathering is updated.
> - If the page is not visible, the account is not allowed to use this function.

> Notes:
> - QA and System User: Always check RBAC for the specific account type.

#### Assessment Completion Page

Manages assessment completion page content.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Account Configuration Dropdown` > `Assessment Completion Page`

##### How To Use

1. Open `Assessment Completion Page`.
2. Update the prefilled content.
3. Save changes.

> Rules:
> - This page can be hidden for a specific account group by Super Admin configuration.

> Expected Result:
> - Assessment completion page content is updated.
> - If the page is not visible, the account is not allowed to use this function.

> Notes:
> - QA and System User: Always check RBAC for the specific account type.

#### Assessment Center Logo

Manages the assessment center logo for the account.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Account Configuration Dropdown` > `Assessment Center Logo Page`

##### How To Use

1. Open `Assessment Center Logo`.
2. Upload an image.
3. Save changes.

> Rules:
> - This page can be hidden for a specific account group by Super Admin configuration.

> Expected Result:
> - The uploaded image replaces the existing logo.
> - If the page is not visible, the account is not allowed to use this function.

> Notes:
> - QA and System User: Always check RBAC for the specific account type.

#### Unblock Account

Unblocks an account that is blocked due to multiple login attempts.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Account Configuration Dropdown` > `Unblock Account Trigger`

##### How To Use

1. Open the view account page.
2. Trigger `Unblock Account`.

> Rules:
> - This only appears when the account is blocked.

### Update Account

Owns full account update through the wizard. This is different from [Update Specific](#update-specific), which updates a single view account section.

#### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `Update`

#### How To Use

1. Open `View Accounts`.
2. Select `Update` on a specific account.
3. Complete [Update Account Information](#update-account-information).
4. Complete [Update Assigned Products](#update-assigned-products).
5. Complete [Update Meter Management](#update-meter-management).
6. Complete [Update Other Account Settings](#update-other-account-settings).
7. Review account details.
8. Save changes.

> Rules:
> - `Update` only appears when the account is not archived and is not the current user's own account.

#### Update Account Information

Updates editable account identity, contact, address, expiration, and status fields.

##### Visible Content

- `Account Type`
- `Parent Account`
- `Account Name`
- `Username`
- `Password`
- `Confirm Password`
- `Primary Contact Name`
- `Primary Contact Email`
- `Country`
- `Business Phone Number`
- `Business Address`
- `Billing Address`
- `Expiry Date and Time`
- `Actual Account Expiration`
- `Status`

##### Locked Inputs

- `Account Type`
- `Parent Account`
- `Account Name`

##### Editable Inputs

- `Username`
- `Password`
- `Confirm Password`
- `Primary Contact Name`
- `Primary Contact Email`
- `Country`
- `Business Phone Number`
- `Business Address`
- `Billing Address`
- `Expiry Date and Time`
- `Actual Account Expiration`

##### Conditional Inputs

- `Status`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - `Account Type`, `Parent Account`, and `Account Name` cannot be changed.
> - `Username`, `Password`, `Primary Contact Name`, and `Primary Contact Email` have a maximum of 100 characters.
> - `Addresses` have a maximum of 250 characters.
> - `Phone number` has a maximum of 25 characters.
> - `Password` and `Confirm Password` must match.
> - `Billing Address` can be copied from `Business Address` by toggling the checkbox, or entered manually when the checkbox is off.
> - `Expiry Date and Time` cannot be set later than today.
> - `Status` does not show when editing the current user's own account.

#### Update Assigned Products

Updates assigned assessments and assessment meter consumption.

##### Visible Content

- Selected assessments.
- Assessment meter consumption.
- [Manage Assigned Assessment](#manage-assigned-assessment).
- `Change Log`.
- `Update Assessment`.

##### Editable Inputs

- Selected assessments.
- Assessment meter consumption.

##### Optional Actions

- [Manage Assigned Assessment](#manage-assigned-assessment).
- `Change Log`.
- `Update Assessment`.

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.

#### Update Meter Management

Updates account meter management behavior.

##### Visible Content

- `Meter Management Type`
- `Current Meters`
- `Parent Meter Balance`
- [View Meter Logs](meters-management.md#meter-records)

##### Editable Inputs

- `Meter Management Type`
- `Current Meters`
- `Parent Meter Balance`

##### Optional Actions

- [View Meter Logs](meters-management.md#meter-records)

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - Sub-Account has `Deduct usage from this account` and `Deduct usage from Client Account`.
> - `Current Meters` and `Parent Meter Balance` cannot be modified when meter management type is `Deduct usage from Account`.

> Notes:
> - QA, Dev, and System User: Deduction to self means `Deduct usage from this account`.
> - QA, Dev, and System User: Deduction from parent means `Deduct usage from Distributor/Sub-Distributor/Client Account`.

#### Update Other Account Settings

Updates account limits, API access, contact information, billing configuration, and contract configuration.

##### Visible Content

- `User Account Limit`
- `API Access Username`
- `HRSC Name`
- `HRSC Email`
- `Assessment Specialist Name`
- `Assessment Specialist Email`
- `Client Contact Person Name`
- `Client Contact Person Email`
- `Site Billing Amount (PHP)(Type)`
- `Site Billing Amount (PHP)`
- `Contract Type`
- `Contract Meters`
- `Addendum`
- `Base Meter`

##### Editable Inputs

- `User Account Limit`
- `API Access Username`
- `HRSC Name`
- `HRSC Email`
- `Assessment Specialist Name`
- `Assessment Specialist Email`
- `Client Contact Person Name`
- `Client Contact Person Email`
- `Site Billing Amount (PHP)(Type)`
- `Contract Type`

##### Conditional Inputs

- `Site Billing Amount (PHP)`
- `Contract Meters`
- `Addendum`
- `Base Meter`

> Rules:
> - Inputs are optional when they are not indicated as required.
> - Inputs indicated as required must be completed.
> - Conditional inputs appear only when their condition is met.
> - Distributor accounts have Sub-Distributor, User Account, Sub-Account, and Self Registration limits.
> - Sub-Distributor accounts have User Account, Sub-Account, and Self Registration limits.
> - User Account accounts have User Account, Sub-Account, and Self Registration limits.
> - Sub-Account accounts have User Account and Self Registration limits.
> - `HRSC Name`, `HRSC Email`, `Assessment Specialist Name`, `Assessment Specialist Email`, `Client Contact Person Name`, and `Client Contact Person Email` have a maximum of 100 characters.
> - `Site Billing Amount (PHP)` appears when `Site Billing Amount (PHP)(Type)` is `Included in Package`.
> - `Addendum` and `Contract Meters` appear when `Contract Type` is `Volume-based`.
> - `Base Meter` appears when `Contract Type` is `Per Usage`.
> - `Contracted Meters` is prefilled from meter management.
> - `Addendum` is locked when the selected meter type is parent based.
> - Maximum account limit value is `999`.
> - Maximum `Addendum`, `Base Meter`, and `Billing Amount` value is `999`.

### Update Specific

Owns section-specific update behavior. The available update form depends on the view account section where the update is triggered.

#### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Section` > `Update`

#### How To Use

1. Open the view account page.
2. Open `Account Information`, `Assigned Assessments`, `Meter Management`, or `Other Account Settings`.
3. Select `Update`.
4. Update the section-specific fields.
5. Review changes.
6. Save changes.

> Rules:
> - Updating the current user's own account only opens the `Account Information` variant.
> - Password fields are not prefilled.

> Expected Result:
> - Only the selected account section is updated.

> Notes:
> - QA and System User: Changes happen only in the section being updated.
> - Dev: Passwords must not be displayed as old password values.

### Manage Assigned Assessment

Owns assigned assessment configuration from the view account assigned assessments section.

#### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View` > `Assigned Assessments` > `Manage`

#### How To Use

1. Open the view account page.
2. Open `Assigned Assessments`.
3. Select `Manage`.
4. Update `Set Max Respondents`.
5. Update `Valid Date Start`.
6. Update `Valid Date Expiration`.
7. Update `Status`.
8. Save changes.

### Row Actions

Owns row action entries shown in account listing tables.

#### View Active Account

Opens view account for an active, non-archived account.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `View`

##### How To Use

1. Open `View Accounts`.
2. Select `View` on a non-archived account row.

> Expected Result:
> - The active view account page opens.

#### View Archived Account

Opens view account for an archived account.

##### Access Path

- `Accounts` > `View Accounts` > `View Archived Accounts` > `Row Actions` > `View`

##### How To Use

1. Open `View Archived Accounts`.
2. Select `View` on an archived account row.

> Expected Result:
> - The archived view account page opens.

#### Update Account Row Action

Links to [Update Account](#update-account) from an account table row.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `Update`

##### How To Use

1. Open `View Accounts`.
2. Select `Update` on a specific account row.

> Rules:
> - This only appears when the account is not archived and is not the current user's own account.

> Expected Result:
> - The update account wizard opens.

#### Archive Account

Moves a non-archived account to archived accounts.

##### Access Path

- `Accounts` > `View Accounts` > `Row Actions` > `Archive`

##### How To Use

1. Open `View Accounts`.
2. Select `Archive` on a specific account row.

> Rules:
> - This only appears when the account is not archived.

> Expected Result:
> - The account is moved to archived accounts.

#### Restore Account

Moves an archived account back to the account list.

##### Access Path

- `Accounts` > `View Accounts` > `View Archived Accounts` > `Row Actions` > `Restore`

##### How To Use

1. Open `View Archived Accounts`.
2. Select `Restore` on a specific account row.

> Rules:
> - This only appears when the account is archived.

> Expected Result:
> - The account is restored to the active account list.

### Bulk Actions

Owns account listing actions applied to selected account rows.

#### Bulk Archive

Moves selected account rows to archived accounts.

##### Access Path

- `Accounts` > `View Accounts` > `Bulk` dropdown > `Archive`

> Rules:
> - The current logged-in account cannot select its own account.

> Expected Result:
> - Selected accounts are moved to archived accounts.

#### Bulk Delete

Deletes selected account rows.

##### Access Path

- `Accounts` > `View Accounts` > `Bulk` dropdown > `Delete`

> Rules:
> - The current logged-in account cannot select its own account.

> Expected Result:
> - Selected accounts are deleted.

#### Bulk Restore

Restores selected archived account rows.

##### Access Path

- `Accounts` > `View Accounts` > `View Archived Accounts` > `Bulk` dropdown > `Restore`

> Rules:
> - The current logged-in account cannot select its own account.

> Expected Result:
> - Selected accounts are restored to the active account list.

### Shared Table Actions

These actions are documented once and linked from account listing areas to avoid repeating the same behavior.

#### Search

Searches account table content.

##### Access Path

- `Accounts` > `View Accounts` > `Search Input`
- `Accounts` > `View Accounts` > `View Archived Accounts` > `Search Input`

##### How To Use

1. Open an account listing table.
2. Enter search text.
3. Press `Enter`.

> Expected Result:
> - Matching accounts are shown in the table.

#### Advanced Search

Searches account table content using configured rules.

##### Access Path

- `Accounts` > `View Accounts` > `Advanced Search` > `Add Rule`
- `Accounts` > `View Accounts` > `View Archived Accounts` > `Advanced Search` > `Add Rule`

##### How To Use

1. Open an account listing table.
2. Open `Advanced Search`.
3. Add or remove rules.
4. Select `Search`.

> Expected Result:
> - Accounts matching the configured rules are shown in the table.
