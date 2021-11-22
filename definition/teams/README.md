# Teams

These routes manage teams, which are things allowing shared ownership of some resources.

To use in `glopen` (you **must** include [single-user](../single-user/README.md) *first*):

```js
// glopen.config.js
import { shared, singleUser, teams } from '@saibotsivad/glopen-routes'
export default {
	merge: [
		...shared(),
		...singleUser({
			api: '/api/v1' // optional
		}),
		...teams({
			api: '/api/v1' // optional
		})
	],
}
```

The components are:

- [`parameter: teamId`](./openapi/components/parameters/teamId.@.js)
- [`parameter: teamAdminId](./openapi/components/parameters/teamAdminId.@.js)
- [`schema: team`](./openapi/components/schemas/team.@.js)
- [`schema: teamRelationship`](./openapi/components/schemas/teamRelationship.@.js)
- [`schema: user`](./openapi/components/schemas/user.@.js) (modifies the single-user schema object)
- [`tag: teams`](./openapi/tags.@.js)
- [shared components](../_shared/README.md)

The routes are:

##### [`POST /teams`](./routes/paths/teams/post.@.js)

Create a new team. The requesting must be made an admin of the created team, but other users could be added at creation as well.

- `request.controller.team.create: (request: Request) => { team: Team }`

##### [`GET /teams`](./routes/paths/teams/get.@.js)

Fetch the list of teams the requesting user is allowed to see.

- `request.controller.team.list: (request: Request) => { teams: Array<Team> }`

##### [`PATCH /teams/{teamId}`](./routes/paths/teams/{teamId}/patch.@.js)

Sparse update to a team, if the requesting user is an admin of the team.

- `request.controller.team.sparseUpdate: (request: Request) => { team: Team }`

##### [`POST /teams/{teamId}/relationships/admins`](./routes/paths/teams/{teamId}/relationships/admins/post.@.js)

Add one or more admins to the team, if the requesting user also is an admin.

- `await request.controller.team.addAdmins: (request: Request) => { admins: Array<UserRelationship> }`

##### [`DELETE /teams/{teamId}/relationships/admins/{userId}`](./routes/paths/teams/{teamId}/relationships/admins/{userId}/delete.@.js)

Remove an admin from a team, if the requesting user is an admin.

- `request.controller.team.removeAdmin: (request: Request) => null`

##### [`POST /users/{userId}/relationships/teams`](./routes/paths/users/{userId}/relationships/teams/post.@.js)

Add one or more users as members of the team, if the requesting user is an admin.

- `await request.controller.team.addMembers: (request: Request) => { users: Array<TeamRelationship> }`

##### [`DELETE /users/{userId}/relationships/teams/{teamId}`](./routes/paths/users/{userId}/relationships/teams/{teamId}/delete.@.js)

Remove a user as a member of a team, if the requesting user is an admin.

- `request.controller.team.removeMember: (request: Request) => null`
