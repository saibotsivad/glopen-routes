# glopen-routes

Some common routes that I find myself needing often, in [glopen](https://github.com/saibotsivad/glopen) format, with [JSON:API](https://jsonapi.org/) schemas.

The route handlers are async and take a request object with a few things that need to be initialized:

- `body: Object` - The request body for all these routes is JSON, so you'll need a body-parser that parses the JSON in advance.
- `controller: Object` - The set of initialized controllers, which are essentially the functions that do the actual work, like `user.create`. Each set of routes will list the controllers it requires.

The route handlers do not set properties on the response object, instead they will return an object with the following properties:

- `status: Number` - The response status code.
- `headers: Object` - These headers should be merged with any other headers, overwriting base headers if any exist.
- `body: Object | String | null` - The response body.
- `json: Boolean` - The response `body` must be passed through a JSON stringify function prior to being returned.

You can grab as little or as many as you like, but for all routes you'll also need to grab the `shared` folder to get the schema definitions shared across all routes.

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

The routes are:

- [`POST /forgotPassword`](./routes/basic-user-auth/paths/forgotPassword/post.@.js)  - Initiate a password reset request via sending an email.
- [`PATCH /forgotPassword`](./routes/basic-user-auth/paths/forgotPassword/patch.@.js)  - Use emailed single-use secret to finalize password reset.
- [`GET /logout`](./routes/basic-user-auth/paths/logout/get.@.js)  - Mark current cookie session as invalid.
- [`DELETE /sessions/{sessionId}`](./routes/basic-user-auth/paths/sessions/{sessionId}/delete.@.js) - Mark specific cookie session as invalid.
- [`POST /sessions`](./routes/basic-user-auth/paths/sessions/post.@.js)  - Provide login information to create a new session.
- [`GET /sessions`](./routes/basic-user-auth/paths/sessions/get.@.js)  - Retrieve a list of the logged-in user's sessions.
- [`POST /user`](./routes/basic-user-auth/paths/user/post.@.js)  - Create a new user.
- [`GET /user`](./routes/basic-user-auth/paths/user/get.@.js)  - Get the user object of the logged-in user.

## Models

These are the models used in request and response bodies.

### User

- id
- type = user
- attributes
	- status
	- username
	- email
	- hashed password
	- etc...
- meta
	- created
	- updated
	- deleted

### Session

- id
- type = session
- attributes
	- status (approved or not yet, e.g. email, 2fa, whatever)
	- ip address
	- device / OS info
	- etc...
- meta
	- created
	- updated
	- deleted

## License

Published and released under the [Very Open License](http://veryopenlicense.com).

If you need a commercial license, [contact me here](https://davistobias.com/license?software=glopen-routes).
