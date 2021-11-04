export const summary = 'Get User'

export const description = `
Fetch the logged-in user's \`user\` resource, authenticating with the session cookie.
`

export const tags = [ 'basicUserAuth' ]

export const responses = {
	200: {
		description: 'The email and password were accepted, and a session was created. No body is returned.',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						data: {
							$ref: '#/components/schemas/user',
						},
					},
				},
			},
		},
	},
	default: {
		$ref: '#/components/responses/error',
	},
}

export default async request => {
	const { user } = await request.controller.user.get(request)
	return {
		status: 200,
		body: { data: user },
	}
}
