# Meter Domain Governance

## Overview

The Meter system manages operational credit balances used for assessment-related report generation.

Meters follow hierarchy-based governance where:
- visibility
- transfer authority
- request authority
- operational management
- consumption responsibility

depend on account hierarchy level.

The system behaves as a hierarchy-governed operational credit and audit system.

---

# Hierarchy Structure

```text
Super Admin (IT)
Super Admin (ASD)
- Distributor
-- Sub Distributor
--- Client Account
---- Self Registered
---- Sub-Account
------ Self Registered
```

Higher hierarchy accounts have wider:
- visibility
- operational authority
- request approval authority
- transfer scope
- report visibility
- meter log visibility

---

# Meter Definition

A Meter is a consumable operational credit.

Meters are consumed during:
- assessment completion

Meters are not consumed during:
- report viewing
- report downloading
- report emailing
- revisiting generated reports

Generated reports remain permanently accessible after creation.

---

# Meter Consumption

## Consumption Trigger

Meter deduction occurs during:
- assessment completion

Consumption occurs:
- once per candidate
- per assessment

---

## Consumption Ownership

Candidates consume meters from their owning/managing account.

Accounts that may own candidates:
- Sub Distributor
- Client Account
- Sub-Account
- Self Registered

---

# Generated Reports

Generated reports:
- remain permanently accessible
- may be revisited repeatedly
- may be downloaded multiple times
- may be emailed multiple times

without additional confirmed meter deduction.

Higher hierarchy accounts may access descendant reports.

---

# Consumption Types

Accounts may use:
- Self Consumption
- Parent Consumption

---

## Self Consumption

Consumes meters from:
- own balance

---

## Parent Consumption

Consumes meters using:
- parent-related balance behavior

Observed behavior:
- some operations still validate local balance

---

# Consumption Type Changes

## Self → Parent

Behavior:
- existing meter balance is returned to the account performing the change

---

## Parent → Self

Behavior:
- meter balance is deducted from the account performing the change

---

# Meter Requests

Lower hierarchy accounts may:
- request meters from higher hierarchy accounts

Higher hierarchy accounts may:
- approve descendant account requests

---

## Request Actions

Supported:
- Approve
- Reject
- Cancel

Not Supported:
- Edit after creation
- Partial approval

---

## Request Approval

Approving a request:
- deducts meter balance from the approving account

Super Admins are exempt from meter deduction.

---

## Request Cancellation

Requests may be cancelled by:
- requestor
- higher hierarchy accounts

Cancelled requests remain visible historically.

---

# Meter Transfers

Transfers:
- move balances immediately
- do not require approval

---

## Transfer Scope

Standard accounts may:
- transfer downward
- transfer to descendant accounts
- transfer to self

Standard accounts cannot:
- transfer upward
- transfer cross-branch
- transfer to unrelated same-level accounts

---

## Super Admin Transfer Scope

Super Admins may:
- transfer across all hierarchy branches
- transfer to any account

---

# Meter Visibility

## Meter Logs

Accounts may:
- view their own meter logs

Higher hierarchy accounts may:
- view descendant account logs

Visibility follows hierarchy lineage.

---

## Reports

Higher hierarchy accounts may:
- view descendant reports

Cross-branch visibility is restricted unless Super Admin.

---

# Administrative Meter Operations

Higher hierarchy accounts may:
- add meters
- deduct meters

Behavior:
- balance movement affects the account performing the update

---

# Negative Balance Enforcement

Negative balances are not allowed.

Operations are blocked if resulting balance becomes:
```text
< 0
```

Applies to:
- transfers
- deductions
- account creation
- meter updates
- consumption type changes
- assessment completion consumption

---

# Super Admin Governance

Super Admins:
- are not meter-deducted
- may create all account types
- may transfer across all branches
- may access all accounts
- may access all reports
- may access all logs

Super Admins still cannot:
- perform operations causing balance `< 0`

---

# Self Registered Governance

Self Registered acts as:
- Account
- Candidate

Characteristics:
- can own meters
- can receive transfers
- can consume meters
- cannot request meters
- cannot access admin-side pages

---

# Historical Log Governance

Logs are:
- system-generated
- operationally persistent
- hierarchy-visible

Archived and deactivated account logs:
- remain historically visible

---

# Meter Log Remark Governance (`modMeterlog`)

