# Accounts

Provides Access Control and Management of Accounts of GoPick: Dsitributor, Sub Distributor, Account, Sub-Account, Self Registered Account.

## Create Account
A Submodule directly creates new account using account create wizard.

### Action / Workflow
1. Account Information
- Fill in the required account details.
  - Account Type
  - Parent Account
  - Account Name: Company or organization account name
  - Username
  - Password
  - Confirm Password
  - Primary Contact Name
  - Primary Contact Email
  - Country
  - Business Phone Number
  - Business Address
  - Billing Address: required or set as same as Business Address
  - Expiry Date and Time
  - Actual Account Expiration: +2 Months(default)
  - Status: Active(default)

> Rules
> Validation Guard Rails:
> - Account Name, Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters
> - Addresses: max of 250 characters
> - Phone Number: max of 25 characters
> - Account Type: You can only select lower than your account type
> - `Password` and `Confirm Password` should match
> - `Billing Address` can be similar to `Business Address` using `checkbox toggled` or enter `manually via input` that shows up when checkbox is off

> Account Creation Limit Guard Rails:
> - Admin: Bypasses rules of creation: Limits (Found in `Other Account Settings Page`) of the account they are creating
> - Non-Admin: Are limited to the accounts they are able to create (Found in `Other Account Settings Page`)
> - Active Accounts: not deactivated, not archived, not deleted, not expired
> - Expired: Determined by `Expiry date` + `Actual Account Expiration`
> - `Expiry Date & Time` can't be set later than today

---

2. Assign Products
Select Assessments that Company/Organization can use.

Assessment have the following category:
- Cognitive/Knowledge-based Assessment
- Competency-based Assessment
- Survey
- Behavioral/Personality-Based Assessment
- Test Battery, A group of Assessments bundled together

> Rules:
> - At least 1 assessment

---

3. Meter Management
Set Meter Management Type and Meter Balance

Meter Management Type: Self and Parent Based
Self = Deduct usage from this account
Parent = Deduct usage from Distributor/Sub-Distributor/Client

> Meter Management Guard Rails:
> - Sub-Account has 2 Meter Management Type while the rest are 1 Meter Management Type.
> - Self Mode: Meter balance cannot be 0.
> - Parent Mode: Parent meter balance cannot be 0.
> - Max Meter: 99,999

---

4. Other Account Settings
Set additional account-related configurations:

- Set User Account limit (autofill, 99)
- Set Sub-Distributor Limit (autofill, 0)
- Set Client Limit (autofill, 0)
- Set Sub-Account Limit (autofill, 0)
- Set Self Registration Limit (autofill, 0)
- Set API Access Username
- Set HRSC Name
- Set HRSC Email
- Set Assessment Specialist Name
- Set Assessment Special Email
- Set Client Contact Person Name
- Set Client Usage Recipient Email
- Set Site Billing Type (Included in Package or With Site Fee)
  - Set Billing Amount (PHP)
- Contact Type:
  - Volume-based
    - Contracted Meters (Disabled)
    - Addendum (autofill, 0)
  - Per Usage
    - Base Meter (autofill, 0)

> Display & Visibility Guard Rails:
> - HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters
> - Sub-Distributor Limit: Appears only for Distributor accounts.
> - Client Limit: Appears only for Distributor and Sub-Distributor accounts.
> - Sub-Account Limit: Appears only for Distributor, Sub-Distributor, and Client accounts.
> - Billing Amount: Appears only when Set Site Billing Type is With Site Fee
>
> Data Sync Guard Rails:
> - Contracted Meters: Values are prefilled from the Meter Management section.
> - Addendum: Value is locked when the selected Meter Type is Parent.
> - Max Limit of Account Limits: 999
> - Max Value of Addendum, Base Meter and Billing Amount: 999

---

5. Review Account Details
Able to review Account Information before saving

### Access Path
Accounts > Create Account

