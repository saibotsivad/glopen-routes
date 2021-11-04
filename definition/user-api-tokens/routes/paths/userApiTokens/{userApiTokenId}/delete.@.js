export const summary = 'Delete User API Token'

export const description = 'Fully delete an API token owned by a user.'

export const tags = [ 'userApiTokens' ]

export const parameters = [
	{ $ref: '#/components/parameters/userApiTokenId' },
]

const roles = [ 'userApiToken:remove:*:*:{{self.id}}:*' ]
export const security = [
	{ cookie: roles },
	{ api: roles },
]

export const responses = {
	204: {
		description: 'The users API token was fully deleted. No body is returned.',
	},
	default: {
		$ref: '#/components/responses/error',
	},
}

export default async request => {
	await request.controller.userApiToken.remove(request)
	return { status: 204 }
}
