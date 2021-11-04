// This is a JSON:API error object. Description text lifted from https://jsonapi.org/format/#error-objects
// which is made available under the CC0 1.0 Universal.

export default {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			description: 'A unique identifier for this particular occurrence of the problem.',
		},
		links: {
			type: 'object',
			description: 'A "links" object.',
			properties: {
				about: {
					type: 'string',
					description: 'A link that leads to further details about this particular occurrence of the problem.',
				},
			},
		},
		status: {
			type: 'string',
			description: 'The HTTP status code applicable to this problem, expressed as a string value.',
		},
		code: {
			type: 'string',
			description: 'An application-specific error code, expressed as a string value.',
		},
		title: {
			type: 'string',
			description: 'The short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.',
		},
		detail: {
			type: 'string',
			description: 'A human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.',
		},
		source: {
			type: 'object',
			description: 'An object containing references to the source of the error.',
			properties: {
				pointer: {
					type: 'string',
					description: 'A JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].',
				},
				parameter: {
					type: 'string',
					description: 'A string indicating which URI query parameter caused the error.',
				},
			},
		},
		meta: {
			type: 'object',
			description: 'A meta object containing non-standard meta-information about the error.',
		},
	},
}
