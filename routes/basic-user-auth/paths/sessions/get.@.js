import { basicUserAuth } from '../../tags.@.js'

export const summary = 'Get User Sessions'

export const description = `
Fetch the list of the logged-in user's sessions.
`

export const tags = [ basicUserAuth.name ]

export const parameters = [
	{
		description: 'Filter the session list by some parameters, e.g. `filter[attributes.status]=ok`.',
		name: 'filter',
		in: 'query',
		style: 'deepObject',
		allowReserved: true,
		schema: {
			type: 'object',
			additionalProperties: { type: 'string' },
			example: {
				'attributes.status': 'ok'
			}
		}
	}
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
								$ref: '#/components/schemas/session'
							}
						}
					}
				}
			}
		}
	},
	default: {
		$ref: '#/components/responses/error'
	}
}

export default async request => {
	const { user } = await request.controller.session.list(request)
	return {
		status: 200,
		body: { data: user }
	}
}
