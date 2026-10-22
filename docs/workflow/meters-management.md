# Meters Module

> Legends:
> (Admin) - Super Admin IT or Super Admin ASD
> (Accounts) - Distributor, Sub Distributor, Client Account, Sub-Account

The Meters Module manages meter requests, transfers, balances, consumption history, and meter-related account operations.

---

# Meter Request

View and manage meter requests from lower hierarchy accounts.

## Approve Or Reject Request

Review pending meter requests and approve or reject the request.

### Access Path
- `Meters` > `Meter Request`

### How To Use

1. Open `Meters` > `Meter Request`.
2. Select the request.
3. Review the request details.
4. Click:
   - `Approve`
   - `Reject`

> Rules:
> - Requests require approval before meter movement occurs.
> - Request approval deducts meters from the approving account.
> - Requests may only be approved by authorized higher hierarchy accounts.
> - Requests cannot be edited after submission.
> - Partial approval is not supported.
> - Requests may be cancelled by the requester or higher hierarchy accounts.

> Expected Result:
> - The request status updates.
> - Meter balances update after approval.
> - A request history log is created.

---

# Order Meters

Request meters from higher hierarchy accounts.

### Access Path
- `Meters` > `Order Meters`

### How To Use

1. Open `Meters` > `Order Meters`.
2. Enter the requested meter value.
3. Click `Send Meter Order`.

> Rules:
> - Meter requests follow hierarchy authority rules.
> - Requests require approval before meter balances change.

> Expected Result:
> - The meter request is added to the request list.
> - Higher hierarchy accounts can review the request.

---

# Transfer Meters

Transfer meter balances to allowed accounts.

### Access Paths
- `Meters` > `Transfer Meters`
- `Meters` > `Meter Records` > `View Meter` > `Transfer Meter`

### How To Use

1. Open `Transfer Meters`.
2. Select `Source Account`.
3. Review the loaded `Available Meters`.
4. Enter the `Meter Value`.
5. Select `Destination Account`.
6. Click `Transfer Meter`.

> Rules:
> - Transfers are immediate and do not require approval.
> - Transfer amount cannot exceed the available balance.
> - Transfers cannot cause balance `< 0`.
> - Standard accounts may transfer only to descendant accounts.
> - Cross-branch transfers are restricted to Super Admins.

> Expected Result:
> - The source account balance decreases.
> - The destination account balance increases.
> - A transfer log entry is created.

---

# Meter Records

View account meter balances, logs, and meter-related actions.

### Access Path
- `Meters` > `Meter Records`

---

## View Meter

View meter balance and meter details for the selected account.

### Access Path
- `Meters` > `Meter Records` > `View Meter`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `View Meter`.

> Rules:
> - Visibility depends on account hierarchy.
> - Higher hierarchy accounts may view descendant account meters.

> Expected Result:
> - The selected account meter details are displayed.

---

## Transfer Meter

Transfer meters directly from the selected account.

### Access Path
- `Meters` > `Meter Records` > `View Meter` > `Transfer Meter`

### How To Use

1. Open `View Meter`.
2. Click `Transfer Meter`.
3. Enter transfer details.
4. Click `Transfer Meter`.

> Rules:
> - Transfer restrictions follow hierarchy authority rules.
> - Transfers cannot cause balance `< 0`.

> Expected Result:
> - Meter balances update immediately.
> - A transfer log entry is created.

---

## View Meter Log

View meter history and meter-related activities for the selected account.

### Access Paths
- `Meters` > `Meter Records` > `View Meter Log`
- `Meters` > `Meter Records` > `View Meter` > `View Meter Log`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `View Meter Log`.

> Rules:
> - Meter log visibility follows hierarchy authority.
> - Higher hierarchy accounts may view descendant logs.
> - Accounts may view their own logs.
> - Archived and deactivated account logs remain visible in history.
> - Remark rendering in `modMeterlog` is owned only by `MeterLogRemarkService`.
> - Controller and View must not implement business decisions for remark text.
> - Meter log remark lookups are handled by `MeterLogRemarkRepository` and `ApprovedMeterRequestRemarkRepository`.
> - No undeclared fallback behavior is allowed for remark resolution.

### Meter Log Remark Mapping

- `0`: `Used to Score Assessment` or `Used to Score Assessment: <account_name>`
- `1`: `Sent to <account_name>`
- `2`: `Initial Meters`
- `3`: `Received from <account_name>`
- `4`: `Received from <account_name>`
- `5`: `Sent to <account_name>`
- `6`: `Meter Balance Update`
- `7`: `Moved to Newly Created Account: <account_name>`
- `8`: `<type-change-specific-message>: <actor_account_name>`

### New Discovery And Settings-Changed Notes

Actor is the logged-in user at action time. Actor is not always the parent account.

#### Create New Account

- Remarks:
- `(Target View)`: `Initial Meters`
- `(Actor View)`: `Moved to Newly Created Account: <target_user_name>`
- Target Account:
- `(Both View)`: `<target_user_name>`
- Addition and Deduction:
- If meter type is parent deduction and allocated value is `0`: `Addition = 0`, `Deduction = 0`
- If meter type is self deduction and allocated value is `n` where `n > 0`: `Addition = n`, `Deduction = 0`

#### Update Meter Type

