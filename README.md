# Glopen Routes

Some common routes that I find myself needing often, in [glopen](https://github.com/saibotsivad/glopen) format, with [JSON:API](https://jsonapi.org/) schemas.

## Install

The usual way:

```shell
npm install @saibotsivad/glopen-routes
```

To use with `glopen`, include the routes you want to use, and the shared parts:

```js
// glopen.config.js
export default {
	merge: [
		{ dir: './node_modules/glopen-routes/shared' },
		{ dir: './node_modules/glopen-routes/routes/basic-user-auth' },
	],
}
```

## Overview

The route handlers are async and take a request object with a few things that need to be initialized:

- `body: Object` - The request body for all these routes is JSON, so you'll need a body-parser that parses the JSON in advance.
- `controller: Object` - The set of initialized controllers, which are essentially the functions that do the actual work, like `user.create`. (Each route lists the controllers it requires.)

Instead of setting properties on a response object, like Express etc., these route handlers return an object with the following properties:

- `status: Number` - The response status code.
- `headers: Object` - These headers should be merged with any other headers, overwriting base headers if any exist.
- `body: Object | String | null` - The response body, if it exists.
- `json: Boolean` - The response `body` must be passed through a JSON stringify function prior to being returned.

You can grab as few or as many routes as you like, but for all routes you'll also need to grab the `shared` folder to get the schema definitions shared across all routes.

## Basic User Auth

To use in `glopen` set the route:

```js
// glopen.config.js
export default {
	merge: [
		{
			// required for the models shared across routes
			dir: './node_modules/glopen-routes/shared',
			ext: '@',
		},
		{
			dir: './node_modules/glopen-routes/routes/basic-user-auth',
			api: '/api/v1/auth',
			ext: '@',
		},
	],
}
```

These are the models used in request and response bodies.

- [`session`](./routes/basic-user-auth/components/schemas/session.@.js)
- [`user`](./routes/basic-user-auth/components/schemas/user.@.js)

The routes are:

#### [`POST /forgotPassword`](./routes/basic-user-auth/paths/forgotPassword/post.@.js)

Initiate a password reset request via sending an email.

- `request.controller.password.resetUnauthorized: (request: Request) => null`

#### [`PATCH /forgotPassword`](./routes/basic-user-auth/paths/forgotPassword/patch.@.js)

Use emailed single-use secret to finalize password reset.

- `request.controller.password.resetUnauthorizedFinalize: (request: Request) => null`

#### [`GET /logout`](./routes/basic-user-auth/paths/logout/get.@.js)

Mark current cookie session as invalid.

- `request.controller.session.logout: (request: Request) => { cookie: String }`

#### [`POST /sessions`](./routes/basic-user-auth/paths/sessions/post.@.js)

Provide login information to create a new session.

- `request.controller.session.create: (request: Request) => { cookie: String, auth?: { href: String, meta: { expires: String } }`

#### [`GET /sessions`](./routes/basic-user-auth/paths/sessions/get.@.js)

Retrieve a list of the logged-in user's sessions.

- `request.controller.session.list: (request: Request) => { sessions: Array<Session> }`

#### [`DELETE /sessions/{sessionId}`](./routes/basic-user-auth/paths/sessions/{sessionId}/delete.@.js)

Mark specific cookie session as invalid.

- `request.controller.session.remove: (request: Request) => null`

#### [`PATCH /sessions/{sessionId}`](./routes/basic-user-auth/paths/sessions/{sessionId}/patch.@.js)

Finalize login flow when 2FA is enabled.

- `request.controller.session.finalize: (request: Request) => null`

#### [`POST /user`](./routes/basic-user-auth/paths/user/post.@.js)

Create a new user.

- `request.controller.user.create: (request: Request) => { user: User, cookie?: String }`

#### [`GET /user`](./routes/basic-user-auth/paths/user/get.@.js)

Get the user object of the logged-in user.

- `request.controller.user.get: (request: Request) => { user: User }`

#### [`PATCH /user`](./routes/basic-user-auth/paths/user/patch.@.js)

Sparse update of the logged-in users user object.

- `request.controller.user.patch: (request: Request) => { user: User }`

## Shared Models

These are the models used across all routes, in request and response bodies.

- [response: `error`](./shared/components/responses/error.@.js)
- [schema: `error`](./shared/components/schemas/error.@.js)
- [schema: `meta`](./shared/components/schemas/meta.@.js)

## License

Published and released under the [Very Open License](http://veryopenlicense.com).

If you need a commercial license, [contact me here](https://davistobias.com/license?software=glopen-routes).
