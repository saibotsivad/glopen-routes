# `Glopen-Routes` Available Definitions

Routes that fall under `/self/*` are for managing resources owned by the currently logged-in user. All other routes are meant to have access controlled by other role/permission configuration as your application requirements dictate.

## [Shared](./_shared)

Contains the OpenAPI components that are common to all definitions.

## Self-Owned Routes

### [Single User](./single-user)

Adds the ability to create a new user from an unsecured endpoint, and then fetch and update ones own user resource. *These routes do not provide session management.*

### [User Sessions](./user-sessions)

Adds the ability to create sessions via normal username+password login, routes for viewing and managing ones own sessions, and the normal "forgot my password" routes. Session creation also defines an optional 2FA flow.

### [User API Tokens](./user-api-tokens)

Adds the ability for a single user to create and manage API tokens which represent their own user when used. Tokens have an optional expiration date expired, so you can manage forced key rotation as your application requirements dictate.

### [User Tasks](./user-tasks)

Adds routes for creating simple tasks (with names and long-form details) that are owned and managed by a single user.

## Administrative Routes

### [User Management](./user-management)

Adds the ability to list and manage all users. Your application design will dictate role/permission requirements for these routes.
