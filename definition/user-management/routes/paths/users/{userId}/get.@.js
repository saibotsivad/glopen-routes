export const summary = 'Get Non-Self User'

export const description = `
Fetch the user object for an identified user. The requesting user must have appropriate permissions.
`

export const tags = [ 'userManagement' ]

export const security = [
	{ cookie: [] },
	{ api: [] },
]

export const parameters = [
	{ $ref: '#/components/parameters/userId' },
]

export { default, responses } from '../../../../../single-user/routes/paths/self/get.@.js'
