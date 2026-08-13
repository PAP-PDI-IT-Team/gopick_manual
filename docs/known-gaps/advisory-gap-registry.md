# Advisory Gap Registry

This registry records source-confirmed inconsistencies and risks in the current Advisory implementation. It is baseline evidence for a future overhaul, not a description of intended behavior.

## Visibility Paths Are Inconsistent

The Advisory list, direct detail authorization, and Dashboard use hierarchy-aware creator visibility. The global unseen-Advisory modal in `main_layout.php`, `main_with_form.php`, and `main.php` queries every active, currently in-date Advisory without applying the same hierarchy filter.

Potential impact:

- A user may receive modal content that is not available through the hierarchy-scoped Advisory list or detail page.
- Dashboard, list, detail, and global-modal results may disagree for the same user.

## Layout SQL and Seen-State Logic Are Duplicated

Three backend layouts contain raw `advisory_log` queries and similar `extras.seen` update logic instead of using a shared service or repository.

Potential impact:

- Fixes can drift between layouts.
- Visibility, ordering, encoding, and acknowledgement behavior can evolve differently.

## Send Action Is Incomplete

`AdvisoryController::actionSend($id)` checks `modAdvisory-actionSend` and renders `send`, but `backend/modules/modAdvisory/views/advisory/send.php` does not exist. No current Advisory menu item, list button, or other confirmed UI consumer links to this action.

Potential impact:

- Directly invoking the route can fail during view resolution.
- RBAC may expose an action that has no completed workflow.

## Date Validation Is Incomplete

The model requires `display_date_start` and `display_date_end` but does not validate their formats or ordering. DatePicker restrictions are browser configuration and are not a server-side invariant.

Potential impact:

- Reversed or malformed dates may be accepted depending on database coercion.
- An accepted record may never become eligible for Dashboard or modal delivery.

## Model Lookup and Error Semantics Are Unstable

`AdvisoryController::findModel()` catches errors and returns a rendered error response even though callers expect an `Advisory` instance. View, create, update, delete, and send actions also catch broad `Throwable` values and render an error page.

Potential impact:

- A missing record can become a type mismatch in downstream permission services.
- Expected HTTP 403/404 response semantics may be replaced by a successful rendered error page.
- Programming and infrastructure errors may be presented like user-facing access errors.

## Rich Text Has No Evident Module Sanitization Boundary

Advisory content is created through a rich-text editor and rendered raw in Advisory detail, Dashboard preview, and global layouts. No sanitizer is called by the Advisory model, controller, or service before save or render.

Potential impact:

- Safety depends on behavior outside the module or on trusted authors.
- Different rendering surfaces may handle unsafe markup inconsistently.

This is a source-level finding, not confirmation that stored content is currently exploitable.

## Hierarchy Resolution Depends on Flattened Fields

`AdvisoryViewPermissionService` reads `id`, `main_account_id`, `group_account_id`, `account_id`, and `sub_account_id` from only the current account row. It does not recursively traverse parent records.

Potential impact:

- Missing, stale, or inconsistent stored lineage fields can omit a legitimate creator or include an unintended one.
- The method name `findTopDownCreatorUserIdList` can obscure that visibility is resolved from current-and-ancestor fields rather than descendants.

## Account Owner Mapping Can Omit Announcements

Hierarchy visibility converts account IDs to `accounts.user_id` values and excludes null owner IDs.

Potential impact:

- Announcements created by secondary users or HR users may not map to the expected account owner lineage.
- An account without a populated owner user ID contributes no creator to the visible list.

## Status Parameter Has a Broad Fallback

Any non-empty status value other than `status_none` or `active` is mapped to status `0`.

Potential impact:

- Misspelled or unsupported status values silently behave as `Not active` instead of being rejected.

## Tab Counts Repeat Full Searches

The index page creates the displayed data provider and then runs separate searches to count `My announcements` and `All announcements`.

Potential impact:

- Every index request repeats hierarchy and filter query work.
- Large Advisory datasets may make tab rendering unnecessarily expensive.

## Seen-State Storage Is Shared and Non-Transactional

All acknowledging user IDs are stored in the `extras` JSON text of each Advisory. Layout code reads the JSON, appends a user ID, and writes the whole value back without a transaction or atomic JSON operation.

Potential impact:

- Concurrent acknowledgements can overwrite one another.
- The field grows continuously with the number of viewers.
- Invalid or unexpected JSON shapes can break acknowledgement behavior.

## Modal Dismissal and Acknowledgement Differ

The global modal contains a header close control, while only the `OK` button posts the seen-state update.

Potential impact:

- Closing without `OK` leaves the announcement unseen and allows it to reappear.
- The interface does not explain the distinction.

## Automated Coverage Is Absent

No Advisory-specific automated test files were found for controller actions, scope filtering, hierarchy resolution, mutation authorization, date delivery, advanced search, Dashboard integration, or modal acknowledgement.

Potential impact:

- Visibility and authorization regressions depend on manual QA for detection.
- The planned overhaul has no executable characterization suite yet.

## Runtime Verification Status

The workflow and governance documents were derived from checked-out routes, views, configuration, models, services, repositories, and layout integrations. Authenticated staging verification is still required for:

- actual RBAC assignments;
- browser rendering and date-picker constraints;
- account-hierarchy fixtures;
- direct-route denial behavior;
- Dashboard variants;
- global modal acknowledgement and redisplay behavior.

