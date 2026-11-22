# Capstone API Development Checklist

> **Scope:** Backend/API only. This plan is based on the five-page ERD supplied for the capstone: Users (page 1), Vehicles (page 2), Permits (page 3), Citations (page 4), and Appeals (page 5). Front-end work is intentionally excluded.
>
> **Architecture convention:** Each data concern uses `*.queries.ts`, `*.model.ts`, `*.dao.ts`, and `*.service.ts`. Add `*.controller.ts` only where an HTTP resource or cohesive group of resources warrants one. Controllers may coordinate multiple data concerns when that produces a more logical API boundary.

---

## 1. Architecture and implementation conventions

### 1.1 Responsibilities by file

Use the same responsibility boundaries consistently. A file should not take on work belonging to another layer.

- [ ] **`{concern}.queries.ts`**
  - [ ] Define parameterized SQL query strings.
  - [ ] Define reusable update/insert query builders where dynamic fields or optional values are needed.
  - [ ] Keep SQL construction here; do not execute queries in this file.
  - [ ] Use allowlisted column names for dynamic updates. SQL parameters protect values, not identifiers.
  - [ ] Include joins and projections needed by DAO read operations.
  - [ ] Keep query names descriptive and aligned with DAO methods.
- [ ] **`{concern}.model.ts`**
  - [ ] Define database-facing row types and domain models.
  - [ ] Define create, update, filter, and result types as appropriate.
  - [ ] Define request/response DTO types where they belong to the concern, without coupling models to Express request objects.
  - [ ] Represent nullable columns and database enum/code values accurately.
  - [ ] Avoid putting SQL, database execution, or business workflows in models.
- [ ] **`{concern}.dao.ts`**
  - [ ] Execute queries through the project's database connector/executor.
  - [ ] Expose focused persistence methods (find, list, insert, update, delete/soft-delete if supported).
  - [ ] Accept an optional transaction executor for operations that must participate in a service-managed transaction.
  - [ ] Map database results to typed models.
  - [ ] Do not make HTTP decisions or enforce business workflows here.
- [ ] **`{concern}.service.ts`**
  - [ ] Implement business rules and workflow orchestration.
  - [ ] Validate domain-level constraints and coordinate multiple DAOs.
  - [ ] Own transaction boundaries for multi-table operations.
  - [ ] Enforce authorization rules that depend on the requested operation and domain data (with middleware/controller supplying authenticated identity).
  - [ ] Coordinate history/audit writes with the data change in the same transaction where possible.
  - [ ] Return domain results or domain errors, not Express responses.
- [ ] **`{concern}.controller.ts`** (when applicable)
  - [ ] Parse route parameters, query parameters, and request bodies.
  - [ ] Perform request-shape validation and call the relevant service.
  - [ ] Pass authenticated-user context to services as needed.
  - [ ] Translate known service errors into appropriate HTTP status codes.
  - [ ] Return a consistent response envelope.
  - [ ] Keep SQL, transaction logic, and business rules out of the controller.

### 1.2 Cross-cutting API work

- [ ] Establish a consistent API response format for success and errors.
- [ ] Establish centralized error handling and typed application/domain errors.
- [ ] Establish request validation conventions for params, query strings, and bodies.
- [ ] Establish authentication middleware and authenticated-user context.
- [ ] Establish authorization middleware/helpers for role- and resource-based checks.
- [ ] Ensure all database writes use parameterized statements.
- [ ] Keep dynamic update fields on explicit allowlists.
- [ ] Add pagination, sorting, and filtering conventions for list endpoints.
- [ ] Add consistent handling for not-found, conflict, validation, and unauthorized/forbidden cases.
- [ ] Add request logging and operational error logging without logging passwords, tokens, or other secrets.
- [ ] Add integration tests for routes and service/DAO tests for important business rules.
- [ ] Document routes, request schemas, response schemas, and authorization requirements (for example, with OpenAPI).

---

## 2. ERD review: decisions and items to verify

The checklist below follows the entities and columns shown in the supplied ERD. The diagram does not specify every constraint, index, endpoint, or business rule, so the following items should be confirmed before implementation rather than assumed.

### 2.1 Schema questions to resolve

