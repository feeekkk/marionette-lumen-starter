#Marionette Lumen Starter
A solid (opinionated) starting point for backbone marionette applications backed by a lumen API. Skip the tedious bits
of setting up your nginx config, routers, authentication / authorization, etc. and get right into developing your app.

**This project is still a work in progress. I have compiled some boilerplate pieces of my last few projects and will be finishing this up
upon the start of my next project.** Most pieces should work okay, but it may need a little more configuration / there may be a few errors. _Please
open an issue if you come across any errors / need help getting up and running._

##Stack
- Backbone 1.2
- Marionette 2.4
- RequireJS
- Lumen 5.2
- Foundation-sites 6
- backbone-relational
- backgrid
- useful-marionette-view-behaviors
- jwt-auth for token based api authentication

##Boilerplate Features
###Backend
- authentication
- roles (user / admin)
- nginx configs
- (extremely barebones) admin dashboard
- prepared for service repository pattern
- query filters ready to be used with backgrid (based on laracasts lesson)
- basic migrations and factories

###Frontend
- user state
- routing
- Loginview
- Rootview
- useful-marionette-view-behaviors such as modal, off canvas, loading view, etc
- backbone relational for nested relations

## Installation
- `git clone` this repository
- `bower install`
- `composer install`
- create `.env` from `.env.example`
- run the migrations `php artisan migrate`
- edit `phpunit.xml` environment variables depending on your local setup
- `rm -rf .git`
- `git init` your own repo!
- get to work without worrying about nginx/basic authentication!

## Some light documentation...
_More documentation to come...._
### Exceptions
- **APIException**: base exception for all lumen exceptions to extend from in order to be returned as JSON
- **ForbiddenAPIException**: exception to throw when an action is forbidden
- **InvalidPermissionException**: exception to throw when a user does not have the correct permissions to perform an action

### Controllers
- **Controller**: includes helper authorize method for authorizing a user to access an eloquent collection of models.
- **AuthController**: logic for authenticating a user via jwt
- **UserController**: logic for creating / retrieving a user

### Filters
- **QueryFilters**: for searching a model via eloquence

### Middleware
- **UserAuthenticated**: for parsing a user from the provided token. Requires a user to be logged in to access endpoint

### Traits
- **Filterable**
- **HasRoles**
- **PaginationFilters**
- **SearchFilters**

### Models
- **Role**
- **User**
- **UserProfile**

### Policies
- **BasePolicy**: authorizes admins to perform any action
- **UserPolicy**: ensures only a user can access themselves

##Contributing
Feel free.