Single source of truth for remark rendering is owned by `MeterLogRemarkService`.

## Ownership and Flow

- Controller and View must not implement business decisions for remark text.
- `MeterLogRemarkService` fully owns remark behavior.
- Data lookups are owned by:
- `MeterLogRemarkRepository`
- `ApprovedMeterRequestRemarkRepository`

## Transaction Type Remark Mapping

- `0`: `Used to Score Assessment` or `Used to Score Assessment: <account_name>`
- `1`: `Sent to <account_name>`
- `2`: `Initial Meters`
- `3`: `Received from <account_name>`
- `4`: `Received from <account_name>`
- `5`: `Sent to <account_name>`
- `6`: `Meter Balance Update`
- `7`: `Moved to Newly Created Account: <account_name>`
- `8`: `<type-change-specific-message>: <actor_account_name>`

## Resolution Rules

- `type=0`: resolve consuming account from schedule linkage (`candidate_id` + `assessment_id`); unresolved returns diagnostic failure.
- `type=3`: use notes when present; else resolve paired transfer source; unresolved returns diagnostic failure.
- `type=4`: source from stored remark, paired deduction, immediate parent; unresolved returns `(not set)`.
- `type=6`: reserved for normal meter balance update only.
- `type=7`: requires explicit new-account target marker in notes and resolvable target account.
- `type=8`: requires explicit message marker in notes and resolvable actor.

## Resolution Paths Matrix

User guide matrix table for traceability, answering how to identify, understand, and use the Meter log information table as a logger across transaction types, entity states, and `SHOW_ERROR` diagnostic modes:

