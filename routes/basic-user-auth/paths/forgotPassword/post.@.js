import { basicUserAuth } from '../../tags.@.js'

export const summary = 'Initiate Password Reset'

export const description = `
Users initiate a password reset flow, in the case where they forgot their login password, by sending
a single-use secret token (as part of a link) to their account email address, thus verifying ownership
of the email address. This creates a session-like \`password-reset-request\` object in the database
associated with the user, and sends an email to that address, if it exists in the database.

To finalize the password reset, see the \`PATCH /forgotPassword\` request.
`

export const tags = [ basicUserAuth.name ]

export const requestBody = {
	description: 'Request a password reset email.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				required: [ 'meta' ],
				properties: {
					meta: {
						type: 'object',
						required: [ 'email' ],
						properties: {
							email: {
								type: 'string',
								description: 'The email address to send the password reset email to.'
							}
						}
					}
				}
			}
		}
	}
}

export const responses = {
	201: {
		description: 'The password reset request was accepted, and an email sent. No body is returned.',
	},
	default: {
		$ref: '#/components/responses/error'
	}
}

export default async request => {
	await request.controller.password.resetUnauthorized({ email: request.body?.meta?.email })
	return { status: 201 }
}