- [ ] Confirm primary keys, foreign keys, delete behavior, and uniqueness constraints for every relationship.
- [ ] Confirm whether `company_id` is a tenant/deployment identifier and whether all user-owned records must be scoped to it. The ERD shows `company_id` on `users`, but does not show it on the other entities.
- [ ] Confirm whether `user_credentials.user_id` is both its primary key and a foreign key to `users.user_id`.
- [ ] Confirm whether usernames and email addresses must be unique, and whether uniqueness is case-insensitive.
- [ ] Confirm whether `vehicles.user_id` is required and whether a vehicle can be associated with only one user.
- [ ] Confirm whether VIN and plate number uniqueness is global, per company, or not enforced.
- [ ] Confirm whether permit barcode values are unique.
- [ ] Confirm whether a vehicle/user can have multiple active permit assignments and/or multiple pending permit requests.
- [ ] Confirm whether `permit_assignments` is the actual permit record (the ERD uses that table name with `permit_id`) and whether a separate permit entity is intended.
- [ ] Confirm the relationship between `permit_requests` and `permit_assignments`. The ERD links both to `lots`, but does not show a direct request-to-issued-permit foreign key.
- [ ] Confirm whether a citation may have multiple appeals, or whether `citations.appeal_id` means at most one appeal per citation. The ERD shows `appeal_id` on `citations`; `appeals` does not show a `citation_id`.
- [ ] Confirm whether citation offenses are many-to-many through `citation_offenses` and whether duplicate offense-code assignments are allowed.
- [ ] Confirm whether `citations.user_id` identifies the cited person, the issuing user, or another user role.
- [ ] Confirm whether `appeal_status_code` on `citations` is intentional in addition to `appeals.appeal_status_code`.
- [ ] Confirm whether comments are append-only and whether public/private visibility is controlled only by `citation_comments.is_public`.
- [ ] Confirm what history `action_type` values are valid and whether history rows are generated by application services, database triggers, or both. Avoid duplicate audit records.
- [ ] Confirm which columns are nullable, their maximum lengths, and whether dates are stored in UTC.
- [ ] Review monetary types: `citation_offense_codes.charge` is shown as `FLOAT`; consider a fixed-precision decimal type for currency before relying on it for calculations.
- [ ] Confirm whether `YEAR(4)` for vehicle year and `DATETIME` for expiration dates are appropriate for the intended business rules.

### 2.2 ERD integrity and audit observations

- [ ] Verify that every history table has a foreign key to its parent record and an index on the parent ID and changed date.
- [ ] Verify that `changed_by` references a user and decide what happens when that user is deleted/deactivated.
- [ ] Verify whether the history tables capture all required fields. For example, `appeal_history_records` does not show a `field_name`, while most other history tables do.
- [ ] Verify whether `citation_offense_history_records` and `citation_offense_code_history_records` are both required and define the distinction between them.
- [ ] Verify whether `user_history_records` should capture sensitive fields. Password hashes and credential changes should not be written into general-purpose old/new value audit fields.
- [ ] Verify indexes for foreign keys, lookup codes, common filters, and unique business identifiers.
- [ ] Decide whether deletes are allowed, restricted, or represented by status changes for users, vehicles, permits, citations, and appeals.

---

## 3. Suggested API modules and data concerns

A data concern is a cohesive persistence/business area, not necessarily one table. Lookup and history tables are grouped with their parent concern.

### 3.1 Users and access control

**ERD tables:** `users`, `user_credentials`, `user_role_codes`, `user_role_assignments`, `user_history_records`, `user_role_assignment_history_records`.

**Suggested files**
- [ ] `user.queries.ts`
- [ ] `user.model.ts`
- [ ] `user.dao.ts`
- [ ] `user.service.ts`
- [ ] `user.controller.ts`
- [ ] `user-role.queries.ts`
- [ ] `user-role.model.ts`
- [ ] `user-role.dao.ts`
- [ ] `user-role.service.ts` (optional if role logic is substantial; otherwise role operations can live in `user.service.ts`)

**User data/query work**
- [ ] Create user insert and lookup queries.
- [ ] Create user lookup by ID, company ID, username/credential relationship, and email as required.
- [ ] Create user list query with pagination, filters, and safe sorting.
- [ ] Create allowlisted user update query builder.
- [ ] Create user delete/deactivation query only after the account lifecycle is defined.
- [ ] Create user history insert and retrieval queries.
- [ ] Ensure credential fields are excluded from general user read projections.

