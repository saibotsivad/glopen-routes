## User Sessions

These routes manage a users sessions, e.g. when they log in via the webapp.

To use in `glopen`:

```js
// glopen.config.js
import { shared, userSessions } from '@saibotsivad/glopen-routes'
export default {
	merge: [
		...shared(),
		...userSessions({
			api: '/api/v1' // optional
		})
	],
}
```

The components are:

- [`parameter: sessionId`](./openapi/components/parameters/sessionId.@.js)
- [`schema: session`](./openapi/components/schemas/session.@.js)
- [`tag: userSessions`](./openapi/tags.@.js)
- [shared components](../_shared/README.md)

- The routes are:

##### [`POST /forgotPassword`](./routes/paths/forgotPassword/post.@.js)

Initiate a password reset request via sending an email.

- `request.controller.password.resetUnauthorized: (request: Request) => null`

##### [`PATCH /forgotPassword`](./routes/paths/forgotPassword/patch.@.js)

Use emailed single-use secret to finalize password reset.

- `request.controller.password.resetUnauthorizedFinalize: (request: Request) => { cookie?: String } | undefined`

##### [`GET /logout`](./routes/paths/logout/get.@.js)

Mark current cookie session as invalid.

- `request.controller.session.logout: (request: Request) => { cookie: String }`

##### [`POST /sessions`](./routes/paths/sessions/post.@.js)

Provide login information to create a new session.

- `request.controller.session.create: (request: Request) => { cookie: String, auth?: { href: String, meta: { expires: String } }`

##### [`GET /sessions`](./routes/paths/sessions/get.@.js)

Retrieve a list of the logged-in user's sessions.

- `request.controller.session.list: (request: Request) => { sessions: Array<Session> }`

##### [`DELETE /sessions/{sessionId}`](./routes/paths/sessions/{sessionId}/delete.@.js)

Mark specific cookie session as invalid.

- `request.controller.session.remove: (request: Request) => null`

##### [`PATCH /sessions/{sessionId}`](./routes/paths/sessions/{sessionId}/patch.@.js)

Finalize login flow when 2FA is enabled.

- `request.controller.session.finalize: (request: Request) => null`
