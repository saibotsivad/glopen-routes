export const summary = 'Get User API Tokens'

export const description = `
Fetch the list of the logged-in user's API tokens.
`

export const tags = [ 'userApiTokens' ]

export const parameters = [
	{
		description: 'Filter the API token list by some parameters, e.g. `filter[attributes.status]=ok`.',
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
		description: 'Sort the API token list by some parameters, e.g. `sort=-meta.created`.',
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
		description: 'The filtered list of the users API tokens.',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						data: {
							type: 'array',
							items: {
								$ref: '#/components/schemas/userApiToken',
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
	const { userApiTokens } = await request.controller.userApiToken.list(request)
	return {
		status: 200,
		body: { data: userApiTokens },
	}
}
