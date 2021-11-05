import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = join(dirname(fileURLToPath(import.meta.url)), 'definition')
const make = name => ([
	{
		dir: join(__dirname, name,'openapi'),
		ext: '@',
	},
	{
		dir: join(__dirname, name, 'routes'),
		ext: '@',
	},
])

export const shared = () => [{ dir: join(__dirname, '_shared', 'openapi'), ext: '@' }]
export const singleUser = () => make('single-user')
export const userApiTokens = () => make('user-api-tokens')
export const userManagement = () => make('user-management')
export const userSessions = () => make('user-sessions')

export const all = () => ([
	...shared(),
	...singleUser(),
	...userApiTokens(),
	...userManagement(),
	...userSessions(),
])
