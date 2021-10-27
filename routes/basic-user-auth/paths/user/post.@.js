import { basicUserAuth } from '../../tags.@.js'

export const summary = 'Create User'

export const description = `
Create a user by providing an email address. If the user already exists, return an error.
`

export const tags = [ basicUserAuth.name ]

export const requestBody = {
	description: 'Create a new user.',
	content: {
		'application/json': {
			schema: {
				$ref: '#/components/schemas/user'
			}
		}
	}
}

export const responses = {
	201: {
		description: 'The user and session were created, and the user object and (optionally) session are returned.',
		headers: {
			'Set-Cookie': {
				description: 'The session cookie is set.',
				schema: { type: 'string' }
			}
		},
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						data: {
							$ref: '#/components/schemas/user'
						},
						included: {
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
	const { user, cookie } = await request.controller.user.create(request)
	const response = {
		status: 201,
		body: { data: user }
	}
	if (cookie) {
		response.headers = { 'Set-Cookie': cookie }
	}
	return response
}