**Credential work (handled through the user API boundary)**
- [ ] Define credential models separately from public user models.
- [ ] Implement credential lookup by user ID and username for authentication.
- [ ] Implement credential creation/update persistence methods.
- [ ] Implement password hashing and verification in the authentication/credential service layer, not in SQL or controllers.
- [ ] Implement password change/reset rules and ensure the caller is authorized to change the target credential.
- [ ] Do not expose password hashes in API responses or general user queries.
- [ ] Decide how credential changes affect existing access tokens/sessions.

**Role work**
- [ ] Create role-code list and lookup queries.
- [ ] Create role assignment and removal queries.
- [ ] Create user role retrieval query.
- [ ] Create role assignment history insert/retrieval queries.
- [ ] Enforce valid role IDs and prevent duplicate assignments.
- [ ] Define who can grant/revoke roles and whether users can modify their own roles.
- [ ] Record role changes with `changed_by`, old role, new role, and timestamp.

**Service responsibilities**
- [ ] Implement user creation/update workflows.
- [ ] Coordinate user and credential creation in a single transaction where both are required.
- [ ] Coordinate role assignment changes and role history in a transaction.
- [ ] Enforce company/tenant scoping if applicable.
- [ ] Enforce rules for self-service updates versus administrator updates.
- [ ] Ensure user history and role history are recorded consistently.

**Controller boundary and suggested endpoints**
- [ ] `user.controller.ts` owns user endpoints and credential endpoints that are naturally part of user account management.
- [ ] `POST /api/users`
- [ ] `GET /api/users`
- [ ] `GET /api/users/:userId`
- [ ] `PATCH /api/users/:userId`
- [ ] `GET /api/users/:userId/roles`
- [ ] `PUT /api/users/:userId/roles` or dedicated grant/revoke routes, depending on desired semantics.
- [ ] `PATCH /api/users/:userId/credentials` for an authenticated password/credential change.
- [ ] `GET /api/users/:userId/history` (restricted to authorized roles).
- [ ] Keep login/token endpoints in the authentication controller/module if that module already exists; do not force login into the user controller merely because credentials are stored with users.

### 3.2 Vehicles

**ERD tables:** `vehicles`, `color_codes`, `vehicle_make_codes`, `state_codes`, `vehicle_history_records`.

**Suggested files**
- [ ] `vehicle.queries.ts`
- [ ] `vehicle.model.ts`
- [ ] `vehicle.dao.ts`
- [ ] `vehicle.service.ts`
- [ ] `vehicle.controller.ts`

**Query/DAO work**
- [ ] Create vehicle insert, lookup-by-ID, list, and allowlisted update queries.
- [ ] Create vehicle lookup by owner (`user_id`).
- [ ] Create search/filter support for plate, VIN, make, state, color, and year as appropriate.
- [ ] Create color, make, and state lookup queries.
- [ ] Create vehicle history insert and retrieval queries.
- [ ] Join lookup names into vehicle read models where useful.
- [ ] Add indexes for owner ID and approved search/unique fields.

**Service responsibilities**
- [ ] Validate required vehicle fields and lookup-code IDs.
- [ ] Validate VIN/plate formats according to the actual project requirements.
- [ ] Verify the user is permitted to add, view, update, or remove the vehicle.
- [ ] Prevent ownership changes unless explicitly authorized.
- [ ] Record field-level changes in `vehicle_history_records`.
- [ ] Coordinate vehicle updates and history writes in one transaction.
- [ ] Define behavior when a vehicle is referenced by a permit, request, or citation.

**Controller and suggested endpoints**
- [ ] `vehicle.controller.ts` owns vehicle CRUD and vehicle lookup endpoints.
- [ ] `POST /api/vehicles`
- [ ] `GET /api/vehicles`
- [ ] `GET /api/vehicles/:vehicleId`
- [ ] `PATCH /api/vehicles/:vehicleId`
- [ ] `DELETE /api/vehicles/:vehicleId` only if deletion is supported by policy and foreign-key design.
- [ ] `GET /api/vehicles/:vehicleId/history`
- [ ] `GET /api/vehicle-lookups/colors`
- [ ] `GET /api/vehicle-lookups/makes`
- [ ] `GET /api/vehicle-lookups/states`
- [ ] Decide whether lookup routes belong in `vehicle.controller.ts` or a small `vehicle-lookup.controller.ts`; do not create separate controllers for each lookup table.

