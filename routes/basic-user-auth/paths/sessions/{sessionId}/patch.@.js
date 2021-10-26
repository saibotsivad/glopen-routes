import { basicUserAuth } from '../../../tags.@.js'

export const summary = 'Finalize Session (2FA/OTP)'

export const description = `
If 2FA is enabled during login, the user must call this endpoint with the OTP digits. If the
implementation uses symmetric encryption of the 2FA secret, the users password must also be
provided. If this request is successful, the session \`status\` is marked \`ok\`.
`

export const tags = [ basicUserAuth.name ]

export const requestBody = {
	description: 'Finalize a session using OTP digits and password.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				required: [ 'meta' ],
				properties: {
					meta: {
						type: 'object',
						required: [ 'otp', 'password' ],
						properties: {
							otp: {
								type: 'string',
								description: 'The OTP digits associated with the 2FA secret.'
							},
							password: {
								type: 'string',
								description: 'The password used to log in the user.'
							}
						}
					}
				}
			}
		}
	}
}

export const responses = {
	204: {
		description: 'The OTP digits and password were accepted, and the session was marked as `ok`. No body is returned.',
	},
	default: {
		$ref: '#/components/responses/error'
	}
}

export default async request => {
	await request.controller.session.finalize(request)
	return { status: 204 }
}