### How to Use
1. Navigate into it
2. Fill in Requirements and optionals depends on informations at hand
3. Complete wizard and save

> Expected Result:
> - Account will be created based on all configuration added and can be view in `View Accounts`

> Notes: Dev
> - This module uses 5 layer architecture already but still many uses the legacy architecture
> - Applied new principles and logged process

> Notes: QA
> - Test the Max and Min if values for guard rails
> - Happy test: Only Required and Filling All
> - Some Inputs are conditional, so check if documented or not

## View Accounts
Table list of Accounts, with search, redirection to archived accounts and bulk actions

> Legends: (prioritization is from top to bottom)
> Active - Active and not yet expired
> Deactivated - Deactivated
> Expiring - Active and exceeded expiration date but not account expiration extension
> Expired - Active, exceeded expiration date and exceeded account expiration extension

### Action / Workflow
[Search](#search)
[Advance Search](#advance-search)
[Bulk Action](#bulk-action)
- [Archive](#bulk-action-archive)
- [Delete](#bulk-action-delete)
[Row Actions](#row-actions)
- [View: Not Archive](#view-not-archive)
- [Update](#update)
- [Archive](#archive)

#### View Archived Accounts
Table list of Archived Accounts, with search, redirection to non-accounts and bulk actions

> Legends: (prioritization is from top to bottom)
> Archived - Archived account

##### Action / Workflow
[Search](#search)
[Advance Search](#advance-search)
[Bulk Action](#bulk-action)
- [Archive](#bulk-action-archive)
- [Retrive](#bulk-action-delete)
[Row Actions](#row-actions)
- [View: Archive](#view-archive)
- [Restore](#restore)

## Other Functions
### Update Specific
Updating Specific settings of the account. Has variations depends what section it was triggered.

> Rules:
> Updating own account only opens `Account Information Variant`

- **Account Information**
  - Account Type: Can't be changed
  - Parent Account: Can't be changed
  - Account Name: Can't be changed
  - Username
  - Password
  - Confirm Password
  - Primary Contact Name
  - Primary Contact Email
  - Country
  - Business Phone Number
  - Business Address
  - Billing Address: required or set as same as Business Address
  - Expiry Date and Time
  - Actual Account Expiration: +2 Months(default)
  - Status: Active(default)
  > Expected Results:
  > - Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters
  > - Addresses: max of 250 characters
  > - Phone Number: max of 25 characters
  > - `Password` and `Confirm Password` should match
  > - `Billing Address` can be similar to `Business Address` using `checkbox toggled` or enter `manually via input` that shows up when checkbox is off
  > - `Expiry Date & Time` can't be set later than today
  > - `Status` will not show if editing own account
- **Assigned Assessments**
  - Selected Assessments can adjust each meter consumption
  - [Manage](#manage)
  - Change Log
  - Update Assessment
- **Meter Management**
  - Meter Management Type: ()
    - Deduct usage from this account
    - Deduct usage from Account
  - Current Meters / Parent Meter Balance (Can't Modified) (if `Meter Management Type`: `Deduct usage from Account`)
  - [View Meter Logs](../../workflow/meters-management/index.html#meter-records)
  > Expected Results:
  > - If Sub-account it will have 2 options
  >   - Deduct usage from this account and Deduct usage from Client Account
  > Notes: QA, Dev, System User
  > - Deduction to self : Deduct usage from this account
  > - Deduct from parent : Deduct usage from Distributor\Sub-Distributor\Client Account
- **Other Account Settings**
  - User Account Limit
    - Distributor: Sub-Distributor, User(Account), Sub-Account, Self Registration
    - Sub-Distributor: User(Account), Sub-Account, Self Registration
    - User(Account): User(Account), Sub-Account, Self Registration
    - Sub-Account: User(Account), Self Registration
  - API Access Username
  - HRSC Name
  - HRSC Email
  - Assessment Specialist Name
  - Assessment Specialist Email
  - Client Contact Person Name
  - Client Contact Person Email
  - Site Billing Amount (PHP)(Type)
  - Site Billing Amount (PHP)
  - Contract Type
  - Contract Meters
  - Addendum
  - Base Meter
  > Expected Result:
  > - HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters
  > - If `Site Billing Amount (PHP)(Type)` is `Included in package` then the `Site Billing Amount (PHP)` appears
  > - If `Contract Type` is `Volume-based` then the `Addendum` and `Contract Meters` appears
  > - If `Contract Type` is `Per Usage` then the `Base Meter` appears
  > - Contracted Meters: Values are prefilled from the Meter Management section.
  > - Addendum: Value is locked when the selected Meter Type is Parent.
  > - Max Limit of Account Limits: 999
  > - Max Value of Addendum, Base Meter and Billing Amount: 999

#### Action / Workflow
- Visit Specific Sections in View and can access 1 of the 4 variants of Update specific
- Update contents varies depends on where you visited
- Save Button

#### Access Path
Account > View Accounts > Row Actions: View > Section: Account Information, Assigned Assessments, Meter Management or Other Account Settings > Update Button

#### How to Use
1. Navigate into it
2. Each Section has its own. Each is prefilled already of the default informations
- Except: Password.
3. Review Button
4. Save button

> Rules:
> - Password are not preinputed: If an organization configures its system to show the old password on screen, it is breaching the following international legal and compliance standards: GDPR - Article 32 (Security of Processing), EU "Secure by Design" Mandates (NIS2 & Cyber Resilience Act) and Industry Compliance Frameworks (Legally Binding by Contract)

> Expected Result:
> - Update Specific Informations with smallest step

> Notes: QA and System User
> - Changes happen only where the section are updating

### Privacy Consent
Page to manage update of the consent configurations are

#### Action / Workflow
- Can Change Contents
- Checkbox for `Consent Gather Data Checkbox to Appear`
- Checkbox for `Consent Capture Phote to Appear`
- Save Button

#### Access Path
Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Privacy Consent

#### How to Use
1. Navigate into it
2. Update Content View Display and Checkbox display state
- Content
- `Consent Gather Data Checkbox to Appear`
- `Consent Capture Phote to Appear`
3. Save Button

> Rules:
> - Confirmed validation or restriction.

> Expected Result:
> - Confirmed visible outcome.
> - Update the Privacy Consent Page on Candidate side.

> Notes: (optional)
> - For who

### Demographics
Page to manage demographics form.

#### Action / Workflow
- Default Required: First Name, Last Name, Gender, Email, Position Applied
- Can be toggled: Birthdate, Civil Status, Alternative/Work Email, Phone Number, Educational Attainment, Work Experience, Level of Position Applying For, Course, Priority Course, Region of Residence, Agency Visited, Service Availed, Customer Type, Age, Transaction Type, School
- Save Button

#### Access Path
Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Demographics

#### How to Use
1. Navigate into it
2. Update Content View Display via Checkbox what to display
- some are stated required and can't be toggle off: First Name, Last Name, Gender, Email, Position Applied
- some can be toggled: Birthdate, Civil Status, Alternative/Work Email, Phone Number, Educational Attainment, Work Experience, Level of Position Applying For, Course, Priority Course, Region of Residence, Agency Visited, Service Availed, Customer Type, Age, Transaction Type, School
3. Save Button

> Rules:
> - This Can be set to not show for the specific account group. Configured by Super Admins

> Expected Result:
> - Update Demographics which data to gather
> - Can be visible or not, if not visible means account is not allowed to use this function

> Notes: QA and System User
> - Always Check RBAC for the specific Account type

### Assessment Completion Page
Page to manage completion page

#### Action / Workflow
- Edit Content
- Save Button

#### Access Path
Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Assessment Completion Page

#### How to Use
1. Navigate into it
2. Pre-filled inputs can be altered
- Content
3. Save button

> Rules:
> - This Can be set to not show for the specific account group. Configured by Super Admins

> Expected Result:
> - Can be visible or not, if not visible means account is not allowed to use this function

> Notes: QA and System User
> - Always Check RBAC for the specific account type

### Assessment Center Logo
Page for updating Assessment Center Logo

#### Action / Workflow
- Upload Logo
- Save Button

#### Access Path
Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Assessment Center Logo Page

#### How to Use
1. Navigate into it
2. Can be pre-filled or none, uploading image will replace it
- Upload image
3. Save button

> Rules:
> - This Can be set to not show for the specific account group. Configured by Super Admins

> Expected Result:
> - Can be visible or not, if not visible means account is not allowed to use this function

> Notes: QA and System User
> - Always Check RBAC for the specific account type

### Unblock Account
Triggered when account is blocked due to multiple attempts to login

#### Access Path
Account > View Accounts > Row Actions: View > Account Configuration Dropdown > Unblock Account Trigger

#### How to Use
1. Navigate into it
2. Trigger it

> Notes: QA and System User
> - This only appears if account is blocked

### Manage
Update Specific Assessments Config

#### Access Path
Account > View Accounts > Row Actions: View > Section: Assigned Assessments > Manage

#### How to Use
1. Navigate into it
2. Pre-filled inputs can be altered
- Set Max Respondents
- Valid Date Start
- Valid Date Expiration
- Status
3. Save button

### Row Actions
#### View: Not Archive
View informations of the account configured during creation

##### Return Button
Returns User to the list

##### Account Configuration Dropdown
- [Privacy Consent](#privacy-consent)
- [Demographics](#demographics)
- [Assessment Completion Page](#assessment-completion-page)
- [Assessment Center Logo](#assessment-center-logo)
- [Unblock Account](#unblock-account)

##### Sections:
- **Account Information**; shows the following:
    - Active Badge
    - Acount Type
    - Parent Account: This Varies if Admin or Non-Admin Account
    - Account Name: Company or organization account name
    - Username
    - Password
    - Confirm Password
    - Primary Contact Name
    - Primary Contact Email
    - Country
    - Business Phone Number
    - Business Address
    - Billing Address
    - Expiry Date and Time: Below is translated information
    - Actual Account Expiration: Below is translated information
    - [Update Specific](#update-specific)
- **Assigned Assessments**; shows list of all assessments for the account by categories, each assessment has:
    - [Update Specific](#update-specific)
    - [Manage](#manage)
    - Change Log
- **Meter Management**; Shows the following:
    - Metering Management Type
    - Allocated Meter
    - Parent Meter
    - [Update Specific](#update-specific)
    - [View Meter Logs](../../workflow/meters-management/index.html#meter-records)
    > Expected Result:
    > - If `Metering Management Type` is not a `Deduct usage from this account` then the `Parent Meter` appears
- **Other Account Settings**
    - Accounts Limits; This varies depends on the account type: [Limit, Active, Expiring, Expired]
        - Distributor: Sub-Distributor, User(Account), Sub-Account, Self Registration
        - Sub-Distributor: User(Account), Sub-Account, Self Registration
        - User(Account): User(Account), Sub-Account, Self Registration
        - Sub-Account: User(Account), Self Registration
    - API Access Username
    - HRSC Name
    - HRSC Email
    - Assessment Specialist Name
    - Assessment Specialist Email
    - Client Contact Person Name
    - Client Contact Person Email
    - Site Billing Amount (PHP)(Type)
    - Site Billing Amount (PHP)
    - Contract Type
    - Contract Meters
    - Addendum
    - Base Meter
    - [Update Specific](#update-specific)
    > Expected Result:
    > - If `Site Billing Amount (PHP)(Type)` is `Included in package` then the `Site Billing Amount (PHP)` appears
    > - If `Contract Type` is `Volume-based` then the `Addendum` and `Contract Meters` appears
    > - If `Contract Type` is `Per Usage` then the `Base Meter` appears
- **List of Users**; Table list of Accounts Users under the account selected
    - [Row Actions](#row-actions)

#### View: Archive
View informations of the account configured during creation

##### Return Button
Returns Archived Accounts to the list

##### Sections:
- **Account Information**; shows the following:
    - Active Badge
    - Acount Type
    - Parent Account: This Varies if Admin or Non-Admin Account
    - Account Name: Company or organization account name
    - Username
    - Password
    - Confirm Password
    - Primary Contact Name
    - Primary Contact Email
    - Country
    - Business Phone Number
    - Business Address
    - Billing Address
    - Expiry Date and Time: Below is translated information
    - Actual Account Expiration: Below is translated information
- **Assigned Assessments**; shows list of all assessments for the account by categories
- **Meter Management**; Shows the following:
    - Metering Management Type
    - Allocated Meter
    - Parent Meter
    > Expected Result:
    > - If `Metering Management Type` is not a `Deduct usage from this account` then the `Parent Meter` appears
- **Other Account Settings**
    - Accounts Limits; This varies depends on the account type: [Limit, Active, Expiring, Expired]
        - Distributor: Sub-Distributor, User(Account), Sub-Account, Self Registration
        - Sub-Distributor: User(Account), Sub-Account, Self Registration
        - User(Account): User(Account), Sub-Account, Self Registration
        - Sub-Account: User(Account), Self Registration
    - API Access Username
    - HRSC Name
    - HRSC Email
    - Assessment Specialist Name
    - Assessment Specialist Email
    - Client Contact Person Name
    - Client Contact Person Email
    - Site Billing Amount (PHP)(Type)
    - Site Billing Amount (PHP)
    - Contract Type
    - Contract Meters
    - Addendum
    - Base Meter
    > Expected Result:
    > - If `Site Billing Amount (PHP)(Type)` is `Included in package` then the `Site Billing Amount (PHP)` appears
    > - If `Contract Type` is `Volume-based` then the `Addendum` and `Contract Meters` appears
    > - If `Contract Type` is `Per Usage` then the `Base Meter` appears
- **List of Users**; Table list of Accounts Users under the account selected
    - [Row Actions](#row-actions)

#### Update
Update account settings via wizard.

### Action / Workflow
1. Account Information
  - Account Type: Can't be changed
  - Parent Account: Can't be changed
  - Account Name: Can't be changed
  - Username
  - Password
  - Confirm Password
  - Primary Contact Name
  - Primary Contact Email
  - Country
  - Business Phone Number
  - Business Address
  - Billing Address: required or set as same as Business Address
  - Expiry Date and Time
  - Actual Account Expiration: +2 Months(default)
  - Status: Active(default)
  > Expected Results:
  > - Username, Password, Primary Contact Name, Primary Contact Email: Max of 100 characters
  > - Addresses: max of 250 characters
  > - Phone Number: max of 25 characters
  > - `Password` and `Confirm Password` should match
  > - `Billing Address` can be similar to `Business Address` using `checkbox toggled` or enter `manually via input` that shows up when checkbox is off
  > - `Expiry Date & Time` can't be set later than today
  > - `Status` will not show if editing own account

---

2. Assign Products
  - Selected Assessments can adjust each meter consumption
  - [Manage](#manage)
  - Change Log
  - Update Assessment

---

3. Meter Management
  - Meter Management Type: ()
    - Deduct usage from this account
    - Deduct usage from Account
  - Current Meters / Parent Meter Balance (Can't Modified) (if `Meter Management Type`: `Deduct usage from Account`)
  - [View Meter Logs](../../workflow/meters-management/index.html#meter-records)
  > Expected Results:
  > - If Sub-account it will have 2 options
  >   - Deduct usage from this account and Deduct usage from Client Account
  > Notes: QA, Dev, System User
  > - Deduction to self : Deduct usage from this account
  > - Deduct from parent : Deduct usage from Distributor\Sub-Distributor\Client Account

---

4. Other Account Settings
  - User Account Limit
    - Distributor: Sub-Distributor, User(Account), Sub-Account, Self Registration
    - Sub-Distributor: User(Account), Sub-Account, Self Registration
    - User(Account): User(Account), Sub-Account, Self Registration
    - Sub-Account: User(Account), Self Registration
  - API Access Username
  - HRSC Name
  - HRSC Email
  - Assessment Specialist Name
  - Assessment Specialist Email
  - Client Contact Person Name
  - Client Contact Person Email
  - Site Billing Amount (PHP)(Type)
  - Site Billing Amount (PHP)
  - Contract Type
  - Contract Meters
  - Addendum
  - Base Meter
  > Expected Result:
  > - HRSC Name, HRSC Email, Assessment Specialist Name, Assessment Specialist Email, Client Contract Person Name, Client Contract Person Email: Max of 100 characters
  > - If `Site Billing Amount (PHP)(Type)` is `Included in package` then the `Site Billing Amount (PHP)` appears
  > - If `Contract Type` is `Volume-based` then the `Addendum` and `Contract Meters` appears
  > - If `Contract Type` is `Per Usage` then the `Base Meter` appears
  > - Contracted Meters: Values are prefilled from the Meter Management section.
  > - Addendum: Value is locked when the selected Meter Type is Parent.
  > - Max Limit of Account Limits: 999
  > - Max Value of Addendum, Base Meter and Billing Amount: 999

---

5. Review Account Details
Able to review Account Information before saving

##### Access Path
Accounts > View Accounts

##### How To Use
1. Navigate in
2. Update button of specific account

> Rules:
> - only shows when account is not archived and not your own account

#### Archive
Move the Account to the Archived

##### Access Path
Accounts > View Accounts

##### How To Use
1. Navigate in
2. Archive button of specific account

> Rules:
> - only shows when account is not archived

#### Restore
Move back account to the Accounts list

##### Access Path
Accounts > View Accounts > View Archived Accounts

##### How To Use
1. Navigate in
2. Restore button of specific account

> Rules:
> - only shows when account is archived

### Search
Search for the contents of the table

#### Access Path
Accounts > View Accounts > Search Input

#### How To Use
1. Navigate in
2. Input values
3. Enter

### Advance Search
Search for the contents of the table with configuration using rule

#### Access Path
Accounts > View Accounts > Advance Search > Add Rule

#### How To Use
1. Navigate in
2. Add Rule or Remove Rule
3. Search Button

### Bulk Action

#### Bulk Action: Archive
Move all accounts that has been selected in checkbox to move to Archive

##### Access Path
Accounts > View Accounts > Bulk > Archive

##### How To Use
1. Navigate in
2. Select Checkboxes of Accounts
3. Bulk Action
4. Archive

> Rule:
> If account is logged they should not be able to select their account

#### Bulk Action: Delete
Delete all accounts that has been selected in checkbox

##### Access Path
Accounts > View Accounts > Bulk > Delete

##### How To Use
1. Navigate in
2. Select Checkboxes of Accounts
3. Bulk Action
4. Delete

> Rule:
> If account is logged they should not be able to select their account

#### Bulk Action: Restore
Retrive all accounts that has been selected in checkbox

##### Access Path
Accounts > View Accounts > Bulk > Retrive

##### How To Use
1. Navigate in
2. Select Checkboxes of Accounts
3. Bulk Action
4. Retrive

> Rule:
> If account is logged they should not be able to select their account

# Format
## Title
Navigation Link, move to the Archived Accounts Listing Page

### Access Path
- Actual page navigation path

### How To Use
1. Actual UI action.
2. Actual UI action.

> Rules:
> - Confirmed validation or restriction.

> Expected Result:
> - Confirmed visible outcome.

> Notes: (optional)
> - For who