### 3.3 Permits, lots, and permit requests

**ERD tables:** `permit_assignments`, `permit_status_codes`, `lots`, `permit_requests`, `permit_request_status_codes`, `permit_history_records`, `permit_request_history_records`.

**Suggested files**
- [ ] `permit.queries.ts`
- [ ] `permit.model.ts`
- [ ] `permit.dao.ts`
- [ ] `permit.service.ts`
- [ ] `permit.controller.ts`
- [ ] `permit-request.queries.ts`
- [ ] `permit-request.model.ts`
- [ ] `permit-request.dao.ts`
- [ ] `permit-request.service.ts`
- [ ] `lot.queries.ts`
- [ ] `lot.model.ts`
- [ ] `lot.dao.ts`
- [ ] `lot.service.ts` (can be folded into `permit.service.ts` if lot management is simple)

**Permit assignment query/DAO work**
- [ ] Create permit insert, lookup, list, update, and status-change queries.
- [ ] Create lookups by permit ID, barcode, user, vehicle, lot, and status.
- [ ] Create permit status-code lookup queries.
- [ ] Create permit history insert and retrieval queries.
- [ ] Support filtering for active, expired, and status-specific permits based on agreed rules.
- [ ] Avoid exposing internal joins/SQL details to services.

**Permit request query/DAO work**
- [ ] Create request insert, lookup, list, update, and status-change queries.
- [ ] Create request lookup by user, vehicle, lot, and request status.
- [ ] Create request status-code lookup queries.
- [ ] Create permit request history insert and retrieval queries.
- [ ] Determine whether request approval creates a permit assignment and how the relationship is tracked.

**Lot query/DAO work**
- [ ] Create lot list and lookup-by-ID/code queries.
- [ ] Create lot create/update queries if administrators manage lots through the API.
- [ ] Create lot capacity read queries.
- [ ] Define whether `total_spaces` is a static capacity or must be reconciled against active permits.

**Service responsibilities**
- [ ] Define permit lifecycle and allowed status transitions.
- [ ] Define permit request lifecycle and allowed status transitions.
- [ ] Validate that the selected user and vehicle are eligible for the requested permit.
- [ ] Validate lot existence and capacity rules.
- [ ] Prevent duplicate/overlapping active assignments according to business rules.
- [ ] Generate or validate unique permit barcodes.
- [ ] Calculate expiration dates using explicit business rules and timezone conventions.
- [ ] Implement request approval/rejection workflows.
- [ ] On approval, create the permit assignment and update request status atomically if that is the intended workflow.
- [ ] Record permit/request history in the same transaction as the corresponding change.
- [ ] Define renewal, expiration, cancellation, revocation, and reassignment behavior.
- [ ] Enforce permissions for users requesting permits versus staff managing/issuing permits.

**Controller boundary and suggested endpoints**
- [ ] `permit.controller.ts` can own permits, requests, and lots because these resources form one permit-management workflow.
- [ ] `POST /api/permits`
- [ ] `GET /api/permits`
- [ ] `GET /api/permits/:permitId`
- [ ] `PATCH /api/permits/:permitId`
- [ ] `GET /api/permits/:permitId/history`
- [ ] `POST /api/permit-requests`
- [ ] `GET /api/permit-requests`
- [ ] `GET /api/permit-requests/:requestId`
- [ ] `PATCH /api/permit-requests/:requestId/status` (approval/rejection through a validated workflow)
- [ ] `GET /api/permit-requests/:requestId/history`
- [ ] `GET /api/lots`
- [ ] Add lot create/update routes only if lot administration is in scope.
- [ ] Add dedicated route authorization for staff-only permit issuance and request decisions.

### 3.4 Citations, offenses, comments, and enforced locations

**ERD tables:** `citations`, `citation_status_codes`, `citation_comments`, `citation_comment_history_records`, `citation_history_records`, `citation_offenses`, `citation_offense_codes`, `citation_offense_history_records`, `citation_offense_code_history_records`, `enforced_locations`.

