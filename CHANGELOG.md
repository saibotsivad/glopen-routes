# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

Change categories are:

* `Added` for new features.
* `Changed` for changes in existing functionality.
* `Deprecated` for once-stable features removed in upcoming releases.
* `Removed` for deprecated features removed in this release.
* `Fixed` for any bug fixes.
* `Security` to invite users to upgrade in case of vulnerabilities.

## [Unreleased](https://github.com/saibotsivad/glopen-routes/compare/v0.0.9...HEAD)
### Added
### Changed
### Deprecated
### Fixed
### Removed
### Security

## [0.0.9-0.0.10](https://github.com/saibotsivad/glopen-routes/compare/v0.0.8...v0.0.10) - 2012-11-24
### Added
- Routes to support teams.
- Routes to support API tokens managed by a team.
- Routes to support creating and managing tasks for a team.
- Docs demo with [Redocly](https://github.com/Redocly/redoc) since SwaggerUI doesn't support OpenAPI 3.1.0 quite yet.
### Fixed
- Some endpoints were missing security definitions.

## [0.0.8](https://github.com/saibotsivad/glopen-routes/compare/v0.0.7...v0.0.8) - 2021-11-19
### Added
- Added in a validator for the OpenAPI definition, and then added `Location` headers to all 201 responses, based on https://tools.ietf.org/html/rfc7231#section-4.3.3

## [0.0.3-0.0.7](https://github.com/saibotsivad/glopen-routes/compare/v0.0.2...v0.0.7) - 2021-11-10
### Added
- Routes for handling tasks and task groupings, owned by a single user.
- Using an AJV schema compiler tool to make sure schemas are defined correctly.
### Changed
- BREAKING CHANGE: The paths changed so that resources owned by a single user are under `/self/*` for easier management.

## [0.0.2](https://github.com/saibotsivad/glopen-routes/compare/v0.0.1...v0.0.2) - 2021-11-04
### Added
- Security blocks for each endpoint.
- Routes to handle management of API tokens.
- Routes to handle managing users.
### Changed
- BREAKING CHANGE: The paths changed, so that you can more easily re-export routes, making it possible to pick single Operation Objects instead of all.

## [0.0.1](https://github.com/saibotsivad/glopen-routes/compare/v0.0.0...v0.0.1) - 2021-10-27
### Added
- The main basic user auth related routes that I use all over the place.

## [0.0.0](https://github.com/saibotsivad/glopen-routes/tree/v0.0.0) - 2021-10-25
### Added
- Created the base project.
