export default {
	merge: [
		{
			// required for the models shared across routes
			dir: './_shared',
		},
		{
			dir: './routes/basic-user-auth',
		},
	],
}