**Suggested files**
- [ ] `citation.queries.ts`
- [ ] `citation.model.ts`
- [ ] `citation.dao.ts`
- [ ] `citation.service.ts`
- [ ] `citation.controller.ts`
- [ ] `citation-offense.queries.ts`
- [ ] `citation-offense.model.ts`
- [ ] `citation-offense.dao.ts`
- [ ] `citation-offense.service.ts` (can be folded into `citation.service.ts` if offense operations are only performed as part of citation workflows)
- [ ] `citation-comment.queries.ts`
- [ ] `citation-comment.model.ts`
- [ ] `citation-comment.dao.ts`
- [ ] `citation-comment.service.ts` (can be folded into `citation.service.ts` if comment workflows remain simple)
- [ ] `enforced-location.queries.ts`
- [ ] `enforced-location.model.ts`
- [ ] `enforced-location.dao.ts`
- [ ] `enforced-location.service.ts` (optional; can be folded into citation service if locations are lookup-only)

**Citation query/DAO work**
- [ ] Create citation insert, lookup, list, update, and status-change queries.
- [ ] Create citation lookup by barcode, user, location, appeal, and status.
- [ ] Create citation status-code lookup queries.
- [ ] Create citation history insert and retrieval queries.
- [ ] Create joined citation detail query including offense details and relevant status/location labels.
- [ ] Add pagination and filters for common citation searches.

**Offense query/DAO work**
- [ ] Create offense-code list and lookup queries.
- [ ] Create offense-code create/update queries if administrators maintain the catalog.
- [ ] Create citation-offense assignment and removal queries.
- [ ] Create citation offense list/detail queries.
- [ ] Create offense assignment history and offense-code history queries.
- [ ] Ensure the join table cannot receive duplicate assignments if duplicates are not meaningful.

**Comment query/DAO work**
- [ ] Create comment insert and list queries.
- [ ] Create comment lookup and update/delete queries only if editing/deletion is allowed.
- [ ] Create comment history queries if comment changes are auditable.
- [ ] Ensure public-facing reads return only comments allowed by visibility rules.

**Enforced-location query/DAO work**
- [ ] Create enforced-location list and lookup queries.
- [ ] Create create/update queries only if locations are administratively maintained.
- [ ] Validate location references when creating citations.

**Service responsibilities**
- [ ] Define citation creation requirements and permitted status transitions.
- [ ] Validate the cited user/vehicle relationship if citation issuance depends on registered vehicles.
- [ ] Validate offense codes and calculate the citation amount from the authoritative offense catalog if that is the intended rule.
- [ ] Decide whether multiple offenses can be attached to one citation and how total charges are calculated.
- [ ] Validate the enforced location.
- [ ] Generate/validate unique citation barcodes.
- [ ] Record citation and offense changes in their appropriate history tables.
- [ ] Implement comment visibility rules for public versus internal comments.
- [ ] Enforce who may issue, view, update, void, or comment on citations.
- [ ] Coordinate citation creation, offense assignments, and initial history records in a transaction.
- [ ] Coordinate changes and history writes in a transaction.
- [ ] Define how citation status and appeal status interact; the ERD shows both `citation_status_code` and `appeal_status_code` on `citations`.

**Controller boundary and suggested endpoints**
- [ ] `citation.controller.ts` owns citation detail, offense assignments, and comments because they are subordinate to a citation workflow.
- [ ] `POST /api/citations`
- [ ] `GET /api/citations`
- [ ] `GET /api/citations/:citationId`
- [ ] `PATCH /api/citations/:citationId`
- [ ] `PATCH /api/citations/:citationId/status`
- [ ] `GET /api/citations/:citationId/history`
- [ ] `GET /api/citations/:citationId/offenses`
- [ ] `PUT /api/citations/:citationId/offenses` or add/remove subroutes, depending on update semantics.
- [ ] `GET /api/citations/:citationId/comments`
- [ ] `POST /api/citations/:citationId/comments`
- [ ] `GET /api/citations/:citationId/comments/:commentId/history` if comment history is exposed.
- [ ] `GET /api/citation-lookups/statuses`
- [ ] `GET /api/citation-lookups/offenses`
- [ ] `GET /api/citation-lookups/locations`
- [ ] Add offense-catalog and location administration routes only if those management features are in scope.

### 3.5 Appeals

**ERD tables:** `appeals`, `appeal_status_codes`, `appeal_history_records`.

