export default {
	type: 'object',
	properties: {
		id: {
			type: 'string',
		},
		type: {
			type: 'string',
			enum: [ 'user' ]
		},
		meta: {
			$ref: '#/components/schemas/meta'
		},
		attributes: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					description: 'The email address of the user.'
				},
				emailSecret: {
					type: 'string',
					description: 'The hashed and salted secret sent in the verification email as part of the link. Can be removed after verification is completed.'
				},
				verificationExpires: {
					type: 'string',
					format: 'date-time',
					description: 'The ISO-8601 date+time after which the emailed verification link should be considered invalid, and a new secret generated and email sent. Can be removed after verification is completed.'
				},
				verified: {
					type: 'string',
					format: 'date-time',
					description: 'The date+time that the email address was verified, e.g. the user clicked an emailed link to verify ownership of that address.'
				},
				password: {
					type: 'string',
					description: 'The hashed and salted password, used to authenticate login requests.\n\nNote that there is no universal standard, but most tooling will understand the format `$algorithm$parameters$salt$output`'
				},
				otpSecret: {
					type: 'string',
					description: 'The OTP secret used if 2FA is enabled. A suggested storage approach is to use the users password as a symmetric encryption key, which would require it once on initial login and once on OTP confirmation. Look at OWASP for guidelines on how to store this secret: https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html'
				},
				name: {
					type: 'string',
					description: 'The name used in website and email display areas. Can be a full given name, username, or similar.'
				},
			}
		}
	}
}
