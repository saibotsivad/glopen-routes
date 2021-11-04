export const description = `
Session-based authentication, typically browser based, which requires the user to
authenticate using the \`POST /sessions\` route, and 2FA if enabled.
`

export const type = 'apiKey'

export const name = 'SESSION'

export const location = 'cookie' // TODO glopen maps in => location? 'in' is reserved, hard to use :(

export default async request => {
	request.currentUser = await request.controller.authenticate.sessionCookie(request)
	return request
}