**Suggested files**
- [ ] `appeal.queries.ts`
- [ ] `appeal.model.ts`
- [ ] `appeal.dao.ts`
- [ ] `appeal.service.ts`
- [ ] `appeal.controller.ts` (or combine appeal routes into `citation.controller.ts` if appeals are always managed as a citation subresource)

**Query/DAO work**
- [ ] Create appeal insert, lookup, list, update, and status-change queries.
- [ ] Create appeal status-code lookup queries.
- [ ] Create appeal history insert and retrieval queries.
- [ ] Create appeal lookup by ID and by citation relationship once the relationship is confirmed.
- [ ] Create joined appeal detail query with status and associated citation information.

**Service responsibilities**
- [ ] Confirm and implement the citation-to-appeal relationship.
- [ ] Define who can submit an appeal and which citation statuses are appealable.
- [ ] Validate appeal submission deadlines and eligibility if required.
- [ ] Define allowed appeal status transitions and decision outcomes.
- [ ] Ensure only authorized reviewers can decide appeals.
- [ ] Coordinate appeal creation/status changes and history writes in transactions.
- [ ] Define what happens to citation status/amount when an appeal is approved or denied.
- [ ] Prevent duplicate appeals if only one appeal per citation is allowed.

**Controller boundary and suggested endpoints**
- [ ] If appeals are a distinct workflow, use `appeal.controller.ts`:
  - [ ] `POST /api/citations/:citationId/appeals`
  - [ ] `GET /api/appeals`
  - [ ] `GET /api/appeals/:appealId`
  - [ ] `PATCH /api/appeals/:appealId/status`
  - [ ] `GET /api/appeals/:appealId/history`
  - [ ] `GET /api/appeal-lookups/statuses`
- [ ] If appeals are only accessed through citations, keep the routes in `citation.controller.ts` and avoid a separate controller.
- [ ] Apply separate permissions for appeal submission and appeal adjudication.

---

## 4. Shared history/audit implementation

History tables are supporting data concerns, not necessarily standalone API resources.

- [ ] Define a shared history-entry convention: parent ID, action type, field name (when applicable), old value, new value, timestamp, and actor ID.
- [ ] Define allowed `action_type` values for each history table (create, update, status change, assignment, removal, etc.).
- [ ] Decide whether history is written by services or database triggers. Choose one authoritative mechanism per event to avoid duplicate rows.
- [ ] Prefer service-managed history when the application needs actor context and coordinated multi-table transactions.
- [ ] Create typed history models for each parent concern.
- [ ] Add DAO methods for history inserts and read-only history retrieval.
- [ ] Write history in the same transaction as the corresponding business change.
- [ ] Do not store passwords, password hashes, access tokens, or other secrets in audit values.
- [ ] Define whether history endpoints are available to end users, administrators, or internal staff only.
- [ ] Ensure history retrieval is paginated and ordered consistently.
- [ ] Decide whether history rows are immutable and prevent ordinary update/delete operations.

**History tables in the ERD**
- [ ] `user_history_records`
- [ ] `user_role_assignment_history_records`
- [ ] `vehicle_history_records`
- [ ] `permit_history_records`
- [ ] `permit_request_history_records`
- [ ] `citation_history_records`
- [ ] `citation_comment_history_records`
- [ ] `citation_offense_history_records`
- [ ] `citation_offense_code_history_records`
- [ ] `appeal_history_records`

---

## 5. Suggested project structure

Adapt folder names to the existing repository; the following is a logical organization, not a requirement to move working code.

Notes:

- [ ] Keep `auth` separate from user profile management if authentication/token workflows already exist.
- [ ] The `citation-offense`, `citation-comment`, and `enforced-location` concerns may start as files within the citations module; separate services are optional until their logic justifies them.
- [ ] The permit request and lot concerns may be folded into the permit service if they are simple, but retain clear DAO/query boundaries if they have distinct persistence operations.
- [ ] Do not create a controller solely because a table exists.
- [ ] Do not create a service solely because a lookup table exists.

---

## 6. Recommended end-to-end API development cycle

Build in dependency order. Complete and test a vertical slice before moving to the next feature: query/model → DAO → service → controller/routes → tests/documentation.

### Phase 0 — Confirm the database and API contracts

