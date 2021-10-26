import { basicUserAuth } from '../../tags.@.js'

export const summary = 'Finalize Password Reset'

export const description = `
To finalize the password reset, the new password and the single-use token from the email are provided on
the \`PATCH /forgotPassword\` request. The hashed token is verified against the hashed secret in the
\`password-reset-request\` object. If the hashes match the proof of email ownership is accepted, and the
users password is updated to the one on the request, after the appropriate salt+hash is applied.
`

export const tags = [ basicUserAuth.name ]

export const requestBody = {
	description: 'Finalize a password reset request.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				required: [ 'meta' ],
				properties: {
					meta: {
						type: 'object',
						required: [ 'token', 'password' ],
						properties: {
							token: {
								type: 'string',
								description: 'The single-use token as sent in the email.'
							},
							password: {
								type: 'string',
								description: 'The new password to set for the user.'
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
		description: 'The token and password were accepted, and the password for the user was reset. No body is returned.',
	},
	default: {
		$ref: '#/components/responses/error'
	}
}

export default async request => {
	await request.controller.password.resetUnauthorizedFinalize(request)
	return { status: 201 }
}
