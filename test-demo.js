// This file uses OpenAPI-Enforcer to validate that the built definition is valid.
// https://byu-oit.github.io/openapi-enforcer/guide/validate-document

import Enforcer from 'openapi-enforcer'

const NAME = process.argv[2]

import(`./demo/${NAME}.js`)
	.then(({ definition }) => {
		Enforcer(
			// clone here to break out the "default" from the imports
			JSON.parse(JSON.stringify(definition)),
			// resolve references
			{ fullResult: true },
		)
			.then(function ({ error, warning }) {
				if (warning) console.log('Warnings:', warning)
				if (error) console.log('Errors:', error)
				// exit 1 with warnings, but if that gets to be too hard we can rethink
				process.exit(warning || error ? 1 : 0)
			})
	})
