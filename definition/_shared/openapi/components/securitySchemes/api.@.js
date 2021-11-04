export const description = `
Token based access, usually used for programmatic access by other services
or tooling. Requires the user to create an API token and assign it roles.
`

export const type = 'apiKey'

export const name = 'x-api-key'

// TODO glopen maps in => location? 'in' is reserved, hard to use :(
export const location = 'header'

export default async request => {
	request.currentUser = await request.controller.authenticate.apiToken(request)
	return request
}