- Remarks:
- `(Target View)`: `Meter Type Update (switched to self/parent deduction) by: <actor_user_name>`
- `(Actor or Parent View)`: `Meter Type Update (switched to self/parent deduction): <target_user_name>`
- Target Account:
- If switched to self deduction: `(Both View) <target_user_name>`
- If switched to parent deduction: `(Both View) <parent_user_name>`
- Addition and Deduction:
- If switched to self deduction:
- `(Target View)`: `Addition = n` (target meter balance value)
- `(Actor View)`: `Deduction = n` (actor meter balance value)
- If switched to parent deduction:
- `(Target View)`: `Deduction = n` (target meter balance value)
- `(Actor View)`: `Addition = n` (actor meter balance value)

#### Update Meter Balance

- Remarks:
- `(Target View)`: `Meter Balance Update by: <actor_user_name>`
- `(Parent View)`: `Meter Balance Updated: <target_user_name>`
- Target Account:
- If deduction: `(Both View) <parent_user_name>`
- If addition: `(Both View) <target_user_name>`
- Addition and Deduction:
- If deduction:
- `(Actor View)`: `Addition = n`
- `(Target View)`: `Deduction = n`
- If addition:
- `(Actor View)`: `Deduction = n`
- `(Target View)`: `Addition = n`

#### Use Meter Balance

- Remarks:
- If own candidate: `Used to Score Assessment`
- If lower-hierarchy candidate: `Used to Score Assessment: <consumer_user_name>`
- Target Account:
- If own candidate: `<own_user_name>`
- If lower-hierarchy candidate: `<consumer_user_name>`

#### Request Meter Approved

- Remarks:
- `(Target View)`: `Received from <actor_user_name>`
- `(Actor View)`: `Sent to <target_user_name>`
- Target Account:
- `<target_user_name>`
- Addition and Deduction:
- `(Actor View)`: `Deduction = n`
- `(Target View)`: `Addition = n`

### What To Expect In Remarks

- `Used to Score Assessment`: Meter was consumed by assessment completion.
- `Used to Score Assessment: <account_name>`: Assessment consumption is attributed to the shown account.
- `Sent to <account_name>`: Meters were deducted from the current account and transferred to the shown account.
- `Received from <account_name>`: Meters were added to the current account from the shown account.
- `Initial Meters`: Starting meter balance set during account meter initialization.
- `Meter Balance Update`: Manual add/deduct adjustment from `Update Meter Balance`.
- `Moved to Newly Created Account: <account_name>`: Meters were moved to a newly created child account.
- `<type-change-specific-message>: <actor_account_name>`: Consumption-type change event; message identifies the specific type-change action and actor account.
- `(not set)`: Applicable only to unresolved `type=4` fallback output from stored/paired/parent resolution path.

### Site Behavior Expectations

- The same transaction input always resolves to one predictable remark format.
- Account names appear only when the source event can resolve a target/source account.
- For unresolved `type=0` and `type=3`, the system returns a diagnostic failure instead of silent fallback text.
- Remarks are rendered by service-owned rules; View and Controller do not alter remark meaning.

### Meter Log Remark Resolution Rules

- `type=0`: resolve consuming account from schedule linkage (`candidate_id` + `assessment_id`); unresolved returns diagnostic failure.
- `type=3`: use notes when present; else resolve paired transfer source; unresolved returns diagnostic failure.
- `type=4`: source from stored remark, paired deduction, immediate parent; unresolved returns `(not set)`.
- `type=6`: reserved for normal meter balance update only.
- `type=7`: requires explicit new-account target marker in notes and resolvable target account.
- `type=8`: requires explicit message marker in notes and resolvable actor.

### Resolution Paths Matrix

Find out what the Meter Log shows for each kind of transaction, including when an account or user has been deleted. The `What users see` view is the normal log (`SHOW_ERROR=false`); the `Diagnostic` view adds lookup details (`SHOW_ERROR=true`):

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
| 17 | Type 0: Scored Assessment | Cross-account deduction; Source deleted | Automated system | [ ⊘ Deleted Account #50 ] | Error: Scored assessment source miss<br>&bull; Account #50: MISS \| MISS | ⚠ Account #50 has been deleted.<br>(Used to Score Assessment) | Error: Scored assessment source miss |

> Expected Result:
> - Meter activity history is displayed.

---

## Update Meter Balance

Add or deduct meter balances for the selected account.

### Access Path
- `Meters` > `Meter Records` > `Update Meter Balance`

### How To Use

1. Open `Meters` > `Meter Records`.
2. Select the account.
3. Click `Update Meter Balance`.
4. Enter the adjustment value.
5. Save the update.

> Rules:
> - Meter balances cannot become `< 0`.
> - Higher hierarchy accounts may update descendant account balances.
> - Super Admins are not meter-deducted during updates.

> Expected Result:
> - The selected account balance updates.
> - A meter adjustment log entry is created.

---

# Meter Consumption

Meters are consumed during assessment completion.

Generated reports may later be:
- Viewed
- Downloaded
- Emailed
- Revisited

without additional meter deduction.

> Rules:
> - Meter deduction occurs once per candidate per assessment.
> - Generated reports remain accessible after creation.
> - Higher hierarchy accounts may view descendant reports.

> Expected Result:
> - Meter balances decrease after assessment completion.
> - Generated reports become available for viewing and download.

---
