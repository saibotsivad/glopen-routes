/*

What about if you had
roles
like
$CONTROLLER_NAME.$FUNCTION
aka `userApiToken.create`
and `userApiToken.sparseUpdate`
okay so
say that creating API tokens was behind a paywall
you would need to be granted the `userApiToken.create` role, which would be given when you became a paying user
but you'd also need `userApiToken.sparseUpdate` at the same time
also if there are organizations or teams you would want to be able to create tokens just for the orgs/teams you are in
and also for yourself
so maybe it's like
$CONTROLLER_NAME.$FUNCTION.$ORG_ID.$TEAM_ID.$OWNER_ID
or maybe you can be granted permission to do whatever to a specific resource within the company
so you would need resource-id specific perms
$CONTROLLER_NAME.$FUNCTION.$ORG_ID.$TEAM_ID.$OWNER_ID.$RESOURCE_ID
what about the ability to edit only certain params on a resource?
that sounds like it should be `controller.function` level handling, e.g. "userApiToken.giveEscalatedPermissions" or whatever

also, do you even need roles for everything? like... should a user need a role to create a login session?
here's an example controller
controller.session.create
I guess to put login sessions behind roles you would need
- $CONTROLLER_NAME.$FUNCTION.$ORG_ID.$TEAM_ID.$OWNER_ID.$RESOURCE_ID
becomes
- session.create.*.*.*.* // you can make a session
- session.*.*.*.{{self.id}}.* // but for all other things, the owner needs to be self


 */



const roles = [
	// here is the format I propose
	[
		// limit to a resource type or * for all resource types
		'user',
		// limit to a specific action to perform or * for all actions
		'setPassword',
		// limit to a specific organization identifier or * for all organizations
		'123',
		// limit to a team within an organization or * for all teams
		'456',
		// limit to a specific resource identifier or * for all resource identifiers
		'789',
	].join(':'),

	// which is, of course
	'user:setPassword:123:456:789',

	// templates are allowed, but very very lightweight aka https://github.com/lukeed/templite
	// we'll define `self` as the current logged in user, so you would have:
	[
		'user',
		'setPassword', // TODO where is this defined? controller level? if so ... why not use controller naming?
		'*', // any organization
		'*', // any team
		'{{self.id}}', // but only oneself
	].join(':'),
	// aka
	'user:setPassword:*:*:{{self.id}}',

	// create a token that can
	[
		'userApiTokens',
		'create',
		'123', // just the one org
		'*', // any team
		'{{self.id}}', // but only oneself
	].join(':'),
]
