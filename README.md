# Glopen Routes

Some common routes that I find myself needing often, in [glopen](https://github.com/saibotsivad/glopen) format, with [JSON:API](https://jsonapi.org/) schemas.

## Install

The usual way:

```shell
npm install @saibotsivad/glopen-routes
```

To use with `glopen`, you can either include everything in one go, or explicitly grab each Operation Object.

(Each [definition](./definition) has an `openapi` folder or a `routes` folder, or both. The `routes` folder separates the Operation Objects out, so they can be explicitly grabbed and still allow merging in the core `openapi` parts. You'll see that below.)

### Everything At Once

You'll need to merge in the [shared items](./definition/shared), which are shared across all routes, and for each named definition you'll need to merge in the `openapi` and `routes` folder:

```js
// glopen.config.js
export default {
	merge: [
		// The shared components are always required
		{ dir: './node_modules/@saibotsivad/glopen-routes/definition/shared/openapi' },
		// For each named definition, the 'openapi' and 'routes'
		{ dir: './node_modules/@saibotsivad/glopen-routes/definition/basic-user-auth/openapi' },
		{ dir: './node_modules/@saibotsivad/glopen-routes/definition/basic-user-auth/routes' },
	],
}
```

For copy+paste convenience, here's an alternate way that's a little cleaner if you have more to import:

```js
// glopen.config.js
import { join } from 'node:path'
const folder = './node_modules/@saibotsivad/glopen-routes/definition'
export default {
	merge: [
		// The shared components are always required
		{ dir: join(folder, 'shared/openapi') },
		// For each named definition, the 'openapi' and 'routes'
		{ dir: join(folder, 'basic-user-auth/openapi') },
		{ dir: join(folder, 'basic-user-auth/routes') },
	],
}
```

### Explicit Import

If you want to be explicit about each Operation Object that you bring in to your project, or if you want to rename the paths entirely, you can create a file and import->export the route, overwriting the bits that you want.

For example: if you simply want to rename `GET /user` to `GET /currentUser` you could do:

```js
// $PATH/currentUser/get.@.js
// re-export named exports
export * from '@saibotsivad/glopen-routes/definition/basic-user-auth/routes/paths/user/get.@.js'
// re-export the default, which is the route handler
export { default } from '@saibotsivad/glopen-routes/definition/basic-user-auth/routes/paths/user/get.@.js'
```

Or, if you instead want to customize the `security` and `tags` for each:

```js
// $YOUR_PROJECT/routes/api/v1/user/get.@.js
// re-export named exports
export * from '@saibotsivad/glopen-routes/definition/basic-user-auth/routes/paths/user/get.@.js'
// re-export the default, which is the route handler
export { default } from '@saibotsivad/glopen-routes/definition/basic-user-auth/routes/paths/user/get.@.js'
// exporting `security` here will overwrite whatever it was in the re-exported JS file
export const security = [ { myBetterAuth: [] } ]
// exporting `tags` will override the exported tags list
// if you want to merge the lists, you'll need to import it explicitly
import { tags as tagsList } from '@saibotsivad/glopen-routes/definition/basic-user-auth/routes/paths/user/get.@.js'
// and then export the merged list
export const tags = [ ...tagsList, 'my-custom-tag' ]
```

In your config file you'd still need to merge in the shared components and the `openapi` folder for the named definition:

```js
// glopen.config.js
export default {
	merge: [
		// The shared components are still always required
		{ dir: './node_modules/@saibotsivad/glopen-routes/definition/shared/openapi' },
		// For explicit imported routes, you only need to merge the `openapi` part
		{ dir: './node_modules/@saibotsivad/glopen-routes/definition/basic-user-auth/openapi' },
		// Then merge in your own project routes
		{ dir: './routes' },
	],
}
```

This approach requires that you recreate the folder structure for all route methods, e.g. in the `basic-user-auth` there are
at least 10 files you'd need to create in order to have all functionality explicitly named.

(Note that `glopen` will merge first-to-last, so as long as you aren't renaming any files, you could be explicit with
one or two Operation Objects, then merge the named definition first and your explicit folder last, and yours would end up
overwriting the original.)

## Overview

The route handlers are async and take a request object with a few things that need to be initialized:

- `body: Object` - The request body for all these routes is JSON so, for routes that need it, you'll need a body-parser that parses the JSON in advance.
- `controller: Object` - The set of initialized controllers, which are essentially the functions that do the actual work, like `user.create`. (Each route lists the controllers it requires.)

Instead of setting properties on a response object, like Express etc., these route handlers return an object with the following properties:

- `status: Number` - The response status code.
- `headers: Object` - These headers should be merged with any other headers, overwriting base headers if any exist.
- `body: Object | String | null` - The response body, if it exists.
- `json: Boolean` - The response `body` must be passed through a JSON stringify function prior to being returned.

You can grab as few or as many routes as you like, but for all routes you'll also need to grab the `shared` folder to get the schema definitions shared across all routes, and for explicit re-exports you'll need to grab the `openapi` folder for each named definition.

## Shared Models

These are the models used across all routes, in request and response bodies.

- [response: `error`](./shared/components/responses/error.@.js)
- [schema: `error`](./shared/components/schemas/error.@.js)
- [schema: `meta`](./shared/components/schemas/meta.@.js)

## Basic User Auth

To use in `glopen` set the route:

```js
// glopen.config.js
export default {
	merge: [
		{
			// required for the models shared across routes
			dir: './node_modules/@saibotsivad/glopen-routes/definition/shared/openapi',
			ext: '@',
		},
		{
			// required for the basic-user-auth routes
			dir: './node_modules/@saibotsivad/glopen-routes/definition/basic-user-auth/openapi',
			ext: '@',
		},
		{
			// merge all basic-user-auth routes
			dir: './node_modules/@saibotsivad/glopen-routes/definition/basic-user-auth/routes',
			// your api path prefix (optional)
			api: '/api/v1/auth',
			ext: '@',
		},
	],
}
```

These are the models used in request and response bodies.

- [`session`](definition/basic-user-auth/openapi/components/schemas/session.@.js)
- [`user`](definition/basic-user-auth/openapi/components/schemas/user.@.js)

The routes are:

#### [`POST /forgotPassword`](definition/basic-user-auth/routes/paths/forgotPassword/post.@.js)

Initiate a password reset request via sending an email.

- `request.controller.password.resetUnauthorized: (request: Request) => null`

#### [`PATCH /forgotPassword`](definition/basic-user-auth/routes/paths/forgotPassword/patch.@.js)

Use emailed single-use secret to finalize password reset.

- `request.controller.password.resetUnauthorizedFinalize: (request: Request) => { cookie?: String } | undefined`

#### [`GET /logout`](definition/basic-user-auth/routes/paths/logout/get.@.js)

Mark current cookie session as invalid.

- `request.controller.session.logout: (request: Request) => { cookie: String }`

#### [`POST /sessions`](definition/basic-user-auth/routes/paths/sessions/post.@.js)

Provide login information to create a new session.

- `request.controller.session.create: (request: Request) => { cookie: String, auth?: { href: String, meta: { expires: String } }`

#### [`GET /sessions`](definition/basic-user-auth/routes/paths/sessions/get.@.js)

Retrieve a list of the logged-in user's sessions.

- `request.controller.session.list: (request: Request) => { sessions: Array<Session> }`

#### [`DELETE /sessions/{sessionId}`](definition/basic-user-auth/routes/paths/sessions/{sessionId}/delete.@.js)

Mark specific cookie session as invalid.

- `request.controller.session.remove: (request: Request) => null`

#### [`PATCH /sessions/{sessionId}`](definition/basic-user-auth/routes/paths/sessions/{sessionId}/patch.@.js)

Finalize login flow when 2FA is enabled.

- `request.controller.session.finalize: (request: Request) => null`

#### [`POST /user`](definition/basic-user-auth/routes/paths/user/post.@.js)

Create a new user.

- `request.controller.user.create: (request: Request) => { user: User, cookie?: String }`

#### [`GET /user`](definition/basic-user-auth/routes/paths/user/get.@.js)

Get the user object of the logged-in user.

- `request.controller.user.get: (request: Request) => { user: User }`

#### [`PATCH /user`](definition/basic-user-auth/routes/paths/user/patch.@.js)

Sparse update of the logged-in users user object.

- `request.controller.user.patch: (request: Request) => { user: User }`

## License

Published and released under the [Very Open License](http://veryopenlicense.com).

If you need a commercial license, [contact me here](https://davistobias.com/license?software=glopen-routes).
