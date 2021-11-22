export const summary = 'Delete Team Admin'

export const description = 'Remove an admin from a team.'

export const tags = [ 'teams' ]

export const security = [
	{ cookie: [] },
	{ api: [] },
]

export const parameters = [
	{ $ref: '#/components/parameters/teamId' },
	{ $ref: '#/components/parameters/userId' },
]

export const responses = {
	204: {
		description: 'The user was removed as an admin.',
	},
	403: {
		description: 'The requesting user is not an admin of the team, and therefore is not allowed to remove admins.',
		content: {
			'application/json': {
				schema: {
					$ref: '#/components/schemas/errorBody',
				},
			},
		},
	},
	default: {
		$ref: '#/components/responses/error',
	},
}

export default async request => {
	await request.controller.team.removeAdmin(request)
	return {
		status: 204,
	}
}
