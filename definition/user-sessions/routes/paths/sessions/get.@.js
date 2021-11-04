export const summary = 'Get User Sessions'

export const description = `
Fetch the list of the logged-in user's sessions.
`

export const tags = [ 'userSessions' ]

export const parameters = [
	{
		description: 'Filter the session list by some parameters, e.g. `filter[attributes.status]=ok`.',
		name: 'filter',
		in: 'query',
		// https://stackoverflow.com/questions/57808396/how-do-i-express-json-api-sparse-fieldsets-with-openapi-3-0
		style: 'deepObject',
		allowReserved: true,
		schema: {
			type: 'object',
			additionalProperties: {
				type: 'string',
			},
			example: {
				'attributes.status': 'ok',
			},
		},
	},
	{
		description: 'Sort the session list by some parameters, e.g. `sort=-meta.created`.',
		name: 'sort',
		in: 'query',
		allowReserved: true,
		schema: {
			type: 'string',
		},
	},
]

export const responses = {
	200: {
		description: 'The filtered list of user sessions, for the logged-in user.',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						data: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/session',
							},
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
	const { sessions } = await request.controller.session.list(request)
	return {
		status: 200,
		body: { data: sessions },
	}
}