| # | Transaction Type | Target / Subject Entity State | Actor Entity (modified_by) State | Target Account Column (SHOW_ERROR=false) | Target Account Column (SHOW_ERROR=true) | Remarks Column (SHOW_ERROR=false) | Remarks Column (SHOW_ERROR=true) |
|---|---|---|---|---|---|---|---|
| 1 | Type 7: Moved to Created Account | Found in Storage 1 (accounts.id) | Found in Storage 2 (users.id) | Acme Branch | Acme Branch | Moved to Newly Created Account: Acme Branch | Moved to Newly Created Account: Acme Branch |
| 2 | Type 7: Moved to Created Account | Found in Storage 2 (users.id &rarr; accounts.user_id) | Found in Storage 2 (users.id) | Acme Branch | Acme Branch | Moved to Newly Created Account: Acme Branch | Moved to Newly Created Account: Acme Branch |
| 3 | Type 7: Moved to Created Account | Missing in Both (Target #105 deleted) | Found in Storage 2 (users.id = 2) | [ ⊘ Deleted Account #105 ] | Error: Target lookup failed<br>&bull; Target: accounts=MISS \| users=MISS<br>&bull; Actor: users=FOUND ("admin") | ⚠ Account #105 has been deleted.<br>(Moved meters to newly created account) | Error: Target missing<br>&bull; Target: accounts=MISS \| users=MISS<br>&bull; Actor: users=FOUND ("admin") |
| 4 | Type 7: Moved to Created Account | Found in Storage 1 (accounts.id = 105) | Missing in Both (Actor #2 deleted) | Acme Branch | Acme Branch | Moved to Newly Created Account: Acme Branch<br>(by Deleted User #2) | Moved to Newly Created Account: Acme Branch<br>&bull; Actor: accounts=MISS \| users=MISS (DELETED) |
| 5 | Type 7: Moved to Created Account | Missing in Both (Target #105 deleted) | Missing in Both (Actor #2 deleted) | [ ⊘ Deleted Account #105 ] | Error: Target & Actor missing<br>&bull; Target: MISS \| MISS<br>&bull; Actor: MISS \| MISS | ⚠ Account #105 has been deleted.<br>(Actor #2 also deleted) | Error: Both entities missing<br>&bull; Target: MISS \| MISS<br>&bull; Actor: MISS \| MISS |
| 6 | Type 7: Legacy Alignment Row (FixMeter) | NULL / Not Set (transfer_to_account_id = null) | Found in Storage 2 (users.id = 2) | (not set) | Diagnostic Notice:<br>&bull; Subject: accounts.id=79 [FOUND]<br>&bull; Actor: users.id=2 [FOUND]<br>&bull; Target: NOT_SPECIFIED (legacy null) | Moved meters to newly created account<br>(or notes payload) | Notice: Legacy alignment row<br>&bull; Subject: FOUND<br>&bull; Actor: FOUND<br>&bull; Target: NOT_SPECIFIED |
| 7 | Type 6: Balance Addition (value > 0) | Found in Storage 1 or 2 (Account #79) | Found in Storage 2 (Actor #2) | Acme Corp | Acme Corp | Meter Balance Update on: Acme Corp | Meter Balance Update on: Acme Corp |
| 8 | Type 6: Balance Addition (value > 0) | Missing in Both (Account #79 deleted) | Found in Storage 2 (Actor #2) | [ ⊘ Deleted Account #79 ] | Error: Target lookup failed<br>&bull; Target: MISS \| MISS<br>&bull; Actor: users=FOUND ("admin") | ⚠ Account #79 has been deleted.<br>(Meter Balance Update) | Error: Target missing<br>&bull; Target: MISS \| MISS |
| 9 | Type 6: Balance Deduction (value < 0) | Subject #79 active; Actor #2 active | Found in Storage 2 (users.id = 2) | admin (or linked account) | admin | Meter Balance Update by: admin | Meter Balance Update by: admin |
| 10 | Type 6: Balance Deduction (value < 0) | Subject #79 active; Actor #2 deleted | Missing in Both (Actor #2 deleted) | [ ⊘ Deleted Account #2 ] | Error: Actor lookup failed<br>&bull; Subject: accounts=FOUND<br>&bull; Actor: accounts=MISS \| users=MISS | ⚠ Account #2 has been deleted.<br>(Meter Balance Update by: Deleted User #2) | Error: Actor missing<br>&bull; Subject: FOUND<br>&bull; Actor: accounts=MISS \| users=MISS |
| 11 | Type 1 / 5: Outbound Transfer | Found in Storage 1 or 2 (Target #88) | Active user | Target Corp | Target Corp | Sent to Target Corp | Sent to Target Corp |
| 12 | Type 1 / 5: Outbound Transfer | Missing in Both (Target #88 deleted) | Active user | [ ⊘ Deleted Account #88 ] | Error: Target lookup failed<br>&bull; Target: MISS \| MISS | ⚠ Account #88 has been deleted.<br>(Sent to Deleted Account #88) | Error: Target lookup failed<br>&bull; Target: MISS \| MISS |
| 13 | Type 2 / 3 / 4: Inbound Meter / Initial | Found in Storage 1 or 2 (Account #79) | Active user | Acme Corp | Acme Corp | Initial Meters / Received from &lt;source&gt; | Initial Meters / Received from &lt;source&gt; |
| 14 | Type 2 / 3 / 4: Inbound Meter / Initial | Missing in Both (Account #79 deleted) | Active user | [ ⊘ Deleted Account #79 ] | Error: Account lookup failed<br>&bull; Account #79: MISS \| MISS | ⚠ Account #79 has been deleted. | Error: Account lookup failed<br>&bull; Account #79: MISS \| MISS |
| 15 | Type 0: Scored Assessment | Candidate owner matches subject account | Automated system | Acme Corp | Acme Corp | Used to Score Assessment | Used to Score Assessment |
| 16 | Type 0: Scored Assessment | Cross-account deduction; Source active | Automated system | Parent Corp | Parent Corp | Used to Score Assessment: Parent Corp | Used to Score Assessment: Parent Corp |
| 17 | Type 0: Scored Assessment | Cross-account deduction; Source deleted | Automated system | [ &#x2298; Deleted Account #50 ] | Error: Scored assessment source miss<br>&bull; Account #50: MISS \| MISS | ⚠ Account #50 has been deleted.<br>(Used to Score Assessment) | Error: Scored assessment source miss |

## Constraints

- No business decisions in View or Controller.
- No undeclared fallback behavior.
- No dual-path old/new logic for the same behavior.
- Keep return values explicit and predictable.

## Newly Discovered Actor/Target Governance

- Actor must be the logged-in user at action time.
- Actor must not be inferred from parent account relationship.
- Logging must use explicit actor username from authenticated session context.
- No hidden fallback actor resolution is allowed.

### Settings-Changed Behavior Expectations

- Account creation logs:
- `(Target View)`: `Initial Meters`
- `(Actor View)`: `Moved to Newly Created Account: <target_user_name>`
- Meter type update logs:
- `(Target View)`: `Meter Type Update (switched to self/parent deduction) by: <actor_user_name>`
- `(Actor/Parent View)`: `Meter Type Update (switched to self/parent deduction): <target_user_name>`
- Meter balance update logs:
- `(Target View)`: `Meter Balance Update by: <actor_user_name>`
- `(Parent View)`: `Meter Balance Updated: <target_user_name>`
- Request-approved logs:
- `(Target View)`: `Received from <actor_user_name>`
- `(Actor View)`: `Sent to <target_user_name>`

### Balance Movement Expectations

- Create account:
- Parent deduction with allocated `0`: `Addition=0`, `Deduction=0`
- Self deduction with allocated `n > 0`: `Addition=n`, `Deduction=0`
- Meter type switched to self deduction:
- Target side `Addition=n`, Actor side `Deduction=n`
- Meter type switched to parent deduction:
- Target side `Deduction=n`, Actor side `Addition=n`
- Manual meter balance deduction:
- Actor side `Addition=n`, Target side `Deduction=n`
- Manual meter balance addition:
- Actor side `Deduction=n`, Target side `Addition=n`

---

# Lifecycle States

Accounts may become:
- Expired
- Deactivated
- Archived
- Deleted

---

# Confirmed Operational Characteristics

The Meter system currently operates as:
- hierarchy-governed operational credit system
- delegated consumption system
- operational audit/history system
- persistent report-access system

The system enforces:
- hierarchy-based authority
- hierarchy-based visibility
- strict non-negative balance integrity
- persistent operational history

---

## Gaps

- **Parent Consumption Account Creation Validation**
  
  Accounts using `Parent Consumption` may fail account creation when the creator's local meter balance is `0`, even when the parent account still has available balance.
  
  This happens because some account creation validations still check the creator's local balance instead of the parent-related consumption behavior.
  
  Current observed impact:
  - Sub Distributor accounts using parent consumption may become unable to create Client or Sub-Account records when their own local balance is `0`.

---

- **Distributor Candidate Management Workflow**
  
  Distributor accounts can have candidates assigned under them through admin-side operations, but Distributor-side candidate management workflow is currently unclear.
  
  Current observed behavior:
  - Admin accounts may create candidates under Distributor accounts.
  - Distributor accounts currently do not have a clearly confirmed candidate management workflow.

  Current concern:
  - Ownership and operational management responsibility becomes unclear for Distributor-managed candidates.

---

- **Deleted Account Meter Governance**
  
  Meter behavior for `Deleted` accounts is not yet formally confirmed.

  Current unclear areas:
  - Remaining meter balances
  - Historical meter logs
  - Generated reports
  - Request history
  - Transfer history
  - Visibility retention after deletion

  Current concern:
  - Historical audit consistency and balance ownership behavior may become inconsistent without formally defined deletion handling.

---

- **Archived, Deactivated, Expired Account Meter Governance**
  
  Meter behavior for `Archived, Deactivated, Expired` accounts is not yet formally confirmed.

  Current unclear areas:
  - Remaining meter balances

  Current concern:
  - Historical audit consistency and balance ownership behavior may become inconsistent without formally defined deletion handling.

---

- **Multi-Report Meter Deduction Behavior**
  
  Meter deduction currently occurs during the initial assessment completion event and generated reports remain reusable afterward.

  However, assessments containing multiple reports do not yet have formally confirmed additional deduction behavior.

  Current unclear behavior:
  - Whether additional reports under the same assessment should trigger additional meter deduction.


---

- **What will happen when if Account will be Archived, Deactivated, Expired or Deleted to its child Accounts**

  Behavior for child accounts is not yet formally confirmed when their parent account becomes Archived, Deactivated, Expired, or Deleted.

  Current unclear areas:

  Whether child accounts remain active
  Whether child accounts can still log in
  Whether child accounts can still consume meters
  Whether child accounts can still create candidates
  Whether child accounts can still generate reports
  Whether child accounts inherit the parent account status
  Whether child accounts become restricted, suspended, or detached
  Whether child account meter balances remain usable
  Whether child account visibility remains available to admins and parent users

  Current concern:
  - Parent account lifecycle changes may cause inconsistent behavior across child accounts if inheritance, access, meter usage, and visibility rules are not formally defined.