- [ ] Review the schema against the questions in section 2.
- [ ] Confirm foreign keys, indexes, unique constraints, nullability, and delete behavior.
- [ ] Confirm business rules for permit issuance, citation issuance, appeals, and role permissions.
- [ ] Confirm API route naming and response/error conventions.
- [ ] Confirm whether the existing database schema can be changed during the capstone or must be treated as fixed.
- [ ] Record unresolved decisions rather than embedding assumptions in code.

**Exit criteria:** The relationships and key business rules needed for the first implementation are understood.

### Phase 1 — Strengthen shared infrastructure

- [ ] Finalize database connector and executor behavior.
- [ ] Finalize transaction helper and transaction propagation to DAOs.
- [ ] Finalize parameterized query conventions and safe update builders.
- [ ] Finalize centralized error handling.
- [ ] Finalize request validation approach.
- [ ] Finalize authentication context and authorization helpers.
- [ ] Finalize response envelope, pagination, and filtering conventions.
- [ ] Add test setup for database integration and HTTP routes.

**Exit criteria:** A sample route can validate input, call a service, execute a DAO query, handle errors, and return a consistent response.

### Phase 2 — Complete authentication and user foundations

- [ ] Review existing authentication implementation before duplicating functionality.
- [ ] Complete user and credential model/DAO/service boundaries.
- [ ] Complete login credential lookup and password verification.
- [ ] Complete user retrieval and profile update.
- [ ] Complete credential/password update through the user controller or existing auth boundary.
- [ ] Complete role lookup and role assignment operations.
- [ ] Implement role-based authorization using persisted user roles.
- [ ] Implement user and role-assignment history.
- [ ] Test user creation, login, profile updates, password changes, role changes, and unauthorized access.

**Exit criteria:** Authenticated requests have a reliable user identity and role context; user and role operations work end-to-end.

### Phase 3 — Vehicles

- [ ] Implement vehicle models and lookup types.
- [ ] Implement vehicle queries and DAO methods.
- [ ] Implement vehicle service validation and ownership rules.
- [ ] Implement vehicle controller and routes.
- [ ] Implement lookup endpoints for colors, makes, and states.
- [ ] Implement vehicle history.
- [ ] Test CRUD, ownership restrictions, lookup validation, duplicate rules, and history.

**Exit criteria:** Authorized users can manage vehicles and retrieve the lookup data required to create them.

### Phase 4 — Lots and permit requests

- [ ] Implement lot models, queries, DAO, and service.
- [ ] Implement permit request models, queries, DAO, and service.
- [ ] Implement request status lookups.
- [ ] Implement request creation and retrieval.
- [ ] Implement request history.
- [ ] Implement request eligibility and duplicate-request rules.
- [ ] Implement lot capacity checks if required.
- [ ] Implement permit-request controller routes (or the permit controller boundary).
- [ ] Test request creation, validation, status handling, and authorization.

**Exit criteria:** A user can submit a valid permit request and authorized staff can retrieve and process it according to the defined workflow.

### Phase 5 — Permit issuance and management

- [ ] Implement permit assignment models, queries, DAO, and service.
- [ ] Implement permit status lookups.
- [ ] Implement permit issuance from an approved request if that is the intended workflow.
- [ ] Implement permit barcode handling.
- [ ] Implement expiration and active/expired status rules.
- [ ] Implement permit updates, cancellation, and revocation as required.
- [ ] Implement permit history.
- [ ] Ensure request approval, permit creation, status changes, and history are transactional.
- [ ] Implement permit routes and authorization.
- [ ] Test the complete request-to-issuance workflow, capacity rules, expiration, and duplicate prevention.

**Exit criteria:** The API can manage the full permit lifecycle without leaving partially completed multi-table operations.

### Phase 6 — Citation foundation and offense catalog

- [ ] Implement citation and offense-code models.
- [ ] Implement citation status and enforced-location lookups.
- [ ] Implement offense catalog queries and DAO methods.
- [ ] Implement citation queries and DAO methods.
- [ ] Implement citation creation and retrieval services.
- [ ] Implement offense assignment operations.
- [ ] Implement citation/offense history.
- [ ] Implement citation list filters and pagination.
- [ ] Implement citation routes and authorization.
- [ ] Test citation creation, multiple offenses, amount calculations, lookup validation, and history.

**Exit criteria:** Authorized staff can issue and retrieve citations with valid offense and location information.

### Phase 7 — Citation comments

