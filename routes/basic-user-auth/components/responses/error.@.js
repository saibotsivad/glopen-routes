export default {
	description: 'A list of one or more errors from the server.',
	content: {
		'application/json': {
			schema: {
				type: 'object',
				properties: {
					error: {
						type: 'array',
						items: {
							$ref: '#/components/schemas/error'
						}
					}
				}
			}
		}
	}
}
