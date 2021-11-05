export default {
	description: 'Sort the API token list by some parameters, e.g. `sort=-meta.created`.',
	name: 'sort',
	in: 'query',
	allowReserved: true,
	schema: {
		type: 'string',
	},
}