- [ ] Implement comment models, queries, and DAO methods.
- [ ] Implement comment creation and retrieval.
- [ ] Implement public/private visibility enforcement.
- [ ] Implement comment history if comment edits/deletes are allowed.
- [ ] Add comment routes under the citation resource.
- [ ] Test that private comments never appear in unauthorized/public responses.

**Exit criteria:** Citation comments work with visibility and authorization rules enforced server-side.

### Phase 8 — Appeals

- [ ] Confirm the citation-to-appeal relationship in the schema.
- [ ] Implement appeal models, queries, DAO, and service.
- [ ] Implement appeal status lookup.
- [ ] Implement appeal submission and retrieval.
- [ ] Implement appeal review and status transitions.
- [ ] Implement appeal history.
- [ ] Define and implement how appeal decisions affect citation status and amount.
- [ ] Implement appeal routes and separate submission/reviewer permissions.
- [ ] Test eligibility, duplicate appeals, reviewer authorization, status transitions, and citation synchronization.

**Exit criteria:** The appeal lifecycle is complete and its effects on citations are consistent.

### Phase 9 — Cross-module integration and hardening

- [ ] Test user → vehicle → permit request → permit issuance workflows.
- [ ] Test user/vehicle → citation → offense/comment workflows.
- [ ] Test citation → appeal → decision workflows.
- [ ] Test role restrictions across every controller.
- [ ] Test transaction rollback for failures in multi-table operations.
- [ ] Test malformed input, missing records, duplicate records, invalid status transitions, and unauthorized resource access.
- [ ] Review SQL for injection risks, unsafe dynamic identifiers, and over-broad data retrieval.
- [ ] Review sensitive-data handling and ensure credentials never appear in logs/responses/history.
- [ ] Review pagination limits and expensive list/detail queries.
- [ ] Verify indexes using representative query patterns.
- [ ] Add API documentation and example requests/responses.
- [ ] Run the full automated test suite and resolve regressions.

**Exit criteria:** The API's primary workflows are covered, authorization is enforced, multi-table operations are reliable, and the API is documented.

---

## 7. Definition of done for each feature

Use this checklist before marking any module complete.

- [ ] Database relationships and business rules for the feature are confirmed.
- [ ] Models accurately represent persisted rows and API inputs/outputs.
- [ ] Queries are parameterized and update builders use allowlisted identifiers.
- [ ] DAO methods are typed and support transaction executors where needed.
- [ ] Services enforce validation, business rules, and authorization-relevant constraints.
- [ ] Multi-table changes are transactional.
- [ ] History/audit entries are written consistently and do not expose secrets.
- [ ] Controller validates input and delegates to services.
- [ ] Routes are registered and protected by the correct middleware.
- [ ] Responses and errors follow the shared API conventions.
- [ ] Unit/integration tests cover success, failure, authorization, and edge cases.
- [ ] API documentation is updated.

---

## 8. Suggested first implementation backlog

To keep the project manageable, start with the foundations and build a complete path through the system rather than creating every file for every module at once.

- [ ] **First:** Confirm schema questions and finalize shared database/transaction/error conventions.
- [ ] **Second:** Finish the existing authentication and user foundations, including role retrieval and authorization.
- [ ] **Third:** Complete vehicles, since vehicles are referenced by permits, permit requests, and citations.
- [ ] **Fourth:** Complete lots and permit requests, then permit issuance.
- [ ] **Fifth:** Complete citation issuance and offense assignment.
- [ ] **Sixth:** Add citation comments and visibility rules.
- [ ] **Seventh:** Add appeals after the citation relationship and status interaction are settled.
- [ ] **Last:** Complete cross-module testing, security review, query/index review, and API documentation.

## 9. Scope guardrails

- [ ] Do not build front-end components as part of this API checklist.
- [ ] Do not create a controller for every table; organize controllers around API resources and workflows.
- [ ] Do not create separate service files for trivial lookup tables unless they develop meaningful business logic.
- [ ] Do not let controllers execute SQL or coordinate transactions.
- [ ] Do not let DAOs enforce workflow rules or decide HTTP responses.
- [ ] Do not assume the ERD defines business rules that are not shown. Confirm unresolved relationships and lifecycle behavior before implementing them.
- [ ] Prefer completing and testing one vertical slice at a time over scaffolding every module before any workflow works.