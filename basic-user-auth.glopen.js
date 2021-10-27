export default {
	merge: [
		{
			// required for the models shared across routes
			dir: './shared'
		},
		{
			dir: './routes/basic-user-auth'
		},
	],
}
